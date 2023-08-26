import React, { useMemo } from "react";
import createStellarIdenticon from "stellar-identicon-js";

interface AccountCardProps {
  balanceItem: {
    assetCode: string;
    balance: string;
  };
  accountId: string;
  onClick: (accountId: string) => void;
}

const AccountCard = ({ balanceItem, accountId, onClick }: AccountCardProps) => {
  const renderedIcon: string = useMemo(() => {
    const canvas = createStellarIdenticon(accountId);
    return canvas.toDataURL(); // create  data URI containing a generated icon in PNG forma
  }, [accountId]);
  const accountIDMasked = useMemo(() => {
    return accountId.length > 10
      ? accountId.slice(0, 5) + "..." + accountId.slice(-5)
      : accountId;
  }, [accountId]);
  const balanceRounded = useMemo(() => {
    return parseFloat(balanceItem.balance).toFixed(2);
  }, [balanceItem.balance]);
  return (
    <div className="account-card" onClick={() => onClick(accountId)}>
      <div className="account-section">
        <img
          className="account-icon"
          src={renderedIcon}
          alt={accountIDMasked}
        />
        <span className="account-id">{accountIDMasked}</span>
      </div>
      <div>
        <b>{balanceRounded} {balanceItem.assetCode}</b>
      </div>
    </div>
  );
};

export default AccountCard;
