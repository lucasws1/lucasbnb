const Item = () => {
  return (
    <a href="/" className="flex flex-col gap-2">
      <img
        src="../../public/images/cobertura-duplex.jpg"
        alt="Imagem da acomodação"
        className="aspect-square rounded-2xl object-cover"
      />
      <div className="flex flex-col gap-2">
        <h3 className="text-xl font-semibold">Cabo Frio, Rio de Janeiro</h3>
        <p className="truncate text-sm text-gray-600">
          Cobertura, duplex, em frente a praia das Dunas, Cabo Frio. As três
          suítes com ar condicionado. TV com suíte master e sala, com céu e
          sala. Cozinha equipada. Wi-fi de 120mbs da Vivo Fibra. Piscina e
          churrasqueira privativas. Estacionamento para dois carros dentro do
          prédio. Com uma área externa com vista panorâmica da praia das Dunas.
          O espaço Cobertura duplex em frente a praia das Dunas, em Cabo Frio. O
          apartamento conta com três suítes e mais um banheiro social, piscina e
          churrasqueira privativas, com uma área externa com vista panorâmica da
          praia das Dunas. Bairro calmo. Na rua lateral você encontra uma
          padaria que oferece café da manhã e alguns restaurantes. 3-5min da
          Praia do Forte (indo de carro). Cobertura fica no 4º andar. Acesso do
          hóspede Piscina, varanda, churrasqueira.
        </p>
      </div>
      <p className="text-sm">
        <span className="font-semibold">R$ 550,00</span> por noite
      </p>
    </a>
  );
};

export default Item;
