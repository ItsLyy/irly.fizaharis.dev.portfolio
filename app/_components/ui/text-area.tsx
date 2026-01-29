interface ITextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  id?: string;
}

const TextArea = ({ label, id, ...props }: ITextAreaProps) => {
  return (
    <div className="w-full space-y-1">
      {label && (
        <label className="text-app-250 text-sm" htmlFor={id}>
          {label}
        </label>
      )}
      <textarea
        id={id}
        {...props}
        className="focus:outline-app-200/25 focus:border-app-200 border-app-300 min-h-32 w-full resize-y rounded-md border px-3 py-2 focus:outline-2"
      />
    </div>
  );
};

export default TextArea;
