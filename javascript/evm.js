/**
 * EVM From Scratch
 * JavaScript template
 *
 * To work on EVM From Scratch in JavaScript:
 *
 * - Install Node.js: https://nodejs.org/en/download/
 * - Edit `javascript/evm.js` (this file!), see TODO below
 * - Run `node javascript/evm.js` to run the tests
 *
 * If you prefer TypeScript, there's a sample TypeScript template in the `typescript` directory.
 */

function evm(code) {
  let pc = 0;
  let stack = [];

  while (pc < code.length) {
    const opcode = code[pc];
    pc++;

    // TODO: implement the EVM here!
  }

  return { success: true, stack };
}

function tests() {
  const tests = require("../evm.json");

  const hexStringToUint8Array = (hexString) =>
    new Uint8Array(hexString.match(/../g).map((byte) => parseInt(byte, 16)));

  const total = Object.keys(tests).length;
  let passed = 0;

  try {
    for (const t of tests) {
      console.log("Test #" + (passed + 1), t.name);
      try {
        // Note: as the test cases get more complex, you'll need to modify this
        // to pass down more arguments to the evm function
        const result = evm(hexStringToUint8Array(t.code.bin));

        if (result.success !== t.expect.success) {
          throw new Error(
            `Expected success=${t.expect.success}, got success=${result.success}`
          );
        }

        const expectedStackHex = t.expect.stack;
        const actualStackHex = result.stack.map((v) => "0x" + v.toString(16));

        if (expectedStackHex.join(",") !== actualStackHex.join(",")) {
          console.log("expected stack:", expectedStackHex);
          console.log("  actual stack:", actualStackHex);
          throw new Error("Stack mismatch");
        }
      } catch (e) {
        console.log(`\n\nCode of the failing test (${t.name}):\n`);
        console.log(t.code.asm.replaceAll(/^/gm, "  "));
        console.log(`\n\nHint: ${t.hint}\n`);
        console.log("\n");
        throw e;
      }
      passed++;
    }
  } finally {
    console.log(`Progress: ${passed}/${total}`);
  }
}

tests();
