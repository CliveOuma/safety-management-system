import React from 'react';
import { FieldErrors, UseFormRegister, FieldValues, Path } from 'react-hook-form';

interface TextAreaProps<T extends FieldValues> {
  id: Path<T>; // Use Path<T> instead of string
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const TextArea = <T extends FieldValues>({
  id,
  label,
  disabled,
  required,
  register,
  errors
}: TextAreaProps<T>) => {
  return (
    <div className="w-full relative">
      <textarea
        autoComplete="off"
        id={id as string} // Type assertion here
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        className={`w-full mt-3 relative max-h-[150px] min-h-[150px] p-4 peer pt-6 outline-none
        bg-white font-light border-2 rounded-md transition disabled:opacity-70 
        disabled:cursor-not-allowed
        ${errors[id] ? 'border-rose-400' : 'border-slate-300'}
        ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}
        `}
      />
      <label
        htmlFor={id as string} // Type assertion here
        className={`absolute cursor-text text-md duration-150 transform -translate-y-3
        top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100
        peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6
        ${errors[id] ? 'text-rose-500' : 'text-slate-400'}
        `}
      >
        {label}
      </label>
    </div>
  );
};

export default TextArea;
