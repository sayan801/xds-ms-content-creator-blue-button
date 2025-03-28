var fs = require("fs");
var readline = require("readline");
var bb = require("@amida-tech/blue-button");
var bbg = require("@amida-tech/blue-button-generate");

// Create a readline interface
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

// Prompt the user for demographic details
rl.question("\n----------Update Demographics -------------\n\nEnter first name: ", function (firstName) {
  rl.question("Enter middle name: ", function (middleName) {
    rl.question("Enter last name: ", function (lastName) {
      rl.question("\n----------Update Allergy Observation -------------\n\nEnter allergen name: ", function (allergenName) {
        rl.question("Enter reaction name: ", function (reactionName) {
          rl.question("Enter allergy status (e.g., Active): ", function (statusName) {
            // Load the C-CDA document
            var xmlString = fs.readFileSync("template/CCDA_template.xml", "utf-8");

            // Parse the C-CDA document to JSON
            var record = bb.parseString(xmlString);

            // Update the demographics object
            if (record.data && record.data.demographics) {
              record.data.demographics.name = {
                first: firstName,
                middle: [middleName],
                last: lastName,
              };
            }

            // Update the allergies object
            if (record.data && record.data.allergies) {
              // Push a new allergy observation to the allergies array
              record.data.allergies.push({
                observation: {
                  allergen: {
                    name: allergenName,
                  },
                  intolerance: {
                    name: "Propensity to adverse reactions to food",
                    code: "418471000",
                    code_system_name: "SNOMED CT",
                  },
                  date_time: {
                    low: {
                      date: new Date().toISOString(),
                      precision: "day",
                    },
                  },
                  reactions: [
                    {
                      reaction: {
                        name: reactionName,
                      },
                    },
                  ],
                  status: {
                    name: statusName,
                    code: "55561003",
                    code_system_name: "SNOMED CT",
                  },
                },
              });
            }

            // Regenerate the C-CDA XML
            var updatedXmlString = bbg.generateCCD(record);

            // Save the updated XML back to the file
            const nowDate = Date.now();
            fs.writeFileSync(
              "output/CCDA_output_" + nowDate + ".xml",
              updatedXmlString,
              "utf-8"
            );
            console.log("Patient Data updated successfully!");
            console.log("\n--------Updated demographics data-----------\n");
            console.log(JSON.stringify(record.data.demographics,null, 2));
            console.log("\n--------Updated allergy data-----------\n");
            console.log(JSON.stringify(record.data.allergies,null, 2));
            console.log("Updated XML saved to output/CCDA_output_" + nowDate + ".xml");
            rl.close();
          });
        });
      });
    });
  });
});
