# xds-ms-content-creator-blue-button

This project is designed to parse and generate C-CDA documents using Blue Button libraries. It allows users to update patient demographic information and allergy observations in a C-CDA document.

## Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sayan801/xds-ms-content-creator-blue-button.git
   cd xds-ms-content-creator-blue-button
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Usage

1. Ensure you have a valid C-CDA template file located at `template/CCDA_template.xml`.

2. Run the program:

   ```bash
   npm start
   ```

3. Follow the prompts to enter the following details:

   - **Demographics**:
     - First name
     - Middle name
     - Last name
   - **Allergy Observation**:
     - Allergen name
     - Reaction name
     - Allergy status (e.g., Active)

4. The program will:

   - Update the demographics and allergy data in the C-CDA document.
   - Save the updated C-CDA document in the `output` directory with a timestamped filename, e.g., `CCDA_output_<timestamp>.xml`.

5. The updated demographics and allergy data will also be printed in JSON format for verification.

### Example

Here’s an example of how the program works:

1. Run the program:

   ```bash
   npm start
   ```

2. Enter the following details when prompted:

   ```
   Enter first name: John
   Enter middle name: A
   Enter last name: Doe
   Enter allergen name: Peanuts
   Enter reaction name: Hives
   Enter allergy status (e.g., Active): Active
   ```

3. The program will generate an updated C-CDA document and save it in the `output` directory:

   ```
   output/CCDA_output_1740451200000.xml
   ```

4. The updated demographics and allergy data in JSON format will look like this:
   ```json
   {
     "demographics": {
       "name": {
         "first": "Bibha",
         "middle": ["Rani"],
         "last": "Sen"
       }
     },
     "allergies": [
       {
         "observation": {
           "allergen": {
             "name": "Peanuts"
           },
           "reactions": [
             {
               "reaction": {
                 "name": "Hives"
               }
             }
           ],
           "status": {
             "name": "Active"
           }
         }
       }
     ]
   }
   ```

## Project Structure

- `content-creator.js`: Main script for updating C-CDA documents.
- `template/CCDA_template.xml`: Template C-CDA document (ensure this file exists).
- `output/`: Directory where updated C-CDA documents are saved.

## Dependencies

- `@amida-tech/blue-button`: For parsing C-CDA documents.
- `@amida-tech/blue-button-generate`: For generating C-CDA documents.

## License

This project is licensed under the ISC License.
