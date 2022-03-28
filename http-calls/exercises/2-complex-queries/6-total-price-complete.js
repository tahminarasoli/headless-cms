/**
 * Fill in the blanks to create a script 
 * that prints the total cost if someone would buy one of every item
 * taking into consideration that it's impossible to buy items that are out of stuck,
 * and taking the discount rates into account 
 */

 import "./qs.js";
 async function ex6() {
   const query = qs.stringify(
   {
       populate: ['discount'],
       fields: ['price', 'outOfStock']
   }, 
   {
     encodeValuesOnly: true,
   });
   console.log("The query string", query);
 
   // call the matching endpoint and include the querystring after the ?
   const baseUrl = 'http://localhost:1337/api/products';
   const response = await fetch(`${baseUrl}?${query}`);
   const result = await response.json();
   console.log(result);
 }
 let sum = 0;
 for (let i = 0; i<result.data.length; i++){
    if(result.data[i].attributes.outOfStock === false){
      if(result.data[i].attributes.discount !== null){
        const discount = result.data[i].attributes.discount.data.attributes.percentage;
        result.data[i].attributes.price = Math.ceil(result.data[i].attributes.price * (100 - discount)/100);
      }
      sum = sum +result.data[i].attributes.price;
    }
    console.log(sum);
  return sum;
  }
  
 ex6();