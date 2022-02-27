import jwt from 'jsonwebtoken';

const auth = async(req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = true;
    let decodedData;

    if (token && isCustomAuth) {
      decodedData = jwt.verify(token, 'test');
      req.userId = decodedData?.id;
    } else {

    }
    next();
  } catch (error) {
    console.log(error);
  }
}

// click the like button
// auth middleware => like controller
export default auth;