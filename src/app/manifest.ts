import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Ruta de las Fortalezas 2026',
        short_name: 'Fortalezas 2026',
        description: 'Guía del Corredor con asistente IA y calculadora de estrategia',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        icons: [
            {
                src: '/fortalezas-logo.jpg',
                sizes: '192x192',
                type: 'image/jpeg',
            },
            {
                src: '/fortalezas-logo.jpg',
                sizes: '512x512',
                type: 'image/jpeg',
            },
        ],
    }
}
