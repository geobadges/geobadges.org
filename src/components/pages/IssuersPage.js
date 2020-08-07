import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { useRouteMatch } from "react-router-dom";
import { push } from "connected-react-router";
import pick from "lodash.pick";
import { FaTimes } from "react-icons/fa";
import { useToggle } from 'react-use';

import setError from "../../actions/set-error";
import IssuerCardStack from "../issuer/IssuerCardStack";
import useIssuer from "../../hooks/useIssuer";
import useIssuers from "../../hooks/useIssuers";

const ARCHIVED_NAMES = [
  'Crisis Mappers',
  'GeoMakers',
  'Mapillary'
];

const IssuersPage = ({ currentIssuer, router }) => {
  const dispatch = useDispatch();
  const match = useRouteMatch();
  const { issuerId, issuerCard } = match.params;

  const issuers = useIssuers();
  const issuer = useIssuer(issuerId);

  const [showArchived, toggleShowArchived] = useToggle(false);

  useEffect(() => {
    if (issuers.length > 0 && issuerId && !issuer) {
      dispatch(
        setError(`Couldn't find an issuer with the entity id of ${issuerId}`)
      );
      dispatch(push(`/issuers`));
    }
  }, [issuer, issuerId, issuers]);

  const displayOverlay = issuerId || currentIssuer;

  const activeIssuers = issuers.filter(issuer => !ARCHIVED_NAMES.includes(issuer.name));
  const archivedIssuers = issuers.filter(issuer => ARCHIVED_NAMES.includes(issuer.name));

  return (
    <section id="issuers" className="page">
      {displayOverlay && (
        <div className="details-page-close-icon">
          <FaTimes />
        </div>
      )}
      {activeIssuers.map(({ entityId }) => {
        return <IssuerCardStack entityId={entityId} key={entityId} />;
      })}
      {archivedIssuers.length > 0 && <div id="show-archived-toggle" onClick={toggleShowArchived}>{showArchived ? 'Hide Inactive Issuers' : 'Show Inactive Issuers'}</div>}
      {showArchived && archivedIssuers.map(({ entityId }) => {
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
