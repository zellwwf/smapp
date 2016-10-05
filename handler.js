var exports = module.exports = {
  herror = function (res, message, code) {
  console.log("ERROR");
  res.status(code || 500).json({"error": message});
}
