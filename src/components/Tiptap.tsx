'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

const Tiptap = () => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: '<p>Hello World! 🌎️</p>',
    editorProps:{
      attributes:{
        class:"rounded-md border min-h-[150px] border-input"
      }
    }
  })

  return <EditorContent editor={editor} />
}

export default Tiptap
