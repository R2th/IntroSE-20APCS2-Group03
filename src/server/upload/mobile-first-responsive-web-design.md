1. Responsive là gì ?
2. Điểm mạnh của responsive
3. Tại sao Mobile-First lại quan trọng ?
4. Thực hiện Mobile First 
5. Kết luận

# 1.  Responsive là gì ?
- Responsive là cách nhà phát triển thiết kế website phù hợp trên tất cả các thiết bị, mọi độ phân giải màn hình. “Responsive Web Design” là xu hướng thiết kế web hiện điện nhất và cần thiết nhất.
- "Responsive Web Design" đây có thể nói là khái niệm rất hot và đang phát triển rất mạnh mẽ hiện nay, Responsive Web Design là một công nghệ web mới và đang là 1 trong những xu hướng web hiện nay, nếu chúng vẫn còn chưa thực sự tin điều này có thể kiểm chứng Google với keyword: “xu hướng web”. Với những điều tôi nói trên thì chúng ta có thực sự muốn biết nó là gì và nó mang lại lợi ích thiết thực gì đối với việc phát triển web?
- Ví dụ về Web Responsive: Chúng ta mở trang chủ website Responsive, rồi thu nhỏ trình duyệt hoặc đổi độ phân giải màn hình, chúng ta sẽ thấy website của mình không hề xuất hiện Scrollbar ngang, mà nó sẽ tự động co dãn sao cho phù hợp với chiều rộng màn hình máy tính chúng ta.
*Để thực hiện điều này chúng ta cần thêm 1 thẻ html :*
```
<meta name="viewport" content="width=device-width, initial-scale=1.0">  
```

# 2.  Điểm mạnh của responsive
![](https://images.viblo.asia/8efe7de7-7d50-4e23-9efd-0601566645e9.jpg)
- Responsive Web Design là một điều tất yếu phải có trong thời đại bây giờ. Tuy là nói chạy trên nhiều chế độ phân giải màn hình tuy nhiên chúng chỉ cần một CSDL, một layout website tất cả chỉ là CSS làm việc.
- Có thể nói Responsive Web Design sẽ làm cho website chạy tốt trên mọi thiết bị di động, tăng tính tương thích cho website của chúng ta, tạo độ tin cậy và sự chuyên nghiệp với khách hàng.
- Nếu so sánh một website đã được thiết kế responsive với một website không thiết kế responsive thì khách hàng chắc chắn sẽ ưa thích hơn responsive web.
- Ngoài ra nếu css được viết một cách rõ ràng thì việc bảo trì và nâng cấp sẽ được thực hiện dễ dàng hơn khi responsive.

# 3.  Tại sao mobile first lại quan trọng ?
- Thiết kế Mobile-First rất quan trọng để xem xét vì chúng ta có loại bỏ những không gian không cần thiết ở thiết bị di động. Điều này có nghĩa là người dùng sẽ có ít trải nghiệm hơn hoặc màn hình nhỏ hơn sẽ xuất hiện chật chội và quá đầy sẽ ảnh hưởng nghiêm trọng đến trải nghiệm của khách hàng của chúng ta. Tuy nhiên, nếu chúng  bắt đầu thiết kế responsive từ thiết bị nhỏ cho đến lớn dần, chúng ta sẽ nhận ra rằng việc sửa css vào màn hình lớn hơn sẽ dễ dàng hơn khi tổng không gian tăng lên.
- Nó mang lại lợi ích cho chúng ta theo nhiều cách khác nhau vì một trang web hoạt động tốt trên một thiết bị nhỏ hơn có thể đảm bảo rằng việc bị vỡ khung nhìn khi ra màn hình lớn sẽ ít hơn

*Việc thiết kế trên các thiết bị khác nhau mang lại trải nghiệm giống nhau cho bất kỳ thiết bị nào họ đang xem trang web của chúng ta hơn là hai phiên bản hoàn toàn khác cho di động và máy tính riêng.*

Ngoài ra việc thiết kế mobile first cũng giúp chúng ta giảm được số lượng dòng css đáng kể so với thiết kế thông thường.
# 4. Thực hiện thiết kế mobile first 
***Trình tự thực hiện mobile first như sau :***
![](https://images.viblo.asia/02f6d336-d600-4d65-b739-b05881b4d750.png)
- Tiến trình thiết kế responsive của chúng ta xuất phát từ màn hình nhỏ và xây dựng dần lên thiết bị có kích thước to
*Để thực hiện việc này chúng ta sẽ sử dụng  min-width thay vì max-with như thông thường:*
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

- Thực hiện theo mô hình này chúng ta sẽ viết style css cho thiết bị từ nhỏ tới lớn.
# 5.  Kết luận 
- Trên đây là những gì mình tìm hiểu được về Mobile-First Responsive Web Design
- Mình đã thực hiện theo cách này và số lượng style css đã giảm đi đáng kể.
- Các bạn có thể tìm hiểu thêm [tại đây](https://medium.com/@lucasdsbh/responsive-web-design-and-mobile-first-5-basic-techniques-d89329f3e733)