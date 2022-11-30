const parseEnv = () => {
    const envs = process.env;

    let output = '';

    for (let envName in envs) {
      if (envs.hasOwnProperty(envName) && envName.substring(0, 4) === 'RSS_') {
        // console.log(`${envName}=${envs[envName]};`);
        // Add ";" to an output if it not a first env.
        output += (output ? '; ' : '');
        // Add evn with value to the output.
        output += `${envName}=${envs[envName]}`;
      }
    }

    if (output) {
      console.info(output);
    }
};

parseEnv();