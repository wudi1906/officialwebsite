document.addEventListener('DOMContentLoaded', function() {
    // 加载头部导航
    fetch('header-template.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.createElement('div');
            headerContainer.innerHTML = data;
            const headerElement = headerContainer.querySelector('.header');
            
            // 替换当前页面的头部
            const existingHeader = document.querySelector('.header');
            if (existingHeader) {
                existingHeader.parentNode.replaceChild(headerElement, existingHeader);
            } else {
                document.body.insertBefore(headerElement, document.body.firstChild);
            }

            // 添加滚动事件监听器
            const navbar = document.querySelector('.navbar');
            window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                    navbar.classList.add('scrolled');
                } else {
                    navbar.classList.remove('scrolled');
                }
            });

            // 高亮当前页面的导航链接
            const currentPath = window.location.pathname.split('/').pop();
            const navLinks = document.querySelectorAll('.nav-link');
            navLinks.forEach(link => {
                if (link.getAttribute('href') === currentPath) {
                    link.classList.add('active');
                }
            });
        });

    // 加载底部导航
    fetch('footer-template.html')
        .then(response => response.text())
        .then(data => {
            const footerContainer = document.createElement('div');
            footerContainer.innerHTML = data;
            const footerElement = footerContainer.querySelector('.footer');
            
            // 替换当前页面的底部
            const existingFooter = document.querySelector('.footer');
            if (existingFooter) {
                existingFooter.parentNode.replaceChild(footerElement, existingFooter);
            } else {
                document.body.appendChild(footerElement);
            }
        });

    // 加载 script.js
    const scriptElement = document.createElement('script');
    scriptElement.src = 'script.js';
    document.body.appendChild(scriptElement);
}); 