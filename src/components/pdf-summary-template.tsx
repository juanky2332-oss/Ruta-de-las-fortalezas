"use client";

import React from 'react';
import { ROUTE_DATA } from "@/data/route-info";

type StrategySegment = {
    name: string;
    kmEnd: number;
    segmentTime: number;
    cumulativeTime: number;
    pace: string;
    advice: string;
    timeStr: string;
};

type PdfSummaryProps = {
    userName: string;
    targetTime: string; // e.g., "10h 30m"
    strategy: StrategySegment[];
    terrainPaces: { flat: string, up: string, down: string };
};

export const PdfSummaryTemplate = React.forwardRef<HTMLDivElement, PdfSummaryProps>(({ userName, targetTime, strategy, terrainPaces }, ref) => {
    // Earthy / Mountainous Palette
    const colors = {
        bg: "#fdfbf7", // Warm antique white / paper
        textMain: "#292524", // Stone 800
        textMuted: "#57534e", // Stone 600
        primary: "#5D4037", // Mountain Brown (Sienna)
        secondary: "#8D6E63", // Lighter Earth Brown
        accent: "#A1887F", // Light Brown

        // Brand Colors for Table - MAX CONTRAST
        brandDark: "#0c1a40", // Darkest Navy
        brandBlue: "#1e3a8a", // Strong Blue (used for alternate rows)

        // Terrain specifics
        flatBg: "#f0fdf4", flatBorder: "#bbf7d0", flatText: "#15803d",
        upBg: "#fef2f2", upBorder: "#fecaca", upText: "#b91c1c",
        downBg: "#eff6ff", downBorder: "#bfdbfe", downText: "#1d4ed8",

        border: "#d7ccc8",
        white: "#ffffff",
    };

    return (
        <div
            ref={ref}
            style={{
                width: '210mm',
                height: '297mm',
                backgroundColor: colors.bg,
                backgroundImage: 'linear-gradient(to bottom, #fdfbf7, #efebe9)',
                color: colors.textMain,
                padding: '40px', // Restored generous padding for premium feel
                position: 'relative',
                overflow: 'hidden',
                fontFamily: 'sans-serif',
                boxSizing: 'border-box'
            }}
        >
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `3px solid ${colors.primary}`, paddingBottom: '20px', marginBottom: '24px' }}>
                <div>
                    <h1 style={{ fontSize: '30px', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '-0.02em', color: colors.textMain, margin: 0 }}>Ruta de las Fortalezas 2026</h1>
                    <p style={{ color: colors.primary, fontSize: '14px', fontWeight: 700, marginTop: '6px', margin: 0, letterSpacing: '0.04em' }}>PLAN DE ESTRATEGIA PERSONALIZADO</p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <img src="/fortalezas-logo-250x250x80.jpg" alt="Logo Fortalezas" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
                    <img src="/fortachin.png" alt="Fortachin" style={{ width: '65px', height: '65px', objectFit: 'contain' }} />
                </div>
            </div>

            {/* User Info & Main Stats */}
            <div style={{ backgroundColor: colors.white, padding: '18px 24px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', border: `1px solid ${colors.border}`, boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)' }}>
                <div>
                    <span style={{ display: 'block', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', fontWeight: 800 }}>Corredor</span>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: colors.textMain }}>{userName || "Finisher"}</span>
                </div>
                <div>
                    <span style={{ display: 'block', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', fontWeight: 800 }}>Objetivo</span>
                    <span style={{ fontSize: '22px', fontWeight: 900, color: colors.textMain }}>{targetTime}</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', fontWeight: 800 }}>Distancia</span>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: colors.textMain }}>{ROUTE_DATA.distanceKm} km</span>
                </div>
                <div style={{ textAlign: 'right' }}>
                    <span style={{ display: 'block', fontSize: '11px', color: colors.textMuted, textTransform: 'uppercase', fontWeight: 800 }}>Desnivel +</span>
                    <span style={{ fontSize: '18px', fontWeight: 800, color: colors.textMain }}>{ROUTE_DATA.elevationGain}m</span>
                </div>
            </div>

            {/* Terrain Analysis Section */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '28px' }}>
                <div style={{ backgroundColor: colors.flatBg, padding: '14px', borderRadius: '10px', border: `1px solid ${colors.flatBorder}`, textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: colors.flatText, textTransform: 'uppercase', fontWeight: 800 }}>LLANO ({ROUTE_DATA.routeAnalysis.totalFlat}KM)</span>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: colors.textMain }}>{terrainPaces.flat} <span style={{ fontSize: '11px', fontWeight: 500, color: colors.textMuted }}>min/km</span></span>
                </div>
                <div style={{ backgroundColor: colors.upBg, padding: '14px', borderRadius: '10px', border: `1px solid ${colors.upBorder}`, textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: colors.upText, textTransform: 'uppercase', fontWeight: 800 }}>SUBIDA ({ROUTE_DATA.routeAnalysis.totalUp}KM)</span>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: colors.textMain }}>{terrainPaces.up} <span style={{ fontSize: '11px', fontWeight: 500, color: colors.textMuted }}>min/km</span></span>
                </div>
                <div style={{ backgroundColor: colors.downBg, padding: '14px', borderRadius: '10px', border: `1px solid ${colors.downBorder}`, textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '10px', color: colors.downText, textTransform: 'uppercase', fontWeight: 800 }}>BAJADA ({ROUTE_DATA.routeAnalysis.totalDown}KM)</span>
                    <span style={{ fontSize: '20px', fontWeight: 900, color: colors.textMain }}>{terrainPaces.down} <span style={{ fontSize: '11px', fontWeight: 500, color: colors.textMuted }}>min/km</span></span>
                </div>
            </div>

            {/* Strategy Table */}
            <div style={{ marginBottom: '24px' }}>
                <h3 style={{ fontSize: '13px', fontWeight: 800, color: colors.primary, textTransform: 'uppercase', letterSpacing: '0.1em', borderBottom: `2px solid ${colors.border}`, marginBottom: '12px', paddingBottom: '4px' }}>Hoja de Ruta</h3>
                <table style={{ width: '100%', fontSize: '11px', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead style={{ backgroundColor: "#e7e5e4", color: colors.textMain, fontWeight: 900 }}>
                        <tr>
                            <th style={{ padding: '8px 10px' }}>TRAMO</th>
                            <th style={{ padding: '8px', textAlign: 'center' }}>KM</th>
                            <th style={{ padding: '8px', textAlign: 'center' }}>RITMO</th>
                            <th style={{ padding: '8px', textAlign: 'center' }}>PASO APROX.</th>
                        </tr>
                    </thead>
                    <tbody>
                        {strategy.map((seg, idx) => (
                            <tr key={idx} style={{ backgroundColor: idx % 2 === 0 ? colors.white : "#f5f5f4", borderBottom: `1px solid ${colors.border}` }}>
                                <td style={{ padding: '7px 10px', fontWeight: 700 }}>{seg.name}</td>
                                <td style={{ padding: '7px', textAlign: 'center', color: colors.textMuted, fontWeight: 800 }}>{seg.kmEnd}</td>
                                <td style={{ padding: '7px', textAlign: 'center', fontWeight: 800 }}>{seg.pace}</td>
                                <td style={{
                                    padding: '7px 14px',
                                    textAlign: 'center',
                                    fontWeight: 900,
                                    color: colors.white,
                                    backgroundColor: idx % 2 === 0 ? colors.brandDark : colors.brandBlue,
                                    borderRadius: '4px',
                                    fontSize: '12px'
                                }}>
                                    {seg.timeStr}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Bottom Section: Bigger Graph and Corner Branding */}
            <div style={{
                marginTop: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                paddingBottom: '20px', // Space for printer margins
                position: 'relative'
            }}>
                {/* Graph Height Increased to 120px for better visibility */}
                <div style={{ width: '100%', height: '120px', position: 'relative', display: 'flex', alignItems: 'flex-end', marginBottom: '4px' }}>
                    <svg viewBox="0 0 100 30" preserveAspectRatio="none" style={{ width: '100%', height: '100%', zIndex: 5 }}>
                        <defs>
                            <linearGradient id="mountG" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor={colors.primary} />
                                <stop offset="100%" stopColor={colors.secondary} />
                            </linearGradient>
                        </defs>
                        <path d="M0,30 L0,28 L5,28 L11,10 L15,15 L18,10 L20,8 L28,28 L30,26 L40,28 L53,24 L56,26 L60,20 L68,22 L71,20 L78,8 L88,20 L94,5 L100,28 L100,30 Z" fill="url(#mountG)" opacity="0.85" />
                        <path d="M0,30 L0,28 L5,28 L11,10 L15,15 L18,10 L20,8 L28,28 L30,26 L40,28 L53,24 L56,26 L60,20 L68,22 L71,20 L78,8 L88,20 L94,5 L100,28 L100,30 Z" fill="none" stroke={colors.textMain} strokeWidth="0.5" />
                    </svg>

                    {/* Mountain Peak Labels - Precise positions across the full width */}
                    <div style={{ position: 'absolute', top: '15%', left: '11%', fontSize: '8px', fontWeight: 900, backgroundColor: 'rgba(255,255,255,0.7)', padding: '2px 4px', borderRadius: '3px', border: `1px solid ${colors.border}` }}>CALVARIO</div>
                    <div style={{ position: 'absolute', top: '5%', left: '19%', fontSize: '8px', fontWeight: 900, backgroundColor: 'rgba(255,255,255,0.7)', padding: '2px 4px', borderRadius: '3px', border: `1px solid ${colors.border}` }}>S. JULIÁN</div>
                    <div style={{ position: 'absolute', top: '25%', left: '59%', fontSize: '8px', fontWeight: 900, backgroundColor: 'rgba(255,255,255,0.7)', padding: '2px 4px', borderRadius: '3px', border: `1px solid ${colors.border}` }}>CONCEPCIÓN</div>
                    <div style={{ position: 'absolute', top: '8%', left: '77%', fontSize: '8px', fontWeight: 900, backgroundColor: 'rgba(255,255,255,0.7)', padding: '2px 4px', borderRadius: '3px', border: `1px solid ${colors.border}` }}>GALERAS</div>
                    <div style={{ position: 'absolute', top: '0%', left: '92%', fontSize: '8px', fontWeight: 900, backgroundColor: 'rgba(255,255,255,0.7)', padding: '2px 4px', borderRadius: '3px', border: `1px solid ${colors.border}` }}>ATALAYA</div>
                </div>

                {/* Corner Footer - ALWAYS Visible and linked */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '11px', color: colors.textMuted, fontStyle: 'italic', fontWeight: 600 }}>powered by</span>
                    <a href="https://www.flownexion.com" target="_blank" style={{ display: 'flex', alignItems: 'center' }}>
                        <img src="/logo floxnexion.png" alt="Flownexion" style={{ height: '32px', objectFit: 'contain' }} />
                    </a>
                </div>
            </div>

            {/* Background Texture */}
            <div style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '300px', height: '300px', borderRadius: '50%', backgroundColor: colors.primary, opacity: 0.03 }}></div>
            <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '400px', height: '400px', borderRadius: '50%', backgroundColor: colors.secondary, opacity: 0.03 }}></div>
        </div>
    );
});

PdfSummaryTemplate.displayName = "PdfSummaryTemplate";
