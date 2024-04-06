const express = require('express')
const cors = require('cors')
const nodemailer = require('nodemailer')

const app = express()
app.use(cors()) // Habilita CORS para todas las rutas
app.use(express.json()) // Para parsear cuerpos de solicitud en formato JSON

// Configuración de nodemailer con tus credenciales
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'mr.monocker@gmail.com', // Debes reemplazarlo con tu correo real
    pass: 'bppk iqzw pvcg rony' // Debes reemplazarlo con tu contraseña real
  }
})

// Ruta de la API para enviar correos electrónicos
app.post('/send-email', (req, res) => {
  const { fullName, email, subject, text } = req.body

  const mailOptions = {
    from: 'mr.monocker@gmail.com', // De nuevo, usa tu correo real aquí
    to: email,
    subject: subject,
    text: text
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error al enviar el correo:', error)
      res.status(500).send('Error al enviar el correo.')
    } else {
      console.log('Correo enviado: ' + info.response)
      res.status(200).send('Correo enviado con éxito.')
    }
  })
})

// Configura el puerto y inicia el servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`)
})
