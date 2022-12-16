# Environment
Trong thực tế, khi ta xây dựng một nhà máy điện hạt nhân ở. Những gì xảy ra trong nhà máy sẽ được tách biệt với thế giới bên ngoài để đảm bảo an toàn. Nói cách khác, nhà máy điện hạt nhân được xây dựng trên một môi trường riêng, một thế giới thu nhỏ nằm trong thế giới to lớn của chúng ra.

Trong lập trình cũng tương tự, khi ta khai báo một biến, function, vòng lặp, toán tử điều kiện, block code, thì chúng đều nằm trong môt môi trường, và được gọi là **environment**, môi trường nằm ngoài các môi trường khác đó là **global environment**.

![](https://images.viblo.asia/840e92a2-46ce-4945-a549-8d567a05bb63.png)

Hằng số `age`, hàm `multiplier` và biến `result` tất cả nằm trong môi trường toàn cầu(**global environment**) nên nó có phạm vi toàn cầu và được gọi là **global scope**.. Scop có nghĩa là vùng mà các thành phần sẵn sàng để sử dụng.

Hằng số `x` được khai báo trong hàm  `multiplier `  Khi đó `x` nằm trong một block code, và nó không được gọi là **global scope** nữa mà là một **local scope**

Hàm `multiplier` có một thành phần khác là tham số `num`, nó khôn được khai báo trong block code, nhưng nó vẫn hoạt động như một  **local scope**.

Những  **local scope** chỉ hoạt động được trong block code mà nó được định nhĩa.

![](https://images.viblo.asia/61cabe3d-e201-4c59-bbc8-986cdb9dfde8.png)

`console.log` được gọi trong môi trường toàn cầu, nhưng biến `x` lại được khai báo trong môi trường cục bộ, nên ví dụ trên sẽ gây ra lỗi Reference Error.

Chúng ta có thể khai báo biến `x` trong môi trường toàn cầu

![](https://images.viblo.asia/0ae5086d-26de-41f8-8a99-abd8a370a13e.png)

Bây giờ khi  `console.log` ta có giá  trị `55`, nhưng biến `x` bên trong hàm `multiplier` vẫn hoạt động. Ta có 2 biến `x` nhưng chúng không liên quan đến nhau vì chúng nằm ở 2 môi trường khác nhau mặc dù có cùng tên.

Bất kỳ đoạn code nào được nằm trong cặp dấu`{}` đều được gọi là một block code. Một ví dụ với toán tử `if`

![](https://images.viblo.asia/61cabe3d-e201-4c59-bbc8-986cdb9dfde8.png)

Biến `local` sẽ không tồn tại khi ta `console.log` ở môi trường toàn cục, mà chỉ tồn tại trong môi trường cục bộ bên trong block code của  `if` mà thôi.

Vòng lặp `while`, `for` cũng tương tự.

![](https://images.viblo.asia/0ae5086d-26de-41f8-8a99-abd8a370a13e.png)

Biến toàn cục `a` đã được thay đổi giá trị sau khi hàm `changer` được gọi. Trước khi hàm được gọi, `a` vẫn có giá trị là `0`, vì hàm sẽ không chạy khi khai báo, mà chạy khi được gọi, nên sau khi gọi hàm, `a` mới có giá trị `1`.

Mặc dù trên lý thuyết ta có thể đặt toàn bộ các biến ở môi trường toàn cầu  **local scope** mà không cần phải quan tâm đến **scope** nữa.

Nhưng đó là cách làm tệ ( terrible practice) và có thể làm code của bạn bị xung đột và gây ra bug bất cứ lúc nào. Cho nên best practice là hay giữ các biến ở phạm vi cục bộ, nơi mà chỉ ở đó mới cần đến biến đó.

#  Lexical scope

Xét ví dụ sau 

![](https://images.viblo.asia/f517b606-e2d8-42d5-9a02-e01f92d18e08.png)

Hàm `multiplier` trả về phép nhân giữa `a` và `b`, nhưng `a` được khai báo cả bên trong và bên ngoài hàm, `b` thì lại chỉ được khai báo bên ngoài. Khi chương trình xử lý hàm `multiplier`, nó sẽ ưu tiên tìm các biến `local scope`, nếu không có sẽ tìm ra `global scope`. 

Trong trường hợp này, chương trình tìm `a` và `b` ở bên trong hàm, nó tìm thấy `a` bên tron với giá trị `5`, `b` thì không thấy nên chương trình tìm sang `global scope` và thấy `b` với giá trị `10`. Và vậy kết quả của hàm `multiplier` là `50`.

Việc tìm kiếm các biến theo thứ tự đó được gọi là **lexical scope**. Phạm vi của bất kỳ thành phần nào được xác định bời nơi nó được khai báo. Và các block code lồng nhau có thể được truy cập đến các **scope** bên ngoai chúng.

# Closures

Xét ví dụ đưới đây
![](https://images.viblo.asia/f50e8914-f79a-45cb-a0f0-09fc00cd74bf.png)

Hàm `createPrinter` chứa biến `name` và hàm `printName` bên trong. Cả 2 đều nằm trong `local scope`.

Hàm  `printName` có thể xử dụng biến `name` vì chúng nằm cùng một `scope`.

Hàm  `createPrinter` return hàm `printName`. Nên nhớ rằng một function chỉ mô tả cách hoạt động của một chức năng nào đó. Do đó chúng ta có thể returun một function, như là return một số hoặc một chuỗi mà chúng ta vẫn thường làm.

Ở bên ngoài ta khai báo `myPrinter` và gán giá trị bằng kết quả trả về của hàm `createPrinter`. Nó trả về hàm `printName`, gọi hàm này ta được kết quả `King` như đã khai báo trong hàm `createPrinter`.

Có một điều kì lạ là khi hàm `createPrinter` được gọi và chạy xong, như ta đã biết thì  những gì bên trong nó sẽ được giải phóng, và biến mất.

Nhưng thực tế nó đã `return` một hàm khác, và bằng cách nào đó, nó đã nhớ được giá trị `name = King` mặc dù `scope` nơi nó được khai báo đã không còn.

Hàm được trả về từ hàm `createPrinter` được gọi là một **closure**. **Closure** là sự kết hợp của hàm và môi trường nơi nó được khai báo. **Closure** tự chứa một số thông tin từ `scope` nơi mà nó được khai báo.

Điều này như là một thủ thuật, trong javascript nếu được sử dụng một cách không ngoan, nó có thể làm code dễ đọc và sạch sẽ hơn. Việc có thể return một hàm như là một giá trị đã mở ra nhiều tùy chọn và làm cho javascript trở lên linh hoạt hơn.

# Tham khảo
Được dịch từ bài viết cùng tên của tác giả Mahendra Choudhary https://medium.com/@jakepintu/javascript-environment-lexical-scope-and-closures-9c8dfaeff73d