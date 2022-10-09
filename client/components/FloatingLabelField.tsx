interface Props {
  value?: any;
  type: string;
  isRequired: boolean;
  setValue: (val: any) => void;
  placeholder: string;
  min?: number;
  max?: number;
  error?: string;
  step?: number;
}

export default function FloatingLabelInput({
  value,
  type,
  isRequired,
  setValue,
  placeholder,
  min = 0,
  max,
  error = '',
  step = 1,
}: Props) {
  return (
    <div className="relative">
      <input
        className="relative rounded focus:border-cyan-500 w-full border-2 outline-none p-1 m-2 z-10 bg-transparent peer min-w-max"
        type={type}
        name={placeholder.toLowerCase()}
        required={isRequired}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
        value={value}
        min={min}
        max={max}
        step={step}
      ></input>
      <label
        htmlFor={placeholder.toLowerCase()}
        className="
					absolute 
					-top-3.5
          left-0
					text-sm
					my-3 
					mx-3 
					px-1
					duration-300 
					bg-white
					z-20
					text-slate-500 
					peer-placeholder-shown:top-0 
					peer-placeholder-shown:text-lg 
					peer-placeholder-shown:origin-0 
					peer-placeholder-shown:z-0
					peer-focus:-top-3.5
					peer-focus:text-sm
					peer-focus:z-20
          whitespace-nowrap
          select-none
				"
      >
        {placeholder}
        {isRequired && <span className="text-red-500">*</span>}
      </label>
      <p className="text-red-500 text-xs mx-2 mb-2 px-1">{error}</p>
    </div>
  );
}
