const nodemailer = require("nodemailer")

const mailSender = async (email, title, body) => {
  // try {
  //   let transporter = nodemailer.createTransport({
  //     host: process.env.MAIL_HOST,
  //     port:5000,
  //     auth: {
  //       user: process.env.MAIL_USER,
  //       pass: process.env.MAIL_PASS,
  //     },
  //     secure:true,
  //     logger: true,
  // debug: true,
  // ignoreTLS: true
  //   })

  //   let info = await transporter.sendMail({
  //     from: `"Eheaven" <${process.env.MAIL_USER}>`, // sender address
  //     to: `${email}`, // list of receivers
  //     subject: `${title}`, // Subject line
  //     html: `${body}`, // html body
  //   })
  //   console.log(info.response)
  //   return info
  // } catch (error) {
  //   console.log(error.message)
  //   return error.message
  // }
  const nodemailer = require('nodemailer');


  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'prashant.jha21b@iiitg.ac.in',
      pass: 'Sk@982171'
    }
  });
  
  let mailDetails = {
    from: 'xyz@gmail.com',
    to: 'abc@gmail.com',
    subject: 'Test mail',
    text: 'Node.js testing mail for GeeksforGeeks'
  };
  
  mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
      console.log('Error Occurs');
    } else {
      console.log('Email sent successfully');
    }
  });

}

module.exports = mailSender
