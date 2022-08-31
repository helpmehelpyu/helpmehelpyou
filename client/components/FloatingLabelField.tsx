interface Props {
  type: string;
  isRequired: boolean;
  setValue: (val: any) => void;
  placeholder: string;
}

export default function FloatingLabelInput({
  type,
  isRequired,
  setValue,
  placeholder,
}: Props) {
  return (
    <div className="relative">
      <input
        className="relative rounded focus:outline-cyan-500 w-full border-2 p-1 m-2 z-10 bg-transparent peer"
        type={type}
        name={placeholder.toLowerCase()}
        required={isRequired}
        onChange={(e) => setValue(e.target.value)}
        placeholder=" "
      ></input>
      <label
        htmlFor={placeholder.toLowerCase()}
        className="
					absolute 
					-top-3.5
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
				"
      >
        {placeholder}
      </label>
    </div>
  );
}
