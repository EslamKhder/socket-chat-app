package com.example.socketchatapp.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import com.example.socketchatapp.model.ChatMessage;
import com.example.socketchatapp.model.ChatType;

@Component
public class SocketAction {

    @Autowired
    private SimpMessageSendingOperations messagingTemplate;

    @EventListener // eslam
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        System.out.println("HI I am Connected");
    }

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) { // eslam
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String userName = (String) headerAccessor.getSessionAttributes().get("username");
        if(userName != null){
            System.out.println("Hi I am Not Connected...... " + userName);
            ChatMessage chatMessage = new ChatMessage();
            chatMessage.setChatType(ChatType.LEAVE);
            chatMessage.setSender(userName);
            messagingTemplate.convertAndSend("/topic/all",chatMessage);
        }
    }
}
