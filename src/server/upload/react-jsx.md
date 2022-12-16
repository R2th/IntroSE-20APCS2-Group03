# JSX là gì?
* JSX là viết tắt của JavaScript XML, nó cho phép chúng ta viết HTML trong React.
* JSX giúp viết và thêm HTML trong React dễ dàng hơn
* JSX cho phép chúng ta viết các phần tử HTML bằng JavaScript và đặt chúng trong DOM mà không cần bất kỳ phương thức createElement () và / hoặc appendChild () nào.
* JSX là một phần mở rộng của ngôn ngữ JavaScript dựa trên ES6 và được dịch sang JavaScript thông thường trong thời gian chạy
* Bạn không bắt buộc phải sử dụng JSX

# Ví dụ về sử dụng và không sử dụng JSX:
 ```Javascript
 // Có JSX
// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';

const myelement = <p>Đẹp trai là một tội ác thì toàn bộ zai bách khoa phải đi tù!</p>;

ReactDOM.render(myelement, document.getElementById('root'));
```
 ```Javascript
 // Không có JSX
// index.js

import React from 'react';
import ReactDOM from 'react-dom/client';

const myelement = React.createElement('p',{},'Đẹp trai là một tội ác thì toàn bộ zai bách khoa phải đi tù!');

ReactDOM.render(myelement, document.getElementById('root'));
```
* Hãy so sánh 2 đoạn code, dễ thấy code sử dụng JSX **đơn giản**, dễ hiểu hơn.

# Một số quy ước trong JSX

* Đặt tên trong JSX
    * tên thẻ luôn viết thường
    * tên các React component phải viết hoa chữ cái đầu
    * sử dụng className và htmlFor **thay thế cho** class và for
    * Các thuộc tính trong thẻ phải được viết dưới dạng **camelCase** (vd: onClick, className,...)

* Với JSX, bạn có thể viết các **biểu thức bên trong dấu ngoặc nhọn {}** 
```Javascript
const apple = 30;

const myelement = <h1>Có {apple} quả táo</h1>
const myelement = <h1>Có {30 + 10} quả táo</h1>
```
* Để **viết HTML trên nhiều dòng**, hãy đặt HTML bên trong dấu ngoặc đơn và đồng thời luôn có một thẻ mẹ bao quanh tất cả.
 ```Javascript
const myelement = (
    <div>
        <p>Đoạn văn thứ nhất</p>
        <p>Đoạn văn thứ hai</p>
    </div>
)
```
* Nhưng nếu bạn chỉ muốn có 2 thẻ **p** mà không cần thẻ **div** bao quanh thì có thể làm như sau.
```Javascript
const myelement = (
    <>
        <p>Đoạn văn thứ nhất</p>
        <p>Đoạn văn thứ hai</p>
    </>
)
```
* Hoặc
 ```Javascript
const myelement = (
    <fragment>
        <p>Đoạn văn thứ nhất</p>
        <p>Đoạn văn thứ hai</p>
    </fragment>
)
```
* Thêm **class** cho các thẻ trong JSX.
```Javascript
const myelement = <p className="par1">Đoạn văn thứ nhất</p>
```

* Thêm **thuộc tính** cho các thẻ trong JSX như trong html.
```Javascript
const myelement =  <input type="text" value="" size="10" />
```

* Thêm **event** cho các thẻ trong JSX như trong html.
```Javascript
const myelement =  <button onClick={functionHandle}>Click here!</button>
```



*Trên đây là những gì mình hiểu về JSX, nếu bạn có ý kiến, thắc mắc hay bổ sung gì hãy comment cho mình biết nhé!*

**Cảm ơn vì đã đọc đến đây!!!**