import React, { useDispatch, useState } from "react";
import PropTypes from "prop-types";
import { FaTimes } from "react-icons/fa";
import { Redirect } from "react-router";

import { LOG_IN_FIRST } from '../../constants/messages';
import setError from '../../actions/set-error';
import useCurrentBadge from "../../hooks/useCurrentBadge";
import useRouteMatchParams from "../../hooks/useRouteMatchParams";
import useLoggedIn from '../../hooks/useLoggedIn';

const BadgeClaim = ({
  // claim codes
  onClaimCodeChange,
  onClaimCodeSubmit,
  
  // files
  files,
  setFiles,
  
  // textual evidence
  textEvidence,
  setTextEvidence
}) => {
  console.log("rendering BadgeClaim");
  const badge = useCurrentBadge();
  const { badgeId } = useRouteMatchParams();
  const claimCodeAvailable = badge?.claimCodeAvailable || false;
  console.log("claimCodeAvailable:", claimCodeAvailable);
  const loggedIn = useLoggedIn();

  if (!loggedIn) {
    return <Redirect to={`/account/login?next=/badges/${badgeId}/claim`}/>;
  }

  const handleClaimCodeChange = (event) =>
    onClaimCodeChange(event.target.value);
  const handleKeyPress = (event) =>
    event.key === "Enter" && onClaimCodeSubmit();

  const handleTextUpdate = event => setTextEvidence(event.target.value);
  const handleOnDragOver = event => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  };
  const handleOnDrop = event => {
    event.preventDefault();
    if (event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      setFiles([...files, file]);
    };
  };
  const handleInputChange = event => {
    const file = event.target.files[0];
    setFiles([...files, file]);
  };
  const handleRemoveFile = (event, fileToRemove) => {
    event.preventDefault();
    event.stopPropagation();
    setFiles(files.filter(file => file !== fileToRemove));
  };

  const handleOnFileListClick = () => {
    document.getElementById("evidence-input").click();
  };

  console.log({files});

  return (
    <div className="badge-claim-details" data-claim-code-available={claimCodeAvailable}>
      {claimCodeAvailable && (
        <div className="enter-claim-code-wrapper">
          <div className="enter-claim-code-inner">
            <div className="enter-claim-code-message">
              Enter your claim code below
            </div>
            <div className="enter-claim-code-input-wrapper">
              <input
                type="text"
                placeholder=""
                onChange={handleClaimCodeChange}
                onKeyPress={handleKeyPress}
              />
            </div>
          </div>
        </div>
      )}
      <div className="badge-claim-details-divider">OR</div>
      <div className="badge-evidence">
        <textarea className="badge-evidence-instructions" onInput={handleTextUpdate} onDragOver={handleOnDragOver} onDrop={handleOnDrop} placeholder="Type or drag your evidence here">{textEvidence}</textarea>
        <input onChange={handleInputChange} id="evidence-input" type="file" multiple="multiple"/>
        <label htmlFor="evidence-input" onDragOver={handleOnDragOver} onDrop={handleOnDrop} id="evidence-input-label"/>
        <div id="badge-evidence-file-list" onClick={handleOnFileListClick}>
          {files.filter(Boolean).map(file => <div className="evidence-file-line" key={file.name}><div className="evidence-file-name">{file.name}<FaTimes onClick={(event) => handleRemoveFile(event, file)}/></div></div>)}
        </div>
      </div>
    </div>
  );
};

BadgeClaim.propTypes = {};

export default BadgeClaim;
