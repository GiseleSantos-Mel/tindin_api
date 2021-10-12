const express = require('express')
const  cors = require('cors')
const { v4: uuidv4 } = require('uuid')
const { message } = require('statuses')
const app = express()

app.use(cors())
app.use(express.json())
const port = 3000

app.use(express.static('www'))

const notes = []
const products = []

/*--------------PRODUCTS--------------*/
app.get('/products', (req, res) => {
  res.json(notes)
})
/*----------------GET------------------*/
app.get('/notes', (req, res) => {
  res.json(notes)
})

/*----------------POST-----------------*/
app.post('/notes', (req, res) => {
    const title = req.body.title
    const description = req.body.description

    if (!title) {
        return res.status(400).json({message:"Informe o título!"})
    } 

    if (!description) {
        return res.status(400).json({message:"Informe a descrição!"})
    } 

    notes.push({
                
                id: uuidv4(),
                title,
                 description
                })

    res.json({message:"Dados Salvos!"})
})

/*-----------------PUT-------------------*/
app.put('/notes', (req, res) => {
  const id = req.body.id
  const title = req.body.title
  const description = req.body.description

  if (!id) {
    return res.status(400).json({message:"Informe o id!"})
} 
  const note = notes.find((n)=> n.id === id)
  if (!note) {
    return res.status(400).json({message:"sem anotações para o id!"})
} 
  if (!title) {
      return res.status(400).json({message:"Informe o título!"})
  } 

  if (!description) {
      return res.status(400).json({message:"Informe a descrição!"})
  } 

  for(const noteObject of notes){
    if(noteObject.id === id){
      noteObject.title = title
      noteObject.description = description
    }
  }

  res.json({message:"Dados alterados com sucesso!"})
})

/*---------------DELETE---------------------*/
app.delete('/notes', (req, res) => {
  const id = req.body.id
 

  if (!id) {
    return res.status(400).json({message:"Informe o id!"})
} 
  const note = notes.find((n)=> n.id === id)
  if (!note) {
    return res.status(400).json({message:"sem anotações para o id!"})
} 
  for(const index in notes){
    if(notes[index].id === id){
      notes.splice(index,1)
    }
  }

  res.json({message:"Dados deletados com sucesso!"})
})

/*------------------DETALHE--------------------*/

app.get('/notes/:id', (req, res) => {
  const id = req.params.id
  if (!id) {
    return res.status(400).json({message:"Informe o id!"})
} 
  const note = notes.find((n)=> n.id === id)
  if (!note) {
    return res.status(400).json({message:"sem anotações para o id!"})
} 
  res.json(note)
})



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})