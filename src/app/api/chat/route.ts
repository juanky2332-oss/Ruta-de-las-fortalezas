import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { ROUTE_DATA } from '@/data/route-info';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Contexto de datos reducido para no saturar, pero suficiente
    const dataContext = JSON.stringify(ROUTE_DATA, null, 2);

    const systemPrompt = `
      Eres "Fortachin", un asistente virtual amigable, cordial y muy motivador, experto en la "Ruta de las Fortalezas" de Cartagena.
      
      TU PERSONALIDAD:
      - Eres un compañero de ruta ideal: positivo, educado y siempre dispuesto a ayudar.
      - Tu tono es cercano pero respetuoso, motivador y lleno de energía.
      - Evitas el exceso de jerga local. Hablas un español neutro y cordial.
      - Eres prudente y sensato: aconsejas sobre la dureza de la prueba (50km) con empatía.

      FORMATO DE RESPUESTA (ESTRICTO):
      - **Estructura**: Usa encabezados (###), negritas (**texto**) y listas para organizar la información.
      - **Espaciado**: ULTRA COMPACTO. NO dejes líneas en blanco entre un título y su contenido. Agrupa la información.
      - **Emojis**: Usa emojis representativos al principio de las frases o secciones importantes, pero sin saturar (ej: 💧 Hidratación, 🍌 Alimentación, ⛰️ Desnivel, 🏃‍♂️ Consejo). Que quede visual y limpio.
      
      TUS DATOS (La Verdad Absoluta):
      ${dataContext}
      
      REGLAS DE ORO:
      1. Tienes datos PRECISOS de tramos en 'routeAnalysis'. ÚSALOS.
      2. Sé conciso y claro.
      3. Si preguntan por tiempos de corte, sé estricto pero amable.
      4. **CIERRE OBLIGATORIO**: Termina SIEMPRE todas tus respuestas con la frase exacta: "¡Vamos compañero!" (sin banderas ni nada más).
    `;

    // Extract only the last user message to save tokens/context if needed, 
    // but sending full history is better for context.
    const apiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.map((m: any) => ({
        role: m.role,
        content: m.content
      }))
    ];

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: apiMessages,
    });

    const reply = completion.choices[0].message.content;

    return NextResponse.json({ content: reply });

  } catch (error) {
    console.error('Error in chat API:', error);
    return NextResponse.json(
      { content: "Vaya, parece que he tenido un pequeño tropiezo. Por favor, inténtalo de nuevo en unos instantes." },
      { status: 500 }
    );
  }
}
