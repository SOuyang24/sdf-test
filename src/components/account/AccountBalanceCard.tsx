import React, { useMemo } from "react";

interface AccountBalanceCardProps {
  assetCode: string;
  balance: string;
  assetType: string;
  reservedXLMBalance?: number;
  assetDomain: string;
}

const AccountBalanceCard = ({
  assetCode,
  balance,
  assetType,
  assetDomain,
  reservedXLMBalance,
}: AccountBalanceCardProps) => {
  const balanceRounded = useMemo(() => {
    return parseFloat(balance).toFixed(2);
  }, [balance]);
  const availableBalance = useMemo(() => {
    if (assetType === "native") {
      return (parseFloat(balance) - (reservedXLMBalance || 0)).toFixed(2);
    }
    return null;
  }, [assetType, balance, reservedXLMBalance]);
  return (
    <div className="account-balance-card">
      <div>
        <b>
          {balanceRounded} {assetCode || "XLM"}
        </b>{"  "}
        {assetType === "native" && <span>({availableBalance} XLM)</span>}
      </div>
      <div className="account-asset-domain">{assetDomain}</div>
    </div>
  );
};

export default AccountBalanceCard;
