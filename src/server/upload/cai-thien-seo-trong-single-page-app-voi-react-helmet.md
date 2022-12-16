### Giới thiệu
Bài viết này mình viết phù hợp với những bạn đã biết Single Page App (**SPA**) và đang sử dụng ReactJS để làm SPA. Nếu bạn nào chưa biết về SPA thì có thể tham khảo bài viết sau ở Viblo [Single Page Application Concept](https://viblo.asia/p/single-page-application-concept-LzD5dDvo5jY).

Một điểm hạn chế của SPA là không hỗ trợ tốt cho Search Engine Optimization (**SEO**) vì chỉ sử dụng duy nhất một file HTML cho toàn bộ các trang, do đó các trang sẽ bị trùng nhau về **title**, **description**, **meta** nên nó không cung cấp được các thông tin riêng biệt của các trang cho công cụ tìm kiếm. 

Vậy có cách nào để giải quyết vấn đề này trong SPA hay không? Hãy theo dõi bài viết này để biết cách thực hiện nhé.

### Dùng Javascript để cập nhật HTML
Đó là bạn có thể dùng **Javascript** để cập nhật lại HTML, cụ thể các thẻ như **title**, **description**, **meta**  trong SPA bạn có thể thực hiện như sau:
```javascript
document.querySelector('title').innerText = 'Your page title'; // Cập nhật thẻ title
document.querySelector('meta[name="description"]').innerText = 'Your page description'; // Cập nhật thẻ meta description
document.querySelector('meta[name="keywords"]').innerText = 'React Helmet, SEO, SPA'; // Cập nhật thẻ meta keywords
```

Khi đó trên thẻ head sẽ có kết quả như sau:
```javascript
<head>
  <title>Your page title</title>
  <meta name="description" content="Your page description" />
  <meta name="keywords" content="React Helmet, SEO, SPA" />
  ...
</head>
```

Để thực hiện cập nhật các giá trị ở các trang thì chúng thể có thể apply những đoạn code trên vào các trang tương ứng,  hoặc có thể dùng cách khác là sử dụng thư viện **React Helmet** để việc thực hiện dễ dàng hơn.

### React Helmet là gì
**React Helmet** là một công cụ giúp chúng ta quản lý các thay đổi mã trong bộ thẻ `<head>` của HTML  như các thẻ `title`, `meta`, `...`. Nó nhận đầu vào là các thẻ HTML và xuất ra thẻ HTML vì thế rất dễ hiểu và dễ sử dụng, hãy cùng đi vào ví dụ nhé.

#### Cài đặt:
Sử dụng `yarn` hoặc `npm` để cài **React Helmet** một cách dễ dàng với cú pháp
`yarn add react-helmet` hoặc `npm install --save react-helmet`

#### Cách sử dụng
Gọi component `Helmet` vào trong code ReactJS của bạn và đặt các thẻ `title, meta, script, style` vào bên trong.

```javascript
import React from "react";
import {Helmet} from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My Title</title>
                <meta name="description" content="Helmet application" />
            </Helmet>
            ...
        </div>
    );
  }
};
```

đầu ra sẽ như thế này
```javascript
<head>
    <title>My Title</title>
    <meta name="description" content="Helmet application" />
    ...
</head>
```

Hoặc có thể sử dụng lồng nhau để ghi đè lại các thuộc thẻ

```javascript
<Parent>
    <Helmet>
        <title>My Title</title>
        <meta name="description" content="Helmet application" />
    </Helmet>

    <Child>
        <Helmet>
            <title>Nested Title</title>
            <meta name="description" content="Nested component" />
        </Helmet>
    </Child>
</Parent>
```

```javascript
<head>
    <title>Nested Title</title>
    <meta name="description" content="Nested component">
    ...
</head>
```

#### Tính năng của Helmet
* Hỗ trợ các thẻ hợp lệ trong head như : `title, base, meta, link, script, noscript,` và `style`
* Hỗ trợ các thuộc tính cho thẻ `body, html, title`
* Hỗ trợ server-side rendering
* Hỗ trợ ghi đè thay đổi ở component lồng nhau
* Các thay đổi trùng lặp được giữ nguyên trong cùng component
* Hỗ trợ callback khi thay đổi DOM

### Kết luận
Trong quá trình làm dự án thì mình cũng đã kiểm tra và ứng dụng, vì thế nếu bạn nào cần cải thiện SEO trong ứng dụng SPA thì mình nghĩ đây là một giải pháp tốt.
Mình có demo ở link sau [Test SEO](https://test-google-search-reactjs.herokuapp.com/), các bạn có thể vào để kiểm tra kết quả nhé . Cảm ơn các bạn :).