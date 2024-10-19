import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chatMessage.model'; 




@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: ChatMessage[] = []; ;

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    this.listMessage();
  }

  sendMessage(): void {
    if (this.message) {
      this.messages.push({ text: this.message, type: 'sent' });;
      this.chatService.sendMessage(this.message);
      this.message = '';
      this.scrollToBottom(); // Forzar el scroll hacia abajo

    }
  }

  listMessage(){
    this.chatService.getMessage().subscribe((data) => {
      console.log('Mensaje recibido:', data);
      this.messages.push({ text: data, type: 'received' });
      console.log(data);
      this.scrollToBottom(); // Forzar el scroll hacia abajo cuando se recibe un mensaje
    });
  }
  
  scrollToBottom(): void {
    const messageContainer = document.querySelector('.chat-messages');
    if (messageContainer) {
      messageContainer.scrollTop = messageContainer.scrollHeight;
    }
  }

}




