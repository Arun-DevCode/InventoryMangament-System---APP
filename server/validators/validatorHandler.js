import { validationResult } from "express-validator";

function ValidationHandler(req, res, next) {
  const errors = validationResult(req); // failure errors
  if (!errors.isEmpty()) {
    return res.json({
      error: true,
      reason: errors.errors,
    });
  }
  // global return
  return next();
}

export default ValidationHandler;
