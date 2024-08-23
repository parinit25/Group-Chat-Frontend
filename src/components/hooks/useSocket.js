import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { toast } from "react-hot-toast";

const useSocket = (userData) => {
  const socketRef = useRef(null);

  useEffect(() => {
    if (userData) {
      socketRef.current = io("https://group-chat-sharpener.twilightparadox.com", {
        query: { userId: userData.id },
      });

      socketRef.current.on("errorMessage", ({ message }) => {
        toast.error(message);
      });

      return () => {
        if (socketRef.current) {
          socketRef.current.disconnect();
        }
      };
    }
  }, [userData]);

  const emitEvent = (eventName, data) => {
    if (socketRef.current) {
      socketRef.current.emit(eventName, data);
      console.log(eventName, data);
    }
  };

  const listenToEvent = (eventName, callback) => {
    if (socketRef.current) {
      socketRef.current.on(eventName, callback);
    }
  };

  const removeListener = (eventName) => {
    if (socketRef.current) {
      socketRef.current.off(eventName);
    }
  };

  return { emitEvent, listenToEvent, removeListener };
};

export default useSocket;
