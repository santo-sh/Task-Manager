
const sgMail = require('@sendgrid/mail')

const apiKey = process.env.API_KEY

sgMail.setApiKey(apiKey)

const sendWelcomeEmail = (email, name)=>{
    mail = {
        to: email,
        from : 'kumarsanto9582@gmail.com',
        subject : 'Thanks for joining us.',
        text: `Hey ${name}Welcome to our service. Let me know how you get along with the app.`
    }
    sgMail.send(mail)
}

const sendDeletionEmail = (email, name)=>{
    mail = {
        to : email,
        from :'kumarsanto9582@gmail.com',
        subject: 'Your account has been deleted Successfully.',
        text: 'You can send us feedback to improve our services.'
    }
    sgMail.send(mail)
}

module.exports = {
    sendWelcomeEmail, sendDeletionEmail
}