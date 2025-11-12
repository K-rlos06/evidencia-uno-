import React, { useState } from "react";
import "./App.css";

export default function App() {
  const [filtro, setFiltro] = useState(null);
  const [games, setGames] = useState([
    {
      id: 1,
      nombre: "Call of Duty",
      imagen: "img/cod.jpg",
      puntuacion: 50,
      categorias: ["accion", "shotter", "historia", "pov", "single", "multijugador"],
    },
    {
      id: 2,
      nombre: "GTA V",
      imagen: "img/gta.jpg",
      puntuacion: 50,
      categorias: ["accion", "aventura", "shotter", "historia", "tercera persona", "mundo abierto", "single", "multijugador"],
    },
    {
      id: 3,
      nombre: "Halo",
      imagen: "img/halo.jpg",
      puntuacion: 50,
      categorias: ["accion", "shotter", "estrategia", "pov", "campaña", "multijugador", "simulacion"],
    },
    {
      id: 4,
      nombre: "Minecraft",
      imagen: "img/minecraft.jpg",
      puntuacion: 50,
      categorias: ["aventura", "pov", "tercera persona", "single", "multijugador", "mundo abierto", "supervivencia", "creatividad", "simulacion"],
    },
    {
      id: 5,
      nombre: "Assassin's Creed",
      imagen: "img/assassins creed.jpg",
      puntuacion: 50,
      categorias: ["accion", "aventura", "historia", "tercera persona", "single", "rol", "simulacion", "campaña", "sigilo"],
    },
  ]);

  const todasCategorias = Array.from(new Set(games.flatMap(g => g.categorias))).sort();

  const cambiarPuntuacion = (id, nueva) => {
    const valor = Math.max(1, Math.min(100, Number(nueva) || 1));
    setGames(prev =>
      prev.map(g => (g.id === id ? { ...g, puntuacion: valor } : g))
    );
  };

  const agregarJuego = () => {
    const nombre = prompt("Nombre del nuevo juego:");
    if (!nombre) return;
    const imagen = prompt("Ruta de la imagen (ej: img/juego.jpg):");
    const categorias = prompt("Categorías separadas por comas:").split(",").map(c => c.trim());
    const nuevo = {
      id: Date.now(),
      nombre,
      imagen,
      puntuacion: 50,
      categorias,
    };
    setGames([...games, nuevo]);
  };

  const juegosFiltrados = filtro ? games.filter(g => g.categorias.includes(filtro)) : games;

  return (
    <div className="contenedor">
      <h1>VIDEOGAMES-PLACE</h1>

      <header>
        <ul className="menu">
          <li><button onClick={() => setFiltro(null)}>Juegos</button></li>
          <li><button onClick={() => setFiltro("sagas")}>Sagas</button></li>
          <li><button onClick={() => setFiltro("biblioteca")}>Biblioteca</button></li>
          <li><button onClick={() => setFiltro("recomendados")}>Recomendados</button></li>
        </ul>

        <div className="categorias">
          <button onClick={() => setFiltro(null)}>Todas</button>
          {todasCategorias.map(cat => (
            <button
              key={cat}
              className={filtro === cat ? "activo" : ""}
              onClick={() => setFiltro(prev => (prev === cat ? null : cat))}
            >
              {cat}
            </button>
          ))}
        </div>

        <button className="btn-agregar" onClick={agregarJuego}>Agregar Juego</button>
      </header>

      <main>
        <img src="img/logo.png" alt="logo" className="logo" />
        <h2>Bienvenido a VIDEOGAMES-PLACE</h2>
        <p>Encuentra los mejores juegos del momento.</p>

        <section id="juegos" className="section">
          <h2>Lista de Juegos</h2>
          <p>Filtrando por: <strong>{filtro ? filtro : "Todas"}</strong></p>

          <div className="lista-juegos">
            {juegosFiltrados.map(game => (
              <div key={game.id} className="tarjeta">
                <h3>{game.nombre}</h3>
                <img src={game.imagen} alt={game.nombre} />
                <p>Descripción breve del juego</p>

                <div className="categorias-juego">
                  {game.categorias.map(c => (
                    <button key={c} onClick={() => setFiltro(prev => (prev === c ? null : c))}>
                      {c}
                    </button>
                  ))}
                </div>

                <div className="puntuacion">
                  <label>Puntuación: {game.puntuacion}</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="sagas" className="section">
          <h2>Lista de sagas</h2>
          <p>Filtrando por: <strong>{filtro ? filtro : "Todas"}</strong></p>

          <div className="lista-juegos">
            {juegosFiltrados.map(game => (
              <div key={game.id} className="tarjeta">
                <h3>{game.nombre}</h3>
                <img src={game.imagen} alt={game.nombre} />
                <p>Descripción breve del juego</p>

                <div className="categorias-juego">
                  {game.categorias.map(c => (
                    <button key={c} onClick={() => setFiltro(prev => (prev === c ? null : c))}>
                      {c}
                    </button>
                  ))}
                </div>

                <div className="puntuacion">
                  <label>Puntuación: {game.puntuacion}</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="biblioteca" className="section">
          <h2>Lista de la biblioteca</h2>
          <p>Filtrando por: <strong>{filtro ? filtro : "Todas"}</strong></p>

          <div className="lista-juegos">
            {juegosFiltrados.map(game => (
              <div key={game.id} className="tarjeta">
                <h3>{game.nombre}</h3>
                <img src={game.imagen} alt={game.nombre} />
                <p>Descripción breve del juego</p>

                <div className="categorias-juego">
                  {game.categorias.map(c => (
                    <button key={c} onClick={() => setFiltro(prev => (prev === c ? null : c))}>
                      {c}
                    </button>
                  ))}
                </div>

                <div className="puntuacion">
                  <label>Puntuación: {game.puntuacion}</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
        <section id="recomendado" className="section">
          <h2>Lista de Jrecomendados</h2>
          <p>Filtrando por: <strong>{filtro ? filtro : "Todas"}</strong></p>

          <div className="lista-juegos">
            {juegosFiltrados.map(game => (
              <div key={game.id} className="tarjeta">
                <h3>{game.nombre}</h3>
                <img src={game.imagen} alt={game.nombre} />
                <p>Descripción breve del juego</p>

                <div className="categorias-juego">
                  {game.categorias.map(c => (
                    <button key={c} onClick={() => setFiltro(prev => (prev === c ? null : c))}>
                      {c}
                    </button>
                  ))}
                </div>

                <div className="puntuacion">
                  <label>Puntuación: {game.puntuacion}</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={game.puntuacion}
                    onChange={(e) => cambiarPuntuacion(game.id, e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
