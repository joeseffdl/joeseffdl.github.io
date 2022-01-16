// Listener
document.getElementById('myForm').addEventListener('submit', saveBookmark);

// Functions
// Save bookmark
function saveBookmark(e){
    //Prevent form from submitting
    e.preventDefault();

    // Get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    // Validate Form
    if(!validateForm(siteName, siteUrl)){
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    if(localStorage.getItem('bookmarks') === null){
        //Initialize array of bookmark
        var bookmarks = [];
        // Add to array
        bookmarks.push(bookmark);
        // Set to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    else {
        // Get Bookmarks from localStorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        // Add bookmarks to array 
        bookmarks.push(bookmark);
        // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    //Clear form
    document.getElementById('myForm').reset();

    // Re-fetch bookmarks
    fetchBookmarks();
}

// Fetch Bookmarks
function fetchBookmarks(){
    // Get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Get output id
    var bookmarkResults = document.getElementById('bookmarkResults');
    // Build output
    bookmarkResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarkResults.innerHTML += 
        '<div class="well bg-light rounded-3 p-3 m-2 d-flex">'+ 
        '<h3>' +name+ 
        ' <a class="btn btn-primary" target="_blank" href="'+url+'">Visit</a> ' +
        ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
        '</h3>'+ 
        '</div>';

    }
    
}

// Delete Bookmark
function deleteBookmark(url){
    // Get Bookmarks from localStorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    // Loop bookmarks
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i,1);
        }
    }
    // Re-set back to localStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    // Re-fetch bookmarks
    fetchBookmarks();
}

// Form validation
function validateForm(siteName,siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill up the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);


    if(!siteUrl.match(regex)){
        alert('Please enter a valid url including http://');
    }

    return true;
}