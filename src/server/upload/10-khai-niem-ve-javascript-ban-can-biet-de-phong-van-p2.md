Chào mọi người, Bau is back! Và đây là bài viết thứ 2 của mình trong chuỗi bài viết "10 khái niệm về Javascript bạn cần biết để phỏng vấn". Hôm nay chúng ta cùng thảo luận về Block & Scope :D.
Đây là bài dịch từ trang Codeburst ([Click để đến bài gốc](https://codeburst.io/10-javascript-concepts-you-need-to-know-for-interviews-136df65ecce)). :D okey let's go!

# I. Scope:
Mình sẽ không dịch `Scope` ra đâu, nghe chả hay ho gì cả :D, những định nghĩa thì khá rõ ràng: Trong JS (hoặc hầu hết các ngôn ngữ lập trình chung), ta có 2 dạng `Scope`:
* `Global Scope`
* `Local Scope`

Ngoài định nghĩa trên, các bạn có thể đã gặp trường hộp này: `Function  Scope`. Oke, cùng tìm hiểu nào!
## 1. Global scope:
`Global scope` là gì?
> When you start writing JavaScript in a document, you are already in the Global scope.

Có bao nhiêu `Global Scope`?
>There is only one Global scope throughout a JavaScript document.

Wup, chúng ta còn 1 câu nữa:
> A variable is in the Global scope if it's defined outside of a function.

Đơn giản dễ hiểu rằng, những biến không khai báo ở trong 1 function thì là `Global variables` :D

![](https://images.viblo.asia/d85476b6-4762-4804-a848-4c7d00dd6885.png)

[Check code here!](https://repl.it/repls/MiserlyUnwillingFilesize)
## 2. Local Scope
`Local Scope` là gì?
Đơn giản, khi bạn đang ở trong 1 Function, bạn đang làm việc trong 1 `Local Scope`. Mỗi 1 Function, chúng ta có 1 `Local Scope` khác nhau, và các biến bên trong mỗi `Scope` này là khác nhau:

![](https://images.viblo.asia/27c843d5-44d6-4d34-8327-609f884786c0.png)

[Check code here!](https://repl.it/repls/TightValuableRegression)

Thêm 1 ví dụ khác nhé:
![](https://images.viblo.asia/03673dd5-be5c-48a8-bd05-ace4803f9b12.png)

[Check code here!](https://repl.it/repls/GracefulHotConditional)

Như các bạn thấy, mình gán `Hằng` bằng `const` cho biến `myName` 2 lần, nhưng không có lỗi, bởi vì mỗi biến `myName` ràng buộc bởi chính function bên ngoài, hay những biến này là những `local variables` của chính `Scope` đấy, chứ không phải của function bên ngoài. Nhiều bạn có thể sử dụng `Function Scope` thay cho `Local Scope`, yep, that's okey :D

## 3.Lexical Scope - Closures:
Khi chúng ta có 1 `Scope cha` và bên trong nó là 1 `Scope con`, thì ta có thể truy cập biến của `Scope cha` từ `Scope con` - `Closures`:
>A Closure is created when an inner function tries to access the scope chain of its outer function

Và khái niệm này tương đương với `Lexical Scope`:
>Lexical Scope means that in a nested group of functions, the inner functions have access to -the variables and other resources of their parent scope.

![](https://images.viblo.asia/f0c7f903-83f3-4af4-969e-901680379f4c.png)

[Check code here!](https://repl.it/repls/SteelblueNegativeAnimatronics)

# II. Block Statements:
Mình thường hỏi về định nghĩa của 1 Function, và nhiều bạn bảo rằng:"Bên trong mỗi `{}` là 1 function thôi". Oh really :scream: check thử đoạn code này nhé:

![](https://images.viblo.asia/7a851297-f861-4503-811d-67205cddb009.png)

[Check code here!](https://repl.it/repls/ThistleAvariciousGlitch)

Khác với Function, những câu lệnh dạng `điều kiện` hoặc `vòng lặp` sẽ không tạo ra 1 `Scope` mới, thay vào đó là 1 `Block` mới, và những biến trong `Block` này sẽ ràng buộc với `Scope` gần nhất của chúng.
Như đoạn code trên, vì `myName` đã tồn tại giá trị là `Tran Duy Bau`, nên không thể cùng tồn tại 1 giá trị mới là `Tran Quoc Bao`.
Thêm 1 ví dụ mới nhé :D

![](https://images.viblo.asia/96a9695d-1882-4ad3-ab9e-45ffe7b5e9c6.png)

[Check code here!](https://repl.it/repls/DimgrayPeriodicErrors)

Như các bạn có thể thấy, biến `myName` lần này được đặt trong 1 câu `if`, nằm trong `Global Scope`, do đó ở `Global Scope` ta dễ dàng gọi biến và sử dụng.

Okey, vậy là hết phần 2 rồi nè. Nếu cảm thấy có thắc mắc gì thì hãy comment bên dưới để cùng thảo luận nhá :D.
Và bài tiếp theo của mình sẽ là về `Hoisting`.
Cảm ơn các bạn đã đọc bài của mình :D.