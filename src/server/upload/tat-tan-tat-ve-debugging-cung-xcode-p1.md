Ở bài viết trước mình đã giới thiệu về bug và debug, các bạn có thể tham khảo tại đây:
[Các sai lầm thường mắc phải khi Debug](https://viblo.asia/p/cac-sai-lam-thuong-mac-phai-khi-debug-E375zx4qZGW).

Trong series bài viết này mình sẽ tổng hợp các kĩ năng cơ bản mà ai cũng cần biết và kèm theo đó là những tips, tricks mà mình cóp nhặt được để debug cùng Xcode một cách hiệu quả.
## Phần 1: Xcode Debugging sử dụng breakpoints.
Bài viết này sẽ chỉ tập trung vào giới thiệu về kĩ thuật debug Xcode sử dụng breakpoint - một debugging tool của Xcode.
> *A breakpoint is a debugging tool that allows you to pause the execution of your program up to a certain moment.*
>

Chúng ta có thể hiểu breakpoint là một công cụ hỗ trợ được tích hợp trong Xcode để giúp chúng ta ngưng việc xử lí của chương trình tại một thời điểm. Việc tạm thời dừng xử lí giúp chúng ta có thể đánh giá, kiểm tra, đảm bảo code của ta chạy đúng, đồng thời hỗ trợ điều tra dấu vết của Bug khi có lỗi ngoài ý muốn xảy ra.

> *Creating “pause” points in your code can help you investigate your code to see where bugs occur.*
> 

Làm thế nào để tạo và sử dụng breakpoint?

> *Easy. Decide on where you want to pause the execution of your code and click in the left gutter to create a blue breakpoint.*
> 

Bất kì đầu dòng code nào của Xcode đều có thể đặt breakpoint bằng cách đơn giản là click vào số dòng ở phía bên trái của khu vực code.

![](https://images.viblo.asia/74789d43-27d2-4e6e-9918-befa3417a154.png)

* Ghi chú:
1. Debug Navigator: hiển thị tất cả threads và breakpoints.
2. Thời điểm thread được tạo ra và xử lí code.
3. Có thể dễ dàng đặt breakpoint bằng các click vào số thứ tự của dòng code ở phía bên trái khu vực code
4. Khu vực debug.
5. Active và Deactive Breakpoints.
6. Tiếp tục hoặc dừng xử lí (keyboard shortcut: ⌃ + ⌘ + Y).
7. Step Over: thực thi dòng code tiếp theo (keyboard shortcut F6).
8. Step Into: đi vào bên trong function được gọi xem xét (keyboard shortcut F7).
9. Step Out: nhảy ra khỏi function (keyboard shortcut F8).
10. "lldb" nghĩa là "low level debugger"

Trong ảnh trên mình đã đặt debug tại đầu dòng của hàm ViewDidLoad(). Tại đây Xcode sẽ dừng xử lí TRƯỚC KHI thực thi hàm ViewDidLoad(). Mình đặt thêm một breakpoint nữa tại dòng số 24. 

Tại đây nếu mình click vào icon cho phép tiếp tục hoặc dừng xử lí (keyboard shortcut: ⌃ + ⌘ + Y) thì Xcode sẽ dừng tại thời điểm trước khi code ở dòng số 24 được thực thi. Sau đó nếu mình click icon này một lần nữa thì code sẽ chạy như bình thường.
![](https://images.viblo.asia/98a069a9-ad3a-4b68-ba0f-586b7786416b.png)

Tuy nhiên nếu tại đây mình không cho Xcode tiếp tục chạy như bình thường mà click vào Step over: thực thi dòng code tiếp theo (keyboard shortcut F6) thì Xcode sẽ dừng lại trước dòng code tiếp theo phải thực thi.
![](https://images.viblo.asia/71014580-eb2e-490e-8fee-64d1ea4486ea.png)

Tiếp theo trước đó mình đã chọn tab Quicksort nên trong vòng switch dòng gọi hàm Quicksort sẽ được nhảy vào.
![](https://images.viblo.asia/8b924413-c98e-42fa-b0d8-fa015814cce2.png)

Tại đây chúng ta có thể click vào Step Into: đi vào bên trong function được gọi xem xét (keyboard shortcut F7) để xem chi tiết phần code được thực thi trong function được gọi này.
![](https://images.viblo.asia/0a1479d4-ff98-4786-a9e6-b06950cb3582.png)

Ngoài ra nếu muốn dừng việc inspect bên trong function nhưng chưa muốn kết thúc việc tracking sau function đó thì chúng ta có thể click vào Step Out: nhảy ra khỏi function (keyboard shortcut F8).
![](https://images.viblo.asia/505a498a-521c-4ee3-91d0-ef61729950c2.png)

Nếu muốn loại bỏ breakpoint đã được đặt, chúng ta có thể click chuột phải tại vị trí của breakpoint để hiện thị các options, chúng ta cũng co thể kéo thả breakpoint ra ngoài để loại bỏ nó, ngoài ra click chuột phải sẽ disable breakpoint (làm nó mờ đi chứ không biến mất).
![](https://images.viblo.asia/ccd3e994-c0f8-4ffa-a084-e30ccd0453fb.png)

Dòng thông báo (lldb) xuất hiện khi ta đặt breakpoint mang ý nghĩ là "low level debugger", Xcode cung cấp cho chúng ta một môi trường debug cho ứng dụng iOS thông qua console.
> *LLDB stands for “low level debugger” which provides the underlying debugging environment for developing for iOS applications. It can be used to find and eliminate issues in your Swift and Objective-C code.*

Vậy thì Breakpoint và LLDB liên quan gì đến nhau? LLDB cho phép chúng ta sử dụng các câu lệnh để debug trên console của Xcode: set breakpoint, liệt kê tất cả breakpoint cũng như disable breakpoint.
> *You can type in shortcut commands into the LLDB to help you set breakpoints at certain lines of code, set breakpoints at many points in your code, list all your breakpoints, and disable breakpoints.*  

![](https://images.viblo.asia/d8cb1d46-0ae4-42ad-89ac-90ab35fa07b3.png)

Trong phần console mình đã dùng lệnh `breakpoint set --selector viewDidLoad` để set breakpoint tại tất cả các vị trí tồn tại keyword "viewDidLoad". Lệnh `breakpoint list` để liệt kê tất cả các breakpoint hiện tại đang được set. Chúng ta có thể xem chi tiết thông tin của từng breakpoint, thậm chí có thể nắm được số lần Xcode đã chạy đến breakpoint đó thông qua hit count. Lệnh `breakpoint disable` dùng để disable tất cả các breakpoint hiện hành, nếu mình thêm một số n là Int ngay sau, xcode sẽ hiểu là mình đang muốn disable breakpoint ở vị trí thứ n.

Trên đây là sơ lược về cách sử dụng breakpoint để debug trong Xcode, mình sẽ tiếp tục giới thiệu về các phương pháp debug trong các bài viết tiếp theo. Hi vọng rằng bài viết này có ích cho mọi người trong công cuộc diệt "bọ" sau này. Cảm ơn vì đã quan tâm đến bài viết của mình.
![ahihi](https://images.viblo.asia/d210442e-71b6-42aa-be21-73c4e3710b88.jpg)

Các bạn cũng có thể tham khảo:

[Xcode’s Debugging Tools](https://developer.apple.com/library/content/documentation/DeveloperTools/Conceptual/debugging_with_xcode/chapters/debugging_tools.html)

[Apple’s GDB and LLDB Command Examples](https://developer.apple.com/library/content/documentation/IDEs/Conceptual/gdb_to_lldb_transition_guide/document/lldb-command-examples.html)

[Udacity Course (free) — Debugging](https://www.udacity.com/course/xcode-debugging--ud774)

[Xcode Debugging with Breakpoints (for Beginners)](https://medium.com/yay-its-erica/xcode-debugging-with-breakpoints-for-beginners-5b0d0a39d711)