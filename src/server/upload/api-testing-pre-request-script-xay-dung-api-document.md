### 1. Pre-request Script
Dưới đây là các bước khi gửi 1 request. Phần Pre-request sẽ là phần Postman sẽ xử lý trước khi thực hiện gửi request, và phần test script để xử lý response được trả về.
![](https://images.viblo.asia/28274876-10a3-46f4-aa15-ee3ea40dd489.png)
Vậy Pre-request có thể làm được việc gì? Nó xử lý có mỗi 1 phần thôi đó là tạo dữ liệu (biến) để truyền vào param trong request.
![](https://images.viblo.asia/a9e52c88-bc40-41f2-a2e7-61ac83608c35.png)
Có 1 chức năng thôi nhưng cực kỳ hữu ích trong các trường hợp khác nhau.
Ví dụ: Có 1 API tạo ra 1 chuyến đi giống kiểu Grab và Uber, gồm các param dưới đây.

* _user_id
* _token
* Source
* Destination
* Departure_datetime

Requirement:
* _user_id  : có được sau khi login
* _token : có được sau khi login
* Source: Địa điểm xuất phát
* Destination: Địa điểm đến
* Departure_datetime: Thời gian xuất phát của chuyến đi luôn lớn hơn thời điểm hiện tại. 

 Thời gian đầu khi test API này, thì chỉ tạo được 2 biến _user_id và _token sau khi run API login rồi sử dụng phần Test Script để lưu response lại.
 ![](https://images.viblo.asia/683d963e-d8b8-4f12-990c-3fbf6173bbec.png)
Còn 3 biến Source, Destination, Departure_datetime phải tự nhập lại bằng tay mỗi lần run API —> rất mất công sức, nếu không sửa các param trên thì API sẽ bị sai.

Giả sử hôm nay ngày 18 /11 / 2020, chạy API đúng, nhưng sang ngày mai (19 /11/ 2020) chúng ta lại phải đi sửa 1 đống API vì sai ngày.

- Xử lý Departure_datetime

Chúng ta viết ra 1 hàm getToday để đảm bảo lúc nào run Testcase cũng trả về ngày hôm nay mà không cần phải maintain sửa lại API.
![](https://images.viblo.asia/954120ac-e1e8-46f1-883d-1f75e0f78475.png)
- Xử lý Source, Destination

Về bản chất, cả 2 param này đều điền giá trị là địa điểm, nhưng chúng ta không thể chỉ test với 2 địa điểm được, nó sẽ tạo ra 1 đống các chuyến đi giống hệt điểm đến và điểm đi. Chúng ta cần 1 lượng lớn các địa điểm rồi chúng ta sẽ lấy random cho phần Source, Destination.

Chúng ta tạo ra 1 cái array chứa toàn bộ địa điểm (export từ trong DB ra) rồi lấy random và lưu thành 2 biến trong Environment.

Ví dụ:

```
var myArray = [  {
   “source” : “Tokyo, Japan”
 },
 {
   “source” : “Gifu Prefecture, Japan”
 },
 {
   “source” : “Aichi Prefecture, Japan”
 },
 {
   “source” : “Tokyo Disney Resort, Urayasu, Chiba Prefecture, Japan”
}
]

var source = myArray[Math.floor(Math.random() * myArray.length)][‘source’];
var destination = myArray[Math.floor(Math.random() * myArray.length)][‘source’];
postman.setEnvironmentVariable(“source”, source);
postman.setEnvironmentVariable(“destination”, destination);
```

Sau khi hoàn thành hết mình sẽ có 1 API với các tham số động, linh hoạt, chứ không phải là những API với dữ liệu cố định.
![](https://images.viblo.asia/b471a97c-38a2-4153-bcfe-9684799a0fe4.png)

### 2. Xây dựng API Document
Postman ngoài việc cung cấp 1 công cụ test API còn hỗ trợ chúng ta làm API document cực kỳ chuyên nghiệp và dễ dàng. API document này có thể dùng chung cho cả team và khách hàng. Thông thường, API thường do Dev viết trên google sheets nhưng đến 1 giai đoạn phát triển nào đó dev sẽ lười viết docs API hoặc API sửa nhiều, họ sẽ không nhớ để update những sửa chữa đấy.
API Document của Postman có điểm ưu việt hơn khi nó update luôn những gì mình thao tác trên khung làm việc vào API docs. Thực ra là cứ mỗi khi ta tạo ra 1 Collection thì Postman đã tạo Document cho Collection đó rồi, nên việc của chúng ta tương đối nhàn.

Muốn biết tài khoản của chúng ta có bao nhiêu Collections. Toàn bộ Docs API của những Collections sẽ được show ra.
![](https://images.viblo.asia/5d514b6c-0f5c-41fe-80cb-2e637056f62a.png)
* Click vào View Docs để xem API Docs (đây là link của trạng thái Private, link này không share được).
* Click vào Publish để tạo Link share Public (Link này thì ai cũng nhìn được nội dung). Bạn chỉ cần copy cái link rồi gửi cho người khác.
![](https://images.viblo.asia/69e9cda3-6d4a-4392-9195-619e68ff6bb7.png)
Các thành phần của 1 API Document:

* Tên của API Document
* Mô tả của API Docs
* Tên của từng API
* Mô tả của cả API: Mục đích của API, note lại các mục cần lưu ý
* Params + mô tả của params
* Sample Request
* Sample Response

Mô tả:
1. Tên của API Document

Chính là tên của Collection, cách edit đơn giản

Mô tả của API Docs
![](https://images.viblo.asia/8aaa00c4-5672-4d04-8f1d-36daf871933d.png)
Cách Format đoạn Text này dùng Markdown. Bạn có thế xem thử mẫu ở đây http://markdownlivepreview.com/

2. Tên của từng API & Mô tả của cả API

Tên của API chính ta tên chúng ta đặt cho từng Request. Cách Edit
![](https://images.viblo.asia/55fab7d7-9130-4c48-adb5-8a16003d88fd.png)
![](https://images.viblo.asia/a8ad850e-61c7-4080-9caf-53ab2052f2cf.png)

3. Params + mô tả của params

Điền vào phần Param hoặc Body giống như điền API vẫn điền trước đây nhưng khi viết API Docs, lưu ý: KHÔNG điền phần Value.
![](https://images.viblo.asia/26d972e2-fed5-4467-b129-8c5ef3dbd355.png)

4. Sample Request & Sample Response

Đây là tính năng Example mà Postman cung cấp.
![](https://images.viblo.asia/affd8014-24f2-4e03-b810-1d5edceaf667.png)
Add 1 cái Example rồi điền thông tin giống như 1 API thật sự là xong.

5. Sample Request

Lúc này thì bạn phải điền Value cho từng Param, không được bỏ trống.
![](https://images.viblo.asia/7c77bb3f-f344-4293-a8f2-fbbd5c499176.png)

6. Sample Response
Lấy 1 Reposne mẫu theo cái Sample Request phía trên rồi Paste vào là được.
![](https://images.viblo.asia/ef404c44-5415-4623-b2ed-228fac5d13dc.png)
Sau đó, có thể xem lại thành quả ở 1 trong 2 link Public và Private, sẽ có dạng như sau:
![](https://images.viblo.asia/c1dd8a53-7337-4af1-a713-18d025d2e22a.png)
Phần bên trái sẽ là List API có trong dự án, click vào từng API để xem chi tiết.