type OnChange = (value: string, option?: string | undefined) => void;

interface Props {
  name: string;
  placeholder?: string;
  value: string;
  valueOption: string;
  onChange: OnChange;
  styles?: string;
  label?: boolean;
}

export const TextInput = ({
  name,
  placeholder,
  value,
  valueOption,
  onChange,
  styles,
  label = true,
}: Props) => {
  const handleChange = (value: string) => {
    onChange(value, valueOption);
  };

  return (
    <div className={`col-span-2 ${styles}`}>
      {label && (
        <label htmlFor={valueOption} className="block mb-2 text-sm font-medium">
          {name}
        </label>
      )}

      <input
        id={valueOption}
        name={valueOption}
        type="text"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
        placeholder={placeholder ? placeholder : `Enter ${name}`}
        required
        value={value}
        onChange={(e) => {
          handleChange(e.target.value);
        }}
      />
    </div>
  );
};
