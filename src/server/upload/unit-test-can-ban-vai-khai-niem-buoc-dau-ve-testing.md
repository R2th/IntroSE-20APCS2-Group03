Hẳn mọi developer đều từng nghe về **unit test** và những lợi ích nó mang lại. Mình cũng vậy, dạo gần đây mình đã bắt đầu tìm hiểu về unit test và áp dụng cho project của mình. Hôm nay, mình chia sẻ lại những điều mình đã học được cho mọi người, qua series unit test cơ bản này nhé.

Trong bài viết đầu tiên này, mình sẽ giới thiệu cho các bạn tổng quan về unit test, vài khái niệm căn bản cần biết trước khi bắt tay vào thực hiện. Okay cùng bắt đầu thôi.

## 1. Tổng quan về testing

### 1.1. Testing là gì?

Testing là một bước quan trọng trong quá trình phát triển phần mềm, dùng để kiểm tra xem phần mềm, code viết ra có hoạt động đúng yêu cầu hay không.

![](https://images.viblo.asia/95d879e9-aab5-4c04-91ed-be53075668a3.png)

Phần mềm tốt luôn phải có khâu testing trước khi release sản phẩm. Không ai muốn nhận hay sử dụng một phần mềm đầy lỗi, phải không?

> Ơ thế thì có tester làm là đủ rồi, lập trình viên cần chi phải biết test?

Quan điểm lập trình viên không cần biết test, cụ thể hơn là viết unit test khá phổ biến. Một số lý do có thể kể tới như:

* Tự tin vào code mình viết sẽ không có lỗi
* Thích viết code ngay lập tức thay vì phân tích
* Sợ tốn thời gian, deadline dí tới nơi rồi ở đó mà test :joy:

Quào, trước hết phải nói quan niệm này là không đúng. Theo mình, mọi lập trình viên đều nên biết unit test, và viết khi có thể. Điều đó mang lại nhiều lợi ích, giúp giảm công sức tìm, báo cáo, fix, review qua lại giữa dev và tester, và những lợi ích khác được đề cập ngay bên dưới đây.

### 1.2. Các loại test

Testing chia thành 2 loại chính là black box và white box:

* **Black box testing:** Thực hiện test mà không biết mã nguồn, cách code chạy như thế nào. Chỉ quan tâm input đưa vào và output trả về có đúng hay không.
* **White box testing:** Thực hiện test mà biết mã nguồn, hiểu được code chạy theo luồng thế nào (for, if else,...). 

Hai loại test trên sẽ có cách thực hiện cũng như kĩ thuật thực hiện khác nhau.

Ngoài ra testing cũng được chia thành các mức độ, có 3 mức phổ biến xếp từ thấp lên cao:

* **Unit test:** test từng đơn vị code (unit) nhỏ nhất (function, method, class,...). Đảm bảo từng code unit đó chạy đúng (chạy riêng rẽ với nhau).
* **Integration test:** test code khi tương tác với các thành phần khác (code unit khác, database hoặc file). Đảm bảo khi tích hợp các phần có liên quan lại thì sẽ hoạt động được chính xác cùng nhau.
* **UI test:** test ở mức toàn hệ thống, dưới góc độ của người sử dụng. Đảm bảo ứng dụng hoạt động bình thường, đúng yêu cầu đặt ra. Ngoài ra có thể kiểm tra thêm các thông số khác như bảo mật, hiệu suất.

![](https://images.viblo.asia/ebc141ef-9432-434f-9f7b-afe41725ebe4.png)

Ngoài ra còn có nhiều loại test khác nữa, như non-functional test, smoke test, end to end (e2e) test,... Các bạn có thể tìm hiểu thêm.

Nếu xét về mặt thực hiện, thì sẽ có **manual test** (test thủ công) và **automation test** (tự động). Tester thì chi tiết ra sao mình không rõ, nhưng với lập trình viên khi viết unit test thì chắc chắn là tự động rồi (test thủ công thì viết unit test làm gì cho mệt).

## 2. Giới thiệu unit test

### 2.1. Unit test là gì?

Unit test là một dạng **white box testing**, do lập trình viên viết ra, dùng để test đơn vị nhỏ nhất của code (unit), thường là một function, method hoặc class.

Một điểm quan trọng khi viết unit test đó là **tính độc lập**. Mỗi code unit cần được thực hiện độc lập với nhau, không phụ thuộc vào nhau. Nếu có sự phụ thuộc thì sử dụng kĩ thuật **Mock**, thay thế function phụ thuộc bằng function fake.

```js
function sum(a, b) {
    return a + b;
}

function sumThree(a, b, c) {
    return sum(a, sum(b, c));
}
```

Như ví dụ trên, hàm `sumThree()` phụ thuộc vào `sum()`. Do đó mỗi test cần riêng rẽ với nhau, nên kết quả test `sumThree()` thì không được phụ thuộc vào kết quả của `sum()`.

Về cơ bản là thế, còn cách sử dụng mock ra sao, mời các bạn đón đọc những bài viết sau trong series nhé.

### 2.2. Lợi ích của unit test

Lúc đầu tìm hiểu về unit test, mình đã nghĩ thế này.

> Viết unit test là để phát hiện bug trong code, để nhanh chóng sửa lỗi.

Chà, thực ra suy nghĩ đó không sai, nhưng nó không đầy đủ. Lợi ích của việc viết unit test còn nhiều hơn thế, ví dụ như:

* **Phát hiện bug sớm, sửa lại sớm:** đơn giản rồi, sau khi code xong thì chạy test, nếu fail thì biết là code chưa đúng, cần sửa lại.
* **Tăng độ an toàn, tự tin khi code:** Nếu code có unit test, thì bạn có thể yên tâm code, không sợ ảnh hưởng chức năng đã có. Nếu có ảnh hưởng thì sẽ được báo test fail ngay, giúp nhanh chóng khắc phục.
* **Viết code tốt hơn:** nếu code khó viết được unit test, suy ra code không tốt, và ngược lại. Ví dụ function quá dài, làm nhiều việc thì rất khó viết unit test, lúc này nên tách nó ra thành các function nhỏ hơn.
* **Phân tích trước khi code:** Nếu viết unit test trước khi code, bạn sẽ phải tập trung nhiều hơn về việc code thế nào. Function này có nên trả về null không, có ném exception nào không,... từ đó bạn sẽ hiểu rõ hơn trước khi code.
* **Làm nền tảng cho các mức độ test khác cao hơn:** Mỗi thành phần trong unit test phải chạy đúng, khi tích hợp lại ở Integration test mới đúng được. Không thể nào khi test integration mà lại fail vì unit test phải không.

Ngoài ra, trong thực tế bạn sẽ gặp những đoạn code không thể viết unit test được. Lúc đó bạn có thể cân nhắc chuyển lên test mức cao hơn là **integration test**. Do đó, lập trình viên sẽ đảm nhận test code ở hai mức độ này.

### 2.3. Viết unit test như thế nào?

Hầu hết ngôn ngữ đều có thư viện, framework dành riêng cho việc viết unit test. Ví dụ Java thì có JUnit và TestNG, C# thì có NUnit, JavaScript có Mocha, Jest,... Các thư viện, framework đó đều cung cấp cách thức đơn giản, gần gũi để viết code unit test tương tự code bình thường.

Đặc biệt, các unit test sẽ được test một cách tự động và nhanh chóng. Kết quả test còn được phân tích xem độ bao phủ (test coverage) là bao nhiêu, giúp biết được chúng ta đã bỏ qua các case nào.

## 3. Test Driven Development

TDD là mô hình phát triển thiên về test trước khi code (Test first programming). Các bạn có thể hiểu đơn giản khi mà chúng ta viết unit test trước khi viết code thì đó là TDD.

![](https://images.viblo.asia/8c7d7f25-5704-424c-b0e7-e7f4d2e9e955.jpg)

Như trong hình, TDD gồm 3 giai đoạn:

* **Red:** Viết test trước và test ban đầu này chạy sẽ bị fail
* **Green:** Tiến hành viết code, sao cho unit test chạy pass
* **Refactor:** Nếu có quá trình điều chỉnh code (tối ưu, thêm sửa chức năng,...) nếu test bị red thì cần sửa lại sao cho green.

Lợi ích của TDD như mình nói ở trên, là giúp bạn nghĩ về code nên viết như thế nào trước khi code. Và nó cũng giúp phát hiện sớm bug để sửa nhanh chóng.

Okay, về cơ bản TDD là thế. Mình không phải dân chuyên về test, nên các bạn tester đừng bắt bẻ bài viết mình quá nhé :heart:

Ngoài ra các bạn có thể nghe đến BDD (Behavirour Driven Development). Nó cũng dựa trên TDD, chi tiết ra sao mình không trình bày ở đây, các bạn có thể đọc thêm.

---

Okay vậy là xong phần đầu tiên của series Unit testing căn bản. Hi vọng qua bài viết này các bạn đã có đủ kiến thức sơ lược để có thể bắt đầu viết những bài unit test đầu tiên.

Nếu bài viết hữu ích, đừng ngại cho tớ một upvote hoặc clip để tớ có thêm động lực nhé. Vậy thôi, chào thân ái và quyết thắng :heart_eyes: