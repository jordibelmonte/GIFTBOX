const nodemailer = require('nodemailer')
const Paquete= require("../models/Paquete");
const Regalo = require('../models/Regalo');
const regalosController ={
    
enviarRegalo: async (req, res) => {

        
    const {email,carrito,paquetesId}=req.body;
    const {cuenta,nombre,apellido}=req.user;
    console.log(req.user)
    console.log(req.body)
    const nuevoRegalo=new Regalo({nombreEnviador:cuenta,cuentaDestinatario:email.emailDestinatario,paquetesId})
    console.log(nuevoRegalo)
    nuevoRegalo.save()
    .then(nuevoRegalo => { return res.json({ success: true, response: nuevoRegalo }) })
    .catch(error => { return res.json({ success: false, error: "Error al cargar el regalo" }) })

    

    if(nuevoRegalo){
        var transport = nodemailer.createTransport({
            port: 465,
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS
            },
            tls: {
                rejectUnauthorized: false
            }
        })  
        var mailOptions = {
            from: `GIFTBOX de ${cuenta}`,
            to: email.emailDestinatario,
            subject: (email.asunto==="")?"GIFTBOX": email.asunto,
            html:  
            `<div style="text-align:center; padding:20px; min-heigth: 250px; background-color:#fff">
            <h1 style="color:#FFB5FF">Anda a abrirlo ahora !</h1>
            ${email.deMensaje!=="" ? `<h1 style="color:#FFB5FF">Recibiste un regalo de parte de ${email.deMensaje} </h1>` : `<h1 style="color:#FFB5FF">Recibiste un regalo de parte de ${nombre+apellido}</h1>` }
            ${email.paraMensaje!=="" ? `<h2>para: ${email.paraMensaje} </h2>`: "" }
            ${email.mensaje!=="" ? `<h2> ${email.mensaje} </h2>`: ""}
            ${carrito.map(paquete=>`<h1>${paquete.nombre} x ${paquete.cantidad}</h1>`)}
            <h1>CODIGO: ${nuevoRegalo._id}</h1>
            <link href="https://app-pixels.herokuapp.com/"><button style="padding:20px; text-decoration:none" >http://localhost:3000/regalo</button></link>
            <h3 style="color:#FFB5FF">Si el link no te funciona, copia y pega este enlace en tu navegador http://localhost:3000/regalo </h3>
            <h5 style="color:#FFB5FF">GIFTBOX</h5>
            </div>`}
            transport.sendMail(mailOptions, (error, info) =>{
            if(error){res.status(500).send(error.message)
            }else {
                console.log("Email enviado.")
                res.status(200).json({respuesta:req.body})
            }})   
        }  
    },
    todosLosRegalos: (req,res)=>{
        Regalo.find()
        .then(data=>{return res.json({success:true, response:data})})
        .catch(error=>{return res.json({success:false, response:"Error al obtener los regalos"})})
    },
    unRegalo: (req,res)=>{
        Regalo.findOne(req.params).populate("paquetesId.paqueteId")
        .then(data=>{return res.json({success:true, response:data})})
        .catch(error=>{return res.json({success:false, response:"Error al obtener el regalo"})})
    },


}
module.exports= regalosController;