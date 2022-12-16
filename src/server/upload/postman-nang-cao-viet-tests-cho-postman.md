Chủ đề lần này của chúng ta là làm thế nào đề viết test script trong Postman, vậy viết script trong Postman để làm gì có nó có lợi ích như thế nào, hãy cùng tìm hiểu trong bài viết hôm nay nhé.

# Làm thế nào để tạo TEST trong Postman

Viết TEST trong Postman tương tự như định nghĩa một test case. Trong Postman, chúng ta check bất kỳ điều gì chúng ta cần biết về request. Ví dụ: nếu ta cần biết liệu request của ta có trả về status code là 201 hay không, việc này có thể làm được trong Postman. Ngoài ra, một request có thể được thông qua nhiều test case và tất cả chúng có thể được report cùng lúc trong lúc request hoàn thành.

Phải nhớ rằng, một test trong Postman chỉ chạy khi request thành công. Nếu không có response nào trả về thì thực tế là request của bạn không đúng, chúng ta không thể chạy test thông qua request đó. Ngoài ra, bạn cần biết rằng các test được viết bằng Javascript trong Postman. Mặc dù bạn không cần phải giỏi về code nhưng bạn nên hiểu biết một chút về Javascript vì nó sẽ rất có ích. Trong bài viết này, chúng ta sẽ thử viết Javascript đơn giản nhất và bạn có thể tự viết các test case của mình.

TEST trong Postman có thể được viết theo hai cách là

- Javascript method
- Functional method

Cả hai phương pháp đều được sử dụng trong Postman để viết test và cả hai phương pháp đều sử dụng javascript làm ngôn ngữ cơ sở. JavaScript method là cách cũ hơn trong khi functional method là cách mới. Mặc dù Postman không nói rằng sẽ kết thúc không hỗ trợ javascript method, nhưng khuyến nghị nên sử dụng Functional method như đã nói trên trang chủ của Postman, "Functional method is the more powerful method among the two".

Vì vậy, bây giờ, chúng ta đã viết test đầu tiên của mình.

# Làm thế nào để thiết lập test trong Postman với JavaScript method?

1. Sử dụng API để tạo user

![](https://images.viblo.asia/fabb0593-446c-4849-84c9-cee790412936.png)

2. Mở tab **Tests**.

![](https://images.viblo.asia/3e036fe1-c6fc-4276-9216-06e352b12853.png)

3. Viết đoạn mã Javascript sau đây như được viết dưới đây

```
tests["Status Code is 201"] = responseCode.code === 201
```

![](https://images.viblo.asia/719c3da4-2058-4053-aede-e25025bcb480.png)

Bây giờ chúng ta sẽ xem qua dòng trên để biết ý nghĩa.

- Tests: Từ đầu tiên chúng ta thấy là "tests", là một biến kiểu mảng. Mảng này có thể chứa bất kỳ kiểu dữ liệu nào như string và integer hoặc thậm chí các giá trị boolean.
- "Status Code is 201": chỉ là một cái tên hoặc một chuỗi đơn giản. Chúng ta đặt tên này để biết test đang thực hiện là gì, do đó tên này phải có ý nghĩa. Nếu ta viết là tests[“Passed”], thì ta sẽ không thể biết ý nghĩa của test case này là gì và điều này cũng sẽ ngày càng trở nên phức tạp hơn nếu chúng ta chạy nhiều hơn một test, chẳng hạn như 20 test và một test không đạt. Bạn cũng có thể viết 'Status code OK'.
- `responseCode.code`: response code đề cập đến status code của response mà chúng ta đã nhận được trong tab response. Chúng ta có thể chạy nhiều test trong Postman trên một response, chẳng hạn như kiểm tra status code có chuỗi hay không. `responseCode.code === 201` là phép so sánh giá trị code của response với giá trị chúng ta mong muốn.

Trong mục dưới tab Tests, những test có giá trị TRUE sẽ hiển thị PASS với tên được đặt ở trên hoặc nếu không thì hiển thị FAIL.

4. Nhấp vào **Send** và xem tab kết quả tab Test Results.

![](https://images.viblo.asia/98df3185-8066-4d28-ac6b-3bde7e4de219.png)

Sau khi chạy, kết quả là test của chúng ta đã pass. Điều này có nghĩa là response nhận được là 200.

5. Lưu request trong MyFirstCollection bên trong Myfolder

![](https://images.viblo.asia/6cc50948-54e3-402f-a012-06a256d79cea.png)

Bằng cách này, bạn đã thực hiện thành công request đầu tiên của mình với Tests.

# Làm thế nào để thêm nhiều test cho một request trong Postman bằng JavaScript method?

Như chúng ta đã làm trước đó, chúng ta có thể sử dụng nhiều test trên một request duy nhất và tất cả các test đó được hiển thị đồng thời trong kết quả. Chúng ta sẽ thực hiện nhiều test trên cùng một request ở trên. Viết code bên trong text editor.

```
tests["Status Code is 201"] = responseCode.code === 201;
tests["Body contains Fault"] = responseBody.has("Oanh Nguyen1")
tests["Response time less than 500ms"] = responseTime <3000;
```

![](https://images.viblo.asia/ac480015-ed9a-47b3-99dd-977adff73dd7.png)

LƯU Ý: Test thứ hai kiểm tra xem có chuỗi "Oanh Nguyen1" trong phần body của response hay không và test thứ ba kiểm tra xem thời gian response có nhỏ hơn 3000ms hay không.

Bây giờ hãy nhìn vào kết quả trong Postman, chúng ta có ba test được viết, trong đó một test không đạt là test thứ hai. Vì response body của chúng ta không chứa *Oanh Nguyen1*. Bằng cách này, chúng ta có thể thực hiện đồng thời nhiều test trong Postman trên một request. Và nhớ lưu request lại.

![](https://images.viblo.asia/5e3c70c3-d826-45c6-be24-61c4cf83e0e9.png)

Test case đầu tiên của chúng ta đã pass vì chúng ta có response status code là 201 và test thứ ba của chúng ta đã pass vì thời gian response của chúng ta là 1082ms, nhỏ hơn 3000. Thời gian response của bạn có thể thay đổi.

# Làm thế nào để viết test trong Postman bằng Functional method?

Một Functional method đơn giản để kiểm tra xem response status code có phải là 201 hay không được viết như sau

```
pm.test("Status code is 201", function () {
  pm.response.to.have.status(201);
});
```

Kiểm tra phương pháp hàm trong Postman

![](https://images.viblo.asia/d1a356da-e455-4621-b2f6-6eb0f7416f65.png)

Trong hình trên, công việc giống như chúng ta đã làm trong JavaScript method. chúng ta đang kiểm tra xem status có phải là 201 hay không. Sau đây sẽ giải thích về đoạn code trên:

- `pm.test`: `pm` ở đây đề cập đến Postman api.
- Status code is 201: Dòng này chỉ là một string là tên test case. Khi test của bạn được thực hiện, Chuỗi này sẽ được viết ở phía trước kết quả. Nó cũng giống như trong JS method để biết test case là gì
- `function () {}`: Tham số tiếp theo là hàm được truyền để thực hiện test
- `pm.response`: Biến này được sử dụng để lấy response nhận được và thực hiện các assetion trên nó như status code, headers, v.v. Điều này giống như `responseCode` ở JS method.
 
# Đoạn mã mẫu trong Postman để thêm test nhanh

Vì có nhiều lần test được sử dụng theo các request khác nhau và có nhiều request xuất hiện trong một collection nên viết một số code test thường lặp đi lặp lại thường xuyên. Trong Postman, phần này được gọi là **Snippets**. Đoạn code là được viết trước trong Postman để sử dụng mà không cần viết toàn bộ code. Việc này tiết kiệm rất nhiều thời gian và ngăn ngừa các lỗi có thể xảy ra trong khi viết code theo cách thủ công.

Snippets code được đặt ngay bên cạnh text editor.

![](https://images.viblo.asia/815f58c6-3851-42c6-b12b-c3e46ef6e4bf.png)

Bấm vào **Status Code: code is 200**

![](https://images.viblo.asia/8b74abcc-8997-4dd3-bcf5-025a95de55cc.png)

Bây giờ, hãy xem text editor

![](https://images.viblo.asia/880906b8-1da4-44e9-b0aa-a2c390c632bb.png)

Đoạn code này giống hệt như đoạn code mà chúng ta đã viết trong một Functional method để kiểm tra response status.

Lưu ý: Vì Postman khuyến khích dùng Functional method hơn, các đoạn code này chỉ có sẵn trong Functional method.

Bạn có thể xem thêm các đoạn code khác nhau để hiểu rõ hơn về code test khác nhau.
 
# Collection runner trong Postman

Một trình chạy collection trong Postman như đã nói ở các bài trước đây được sử dụng để chạy toàn bộ collection cùng nhau. Trình chạy collection chạy tất cả các request trong collection hoặc thư mục (bất cứ thứ gì bạn chọn) cùng một lúc. Collection runner trong Postman không hiển thị bất kỳ respone nào, nó được sử dụng để test các case xem chúng có pass hay không. Bảng điều khiển Collection runner hiển thị tất cả các bài test cùng nhau và kết quả của chúng. Để chạy bộ collection trước tiên hãy đảm bảo rằng bạn có ít nhất hai request trong thư mục **MyFolder** bên trong **MyFirstCollection** như hình.

![](https://images.viblo.asia/c1e636ef-0900-43c5-96a0-eadeeb8e70f5.png)

Hai request này là api Get list user và api đăng ký user (chúng ta đã sử dụng nó trước). Hãy nhớ rằng API của user là một request Post nên nó cũng chứa các request body.

# Làm thế nào để chạy Collection Runner trong Postman?

Bây giờ chúng ta sẽ xem cách chạy nhiều request cùng nhau trong Postman bằng cách sử dụng Collection Runner.

1. Nhấp vào Runner

![](https://images.viblo.asia/f8df2afb-899f-4395-aebf-4effc5ce5994.png)

2. Nhấp vào MyFirstCollection và sau đó là MyFolder

![](https://images.viblo.asia/c2195c37-5003-4e12-871b-b91f1cbb31fb.png)

Lưu ý: Hy vọng bạn đã lưu các request trong collection như trên

Trong bảng điều khiển, bạn thấy hai tùy chọn:

- *Iterations*: là số lần các request giống nhau sẽ chạy. Ví dụ: Iterations được đặt là 3 sẽ chạy tất cả các request 3 lần. Hãy đặt nó là 2.
- *Delay*: là thời gian chờ giữa hai lần lặp lại bất kỳ. Thời gian trễ 10ms sẽ có nghĩa là Postman sẽ đợi 10ms sau khi chạy một lần lặp trước lần lặp thứ hai. Hãy đặt nó là 5ms.
 

3. Nhấp vào Run MyFolder

![](https://images.viblo.asia/1ae8b3aa-2dd7-461b-aa09-0f6628265dca.png)

4. Như bạn thấy, tất cả các test với kết quả của chúng đều hiện ra như sau.

![](https://images.viblo.asia/f1a1bea8-db5c-44d3-9a0c-eda27c699330.png)

- Có hai lần lặp lại mỗi request. Trong lần lặp đầu tiên, tôi nhận được thời gian phản hồi là 260ms lớn hơn 250 ms, điều này gây ra một fail trong test tương ứng đó.

# Tham khảo

- https://www.toolsqa.com/postman/test-and-collection-runner-in-postman/