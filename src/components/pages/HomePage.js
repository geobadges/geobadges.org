import React from 'react';
import PropTypes from 'prop-types';

import Welcome from '../Welcome';
import HomeVideo from '../HomeVideo';
import HomeMap from '../HomeMap';


const Home = ({ }) => {
  return (
    <div>
      <Welcome />
      <HomeVideo />
      <HomeMap />
    </div>
  );
};

Home.propTypes = {
};

export default Home;
