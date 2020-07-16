import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import pick from 'lodash.pick';
import { FaTimes } from 'react-icons/fa';

import IssuerCardStack from '../issuer/IssuerCardStack';
import useIssuers from '../../hooks/useIssuers';

const IssuersPage = ({ currentIssuer, router }) => {
  const match = useRouteMatch();
  const { issuerId, issuerCard } = match.params;

  const issuers = useIssuers();
  const displayOverlay = issuerId || currentIssuer;
  return (
    <section id="issuers" className="page">
      {displayOverlay && <div className="details-page-close-icon"><FaTimes/></div>}
      {issuers.map(({ entityId }) => {
        return <IssuerCardStack entityId={entityId} key={entityId}/>;
      })}
      {displayOverlay && <div id="issuers-overlay"/>}
    </section>
  );
};

IssuersPage.propTypes = { };

const mapStateToProps = (state) => (
  pick(state, ['currentIssuer', 'issuers', 'router', 'user'])
);

export default connect(mapStateToProps)(IssuersPage);
