# 1.  Giới thiệu về Static typing và Dynamic typing
Các ngôn ngữ lập trình thông thường có thể chia ra thành Static typing và Dynamic typing. Static typing (không nên nhầm lẫn với từ khóa static, được sử dụng cho các class) xác thực cú pháp hoặc kiểm tra lỗi trong quá trình biên dịch. Mặt khác, các ngôn ngữ loại Dynamic typing xác thực cú pháp hoặc kiểm tra lỗi tại thời điểm chạy. Ví dụ, C# và Java là Static typing và JavaScript là một ngôn ngữ Dynamic typing.

C# trước đây được coi là một ngôn ngữ loại Static typing, vì tất cả các đoạn mã được viết đều được xác nhận hợp lệ tại thời điểm biên dịch. Nhưng với sự ra đời của từ khóa Dynamic trong C # 4.0, nó cũng trở thành một ngôn ngữ Dynamic typing. Hai khái niệm về Static và Dynamic typing trong C# có thể được minh họa bằng việc sử dụng hai từ khóa có tên Var và Dynamic.
# 2.  Giới thiệu về từ khóa Var và Dynamic
*  Var xuất hiện lần đầu ở phiền bản C# 3.0 và Dynamic xuất hiện ở phiên bản C# 4.0

1. Thời điểm các loại biến suy ra kiểu dữ liệu
*  Var là một biến được nhập kiểu tĩnh.Kiểu dữ liệu của các biến này được suy ra tại thời điểm biên dịch. Điều này được thực hiện dựa trên loại giá trị mà các biến này được khởi tạo.
* Dynamic là các biến được nhập động. Điều này có nghĩa là kiểu dữ liệu của chúng được suy ra tại thời gian chạy chứ không phải thời gian biên dịch ngược lại với kiểu Var  

2. Khởi tạo các loại biến
* Với Var kiểu dữ liệu của các biến bắt buộc phải được khởi tạo tại thời điểm khai báo, nếu không chúng sẽ gặp phải lỗi trong thời gian biên dịch "Implicitly-typed local variables must be initialized."
* Với Dynamic, chúng ta không cần khởi tạo khi khai báo.

3. Thay đổi kiểu dữ liệu của biến đã được khởi tạo
* Var không cho phép thay đổi kiểu dữ liệu sau khi nó đã được gán. Điều này có nghĩa là nếu chúng ta gán một giá trị Int cho Var thì chúng ta không thể gán một giá trị string cho nó. Điều này là do, khi gán giá trị Int, nó sẽ được coi là kiểu int sau đó. Vì vậy, sau đó không thể gán loại giá trị nào khác. <br><br>
 ![](https://images.viblo.asia/0c8d6a28-5e0b-4fcb-9107-6c6b6c1226b8.jpg)
*  Dynamic cho phép kiểu dữ liệu thay đổi sau khi nó đã được gán cho ban đầu. Trong đoạn mã trên, nếu chúng ta sử dụng Dynamic thay vì Var, nó sẽ không chỉ biên dịch mà còn hoạt động trong thời gian chạy. Điều này là do, tại thời điểm chạy, giá trị của biến đầu tiên được suy ra là Int và khi giá trị của nó được thay đổi, nó được suy ra là string.<br><br>
![](https://images.viblo.asia/feeac920-df18-405b-bd8a-53b47fa42b92.jpg)

4. Hạn chế của Var và Dynamic
* Biến Dynamic có thể được sử dụng để tạo thuộc tính và trả về giá trị từ một hàm.
* Biến Var không thể được sử dụng cho các giá trị thuộc tính hoặc trả về từ một hàm. Chúng chỉ có thể được sử dụng làm biến cục bộ trong một hàm. 

# 3.  So sánh Var, Dynamic và Object
Nếu chúng ta quan sát kỹ lưỡng kiểu Dynamic, nó đang thực hiện khá nhiều nhiệm vụ giống như kiểu Object (là kiểu cơ sở của tất cả các kiểu khác). Vậy thì sự khác biệt giữa kiểu Object và Var là gì? Ngoài ra, tại sao chúng ta cần Var khi chúng ta có kiểu Object. Hãy thảo luận những điểm này bằng cách thực hiện một số so sánh.

1. Khi sử dụng một kiểu Object, trình biên dịch chỉ cung cấp thông tin chung, chức năng hoặc các chức năng liên quan đến kiểu mà nó nắm giữ, cho đến khi nó được nhập kiểu thực tế của nó. Điều này có nghĩa là ngay cả khi chúng ta đã lưu trữ các giá trị kiểu Int hoặc string trong một kiểu Object, chúng ta sẽ chỉ nhận được các hàm liên quan của chúng khi chúng ta chuyển đổi kiểu đối tượng thành kiểu thực của nó. Xem ví dụ bên dưới:<br><br>
![](https://images.viblo.asia/4762fcc1-d1c9-4694-8bfc-28ad8749f3a5.jpg)<br><br>
Ở đây, chúng ta chỉ có các thuộc tính và hàm chung cho loại giá trị được khai báo ngay cả khi chúng ta lưu trữ một số nguyên hoặc loại giá trị khác trong đó. Bây giờ, hãy chuyển nó thành kiểu dữ liệu thực tế của nó là string.
![](https://images.viblo.asia/e353ae8a-b630-42b8-a078-b5c743dad163.jpg)<br><br>
Bây giờ sau khi chuyển về kiểu string, chúng ta có các thuộc tính và chức năng cụ thể của nó. Nhưng nếu chúng ta sử dụng kiểu Var để lưu trữ cùng một giá trị, chúng ta sẽ không bắt buộc phải thực hiện chuyển đổi rõ ràng, vì trình biên dịch sẽ suy ra kiểu dữ liệu của nó từ giá trị được khởi tạo và chúng ta sẽ có các chức năng và thuộc tính của nó. <br>

2. Object type sẽ phải kết hợp quá trình boxing và unboxing nếu chúng ta muốn sử dụng các giá trị thực được lưu trữ trong đó hoặc sử dụng bất kỳ chức năng nào liên quan đến nó. Nhưng với Var thì sẽ không cần quá trình đó vì chúng ta đã biết kiểu dữ liệu của nó tại thời điểm sử dụng. Ví dụ, trong đoạn mã trên, chúng ta chỉ được sử dụng các hàm liên quan đến biến string sau khi chúng ta chuyển đổi đối tượng thành string. Vì vậy, điều này dẫn đến việc bỏ quá trình boxing. Mặt khác, đối với các kiểu Dynamic, chúng ta chỉ cần biết rằng hàm hoặc thuộc tính mà chúng ta đang sử dụng thực sự tồn tại cho kiểu dữ liệu đang được lưu trong đó. <br>
Ví dụ như ảnh dưới đây, nếu chúng ta khai báo một biến Dynamic để lưu trữ  một giá trị kiểu string thì chúng ta có thể sử dụng thuộc tính Length.<br> <br>
![](https://images.viblo.asia/738ae1dc-88fc-441a-8673-bfd72aca5f5a.jpg)<br><br>
3. Chúng ta cần phải cẩn thận khi ép kiểu hoặc chuyển đổi các giá trị, khi sử dụng các biến Dynamic hoặc Object. Bất kỳ sai sót nào có thể dẫn đến lỗi ở thời gian chạy chương trình. Mặt khác, kiểu Var sẽ gây ra lỗi thời gian biên dịch cho một chuyển đổi không chính xác. Vì vậy việc xảy ra lỗi trong thời gian chạy chương trình là không thể. <br> <br>
![](https://images.viblo.asia/42eb1713-a192-40be-9d05-eb8360c5ac46.jpg) <br><br>
Như ví dụ trên, kiểu dữ liệu được lưu trữ là dạng string, nhưng chúng ta đang cố gắng ép kiểu thành Int. Vì vậy, nó sẽ gây ra lỗi trong thời gian chạy chương trình<br><br>
![](https://images.viblo.asia/ee4f477e-2ea4-4af8-979f-a22b3dd38280.jpg)<br><br>
Tương tự, nếu chúng ta đang lưu 1 giá trị kiểu string và ép kiểu thành Int. Vì vậy, nó sẽ lại dẫn đến lỗi.
# 4.  Kết luận
Bên trên là một số thông tin cơ bản về 2 từ khóa Var và Dynamic và so sánh chúng với kiểu Object. Sẽ không thể so sánh được là sử dụng kiểu nào tốt hơn, mà điều đó phụ thuộc vào hoàn cảnh và yêu cầu của bài toán. Hy vọng bài viết này sẽ giúp các bạn có thể sử dụng 2 từ khóa này một cách tốt nhất.