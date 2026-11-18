import avatar from '../assets/images/avatar.jpg';
import hero from '../assets/images/hero.jpg';
import type { SiteConfig } from '../types';

const siteConfig: SiteConfig = {
    website: 'https://gabrielacosta.dev',
    avatar: {
        src: avatar,
        alt: 'Gabriel Anuar Acosta Rosales'
    },
    title: 'Gabriel Acosta',
    subtitle: 'Desarrollador Web · Front End',
    description: 'Portafolio y blog de Gabriel Anuar Acosta Rosales, desarrollador web front-end en formación. PWA, APIs, JWT y diseño responsive.',
    image: {
        src: '/dante-preview.jpg',
        alt: 'Gabriel Acosta - Portafolio y Blog'
    },
    headerNavLinks: [
        {
            text: 'Inicio',
            href: '/'
        },
        {
            text: 'Proyectos',
            href: '/projects'
        },
        {
            text: 'Blog',
            href: '/blog'
        }
    ],
    footerNavLinks: [
        {
            text: 'Sobre mí',
            href: '/about'
        },
        {
            text: 'Contacto',
            href: '/contact'
        },
        {
            text: 'Términos',
            href: '/terms'
        }
    ],
    socialLinks: [
        {
            text: 'GitHub',
            href: 'https://github.com/Gabr13Lx'
        },
        {
            text: 'LinkedIn',
            href: 'https://linkedin.com/in'
        },
        {
            text: 'X/Twitter',
            href: 'https://twitter.com'
        }
    ],
    hero: {
        title: 'Hola, bienvenido a mi rincón en la web',
        text: "Soy **Gabriel Anuar Acosta Rosales**, desarrollador web front end en formación. Me enfoco en construir interfaces accesibles, responsivas y funcionales, con experiencia real en PWA, APIs con autenticación JWT y maquetación a partir de diseños en Figma.\n\nActualmente curso la Ingeniería en Desarrollo y Gestión de Software en la Universidad Tecnológica Fidel Velázquez, y ya concluí el TSU en Tecnologías de la Información, Área Desarrollo de Software Multiplataforma.\n\nMe gustan los retos, el trabajo en equipo y aprender rápido. Puedes ver algunos de mis proyectos en [GitHub](https://github.com/Gabr13Lx) o contactarme directamente.",
        image: {
            src: hero,
            alt: 'Gabriel Acosta trabajando frente a una computadora'
        },
        actions: [
            {
                text: 'Contáctame',
                href: '/contact'
            }
        ]
    },
    subscribe: {
        enabled: true,
        title: 'Suscríbete al newsletter',
        text: 'Una actualización por semana. Lo último del blog directo a tu correo.',
        form: {
            action: '#'
        }
    },
    postsPerPage: 4,
    projectsPerPage: 4
};

export default siteConfig;