# I. Lời mở đầu
* Trong bài viết này mình xin giới thiệu một vài best practice để apply cho string.xml. Các best practice này tuy nhỏ nhưng sẽ góp phần cải thiện đáng kể khả năng maintain và hỗ trợ đa ngôn ngữ của app sau này.
# II. Nội dung chính
### 1. Không sử dụng lại
a. Chúng ta không nên sử dụng cùng một string cho các màn hình khác nhau. Giả sử chúng ta có loading dialog trong hai màn hình Sign In và Sign Up cùng dùng một string R.string.loading

![](https://images.viblo.asia/5e2f0ead-3129-44c2-b9ec-d18d50ab76aa.jpg)

Trong quá trình phát triển, nếu chúng ta muốn sửa nội dung loading dialog của một trong hai màn hình thì chúng ta sẽ phải định nghĩa thêm trong string.xml và sửa lại trong java code. Điều này gây ra sự lãng phí thời gian không đáng có nếu như từ đầu chúng ta định nghĩa 2 string riêng biệt cho 2 màn hình.

![](https://images.viblo.asia/93e7f2eb-a8e8-4750-8d1e-b2b7c39350e0.jpg)

b. Hãy nghĩ đến khả năng hỗ trợ đa ngôn ngữ. Chúng ta sẽ không thể biết trước về những ngôn ngữ mà ứng dụng có thể hỗ trợ. Mỗi một ngôn ngữ sẽ có những đặc trưng riêng, chúng ta có thể sử dụng cùng một từ cho nhiều ngữ cảnh với một vài ngôn ngữ nhưng với một vài ngôn ngữ khác thì mỗi từ chỉ có thể sử dụng trong một ngữ cảnh nhất định.

![](https://images.viblo.asia/3b456321-b7b5-4e24-9d01-b9140ca82011.jpg)

Với tiếng Anh, từ “Yes” có thể sử dụng trong rất nhiều ngữ cảnh khác nhau. Nhưng với tiếng Ukraina thì sao? Sẽ cần 2 từ để dùng cho 2 ngữ cảnh khác nhau

![](https://images.viblo.asia/aa3f4191-c086-493c-ac22-07c7bd0cc767.jpg)

### 2. Gom string theo từng màn hình với prefix và chú thích
![](https://images.viblo.asia/400760d5-3172-4ec2-89fb-0dfd22bc02e9.png)

a. Thêm prefix (theo màn hình) cho string sẽ giúp chúng ta dễ dàng phân biệt từng màn hình với nhau.

b. string.xml rõ ràng sẽ giúp cho chúng ta dễ dàng maintain và chuyển đổi qua các ngôn ngữ khác.

### 3. Định dạng
* Luôn sử dụng *Resources#getString(int id, Object... formatArgs)* để định dạng string. Không bao giờ sử dụng dấu + để ghép string, việc này sẽ dẫn đến sai ngữ nghĩa đối với một vài ngôn ngữ.

![](https://images.viblo.asia/f3dec9c2-04b6-45ae-8cfb-fca811c24343.png)

![](https://images.viblo.asia/78e75c2e-eb19-4165-8fe2-6a702fe7c9ed.png)

![](https://images.viblo.asia/64e7d8d3-6fac-4737-a74a-e36724657746.png)

![](https://images.viblo.asia/ffdeb82d-db24-4474-8689-f5a6b5d2dc01.png)

![](https://images.viblo.asia/fa7c92ed-f25a-460d-9d66-3c2625d523d5.png)

### 4. Định dạng số nhiều
* Sử dụng *Resources#getQuantityString (int id, int quantity)* với các string thể hiện số lượng. Việc hiện thực các string thể hiện số lượng trong java code sẽ gây ra sai ngữ pháp về số nhiều ở một vài ngôn ngữ.

![](https://images.viblo.asia/64d2ddb8-73fc-4364-b6b1-d32306e0ecde.png)

![](https://images.viblo.asia/bec3a644-86d9-4812-a94e-e4f4755bf10e.png)

* Để giải quyết vấn đề này, chúng ta sẽ sử dụng *Resources#getQuantityString (int id, int quantity)*.

![](https://images.viblo.asia/63367936-4f7f-417f-8dbf-bb82ff01b617.png)

![](https://images.viblo.asia/69074315-3b1b-4fd0-acdb-b5eb97575316.png)

### 5. Tạo điểm nhấn cho string
* Sử dụng html text để tạo điểm nhấn cho các từ cố định. Nếu chúng ta muốn thay đổi màu sắc của một vài từ trong *TextView* thì *ForegroundColorSpan* không phải là một lựa chọn tốt, bởi vì cần sử dụng chỉ số để đánh dấu và điều này sẽ gây ra sự nhầm lẫn với một vài ngôn ngữ. Cách tốt nhất là sử dụng *html font color tags* trong string.xml. Giả sử chúng ta có string “Discover and play games.” và muốn hiển thị “Discover” và “play” với màu xanh

![](https://images.viblo.asia/58e9a97a-7ae9-4af3-a44b-d135865a7ebe.png)

![](https://images.viblo.asia/ede5c86f-4c73-4d35-9adf-01c54484a567.png)

# III. Kết
* Hy vọng với nhưng best practice mình trình bày trong bài viết này sẽ giúp các bạn có thêm kinh nghiệm để phát triển các ứng dụng hỗ đa ngôn ngữ thân thiện với người dùng.
* Nội dung bài viết có tham khảo tài liệu của tác giả [Dmytro Danylyk](https://medium.com/@dmytrodanylyk)