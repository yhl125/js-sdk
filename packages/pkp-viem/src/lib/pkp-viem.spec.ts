import * as LITCONFIG from 'lit.config.json';

describe('PKPViemAccount', () => {
  it('should create a wallet', async () => {
    const { PKPViemAccount } = await import('./pkp-viem');
    const account = new PKPViemAccount({
      controllerAuthSig: LITCONFIG.CONTROLLER_AUTHSIG,
      pkpPubKey: LITCONFIG.PKP_PUBKEY,
    });
    expect(account.address).toEqual(LITCONFIG.PKP_ETH_ADDRESS);
  });
});