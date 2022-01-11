import React, { useState, useEffect } from "react";

import "./ProjectName.css";

const ProjectName = ({ handleProjectInfo }) => {
  const [projectName, setProjectName] = useState("");
  const [designer, setDesigner] = useState("");

  useEffect(() => {
    handleProjectInfo({
      projectName: projectName,
      designer: designer,
    });
  }, [designer, projectName]);
  return (
    <div className="title-container">
      <input
        className="big-title-input"
        type="text"
        id="project-name"
        name="project-name"
        placeholder="新增工程名稱"
        onChange={(e) => setProjectName(e.target.value)}
      />
      <input
        className="big-title-input"
        type="text"
        id="designer"
        name="designer"
        placeholder="新增監造單位"
        onChange={(e) => setDesigner(e.target.value)}
      />
    </div>
  );
};

export default ProjectName;
