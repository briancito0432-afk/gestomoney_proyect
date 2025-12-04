// Archivo: src/pages/LandingPage.jsx
import { Link } from 'react-router-dom';
import '../assets/styles/landing.css';

const LandingPage = () => {
  return (
    <div>
      <header className="header">
        <div className="container header-content">
          <div className="logo">Gestomoney</div>
          <nav className="nav">
            <a href="#features" className="nav-link">Características</a>
            <a href="#testimonials" className="nav-link">Precios</a>
            <a href="#about" className="nav-link">Acerca de</a>
          </nav>
          <div className="auth-buttons">
            <Link to="/login" className="btn btn-text">Iniciar sesión</Link>
            <Link to="/register" className="btn btn-primary">Regístrate gratis</Link>
          </div>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="container hero-content">
            <div className="hero-text">
              <h1>Toma el control de tus finanzas, sin esfuerzo</h1>
              <p>Gestomoney te ayuda a registrar ingresos, gestionar gastos y monitorear tu salud financiera en un solo lugar.</p>
              <Link to="/register" className="btn btn-primary btn-lg">Regístrate gratis</Link>
            </div>
            <div className="hero-image">
              {/* imagen hero */}
            </div>
          </div>
        </section>

        <section className="features" id="features">
          <div className="container">
            <h2 className="section-title">Todo lo que necesitas para tener claridad financiera</h2>
            <p className="section-subtitle">Nuestras funciones están diseñadas para ofrecerte una visión completa e intuitiva de tu vida financiera.</p>
            
            <div className="features-grid">
              <div className="feature-card">
                <div className="icon-placeholder">📈</div>
                <h3>Registro centralizado</h3>
                <p>Visualiza el panorama completo de tus ingresos y gastos.</p>
              </div>
              <div className="feature-card">
                <div className="icon-placeholder">📊</div>
                <h3>Visualizaciones intuitivas</h3>
                <p>Comprende tus hábitos de gasto de un vistazo.</p>
              </div>
              <div className="feature-card">
                <div className="icon-placeholder">🏷️</div>
                <h3>Categorización inteligente</h3>
                <p>Clasifica transacciones fácilmente para ahorrarte tiempo y obtener información precisa.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="visualization-teaser">
          <div className="container">
            <h2 className="section-title">Visualiza tus hábitos de gasto</h2>
            <p className="section-subtitle">Nuestros gráficos interactivos proporcionan claridad e información sobre a dónde va tu dinero, ayudándote a tomar decisiones financieras más inteligentes.</p>
            <div className="visualization-placeholder">
              {/* Aquí iría una imagen  */}
            </div>
          </div>
        </section>

        <section className="testimonials" id="testimonials">
          <div className="container">
            <h2 className="section-title section-title-testimonials">Valorado por usuarios de todo el mundo</h2>
            <div className="testimonials-grid">
              <div className="testimonial-card">
                <p className="quote">"Por fin me siento organizado con mi dinero. Entender a dónde van mis ingresos es mucho más claro y las visualizaciones son un cambio radical."</p>
                <div className="user-info">
                  <div className="avatar">SL</div>
                  <div>
                    <p className="user-name">Sarah L.</p>
                    <p className="user-role">Diseñadora freelance</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="quote">"Gestomoney ha transformado la forma en que administro mis finanzas. Las ideas son invaluables y la interfaz es preciosa."</p>
                <div className="user-info">
                  <div className="avatar">JD</div>
                  <div>
                    <p className="user-name">John D.</p>
                    <p className="user-role">Propietario de pequeña empresa</p>
                  </div>
                </div>
              </div>
              <div className="testimonial-card">
                <p className="quote">"Sencillo, elegante y potente. Todo lo que necesito para mantener mi presupuesto bajo control en un solo lugar."</p>
                <div className="user-info">
                  <div className="avatar">MR</div>
                  <div>
                    <p className="user-name">Maria R.</p>
                    <p className="user-role">Gerente de Marketing</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="final-cta">
          <div className="container final-cta-content">
            <h2>¿Listo para lograr claridad financiera?</h2>
            <p>Comienza hoy con Gestomoney. Es gratis y te toma menos de un minuto.</p>
            <Link to="/register" className="btn btn-secondary btn-lg">Comenzar</Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-content">
          <p>&copy; 2024 Gestomoney. Todos los derechos reservados.</p>
          <div className="footer-links">
            <a href="#terms">Términos del servicio</a>
            <a href="#privacy">Política de privacidad</a>
            <a href="#contact">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;