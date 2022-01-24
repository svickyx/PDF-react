export default function TextInput({ placeholder, id, name, onChange }) {
  return (
    <div>
      <input
        className="px-3 py-2 mb-1 w-full rounded-md border-b border-main"
        type="text"
        placeholder={placeholder}
        id={id}
        name={name}
        onChange={onChange}
      />
      <hr className="border-none" />
    </div>
  );
}
