function toggleSidebar() {
    document.querySelector('.sidebar').classList.toggle('open');
}

function closeSidebar() {
    document.querySelector('.sidebar').classList.remove('open');
}

document.addEventListener('click', function (event) {
    if (document.querySelector('.sidebar').classList.contains('open') && !document.querySelector('.sidebar').contains(event.target) && !document.querySelector('.sidebar-toggle').contains(event.target)) {
        closeSidebar();
    }
});