"use client";

interface Props {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
}

export const NumberInput = ({ value, setValue }: Props) => {
  const min = 2;
  const max = 5;

  const dec = () => setValue((v) => Math.max(min, v - 1));
  const inc = () => setValue((v) => Math.min(max, v + 1));

  return (
    <form
      className="w-full flex flex-row gap-5 justify-end items-center mt-3"
      onSubmit={(e) => e.preventDefault()}
    >
      <label
        htmlFor="qty"
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        Image quantity:
      </label>

      <div className="relative flex items-center max-w-[8rem]">
        <button
          type="button"
          onClick={dec}
          disabled={value <= min}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-2 focus:ring-gray-200 focus:outline-none"
          aria-label="Decrement"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>

        <input
          id="qty"
          value={value}
          readOnly
          // evitar cambios con rueda/scroll si llega a enfocarse
          onWheel={(e) => (e.currentTarget as HTMLInputElement).blur()}
          className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 select-none"
          aria-live="polite"
        />

        <button
          type="button"
          onClick={inc}
          disabled={value >= max}
          className="bg-gray-100 hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-2 focus:ring-gray-200 focus:outline-none"
          aria-label="Increment"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};
