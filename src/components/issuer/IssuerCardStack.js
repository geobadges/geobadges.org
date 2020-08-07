import React, { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { push } from "connected-react-router";
// import { useClickAway } from "react-use";
import classnames from "classnames";

import setError from "../../actions/set-error";
import useCurrentIssuer from "../../hooks/useCurrentIssuer";
import useRouteMatchParams from "../../hooks/useRouteMatchParams";
import useIssuer from "../../hooks/useIssuer";

import TitleCard from "./IssuerTitleCard";
import StatsCard from "./IssuerStatsCard";
import ConnectCard from "./IssuerConnectCard";

const ISSUER_CARDS = ["title", "stats", "connect"];

const Issuer = ({ entityId }) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const { issuerId, issuerCard } = useRouteMatchParams();

  const issuer = useIssuer(issuerId);
  const issuerSelected = issuerId === entityId;

  // redirect if supposed to display issuer details, but invalid card
  useEffect(() => {
    if (issuerSelected) {
      if (!issuer) {
        dispatch(
          setError(`Couldn't find an issuer with the entity id of ${issuerId}`)
        );
        dispatch(push(`/issuers`));
      } else if (!ISSUER_CARDS.includes(issuerCard)) {
        dispatch(push(`/issuers/${issuerId}/title`));
      }
    }
  }, [issuer, issuerId, issuerCard]);

  const issuerCardSelected = !issuerSelected
    ? undefined
    : ISSUER_CARDS.includes(issuerCard)
    ? issuerCard
    : "title";

  // useClickAway(ref, () => {
  //   if (issuerSelected) dispatch(push(`/issuers`));
  // });

  // set transform, translate and scale command depending on offset from the left and top
  const style = {};
  if (issuerSelected) {
    // future work: make animation smoother
    const containerWidth = ref.current?.offsetWidth;
    const offsetWidth = ref.current?.offsetWidth;
    const offsetLeft = ref.current?.offsetLeft;
    /// do all the fancy math here
    // style.transform = "scale(3.5) translateY(50%)";
  }

  const attrs = {
    // 'data-entity-id': entityId,
    // 'data-issuer-selected': issuerSelected
  };
  if (issuerCardSelected);

  return (
    <div
      className={classnames(
        "issuer",
        { "issuer-expanded": issuerSelected },
        { "issuer-minimized": !issuerSelected },
        { clickable: !issuerId }
      )}
      ref={ref}
      style={style}
      {...attrs}
    >
      <ul
        className="issuer-card-stack"
        data-issuer-card-selected={issuerCardSelected}
      >
        <TitleCard entityId={entityId} />
        <StatsCard entityId={entityId} />
        <ConnectCard entityId={entityId} />
      </ul>
    </div>
  );
};

Issuer.propTypes = {
  entityId: PropTypes.string.isRequired,
};

export default Issuer;
