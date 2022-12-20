import { Outlet } from 'react-router-dom';

const ExampleSharedLayout = () => {
  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
          <div className="container-fluid">
            <a className="navbar-brand" href="/">This is a share layout</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
              <ul className="navbar-nav">
                <li className="nav-item">
                  <a className="nav-link active" href="/">Home</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link active" href="/home2">Home2</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/another">Another</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/abc">Error</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/signin">Sign In</a>
                </li>
                <li className="nav-item dropdown">
                  <div className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown">
                    Dropdown link
                  </div>
                  <ul className="dropdown-menu">
                    <li><a className="dropdown-item" href="/">Action</a></li>
                    <li><a className="dropdown-item" href="/">Another action</a></li>
                    <li><a className="dropdown-item" href="/">Something else here</a></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
      <footer></footer>
    </>
  );
};

export default ExampleSharedLayout;
