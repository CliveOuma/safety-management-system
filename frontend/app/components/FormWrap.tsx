import React from "react";

const FormWrap = ({children}  : {children: React.ReactNode}) => {
    return ( 
        <div className="min-h-[70vh] mt-4 h-full items-center pb-12 pt-24 justify-center flex">
            <div className="max-w-[650px] w-full flex flex-col gap-6 items-center shadow -xl
             shadow-slate-400
            rounded-md p-4 md:p-8">
                {children}

            </div>

        </div>
     );
}
 
export default FormWrap;