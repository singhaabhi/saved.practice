/*
There are two gymnastics teams, Dolphins and Koalas. They compete against each 
other 3 times. The winner with the highest average score wins a trophy!
Your tasks:
1. Calculate the average score for each team, using the test data below
2. Compare the team's average scores to determine the winner of the competition, 
and print it to the console. Don't forget that there can be a draw, so test for that 
as well (draw means they have the same average score)
3. Bonus 1: Include a requirement for a minimum score of 100. With this rule, a 
team only wins if it has a higher score than the other team, and the same time a 
score of at least 100 points. Hint: Use a logical operator to test for minimum 
score, as well as multiple else-if blocks �
4. Bonus 2: Minimum score also applies to a draw! So a draw only happens when 
both teams have the same score and both have a score greater or equal 100 
points. Otherwise, no team wins the trophy
Test data:
§ Data 1: Dolphins score 96, 108 and 89. Koalas score 88, 91 and 110
§ Data Bonus 1: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 123
§ Data Bonus 2: Dolphins score 97, 112 and 101. Koalas score 109, 95 and 106
*/

// const dolphins = Math.floor((96+108+89)/3);
// const koalas = Math.floor((88+91+110)/3);

// console.log(dolphins, koalas)

// if (dolphins > koalas){
//     console.log("Dolphins win the trophy.")
// }
// else if (koalas > dolphins){
//     console.log("Koalas win the trophy.")
// }
// else if (koalas === dolphins){
//     console.log("Neither of them won the trophy, it's a draw.")
// }
// else {
//     console.log("something went wrong.")
// }

// const dolphins2ndMatch = Math.floor((97+112+101)/3);
// const koalas2ndMatch = Math.floor((109+95+123)/3);

// console.log(dolphins2ndMatch, koalas2ndMatch)

// if (dolphins2ndMatch > koalas2ndMatch && dolphins2ndMatch > 100 && koalas2ndMatch > 100){
//     console.log("2Dolphins win the trophy.")
// }
// else if (koalas2ndMatch > dolphins2ndMatch && dolphins2ndMatch > 100 && koalas2ndMatch > 100){
//     console.log("2Koalas win the trophy.")
// }
// else if (koalas2ndMatch === dolphins2ndMatch && dolphins2ndMatch > 100 && koalas2ndMatch > 100){
//     console.log("2Neither of them won the trophy, it's a draw.")
// }
// else {
//     console.log("2something went wrong.")
// }


// const dolphins3rdMatch = Math.floor((97+112+101)/3);
// const koalas3rdMatch = Math.floor((109+95+106)/3);

// console.log(dolphins3rdMatch, koalas3rdMatch)

// if (dolphins3rdMatch > koalas3rdMatch && dolphins3rdMatch > 100 && koalas3rdMatch > 100){
//     console.log("3Dolphins win the trophy.")
// }
// else if (koalas3rdMatch > dolphins3rdMatch && dolphins3rdMatch > 100 && koalas3rdMatch > 100){
//     console.log("3Koalas win the trophy.")
// }
// else if (koalas3rdMatch === dolphins3rdMatch && dolphins3rdMatch > 100 && koalas3rdMatch > 100){
//     console.log("3Neither of them won the trophy, it's a draw.")
// }
// else {
//     console.log("3something went wrong.")
// }

// 😍😍

// Steven wants to build a very simple tip calculator for whenever he goes eating in a 
// restaurant. In his country, it's usual to tip 15% if the bill value is between 50 and 
// 300. If the value is different, the tip is 20%.
// Your tasks:
// 1. Calculate the tip, depending on the bill value. Create a variable called 'tip' for 
// this. It's not allowed to use an if/else statement � (If it's easier for you, you can 
// start with an if/else statement, and then try to convert it to a ternary 
// operator!)
// 2. Print a string to the console containing the bill value, the tip, and the final value 
// (bill + tip). Example: “The bill was 275, the tip was 41.25, and the total value 
// 316.25”
// Test data:
// § Data 1: Test for bill values 275, 40 and 430

const bill = 430;

const tip = bill >= 50 && bill <= 300 ? bill * 15 / 100 : bill * 20 / 100;

const finalValue = bill + tip;

console.log(`${bill} is your bill, ${tip} is your tip and ${finalValue} is your total payable.`)
