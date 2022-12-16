Bộ công cụ hoàn hảo cho bước khởi đầu với Functional Programming

![](https://images.viblo.asia/2701e1f3-e9fa-4096-93cb-536c1076fc49.png)

Bài viết này nhắm tới những người mới bắt đầu với Javascript hoặc những người mới bắt đầu làm việc với Javascript nhưng chưa hiểu về map, filter và reduce. 

**Functional programming là gì ?**

Functional programming là một mô hình lập trình trong đó giá trị đầu ra của hàm chỉ phụ thuộc vào các đối số được truyền cho hàm đó , vì vậy việc gọi một hàm định nghĩa số lần sẽ luôn tạo ra cùng một kết quả , bất kể số lần bạn gọi là bao nhiêu . Điều này có vẻ trái ngược với lập trình thông thường , khi mà có rất nhiều hàm hoạt động với trạng thái là local hoặc global , có thể kết thúc trả về các kết quả khác nhau ở các lần thực thi khác nhau . Khi có sự thay đổi trong trạng thái đó có thể sẽ xuất hiện vấn đề và loại trừ những điều đó có thể giúp bạn hiểu và đoán hành vi code của mình dễ dàng hơn .

**Tại sao lại sử dụng map, filter, reduce ?**

Một trong những nền tảng chính của functional programming là việc sử dụng list và cách hoạt động của list . Trong Javascript chúng ta có map, filter và reduce , tất cả các chức năng khi đưa ra một danh sách ban đầu sau biến nó thành cái gì đó khác , nhưng vẫn giữ nguyên list gốc của nó .

**Map** 

Đôi khi chúng ta có một mảng các object muốn sửa đổi / thêm các thuộc tính của từng đối tượng  , cụ thể giả sử chúng ta có thể có một mảng các string mà ta sẽ biến tất cả chúng thành chữ thường  . Trên thực tế có thể có vô số tình huống ở đó Map sẽ giúp chúng ta xử lý 1 cách dễ dàng .

**Sử dụng nó như thế nào ?**

Đây là cách cơ bản nhất để gọi **map** 

![](https://images.viblo.asia/3910b096-f35a-4d6d-b168-6205b64dddb1.png)

Như bạn có thể thấy , map nhận một callback là đối số , Callback sau đó được đưa ra giá trị hiện tại của phép lặp , index của vòng lặp và mảng ban đầu mà từ đó map được gọi . Ngoài ra còn có 1 đối số thứ 2 tuỳ chọn cho map ( sau khi gọi lại ) đó là giá trị để sử dụng **"this"** bên trong callback

**Ví dụ :**

Mảng các object trong javascript :

![](https://images.viblo.asia/5268fba6-2eb5-45ed-9bed-1b3ebb3496cc.png)

Chuyển đổi đơn gian mảng các object sang mảng các strings 

![](https://images.viblo.asia/3d76577f-ace6-43fa-9d09-a3127776e73a.png) 

Áp dụng một phép biến đổi thông qua một hàm util 

![](https://images.viblo.asia/d0f1201d-290b-4a07-b4b5-88ee524c9410.png) 

Chuyển đổi mảng đã cho và thêm sửa , xoá properties cho mỗi oject 

![](https://images.viblo.asia/4328ef66-b04d-4040-aa64-f7d8ecc5d9b0.png)

**Filter** 

Tôi tin rằng trong quá trình bạn code bạn đã gặp tình huống phải lọc 1 số item ra khỏi  mảg ban đầu , vì nó là 1 trong những bài thực hành phổ biến nhất, để làm được điều đó chúng ta phải xử lí khá rắc rối , nhưng với filter thì bạn có thể sử dụng nó 1 cách dễ dàng 

**Sử dụng nó như thế nào ?**

Khá giống với map , nếu bạn đã biết về map chắc hẳn bạn cũng biết filter !

![](https://images.viblo.asia/5acd1240-96de-4297-a949-5798599450ac.png)

Filter nhận các đối số giống như map và hoạt động rất giống nhau . Sự khác biệt duy nhất là callback cần trả về true hoặc false , nếu nó là true mảng không thay đổi nếu là false phần tử đó sẽ được lọc ra khỏi mảng ban đầu .

**Ví dụ :**

Lọc số chẵn :

![](https://images.viblo.asia/09b0c508-f0ee-424e-9c8d-bb76a5155cdc.png) 

Tìm kiếm chuỗi đơn giản 

![](https://images.viblo.asia/38e21ca3-fe0d-4138-a828-55fd3ecb4f86.png)

Lọc mảng các ọbject 

 ![](https://images.viblo.asia/7cd23f51-b27e-4a05-9b32-d53e8faca4eb.png)

**Reduce**

Cuối cùng cũng không kém phần quan trọng, reduce  nhận vào 1 mảng và tính toán thành một giá trị duy nhất. Ví dụ, với một dãy số bạn có thể dễ dàng tính được trung bình của tất cả các giá trị.

**Sử dụng nó như thế nào ?**

Nó cũng khá giống với map và filter nhưng hơi khác ở đối số callback . Callback bây giờ nhận bộ tích luỹ ( nó tích luỹ tất cả các giá trị trả về . Giá trị của nó là sự tích luỹ của các tích luỹ trả về trước đó ) giá trị hiện tại , index hiện tại và cuối cùng là toàn bộ mảng .

![](https://images.viblo.asia/05a14744-0bc0-4738-a783-1db8423a783b.png) 

**Ví dụ** 

Tính toán tổng 1 mảng số nguyên 

![](https://images.viblo.asia/809d19da-23b1-4243-9126-959d1170304b.png) 

Xây dựng 1 object từ 1 array 

![](https://images.viblo.asia/3d40258c-b320-4c90-b08b-9f08b71df72c.png) 

Biến 1 mảng các mảng thành một mảng duy nhất 

![](https://images.viblo.asia/9d6a274a-1ad0-41de-90ff-18b27bd47690.png)

**Tại sai lại sử dụng  map, filter và reduce?**

* Bạn làm việc trực tiếp với giá trị hiện tại thay vì truy cập nó thông qua một chỉ mục (kiểu như array [i]);

* Tránh thay đổi mảng ban đầu, do đó, giảm thiểu những rủi ro có thể xảy ra .

* Không cần quản lí vòng lặp 

* Không cần phải tạo mảng trống rồi đưa nội dung mới vào nó 

* Hãy nhớ rằng nó luôn được trả về trong callback

**Kết luận** 

Tôi hy vọng rằng bạn sẽ thích và học được điều gì đó với bài viết này và có một ý chí để khám phá thêm về lập trình functional trong Javascript. 

Bài viết tham khảo :

https://medium.com/@joomiguelcunha/learn-map-filter-and-reduce-in-javascript-ea59009593c4