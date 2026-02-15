"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, Activity } from "lucide-react";
import { ROUTE_DATA } from "@/data/route-info";
import { Button } from "@/components/ui/button";

export function HeroSection() {


    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);



    return (
        <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
            {/* Background Parallax */}
            <motion.div
                style={{ y }}
                className="absolute inset-0 z-0 bg-stone-900"
            >
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-25"
                    style={{
                        backgroundImage: "url('/faro-navidad.jpg')",
                        filter: "brightness(0.5) contrast(1.1)"
                    }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
            </motion.div>

            {/* Hero Content */}
            <motion.div
                style={{ opacity }}
                className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6"
            >
                {/* Date Badge */}
                <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white shadow-lg mb-8 hover:bg-white/20 transition-colors">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span className="text-sm font-bold tracking-widest uppercase">18 Abril 2026</span>
                </div>

                <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-2xl uppercase font-sans mb-6">
                    XV Ruta de las <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400 block md:inline">Fortalezas</span>
                </h1>

                <p className="text-xl md:text-2xl text-white/80 font-medium max-w-2xl mx-auto mb-12 drop-shadow-md">
                    Cartagena, Murcia
                </p>

                {/* Stats Bar */}
                <div className="flex flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-stone-950/80 backdrop-blur-xl py-6 px-10 rounded-2xl border border-white/5 shadow-2xl max-w-5xl mx-auto">

                    {/* Distance */}
                    <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <Activity className="w-5 h-5" />
                            <span className="text-sm font-extrabold uppercase tracking-wide text-primary">Distancia</span>
                        </div>
                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight group-hover:scale-110 transition-transform duration-300">
                            {ROUTE_DATA.distanceKm}<span className="text-xl ml-1 text-white/60">KM</span>
                        </span>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-white/10" />

                    {/* Elevation */}
                    <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <MapPin className="w-5 h-5" />
                            <span className="text-sm font-extrabold uppercase tracking-wide text-primary">Desnivel</span>
                        </div>
                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight group-hover:scale-110 transition-transform duration-300">
                            +{ROUTE_DATA.elevationGain}<span className="text-xl ml-1 text-white/60">M</span>
                        </span>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-white/10" />

                    {/* Time Limit */}
                    <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <span className="text-lg">☠️</span>
                            <span className="text-sm font-extrabold uppercase tracking-wide text-primary">Límite</span>
                        </div>
                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight group-hover:scale-110 transition-transform duration-300">
                            12<span className="text-xl ml-1 text-white/60">H</span>
                        </span>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-white/10" />

                    {/* Start Time */}
                    <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <span className="text-lg">🕗</span>
                            <span className="text-sm font-extrabold uppercase tracking-wide text-primary">Salida</span>
                        </div>
                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-1 group-hover:scale-110 transition-transform duration-300">
                            {ROUTE_DATA.startTime}
                        </span>
                    </div>

                    <div className="hidden md:block w-px h-10 bg-white/10" />

                    {/* Aid Stations */}
                    <div className="flex flex-col items-center gap-1 group">
                        <div className="flex items-center gap-2 text-primary mb-1">
                            <span className="text-lg">🍌</span>
                            <span className="text-sm font-extrabold uppercase tracking-tight text-primary">Avituallamientos</span>
                        </div>
                        <span className="text-3xl md:text-4xl font-extrabold text-white tracking-tight group-hover:scale-110 transition-transform duration-300">
                            {ROUTE_DATA.aidStations.length}
                        </span>
                    </div>
                </div>

                <div className="pt-8 relative">
                    <Button size="lg" className="text-lg px-8 py-6 rounded-full shadow-[0_0_20px_rgba(234,88,12,0.5)] animate-pulse">
                        Prepara tu Estrategia
                    </Button>

                    {/* Animated Down Arrow */}
                    <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-primary animate-bounce">
                        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v10.586l2.293-2.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 14.586V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                </div>
            </motion.div>


        </section>
    );
}
