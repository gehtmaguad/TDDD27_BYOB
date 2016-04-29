// expose sendJsonResponse directly
module.exports = {
  sendJsonResponse: function(res, status, content) {
    // set status of response object
    res.status(status);
    // set json content of response object
    res.json(content);
  },
};
