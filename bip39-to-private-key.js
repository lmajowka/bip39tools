import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import CoinKey from 'coinkey';

// Create an instance of BIP32 with ECC dependency
const bip32 = BIP32Factory(ecc);

async function generatePrivateKey(mnemonic) {
  try {
    // Validate the mnemonic with the Portuguese wordlist
    if (!bip39.validateMnemonic(mnemonic, bip39.wordlists.portuguese)) {
      throw new Error('Frase mnemônica inválida!');
    }

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
const mnemonic = 'piada naja taxativo morango flechada vogal apetite reduzida chegada voltagem salada terno';

(async () => {
  const privateKeyHex = await generatePrivateKey(mnemonic);
  if (privateKeyHex) {
    console.log('Chave privada gerada (hexadecimal):', privateKeyHex.join(''));
    console.log('Endereco:', generateAddress(privateKeyHex));
  }
})();

function generateAddress(privateKey) {
  const _key = new CoinKey(Buffer.from(privateKey, 'hex'));
  _key.compressed = true;
  return _key.publicAddress;
}



