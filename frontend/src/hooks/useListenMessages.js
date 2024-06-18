import { useEffect } from "react";
import { useSocketContext } from "../contect/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/newMessage.wav";

const useListenMessages = () => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      newMessage.shouldShake = true;
      const sound = new Audio(notificationSound);
      sound.play();
      setMessages([...messages, newMessage]);
    });
  }, [socket, setMessages, messages]);
};

export default useListenMessages;
