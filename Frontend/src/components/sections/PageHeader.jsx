import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

export function PageHeader() {
  const [categoriaAtiva, setCategoriaAtiva] = useState('Todos');

  const categorias = [
    'Todos', 'Desenvolvimento Web', 'Mobile', 
    'UI/UX Design', 'Marketing Digital', 'Automação'
  ];

  return (
    <section className="page-header">
      <div className="container">
        <div className="breadcrumb">CONTRATAÇÃO</div>
        <h1 className="page-title">Buscar Freelancers</h1>
        <p className="page-subtitle">Profissionais verificados e estudantes de TI prontos para seu projeto.</p>
        
        <div className="search-container">
          <div className="search-input-wrapper">
            <Search className="search-icon" size={20} strokeWidth={1.5} />
            <input type="text" placeholder="Buscar por habilidade, nome ou localização..." />
          </div>
          <button className="btn-filter">
            <SlidersHorizontal size={18} strokeWidth={1.5} /> Filtros
          </button>
        </div>

        <div className="category-tags">
          {categorias.map(categoria => (
            <button 
              key={categoria}
              
              className={`tag ${categoriaAtiva === categoria ? 'active' : ''}`}
              onClick={() => setCategoriaAtiva(categoria)}
            >
              {categoria}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}