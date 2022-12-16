## Giới thiệu
Chắc chắn là chúng ta không lạ gì thuộc tính `vh` trong css. Và ai làm responsive rồi sẽ biết trên tablet, mobile thuộc tính này sẽ không chạy được.
Có 1 cách đơn giản thay thế là dùng `%` kiểu `div { height: 30%; }`, tuy nhiên cách này rất tốn công vì phải set % từ ngoài vào trong, mà cũng chưa chắc đã được =))
Mình sẽ giới thiệu cách khác = js đảm bảo chạy tốt mà sài giống như cách sài `vh`

## Let's do it
Mình show code luôn vì nó cũng đơn giản

```
useLayoutEffect(() => {
    const setProperty = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setProperty();

    window.addEventListener('resize', setProperty);

    return () => window.removeEventListener('resize', setProperty);
  }, []);
```

Lý thuyết là trong `useLayoutEffect` - khi UI đã load xong chúng ta sẽ chạy hàm `setProperty` như trên
Tính `vh = window.innerHeight / 100`, ta sẽ đc 1vh = số px tương ứng với 1% window height, sau đó `setProperty('--vh', `${vh}px`)`

Ai chưa biết thì đây là css variable https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties
Hiểu đơn giản là nó sẽ set 1 biến --vh vào root của html, bạn có thể dùng lại và truyền vào css

Thành quả:
![](https://images.viblo.asia/e014fbf6-7e19-4796-b092-9daebe7d9580.png)

Sử dụng:
```
body {
    .header { height: 100px; }

    .main {
      max-height: calc(var(--vh, 1vh) * 100 - 100px);
    }
  }
```

Ok chỉ vậy thôi, rất đơn giản mà hiệu quả, giờ ta có thể sử dụng không khác gì dùng vh trên desktop rồi :wave: