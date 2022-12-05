const parseArgs = () => {
  let isValue = false;
  let output = '';

  process.argv.map((arg) => {
    if (arg.substring(0, 2) === '--') {
      output += output ? ', ' : '';
      output += `${arg.substring(2)} is `;
      isValue = true;
    } else if (isValue) {
      output += `${arg}`;
    }
  })

  if (output) {
    console.info(output);
  }
};

parseArgs();