const transporter = require('../config/emailConfig')

module.exports = {
  
// Controller function to handle email-sending logic
async send(request, response) {
  const { to, subject, text, html } = request.body;
  console.log('Email User:', process.env.EMAIL_USER);
  console.log('Email pass:', process.env.EMAIL_PASS);  
  try {
   const info = await transporter.sendMail({
    from: 'Stock Flow <MV23.stockflow@gmail.com>',
    to, 
    subject, 
    text, 
    html
  })  
  

  return response.status(200).json({ message: 'Email sent successfully', info })
}
  catch(error){

    console.error('Error sending email:', error);
      return response.status(500).json({ error: 'Failed to send email' });
  }
  
 
},

}