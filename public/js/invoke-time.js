(function () {
    window.addEventListener('load', function () {
        // Получаем время загрузки страницы
        const loadTime = performance.now();

        // Создаем элемент для отображения информации о времени загрузки
        const footer = document.querySelector('.invoke-time');
        if (footer) {
            const loadInfo = document.createElement('div');
            loadInfo.style.fontSize = '12px';
            loadInfo.style.color = '#999';
            loadInfo.style.textAlign = 'center';
            loadInfo.style.marginTop = '10px';

            // Добавляем текст с временем загрузки
            loadInfo.textContent = `Page loaded in ${loadTime.toFixed(2)} ms`;
            footer.appendChild(loadInfo);
        }
    });
})();
