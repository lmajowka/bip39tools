import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';

// Create an instance of BIP32 with ECC dependency
const bip32 = BIP32Factory(ecc);

async function generatePrivateKey(mnemonic) {
  try {

    for(let word of bip39.wordlists.portuguese){
        const mnemonicCadidate = mnemonic + ' ' + word
        
        if (bip39.validateMnemonic(mnemonicCadidate, bip39.wordlists.portuguese)) {
             console.log(mnemonicCadidate)
           }
    }


    // Validate the mnemonic with the Portuguese wordlist
    

    // Convert the mnemonic to a seed
    const seed = await bip39.mnemonicToSeed(mnemonic);

    // Generate the root node using the seed
    const root = bip32.fromSeed(seed);

    // Ensure the private key exists and convert it to hexadecimal
    if (!root.privateKey) {
      throw new Error('Chave privada não encontrada!');
    }

    const privateKeyHex = root.privateKey;
    const hexValues = Array.from(privateKeyHex, byte => byte.toString(16).padStart(2, '0'));
    return hexValues;
  } catch (error) {
    console.error('Erro:', error.message);
    return null;
  }
}

// Example Portuguese mnemonic phrase
const mnemonic = 'piada naja taxativo morango flechada vogal apetite reduzida chegada voltagem salada';

(async () => {
  const privateKeyHex = await generatePrivateKey(mnemonic);
  if (privateKeyHex) {
    console.log('Chave privada gerada (hexadecimal):', privateKeyHex.join(''));
  }
})();




