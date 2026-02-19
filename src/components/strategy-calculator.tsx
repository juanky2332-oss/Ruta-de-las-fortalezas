"use client";

import { useRef, useState, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { PdfSummaryTemplate } from "@/components/pdf-summary-template";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { ROUTE_DATA } from "@/data/route-info";
import { Download, Share2, Timer, AlertCircle } from "lucide-react";

type StrategySegment = {
    name: string;
    kmEnd: number;
    segmentTime: number; // minutes
    cumulativeTime: number; // minutes
    pace: string;
    advice: string;
    timeStr: string;
};

export function StrategyCalculator() {
    const [targetTimeHours, setTargetTimeHours] = useState(10); // Default 10 hours
    const [strategy, setStrategy] = useState<StrategySegment[]>([]);
    const [terrainPaces, setTerrainPaces] = useState({ flat: "0:00", up: "0:00", down: "0:00" });

    // PDF State
    const [isPdfDialogOpen, setIsPdfDialogOpen] = useState(false);
    const [userName, setUserName] = useState("");
    const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
    const pdfTemplateRef = useRef<HTMLDivElement>(null);

    // Calculate strategy whenever target time changes
    useEffect(() => {
        calculateStrategy(targetTimeHours);
    }, [targetTimeHours]);

    const calculateStrategy = (hours: number) => {
        const totalMinutes = hours * 60;
        const totalDist = ROUTE_DATA.distanceKm;

        // Base pace (min/km) simply averaged, then adjusted per segment difficulty
        // This is a simplified model. REAL strategy needs more nuance.
        // We'll define difficulty factors for segments.
        // Segment logic based on checkpoints roughly.

        const segmentsDef = [
            { name: "Salida -> Calvario", km: 5.8, factor: 1.1, advice: "Inicio rápido y primera subida. ¡Guarda fuerzas!" },
            { name: "Calvario -> Ordóñez (San Julián)", km: 10.9, factor: 1.3, advice: "Subida al techo de la prueba. Técnica." },
            { name: "Ordóñez -> Cala Cortina", km: 14.7, factor: 0.8, advice: "Bajada rápida. Suelta piernas." },
            { name: "Cala Cortina -> San Leandro", km: 15.8, factor: 1.1, advice: "Repecho corto pero intenso." },
            { name: "San Leandro -> Muralla Púnica", km: 28.3, factor: 0.9, advice: "Tramo largo de enlace y transición. Come bien." },
            { name: "Muralla -> Concepción", km: 29.8, factor: 1.3, advice: "Subida al Castillo. Escaleras y turistas." },
            { name: "Concepción -> Molinete", km: 30.9, factor: 0.8, advice: "Bajada rápida y técnica urbana." },
            { name: "Molinete -> Mirador Cariño", km: 35.9, factor: 1.0, advice: "Tramo de enlace hacia Fajardo." },
            { name: "Mirador -> San Fulgencio", km: 37.2, factor: 1.0, advice: "Aproximación a la zona dura." },
            { name: "San Fulgencio -> Galeras", km: 40.7, factor: 1.6, advice: "El Muro. La subida más temida. Cabeza fría." },
            { name: "Galeras -> Cueva Pelayo", km: 46.3, factor: 0.9, advice: "Bajada larga para recuperar antes del final." },
            { name: "Pelayo -> Atalaya", km: 49.4, factor: 1.5, advice: "Último esfuerzo titánico. ¡Ya lo tienes!" },
            { name: "Atalaya -> Meta", km: 52.3, factor: 0.7, advice: "Vuela hacia la meta. ¡Eres Finisher!" },
        ];

        // Calculate weighted total distance to normalize factors
        let weightedDist = 0;
        let prevKm = 0;

        const segmentsWithDist = segmentsDef.map(seg => {
            const dist = seg.km - prevKm;
            weightedDist += dist * seg.factor;
            prevKm = seg.km;
            return { ...seg, dist };
        });

        // --- CÁLCULO DE RITMOS POR TERRENO ---
        // Factores de corrección estimados: Subida (+60%), Bajada (-15%) respecto a llano
        const K_UP = 1.6;
        const K_DOWN = 0.85;

        // Distancias reales del análisis
        const dFlat = ROUTE_DATA.routeAnalysis.totalFlat;
        const dUp = ROUTE_DATA.routeAnalysis.totalUp;
        const dDown = ROUTE_DATA.routeAnalysis.totalDown;

        // Fórmula: TiempoTotal = P_llano * (dFlat + dUp*K_UP + dDown*K_DOWN)
        // Por tanto: P_llano = TiempoTotal / (dFlat + dUp*K_UP + dDown*K_DOWN)

        const effectiveDist = dFlat + (dUp * K_UP) + (dDown * K_DOWN);
        const paceFlatMinKm = totalMinutes / effectiveDist;
        const paceUpMinKm = paceFlatMinKm * K_UP;
        const paceDownMinKm = paceFlatMinKm * K_DOWN;

        const toPaceStr = (val: number) => {
            const m = Math.floor(val);
            const s = Math.round((val - m) * 60);
            return `${m}:${s < 10 ? '0' : ''}${s}`;
        };

        setTerrainPaces({
            flat: toPaceStr(paceFlatMinKm),
            up: toPaceStr(paceUpMinKm),
            down: toPaceStr(paceDownMinKm)
        });
        // -------------------------------------

        // Base pace needed on "flat" to meet target (Legacy logic for segments list)
        // We keep using weightedDist from the manual segments definition for compatibility 
        // with the "checkpoints" view, or we could sync them up. 
        // For now, let's keep the checkpoint logic slightly separate but similar base.
        const basePace = totalMinutes / weightedDist;

        let currentCumulative = 0;
        const calculatedSegments = segmentsWithDist.map(seg => {
            const segmentTime = seg.dist * basePace * seg.factor;
            currentCumulative += segmentTime;

            const paceMin = Math.floor(segmentTime / seg.dist);
            const paceSec = Math.round((segmentTime / seg.dist - paceMin) * 60);
            const paceStr = `${paceMin}:${paceSec < 10 ? '0' : ''}${paceSec}`;

            // Format cumulative time to HH:MM
            const cumHours = Math.floor(currentCumulative / 60);
            const cumMins = Math.floor(currentCumulative % 60);

            return {
                name: seg.name,
                kmEnd: seg.km,
                segmentTime,
                cumulativeTime: currentCumulative,
                pace: paceStr,
                advice: seg.advice,
                timeStr: `${cumHours}h ${cumMins < 10 ? '0' : ''}${cumMins}m`
            };
        });

        setStrategy(calculatedSegments);
    };

    const formatTime = (val: number) => {
        const h = Math.floor(val);
        const m = Math.round((val - h) * 60);
        return `${h}h ${m < 10 ? '0' : ''}${m}m`;
    };

    const handleDownloadPdf = async () => {
        if (!userName.trim()) return;
        setIsGeneratingPdf(true);

        try {
            // 1. Create a temporary iframe to isolate the PDF generation from global CSS (Tailwind/oklch)
            const iframe = document.createElement('iframe');
            iframe.style.position = 'fixed';
            iframe.style.top = '-10000px';
            iframe.style.left = '-10000px';
            iframe.style.width = '210mm';
            iframe.style.height = '297mm';
            iframe.style.border = 'none';
            document.body.appendChild(iframe);

            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc) throw new Error("Could not create iframe document");

            // 2. Get the HTML content from the template (which now uses inline styles)
            // We use a temporary container to render the React component to an HTML string
            // faster/easier: We clone the existing hidden ref content
            if (!pdfTemplateRef.current) throw new Error("Template ref not found");

            const templateContent = pdfTemplateRef.current.outerHTML;

            // 3. Write clean HTML to the iframe
            iframeDoc.open();
            iframeDoc.write(`
                <html>
                <head>
                    <style>
                        body { margin: 0; padding: 0; background: white; font-family: sans-serif; }
                        /* Add any specialized font resets here if needed */
                    </style>
                </head>
                <body>
                    ${templateContent}
                </body>
                </html>
            `);
            iframeDoc.close();

            // Wait for images to load inside iframe
            await new Promise((resolve) => {
                const images = iframeDoc.getElementsByTagName('img');
                let loadedCount = 0;
                if (images.length === 0) resolve(true);

                for (let i = 0; i < images.length; i++) {
                    if (images[i].complete) {
                        loadedCount++;
                    } else {
                        images[i].onload = () => {
                            loadedCount++;
                            if (loadedCount === images.length) resolve(true);
                        };
                        images[i].onerror = () => { // Resolving even on error to avoid hanging
                            loadedCount++;
                            if (loadedCount === images.length) resolve(true);
                        };
                    }
                }
                if (loadedCount === images.length) resolve(true);
            });

            // 4. Generate PDF from the CLEAN iframe content
            const canvas = await html2canvas(iframeDoc.body, {
                scale: 2,
                useCORS: true,
                logging: false,
                windowWidth: 794, // A4 pixel width at 96dpi approx
                windowHeight: 1123
            });

            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);


            // Add clickable link over the "powered by [Logo]" area
            // Footer is aligned to the bottom right with generous padding.
            // A4 Height 297mm. Padding bottom ~40px (~10mm).
            // Link Position: x=155mm, y=275mm (approx), w=45mm, h=12mm
            pdf.link(155, 275, 45, 12, { url: 'https://www.flownexion.com' });

            pdf.save(`Estrategia_Fortalezas_2026_${userName.replace(/\s+/g, '_')}.pdf`);

            // Cleanup
            document.body.removeChild(iframe);
            setIsPdfDialogOpen(false);
            setUserName("");

        } catch (error) {
            console.error("Error generating PDF:", error);
            alert(`Hubo un error al generar el PDF: ${error instanceof Error ? error.message : String(error)}`);
        } finally {
            setIsGeneratingPdf(false);
        }
    };

    return (
        <section className="py-20 px-4 bg-stone-900 text-white relative overflow-hidden bg-cartagena-subtle bg-cartagena-3">
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-primary rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2" />
                <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-accent rounded-full blur-[80px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-4 flex items-center justify-center gap-3">
                        <Timer className="w-10 h-10 text-accent" />
                        Calculadora de Estrategia
                    </h2>
                    <p className="text-xl text-stone-300">
                        Define tu objetivo y obtén tu plan de paso por punto.
                    </p>
                </div>

                <Card className="bg-stone-800/50 border-stone-700 backdrop-blur-md mb-8">
                    <CardHeader>
                        <CardTitle className="text-white">Tu Objetivo: <span className="text-primary text-2xl">{formatTime(targetTimeHours)}</span></CardTitle>
                        <CardDescription className="text-stone-400">
                            Desliza para ajustar tu tiempo objetivo (Meta 20:40h = 12h 40m máx)
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="py-6">
                            <Slider
                                value={[targetTimeHours]}
                                min={3.5}
                                max={12}
                                step={0.10} // 6 min steps
                                onValueChange={(vals) => setTargetTimeHours(vals[0])}
                                className="cursor-pointer"
                            />
                            <div className="flex justify-between mt-2 text-stone-500 text-sm">
                                <span>🚀 Élite (3h 30m)</span>
                                <span>🏃 Corredor (8h)</span>
                                <span>🚶 Finisher (12h)</span>
                            </div>
                        </div>

                        {/* Ritmos de Referencia Calculados */}
                        <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-stone-700/50">
                            <div className="text-center p-2 rounded bg-green-500/10 border border-green-500/20">
                                <span className="block text-xs text-green-400 uppercase font-bold mb-1">Llano</span>
                                <div className="text-lg font-bold text-white">{terrainPaces.flat} <span className="text-xs font-normal text-stone-400">min/km</span></div>
                                <div className="text-xs text-stone-500">{(60 / parseFloat(terrainPaces.flat.replace(':', '.'))).toFixed(1)} km/h</div>
                            </div>
                            <div className="text-center p-2 rounded bg-red-500/10 border border-red-500/20">
                                <span className="block text-xs text-red-400 uppercase font-bold mb-1">Subida</span>
                                <div className="text-lg font-bold text-white">{terrainPaces.up} <span className="text-xs font-normal text-stone-400">min/km</span></div>
                                <div className="text-xs text-stone-500">{(60 / parseFloat(terrainPaces.up.replace(':', '.'))).toFixed(1)} km/h</div>
                            </div>
                            <div className="text-center p-2 rounded bg-blue-500/10 border border-blue-500/20">
                                <span className="block text-xs text-blue-400 uppercase font-bold mb-1">Bajada</span>
                                <div className="text-lg font-bold text-white">{terrainPaces.down} <span className="text-xs font-normal text-stone-400">min/km</span></div>
                                <div className="text-xs text-stone-500">{(60 / parseFloat(terrainPaces.down.replace(':', '.'))).toFixed(1)} km/h</div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Strategy Output */}
                <div className="space-y-4">
                    {strategy.map((seg, idx) => (
                        <div key={idx} className="bg-stone-800/40 border border-stone-700/50 rounded-lg p-4 flex flex-col md:flex-row items-center justify-between gap-4 hover:border-primary/50 transition-all">
                            <div className="text-left w-full md:w-1/3">
                                <h4 className="font-bold text-lg text-primary">{seg.name}</h4>
                                <span className="text-xs text-stone-500 uppercase tracking-widest font-mono">KM {seg.kmEnd}</span>
                            </div>

                            <div className="flex items-center gap-6 w-full md:w-1/3 justify-center md:justify-start">
                                <div className="text-center">
                                    <span className="block text-xs text-stone-400 uppercase">Ritmo Medio</span>
                                    <span className="text-xl font-bold">{seg.pace} <span className="text-xs font-normal text-stone-500">min/km</span></span>
                                </div>
                                <div className="text-center">
                                    <span className="block text-xs text-stone-400 uppercase">Paso Aprox.</span>
                                    <span className="text-xl font-bold text-white">{seg.timeStr}</span>
                                </div>
                            </div>

                            <div className="w-full md:w-1/3 text-sm text-stone-300 italic border-l-2 border-accent pl-3">
                                "{seg.advice}"
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-8 flex flex-col md:flex-row justify-center gap-4">
                    <Button
                        size="lg"
                        className="gap-2 bg-primary hover:bg-primary/80 text-white px-8 transition-transform hover:scale-105"
                        onClick={async () => {
                            const shareData = {
                                title: 'Mi Estrategia - Ruta de las Fortalezas 2026',
                                text: `¡Ya tengo mi plan para la Ruta de las Fortalezas 2026! Objetivo: ${formatTime(targetTimeHours)}.\n\nCalcula el tuyo aquí:`,
                                url: window.location.href
                            };

                            try {
                                if (navigator.share) {
                                    await navigator.share(shareData);
                                } else {
                                    await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                                    alert("¡Enlace copiado al portapapeles!");
                                }
                            } catch (err) {
                                console.error("Error al compartir:", err);
                            }
                        }}
                    >
                        <Share2 className="w-5 h-5" /> Compartir
                    </Button>

                    <Button
                        size="lg"
                        className="gap-2 bg-accent hover:bg-accent/80 text-white px-8 transition-transform hover:scale-105"
                        onClick={() => setIsPdfDialogOpen(true)}
                    >
                        <Download className="w-5 h-5" /> Descarga tu estrategia en PDF
                    </Button>
                </div>

                <div className="mt-6 p-4 bg-yellow-900/20 border border-yellow-700/50 rounded text-yellow-500 text-sm flex gap-3 items-start">
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                    <p>Este plan es una estimación basada en algoritmos generales. El clima, tu estado físico y las condiciones del terreno pueden alterar estos tiempos considerablemente. Escucha a tu cuerpo.</p>
                </div>
            </div>

            {/* Name Input Dialog */}
            <Dialog open={isPdfDialogOpen} onOpenChange={setIsPdfDialogOpen}>
                <DialogContent className="sm:max-w-md bg-stone-900 border-stone-700 text-stone-100">
                    <DialogHeader>
                        <DialogTitle>Personaliza tu Estrategia</DialogTitle>
                        <DialogDescription className="text-stone-400">
                            Dinos tu nombre para generar tu carnet de estrategia personalizado.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center space-x-2 py-4">
                        <div className="grid flex-1 gap-2">
                            <Label htmlFor="name" className="sr-only">
                                Nombre
                            </Label>
                            <Input
                                id="name"
                                placeholder="Tu nombre..."
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                className="bg-stone-800 border-stone-600 text-white placeholder:text-stone-500"
                            />
                        </div>
                    </div>
                    <DialogFooter className="sm:justify-end">
                        <Button variant="secondary" onClick={() => setIsPdfDialogOpen(false)} className="bg-stone-800 text-stone-300 hover:bg-stone-700">
                            Cancelar
                        </Button>
                        <Button type="button" onClick={handleDownloadPdf} disabled={!userName.trim() || isGeneratingPdf} className="bg-primary text-white hover:bg-primary/90">
                            {isGeneratingPdf ? "Generando..." : "Descargar PDF"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Hidden PDF Template Renderer */}
            <div className="fixed top-0 left-0 -z-50 opacity-0 pointer-events-none">
                {/*  Rendered only when needed, or always rendered but hidden. 
                      Ideally always rendered allows images to load. 
                  */}
                <PdfSummaryTemplate
                    ref={pdfTemplateRef}
                    userName={userName}
                    targetTime={formatTime(targetTimeHours)}
                    strategy={strategy}
                    terrainPaces={terrainPaces}
                />
            </div>
        </section>
    );
}
