import { Server } from "socket.io";
import Redis from 'ioredis';

const pub = new Redis({
    host:'redis-dd969c5-shubhankar2602.a.aivencloud.com',
    port: 18447,
    username:'default',
    password:'AVNS_Irmj-kWhkkzSaQLATaR'

});
const sub = new Redis({
    host:'redis-dd969c5-shubhankar2602.a.aivencloud.com',
    port: 18447,
    username:'default',
    password:'AVNS_Irmj-kWhkkzSaQLATaR'

});


class SocketService{
    private _io:Server;
    constructor(){
        console.log("Init Socket Services.....");
        this._io = new Server({
            cors: {
                allowedHeaders:['*'],
                origin:'*'
            }
        });
        sub.subscribe("MESSAGES")
    }
    get io(){
        return this._io;
    }

    public initListeners(){
        const io = this.io;
        console.log("Init Socket Listeners.....");
        io.on("connect",(socket)=>{
            console.log(`New Socket Connected`,socket.id);
            socket.on("event:message", async ({message}:{message:string}) =>{
                console.log("New Message Recieved",message);
                //publish the messages on redis
                await pub.publish("MESSAGES",JSON.stringify({ message }));
            });
        });
        
        sub.on("message", (channel, message)=>{
            if(channel==="MESSAGES"){
                console.log("New Message from Redis",message);
                io.emit('message',message);
            }
        });
    }
}

export default SocketService;