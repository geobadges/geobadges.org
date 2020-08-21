import React from 'react';
import earnerResourcesContent from '../../content/earnersFAQ.md';
import issuerResourcesContent from '../../content/issuersFAQ.md';


const ResourcesPage = () => {
    return (
        <section id="resources">
            <div id="faq-image"/>
                <h3>Earners</h3>
                <h3>Issuers</h3>

            <div className="page" id="earnerFAQ" dangerouslySetInnerHTML={{__html: earnerResourcesContent }}/>
            <div className="page" id="issuerFAQ" dangerouslySetInnerHTML={{__html: issuerResourcesContent }}/>
        </section>
    );
};

export default ResourcesPage;