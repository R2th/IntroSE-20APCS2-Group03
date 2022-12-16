Google Chrome là trình duyệt web phổ biến nhất được sử dụng hiện nay, trong năm 2019 nó chiếm tới 63% lượng người sử dụng trên toàn cầu. Mình chắc hẳn khi đọc bài viết này nhiều bạn cũng đang sử dụng Chrome và Dev tools của nó. Dưới đây là một số mẹo của Chrome develop tools mà mình tìm hiểu được, mong rằng bài viết này sẽ giúp được các bạn nâng cao được hiệu suất khi làm việc với Chrome và xem rằng bạn biết được bao nhiêu trong số đó nhé.

## 1. Pretty Print {}
Điều gì xảy ra nếu bạn cần xem nội dung của một file mà nó lại bị rút gọn, trước đây mình mình hay cop nội dung ra rồi vào các trang unminify code để forrmat lại nó nhưng giờ đây chỉ cần 1 click là mọi chuyện đã suôn sẻ bằng cách nhấn vào nút {}
![](https://images.viblo.asia/02695398-f512-42f9-8877-577ef0aeb00e.gif)


## 2. Screenshots 
1. Mở command menu bằng cách nhấn Ctr + Shift + T 
2. Nhập "screenshot" vào ô tìm kiếm
- Capture full size screenshot: chụp cả trang web
- Capture node screenshot: chụp lại element đang chọn
- Capture screenshot: chụp lại màn hình hiện tại
- Capture area screenshot: cho phép kéo thả và chọn vùng muốn chụp

![](https://images.viblo.asia/0539644e-abf2-4bb0-aa36-eed7533efcb0.PNG)


## 3. Color Picker
1. Nhấp vào hình vuông nhỏ để hiện lên hộp thoại chọn màu

![](https://images.viblo.asia/06986da9-d585-4c34-9908-dabc6ccc268e.PNG)

2. Chọn toggle color picker
3. Trong khi bộ chọn màu được bật, bạn có thể di chuột quanh trang web của mình và sử dụng công cụ chọn màu để có được màu bạn muốn. Điều này giúp chúng ta có thể chọn màu nhanh chóng và chính xác, giúp tiết kiệm thời gian khi phải tìm đến đúng element có màu đó.

![](https://images.viblo.asia/28f14e9d-4096-4ace-bf15-6b51451cfeb2.PNG)

Để có thể thay đổi format của màu (hex, rgb...) bạn nhấn Shift + click vào ô vuông chọn màu ở trên


Force element state

## 4. Kéo thả element

![](https://images.viblo.asia/fb0164b6-cf81-4b81-81b3-9e790d640ae9.gif)


## 5. Điều khiển tốc độ mạng
Bạn có tốc độ mạng nhanh và load trang web của mình trong một thời gian hoàn hảo nhưng không có nghĩa là tất cả người dùng khác cũng vậy, tốc độ mạng và tốc độ xử lý ở mỗi máy là khác nhau, hoặc cùng một máy nhưng cũng có thể khác nhau ở nhiều thời điểm khác nhau.
Để thiết lập tốc độ mạng, bạn mở dev tools và chọn sang tab network rồi sau đó chọn các tùy chỉnh tương ứng (Online, Fast 3G, Slow 3G, Offline..)

![](https://images.viblo.asia/309caf47-a97f-4c27-b7a2-34c51d1fb1c2.PNG)


## 6. Console info, warn, error, table

Nếu đã từng học qua javascript chắc hẳn các bạn không còn xa lạ gì với câu lệnh `console.log` dùng để in dữ liệu ra console, ngoài câu lệnh log ra chúng ta còn nhiều câu lệnh khác như

- console.info()
- console.warn()
- console.error()

![](https://images.viblo.asia/22e7af5c-8b17-4833-b306-b268b0dbee53.PNG)

Cách thức và chức năng của chúng không khác nhau nhiều chỉ khác nhau ở chỗ dữ liệu xuất ra console của chúng được style khác nhau

- console.table: xuất dữ liệu ra console dưới dạng bảng

![](https://images.viblo.asia/d302c91d-9cb8-4979-9b6d-608c083564da.png)

## 7. Tham chiếu đến element được chọn trong console 
Khi bạn chọn 1 node trong tab element, để tham chiếu đến node đó trong console hãy dùng `$0`

![](https://images.viblo.asia/cf451c6f-2b78-4ac6-a0fd-f577d840bc61.gif)

## 8. Coverage
Tính năng này giúp cho chúng ta tìm ra được những đoạn Js hay CSS không sử dụng, từ đó giúp tối ưu hóa dữ liệu gửi về client và giúp cho tốc độ tải trang nhanh hơn phần nào.

Để tiến hành record bạn mở tab Performance của dev tools, nhấn tổ hợp phím Ctr + Shift + T rồi gõ "Show Coverage"

Nhấn vào nút record hoặc tổ hợp phím Ctr + E, quá trình này sẽ mất khá nhiều thời gian

![](https://images.viblo.asia/03e44e5d-acdf-457f-afcc-18ea20036044.png)

Màu đỏ là những phần không sử dụng đến, nhưng mình cũng không khuyến khích xóa bỏ nó đi bởi vì kết quả này chỉ mang tính chất tham khảo, hay suy nghĩ kỹ nếu ko muốn làm phát sinh lỗi sau này...

![](https://images.viblo.asia/b3fc9237-3b25-4e14-903d-f1bc9f12653e.png)


## 9. Audits
Audits là một công cụ được tích hợp trong dev tools nhằm phân tích và thống kê lại hiệu suất, khả năng truy cập, SEO... của trang từ đó đưa ra được cái nhìn tổng quát về trang web, giúp cho việc cải thiện chất lượng sản phẩm được nâng cao hơn.

1. Mở dev tools, chuyển qua tab Audits (cái có hình ngọn hải đăng) chọn "Perform an audit"
2. Đánh dấu tick vào các mục mà bạn muốn phân tích, nên chọn tất cả để thu được một báo cáo hoàn chỉnh
3. Click vào nút "Generate report" và đợi tầm 2-3 phút

![](https://images.viblo.asia/e119bc4e-359a-472e-bfef-a337b9187bb0.png)


## 10. Dark mode
Dark theme là theme mình luôn ưu tiên lên hàng đầu bởi vì đối với một người ngồi máy tính nhiều như mình nhìn vào một màn hình trắng cả ngày sẽ rất dễ mỏi mắt, không kể những lúc đêm xuống nhìn vào sẽ bị chói (chói như ánh sáng của Đảng vậy). Để chuyển sang "dark theme" bạn mở Dev tools và nhấn tổ hợp phím Ctrl + Shift + P rồi gõ "Switch to dark theme", nhấn Enter và Dev tools sẽ ngay lập tức chuyển về màu tối.