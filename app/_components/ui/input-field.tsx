interface IInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  id?: string;
}

const InputField = ({ label, id, ...props }: IInputFieldProps) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-app-250 text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        id={id}
        {...props}
        className="focus:outline-app-200/25 focus:border-app-200 border-app-300 w-full rounded-md border px-3 py-2 focus:outline-2"
      />
    </div>
  );
};

export default InputField;
