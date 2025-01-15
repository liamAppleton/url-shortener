const randomKeyGenerator = () => {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let key = [];
  for (let i = 0; i < 16; i++) {
    key.push(chars[Math.floor(Math.random() * chars.length)]);
  }
  return key.join("");
};

module.exports = {
  randomKeyGenerator,
};
