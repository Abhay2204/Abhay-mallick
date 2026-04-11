'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AVATAR_ASSETS = {
  idle: '/mobile/commo image.png',
  typing: ['/mobile/typing1.mp4', '/mobile/typing2.mp4'],
  stretch: '/mobile/body strech.mp4',
  yawn: '/mobile/yawing.mp4',
  speaker: '/mobile/speaker up.mp4',
};

const RESPONSES = {
  me: {
    normal: [
      { text: "I am **Abhay Mallick**, a *Full Stack Developer* and *Product Engineer* specializing in high-performance digital solutions. My expertise lies in building seamless, full-scale applications using **Next.js**, **React**, and **Vue.js**, backed by robust **Node.js/Express** architectures." },
      { text: "I build the things others find too complex. My work is defined by a deep understanding of **Modern Web Stacks** — specifically **Next.js 15**, **TypeScript**, and **Cloud Scalability (AWS)**. I engineer products that handle real-world scale with optimized **MongoDB/SQL** backends." }
    ],
    funny: [
      { text: "Besides being a dev, I'm also really good at making coffee disappear and turning bugs into 'features'. If you're looking for someone who can code and keep the vibes high, you've found him. Maybe we should stop talking about code for a second? 😉" }
    ],
    annoyed: [
      { text: "Still checking who I am? I haven't changed! I'm **Abhay Mallick**, a developer who builds things that don't break. Now, pick a different button." },
      { text: "Are you trying to find a secret bio? I specialize in **Next.js and Node.js**. That's the bio. Now explore my **Works**." },
      { text: "Okay, you're either a fan of my name or you're stuck. Check out my **Tech Stack** to see how I actually build things." }
    ]
  },

  experience: {
    normal: [
      { text: "My professional journey covers everything from **Enterprise CRMs** to **E-commerce platforms**. I've mastered the development lifecycle, ensuring architectural integrity and high availability on **AWS**." },
      { text: "Successfully delivered over **50+ projects**, utilizing **Modern DevOps** and **Cloud Workflows**. I specialize in moving fast using **Node.js** and **React** without compromising on quality." }
    ],
    funny: [
      { text: "My experience includes surviving 2,000+ merge conflicts and only crying twice. I'm basically a veteran in the 'JavaScript fatigue' wars. 😉" }
    ],
    annoyed: [
      { text: "My experience isn't going to grow just because you keep clicking. I've built 50+ projects, interned at Inspire, and now I'm here." },
      { text: "I can't add an internship mid-conversation! **Jul-Dec 2024 at Inspire**, **Jan-Jun 2024 trainee**. That's it." },
      { text: "Is my timeline not impressive enough? I've been grinding in the **MERN** stack for 2+ years. Pressing this won't make it 3 years yet!" }
    ]
  },

  projects: {
    normal: [
      { text: "My flagship project is **Cosmic IDE**, a powerful tool with **full debugging**, **native execution**, and an **extension ecosystem**. It even features **AI-native file creation**." },
      { text: "I've also built **TAFE CRM**, **Nexus AI**, and **InsightFlow**. I prioritize **PostgreSQL/MongoDB** and **AWS** for global scaling and security." }
    ],
    funny: [
      { text: "I build so many projects that my keyboard is starting to file for a restraining order. But hey, at least the code is clean! 😉" }
    ],
    annoyed: [
      { text: "Cosmic IDE is still my flagship. Maybe it's time to stop clicking and actually **Reach Out**?" },
      { text: "Still looking for **The One Project**? They're all good! **TAFE CRM**, **Nexus AI**, **Cosmic IDE**... they demonstrate everything I do." },
      { text: "Spamming my projects won't manifest a new one. I'm currently working on something big, but it's not ready yet!" }
    ]
  },

  tech: {
    normal: [
      { text: "My stack: **Next.js**, **React**, **Vue.js**, **Node.js**, and **Express.js**. I handle both **MongoDB** and **SQL** database designs." },
      { text: "I leverage **AWS** for infrastructure, focusing on **Serverless**, **SSR**, and **Real-time systems**. My frontend is powered by **Framer Motion** and **GSAP**." }
    ],
    funny: [
      { text: "I speak fluent JavaScript, but my true talent is making a white screen turn into a functional app without using 'important!' in CSS... mostly. 😉" }
    ],
    annoyed: [
      { text: "Next.js, React, Node, AWS... the list is the same. I promise my stack didn't suddenly include COBOL." },
      { text: "TypeScript, MongoDB, Postgres... I haven't switched to PHP in the last 5 seconds. Now, click **Who is Abhay?**." },
      { text: "I'm a modern developer. My stack is **Next.js 15**. That's the bleeding edge. There's nothing newer to show right now!" }
    ]
  },

  contact: {
    normal: [
      { text: "Ready to build something superior? Connect at **abhaymallick.dev@gmail.com** or call me at **+91 84218 22204**." },
      { text: "Explore my work on **GitHub (@Abhay2204)** or connect on **LinkedIn**. I'm always open to high-impact collaborations." }
    ],
    funny: [
      { text: "I'm great at replying to emails, but I'm even better at helping you win that 'who has the coolest app' competition. Call me? 😉" }
    ],
    annoyed: [
      { text: "If you want to talk to me, just send the email! **abhaymallick.dev@gmail.com** — it's right there!" },
      { text: "Are you testing the hover state or do you actually want to collaborate? Email is **abhaymallick.dev@gmail.com**." },
      { text: "You've found my contact info 4 times now. What's the hold up? **Reach Out** properly!" }
    ]
  }
};

interface Message {
  id: number;
  sender: 'abhay' | 'user';
  text: string;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: 'abhay', text: "I am **Abhay Mallick**. I engineer scalable systems and high-end digital experiences. What would you like to verify?" }
  ]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [buttonCount, setButtonCount] = useState<Record<string, number>>({});
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const playVideo = (type: keyof typeof AVATAR_ASSETS) => {
    const asset = AVATAR_ASSETS[type];
    const source = Array.isArray(asset) ? asset[Math.floor(Math.random() * asset.length)] : asset;
    setCurrentVideo(source as string);
  };

  const handleAction = async (category: keyof typeof RESPONSES) => {
    if (isTyping) return;

    const newCounts = { ...buttonCount, [category]: (buttonCount[category] || 0) + 1 };
    setButtonCount(newCounts);

    const count = newCounts[category];
    const catPool = RESPONSES[category as keyof typeof RESPONSES];
    let selectedText = "";

    if (count <= 2) {
      selectedText = catPool.normal[count - 1]?.text || catPool.normal[0].text;
    } else if (count === 3) {
      selectedText = catPool.funny[0].text;
    } else {
      const idx = Math.floor(Math.random() * catPool.annoyed.length);
      selectedText = catPool.annoyed[idx].text;
    }

    const userLabel = category === 'me' ? "Who is Abhay?" :
      category === 'projects' ? "Recent Projects" :
      category === 'tech' ? "Your Tech Stack" :
      category === 'experience' ? "Work Experience" : "Get in Touch";

    const promptId = Date.now();
    setMessages(prev => [...prev, { id: promptId, sender: 'user', text: userLabel }]);
    
    setIsTyping(true);
    playVideo('typing');

    const responseId = Date.now() + 1;
    setMessages(prev => [...prev, { id: responseId, sender: 'abhay', text: "" }]);

    const totalDuration = 6000;
    const interval = 50;
    const steps = totalDuration / interval;
    const charsPerStep = Math.ceil(selectedText.length / steps);
    
    for (let i = 1; i <= steps; i++) {
      const currentPos = Math.min(i * charsPerStep, selectedText.length);
      const visibleText = selectedText.slice(0, currentPos);
      setMessages(prev => prev.map(m => m.id === responseId ? { ...m, text: visibleText } : m));
      if (currentPos >= selectedText.length) break;
      await new Promise(r => setTimeout(r, interval));
    }

    setIsTyping(false);
    const postActions: (keyof typeof AVATAR_ASSETS)[] = ['speaker', 'stretch', 'yawn'];
    playVideo(postActions[Math.floor(Math.random() * postActions.length)]);
  };

  return (
    <>
      {/* Floating Button Animation */}
      <div className="fixed bottom-8 right-8 z-[2000] hidden md:block">
        <motion.button
          onClick={() => setIsOpen(true)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative w-16 h-16 bg-graphite rounded-full shadow-2xl flex items-center justify-center border-2 border-white overflow-hidden group shadow-[0_15px_30px_rgba(0,0,0,0.3)]"
        >
          <img
            src="/chatbot.gif"
            alt="Chatbot Icon"
            className="absolute inset-0 w-full h-full object-cover rounded-full"
          />
          <div className="absolute inset-0 bg-stormy-teal/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <motion.div 
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute top-1 right-1 w-3 h-3 bg-teal-400 rounded-full border border-white z-20" 
          />
        </motion.button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[3000] bg-graphite/40 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-[900px] h-[85vh] rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-row border border-white/20"
            >
              {/* Left Side - Avatar (Fixed) */}
              <div className="w-[45%] bg-white relative flex items-center justify-center border-r border-gray-50 overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center p-8">
                    <img src={AVATAR_ASSETS.idle} className="w-full h-full object-contain" alt="Abhay Avatar" />
                    <video
                        key={currentVideo || 'none'}
                        src={currentVideo || undefined}
                        className={`absolute inset-0 w-full h-full object-contain bg-white transition-opacity duration-300 ${currentVideo ? 'opacity-100' : 'opacity-0'}`}
                        autoPlay muted playsInline onEnded={() => setCurrentVideo(null)}
                    />
                </div>
                <div className="absolute top-10 left-10 flex items-center gap-3">
                    <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-graphite/40">Abhay Mallick • Live AI Agent</span>
                </div>
              </div>

              {/* Right Side - Chat Interface */}
              <div className="flex-1 flex flex-col bg-white">
                {/* Header */}
                <div className="px-10 py-8 flex items-center justify-between border-b border-gray-50">
                    <div>
                        <h3 className="text-xl font-black uppercase tracking-tighter text-graphite">Interactive Concierge</h3>
                        <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Ask anything about my background</p>
                    </div>
                    <button 
                        onClick={() => setIsOpen(false)}
                        className="w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-xl transition-colors"
                    >
                        ✕
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-8 py-6 space-y-4 scroll-smooth">
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, x: msg.sender === 'abhay' ? -20 : 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className={`flex ${msg.sender === 'abhay' ? 'justify-start' : 'justify-end'}`}
                        >
                            <div 
                                className={`max-w-[85%] px-5 py-3 rounded-3xl text-[13px] leading-relaxed shadow-sm ${
                                    msg.sender === 'abhay' 
                                        ? 'bg-gray-50 text-graphite border border-gray-100 rounded-tl-none font-medium' 
                                        : 'bg-graphite text-white rounded-tr-none font-bold'
                                }`}
                                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>') }}
                            />
                        </motion.div>
                    ))}
                    {isTyping && (
                        <div className="flex justify-start">
                            <div className="bg-gray-50 px-4 py-2 rounded-2xl flex gap-1 items-center">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>

                {/* Footer Controls */}
                <div className="p-8 bg-gray-50/50 border-t border-gray-50">
                    <div className="grid grid-cols-2 gap-3">
                        <button onClick={() => handleAction('me')} className="px-4 py-3 bg-white hover:bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-graphite shadow-sm border border-gray-100">
                            🧔 WHO IS ABHAY?
                        </button>
                        <button onClick={() => handleAction('experience')} className="px-4 py-3 bg-white hover:bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-graphite shadow-sm border border-gray-100">
                            💼 EXPERIENCE
                        </button>
                        <button onClick={() => handleAction('tech')} className="px-4 py-3 bg-white hover:bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-graphite shadow-sm border border-gray-100">
                            ⚡ TECH STACK
                        </button>
                        <button onClick={() => handleAction('projects')} className="px-4 py-3 bg-white hover:bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-widest text-graphite shadow-sm border border-gray-100">
                            🚀 SELECTED WORKS
                        </button>
                        <button onClick={() => handleAction('contact')} className="px-6 py-4 bg-graphite text-white hover:bg-black active:scale-95 transition-all rounded-xl text-[11px] font-black uppercase tracking-[0.2em] col-span-2 flex items-center justify-center gap-3 border-b-4 border-black shadow-xl">
                            ✉️ REACH OUT TO ABHAY
                        </button>
                    </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
