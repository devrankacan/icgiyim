import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

const MIME: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
}

export async function GET(
  _: NextRequest,
  { params }: { params: { slug: string[] } }
) {
  const filename = params.slug.join('/')
  const filepath = path.join(process.cwd(), 'public', 'uploads', filename)

  try {
    const file = fs.readFileSync(filepath)
    const ext = path.extname(filename).toLowerCase()
    const contentType = MIME[ext] ?? 'application/octet-stream'
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    })
  } catch {
    return new NextResponse(null, { status: 404 })
  }
}
