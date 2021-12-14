const RESET_VALUE = 16384;
const POW_2_2 = 4; // 2^2
const POW_2_8 = 256; // 2^8
const POW_2_16 = 65536; // 2^16

const { fromCharCode } = String;

export default function baseDecompress(compressed) {
  const getValue = index => compressed.charCodeAt(index) - 32;

  const { length } = compressed;
  const dictionary = [0, 1, 2];
  const result = [];
  const data = {
    index: 1,
    val: getValue(0),
    position: RESET_VALUE,
  };

  let enlargeIn = 4;
  let dictSize = 4;
  let numBits = 3;
  let entry = '';
  let bits = 0;
  let resb;
  let maxpower = POW_2_2;
  let power = 1;
  let c;

  while (power !== maxpower) {
    resb = data.val & data.position;
    data.position >>= 1;
    if (data.position === 0) {
      data.position = RESET_VALUE;
      data.val = getValue(data.index++);
    }
    bits |= (resb > 0 ? 1 : 0) * power;
    power <<= 1;
  }

  if (bits === 0) {
    bits = 0;
    maxpower = POW_2_8;
    power = 1;
    while (power !== maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position === 0) {
        data.position = RESET_VALUE;
        data.val = getValue(data.index++);
      }
      bits |= (resb > 0 ? 1 : 0) * power;
      power <<= 1;
    }
    c = fromCharCode(bits);
  } else if (bits === 1) {
    bits = 0;
    maxpower = POW_2_16;
    power = 1;
    while (power !== maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position === 0) {
        data.position = RESET_VALUE;
        data.val = getValue(data.index++);
      }
      bits |= (resb > 0 ? 1 : 0) * power;
      power <<= 1;
    }
    c = fromCharCode(bits);
  } else if (bits === 2) {
    return '';
  }
  
  dictionary[3] = c;
  result.push(c);
  
  let w = c;

  while (true) {
    if (data.index > length) return '';

    bits = 0;
    maxpower = 2 ** numBits;
    power = 1;
    while (power !== maxpower) {
      resb = data.val & data.position;
      data.position >>= 1;
      if (data.position === 0) {
        data.position = RESET_VALUE;
        data.val = getValue(data.index++);
      }
      bits |= (resb > 0 ? 1 : 0) * power;
      power <<= 1;
    }

    c = bits;
    if (c === 0) {
      bits = 0;
      maxpower = POW_2_8;
      power = 1;
      while (power !== maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position === 0) {
          data.position = RESET_VALUE;
          data.val = getValue(data.index++);
        }
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }

      dictionary[dictSize++] = fromCharCode(bits);
      c = dictSize - 1;
      enlargeIn--;
    } else if (c === 1) {
      bits = 0;
      maxpower = POW_2_16;
      power = 1;
      while (power !== maxpower) {
        resb = data.val & data.position;
        data.position >>= 1;
        if (data.position === 0) {
          data.position = RESET_VALUE;
          data.val = getValue(data.index++);
        }
        bits |= (resb > 0 ? 1 : 0) * power;
        power <<= 1;
      }
      dictionary[dictSize++] = fromCharCode(bits);
      c = dictSize - 1;
      enlargeIn--;
    } else if (c === 2) {
      return result.join('');
    }

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits++;
    }

    if (dictionary[c]) {
      entry = dictionary[c];
    } else if (c === dictSize) {
      entry = w + w.charAt(0);
    } else {
      return '';
    }
    result.push(entry);

    // Add w+entry[0] to the dictionary.
    dictionary[dictSize++] = w + entry.charAt(0);
    enlargeIn--;

    w = entry;

    if (enlargeIn === 0) {
      enlargeIn = 2 ** numBits;
      numBits++;
    }
  }
};