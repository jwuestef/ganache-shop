$(document).ready(function() {


    var coldPackSuggested = window.localStorage.getItem('coldPackSuggested') ? Number(window.localStorage.getItem('coldPackSuggested')) : 0;
    // console.log('coldPackSuggested is:');
    // console.log(new Date(Number(coldPackSuggested)).toUTCString);
    // console.log('hoursSince(coldPackSuggested) is:')
    // console.log(hoursSince(coldPackSuggested));




    // When page loads, if there is no cold pack in the cart, and it's been over an hour since the popup last appeared, then display a modal warning them
    if (window.localStorage.getItem('PSecwid__2314096PScart').indexOf("COLDPACK") === -1 && hoursSince(coldPackSuggested) > 0.5) {
        // No cold pack in the cart
        $('#myModal').modal('show');
        // Add an event listener for any click events
        document.getElementById('myModal').addEventListener('click', modalClicked);
        document.getElementById('rejectColdPack').addEventListener('click', rejectColdPack);
    } else {
        console.log('initial page load, there IS a cold pack');
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



    // Function that returns page content out of Firebase
    function getContent(pageName) {
        return firebase.database().ref('/' + pageName).once('value').then(function(pageContent) {
            return pageContent.val();
        })
    }



    // Gets called when the cold pack warning modal receives a click event
    function modalClicked(e) {
        // Check whether the target of the click is the "Add to Bag" button
        if (e.target.classList.contains('ecwid-AddToBagButton')) {
            // If so, dismiss the modal, and set the time&date of the agreement.
            $('#myModal').modal('hide');
            window.localStorage.setItem('coldPackSuggested', Date.now());
        }
    }



    // Gets called when user clicks the "No thanks, I'll risk melted chocolates" button on the modal warning
    function rejectColdPack() {
        window.localStorage.setItem('coldPackSuggested', Date.now());
    }



    function hoursSince(date) {
        // Difference between dates (in milliseconds) turned to regular seconds
        var seconds = (new Date() - date) / 1000;
        var minutes = seconds / 60;
        var hours = Math.round(minutes / 60 * 100) / 100;
        return hours;
    }



})