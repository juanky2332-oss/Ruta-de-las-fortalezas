import { HeroSection } from "@/components/hero-section";
import { RouteDetails } from "@/components/route-details";
import { ElevationProfile } from "@/components/elevation-profile";
import { StrategyCalculator } from "@/components/strategy-calculator";
import { VeteranChat } from "@/components/veteran-chat";
import { BackgroundMusicPlayer } from "@/components/background-music-player";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-accent selection:text-white">
      <HeroSection />
      <RouteDetails />
      <div className="bg-gradient-to-b from-background to-secondary/20 bg-cartagena-subtle bg-cartagena-2">
        <ElevationProfile />
      </div>
      <StrategyCalculator />

      <VeteranChat />
      <BackgroundMusicPlayer />

      <footer className="py-12 text-center bg-stone-950 border-t border-stone-800">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          {/* Flownexion Promo Section */}
          <div className="rounded-2xl p-8 space-y-4 border-2" style={{ background: 'linear-gradient(135deg, #0a1628 0%, #1a2332 100%)', borderColor: '#2563eb' }}>
            <a
              href="https://flownexion.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block hover:scale-105 transition-transform"
            >
              <div className="flex items-center justify-center mb-4">
                <img
                  src="/logo flownexion letras en blanco.jpeg"
                  alt="Flownexion"
                  className="h-24 object-contain mix-blend-screen"
                />
              </div>
            </a>
            <h3 className="text-xl font-bold text-white">
              ¿Tu empresa ya aprovecha la IA o sigue perdiendo horas en procesos obsoletos?
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Creamos automatizaciones e IA a medida que devuelven el tiempo a tu equipo y optimizan cada proceso.
            </p>
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-400 font-medium animate-pulse">
                ¿Hablamos de tu caso? 👇
              </span>
              <a
                href="mailto:juancarlos@flownexion.com"
                className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
                style={{
                  background: 'linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%)',
                  color: 'white'
                }}
              >
                <span className="text-2xl group-hover:rotate-12 transition-transform">✉️</span>
                <span>Contáctanos</span>
                <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-colors" />
              </a>
            </div>
          </div>

          {/* Original Footer */}
          <div className="text-sm text-muted-foreground space-y-2">
            <p>
              Hecho con ❤️ para la Ruta de las Fortalezas 2026 por{' '}
              <a
                href="https://flownexion.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 font-semibold transition-colors underline"
              >
                Flownexion
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
