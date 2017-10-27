$(document).ready(function() {


    let coldPackWarning = false;



    // Sets black border around Shop link in navbar
    document.getElementById('shopBtn').setAttribute('style', 'outline: 4px solid black; outline-offset:5px;');


    
    // If statement hides desktop navbar if device is smaller than 1080 pixels wide
    if (window.screen.width < 1080) {
        document.getElementById('desktopNav').setAttribute('style', 'display:none;');
        document.getElementById('adminLogin').setAttribute('style', 'display:none;');
    }

    // If statement hides mobile navbar if device is more than 1100 pixels wide
    if (window.screen.width >= 1080) {
      document.getElementById('mobileNav').setAttribute('style', 'display:none;');
    }
    


    // On page load, calls getContent function and populates attributes for the navbar image
    getContent('navbarPage').then(function(pageContent) {
        document.getElementById('logo-main').setAttribute('src', pageContent.image1.url);
        document.getElementById('logo-main').setAttribute('alt', pageContent.image1.description);
    });
    getContent('navbarPage').then(function(pageContent) {
        document.getElementById('logo-mobi').setAttribute('src', pageContent.image1.url);
        document.getElementById('logo-mobi').setAttribute('alt', pageContent.image1.description);
    });
    


    // On page load, calls getContent function and populates attributes for footer content
    getContent('footerPage').then(function(pageContent) {
        document.getElementById('footerParagraph').innerText = pageContent.footerParagraph;
        document.getElementById('footerInstagramLink').setAttribute('href', pageContent.footerSocialMedia.instagram);
        document.getElementById('footerFacebookLink').setAttribute('href', pageContent.footerSocialMedia.facebook);
    });



    window.addEventListener("hashchange", locationHashChanged);



    // Function that returns page content out of Firebase
    function getContent(pageName) {
        return firebase.database().ref('/' + pageName).once('value').then(function(pageContent) {
            return pageContent.val();
        })
    }



    function locationHashChanged() {
        if(window.location.href.indexOf("cart") > -1) {
            if (window.localStorage.getItem('PSecwid__2314096PScart').indexOf("COLDPACK") === -1) {
                $('#coldPackWarning').slideDown(2000);
                coldPackWarning = true;
            }
        } else if (coldPackWarning) {
            $('#coldPackWarning').slideUp(2000);
            coldPackWarning = false;
        }
    }



})