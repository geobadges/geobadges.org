import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash.pick';

const ProfilePage = ({ user, router }) => {
  return (
    <div>Profile Here</div>
  );
};
ProfilePage.propTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(ProfilePage);
