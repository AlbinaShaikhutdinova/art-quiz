//import pic from `../assets/img/${img}.jpg`;
const obj = {};
getPic();
function getPic(){
    let context = require.context(`../assets/img`, false, /\.(png|jpe?g|svg)$/);
    
    context.keys().forEach((key) => {
    const num = key.split('./').pop() // remove the first 2 characters
    .substring(0, key.length - 6); // remove the file extension
    obj[num] = context(key);
    });
    //console.log(obj);
 
}

export default obj;