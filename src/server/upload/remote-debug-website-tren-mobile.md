Nếu ai đã từng làm website responsive thì không ít lần gặp phải tình huống kiểu như dùng chế độ debug của chrome thì rất ngon, nhưng thi lên thiết bị thật lại không được như mong đợi, hay trên trình duyệt chrome thì chạy ngon lành mà trên safari mobile chả chạy quái gì (safari không có chế độ debug mobile trực tiếp trên trình duyệt macos).
Khi gặp phải những tình huống như vậy, thì việc remote debug trên thiết bị thật là điều không thể tránh khỏi. Hôm nay mình xin giới thiệu với các bạn làm sao để debug trực tiếp trên thiết bị thật (IOS và Android).

### IOS.
1.  Cần bật chế độ debug trên iphone của bạn.

1. Vào Settting => safari, kéo xuống cuối bạn sẽ nhìn thấy advanced, vào đây bật chế độ debug lên

![](https://images.viblo.asia/2b2cc04e-957c-4b8c-99df-840e669f0fd3.jpg)

2. Sau khi bật chế độ debug trên iphone thành công thì bạn cần cắp iphone vào máy tính mac của mình. 
3. Trên MacOs, vào `Safari => Preferences => Advanced` rồi check vào ` Show Develop menu in the menu bar`.

![](https://images.viblo.asia/11c3f940-02ee-43a3-8b85-86a715c9d87e.jpg)

5. Sau đó bật trình duyệt safari của cả mac os và iphone lên, vào cùng một trong web cần debug ví dụ: `https://viblo.asia` .
6. Trên trình duyệt safari của mac, vào Develop bạn sẽ thấy tên thiết bị của mình trong menu bar này, chọn vào đó rồi nhấn vào tên website `https://viblo.asia`, lúc này safari trên macbook sẽ về chế độ inspect, reload, hay thay đổi gì thì iphone cũng sẽ thay đổi theo.

![](https://images.viblo.asia/83859a9a-d279-4cbf-8943-5ec482e09ab6.png)

![](https://images.viblo.asia/14a575fb-8634-4dd7-9aa4-99261c480d53.jpg)

### Android

Tương tự như IOS chúng ta cũng cần phải bật chế đố debug lên cho android,

1. Mở  `Settings app`.
2. Chọn `System`.
3. Kéo xuống cuối và chọn `About phone`.
4. Kéo xuống cuối và  `tap` vào `Build number` 7 lần.
5. Back lại và tim `Developer options` bật nó lên
![](https://images.viblo.asia/8d2f1aae-50d8-4b14-9001-907d01423a0b.png)

Bây h đến chrome trên máy tính, có thể dùng mac, windown hay ubuntu đều được

-  Vào link chrome://inspect  bật chế độ remote debug cho chrome
![](https://images.viblo.asia/8be9de98-5ea1-4b61-82c9-3018c0350eb7.png)

Khi kết nối máy android vào máy tính, nó sẽ hiện list device ở mục này:

![](https://images.viblo.asia/8a5c7062-8944-4370-a4a5-8df4fedf3951.png)


Đó là toàn bộ những gì mình muốn chia sẻ, chúc mọi người debug tối
#### Tham khảo
1. https://developers.google.com/web/tools/chrome-devtools/remote-debugging/
2. https://developers.google.com/web/tools/chrome-devtools/remote-debugging/webviews
3. https://moduscreate.com/blog/enable-remote-web-inspector-in-ios-6/