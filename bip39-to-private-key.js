import * as bip39 from 'bip39'
import { BIP32Factory } from 'bip32'
import * as ecc from 'tiny-secp256k1'
import CoinKey from 'coinkey';

// Inicializar BIP32
const bip32 = BIP32Factory(ecc)
const seed   = bip39.mnemonicToSeedSync('piada naja taxativo morango flechada vogal apetite reduzida chegada voltagem salada terno');
const root   = bip32.fromSeed(Buffer.from(seed, 'hex')).deriveHardened(44).deriveHardened(0).deriveHardened(0).derive(0).derive(0);
console.log(generateAddress(root.privateKey));

function generateAddress(privateKey) {
  const _key = new CoinKey(Buffer.from(privateKey, 'hex'));
  _key.compressed = true;
  return _key.publicAddress;
}
