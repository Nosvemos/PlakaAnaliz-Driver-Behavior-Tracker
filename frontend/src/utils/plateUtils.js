export const validatePlate = (input) => {
  const plateRegex = /^(\d{0,2})([A-Z]{0,3})(\d{0,4})$/;
  const [_, city = '', letters = '', numbers = ''] = input.match(plateRegex) || [];

  let errorMsg = '';
  const codeNum = parseInt(city);
  let maxNumbers = 4;
  if(letters.length === 3) maxNumbers = 3;

  const validations = [
    { condition: city.length !== 2, message: '❗ City code must be 2 digits' },
    { condition: city && (codeNum < 1 || codeNum > 81), message: '🚫 Invalid city code (01-81)' },
    { condition: letters.length < 1, message: '❗ You must enter at least 1 letter' },
    { condition: letters.length > 3, message: '⚠️ You can enter a maximum of 3 letters' },
    { condition: numbers.length < 2, message: '🔢 At least 2 digits are required' },
    { condition: numbers.length > maxNumbers, message: `📛 A maximum of ${maxNumbers} digits is allowed` }
  ];

  for(const val of validations) {
    if(val.condition) {
      errorMsg = val.message;
      break;
    }
  }

  let formatted = city;
  if(letters) formatted += ` ${letters}`;
  if(numbers) formatted += ` ${numbers.slice(0, maxNumbers)}`;

  return { error: errorMsg, formattedPlate: formatted };
};