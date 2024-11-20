document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("playlistForm");
    const resultContainer = document.getElementById("playlistResult");
    const saveSettingsButton = document.getElementById("saveSettings");
    const loadSettingsButton = document.getElementById("loadSettings");

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const playlistName = form.playlistName.value;
        const days = parseInt(form.days.value, 10);
        const tracksPerDay = parseInt(form.tracksPerDay.value, 10);
        const genre = form.genre.value;

        let html = `<h3>${playlistName}</h3><table><tr><th>День</th><th>Треки</th></tr>`;
        for (let i = 1; i <= days; i++) {
            html += `<tr><td>День ${i}</td><td>`;
            for (let j = 1; j <= tracksPerDay; j++) {
                html += `Трек ${j}${genre ? ` (${genre})` : ""}${j < tracksPerDay ? ", " : ""}`;
            }
            html += `</td></tr>`;
        }
        html += "</table>";

        resultContainer.innerHTML = html;
    });

    saveSettingsButton.addEventListener("click", () => {
        const settings = {
            playlistName: form.playlistName.value,
            days: form.days.value,
            tracksPerDay: form.tracksPerDay.value,
            genre: form.genre.value,
        };
        localStorage.setItem("playlistSettings", JSON.stringify(settings));
        alert("Настройки сохранены!");
    });

    loadSettingsButton.addEventListener("click", () => {
        const savedSettings = localStorage.getItem("playlistSettings");
        if (savedSettings) {
            const settings = JSON.parse(savedSettings);
            form.playlistName.value = settings.playlistName;
            form.days.value = settings.days;
            form.tracksPerDay.value = settings.tracksPerDay;
            form.genre.value = settings.genre;
            alert("Настройки загружены!");
        } else {
            alert("Нет сохранённых настроек!");
        }
    });
});
