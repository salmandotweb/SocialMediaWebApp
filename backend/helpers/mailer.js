const nodemailer = require("nodemailer");

const { google } = require("googleapis");

const { OAuth2 } = google.auth;

const OAUTH_PLAYGROUND = "https://developers.google.com/oauthplayground";

const { EMAIL, MAILING_ID, MAILING_SECRET, MAILING_REFRESH, PASSWORD } =
	process.env;

const oauth2Client = new OAuth2(
	MAILING_ID,
	MAILING_SECRET,
	MAILING_REFRESH,
	OAUTH_PLAYGROUND
);

exports.sendVerificationEmail = (email, name, url) => {
	oauth2Client.setCredentials({
		refresh_token: MAILING_REFRESH,
	});

	const accessToken = oauth2Client.getAccessToken();

	const smtpTransport = nodemailer.createTransport({
		service: "gmail",
		auth: {
			type: "OAuth2",
			user: EMAIL,
			pass: PASSWORD,
			clientId: MAILING_ID,
			clientSecret: MAILING_SECRET,
			refreshToken: MAILING_REFRESH,
			accessToken,
		},
	});

	const mailOptions = {
		from: EMAIL,
		to: email,
		subject: "Verify your email address",
		html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for registering with us. Please click the link below to verify your email address.</p>
        <p>${url}</p>
        <hr />
        <p>This email may contain sensitive information</p>
    `,
	};

	smtpTransport.sendMail(mailOptions, (error, info) => {
		if (error) {
			console.log(error);
		} else {
			console.log("Email sent: " + info.response);
		}
	});
};
