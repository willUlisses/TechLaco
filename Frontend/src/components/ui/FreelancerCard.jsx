import { Check, Star, GraduationCap, MapPin, Code } from "lucide-react";

export function FreelancerCard({ avatar, nome, nota, avaliacoes, cargo, universidade, local, projetos, preco, skills }) {
  return (
    <article className="freelancer-card">
      <div className="freelancer-info-main">
        <div className="avatar-wrapper">
          <img src={avatar} alt={`Avatar ${nome}`} />
          <div className="verified-badge">
            <Check size={14} strokeWidth={3} />
          </div>
        </div>
        <div className="freelancer-details">
          <h3>
            {nome} <span className="rating"><Star size={14} fill="#f5b041" stroke="#f5b041" /> {nota} ({avaliacoes})</span>
          </h3>
          <p className="job-title">{cargo}</p>
          <div className="meta-info">
            <span><GraduationCap size={14} /> {universidade}</span>
            <span><MapPin size={14} /> {local}</span>
            <span><Code size={14} /> {projetos} projetos</span>
          </div>
        </div>
      </div>
      <div className="freelancer-pricing">
        <div className="price">R$ {preco}<span>/h</span></div>
        <div className="skill-tags">
          {skills.map(skill => (
            <span key={skill} className="skill-tag">{skill}</span>
          ))}
        </div>
      </div>
    </article>
  );
}