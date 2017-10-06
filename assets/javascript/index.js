$(function() {

    $('#myModal').on('shown.bs.modal', function() {
        console.log(this);
        $('#initialSong').focus()
    })
    $('#signUpModal').on('shown.bs.modal', function() {
        console.log(this);
        $('#usernameInput').focus()
    })
    $('#loginModal').on('shown.bs.modal', function() {
        console.log(this);
        $('#usernameLoginInput').focus()
    })

    function getToggleStatus() {
        var toggleStatus = localStorage.getItem('toggle');
        if (toggleStatus === "undefined" || toggleStatus === "false")
            return false
        else
            return true
    }

    function createLinkElement(href) {
        var link = $('<link rel="stylesheet" type="text/css" id="stylesheet">');
        link.attr('href', href);
        return link
    }


    // get jQuery wrapper for slider
    var toggle = $('#darkModeSlider');

    // calculate the toggle status based on what is in the local storage  
    var toggleStatus = getToggleStatus();

    // set the checkbox based on what is in the local storage
    toggle[0].checked = toggleStatus;

    var link = null;
    if (toggleStatus === true) {
        link = createLinkElement('assets/css/secondary-style.css');

    } else {
        link = createLinkElement('assets/css/primary-style.css');
    }

    $("head").append(link);

    // set up an on change handler in order to handle clicks on the toggle box.
    toggle.on('change', function(e) {

        var stylesheet = $("#stylesheet");
        var link = null;
        localStorage.setItem('toggle', this.checked);
        if (this.checked === true) {
            // load secondary-style.css
            link = createLinkElement('assets/css/secondary-style.css');
        } else {
            link = createLinkElement('assets/css/primary-style.css');
        }

        stylesheet.remove();
        $("head").append(link);

    })



})