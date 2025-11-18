import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Plus, Send, BookOpen, Copy, RotateCw, Sparkles, CheckCircle } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_PROMPTS = [
  "What does John 3:16 say?",
  "Explain the meaning of Psalm 23",
  "Who was John the Baptist?",
  "Compare Matthew 5:3-10 across versions",
  "What are the fruits of the Spirit?",
  "Explain the parable of the prodigal son"
];

export function UBotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText
    };
    
    setMessages([newMessage, ...messages]);
    setInputValue('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `In the Bible, there were two notable individuals named **John**:\n\n1. **John the Baptist**: He was a prophet and preacher who prepared the way for Jesus Christ's ministry (**Matthew 3:1-12**). He baptized Jesus in the Jordan River and is known for his message of repentance and forgiveness.\n\n2. **John the Apostle**: Also known as John the Evangelist, he was one of Jesus' twelve apostles and is believed to be the author of five books of the New Testament: the Gospel of **John**, **1 John**, **2 John**, **3 John**, and **Revelation**.\n\nYou can ask me follow-up questions to learn more about either John!`
      };
      setMessages([aiResponse, newMessage, ...messages]);
      setIsTyping(false);
    }, 1500);
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleRegenerate = () => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
    }, 1500);
  };

  // Parse message content for Bible references
  const parseMessageContent = (content: string) => {
    const parts = content.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const text = part.slice(2, -2);
        // Check if it looks like a Bible reference
        const isBibleRef = /^(1|2|3)?\s*[A-Z][a-z]+\s+\d+:\d+(-\d+)?$/.test(text) || 
                          /^(1|2|3)?\s*[A-Z][a-z]+$/.test(text);
        
        if (isBibleRef) {
          return (
            <span
              key={i}
              className="inline-flex items-center px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 cursor-pointer hover:bg-blue-500/30 transition-colors mx-1"
              onClick={() => {/* Navigate to Bible Reader */}}
            >
              {text}
            </span>
          );
        }
        return <strong key={i} className="text-white">{text}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="flex-1 flex flex-col min-h-full">
      {/* Header */}
      <header className="flex items-center justify-between px-3 md:px-8 py-3 md:py-4 border-b border-white/10 gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4 min-w-0">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 md:w-8 md:h-8 bg-white/10 rounded flex items-center justify-center flex-shrink-0">
              <MessageSquare className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-400" />
            </div>
            <div className="min-w-0">
              <h1 className="text-white text-lg md:text-2xl truncate">UBot</h1>
              <p className="text-gray-400 text-xs md:text-sm hidden sm:block">Your AI Bible study companion</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
          <button
            onClick={() => setMessages([])}
            className="flex items-center gap-1 md:gap-2 px-2 md:px-4 py-1.5 md:py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-gray-400 hover:text-white transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm hidden sm:inline">New Chat</span>
          </button>
        </div>
      </header>

      {/* Chat Messages - Reversed order (newest at top) */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col-reverse">
        {messages.length === 0 && !isTyping ? (
          // Empty State
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center h-full space-y-8"
          >
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/20 to-teal-500/20 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-blue-400" />
              </div>
              <h2 className="text-white text-2xl">Ask UBot Anything</h2>
              <p className="text-gray-400 max-w-md">
                Your AI companion for Bible study. Ask questions, explore verses, or dive deep into Scripture.
              </p>
            </div>

            <div className="w-full max-w-2xl">
              <p className="text-gray-500 text-sm mb-3">Suggested prompts:</p>
              <div className="grid grid-cols-2 gap-3">
                {SUGGESTED_PROMPTS.map((prompt, i) => (
                  <motion.button
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleSend(prompt)}
                    className="text-left p-4 rounded-xl bg-white/5 border border-white/10 hover:border-teal-500/50 hover:bg-white/10 transition-all group"
                  >
                    <div className="flex items-start gap-3">
                      <Sparkles className="w-4 h-4 text-gray-400 group-hover:text-teal-400 transition-colors mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{prompt}</span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {/* Typing Indicator */}
            <AnimatePresence>
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex justify-start"
                >
                  <div className="max-w-2xl rounded-2xl p-4 bg-[#2d4663]/80 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-teal-500/30 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-blue-400" />
                      </div>
                      <span className="text-white">UBot</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                          className="w-2 h-2 rounded-full bg-gray-400"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                          className="w-2 h-2 rounded-full bg-gray-400"
                        />
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                          className="w-2 h-2 rounded-full bg-gray-400"
                        />
                      </div>
                      <span className="text-gray-400 text-sm">UBot is thinking...</span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Messages */}
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} group`}
              >
                <div className="flex flex-col gap-2">
                  <div
                    className={`max-w-2xl rounded-2xl p-4 ${
                      message.role === 'user'
                        ? 'bg-teal-500/20 border border-teal-500/30'
                        : 'bg-[#2d4663]/80 border border-white/10'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/30 to-teal-500/30 flex items-center justify-center">
                          <BookOpen className="w-4 h-4 text-blue-400" />
                        </div>
                        <span className="text-white">UBot</span>
                      </div>
                    )}
                    {message.role === 'user' && (
                      <div className="flex items-center gap-2 mb-2 justify-end">
                        <span className="text-white text-sm">You</span>
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-teal-500 to-blue-500 flex items-center justify-center">
                          <span className="text-white text-xs">R</span>
                        </div>
                      </div>
                    )}
                    <div className="text-gray-200 whitespace-pre-wrap leading-relaxed">
                      {parseMessageContent(message.content)}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleCopy(message.content, message.id)}
                      className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs text-gray-400"
                    >
                      {copiedId === message.id ? (
                        <>
                          <CheckCircle className="w-3 h-3 text-green-400" />
                          <span className="text-green-400">Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copy</span>
                        </>
                      )}
                    </button>
                    {message.role === 'assistant' && (
                      <button
                        onClick={handleRegenerate}
                        className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors text-xs text-gray-400"
                      >
                        <RotateCw className="w-3 h-3" />
                        <span>Regenerate</span>
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="border-t border-white/10 p-6 bg-[#1a2942]/50 backdrop-blur-sm">
        {/* Action Buttons */}
        <div className="flex items-center gap-3 mb-4">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition-colors">
            <MessageSquare className="w-4 h-4" />
            <span className="text-sm">Chat</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
            <Plus className="w-4 h-4" />
            <span className="text-sm">Create Theme</span>
          </button>
          <div className="ml-auto">
            <button className="px-4 py-2 rounded-lg bg-white/5 text-gray-400 hover:bg-white/10 transition-colors">
              <span className="text-sm">📖 KJV</span>
            </button>
          </div>
        </div>

        {/* Input Field */}
        <div className="flex items-center gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask about the Bible..."
            className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:outline-none focus:border-teal-500/50 transition-colors"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputValue.trim() || isTyping}
            className="px-6 py-3 rounded-xl bg-teal-500 hover:bg-teal-600 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}