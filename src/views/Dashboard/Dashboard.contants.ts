export const getAuthSignMessage = (address: string, nonce: string | undefined) => {
  return `app.pistis.network wants you to sign in with your Ethereum account:\n${address}\n\nSign in with Ethereum to the app.\n\nURI: https://app.pistis.network\nVersion: 1\nChain ID: 80001\nNonce: ${nonce}`;
};
