import { IconType } from "react-icons"

interface AdminNavItemProps{
    selected?: boolean,
    icon: IconType,
    label:string,
}

const AdminNavItem: React.FC<AdminNavItemProps> = ({
    selected,
    icon: Icon,
    label,
}) => {
    return (
        <div
            className={`flex items-center justify-center text-center gap-2 p-2 transition cursor-pointer
            hover:text-slate-900 ${selected ? 'border-b-2 border-b-slate-900 text-slate-900' : 'border-b-2 border-transparent text-slate-500'}`}
        >
            <Icon size={20} />
            <div className="text-sm font-medium text-center break-normal">{label}</div>
        </div>
    )
}

export default AdminNavItem