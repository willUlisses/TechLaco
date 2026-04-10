import { FreelancerCard } from "../ui/FreelancerCard";

export function FreelancerList() {
  return (
    <div className="lista-container">
      <h2 className="section-title">6 DISPONÍVEIS</h2>
      <div className="freelancer-list">
        
        <FreelancerCard 
          avatar="img/mulher1.jpg"
          nome="Ana Silva"
          nota="4.9"
          avaliacoes="27"
          cargo="Desenvolvedora Frontend"
          universidade="USP - Ciência da Computação"
          local="São Paulo, SP"
          projetos="15"
          preco="45"
          skills={["React", "TypeScript"]}
        />

        <FreelancerCard 
          avatar="img/homem1.jpg"
          nome="Carlos Mendes"
          nota="4.8"
          avaliacoes="19"
          cargo="Designer UI/UX"
          universidade="UNICAMP - Design Digital"
          local="Campinas, SP"
          projetos="12"
          preco="45"
          skills={["React", "TypeScript"]}
        />

        <FreelancerCard 
          avatar="img/mulher2.jpg"
          nome="Beatriz Santos"
          nota="5.0"
          avaliacoes="34"
          cargo="Desenvolvedora Full Stack"
          universidade="UFMG - Sistemas de Informação"
          local="Belo Horizonte, MG"
          projetos="22"
          preco="45"
          skills={["React", "TypeScript"]}
        />

      </div>
    </div>
  );
}