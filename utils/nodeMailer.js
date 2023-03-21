const { createTransport } = require('nodemailer');
const logger = require("./winston.js");
const dotenv = require('dotenv');
dotenv.config();

exports.sendEmail = async (mail, body) => {

    const TEST_MAIL = mail

    const transporter = createTransport({
        // host: 'smtp.ethereal.email',
        service: 'gmail',
        port: 587,
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const mailOptions = {
        from: 'santi.iztli@gmail.com',
        to: TEST_MAIL,
        subject: 'Backend e-commerce registro exitoso',
        html: `<h3 style="color:green;">✅ Registro exitoso!</h3>
    <p><strong>Username:</strong>${TEST_MAIL}</p>
    <p>Pedido: ${body}</p>`,
        // attachments: [{ path: './Cuanto-pesa-un-gato-2.jpeg' }]
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        logger.log('info', `✅ email has been sent to ${TEST_MAIL}`)
    } catch (err) {
        logger.log('error', `❌ cant sent mail to ${TEST_MAIL}`)
    }


}

