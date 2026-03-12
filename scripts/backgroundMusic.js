window.addEventListener("DOMContentLoaded", function () {
    const audio = document.getElementById("bgMusic");
    audio.volume = 0.2;

    function startMusic() {
        audio.play().catch(function () { });
        document.removeEventListener("keydown", startMusic);
        document.removeEventListener("click", startMusic);
    }

    document.addEventListener("keydown", startMusic);
    document.addEventListener("click", startMusic);
});
