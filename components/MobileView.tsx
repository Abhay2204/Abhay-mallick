'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

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

export default function MobileView() {
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
    scrollToBottom();
  }, [messages, isTyping]);

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

    // Smooth reveal over 6 seconds
    const responseId = Date.now() + 1;
    const fullText = selectedText;
    const totalDuration = 6000; // 6 seconds
    const interval = 50; // Update every 50ms
    const steps = totalDuration / interval;
    const charsPerStep = Math.ceil(fullText.length / steps);
    
    // Initial empty message for Abhay
    setMessages(prev => [...prev, { id: responseId, sender: 'abhay', text: "" }]);

    for (let i = 1; i <= steps; i++) {
      const currentPos = Math.min(i * charsPerStep, fullText.length);
      const visibleText = fullText.slice(0, currentPos);
      
      setMessages(prev => {
        return prev.map(m => m.id === responseId ? { ...m, text: visibleText } : m);
      });

      if (currentPos >= fullText.length) break;
      await new Promise(r => setTimeout(r, interval));
    }

    setIsTyping(false);
    
    // Play post-action video
    const postActions: (keyof typeof AVATAR_ASSETS)[] = ['speaker', 'stretch', 'yawn'];
    const randomAction = postActions[Math.floor(Math.random() * postActions.length)];
    playVideo(randomAction);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isTyping && !currentVideo) {
        if (Math.random() > 0.7) playVideo(Math.random() > 0.5 ? 'stretch' : 'yawn');
      }
    }, 15000);
    return () => clearInterval(interval);
  }, [isTyping, currentVideo]);

  return (
    <div className="fixed inset-0 z-[1000] bg-white flex flex-col md:hidden overflow-hidden font-sans select-none">

      <div className="flex-1 overflow-y-auto px-5 pt-6 pb-2 space-y-4 bg-white scroll-smooth">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${msg.sender === 'abhay' ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-[12px] leading-relaxed shadow-sm ${msg.sender === 'abhay'
                    ? 'bg-gray-50 text-graphite border border-gray-100 rounded-tl-none'
                    : 'bg-stormy-teal text-white rounded-tr-none font-bold'
                  }`}
                dangerouslySetInnerHTML={{ __html: msg.text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>').replace(/\*(.*?)\*/g, '<i>$1</i>') }}
              />
            </motion.div>
          ))}
          {isTyping && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
              <div className="bg-gray-50 px-4 py-2 rounded-xl flex gap-1 items-center">
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <span className="w-1 h-1 bg-gray-400 rounded-full animate-bounce" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={chatEndRef} className="h-6" />
      </div>

      <div className="relative w-full h-[20vh] bg-white flex items-center justify-center border-y border-gray-50">
        <div className="relative w-full h-full">
          <img src={AVATAR_ASSETS.idle} className="absolute inset-0 w-full h-full object-contain" alt="Avatar" />
          <video
            key={currentVideo || 'none'}
            src={currentVideo ? currentVideo : undefined}
            className={`absolute inset-0 w-full h-full object-contain bg-white transition-opacity duration-200 ${currentVideo ? 'opacity-100' : 'opacity-0'}`}
            autoPlay muted playsInline onEnded={() => setCurrentVideo(null)}
          />
        </div>
      </div>

      <div className="px-4 py-4 bg-white pb-12">
        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => handleAction('me')} className="px-3 py-3 bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-wider text-graphite border border-gray-200">
            🧔 Who is Abhay?
          </button>
          <button onClick={() => handleAction('experience')} className="px-3 py-3 bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-wider text-graphite border border-gray-200">
            💼 Experience
          </button>
          <button onClick={() => handleAction('tech')} className="px-3 py-3 bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-wider text-graphite border border-gray-200">
            ⚡ Tech Stack
          </button>
          <button onClick={() => handleAction('projects')} className="px-3 py-3 bg-gray-50 active:scale-95 transition-all rounded-xl text-[10px] font-black uppercase tracking-wider text-graphite border border-gray-200">
            🚀 Selected Works
          </button>
          <button onClick={() => handleAction('contact')} className="px-4 py-3 bg-graphite text-white active:scale-95 transition-all rounded-xl text-[11px] font-black uppercase tracking-widest col-span-2 flex items-center justify-center gap-2 border-b-4 border-black">
            ✉️ REACH OUT
          </button>
        </div>
      </div>

    </div>
  );
}
