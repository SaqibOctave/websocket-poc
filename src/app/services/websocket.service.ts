import { Injectable } from '@angular/core';
import { ChatMessage } from '../model/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

   webSocket!: WebSocket;
  chatMessages: ChatMessage[] = [];

  constructor() { }

  public openWebSocket(){
    this.webSocket = new WebSocket('wss://d8cfvhicqj.execute-api.us-east-1.amazonaws.com/test/');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(chatMessageDto: ChatMessage){

    console.log("Message to be sent: ", JSON.stringify(chatMessageDto))
    this.webSocket.send(JSON.stringify(chatMessageDto));
    console.log("Message to be sent: ", JSON.stringify(chatMessageDto))

  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
