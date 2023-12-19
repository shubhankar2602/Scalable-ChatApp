// console.log('Hello Shubhankar this is server')
import http from 'http';
import SocketService from './services/socket';


async function init() {
    const socketServer = new SocketService();
    
    const httpServer = http.createServer();

    socketServer.io.attach(httpServer);

    const PORT = process.env.PORT ? process.env.PORT : 8000;
    httpServer.listen(PORT,()=>{
        console.log(`http server started on PORT ${PORT}`);
    });

    socketServer.initListeners();
}

init();