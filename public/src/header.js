async function carregaHeader() {
    await fetch('components/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header').innerHTML = data;
            inicializarHeader();
        })
        .catch(error => console.error('Error loading header:', error));
}

function inicializarHeader() {
    // Marca o link ativo baseado na URL atual
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');

        // Se a URL atual corresponde ao href do link
        if ((currentPath === '/' && href === '/') ||
            (currentPath !== '/' && href !== '/' && currentPath.includes(href))) {
            link.classList.add('active');
        }
    });

    // Adiciona efeito de scroll no navbar
    window.addEventListener('scroll', function () {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(0, 123, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.backgroundColor = '';
            navbar.style.backdropFilter = '';
        }
    });

    // Fecha o menu mobile ao clicar em um link
    const navbarToggler = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navbarCollapse.classList.contains('show')) {
                navbarToggler.click();
            }
        });
    });
}

document.addEventListener("DOMContentLoaded", carregaHeader);
