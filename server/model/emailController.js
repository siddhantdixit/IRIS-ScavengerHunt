const nodemailer = require('nodemailer');
require('dotenv').config();

const getAPIHostURL = (req)=>{
    return `${req.protocol}://${req.hostname}`;
};


const transporter = nodemailer.createTransport({
  service: 'aol',
  auth: {
    user: 'siddhant.dixit@aol.com',
    pass: process.env.EMAILPASSWORD
  }
});

let mailOptions = {
  from: 'Siddhant Dixit <siddhant.dixit@aol.com>',
  to: 'siddhant.dixit23@gmail.com',
  subject: 'Account Verification',
};


module.exports.sendEmailVerificationLink = function(username,email,verificationToken,request,callback)
{ 
  let verificationURL = `${getAPIHostURL(request)}/verify?token=${verificationToken}`;
  let bodycontent = 

  `
  <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
  <html xmlns="http://www.w3.org/1999/xhtml">
  
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>
  </head>
  
  <body style="font-family:-apple-system, '.SFNSText-Regular', 'Helvetica Neue', Roboto, 'Segoe UI', sans-serif; color: #666666; background:white; text-decoration: none;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
      <tr align="center">
        <td style="height: 30px; width: 100%;">&nbsp;</td>
      </tr>
      <tr align="center">
        <td valign="top" style="width: 100%;">
          <table cellspacing="0" cellpadding="0" border="0" summary="">
            <tr align="center">
              <td valign="middle" style="width: 100%;">
  
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr align="center">
        <td style="height: 50px; width: 100%;">&nbsp;</td>
      </tr>
      <tr align="center">
        <td valign="top" style="width: 100%;">
          <table style="padding: 0px; border: 0; max-width: 520px; text-align: center;" width="100%" cellpadding="0" cellspacing="0" border="0" summary="">
            <tr align="center">
              <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 14pt; font-weight: bold; color: #333333;">
                <p style="margin: 0; padding: 0;">Verify your email address</p>
              </td>
            </tr>
            <tr align="center" style="margin: 0px 10px;">
              <td style="width: 100%; line-height: 24px; font-size: 11pt;">
                <p>Hi, Team . Please verify your IRIS account with the following details to participate in Scavenger Hunt.</p>
              </td>
            </tr>
            
                      <tr align="center" style="margin: 0px 10px;">
              <td style="width: 100%; line-height: 24px; font-size: 11pt;">
                <p>Username: ${username}</p>
                <p>Email: ${email}</p>
              </td>
            </tr>
            
            <tr align="center">
              <td style="height: 30px; width: 100%;">&nbsp;</td>
            </tr>
            <tr align="center">
              <td style="width: 100%; margin: 0px 10px; line-height: 24px; font-size: 11pt;">
                <a style="padding: 10px 20px; border: 1px solid #1492ef; -webkit-border-radius: 999em; -moz-border-radius: 999em; border-radius: 999em; line-height: 24px; font-size: 11pt; background-color: #1492ef; color: white; text-decoration: none;" href="${verificationURL}">Verify your Account</a>
              </td>
            </tr>
            
            <tr>
              <td style="height: 40px; width: 100%;">&nbsp;</td>
            </tr>
                      <tr align="left" style="margin: 0px 10px;">
              <td style="width: 100%; line-height: 24px; font-size: 11pt;">
                <p>- IRIS, Web Development Team</p>
              </td>
            </tr>
          </table>
  
        </td>
      </tr>
      <tr align="center">
        <td style="height: 55px; width: 100%;">&nbsp;</td>
      </tr>
    </table>
  </body>
  
  </html>
  `;

    mailOptions.to = email;
    mailOptions.html = bodycontent;
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        callback(error);
      } else {
        console.log('Email sent: ' + info.response);
        callback(200);
      }
    }); 
}
