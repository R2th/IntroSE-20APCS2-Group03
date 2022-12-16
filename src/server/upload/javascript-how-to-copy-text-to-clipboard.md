## Introduction
Clipboard.js is a Javascript library to copy text content to clipboard
## Setup
### Via CDN providers
https://github.com/zenorocha/clipboard.js/wiki/CDN-Providers
### Via npm package
```
npm install clipboard --save
```
## Usage 
Using HTML5 data atrribute  ''data-clipboard-target''  and  ''data-clipboard-action'' 

 ''Copy text''  - The code below will copy text from textarea to clipboard when event click of button Copy to clipboard is trigger
```
<textarea id="bar">Text to be copied...</textarea>
<!-- Trigger -->
<button class="btn" data-clipboard-action="copy" data-clipboard-target="#bar">
    Copy to clipboard
</button>
```

 ''Cut text''  - The code below will cut text from textarea to clipboard when event click of button Copy to clipboard is trigger
```
<textarea id="bar">Text to be cut...</textarea>
<!-- Trigger -->
<button class="btn" data-clipboard-action="cut" data-clipboard-target="#bar">
    Cut to clipboard
</button>
```
## Demo
https://quantmscubism.github.io/clipboard.html

### Reference 
- https://mytutorials.xyz/post/view/Javascript----How-to-copy-text-to-clipboard/1/279/279
- https://github.com/zenorocha/clipboard.js/wiki    

😎😎😎😎😎