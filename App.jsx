
import React, { useState } from "react";
import "./App.css";
export default function App() {
  const [games, setGames] = useState([
    {
      id: 1,
      nombre: "Call of Duty",
      imagen: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/02/todos-juegos-call-duty-ordenados-mejor-peor-mejor-orden-jugarlos-4293818.jpg?tf=3840x",
      puntuacion: 50,
      categorias: ["acción", "shotter", "historia", "pov", "tercera persona", "single", "multijugador"],
    },
    {
      id: 2,
      nombre: "gta",
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHq3bFJsmz5z28oOEqBjN1NkizeVya_scg&s",
      puntuacion: 50,
      categorias: ["acción", "aventura", "shotter", "historia", "pov", "tercera persona", "single", "multijugador", "mundo abierto"],
    },
    {
      id: 3,
      nombre: "halo",
      imagen: "https://i.ytimg.com/vi/Od-Ohnfyqsk/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDg-8yZON3jUtieTZL6p4gq_O2YiQ",
      puntuacion: 50,
      categorias: ["accion", "shotter", "historia", "estrategia", "pov", "single", "multijugador", "simulacion", "mundo abierto", "campaña"],
    },
    {
      id: 4,
      nombre: "gear of war",
      imagen: "https://i.ytimg.com/vi/Z10eZ96nIus/maxresdefault.jpg",
      puntuacion: 50,
      categorias: ["accion", "aventura", "shotter", "historia", "tercera persona", "single", "multijugador", "campaña", "terror"],
    },
    {
      id: 5,
      nombre: "assassins creed",
      imagen: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/10/orden-cronologico-saga-assassins-creed-4368442.jpg?tf=3840x",
      puntuacion: 50,
      categorias: ["accion", "aventura", "lucha", "historia", "echos", "tercera persona", "single", "rol", "simulacion", "campaña", "sigilo"],
    },
  ]);
  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [busqueda, setBusqueda] = useState("");
  const [nuevoJuego, setNuevoJuego] = useState({
    nombre: "",
    imagen: "",
    categorias: "",
    puntuacion: 50,
  });
  const agregarJuego = (e) => {
    e.preventDefault();
    if (!nuevoJuego.nombre || !nuevoJuego.imagen) {
      alert("Por favor completa todos los campos");
      return;
    }
    const categorias = nuevoJuego.categorias.split(",").map((c) => c.trim());
    const nuevo = {
      id: Date.now(),
      nombre: nuevoJuego.nombre,
      imagen: nuevoJuego.imagen,
      puntuacion: nuevoJuego.puntuacion,
      categorias,
    };
    setGames([...games, nuevo]);
    setNuevoJuego({ nombre: "", imagen: "", categorias: "", puntuacion: 50 });
  };
  const cambiarPuntuacion = (id, nueva) => {
    setGames(
      games.map((j) =>
        j.id === id ? { ...j, puntuacion: Number(nueva) } : j
      )
    );
  };
  const eliminarJuego = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este juego?")) {
      setGames(games.filter((j) => j.id !== id));
    }
  };
  const juegosFiltrados = games.filter(
    (j) =>
      (filtroCategoria ? j.categorias.includes(filtroCategoria) : true) &&
      (busqueda
        ? j.nombre.toLowerCase().includes(busqueda.toLowerCase())
        : true)
  );
  return (
    <div className="contenedor">
      <header>
        <h1>VIDEOGAMES-PLACE</h1>
        <nav>
          <ul>
            <li><a href="#juegos">Juegos</a></li>
            <li><a href="#sagas">Sagas</a></li>
            <li><a href="#biblioteca">Biblioteca</a></li>
            <li><a href="#recomendados">Recomendados</a></li>
          </ul>
        </nav>
        <div className="buscador">
          <input
            type="text"
            placeholder="Buscar por nombre o categoría..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
        <div className="categorias-btn">
          {[
            "acción", "aventura", "shotter", "historia", "achos", "estrategia", "pov", "segunda persona", "tercera persona", "single", "multijugador", "rol", "simulacion", "mundo abierto", "campaña", "supervivencia", "creatividad", "sigilo", "terror",
          ].map((cat) => (
            <button
              key={cat}
              className={`btn ${filtroCategoria === cat ? "activo" : ""}`}
              onClick={() =>
                setFiltroCategoria(filtroCategoria === cat ? "" : cat)
              }
            >
              {cat}
            </button>
          ))}
        </div>
      </header>
      <main>
        <section id="juegos" className="section">
          <h2>Lista de Juegos</h2>
          <form className="form-agregar" onSubmit={agregarJuego}>
            <input
              type="text"
              placeholder="Nombre del juego"
              value={nuevoJuego.nombre}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={nuevoJuego.imagen}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, imagen: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Categorías (separadas por comas)"
              value={nuevoJuego.categorias}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, categorias: e.target.value })
              }
            />
            <button type="submit">Agregar Juego</button>
          </form>
          <div className="lista-juegos">
            {juegosFiltrados.length === 0 ? (
              <p className="empty">No se encontraron juegos.</p>
            ) : (
              juegosFiltrados.map((j) => (
                <article className="tarjeta-juego" key={j.id}>
                  <img src={j.imagen} alt={j.nombre} />
                  <h3>{j.nombre}</h3>
                  <div className="categorias-juego">
                    {j.categorias.map((c) => (
                      <span
                        key={c}
                        onClick={() => setFiltroCategoria(c)}
                        title={`Filtrar por ${c}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="puntuacion">
                    <label>Puntuación: {j.puntuacion}</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarJuego(j.id)}
                  >
                    Eliminar
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
        <section id="sagas" className="section">
          <h2>Lista de sagas de Juegos</h2>
          <form className="form-agregar" onSubmit={agregarJuego}>
            <input
              type="text"
              placeholder="Nombre del juego"
              value={nuevoJuego.nombre}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={nuevoJuego.imagen}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, imagen: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Categorías (separadas por comas)"
              value={nuevoJuego.categorias}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, categorias: e.target.value })
              }
            />
            <button type="submit">Agregar Juego</button>
          </form>
          <div className="lista-juegos">
            {juegosFiltrados.length === 0 ? (
              <p className="empty">No se encontraron juegos.</p>
            ) : (
              juegosFiltrados.map((j) => (
                <article className="tarjeta-juego" key={j.id}>
                  <img src={j.imagen} alt={j.nombre} />
                  <h3>{j.nombre}</h3>
                  <div className="categorias-juego">
                    {j.categorias.map((c) => (
                      <span
                        key={c}
                        onClick={() => setFiltroCategoria(c)}
                        title={`Filtrar por ${c}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="puntuacion">
                    <label>Puntuación: {j.puntuacion}</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarJuego(j.id)}
                  >
                    Eliminar
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
        <section id="biblioteca" className="section">
          <h2>Lista de Juegos de la biblioteca</h2>
          <form className="form-agregar" onSubmit={agregarJuego}>
            <input
              type="text"
              placeholder="Nombre del juego"
              value={nuevoJuego.nombre}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={nuevoJuego.imagen}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, imagen: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Categorías (separadas por comas)"
              value={nuevoJuego.categorias}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, categorias: e.target.value })
              }
            />
            <button type="submit">Agregar Juego</button>
          </form>
          <div className="lista-juegos">
            {juegosFiltrados.length === 0 ? (
              <p className="empty">No se encontraron juegos.</p>
            ) : (
              juegosFiltrados.map((j) => (
                <article className="tarjeta-juego" key={j.id}>
                  <img src={j.imagen} alt={j.nombre} />
                  <h3>{j.nombre}</h3>
                  <div className="categorias-juego">
                    {j.categorias.map((c) => (
                      <span
                        key={c}
                        onClick={() => setFiltroCategoria(c)}
                        title={`Filtrar por ${c}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="puntuacion">
                    <label>Puntuación: {j.puntuacion}</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarJuego(j.id)}
                  >
                    Eliminar
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
        <section id="recomendado" className="section">
          <h2>Lista de Juegos recomendados</h2>
          <form className="form-agregar" onSubmit={agregarJuego}>
            <input
              type="text"
              placeholder="Nombre del juego"
              value={nuevoJuego.nombre}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, nombre: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={nuevoJuego.imagen}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, imagen: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Categorías (separadas por comas)"
              value={nuevoJuego.categorias}
              onChange={(e) =>
                setNuevoJuego({ ...nuevoJuego, categorias: e.target.value })
              }
            />
            <button type="submit">Agregar Juego</button>
          </form>
          <div className="lista-juegos">
            {juegosFiltrados.length === 0 ? (
              <p className="empty">No se encontraron juegos.</p>
            ) : (
              juegosFiltrados.map((j) => (
                <article className="tarjeta-juego" key={j.id}>
                  <img src={j.imagen} alt={j.nombre} />
                  <h3>{j.nombre}</h3>
                  <div className="categorias-juego">
                    {j.categorias.map((c) => (
                      <span
                        key={c}
                        onClick={() => setFiltroCategoria(c)}
                        title={`Filtrar por ${c}`}
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <div className="puntuacion">
                    <label>Puntuación: {j.puntuacion}</label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                    <input
                      type="number"
                      min="1"
                      max="100"
                      value={j.puntuacion}
                      onChange={(e) =>
                        cambiarPuntuacion(j.id, e.target.value)
                      }
                    />
                  </div>
                  <button
                    className="btn-eliminar"
                    onClick={() => eliminarJuego(j.id)}
                  >
                    Eliminar
                  </button>
                </article>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

