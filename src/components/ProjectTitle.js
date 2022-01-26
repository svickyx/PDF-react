import { useEffect, useState } from "react";

const ProjectTitle = ({ handleProjectInfo }) => {
  const [projectName, setProjectName] = useState("");
  const [designer, setDesigner] = useState("");
  const [doneInit, setDoneInit] = useState(false);

  useEffect(() => {
    const projectInfoInLocalstorage = localStorage.getItem("projectInfo");
    if (projectInfoInLocalstorage) {
      const cached = JSON.parse(projectInfoInLocalstorage);
      if (cached) {
        setProjectName(cached.projectName);
        setDesigner(cached.designer);
      }
    }
    setDoneInit(true);
  }, []);

  useEffect(() => {
    let timetag;
    if (doneInit && (projectName || designer)) {
      timetag = setTimeout(() => {
        localStorage.setItem(
          "projectInfo",
          JSON.stringify({
            projectName,
            designer,
          })
        );
      }, 800);
    }
    return () => clearTimeout(timetag);
  }, [projectName, designer, doneInit]);

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
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
      />
      <input
        className="px-3 py-2 mb-1 w-full rounded-md"
        type="text"
        placeholder="新增監造單位"
        id="designer"
        name="designer"
        value={designer}
        onChange={(e) => setDesigner(e.target.value)}
      />
    </div>
  );
};

export default ProjectTitle;
