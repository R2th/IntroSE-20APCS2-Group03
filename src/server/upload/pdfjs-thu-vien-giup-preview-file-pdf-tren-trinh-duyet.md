Dự án mình đang làm khách hàng có yêu cầu frontend dev phải preview file pdf, mình thấy thư viện này khá hay, support cả custom giao diện xem luôn.

# [PDF.js](https://mozilla.github.io/pdf.js)
## Hello World example: [JSFiddle](https://jsfiddle.net/pdfjs/9engc9mw/?utm_source=website&utm_medium=embed&utm_campaign=9engc9mw)

#### HTML
```html
<script src="//mozilla.github.io/pdf.js/build/pdf.js"></script>

<h1>PDF.js 'Hello, world!' example</h1>

<canvas id="the-canvas"></canvas>
```

#### JavaScript
```js
// If absolute URL from the remote server is provided, configure the CORS
// header on that server.
var url = '//cdn.mozilla.net/pdfjs/helloworld.pdf';

// Loaded via <script> tag, create shortcut to access PDF.js exports.
var pdfjsLib = window['pdfjs-dist/build/pdf'];

// The workerSrc property shall be specified.
pdfjsLib.GlobalWorkerOptions.workerSrc = '//mozilla.github.io/pdf.js/build/pdf.worker.js';

// Asynchronous download of PDF
var loadingTask = pdfjsLib.getDocument(url);
loadingTask.promise.then(function(pdf) {
  console.log('PDF loaded');
  
  // Fetch the first page
  var pageNumber = 1;
  pdf.getPage(pageNumber).then(function(page) {
    console.log('Page loaded');
    
    var scale = 1.5;
    var viewport = page.getViewport(scale);

    // Prepare canvas using PDF page dimensions
    var canvas = document.getElementById('the-canvas');
    var context = canvas.getContext('2d');
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    // Render PDF page into canvas context
    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    var renderTask = page.render(renderContext);
    renderTask.then(function () {
      console.log('Page rendered');
    });
  });
}, function (reason) {
  // PDF loading error
  console.error(reason);
});
```

### Hello World using base64 encoded PDF [JSFiddle](https://jsfiddle.net/pdfjs/cq0asLqz/?utm_source=website&utm_medium=embed&utm_campaign=cq0asLqz)

### Previous/Next example [JSFiddle](https://jsfiddle.net/pdfjs/wagvs9Lf/?utm_source=website&utm_medium=embed&utm_campaign=wagvs9Lf)

### Custom Viewer [Demo](https://mozilla.github.io/pdf.js/web/viewer.html)

> https://mozilla.github.io/pdf.js/examples/
> 
> https://github.com/mozilla/pdf.js