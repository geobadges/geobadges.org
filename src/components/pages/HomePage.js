import React from 'react';
import PropTypes from 'prop-types';

import Welcome from '../Welcome';
import HomeVideo from '../HomeVideo';
import HomeMap from '../HomeMap';
import Footer from '../Footer';


const Home = ({ }) => {
  return (
    <div>
      <Welcome />
      <HomeVideo />
      <HomeMap />
      <Footer />
    </div>
  );
};

Home.propTypes = {
};

export default Home;
