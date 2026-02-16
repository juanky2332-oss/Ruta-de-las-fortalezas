import { ImageResponse } from 'next/og'
import { join } from 'node:path'
import { readFile } from 'node:fs/promises'

export const runtime = 'nodejs'

export const alt = 'Ruta de las Fortalezas 2026 - Flownexion'
export const size = {
    width: 1200,
    height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
    // Read the logo file from the public directory
    const logoPath = join(process.cwd(), 'public', 'fortalezas-logo.jpg')
    const logoData = await readFile(logoPath)
    const logoBase64 = `data:image/jpeg;base64,${logoData.toString('base64')}`

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <img
                    src={logoBase64}
                    style={{
                        objectFit: 'contain',
                        width: '80%',
                        height: '80%',
                    }}
                />
            </div>
        ),
        {
            ...size,
        }
    )
}
