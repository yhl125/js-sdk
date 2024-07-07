import { PKPEthersWallet, ethRequestHandler } from '@lit-protocol/pkp-ethers';
import { ethers } from 'ethers';
import { getEoaSessionSigs } from 'local-tests/setup/session-sigs/get-eoa-session-sigs';
import { TinnyEnvironment } from 'local-tests/setup/tinny-environment';

/**
 * Test Commands:
 * ✅ NETWORK=cayenne yarn test:local --filter=testPkpEthersWithEoaSessionSigsToSignMessage
 * ✅ NETWORK=manzano yarn test:local --filter=testPkpEthersWithEoaSessionSigsToSignMessage
 * ✅ NETWORK=localchain yarn test:local --filter=testPkpEthersWithEoaSessionSigsToSignMessage
 */
export const testPkpEthersWithEoaSessionSigsToSignMessage = async (
  devEnv: TinnyEnvironment
) => {
  const alice = await devEnv.createRandomPerson();
  const eoaSessionSigs = await getEoaSessionSigs(devEnv, alice);

  const pkpEthersWallet = new PKPEthersWallet({
    litNodeClient: devEnv.litNodeClient,
    pkpPubKey: alice.pkp.publicKey,
    controllerSessionSigs: eoaSessionSigs,
  });

  await pkpEthersWallet.init();

  // -- test signMessage
  try {
    // test 10 times speed
    console.time('signMessage0');
    const signature = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage0');
    console.time('signMessage1');
    const signature1 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage1');
    console.time('signMessage2');
    const signature2 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage2');
    console.time('signMessage3');
    const signature3 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage3');
    console.time('signMessage4');
    const signature4 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage4');
    console.time('signMessage5');
    const signature5 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage5');
    console.time('signMessage6');
    const signature6 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage6');
    console.time('signMessage7');
    const signature7 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage7');
    console.time('signMessage8');
    const signature8 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage8');
    console.time('signMessage9');
    const signature9 = await pkpEthersWallet.signMessage("Hello world");
    console.timeEnd('signMessage9');
    
    console.log('✅ signature:', signature);
    console.log('✅ signature1:', signature1);
    console.log('✅ signature2:', signature2);
    console.log('✅ signature3:', signature3);
    console.log('✅ signature4:', signature4);
    console.log('✅ signature5:', signature5);
    console.log('✅ signature6:', signature6);
    console.log('✅ signature7:', signature7);
    console.log('✅ signature8:', signature8);
    console.log('✅ signature9:', signature9);
  } catch (e) {
    throw new Error('❌ Error: ' + e.message);
  }
};
