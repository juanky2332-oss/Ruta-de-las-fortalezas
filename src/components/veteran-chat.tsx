"use client";

import { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Send, MessageSquare, User, Bot, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';

type Message = {
    id: string;
    role: 'user' | 'assistant';
    content: string;
};

export function VeteranChat() {
    const [isOpen, setIsOpen] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [messages, setMessages] = useState<Message[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages]);

    const toggleChat = () => setIsOpen(!isOpen);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            role: 'user',
            content: inputValue
        };

        // UI Updates immediately
        setMessages(prev => [...prev, userMsg]);
        setInputValue('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: [...messages, userMsg] })
            });

            if (!response.ok) throw new Error('Error en la respuesta');

            const data = await response.json();

            const assistantMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: data.content
            };

            setMessages(prev => [...prev, assistantMsg]);
        } catch (error) {
            console.error(error);
            // Optional: Show error in chat
            const errorMsg: Message = {
                id: (Date.now() + 1).toString(),
                role: 'assistant',
                content: "Lo siento, compañero, necesito tomar un poco de aire. Inténtalo de nuevo en un momento."
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const [avatarError, setAvatarError] = useState(false);

    return (
        <>
            {/* Floating Button with Label */}
            {!isOpen && (
                <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 animate-in fade-in duration-500">
                    {/* Tooltip/Label */}
                    <div className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground px-5 py-3 rounded-xl shadow-2xl text-sm font-bold animate-bounce-slow border-2 border-primary-foreground/20">
                        Aquí Fortachin, consúltame tus dudas sobre la ruta
                        <div className="absolute -bottom-2 right-8 w-4 h-4 bg-primary rotate-45 border-r-2 border-b-2 border-primary-foreground/20"></div>
                    </div>

                    {/* Animated Button */}
                    <Button
                        onClick={toggleChat}
                        className="relative rounded-full w-20 h-20 shadow-2xl bg-gradient-to-br from-primary via-primary to-primary/80 text-primary-foreground hover:scale-110 transition-all duration-300 overflow-hidden p-0 border-4 border-primary-foreground/30 animate-pulse-slow"
                    >
                        {/* Multiple ripple effects */}
                        <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-30"></span>
                        <span className="absolute inset-0 rounded-full bg-primary-foreground animate-ping opacity-10" style={{ animationDelay: '0.5s' }}></span>

                        {/* Solid background for avatar */}
                        <div className="absolute inset-2 rounded-full bg-white dark:bg-stone-100 z-0"></div>

                        {!avatarError ? (
                            <div className="w-full h-full relative z-10 p-2">
                                <motion.div
                                    animate={{
                                        scale: [1, 1.08, 1],
                                        y: [0, -3, 0],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    className="w-full h-full"
                                >
                                    <img
                                        src="/fortachin.png"
                                        alt="Fortachin"
                                        className="w-full h-full object-cover rounded-full scale-150 translate-y-2"
                                        onError={() => setAvatarError(true)}
                                    />
                                </motion.div>
                            </div>
                        ) : (
                            <MessageSquare className="w-10 h-10 relative z-10" />
                        )}
                    </Button>

                    {/* Flownexion Badge */}
                    <div className="text-center">
                        <a
                            href="https://flownexion.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs text-muted-foreground hover:text-primary transition-colors"
                        >
                            Powered by <span className="underline font-medium">Flownexion</span>
                        </a>
                    </div>
                </div>
            )}

            {/* Chat Window */}
            {isOpen && (
                <Card className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] shadow-2xl border-primary/20 bg-background/95 backdrop-blur-md flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
                    <CardHeader className="bg-primary/10 border-b border-primary/10 py-3 px-4 flex flex-row items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative w-12 h-12 rounded-full border-2 border-primary-foreground shadow-sm overflow-hidden bg-primary flex items-center justify-center shrink-0">
                                {!avatarError ? (
                                    <div className="relative w-full h-full overflow-hidden rounded-full">
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.05, 1],
                                                y: [0, -2, 0],
                                            }}
                                            transition={{
                                                duration: 3,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="w-full h-full"
                                        >
                                            <img
                                                src="/fortachin.png"
                                                alt="Fortachin"
                                                className="w-full h-full object-cover scale-150 translate-y-1"
                                                onError={() => setAvatarError(true)}
                                            />
                                        </motion.div>
                                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full z-10"></span>
                                    </div>
                                ) : (
                                    <Bot className="w-6 h-6 text-primary-foreground" />
                                )}
                            </div>
                            <div>
                                <CardTitle className="text-base font-bold text-primary flex items-center gap-2">
                                    Fortachin
                                    <span className="px-1.5 py-0.5 rounded-full bg-primary/10 text-[10px] uppercase text-primary font-extrabold tracking-wider">Bot</span>
                                </CardTitle>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                    Tu compañero de ruta 🏃‍♂️
                                </p>
                            </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={toggleChat} className="h-8 w-8 hover:bg-primary/20">
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>

                    <CardContent className="flex-1 p-0 overflow-hidden relative bg-stone-50/50 dark:bg-stone-950/50">
                        <ScrollArea className="h-full p-4" ref={scrollRef}>
                            {messages.length === 0 && (
                                <div className="text-center text-muted-foreground text-sm mt-10 px-6">
                                    <div className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4 overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 border-4 border-background shadow-xl">
                                        {!avatarError ? (
                                            <motion.div
                                                animate={{
                                                    scale: [1, 1.1, 1],
                                                    rotate: [0, 2, -2, 0],
                                                }}
                                                transition={{
                                                    duration: 4,
                                                    repeat: Infinity,
                                                    ease: "easeInOut"
                                                }}
                                                className="w-full h-full"
                                            >
                                                <img
                                                    src="/fortachin.png"
                                                    alt="Fortachin"
                                                    className="w-full h-full object-cover scale-150 translate-y-2"
                                                />
                                            </motion.div>
                                        ) : (
                                            <Bot className="w-10 h-10 text-primary" />
                                        )}
                                    </div>
                                    <p className="font-bold text-foreground mb-1 text-lg">¡Hola, compañero!</p>
                                    <p className="leading-relaxed">Soy <span className="font-bold text-primary">Fortachin</span>, estoy aquí para motivarte y resolver tus dudas sobre la ruta. ¡Juntos llegaremos a la meta! 💪</p>
                                </div>
                            )}

                            <div className="flex flex-col gap-3">
                                {messages.map((m) => (
                                    <div key={m.id} className={cn(
                                        "flex items-start gap-2 max-w-[85%]",
                                        m.role === 'user' ? "ml-auto flex-row-reverse" : "mr-auto"
                                    )}>
                                        <div className={cn(
                                            "w-8 h-8 rounded-full flex items-center justify-center shrink-0 border shadow-sm overflow-hidden",
                                            m.role === 'user' ? "bg-accent text-accent-foreground border-accent-foreground/10" : "bg-primary text-primary-foreground border-primary"
                                        )}>
                                            {m.role === 'user' ? <User className="w-4 h-4" /> : (
                                                !avatarError ? (
                                                    <motion.div
                                                        animate={{ scale: [1, 1.1, 1] }}
                                                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                                        className="w-full h-full"
                                                    >
                                                        <img src="/fortachin.png" alt="Bot" className="w-full h-full object-cover" />
                                                    </motion.div>
                                                ) : <Bot className="w-4 h-4" />
                                            )}
                                        </div>
                                        <div className={cn(
                                            "p-3 rounded-2xl text-sm whitespace-pre-wrap shadow-sm leading-relaxed",
                                            m.role === 'user'
                                                ? "bg-primary text-primary-foreground rounded-tr-sm"
                                                : "bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 rounded-tl-sm border border-stone-200 dark:border-stone-700 font-medium"
                                        )}>
                                            {m.role === 'assistant' ? (
                                                <div className="prose prose-sm dark:prose-invert max-w-none text-inherit">
                                                    <ReactMarkdown
                                                        components={{
                                                            strong: ({ ...props }) => <span className="font-bold text-primary" {...props} />,
                                                            ul: ({ ...props }) => <ul className="list-disc pl-4 my-0.5 space-y-0" {...props} />,
                                                            ol: ({ ...props }) => <ol className="list-decimal pl-4 my-0.5 space-y-0" {...props} />,
                                                            li: ({ ...props }) => <li className="pl-1 leading-tight" {...props} />,
                                                            p: ({ ...props }) => <p className="mb-1 last:mb-0 leading-tight" {...props} />,
                                                            h1: ({ ...props }) => <h3 className="font-bold text-sm mt-2 mb-0.5 text-primary" {...props} />,
                                                            h2: ({ ...props }) => <h3 className="font-bold text-sm mt-2 mb-0.5 text-primary" {...props} />,
                                                            h3: ({ ...props }) => <h3 className="font-bold text-sm mt-2 mb-0 text-primary" {...props} />,
                                                            h4: ({ ...props }) => <h4 className="font-bold text-xs mt-1.5 mb-0 text-primary uppercase tracking-wide" {...props} />,
                                                        }}
                                                    >
                                                        {m.content}
                                                    </ReactMarkdown>
                                                </div>
                                            ) : (
                                                m.content
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-2 mr-auto">
                                        <div className="bg-primary text-primary-foreground w-8 h-8 rounded-full flex items-center justify-center shrink-0">
                                            <Bot className="w-4 h-4" />
                                        </div>
                                        <div className="bg-secondary p-3 rounded-lg rounded-tl-none border border-border">
                                            <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
                                        </div>
                                    </div>
                                )}
                                {/* Dummy div to scroll to */}
                                <div ref={scrollRef} />
                            </div>
                        </ScrollArea>
                    </CardContent>

                    <CardFooter className="p-3 bg-muted/30 border-t border-border">
                        <div className="flex flex-col w-full gap-2">
                            <form onSubmit={handleSubmit} className="flex w-full gap-2">
                                <Input
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder="Pregunta sobre la carrera..."
                                    className="flex-1 bg-background"
                                />
                                <Button type="submit" size="icon" disabled={isLoading || !inputValue.trim()}>
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                            <div className="text-center">
                                <a
                                    href="https://flownexion.com/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                                >
                                    Powered by <span className="underline font-medium">Flownexion</span>
                                </a>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            )}
        </>
    );
}
