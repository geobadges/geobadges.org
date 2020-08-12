import React from "react";
import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";
import { push } from "connected-react-router";
import classnames from "classnames";
import pick from "lodash.pick";
import { FaFacebook, FaGithub, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa";

import setError from "../../actions/set-error";
import useIssuer from "../../hooks/useIssuer";
import useRouteMatchParams from "../../hooks/useRouteMatchParams";

const ConnectCard = ({ entityId, router }) => {
  const dispatch = useDispatch();

  const { issuerId, issuerCard } = useRouteMatchParams();
  const isIssuerSelected = issuerId === entityId;
  const isCardSelected = isIssuerSelected && issuerCard === "connect";

  const issuer = useIssuer(entityId);

  const { description, links, name } = issuer;

  const className = classnames(
    "issuer-connect-card",
    "issuer-card",
    { "issuer-card-selected": isCardSelected },
    { clickable: !isCardSelected }
  );

  const handleClick = () => {
    if (isIssuerSelected && !isCardSelected) {
      const url = `/issuers/${entityId}/connect`;
      if (router.location.pathname !== url) {
        dispatch(push(url));
      }
    }
  };
  return (
    <li className={className} onClick={handleClick}>
      <div className="issuer-connect-card-about">About {name}</div>
      <div className="issuer-description-wrapper">
        <div className="issuer-description">{description}</div>
      </div>
      <div className="issuer-connect-card-social">
        {links?.twitter && (
          <a href={links.twitter} target="_blank">
            <FaTwitter />
            <div className="glow" />
          </a>
        )}
        {links?.github && (
          <a href={links.github} target="_blank">
            <FaGithub />
            <div className="glow" />
          </a>
        )}
        {links?.facebook && (
          <a href={links.facebook} target="_blank">
            <FaFacebook />
            <div className="glow" />
          </a>
        )}
        {links?.instagram && (
          <a href={links.instagram} target="_blank">
            <FaInstagram />
            <div className="glow" />
          </a>
        )}
        {links?.linkedin && (
          <a href={links.linkedin} target="_blank">
            <FaLinkedin />
            <div className="glow" />
          </a>
        )}
        {links?.others?.map((url) => (
          <a href={url} target="_blank">
            <FaLink />
            <div className="glow" />
          </a>
        ))}
      </div>
      <div className="issuer-connect-card-title">Connect</div>
    </li>
  );
};
ConnectCard.propTypes = {
  entityId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => pick(state, ["issuers", "router", "user"]);

export default connect(mapStateToProps)(ConnectCard);
