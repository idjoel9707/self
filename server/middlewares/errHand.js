const errHand = (error, req, res, next) => {
    if (error) {
      if (error.status) {
        return res.status(error.status).json({
          success: false,
          message: error.message,
        });
      } else if (error.response && error.response.data) {
        return res.status(400).json({
          success: false,
          message: error.response.data.error,
        });
      } else {
        return res.status(400).json({
          success: false,
          message: error.message,
        });
      }
    }
  };

module.exports = { errHand }