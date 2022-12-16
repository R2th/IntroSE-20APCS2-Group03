Vào ngày 10 tháng 8, React đã xuất bản ver release đầu tiên của họ cho React v17. Mặc dù đã gần ba năm kể từ khi phát hành React chính, nhưng đáng ngạc nhiên là không có tính năng mới nào được bổ sung cho phiên bản mới. Theo React team, điều này giúp cho các nhà phát triển cập nhật phiên bản mới của React dễ dàng hơn. Nhưng cũng theo React team, họ đang phát triển thêm một số update mới cho các phiên bản sau của React v17
Như chúng ta đã biết, viêc update v15 -> v16 hay v16 -> v17 không xảy ra quá nhiều xung đột trong source code. Nhưng nếu codebase của bạn được phát triển cách đây vài năm, điều này có thể gây ra một số vấn đề. Một thông tin tốt từ React team là họ sẽ đảm bảo cho chúng ta update lên các phiên bản mới dễ dàng hơn, ngay cả với những phiên bản React cũ hơn.
Mặc dù không có tính năng mới nhưng vẫn có một số thay đổi trong React v17. Chúng ta sẽ thảo luận về một số thay đổi lớn trong bài viết này.

## Installation
Như thường lệ, việc cài đặt React rất đơn giản. Bạn có thể sử dụng npm hoặc yarn để cài đặt. 

Using npm

```
npm install react@17.0.0-rc.0 react-dom@17.0.0-rc.0
```

Using yarn

```
yarn add react@17.0.0-rc.0 react-dom@17.0.0-rc.0
```

Ngoài ra, bạn có thể sử dụng React thông qua CDN. Những gì bạn phải làm là thêm đoạn mã dưới đây vào file index.html của bạn

```
<script crossorigin src="https://unpkg.com/react@17.0.0-rc.0/umd/react.production.min.js"></script>
<script crossorigin src="https://unpkg.com/react-dom@17.0.0-rc.0/umd/react-dom.production.min.js"></script>
```

## Những thay đổi là gì?

### React sẽ không còn hỗ trợ event handlers ở document level

Điều này có nghĩa là React gắn các trình xử lý sự kiện vào vùng chứa DOM gốc trong React tree. Với sự thay đổi này, giờ đây việc sử dụng các công nghệ khác với React trở nên dễ dàng và an toàn hơn. Ngoài ra, việc quản lý các component khác nhau cũng sẽ dễ dàng hơn.

![](https://images.viblo.asia/1b7f1175-7b26-4050-8b9f-7346dc90da4b.png)

### Những thay đổi trong event system
* Họ đã khắc phục issue với sự kiện `onScroll`. Issue này là là `OnScroll` callback trên phần tử cha được kích hoạt khi phần tử con được cuộn.
* `onFocus` và `onBlur` event đã chuyển sang sử dụng `focusin` và `focusout` event
* `onClickCapture` có thể được sử dụng để lắng nghe các giai đoạn của browser.

### Không còn Event Pooling

```
function handleChange(e) {
  setData(data => ({
    ...data,
    //Here app crashes in React 16 and earlier:
    text: e.target.value
  }));
}
```

Sự thay đổi này là do nó không có khả năng tăng hiệu suất trong các trình duyệt mới. Vì vậy, bạn có thể đọc các trường sự kiện bất cứ khi nào bạn cần.

### Effect Cleanup Timing
Bằng cách tiếp cận này, nó sẽ xóa tất cả các effect trước khi chạy bất kỳ effect nào tiếp theo.

```
useEffect(() => {
  // effect
  return () => {    
        // Cleanup.  
    };
});
```

Tương tự như vậy, trong `componentWillUnmount()`, các effect cleanup function sẽ chạy bất đồng bộ. 
Điều đó có nghĩa là, khi component  unmount, quá trình cleanup sẽ chạy sau khi screen được cập nhật.

### Các Error sẽ được nhất quán return về 'undefined'

Trong phiên bản trước của React, khi ta trả về undefined, nó luôn là một lỗi. Nhưng điều đó chỉ dành cho các component và classes. Trong React v17, cũng sẽ có checking các thành phần `forwardRef` và `memo`, điều bị bỏ qua ở các phiên bản trước.

### Removing Private Exports
Ở phiên bản React 17 này, private exports đã bị xoá
Với phiên bản mới, các phiên bản cũ hơn của [React native for web](https://github.com/necolas/react-native-web) sẽ không tương thích. Trên thực tế, "React native for web" là dự án duy nhất sử dụng private exports. Với sự thay đổi này, họ sẽ chuyển sang sử dụng những phương pháp tiếp cận khác, không còn phụ thuộc private exports.

## Lời kết
Ngoài những thay đổi lớn này, React team đã cải thiện việc sử dụng bộ nhớ của các ứng dụng React và sửa nhiều lỗi mà chúng ta đã tìm thấy trong v16 trở xuống. Xin lưu ý rằng phiên bản này vẫn còn mới và nó có thể chứa nhiều lỗi hơn so với các bản phát hành ổn định trước đó. Vì vậy, tốt hơn hết bạn không nên tiến hành update source code các dự án hiện tại của mình sang phiên bản này cho đến khi phiên bản ổn định  được phát hành.
Để biết thêm các thông tin khác, bạn có thể tìm hiểu tại document chính thức của React 17

Tham khảo:
https://medium.com/better-programming/the-6-major-changes-in-react-v17-0-d14fed5b0529
https://reactjs.org/blog/2020/08/10/react-v17-rc.html