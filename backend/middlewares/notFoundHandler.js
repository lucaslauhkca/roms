const notFoundHandler = (req, res) => {
  res.status(404).json({ msg: 'Route does not exist' });
};

module.exports = notFoundHandler;
