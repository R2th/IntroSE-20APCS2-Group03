## Giới thiệu
Chắc không ít người từng nghĩ đến việc làm 1 tấm thiệp bằng html để tỏ tình, tặng người yêu, hay để phỏng vấn xin việc... Cũng có nhiều mẫu thiệp đẹp, hôm nay mình xin chia sẻ 1 mẫu khá đẹp, có thể gấp mở với hiệu ứng 3D. Mình chỉ giới thiệu sơ lược cách làm còn các bạn hoàn toàn có thể mở rộng sáng tạo cho riêng tấm thiệp của mình.
![](https://images.viblo.asia/5d3c684a-6f01-4c94-9da1-43ec11d98d5f.gif)

## Hiệu ứng lật thẻ (flipping card)
Để làm được tấm thiệp có thể mở và gập lại như ảnh mô phỏng trên thì chúng ta cần tìm hiểu hiệu ứng lật thẻ 3d trước, các bạn có thể search keyword **flipping card css**,  vì cái này có sẵn cả rồi nên mình mượn luôn 1 bài mẫu của Shay Howe để giới thiệu:
(https://codepen.io/shayhowe/pen/Fvjnf)

{@embed: https://codepen.io/shayhowe/pen/Fvjnf}

Đầu tiên bạn hãy tạo 1 thẻ bao, như trong ví dụ là div.card, bên trong gồm 2 mặt của tấm thẻ, mặt trước và sau, các bạn có thể dùng tên class là *front* và *back* để phân biệt :joy: Tiếp đến là cho class *card* thuộc tính `transform-style: preserve-3d` , còn 2 mặt thẻ thì thêm thuộc tính `backface-visibility: hidden`, khi hover thì *.card* xoay 180 độ và mặt sau (*back*) cần được rotate 180 độ, đấy là 3 điều cơ bản trong hiệu ứng 3d này, code cụ thể các bạn hãy xem trong ví dụ trên nhé, hãy thử thay đổi giá trị của rotate để hình dung nó hoạt động như nào.

## Làm thiệp nào
Khi đã nắm được cách làm hiệu ứng trên rồi thì ta bắt đầu làm tấm thiệp như ảnh gif phần giới thiệu, nó cũng chính là thiết kế luôn rồi, sẽ có 3 phần, 1 phần trung tâm ở trong tấm thiệp, 2 phần có thể gập mở mà mình gọi là *card--first* và *card--third* :rofl:, 2 phần này sẽ áp dụng hiệu ứng mình vừa tìm hiểu, nhưng các bạn có để ý trong ví dụ trên cái thẻ xoay quanh trục ở giữa nó không? Mà muốn làm thiệp thì nó phải mở từ 1 bên cơ, nên cần thêm thuộc tính `transform-origin: left` cho phần bên trái và `transform-origin: right` cho phần bên phải. Ngoài ra để cho *mượt* thì phải set delay đóng mở hợp lý cho 2 phần cánh này.

![](https://images.viblo.asia/b2655e52-0b97-4c41-af7d-1b9d28d97d03.png)


Lý thuyết cũng chỉ có vậy thôi, còn có cái **nút Open ở bìa ngoài** mọi người có thể xem code, mình dùng hoàn toàn html và css thôi không phải dùng ảnh đâu, cũng là cái thú vị cho ai chưa biết.

Thành quả: https://codepen.io/dfly25e/pen/zQKOya (khuyến khích ae vào xem màn to cho đẹp :sweat_smile: màn nhỏ mình chưa responsive đâu)

{@embed: https://codepen.io/dfly25e/pen/zQKOya}

## Kết luận
**Vì mình chỉ muốn giới thiệu cách làm flipping card nên mình cũng chỉ chú trọng css để làm hiệu ứng mở-gập thẻ này, sẽ có những lỗi về code xấu, chưa responsive, thiết kế mong các bạn bỏ quá cho**. Để tấm thiệp thêm đẹp và ý nghĩa, các bạn hoàn toàn có thể cho thêm nhạc, video, lời bài hát chạy hay slide... Đó là sáng tạo riêng của mỗi người nên mình để trống hoàn toàn nội dung bên trong thiệp cho các bạn. Mình từng làm 1 cái thiệp như thế này: khi mở thiệp ra, sẽ có 1 ít nhạc vang lên *ring the bell*, có 1 audio là 1 bài hát, khi bạn play thì lời bài hát bắt đầu hiện và chạy theo, có cả slide gồm ảnh kỉ niệm, và thiệp thì không thể thiếu 1 vài lời nhắn nhủ, vài lời chúc rồi. 
Hy vọng với bài chia sẻ này có thể giúp 1 số bạn mới học có thêm kiến thức, ai chưa có gấu có thể kiếm gấu và ai có người yêu rồi thì tặng người yêu đều ý nghĩa. Chúc các bạn thành công!