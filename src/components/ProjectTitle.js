export default function ProjectTitle() {
  return (
    <div className="my-3">
      <input
        className="px-3 py-2 mb-2 w-full rounded-md"
        type="text"
        placeholder="新增工程名稱"
        id="project-title"
        name="project-title"
      />
      <input
        className="px-3 py-2 mb-1 w-full rounded-md"
        type="text"
        placeholder="新增監造單位"
        id="designer"
        name="designer"
      />
    </div>
  );
}
