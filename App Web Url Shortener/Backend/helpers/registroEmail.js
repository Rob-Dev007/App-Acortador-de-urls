import nodemailer from 'nodemailer';

const registroEmail = async (datos)=>{
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      //Enviar email
      const { nombres, apellidos, correo, token } = datos;

      const info = await transporter.sendMail({
        from: "URLShortener-ADMIN",
        to: correo,
        subject: "Comprueba tu cuenta en APP Url Shortener",
        text: "Ingresa al enlace para confirmar tu cuenta",
        html: `
        <p>Hola ${nombres} ${apellidos}, este es el sistema de APP Url Shortener </p>
        <p>Para registrar tu cuenta, ingresa al siguiente enlace <a href="${process.env.URL_FRONTEND}/confirmar/${token}">Registrar cuenta</a></p>
        
        <p>Si tu no te registraste, te sugerimos ignorar este mensaje</p>
        `
      });

      console.log("Mensaje enviado: %s", info.messageId)
      
};

export default registroEmail;