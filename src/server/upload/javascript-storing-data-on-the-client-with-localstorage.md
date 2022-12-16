Api LocalStorage allows dev webs to store data as key-values on the user's machine. Saving such data will improve performance when the number of server requests is decreased, thereby reducing server infrastructure costs.

Before the advent of LocalStorage, devs who wanted to store data on the client often needed browser cookies. This approach has some drawbacks, particularly as cookies can only store up to 4,096 bytes of data and cookies are always sent to the server when the client sends the request, increasing the size of the request, bandwidth usage, Longer request time.

In this article, we will also learn about the application of LocalStorage in saving web AP data

### 1. Check if the browser supports LocalStorage
```
if (localStorage) {
  // LocalStorage is supported
} else {
  // No support. Fallback here!
}
```
In case the browser does not support LocalStorage, you can save the data by cookie or send it to the server and save it to the server.
### 2. Storing Data in LocalStorage . 
To save data, we use the `setItem ()` function with two parameter keys and value.
```
localStorage.setItem ('name', 'Bepatient');
```
Now let's try using `localStorage` to store the information that the user types in the form in the example below.
```
<h2 id="welcomeMessage"></h2>
<form id="contactForm" action="contact.php" method="POST">
  <div class="field">
    <label for="name">Name</label>
    <input type="text" name="name" id="name">
  </div>
  <div class="field">
    <label for="email">Email</label>
    <input type="email" name="email" id="email">
  </div>
  <div class="field">
    <label for="message">Message</label>
    <textarea name="message" id="message"></textarea>
  </div>
  <div class="field">
    <input type="submit" value="send">
  </div>
</form>
```
Save username in localStorage on submit form event
```
window.onload = function() {
    if (localStorage) {
      document.getElementById('contactForm').addEventListener('submit', function() {
          var name = document.getElementById('name').value;
          localStorage.setItem('name', name);
      });
    }
}
```

### 3. Take the data out from the localStorage
To get data we use the getItem () function with the only parameter is the key used to store that data.
```
var name = localStorage.getItem('name');
```
The following example takes the user name from the localStorage and displays it on the webpage.
```
window.onload = function() {
  ...
  // Retrieve user name
  var name = localStorage.getItem('name');
  if (name != "undefined" && name != "null") {
    document.getElementById('welcomeMessage').innerHTML = "Hello " + name + "!";
  } else {
    document.getElementById('welcomeMessage').innerHTML = "Hello!";
  }  
}
```

### 4. Delete data from localStorage
In order to delete data from localStorage, we use function removeItem() with parament is the key that we use to save that data
```
localStorage.removeItem('name');
```
To delete all the data from localStorage we use function clear()
```
localStorage.clear();
```

### 5. Retrieving the key
In order to retrieve the key we use function key()  with parameter is index of the data in localStorage. In this below example, we retrieve all the key-value of item that saved in localStorage
```
var i = 0;
for (i; i <= localStorage.length; i++) {
  console.log(localStorage.key(i) + " : " + localStorage.getItem(localStorage.key(i)));
};
```
### 6. Sandboxing and Storage Limits
Data saved in localStorage is sandboxed by the domain name of the web application. Therefore, web application A can not access data in datastore of web application B and vice versa. This is an important security feature. Even a sub-domain is treated as a separate domain name and, as such, is a separate datastore.

The Limit of LocalStorage is different among different browsers. To be safe, we can assume every webapp has about 2.5 MB of memory. Because LocalStorage is only used to store data as key-value pairs, the memory size is more than enough for a regular web app.

### 7. SessionStorage
Data stored in LocalStorage will always exist in the browser and may be retrieved in the future. In case, the data only needs to be saved during the user session, it can be stored using the sessionStorage interface. The sessionStorage is full of localStorage except that the data stored in sessionStorage is automatically deleted when the user closes the web tab.
```
// Storing data
sessionStorage.setItem('name', 'Bepatient');

// Retrieving data
sessionStorage.getItem('name');

// Deleting data
sessionStorage.removeItem('name');

// Retrieving item key
sessionStorage.key(index);

// Clearing the datastore
sessionStorage.clear();
```
# Reference link
- https://mytutorials.xyz/post/view/Javascript---Storing-Data-on-The-Client-with-LocalStorage/1/473/473
- http://blog.teamtreehouse.com/storing-data-on-the-client-with-localstorage . 
- https://www.google.com.vn/search?q=local+storage&oq=localstorge&aqs=chrome.1.69i57j0l5.10473j0j7&sourceid=chrome&ie=UTF-8