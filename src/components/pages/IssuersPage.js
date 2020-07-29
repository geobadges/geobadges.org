import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { push } from "connected-react-router";
import pick from "lodash.pick";
import { FaTimes } from "react-icons/fa";

import setError from "../../actions/set-error";
import IssuerCardStack from "../issuer/IssuerCardStack";
import useIssuer from "../../hooks/useIssuer";
import useIssuers from "../../hooks/useIssuers";

const IssuersPage = ({ currentIssuer, router }) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { issuerId, issuerCard } = match.params;

  const issuers = useIssuers();
  const issuer = useIssuer(issuerId);

  useEffect(() => {
    if (issuers.length > 0 && issuerId && !issuer) {
      dispatch(
        setError(`Couldn't find an issuer with the entity id of ${issuerId}`)
      );
      dispatch(push(`/issuers`));
    }
  }, [issuer, issuerId, issuers]);

  const displayOverlay = issuerId || currentIssuer;
  return (
    <section id="issuers" className="page">
      {displayOverlay && (
        <div className="details-page-close-icon">
          <FaTimes />
        </div>
      )}
      {issuers.map(({ entityId }) => {
        return <IssuerCardStack entityId={entityId} key={entityId} />;
      })}
      {displayOverlay && <div id="issuers-overlay" />}
    </section>
  );
};

IssuersPage.propTypes = {};

const mapStateToProps = (state) =>
  pick(state, ["currentIssuer", "issuers", "router", "user"]);

export default connect(mapStateToProps)(IssuersPage);
