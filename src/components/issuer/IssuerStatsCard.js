import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { push } from "connected-react-router";
import { useRouteMatch } from "react-router-dom";
import classnames from "classnames";

import BadgeList from "../badges/BadgeList";
import Stats from "../Stats";
import useIssuer from "../../hooks/useIssuer";

const StatsCard = ({ entityId }) => {
  const dispatch = useDispatch();

  const match = useRouteMatch();
  const { issuerId, issuerCard } = match.params;
  const isIssuerSelected = issuerId === entityId;
  const isCardSelected = isIssuerSelected && issuerCard === "stats";

  const { badges, stats } = useIssuer(entityId);
  const { badges: numBadges, learners, technologies } = stats;

  const className = classnames(
    "issuer-stats-card",
    "issuer-card",
    { "issuer-card-selected": isCardSelected },
    { clickable: !isCardSelected }
  );
  const handleClick = () => {
    console.log("clicked connect");
    if (isIssuerSelected && !isCardSelected) {
      dispatch(push(`/issuers/${entityId}/stats`));
    }
  };

  return (
    <li className={className} onClick={handleClick}>
      {numBadges === 0 && (
        <div className="no-badges-notice">
          This issuer has not yet created any badges.
        </div>
      )}
      {numBadges > 0 && <BadgeList badges={badges} />}
      <Stats
        keys={["badges", "learners", "technologies"]}
        values={[numBadges, learners, technologies]}
      />
    </li>
  );
};
StatsCard.propTypes = {
  entityId: PropTypes.string.isRequired,
};

export default StatsCard;
