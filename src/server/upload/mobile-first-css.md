**Giới thiệu:**

**Mobile First là gì?**

**Mobile First** được coi là các tiêu chuẩn ưu tiên mặc định cho mobile devices (các khung hình nhỏ như thiết bị di động) sau đó mới override các giá trị cho tablet, và sau cùng là desktop. Khái niệm này được đưa ra bởi Luke Wroblewski vào năm 2009.

**Mobile First** dịch từ tiếng Anh có thể hiểu là **Ưu tiên hàng đầu cho thiết bị di động**. Cụm từ này hay được sử dụng trong các ứng dụng công nghệ như **Mobile First** web design (Thiết kế website ưu tiên cho thiết bị di động). Như vậy, **Mobile First về mặt ứng dụng** ngày nay có thể hiểu là **Thiết kế sản phẩm ưu tiên cho thiết bị di động.**

Thế nhưng, vì sao **Mobile First** đang bắt đầu và sẽ trở thành xu hướng được quan tâm mạnh mẽ kể từ năm 2018? **Mobile First** web design so với **PC First** web design (Thiết kế web thích ứng) có những điểm nào khác biệt?

**PC First trong Responsive**

**PC First** là khái niệm để chỉ tuần tự responsive giao diện từ màn hình to xuống màn hình nhỏ.

Để làm việc với mô hình này chúng ta sử dụng **max-width** trong **media query**.

Dưới đây là các media query điển hình mà ta cần thêm vào dự án.

```
/*Ipad ngang(1024 x 768)*/
@media screen and (max-width: 1024px){
  
}
/*Ipad dọc(768 x 1024)*/
@media screen and (max-width: 768px){
    
}
/*Tablet nhỏ(480 x 640)*/
@media screen and (max-width: 480px){
    
}
/*Iphone(480 x 640)*/
@media screen and (max-width: 320px){
    
}
/*Smart phone nhỏ*/
@media screen and (max-width: 240px){
    
}
```

Ngoài ra, nếu mình cần responsive trên nhiều thiết bị hơn thì công việc của chúng ta là cần xác định kích thước của nó và thêm vào danh sách media query kia theo thứ tự màn hình to ở trên màn hình nhỏ query ở dưới.

Theo cách này thì khi một Selector trong css cần style đi qua từ màn hình to đến nhỏ sẽ được thay đổi theo thứ tự ưu tiên.

Trái ngược với **PC First** chúng ta cùng đi qua **Mobile First**.

**Mobile First trong Responsive**

Tuần tự tiến trình responsive của chúng ta xuất phát từ màn hình nhỏ và xây dựng dần lên thiết bị có kích thước to.

Để làm việc với mô hình này chúng ta sử dụng tham số **min-width** trong media query.

```
/*Smart phone nhỏ*/
@media screen and (min-width: 240px){
    
}
/*Iphone(480 x 640)*/
@media screen and (min-width: 320px){
    
}
/*Tablet nhỏ(480 x 640)*/
@media screen and (min-width: 480px){
    
}
/*Ipad dọc(768 x 1024)*/
@media screen and (min-width: 768px){
    
}
/*Ipad ngang(1024 x 768)*/
@media screen and (min-width: 1024px){
  
}
```

Với mô hình này thì khi style Css cho cùng một đối tượng thì theo thứ tự được ưu tiên từ màn hình nhỏ đến to, càng về sau các các Css ở các query màn hình to hơn được ưu tiên hơn. 

**Mobile First so với PC First có những điểm nào khác biệt?**

Website responsive đã có tính tương thích với thiết bị di động, vì sao lại cần phải quan tâm đến **Mobile First**? Đến đây, bạn cần hiểu rõ một điều rằng:

Web responsive về mặt kỹ thuật thực chất chỉ là điều chỉnh lại từ một phiên bản nào đó làm cơ sở. Đa phần cho đến ngày nay, các website responsive được lấy giao diện màn hình rộng làm cơ sở. Một phần là do các website đã được thiết kế sẵn từ thời các thiết bị di động màn hình nhỏ chưa được phổ biến dùng để truy cập web. Một phần là do để trở nên phổ biến và chiếm đa số người dùng truy cập website thông qua thiết bị di động cần một quá trình không ngắn. Việc ứng dụng web responsive ứng dụng lại website đã vận hành trên desktop làm cơ sở sẽ tiết kiệm thời gian, công sức và chi phí hơn. Các nhà thiết kế web vẫn có thể tận dụng chung mã nguồn Back-end và chỉ cần điều chỉnh lại ẩn bớt các thông tin không cần thiết, tinh gọn lại tập trung thông tin cần thiết hơn với màn hình nhỏ, điều chỉnh một số tính năng trên nền tảng hệ điều hành và trình duyệt trên điện thoại di động.

Chính vì lẽ đó, đến thời điểm người dùng thiết bị di động truy cập web trở nên đông hơn và chiếm tỉ lệ cao hơn. Việc lấy màn hình nhỏ (màn hình điện thoại di động - mobile) làm cơ sở khi thiết kế web sẽ giúp cho website có độ thích ứng cao và tương tác tốt hơn với số đông người dùng. Đây chính là lý do **Mobile First** cần được quan tâm và ưu tiên, hay xu hướng thiết kế web ưu thiết bị di động sẽ là xu hướng mới.

![](https://images.viblo.asia/5f4875b1-0c7c-4daa-9065-42316785b6ea.png)

Giải pháp đối với **Web Mobile First** sẽ có hai hướng:

* Vẫn ứng dụng Reponsive: Tức là bạn vẫn tiếp tục sử dụng chung mã nguồn Back-end, điều chỉnh các tính năng Front-end cho tương thích với các loại thiết bị, ẩn hiện tuy theo kích thước màn hình. Nhưng cần ưu tiên lấy màn hình nhỏ làm cơ sở. Tuy nhiên, phương pháp này sẽ gây không ít cản trở nếu muốn tối ưu rốt ráo cho điện thoại di động. Điều này sẽ được nói rõ hơn ở các tiêu chí sẽ được đề cập ở bên dưới.
* Thiết kế một phiên bản riêng cho mobile: Với cách này bạn vẫn có thể sử dụng chung cơ sở dữ liệu website nhưng cần tinh gọn lại những xử lý Back-end không cần thiết đối với thiết bị di động, những xử lý sẽ bị ẩn trên thiết bị di động như cách làm Responsive. Việc thay đổi hay nâng cấp cho từng nền tảng thiết bị có tính độc lập, ít ràng buộc hơn.

Sau đây là một số tiêu chí cơ bản cần quan tâm khi chuyển sang thiết kế web Mobile First:

* **Bố cục nội dung**: Với màn hình nhỏ trên điện thoại di động, bạn cần quan tâm đến bố cục sao cho dễ tương tác nhất.
* **Tốc độ xử lý**: Giảm bớt các xử lý tối đa tập trung cho những thứ cần thiết trên thiết bị di động. Trên thiết bị di động, cấu hình máy thấp hơn nhiều so với PC/Desktop/Laptop.
* **Tương thích hành vi**: Tập trung xử lý các tính năng liên quan đến hành vi thao tác trên thiết bị di động.
* **Tốc độ tải web**: Giảm tối đa lượng yêu cầu (Request), kích thước hình ảnh, nội dung ưu tiên cho màn hình nhỏ để tăng tốc độ tải web. Cần lưu ý rằng tốc độ đường truyền trên thiết bị di động đa phần chậm hơn trên PC/Desktop/Laptop.

**Kết luận**

Qua bài viết này, hy vọng mọi người hiểu hơn về **Mobile First**, phân biệt được sự khác nhau giữa **Mobile First** và **PC First** qua đó thấy được sự khác nhau giữa chúng.

**Tham khảo:**

https://blog.vietsol.net/thiet-ke-website/mobile-first

https://codetot.net/nao-la-viet-code-theo-tieu-chuan-mobile-first/