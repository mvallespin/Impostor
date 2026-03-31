import { useState } from 'react'
import { X, Plus, Check } from 'lucide-react'
import { WordPackage } from '../App'
import PackageCard from '../components/PackageCard'
import CreateCustomPackageModal from '../components/CreateCustomPackageModal'

// Default packages with emojis as simple icons
const DEFAULT_PACKAGES: WordPackage[] = [
  {
    id: 'animals',
    name: 'Animales',
    words: [
      'León', 'Tigre', 'Elefante', 'Jirafa', 'Cebra', 'Hipopótamo', 'Rinoceronte', 'Gorila', 'Chimpancé', 'Oso Panda',
      'Oso Polar', 'Oso Pardo', 'Lobo', 'Zorro', 'Perro', 'Gato', 'Conejo', 'Hámster', 'Caballo', 'Vaca',
      'Cerdo', 'Oveja', 'Cabra', 'Gallina', 'Pato', 'Ganso', 'Pavo', 'Burro', 'Camello', 'Llama',
      'Canguro', 'Koala', 'Ornitorrinco', 'Capibara', 'Perezoso', 'Mapache', 'Nutria', 'Castor', 'Ardilla', 'Murciélago',
      'Delfín', 'Ballena', 'Orca', 'Tiburón', 'Pez', 'Caballito de Mar', 'Medusa', 'Pulpo', 'Calamar', 'Tortuga',
      'Pingüino', 'Foca', 'Morsa', 'Cocodrilo', 'Caimán', 'Iguana', 'Camaleón', 'Serpiente', 'Cobra', 'Rana',
      'Toro', 'Salamandra', 'Águila', 'Halcón', 'Búho', 'Lechuza', 'Loro', 'Flamenco', 'Pavo Real', 'Tucán',
      'Colibrí', 'Avestruz', 'Mariposa', 'Abeja', 'Mariquita', 'Escorpión', 'Tarántula', 'Hormiga', 'Caracol', 'Cangrejo',
      'Langosta',
    ],
    isCustom: false,
    selected: false,
  },
  {
    id: 'movies',
    name: 'Películas',
    words: [
      'Shrek', 'Toy Story', 'El Rey León', 'Ratatouille', 'Buscando a Nemo', 'Monstruos S.A.', 'Frozen', 'Los Increibles', 'Madagascar', 'Kung Fu Panda',
      'Cómo entrenar a tu dragón', 'Inside Out', 'Coco', 'Cars', 'Up', 'Minions', 'Wall-E', 'Zootrópolis', 'Libro de la Selva', 'Ice Age',
      'Los Vengadores', 'Iron Man', 'Spider-Man', 'Batman', 'Joker', 'Superman', 'Transformers', 'Hulk', 'Thor', 'Harry Potter',
      'El Señor de los Anillos', 'Star Wars', 'Interstellar', 'Inception(Origen)', 'Los Juegos del Hambre', 'Crepúsculo', 'Divergente', 'Dune', 'Avatar', 'Matrix',
      'El Corredor del Laberinto', 'Piratas del Caribe', 'Jurassic Park', 'El Hobbit', 'Terminator', 'Dune', 'Alien', 'Expediente Warren', 'It', 'Scream',
      'Saw', 'Midsommar', 'El Resplandor', 'Barbie', 'Oppenheimer', 'La La Land', 'El Lobo de Wall Street', 'Parásitos', 'Proyecto X', 'Wonka',
      'El Padrino', 'Forrest Gump', 'El Club de la lucha', 'Seven', 'El silencio de los corderos', 'Regreso al futuro', 'El pianista', 'Gladiator', 'Whiplash', 'Kill Bill',
      'American History X', 'Indiana Jones', 'Malditos Bastardos', 'El Show de Truman', 'Shutter Island', 'Taxi Driver', 'Tiburón', 'Rocky', 'Titanic',
    ],
    isCustom: false,
    selected: false,
  },
  {
    id: 'series',
    name: 'Series',
    words: [
      'Los Simpson', 'Padre de Familia', 'South Park', 'Rick y Morty', 'BoJack Horseman', 'Futurama', 'Bob Esponja', 'Phineas y Ferb', 'Hora de Aventuras', 'Historias Corrientes',
      'El asombroso mundo de Gumball', 'Gravity Falls', 'Breaking Bad', 'Game of Thrones', 'Stranger Things', 'La Casa de Papel', 'Euphoria', 'Élite', 'El Juego del Calamar', 'The Last of Us',
      'Succession', 'Peaky Blinders', 'Chernobyl', 'Prison Break', 'Lost', 'Black Mirror', 'Friends', 'The Office', 'Modern Family', 'Cómo conocí a vuestra madre',
      'Big Bang Theory', 'Sex Education', 'Paquita Salas', 'Aquí no hay quien viva', 'La que se avecina', 'Gossip Girl', 'Crónicas Vampíricas', 'Teen Wolf', 'Outer Banks', 'Los Magos de Waverly Place',
      'Hannah Montana', 'Zack y Cody', 'Jessie', 'Victorious', 'iCarly', 'Big Time Rush', 'H2O', 'Física o Química', 'Violetta', 'Kim Possible',
      'Los Padrinos Mágicos', 'Las Supernenas', 'Ben 10', 'Ladybug', 'Steven Universe', 'Pocoyó', 'Peppa Pig', 'Caillou', 'Doraemon', 'Shin Chan',
      'Lazy Town', 'Código Lyoko', 'La Patrulla Canina', 'Dora la Exploradora', 'Fanboy y Chum Chum', 'Inazuma Eleven', 'Pokémon', 'Monster High', 'Winx Club',
    ],
    isCustom: false,
    selected: false,
  },
  {
    id: 'food',
    name: 'Comida',
    words: [
      'Pizza', 'Hamburguesa', 'Sushi', 'Tacos', 'Paella', 'Ramen', 'Kebab', 'Perrito Caliente', 'Nachos', 'Burrito',
      'Lasaña', 'Tortilla de Patata', 'Croquetas', 'Alitas de Pollo', 'Nuggets', 'Patatas Fritas', 'Macarrones con Queso', 'Poke Bowl', 'Gazpacho', 'Risotto',
      'Entrecot', 'Salmón', 'Albóndigas', 'Gyozas', 'Tortitas', 'Gofres', 'Crepes', 'Churros', 'Donuts', 'Brownie',
      'Cheesecake', 'Tiramisú', 'Helado', 'Batido', 'Cookies', 'Kinder Bueno', 'Yogur', 'Ensaladilla Rusa', 'Calamares', 'Jamón Ibérico',
      'Queso', 'Salmorejo', 'Lentejas', 'Fabada', 'Sándwich', 'Guacamole', 'Palomitas', 'Algodón de Azúcar', 'Manzana', 'Piruleta',
      'Regaliz', 'Gominolas',
    ],
    isCustom: false,
    selected: false,
  },
  {
    id: 'general',
    name: 'General',
    words: [
      'Sofá', 'Alfombra', 'Cortina', 'Cojín', 'Florero', 'Estantería', 'Perchero', 'Cuadro', 'Chimenea', 'Mando a Distancia',
      'Cepillo de Dientes', 'Toalla', 'Esponja', 'Jabón', 'Secador de Pelo', 'Plancha de Ropa', 'Percha', 'Espejo de Mano', 'Bascula', 'Cortauñas',
      'Maquinilla de Afeitar', 'Alfombrilla de Baño', 'Papel Higiénico', 'Inodoro', 'Bidet', 'Bañera', 'Grifo', 'Sartén', 'Olla', 'Escurridor',
      'Batidora', 'Tostadora', 'Cafetera', 'Sacacorchos', 'Abrelatas', 'Rallador', 'Espátula', 'Delantal', 'Táper', 'Frutero',
      'Salero', 'Azucarero', 'Servilleta', 'Manteles', 'Tenedor', 'Cuchara', 'Cuchillo', 'Vaso', 'Copa de Vino', 'Taza',
      'Plato', 'Martillo', 'Destornillador', 'Sierra', 'Taladro', 'Cinta Métrica', 'Escalera', 'Carretilla', 'Clavo', 'Tornillo',
      'Tuerca', 'Llave Inglesa', 'Nivel', 'Cubo de Pintura', 'Cuerda', 'Linterna', 'Caja de Herramientas', 'Candado', 'Cadena', 'Grapadora',
      'Clip', 'Agenda', 'Rotulador', 'Subrayador', 'Goma', 'Sacapuntas', 'Regla', 'Compás', 'Pizarra', 'Tiza',
      'Pincel', 'Acuarelas', 'Pegamento', 'Tijeras', 'Cuaderno', 'Carpeta', 'Sobre', 'Sello', 'Chincheta', 'Pos-it',
      'Bolígrafo', 'Lápiz', 'Piano', 'Batería', 'Violín', 'Flauta', 'Trompeta', 'Saxofón', 'Arpa', 'Violonchelo',
      'Ukelele', 'Armónica', 'Pandereta', 'Altavoz', 'Micrófono', 'Vinilo', 'Casete', 'Baqueta', 'Púa de Guitarra', 'Partitura',
      'Balón de Fútbol', 'Raqueta', 'Bate de Béisbol', 'Casco', 'Rodillera', 'Patines', 'Tabla de Surf', 'Esquís', 'Caña de Pescar', 'Tienda de Campaña',
      'Saco de Dormir', 'Cantimplora', 'Prismáticos', 'Silbato', 'Cronómetro', 'Pesas', 'Esterilla', 'Diana', 'Flecha', 'Remo',
      'Boya', 'Paraguas', 'Reloj', 'Mochila', 'Auriculares', 'Consola', 'Cámara de Fotos', 'Monopatín', 'Dron', 'Smartphone',
      'Maleta', 'Gafas de Sol', 'Bombilla', 'Diccionario', 'Microondas', 'Teclado', 'Ratón', 'Impresora', 'Ventilador', 'Cartera',
      'Llaves', 'Calculadora', 'Telescopio', 'Microscopio', 'Brújula', 'Termo', 'Cargador', 'Batería Externa', 'Médico', 'Bombero',
      'Policía', 'Astronauta', 'Youtuber', 'Influencer', 'Programador', 'Chef', 'Arquitecto', 'Abogado', 'Dentista', 'Piloto',
      'Marinero', 'Actor', 'Cantante', 'Fotógrafo', 'Veterinario', 'Granjero', 'Científico', 'Juez', 'Cartero', 'Bibliotecario',
      'Peluquero', 'Mecánico', 'Electricista', 'Panadero', 'Periodista', 'Diseñador', 'Carpintero', 'Entrenador', 'Fútbol', 'Baloncesto',
      'Tenis', 'Natación', 'Voleibol', 'Golf', 'Boxeo', 'Surf', 'Skate', 'Ajedrez', 'Poker', 'Ciclismo',
      'Atletismo', 'Karate', 'Yoga', 'Escalada', 'Esquí', 'Dardos', 'Billar', 'Ping Pong', 'Rugby', 'Pádel',
      'Fórmula 1', 'Motociclismo', 'CrossFit', 'Gimnasia Rítmica', 'Esgrima', 'Tiro con Arco', 'Videojuegos', 'Karaoke', 'Aeropuerto', 'Hospital',
      'Escuela', 'Biblioteca', 'Cine', 'Restaurante', 'Museo', 'Parque de Atracciones', 'Estadio', 'Gimnasio', 'Supermercado', 'Farmacia',
      'Castillo', 'Iglesia', 'Centro Comercial', 'Gasolinera', 'Banco', 'Estación de Tren', 'Puerto', 'Hotel', 'Faro', 'Rascacielos',
      'Teatro', 'Prisión', 'Universidad', 'Fábrica', 'Oficina', 'Taller', 'Zoo', 'Acuario', 'Discoteca', 'Casino',
      'Peña', 'Pabellón', 'Club de Alterne', 'Salón de Juegos', 'Montaña', 'Río', 'Lago', 'Desierto', 'Playa', 'Selva',
      'Cueva', 'Volcán', 'Isla', 'Cascada', 'Bosque', 'Glaciar', 'Pantano', 'Acantilado', 'Valle', 'Pradera',
      'Océano', 'Granja', 'Huerto', 'Parque Natural', 'Cañón', 'Tormenta', 'Arcoíris', 'Nieve', 'Granizo', 'Eclipse',
      'Terremoto', 'Tornado', 'Aurora Boreal', 'Dinero', 'Pasaporte', 'Calendario', 'Mapa', 'Bandera', 'Medalla', 'Trofeo',
      'Billete', 'Receta', 'Noticia', 'Secreto', 'Mentira', 'Sueño', 'Pesadilla', 'Vacaciones', 'Examen', 'Cumpleaños',
      'Concierto', 'Festival', 'Boda', 'Viaje', 'Mudanza', 'Fiesta', 'Siesta', 'Desayuno', 'Cena', 'Regalo',
      'Sorpresa', 'Misterio', 'Aventura', 'Inteligencia Artificial', 'Balconing', 'Bitcoin', 'Teletrabajo', 'Spoiler', 'Dana', 'Indie',
      'Performativo', 'Outfit', 'Moro', 'Gitano', 'Judio', 'Guiri', 'Racismo', 'Negro', 'Payo', 'Panchito',
      'Panchita', 'Nazi', 'Ghosting', 'Crush', 'Stalkear', 'Homosexual', 'Gay', 'Transexual', 'Travesti', 'Bisexual',
      'Lesbiana', 'NPC', 'Heterosexual', 'Pluma', 'Sudamericano', 'Chino', 'Indio', 'Pakistani', 'Islamista', 'Terrorista',
      'Musulmán', 'Bollera', 'Choni', 'Cani', 'Aura', 'Flores', 'Novia', 'Novio', 'Carta', 'Besar',
      'Follar', 'Matar', 'Apostar', 'Ruleta', 'Tragaperras', 'Tabaco', 'Porro', 'Droga', 'Pastilla', 'Cocaina',
      'Marihuana', 'Alcohol', 'Ron', 'Whiskey', 'Jagger', 'Vino', 'Cerveza', 'Ginebra', 'Vodka', 'Gramo',
      'Raya',
    ],
    isCustom: false,
    selected: false,
  },
  {
    id: 'famous',
    name: 'Famosos',
    words: [
      'Ibai Llanos', 'Auronplay', 'El Rubius', 'TheGrefg', 'DJMaRiiO', 'IlloJuan', 'MrBeast', 'Speed', 'El Xokas', 'Nil Ojeda',
      'Plex', 'Rosalía', 'Bad Bunny', 'Quevedo', 'Aitana', 'C. Tangana', 'Bizarrap', 'Taylor Swift', 'Shakira', 'Karol G',
      'Rauw Alejandro', 'Feid', 'Myke Towers', 'Young Miko', 'Lola Índigo', 'Duki', 'Nicki Nicole', 'Trueno', 'Harry Styles', 'Dua Lipa',
      'Billie Eilish', 'Bad Gyal', 'Sabrina Carpenter', 'Yung Beef', 'Cruz Cafuné', 'BTS', 'Bruno Mars', 'Romeo Santos', 'Rels B', 'JC Reyes',
      'Mora', 'L0rna', 'Metrika', 'Mvrk', 'D.Valentino', 'Leo Messi', 'Cristiano Ronaldo', 'Lamine Yamal', 'Rafa Nadal', 'Carlos Alcaraz',
      'Fernando Alonso', 'LeBron James', 'Andres Iniesta', 'Drake', 'Kendrick Lamar', 'Kanye West', 'Rihanna', 'Travis Scott', 'Tom Holland', 'Zendaya',
      'Timothée Chalamet', 'Margot Robbie', 'Ryan Gosling', 'Pedro Pascal', 'Scarlett Johansson', 'Chris Hemsworth', 'Leonardo DiCaprio', 'Brad Pitt', 'Johnny Depp', 'Tom Cruise',
      'Will Smith', 'Jennifer Lawrence', 'Emma Stone', 'Anne Hathaway', 'Keanu Reeves', 'The Rock', 'Vin Diesel', 'Jason Statham', 'Millie Bobby Brown', 'Jacob Elordi',
      'Sydney Sweeney', 'Mario Casas', 'Úrsula Corberó', 'Ester Expósito', 'Arón Piper', 'Blanca Suárez', 'Ana de Armas', 'Penélope Cruz', 'Javier Bardem', 'Antonio Banderas',
      'Jackie Chan', 'Arnold Schwarzenegger', 'Sylvester Stallone', 'Morgan Freeman', 'Angelina Jolie', 'Emma Watson', 'Selena Gomez', 'Madelyn Cline', 'Christian Bale', 'Matt Damon',
      'George Clooney', 'Adam Sandler', 'Elon Musk', 'Mark Zuckerberg', 'Jeff Bezos', 'Bill Gates', 'Steve Jobs', 'Amancio Ortega', 'Donald Trump', 'Joe Biden',
      'Barack Obama', 'Vladimir Putin', 'Javier Milei', 'Pedro Sánchez', 'Alberto Núñez Feijóo', 'Isabel Díaz Ayuso', 'Yolanda Díaz', 'Santiago Abascal', 'Kim Jong-un', 'Adolf Hitler',
      'Iósif Stalin', 'Benito Mussolini', 'Francisco Franco', 'Fidel Castro', 'Karl Marx', 'El Dandy de Barcelona', 'Llados', 'El Pequeño Nicolás', 'El Jincho', 'Cecilio G',
      'Omar Montes', 'El Cigala', 'Maeb', 'Leticia Sabater', 'Zona Gemelos', 'Frank Cuesta', 'Falete',
    ],
    isCustom: false,
    selected: false,
  },
  {
    id: 'footballers',
    name: 'Futbolistas',
    words: [
      'Vinícius Jr', 'Jude Bellingham', 'Kylian Mbappé', 'Robert Lewandowski', 'Lamine Yamal', 'Antoine Griezmann', 'Pedri', 'Fede Valverde', 'Rodrygo', 'Luka Modric',
      'Nico Williams', 'Jan Oblak', 'Thibaut Courtois', 'Dani Carvajal', 'Gavi', 'Ferran Torres', 'Julián Álvarez', 'Kroos', 'Raphinha', 'Dean Huijsen',
      'Koundé', 'Borja Iglesias', 'Araujo', 'Arda Güler', 'Endrick', 'Gonzalo García', 'Nico Paz', 'Pau Cubarsi', 'Fermín', 'Dani Olmo',
      'Erling Haaland', 'Kevin De Bruyne', 'Mohamed Salah', 'Bukayo Saka', 'Phil Foden', 'Virgil van Dijk', 'Marcus Rashford', 'Bruno Fernandes', 'Cole Palmer', 'Enzo Fernández',
      'Son Heung-min', 'Alisson Becker', 'Declan Rice', 'Martin Ødegaard', 'Bernardo Silva', 'Trent Alexander-Arnold', 'Jack Grealish', 'Casemiro', 'Luis Díaz', 'Lautaro Martínez',
      'Rafael Leão', 'Paulo Dybala', 'Khvicha Kvaratskhelia', 'Harry Kane', 'Jamal Musiala', 'Florian Wirtz', 'Manuel Neuer', 'Thomas Müller', 'Michael Olise', 'Alphonso Davies',
      'Unai Simón', 'Joan Garcia', 'Ousmane Dembélé', 'Achraf Hakimi', 'Bradley Barcola', 'Désiré Doué', 'Vitinha', 'Leo Messi', 'Cristiano Ronaldo', 'Neymar Jr',
      'Karim Benzema', 'Luis Suárez', 'Sergio Busquets', 'Jordi Alba', "N'Golo Kanté", 'Sadio Mané', 'Riyad Mahrez', 'Roberto Firmino', 'Aymeric Laporte', 'Marcelo',
      'James Rodríguez', 'Ángel Di María', 'Hulk', 'Zinedine Zidane', 'Ronaldinho', 'David Beckham', 'Ronaldo Nazário', 'Kaká', 'Iker Casillas', 'Carles Puyol',
      'Xavi Hernández', 'Andrés Iniesta', 'David Villa', 'Fernando Torres', 'Raúl González', 'Gerard Piqué', 'Sergio Ramos', 'Sergio Agüero', 'Zlatan Ibrahimović', 'Gareth Bale',
      'Wayne Rooney', 'Thierry Henry', 'Steven Gerrard', 'Arjen Robben', 'Franck Ribéry', 'Mesut Özil', 'Francesco Totti', 'Andrea Pirlo', 'Alessandro Del Piero', 'Gianluigi Buffon',
      'Roberto Carlos', 'Cafú', 'Paolo Maldini', 'Rio Ferdinand', 'Petr Čech', 'Didier Drogba', "Samuel Eto'o", 'Luis Figo', 'Michael Owen', 'Pavel Nedvěd',
      'Miroslav Klose', 'Philipp Lahm', 'Bastian Schweinsteiger', 'Cesc Fàbregas', 'Xabi Alonso', 'Guti', 'Joaquín', 'David Silva', 'Eden Hazard', 'Pelé',
      'Diego Maradona', 'Johan Cruyff', 'Alfredo Di Stéfano', 'Franz Beckenbauer', 'Eusébio', 'George Best', 'Garrincha', 'Bobby Charlton', 'Lev Yashin',
    ],
    isCustom: false,
    selected: false,
  },
]

interface PackageSelectionScreenProps {
  packages: WordPackage[]
  selectedIds: string[]
  onAddCustom: (name: string, words: string[]) => void
  onSubmit: (selectedIds: string[]) => void
  onBack: () => void
}

function PackageSelectionScreen({
  packages,
  selectedIds,
  onAddCustom,
  onSubmit,
  onBack,
}: PackageSelectionScreenProps) {
  const [showCustomModal, setShowCustomModal] = useState(false)
  const [allPackages, setAllPackages] = useState<WordPackage[]>(() => {
    const combined = [...DEFAULT_PACKAGES, ...packages.filter(p => p.isCustom)]
    return combined.map(p => ({
      ...p,
      selected: selectedIds.includes(p.id),
    }))
  })

  const togglePackage = (id: string) => {
    setAllPackages(prev =>
      prev.map(p =>
        p.id === id ? { ...p, selected: !p.selected } : p
      )
    )
  }

  const handleAddCustom = (name: string, words: string[]) => {
    onAddCustom(name, words)
    setShowCustomModal(false)
    const newPackage: WordPackage = {
      id: `custom_${Date.now()}`,
      name,
      words: words.map(w => w.trim()).filter(w => w.length > 0),
      isCustom: true,
      selected: true,
    }
    setAllPackages(prev => [...prev, newPackage])
  }

  const handleSubmit = () => {
    const selected = allPackages.filter(p => p.selected).map(p => p.id)
    if (selected.length === 0) {
      alert('Por favor, selecciona al menos un paquete de palabras')
      return
    }
    onSubmit(selected)
  }

  const selectedCount = allPackages.filter(p => p.selected).length

  const DISPLAY_ORDER: Record<string, number> = {
    general: 0,
    food: 1,
    movies: 2,
    series: 3,
    famous: 4,
    footballers: 5,
  }

  const orderedPackages = [...allPackages].sort((a, b) => {
    const orderA = a.id === 'animals' ? 1000 : (DISPLAY_ORDER[a.id] ?? 900)
    const orderB = b.id === 'animals' ? 1000 : (DISPLAY_ORDER[b.id] ?? 900)

    if (orderA !== orderB) {
      return orderA - orderB
    }

    return a.name.localeCompare(b.name, 'es')
  })

  return (
    <div className="h-[100dvh] bg-impostor-bg text-impostor-text-on-dark p-4 pb-[calc(env(safe-area-inset-bottom)+12px)] flex flex-col overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h1 className="text-3xl font-bold text-impostor-red tracking-tight">Paquetes</h1>
        <button
          onClick={onBack}
          className="text-impostor-red hover:text-impostor-red-light"
        >
          <X size={28} />
        </button>
      </div>

      {/* Packages Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 mb-3">
        <div className="grid grid-cols-2 gap-2">
          {orderedPackages.map(pkg => (
            <PackageCard
              key={pkg.id}
              package={pkg}
              isSelected={pkg.selected}
              onToggle={() => togglePackage(pkg.id)}
            />
          ))}

          {/* Add Custom Package Button */}
          <button
            onClick={() => setShowCustomModal(true)}
            className="w-full bg-impostor-surface hover:bg-impostor-surface-soft border-2 border-dashed border-impostor-red/60 rounded-xl p-4 flex flex-col items-center justify-center min-h-32 transition"
          >
            <Plus size={28} className="text-impostor-red mb-1" />
            <span className="text-impostor-red font-bold text-center text-xs">
              Crear paquete
            </span>
          </button>
        </div>
      </div>

      {/* Custom Package Modal */}
      {showCustomModal && (
        <CreateCustomPackageModal
          onSubmit={handleAddCustom}
          onCancel={() => setShowCustomModal(false)}
        />
      )}

      {/* Submit Button - Always visible at bottom */}
      <button
        onClick={handleSubmit}
        disabled={selectedCount === 0}
        className="w-full impostor-primary-btn py-4 rounded-xl text-lg flex items-center justify-center gap-2"
      >
        <Check size={20} />
        Iniciar ({selectedCount})
      </button>
    </div>
  )
}

export default PackageSelectionScreen
