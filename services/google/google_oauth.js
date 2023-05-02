// https://developers.google.com/identity/sign-in/web/sign-in?hl=pt-br
// https://console.cloud.google.com/apis/credentials?hl=pt-br&pli=1&project=techlist

/*
{
  "web": {
    "client_id": "119082365930-uca7as2gugs86bt9ej76lt46ftgelgt7.apps.googleusercontent.com",
    "project_id": "splitbill-385521",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_secret": "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"
  }
}


POST: http://localhost:4003/login
{
    "token": "AIzaSyAp71Q0e0R57aQR2kLkCcv0kJlaN9Doz6g"
}

RESPONSE: 
{
  "Falha na autenticação do Google"
}

LOG: 
Error: Wrong number of segments in token: AIzaSyAp71Q0e0R57aQR2kLkCcv0kJlaN9Doz6g

*/

const CLIENT_ID = '119082365930-uca7as2gugs86bt9ej76lt46ftgelgt7.apps.googleusercontent.com'
const CLIENT_SECRET = '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'

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET);

class GoogleOAuth {
  async googleLogin(req, res) {
    const { token } = req.body;

    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });

      const { name, email, picture } = ticket.getPayload();

      res.status(200).json({ name, email, picture });
    } catch (error) {
      console.error(error);
      res.status(401).json('Falha na autenticação do Google');
    }
  }
}



module.exports = new GoogleOAuth;