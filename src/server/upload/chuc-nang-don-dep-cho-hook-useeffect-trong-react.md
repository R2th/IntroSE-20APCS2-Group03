# Chức năng dọn dẹp cho hook useEffect trong React 
Hook là một tính năng mới từ React 16.8. Nó cho phép sử dụng state và các tính năng khác của React mà không cần viết dạng class. 
Effect Hook cho phép thực hiện side effect bên trong các function component:
Bạn có thể tự hỏi làm sao loại bỏ việc thực hiện các thay đổi chạy trong side effects khi mà chúng ta không cần đến? Tôi sẽ gọi nó là **cleanup function** sẽ sử dụng lại trong bài viết này.
## Hãy đặt một số ví dụ.
* Thay đổi tiêu đề trang web dựa trên các giá trị được rendered
* Lấy và gán các giá trị từ local storage
* Chạy và phân tích events
* Hiển thị một số lời chào dựa trên thời gian trong ngày, Ví dụ như Chào buổi sáng, buổi trưa, buổi chiều vào các khung giờ 6h - 12h - 18h trong ngày
* Focus on a form field after load
## Cách sử dụng useEffect cơ bản
Hầu hết trong các trường hợp chúng ta sử dụng theo cách này:
```js
useEffect(() => {
  document.title = `Trang đã được tải`;
});
```

Như chúng ta đã tìm hiểu trước đó, chúng ta sẽ thấy tiêu đề trang web được cập nhật lại khi title thay đổi trong cặp `[deps]` để theo dõi sự thay đổi giá trị của biến title
```js
useEffect(() => {
  document.title = `Trang web ${title} đã được tải`;
}, [title]);
```
Đoạn mã trên sẽ chỉ kích hoạt khi biến `title` thay đổi.
Chúng ta cũng có thể chọn chỉ chạy 1 lần sau khi tải trang, bằng cách chuyển `[deps]` thành một mảng trống như sau:
```js
useEffect(() => {
  // Chỉ chạy 1 lần khi tải trang
  document.title = `Trang web ${title} đã được tải`;
}, []);
```

## Cleaning up useEffect
Sử dụng chức năng hook đi kèm với 1 cleanup function, mà bạn có thể không phải lúc nào cũng cần, nhưng nó có thể rất hữu ích.
Để gọi hàm cleanup, bạn có thể chỉ cần thêm một hàm trả về như sau:
```js
useEffect(() => {
  // Your effect

  return () => {
    // Cleanup
  };
}, []);
```
Việc dọn dẹp có thể ngăn chặn rò rỉ bộ nhớ (hay còn gọi là memory leaks mà chúng ta thường gặp) và loại bỏ những thứ không mong muốn. 
Một số trường hợp sử dụng cho điều này là:
* Clean up subscriptions
* Clean up modals
* Remove event listeners
* Clear timeouts
Hãy tạo một ví dụ nhỏ trong đó chúng ta có một hàm hiện thỉ 1 thông báo sau một khoảng thời gian cụ thể.
```js
const [show, setShow] = useState(false);
useEffect(() => {
  let timer = setTimeout(() => setShow(true), 3000); 
}, []);
```
Tuy nhiên, điều này sẽ tạo ra một khoảng thời gian chờ trong bộ nhớ, vì vậy tốt nhất là bạn nên xóa nó.
Đối với điều này, hãy thêm vào 1 cleanup function
```js
useEffect(() => {
  let timer = setTimeout(() => setShow(true), 3000);
  return () => {
    clearTimeout(timer);
  };
}, []);
```
Một ví dụ khác cũng thường hay gặp, khi thực hiện call tới 1 websocket:
```js
useEffect(() => {
  let ws = new WebSocket('wss://ws.your-websocket/');

  ws.onmessage = (msg) => {
    // Do something with the message
  };

  return () => {
    ws.close(); // clean up
  };
}, []);
```
Chúng ta mở kết nối tới WebSocket, và chúng ta có thể sử dụng cleanup function để đóng kết nối WebSocket đó.
Một điều khác mà bạn có thể sử dụng nó là **tracking modal close events**, chẳng hạn.
Giả sử chúng ta có một **modal** trong code của mình. Bên trong **modal component**, chúng ta có thể thêm một useEffect có thể kích hoạt khi dọn dẹp. Bằng cách này, chúng ta có thể nắm bắt mọi sự kiện.
Một modal có thể được gọi bởi một component khác đã dọn dẹp trong thời gian chờ đợi, vì vậy không có cách nào để biết khi nào người dùng đóng nó. (Hoặc họ đóng ứng dụng)
Chúng tôi có thể thêm 1 tracking để kích hoạt 1 cleanup effect khi điều này xảy ra.
```js
useEffect(() => {
  return () => {
    trackModalClose();
  };
}, []);
```
Bằng cách này, chúng tôi có một phương pháp chắc chắn để tracking thời điểm phương thức modal close() sẽ được gọi và bạn thậm chí có thể thêm kiểm tra để xem liệu các ứng dụng đã đóng hay đóng phương thức đã được gọi chưa.
# Kết luận
Tôi hy vọng các bạn thích bài viết này về chức năng dọn dẹp cho hook useEffect trong React.
Hãy cho tôi biết nếu bạn có bất kỳ câu hỏi nào hoặc các trường hợp sử dụng khác đáng để khám phá và học hỏi lẫn nhau.

Cảm ơn bạn đã quan tâm và luôn giữ kết nối!