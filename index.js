import express from 'express';
import cors from 'cors';
import { dbConnection } from './database/db.js';
import { userRouter } from './routes/user.routes.js';

const server = express();

const PORT = 3000;


server.use(express.json());
server.use(cors());

server.use('/api/v1/users', userRouter); //puedo hacer otro enrutador para otro modelo
//ejemplo: server.use('/api/v1/users', productRouter);

async function main(){
    
    await dbConnection();
    //mi bd se llama ProyectoCrud, no la cree en atlas

    

    server.listen(PORT, ()=>{
        console.log(`Server run in http://localhost:${PORT}`);
    });
}

main();