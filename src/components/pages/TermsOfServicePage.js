import React from 'react';
import termsOfServiceContent from '../../content/terms-of-service.md';

import Footer from '../Footer';

const TermsOfServicePage = () => {
    return (
        <>
            <section id="terms-of-service"> 
                <div className="page" id="terms-of-service-content" dangerouslySetInnerHTML={{__html: termsOfServiceContent }}/>
            </section>
            <Footer/>
        </>
    );
};

export default TermsOfServicePage;