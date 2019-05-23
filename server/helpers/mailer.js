import nodemailer from 'nodemailer';

function mailUser(email, status, loanDetails) {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure: false,
    service: 'gmail',
    auth: {
      user: 'successgilli@gmail.com',
      pass: 'quininmotion2',
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  const mailOptions = {
    from: 'successgilli@gmail.com',
    to: email,
    subject: "Gtech's Quick credit loan confirmation",
    text: `Dear ${email}, your loan with details loan Amount: ${loanDetails.loanAmount}, tenor: ${loanDetails.loanAmount},
    monthly payment: ${loanDetails.monthlyInstallment} has been ${status}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    console.log(info, 'message sent')
  });
}

export default mailUser;
