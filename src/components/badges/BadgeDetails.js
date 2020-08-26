import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { Redirect, Route, Switch } from "react-router";
import { useHistory, useRouteMatch, NavLink } from "react-router-dom";
import { push } from "connected-react-router";
import { FaTimes } from "react-icons/fa";
import classnames from "classnames";
import pick from "lodash.pick";

import clearCurrentBadge from "../../actions/clear-current-badge";
import setCurrentBadge from "../../actions/set-current-badge";
import setError from '../../actions/set-error';
import submitClaimCode from '../../actions/submit-claim-code';
import BadgeOverview from "../../components/badges/BadgeOverview";
import BadgeCriteria from "../../components/badges/BadgeCriteria";
import BadgeClaim from "../../components/badges/BadgeClaim";
import CornerRibbon from "../../components/CornerRibbon";
import StylishButton from '../StylishButton';
import Stats from "../Stats.js";
import useBackpack from '../../hooks/useBackpack';
import useCurrentBadge from "../../hooks/useCurrentBadge";
import useLoggedIn from '../../hooks/useLoggedIn';
import { LOG_IN_FIRST } from '../../constants/messages';

const isClaimable = badge => {
  return !(badge?.tags?.map(tag => tag?.toLowerCase()).includes('unclaimable'));
};

const BadgeDetails = (props) => {
  console.log("starting to render BadgeDetails with props", props);
  const backpack = useBackpack();
  console.log("backpack:", backpack);
  const badge = useCurrentBadge();
  console.log("badge:", badge);
  const dispatch = useDispatch();
  const history = useHistory();
  const ref = useRef();
  const [claimCode, setClaimCode] = useState(null);
  const loggedIn = useLoggedIn();

  const claimed = badge?.entityId && !!backpack?.find(b => b.badgeclass === badge.entityId);
  console.log("claimed:", claimed);

  const close = () => {
    dispatch(clearCurrentBadge());
    history.push("/badges");
  };
  // useClickAway(ref, close);

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
    name: badgeName,
    issuer = {},
    skill,
    awarded,
    duration,
  } = badge || {};

  const selectedTab = "criteria";

  const handleSubmitClaimCode = () => {
    console.log("starting handleSubmitClaimCode");
    if (claimCode && claimCode.trim() !== '') {
      console.log("submitting claim code of", claimCode);
      dispatch(submitClaimCode({ badgeName, claimCode, issuerName: issuer.name }));
    }
  };

  const handleClickClaim = () => {
    console.log("starting handleClickClaim");
    if (claimed) {
      dispatch(setError('You have already claimed this badge!'));
    } else if (tab !== 'claim') {
      if (badgeId) {
        if (loggedIn) {
          dispatch(push(`/badges/${badgeId}/claim`))
        } else {
          dispatch(setError(LOG_IN_FIRST));
        }
      } else {
        dispatch(push(`/badges`));
        if (!loggedIn) dispatch(setError(LOG_IN_FIRST));
      }
    } else if (!loggedIn) {
      dispatch(setError(LOG_IN_FIRST));
    } else if (claimCode && claimCode.trim() !== '') {
      if (loggedIn) {
        console.log("submitting claim code of", claimCode);
        dispatch(submitClaimCode({ badgeName, claimCode, issuerName: issuer.name }));  
      } else {
        dispatch(setError(LOG_IN_FIRST));
      }
    } else {
      dispatch(setError('You must provide evidence before submitting your claim!'));
    }
  }

  return (
    <section
      id="badge"
      className={classnames({ "badge-details-active": active })}
    >
      <div className="details-page-close-icon" onClick={close}>
        <FaTimes />
      </div>

      <div id="badge-details-card-wrapper" ref={ref}>
        <div id="badge-details-card-front" className="badge-details-card">
          {claimed && <CornerRibbon fill="#D7CDCC" text="Claimed"/>}
          <div className="badge-details-card-img-wrapper">
            <img src={image} />
          </div>
          <div className="badge-card-title">{badgeName}</div>
          <div className="badge-card-issuer">{issuer.name}</div>
          <Stats
            keys={["level", "awarded", "duration"]}
            values={[skill, awarded, duration]}
          />
        </div>
        <div id="badge-details-card-back" className="badge-details-card">
          <div id="badge-details-card-tabs">
            <NavLink
              id="badge-details-overview-tab"
              to={`/badges/${entityId}/overview`}
              className="badge-details-card-tab"
              activeClassName="badge-details-tab-selected"
            >
              Overview
            </NavLink>
            <NavLink
              id="badge-details-criteria-tab"
              to={`/badges/${entityId}/criteria`}
              className="badge-details-card-tab"
              activeClassName="badge-details-tab-selected"
            >
              Criteria
            </NavLink>
          </div>
          <div className="badge-details-card-details-box">
            <Switch>
              <Route
                path={`/badges/:badgeId/overview`}
                render={() => <BadgeOverview />}
              />
              <Route
                path={`/badges/:badgeId/criteria`}
                render={() => <BadgeCriteria />}
              />
              {isClaimable(badge) && <Route
                path={`/badges/:badgeId/claim`}
                render={() => <BadgeClaim onClaimCodeChange={setClaimCode} onClaimCodeSubmit={handleSubmitClaimCode}/>}
              />}        
            </Switch>
          </div>
          {isClaimable(badge) && <div className="badge-details-claim-button-wrapper">
            <StylishButton text={claimed ? "Claimed!" : "Claim"} onClick={handleClickClaim}/>
          </div>}
        </div>
      </div>
    </section>
  );
};

BadgeDetails.propTypes = {};

const mapStateToProps = (state) =>
  pick(state, ["auth", "currentBadge", "router", "user"]);

export default connect(mapStateToProps)(BadgeDetails);
