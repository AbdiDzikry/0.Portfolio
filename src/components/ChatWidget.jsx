import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Sparkles, User, Bot, Maximize2, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { sendMessageToAI } from '../utils/chatService';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const ChatWidget = ({ isOpen, onClose, onToggle }) => {
    const { language } = useLanguage();
    const t = translations[language].chat;

    const [messages, setMessages] = useState([
        { role: 'assistant', content: t.greet }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const messagesEndRef = useRef(null);

    // Update initial message when language changes if no other messages exist
    useEffect(() => {
        if (messages.length === 1 && messages[0].role === 'assistant') {
            setMessages([{ role: 'assistant', content: t.greet }]);
        }
    }, [language, t.greet, messages.length]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isExpanded]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim()) return;

        const userMsg = { role: 'user', content: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            // Use real service (logic handles if API key is missing)
            const responseText = await sendMessageToAI(input);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: responseText
            }]);
        } catch (error) {
            console.error("Chat Widget Error:", error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Error: ${error.message || "Something went wrong. Please check your connection or API Key."}`
            }]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className={`fixed z-50 flex flex-col items-end pointer-events-none transition-all duration-300
            ${isExpanded ? 'top-0 right-0 h-full' : 'bottom-6 right-6'}`}
        >

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className={`pointer-events-auto bg-bg-card/90 backdrop-blur-xl border border-border/50 shadow-2xl overflow-hidden flex flex-col mb-4 origin-bottom-right transition-all duration-300
                            ${isExpanded
                                ? 'w-[400px] h-full rounded-none border-l border-y-0 border-r-0 mb-0'
                                : 'w-[300px] md:w-[360px] h-[400px] max-h-[80vh] rounded-2xl'
                            }`}
                    >
                        {/* Header */}
                        <div className="p-4 border-b border-border/50 bg-bg-secondary/50 flex items-center justify-between shrink-0">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-accent-blue to-purple-500 flex items-center justify-center text-white shadow-lg shadow-accent-blue/20">
                                    <Sparkles size={16} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-text-primary text-sm">Ningsih</h3>
                                    <p className="text-xs text-text-muted flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                        {t.online}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <button
                                    onClick={() => setIsExpanded(!isExpanded)}
                                    className="p-2 hover:bg-white/5 rounded-full text-text-muted hover:text-text-primary transition-colors"
                                    title={isExpanded ? t.collapse : t.expand }
                                >
                                    {isExpanded ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                                </button>
                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-white/5 rounded-full text-text-muted hover:text-text-primary transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 scroll-smooth">
                            {messages.map((msg, idx) => (
                                <div
                                    key={idx}
                                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 
                                        ${msg.role === 'user' ? 'bg-bg-secondary text-text-muted' : 'bg-accent-blue/10 text-accent-blue'}`}
                                    >
                                        {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                                    </div>
                                    <div
                                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm leading-relaxed overflow-hidden
                                        ${msg.role === 'user'
                                                ? 'bg-text-primary text-bg-primary rounded-tr-none'
                                                : 'bg-bg-secondary/80 border border-border/50 text-text-secondary rounded-tl-none'}`}
                                    >
                                        <ReactMarkdown
                                            components={{
                                                strong: ({ node, ...props }) => <span className="font-bold text-text-primary" {...props} />,
                                                ul: ({ node, ...props }) => <ul className="list-disc pl-4 mt-2 mb-2 space-y-1" {...props} />,
                                                ol: ({ node, ...props }) => <ol className="list-decimal pl-4 mt-2 mb-2 space-y-1" {...props} />,
                                                li: ({ node, ...props }) => <li className="mb-0.5" {...props} />,
                                                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                                                a: ({ node, ...props }) => <a className="text-accent-blue underline hover:text-accent-blue/80" target="_blank" rel="noopener noreferrer" {...props} />
                                            }}
                                        >
                                            {msg.content}
                                        </ReactMarkdown>
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex gap-3">
                                    <div className="w-8 h-8 rounded-full bg-accent-blue/10 text-accent-blue flex items-center justify-center shrink-0">
                                        <Bot size={14} />
                                    </div>
                                    <div className="bg-bg-secondary/80 border border-border/50 rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                        <span className="w-1.5 h-1.5 bg-text-muted rounded-full animate-bounce"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <form onSubmit={handleSend} className="p-3 border-t border-border/50 bg-bg-secondary/30 shrink-0">
                            <div className="relative flex items-center">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    placeholder={t.inputPlaceholder}
                                    className="w-full bg-bg-primary border border-border/50 rounded-full pl-4 pr-10 py-2 text-xs text-text-primary focus:outline-none focus:border-accent-blue/50 focus:ring-1 focus:ring-accent-blue/50 transition-all placeholder:text-text-muted/50"
                                />
                                <button
                                    type="submit"
                                    disabled={!input.trim() || isTyping}
                                    className="absolute right-1.5 p-1.5 bg-accent-blue text-white rounded-full hover:bg-accent-blue/90 disabled:opacity-50 disabled:hover:bg-accent-blue transition-all shadow-lg shadow-accent-blue/20"
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                            <div className="text-center mt-2">
                                <p className="text-[10px] text-text-muted/50">
                                    {t.poweredBy}
                                </p>
                            </div>
                        </form>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Toggle Button - MOBILE ONLY (Hidden if Expanded) */}
            {!isExpanded && (
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggle}
                    className="pointer-events-auto md:hidden bg-text-primary text-bg-primary p-3 rounded-full shadow-2xl hover:shadow-white/10 transition-shadow relative group"
                >
                    <div className="absolute inset-0 rounded-full bg-white/20 animate-ping opacity-20 group-hover:opacity-40"></div>
                    {isOpen ? <X size={20} /> : <MessageSquare size={20} />}
                </motion.button>
            )}
        </div>
    );
};

export default ChatWidget;
