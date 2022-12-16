## Tại sao cần thiết kế web chuẩn?

Trong cuộc sống hiện nay thì có rất nhiều cái chuẩn, đặc biệt là đối với những người làm việc liên quan đến lĩnh vực công nghệ thông tin. Chính vì vậy, việc thiết kế web chuẩn là yêu cầu cần thiết nếu chúng ta muốn website của mình được các trình duyệt và những siêu web khác chấp nhận. Và đó là tiêu chí khi bạn muốn SEO trang web của mình. Vậy thiết kế web chuẩn W3C là gì? Tại sao phải tuân theo chuẩn W3C và những lợi ích mà chuẩn W3C mang lại cho bạn là gì ? Trong tutorial lần này, chúng ta sẽ cùng tìm hiểu chuẩn W3C là gì nhé.

## W3C là gì?

W3C viết tắt của cụm từ World Wide Web Consortium, W3C là chuẩn được các nhà thiết kế website sử dụng làm thước đo khi thiết kế website, cũng giống như lương của bạn được đo bằng giá trị của bạn mang lại cho công ty vậy.

## Lợi ích khi viết code theo chuẩn W3C

1. Website của bạn sẽ thân thiện hơn với các Search Engine đặc biệt là google spider.
2. Website của bạn được hỗ trợ tốt trên nhiều trình duyệt, bạn không mất nhiều thời gian để chỉnh sửa và tối ưu hóa cho từng trình duyệt.
3. Các thiết bị hiển thị website di động như điện thoại IPad đều dựa trên chuẩn W3C. Do đó, Website của bạn sẽ hiển thị tốt hơn. Để kiểm tra website của bạn có tuân thủ theo chuẩn W3C hay chưa thì bạn có thể vào https://validator.w3.org/ để kiểm tra.

![](https://images.viblo.asia/1915159d-3959-42ae-befb-0ec8a8922d12.png)

## Một số lưu ý trong HTML để thiết kế web theo chuẩn W3C

### 1. Thiếu thuộc tính alt trên thẻ img

Thuộc tính **alt** này sẽ giúp bạn có thể tạo ra một văn bản thay thế cho bức ảnh, khi trình duyệt không hiển thị được hình ảnh thì người dùng có thể nhìn thấy văn bản được ghi trong thuộc tính **alt**, qua đó giúp cho người dùng hiểu được nội dung tiêu đề của tấm ảnh, đồng thời làm tăng tính ngữ nghĩa cho nội dung trang web. Nếu giá trị của thuộc tính **alt** thể hiện rõ nội dung của hình ảnh và có tính liên quan chặt chẽ với nội dung của trang web thì việc tìm kiếm trang web của bạn trên google sẽ rất dễ hiểu và làm tăng thứ hạng đánh giá trang web của bạn. Chính nhờ thuộc tính **alt** mà các nhà lập trình dễ dàng làm SEO cho trang web của bạn.

Ví dụ:

```
<img src=”images/logo.png” alt=”logo Sun-asterisk” />
```

Một ví dụ thực tế từ website Lynda.com (một trong những trang đào tạo trực tuyến nổi tiếng nhất trên thế giới), chính là khi hình ảnh không thể hiển thị cho người dùng xem thì ngay tại ví trí đó, trang Lynda đưa ra chỉ dẫn dưới dạng văn bản để giúp người dùng có thể xem hoặc lấy được ảnh. Chỉ đơn giản với thuộc tính **alt** mà đã làm người dùng thấy được sự chu đáo và chỉnh chu từ website Lynda này.

![](https://images.viblo.asia/d1542094-1138-493e-a3f9-a3c0fd7cc538.png)

### 2. Đặt giá trị ID trùng nhau ### 

**id** và **class** có chức năng tương tự nhau tuy nhiên **class** có thể dùng nhiều lần nhưng **id** thì chỉ được dùng một lần duy nhất cho một element.

### 3. Sử dụng các ký tự đặc biệt

Trong HTML một số ký tự đặc biệt như: **< > / &**… thì không được phép viết trực tiếp mà phải sử dụng các ký tự mã hóa thay thế. Bạn có thể tham khảo các ký tự mã hóa thay thế tại https://dev.w3.org/html5/html-author/charref

![](https://images.viblo.asia/35922b6f-93d6-4480-b38b-b3c5f6657ca6.png)

### 4. Sử dụng sai thuộc tính href trên thẻ a

Ví dụ:

```
<a href=”link 1″ target=”_blank”> link 1</a>
```

Ví dụ trên, khi kiểm tra W3C sẽ bị báo lỗi và để khắc phục lỗi bạn chỉ cần sửa lại như sau:

```
<a href=”link_1″ target=”_blank”> link 1</a>
```

### 5. Không phân biệt được inline element và block element

“Inline Element” là các thẻ như: **img, a, span**,… 
Còn “Block Element” là các thẻ như: **div, p, br**… 

Nếu bạn còn chưa rõ về **block element** và **inline element** thì có thể tham khảo thêm tại [w3schools](https://www.w3schools.com/html/html_blocks.asp)

Tất nhiên thẻ **block element** có thể chứa **inline element**. Điều này giúp cho các lập trình viên có thể dễ dàng tùy biến nội dung đồng thời góp phần trình bày nội dung cho nó bắt mắt hơn.

## Kết luận

Việc thiết kế web chuẩn W3C đem lại nhiều lợi ích cho trang web của bạn đúng không nào, vừa giúp cho lập trình viên viết code rõ ràng, vừa giúp cho trang web của bạn dễ dàng tìm kiếm trên google, thu hút người dùng…Vậy còn chần chừ gì nữa mà không tự tạo ra website tuân theo chuẩn W3C riêng cho mình nào các bạn.