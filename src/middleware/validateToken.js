const jwt = require("jsonwebtoken");
const { Roles } = require("../models/jobProfile.model");

module.exports = async (request, response, next) => {
  try {
    //   get the token from the authorization header
    const token = await request.headers.authorization.split(" ")[1];

    //check if the token matches the supposed origin
    const decodedToken = jwt.verify(token, "RANDOM-TOKEN");

    // retrieve the user details of the logged in user

    console.log(decodedToken, "decodedToken");
    const user = await Roles.findOne({
      where: {
        id: decodedToken.userId,
      },
      raw: true,
      nest: true,
    });
    console.log(user, "user");
    // pass the user down to the endpoints here
    request.user = user;

    // pass down functionality to the endpoint
    next();
  } catch (error) {
    response.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
