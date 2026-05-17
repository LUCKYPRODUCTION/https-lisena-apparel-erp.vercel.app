// apps/api/src/index.ts
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { Server } from 'socket.io'
import http from 'http'
import cors from 'cors'
import jwt from 'jsonwebtoken'

const app = express()
const prisma = new PrismaClient()
const server = http.createServer(app)
const io = new Server(server, {
  cors: { origin: "*" }
})

app.use(cors())
app.use(express.json())

// Auth Middleware
const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  
  if (!token) return res.sendStatus(401)
  
  jwt.verify(token, process.env.JWT_SECRET!, (err: any, user: any) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

// HPP Calculation API
app.post('/api/hpp/calculate', async (req, res) => {
  try {
    const hppData = calculateHpp(req.body.orderData)
    res.json(hppData)
  } catch (error) {
    res.status(500).json({ error: 'Calculation failed' })
  }
})

// Realtime Dashboard
io.on('connection', (socket) => {
  socket.on('subscribe-dashboard', () => {
    // Send realtime updates every 5s
    const interval = setInterval(async () => {
      const dashboardData = await getDashboardStats()
      socket.emit('dashboard-update', dashboardData)
    }, 5000)
    
    socket.on('disconnect', () => clearInterval(interval))
  })
})

server.listen(3001, () => {
  console.log('🚀 Lisena API running on port 3001')
})
