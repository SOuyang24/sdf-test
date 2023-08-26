import { fetchAccounts } from "api/fetchAccounts";
import AccountCard from "components/landing/AccountCard";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAccountId } from "../store/accountSlice";
import { AppDispatch } from "../store/store";

interface AccountInfo {
  balanceItem: {
    assetCode: string;
    balance: string;
  };
  accountId: string;
}

function Landing() {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accounts, setAcounts] = useState<AccountInfo[]>([]);
  const [heading, setHeading] = useState("");
  const handleSetAccountId = (accountId: string) => {
    dispatch(setAccountId(accountId));
  };

  const navigate = useNavigate();
  const LoadAllAcounts = () => {
    setLoading(true);
    fetchAccounts()
      .then((data) => {
        const result: AccountInfo[] = data.map(({account_id, balances}: {account_id: string, balances: {
          asset_code: string, balance: number
        }[]}) => ({
          accountId: account_id,
          balanceItem: {
            assetCode: balances[0].asset_code || "",
            balance: balances[0].balance,
          },
        }));
        setAcounts(result);
        setHeading(
          data.length > 0 ? `All accounts (${data.length})` : "All acounts",
        );
      })
      .catch((e) => {
        setError(e);
      })
      .finally(() => setLoading(false));
  };

  const handleAccountCardClick = (accountId: string) => {
    handleSetAccountId(accountId);
    navigate("/account");
  };
  return (
    <>
      <div className="landing-header">
        <p className="heading-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut vulputate
          mauris id metus tincidunt sagittis. Ut vestibulum, odio in aliquam
          ornare, est quam sagittis dui, id cursus lorem elit vel massa. In ut
          suscipit sapien, eu feugiat ipsum. Aliquam et mattis ex. Phasellus
          cursus tellus ac mi suscipit, vitae suscipit mauris efficitur.
        </p>
        <button
          className="primary-btn"
          onClick={LoadAllAcounts}
          disabled={loading}
        >
          Show accounts
        </button>
      </div>
      {loading ? (
        <p className="loading">Account List is loading...</p>
      ) : error ? (
        <p className="error">Error Occured</p>
      ) : (
        <div>
          <h1>{heading}</h1>
          <div className="account-list-grid-container">
            {accounts.length > 0
              ? accounts.map(
                  ({ accountId, balanceItem }: AccountInfo, index) => (
                    <AccountCard
                      key={accountId || index}
                      onClick={handleAccountCardClick}
                      accountId={accountId}
                      balanceItem={balanceItem}
                    />
                  ),
                )
              : null}
          </div>
        </div>
      )}
    </>
  );
}

export default Landing;
