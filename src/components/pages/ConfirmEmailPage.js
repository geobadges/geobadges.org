import React, { useEffect, useState } from 'react';
import { connect, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { push } from "connected-react-router";

import confirmEmail from '../../actions/confirm-email';
import setSuccess from '../../actions/set-success';
import setError from '../../actions/set-error';
import useLocationSearchParams from "../../hooks/useLocationSearchParams";
import client from '../../api-client';
import Footer from '../Footer';

const ConfirmEmailPage = ({ router }) => {
    const dispatch = useDispatch();
    const search = useLocationSearchParams();

    const appId = search.a;
    const confirmId = atob(search.confirmId);
    const token = search.token;

    useEffect(() => {
        dispatch(confirmEmail({
            appId,
            confirmId,
            token
        }));
    }, [appId, confirmId, token]);

    return (
        <>
            <section id="confirm-email"> 
                <div className="page">
                    Confirming Email
                </div>
            </section>
            <Footer/>
        </>
    );
};

export default ConfirmEmailPage;