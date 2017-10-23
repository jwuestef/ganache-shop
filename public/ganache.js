$(document).ready(function() {



    // Sets black border around Shop link in navbar
    document.getElementById('shopBtn').setAttribute('style', 'outline: 4px solid black; outline-offset:5px;');


    
    if (window.screen.width < 1100) {
        document.getElementById('desktopNav').setAttribute('style', 'display:none;');
        document.getElementById('adminLogin').setAttribute('style', 'display:none;');
    }

    // If statement hides mobile navbar if device is more than 1100 pixels wide
    // if (window.screen.width >= 1100) {
    //   document.getElementById('mobileNav').setAttribute('style', 'display:none;');
    // }
    


    // On page load, calls getContent function and populates attributes for the navbar image
    getContent('navbarPage').then(function(pageContent) {
        document.getElementById('logo-main').setAttribute('src', pageContent.image1.url);
        document.getElementById('logo-main').setAttribute('alt', pageContent.image1.description);
    });
    


    // On page load, calls getContent function and populates attributes for footer content
    getContent('footerPage').then(function(pageContent) {
        document.getElementById('footerParagraph').innerText = pageContent.footerParagraph;
        document.getElementById('footerInstagramLink').setAttribute('href', pageContent.footerSocialMedia.instagram);
        document.getElementById('footerFacebookLink').setAttribute('href', pageContent.footerSocialMedia.facebook);
    });



    // Function that returns page content out of Firebase
    function getContent(pageName) {
        return firebase.database().ref('/' + pageName).once('value').then(function(pageContent) {
            return pageContent.val();
        })
    }



})