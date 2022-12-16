Bài viết đc dịch từ : https://medium.freecodecamp.org/cool-chrome-devtools-tips-and-tricks-you-wish-you-knew-already-f54f65df88d2

### 1. Kéo thả các element
Bạn có thể kéo thả các HTML element và đổi vị trí của chúng trong trang.

![](https://cdn-images-1.medium.com/max/1600/1*YJ4pbintkGmF67YSLH7UEQ.gif)

### 2. Tham chiếu đến element được chọn trong console
Chọn một node trong bảng element, sau đó gõ $0 trong console để tham chiếu đến nó.

Nếu bạn sử dụng jQuery, bạn có thể viết $($0) để truy cập đc các jQuery API của element này.

![](https://cdn-images-1.medium.com/max/1600/1*Ua9Z12CO8LYWcx5L2zpQAw.gif)

### 3. Sử dụng giá trị của thao tác cuối cùng của console
Sử dụng $_ để lấy ra giá trị của thao tác cuối cùng trong console.

![](https://cdn-images-1.medium.com/max/1600/0*zxJYnGdu8QUPGSiW.gif)

### 4. Thêm CSS và sửa trạng thái của element

Trong Element panel, có 2 nút cực kì hữu ích.

Nút đầu tiên cho phép bạn thêm css property mới cho bất kì selector nào bạn muốn

![](https://cdn-images-1.medium.com/max/1600/0*SVTP4Rl82XYNc4Kp.gif)

Nút thứ 2 giúp bạn kích hoạt state của một element, do đó bạn có thể xem đc style khi chúng ở trạng thái active, hovered hay focus.

![](https://cdn-images-1.medium.com/max/1600/0*1nCZIzP73fr2xAwQ.png)

### 5. Lưu lại những phần CSS được chỉnh sửa

Bấm vào tên của file CSS mà bạn đã chỉnh sửa sẽ chuyển sang giao tab Source pane, và ở đây, bạn có thể save file đó lại với những gì mình đã sửa.

Tuy nhiên, cách này ko áp dụng đc với những selector mới đc thêm bằng cách bấm +, hay những properties trong element.styles

![](https://cdn-images-1.medium.com/max/1600/1*7Q-CbjzcXYR20dbtmyMbJw.gif)

### 6. Screenshot một element

Chọn một element, và bấm cmd-shift-p (hoặc ctrl-shift-p trên Windows) để bật Command Menu, từ đó chọn Capture node screenshot

![](https://cdn-images-1.medium.com/max/1600/0*CjWhHTmoZbCeMXSw.gif)

### 7. Tìm một element bằng CSS selector

Bấm cmd-f (hoặc ctrl-f trên Windows) để mở search box. Ở search box này bạn cũng có thể dùng CSS selector, Xpath để search. 

![](https://cdn-images-1.medium.com/max/1600/0*ipqpirAGqDRlEbes.gif)

### 8. Shift-enter trong Console

Để viết command trong nhiều dòng, dùng shift-enter để xuống dòng. Sau khi đã viết xong, bấm Enter để execute nó

![](https://cdn-images-1.medium.com/max/1600/0*QizwVdkFs7FC1kv1.gif)

Bạn cũng có thể clear console bằng cách sử dụng nút Clear ở phía bên trái trên cùng, hoặc bấm ctrl-l hoặc cmd-k

### 9. Go to…

Trong Sources panel:

+ Bấm cmd-o (hoặc ctrl-o) để show tất cả các file đc load bởi page. cmd-o (ctrl-o in Windows), shows all the files loaded by your page.
+ Bấm cmd-shift-o (hoặc ctrl-shift-o) để hiển thị tất cả các symbols (properties, functions, classes) của file hiện tại.
+ Bấm ctrl-g để đến một dòng nào đó.

![](https://cdn-images-1.medium.com/max/1600/0*mxGuyBT02JoiSlb-.png)

### 10. Watch Expression

Thay vì phải viết đi viết lại nhiều lần tên một biến hoặc một biểu thức trong khi dedub, bạn có thể add chúng vào danh sách Watch Expression.

![](https://cdn-images-1.medium.com/max/1600/0*gSpZcWiUho4z9DoW.gif)

### 11. XHR/Fetch debugging

Từ  debugger, mở XHR/Fetch Breakpoints panel.

Bạn có thể set nó break bất kể khi nào XH/Fetch call được gọi, hay chỉ những cái nhất định

![](https://cdn-images-1.medium.com/max/1600/0*r_-hBTOJ23eSDX-g.png)

### 12. Debug chỉnh sửa DOM

Bấm chuột phải vào một element và enable Subtree Modifications. Bất cứ khi nào có scripit thay đổi childen của element đó, debugger sẽ tự động dừng lại cho bạn inspect xem chuyện gì đang xảy ra.

![](https://cdn-images-1.medium.com/max/1600/0*VYABHtIwKZ5eeu-p.png)