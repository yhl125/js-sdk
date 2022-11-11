import { ALL_LIT_CHAINS, CheckAndSignAuthParams, JsonAuthSig, LIT_ERROR, VMTYPE } from "@litprotocol-dev/constants";
import { throwError } from "@litprotocol-dev/misc";
import { checkAndSignCosmosAuthMessage } from "./chains/cosmos";
import { checkAndSignEVMAuthMessage } from "./chains/eth";
import { checkAndSignSolAuthMessage } from "./chains/sol";

/**
 *
 * Check for an existing cryptographic authentication signature and create one of it does not exist.  This is used to prove ownership of a given crypto wallet address to the Lit nodes.  The result is stored in LocalStorage so the user doesn't have to sign every time they perform an operation.
 *
 * @param { CheckAndSignAuthParams }
 *
 *  @returns { AuthSig } The AuthSig created or retrieved
 */
 export const checkAndSignAuthMessage = ({
  chain,
  resources,
  switchChain,
}: CheckAndSignAuthParams): Promise<JsonAuthSig> => {
  const chainInfo = ALL_LIT_CHAINS[chain];

  console.log('chain:', chain);
  // -- validate: if chain info not found
  if (!chainInfo) {
    throwError({
      message: `Unsupported chain selected.  Please select one of: ${Object.keys(
        ALL_LIT_CHAINS
      )}`,
      error: LIT_ERROR.UNSUPPORTED_CHAIN_EXCEPTION,
    });
  }

  // -- check and sign auth message based on chain
  if (chainInfo.vmType === VMTYPE.EVM) {
    return checkAndSignEVMAuthMessage({ chain, resources, switchChain });
  } else if (chainInfo.vmType === VMTYPE.SVM) {
    return checkAndSignSolAuthMessage();
  } else if (chainInfo.vmType === VMTYPE.CVM) {
    return checkAndSignCosmosAuthMessage({ chain });
  } else {
    return throwError({
      message: `vmType not found for this chain: ${chain}.  This should not happen.  Unsupported chain selected.  Please select one of: ${Object.keys(
        ALL_LIT_CHAINS
      )}`,
      error: LIT_ERROR.UNSUPPORTED_CHAIN_EXCEPTION,
    });
  }
};