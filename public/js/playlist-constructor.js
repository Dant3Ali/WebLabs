document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("playlistForm");
    const resultContainer = document.getElementById("playlistResult");
    const songModal = document.getElementById("songModal");
    const songList = document.getElementById("songList");
    const closeModalButton = document.getElementById("closeModal");
    const filterForm = document.getElementById("filterForm");
    let currentCell = null;

    const API_ENDPOINT = "http://localhost:8189/api/songs";

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        const playlistName = form.playlistName.value;
        const days = parseInt(form.days.value, 10);
        const tracksPerDay = parseInt(form.tracksPerDay.value, 10);
        const genre = form.genre.value;

        let html = `<h3>${playlistName}</h3><table><thead><tr><th>День</th><th>Треки</th></tr></thead><tbody>`;
        for (let i = 1; i <= days; i++) {
            html += `<tr><td>День ${i}</td><td>`;
            for (let j = 1; j <= tracksPerDay; j++) {
                html += `<span class="track" data-day="${i}" data-track="${j}">Трек ${j}${genre ? ` (${genre})` : ""}</span>${j < tracksPerDay ? ", " : ""}`;
            }
            html += `</td></tr>`;
        }
        html += "</tbody></table>";

        resultContainer.innerHTML = html;

        document.querySelectorAll(".track").forEach((cell) => {
            cell.addEventListener("click", (e) => {
                document.querySelectorAll(".track").forEach((c) => c.classList.remove("active"));
                currentCell = e.target;
                currentCell.classList.add("active");
                openModal();
            });
        });
    });

    async function fetchSongs(filters = {}) {
        try {
            const query = new URLSearchParams(filters).toString();
            const response = await fetch(`${API_ENDPOINT}?${query}`);
            if (!response.ok) {
                throw new Error(`Ошибка загрузки песен: ${response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Ошибка при получении песен:", error);
            return [];
        }
    }

    async function openModal(filters = {}) {
        songList.innerHTML = "<li class='spinner'>Загрузка...</li>";
        songModal.style.display = "block";

        const songs = await fetchSongs(filters);

        if (songs.length === 0) {
            songList.innerHTML = "<li>Нет доступных песен</li>";
            return;
        }

        songList.innerHTML = "";
        songs.forEach((song) => {
            const li = document.createElement("li");
            li.textContent = `${song.songName} — ${song.singer}`;
            li.addEventListener("click", () => {
                if (currentCell) {
                    currentCell.textContent = song.songName;
                }
                closeModal();
            });
            songList.appendChild(li);
        });
    }

    filterForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const filters = {
            songName: filterForm.filterName.value,
            singer: filterForm.filterSinger.value,
        };
        openModal(filters);
    });

    function closeModal() {
        songModal.style.display = "none";
    }

    closeModalButton.addEventListener("click", closeModal);
});
