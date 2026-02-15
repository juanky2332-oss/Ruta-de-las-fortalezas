"use client";

import { useMemo } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import { ROUTE_DATA } from "@/data/route-info";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

// Use detailed elevation profile data
const generateChartData = () => {
    return ROUTE_DATA.elevationProfile.map((point, idx) => {
        // Find if this km matches a checkpoint
        const checkpoint = ROUTE_DATA.checkpoints.find(cp =>
            Math.abs(cp.km - point.km) < 0.1
        );

        return {
            km: point.km,
            alt: point.alt,
            name: checkpoint?.name
        };
    });
};

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-background/95 border border-border p-3 rounded-lg shadow-xl text-xs backdrop-blur-sm">
                <p className="font-bold text-primary mb-1">{`KM ${payload[0].payload.km}`}</p>
                <p className="text-foreground">{`Altitud: ${payload[0].value}m`}</p>
                {payload[0].payload.name && (
                    <p className="text-accent font-bold mt-1 uppercase">{payload[0].payload.name}</p>
                )}
            </div>
        );
    }
    return null;
};

export function ElevationProfile() {
    const data = useMemo(() => generateChartData(), []);

    return (
        <section className="py-12 px-4 md:px-6 bg-background">
            <div className="max-w-6xl mx-auto">
                <Card className="border-border/50 shadow-2xl bg-card/20 backdrop-blur-sm">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center gap-2">
                            📉 Perfil Altimétrico
                        </CardTitle>
                        <CardDescription>
                            Pasa el cursor (o toca) para ver altitud y puntos clave.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[400px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart
                                    data={data}
                                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                                >
                                    <defs>
                                        <linearGradient id="colorAlt" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="var(--primary)" stopOpacity={0.1} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                    <XAxis
                                        dataKey="km"
                                        type="number"
                                        domain={[0, 53]}
                                        tickCount={10}
                                        unit="km"
                                        stroke="var(--muted-foreground)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <YAxis
                                        domain={[0, 500]}
                                        unit="m"
                                        stroke="var(--muted-foreground)"
                                        fontSize={12}
                                        tickLine={false}
                                        axisLine={false}
                                    />
                                    <Tooltip content={<CustomTooltip />} />
                                    <Area
                                        type="monotone"
                                        dataKey="alt"
                                        stroke="var(--primary)"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorAlt)"
                                        animationDuration={2000}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Hitos debajo del gráfico para contexto móvil */}
                        <div className="mt-6 flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
                            {ROUTE_DATA.checkpoints.filter(c => c.type !== 'start' && c.type !== 'finish').map((cp) => (
                                <span key={cp.id} className="px-2 py-1 bg-secondary rounded-full border border-border">
                                    {cp.name} ({cp.altitude}m)
                                </span>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
}
