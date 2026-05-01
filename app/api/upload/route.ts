import { NextRequest, NextResponse } from 'next/server'
import { writeFile, mkdir } from 'fs/promises'
import path from 'path'

export async function POST(req: NextRequest) {
  try {
    const { file, filename, type } = await req.json()

    if (!file || !filename || !type) {
      return NextResponse.json({ error: 'Eksik veri' }, { status: 400 })
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/jpg']
    if (!allowedTypes.includes(type)) {
      return NextResponse.json({ error: 'Sadece JPG, PNG, WebP yüklenebilir' }, { status: 400 })
    }

    const base64Data = file.split(',')[1]
    if (!base64Data) {
      return NextResponse.json({ error: 'Geçersiz dosya formatı' }, { status: 400 })
    }

    const buffer = Buffer.from(base64Data, 'base64')

    if (buffer.length > 5 * 1024 * 1024) {
      return NextResponse.json({ error: 'Dosya boyutu 5MB\'ı geçemez' }, { status: 400 })
    }

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads')
    await mkdir(uploadsDir, { recursive: true })

    const ext = path.extname(filename).toLowerCase() || '.jpg'
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`
    await writeFile(path.join(uploadsDir, uniqueName), buffer)

    return NextResponse.json({ url: `/uploads/${uniqueName}` })
  } catch (err) {
    console.error('Upload error:', err)
    return NextResponse.json({ error: 'Sunucu hatası' }, { status: 500 })
  }
}
