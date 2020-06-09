import React from 'react';
import PropTypes from 'prop-types';

import useCurrentBadge from '../../hooks/useCurrentBadge';

const BadgeCriteria = props => {
  console.log("rendering BadgeCriteria");
  const badge = useCurrentBadge();
  return (
    <div className="badge-criteria">{badge?.criteriaNarrative}</div>
  );
};

BadgeCriteria.propTypes = {};

export default BadgeCriteria;