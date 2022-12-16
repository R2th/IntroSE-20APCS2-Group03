Xin chào các bạn, hôm nay mình dạo lòng vòng trên mạng để xem các Web API như thế nào thì tự dưng bắt gặp vài thứ rất mới. Mình đặt ra câu hỏi:  "Mấy cái này có thể dùng khi nào nhỉ". 
Suy nghĩ một lúc lâu, thì mình cũng tìm dược đáp án :v: 

Hôm nay mình thử tạo một cái `animation` lúc `unmount component` như thế nào. Thì như mọi người đã biết, khi thêm một `animation` khi `mount component` thì rất là đơn giản, chỉ cần sử dụng `keyframes` của `css` là xong.

Tuy nhiên, để thêm được `animation` khi `unmount` lại là chuyện khác, với `jQuery` thị mọi việc dễ thở hơn, chỉ cần dùng `fadeIn` & `fadeOut` là xong, nhưng khi làm việc với `ReactJS` các dev thường được khuyên rằng không nên dùng `jQuery` để đụng chạm vào DOM. May mắn thì mình cũng tìm được `API` ưng ý, có thể giúp mình đạt được mong muốn này, đó là `onanimationend`.

Trước tiên, bạn cần một `css keyframe` cho animation này:
```css
-- style.css

@keyframes fadeIn { // Animation khi mount component
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
```

Tạo một component nhỏ nhỏ
```js
-- fade.js

import React, { useState } from "react";

const Fade = () => {
  const [shouldRender, setRender] = useState(true);

  return <div style={{ animation: "fadeIn 1s" }}>{shouldRender && "Mount"}</div>;
};

export default Fade;

-- App.js

import React from "react";
import "./styles.css";
import Fade from './fade';

export default function App() {
  return (
    <div className="App">
      <Fade />
    </div>
  );
}
```

Sau khi thử đoạn code này, mỗi khi reload lại `page` bạn sẽ thấy đoạn text `Mount` một hiệu ứng rất đẹp, tiếp theo mình cần một `button` để `toggle` việc hiển thị `text` nữa, bổ sung một chút cho `App.js`
```js
import React, { useState } from "react";
-----

const [show, setShow] = useState(true);

-----

<button onClick={() => setShow(!show)}>Click</button>

```
Thêm một chút cho `fade.js`
```js
const Fade = ({ show }) => {
const [shouldRender, setRender] = useState(show);

useEffect(() => {
  setRender(show);
}, [show]);

return (
  shouldRender && (
    <div style={{ animation: `${show ? "fadeIn" : "fadeOut"} 1s` }}>
      Mount
    </div>
  )
 )
};
```

```css
@keyframes fadeOut {// Animation khi unmount component
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
```
Bây giờ mỗi khi click vào button `Toggle mount` bạn sẽ thấy animation xảy ra, tuy nhiên animation khi `unmount` lại không có, vô lý, mình đã thêm `keyframe fadeOut` tương tự như `fadeIn` rồi mà :thinking: 

Phân tích một chút nhé, vậy chúng ta cần làm gì
- `show` thay đổi
- báo `react` khoan hãy `unmount`, `delay` nó lại một chút
- Chạy `animate`
- `Animate` vừa chạy xong, `unmount`

> - báo `react` khoan hãy `unmount`, `delay` nó lại một chút
Đây là lúc `onanimationend` phát huy tác dụng, API này sẽ tự động khởi chạy khi một `keyframe animation` kết thúc, sửa lại `fade.js` một chút nữa.
```js
useEffect(() => {
  if (show) setRender(true);
}, [show]);

const handleonAnimationEnd = () => {
  if (!show) setRender(false);
};

return (
  shouldRender && (
    <div
      style={{ animation: `${show ? "fadeIn" : "fadeOut"} 1s` }}
      onAnimationEnd={handleonAnimationEnd}
    >
      Mount
    </div>
  )
);
```

Mọi thứ đã xong, bạn hãy code lại xem như thế nào nhé, mình có một bản demo ở [đây](https://codesandbox.io/s/mount-animation-q0lxz) - có thêm bổ sung việc tái sử dụng component
Nếu như bạn đang muốn làm việc với trình duyệt cũ, thì nên lưu ý nha vì nó vẫn chưa support đầy đủ.
Cảm ơn các bạn đã đọc
![](https://images.viblo.asia/e1af0855-5a93-411c-822b-7f654fcf84e0.png)

.