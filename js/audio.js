// fonction pour la gestion des pistes audio
function gestionSon(laClass, numPiste, action) {
    switch(action) {
        case 'play':
            $(laClass)[numPiste].play();
            break;
        case 'pause':
            $(laClass)[numPiste].pause();
            break;
        default:
            break;
    }
   
}

// fonction mute et demute
$(function() {
    $('#son').click(function() {
        $('.ambiance').prop('muted') ? $(".ambiance").prop('muted', false) : $(".ambiance").prop('muted', true);
        $('#son').blur();
    });
});
