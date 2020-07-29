import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import chunk from "lodash.chunk";
import map from "lodash.map";
import { Link } from "react-router-dom";

const BadgeList = ({ badges }) => {
  console.log("starting IssuerBadges with entityId", badges);

  // chunk badges into groups of three
  const groups = chunk(badges, 3);

  return (
    <div className="badge-list">
      {groups.map((row) => (
        <div className="badge-list-row" key={map(row, "entityId").join("|")}>
          {row.map((badge) => (
            <Link
              to={`/badges/${badge.entityId}/overview`}
              key={badge.entityId}
            >
              <div className="badge-list-badge">
                <img src={badge.image} />
                <div className="badge-list-badge-title">{badge.name}</div>
              </div>
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
};

BadgeList.proptypes = {
  // entityId: PropTypes.string,
  badges: PropTypes.arrayOf(PropTypes.object),
};

export default BadgeList;
