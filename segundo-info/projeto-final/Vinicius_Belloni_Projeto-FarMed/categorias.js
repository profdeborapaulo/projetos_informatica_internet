function voltarPagina() {
    window.history.back();
    window.addEventListener('pageshow', function(event) {

    if (event.persisted) {
        window.location.reload(true);
    }
});
}