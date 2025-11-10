import React, { useState, useMemo } from "react";


const initialGames = [
  {
    id: "cod",
    title: "Call of Duty",
    img: "/img/cod.jpg",
    description: "Shooter competitivo con campañas y multijugador.",
    categories: ["accion", "shotter", "pov", "single", "multijugador"],
    score: 50,
  },
  {
    id: "gta",
    title: "GTA",
    img: "/img/gta.jpg",
    description: "Mundo abierto, misiones y conducción urbana.",
    categories: ["aventura", "mundo abierto", "tercera persona", "multijugador"],
    score: 50,
  },
  {
    id: "halo",
    title: "Halo",
    img: "/img/halo.jpg",
    description: "FPS épico con campaña y modos competitivos.",
    categories: ["shotter", "pov", "multijugador", "campaña"],
    score: 50,
  },
  {
    id: "minecraft",
    title: "Minecraft",
    img: "/img/minecraft.jpg",
    description: "Sandbox, creatividad y supervivencia en mundo abierto.",
    categories: ["aventura", "mundo abierto", "creatividad", "supervivencia"],
    score: 50,
  },
  {
    id: "ac",
    title: "Assassin's Creed",
    img: "/img/assassins creed.jpg",
    description: "Acción/aventura con énfasis en historia y sigilo.",
    categories: ["aventura", "historia", "sigilo", "tercera persona"],
    score: 50,
  },
];

const allCategories = [
  "accion","aventura","shotter","lucha","historia","echos","estrategia",
  "pov","tercera persona","single","multijugador","rol","simulacion",
  "mundo abierto","campaña","supervivencia","creatividad","sigilo"
];

function Header({ onSelectCategory, activeCategory }) {
  return (
    <header className="gt-header">
      <h1 className="gt-title">VIDEOGAMES-PLACE</h1>
      <nav className="gt-nav">
        <ul>
          <li><a href="#juegos">juegos</a></li>
          <li><a href="#sagas">sagas</a></li>
          <li><a href="#biblioteca">biblioteca</a></li>
          <li><a href="#recomendaciones">recomendados</a></li>
        </ul>
      </nav>
      <div className="gt-filters">
        <button
          className={`chip ${activeCategory === null ? "active" : ""}`}
          onClick={() => onSelectCategory(null)}
        >
          Todos
        </button>
        {allCategories.slice(0,12).map(cat => (
          <button
            key={cat}
            className={`chip ${activeCategory === cat ? "active" : ""}`}
            onClick={() => onSelectCategory(cat)}
            title={cat}
          >
            {cat}
          </button>
        ))}
      </div>
    </header>
  );
}

function GameCard({ game, onChangeScore }) {
  const [localScore, setLocalScore] = useState(game.score);

  function syncScore(value) {
    const v = Number(value);
    if (isNaN(v)) return;
    const clamped = Math.max(1, Math.min(100, Math.round(v)));
    setLocalScore(clamped);
    onChangeScore(game.id, clamped);
  }

  return (
    <article className="game-card" aria-labelledby={`title-${game.id}`}>
      <img src={game.img} alt={game.title} className="game-thumb" />
      <div className="game-body">
        <h3 id={`title-${game.id}`}>{game.title}</h3>
        <p className="game-desc">{game.description}</p>

        <div className="game-cats">
          {game.categories.map(c => (
            <span key={c} className="cat-pill">{c}</span>
          ))}
        </div>

        <div className="score-row">
          <label>
            Puntuación:
            <input
              type="number"
              min="1"
              max="100"
              value={localScore}
              onChange={(e) => syncScore(e.target.value)}
            />
          </label>
          <label>
            Porcentaje:
            <input
              type="range"
              min="1"
              max="100"
              value={localScore}
              onChange={(e) => syncScore(e.target.value)}
            />
          </label>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  const [games, setGames] = useState(initialGames);
  const [activeCategory, setActiveCategory] = useState(null);
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    return games.filter(g => {
      const matchesCat = activeCategory ? g.categories.includes(activeCategory) : true;
      const matchesQuery = query.trim() === "" || g.title.toLowerCase().includes(query.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [games, activeCategory, query]);

  function handleChangeScore(id, value) {
    setGames(prev => prev.map(g => g.id === id ? { ...g, score: value } : g));
  }

  return (
    <div className="gt-app">
      <Header onSelectCategory={setActiveCategory} activeCategory={activeCategory} />

      <main className="gt-main">
        <section className="hero">
          <img src="/img/logo.png" alt="logo" className="logo" />
          <div>
            <h2>Bienvenido a VIDEOGAMES-PLACE</h2>
            <p>En esta página encontrarás los mejores juegos del momento.</p>
          </div>
        </section>

        <section id="juegos" className="section">
          <div className="section-head">
            <h2>Juegos</h2>
            <div className="search-row">
              <input
                aria-label="buscar juegos"
                placeholder="Buscar juego..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="games-grid">
            {filtered.map(game => (
              <GameCard key={game.id} game={game} onChangeScore={handleChangeScore} />
            ))}
            {filtered.length === 0 && <p className="empty">No se encontraron juegos.</p>}
          </div>
        </section>
        <section id="sagas" className="section">
          <div className="section-head">
            <h2>sagas</h2>
            <div className="search-row">
              <input
                aria-label="buscar juegos"
                placeholder="Buscar juego..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="games-grid">
            {filtered.map(game => (
              <GameCard key={game.id} game={game} onChangeScore={handleChangeScore} />
            ))}
            {filtered.length === 0 && <p className="empty">No se encontraron juegos.</p>}
          </div>
        </section>
        <section id="biblioteca" className="section">
          <div className="section-head">
            <h2>biblioteca</h2>
            <div className="search-row">
              <input
                aria-label="buscar juegos"
                placeholder="Buscar juego..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="games-grid">
            {filtered.map(game => (
              <GameCard key={game.id} game={game} onChangeScore={handleChangeScore} />
            ))}
            {filtered.length === 0 && <p className="empty">No se encontraron juegos.</p>}
          </div>
        </section>
        <section id="recomendaciones" className="section">
          <div className="section-head">
            <h2>recomendaciones</h2>
            <div className="search-row">
              <input
                aria-label="buscar juegos"
                placeholder="Buscar juego..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="games-grid">
            {filtered.map(game => (
              <GameCard key={game.id} game={game} onChangeScore={handleChangeScore} />
            ))}
            {filtered.length === 0 && <p className="empty">No se encontraron juegos.</p>}
          </div>
        </section>



      </main>
    </div>
  );
}
