const readline = require('readline');
const fs = require('fs');
let data = [];
let resultMale = [];
let resultFemale = [];
let totalMale = 0;
let totalFemale = 0;
let log4js = require('log4js');
let logger = log4js.getLogger();
/* log4.js */
module.exports = function convert(startYear)
{
if(typeof startYear === 'string') {
   return ' ';
 }


	if(typeof startYear !== 'number' || isNaN(startYear))
 {
       throw new Error('Not a number');
 }
const rl = readline.createInterface({
  input: fs.createReadStream('../inputdata/Indicators(1).csv')
});
rl.on('line', (line) => {
data = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
if(data[0] === 'Indonesia' || data[0] === 'Iraq' || data[0] === 'Colombia' ||
data[0] === 'Bangladesh')
{
if(data[3] === 'SP.DYN.LE00.FE.IN') {
 resultFemale.push({ country: data[0], year: data[4], gender: data[5]});
}
if(data[3] === 'SP.DYN.LE00.MA.IN')
{
resultMale.push({ country: data[0], year: data[4], gender: data[5]});
}
}
function addMale(rm)
 {
	for(let i = 0; i < rm.length; i = i + 1)
	{
/*eslint-disable*/totalMale = totalMale + parseInt(rm[i].gender);
	}
return totalMale;
}
addMale(resultMale);
function addFemale(rf) {
	for(let i = 0; i < rf.length; i = i + 1) {
/*eslint-disable*/totalFemale = totalFemale + parseInt(rf[i].gender);
	}
return totalFemale;
}
addFemale(resultFemale);
});
rl.on('close', () => {
fs.writeFile('output.json', (JSON.stringify(totalMale, null, 1)));
fs.writeFile('output1.json', (JSON.stringify(totalFemale, null, 1)));
logger.debug("file closed");
});

return "JSON written successfully"
}
