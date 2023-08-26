import React, { memo, useMemo } from "react";
import createStellarIdenticon from "stellar-identicon-js";
interface AccountDetailCardProps {
  numSponsored: number;
  numSponsoring: number;
  balanceCount: number;
  signersCount: number;
  subentryCount: number;
  reservedXLMBalance: number;
  sequence: string;
  accountId: string;
}

const AccountDetailUnit = memo(
  ({ title, value }: { title: string; value: string | number }) => {
    return (
      <div className="account-detail-unit">
        <p>{title}</p>
        <p>
          <b>{value}</b>
        </p>
      </div>
    );
  },
);

const AccountDetailCard = ({
  numSponsored,
  numSponsoring,
  reservedXLMBalance,
  balanceCount,
  signersCount,
  subentryCount,
  sequence,
  accountId,
}: AccountDetailCardProps) => {
  const renderedIcon: string = useMemo(() => {
    const canvas = createStellarIdenticon(accountId);
    return canvas.toDataURL(); // create  data URI containing a generated icon in PNG forma
  }, [accountId]);
  const accountIDMasked = useMemo(() => {
    return accountId.length > 10
      ? accountId.slice(0, 5) + "..." + accountId.slice(-5)
      : accountId;
  }, [accountId]);
  return (
    <div className="card">
      <div className="account-id-section">
        <img className="account-icon" src={renderedIcon} alt={accountId} />
        <span className="account-id-desktop">{accountId}</span>
        <span className="account-id-mobile">{accountIDMasked}</span>
      </div>
      <div className="account-detail-unit-group">
        <AccountDetailUnit title="Sequence" value={sequence} />
        <AccountDetailUnit
          title="Sponsoring accounts count"
          value={numSponsoring}
        />
        <AccountDetailUnit title="Balance count" value={balanceCount} />
        <AccountDetailUnit
          title="Sponsored accounts count"
          value={numSponsored}
        />
        <AccountDetailUnit title="Signers count" value={signersCount} />
        <AccountDetailUnit
          title="Reserved XLM Balance"
          value={reservedXLMBalance.toFixed(2) + " XLM"}
        />
        <AccountDetailUnit title="Sub-entry count" value={subentryCount} />
      </div>
    </div>
  );
};

export default AccountDetailCard;
