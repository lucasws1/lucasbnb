import jwt from "jsonwebtoken";
const { JWT_SECRET_KEY } = process.env;

export const JWTVerify = (req) => {
  const { token } = req.cookies;

  if (token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SECRET_KEY, {}, (error, userInfo) => {
        if (error) {
          console.error("Deu algum erro ao verificar com o JWT:", error);
          reject(error);
        }

        resolve(userInfo);
      });
    });
  } else {
    console.error("Token inexistente");
    return null;
  }
};

export const JWTSign = (userObject) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      userObject,
      JWT_SECRET_KEY,
      { expiresIn: "1d" },
      (error, token) => {
        if (error) {
          console.error("Deu algum erro ao assinar com o JWT:", error);
          reject(error);
        }

        resolve(token);
      }
    );
  });
};
