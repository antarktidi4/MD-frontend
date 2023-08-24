import LoadingSvg from "../LoadingSpin";

interface ButtonProps extends React.ComponentProps<any> {
  text: string;
  isLoading: boolean;
  name?: string | undefined;
  type?: "submit" | "button" | "reset" | undefined;
}

export default function FormButton({ text, isLoading, name = undefined, type = "submit", ...props }: ButtonProps) {
  return (
    <button
      {...props}
      class="w-full flex flex-row justify-center m-auto p-0.5 rounded bg-nord2 enabled:hover:bg-nord3 disabled:bg-nord1"
      type={type}
      name={name}
      disabled={isLoading}
    >
      {isLoading && <LoadingSvg size={17} />}
      {text}
    </button>
  );
}
