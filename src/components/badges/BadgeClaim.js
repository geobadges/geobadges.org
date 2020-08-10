import React from "react";
import PropTypes from "prop-types";

import useCurrentBadge from "../../hooks/useCurrentBadge";

const BadgeClaim = ({ onClaimCodeChange, onClaimCodeSubmit }) => {
  console.log("rendering BadgeClaim");
  const badge = useCurrentBadge();
  const claimCodeAvailable = badge?.claimCodeAvailable || false;
  console.log("claimCodeAvailable:", claimCodeAvailable);

  const handleClaimCodeChange = (event) =>
    onClaimCodeChange(event.target.value);
  const handleKeyPress = (event) =>
    event.key === "Enter" && onClaimCodeSubmit();

  return (
    <div className="badge-claim-details">
      {claimCodeAvailable && (
        <div className="enter-claim-code-wrapper">
          <div className="enter-claim-code-inner">
            <div className="enter-claim-code-message">
              Enter your claim code below
            </div>
            <div className="enter-claim-code-input-wrapper">
              <input
                type="text"
                placeholder=""
                onChange={handleClaimCodeChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

BadgeClaim.propTypes = {};

export default BadgeClaim;
