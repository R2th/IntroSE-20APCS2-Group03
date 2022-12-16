E hèm, chắc hẳn khi đọc bài viết này của mình bạn đã có được những kiến thức cơ bản của `ReactJS` rồi nhỉ. Hôm nay mình sẽ giới thiệu cho các bạn một số cách để thay đổi `className` trong `ReactJS` một cách 'cool' nhất mà mình có thể.

![](https://images.viblo.asia/4bcbce1f-12ff-4fdb-92b2-717d9ed86f0d.png)

Chắc hẳn khi làm việc, đôi lúc bạn muốn thay đổi `style` của một `component` nào đó bằng `class` đã được viết sẵn trong `CSS` hay `SCSS` của project. Chẳng hạn như thêm class cho thẻ `<body>` ngăn việc scroll trang khi một modal được mở, đổi màu một `<input/>` khi click vào `button`,... Điều đầu tiên bạn nghĩ đến là gì, dùng tới `DOM` ư. Không tốt đâu, các tip dưới đây sẽ giúp bạn làm chuyện đó.

Chẳng hạn như chúng ta có một `component`, bên trong `component` đó gồm một button và một thẻ `p`. Bây giờ ta thử làm chức năng ẩn hiện thẻ `p` đó bằng cách thay đổi `className` của nó, mình sẽ sử dụng `function component` và `hook` để khởi tạo một component. 
```js
//style
.hidden {
    display: none;
}
//component
import React from "react";

const Component = () => {
  const handleClick = () => {
    //do something
  };

  return (
    <div>
      <p className='hidden'>Xin chào Viblo</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
};
export default Component;
```
Giải thích một chút, thẻ `p` có `class` là `hidden`, class này sẽ ẩn nó đi. Nhiệm vụ của ta là khi nhấn vào `button` bên dưới thì sẽ ẩn hiện thẻ `p` kia. Chúng ta sẽ có 3 cách để thực hiện được yêu cầu trên.
## 1. Template strings và state
Sử dụng `template strings` và `state` là cách mà mình hay làm với trường hợp đơn giản như này. Khi click vào `button` ta sẽ thay đổi `state` của `component`, và khi `state` thay đổi câu điều kiện trong `className` cũng được thực hiện và đạt được những gì mà ta mong muốn
```js
import React, { useState } from "react";

const Component = () => {
  const [hidden, setHidden] = useState(false);
  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <p className={hidden && 'hidden'}>Xin chào Viblo</p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
};
export default Component;
```
## 2.  classnames
`classnames` là một `package npm`, nó giúp chúng ta thay đổi `className` một cách linh động và hỗ trợ rất nhiều trường hợp. Bây giờ mình sẽ áp dụng nó vào `component` bên trên nhé. Trước tiên chúng ta cần cài đặt `classname` vào project của mình thông qua hướng dẫn [này](https://www.npmjs.com/package/classnames). 
```js
import React, { useState } from "react";
import classNames from 'classnames';

const Component = () => {
  const [hidden, setHidden] = useState(false);
  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <p className={classNames({hidden: hidden})}>
        Xin chào Viblo
      </p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
};
export default Component;
```
Khi `state` của `component` là `true` thì thẻ `p` sẽ có class là `hidden`, ngược lại thì sẽ là một class rỗng.
Ngoài ra `classnames` còn hỗ trợ rất nhiều trường hợp khác nữa.
```js
classNames('foo', 'bar'); // => 'foo bar'
classNames('foo', { bar: true }); // => 'foo bar'
classNames({ 'foo-bar': true }); // => 'foo-bar'
classNames({ 'foo-bar': false }); // => ''
classNames({ foo: true }, { bar: true }); // => 'foo bar'
classNames({ foo: true, bar: true }); // => 'foo bar'
 
// lots of arguments of various types
classNames('foo', { bar: true, duck: false }, 'baz', { quux: true }); // => 'foo bar baz quux'
 
// other falsy values are just ignored
classNames(null, false, 'bar', undefined, 0, 1, { baz: null }, '');
```
## 3. clsx
Cũng là một `package` như `classnames` nhưng vì có ít chức năng hơn cho nên có dung lượng nhỏ đáng kể `(223Byte)`, đây sẽ là sự lựa chọn thích hợp cho bạn nếu như bạn chỉ cần một số chức năng cần thiết mà không muốn làm tăng kích thước của dự án. Cú pháp của nó khá giống như `classnames`.
```js
import React, { useState } from "react";
import clsx from 'clsx';

const Component = () => {
  const [hidden, setHidden] = useState(false);
  const handleClick = () => {
    setHidden(!hidden);
  };

  return (
    <div>
      <p className={clsx({hidden: hidden})}>
        Xin chào Viblo
      </p>
      <button onClick={handleClick}>
        Click me
      </button>
    </div>
  );
};
export default Component;
```

Vẫn còn nhiều chức năng khác của `clsx`, nếu như bạn muốn tìm hiểu thêm về nó hãy nhấn vào đường dẫn [này](https://www.npmjs.com/package/clsx). Bài chia sẻ của mình đến đây là kết thúc rồi, hẹn các bạn vào bài viết tiếp theo!