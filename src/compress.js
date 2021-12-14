export default function baseCompress(uncompressed) {
  const { fromCharCode } = String;
  const getCharFromInt = a => fromCharCode(a + 32);

  const hasOwnProp = (obj, key) => obj[key] !== undefined;
  const BITS_PER_CHAR = 15;
  const { pow } = Math;

  const contextDictionary = {};
  const contextDictionaryToCreate = {};
  const contextData = [];
  
  let value = 0;
  let contextW = '';
  let contextEnlargeIn = 2; // compensate for the first entry which should not count
  let contextDictSize = 3;
  let contextNumBits = 2;
  let contextDataVal = 0;
  let contextDataPosition = 0;

  for (let idx = 0; idx < uncompressed.length; idx += 1) {
    const contextC = uncompressed.charAt(idx);
    if (!hasOwnProp(contextDictionary, contextC)) {
      contextDictionary[contextC] = contextDictSize++;
      contextDictionaryToCreate[contextC] = true;
    }

    const contextWC = contextW + contextC;
    if (hasOwnProp(contextDictionary, contextWC)) {
      contextW = contextWC;
    } else {
      if (hasOwnProp(contextDictionaryToCreate, contextW)) {
        if (contextW.charCodeAt(0) < 256) {
          for (let i = 0; i < contextNumBits; i++) {
            contextDataVal = (contextDataVal << 1);
            if (contextDataPosition === BITS_PER_CHAR - 1) {
              contextDataPosition = 0;
              contextData.push(getCharFromInt(contextDataVal));
              contextDataVal = 0;
            } else {
              contextDataPosition++;
            }
          }
          value = contextW.charCodeAt(0);
          for (let i = 0; i < 8; i++) {
            contextDataVal = (contextDataVal << 1) | (value & 1);
            if (contextDataPosition === BITS_PER_CHAR - 1) {
              contextDataPosition = 0;
              contextData.push(getCharFromInt(contextDataVal));
              contextDataVal = 0;
            } else {
              contextDataPosition++;
            }
            value = value >> 1;
          }
        } else {
          value = 1;
          for (let i = 0; i < contextNumBits; i++) {
            contextDataVal = (contextDataVal << 1) | value;
            if (contextDataPosition === BITS_PER_CHAR - 1) {
              contextDataPosition = 0;
              contextData.push(getCharFromInt(contextDataVal));
              contextDataVal = 0;
            } else {
              contextDataPosition++;
            }
            value = 0;
          }
          value = contextW.charCodeAt(0);
          for (let i = 0; i < 16; i++) {
            contextDataVal = (contextDataVal << 1) | (value & 1);
            if (contextDataPosition === BITS_PER_CHAR - 1) {
              contextDataPosition = 0;
              contextData.push(getCharFromInt(contextDataVal));
              contextDataVal = 0;
            } else {
              contextDataPosition++;
            }
            value = value >> 1;
          }
        }
        contextEnlargeIn--;
        if (contextEnlargeIn === 0) {
          contextEnlargeIn = pow(2, contextNumBits);
          contextNumBits++;
        }
        contextDictionaryToCreate[contextW] = undefined;
      } else {
        value = contextDictionary[contextW];
        for (let i = 0; i < contextNumBits; i++) {
          contextDataVal = (contextDataVal << 1) | (value & 1);
          if (contextDataPosition === BITS_PER_CHAR - 1) {
            contextDataPosition = 0;
            contextData.push(getCharFromInt(contextDataVal));
            contextDataVal = 0;
          } else {
            contextDataPosition++;
          }
          value = value >> 1;
        }
      }
      contextEnlargeIn--;
      if (contextEnlargeIn === 0) {
        contextEnlargeIn = pow(2, contextNumBits);
        contextNumBits++;
      }
      // Add wc to the dictionary.
      contextDictionary[contextWC] = contextDictSize++;
      contextW = `${contextC}`;
    }
  }

  // Output the code for w.
  if (contextW !== '') {
    if (hasOwnProp(contextDictionaryToCreate,contextW)) {
      if (contextW.charCodeAt(0) < 256) {
        for (let i = 0; i < contextNumBits; i++) {
          contextDataVal = (contextDataVal << 1);
          if (contextDataPosition === BITS_PER_CHAR - 1) {
            contextDataPosition = 0;
            contextData.push(getCharFromInt(contextDataVal));
            contextDataVal = 0;
          } else {
            contextDataPosition++;
          }
        }
        value = contextW.charCodeAt(0);
        for (let i = 0; i < 8; i++) {
          contextDataVal = (contextDataVal << 1) | (value & 1);
          if (contextDataPosition === BITS_PER_CHAR - 1) {
            contextDataPosition = 0;
            contextData.push(getCharFromInt(contextDataVal));
            contextDataVal = 0;
          } else {
            contextDataPosition++;
          }
          value = value >> 1;
        }
      } else {
        value = 1;
        for (let i = 0; i < contextNumBits; i++) {
          contextDataVal = (contextDataVal << 1) | value;
          if (contextDataPosition === BITS_PER_CHAR - 1) {
            contextDataPosition = 0;
            contextData.push(getCharFromInt(contextDataVal));
            contextDataVal = 0;
          } else {
            contextDataPosition++;
          }
          value = 0;
        }
        value = contextW.charCodeAt(0);
        for (let i = 0; i < 16; i++) {
          contextDataVal = (contextDataVal << 1) | (value & 1);
          if (contextDataPosition === BITS_PER_CHAR - 1) {
            contextDataPosition = 0;
            contextData.push(getCharFromInt(contextDataVal));
            contextDataVal = 0;
          } else {
            contextDataPosition++;
          }
          value = value >> 1;
        }
      }
      contextEnlargeIn--;
      if (contextEnlargeIn === 0) {
        contextEnlargeIn = pow(2, contextNumBits);
        contextNumBits++;
      }
      contextDictionaryToCreate[contextW] = undefined;
    } else {
      value = contextDictionary[contextW];
      for (let i = 0; i < contextNumBits; i++) {
        contextDataVal = (contextDataVal << 1) | (value & 1);
        if (contextDataPosition === BITS_PER_CHAR - 1) {
          contextDataPosition = 0;
          contextData.push(getCharFromInt(contextDataVal));
          contextDataVal = 0;
        } else {
          contextDataPosition++;
        }
        value = value >> 1;
      }
    }
    contextEnlargeIn--;
    if (contextEnlargeIn === 0) {
      contextEnlargeIn = pow(2, contextNumBits);
      contextNumBits++;
    }
  }

  // Mark the end of the stream
  value = 2;
  for (let i = 0; i < contextNumBits; i++) {
    contextDataVal = (contextDataVal << 1) | (value & 1);
    if (contextDataPosition === BITS_PER_CHAR - 1) {
      contextDataPosition = 0;
      contextData.push(getCharFromInt(contextDataVal));
      contextDataVal = 0;
    } else {
      contextDataPosition++;
    }
    value = value >> 1;
  }

  // Flush the last char
  while (true) {
    contextDataVal = contextDataVal << 1;
    if (contextDataPosition === BITS_PER_CHAR - 1) {
      contextData.push(getCharFromInt(contextDataVal));
      break;
    } else {
      contextDataPosition++;
    }
  }

  return `${contextData.join('')} `;
};