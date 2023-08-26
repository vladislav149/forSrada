import fs from 'fs'
import jsonServer from 'json-server'
import path from 'path'
import {fileURLToPath} from 'url'
const port = '8000'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const server = jsonServer.create()

const router = jsonServer.router(path.resolve(__dirname, 'db.json'))

server.use(jsonServer.defaults({}))
server.use(jsonServer.bodyParser)

// Нужно для небольшой задержки, чтобы запрос проходил не мгновенно, имитация реального апи
server.use(async (req, res, next) => {
  await new Promise(res => {
    setTimeout(res, 800)
  })
  next()
})

server.post('/login', (req, res) => {
  try {
    const {login, password} = req.body
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'))
    const {users = []} = db

    const userFromBD = users.find(
      username => username.login === login && username.password === password
    )

    if (userFromBD) {
      return res.json(userFromBD)
    }

    return res.status(403).json({message: 'не верный логин или пароль'})
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: e.message})
  }
})

server.get('/user', (req, res) => {
  try {
    const token = req.headers.authorization.split(' ')[1]
    const db = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'db.json'), 'UTF-8'))
    const {users = []} = db
    const userFromBD = users.find(user => user.token === token)

    if (userFromBD) {
      return res.json(userFromBD)
    }

    return res.status(403).json({message: 'не верный логин или пароль'})
  } catch (e) {
    console.log(e)
    return res.status(500).json({message: e.message})
  }
})

server.use((req, res, next) => {
  if (req.path === '/public/path') {
    return next()
  }

  if (!req.headers.authorization) {
    return res.status(403).json({message: 'AUTH ERROR'})
  }

  next()
})

server.use(router)

server.listen(port, () => {
  console.log(`server is running on ${port} port`)
})
