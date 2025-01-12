// register click event for sidebar toggle button
$(document).on('click', '.header-toggle', function(e) {
    // toggle the sidebar active class
    $('body').toggleClass('header-active');
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
    }
});

// custom scrollspy implementation
$(window).on('scroll', function() {
    // top of screen + half of screen height
    var screen_mid = $(this).scrollTop() + (0.5 * self.innerHeight);

    // store closest section info
    var closestSection = $('.section')[0];
    var closestDist = Math.abs(screen_mid - closestSection.offsetTop);

    // get side navbar
    navbar = $('#navItems');

    // for each section
    $('.section').each(function() {
        // check top and bottom (top + height) to find closest section to screen midpoint
        var dist = Math.min(Math.abs(screen_mid - this.offsetTop), Math.abs(screen_mid - (this.offsetTop + this.offsetHeight)))
        if(dist < closestDist) {
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
});