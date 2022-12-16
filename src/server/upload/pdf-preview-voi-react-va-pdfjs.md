Để preview PDF page trên client . Chúng ta thường dùng `iframe` để nhúng từ một trang nào đó như 
```html
<iframe src="https://docs.google.com/gview?url=<url>&embedded=true" frameborder="0">
```
Tuy nhiên với cách này thì thường chúng ta sẽ không thể điều chỉnh lại style như mong muốn.

Ở bài viết này mình sẽ giới thiệu một cách khác đó là dùng `pdfjs` (cụ thể hơn là mình sẽ sử dụng [`pdfjs-dist`](https://github.com/mozilla/pdfjs-dist) được phát triển bởi mozilla. 

Ở bài viết này mình lại dùng `React` nhé ^^ OK, bắt đầu nào

À quên ảnh demo nè mn :v

![](https://images.viblo.asia/2e3e0cfa-0111-49ce-b2a8-b12f4718380f.png)


## Khởi tạo project

Mình sẽ dùng `create-react-app` cho nhanh nhé :v
```
yarn create react-app my-app
```

Cài thêm thư viện `pdfjs-dist`
```
yarn add pdfjs-dist
```


Bây giờ ở file `App.js` mình sẽ `import` package vào như sau 
```js
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;
```
Mọi người nhớ `import` và cấu hình workder option như trên mới chạy được nhé.

## Code

TIếp theo mình sẽ code phần còn lại như sau =))

```js
import React, { useRef, useState, useEffect, useCallback } from "react";
import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

import "./App.css";

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const defaultUrl = "/Eloquent_JavaScript.pdf";

const App = ({ src = defaultUrl }) => {
  const [pdf, setPDF] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [scale, setScale] = useState(1);
  const [numPages, setNumPages] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const canvasRef = useRef();

  const renderPage = useCallback(async ({ pdfDoc, pageNum, scale }) => {
    const page = await pdfDoc.getPage(pageNum);

    const ctx = canvasRef.current.getContext("2d");

    const viewport = page.getViewport({ scale });

    canvasRef.current.width = viewport.width;
    canvasRef.current.height = viewport.height;

    page.render({
      canvasContext: ctx,
      viewport: viewport,
    });
  }, []);

  const prevPage = () => {
    if (currentPage > 1) {
      renderPage({ pdfDoc: pdf, pageNum: currentPage - 1, scale });
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage < numPages) {
      renderPage({ pdfDoc: pdf, pageNum: currentPage + 1, scale });
      setCurrentPage(currentPage + 1);
    }
  };

  const zoomOut = () => {
    renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale - 0.1 });
    setScale(scale - 0.1);
  };

  const zoomIn = () => {
    renderPage({ pdfDoc: pdf, pageNum: currentPage, scale: scale + 0.1 });
    setScale(scale + 0.1);
  };

  useEffect(() => {
    const fetchPdf = async () => {
      const loadingTask = pdfjs.getDocument(src);

      const pdfDoc = await loadingTask.promise;

      setPDF(pdfDoc);

      setNumPages(pdfDoc._pdfInfo.numPages);

      renderPage({ pdfDoc, pageNum: 1, scale: 1 });

      setLoaded(true);
    };

    fetchPdf();
  }, [renderPage, src]);

  return (
    <div class="container">
      {loaded ? (
        <div className="menu-bar">
          <div class="title">Eloquent JavaScript</div>
          <button>
            <i class="gg-play-track-prev" onClick={prevPage}></i>
          </button>
          <button>
            <i class="gg-play-track-next" onClick={nextPage}></i>
          </button>
          <div className="pagination">
            Trang {currentPage} / {numPages}
          </div>
          <i class="gg-zoom-in" onClick={zoomIn} />
          <i class="gg-zoom-out" onClick={zoomOut} />
        </div>
      ) : (
        <h2 style={{ color: "#fff", textAlign: "center", fontSize: "40px" }}>
          Loading...
        </h2>
      )}
      <div className="canvas-container">
        <div>
          <canvas ref={canvasRef} />
        </div>
      </div>
    </div>
  );
};

export default App;
```

File `css` mình ko show ra nhé, nói chung là code hơi vội nên nhìn chuối lắm :v 

Mọi người có thể xem thêm ở repo này https://github.com/JeDTr/pdf-preview

## Tham khảo 

Mọi người có thể tham khảo một số ví dụ ở trang https://mozilla.github.io/pdf.js/examples/ để dễ hình dung hơn nhé. 

Có một lưu ý với cách này đó là server chứa file pdf này phải allow CORS cho trang web của bạn. Vì thế cách này thường hữu ích đối với trường hợp preview các file trên server của mình.

Chúc mọi người thành công <3 <3