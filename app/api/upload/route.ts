import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads")

async function ensureDir(dir: string) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
}

function safeName(name: string): string {
  const dot = name.lastIndexOf(".")
  const base = (dot >= 0 ? name.slice(0, dot) : name).toLowerCase().replace(/[^a-z0-9-_]+/g, "-")
  const ext = dot >= 0 ? name.slice(dot).toLowerCase() : ""
  return `${base}-${Date.now()}${ext}`
}

export async function POST(request: Request) {
  const contentType = request.headers.get("content-type") || ""
  if (!contentType.includes("multipart/form-data")) {
    return NextResponse.json({ error: "Expected multipart/form-data" }, { status: 415 })
  }

  await ensureDir(UPLOADS_DIR)
  const form = await request.formData()
  const file = form.get("file") as File | null
  if (!file) return NextResponse.json({ error: "file is required" }, { status: 400 })

  const buffer = Buffer.from(await file.arrayBuffer())
  const name = safeName(file.name)
  const dest = path.join(UPLOADS_DIR, name)
  await fs.writeFile(dest, buffer)

  const url = `/uploads/${name}`
  return NextResponse.json({ ok: true, url })
}
