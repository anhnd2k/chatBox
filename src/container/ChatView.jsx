import axios from "axios";
import React from "react";
import { useEffect, useState } from "react/cjs/react.development";
import "../base/chatview.css";

function ChatView() {
  const [user, setUser] = useState('')
  useEffect(() => {
        setUser('user_' + new Date().getTime())
  }, [])
  const [messages, setMessages] = useState([])
  const [messageInput, setMessageInput] = useState('')

  const reset = () => {
    setMessages([])
    setUser('user_' + new Date().getTime())
    setMessageInput('')
  }

  const sendMessage = async () => {
    try {
      setMessageInput('')
      setMessages(prev => prev.concat({type: 'user', message: messageInput}))
      const {data} = await axios.post(window.location.hostname + ':5000' + '/chat', {sender: user, message: messageInput}) 
      if (data.length > 0) {
        setMessages(prev => prev.concat({type: 'bot', message: data[0].text}))
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className="chat-tab">
      <div className="box-chat">
        {messages.map(m => (
          m.type === 'bot'
          ? <div className="boss-chat">
              <h5>{m.message}</h5>
            </div>
          : <div className="user-chat">
              <h5>{m.message}</h5>
            </div>
        ))}
        <div className="chat-send">
          <input placeholder="Input your message"
            onKeyDown={e => (e.keyCode ? e.keyCode : e.which) === 13 && sendMessage()}
            value={messageInput}
            onChange={e => setMessageInput(e.target.value)} />
          <h3 className="resetbtn" onClick={reset}>
            Xoá hội thoại
          </h3>
          <h3 className="sendbtn" onClick={sendMessage}>Gửi</h3>
        </div>
      </div>
    </div>
  );
}

export default ChatView;
