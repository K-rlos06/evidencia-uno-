import React, { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  // MODO OSCURO / CLARO
  const [dark, setDark] = useState(true);
  useEffect(() => {
    document.documentElement.setAttribute(
      "data-theme",
      dark ? "dark" : "light"
    );
  }, [dark]);
  // CATEGORÍAS DISPONIBLES
  const categoriasDisponibles = ["acción", "aventura", "shotter", "historia", "echos", "estrategia", "pov", "segunda persona", "tercera persona", "single", "multijugador", "rol", "simulacion", "mundo abierto", "campaña", "supervivencia", "creatividad", "sigilo", "terror"]; // tú agregas más

  const [filtroCategoria, setFiltroCategoria] = useState("");
  // JUEGOS BASE
  const [games, setGames] = useState([
    {
      id: 1,
      nombre: "Call of Duty",
      imagen:
        "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/02/todos-juegos-call-duty-ordenados-mejor-peor-mejor-orden-jugarlos-4293818.jpg?tf=3840x",
      descripcion: "Shooter militar de ritmo rápido.",
      categorias: ["acción", "shotter", "historia", "pov", "tercera persona", "single", "multijugador"],
      puntuacion: 50,
      comentarios: [],
    },
    {
      id: 2,
      nombre: "GTA",
      imagen:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9bHq3bFJsmz5z28oOEqBjN1NkizeVya_scg&s",
      descripcion: "Mundo abierto lleno de acción.",
      categorias: ["acción", "aventura", "shotter", "historia", "pov", "tercera persona", "single", "multijugador", "mundo abierto"],
      puntuacion: 80,
      comentarios: [],
    },
    {
      id: 3,
      nombre: "halo",
      imagen: "https://i.ytimg.com/vi/Od-Ohnfyqsk/hq720.jpg?sqp=-oaymwEXCK4FEIIDSFryq4qpAwkIARUAAIhCGAE=&rs=AOn4CLDg-8yZON3jUtieTZL6p4gq_O2YiQ",
      puntuacion: 50,
      categorias: ["accion", "shotter", "historia", "estrategia", "pov", "single", "multijugador", "simulacion", "mundo abierto", "campaña"],
      comentarios: [],
    },
    {
      id: 4,
      nombre: "gear of war",
      imagen: "https://i.ytimg.com/vi/Z10eZ96nIus/maxresdefault.jpg",
      puntuacion: 50,
      categorias: ["accion", "aventura", "shotter", "historia", "tercera persona", "single", "multijugador", "campaña", "terror"],
      comentarios: [],
    },
    {
      id: 5,
      nombre: "assassins creed",
      imagen: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2025/10/orden-cronologico-saga-assassins-creed-4368442.jpg?tf=3840x",
      puntuacion: 50,
      categorias: ["accion", "aventura", "lucha", "historia", "echos", "tercera persona", "single", "rol", "simulacion", "campaña", "sigilo"],
      comentarios: [],
    },
  ]);
  // FORMULARIO AGREGAR JUEGO
  const [nuevoJuego, setNuevoJuego] = useState({
    nombre: "",
    imagen: "",
    descripcion: "",
    categorias: "",
    puntuacion: 50,
  });
  const agregarJuego = (e) => {
    e.preventDefault();
    setGames([
      ...games,
      {
        id: Date.now(),
        ...nuevoJuego,
        categorias: nuevoJuego.categorias.split(",").map((c) => c.trim()),
        puntuacion: Number(nuevoJuego.puntuacion),
        comentarios: [],
      },
    ]);
    setNuevoJuego({
      nombre: "",
      imagen: "",
      descripcion: "",
      categorias: "",
      puntuacion: 50,
    });
  };
  // CAMBIAR PUNTUACIÓN
  const cambiarPuntuacion = (id, valor) => {
    setGames(
      games.map((g) =>
        g.id === id ? { ...g, puntuacion: Number(valor) } : g
      )
    );
  };
  // COMENTARIOS
  const [comentariosInput, setComentariosInput] = useState({});
  const agregarComentario = (id) => {
    if (!comentariosInput[id]) return;
    setGames(
      games.map((g) =>
        g.id === id
          ? {
              ...g,
              comentarios: [...g.comentarios, comentariosInput[id]],
            }
          : g
      )
    );
    setComentariosInput({ ...comentariosInput, [id]: "" });
  };
  // ELIMINAR JUEGO
  const eliminarJuego = (id) => {
    setGames(games.filter((g) => g.id !== id));
    setReviews(reviews.filter((r) => r.juegoId !== id));
  };
  // RESEÑAS
  const [reviews, setReviews] = useState([]);
  const [nuevaResena, setNuevaResena] = useState({
    juegoId: "",
    puntuacion: 50,
    texto: "",
  });

  const agregarResena = (e) => {
    e.preventDefault();
    setReviews([
      ...reviews,
      {
        id: Date.now(),
        ...nuevaResena,
        juegoId: Number(nuevaResena.juegoId),
      },
    ]);
    setNuevaResena({
      juegoId: "",
      puntuacion: 50,
      texto: "",
    });
  };
  // FILTROS
  const juegosFiltrados = games.filter((g) =>
    filtroCategoria ? g.categorias.includes(filtroCategoria) : true
  );
  // RENDER COMPLETO
  return (
    <div className="app-root">
      <header className="header-nav">
        <div className="logo">GAME TRACKER</div>
        <nav className="nav-links">
          <a href="#juegos">Juegos</a>
          <a href="#sagas">sagas</a>
          <a href="#biblioteca">Biblioteca</a>
          <a href="#recomendaciones">recomendaciones</a>
          <a href="#agregar">Agregar juego</a>
          <a href="#reseñas">Reseñas</a>
        </nav>
        <button className="toggle-theme" onClick={() => setDark(!dark)}>
          {dark ? "🌙" : "☀️"}
        </button>
      </header>
      <div className="categorias-btn">
        {categoriasDisponibles.map((cat) => (
          <button
            key={cat}
            className={`btn-cat ${
              filtroCategoria === cat ? "activo" : ""
            }`}
            onClick={() =>
              setFiltroCategoria(filtroCategoria === cat ? "" : cat)
            }
          >
            {cat}
          </button>
        ))}
      </div>
      <section id="juegos" className="section">
        <h2>Juegos</h2>
        <div className="grid-juegos">
          {juegosFiltrados.map((g) => (
            <article key={g.id} className="card">
              <div className="card-media">
                <img src={g.imagen} alt={g.nombre} />
              </div>
              <div className="card-body">
                <h3>{g.nombre}</h3>
                <p>{g.descripcion}</p>
                <div className="card-categorias">
                  {g.categorias.map((c, i) => (
                    <span key={i} className="cat-tag">
                      {c}
                    </span>
                  ))}
                </div>
                <p>Puntuación: {g.puntuacion}%</p>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${g.puntuacion}%` }}
                  ></div>
                </div>
                <input
                  className="num-input"
                  type="number"
                  min="1"
                  max="100"
                  value={g.puntuacion}
                  onChange={(e) =>
                    cambiarPuntuacion(g.id, e.target.value)
                  }
                />
                <div className="comentarios">
                  <h4>Comentarios</h4>
                  {g.comentarios.map((c, i) => (
                    <p key={i} className="comment">{c}</p>
                  ))}
                  <input
                    placeholder="Escribe un comentario..."
                    value={comentariosInput[g.id] || ""}
                    onChange={(e) =>
                      setComentariosInput({
                        ...comentariosInput,
                        [g.id]: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => agregarComentario(g.id)}>
                    Agregar
                  </button>
                </div>
                <button className="danger" onClick={() => eliminarJuego(g.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="sagas" className="section">
        <h2>sagas de juego</h2>
        <div className="grid-juegos">
          {juegosFiltrados.map((g) => (
            <article key={g.id} className="card">
              <div className="card-media">
                <img src={g.imagen} alt={g.nombre} />
              </div>
              <div className="card-body">
                <h3>{g.nombre}</h3>
                <p>{g.descripcion}</p>
                <div className="card-categorias">
                  {g.categorias.map((c, i) => (
                    <span key={i} className="cat-tag">
                      {c}
                    </span>
                  ))}
                </div>
                <p>Puntuación: {g.puntuacion}%</p>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${g.puntuacion}%` }}
                  ></div>
                </div>
                <input
                  className="num-input"
                  type="number"
                  min="1"
                  max="100"
                  value={g.puntuacion}
                  onChange={(e) =>
                    cambiarPuntuacion(g.id, e.target.value)
                  }
                />
                <div className="comentarios">
                  <h4>Comentarios</h4>
                  {g.comentarios.map((c, i) => (
                    <p key={i} className="comment">{c}</p>
                  ))}
                  <input
                    placeholder="Escribe un comentario..."
                    value={comentariosInput[g.id] || ""}
                    onChange={(e) =>
                      setComentariosInput({
                        ...comentariosInput,
                        [g.id]: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => agregarComentario(g.id)}>
                    Agregar
                  </button>
                </div>
                <button className="danger" onClick={() => eliminarJuego(g.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="biblioteca" className="section">
        <h2>juegos de biblioteca</h2>
        <div className="grid-juegos">
          {juegosFiltrados.map((g) => (
            <article key={g.id} className="card">
              <div className="card-media">
                <img src={g.imagen} alt={g.nombre} />
              </div>
              <div className="card-body">
                <h3>{g.nombre}</h3>
                <p>{g.descripcion}</p>
                <div className="card-categorias">
                  {g.categorias.map((c, i) => (
                    <span key={i} className="cat-tag">
                      {c}
                    </span>
                  ))}
                </div>
                <p>Puntuación: {g.puntuacion}%</p>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${g.puntuacion}%` }}
                  ></div>
                </div>
                <input
                  className="num-input"
                  type="number"
                  min="1"
                  max="100"
                  value={g.puntuacion}
                  onChange={(e) =>
                    cambiarPuntuacion(g.id, e.target.value)
                  }
                />
                <div className="comentarios">
                  <h4>Comentarios</h4>
                  {g.comentarios.map((c, i) => (
                    <p key={i} className="comment">{c}</p>
                  ))}
                  <input
                    placeholder="Escribe un comentario..."
                    value={comentariosInput[g.id] || ""}
                    onChange={(e) =>
                      setComentariosInput({
                        ...comentariosInput,
                        [g.id]: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => agregarComentario(g.id)}>
                    Agregar
                  </button>
                </div>
                <button className="danger" onClick={() => eliminarJuego(g.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="recomendaciones" className="section">
        <h2>Juegos recomendados</h2>
        <div className="grid-juegos">
          {juegosFiltrados.map((g) => (
            <article key={g.id} className="card">
              <div className="card-media">
                <img src={g.imagen} alt={g.nombre} />
              </div>
              <div className="card-body">
                <h3>{g.nombre}</h3>
                <p>{g.descripcion}</p>
                <div className="card-categorias">
                  {g.categorias.map((c, i) => (
                    <span key={i} className="cat-tag">
                      {c}
                    </span>
                  ))}
                </div>
                <p>Puntuación: {g.puntuacion}%</p>
                <div className="progress">
                  <div
                    className="progress-fill"
                    style={{ width: `${g.puntuacion}%` }}
                  ></div>
                </div>
                <input
                  className="num-input"
                  type="number"
                  min="1"
                  max="100"
                  value={g.puntuacion}
                  onChange={(e) =>
                    cambiarPuntuacion(g.id, e.target.value)
                  }
                />
                <div className="comentarios">
                  <h4>Comentarios</h4>
                  {g.comentarios.map((c, i) => (
                    <p key={i} className="comment">{c}</p>
                  ))}
                  <input
                    placeholder="Escribe un comentario..."
                    value={comentariosInput[g.id] || ""}
                    onChange={(e) =>
                      setComentariosInput({
                        ...comentariosInput,
                        [g.id]: e.target.value,
                      })
                    }
                  />
                  <button onClick={() => agregarComentario(g.id)}>
                    Agregar
                  </button>
                </div>
                <button className="danger" onClick={() => eliminarJuego(g.id)}>
                  Eliminar
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section id="agregar" className="section">
        <h2>Agregar juego</h2>
        <form className="form-mini" onSubmit={agregarJuego}>
          <input
            placeholder="Nombre"
            value={nuevoJuego.nombre}
            onChange={(e) =>
              setNuevoJuego({ ...nuevoJuego, nombre: e.target.value })
            }
          />
          <input
            placeholder="URL Imagen"
            value={nuevoJuego.imagen}
            onChange={(e) =>
              setNuevoJuego({ ...nuevoJuego, imagen: e.target.value })
            }
          />
          <textarea
            placeholder="Descripción"
            value={nuevoJuego.descripcion}
            onChange={(e) =>
              setNuevoJuego({ ...nuevoJuego, descripcion: e.target.value })
            }
          />
          <input
            placeholder="Categorías (coma)"
            value={nuevoJuego.categorias}
            onChange={(e) =>
              setNuevoJuego({ ...nuevoJuego, categorias: e.target.value })
            }
          />
          <input
            type="number"
            min="1"
            max="100"
            value={nuevoJuego.puntuacion}
            onChange={(e) =>
              setNuevoJuego({ ...nuevoJuego, puntuacion: e.target.value })
            }
          />
          <button className="primary">Agregar juego</button>
        </form>
      </section>
      <section id="reseñas" className="section">
        <h2>Agregar reseña</h2>
        <form className="form-mini" onSubmit={agregarResena}>
          <select
            value={nuevaResena.juegoId}
            onChange={(e) =>
              setNuevaResena({ ...nuevaResena, juegoId: e.target.value })
            }
          >
            <option value="">Selecciona un juego</option>
            {games.map((g) => (
              <option key={g.id} value={g.id}>
                {g.nombre}
              </option>
            ))}
          </select>
          <input
            type="number"
            min="1"
            max="100"
            value={nuevaResena.puntuacion}
            onChange={(e) =>
              setNuevaResena({
                ...nuevaResena,
                puntuacion: e.target.value,
              })
            }
          />
          <textarea
            placeholder="Escribe tu reseña"
            value={nuevaResena.texto}
            onChange={(e) =>
              setNuevaResena({ ...nuevaResena, texto: e.target.value })
            }
          />
          <button className="primary">Agregar reseña</button>
        </form>
        <h2 style={{ marginTop: "40px" }}>Reseñas</h2>
        <div className="lista-reseñas">
          {reviews.map((r) => {
            const juego = games.find((g) => g.id === r.juegoId);
            return (
              <article className="review-card" key={r.id}>
                <strong>{juego ? juego.nombre : "Juego"}</strong>
                <p>Puntuación: {r.puntuacion}%</p>
                <p>{r.texto}</p>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
