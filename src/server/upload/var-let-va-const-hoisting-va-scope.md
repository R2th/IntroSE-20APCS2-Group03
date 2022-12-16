# Mở đầu

JavaScript, như mọi ngôn ngữ lập trình hiện đại khác, cung cấp cho chúng ta nhiều phương thức khai báo biến khác nhau. Javascript có các keywords ***var***, ***let*** và ***const*** dùng cho việc khai báo biến và chúng được sử dụng trong các trường hợp khác nhau. Bài viết này được viết với mục đích đi sâu vào những chú ý và những điểm khác nhau mà bạn sẽ có thể gặp phải khi sử dụng các phương thức khai báo biến này.

Để việc theo dõi bài viết được dễ hơn một chút, chúng ta hãy xem thử định nghĩa của các keyword theo như [ECMA](https://www.ecma-international.org/ecma-262/6.0/) và [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript).

> ***Var*** :
> 
> *"`Var` keyword declares a variable which is scoped to its current execution context, optionally initializing to a value."*
>
> Keyword `var` khai báo một biến trong phạm vị context thực thi hiện tại, có thể cùng lúc khởi tạo nó với một giá trị.
>
> ***Let*** :
>> *"`Let` keyword declares a block scoped variable, optionally initializing it to a value."*
>
> Keyword `let` khai báo một biến trong phạm vi block, có thể cùng lúc khởi tạo nó với một giá trị.
>
> ***Const*** :
> 
> *"`Const` keyword declares constants which are block scoped much like variables defined using `let` but the value of a constant cannot change. The `const` declaration creates a read-only reference to a value."*
>
> Keyword `const` khai báo một hằng số trong phạm vị block *(giống như khai báo biến sử dụng `let` nhưng giá trị của hằng số không thể thay đổi)*. Khai báo bằng `const` tạo một tham chiếu read-only tới một giá trị.

---

# HOISTING

Về mặt ý tưởng, hoisting dùng để chỉ việc khai báo biến và hàm được chuyển lên bên trên cùng code của bạn. Về mặt kỹ thuật, điều đó không thực sự xảy ra mà việc khai báo biến và hàm sẽ được đưa vào bộ nhớ trong giai đoạn *biên dịch (compile)*, còn trong code của bạn, vị trí của chúng vẫn ở chính xác nơi mà bạn viết chúng. Điểm quan trọng chính của hoisting là nó cho phép chúng ta có thể sử dụng hàm trước khi khai báo chúng trong code.

Bạn chỉ cần nhớ những điểm chính về hoisting như sau:

* ***Thứ được di chuyển là việc khai báo biến và hàm. Việc gán giá trị hoặc khởi tạo biến không bao giờ được di chuyển cả.***

* ***Việc khai báo không thực sự được chuyển lên trên đầu code mà chính xác thì chúng được đưa vào bộ nhớ.***

Trong JavaScript, tất cả các biến được khai báo bằng keyword ***var*** sẽ có giá trị ban đầu là ***undefined***. Chúng có giá trị như vậy chính là do hoisting, việc khai báo các biến được đưa vào bộ nhớ và chúng được khởi tạo với giá trị là ***undefined***. Chúng ta có thể thấy việc này qua ví dụ như sau. Ta có file `UntitledDocument.js`:

![](https://images.viblo.asia/aa4bd228-12b5-4154-8177-40bf107146a2.png)

Chạy file này, ta sẽ được kết quả như sau:

![](https://images.viblo.asia/ce6dcf93-28e2-4c38-86ca-50fda4163423.png)

Tuy nhiên, biến được khai báo bằng keyword ___let___ hoặc ___const___ khi hoisting ta sẽ thấy chúng không được khởi tạo với giá trị undefined. Thay vào đó, chúng ở trong một trạng thái gọi là __Temporal Dead Zone__, trạng thái này kéo dài từ khi vào scope cho đến khi khai báo xong, trong khoảng này chúng sẽ không thể truy xuất/tham chiếu tới được. Trạng thái TDZ kết thúc sau khi việc khai báo kết thúc.

![](https://images.viblo.asia/e754baec-86f5-4e63-8d7f-cb7c053eb783.png)

![](https://images.viblo.asia/8cea7893-cb4c-4029-8113-6555d44b45d7.png)

Đoạn code tiếp theo sẽ thể hiện cho chúng ta thấy việc hoisting của các biến ___let___ và ___const___:

![](https://images.viblo.asia/bef6dbf1-949d-4f78-bcde-20ade2274083.png)

Dòng thứ 3 sẽ báo ReferenceError vì x ở dòng 4 đã được hoist lên đầu ở trong block:

![](https://images.viblo.asia/021a327f-972e-4286-9cb1-0cbb82224323.png)

Biến ___x___ được định nghĩa bằng keyword ___let___ ở trong block sẽ được hoist và được ưu tiên hơn là biến ___x___ được định nghĩa bằng ___var___. Tuy nhiên, nó vẫn ở trong ___Temporal Dead Zone___ khi được tham chiểu tới tại ___console.log(x)___ nên sẽ báo lỗi reference.

---

# SCOPE
Các biến được định nghĩa với keyword ___var___ có phạm vị trong context thực thi hiện tại. Vì phạm vị của chúng không bị giới hạn trong block nên chúng có thể được truy cập từ bên ngoài block mà chúng được định nghĩa, miễn là vẫn trong phạm vi context thực thi của nó. Khái niệm này được thể hiện như dưới đây:

* Lỗi ở dòng 9 do tham chiếu tới biến ___y___ ở ngoài scope của nó.

![](https://images.viblo.asia/7b9492e2-0e5a-4f41-a62d-c0472ffba19b.png)

![](https://images.viblo.asia/a378df2d-230a-4994-bf4e-f5da38b46225.png)

* Lỗi ở dòng 11 do tham chiếu tới biến ___y___ ở ngoài scope của nó.

![](https://images.viblo.asia/fcef6292-2719-42cf-9eb8-7a302f84086b.png)

![](https://images.viblo.asia/5cafe2b5-3156-4869-9ecb-e0fb7d870aa7.png)

* Lỗi ở dòng 12 do tham chiếu tới biến ___x___ ở ngoài scope của nó.

![](https://images.viblo.asia/e543e8a1-f378-46b7-954d-7a1580f8baa3.png)

![](https://images.viblo.asia/e1f6686e-5003-47a7-860a-b0a808154d23.png)

Thêm nữa, khi bạn khai báo nột biến global bằng keyword ___var___, biến đó sẽ được gắn với một global context (context này là __window__ với trình duyệt và __global__ với node). Còn các biến khai báo bằng ___let___ và ___const___ thì không.

---

# Lưu ý
* Khi bạn không khai báo biến mà gán giá trị cho biến, biến sẽ được tạo ra và gắn với global context (__window__ với  trình duyệt và __global__ với node). Tuy nhiên điều này là vô cùng không nên vì nó khiến cho việc debug trở nên rất khó khăn.

![](https://images.viblo.asia/c41b863c-4ffe-46a1-acf8-a965c5cb31a9.png)

![](https://images.viblo.asia/30b73a8f-bc76-42b4-a810-f630d9c54469.png)

* Các biến được khai báo với keyword ___var___ có thể được khai báo lại tại bất kì vị trí nào trong code, kể cả trong cùng một context. Các biến được định nghĩa bằng ___let___ và ___const___ thì không như vậy, chúng chỉ có thể được khai báo một lần trong scope của chúng.

![](https://images.viblo.asia/d457a43a-c2bb-4342-b0ca-43c41ba7f9fc.png)

![](https://images.viblo.asia/a4321b68-bafc-466a-b303-a63d1114c617.png)

Đặc biệt chú ý không sử dụng ___let___ hoặc ___const___ khai báo cũng một biến trong các case khác nhau khi sử dụng switch:

![](https://images.viblo.asia/0df4f706-5658-4987-9690-5db90e8a024e.png)

![](https://images.viblo.asia/64b8201b-a39d-4abc-95e5-b181960e07aa.png)

Tất nhiên là có thể tránh lỗi trên bằng cách thêm ngoặc nhọn quanh các case để tạo ra các block khác nhau, nhưng code khi đó chắc hẳn sẽ cần phải được refactor:

![](https://images.viblo.asia/12540e84-cb8b-45f2-bac0-f2c3380b67d9.png)

![](https://images.viblo.asia/00b156e5-0f71-4387-98e5-ee67301ee816.png)

* Một điểm nữa cần lưu ý về const đó là dù cho giá trị của chúng không thể bị gán lại nhưng nó vẫn có thể thay đổi được. Trường hợp này có thể thấy trong thực tế khi giá trị của const là một object, vì thuộc tính của object thì có thể sửa đổi được:

![](https://images.viblo.asia/91e0765d-b52c-433b-bccc-89d7f92abe86.png)

![](https://images.viblo.asia/e48387ef-a16b-4c5a-a30b-bdf06e236f8c.png)

---

Vậy là qua bài viết trên, mình đã tổng hợp các định nghĩa và các điểm cần lưu ý khi sử dụng các phương thức khai báo biến khác nhau trong JavaScript, cảm ơn các bạn đã đọc bài viết :bow: