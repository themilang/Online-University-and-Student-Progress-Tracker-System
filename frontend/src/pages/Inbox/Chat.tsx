import { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, username, room }: any) => {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState<any>([]);
  useEffect(() => {
    socket.on("receive_message", (data: any) => {
      setMessageList((prev: any) => [...prev, data]);
    });
  }, [socket]);

  // {
  //  room:room,
  //  author:username,
  //  message:message,
  //  time:
  // }

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((prev: any) => [...prev, messageData]);
      setCurrentMessage("");
    }
  };

  return (
    <div className="chat-window">
      <div className="bg-gray-800 rounded-t-lg cursor-pointer">
        <p className="text-white font-bold py-2 px-4">Live chat</p>
      </div>
      <div className="chat-body border border-gray-800 rounded-b-lg bg-white relative">
        <ScrollToBottom className="h-full overflow-y-scroll overflow-x-hidden">
          {messageList.map((messageContent: any) => {
            return (
              <div
                className={`message flex ${
                  username === messageContent.author
                    ? "justify-start"
                    : "justify-end"
                }`}
                id={username === messageContent.author ? "you" : "other"}
                key={messageContent.time}
              >
                <div>
                  <div
                    className={`message-content min-h-40 max-2-120 flex items-center 
                    ${
                      username === messageContent.author
                        ? "bg-green-500"
                        : "bg-blue-500"
                    }`}
                  >
                    <p className="text-white px-2 break-words">
                      {messageContent.message}
                    </p>
                  </div>
                  <div
                    className={`message-mesta flex font-xs ${
                      username === messageContent.author
                        ? "justify-start"
                        : "justify-end"
                    }`}
                  >
                    <p id="time">{messageContent.time}</p>
                    <p id="author" className="font-bold ml-2">
                      {messageContent.author}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer border border-t-0">
        <input
          type="text"
          value={currentMessage}
          placeholder="Enter message here"
          className="w-full h-full border-0 text-sm outline-none cursor-pointer"
          onChange={(e: any) => setCurrentMessage(e.target.value)}
          onKeyUp={(e: any) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="w-15 h-full bg-transparent text-gray-400 text-2xl outline-none cursor-pointer"
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
