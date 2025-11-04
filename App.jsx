
function App() {

  return (
    <div>
      <h1>VIDEOGAMES-PLACES</h1>
      <header>
        <ul className="menu horizontal">
          <li><a href="#juegos">juegos</a></li>
          <li><a href="#sagas">sagas</a></li>
          <li><a href="#biblioteca">biblioteca</a></li>
          <li><a href="#recomendasiones">recomendasiones</a></li>
        </ul>
        <div id="buttons">
            <button class="btn" data-category="accion"><a href="#accion">juegos de accion</a></button>
            <button class="btn" data-category="aventura"><a href="#aventura">juegos de aventura</a></button>
            <button class="btn" data-category="shotter"><a href="#shotter">juegos de disparos</a></button>
            <button class="btn" data-category="lucha"><a href="#lucha">juegos de luchar</a></button>
            <button class="btn" data-category="historia"><a href="#historia">juegos con historia</a></button>
            <button class="btn" data-category="echoss"><a href="#echos">juegos sobre historia</a></button>
            <button class="btn" data-category="estrategia"><a href="#estrategia">juegos de estrategia</a></button>
            <button class="btn" data-category="pov"><a href="#pov">juegos de primera persona</a></button>
            <button class="btn" data-category="segunda persona"><a href="#segunda persona">juegos en segunda persona</a></button>
            <button class="btn" data-category="tercera persona"><a href="#tercera persona">juegos en tercera persona</a></button>
            <button class="btn" data-category="single"><a href="#single">juegos de single player</a></button>
            <button class="btn" data-category="multijugador"><a href="#multijugador">juegos multijugador</a></button>
            <button class="btn" data-category="rol"><a href="#rol">juegos de rol</a></button>
            <button class="btn" data-category="simulacion"><a href="#simulacion">juegos de simulacion</a></button>
            <button class="btn" data-category="mundo abierto"><a href="#mundo abierto">juegos de mundo abierto</a></button>
            <button class="btn" data-category="campaña"><a href="#campaña">juegos de campaña</a></button>
            <button class="btn" data-category="supervivencia"><a href="#supervivencia">juego de supervivencia</a></button>
            <button class="btn" data-category="creatividad"><a href="#creatividad">juego de creatividad</a></button>
            <button class="btn" data-category="sigilo"><a href="#sigilo">juego de sigilo</a></button>

        </div>
      </header>
      <main>
        <img src="img/logo.jpg" alt="logo" className="logo"></img>
        <h2>bienvenido a videogames-places</h2>
        <p>en esta pagina encotraras los mejores videojuegos del momnto</p>
        <article>
          <img src="img/portada.jpg" alt="portada"></img>
          <p>en esta seccion encontraras los mejores videojuegos del momento</p>
        </article>
      </main>
      <section id="juegos" className="section">
        <h2>juegos</h2>
        <p>en esta seccion encontraras los mejores juegos</p>
        <ul>
          <div className="juegos">
            <li>
              <h3>call of duty</h3>
              <img src="img/cod.jpg" alt="cod"></img>
              <p>descripcion del juego</p>
              
              <div id="categorias de call of duty">
                <button>
                  <section id="accion" className="section"></section>
                  <div className="categorias de call of duty" data-category="accion">accion</div>
                </button>
                <button>
                  <section id="shotter" className="section"></section>
                  <div className="categorias de call of duty" data-category="shotter">shotter</div>
                </button>
                <button>
                  <section id="historia" className="section"></section>
                  <div className="categorias de call of duty" data-category="historia">historia</div>
                </button>
                <button>
                  <section id="pov" className="section"></section>
                  <div className="categorias de call of duty" data-category="pov">pov</div>
                </button>
                <button>
                  <section id="tercera persona" className="section"></section>
                  <div className="categorias de call of duty" data-category="tercera persona">tercera persona</div>
                </button>
                <button>
                  <section id="single" className="section"></section>
                  <div className="categorias de call of duty" data-category="single">single</div>
                </button>
                <button>
                  <section id="multijugador" className="section"></section>
                  <div className="categorias de call of duty" data-category="multijugador">multijugador</div>
                </button>
              </div>
            </li>
          </div>
        </ul>
      </section>
    </div>
  )
}

export default App