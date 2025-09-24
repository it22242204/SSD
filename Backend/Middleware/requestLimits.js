// Backend/Middleware/requestLimits.js
const MAX_DEFAULT_BYTES = 1024 * 1024; // 1MB fallback

/**
 * checkContentLength(maxBytes)
 * Reject requests with Content-Length header > maxBytes.
 * Note: attackers can omit Content-Length for chunked transfers; body parsers will still enforce limits.
 */
function checkContentLength(maxBytes = MAX_DEFAULT_BYTES) {
  return (req, res, next) => {
    try {
      const cl = req.headers['content-length'];
      if (cl && !isNaN(cl) && Number(cl) > maxBytes) {
        return res.status(413).json({ message: 'Payload too large' });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

/**
 * validateMaxArray(fieldName, maxItems)
 * Use this middleware for endpoints accepting arrays in the JSON body.
 * Example usage:
 *   router.post('/bulk', validateMaxArray('items', 1000), handler);
 */
function validateMaxArray(fieldName, maxItems = 1000) {
  return (req, res, next) => {
    try {
      const body = req.body || {};
      const arr = body[fieldName];
      if (arr === undefined) return next(); // nothing to check
      if (!Array.isArray(arr)) {
        return res.status(400).json({ message: `${fieldName} must be an array` });
      }
      if (arr.length > maxItems) {
        return res.status(413).json({ message: `${fieldName} too large (max ${maxItems})` });
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

/**
 * limiterForFileUploads(multerLimits)
 * Returns multer limits config object you can pass when building the multer middleware.
 * Example:
 *   const upload = multer({ storage, limits: limiterForFileUploads({fileSize: 5*1024*1024}) })
 */
function limiterForFileUploads(custom = {}) {
  // default to 5MB
  const defaults = { fileSize: 5 * 1024 * 1024 };
  return Object.assign(defaults, custom);
}

module.exports = {
  checkContentLength,
  validateMaxArray,
  limiterForFileUploads,
};
