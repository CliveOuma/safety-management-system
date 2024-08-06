"use client";

import React, { useState } from 'react';
import { IconType } from 'react-icons';
import { FaSpinner } from 'react-icons/fa';

interface ActionBtnProps {
    icon: IconType;
    onClick: (e: React.MouseEvent<HTMLButtonElement>, setLoading: React.Dispatch<React.SetStateAction<boolean>>) => void;
    withLoading?: boolean; // Prop to conditionally show loading spinner
    className?: string; 
}

const ActionBtn: React.FC<ActionBtnProps> = ({ icon: Icon, onClick, withLoading = false, 
    className = 'text-gray-700' }) => {
    const [loading, setLoading] = useState(false);

    const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (withLoading) {
            setLoading(true);
        }
        try {
            await onClick(e, setLoading);
        } finally {
            if (withLoading) {
                setLoading(false);
            }
        }
    };

    return (
        <button
            onClick={handleClick}
            className={`flex items-center justify-center w-10 h-10 cursor-pointer 
                rounded-full border-2 ${className} border-gray-300 transition-transform transform hover:scale-105 disabled:opacity-50`}
            disabled={loading && withLoading}
        >
            {loading && withLoading ? <FaSpinner size={20} className="text-gray-500 animate-spin" /> : <Icon size={20} />}
        </button>
    );
};

export default ActionBtn;
