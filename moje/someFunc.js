module.exports = someFunc=(callBack)=>{
  let count = 10;
 const handler = setInterval(()=>{
   count--;
   console.log(count);
   if (count===0) clearInterval(handler);
 },100)
}