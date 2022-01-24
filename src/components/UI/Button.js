export default function Button({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      className="h-[30px] border-none bg-red-600 text-white py-0 px-3 mr-1 mt-2 rounded-lg cursor-pointer"
    >
      {children}
    </button>
  );
}
