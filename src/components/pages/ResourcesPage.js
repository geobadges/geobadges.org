import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
import { NavLink } from 'react-router-dom';
import earnerResourcesContent from '../../content/earnersFAQ.md';
import issuerResourcesContent from '../../content/issuersFAQ.md';

const ResourcesPage = () => {
    return (
        <section id="resources">
            <div id="faq-image">
                <img id="question-mark" src="/static/images/faq_background.png" alt="resources"/>
                <div id="faq-toggle">
                    <NavLink to="/resources/earners"><h3>Earners</h3></NavLink>
                    <NavLink to="/resources/issuers"><h3>Issuers</h3></NavLink>
                </div>            
            </div>
            <Switch>
              <Route path="/resources/earners" render={() => <div className="page" id="earnerFAQ" dangerouslySetInnerHTML={{__html: earnerResourcesContent }}/>} />
              <Route path="/resources/issuers" render={() => <div className="page" id="issuerFAQ" dangerouslySetInnerHTML={{__html: issuerResourcesContent }}/>} />
              <Redirect to="/resources/earners"/>
            </Switch>
        </section>
    );
};

export default ResourcesPage;