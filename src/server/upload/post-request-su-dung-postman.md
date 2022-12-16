Là 1 tester, khi test API chắc hẳn ai cũng nghe đến POST request.

## Vậy POST Request là gì?
**POST** là 1 **phương thức HTTP** giống như **GET** request. **POST** request là 1 phương thức được sử dụng khi bạn cần gửi thông tin thêm vào bên trong body của request đến server. Khi gửi POST request, ta thường có thay đổi trên server như sửa, xóa và thêm. 

Một trong những ví dụ cơ bản của POST là trang Login. Ví dụ Facebook, bạn gửi thông tin cá nhân như password đến server. Server sẽ tạo 1 tài khoản với thông tin như vậy và tài khoản đó sẽ được thêm tạm thời vào server Facebook. Như vậy là bạn vừa tạo resource mới lên server.
Ở đây chúng ta sẽ xem các tính năng khác nhau của POST request và cách tạo chúng trên Postman.

## POST Request trong Postman
Mỗi REST endpoint đều có phương thức HTTP liên quan đến nó. Nếu endpoint mô tả nó được gọi bằng cách sử dụng phương thức POST thì client sẽ chỉ gọi Endpoint với phương thức POST. Hãy cùng kiểm tra điều gì xảy ra khi dùng phương thức GET thay vì phương thức POST cho một POST Endpoint. Và cùng xem điều gì xảy ra khi làm POST Request mà không cùng với Body.

### 1. GET Request on POST Endpoint

1. Sử dụng API http://restapi.demoqa.com/customer/register  (API này được sử dụng để đăng ký 1 khách hàng mới) trong Postman endpoint và nhấn **Send**. Hãy chắc chắn rằng GET được chọn ở drop down Method type thay vì POST.

![](https://images.viblo.asia/22368991-c11a-4806-af4d-6f9902144d75.png)

2. HTTP status code sẽ là **405 Method not allowed** . Điều này có nghĩa là mình đang gọi đến endpoint với method không đúng. Hình dưới sẽ minh họa chi tiết cho bạn thấy

![](https://images.viblo.asia/2d0d0770-6c17-4844-bd75-1db03ccfb9a4.png)

3. Hãy xem kết quả trả về ở **Body** tab phía bên dưới và cùng tập trung vào nội dung fault error.

![](https://images.viblo.asia/bc154081-ba8f-4248-9f84-4c84ca0bbe2e.png)

Điều này có nghĩa là loại method mình sử dụng không đúng và Endpoint này đang mong muốn loại method khác. Vì thế mình sẽ thay đổi để xem nếu kết quả trả về đúng là gì nhé.

### 2. POST Request không có Body

1. Thay đổi loại method thành **POST** và nhấn **SEND**

![](https://images.viblo.asia/dea562c9-a996-4ad6-8734-7b25cbeb88f8.png)

2. Giờ hãy nhìn vào **Response Body** và **Response Status code**.

![](https://images.viblo.asia/f54844d5-5443-4d55-b159-1b158e361e5b.png)

**Fault Invalid Post Request** có nghĩa là dữ liệu post bạn nhập vào không đúng. Bạn cần thêm thông tin vào request body với định dạng đúng và dữ liệu mong muốn và xem kết quả sẽ như thế nào. Ngoài ra bạn cũng có thể thấy status code là **400 BAD Request**. Điều này có nghĩa là tham số request không đúng với tham số server để lấy được kết quả.

### 3. Post Request trong Postman

1. Giờ mình hãy thêm **Request Body** vào phương thức **POST** nhé. Click vào **Body** tab

![](https://images.viblo.asia/60051b78-8b41-4ac8-bef9-6dd0978bd2e3.png)

2. Click vào **raw** và chọn format type là **JSON** do mình phải gửi định dạng đúng với định dạng mà server mong muốn.

![](https://images.viblo.asia/d701ed66-2933-4c43-87e5-b88365bfd5e3.png)

3. Mong muốn Json body bao gồm chi tiết thông tin của người dùng. Bên dưới là ví dụ về Json body. Copy và paste nội dung sau đây vào tab **Body** của Postman.

```
{

   “FirstName” : “value”
   
   “LastName” : “value”,
   
   “UserName” : “value”,
   
   “Password” : “value”,
   
   “Email”        : “Value”
   
 }
```
 
 Thay đổi thuộc tính value thành giá trị bạn muốn (có thể tham khảo ảnh bên dưới)
 
 ![](https://images.viblo.asia/5c6cb12a-4261-4091-b273-a84fe0a1c911.png)
 
 4. Nhấn **Send** và xem kết quả tại **Response Body** và **Response Status**.

![](https://images.viblo.asia/c0377fc7-70b6-4b18-87d8-dc6414f95820.png)

Lỗi **Fault User Already Exits** có nghĩa là trong database đang tồn tại 1 user giống với user bạn muốn tạo. Nếu kết quả trả về **200 OK** nghĩa là server chấp nhận request và trả về kết quả thành công. Ở API Request, **Email** và **Username** là **unique** (duy nhất). Vì vậy bạn có thể thay đổi các giá trị đó.
Nếu giá trị là unique, bạn sẽ nhận được trả về như sau:

![](https://images.viblo.asia/2af854e8-e862-4042-bcce-bdfda30e2502.png)

**Operation completed successfully** có nghĩa là giá trị đầu vào của bạn đã được tạo thành công trong database.

Qua ví dụ trên bạn đã có thể phần nào hiểu về POST request và cần kết hợp nó với Body. Body thì cần phải đúng định dạng với keys đúng để lấy được response đúng từ server. Giờ thì mình đi vào chi tiết về tính năng của Post request trong Postman nhé.
 
 
## Các cách khác nhau để gửi dữ liệu trong POST Request trong Postman
Như đã thảo luận ở trên, việc gửi POST request nghĩa là gửi request với dữ liệu trong body của request. Có thế có loại dữ liệu khác nhau và theo đó thì cũng có các cách gửi dữ liệu khác nhau. Hãy cùng theo các step bên dưới để hiểu thêm nhé.
 
Trước tiên, cần Chọn method request POST

![](https://images.viblo.asia/995eaca5-52cd-462a-a20f-c0b5fd6783f5.png)

KHi chọn POST, bạn sẽ thấy ở Body có các option khác nhau để gửi dữ liệu bên trong body là:
* Form-data
* X-www-form-urlencoded
* Raw
* Binary

![](https://images.viblo.asia/2a908ac6-41cf-4027-968b-0939871831a5.png)

Vậy cùng xem các cách gửi dữ liệu sẽ khác nhau như thế nào:

### 1. Form Data

Form data cũng như tên của nó cho thấy nó được sử dụng để gửi dữ liệu mà bạn đang gói bên trong biểu mẫu giống như các chi tiết bạn nhập khi bạn điền vào biểu mẫu. Các chi tiết này được gửi bằng cách viết chúng dưới dạng cặp KEY-VALUE trong đó khóa là "name" của mục bạn đang gửi và value là giá trị của nó. Xem các bước dưới nhé.

1. Chọn **Form-data**

![](https://images.viblo.asia/3dc99bab-c598-462c-92c8-cf770f662aa1.png)

2. Thêm cặp **KEY-VALUE**

* First name: Harish

* Last name:  Rajora

![](https://images.viblo.asia/d9f371e2-bbdd-4477-a8df-f1946f4f64a1.png)

Ở đây, first name dạng text cần được nhập vào và giá trị của nó ví dụ là Harish. Tương tự Last name

### 2. x-www-form-urlencoded

**Form data** và **x-www-form-urlencoded** rất giống nhau. Cả 2 đều được sử dụng với mục đích hầu như giống nhau. Khác nhau là URL sẽ được mã hóa khi gửi qua **x-www-form-urlencoded**

![](https://images.viblo.asia/9becba21-93e8-4f61-9aac-3cd966185aa5.png)

### 3. Raw

**Raw** là option hay được dùng nhất. **Raw** nghĩa là body message để chỉ ra một luồng các bit biểu diễn phần request body. Các bit này sẽ được hiểu là một string server

1. Click vào drop down bên cạnh binary và ta có thể nhìn thấy tất cả các option bạn có thể gửi request

![](https://images.viblo.asia/0a951c16-7218-4880-8a0e-e7dc45b1f1c7.png)

2. Chọn **JSON(application/json)**

![](https://images.viblo.asia/a59c8793-3c4e-4867-b6bf-c1ff82ffd303.png)


3. Copy và paste vào ô nhập dữ liệu

```
{

                “first name”: “Harish”,
                
                “last name”: “Rajora”
                
}
```

![](https://images.viblo.asia/9bded358-9b81-43c2-bce5-a24769a93561.png)

### 4. Binary

**Binary** được thiết kế để gửi thông tin theo định dạng không thể nhập theo cách thủ công. Vì mọi thứ trong máy tính được chuyển thành nhị phân, ta sử dụng các tùy chọn này khi không thể được viết theo cách thủ công như hình ảnh, tệp, v.v. Để sử dụng tùy chọn này

1. Click vào binary, chọn **CHOOSE FILES**

![](https://images.viblo.asia/46541109-eb92-4c6e-92cd-410c043222fe.png)

2. Chọn file bất kỳ như 1 file ảnh chẳng hạn

![](https://images.viblo.asia/af735b44-27ce-47e6-9e8c-a37d08c5e6d3.png)


Luôn luôn nhớ những gì server của bạn đang mong đợi. Bạn không thể gửi một định dạng khác so với những gì serer của bạn mong đợi, nếu không sẽ không có phản hồi hoặc phản hồi không chính xác mà rõ ràng có thể được nhìn thấy bằng mã trạng thái của phản hồi. 

Vậy là chúng ta đã cùng xem xét phương thức POST và cách sử dụng nó trong Postman. Chúc các bạn test API với nhiều niềm vui ^^


*Nguồn tham khảo:*
http://toolsqa.com/postman/post-request-in-postman/