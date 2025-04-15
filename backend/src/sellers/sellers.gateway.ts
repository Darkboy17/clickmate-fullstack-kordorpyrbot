import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { Server, Socket } from 'socket.io';

// This WebSocket gateway is responsible for handling real-time communication with sellers.
// It tracks the number of connected sellers and allows them to join or leave a room.
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

// This is the main class for the SellersGateway, which handles WebSocket connections and events.
// It implements the OnGatewayConnection and OnGatewayDisconnect interfaces to manage connections and disconnections.
export class SellersGateway implements OnGatewayConnection, OnGatewayDisconnect {

  @WebSocketServer() server: Server;
  private logger: Logger = new Logger('SellersGateway');
  private sellerSockets = new Set<string>(); // Track seller socket IDs

  // This method is called when a new client connects to the WebSocket server.
  // It logs the connection and emits the current seller count to the new client.
  handleConnection(client: Socket) {
    this.logger.log(`Client connected: ${client.id}`);

    // Immediately send current seller count to the new connection

    client.emit('seller-count', this.sellerSockets.size);
  }

  // This method is called when a client disconnects from the WebSocket server.
  // It logs the disconnection and removes the client from the seller sockets set if it was a seller.
  handleDisconnect(client: Socket) {

    this.logger.log(`Client disconnected: ${client.id}`);

    // Check if this was a seller socket and remove it
    if (this.sellerSockets.has(client.id)) {

      this.logger.log(`Removing seller socket: ${client.id}`);

      this.sellerSockets.delete(client.id);

      // Broadcast updated count to all clients
      this.broadcastSellerCount();

    }

  }

  // This method is called when a client wants to join the seller room.
  @SubscribeMessage('join-seller-room')
  handleJoinSellerRoom(@ConnectedSocket() client: Socket) {

    this.logger.log(`Client ${client.id} joining sellers room`);

    // Add to sellers room
    client.join('sellers');

    // Track this socket as a seller
    this.sellerSockets.add(client.id);
    this.logger.log(`Current seller count: ${this.sellerSockets.size}`);

    // Broadcast updated count
    this.broadcastSellerCount();

    return { success: true, message: 'Joined seller room successfully' };

  }

  // This method is called when a client wants to leave the seller room.
  // It removes the client from the room and updates the seller count.
  @SubscribeMessage('leave-seller-room')
  handleLeaveSellersRoom(@ConnectedSocket() client: Socket) {

    this.logger.log(`Client ${client.id} leaving sellers room`);

    // Remove from sellers room
    client.leave('sellers');

    // Remove from tracked sellers
    this.sellerSockets.delete(client.id);
    this.logger.log(`Current seller count: ${this.sellerSockets.size}`);

    // Broadcast updated count
    this.broadcastSellerCount();

    return { success: true, message: 'Left seller room successfully' };

  }

  // This method is called when a client wants to get the current seller count.
  // It emits the current count back to the client.
  @SubscribeMessage('get-seller-count')
  handleGetSellerCount(@ConnectedSocket() client: Socket) {

    this.logger.log(`Client ${client.id} requested seller count: ${this.sellerSockets.size}`);

    client.emit('seller-count', this.sellerSockets.size);

    return this.sellerSockets.size;

  }


  // This method broadcasts the current seller count to all connected clients.
  // It is called whenever a seller connects or disconnects to keep all clients updated.
  private broadcastSellerCount() {

    this.logger.log(`Broadcasting seller count: ${this.sellerSockets.size}`);

    this.server.emit('seller-count', this.sellerSockets.size);

  }

  // This method is called to notify all sellers about a new order.
  // It emits the order details to all clients in the 'sellers' room.
  notifyNewOrder(order: any) {
    this.logger.log(`Broadcasting new order to sellers: ${JSON.stringify(order)}`);
    this.server.to('sellers').emit('new-order', order);
  }

  // This method returns the current count of connected sellers.
  // It can be used to check how many sellers are currently connected to the WebSocket server.
  getSellerCount() {
    return this.sellerSockets.size;
  }
}