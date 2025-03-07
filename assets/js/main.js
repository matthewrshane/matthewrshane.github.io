// register click event for sidebar toggle button
$(document).on('click', '.header-toggle', function(e) {
    // toggle the sidebar active class
    $('body').toggleClass('header-active');
    $('#overlay').toggleClass('header-active');
});

// register click event for sidebar closing buttons
$(document).on('click', '.header-close', function(e) {
    // remove the sidebar active class
    if($('body').hasClass('header-active')) $('body').removeClass('header-active');
    if($('#overlay').hasClass('header-active')) $('#overlay').removeClass('header-active');
});

// register document click event for closing the sidebar
$(document).click(function(e) {
    // ignore if the toggle button was pressed
    var toggleButton = $('.header-toggle');
    if(toggleButton.is(e.target) || toggleButton.has(e.target).length != 0) return;
    
    // ignore if the sidebar was pressed
    var sidebar = $('.sidebar')
    if(sidebar.is(e.target) || sidebar.has(e.target).length != 0) return;

    // remove the active class
    if($('body').hasClass('header-active')) {
        $('body').removeClass('header-active');
        $('#overlay').removeClass('header-active');
    }
});

// activate scroll spy
$(document).ready(function() {
    scrollSpy();
});

// activate scroll spy
$(window).on('scroll', function() {
    scrollSpy();
});

// custom scroll spy implementation
function scrollSpy() {
    // percentage of screen from top to use for scroll spy
    const screen_percent = 0.15;

    // top of screen + percent of screen height
    var screen_pos = $(this).scrollTop() + (screen_percent * self.innerHeight);

    // store closest section info
    var closestSection = $('.section')[0];
    var closestDist = screen_pos - closestSection.offsetTop;

    // get side navbar
    navbar = $('#navItems');

    // for each section
    $('.section').each(function() {
        // find closest section top already passed by screen_pos
        var dist = screen_pos - this.offsetTop;
        if(dist > 0 && dist < closestDist) {
            closestSection = this;
            closestDist = dist;
        }

        // set all sections links to inactive
        secLink = navbar.find('a[href="#' + $(this).attr('id') + '"]')
        if($(secLink).hasClass('active')) $(secLink).removeClass('active');
    });

    // set closest section to be active
    closestLink = navbar.find('a[href="#' + $(closestSection).attr('id') + '"]')
    $(closestLink).addClass('active');
}