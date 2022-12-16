Nếu bạn đã là một lập trình viên Objective-C nhiều kinh nghiệm và muốn có trải nghiệm mới, hoặc muốn học thêm một điều gì đó mới, thì đây chính là bài viết phù hợp với bạn.

## Giới thiệu sự tương quan giữa C++ và Objective-C

Cả hai ngôn ngữ này đều chia sẻ cùng một nguồn gốc, đó chính là C. Điều đó có nghĩa là chúng đều có thể sử dụng những đặc tính, đặc điểm của C cùng với những đặc điểm riêng biệt ở trong chúng.

Nếu bạn đã làm quen với Objective-C, thì những khái niệm cơ bản về C++ cũng rất dễ dàng được nắm bắt. Ví dụ như kiểu dữ liệu như "int", "float", hoặc "char" được xử dụng và xử lý giống y hệt nhau.

Cả Objective-C và C++ đều đưa khái niệm hướng đối tượng và C. Nếu bạn chưa quen với thuật ngữ "hướng đối tượng", thì bạn phải hiểu rằng tất cả những xử lý về dữ liệu đều được xây dựng trên đối tượng, hay là các thực thể của class. Thực tế, C++ còn được gọi là "C với Classes", điều mà đã ngầm thể hiện mục đích của C++.

Vậy sự khác biệt giữa Objective-C và C++ là gì? Trong C++, hầu như các hành động xảy ra trong thời điểm "compile", khác với Objective-C, thì lại xảy ra ở "run time". Có thể bạn đã từng trải qua nhưng điều đó với Objective-C run time để thực hiện những điều khá khó như "method swizzling". Trong C++ thì điều đó là không thể. Hơn nữa, trong C++ bạn không thể nào lấy được class từ đối tượng giống như trong Objective-C khi mà có thể dễ dang thêm hàm "class" để lấy. Và cũng khó các hàm như là  "isMemberOfClass" hoặc "isKindOfClass" trong C++.

Đó là một số điểm giống và khác nhau giữa hai ngôn ngữ. Bây giờ chúng ta sẽ đi vào ý chính của bài viết này.

## C++ Class

Điều đầu tiên bạn cần hiểu trong một ngôn ngữa hướng đối tượng là cách khai báo một class. Trong Objective-C, bạn tạo một file header và một file Implement để khai báo class. Với C++ cũng thể, cú pháp cũng tương tự như nhau.

Objective-C:

![](https://images.viblo.asia/cd324a87-7f80-48a2-9e70-4d9b94443779.png)

C++

![](https://images.viblo.asia/84fc8134-ab50-4dcd-aebd-1811adaddb03.png)

Có một vài điểm khác biệt ở đây. Điều thứ nhất là file Implement trong C++ không có gì cả. Bởi vì bạn không khai báo hàm nào trong Class. Tương tự như Objective-C không cần "@implemenation/@end".

Trong Objective-C, tất cả các class hầu như đều kế thừa từ "NSObject". Bạn có thể tạo root class riêng cho mình có nghĩa rằng class của bạn sẽ không có superclass. Điều này đồng nghĩa với việc ở thời điểm runtime thì class này sẽ chẳng làm gì cả. Trái ngược với C++ khi mà thông thường mọi class đều khôgn có superclass giống như ví dụ ở bên trên.

Một điểm khác nữa là "#include" với "#import". Objective-C thêm chỉ thị "#import" vào C. Đối với C++ thì không có thêm chỉ thị nào mới nên nó vẫn dùng "#include" như trong C. Trong Objective-C thì "#import" đảm bảo rằng bạn sẽ chỉ thêm file này một lần, những trong C++ bạn phải tự làm điều này.

## Thuộc tính và hàm

Tất nhiên, còn nhiều thứ phải làm trong class ngoài việc khai báo nó. Giống như trong Objective-C, trong C++ bạn có thể thêm "variable" và "method" vào trong class, nó thường được gọi là "member variable" và "member functions".

Dưới đây là ví dụ:

![](https://images.viblo.asia/1fec5675-b63f-40a5-9257-ccbbdc26c010.png)

Trên đây là 3 biến và 2 hàm. Trong C++, ta có thể giới hạn quyền truy cập của những hàm và biến này. 

![](https://images.viblo.asia/a04b00da-da44-451f-bf87-f44f2b3af7fe.png)

"x", "y" và "foo" có thể truy cập bất cứ đâu. Điều này có nghĩa rằng chúng có thể được sử dụng kể cả bên ngoài "MyClass". Tuy nhiên, "z" và "bar" là private. Điều này có nghĩa rằng chúng chỉ có thể sử dụng trong "MyClass" mà thôi. Các biến có mặc định quyền truy cập là "private".

Sự khác biệt này có tồn tại trong Objective-C, tuy nhiên ít khi dùng. Mặc khác, giới hạn quyền truy cập cho method trong Objective-C là có thể. Kể cả khi bạn khai method trong phần Implement của class, và không đưa nó ra ngoài, bạn vẫn có thể gọi method đó ở bên ngoài.

Method trong Objective-C là public hay private tuỳ thuộc vào quy định "convention" của chúng ta. Đây là lý do nhiều lập trình viên chọn đựat prefix cho private method với những kí tự như "p_" để giới hạn. Điều này trái ngược với C++ khi bộ biên dịch sẽ báo lỗi khi gọi method private ở bên ngoài.

Vậy làm thế nào để bạn sử dụng được một class? Giống như Objective-C thôi, bạn làm như sau:

![](https://images.viblo.asia/aeaa0079-2292-4f58-85f8-5373d7f360ff.png)

## Class Member Function

Cách đầu tiên để thực thi một method đó là khai báo nó trong file implemenation của class - file .cpp. Bạn làm như sau:

![](https://images.viblo.asia/5053eced-c8fa-49c3-bda3-c26ff47a6bc0.png)

Chú ý cách sử dụng "MyClass::", đây là cách bạn nói rằng hàm "foo()" đã được thực thi như là một phần của "MyClass".

Cách thứ hai có thể làm trong C++ mà không thể làm trong Objective-C, đó là viết luôn hàm đó vào file header.

![](https://images.viblo.asia/2cb8447a-6436-4a77-b8d7-8dbd5458df5e.png)

Điều này có thể trông hơi lạ với người dùng Objective-C. Tuy nhiên lại khá hữu dụng. Khi mà một hàm được khai báo theo kiểu này, bộ biên dịch có thể thực thi một phương pháp tối ưu gọi là "inlining". Điều này nghĩa là khi hàm này được gọi, thay vì phải nhảy vào một block code mới, thì cả hàm đã được biên dịch ngay khi gọi.

![](https://images.viblo.asia/347ee563-ae9a-4384-9eed-544c7b4720b1.png)

## Namespace

Ví dụ bạn thấy ở trên đã giới thiệu một vài cú pháp mới mà bạn chưa từng thấy, hai dấu hai chấm "::". Đây là một cách để bạn tham chiếu đến scope nằm trong C++; nó được sử dụng ở bên trên để nói với biên dịch chỗ để tìm hàm "foo()".

Ở một chõ khác mà bạn cũng sẽ thấy dấu này đó là khi bạn sử dụng "namespace". Namespace là một cách để chia cắt code, để việc đặt tên đỡ bị trùng.

Ví dụ bạn có thể tạo một class là "Person", và một đoạn code của một thư viện nào đó mà bạn dùng ở bên ngoài cũng có một class tên là "Person". Với lẽ đó, thường thì code hay được đặt vào trong namespace để tránh việc xung đột và tên này.

![](https://images.viblo.asia/26c89d5e-3147-46d3-bd38-c1ca968690a6.png)

Khi mà chúng ta đã có 2 class "Person", chúng ta sẽ sử dụng như sau:

![](https://images.viblo.asia/67a160f7-0040-4066-9c54-899a514a5b19.png)

Không có cách sử dụng nào tương tự ở trong Objective-C, ngoài việc đặt ra convention là thêm prefix vào đầu tên của class.

Ở phần tới chúng ta sẽ đến với việc quản lý memory, cảm ơn các bạn đã đón xem

Ref: https://www.raywenderlich.com/62989/introduction-c-ios-developers-part-1