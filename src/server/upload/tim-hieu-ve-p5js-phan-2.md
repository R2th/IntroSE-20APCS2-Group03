Tiếp nối phần 1 giới thiệu về p5.js, một thư viện của JavaScript, dễ dàng đối với cho người mới bắt đầu học cách lập trình các ứng dụng đồ họa, tương tác (đồng thời cung cấp các công cụ mạnh mẽ cho các chuyên gia).
Ở phần này, mình sẽ giới thiệu thêm một vài thứ nữa về thư viện tuyệt vời này và cùng tạo ra một ứng dụng đơn giản sử dụng những thứ này nhé.
# Color
Như phần trước, mình đã sử dụng background() để tạo nên màu nền cho bản vẽ, ở phần này mình sẽ giới thiệu thêm một vài hàm nữa nha.

## fill()
Hàm này có tác dụng set màu được sử dụng cho vừa các hình khối. Ví dụ,  nếu bạn sử dụng fill (255, 0, 0), tất cả các hình tiếp theo sẽ được tô màu RGB có mã là (255,0,0) (màu đỏ). Màu được chỉ định theo màu RGB hoặc HSB tùy thuộc vào colorMode() hiện tại (mặc định là RGB, với mỗi giá trị trong phạm vi từ 0 đến 255).

![](https://images.viblo.asia/cb08731d-441c-4d91-ac00-168c3f4774c2.png)

Bạn có thể tham khảo code ở đây [fill()](https://alpha.editor.p5js.org/trunghieu0211/sketches/S1-JA-gZ7)

Ở ví dụ bên trên, khi mình sử dụng hàm fill(255,0,0) (màu đỏ), sau đó vẽ thêm 2 hình chữ nhật và elip phía bên dưới hàn fill() thì tất cả 2 hình này đều thể hiện màu đỏ. Nhưng khi mình viết một hàm fill(255,255,0) (màu vàng), sau đó vẽ thêm 2 hình chữ nhật và elip như 2 hình trên thì 2 màu mang màu vàng chứ không còn mang màu đỏ nữa.
## stroke()
Chuyển sang hàm tiếp theo nào, nói về stroke(), tác dụng của hàm này là set màu được sử dụng để vẽ các đường (lines) và đường viền xung quanh các hình khối. Màu sắc cũng được chỉ định theo màu RGB hoặc HSB tùy thuộc vào colorMode hiện tại (mặc định vẫn là RGB).

![](https://images.viblo.asia/85a44b2e-2561-4adb-802c-411b69bf6a66.png)

Bạn có thể tham khảo code ở đây [stroke()](https://alpha.editor.p5js.org/trunghieu0211/sketches/HJXixGlWm)

Ở ví dụ trên, ta đã set được màu cho đường viền cho hình chữ nhật, hình elip và đường thẳng.

![](https://images.viblo.asia/7b36f6a1-e54f-4c86-8224-fcad392c0ff0.png)

Hình trên thể hiện việc vẽ các đường thằng với các màu sắc khác nhau.

## clear()
Xóa các pixel trong bộ đệm. Hàm này chỉ hoạt động trên các đối tượng p5.Canvas được tạo bằng hàm createCanvas (), hàm này sẽ không hoạt động với cửa sổ hiển thị chính.

Khi chưa sửa dụng clear()
![](https://images.viblo.asia/752af462-f41f-4d6a-8693-f094fa479bd3.png)

Khi sử dụng thêm hàm clear()
![](https://images.viblo.asia/7c0ccf50-3245-4a84-b980-1e88e003187b.png)

## Một số event
## mouseX
Biến mouseX luôn chứa vị trí ngang hiện tại của chuột, tương ứng với (0, 0) của canvas. Nếu chạm được sử dụng thay vì nhấp chuột, mouseX sẽ giữ giá trị x của điểm tiếp xúc gần đây nhất.

![](https://images.viblo.asia/01185695-688c-495a-9012-c2a4e1017022.gif)
## mouseY
Biến mouseY luôn chứa vị trí dọc hiện tại của chuột, tương ứng với (0, 0) của canvas. Nếu chạm được sử dụng thay vì nhấp chuột, mouseY sẽ giữ giá trị y của điểm tiếp xúc gần đây nhất.

![](https://images.viblo.asia/dc8b7f11-d5c7-42df-bf70-9b2c51935768.gif)
## mousePressed()
Hàm mousePressed () sẽ được gọi một lần sau mỗi lần nhấn chuột. Trình duyệt có thể có các hành vi mặc định khác nhau được đính kèm với nhiều sự kiện chuột khác nhau. Để ngăn chặn bất kỳ hành vi mặc định nào cho sự kiện này, hãy thêm 'return false' vào cuối phương thức.
![](https://images.viblo.asia/bbef45d8-081c-43f1-b0fb-a30a3a591651.gif)
## mouseIsPressed
Biến mouseIsPressed sẽ trả về giá trị true nếu chuột được nhấn và false nếu không.
![](https://images.viblo.asia/4a008195-c6ec-4ea8-8f40-3ccedfd94e01.gif)
# Tạo một ứng dụng hay ho từ những thứ trên nào!!!
![](https://images.viblo.asia/3e849dc3-1ac5-4b13-a25d-62ee6af43e3f.gif)
Các bạn có thể tham khảo code [ở đây](https://alpha.editor.p5js.org/trunghieu0211/sketches/rk2XBXeWX)


-----
Như vậy mình đã giới thiệu cho các bạn một vài thứ trong p5.js để tạo ra một ứng dụng đơn giản. Hiện tại, mình mới đang tìm hiểu đến đây thôi, còn rất rất nhiều thứ mà ta có thể ứng dụng được khi sử dụng thư viện này. Mình sẽ cố gắng tìm hiểu thêm về thư viện này và chia sẻ cho các bạn trong các bài viết lần tới. Cảm ơn các bạn đã dành thời gian đọc bài viết của mình!

Các bạn nào nếu muốn tìm hiểu thêm có thể tham khảo tại đây:

https://p5js.org/

**(To be continued)**