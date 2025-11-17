import React from 'react'
import { useRef , useEffect , useState } from 'react';

const ChatBox = () => {

 const chatContainerRef = useRef(null);  
   const [chat, setChat] = useState([]);
   const [input, setInput] = useState("");
  // Auto-scroll to bottom when chat updates
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chat]); // This runs every time chat changes

   // Clear chat history on component mount (refresh)
  useEffect(() => {
    setChat([]);
    localStorage.removeItem("chatHistory");
  }, []);


  // Save chat history
  useEffect(() => {
    if (chat.length > 0) {
      localStorage.setItem("chatHistory", JSON.stringify(chat));
    }
  }, [chat]);
    const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = { sender: "user", text: input };
    let botReply = "Hmm, interesting question!";
    if (input.toLowerCase().includes("experience"))
      botReply = "Rahul has strong experience in full-stack web development.";
    else if (input.toLowerCase().includes("project"))
      botReply = "Rahul is most proud of his Library Management and Flask-based systems.";
    else if (input.toLowerCase().includes("free"))
      botReply = "In his free time, Rahul experiments with new tech stacks.";
    else if (input.toLowerCase().includes("hi") || input.toLowerCase().includes("hello"))
      botReply = "Hey there! How can I help you today?";
    const botMsg = { sender: "bot", text: botReply };
    setChat([...chat, userMsg, botMsg]);
    setInput("");
  };

    
    {/* Chatbox */}  
  return (
        <div className="bg-[var(--bg2)] backdrop-blur-lg border border-white/10 rounded-2xl p-3 md:p-4 w-full max-w-md md:max-w-lg flex flex-col shadow-lg mt-4 md:mt-0 " data-aos="fade-right" data-aos-duration="1000">
          <div ref={chatContainerRef} className="flex-1 overflow-y-auto mb-3 m-3 space-y-2 text-left max-h-40 md:max-h-48 p-3">
            
            {chat.length === 0 ? (
              <div className="text-center text-[var(--text2)] py-4">
                Start a conversation...
              </div>
            ) : (
              chat.map((msg, i) => (
                <div
                  key={i}
                  className={`p-2 rounded-lg max-w-[80%] text-sm md:text-base ${
                    msg.sender === "user"
                      ? "bg-white/10 self-end ml-auto text-right"
                      : "bg-white/5 self-start text-left"
                  }`}
                >
                    
                  {msg.text}
                </div>
              ))
            )}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 rounded-lg bg-transparent border border-white/20 outline-none text-white text-sm md:text-base"
              placeholder="Ask me anything..."
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="px-3 md:px-4 py-2 bg-white/10 rounded-lg hover:bg-white/20 transition text-sm md:text-base"
            >
              ➤
            </button>
          </div>
        </div>
  )
}

export default ChatBox