const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'fustroli@gmail.com',
    subject: 'Thanks for joining Guitar Practice Assitant',
    html: `  <h1>Welcome, ${name}</h1>
    <p>Here you will find everything you need for your practice sessions.</p>
    <h3>Practice Items</h3>
    <p>
      You can add your practice items on the left. Set a title and a practice
      duration. You can choose between a song or an excercise.
    </p>
    <h3>Metronome</h3>
    <p>
      The most important thing for any musician is keeping time. You can
      practice with a metronome under the Metronome tab.
    </p>
    <h3>Fretboard</h3>
    <p>
      Every guitarist should know the notes on the fretboard. Practice your
      notes with a fun game under the Fretboard tab.
    </p>`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: 'fustroli@gmail.com',
    subject: 'Sorry to see you go...',
    html: `<h1>Sorry to see you go, ${name}</h1>
      <p>I hope we can welcome you back soon!</p>`,
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};
