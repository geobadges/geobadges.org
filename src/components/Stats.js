import React from 'react';
import PropTypes from 'prop-types';

const Stats = ({ values=[], keys=[]}) => {
  return (
    <table className="gb-stats">
      <tbody>
          <tr className="gb-stats-values">
            {values?.map((value, i) => <td key={`${keys[i]}-value`}>{value ?? '-'}</td>)}
          </tr>
          <tr className="gb-stats-keys">
            {keys?.map(key => <td key={key}>{key ?? '-'}</td>)}
        </tr>
      </tbody>
    </table>
  );
};

Stats.propTypes = {
  values: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.number, PropTypes.string])),
  keys: PropTypes.arrayOf(PropTypes.string)
};

export default Stats;
