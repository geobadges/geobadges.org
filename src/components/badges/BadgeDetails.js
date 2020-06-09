import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect, useDispatch } from 'react-redux';
import { Redirect, Route, Switch } from 'react-router';
import { useHistory, useRouteMatch, NavLink } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import classnames from 'classnames';
import pick from 'lodash.pick';

import clearCurrentBadge from '../../actions/clear-current-badge';
import setCurrentBadge from '../../actions/set-current-badge';
import BadgeOverview from '../../components/badges/BadgeOverview';
import BadgeCriteria from '../../components/badges/BadgeCriteria';
import useCurrentBadge from '../../hooks/useCurrentBadge';

const BadgeDetails = (props) => {
  console.log("starting to render BadgeDetails with props", props);
  const badge = useCurrentBadge();
  const dispatch = useDispatch();
  const history = useHistory();
  const close = () => {
    dispatch(clearCurrentBadge());
    history.push('/badges');
  };
  const active = badge !== null;

  const match = useRouteMatch();
  console.log("BadgeDetails is", match);

  const { badgeId, tab } = match.params;

  useEffect(() => {
    dispatch(setCurrentBadge(badgeId));
  }, [badgeId]);

  const {
    criteriaNarrative,
    entityId,
    expires,
    description = "No Description Available",
    image,
    name,
    issuer = {},
    skill,
    awarded,
    duration
  } = badge || {};

  const selectedTab = "criteria";

  return (
    <section id="badge" className={classnames({ "badge-details-active": active })}>
      <div id="badge-details-close-icon" onClick={close}><FaTimes/></div>

      <div id="badge-details-card-wrapper">
        <div id="badge-details-card-front" className="badge-details-card">
          <div className="badge-details-card-img-wrapper">
              <img src={image}/>
          </div>
          <div className="badge-card-title">{name}</div>
          <div className="badge-card-issuer">{issuer.name}</div>
          <table className="badge-stats">
              <tbody>
                  <tr className="badge-stats-values">
                      <td>{skill || '?'}</td>
                      <td>{awarded || '?'}</td>
                      <td>{duration || '?'}</td>
                  </tr>
                  <tr className="badge-stats-keys">
                      <td>level</td>
                      <td>awarded</td>
                      <td>duration</td>
                  </tr>
              </tbody>
          </table>
        </div>
        <div id="badge-details-card-back" className="badge-details-card">
          <div id="badge-details-card-tabs">
            <NavLink
              id="badge-details-overview-tab"
              to={`/badges/${entityId}/overview`}
              className="badge-details-card-tab"
              activeClassName="badge-details-tab-selected">Overview</NavLink>
            <NavLink
              id="badge-details-criteria-tab"
              to={`/badges/${entityId}/criteria`}
              className="badge-details-card-tab"
              activeClassName="badge-details-tab-selected">Criteria</NavLink>
          </div>
          <div className="badge-details-card-details-box">
            <Switch>
              <Route path={`/badges/:badgeId/overview`} render={() => <BadgeOverview/>}/>
              <Route path={`/badges/:badgeId/criteria`} render={() => <BadgeCriteria/>}/>
            </Switch>
          </div>
        </div>
      </div>
    </section>
  );
};

BadgeDetails.propTypes = {};

const mapStateToProps = (state) => pick(state, ['currentBadge', 'router', 'user']);

export default connect(mapStateToProps)(BadgeDetails);
