import react from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';

function About() {
  return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
    <section className="max-w-4xl mx-auto text-center px-6 py-24">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
            Acerca de <span className="text-indigo-600">MiApp</span>
        </h1>
        <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto">
            MiApp es una aplicación web construida con React y Tailwind CSS. 
            Está diseñada para ofrecer una experiencia de usuario rápida, segura y escalable.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/Start.jsx" className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-6 py-3 rounded-lg transition">
                descubre los servicios que tenemos para ti
            </Link>
        </div>
    </section>       
    </div>
  );
}

export default About;