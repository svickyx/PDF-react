import { useEffect, useState } from "react";

const ProjectTitle = ({ handleProjectInfo }) => {
  const [projectName, setProjectName] = useState("");
  const [designer, setDesigner] = useState("");

  useEffect(() => {
    handleProjectInfo({
      projectName: projectName,
      designer: designer,
    });
  }, [projectName, designer]);

  return (
    <div className="my-4">
      <input
        className="px-3 py-2 mb-2 w-full rounded-md"
        type="text"
        placeholder="新增工程名稱"
        id="project-title"
        name="project-title"
        onChange={(e) => setProjectName(e.target.value)}
      />
      <input
        className="px-3 py-2 mb-1 w-full rounded-md"
        type="text"
        placeholder="新增監造單位"
        id="designer"
        name="designer"
        onChange={(e) => setDesigner(e.target.value)}
      />
    </div>
  );
};

export default ProjectTitle;
