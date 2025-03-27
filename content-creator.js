var fs = require('fs');
var bb = require('@amida-tech/blue-button');
var bbg = require('@amida-tech/blue-button-generate');

// Load the C-CDA document
var xmlString = fs.readFileSync('template/CCDA_template.xml', 'utf-8');

// Parse the C-CDA document to JSON
var record = bb.parseString(xmlString);

// Update the demographics object
if (record.data && record.data.demographics) {
  record.data.demographics.name = 
  { middle: [ 'Kumar' ], last: 'Sengupta', first: 'Joysankar' };
}
console.log(record.data.demographics.name);
// Regenerate the C-CDA XML
var updatedXmlString = bbg.generateCCD(record);

// Save the updated XML back to the file
const nowDate = Date.now();

fs.writeFileSync('output/CCDA_output_'+ nowDate +'.xml', updatedXmlString, 'utf-8');

console.log('Patient Data pdated successfully!');

console.log(updatedXmlString);

