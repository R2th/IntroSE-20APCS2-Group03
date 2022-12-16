## 1. Giới thiệu.
Thư viện react use bao gồm 1 bộ sưu tập lớn các hooks, lớn hơn rất nhiều so với các thư viện khác về hooks, bao gồm cả các hooks có thể tương tác với các phần cứng mà trình duyệt có thể truy cập. Ở bài viết này chúng ta sẽ tìm hiểu 1 số hook qua ví dụ và liệt kê ra tất cả các hook mà thư viện đã có cho đến thời điểm hiện tại.

**Link thư viện : https://github.com/streamich/react-use**

Cách cài đặt :
```
npm i react-use
```
## 2. Code minh hoạ cho 1 số hooks

Chúng ta có thể sử dụng useMouse hook để xem vị trí chuột của người dùng :

```
import React from "react";
import { useMouse } from "react-use";

export default function App() {
  const ref = React.useRef(null);
  const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouse(ref);

  return (
    <div ref={ref}>
      <div>
        Mouse position in document - ({docX}, {docY})
      </div>
      <div>
        Mouse position in element - ({elX}, {elY})
      </div>
      <div>
        Element position- ({posX} , {posY})
      </div>
      <div>
        Element dimensions - {elW}x{elH}
      </div>
    </div>
  );
}
```

Tương tự chúng ta có thể sử dụng useScroll hook để kiểm tra vị trí của thanh cuộn :

```
import React from "react";
import { useScroll } from "react-use";

export default function App() {
  const scrollRef = React.useRef(null);
  const { x, y } = useScroll(scrollRef);

  return (
    <div ref={scrollRef} style={{ height: 300, overflowY: "scroll" }}>
      <div style={{ position: "fixed" }}>
        <div>x: {x}</div>
        <div>y: {y}</div>
      </div>
      {Array(100)
        .fill()
        .map((_, i) => (
          <p key={i}>{i}</p>
        ))}
    </div>
  );
}
```

Thư viện cũng có Hooks để cho phép thực hiện các tác dụng phụ khác nhau, như sao chép dữ liệu vào khay nhớ tạm và thao tác lưu trữ cục bộ. Để thêm tính năng copy-to-clipboard, chúng ta có thể sử dụng useCopyToClipboard Hook:

```
import React, { useState } from "react";
import useCopyToClipboard from "react-use/lib/useCopyToClipboard";

export default function App() {
  const [text, setText] = useState("");
  const [state, copyToClipboard] = useCopyToClipboard();

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button type="button" onClick={() => copyToClipboard(text)}>
        copy text
      </button>
      {state.error ? (
        <p>error: {state.error.message}</p>
      ) : (
        state.value && <p>Copied {state.value}</p>
      )}
    </div>
  );
}
```

Tương tự như vậy, chúng ta có thể dễ dàng làm việc với bộ nhớ cục bộ thông qua useLocalStorage Hook:

```
import React from "react";
import useLocalStorage from "react-use/lib/useLocalStorage";

export default function App() {
  const [value, setValue, remove] = useLocalStorage("key", "foo");

  return (
    <div>
      <div>Value: {value}</div>
      <button onClick={() => setValue("bar")}>bar</button>
      <button onClick={() => setValue("baz")}>baz</button>
      <button onClick={() => remove()}>Remove</button>
    </div>
  );
}
```

Ngoài các Hook nói trên, thư viện còn có nhiều Hook để thiết lập trạng thái, sử dụng API của trình duyệt, chạy code không đồng bộ và hơn thế nữa. Cho đến nay, react use có thể coi là thư viện Hooks toàn diện nhất.

## 3. Danh sách các hooks hiện có sẵn.
Dưới đây là danh sách các hooks có sãn phần in đậm là phần bản thân mình thấy khá hay sử dụng tới trong các dự án :

* Sensors
    *    useBattery —  Theo dõi trạng thái pin của thiết bị.
    *    useGeolocation — Theo dõi trạng thái vị trí địa lý của thiết bị người dùng.
    *    useHover and useHoverDirty —  Theo dõi trạng thái di chuột của 1 vài element.
    *    useHash —  Theo dõi giá trị hash của vị trí. 
    *    useIdle —  Theo dõi xem người dùng có đang hoạt động hay không.
    *    useIntersection —  Theo dõi giao điểm của phần từ HTML.
    *    useKey, useKeyPress, useKeyboardJs, and useKeyPressEvent — track keys. 
    *    useLocation and useSearchParam —  Theo dõi trạng thái vị trí của thanh điều hướng trang.
    *    useLongPress — Theo dõi cử chỉ nhấn giữ của 1 số phần từ
    *    **useMedia —  Theo dõi trạng thái của CSS media query.**
    *    useMediaDevices — Theo dõi trạng thái của các thiết bị phần cứng được kết nối.
    *    useMotion — Theo dõi trạng thái của thiết bị cảm biến chuyển động.
    *    useMouse and useMouseHovered —  Theo dõi vị trí chuột.
    *    useMouseWheel — Theo dõi deltaY của con lăn chuột đã cuộn..
    *    useNetworkState — Theo dõi trạng thái kết nối mạng của trình duyệt.
    *    useOrientation — Theo dõi trạng thái hướng màn hình của thiết bị.
    *    usePageLeave — Kích hoạt khi chuột rời khỏi trang.
    *    useScratch — Theo dõi trạng thái nhấp chuột và di chuyển.
    *    **useScroll — Theo dõi vị trí thanh cuộn của phần tử HTML.**
    *    useScrolling — Theo dõi xem phần tử HTML có đang cuộn hay không.
    *    **useStartTyping — Phát hiện khi người dùng bắt đầu nhập.**
    *    useWindowScroll — Theo dõi Vị trí cuộn cửa sổ.
    *    useWindowSize — Theo dõi kích thước cửa sổ.
    *    useMeasure and useSize —Theo dõi kích thước của phần tử HTML.
    *    createBreakpoint — tracks innerWidth
    *    useScrollbarWidth — Phát hiện chiều rộng thanh cuộn gốc của trình duyệt.
*  UI
    *  useAudio — Phát âm thanh và hiển thị các điều khiển của nó. 
    * **useClickAway — Kích hoạt callback khi người dùng nhấp vào bên ngoài target area.**
    * useCss — Điều chỉnh động CSS.
    * useDrop and useDropArea — Theo dõi file, liên kết và sao chép-dán.
    * useFullscreen — Hiển thị một phần tử hoặc video full-screen. 
    * useSlider — Cung cấp hành vi trượt trên bất kỳ HTML element. 
    * useSpeech — Tổng hợp giọng nói từ một chuỗi văn bản. 
    * useVibrate —  Cung cấp phản hồi vật lý bằng cách sử dụng Vibration API. 
    * useVideo — Phát video, theo dõi trạng thái của video và hiển thị các điều khiển phát lại.
*  Animations
    * useRaf — render lại thành phần trên mỗi requestAnimationFrame.
    * **useInterval and useHarmonicIntervalFn — render lại hành phần trên 1 khoảng thời gian đã đặt bằng cách sử dụng setInterval.**
    * useSpring — interpolates number over time according to spring dynamics.
    * **useTimeout — render lại thành phần sau 1 khoảng thời gian chờ.**
    * useTimeoutFn —  Các lệnh gọi hàm đã cho sau 1 khoảng thời gian chờ. 
    * useTween — render lại component, trong khi tweet một số from 0 to 1. 
    * useUpdate —  Trả về 1 callback, cái mà render lại component khi called.
* Side-effects
    * **useAsync, useAsyncFn, and useAsyncRetry — giả quyết 1 hàm không đồng bộ.**
    * **useBeforeUnload — Hiển thị cảnh báo của trình duyệt khi người dùng cố gắng tải lại hoặc đóng trang.**
     * **useCookie — Cung cấp cách đọc, cập nhật và xóa cookie.**
    * **useCopyToClipboard — Sao chép văn bản vào khay nhớ tạm.**
    * **useDebounce — debounces a function.**
    * useError — error dispatcher. 
    * useFavicon — sets favicon của 1 trang.
    * **useLocalStorage —  quản lý 1 giá trị localStorage.**
    * useLockBodyScroll — thanh cuộn của body element.
    * useRafLoop — các lệnh gọi hàm đã cho bên trong vòng lặp RAF.
    * **useSessionStorage —  Quản lý 1 giá trị trong sessionStorage.**
    * **useThrottle and useThrottleFn — throttles a function.**
    * useTitle —  Đặt tiêu đề của 1 trang.
    * usePermission — Trạng thái quyền truy vấn cho browser APIs.
*  Lifecycles
    * **useEffectOnce — 1 useEffect hook chỉ chạy 1 lần duy nhất.**
    * useEvent — Đăng ký các sự kiện.
    * useLifecycles — calls mount và unmount callbacks.
    * useMountedState and useUnmountPromise —  Theo dõi nếu component là mounted.
    * usePromise — resolves promise chỉ khi component là mounted.
    * useLogger — logs in console as component goes through life-cycles.
    * useMount — calls mount callbacks.
    * useUnmount — calls unmount callbacks.
    * useUpdateEffect —  Chỉ chạy effect trên các lần update.
    * useIsomorphicLayoutEffect — useLayoutEffect that does not show warning when server-side rendering.
    * useDeepCompareEffect, useShallowCompareEffect, and useCustomCompareEffect — run an effect depending on deep comparison of its dependencies
* State
    * createMemo — factory của memoized hooks.
    * createReducer — factory of reducer hooks with custom middleware.
    * createReducerContext and createStateContext — factory of hooks cho state chia sẻ giữa các components.
    * useDefault —  Trả về gía trị mặc định khi trạng thái là null or undefined.
    * useGetSet — Trả về state getter get() thay vì raw state.
    * useGetSetState — as if useGetSet and useSetState had a baby.
    * useLatest — returns state or props sau cùng.
    * usePrevious — Trả về state hoặc props trước đó. 
    * usePreviousDistinct — like usePrevious but với predicate để xem có nên cập nhật hay không.
    * useObservable — Theo dõi giá trị mới nhất của Observable.
    * useRafState — Tạo phương thức setState chỉ cập nhật sau requestAnimationFrame. 
    * useSetState —  Tạo phương thức setState làm việc giống như this.setState. 
    * useStateList — circularly iterates over an array. 
    * useToggle and useBoolean —  Theo dõi state của 1 boolean. 
    * useCounter and useNumber — Theo dõi state của 1 number. 
    * useList and useUpsert — Theo dõi state của 1 array. 
    * useMap —  Theo dõi state của 1 object. 
    * useSet —  Theo dõi state của 1 tập hợp. 
    * useQueue — Thực hiện hàng đợi đơn giản.
    * useStateValidator — Theo dõi trạng thái của một đối tượng.. 
    * useStateWithHistory — Lưu trữ các giá trị trạng thái trước đó và cung cấp các handles để di chuyển qua chúng. 
    * useMultiStateValidator — giống useStateValidator, nhưng theo dõi nhiều trạng thái cùng một lúc. 
    * useMediatedState — giống như useState thông thường nhưng có dàn xếp theo chức năng tùy chỉnh. 
    * useFirstMountState —  Check xem có phải lần render đầu tiên không. 
    * useRendersCount —  Đếm số lần render. 
    * createGlobalState — cross component shared state.
    * useMethods — thay thế gọn gàng cho useReducer. 
* Miscellaneous
    * useEnsuredForwardedRef and ensuredForwardRef — use a React.forwardedRef safely.
 
 Nguồn : https://blog.logrocket.com/5-top-react-hooks-libraries-compared/