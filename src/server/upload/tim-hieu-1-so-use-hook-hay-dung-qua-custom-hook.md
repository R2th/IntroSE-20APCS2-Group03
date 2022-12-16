## I> Lời mở đầu:
Trong các library frontend đang phát triển hiện nay thì reactjs đang ngày càng giữ vị thế và càng ngày càng được nhiều người dùng. Có nhiều lý do mà nó được nhiều người tin tưởng và sử dụng, trong đó 1 lý do chính là sự phát triển của `hook`  với reactjs. Chúng ta không chỉ sử dụng các hook có sẵn mà có thể tự custom được, nhờ đó mà ta có thể sử dụng linh hoạt nó với reactjs.

Hôm nay mình sẽ giới thiệu 1 số custom hook mà mọi người hay dùng.

## II> Một số hook hay dùng:
### 1> useWindowSize:
Trong trường hợp ta muốn lấy giá trị chiều rộng và chiều cao của trình duyệt đang sử dụng, ta có thể viết 1 custom hook để có thể tái sử dụng. (Với trường hợp nó được thực thi dưới dạng server-side sẽ ko có `window object` thì nó sẽ trả về `undefined`).

```js
function useWindowSize() {

// biến kiểm tra nó có phải client hay không
  const isClient = typeof window === 'object';

// lấy chiều rộng và chiều cao của cửa sổ của trình duyệt đang có
  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

// state quản lý kích thước của trình duyệt
  const [windowSize, setWindowSize] = useState(getSize);

// effect set kích thước của cửa sổ của trình duyệt
  useEffect(() => {
    if (!isClient) {
      return false;
    }
    
    // set state kích thước của trình duyệt
    function handleResize() {
      setWindowSize(getSize());
    }

// lắng nghe sự thay đổi kích thước của trình duyệt và set lại
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []); // chỉ chạy khi mount và unmount

  return windowSize;
}
```

Sử dụng:

```js
function App() {
  const size = useWindowSize();

  return (
    <div>
      {size.width}px / {size.height}px
    </div>
  );
}
```


Kết quả:
![](https://images.viblo.asia/d6788704-ae72-4577-ad93-ed1357abb490.png)

### 2> usePrevious:
Bạn có thể đã đọc hook này ở phần giới thiệu của trang chủ [React Hook FAQ](https://reactjs.org/docs/hooks-faq.html#how-to-get-the-previous-props-or-state) , vấn đề của chisunshg ta là làm cách này để lấy giá trị trước đó của `state` và `props` trong reactjs.  Nếu ta viết component bằng class thì ta có thể dụng `componentDidUpdate` ta có thể nhận giá trị `props` và `state` của component trước đó qua tham số của lifecycle này.  Vậy nếu react hook thì ta làm nhưng thế nào, ta có thể giải quyết vấn đề này với  custom hook bằng useRef để lưu giá trị trước đó

```js
function usePrevious(value) {
// Với ref, ta có thể lưu trữ bất kỳ giá trị nào, tương tự với  việc thể hiện 1 instance của 1 lớp
  const ref = useRef();
  
  // lưu giữ giá trị hiện tại vào trong ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Chỉ re-render khi giá trị thay đổi
  
  // trả về giá trị trước đó
  return ref.current;
}
```

Sử dụng: ví dụ ta có 1 button, bấm vào button đó thì sẽ tăng giá trị của biến đếm (ở đây là biến đếm số lần click) . Và ta muốn show ra giá trị số lần click lúc này và trước đó là bao nhiêu
```js
function App() {

// state lưu tri biến đếm số lần bấm button
  const [count, setCount] = useState(0);
  
  // Lấy giá trị của state trước đso (được lấy từ hook qua lần render cuối cùng)
  const prevCount = usePrevious(count);
  
  return (
    <div>
      <h1>Now: {count}, before: {prevCount}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
   );
}
```

![](https://images.viblo.asia/8c3fa143-9f57-4382-9c2c-90f3277b4e31.png)


### 3> useCookie:
Ví dụ bạn hay dùng thư viện js-cookie để xử lý cookie, ta có thể viết 1 custom hook để dễ dàng tái sử dụng cho lần sau
```js
Tham khảo tại: https://github.com/rrudol/useCookie/blob/master/src/index.js

import { useState } from "react";
import * as Cookies from "js-cookie";

/**
 * useCookie - React Hook for Cookies based on js-cookie
 * @param {string} key Cookie name
 * @param {Object|string} [initialValue]  Value will be assign if cookie doesn't exist.
 * @returns {Array} Returns cookie value, and the function to update it.
 */
export function useCookie(key, initialValue) {
  const [item, setInnerValue] = useState(() => {
    return Cookies.get(key) || initialValue;
  });

  /**
   * Set value of cookie
   * @param {Object|string} value 
   * @param {Cookies.CookieAttributes} [options]
   */
  const setValue = (value, options) => {
    setInnerValue(value);
    Cookies.set(key, value, options);
  };

  return [item, setValue];
}

export default useCookie;
```

Sử dụng
```
function App() {
  const [name, setName] = useCookie("name", "Stefan");

  return (
    <div>
      <input
        type="text"
        placeholder="Provide your name"
        value={name}
        onChange={e => setName(e.target.value, { expires: 1 })}
      />
    </div>
  );
}
```

## Kết luân:
Ta thấy rằng việc sử dụng react custom hook rất đơn giản và rất dễ dàng cho việc tái sử dụng cho lần sau. Mình đang tìm hiểu và tham khảo  thêm thư viện cách viết như thư viện này https://github.com/streamich/react-use, nó tập hợp các reactjs hay dùng

Tham khảo:
https://usehooks.com/

https://github.com/rrudol/useCookie