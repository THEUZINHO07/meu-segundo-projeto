import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Home({ temaSalvo }) {
  const dateString = new Date().toLocaleDateString();
  const [clima, setClima] = useState(null);
  const [loadingClima, setLoadingClima] = useState(true);

  const [indiceFrases, setIndiceFrases] = useState(0);
  const frases = [
    "Sou como qualquer pessoa. Se me corto, sangro. Também fico envergonhado facilmente. - Michael Jackson",
    "O ponto é, eu sou estranho, mas eu nunca me senti estranho. - John Frusicante",
    "Você quer sair do trem antes que te empurrem. - Capitão América",
    "As coisas que eu fiz não definem quem eu sou. - Justin Bieber",
    "Eu não preciso de drogas para fazer a minha vida trágica. - Eddie Vedder",
  ];

  useEffect(() => {
    const intervalo = setInterval(() => {
      setIndiceFrases((previIndice) => (previIndice + 1) % frases.length);
    }, 10000);
    return () => clearInterval(intervalo);
  }, []);

  useEffect(() => {
    const buscarClima = async () => {
      try {
        const res = await fetch(
          "https://api.open-meteo.com/v1/forecast?latitude=-23.5505&longitude=-46.6333&current_weather=true",
        );
        const data = await res.json();
        setClima(data.current_weather);
      } catch (error) {
        console.error("Erro ao buscar clima:", error);
      } finally {
        setLoadingClima(false);
      }
    };
    buscarClima();
  }, []);

  return (
    <div className="container my-5">
      <div className="p-1 mb-4 bg-light rounded-3 shadow-small-sm border">
        <div className="container-fluid py-5 text-center">
          <h1 className="display-5 fw-bold text-primary">Boas-Vindas!</h1>
          <p className="col-md-8 fs-4 mx-auto text-muted">
            Gerencie seu perfil, personalize seu tema e acompanhe o clima em
            tempo real. tudo em um só lugar.
          </p>
          <div className="d-flex justify-content-center gap-3 mt-4">
            <Link
              to="/perfil"
              className="btn btn-primary btn-lg px-4 shadow-sm"
            >
              <i className="bi bi-person-circle me-2"></i> Perfil
            </Link>

            <Link
              to="/config"
              className="btn btn-outline-secondary btn-lg px-4 shadow-sm"
            >
              <i className="bi bi-gear-fill me-2"></i> Configurações
            </Link>
          </div>
        </div>
      </div>

      <div className="row g-4 mt-2">
        <div className="col-md-6">
          <div
            className={`card h-100 shadow-sm border-0 bg-primary text-white ${temaSalvo}`}
          >
            <div className="card-body p-4">
              {" "}
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <h5>Clima Agora</h5>
                  <p className="card-text small opacity-75">
                    São Paulo, BR {dateString}
                  </p>
                </div>
                <i className="bi bi-cloud-sun fs-1"></i>
              </div>
              <div className="mt-3">
                {loadingClima ? (
                  <div
                    className="spinner-border spinner-border-sm text-white"
                    role="status"
                  ></div>
                ) : clima ? (
                  <div className="d-flex align-items-baseline">
                    <h2 className="display-4 fw-bold mb-0">
                      {clima.temperature}ºC
                    </h2>
                    <span className="ms-3 fs-5">
                      Vento: {clima.windspeed} km/h
                    </span>
                  </div>
                ) : (
                  <p>Não foi possível carregar o clima</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 shadow-sm border-0 rounded-3 p-1 mb-4 bg-black text-white">
            <div className="p-4">
              <h5 className="mb-3">Dica de Hoje</h5>
              <p className="">"{frases[indiceFrases]}"</p>
              <Link to="/config" className="btn btn-sm btn-outline-light mt-2">
                Mudar Tema
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Perfil({ temaSalvo }) {
  const [foto, setFoto] = useState(() => {
    return localStorage.getItem("fotoPerfil") || "";
  });

  useEffect(() => {
    localStorage.setItem("fotoPerfil", foto);
  }, [foto]);

  const removerFoto = () => {
    setFoto("");
  };

  const imgChange = (e) => {
    const arquivo = e.target.files[0];
    if (arquivo) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setFoto(reader.result);
      };
      reader.readAsDataURL(arquivo);
    }
  };

  return (
    <div className="card shadow mx-auto my-5" style={{ maxWidth: "400px" }}>
      {" "}
      {/*Cartão Principal*/}
      <div className={`card-header text-white text-center py-3 ${temaSalvo}`}>
        {" "}
        {/*cabeçalho do Cartão*/}
        <h3 className="m-0">Meu Perfil</h3>
      </div>
      <div className="card-body text-center d-flex flex-column align-items-center">
        {foto ? (
          <img
            src={foto}
            alt="Foto de Perfil"
            className="img-thumbnail rounded-circle mb-3"
            style={{ width: "200px", height: "200px", objectFit: "cover" }}
          />
        ) : (
          <div
            className="bg-light rounded-circle border d-flex align-items-center justify-content-center mb-3 text-muted"
            style={{ width: "200px", height: "200px", fontSize: "14px" }}
          >
            Sem foto de Perfil
          </div>
        )}
        <div className="mb-3 w-100">
          {" "}
          {/*Grupo da Imagem*/}
          <div className="mb-3 w-100"></div>
          <label
            htmlFor="inputFoto"
            className="form-label text-start w-100 fw-bold"
          >
            Escolha uma nova foto:
          </label>
          <input
            type="file"
            id="inputFoto"
            accept="image/*"
            className="form-control"
            onChange={imgChange}
          />
        </div>
        {foto && (
          <button
            className="btn btn-outline-danger btn-sm w-100 mb-3"
            onClick={removerFoto}
          >
            Remover Foto
          </button>
        )}
        <hr className="w-100" />
        <Link to="/" className="btn btn-secondary">
          Voltar para Home
        </Link>
      </div>
    </div>
  );
}

function Config({ temaSalvo, setTemaSalvo, setTemaPreview }) {
  const [temaSelecionado, setTemaSelecionado] = useState(temaSalvo);

  const mudarPreview = (novoTema) => {
    setTemaSelecionado(novoTema);
    setTemaPreview(novoTema);
  };
  const salvarTema = () => {
    setTemaSalvo(temaSelecionado);
    toast.success("tema foi salvo!");
  };

  return (
    <div className="card">
      <div className={`card-header text-white ${temaSelecionado}`}>
        <h1 className="p-1">Configurações</h1>
      </div>
      <hr />
      <h3 className="p-2">Temas</h3>
      <button
        className="btn btn-primary"
        onClick={() => mudarPreview("bg-primary")}
      >
        Azul
      </button>
      <hr />
      <button
        className="btn btn-secondary"
        onClick={() => mudarPreview("bg-secondary")}
      >
        Cinza
      </button>
      <hr />
      <button
        className="btn btn-success"
        onClick={() => mudarPreview("bg-success")}
      >
        Verde
      </button>
      <hr />
      <button
        className="btn btn-warning"
        onClick={() => mudarPreview("bg-warning")}
      >
        Amarelo
      </button>
      <hr />
      <button
        className="btn btn-light"
        onClick={() => mudarPreview("bg-light")}
      >
        Branco
      </button>
      <hr />
      <button
        className="btn btn-danger"
        onClick={() => mudarPreview("bg-danger")}
      >
        Vermelho
      </button>
      <hr />
      <button className="btn btn-info" onClick={() => mudarPreview("bg-info")}>
        Ciano
      </button>
      <hr />
      <button className="btn btn-dark" onClick={() => mudarPreview("bg-dark")}>
        Preto
      </button>
      <hr />
      <button className="btn btn-outline-success" onClick={salvarTema}>
        Salvar
      </button>
    </div>
  );
}

export default function App() {
  const [temaSalvo, setTemaSalvo] = useState(() => {
    return localStorage.getItem("temaNavbar") || "bg-dark";
  });

  const [temaPreview, setTemaPreview] = useState(temaSalvo);

  useEffect(() => {
    localStorage.setItem("temaNavbar", temaSalvo);
    setTemaPreview(temaSalvo);
  }, [temaSalvo]);

  return (
    <Router>
      <nav className={`navbar navbar-expand navbar-dark ${temaPreview}`}>
        <div className="container">
          <span className="navbar-brand">ReactApp</span>
          <div className="navbar-nav">
            <Link
              className="nav-link text-white me-3"
              to="/"
              onClick={() => setTemaPreview(temaSalvo)}
            >
              Home
            </Link>
            <Link
              className="nav-link text-white me-3"
              to="/perfil"
              onClick={() => setTemaPreview(temaSalvo)}
            >
              Perfil
            </Link>
            {/* <Link className="nav-link text-white me-3" to="/menu">
              Menu
            </Link> */}
            <Link className="nav-link text-white me-3" to="/config">
              <i className="bi bi-gear"></i>
            </Link>
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home temaSalvo={temaSalvo} />} />
          <Route path="/perfil" element={<Perfil temaSalvo={temaSalvo} />} />
          <Route
            path="/config"
            element={
              <Config
                temaSalvo={temaSalvo}
                setTemaSalvo={setTemaSalvo}
                setTemaPreview={setTemaPreview}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}
