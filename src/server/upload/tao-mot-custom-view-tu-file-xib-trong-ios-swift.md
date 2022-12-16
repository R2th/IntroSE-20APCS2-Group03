Khi code giao diện đôi khi chúng ta sẽ gặp trường hợp một ViewController chứa nhiều UIView khác nhau, mỗi UIView lại có một chức năng riêng. Việc xử lý tất cả các chức năng của UIView trong ViewController sẽ dẫn đến code trong ViewController phình to ra và rất khó kiểm soát. Vậy nên việc tạo ra các Custom View từ file XIB rồi quản lý chúng trong các file .swift, sau đó cho các UIVIew trong ViewController kế thừa lại chúng sẽ giúp code trong ViewController ngắn hơn. Mỗi Custom View được quản lý bằng 1 file riêng cũng sẽ giúp chúng ta dễ kiểm soát hơn.
Sau đây mình sẽ hướng dẫn chi tiết.
# Đầu tiên, tạo một project mới
![](https://images.viblo.asia/4b20b932-b97b-4146-a582-bf6c5a906656.png)
# Sau đó tạo một file XIB View
![](https://images.viblo.asia/a56e0cee-ac16-4523-a9bb-7547f90a7a9b.png)
Ở đây mình đặt tên file là TestView
# Design view vừa tạo trong Interface Builder
Ở đây mình cho background color màu xanh, sau đó add thêm 1 UILabel và tạo constraint cho UIlabel đó.
![](https://images.viblo.asia/913f395a-54ec-4ccb-ab48-a9a783595f51.png)
Nếu muốn thay đổi kích thước view của bạn. Hãy chọn View và đặt thuộc tính size thành freedom như ảnh dưới đây.
![](https://images.viblo.asia/3725d279-7bc2-4e01-b6f0-926c778ae0af.png)
# Tạo một file CustomView.swift
Khi đã có file XIB, chúng ra cần tạo một CustomView.swift để quản lý nó.
Chọn Cocoa Touch Class.
![](https://images.viblo.asia/f30f2bcd-a636-4921-a34a-31e3e8d5fc52.png)
Sau đó chọn Subclass of là UIView. Tên class mình sẽ đặt giống với tên file XIB là TestView. Vì nó sẽ liên kết với TestView.xib
![](https://images.viblo.asia/db6e1fbe-5b83-4187-87bc-362399376fa4.png)
# Override bộ khởi tạo UIView
Chọn TestView.swift, xoá các comment và gõ như sau:
![](https://images.viblo.asia/de9819a3-bb7a-47c9-97c1-906ddcd6f769.png)
# Kết nối TestView.swift và TestView.xib
Để kết nối được TestView.swift và TestView.xib chúng ta làm như sau:

1. Chọn TestView.xib

2. Chọn File's owner, trong phần Identity Inspector nhập TestView.

3. Nhấn Enter để tự động hoàn tất. Nếu không, bạn đang làm sai điều gì đó.
![](https://images.viblo.asia/d7bd7710-32ed-4a8e-9019-31a8d7af5aa3.png)
# Kéo Outlet cho các thành phần trong file xib 
Tương tự như kéo outlet trong UIViewController, tại đây chúng ta sẽ kéo outlet cho View và UILabel
![](https://images.viblo.asia/2763229f-22d9-4683-a005-a32b0e29a5e1.png)
Mình đặt tên cho View là contentView và UILabel là textLabel.
Tại project demo này UIView của mình khá đơn giản, nếu View của bạn cần custom nhiều thuộc tính thì bạn cũng có thể kéo Outlet cho các thuộc tính đó.
Lúc này code của chúng ta sẽ như ảnh bên dưới.
![](https://images.viblo.asia/8341e625-668b-4f52-b38c-c44784da1d48.png)
# Load XIB trong setupView()
Nhập code như bên dưới
![](https://images.viblo.asia/d97570cf-d7be-4368-9844-9d03ac427336.png)
Dòng đầu tiên mình đã load file xib theo tên từ bộ nhớ

Dòng tiếp theo mình add contentView như một subView của view mà mình đã tạo

2 dòng tiếp theo, mình đã định vị contentView để show full toàn bộ giao diện.
# Sử dụng TestView
Tại ViewController chúng ta kéo 1 UIView vào, sau đó set constraint và cho UIView đó kế thừa TestView.
![](https://images.viblo.asia/d1194464-18d6-4506-bb9e-f1cf86ccc9a8.png)
Kéo Outlet cho TestView
![](https://images.viblo.asia/0c595891-cf97-4dd6-bf2e-622ed88e1411.png)
Sử dụng TestView.
![](https://images.viblo.asia/15bc218e-f74b-4c63-b321-32e85e0f9cb2.png)
Và đây là thành quả sau khi Run project
![](https://images.viblo.asia/a00e78b2-0113-4882-a45b-6668fa3c82b4.png)
# Kết luận
Trên đây là hướng dẫn của mình. Vì project demo nên có thể các bạn chưa thấy rõ được việc rút ngắn code trong ViewController. Nhưng với những View phức tạp thì các bạn sẽ thấy rõ hơn. Ví dụ như trong 1 ViewController chứa 2 UIView. mỗi UIView show 1 CollectionView. Chúng ta có thể sử dụng cách này và chỉ cần truyền data vào trong UIView đó. Sau đó việc setup CollectionView được viết riêng tại mỗi UIView,...

Cảm ơn các bạn đã theo dõi bài viết