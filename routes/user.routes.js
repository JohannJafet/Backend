import { Router } from 'express';
import {User} from '../models/user.js'
export const userRouter = Router();

//ROUTES CRUD
    //GET ALL USERS
    //creo ruta para get http://localhost:3000/api/v1/users se completa con la linea 13

    userRouter.get('/', async (request, response) => {
        //find all documents trae todos los usuarios
        const users = await User.find({});

        response.status(200).json(users);
    }); 

    //get user by id
    //  http://localhost:3000/api/v1/users/:id 
    userRouter.get('/:id', async (request, response) => {
        const id = request.params.id; //obtengo id de mi url
        const userFound = await User.findById(id);

        if(!userFound){
            return response.status(404).end(); // si entra ejecutaria hasta aqui
        }

        response.status(200).json(userFound);
    });

    //post para crear usuarios http://localhost:3000/api/v1/users
    userRouter.post('/', async (request, response) => {
        try {
            const userProps = request.body;
            const newUser = new User(userProps);
            await newUser.save();

            // otra forma de reemplazar lo anterior await User.create(userProps); 
    
            //response.status(201).json(newUser);  otra forma de responder
            response.status(201).end();
            
        } catch (error) {
            console.log(error.name)
            console.log(error.message)
            response.status(400).json({error: error.message});
        }
    });

    //patch para actualizar usuarios http://localhost:3000/api/v1/users/:id
    userRouter.patch('/:id', async (request, response) => {
        try {
            const id = request.params.id;
            const userNewProps = request.body;
            const updatedUser = await User.findByIdAndUpdate(id, userNewProps, {new: true}).exec(); 

            response.status(200).json(updatedUser);
            
        } catch (error) {
            response.status(400).json({error: error.message});
        }
    });

    //Delete para eliminar usuarios http://localhost:3000/api/v1/users/:id
    userRouter.delete('/:id', async (request, response) => {
        try {
            const id = request.params.id;
            
            const deletedUser = await User.findByIdAndRemove(id).exec();

            if(!deletedUser){
                return response.status(404).json({message: 'user not found'});
            }

            response.status(200).send(deletedUser);
            
        } catch (error) {
            console.log(error.name);
            console.log(error.message);
            response.status(400).json({error: error.message});
        }
    });