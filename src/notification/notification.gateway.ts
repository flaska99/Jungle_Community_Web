import { OnGatewayConnection, OnGatewayDisconnect, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { NotificationService } from './notification.service';
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway({
  cors : {
    origin : '*',
  },
})
export class NotificationGateway implements OnGatewayConnection, OnGatewayDisconnect{
  @WebSocketServer()
  server : Server;

  constructor(private readonly notificationService : NotificationService){}

  private readonly JWT_SECRET = process.env.JWT_SECRET ?? 'defaultSecretKey';


  handleConnection(client: Socket) {
    try {
      const token = client.handshake.query.token as string;
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = jwt.verify(token, this.JWT_SECRET) as { sub: string };
      const userId = payload.sub;

      client.join(userId);
      console.log(`유저 ${userId}가 소켓에 연결됨`);
    } catch (err) {
      console.error('소켓 인증 실패', err.message);
      client.disconnect();
    }
  }

  handleDisconnect(client : Socket){
    console.log(`client disconnected : ${client.id}`);
  }

  sendNotification(userId : string, message : string){
    this.server.to(userId).emit('notification', message);
  }
}
