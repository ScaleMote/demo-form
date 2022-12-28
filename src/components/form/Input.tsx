type PropTypes = {
  title: string;
  name: string;
  defaultValue: string;
  disabled?: boolean
};
export default function Input({ title, name, defaultValue, disabled }: PropTypes) {
  return (
    <div>
      <label className="text-teal-400 px-1" >{title}</label>
      <input
        className="border w-full mb-3 pl-2 py-1 text-stone-500"
        id={`input-${name}`}
        name={name}
        defaultValue={defaultValue}
        disabled={disabled ===true}
      />
    </div>
  );
}
