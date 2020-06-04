import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useToggle } from 'react-use';

import Issuer from '../issuer/Stack';
import useIssuers from '../../hooks/useIssuers';

const Issuers = ({ }) => {
  const [selection, setSelected] = useState(null);
  const issuers = useIssuers() || [];
  console.log("issuers:", issuers);
  return (
    <section id="issuers" className="page">
      {issuers.map(({ entityId }) => {
        const selected = entityId === selection;
        return <Issuer entityId={entityId} key={entityId} selected={selected}/>;
      })}
    </section>
  );
};

Issuers.propTypes = {
};

export default Issuers;
