**React Native Debugger** là công cụ mạnh mẽ cho các lập trình viên sử dụng hàng ngày để phát triển ứng dụng của mình một cách nhanh chóng hơn. Nó cung cấp một bộ các tính năng ấn tượng và thân thuộc chẳng hạn như **UI inspector**, **Redux inspector**, **Breakpoints** và **Networking inspector**. Trong bài viết này, chúng ta sẽ tìm hiểu mốt số cách để sử dụng **React Native Debugger**.

Nếu bạn là một lập trình viên thì chắc hẳn bạn đã từng gặp một trình gỡ lỗi rồi, nền tảng nào cũng cần phải có để phát triển và React Native cũng không ngoại lệ. **React Native Debugger** là một công cụ độc lập được xây dựng trên **Electron Framework**. Bạn có thể dễ dàng tích hợp công cụ này với **Chrome Dev Tool**. 

### Cài đặt React Native Debugger

Quá trình cài đặt dễ dàng như bao package khác. Chỉ cần tải xuống phiên bản mới nhất từ nhà phát hành thôi. Đối với Mac OS, chúng ta có thể sử dụng Homebrew Cask để cài đặt. Chỉ cần mở terminal lên và chạy lệnh:

```
$ brew update && brew cask install react-native-debugger
```

Sau khi cài đặt thành công thì chúng ta sẽ thấy trạng thái kết nối và cửa sổ trình gỡ lỗi. Quá trình debug sẽ chạy mặc định trên port 8081

![](https://images.viblo.asia/ac7eb118-6f61-48d4-b9a9-00d3b835caaf.png)


Bây giờ khi chạy ứng dụng React Native ở chế độ debug thì chúng ta không cần mở trình duyệt nữa. Để ứng dụng của bạn chạy vào trình gỡ lỗi thì chỉ cần lắc nhẹ thiết bị và chọn **Debug** trong develop menu. Nếu đang sử dụng trình giả lập Simulator thì ấn tổ hợp phím Command + Shift + Z để mở develop menu.

Tất cả các menu tùy chọn sẽ xuất hiện trong debugger app.

![](https://images.viblo.asia/01f8b3f3-2943-4186-94bf-8e99c58508d2.png)

### Chrome Dev Tools, React Dev Tools, Redux Dev tools

Như bạn có thể thấy, tất cả các tiện ích quan trọng dành cho việc debugging đều nằm ở đây.

![](https://images.viblo.asia/8146ba93-f197-4b71-abae-0eab6a52d97f.png)

### The Network Inspector

Khi phát triển một ứng dụng cần kết nối tới server, chúng ta không biết được cái gì diễn ra đằng sau nó. Ví dụ: khi đang gửi một request đến server, khó có thể theo dõi lỗi nếu nó xảy ra. Các developer thường debug bằng cách print hoặc log lỗi mặc dù cũng khá tốn thời gian vì phải lặp lại nhiều lần để hiểu luồng và trạng thái một cách đúng nhất (hầu hết mọi người đều làm vậy bao gồm cả tôi).

Vì vậy với **React Native Debugger**, chúng ta có thể dễ dàng theo dõi mọi truy cập ra vào giữa client và server.

* Có thể theo dõi luồng hoạt động của các React Component, luồng dữ liệu của Redux Store cũng như các network request trong một cửa sổ duy nhất.
* Có thể modify CORS nhanh chóng.
* Có thể modify request header như name, origin and user-agent.

### AsyncStorage Management

Chúng ta có thể debug các config **AsyncStorage** bằng cách sử dụng lệnh

```
console.log(showAsyncStorageContentInDev())
```

![](https://images.viblo.asia/9d70c11e-396d-432e-859d-a7078c3537b8.png)

### Debugging Redux State & Actions

Như đã đề cập trong tài liệu chính thức về **React Native Debugger**, công cụ này được tích hợp sẵn **Redux Dev Tool**. Tuy nhiên, **Redux Dev Tool** sẽ không hoạt động bình thường cho đến khi chúng ta kích hoạt chúng. Để sử dụng **Redux Dev Tool** trong **React Native Debugger**, chúng ta cần cấu hình một chút trong *App.js*, thêm đoạn sau:
```
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, /* preloadedState, */ composeEnhancers(middlewares));
```

Sau khi load lại thì chúng ta có thể thấy được luồng hoạt động của các action trong Redux đã được log ra

![](https://images.viblo.asia/46c793d9-e2fb-4b21-9ea1-5f01efa10475.png)


### UI Inspector

**React Native Debugger** cung cấp một trình gỡ lỗi với UI một cách mạnh mẽ gần tượng tự so với Inspector trên web. Chúng ta có thể kiểm tra các phần tử, các sắp xếp layout và các style của element một cách dễ dàng

![](https://images.viblo.asia/e3fc27d4-bad3-49df-aa1e-1da98fc32cf0.png)

### Breakpoints

**React Native Debugger** cũng cho phép dừng thực thi một tác vụ vào một thời điểm nhất định. Điều này giúp các developer hiểu được trạng thái dữ liệu tại những thời điểm cụ thể nào mà họ muốn trong vòng đời của một ứng dụng.

![](https://images.viblo.asia/415ed4be-cc06-47ef-a019-669b17a9444c.png)

### Debugging Expo Apps

Nếu bạn chọn sử dụng Expo CLI thay vì React Native CLI thì **React Native Debugger** cũng hoạt động tốt đối với Expo.

Thông thường, Expo Debugger sẽ chạy trên port 19001. Để chuyển **React Native Debugger**, cần chạy lệnh sau:

```
open "rndebugger://set-debugger-loc?host=localhost&port=19001"
```

### Kết luận

Trong bài viết này, chúng ta đã tìm hiểu những tính năng debug cơ bản, cốt lõi và hiệu quả nhất. Nó sẽ làm cho việc develop ứng dụng React Native dễ dàng hơn, các ứng dụng hoạt động hiệu quả cũng như ít lỗi hơn.

Cảm ơn vì đã theo dõi bài viết!