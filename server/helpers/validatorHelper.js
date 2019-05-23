const checkMissingKeys = (req, keys) => {
  const missing = {};

  keys.forEach((keyVal) => {
    if (!(keyVal in req.body)) missing[keyVal] = ` ${keyVal} key is required `;
  });
  return missing;
};

const sendValidationInfo = (res, req, keys, improperVals, next) => {
  if (!(Object.keys(checkMissingKeys(req, keys)).length === 0)) {
    return res.status(400).json({
      status: 400,
      error: checkMissingKeys(req, keys),
    });
  }
  if (!(Object.keys(improperVals(req)).length === 0)) {
    return res.status(400).json({
      status: 400,
      error: improperVals(req),
    });
  }
  next();
};

export default sendValidationInfo;
