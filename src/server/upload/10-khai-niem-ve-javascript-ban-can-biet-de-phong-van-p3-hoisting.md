Hello guys, welcome back 😌. Lần này tớ không bảo tớ là Báu đâu, hứa đấy 😌😂😂😂.

And, nhân vật hôm nay chúng ta cùng giao lưu trong bài học là anh Thái (HAVINHTHAIDUI), à, cả những ngày sau nữa 🤣🤣🤣.

Hôm nay chúng ta đến với phần 3: `Hoisting`. Link bài viết gốc: [Hoisting](http://javascriptissexy.com/javascript-variable-scope-and-hoisting-explained/).

Oke let's go 🚘 🚘 🚘.
# I. Variable Scope:
- Ể, cái m* gì vậy Báu? Bữa học bài này rồi mà em!!! 😡
- Yah, don't be rude =))))) Hôm trước, chúng ta chỉ học về `Scope`, còn bài hôm nay, chúng ta sẽ học về `Variable Scope` (variable không có s) và `Variable Hoisting`.

Định nghĩa cơ bản về `Variable Scope`:
>A variable’s scope is the context in which the variable exists.

Chúng ta có thể tạm hiểu rằng phạm vi biến là `context` mà biến tồn tại ở trong đó. Nhưng với đặc thù `Block-Scope` của `Gia-va-sờ-cờ-ríp`, đôi khi 1 khối `{}` lại không ràng buộc biến mà bạn gọi bên trong khối `{}` 😒.

Back to the past, tớ từng có đoạn code này:

![](https://images.viblo.asia/822b4a8a-7cc5-466d-a3cc-01c43147a16e.png)


[Check Code Here!](https://repl.it/repls/ThistleAvariciousGlitch)

Nào cùng đến với ví dụ khác, xem sự khác nhau ở lần này nhé :D:

![](https://images.viblo.asia/169a24bc-72e9-4df6-8b6d-4587ac221548.png)

[Check Code Here!](https://repl.it/repls/UsefulTechnicalLivecd)


- Ối cái gì vậy Báu? Magic ư?
- Thôi nào anh Thái :) Các bạn thấy mà anh không thấy gì à? 🤣

Wup, đấy chính là (bug &) feature của Javascript đấy :).
Đầu tiên, cần quay lại với phần `khai báo biến` - `define variable`, chúng ta có 3 cách `define variable`:
- let
- var
- const 

![](https://images.viblo.asia/3e488848-8605-43ab-a7bf-7ae7d93e7557.png)

[Check Code Here!](https://repl.it/repls/QuixoticAnotherBotany)

Cá là bạn đều biết `let` và `var` là để khai báo biến mới còn `const` thì dùng khai báo hằng, thế thì sự khác nhau giữa `let` và `var` là gì?

`var`:

![](https://images.viblo.asia/67f6aa64-fff0-4279-bda3-87570f24d2cf.png)

[Check Code Here!](https://repl.it/repls/PleasedSmartAbilities)

`let`:

![](https://images.viblo.asia/4bbb6d70-4cd3-4bcb-b789-c74bc7c58b54.png)

[Check Code Here!](https://repl.it/repls/FrayedMelodicWorkspace)

Trong ví dụ, ta bọc `let` và `var` trong 1 cặp ngoặc nhọn `{}`, đây là 1 `block` ([What is block in JS?](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/block))
Ở bài 2, phần Closure, chúng ta biết rằng không thể sử dụng 1 biến ở `Outer Scope`, nhưng đây là `block`, nên `var` vẫn hoạt động tốt vì nó chỉ bị ráng buộc bởi `Scope`, còn biến let thì báo `not defined` :scream::thinking:.

Cùng xem thêm 1 ví dụ này nữa nhé:

![](https://images.viblo.asia/982cc7f4-d5db-4afc-9c2a-9507ef7b6c1e.png)

[Check Code Here!](https://repl.it/repls/OvalGrandWaterfall)

Như các bạn thấy, khi chúng ta khai báo mới biến `Thai` bằng `let` trong `block` thì biến mới chỉ tồn tại trong `block`, sau khi thoát `block` thì biến `Thai` trả về Global Variable :wink:.

Thế còn `const`, nó được quy định bởi `Block` hay `Scope` nhỉ? Nhìn vào đây nhé:

![](https://images.viblo.asia/551392e0-f24c-4d01-bc46-b573e8cfcf58.png)

[Check Code Here!](https://repl.it/repls/MysteriousOddPresses)

Thêm 1 cái nữa nè:

![](https://images.viblo.asia/e77f7568-546d-43eb-862f-11833dccfe07.png)

[Check Code Here!](https://repl.it/repls/TrustingAridOutliner)

Nhìn qua 2 ví dụ trên, chắc các bạn cũng biết được rồi nhỉ :D.

Trong bài viết, tác giả có 1 mục như thế này:
>If You Don’t Declare Your Local Variables, Trouble is Nigh.

>In fact, you should use JSHint to check your code for syntax errors and style guides.

Nếu không muốn cài thêm extension `JSHint` cho VS Code, hãy tập sử dụng `let` nhé. Và đây là 1 bài toán nho nhỏ vui vẻ cho mấy bồ nè:

![](https://images.viblo.asia/aefb7b50-b097-481f-b282-176548a2034a.png)

[Check Code Here!](https://repl.it/repls/DescriptiveFrillySoftwaresuite)

Hãy viết kết quả ra giấy trước khi bấm Run nhé 😌😌😌.

Còn 1 điều nữa mà anh tác giả dặn:
>Local Variables Have Priority Over Global Variables in Functions    .  😉😉😉

Check lại trong những ví dụ ở trên, bạn sẽ thấy rằng nếu cùng 1 tên biến, thì trong `Local Scope`, các `Local variables` được ưu tiên gọi ra thay vì là `Global Variables` :D.

# II.Variable Hoisting:
Tada, phần nội dung chính đến rồi nàyyyyy :blush::
>All variable declarations are hoisted (lifted and declared) to the top of the function, if defined in a function, or the top of the global context, if outside a function.

Đơn giản rằng, mọi biến có khai báo sẽ được mang lên đầu của `Funtion` - `context` và khai báo.
Uki, cùng thử nhé :D:

![](https://images.viblo.asia/844dabd1-ba45-4388-9e65-ead32143e41f.png)

[Check Code Here!](https://repl.it/repls/MediocreVainFlashmemory)

Ồ, lỗi rồi nhỉ? Vì chưa khai báo biến something đấy, let me try again :D:

![](https://images.viblo.asia/2ea2f109-7168-4ab5-aaa2-7bfc14ebc055.png)

[Check Code Here!](https://repl.it/repls/DarkcyanEnragedSource)

- Ờ thì bình thường mà, biểu diễn Hoisting đi chứ 🤔.
- Oke đây 😌:

![](https://images.viblo.asia/49433730-2f78-4674-9354-21a0f5815f84.png)

[Check Code Here!](https://repl.it/repls/StimulatingGummyRay)

- Wait a minute 🤔???
- Ờ thì, tớ đã sửa 2 chỗ lận 😂😂😂.

Đầu tiên, tớ gọi biến `something` ở phía dưới, nhưng ở trên, câu lệnh `console.log` gọi biến `something` không báo `not defined` nữa, mà giá trị là `undefined`. Ngoài ra thì `let`, theo cách đơn giản nhất thì, somehow will throw an error in this case ([Check this link](https://stackoverflow.com/questions/31219420/are-variables-declared-with-let-or-const-not-hoisted-in-es6)) . Thử tiếp 1 ví dụ nữa nhé:

![](https://images.viblo.asia/21ba4b4c-2aea-4ee1-a888-a940d86ba4f6.png)

[Check Code Here!](https://repl.it/repls/DecimalGraciousOpposites)

Giờ tớ giải thích nhé 😉.
Biến `something` được `Hoisting` lên đầu của `Function`, nhưng mà, bạn biết không, chỉ biến `something` thôi ạ, còn giá trị thì không. Huh, chưa hiểu nhỉ? Tớ show cho mấy bạn xem đoạn code mà JavaScript engine xử lý nhé:

![](https://images.viblo.asia/ca39f0ba-b278-4a1d-ba13-4dcfd756a815.png)

[Check Code Here!](https://repl.it/repls/LumberingRigidSystem)

Các bạn có thể thấy trong định nghĩa mà tớ trích ở trên là, `hoisted (lifted and declared) to the top of the function` thực chất chính là `declared on top`, còn giá trị thì `undefined`, và sau khi `assigned a value` thì ta mới có giá trị thực sự 🎆🎆🎆.

# III. Function Declaration Overrides Variable Declaration When Hoisted:
- Ủa 2 phần thôi má 😡!!!
- Ủa lười vậy anh Thái 🤣🤣.

Vầng, không chỉ `Hoisting`, chúng ta còn phải hiểu về phần `overrides` giữa `Function declaration` và `Variables declaration`:
>Both function declaration and variable declarations are hoisted to the top of the containing scope. And function declaration takes precedence over variable declarations (but not over variable assignment).

Hổng hiểu gì hết hả? 🤔 Thế thì tớ xem thử ví dụ trước nhé:

![](https://images.viblo.asia/e70b623f-c197-4435-b1cc-13bde4dd0a6a.png)

[Check Code Here!](https://repl.it/repls/BoilingAcrobaticMedian)

Nào bây giờ thử cho giá trị vào biến `myName` nhé:

![](https://images.viblo.asia/af1f1df2-cd4b-4612-afa3-a1750d79d271.png)

[Check Code Here!](https://repl.it/repls/QuaintSuperficialPython)

Giải thích rất đơn giản là, `Function declaration` `myName` sẽ ưu tiên hơn `hoisted variable declaration`, nhưng không vượt `variable assignment`. Ngoài ra, anh Rich còn dặn dò mọi người dùng `strict mode` để nâng cao khả năng code này này:
>In strict mode, an error will occur if you assign a variable a value without first declaring the variable. Always declare your variables.

Cảm ơn mọi người và anh ThaiDui đã tham gia vào bài học hôm nay :D. Hẹn mọi người ở bài viết tiếp theo với nội dung: `Closures`.

Note nhỏ xíu: Sorry mọi người vì cái máy cũ của tớ nó lag nên là phải xài 2 máy để viết bài, nếu mọi người thấy mấy cái ảnh không có đồng bộ giống nhau thì cho tớ xin lỗi nhớ 😢😢😢. Hãy vote `UP` để cảm ơn tớ hoặc `DOWN` nếu cảm thấy chua hài lòng với bài viết này nhá :D. Cảm ơn mọi người nhiều ạ :D.