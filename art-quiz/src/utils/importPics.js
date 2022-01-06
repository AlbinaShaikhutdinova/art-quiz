const obj = {};
getPic();
function getPic() {
  const context = require.context(`../assets/img`, false, /\.(png|jpe?g|svg)$/);
  context.keys().forEach((key) => {
    const num = key.split('./').pop().substring(0, key.length - 6);
    obj[num] = context(key);
  });
}

export default obj;