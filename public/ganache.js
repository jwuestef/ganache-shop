$(document).ready(function() {



    // Collapses the mobile navbar when a link is clicked.
    $('.nav a').on('click', function () {
        $('.btn-navbar').click(); // bootstrap 2.x
        $('.navbar-toggle').click(); // bootstrap 3.x
      });



    // Cold pack warning modals will re-popup after this many hours:
    const resetModalsAfterHours = 1;



    // If there is an item in local storage, get the number out of it, otherwise set it to be 0 (time code for Jan 1 1970)
    var coldPackSuggested = window.localStorage.getItem('coldPackSuggested') ? Number(window.localStorage.getItem('coldPackSuggested')) : 0;
    var cartColdPackSuggested = window.localStorage.getItem('cartColdPackSuggested') ? Number(window.localStorage.getItem('cartColdPackSuggested')) : 0;



    // Watch for changes to the url's hash, important for detecting when they visit the cart, so we can show a popup the first time they visit with no coldpack added
    window.addEventListener("hashchange", locationHashChanged);



    // If there is no cold pack in the cart, and it's been over an hour since the popup last appeared, then display a modal warning them
    if (!coldPackInCart() && hoursSince(coldPackSuggested) > resetModalsAfterHours) {
        // No cold pack in the cart
        $('#myModal').modal('show');
        // Add an event listener for any click events
        document.getElementById('myModal').addEventListener('click', modalClicked);
        document.getElementById('closeModal').addEventListener('click', rejectColdPack);
        document.getElementById('rejectColdPack').addEventListener('click', rejectColdPack);
    }
    
    
    
    // If statement shows mobile navbar if device is smaller than 1080 pixels wide
    if (window.screen.width < 1080) {
        document.getElementById('mobileNav').setAttribute('style', 'display:block;');
        document.getElementById('adminLogin').setAttribute('style', 'display:none;');
    }
    
    // If statement shows desktop navbar if device is more than 1100 pixels wide
    if (window.screen.width >= 1080) {
        document.getElementById('desktopNav').setAttribute('style', 'display:block;');
        // Sets black border around Shop link in navbar
        document.getElementById('shopBtn').setAttribute('style', 'outline: 4px solid black; outline-offset:5px;');
    }
    


    // Calls getContent function and populates attributes for the NAVBAR image
    getContent('navbarPage').then(function(pageContent) {
        document.getElementById('logo-main').setAttribute('src', pageContent.image1.url);
        document.getElementById('logo-main').setAttribute('alt', pageContent.image1.description);
    });
    getContent('navbarPage').then(function(pageContent) {
        document.getElementById('logo-mobi').setAttribute('src', pageContent.image1.url);
        document.getElementById('logo-mobi').setAttribute('alt', pageContent.image1.description);
    });
    


    // Calls getContent function and populates attributes for FOOTER content
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



    // Called when the url hash changes
    function locationHashChanged() {
        // Check if the new url is the cart page
        if(window.location.href.indexOf("cart") > -1) {
            // Update the time since they last rejected the cartColdPack
            cartColdPackSuggested = window.localStorage.getItem('cartColdPackSuggested') ? Number(window.localStorage.getItem('cartColdPackSuggested')) : 0;
            // If they don't have a cold pack in their cart, and the hours since last cartRejection is at least 1, show modal
            if (!coldPackInCart() && hoursSince(cartColdPackSuggested) > resetModalsAfterHours) {
                // No cold pack in the cart
                $('#myModal').modal('show');
                // Add an event listener for any click events
                document.getElementById('myModal').addEventListener('click', modalClicked);
                document.getElementById('closeModal').addEventListener('click', rejectCartColdPack);
                document.getElementById('rejectColdPack').addEventListener('click', rejectCartColdPack);
            }
        }
    }



    // Gets called when the cold pack warning modal receives a click event
    function modalClicked(e) {
        // If it was the Add-To-Cart button that was clicked, the modal dismiss is handled in the html file via data-dismiss. Otherwise...
        // If it contains both the 'modal' and the 'fade' classes, meaning the back drop was clicked, 
        if (e.target.classList.contains('modal') && e.target.classList.contains('fade')) {
            // We need to find out which page it was dismissed from
            if(window.location.href.indexOf("cart") > -1) {
                // If it was from the cart page, set the local storage item for tracking the cart rejection
                rejectCartColdPack();
            } else {
                // Otherwise, set the local storage item for tracking non-cart rejections
                rejectColdPack();
            }
        }
    }



    // If there is a 'cart' item in local storage, then return the answer to (get the cart value see whether it contains a cold pack), otherwise false/noColdPackInCart
    function coldPackInCart() {
        return window.localStorage.getItem('PSecwid__2314096PScart') ? window.localStorage.getItem('PSecwid__2314096PScart').indexOf("COLDPACK") > -1 : false;
    }



    // Gets called when user clicks the "No thanks, I'll risk melted chocolates" button on the HOME PAGE modal warning
    function rejectColdPack() {
        window.localStorage.setItem('coldPackSuggested', Date.now());
    }



    // Gets called when user clicks the "No thanks, I'll risk melted chocolates" button on the CART PAGE modal warning
    function rejectCartColdPack() {
        window.localStorage.setItem('cartColdPackSuggested', Date.now());
    }



    // Returns the number of hours since a given date, passed in as the number of milliseconds since Jan 1 1970
    function hoursSince(date) {
        var seconds = (new Date() - date) / 1000;
        var minutes = seconds / 60;
        var hours = Math.round(minutes / 60 * 100) / 100;
        return hours;
    }



})