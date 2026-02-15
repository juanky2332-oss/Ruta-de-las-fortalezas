"use client";

import { useState, useRef, useEffect } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import { Button } from "@/components/ui/button";

const playlist = [
    {
        title: "Los Perros - Arde Bogotá",
        audioUrl: "/audio/Arde Bogotá - Los Perros (Video Oficial) [iy-X7U6Znm0].mp3",
        youtubeUrl: "https://www.youtube.com/watch?v=iy-X7U6Znm0"
    },
    {
        title: "Torre Picasso - Arde Bogotá",
        audioUrl: "/audio/Arde Bogotá - La Torre Picasso (Video Oficial) [HSo4Tx7So2w].mp3",
        youtubeUrl: "https://www.youtube.com/watch?v=HSo4Tx7So2w"
    }
];

export function BackgroundMusicPlayer() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);

    // Auto-play on mount
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Attempt auto-play
        const performAutoPlay = async () => {
            try {
                await audio.play();
                setIsPlaying(true);
            } catch (err) {
                console.log("Autoplay blocked by browser:", err);
            }
        };

        performAutoPlay();
    }, []);

    // Handle track changes and continuous play
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleEnded = () => {
            // Immediately switch to next track and play
            const nextTrack = (currentTrack + 1) % playlist.length;
            setCurrentTrack(nextTrack);
            // We set isPlaying true to ensure UI reflects state, though it likely is already
            setIsPlaying(true);
            // The audio element will need to play the new src. 
            // We use a timeout or effect dependency to trigger play after render if needed,
            // but typical React pattern is:
        };

        audio.addEventListener('ended', handleEnded);
        return () => audio.removeEventListener('ended', handleEnded);
    }, [currentTrack]);

    // Effect to trigger play when track changes (if supposed to be playing)
    useEffect(() => {
        if (isPlaying && audioRef.current) {
            audioRef.current.play().catch(e => console.log("Play error", e));
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

    const toggleMute = () => {
        const audio = audioRef.current;
        if (!audio) return;

        audio.muted = !isMuted;
        setIsMuted(!isMuted);
    };

    return (
        <>
            <audio
                ref={audioRef}
                src={playlist[currentTrack].audioUrl}
                preload="metadata"
            />

            {/* Desktop / Tablet Player (Full Bar) - Hidden on Mobile */}
            <div className="hidden md:flex fixed bottom-6 left-6 z-50 items-center gap-3 bg-gradient-to-br from-stone-900/95 to-stone-800/95 backdrop-blur-md px-4 py-3 rounded-xl shadow-2xl border border-primary/20">

                <Button
                    onClick={togglePlay}
                    size="icon"
                    variant="ghost"
                    className="h-10 w-10 rounded-full bg-primary/20 hover:bg-primary/30 text-primary"
                >
                    {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                </Button>

                <div className="flex flex-col">
                    <span className="text-xs font-semibold text-foreground">
                        {playlist[currentTrack].title}
                    </span>
                </div>

                <Button
                    onClick={toggleMute}
                    size="icon"
                    variant="ghost"
                    className="h-8 w-8 rounded-full hover:bg-primary/20 text-muted-foreground hover:text-primary"
                >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </Button>
            </div>

            {/* Mobile Player (Minimized Bubble) - Visible only on Mobile */}
            <div className="md:hidden fixed bottom-6 left-6 z-[9999] flex items-center justify-center">
                <Button
                    onClick={togglePlay}
                    className="rounded-full w-14 h-14 bg-black/20 border border-white/20 text-white/90 shadow-2xl backdrop-blur-none hover:bg-black/40 transition-all p-0 flex items-center justify-center"
                >
                    <div className={`relative w-full h-full flex items-center justify-center`}>
                        {isPlaying ? (
                            <span className="text-2xl animate-pulse">⏸️</span>
                        ) : (
                            <span className="text-2xl">🎵</span>
                        )}
                    </div>
                </Button>
            </div>
        </>
    );
}
