## Hook Là gì ?
Trong react trước đây, để sử dụng được các state bắt buộc ta phải sử dụng chúng trong 1 class của javascript. Từ phiên bản 16.8 định nghĩa hook được ra đời, nó cho phép sử dụng được staste và lifecycle vào trong 1 function. Hook được hiểu nôm na là 1 function có thể sử dụng state ở bên trong, thay vì trả về JSX như component thì trả về 1 giá trị nào đó.

Ngoài các hook được React cung cấp sẵn như useState, useEffect,… ta cũng có thể tạo 1 custom hook để xử lý những logic của riêng mình với quy tắc đặt tên function bắt đầu bằng từ “use”.

## Tác dụng của Hook

* Làm cho tách biệt việc xử lý logic với render UI trong component
* Cho phép tái xử dụng logic giữa các component

## Demo tạo custom hook để lắng nghe sự kiện hover của 1 element
– Với cách thông thường chúng ta sẽ tạo 1 state để lưu trạng thái hover của element theo dựa vào 2 hàm onMouseEnter và onMouseLeave, logic xử lý này sẽ phải lặp lại với tất cả các element mà chúng ta muốn lắng nghe sự kiện hover.
```
import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
function App() {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div className="App">
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                style={{ color: isHovered ? 'red' : '#000' }}
            >
                Hover me !
            </div>
        </div>
    );
}
export default App;
```

– Ở đây mình tạo 1 hook trả về 1 mảng gồm 2 giá trị, giá trị đầu tiên là 1 ref để lưu tham chiếu node DOM để lắng nghe trạng thái của node DOM này, mình có giải thích về ref ở bài viết [[React JS] Thuộc tính Ref trong react](https://viblo.asia/p/react-js-thuoc-tinh-ref-trong-react-Az45bMAqlxY), giá trị thứ 2 là trạng thái có hay không được hover của element.
```
import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';
function App() {
    const [hoverRef, isHovered] = useHover();
    return (
        <div className="App">
            <div ref={hoverRef} style={{ color: isHovered ? 'red' : '#000' }}>
                Hover me !
            </div>
        </div>
    );
}
/**
 * Hook lắng nghe trạng thái hover của element
 */
function useHover() {
    const [value, setValue] = useState(false);
    const ref = useRef(null);
    const handleMouseOver = () => setValue(true);
    const handleMouseOut = () => setValue(false);
    useEffect(
        () => {
            const node = ref.current;
            if (node) {
                node.addEventListener('mouseover', handleMouseOver);
                node.addEventListener('mouseout', handleMouseOut);
                return () => {
                    node.removeEventListener('mouseover', handleMouseOver);
                    node.removeEventListener('mouseout', handleMouseOut);
                };
            }
        },
        [ref.current] // Xử lý lại lắng nghe event nếu node DOM element thay đổi
    );
    return [ref, value];
}
export default App;
```
Mọi thứ đều ổn và các element khác muốn lắng nghe sự kiện hover sẽ đều có thể dùng hook này ^^.
![](https://images.viblo.asia/abefdfdd-32fa-4420-8679-54e936f2084e.gif)

Trên đây là những chia sẻ cá nhân của mình, mếu thấy hay hãy cho mình 1 , vote, clip hoặc comment suy nghĩ của bạn để bài viết của mình hoàn thiện hơn nhé <3.
![](https://images.viblo.asia/f666ce6f-3159-42f8-90d2-783468d93198.jpg)