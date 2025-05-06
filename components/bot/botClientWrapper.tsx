'use client';

import { useState } from 'react';
import ChatIcon from './chaticon';
import ChatWindow from './chatwindow';

export default function BotClientWrapper() {
    const [isChatOpen, setIsChatOpen] = useState(false)

    const toggleChat = () => {
      setIsChatOpen(!isChatOpen)
    }

  return (
    <div>
      <ChatIcon isOpen={isChatOpen} onClick={toggleChat} />
      {isChatOpen && <ChatWindow onClose={toggleChat} />}
    </div>
  );
}
