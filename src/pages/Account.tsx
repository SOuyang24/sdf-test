
import { fetchSingleAccount } from "api/fetchSingleAccount";
import AccountBalanceCard from "components/account/AccountBalanceCard";
import AccountDetailCard from "components/account/AccountDetailCard";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../store/store";
export interface AccountDetail {
  balances: Balance[];
  numSponsored: number;
  numSponsoring: number;
  signersCount: number;
  subentryCount: number;
  sequence: string;
  accountId: string;
}

interface Balance {
  assetType: string;
  assetIssuer: string;
  assetCode: string;
  amount: string;
  sellingLiabilities: string;
}

interface AssetDomain {
  assetIssuer: string;
  assetDomain: string;
}

const displayAssetTypes = ["native", "credit_alphanum4", "credit_alphanum12"];

function Account() {
  const accountId =
    useSelector((state: RootState) => state.account.accountId) || "";
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [accountDetail, setAccountDetail] = useState<AccountDetail>();
  const [assetDomainArray, setAssetDomainArray] = useState<AssetDomain[]>([]);
  const navigate = useNavigate();
  const loadAcountDetail = useCallback(
    (accountId: string) => {
      if (!accountId) {
        navigate("/");
      }
      setLoading(true);
      fetchSingleAccount(accountId)
        .then(
          ({
            balances,
            num_sponsored,
            num_sponsoring,
            signers,
            subentry_count,
            sequence,
            account_id,
          }) => {
            const accountDetail: AccountDetail = {
              balances: balances.map(({asset_code, asset_issuer, asset_type, balance, selling_liabilities}: {asset_code: string, asset_issuer: string, asset_type: string, balance: number, selling_liabilities: number}) => ({
                assetCode: asset_code || "",
                assetIssuer: asset_issuer || "",
                assetType: asset_type,
                amount: balance,
                sellingLiabilities: selling_liabilities,
              })),
              numSponsoring: num_sponsoring,
              signersCount: signers?.length || 0,
              subentryCount: subentry_count,
              numSponsored: num_sponsored,
              sequence: sequence,
              accountId: account_id,
            };
            const uniqueAssetIssuerList = Array.from(
              new Set<string>(balances.map(({asset_issuer}: {asset_issuer: string}) => asset_issuer || "")),
            ).filter((item) => item !== "");
            Promise.all(
              uniqueAssetIssuerList.map((item) =>
                fetchSingleAccount(item),
              ),
            )
              .then((results) => {
                setAssetDomainArray(
                  results.map(({account_id, home_domain}: {account_id: string, home_domain: string} ) => ({
                    assetIssuer: account_id,
                    assetDomain: home_domain,
                  })),
                );
              })
              .catch((e) => setError(e));
            setAccountDetail(accountDetail);
          },
        )
        .catch((e) => {
          setError(e);
        })
        .finally(() => setLoading(false));
    },
    [navigate],
  );

  useEffect(() => {
    loadAcountDetail(accountId);
  }, [accountId, loadAcountDetail]);

  const getAssetDomain = useCallback(
    (assetIssuer: string) => {
      return (
        assetDomainArray.find((item) => item.assetIssuer === assetIssuer)
          ?.assetDomain || "native"
      );
    },
    [assetDomainArray],
  );

  const hasNativeBalance = useMemo(() => {
    return accountDetail?.balances.find((item) => item.assetType === "native")
      ? true
      : false;
  }, [accountDetail]);

  const reservedXLMBalance = useMemo(() => {
    if (accountDetail) {
      const balance = accountDetail?.balances.find(
        (item) => item.assetType === "native",
      );
      return balance
        ? (2 +
            accountDetail.subentryCount +
            accountDetail.numSponsoring -
            accountDetail.numSponsored) *
            0.5 +
            parseFloat(balance.sellingLiabilities)
        : 0.0;
    }
    return 0.0;
  }, [accountDetail]);

  const balanceArray = useMemo(() => {
    return (
      accountDetail?.balances.filter((item: Balance) =>
        displayAssetTypes.includes(item.assetType),
      ) || []
    );
  }, [accountDetail]);

  return (
    <>
      <div className="account-detail-header">
        <h1>Account details</h1>
        <button className="secondary-btn" onClick={() => navigate("/")}>
          Go back
        </button>
      </div>
      {loading ? (
        <p className="loading">Account Detail is loading...</p>
      ) : error ? (
        <p className="error">Error Occured</p>
      ) : (
        accountDetail && (
          <div>
            <AccountDetailCard
              numSponsored={accountDetail.numSponsored}
              numSponsoring={accountDetail.numSponsoring}
              sequence={accountDetail.sequence}
              accountId={accountDetail.accountId}
              balanceCount={
                hasNativeBalance
                  ? accountDetail.balances.length - 1
                  : accountDetail.balances.length
              }
              signersCount={accountDetail.signersCount}
              subentryCount={accountDetail.subentryCount}
              reservedXLMBalance={reservedXLMBalance}
            />
            <h1>Account balances ({balanceArray.length})</h1>
            <div className="account-balance-card-group">
              {balanceArray.length > 0
                ? balanceArray
                    .sort((a, b) => {
                      return a.assetCode.localeCompare(b.assetCode);
                    })
                    .map((item: Balance, index) => (
                      <AccountBalanceCard
                        key={index}
                        assetCode={item.assetCode}
                        balance={item.amount}
                        assetType={item.assetType}
                        reservedXLMBalance={
                          item.assetType === "native" ? reservedXLMBalance : 0.0
                        }
                        assetDomain={getAssetDomain(item.assetIssuer)}
                      />
                    ))
                : null}
            </div>
          </div>
        )
      )}
    </>
  );
}

export default Account;
