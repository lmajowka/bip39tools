import * as bip39 from 'bip39';
import { BIP32Factory } from 'bip32';
import * as ecc from 'tiny-secp256k1';
import CoinKey from 'coinkey';

// Create an instance of BIP32 with ECC dependency
const bip32 = BIP32Factory(ecc);

(async () => {
  for(let i = 0; i < 20 ; i++){
    const mnemonic = bip39.generateMnemonic(128, null, bip39.wordlists.portuguese);
    console.log('Nova frase mnemônica em português:', mnemonic);
  }
})();





