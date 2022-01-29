module.exports = async (req, res, next) => {
  try {
    if (req.headers.authentication == undefined) {
      return res.status(401).json({ message: 'You are not logged in!' });
    }
    const token = req.headers.authentication.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: 'You are not logged in!' });
    }
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({ message: 'You are not logged in!' });
  }
};
