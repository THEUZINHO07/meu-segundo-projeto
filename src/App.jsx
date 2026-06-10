import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function Home() {
  return (
    <div className="text-center my-5">
      <h1 className="display-4 text-primary">Boas-Vindas!</h1>
      <p className="lead text-muted">
        Este é um projeto simples com, React, Bootstrap, Router e LocalStorage
      </p>
      <Link to="/perfil" className="btn btn-primary btn-lg mt-3 ">
        Ir para Perfil
      </Link>
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
      <div
        className={`card-header bg-dark text-white text-center py-3" ${temaSalvo}`}
      >
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
    alert("tema foi salvo!");
  };

  return (
    <div>
      <h1>Configurações</h1>
      <hr />
      <h3>Tema</h3>
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
            <Link className="nav-link text-white me-3" to="/menu">
              Menu
            </Link>
            <Link className="nav-link text-white me-3" to="/config">
              <i className="bi bi-gear"></i>
            </Link>
          </div>
        </div>
      </nav>

      <div>
        <Routes>
          <Route path="/" element={<Home />} />
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
