let raceNumber = Math.floor(Math.random() * 1000);
let earlyReg = true;
let runnerAge = 18;

if (runnerAge > 18 && earlyReg === true) 
{
  raceNumber = raceNumber + 1000;
}
if (runnerAge > 18 && earlyReg === true) 
{
  console.log(`${raceNumber} age ${runnerAge} will race at 9:30 am.`);
} else if (runnerAge > 18 && earlyReg === false) 
{
  console.log(`${raceNumber} age ${runnerAge} will race at 11:00 am.`);
} else if (runnerAge < 18) 
{
  console.log(`${raceNumber} age ${runnerAge} will race at 12:30 pm.`);
} else (runnerAge === 18) 
{
  console.log(`All the 18 year olds, please go to the registration desk to know your places.`);
}
