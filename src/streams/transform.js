import { createInterface } from "node:readline";
import { stdin as input, stdout as output } from "node:process";

const transform = async () => {
  const readline = createInterface({ input, output, terminal: false });

  readline.on("line", (line) => {
    const reversed = [...line].reverse().join("");
    output.write(reversed + ' - Reversed');
    console.log('');
  });
};

await transform();
