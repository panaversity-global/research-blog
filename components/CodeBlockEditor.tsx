"use client"

import { useState, useRef } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { 
  Code, 
  Copy, 
  Check, 
  ChevronDown, 
  Play,
  Settings,
  FileCode
} from 'lucide-react'

interface CodeBlockEditorProps {
  onInsert: (code: string, language: string) => void
}

const SUPPORTED_LANGUAGES = [
  { value: 'javascript', label: 'JavaScript', icon: '⚡' },
  { value: 'typescript', label: 'TypeScript', icon: '🔷' },
  { value: 'jsx', label: 'JSX', icon: '⚛️' },
  { value: 'tsx', label: 'TSX', icon: '🔷⚛️' },
  { value: 'python', label: 'Python', icon: '🐍' },
  { value: 'java', label: 'Java', icon: '☕' },
  { value: 'cpp', label: 'C++', icon: '⚙️' },
  { value: 'csharp', label: 'C#', icon: '🔷' },
  { value: 'php', label: 'PHP', icon: '🐘' },
  { value: 'ruby', label: 'Ruby', icon: '💎' },
  { value: 'go', label: 'Go', icon: '🐹' },
  { value: 'rust', label: 'Rust', icon: '🦀' },
  { value: 'swift', label: 'Swift', icon: '🍎' },
  { value: 'kotlin', label: 'Kotlin', icon: '📱' },
  { value: 'scala', label: 'Scala', icon: '⚡' },
  { value: 'r', label: 'R', icon: '📊' },
  { value: 'matlab', label: 'MATLAB', icon: '🔬' },
  { value: 'sql', label: 'SQL', icon: '🗄️' },
  { value: 'html', label: 'HTML', icon: '🌐' },
  { value: 'css', label: 'CSS', icon: '🎨' },
  { value: 'scss', label: 'SCSS', icon: '🎨' },
  { value: 'json', label: 'JSON', icon: '📄' },
  { value: 'yaml', label: 'YAML', icon: '📋' },
  { value: 'xml', label: 'XML', icon: '📄' },
  { value: 'markdown', label: 'Markdown', icon: '📝' },
  { value: 'bash', label: 'Bash', icon: '💻' },
  { value: 'powershell', label: 'PowerShell', icon: '💻' },
  { value: 'dockerfile', label: 'Dockerfile', icon: '🐳' },
  { value: 'gitignore', label: 'Git Ignore', icon: '🚫' },
  { value: 'diff', label: 'Diff', icon: '📊' },
  { value: 'ini', label: 'INI', icon: '⚙️' },
  { value: 'toml', label: 'TOML', icon: '⚙️' },
  { value: 'shell', label: 'Shell', icon: '💻' },
  { value: 'text', label: 'Plain Text', icon: '📄' }
]

const LANGUAGE_TEMPLATES = {
  javascript: `// JavaScript code example
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));`,
  
  typescript: `// TypeScript code example
interface User {
  name: string;
  age: number;
}

function greetUser(user: User): string {
  return \`Hello, \${user.name}! You are \${user.age} years old.\`;
}`,
  
  python: `# Python code example
def greet(name):
    return f"Hello, {name}!"

print(greet("World"))`,
  
  java: `// Java code example
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  
  html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Example</title>
</head>
<body>
    <h1>Hello, World!</h1>
</body>
</html>`,
  
  css: `/* CSS example */
.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.button {
    background: #007bff;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
}`,
  
  sql: `-- SQL example
SELECT 
    u.name,
    u.email,
    COUNT(o.id) as order_count
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
WHERE u.active = true
GROUP BY u.id, u.name, u.email
ORDER BY order_count DESC;`,
  
  bash: `#!/bin/bash
# Bash script example
echo "Hello, World!"

# Check if directory exists
if [ -d "/tmp" ]; then
    echo "Directory /tmp exists"
else
    echo "Directory /tmp does not exist"
fi`,
  
  dockerfile: `# Dockerfile example
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]`
}

export default function CodeBlockEditor({ onInsert }: CodeBlockEditorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('javascript')
  const [code, setCode] = useState(LANGUAGE_TEMPLATES.javascript)
  const [copied, setCopied] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleLanguageChange = (language: string) => {
    setSelectedLanguage(language)
    if (LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES]) {
      setCode(LANGUAGE_TEMPLATES[language as keyof typeof LANGUAGE_TEMPLATES])
    } else {
      setCode(`// ${language} code\n// Start writing your code here...`)
    }
    setIsOpen(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleInsert = () => {
    const codeBlock = `\`\`\`${selectedLanguage}\n${code}\n\`\`\``
    onInsert(codeBlock, selectedLanguage)
  }

  const handleReset = () => {
    setCode(LANGUAGE_TEMPLATES[selectedLanguage as keyof typeof LANGUAGE_TEMPLATES] || '')
  }

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.value === selectedLanguage)

  return (
    <div className="bg-card border border-border/50 rounded-2xl p-6 shadow-lg shadow-black/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-purple-500/10 rounded-lg flex items-center justify-center">
            <FileCode className="w-4 h-4 text-purple-500" />
          </div>
          <h2 className="text-xl font-semibold">Code Block Editor</h2>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="px-3 py-1.5 text-sm bg-muted/50 hover:bg-muted rounded-lg transition-colors flex items-center space-x-2"
          >
            <Code className="w-4 h-4" />
            <span>{showPreview ? 'Hide' : 'Show'} Preview</span>
          </button>
        </div>
      </div>

      {/* Language Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-foreground mb-2">
          Programming Language
        </label>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-full px-4 py-3 rounded-xl bg-muted/50 border border-border/50 hover:border-border transition-colors flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <span className="text-lg">{currentLanguage?.icon}</span>
              <span>{currentLanguage?.label}</span>
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
          
          {isOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border/50 rounded-xl shadow-lg z-50 max-h-60 overflow-y-auto">
              {SUPPORTED_LANGUAGES.map((language) => (
                <button
                  key={language.value}
                  onClick={() => handleLanguageChange(language.value)}
                  className="w-full px-4 py-3 text-left hover:bg-muted/50 transition-colors flex items-center space-x-2 border-b border-border/50 last:border-b-0"
                >
                  <span className="text-lg">{language.icon}</span>
                  <span>{language.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Code Editor */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-foreground">
            Code Content
          </label>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleReset}
              className="px-2 py-1 text-xs bg-muted/50 hover:bg-muted rounded transition-colors"
            >
              Reset
            </button>
            <button
              onClick={handleCopy}
              className="px-2 py-1 text-xs bg-muted/50 hover:bg-muted rounded transition-colors flex items-center space-x-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
        </div>
        
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full h-64 px-4 py-4 rounded-xl bg-muted/30 font-mono border border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200 resize-none"
          placeholder="Enter your code here..."
        />
      </div>

      {/* Code Preview */}
      {showPreview && (
        <div className="mb-4">
          <label className="block text-sm font-medium text-foreground mb-2">
            Preview
          </label>
          <div className="rounded-xl overflow-hidden border border-border/50">
            <SyntaxHighlighter
              language={selectedLanguage}
              style={oneDark}
              customStyle={{
                margin: 0,
                borderRadius: '0.75rem',
                fontSize: '14px',
                lineHeight: '1.5'
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          <span className="flex items-center space-x-1">
            <span>📝</span>
            <span>{code.length} characters</span>
          </span>
        </div>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleInsert}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 transition-all duration-200 font-medium flex items-center space-x-2 shadow-sm"
          >
            <Code className="w-4 h-4" />
            <span>Insert Code Block</span>
          </button>
        </div>
      </div>
    </div>
  )
}
