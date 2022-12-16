Trong **React Funtional components** khi cần làm việc với DOM element có thể bạn nghĩ ngay đến `useRef`, trong bài viết này mình chia sẽ bạn một cách khác "lạ à nha" với `useCallback`  :scream:

# Giới thiệu sơ về useCallback
Chúng ta nghe nói rất nhiều rằng bạn nên sử dụng `useCallback` để cải thiện hiệu suất trong quá trình render của React functional components.

Trong bài viết này chúng ta sẽ tìm hiểu thêm một chức năng khác khi thao tác với **DOM element**, tài liệu chỉ được đề cập nhẹ trong phần FAQ. [How can I measure a DOM node?
](https://reactjs.org/docs/hooks-faq.html#how-can-i-measure-a-dom-node).  
React sẽ gọi callback ref khi mà DOM element được `mount` vì vậy cách này hữu ích khi cần lấy kích thước (dimensions) của DOM. Và nó cũng sẽ thay thế được `useRef` và `useEffect` như cách thông thường.
Thật ra nó chính là "[callback refs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs)" khi mà chúng ta sử dụng trong Class Components.
# Lấy ví dụ
> Sử dụng thư viện `Chart.js` để vẽ một Line Chart với data mẫu trong React Component.

## Với useRef()
Đây là đoạn mã khi chúng ta áp dụng thông thường:
```jsx
import { Chart } from "chart.js";

function App() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const myChart = new Chart(ref.current!, {
      type: "line",
      data: chartData
    });
    
    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div className="App">
      <h1>Implement Chart.js with useRef()</h1>
      <canvas ref={ref} style={{ height: 400 }} />
    </div>
  );
}
```
Xem [demo](https://codesandbox.io/s/use-ref-with-chartjs-ocz99?file=/src/App.tsx:231-285), nó rất không có gì là bất bình thường cả. Chỉ là với `useCallback` sẽ gọn hơn khi vừa phải `useRef` và `useEffect` xem tiếp dưới.
## Với useCallback()
Đây là đoạn mã mà quê chung tôi hay dùng:
```jsx
function App() {
  const ref = useCallback(async (node) => {
    const { Chart } = await import("chart.js");

    if (node instanceof HTMLCanvasElement) {
      new Chart(node, {
        type: "line",
        data: chartData
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>Implement Chart.js with useCallback()</h1>
      <canvas ref={ref} style={{ height: 400 }} />
    </div>
  );
}
```

Xem [demo](https://codesandbox.io/s/use-callback-with-chartjs-pu5hh?file=/src/App.tsx:143-184), chú ý đoạn mã không bao gồm quá trình dọn dẹp chart :no_mouth:  
Với ví dụ trên chúng ta không thực sự thấy `useCallback` có giá trị gì nhiều. Hãy thử đổi bài toán khác để tăng độ khó của game.
> Sử dụng `Intersection Observer` khi scroll tới DOM element thì hãy bắt đầu vẽ chart?

```jsx
import { useInView } from "react-intersection-observer";

function App() {
  const { ref: inViewRef, inView: showChart } = useInView({
    triggerOnce: true
  });

  const ref = useCallback(async (node) => {
    const { Chart } = await import("chart.js");

    if (node instanceof HTMLCanvasElement) {
      new Chart(node, {
        type: "line",
        data: chartData
      });
    }
  }, []);

  return (
    <div className="App">
      <h1>Lazy load Chart.js with useCallback() when they come into the viewport</h1>
      <div>
        Lorem, ipsum dolor sit amet consectetur....
      </div>
      <section ref={inViewRef} style={{ height: 400 }}>
        {showChart && <canvas ref={ref} />}
      </section>
      <div>
        Lorem ipsum dolor sit am....
      </div>
    </div>
  );
}
```

Xem [demo](https://codesandbox.io/s/use-callback-intersection-observer-with-chartjs-74hll?file=/src/App.tsx:17814-17930), chú ý chúng ta vẫn có nhiều cách để làm được điều trên trong đó chỉ cần tách ra một component **< MyChart />** là giải pháp tối ưu nhất xem [demo](https://codesandbox.io/s/use-ref-intersection-observer-with-chartjs-lsxj1?file=/src/App.tsx:17442-17549).

# Vậy vì sao chọn useCallback?
Vậy lý do gì để lựa chọn `useCallback` như là một sự thay thế:
- Hữu ích nhất khi cần tính toán kích thước (dimensions) của DOM, ví dụ như: witdth, height, offsetTop, ...vv bởi vì `ref value` sẽ không lắng nghe khi có thay đổi giá trị.
- Dễ hơn khi sử dụng  **Dynamic import()** tối ưu hóa `Code-Splitting` giảm bundle tải gói, để ý dòng `await import("chart.js")`
- Hợp lý khi DOM element có điều kiện render. Ví dụ:
    ```jsx
    {showChart &&  <canvas ref={ref} /> }
    ```
- Tôi thích thế vì nó ngầu :cowboy_hat_face:

# Kết luận
Sau tất cả `useCallback` chỉ là một cách tiếp cận khác thi thao tác với **DOM element** và là **"callback refs"** trong Class Components vì vậy nó cũng không có gì xa lạ. Biết đâu qua bài này bạn nhận ra trước giờ mình cũng méo dùng **"callback refs"** :nerd_face: