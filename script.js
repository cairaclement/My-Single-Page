$(document).ready(function() {

    $('#profil-page').click(function () {
        $('#home').html('');
        $.ajax({
            type: "GET",
            url: "profil.html",
            dataType: "html",
            success: function (data) {
                $("#home").html(data);
                $('#new_pseudo_value').submit(function () {
                    console.log('bonjour')
                    sessionStorage.setItem('user', $(this).find('input[name="change_pseudo"]').val());
                })
            },
            error: function () {
                alert("Error");
            }
        })
    })


    $('#accueil-page').click(function () {
        $('#home').html('');
        $.ajax({
            type: "GET",
            url: "accueil.html",
            dataType: "html",
            success: function (data) {
                $("#home").html(data + " " + sessionStorage.getItem('user'));
            },
            error: function () {
                alert("Error");
            }
        })
    })

    var disconnect = $('#disconnect-button');
    disconnect.click(function () {
            sessionStorage.clear();
            location.reload();
        });

    redirectIfLoggedIn();
    $('.errors').html('');

});

function isLoggedIn() {
    if(sessionStorage.getItem('user')) {
        return true;
    }
    return false;
}



function redirectIfLoggedIn(){
    if(isLoggedIn()) {
        $('#login-form').hide();
        $('#fermer').hide();
        $('#if_logged_menu').show();
        $('#profil-page').html(sessionStorage.getItem(('user')));
            if (sessionStorage.getItem("user")) {
                $.ajax({
                    type: "GET",
                    url: "accueil.html",
                    dataType: "html",
                    success: function (data) {
                        $("#home").html(data + " " + sessionStorage.getItem('user'));
                    },
                    error: function () {
                        alert("Error");
                    }
                })
            }
            else {
            return false;
            }

    } else {
        $.ajax({
            type: "GET",
            url: "login.html",
            dataType: "html",
            success: function (data) {
                $("#home").html(data);
                $('#login-form').submit(function () {
                    sessionStorage.setItem('user', $(this).find('input[name="pseudo"]').val());
                    redirectIfLoggedIn();
                    return false;
                });
            },
            error: function () {
                alert("Error");
            }
        })
        $('#if_logged_menu').hide();
        $('form').show();
    }
}




