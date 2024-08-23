import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSocket from "../hooks/useSocket";
import {
  getAllMessageAction,
  getParticularContactAction,
} from "../../store/actions/asyncChatActions";
import { getParticularGroupAction } from "../../store/actions/asyncGroupActions";
import GroupChat from "./GroupChat";
import IndividualChat from "./IndividualChat";
import { messageFromSocketReducer } from "../../store/reducers/chatReducer";
import SearchContact from "./SearchContact";

const ChatArea = () => {
  const dispatch = useDispatch();
  const contactId = useSelector((state) => state.chat.contactId);
  const userData = useSelector((state) => state.user.user);
  const chatAreaState = useSelector((state) => state.chat.chatAreaState);
  const groupId = useSelector((state) => state.group.groupId);

  const { emitEvent, listenToEvent, removeListener } = useSocket(userData);

  useEffect(() => {
    if (chatAreaState === "individual" && userData.id && contactId) {
      emitEvent("joinChat", {
        senderId: userData.id,
        receiverId: contactId,
      });

      listenToEvent("receiveMessage", (message) => {
        console.log("Message received", message);
        // dispatch(getAllMessageAction(contactId));
        dispatch(messageFromSocketReducer(message));
      });

      return () => {
        removeListener("receiveMessage");
      };
    }
  }, [
    userData,
    chatAreaState,
    contactId,
    groupId,
    dispatch,
    emitEvent,
    listenToEvent,
    removeListener,
  ]);

  useEffect(() => {
    if (contactId && chatAreaState === "individual") {
      dispatch(getAllMessageAction(contactId));
    }
  }, [contactId, chatAreaState, dispatch]);

  // For fetching particular group
  useEffect(() => {
    if (groupId && chatAreaState === "group") {
      dispatch(getParticularGroupAction(groupId));
    }
  }, [groupId, chatAreaState, dispatch]);

  // For fetching particular contact
  useEffect(() => {
    if (contactId) {
      dispatch(getParticularContactAction(contactId));
    }
  }, [contactId, dispatch]);

  return (
    <>
      {chatAreaState === "individual" ? (
        contactId ? (
          <IndividualChat
            emitEvent={emitEvent}
            listenToEvent={listenToEvent}
            removeListener={removeListener}
          />
        ) : (
          <SearchContact />
        )
      ) : (
        <GroupChat
          emitEvent={emitEvent}
          listenToEvent={listenToEvent}
          removeListener={removeListener}
        />
      )}
    </>
  );
};

export default ChatArea;
