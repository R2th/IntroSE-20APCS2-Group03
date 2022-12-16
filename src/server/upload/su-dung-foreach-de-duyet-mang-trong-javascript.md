- **For loops** -  Cú pháp chuẩn của việc sử dụng **for loop** để duyệt qua một mảng:
![](https://images.viblo.asia/9c2fd6a3-d383-4d99-baeb-cbfe66d70fd2.png)

- Đối với các bài toán lặp mà đã biết điểm dừng thì việc sử dụng **for loop** rất hữu ích, ít lỗi hơn và thời gian thực hiện nhanh hơn.

## .forEach() method là gì?
- Là một phương thức tích hợp cho Array class, **.forEach()** được giới thiệu trong **ECMAScript2015 (ES6)**.
- Theo như [Mozilla documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach), phương thức lấy một callback làm đối số. Chúng ta không cần đi quá sâu, **callback** là một function thực thi trên từng phần tử. Function này có một tham số bắt buộc **value**, với 3 thám số tùy chọn là **index, base array** và **this**.

## Ví dụ cơ bản
- Để minh hoạ cho cách sử dụng cơ bản của phương thức **.forEach()**, hãy định nghĩa một mảng số nguyên và in ra giá trị bình phương của mỗi phần tử bằng console như dưới đây:
![](https://images.viblo.asia/83e2fa6c-8ede-4edc-b8c0-cfec819bf4b4.png)

## Including the index
- Điều gì sẽ xảy ra nếu chúng ta muốn in ra **index** của item? Chúng ta sẽ thêm tham số tùy chọn thứ hai trong function đã định nghĩa:
![](https://images.viblo.asia/119cdfb2-ee00-488e-9198-756017c3d944.png)

## Storing Values with .forEach()
- Sẽ như thế nào nếu bạn không muốn in tất cả mọi thứ, nhưng lưu kết quả trong một biến mới?
![](https://images.viblo.asia/e1036e40-fd33-4944-9269-4a5871dd5c71.png)

- Như bạn có thể thấy ở ví dụ trên, phương thức **.forEach()** không trả về giá trị. Nếu bạn muốn trả về giá trị hãy sử dụng phương thức **map**. Tuy nhiên nếu bạn phải bắt buộc thông qua phương thức **.forEach()** bạn vẫn có thể làm như sau:
![](https://images.viblo.asia/31435cdb-e01f-49d8-8763-7b0ef67e13f4.png)

## Condensing the Callback Function
- Nếu bạn muốn code ngắn gọn hơn nữa, xem xét thay thế callback function bằng **arrow function**:
![](https://images.viblo.asia/5b0460a6-098e-40e0-9d3f-308230a1ef9f.png)

- Hơn nữa, nếu bạn chỉ sử dụng **value** (no optional parameters), bạn có thể bỏ qua dấu ngoặc đơn của **value**, và nếu vòng lặp của bạn chỉ là một câu lệnh, bạn có thể bỏ qua dấu ngoặc nhọn. Hãy quan sát ví dụ dưới đây:
![](https://images.viblo.asia/2451f3ec-d350-420b-b188-1ec9b4e78b2f.png)

## Có nhược điểm gì không?
- Câu trả lời là có, luôn có sự đánh đổi trong cách viết code của bạn. Một nhược điểm tôi đã gặp phải nhưng thực ra nó không hẳn là nhược điểm, nó chỉ khuyến khích cách viết tốt hơn - khi sử dụng vòng lặp **.forEach()**  bạn không thể sửa đổi giá trị ban đầu trong mỗi chỉ mục như trong một vòng lặp for như thế này:
![](https://images.viblo.asia/1fd5e13d-aa8c-469b-bc66-b9256735a13d.png)

***Update: Vòng lặp for...of được giới thiệu in ES6 thay thế cho .forEach() như một [quy ước đơn giản hơn mà cũng hiệu quả hơn](https://medium.com/better-programming/use-for-of-to-loop-through-your-javascript-arrays-57ebb900ab5a). Cảm ơn các bạn đã đọc!***

##  Tham khảo
- Source: [Stop Using For Loops to Iterate Over Arrays](https://medium.com/better-programming/stop-using-for-loops-to-iterate-over-arrays-5c46940e79d1)