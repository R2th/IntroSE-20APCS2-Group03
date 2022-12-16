Trong bài viết này cúng ta cùng tìm hiểu:
- Function là gì?
- Closure là gì?
- Chúng khác nhau ra sao?
- Khi nào thì sử dụng Closure?
# Function là gì?
Func là một Method gói gọn các câu lệnh trong nó, để thực hiện một chức năng cụ thể.

![](https://images.viblo.asia/5ed0105a-6e61-45b9-a188-305d2fbe6d99.png)

Func: 
- Khai báo hàm (Function Declaration) (2)(3): gồm tên hàm, tham số (parameter) đầu vào (2), kiểu trả về (return type) (3)
- Phần thâm hàm (Function Definition) (4): nằm trong dấu {...}, chứa các câu lệnh ***for...in*** hoặc ***func***, ....để sử lý tham số đầu vào, **return** ra giá trị trả về
- Chỉ được sử dụng khi nó được gọi ra (1)

Function được sử dụng rất nhiều trong code, và cách viết để sử dụng nó cũng rất đa dạng: 
- Không có tham số đầu vào nhưng vẫn có giá trị trả về
- Không có tham số đầu vào cũng không có tham số trả về
- Tham số đầu vào có thể có nhiều giá trị, một mảng (array), hoặc cả một func,... và giá trị trả về cũng vậy
- ...

Dưới đây là một số *ví dụ:*  https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/GuidedTour.html

![](https://images.viblo.asia/9fc0a68e-ff8b-4ecf-9a4b-36c883b805c4.png)
![](https://images.viblo.asia/ffad45a2-87e1-4cda-ab30-792a8d9a1064.png)
![](https://images.viblo.asia/12a51bc2-cf49-4fdd-8479-a90c6f84a4fb.png)
![](https://images.viblo.asia/9f555087-2033-4721-b0c3-d7df1e9f118a.png)

***Lưu ý***:  
- Trong Function chỉ ***return*** một lần
- Một Function sau khi ***return*** xong sẽ được giải phóng bộ nhớ.
- Tham số truyền vào mặc định là hằng số - không đổi. Vì vậy để thay đổi được tham số (parameter) đầu vào trong func cần sử dụng ***inout*** và ***&***

![](https://images.viblo.asia/59638022-ae86-4402-8e32-1cd9d0c7a85f.png)

Ồ nhìn này ![](https://images.viblo.asia/61749b7f-6fa1-442b-8cf9-3487f0828fd7.png)  Đây có phải là một cách viết khác của func không vậy, sao nhìn giống func thế.

Thật ra thì đây là một Function được rút gọn. Trong swift được gọi là Closure
# Closure là gì?
Closure là một block code, chính xác hơn thì closure tiến hoá từ block code. Closure không có tên và có thể gán vào một biến, lúc này được lưu dưới dạng một property (escape) hoặc được sử dụng luôn khi không cần tái sử dụng (non-escape)

Vậy làm sao để viết 1 closure, rút gọn nó thế nào. Các bạn tham khảo bài viết của anh Thắng:
https://viblo.asia/p/funtion-tien-hoa-tro-thanh-closure-va-cai-ket-bat-ngo-gGJ59YMJ5X2
 
 Closure đang được gán vào 1 biến (escape)
 
![](https://images.viblo.asia/e936f350-9bb3-462e-a062-1d9d59c26b32.png)

## Vậy Closure có khác Function không?
No No. Về bản chất Closure không khác gì Function. Closure chỉ là một bản viết tắt của Function. Bởi vậy closure ngắn gọn hơn, tiện dụng hơn và giúp thư viện chuẩn Standard Library của Swift mạnh mẽ hơn, tối giản số dòng code.

Ví dụ Standard Library kết hợp cùng closure:

![](https://images.viblo.asia/e09fc658-4073-446d-a164-8578c6f65122.png)
![](https://images.viblo.asia/8fd72852-56e1-4cad-bb73-6383a99fbdbe.png)
![](https://images.viblo.asia/e54bfc45-c781-4fbb-a9d1-273920dfff61.png)
![](https://images.viblo.asia/6b2dec2f-0e0a-4e41-bfe4-28498ecb628e.png)

***Lưu ý***:
- Chuyện gì sẽ xảy ra nếu Closure chỉ được gọi đến khi Function đã return, đã giải phóng bộ nhớ? Tất nhiên là lỗi rùi. Làm sao để khắc phục lỗi này? Để khắc phục lỗi này chúng ta cần thêm ***@escaping*** trước closure muốn gọi

![](https://images.viblo.asia/25f38994-8745-452c-8733-be1a4127527e.png)

- Thường thì  Escaping Closure được sử dụng trong Function liên quan đến request server hoặc function asynchronous

Tham Khảo: https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Closures.html#//apple_ref/doc/uid/TP40014097-CH11-ID94

# Khi nào thì sử dụng closure?
Khi bạn đủ trình độ thì sử dụng thôi :) :) :)

### Ghi chú: 
- Trong func tham số (parameter) đầu vào mặc định là hằng số: Trước swift 3, parameter được bai báo let và var. Việc khai báo như vậy là thừa thãi. Bởi vậy khi cải tiến lên swift 3 việc khai báo let và var đã được bỏ đi, thay vào đó mặc định parameter là let - hằng số. 
- Block code: Trong lập trình nói chung, các dòng code được viết trong {...} được gọi là block code

> Trong quá trình học, tìm hiểu về lập trình (programming) bạn thấy một thứ gì đó khó hoặc đọc không hiểu cái mô tê gì thì 1 - thằng viết bài ngu vãi, 2 - thời điểm này bạn chưa đủ khả năng để hiểu .Lúc này bạn có thể bỏ qua, dành thời gian để tìm hiểu những cái. Khi đến đúng thời điểm bạn sẽ tự nghiệm ra: Ồ hoá ra nó là vậy!!! hoặc thằng ấy viết ngu vãi, đáng nhẽ phải viết như này mới đúng. Lúc này, bạn hãy viết một bài blog cho chính mình và mọi người.
> 
> Thank you!!!