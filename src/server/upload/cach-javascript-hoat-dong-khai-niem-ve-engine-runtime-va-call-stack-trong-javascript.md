Nguồn: https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf

**Notes:** *Bài này là bài dịch từ blog khác, mình sẽ loại bỏ phần quảng cáo không liên quan để các bạn tập trung vào kiến thức được chia sẻ cụ thể trong bài này. Nếu muốn đọc sâu hơn và kỹ hơn thì các bạn nên đọc bài gốc. Cảm ơn ^^!*

JavaScript đang càng ngày càng phổ biến, các đội ngũ lập trình viên đang tận dụng hầu hết hiệu quả của nó để phát triển và giải quyết các bài toán hiện nay trong các ứng dụng của họ như Front-end, Back-end, hybrid apps, embedded devices và nhiều hơn thế. 

Blog này cũng là bài đầu tiên trong series tìm hiểu sâu về JavaScript và cách hoạt động thực tế của nó: chúng tôi tin rằng việc hiểu sâu hơn việc các code blocks trong javaScript được xây dựng như thế nào, và cách chúng hoạt động với nhau ra sao sẽ giúp các lập trình viên tối ưu hoá code của họ nhiều hơn, làm cho các ứng dụng chạy tốt, nhanh và hiệu quả hơn. 

Trong biểu đồ dưới đây thể hiện số liệu thống kê trên [GitHub](https://githut.info/). JavaScript hiện tại đang đứng đầu số các repo và số lượt push lên Git. Rõ ràng là nó không bị tụt lại phía sau nhiều như các ngôn ngữ khác.

![](https://images.viblo.asia/bf142d07-b25f-4b8c-bb19-e802cd8a1a4d.png)

Việc các dựng án hiện tại đang phụ thuộc vào JavaScript ngày càng nhiều, bắt buộc các lập trình viên phải hiểu nhiều và hiểu sâu hơn về bản chất vấn đề với JavaScript để có thể sử dụng nó tốt hơn và tạo ra những ứng dụng chất lượng và tuyệt vời hơn. 

Hoá ra là hiện tại có rất nhiều các lập trình viên sử dụng javaScript hằng ngày như cơm bữa, nhưng thực tế lại không hiểu rõ câu chuyện vận hành thực sự đằng sau đó là gì. (thí dụ tui ^^)

# Khái Quát
Hầu như tất cả mọi người đã nghe về khái niệm **V8 Engine** ([đọc thêm ở đây](https://v8.dev/)) và JavaScript thực chất là **single-threaded** (đơn luồng) hoặc về việc javascript sử dụng các **Callback Queue**

Trong bài này chúng ta sẽ đi qua hết chi tiết các khái niệm trên và tìm hiểu sâu về cách hoạt động của chúng. Khi hiểu được bản chất vấn đề bạn đương nhiên có thể viết được một ứng dụng tốt hơn, non-blockings và tận dụng đúng và tốt nhất các APIs được cung cấp.

Nếu bạn là một beginner JavaScript thì qua bài này bạn có thể hiểu hơn tại sao JavaScript được coi là một ngôn ngữ khá "kỳ cục" so với hầu hết các ngôn ngữ khác. 

Còn nếu bạn đã có kinh nghiệm với JavaScript rồi thì hy vọng bài này sẽ cung cấp cho bạn vài khái niệm mới về cách mà JavaScript Runtime hoạt động. Thứ mà bạn đang làm việc với nó hằng ngày.

# The JavaScript Engine
Một trong những Engine phổ biến nhất của javaScript là **Google’s V8** engine. Ví dụ nó được dùng trong trình duyệt Chrome và Nodejs. Đây là hình ảnh cụ thể và đơn giản nhất mô tả V8 engine.

![](https://images.viblo.asia/7c6898aa-b494-42ef-bb43-e35df140adf2.png)

Engine này bao gồm 2 components chính:
* Memory Heap -- Các tác vụ phân bổ vùng nhớ sẽ thực hiện ở đây.
* Call Stack -- Nơi mà các Stack frames trong code của bạn sẽ được thực thi. 

# The Runtime
Trong thực tế hiện này có một số APIs trên trình duyệt mà chúng ta vẫn đang sử dụng hằng ngày (vd: “setTimeout”). Tuy nhiên những APIs này lại không được cung cấp bởi Engine.

Vậy những APIs này từ đâu mà có?

Hoá ra thực tế lại có chút phức tạp hơn chúng ta nghỉ. 

![](https://images.viblo.asia/64a0844b-77f6-4611-9683-ce91f8b66c5e.png)

Vậy ở đây chúng ta có Engine, nhưng không chỉ có thế. Chúng ta còn có thêm một thứ gọi là **Web APIs**. Những APIs này được cung cấp bởi chính browser mà chúng ta đang sử dụng. Các APIs đó bao gồm DOM, AJAX setTimeout,...

Và tiếp đó còn có các **event loop**  (sự kiện vòng lặp) thông dụng và **callback queue**. 

# The Call Stack
JavaScript là ngôn ngữ single-threaded (đơn luồng). Có nghĩa là nó chỉ có một **call stack** đơn lẻ. Cho nên nó chỉ thực hiện duy nhất mỗi 1 tác vụ trong một lần thực thi. 

Call Stack là một cấu trúc dữ liệu ghi lại cụ thể nơi mà đoạn code của chúng ta được thực thi trong chương trình. Khi bạn bắt đầu một function, function đó sẽ được đẩy vào vùng chứa đầu tiên của stack. Rồi khi function đó kết thúc thì nó sẽ được remove ra khỏi stack. Đó là toàn bộ những gì stack có thể làm cho bạn.

Hãy xem một ví dụ sau đây. Theo dõi đoạn code sau: 

```
function multiply(x, y) {
    return x * y;
}
function printSquare(x) {
    var s = multiply(x, x);
    console.log(s);
}
printSquare(5);
```

Khi Engine bắt đầu thực thi đoạn code này thì Call Stack lúc đó sẽ rỗng. Các bước thực thi tiếp theo trong Call Stack sẽ trông như thế này:

![](https://images.viblo.asia/bda3a9e9-3f80-45fb-b4c0-1a32c699fc12.png)

Từng lần ghi lại trong stack sẽ được gọi là **Stack Frame**.

Còn đây mô tả chính xác các **stack trace** (vết tích của stack) được tạo ra trong call stack khi có một exception (ngoại lệ/error) văng ra --- hay còn gọi là trạng thái của Call Stack khi xảy ra exception. Theo dõi đoạn code sau đây.

```
function foo() {
    throw new Error('SessionStack will help you resolve crashes :)');
}
function bar() {
    foo();
}
function start() {
    bar();
}
start();
```

Nếu mình thực thi đoạn code này trên console của Chrome (giả sử đoạn code này thuộc một file gọi là foo.js). Lúc đó stack trace sẽ xuất ra như thế này: 

![](https://images.viblo.asia/c8946ed7-05d8-4030-b6ef-cd140c740c4c.png)

**“Blowing the stack”** --- (hiểu nôm na là tràn vùng chứa) --- Vấn đề này sẽ xảy ra khi stack của bạn vượt quá Call Stack size và thực tế là nó rất hay xảy ra. Đặt biệt là khi bạn xài các hàm đệ quy mà ko kiểm soát kỹ. Hãy nhìn đoạn code dưới đây.

```
function foo() {
    foo();
}
foo();
```

Khi engine thực thi đoạn code trên. Nó sẽ bắt đầu gọi hàm "foo". Tuy nhiên function foo là một hàm đệ quy, nó tự gọi chính nó mà không hề có bất cứ điều kiện dừng nào. Chính vì vậy cứ mỗi lần function foo được gọi, thì chính nó sẽ được add liên tục vào Call Stack mà không thể dừng lại. Hình dưới đây sẽ minh hoạ rõ hơn:

![](https://images.viblo.asia/d73b1f53-98c0-42d3-b48a-ae2791c31760.png)

Tuy nhiên một khi số lượng các hàm "foo" được gọi vượt quá size thực tế của Call Stack thì lúc đó browser sẽ thực thi một hành động trả ra lỗi giống như hình dưới đây:

![](https://images.viblo.asia/3b8407ab-32b6-459e-aad5-8533938c07b0.png)

Việc chạy code đơn luồng dường như dễ dàng hơn khi bạn không cần phải đối mặt với những vấn đề phát sinh trong môi trường đa luồng (**multi-threaded**)  --- thí dụ như là **[deadlocks](https://vi.wikipedia.org/wiki/Deadlock)**

Tuy nhiên việc chạy đơn luồng cũng bị hạn chế. Khi mà JavaScript chỉ có một Call Stack đơn lẻ để thực hiện các tác vụ, và phải chờ đợi xong tác vụ này mới tới tác vụ khác. **Vậy điều gì xảy ra khi mọi thứ đều trở nên chậm chạp?**

# Concurrency & the Event Loop

Nếu bạn có một function được gọi trong Call Stack mà function đó lại mất tới một khoản thời gian rất lâu để thực thi xong, lúc đó đó sẽ phải làm thế nào? Tưởng tượng bạn có một số tác vụ muốn chuyển đổi các images code bằng JavaScript và chạy trên trình duyệt.

Bạn có lẽ hỏi --- Thì chuyện này có gì đâu mà lại vấn đề chứ? Vấn đề ở đây là khi mà Call Stack đang thực hiện nhiệm vụ của nó thì browser sẽ không thể làm gì khác được -- nó sẽ bị blocked. Nghĩa là lúc đó browser sẽ không thể render (biên dịch), không chạy các code nào khác. Nó đơn giản là bị kẹt lại một chỗ. Điều này sẽ làm cho app của bạn trở nên chậm chạp, không đẹp và thân thiện với người dùng.

Vấn đề không chỉ dừng ở đó. Một khi mà browser phải thực hiện quá nhiều tác vụ trong Call Stask, nó sẽ bị đứng và người dùng không thể tương tác với browser trong một khoảng thời gian khá lâu. Và rồi lúc đó đa số các trình duyệt sẽ hiện lên một thông báo lỗi và hỏi người dùng muốn tắt trình duyệt hay tiếp tục chờ.

![](https://images.viblo.asia/013ec409-1d84-4b67-b185-4603e0a5854d.jpeg)

Đây chắc hẳn không phải là một trải nghiệm người dùng tốt nhỉ?

Rồi bây giờ làm sao để thực thi những đoạn code nặng nề mà không làm chậm hoặc đứng trình duyệt? Giải pháp cho tất cả chính là **asynchronous callbacks** (các callbacks bất đồng bộ).

Điều này sẽ được trình bày chi tiết và rõ ràng hơn trong **Part 2** series “How JavaScript actually works”. "[Bên trong engine V8 + 5 tips làm code của bạn tốt hơn](https://viblo.asia/p/cach-javascript-hoat-dong-chi-tet-ve-v8-engine-5-tips-de-toi-uu-hoa-code-cua-ban-1Je5EPDjlnL)"