![](https://images.viblo.asia/bc6313be-8413-4269-84ef-9cca639fce9c.png)

## 1. Postman Flows là gì?

* Những người đã từng làm việc với chuỗi các Request, chia sẻ giá trị và tham số giữa các Request hay truy xuất dữ liệu từ Response, sẽ đồng ý với mình rằng đây không phải là một nhiệm vụ dễ dàng thực hiện và cần ít nhất một số **kiến thức cơ bản về JavaScript** để triển khai.
* Vì vậy, Postman sẽ làm cho cuộc sống của chúng ta trở nên dễ dàng hơn bằng cách giúp cung cấp tính năng Postman Flows (hiện đang ở phiên bản beta), được nghiên cứu và phát triển trong nhiều năm.
* Về cơ bản, Postman Flows là một tính năng cung cấp giao diện canvas với các widget mà bạn có thể kéo thả các component và kết hợp chúng lại với nhau tạo thành một chuỗi các hành động để tiện theo dõi và kiểm tra.
* Trước đây, nếu các bạn muốn tạo một chuỗi các Request với Postman hoặc muốn lấy value từ Response để pass tiếp cho những Request sau,... bạn phải biết sử dụng Javascript và phải code tay.
* Với sự ra đời của Flows, bạn có **một cách tiếp cận khác để tạo chuỗi các Request, hành động** lại với nhau mà **không cần phải hiểu và viết code**. Giúp một số đối tượng không nắm rõ về code vẫn có thể tiếp cận và sử dụng Postman với nhu cầu tạo chuỗi các Request (Ví dụ như QA, QC, Tester,...)

![](https://images.viblo.asia/6ed8d5c4-abdf-4c98-aa2f-a3f5b6bdfd3c.png)

## 2. Postman Flows ở đâu trong giao diện Postman? 
Flows hiện tại đã có mặt trên cả 2 phiên bản Web và Desktop App. Để mở giao diện Flows và sử dụng, chúng ta thực hiện các bước:
* Chọn Workspace 
![](https://images.viblo.asia/7f26418f-e185-44d8-b2ef-e95d941048bb.png)

* Chọn hoặc tạo mới một Workspace, nơi bạn sẽ sử dụng Flows
![](https://images.viblo.asia/9b639ed9-7da3-40aa-9361-71bd5b3efae1.png)
 
* Chọn Flows trên menu ngang bên trái
![](https://images.viblo.asia/398f9d4a-16b6-4bc3-af1a-7cf8739409ef.png)

* Nhấp vào "Create" để tạo và mở cửa sổ canvas để tạo Flows
![](https://images.viblo.asia/e43566a4-ec9a-498d-82cb-364b9272922b.png)

* Giao diện canvas để tạo Flows
![](https://images.viblo.asia/675078f8-4c8b-4530-ba53-ae3e45977dc1.png)
## 3. Cấu trúc của một Flows là gì?
Flows trong Postman hoạt động dưới dạng một **chuỗi các block** được kết hợp với nhau theo mối N-N. Hiện tại Postman đang hỗ trợ một số block với vai trò và nhiệm vụ khác nhau, cụ thể như sau:

![](https://images.viblo.asia/46098f37-2a59-43c3-a47d-e80bd7bd59db.png)

* **Send Request:** block này thêm một request đã tạo trong Collection Request, nghĩa là bạn phải tạo Request trong Collection thì mới import được vào Flows.
* **Terminal:** block hỗ trợ hiển thị thông tin
* **Create Variables:** block hỗ trợ tạo biến và sử dụng các biến đó để chia sẻ dữ liệu giữa các Request
* **Parse JSON:** block hỗ trợ phân tích cú pháp đầu ra JSON mà không cần viết một dòng code nào.
* **Delay:** block này có thể được sử dụng để thêm độ trễ giữa các Request. Khoảng thời gian delay được xác định bằng milisecond.
* **Validate:** block này hỗ trợ xác thực và lọc Response của các Request theo True và False
* **For Each:** thay vì cố gắng tìm hiểu cách hoạt động của câu lệnh “for each” trong JavaScript, bạn chỉ có thể sử dụng block này để lặp lại từng phần tử trong list dữ liệu của mình
* **Combine:** block Combine được sử dụng để kết hợp 2 output thành một output duy nhất
* **Annotation:** block này có thể được sử dụng để thêm chú thích vào các vị trí khác nhau trong luồng để mô tả cách nó hoạt động. Hoạt động giống comment trong code

Tất cả các block có 4 nút chung sau:

![](https://images.viblo.asia/d4485099-5c67-46b9-9f1f-f55627d27643.png)

1. Mở cửa sổ Chi tiết, nơi bạn có thể xem thông tin chi tiết hơn của block, các thông số đầu vào và đầu ra của nó cũng như cấu hình
2. Mở ra một menu chọn, từ đó bạn có thể chọn để xem thêm thông tin về block, có thể copy hoặc delete,...
3. Cho bạn biết block đang active nhưng không mang data. Nó sẽ tắt khi bạn chọn sử dụng nút số 4 để tạo chuỗi với một block mới
4. Hỗ trợ bạn có thể tạo chuỗi với một block mới mà không cần lấy dữ liệu từ khối được tạo chuỗi

## 4. Sử dụng các block để tạo Flows như thế nào?
Sau đây là áp dụng Postman Flows vào một ví dụ cụ thể:

**Bài toán**
Bạn có một website về Blog. Bạn muốn tạo một chuỗi hành động bao gồm:
1. Lấy danh sách các Blog từ một **Request**
2. Sau đó **Validate** từng Blog trả về xem Blog nào có lượt view > 10k 
3. Cuối cùng là **In ra màn hình** danh sách Blog có lượt view > 10k để kiểm tra

Với một chuỗi hành động đó, các bạn sẽ tạo một Flows như sau:
1. Tạo block **Send Request** lấy danh sách các Blog bằng **Request GetListBlog**

![](https://images.viblo.asia/2658d8d6-8c86-4d95-8d29-eb7f6971f420.png)

![](https://images.viblo.asia/b0b0572a-ac0f-4720-a9bb-427aece49c1e.png)

2.1. Tạo block **For Each** để lấy từng item theo response từ block trước

![](https://images.viblo.asia/51d34ace-cd4c-459a-94d8-06f0eb1f8255.png)

2.2. Tạo block **Validate** từng item theo data trả về từ block trước

![](https://images.viblo.asia/ee943592-284b-40e0-b89a-e5641c56725e.png)

3. Tạo block **Terminal** để in ra terminal list Blog true hoặc false theo điều kiện Validate ở block trước

![](https://images.viblo.asia/5d3004bf-0b9a-427e-9d0b-09f933ec5c54.png)

![](https://images.viblo.asia/4f612f71-e42d-48e5-83bc-6264399208d8.png)

Sau khi bạn đã tạo thành công Flow, bạn chỉ cần Start Flow và xem kết quả ở Terminal
* Start Flow

![](https://images.viblo.asia/60afbbdc-87ef-4781-a9ef-61fdfb986817.png)

* Xem Terminal

![](https://images.viblo.asia/e7970172-242a-4e91-af0d-8413fa39d868.png)

![](https://images.viblo.asia/366ffbff-99c9-49cb-b84b-4ee6949de0de.png)

**Lưu ý:**  Trong thực tế, bạn cần config input, output, setting... mỗi block theo nhu cầu thực tế của mình thì mới sử dụng được. Ở ví dụ trên, mình đã skip bước này, vì mỗi block có những setting và config khác nhau, các bạn tự tìm hiểu thêm nhé :D

Như các bạn đã thấy, với khả năng của Flows, chúng ta không cần một dòng code nào cũng có thể tạo một chuỗi xử lý các Request và Response để kiểm tra và sử dụng. Trên đây chỉ là một ví dụ đơn giản về sức mạnh của Flows, bạn hoàn toàn có thể tùy biến và tận dụng nhiều hơn nữa sức mạnh của tính năng mới này. Bài viết của mình đến đây là kết thúc, cảm ơn các bạn đã theo dõi :D

## Tài liệu tham khảo
[1]. [Postman Flows Guide](https://beththetester.com/2021/09/27/postman-flows/)

[2]. [Test-driving the Latest Postman Release: v9 and Flows](https://www.youtube.com/watch?v=j-fkJLbOpjk)

[3]. [Meet Flows: Postman’s New Cool Feature](https://betterprogramming.pub/postman-flows-54ede6e0b558)