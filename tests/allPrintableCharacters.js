export default function() {
  let testString = '';
  for (let i = 32; i < 127; ++i) {
    testString += String.fromCharCode(i);
  }
  for (let i = 128 + 32; i < 55296; ++i) {
    testString += String.fromCharCode(i);
  }
  for (let i = 63744; i < 65536; ++i) {
    testString += String.fromCharCode(i);
  }
  return testString;
};