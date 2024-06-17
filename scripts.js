document.addEventListener("DOMContentLoaded", function() {
    // Load sections dynamically
    loadSection("header", "sections/header.html");
    loadSection("about", "sections/about.html");
    loadSection("services", "sections/services.html");
    loadSection("portfolio", "sections/portfolio.html");
    loadSection("contact", "sections/contact.html");

    // Load JSON content
    fetch("content.json")
        .then(response => response.json())
        .then(data => {
            document.getElementById("about-description").innerText = data.about.description;
        });

    // Tabs functionality
    var tablinks = document.getElementsByClassName("tab-links");
    var tabcontents = document.getElementsByClassName("tab-contents");

    window.opentab = function(tabname) {
        for (var tablink of tablinks) {
            tablink.classList.remove("active-link");
        }
        for (var tabcontent of tabcontents) {
            tabcontent.classList.remove("active-tab");
        }
        event.currentTarget.classList.add("active-link");
        document.getElementById(tabname).classList.add("active-tab");
    };

    // Side menu functionality
    var sidemenu = document.getElementById("sidemenu");
    window.openmenu = function() {
        sidemenu.style.right = "0";
    };
    window.closemenu = function() {
        sidemenu.style.right = "-200px";
    };

    // Google Sheets form submission
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzmoM-ae_MWlqn0HXqlYARUGePk0Kdawm8GEqAvdS-ku-HRIyXciqeD_Ct4sphUQ0X4/exec';
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById("msg");

    form.addEventListener('submit', e => {
        e.preventDefault();
        fetch(scriptURL, { method: 'POST', body: new FormData(form)})
            .then(response => {
                msg.innerHTML = "Message sent successfully";
                setTimeout(() => { msg.innerHTML = ""; }, 5000);
                form.reset();
            })
            .catch(error => console.error('Error!', error.message));
    });
});

function loadSection(sectionId, url) {
    fetch(url)
        .then(response => response.text())
        .then(data => {
            document.getElementById(sectionId).innerHTML = data;
        });
}
