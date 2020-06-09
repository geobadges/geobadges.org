import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import pick from 'lodash.pick';

const RegisterPage = ({ user, router }) => {
  return (
    <div>Register Here</div>
  );
};
RegisterPage.propTypes = {
  router: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = state => pick(state, ['router', 'user']);

export default connect(mapStateToProps)(RegisterPage);
