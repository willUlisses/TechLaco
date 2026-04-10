import { Home, Users, Search, LayoutGrid, ChevronDown } from "lucide-react";

export function Header() {
  return (
    <header>
      <div className="container header-content">
        <div className="logo-nav">
          <div className="logo">
            <div className="logo-icon">T</div> TechLaço
          </div>
          <nav>
            <a href="#"><Home size={18} /> Início</a>
            <a href="#" className="active"><Users size={18} /> Para Clientes <ChevronDown size={16} /></a>
            <a href="#"><Search size={18} /> Para Freelancers <ChevronDown size={16} /></a>
            <a href="#"><LayoutGrid size={18} /> Dashboard</a>
          </nav>
        </div>
        <div className="user-profile">
          <div className="user-avatar">A</div> Ana Silva <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
}