export default function Footer() {
  return (
    <footer className="bg-[#111827] pt-12 pb-5">
      <div className="flex justify-around px-8 mb-8 max-md:flex-col max-md:gap-8 max-md:px-6">

        <div className="w-1/4 max-md:w-full">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-[#0265d2] text-white px-[10px] py-[5px] rounded-[5px] font-bold">T</div>
            <span className="text-white text-[20px] font-bold">TechLaço</span>
          </div>
          <p className="text-[#9ca3af] text-[14px] leading-normal">Conectando o profissional de tecnologia aos negócios</p>
        </div>

        {[
          { titulo: 'Produto', links: ['Como funciona', 'Propósito do Serviço'] },
          { titulo: 'Empresa', links: ['Sobre nós', 'Contato'] },
          { titulo: 'Legal', links: ['Termos de uso', 'Privacidade'] },
        ].map(({ titulo, links }) => (
          <div key={titulo} className="max-md:mb-4">
            <h3 className="text-white text-base font-semibold mb-4">{titulo}</h3>
            <ul className="list-none flex flex-col gap-3">
              {links.map(link => (
                <li key={link}>
                  <a href="#" className="text-[#9ca3af] text-[0.9rem] no-underline hover:text-white transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[#374151] pt-5 w-[90%] mx-auto flex flex-col items-center gap-1 text-[#6b7280] text-[0.85rem] text-center">
        <p>© 2026 TechLaço. Todos os direitos reservados.</p>
        <p>Esta página foi criada com base nas normas de acessibilidade da wcag 2.0</p>
      </div>
    </footer>
  )
}
