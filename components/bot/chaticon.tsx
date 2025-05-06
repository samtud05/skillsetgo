"use client"

import { MessageCircle, X } from "lucide-react"

interface ChatIconProps {
  isOpen: boolean
  onClick: () => void
}

export default function ChatIcon({ isOpen, onClick }: ChatIconProps) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:bg-emerald-600 transition-all z-50"
      aria-label={isOpen ? "Close chat" : "Open chat"}
    >
      {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
    </button>
  )
}
