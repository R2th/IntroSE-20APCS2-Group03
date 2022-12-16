Như ý nghĩa của tên được đặt , data class là class chứa dữ liệu. Sự khác biệt so với lớp bình thường là class này tự động tạo ra một số method tiêu chuẩn và method tiện ích bắt nguồn từ chính dữ liệu.
![](https://images.viblo.asia/c960333f-0353-4177-98c4-7ff45e6aae66.png)

Trong bài viết này, mình sẽ chia sẻ kỹ hơn về các method defaut được tạo trong data class. 

Okey, let do it!  ^^

Vậy ta thống kê lại, ta có thể làm gì với data class : 
* Data class lưu giữ data (tất nhiên rồi ^^)
* Tự sinh ra get và set 
* Override các method hashcode(), equals() and toString()

Và giờ mình sẽ đi lần lượt các method defaut trong data class 

## 1 Copy()

Function Copy()  không phải là hàm tạo ra copy hay clone object. Mục đích của hàm này là tạo ra 1 đối tượng "gần giống" đối tượng cũ.  Nó được sử dụng trong trường hợp chúng ta cần sao chép một đối tượng thay đổi một số thuộc tính của nó, nhưng giữ nguyên phần còn lại.

Ví dụ 
![](https://images.viblo.asia/267a2734-2e05-4729-954a-1c4a052f8f24.png)

## 2 ComponentN function(s)

componentN() các hàm tương ứng với các thuộc tính theo thứ tự khai báo của chúng trong class . 

![](https://images.viblo.asia/59008a36-5e94-472d-8d3f-3c5fdff1a690.png)

Thứ tự các component theo thứ tự từ trái sang phải. 

Một số lưu ý : 

* Số lượng các component được tạo ra đúng bằng số đối số được khai báo trong constructor class 

![](https://images.viblo.asia/01345d5a-22af-4c94-8840-3c786f07dedf.png)

* Nếu sử dụng equals() để kiểm tra 2 object, thì có chỉ kiểm tra khác nhau đối với các đối số, các value còn lại ko được tính 

![](https://images.viblo.asia/47b427fb-315b-42a8-9e76-653b0df51614.png)

2 object có value khác nhau, nhưng được coi giống nhau 

Nguồn bài viết : https://proandroiddev.com/kotlin-data-class-behind-the-mask-51a05ad92ae9