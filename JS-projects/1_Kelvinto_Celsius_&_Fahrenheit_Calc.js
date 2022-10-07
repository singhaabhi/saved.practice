const kelvin = 0;
//assign (293) to kelvin

const celsius = kelvin - 273;
//convert kelvin to celsius

let fahrenheit = celsius * (9 / 5) + 32;
// convert celsius to fahrenheit

fahrenheit = Math.floor(fahrenheit);
//convert decimal to whole

console.log(`The temperature is ${fahrenheit} degrees Fahrenheit.`);


