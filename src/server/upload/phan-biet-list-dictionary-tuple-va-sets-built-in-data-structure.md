Nếu như các bạn đã tìm hiểu qua về Python thì chắc hẳn đã biết đến các bộ dữ liệu như List, Tuple,...
Tất cả các bộ dữ liệu này đều nằm trong một nhóm được gọi là Built-in data structure. Để hiểu rõ hơn về vấn đề trên và phân biệt các bộ dữ liệu thì ở bài viết này mình xin trình bày nó dưới góc nhìn của mình. Đây là lần đầu tiên mình viết bài nên mọi thiếu sót mong các bạn thông cảm ! :D


# Khái niệm

### `List`
   List được hiểu đơn giản là danh sách lưu trữ dữ liệu một cách tuần tự, có các địa chỉ được gán cho các thành phần của danh sách ( được gọi là index ). Giá trị đánh chỉ mục được bắt đầu từ số 0 và việc đánh chỉ mục -1 giúp ta duyệt danh sách từ vị trí cuối cùng. 
  Xem ví dụ dưới đây để cùng hiểu thêm nhé.
  
  Tạo 1  danh sách ![](https://images.viblo.asia/e0f4b3ce-c02f-4838-bf62-3feeaa604b88.PNG)


Output : 

![](https://images.viblo.asia/2cf64548-8cf9-4539-9303-4540a171fd42.PNG)


Về cơ bản nếu như bạn nào đã học về lập trình thì mọi cấu trúc cũng như cú pháp về list ở các ngôn ngữ tương đối giống nhau. Nên mình sẽ đi sâu vào phần so sánh giữa các bộ dữ liệu thôi nhé. :D

### `Dictionary`

Dictionary lưu trữ dữ liệu dựa trên cơ chế key-value. Hiểu đơn giản hơn là danh bạ của bạn. Mỗi số điện thoại ( value ) sẽ tương ứng với một tên người dùng ( key ). Mọi thao tác thêm sửa xóa đều được cho pháp dựa trên key. ( Cái này lạ hơn nên sẽ đi chi tiết hơn nhé ^^ )

Tạo một Dictionary![](https://images.viblo.asia/37662828-1262-442f-9e94-bf5458ad7d80.PNG)

Ouput : 

![](https://images.viblo.asia/7b1a065f-4722-4012-ae7d-3c2771bc6b0c.JPG)

Thay đổi và thêm bộ key-value![](https://images.viblo.asia/c694d01d-5b20-426f-ba9f-ae0478419876.JPG)

Xóa bộ key-value 

1. Sử dụng pop() để lấy ra phần tử trong dict
2. Sử dụng popitem() để lấy bộ key-value trong dict
3. clear() xóa toàn bộ dict

Output:
![](https://images.viblo.asia/41e57080-3aaa-474d-8edf-1794f6bd5278.JPG)

Note : Để truy cập từng phần tử trong dict sử dụng key để truy vấn. Hoăc để thêm sửa, xóa.

### `Tuple`

Cái này mới hay nè ^^. Tuple được hiểu giống như list chỉ khác là các giá trị trong tuple không thể thay đổi được. Nói cách khác Tuple là 1 version khác của list. Hãy xem cách nó hoạt động có gì giống và khác với List không nhé. Một điều đáng nói nữa đó chính là chúng ta chỉ có thể thay đổi giá trị trực tiếp trong Tuple.

Khởi tạo 
![](https://images.viblo.asia/d1439f13-742e-41fe-9349-9192906f631a.JPG)

Output :  1,2,3 ( giống với list đó nhỉ :D)

Truy cập các phần tử cũng giống như ở list

![](https://images.viblo.asia/95eb7a99-115c-4d4c-a1ec-7edad4cc68fb.JPG)

Ouput : 
![](https://images.viblo.asia/fe198886-3655-4fdd-8d75-f00baf0d89a2.JPG)

Bạn nào mà không hiểu tại sao output lại ra như thế thì học lại mấy syntax cơ bản đi nhé ^^

Ok. Như vậy là đã xong 3 cái rồi. Giờ hãy xem thằng Sets nó khác 3 thằng kia như thế nào nhé!

### `Sets`

Sets là một tập các yếu tố không có thứ tự. Có nghĩa là các phần tử lặp lại chỉ được tính 1 lần duy nhất.

Khởi tạo 

![](https://images.viblo.asia/4d785909-a02a-41dc-a9fa-5fc121388dc8.JPG)

Output : 1,2,3,4,5

Các bộ được tạo bằng cách sử dụng các dấu ngoặc hoa nhưng thay vì thêm các cặp khóa-giá trị, bạn chỉ cần truyền các giá trị cho nó.

Thêm 1 phần tử mới ![](https://images.viblo.asia/eb2ad33c-3dca-4aea-9629-e71de50799bc.JPG)

Output : {1,2,3,4}

Thằng Sets này còn 1 số cái hay ho mà nó nó sẽ áp dụng vào từng trường hợp cụ thể nên các bạn đọc thêm ở link mình đặt bên dưới nhé ^^

Đến đây thì mình xin phép kết thúc bài biết. Hi vọng sẽ mang đến cái nhìn rõ hơn về các bộ dữ liệu. ^^

Link tham khảo : https://www.edureka.co/blog/data-structures-in-python/#builtin

Link nâng cao : https://data-flair.training/blogs/python-data-structures-tutorial/