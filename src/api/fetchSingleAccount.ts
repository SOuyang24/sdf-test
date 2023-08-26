// Fetch a single account from Horizon test network.
export const fetchSingleAccount = async (accountId: String) => {
  try {
    const url = `https://horizon-testnet.stellar.org/accounts/${accountId}`;
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
    throw Error(
      `Couldn't fetch account ${accountId} from Horizon on test network`,
    );
  }
};
