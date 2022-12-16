Có lẽ tất cả chúng ta đã quá quen thuộc với hooks trong ReactJS rồi, thậm chí có người đã sử dụng từ ngay những ngày đầu. Hooks được ra mắt trong bản 16.8 của framework reactJS. Hooks đã mang lại cho chúng ta nhưng trải nghiệm mới bằng cách đưa những chức năng dùng trong class based component.

Ngoài những hook mà đã được cung cấp trong framework như  `useState`, `useEffect`, `useContext`, ... thì chúng ta cũng nó thể tạo ra những custom hook tuỳ thuộc vào dạng chức năng chúng ta muốn. Thì trong bài post này thì mình xin được giới thiệu với mọi người về 1 website rất thú vị (có thể sẽ có nhiểu người biết rồi :v) về một số công thức về hook trong ReactJS (mình xin phép dùng từ recipe thay từ "công thức" trong xuyên suốt bài đọc) và đồng thời cũng giới thiệu một số custom hook thú vị!

# 1. Giới thiệu về [useHooks](https://usehooks.com/)
 Đây là một website cung cấp các recipe liên quan đến hooks trong ReactJS. Như cái tên của website `useHooks` giới thiệu rất nhiều các recipe về hook dùng để xử lý những khó khăn, tăng những thuận lợi khi chúng ta phát triển website với ReactJS.
 
 Trong một lần search trên google về hook thì mình đã tình cờ thấy được website này (một domain rất hay `useHooks.com`) và đã rất tò mò vào xem thử thì phát hiện website này rất thú vị và hữu ích cho chúng ta. Thì đã có những bạn đã biết đến website này, thậm chí dùng một số recipe trong này nhưng mình xin phép được giới thiệu một lần nữa.
 
Bắt đầu thôi!
 
 # 2. Giới thiệu một số recipe thú vị
 
 Trong quá trình mình đọc về website này thì mình có đưa ra một số hook rất thú vị và hữu ích cho chúng ta trong quá trình làm việc cùng với ReactJS hooks như dưới:
 
 - `useRouter` 
 - `useEventListener`
 - `useLockBodyScroll`

Giờ thì chúng ta cùng xem xét từng recipe một nào!

## 2.1 `useRouter`

Nếu bạn có sử dụng thư viện [react-router](https://reacttraining.com/react-router/) thì ở phiên bản v5.1 thì react-router đã cho ra mắt một số hooks API (`useParams`, `useLocation`, `useHistory`, `useRouteMatch`) nhằm cung cấp cho chúng ta một cách tiếp cận mới trong cách quản lý các router state. Nhưng trong recipe này nó sẽ cung cấp cho chúng ta một cách dùng mới nhắm giải thiểu những re-render không cần thiết. Vậy hãy cùng xem recipe này nào!

```javascript
import { useParams, useLocation, useHistory, useRouteMatch } from 'react-router-dom';
// Dùng để parse những tham số search trên URL và combine chúng thành 1 object
import queryString from 'query-string';

function MyComponent(){
  // Lấy object router
  const router = useRouter();

  // Lấy giá trị từ tham số search của URL (?postId=123) hoặc router param (/:postId)
  console.log(router.query.postId);

  // Lấy giá tri pathname hiện tại
  console.log(router.pathname)

  // Dẫn đến 1 trang khác bằng cách dùng router.push() thay vì history.push()
  return (
    <button onClick={(e) => router.push('/about')}>About</button>
  );
}

// Hook
export function useRouter() {
  const params = useParams();
  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  // Trả về giá trị router object sau khi chúng ta chỉnh sửa
  // Sử dụng tính năng Memoize để nhớ object router mà chúng ta chỉnh sửa
  // và chỉ thay đổi khi 1 trong 4 tham số trên bị thay đổi
  return useMemo(() => {
    return {
      // Lấy function push(), replace của history lên để sử dụng
      // mang lại sự thuận tiện thay vì dùng history.push() và history.replace()
      push: history.push,
      replace: history.replace,
      pathname: location.pathname,
      // Combine tham số search của URL và tham số truyền vào của react-router
      // thành một object dùng chung
      // ví dụ: /:id?sort=asc | /10?sort=asc -> { id: "10", sort: "asc" }
      query: {
        ...queryString.parse(location.search), // Convert string to object
        ...params
      },
      // Kèm theo các đối tượng match, localtion, history trong trường hợp chúng ta cần
      match,
      location,
      history
    };
  }, [params, match, location, history]);
}
```

Một recipe rất thú vị đúng không mọi người! Nó sẽ giúp chúng ta sử quản lý state của router thuận tiện hơn trong 1 object duy nhất, không lo về những re-render không cần thiết và không cần phải `...restProps` và `restProps.history.push(/abc)` nữa!

## 2.2 `useEventListener`

Trong một số trường hợp chúng ta sẽ phải sử dụng việc thêm một số event listeners bằng cách sử dụng `useEffect`. Vậy sao chúng ta không suy nghĩ trong việc sử dụng lại logic đó trong một custom hook. Trong công thức này chúng ta sẽ tạo một hook nhằm handle việc `addEventListener` đó.

```javascript
import { useState, useRef, useEffect, useCallback } from 'react';

function App(){
  // State for storing mouse coordinates
  // Khởi tạo state dùng cho việc lưu trữ toạ độ của mouse
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  
  // Function dùng để handle event
  // và dùng `useCallback` để chắc chắn rằng tham chiếu vùng nhớ sẽ không đổi
  const handler = useCallback(
    ({ clientX, clientY }) => {
      // Cập nhật lại toạ độ
      setCoords({ x: clientX, y: clientY });
    },
    [setCoords]
  );
  
  // Thêm event listener
  useEventListener('mousemove', handler);
  
  return (
    <h1>
      The mouse position is ({coords.x}, {coords.y})
    </h1>
  );
}

function useEventListener(eventName, handler, element = window){
  // Tạo một ref để lưu trữ handle
  const savedHandler = useRef();
  

  // Cập nhật giá trị ref.current nếu handler thay đổi
  // để chắc rằng handler luôn mới nhất
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Kiểm tra xem `element.addEventListener` có hợp lệ hay không
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      
      // Khởi tạo even listener và gọi handle function đã được chúng ta
      // lưu trữ ở ref
      const eventListener = event => savedHandler.current(event);
      
      // Thêm event listener
      element.addEventListener(eventName, eventListener);
      
      // Xoá event listener (cleanup)
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element]
  );
};
```

Một recipe rất hữu dụng! Nó bao hàm rất nhiều kiến thức bao gồm cả `tips and tricks` trong ReactJS hooks. Hy vọng nó sẽ mang lại nhiều lợi ích cho mọi người.

## 2.3 `useLockBodyScroll`

`Lock body scroll` một vấn đề chúng ta gặp phải rất nhiều trong quá trình phát triển một website. Trong một số trường hợp chúng ta muốn chặn user khỏi việc scroll (vd như modal chẳng hạn, ...). Đây không phải là một vấn đề đơn giản nếu chúng ta phải xử lý trên nhiều môi trường khác nhau. Thì recipe hook bên dưới sẽ giúp chúng ta giải quyết phần nào vấn đề này! Hãy cùng xem xét nào (trong ví dụ này chúng ta sẽ làm về trường hợp modal)!

```javascript
import { useState, useLayoutEffect } from 'react';

function App(){
  // State dùng để open, close modal
  const [modalOpen, setModalOpen] = useState(false);
  
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Show Modal</button>
      <Content />
      {modalOpen && (
        <Modal
          title="Try scrolling"
          content="I bet you you can't! Muahahaha 😈"
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}

function Modal({ title, content, onClose }){
  // Sử dụng hook để lock body scroll khi chúng ta mở modal (mount modal)
  useLockBodyScroll();

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal">
        <h2>{title}</h2>
        <p>{content}</p>
      </div>
    </div>
  );
}

// Hook
function useLockBodyScroll() {
  useLayoutEffect(() => {
   // Lấy giá trị overflow khởi đầu của body
   const originalStyle = window.getComputedStyle(document.body).overflow;  
   // Ngăn không cho scroll khi mount
   document.body.style.overflow = 'hidden';
   // Cho phép scroll khi component unmounts
   return () => document.body.style.overflow = originalStyle;
   }, []);
}
```

Recipe này cung cấp cho chúng ta phương pháp dùng để bật tắt scroll trong một số trường hợp (trong ví dụ ở trên là modal). Rất hữu dụng đúng không! Nhưng nó vẫn là công thức, còn khi chúng ta áp dụng thì sẽ còn nhiều trường hợp rẽ nhánh nữa!

# 3. Kết luận
Vậy là mình đã giới thiệu xong với các bạn về `useHooks` rồi! Một website rất thú vị đúng không? Những recipe rất hợp lý phải không nào? Nhưng những recipe trên vẫn chỉ là recipe thôi chúng ta cần phải kiểm nghiệm nó xem có run với code trong project của mình nữa. Thì mong là sau bài viết này thì chúng ta sẽ biết thêm một website có thể tham khảo về hook trong ReactJS và cũng như là giúp chúng ta có thể từ đó tạo ra nhiều custom hook thú vị nữa.

Thì website mọi người có thể truy cập ở [đây](https://usehooks.com/), có rất nhiều hook mà mọi người có thể tham khảo, kèm theo đó là ví dụ trên [CodeSandbox](https://codesandbox.io/) nữa. Mong là mọi người sẽ có những giây phút thú vị khi làm việc với hooks và ReactJS.

Thì bài post của mình đến đây là hết rồi! Mong rằng bài post này sẽ giúp mạng lại nhiều lợi ích cho mọi người! Xin cảm ơn và hẹn gặp lại trong các bài post tiếp theo! Xin chào!