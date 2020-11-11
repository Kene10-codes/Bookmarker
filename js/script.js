document.querySelector('#myForm').addEventListener('submit', saveBookmark)

function saveBookmark(e) {
    var siteName = document.querySelector('#siteName').value
    var siteUrl = document.querySelector('#siteUrl').value
    
    if(!validateForm(siteName, siteUrl)){
        return false
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }
    

    if(localStorage.getItem('bookmarks') === null) {
        //inititalise array
        var bookmarks = []
        //push contents to bookamrk
        bookmarks.push(bookmark)
        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    } else {
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
         //add string to array
         bookmarks.push(bookmark)
         // set to local storage
         localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
    }

    //Reste Form
    document.querySelector('#myForm').reset()

    //Re-fetch Bookmark
    fetchBookmarks()

    e.preventDefault()
}
//Delete Bookmark
const deleteBookmark = (url) => {
    //Get bookmark from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    //Loop through bookmark
    for(var i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
           //Remove from array
           bookmarks.splice(i, 1)
        }
    }
    // set to local storage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))

    //Re-fetch Bookmark
    fetchBookmarks()
}

//Fetch bookmarks
const fetchBookmarks = () => {
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'))
    //Get output id
    var bookmarkResults = document.querySelector('#bookmarkResults');
  
    //show output
   bookmarkResults.innerHTML = ""
   for(var i = 0; i < bookmarks.length; i++) {
      var name = bookmarks[i].name
      var url = bookmarks[i].url

      bookmarkResults.innerHTML += `<div class="well">
                                     <h3 class="text-light">${name}
                                     <a class="btn btn-primary mr-1" target="_blank" href="${url}">Visit</a>
                                     <a onclick="deleteBookmark(\'${url}\')" class="btn btn-danger" href="#">Delete</a>
                                     </h3>
                                    </div>`

   }
}

//Validate form
const validateForm = (siteName, siteUrl) => {
    if(!siteName || !siteUrl) {
        alert('Please fill the form!')
        return false;
      }
  
      var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
      var regex = new RegExp(expression)
  
      if(!siteUrl.match(regex)){
          alert("Please use valid url")
          return false
      }

      return true
  
}