### 1. Bảo mật XSS với data-binding

   Khi render một kiểu dữ liệu `text` với **data binding**  (được đặt trong dấu `{}`), React sẽ mặc định xử lý để tránh các vấn đề về **XSS** , tuy nhiên lưu ý rằng nếu ta truyển vào trong `attribute` của `element` thì không thể có được tính năng này.
   
   **Do this**
   ```js
   <div>{username}</div>
   ```

**DON'T DO THIS**
   ```js
   <form action={data}>...
   ```

   ### 2. URL
   URL có thể chứa các bị **injection** bằng giao thức  `javascript:`. Ta nên validate `URL` để chắc chắn rằng `URL` là một trong hai dạng `http:` hoặc `https:`
    
   ```js
   function validateURL(url) {
      const parsed = new URL(url)
      return ['https:', 'http:'].includes(parsed.protocol)
}

<a href={validateURL(url) ? url : ''}>Click here!</a>
   ```
    
   ```js
   <a href={attackerControlled}>Click here!</a>
   ```
   ### 3. Render HTML
   Chúng ta thường xử dụng **dangerouslySetInnerHTML** để render một `DOM node` bên trong ứng dụng, tuy nhiên mọi nội dung được render bên trong nó cần  **sanitized** một cách sạch sẽ.
    
   Sử dụng một thư viện **sanitization** như [dompurify](https://www.npmjs.com/package/dompurify) trên bất kỳ đoạn HTML trước khi đưa vào  **dangerouslySetInnerHTML** 
    
```js
import purify from "dompurify";

<div dangerouslySetInnerHTML={{ __html:purify.sanitize(data) }} />
```
   
   ### 4. Access trực tiếp đến DOM
   Khi access tới `DOM` để **inject** thêm nội dung thêm vào `element` nào đó, luôn sử dụng kết hợp **dangerouslySetInnerHTML** và **dompurify** như ở trên 
   ```js
  import purify from "dompurify";

  <div dangerouslySetInnerHTML={{__html:purify.sanitize(data) }} />
  ```
  Tránh sử dụng **refs** và **findDomNode()** để **inject** tới `DOM` bằng **innerHTML** như lúc còn đi học.
  ```js
  this.myRef.current.innerHTML = attackerControlledValue;
  ```
  ### 5. Server-side rendering
  **data binding**  mặc định sẽ `escape` nội dung khi ta sử dụng các function **server-side rendering** như **ReactDOMServer.renderToString()** và **ReactDOMServer.renderToStaticMarkup()**
      
  Tránh nối những dữ liệu chưa được **sanitized**  với **output** của **renderToStaticMarkup()** khi gửi đến `client` để tránh XSS.
  
  **DON'T DO THIS**
  ```js
  app.get("/", function (req, res) {
      return res.send(
        ReactDOMServer.renderToStaticMarkup(
          React.createElement("h1", null, "Hello World!")
        ) + otherData
      );
});
  ```
      
  ### 6. Kiểm tra dependency
  Có một số thư viện thứ ba đôi khi cũng chứ nhiều nguy hiểm dù vô tình hay cố ý, vì thế hãy thường xuyên kiểm tra kỹ và update lên phiên bản mới nhất để đảm bảo.
  Hoặc sử dụng [`Snyk`](https://www.npmjs.com/package/snyk) để kiểm tra tự động.
  ```js
  $ npx snyk test
  ```
  ### 7. JSON
  Gửi `JSON` lên server không phải là chuyện hiếm gặp, tuy nhiên chúng ta cần **escape** ký tự `<` để tránh **injection**
  ```js
  window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace( /</g, '\\u003c')}
  ```
### 8. React
Nghe có vẻ vô lý, **React** mà cũng kém bảo mật ư ? Thật vậy, những `version` của **React** cũng có chứa những rủi ro ngoài mong muốn, tuy nhiên đừng lo lắng hãy `update` lên `version` mới nhất nếu có thể để tăng cường bảo mật, không có gì là hoàn hảo cả nhưng có vẫn còn hơn không :100:
### 9. Linter
Sử dụng các công cụ `linter` để có thể `detect` được những vấn đề bảo mật trong code của mình, sức người có hạn, chúng ta không thể tìm được từng lỗ hổng trong code của mình, đừng sợ **nặng máy** hay **run code** lâu mà ngại không sử dụng `Linter` 
### 10. Library code
Một số thư viện thường sử dụng `dangerouslySetInnerHTML`, `innerHTML` để `inject` HTML vào `DOM`, **không** validate `URL` hay một số thao tác thiếu bảo mật. Vì thế ta nên `review` các thư viện đó thủ công hoặc bằng `linter`, dùng `linter` cho `node_modules` cũng là một cách rất khả thi.
### Tham khảo 
* [Snyk](https://snyk.io/blog/10-react-security-best-practices/)