### Environment
Chức năng chính của Environment là 1 chỗ lưu “biến” giống như “biến” trong code để mình có thể tái sử dụng ở nhiều nơi.

Ứng dụng:

– Nhanh chóng chuyển qua lại giữa các môi trường Dev và Product mà không cần tạo lại các request mới vì phải thay đổi lại URL.

– Giúp lưu lại giá trị của response API trước để điền vào API sau. (Phần này có kết hợp với phần Pre-request và Tests, sẽ được giới thiệu ở các phần tiếp theo).

– Không phải sửa giá trị của các tham số quá nhiều lần.

Ở Postman sẽ chia làm 2 loại Environments: Local và Global

* Local: Phạm vi ảnh hưởng chỉ có khi chọn đúng Enviroments.
* Global: Phạm vi ảnh hưởng đến toàn bộ các project có trong Postman, nhưng nếu có 2 biến cùng tên ở Local và Global thì sẽ ưu tiên lấy Local.

Vị trí của Environment trong khung làm việc của postman.
![](https://images.viblo.asia/0918810e-1198-4eff-881b-9f55983b1211.png)
### 1. Tạo 1 Environment 
* Bước 1: Mở Manage Environments

![](https://images.viblo.asia/523c0338-3540-413a-87cf-f6493037cb0f.png)

* Bước 2: Add thêm Enviroment mới
![](https://images.viblo.asia/942c76d3-dc9d-42bf-9ae8-663b285bc6f3.png)

* Bước 3: Điền tên của Enviroment, tên và giá trị của biến.

     Ví dụ với biến url có giá trị là 192.168.1.77
     ![](https://images.viblo.asia/61bfb99c-78a8-43be-9281-dbb5c9bdd359.png)

Dấu checkbox thể hiện rằng: có active cái biến đó hay không. Trong ví dụ trên: đang active biến url và có thể sử dụng biến này trong môi trường Demo-dev.

### 2. Các vấn đề cần quan tâm 
***2.1. Lấy giá trị của các biến trên như thế nào trong request?***
- Trả lời: Chỉ cần viết theo cú pháp  {{tên_biến}}: ví dụ: {{url}}
![](https://images.viblo.asia/51e54fe8-4a84-4855-af17-3aa133df1a4c.png)

Như trong hình:
1. Chỗ chuyển đổi qua lại giữa các Environment
2. Cách lấy giá trị biến. Lấy đúng sẽ có màu da cam, đưa chuột hover vào thì hiển thị giá trị của biến.
3. Nếu tên biến có màu đỏ có nghĩa là không có biến này trong Environment, chuyện này thường xảy ra khi chuyển đổi qua lại giữa các môi trường của các dự án khác nhau, hoặc đã inactive cái biến đó.

***2.2. Làm thế nào để biết được giá trị của các biến trong 1 enviroment nào đó?***
- Trả lời:

    Cách 1: vào lại Manage Enviroment giống như việc Add Enviroment
    
    Cách 2. Click vào icon con mắt
![](https://images.viblo.asia/970fc2a3-09b1-457b-80a6-ec4e8c705f7d.png)

Muốn sửa thông tin của Environment bạn có thể click vào nút Edit để sửa.

***2.3. Có thể làm những gì với 1 Enviroment?***
- Trả lời:
Postman cung cấp những chức năng đơn giản cho 1 Environment như: import – export, duplicate, add, edit, delete.
![](https://images.viblo.asia/f1e1e309-b378-471a-b6a6-b8843e908645.png)

### Test Response
Test response là tính năng đặc biệt quan trọng với những người test API. Làm sao có thể suốt ngày run từng cái request rồi check từng kết quả trả về một cách thủ công được, có cách gì nhanh hơn không?

Phần này cung cấp 2 tính năng cực hay giúp người test đẩy nhanh được tốc độ test API.

1. Check tự động kết quả trả về của từng field với 1, 2 dòng code, rất dễ, không cần biết code cũng làm được.
2. Lưu giá trị của Response thành biến trong Environment để tiếp tục truyền vào param của API tiếp theo.
![](https://images.viblo.asia/4dcb6cff-847e-429e-98dc-bb8e698f7a02.png)

Postman cung cấp một khung làm việc để ta có thể làm việc, chỉ hỗ trợ ngôn ngữ Javascript thuần, không hỗ trợ jquery hay các thứ khác. Và nó không có chế độ debug hay có console → Nếu muốn biết chắc code mình chạy đúng, hãy viết trước ở ngoài nhé.

Phần ở bên phải là tập hợp những cú pháp Postman cung cấp sẵn cho người dùng, khỏi cần phải nghĩ.

Vào bài toán cụ thể

**Bài toán 1: Tôi có 1 API login, tôi muốn biết là sau khi login vào xong, user_id của tôi trả về có đúng hay không.**

Bước 1: Chạy thử API 1 lần để lấy được cấu trúc Response của API.
![](https://images.viblo.asia/4776c819-4cb6-4196-ab8c-25c343596da4.png)
Ta có thể thấy user_id nằm ở vị trí: root > data > user > profile > id và trong trường hợp này id của user này là 401.

Bước 2: Viết Test

![](https://images.viblo.asia/6a52efe4-22bb-45f2-9a22-30dab6dc73ab.png)

Code:

```
1 var jsonData = pm.response.json();
2 pm.test("Check user_id", function () {
3 pm.expect(jsonData.data.user.profile.id).to.eql(401);
4 });
```
Chú thích: 

1: Parse cái Reponse trả về và lưu vào biến “jsonData” → cái này chính là root đã viết ở trên.

2: Test xem user_id có bằng 401 không.

Cách lấy giá trị hoàn toàn giống như trong Javascript thôi. Bạn có thể đọc thêm ở đây về cách xử lý Object của Json. http://goessner.net/articles/JsonPath/

Bước 3: Sau khi viết xong Test thì các bạn run Request lại rồi ngó xem phần Test của mình có đúng không.
![](https://images.viblo.asia/ef394f73-60c7-49b3-831d-feee9558b7ff.png)
Theo kết quả thì Test của mình đang Fail, mình viết đúng rồi mà nhỉ. 

Đây là điểm mà các bạn mới làm sẽ hay gặp, đó là vấn đề ngay tại cái công cụ giúp mình test. Trong trường hợp này, đó là giá trị trả về nó là 1 String, mình không thể so sánh String và Int được. Hãy ngó lại cái ảnh phía trên, bạn sẽ thấy id là “401”, ta chỉ cần thêm dấu nháy kép vào lại phần test của mình là xong.

```
1 var jsonData = pm.response.json();
2 pm.test("Check user_id", function () {
3 pm.expect(jsonData.data.user.profile.id).to.eql("401");
4 });
```
![](https://images.viblo.asia/df254549-46da-4d0f-81c0-46377726b9d4.png)

**Bài toán 2: Tôi có 1 API login, sau khi login tôi muốn lưu lại giá trị của token để làm data cho những API tiếp theo.**

Vẫn dùng ví dụ ở trên, ta sẽ thấy vị trí của token là: root > data > token.

![](https://images.viblo.asia/7ca85a6a-2bde-4f19-9040-3098ef41d4dd.png)

Ta sẽ viết thêm 1 code vào phía dưới 2 dòng code mình đã viết ở trên:

```
1 var jsonData = pm.response.json();
2 pm.test("Check user_id", function () {
3  pm.expect(jsonData.data.user.profile.id).to.eql("401");
4 });
5 pm.environment.set("token", jsonData.data.token);
```

Sau đó, ta chỉ run lại rồi kiểm tra trong Environment thôi.
![](https://images.viblo.asia/dcd3009c-e9e1-474b-9cfe-860bcaac0adc.png)
Khi đã lưu được biến vào trong Environment rồi thì phần gán biến vào request sẽ giống với phần mình đã hướng dẫn ở Environment 

Trên đây là những hướng dẫn sử dụng Test với Postman.