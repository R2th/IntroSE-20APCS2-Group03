JavaScipt hiện tại cho chép khai báo 2 loại function khác nhau.       
Nội dung bài này tập trung vào so sánh tính chất của 2 loại function này, được trình bày một cách ngắn ngọn và dễ hiểu nhất.

**1. Regular Function**:  (Cách khai báo quen thuộc cho 1 hàm bình thường)
```
function () {} 
```
**2.  Arrow Function**: (Dùng mũi tên để khai báo 1 hàm - cú pháp ES6)
```
() => {}
```

*Chú ý: Mọi code mẫu trong bài viết này bạn có thể copy và chạy trực tiếp trên console chrome*

## 1.  This

**Regular function**:  Khởi tạo hàm nhưng chưa xác định this (có thể thay đổi khi chạy hàm)    
**Arrow function**:  Khởi tạo hàm và xác định this (ko thể thay đổi khi chạy hàm)

=> Hàm cùng nội dung nhưng khai báo 2 cách khác nhau => Trả về 2 kết quả khác nhau.   
Bạn nhìn code sẽ để hiểu hơn: 

![](https://images.viblo.asia/32e26a56-920a-4ff8-90d6-b876afed6a31.PNG)

Biến **this**: 
* **regular**: trong hàm foo
* **arrow**:   bên ngoài hàm foo


## 2.  New
Regular function cho phép sử dụng cú pháp **new** để tạo mới function.

![](https://images.viblo.asia/8593374c-6a1c-4470-9dff-954e286828ca.PNG)

Cũng như vậy với việc kế thừa

![](https://images.viblo.asia/03fcd236-b34b-43ed-9e7b-20568b162df4.PNG)


## 3. Call(), apply(), bind()
Các phương thức **call()**, **apply()**, và **bind()** sẽ không thay đổi giá trị của this trong arrow function.

![](https://images.viblo.asia/3e714b34-7db4-4c81-9d6e-0257149566c6.PNG)


## 4. Prototype
Arrow function ko có thuộc tính prototype

![](https://images.viblo.asia/fa667a6d-452f-4b98-8013-7a3563bb5131.PNG)


## 5. Arguments (Tham số)

Regular function cung cấp biến **arguments** là danh sách tham số truyền vào,
Arrow function thì không.

![](https://images.viblo.asia/97f793fb-48ab-4e95-9ad7-d2c3a613ad68.PNG)

Vậy để dùng được **arguments** trong arrow function ta làm như sau: 

![](https://images.viblo.asia/0bc921a1-6de5-49ca-bd83-f03889444ceb.PNG)

*Cú pháp **...** là cú pháp mới trong ES6, rất tiện dụng, nếu biết sử dụng code sẽ ngắn và dễ nhìn hơn đấy*
## 6. Trùng tên tham số?

Regular function cho phép truyền vào 2 tham số có tên trùng nhau.   
Và khi thực thi nó sẽ lấy giá trị là biến **x** thứ 2.

![](https://images.viblo.asia/ada3919b-5350-4ea4-8f1d-991e078ed23a.PNG)


## 7. Thứ tự khai báo
Bạn thử nghĩ xem tại sao TH1, TH2 lại lỗi, mà TH3 lại chạy bình thường?

![](https://images.viblo.asia/6e989910-c7dd-454e-9ea9-f10c84ddea12.PNG)

Lý do là cách khai báo thứ 3 sẽ tương ứng với:
```
regular_ok()
var regular_ok = function() {}
```
*Việc sử dụng var để khai báo sẽ rất khó kiểm soát, bởi nó sẽ global hơn bạn tưởng, dẫn đến ảnh hưởng đến các biến khác*
## 8. Yield function
Regular cho phép khai báo hàm yield, Arrow function thì không.    

![](https://images.viblo.asia/7f6f9097-a360-4b11-a1a2-43ea0b287b7c.PNG)

*Về cơ bản, yeild là từ khóa dùng để tạm dừng và cũng để tiếp tục việc thực thi bên trong function.*


Bài viết đã chỉ ra một đố khác biệt nổi bật về tính chất của 2 loại hàm trên. 
Ngoài ra nếu bạn còn phát hiện thêm tính chất khác nhau của 2 hàm trên, bình luận phía dưới để mọi người cùng đọc :D

***Thank you for reading!***

<br>

##### Nguồn tham khảo
1.  https://developer.mozilla.org/vi/docs/Web/JavaScript
2. https://qiita.com/