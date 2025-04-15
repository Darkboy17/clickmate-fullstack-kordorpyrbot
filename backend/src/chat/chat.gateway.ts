import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server } from 'socket.io';

// This gateway handles WebSocket connections for chat messages
// It listens for incoming messages and emits them to all connected clients
@WebSocketGateway({

  cors: {

    origin: [

      'http://localhost:3001',

      'https://clickmate-fullstack-kordorpyrbot.vercel.app',

      'https://clickmate-fullstack-kordorpyrbot-git-master-darkboy17s-projects.vercel.app',

      'https://clickmate-fullstack-kordorpyrbot-git-master-darkboy17s-projects.vercel.app',

      'https://clickmate-fullstack-kordorpyrbot-p6opqo1zs-darkboy17s-projects.vercel.app'

    ],

    methods: ['GET', 'POST'],

    credentials: true,

  },

  transports: ['websocket', 'polling'],

})


export class ChatGateway {
  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('ChatGateway');

  @SubscribeMessage('send-message')
  handleMessage(@MessageBody() data: any): void {
    this.logger.log(`Message received: ${JSON.stringify(data)}`);
    this.server.emit('chat-message', data);
  }
}