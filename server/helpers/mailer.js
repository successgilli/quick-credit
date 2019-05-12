import nodemailer from 'nodemailer';

function mailUser(email, status, loanDetails) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'successgilli@gmail.com',
      pass: 'quininmotion2',
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
  });
}

export default mailUser;
