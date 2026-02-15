"use client";

import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import { Button } from "@/components/ui/button";

const playlist = [
    {
        title: "Los Perros - Arde Bogotá",
        audioUrl: "/audio/Arde Bogotá - Los Perros (Video Oficial) [iy-X7U6Znm0].mp3",
    },
    {
        title: "Torre Picasso - Arde Bogotá",
        audioUrl: "/audio/Arde Bogotá - La Torre Picasso (Video Oficial) [HSo4Tx7So2w].mp3",
    }
];

export function BackgroundMusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Auto-play on mount
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const performAutoPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay blocked:", err);
            }
        };
        performAutoPlay();
    }, []);

    // Handle track endings
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            const nextTrack = (currentTrack + 1) % playlist.length;
            setCurrentTrack(nextTrack);
            setIsPlaying(true);
        };

        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, [currentTrack]);

    // React to track changes
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(console.error);
        }
    }, [currentTrack]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.pause();
        } else {
            audio.play();
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentTrack].audioUrl}
                preload="metadata"
            />

            {/* Simple Circular Music Toggle - Bottom Left */}
            <div className="fixed bottom-6 left-6 z-50">
                <Button
                    onClick={togglePlay}
                    className={`rounded-full w-12 h-12 shadow-lg transition-all duration-300 flex items-center justify-center border border-white/10 ${isPlaying
                            ? "bg-primary/80 hover:bg-primary text-white animate-pulse-slow"
                            : "bg-stone-800/80 hover:bg-stone-800 text-stone-400"
                        }`}
                    title={isPlaying ? "Pausar música" : "Reproducir música"}
                >
                    <Music className={`w-6 h-6 ${isPlaying ? "animate-bounce-subtle" : ""}`} />
                </Button>
            </div>

            <style jsx global>{`
                @keyframes pulse-slow {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.9; transform: scale(1.05); }
                }
                .animate-pulse-slow {
                    animation: pulse-slow 3s infinite ease-in-out;
                }
                .animate-bounce-subtle {
                    animation: bounce-subtle 2s infinite;
                }
                @keyframes bounce-subtle {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
            `}</style>
        </>
    );
}
