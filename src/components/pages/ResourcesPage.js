import React from 'react';
import resourcesContent from '../../content/resources.md';

const ResourcesPage = () => {
    return (
        <section id="resources" className="page" dangerouslySetInnerHTML={{__html: resourcesContent }}/>
    );
};

export default ResourcesPage;