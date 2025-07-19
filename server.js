//acessar (antigo)
//const express = require('express')

//acessar (novo)
import express from 'express';
import { PrismaClient } from './generated/prisma/index.js'

const prisma = new PrismaClient()
// use `prisma` in your application to read and write data in your DB

const app = express() // guadando o express dento de app
app.use(express.json()) // necessario para o post funcionar

//------------------------------------------------------------------
//rota get
//------------------------------------------------------------------

app.get('/usuarios', async (req, res) => { //QueryParams

    const users = await prisma.user.findMany()

    //res.send('Olá estamos acessando uma rota c/ sucesso!!') // O 'send' está configurado dentro do express (para mais infos, ler documentação)

    res.status(200).json(users)

})

//------------------------------------------------------------------
//rota post
//------------------------------------------------------------------

app.post('/usuarios', async (req, res) => { //bodyParams

    //users.push(req.body) //estamos guadando dentro de users, o que chega em "req"

    const user = await prisma.user.create({
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        },
    })

    res.status(201).json(user)
})

//------------------------------------------------------------------
//rota update
//------------------------------------------------------------------


app.put('/usuarios/:id', async (req, res) => { //RouteParams

    const user = await prisma.user.update({
        where: {
            id: req.params.id //onde chega o resultado da varaivel ID
        },
        data: {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        },
    })

    res.status(200).json(user)
})

//------------------------------------------------------------------
//rota delete
//------------------------------------------------------------------

app.delete('/usuarios/:id', async (req, res) => { //RouteParams

    const user = await prisma.user.delete({
        where: {
            id: req.params.id //onde chega o resultado da varaivel ID
        },
    })

    res.status(200).json({ message: 'Usuário deletado!'})
})


//------------------------------------------------------------------
//porta
//------------------------------------------------------------------


app.listen(3001)// a variavel app será ovida pela porta 3000