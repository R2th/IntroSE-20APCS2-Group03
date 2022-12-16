**Lady and gentlemen!**

![](https://images.viblo.asia/52b536fd-ce6f-4668-8bcc-c565af19d759.png)


Xin chào quý anh chị em rất thân mến, kể cũng tròn một tháng rồi anh chị em chúng ta mới có dịp tái ngộ.

Trong dịp tái ngộ lần này mình xin mang đến cho anh chị em một câu trả lời! Câu trả lời cho một điều mà chắc hẳn các anh chị em ở đây cũng đã thường nghe rất nhiều lần, cho một câu khẳng định chắc nịch rằng "**Mọi thứ trong javascript đều là một Object**".

> Ngay cả Google cũng nghĩ như vậy như bức ảnh trên.

Chúng ta cùng bắt đầu với những ví dụ đơn giản để chứng minh cho câu nói này.

Mở trình duyệt tab console và thử một dòng code như dưới nào!

![](https://images.viblo.asia/5c8fc654-db88-4b75-9130-9e6f6d6ff47d.png)


Để ý đoạn trên, chúng ta vừa tạo một array với tên là `arr`, và ở dòng tiếp theo chúng ta gõ `arr.` sau dấu chấm thì browser suggest một list hàm có thể sử dụng với mảng như map, concat, length ...

Đợi một chút??? Những thứ này đến từ đâu? Chúng ta sử dụng `array` và những `methods` của array này hằng ngày, hằng giờ? Nhưng chúng ta chỉ vừa tạo một array vậy những methods này làm sao mà có được?

Và câu trả lời là **Prototype: All JavaScript programming constraints inherit properties and methods from a prototype.**

Ở đây có một khái niệm là **Inheritance** là kế thừa, mỗi array khi khởi tạo luôn có những methods như lúc nãy chúng ta vừa đề cập. Tất cả những properties và methods này được kế thừa từ Array.Prototype với Array là một Constructor trong Javascript.

Để ý rằng mỗi khi chúng ta tạo một array, function, class ... trong Javascript thì luôn có một object đi kèm đó là `__proto__`

Nếu chúng thử `arr.__proto__` thì kết quả được sẽ là

![](https://images.viblo.asia/c624ebce-377f-4b1d-b508-97da05c18208.png)

Mỗi array chúng ta tạo có thể dùng những phương thức như push, length, find ... là do được kế thừa từ đây.



Nếu chúng ta thử log `Array.Prototype` kết quả nhận được cũng sẽ giống như ở trên. Có nghĩa rằng mỗi array đều được kế thừa từ `Array.Prototype`

![](https://images.viblo.asia/efdb629d-663a-4e92-a822-ebd464a010aa.png)

Mọi thứ ổn? Nhưng chúng ta đang đi giải thích vì sao mọi thứ trong Javascript đều là một Object cơ mà? Dưới đây là lí giải cũng tương tự như trên.

Nếu như chúng ta để ý kĩ, thì sẽ thấy ở ảnh thứ hai ở trên, lại có một object ở cuối là `__proto__`

Thử log giá trị của nó ra bằng `arr.__proto__.__proto__`

![](https://images.viblo.asia/8e84efa1-34ae-41bb-a40d-157f11f9a8a5.png)

Quan sát constructor ở đây, chúng ta thấy nó là một Object, có nghĩa rằng `Array.Prototype` cũng có nguồn gốc kế thừa từ một `Object.Prototype`.

Vậy chúng ta thử log thêm `__proto__` của `Object.Prototype` là gì?

Nó sẽ là `arr.__proto__.__proto__.__proto__`

Và kết quả nhận được sẽ là `null`. Vậy là đã rõ vì sao mọi thứ trong Javascript đều là một Object rồi.

Để chứng minh thêm, chúng ta có thể thử với `function` như dưới đây nhé!

![](https://images.viblo.asia/d6a69f5f-be98-4273-aba5-98b02dabde7c.png)

## Lời kết

Hi vọng những điều trên đây có thể giúp ích được điều gì đó cho quý anh chị em. Cảm ơn anh chị em đã đón đọc, chúc anh chị em sức khoẻ!