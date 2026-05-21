import { Code, Building } from 'lucide-react';
import { NavLink } from 'react-router-dom';


const BASE = 'pb-4 text-sm font-semibold flex items-center gap-2 transition-colors border-b-[3px] -mb-[1px]';

const ACTIVE = `${BASE} text-blue-600 border-blue-600`;
const INACTIVE = `${BASE} text-slate-500 border-transparent hover:text-slate-800 hover:border-slate-300`;


export default function ProfileNav() {
    return (
        <nav
            aria-label="Tipo de perfil"
            className="flex gap-8 border-b border-slate-100"
        >
            <NavLink
                to="/perfil/freelancer"
                className={({ isActive }) => isActive ? ACTIVE : INACTIVE}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
                end
            >
                <Code size={16} aria-hidden="true" />
                Perfil Freelancer
            </NavLink>

            <NavLink
                to="/perfil/cliente"
                className={({ isActive }) => isActive ? ACTIVE : INACTIVE}
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
            >
                <Building size={16} aria-hidden="true" />
                Perfil Cliente
            </NavLink>
        </nav>
    );
}