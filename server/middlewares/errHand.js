const errHand = (err, req, res, next) => {
    if (err) {
        if (err.status) {
            return res.status(err.status).json({
                success: false,
                message: error.message,
            });
        } else if (err.response && err.response.data) {
            return res.status(400).json({
                success: false,
                message: err.response.data.error,
            });
        } else {
            return res.status(400).json({
                success: false,
                message: err.message,
            });
        }
    }
  };

module.exports = { errHand }