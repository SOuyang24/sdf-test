// Fetch last 20 accounts with `SRT:GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B`
// asset from Horizon test network.
export const fetchAccounts = async () => {
  try {
    const url =
      "https://horizon-testnet.stellar.org/accounts/?asset=SRT:GCDNJUBQSX7AJWLJACMJ7I4BC3Z47BQUTMHEICZLE6MU4KQBRYG5JY6B&limit=20&order=desc";
    const response = await fetch(url);
    const json = await response.json();
    return json._embedded.records;
  } catch (e) {
    throw Error("Couldn't fetch accounts from Horizon on test network");
  }
};
