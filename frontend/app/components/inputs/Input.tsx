import React, { useState } from "react";
import { FieldErrors, UseFormRegister, FieldValues, Path } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

interface InputProps<T extends FieldValues> {
  id: Path<T>;
  label: string;
  type?: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

const Input = <T extends FieldValues>({
  id,
  label,
  type = "text",
  disabled,
  required,
  register,
  errors
}: InputProps<T>) => {
  // Manage visibility state for password fields
  const [showPassword, setShowPassword] = useState(type === "password" ? false : undefined);

  // Toggle password visibility
  const handleTogglePassword = () => {
    setShowPassword(prevState => !prevState);
  };

  return (
    <div className="w-full relative">
      <input
        autoComplete="off"
        id={id as string}
        disabled={disabled}
        {...register(id, { required })}
        placeholder=""
        type={type === "password" && !showPassword ? "password" : "text"}
        className={`w-full mt-3 p-4 peer pt-6 outline-none
          bg-white font-light border-2 rounded-md transition 
          disabled:opacity-70 disabled:cursor-not-allowed
          ${errors[id] ? 'border-rose-400' : 'border-slate-300'}
          ${errors[id] ? 'focus:border-rose-400' : 'focus:border-slate-300'}
        `}
      />
      <label
        htmlFor={id as string}
        className={`absolute pt-3 cursor-text text-md duration-150 transform -translate-y-3
          top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100
          peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6
          ${errors[id] ? 'text-rose-500' : 'text-slate-400'}
        `}
      >
        {label}
      </label>
      {type === "password" && (
        <button
          type="button"
          onClick={handleTogglePassword}
          className="absolute inset-y-0 right-0 pr-4 top-3 flex items-center text-gray-600"
        >
          {showPassword ? (
            <AiOutlineEyeInvisible className="w-5 h-5" />
          ) : (
            <AiOutlineEye className="w-5 h-5" />
          )}
        </button>
      )}
    </div>
  );
};

export default Input;
