import { Component } from '@angular/core';
import { ChatbotService } from './chat.service'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  imports: [FormsModule, HttpClientModule, CommonModule],
  providers: [ChatbotService] 
})

export class ChatComponent {
  userMessage: string = '';
  messages: { text: string; sender: 'user' | 'bot' }[] = [];
  isTyping: boolean = false;

  constructor(private chatbotService: ChatbotService) {}

 
  sendMessage() {
    if (this.userMessage.trim() === '') return;
  
    // Add user message to the chat
    this.messages.push({ text: this.userMessage, sender: 'user' });

    // Set typing to true to show three dots animation
    this.isTyping = true;
  
    // Send the message to the backend and get the response
    console.log("Send the message to the backend and get the response...");
  
    this.chatbotService.getBotResponse(this.userMessage).subscribe({
      next: (response: any) => {

          setTimeout(() => {
            this.isTyping = false;
            if (typeof response.response === 'string') {
              // If response is a string, push it as a normal message
              this.messages.push({ text: response.response, sender: 'bot' });
            } else if (typeof response.response === 'object') {
              // If response is an object, stringify it or display it differently
              this.messages.push({ text: JSON.stringify(response.response, null, 2), sender: 'bot' });
             
            }
          }, 1000);
      
      },
      error: (error) => {
        this.isTyping = false;
        console.error('Error fetching bot response:', error);
      },
      complete: () => {
        console.log('Bot response handling completed');
      }
    });
  
    // Clear the input field
    this.userMessage = '';
  
  }
  
}