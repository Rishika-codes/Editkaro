function doPost(e) {
    var sheet = SpreadsheetApp.openById("YOUR_GOOGLE_SHEET_ID").getSheetByName("Sheet1");
    var data = JSON.parse(e.postData.contents);
    
    // For Contact Form
    if (data.type === "contactForm") {
      sheet.appendRow([new Date(), data.name, data.email, data.phone, data.message]);
    }
  
    // For Email Subscription
    if (data.type === "emailSubscription") {
      sheet.appendRow([new Date(), data.email]);
    }
    
    return ContentService.createTextOutput(JSON.stringify({ 'status': 'success' })).setMimeType(ContentService.MimeType.JSON);
  }
// JavaScript for Form Submission to Google Sheets

// Function to handle email subscription form
document.getElementById('email-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var email = document.getElementById('email').value;
    var data = {
        type: "emailSubscription",
        email: email
    };

    // Send the form data to Google Apps Script
    fetch('YOUR_GOOGLE_SCRIPT_URL_HERE', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        alert('Thank you for subscribing!');
        document.getElementById('email').value = '';  // Clear the email input
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Function to handle contact form submission
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
    var message = document.getElementById('message').value;

    var data = {
        type: "contactForm",
        name: name,
        email: email,
        phone: phone,
        message: message
    };

    // Send the form data to Google Apps Script
    fetch('YOUR_GOOGLE_SCRIPT_URL_HERE', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(result => {
        alert('Your message has been submitted!');
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('message').value = '';  // Clear the form inputs
    })
    .catch(error => {
        console.error('Error:', error);
    });
});
const portfolioItems = document.querySelectorAll('.video-item');
const filters = document.querySelectorAll('.filter');

filters.forEach(filter => {
    filter.addEventListener('click', () => {
        const filterValue = filter.dataset.filter;

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.classList.contains(filterValue)) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

function openLightbox(video) {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');

    lightboxVideo.src = video.src;
    lightbox.style.display = 'flex';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');

    lightbox.style.display = 'none';
    lightboxVideo.pause();
    lightboxVideo.src = '';
}
