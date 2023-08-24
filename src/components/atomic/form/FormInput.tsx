import { useRef } from "preact/hooks";

interface InputProps extends React.ComponentProps<any> {
  value?: string | number | undefined;
  onInput: (target: HTMLInputElement) => void;
  autocomplete?: string | true | undefined;
  placeholder?: string | undefined;
  type?: string | undefined;
  w?: true | string;
}

export default function FormInput({ onInput, value = undefined, autocomplete = true, placeholder = undefined, type = "text", w = true, ...props }: InputProps) {
  const input = useRef(null);

  function toggleVisibility() {
    const type = input.current.type === "password" ? "text" : "password";
    input.current.type = type;
  }

  return (
    <div class="flex flex-row">
      <input
        {...props}
        value={value}
        class={`${w === true ? "w-full" : w} bg-nord2 hover:bg-nord3 focus:bg-nord3 rounded p-0.5 px-2 outline-none placeholder:text-nord9`}
        onInput={e => onInput(e.target as HTMLInputElement)}
        placeholder={placeholder}
        autoComplete={autocomplete === true ? placeholder : autocomplete as string | undefined}
        type={type}
        ref={input}
        required
      />
      {type === "password" &&
        <button
          type="button"
          class="cursor-pointer flex-grow px-1 text-center ms-1 rounded bg-nord2 hover:bg-nord3"
          onClick={toggleVisibility}
        >
          👁️
        </button>
      }
    </div>
  );
}
