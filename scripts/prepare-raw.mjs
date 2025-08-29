import { promises as fs } from "fs"
import path from "path"

const SRC_DIR = path.join(process.cwd(), "content", "posts")
const OUT_DIR = path.join(process.cwd(), "public", "raw")

function isMarkdown(file) {
  return /\.(md|mdx)$/i.test(file)
}

async function ensureDir(dir) {
  try {
    await fs.mkdir(dir, { recursive: true })
  } catch {}
}

async function main() {
  await ensureDir(OUT_DIR)
  const entries = await fs.readdir(SRC_DIR)
  for (const file of entries) {
    if (!isMarkdown(file)) {
      throw new Error(`Invalid file in content/posts: ${file}. Only .md/.mdx allowed.`)
    }
    const src = path.join(SRC_DIR, file)
    const dest = path.join(OUT_DIR, file)
    await fs.copyFile(src, dest)
  }
  console.log(`Copied ${entries.length} files to public/raw`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
