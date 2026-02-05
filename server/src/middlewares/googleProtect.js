import { OAuth2Client } from "google-auth-library";

export async function verify(token) {
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  return ticket.getPayload();
}

export const GoogleProtect = async (req, res, next) => {
  try {
    // brings detail from req
    const { idToken, email, id } = req.body;
    console.log(`Email : ${email} and Id : ${id}`);

    // verify the payload {email, id, idToken in json}
    const payload = await verify(idToken);
    console.log(payload);

    // check if req details is matched with google or not?
    if (email !== payload.email || id !== payload.sub) {
      const error = new Error("User Not Verified");
      error.statusCode = 400;
      return next(error);
    }
    next();
  } catch (error) {
    next(error);
  }
};
