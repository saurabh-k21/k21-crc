$(document).ready(function () {
    let $win = $(window);
    let $navbar = $('#header');
    let $toggle = $('.toggle-button');
    let width = $navbar.width();

    toggle_onclick($win, $navbar, width);

    // resize event
    $win.resize(function () {
        toggle_onclick($win, $navbar, width);
    });

    // navbar toggle
    $toggle.click(function () {
        $navbar.toggleClass("toggle-left");
    });

    // smooth scroll
    $('a[href^="#"]').on('click', function (e) {
        e.preventDefault();
        $($(this).attr('href'))[0].scrollIntoView({
            behavior: 'smooth'
        });
    });

    // footer year
    $('#year').text(new Date().getFullYear());

    // visitor counter
    updateCounter();
});

function toggle_onclick($win, $navbar, width) {
    if ($win.width() <= 768) {
        $navbar.css({ left: `-${width}px` });
    } else {
        $navbar.css({ left: '0px' });
    }
}

// Typed.js animation
var typed = new Typed('#typed', {
    strings: ['Cloud Engineer', 'Cloud Architect', 'DevOps Engineer'],
    typeSpeed: 50,
    backSpeed: 50,
    loop: true
});

// var typed_2 = new Typed('#typed_2', {
//     strings: ['Cloud Engineer', 'Cloud Architect', 'DevOps Engineer'],
//     typeSpeed: 50,
//     backSpeed: 50,
//     loop: true
// });

// visitor counter logic
const counter = document.querySelector(".counter-number");
async function updateCounter() {
    try {
        let response = await fetch(
            "https://3eyfanz6mewd2kqkgqtghs4guu0aytzb.lambda-url.us-east-1.on.aws/"
        );
        let data = await response.json();
        console.log("Counter data:", data); // debug log
        counter.innerHTML = `👀 Views: ${data.views}`;
    } catch (err) {
        console.error("Visitor counter error:", err);
        counter.innerHTML = "❌ Error loading views";
    }
}
