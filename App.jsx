import React, { useState } from "react";

function TarjetaJuego({ juego, onEditar, onEliminar }) {
  return (
    <div className="tarjeta-juego">
      <h3>{juego.titulo}</h3>
      <p><strong>Género:</strong> {juego.genero}</p>
      <p><strong>Progreso:</strong> {juego.progreso}%</p>
      <div className="acciones">
        <button onClick={() => onEditar(juego)}>Editar</button>
        <button onClick={() => onEliminar(juego.id)}>Eliminar</button>
      </div>
    </div>
  );
}

function FormularioJuego({ onGuardar, juegoEditable, onCancelar }) {
  const [titulo, setTitulo] = useState(juegoEditable ? juegoEditable.titulo : "");
  const [genero, setGenero] = useState(juegoEditable ? juegoEditable.genero : "");
  const [progreso, setProgreso] = useState(juegoEditable ? juegoEditable.progreso : 0);

  const manejarSubmit = (e) => {
    e.preventDefault();
    const nuevoJuego = {
      id: juegoEditable ? juegoEditable.id : Date.now(),
      titulo,
      genero,
      progreso: Number(progreso),
      reseñas: juegoEditable ? juegoEditable.reseñas : []
    };
    onGuardar(nuevoJuego);
    setTitulo("");
    setGenero("");
    setProgreso(0);
  };

  return (
    <form className="formulario" onSubmit={manejarSubmit}>
      <h2>{juegoEditable ? "Editar Juego" : "Agregar Juego"}</h2>
      <input
        type="text"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Género"
        value={genero}
        onChange={(e) => setGenero(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Progreso (%)"
        value={progreso}
        onChange={(e) => setProgreso(e.target.value)}
        min="0"
        max="100"
      />
      <button type="submit">Guardar</button>
      {juegoEditable && <button onClick={onCancelar}>Cancelar</button>}
    </form>
  );
}

function ListaReseñas({ reseñas }) {
  return (
    <div className="lista-reseñas">
      <h4>Reseñas</h4>
      {reseñas.length === 0 ? (
        <p>Sin reseñas aún.</p>
      ) : (
        reseñas.map((r, i) => (
          <div key={i} className="reseña">
            <p>"{r.texto}"</p>
            <span>⭐ {r.puntuacion}/5</span>
          </div>
        ))
      )}
    </div>
  );
}

function FormularioReseña({ onAgregarReseña }) {
  const [texto, setTexto] = useState("");
  const [puntuacion, setPuntuacion] = useState(5);

  const manejarSubmit = (e) => {
    e.preventDefault();
    onAgregarReseña({ texto, puntuacion });
    setTexto("");
    setPuntuacion(5);
  };

  return (
    <form className="formulario-reseña" onSubmit={manejarSubmit}>
      <textarea
        placeholder="Escribe una reseña..."
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        required
      />
      <select value={puntuacion} onChange={(e) => setPuntuacion(Number(e.target.value))}>
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n} ⭐
          </option>
        ))}
      </select>
      <button type="submit">Agregar Reseña</button>
    </form>
  );
}

function EstadisticasPersonales({ juegos }) {
  const total = juegos.length;
  const promedioProgreso =
    total > 0 ? (juegos.reduce((sum, j) => sum + j.progreso, 0) / total).toFixed(1) : 0;

  return (
    <div className="estadisticas">
      <h3>📊 Estadísticas</h3>
      <p>Juegos en biblioteca: {total}</p>
      <p>Progreso promedio: {promedioProgreso}%</p>
    </div>
  );
}

export default function App() {
  const [juegos, setJuegos] = useState([]);
  const [juegoEditable, setJuegoEditable] = useState(null);
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  const agregarJuego = (juego) => {
    if (juegoEditable) {
      setJuegos(juegos.map((j) => (j.id === juego.id ? juego : j)));
      setJuegoEditable(null);
    } else {
      setJuegos([...juegos, juego]);
    }
  };

  const eliminarJuego = (id) => {
    setJuegos(juegos.filter((j) => j.id !== id));
  };

  const agregarReseña = (reseña) => {
    setJuegos(
      juegos.map((j) =>
        j.id === juegoSeleccionado.id
          ? { ...j, reseñas: [...(j.reseñas || []), reseña] }
          : j
      )
    );
  };

  return (
    <div className="app">
      <h1>🎮 Game Tracker</h1>

      <FormularioJuego
        onGuardar={agregarJuego}
        juegoEditable={juegoEditable}
        onCancelar={() => setJuegoEditable(null)}
      />

      <div className="contenedor">
        <div className="biblioteca">
          <h2>Mi Biblioteca</h2>
          {juegos.length === 0 ? (
            <p>No hay juegos añadidos.</p>
          ) : (
            juegos.map((j) => (
              <div key={j.id} onClick={() => setJuegoSeleccionado(j)}>
                <TarjetaJuego
                  juego={j}
                  onEditar={setJuegoEditable}
                  onEliminar={eliminarJuego}
                />
              </div>
            ))
          )}
        </div>

        <div className="panel-derecho">
          <EstadisticasPersonales juegos={juegos} />
          {juegoSeleccionado && (
            <div className="detalle-juego">
              <h3>Detalles de: {juegoSeleccionado.titulo}</h3>
              <ListaReseñas reseñas={juegoSeleccionado.reseñas || []} />
              <FormularioReseña onAgregarReseña={agregarReseña} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
