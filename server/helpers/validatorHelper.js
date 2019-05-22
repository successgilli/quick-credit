/* eslint-disable linebreak-style */

const checkMissingKeys = (req, keys) => {
  const missing = [];

  keys.forEach((keyVal) => {
    if (!(keyVal in req.body)) missing.push(` ${keyVal} key is required `);
  });
  return missing;
};

const sendValidationInfo = (res, req, keys, improperVals, next) => {
  if (!(checkMissingKeys(req, keys).length === 0)) {
    return res.status(400).json({
      status: 400,
      error: checkMissingKeys(req, keys).join('.'),
    })
  }
  if (!(improperVals(req).length === 0)) {
    return res.status(400).json({
      status: 400,
      error: improperVals(req).join('.'),
    })
  }
  next();
};

export default sendValidationInfo;