import React from 'react';
import PropTypes from 'prop-types';

import useCurrentBadge from '../../hooks/useCurrentBadge';

const getExpirationText = expires => {
  if (expires && expires.amount && expires.duration) {
    const { amount } = expires;
    const duration = amount === 1 ? expires.duration.replace(/s$/,'') : expires.duration;
    return `Expires in ${amount} ${duration}`;
  }
};

const BadgeDescription = ({ description, expires }) => {
  console.log("rendering BadgeDescription");
  const badge = useCurrentBadge() || {};

  const expirationText = getExpirationText(badge?.expires);

  return (
    <>
      {expirationText && <div className="badge-expiration">{expirationText}</div>}
      <div className="badge-description" style={{maxHeight: (expirationText ? 290 : 320)}}>{badge?.description}</div>
    </>
  );
};
BadgeDescription.propTypes = {};

export default BadgeDescription;
