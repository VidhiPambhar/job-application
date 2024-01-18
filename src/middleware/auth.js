
module.exports = async (req, res, next) => {
  try {
    console.log(req.user,'req.user');
    //   get the token from the authorization header
    if (req.user && req.user.role === "admin") {
      return next();
    }
    res.status(403).json({ error: "Unauthorized" });
  } catch (error) {
    res.status(401).json({
      error: new Error("Invalid request!"),
    });
  }
};
