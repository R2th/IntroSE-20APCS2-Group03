# Mở đầu
Trang web được sinh ra với mục đích là phục vụ người sử dụng, thế nên "trải nghiệm người dùng" (user experience) là một yếu tố cực kì quan trọng tạo nên thành công của một trang web.

Có rất nhiều cách để tạo nên một "trải nghiệm người dùng" tốt như tạo ra một nội dung chất lượng, chiến lược marketing tốt, thiết kế hấp dẫn, sử dụng nhiều công cụ phân tích... Một trong số đó phải kể đến "tốc độ load trang" (loading speed). 

Theo dữ liệu về tỉ lệ chuyển đổi (conversion rate: yếu tố quan trọng trong chiến lược trả phí, hiểu là nó biến khách hàng truy cập website trở thành khách hàng tiềm năng sử dụng dịch vụ của trang web), nếu tăng tốc độ trang web của bạn từ 8s lên 2s thì có thể dẫn đến tỉ lệ chuyển đổi tăng 74%. Nghĩa là một trang web chậm có thể khiến bạn mất gần một nửa số khách hàng tiềm năng.

# Giới thiệu PageSpeed Insights
Để xác định tốc độ load trang web của bạn cũng như các vấn đề ảnh hưởng đến tốc độ load trang, bạn có thể tìm đến [Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/). Đây là một công cụ miễn phí tự động quét cả phiên bản dành cho máy tính để bàn và điện thoại di động của trang web của bạn.
![](https://images.viblo.asia/675f2a58-9c0a-4a40-96ce-db5314d2bc5c.png)

Ngoài các vấn đề đã được phát hiện, PageSpeed Insights cũng sẽ cho bạn thấy một số đề xuất có thể khắc phục được. Bạn có thể gặp phải các vấn đề sau:
![](https://images.viblo.asia/0662687f-605c-4ad4-989d-b3425f315080.png)

Ảnh trên chỉ ra rằng mã Css và Javascript của bạn đang chưa được tối ưu, và nó đang làm chậm trang web của bạn. Nhưng đừng lo lắng vì nó có thể chỉ ra những file chưa tối ưu và có cả hàng tá công cụ giúp bạn tối ưu chúng.
# Xác định Code cần minify
Nhiều người lầm tưởng tối ưu là đẩy nhanh tốc độ hoạt động của file hay là làm cho ít tốn dung lượng của CPU hơn. Nhưng thực ra không phải vậy, tối ưu minify là tối ưu về Code, loại bỏ những kí tự, khoảng trắng dư thừa bên trong đoạn code để giảm thiểu băng thông khi load file.

Ví dụ như, các đoạn comment code có thể giúp người lập trình hiểu được nội dung đoạn code. Mặc dù nó rất hữu ích cho việc xem lại hoặc gỡ lỗi, nhưng chúng lại làm tăng kích thước mã code nên phải loại bỏ những đoạn comment đó đi để giảm tốc độ load file.

Sử dụng PageSpeed Insights, bạn có thể dễ dàng xác định mã nào yêu cầu minify. Chỉ cần bấm vào nút "Show how to fix" và thực hiện theo hướng dẫn.
![](https://images.viblo.asia/d64d173d-7fca-49eb-987e-923996bee07c.png)
# Optimizing Code
Khi PageSpeed Insights đã chỉ ra cho bạn những file cần minify, thì giờ đến công việc của bạn, đó là minify những file đó.

Có một số tools minify online như là:  	[CSS Minifier](https://cssminifier.com/) và 	[JSCompress](https://jscompress.com/).

Một điểm đáng nói đến khi tối ưu hóa Javascript là kết hợp các file trong 1 file duy nhất. Làm như vậy sẽ làm giảm số lượng yêu cầu HTTP mà trình duyệt tạo ra. Ví dụ thay vì gọi nhiều tập tin .js trong mã nguồn của bạn:
```
<script src=”http://www.yoursite.com/menu.js”> </script>
<script src=”http://www.yoursite.com/tools.js”> </script>
<script src=”http://www.yoursite.com/footer.js”> </script> 
```
Bạn có thể kết hợp chúng vào một tệp JavaScript đơn bằng cách sử dụng trình chỉnh sửa của bạn và gọi tất cả chúng cùng 1 lúc:
```
<script src=”http://www.yoursite.com/all.js”> </script>
```
Để cải thiện hơn nữa thời gian xử lý đoạn scripts, ta có thể bỏ qua các thẻ "html" hay "type". Ví dụ như thay vì sử dụng:
```
<script src=" http: //www.yoursite.com/all.js" type="text/javascript" > </script>
```
Bạn có thể viết lại như sau:
```
<script src="//www.yoursite.com/all.js"> </script>
```

Một vấn đề nữa về hiệu năng mà trang web của bạn có thể mắc phải đó là sự xuất hiện của mã dư thừa hoặc code bị trùng lặp. Đây thường là do các phần tử trang đã bị xóa, khiến cho đoạn mã code đó không còn được sử dụng nữa.

Cách tốt nhất để tìm mã trùng lặp là sử dụng công cụ được tích hợp trong Google Chrome. Bạn có thể mở menu ở góc bên phải, chọn "More Tools" và sau đó click vào "Developer Tools".
![](https://images.viblo.asia/4d786913-cf0a-4105-8c41-b7ff971c3076.png)

Sau khi kích hoạt công cụ dành cho nhà phát triển, bạn hãy tìm "Coverage" trong phần "More Tools".

![](https://images.viblo.asia/655be6e9-b191-4fc1-8ddf-2e5c62d7da98.png)

Thao tác này sẽ mở tab "Coverage" trong bảng điều khiển. Từ đó, nhấp vào nút "Instrument Coverage" để bắt đầu trải nghiệm :v: 

![](https://images.viblo.asia/79b6f45e-9259-4382-be7e-927b7b306eb2.png)

Khi kết thúc, bạn sẽ có 1 list các file cùng với các byte không sử dụng trong đó. Điều này được thể hiện bằng thanh màu đỏ và màu xanh lá cây bên phải.
Màu đỏ là phần không sử dụng đến.

![](https://images.viblo.asia/4f00597a-555c-4c8c-9459-33317440ff59.png)

Mở từng file ra, bạn sẽ thấy như sau:

![](https://images.viblo.asia/c33f228a-4e30-4802-8729-a3dfa5c2ff51.png)

Tìm thấy rồi thì chúng ta bắt tay vào dọn dẹp thôi!

***Note: Nếu bạn đang làm web với Laravel, thì có 1 thao tác rất đơn giản để optimize đó là chạy lệnh `npm run production` với điều kiện trong file `webpack.mix.js` bạn không được sử dụng cú pháp `mix.copy` mà nên sử dụng `mix.sass` và `mix.js`.***
# Kết luận
Loại bỏ tất cả các mã dư thừa có thể được coi là tẻ nhạt. Nhưng nếu bạn muốn cung cấp trải nghiệm người dùng hoàn hảo, thì đó là điều cần thiết.

Ngoài ra, hãy nhớ rằng mã không sử dụng có thể được xây dựng theo thời gian, vì vậy hãy lên lịch để xem lại và dọn sạch kho lưu trữ của bạn.
# Tham khảo
- [How to Optimize CSS and JS for Faster Sites](https://www.sitepoint.com/how-to-optimize-css-and-js-for-faster-sites/)