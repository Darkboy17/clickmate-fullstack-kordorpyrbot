import { WebSocketGateway, WebSocketServer, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

// This WebSocket gateway is responsible for handling real-time communication related to orders and chat messages.
// It uses the Socket.IO library to establish a WebSocket connection with clients and emit events.
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

// The OrdersGateway class implements the WebSocket gateway for handling real-time events related to orders and chat messages.
// It uses decorators from the NestJS framework to define the WebSocket server and its behavior.
export class OrdersGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  // The WebSocket server instance
  @WebSocketServer() server: Server;

  // Logger instance for logging messages
  private logger: Logger = new Logger('OrdersGateway');

  // Called when the WebSocket server is initialized
  afterInit(server: Server) {
    this.logger.log('WebSocket Server Initialized');
  }

  // Called when a new client connects to the WebSocket server
  handleConnection(client: Socket) {
  }

  // Called when a client disconnects from the WebSocket server
  handleDisconnect(client: Socket) {
    // Handle disconnection logic if needed
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  // Notify all connected clients about a new order
  notifyNewOrder(order: any) {
    this.server.emit('new-order', order);
    this.logger.log(`New order notification sent: ${JSON.stringify(order)}`);
  }

  // Handle incoming chat messages and emit them to all connected clients
  handleChatMessage(message: any) {
    this.server.emit('chat-message', message); // Emit the message to all connected clients
  }
}