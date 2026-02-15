import { ROUTE_DATA } from "@/data/route-info";
import { Timer, MountainSnow, Map, Utensils, Clock, ArrowUpRight, ArrowDownRight, ArrowRight, Activity } from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export function RouteDetails() {
    return (
        <section className="py-20 px-6 bg-secondary/30 bg-cartagena-subtle bg-cartagena-1">
            <div className="max-w-6xl mx-auto">




                {/* Checkpoints Grid */}
                <div className="mt-12">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <MountainSnow className="w-6 h-6 text-primary" />
                        Hitos y Fortalezas
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                        {ROUTE_DATA.checkpoints.map((cp) => (
                            <div key={cp.id} className="bg-card border border-border p-4 rounded-lg flex flex-col justify-between hover:border-primary transition-colors hover:shadow-lg group">
                                <div className="mb-2">
                                    <span className="text-xs text-muted-foreground font-mono">KM {cp.km}</span>
                                    <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">{cp.name}</h4>
                                </div>
                                <div className="flex items-center justify-between mt-2">
                                    <span className="text-xs bg-secondary px-2 py-1 rounded text-secondary-foreground">
                                        {cp.altitude}m
                                    </span>
                                    {cp.type === 'fortress' && <span className="text-lg">🏰</span>}
                                    {cp.type === 'peak' && <span className="text-lg">⛰️</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Análisis del Terreno */}
                <div className="mt-16">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <Activity className="w-6 h-6 text-primary" />
                        Análisis del Terreno
                    </h3>

                    {/* Resumen Totales */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <Card className="bg-card/50 border-l-4 border-l-green-500">
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                                <span className="text-sm font-medium text-muted-foreground mb-1">Llano</span>
                                <div className="text-3xl font-bold flex items-center gap-2">
                                    <ArrowRight className="w-6 h-6 text-green-500" />
                                    {ROUTE_DATA.routeAnalysis.totalFlat} km
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 border-l-4 border-l-red-500">
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                                <span className="text-sm font-medium text-muted-foreground mb-1">Subida</span>
                                <div className="text-3xl font-bold flex items-center gap-2">
                                    <ArrowUpRight className="w-6 h-6 text-red-500" />
                                    {ROUTE_DATA.routeAnalysis.totalUp} km
                                </div>
                            </CardContent>
                        </Card>
                        <Card className="bg-card/50 border-l-4 border-l-blue-500">
                            <CardContent className="pt-6 flex flex-col items-center text-center">
                                <span className="text-sm font-medium text-muted-foreground mb-1">Bajada</span>
                                <div className="text-3xl font-bold flex items-center gap-2">
                                    <ArrowDownRight className="w-6 h-6 text-blue-500" />
                                    {ROUTE_DATA.routeAnalysis.totalDown} km
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Grid de Tramos */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                        {ROUTE_DATA.routeAnalysis.segments.map((seg, idx) => (
                            <div
                                key={idx}
                                className={`
                                    p-3 rounded-md border text-center text-sm flex flex-col items-center justify-center gap-1
                                    ${seg.type === 'subida' ? 'bg-red-500/10 border-red-500/20 text-red-700 dark:text-red-400' : ''}
                                    ${seg.type === 'bajada' ? 'bg-blue-500/10 border-blue-500/20 text-blue-700 dark:text-blue-400' : ''}
                                    ${seg.type === 'llano' ? 'bg-green-500/10 border-green-500/20 text-green-700 dark:text-green-400' : ''}
                                `}
                            >
                                <span className="font-bold text-xs opacity-70">KM {seg.kmStart}-{seg.kmEnd}</span>
                                <div className="font-bold flex items-center gap-1">
                                    {seg.type === 'subida' && <ArrowUpRight className="w-3 h-3" />}
                                    {seg.type === 'bajada' && <ArrowDownRight className="w-3 h-3" />}
                                    {seg.type === 'llano' && <ArrowRight className="w-3 h-3" />}
                                    {seg.type.toUpperCase()}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
