Auto Layout là một hệ thống mà layout được sắp xếp dựa trên các ràng buộc. Nó cho phép các nhà phát triển tạo ra một giao diện người dùng thích ứng đáp ứng phù hợp với những thay đổi về kích thước màn hình và hướng thiết bị.
iPhone đầu tiên được ra mắt có kích thước là 3.5 inch, sau đó là 4 inch. Tiếp đó tháng 9 năm 2014, Apple cho ra mắt iPhone 6 và 6Plus. Cho đến hiện tại, Iphone đã có rất nhiều kích thước màn hình 3.5-inch, 4-inch, 5.5-inch, 5.8-inch,.. Khi thiết kế giao diện app, rất khó khăn cho các lập trình viên có thể cover được hết tất cả các kích thước màn hình, chưa kể đến việc màn hình iPhone và iPad cũng khác nhau.
Để dễ dàng cho việc này, chúng ta sẽ tìm hiểu về auto layout.
## Tại sao lại phải dùng Auto Layout
Nhìn vào ví dụ sau, chúng ta sẽ hiểu vì sao cần auto layout. Tạo 1 App đơn giản với dòng text trên màn hình. Chạy trên nhiều thiết bị khác nhau iPhone 8 simulator, iPhone SE, 7/8 Plus và iPhone X simulators. Kết quả sẽ cho thấy ở hình ảnh sau. Có thể thấy dòng text chỉ ở giữa màn hình với thiết bị có kích thước 4.7-inch
![](https://images.viblo.asia/cfd96890-7531-4d7c-b0ee-dfa15433f493.png)
Thử bằng 1 cách khác. Trên cùng 1 màn hình (iPhone 8 chẳng hạn), bạn thực hiện xoay màn hình theo các chiều khác nhau, kết quả cho thấy layout cũng bị lệch tương tự như sau:
![](https://images.viblo.asia/8f33b19d-ff22-498d-80b8-01456046ffe5.png)
Vậy muốn ứng dụng có thể chạy đẹp trên tất cả các màn hình, kể cả màn hình nằm ngang và nằm dọc thì cách giải quyết đơn giản nhất đó là sử dụng Auto Layout.

## Xem trước giao diện trên storyboad
Xcode cung cấp cho chúng ta chức năng xem trước giao diện trên các loại màn hình. 

![](https://images.viblo.asia/da38c44c-e2c9-455c-90aa-fdd0dc2f6029.png)

Xcode sẽ mặc định là hiển thị trên iPhone 8. Bạn có thể chọn vào button + ở phía bên dưới góc trái để chọn Device khác.
Bằng cách này, chúng ta có thể nhìn được màn hình xoay ngang xoay dọc để kiểm tra trước UI.

![](https://images.viblo.asia/847a6d68-3674-4a05-b2d8-393308d2a787.png)

## Sử dụng Constraints
Như đã nói ở trên, AutoLayout là một "constraint-based layout system". Do vậy chúng ta sẽ tìm hiểu xem constraint là gì nhé!
Quay lại với bài toán trên, chúng ta cần xây dựng một giao diện có chữ HelloWord phải được đặt ở giữa theo chiều ngang và chiều dọc, bất kể độ phân giải và hướng của màn hình.
2 constrait mình cần phải quan tâm ở đây đó là 
* center horizontally
* center vertically
Sử dụng AutoLayout thì tất cả các layout đều được sắp xếp dựa trên ràng buộc lẫn nhau. Ví dụ có button muốn cạnh bên trái cách 30 point so với cạnh bên trái của view chứa nó. Thực hiện đơn giản bằng phép toán sau: `button.left = container.left + 30`
Hiểu đơn giản ràng buộc là như vậy, tiếp theo chúng ta sẽ tìm hiểu cách để tạo các ràng buộc trên storyboard
Mở giao diện Main.storyboard của project vừa tạo và quan sát. Xcode đã có sẵn cho chúng ta các màn hình của iPhone như sau:
![](https://images.viblo.asia/f91ac53c-92d1-47bd-8068-daeb1f737eef.png)
Tiếp theo là cách thêm constraint cho button của mình. Có 2 cách để thêm constraint:
* Dưới thanh AutoLayout bar
* Kéo Control

**Đầu tiên, chúng ta sẽ tìm hiểu Autolayout bar**

Ở dưới góc phải của Interface Builder editor sẽ thấy có 5 nút, chúng ra sử dụng các nút này để xử lý các ràng buộc của layout

![](https://images.viblo.asia/b268ec05-eb32-4dc8-a86d-5cf1c68a67ca.png)

Chức năng của các button như sau:
* **Align**: Tạo các ràng buộc căn chỉnh, chẳng hạn như căn chỉnh các cạnh trái của hai khung nhìn.
* **Add new constraints**: Ràng buộc về khoảng cách, ví dụ như độ rộng của một UIView
* **Resolve auto layout issues**: Giải quyết các vấn đề khi bị conflict constraint
* **Stack**: Nhúng các view vào trong 1 stack view.
* **Update frames**: Cập nhật vị trí kích thước của khung sau khi đã set xong các ràng buộc.
Với layout của mình, chúng ta cần set 2 constraint cho button như sau:
Chúng ta sử dụn Align bằng các click vào Alin, một hộp thoại sẽ xuất hiện sau đó chọn 2 option "Horizontal in container" và "Vertically in container". Sau đó click "Add 2 Constraints" button

![](https://images.viblo.asia/f84777a0-7d00-45e5-a544-488fffa2a58b.png)

Bạn có thể thấy các ràng buộc có màu xanh như trên hình dưới đây. Nếu mở rộng màn hình ra hoặc hay đổi sang màn hình khác chúng ta luôn thấy Button ở giữa.
![](https://images.viblo.asia/366fb268-81d6-4993-8264-0b8a8cc17cf2.png)

Bạn có thể chạy thử và test app của mình.

**Cách kéo control**

Bây giờ chúng ta sẽ thêm 1 label vào UI để xem cách kéo control trên màn hình thì làm như nào.
Label sẽ được đặt ở phía dưới góc phải màn hình mà chứa 1 dòng text đơn giản.
Trên  Interface Builder editor vào mục Object kéo UILabel vào màn hình. Sửa text là  "Welcome to Auto Layout".

![](https://images.viblo.asia/a73852b9-2076-43b6-bcec-39a6a1ae6ed7.png)

Bật chế độ preview các màn hình device khác nhau, chúng ta sẽ thấy label bị xô lệch.
Vậy giờ phải tìm cách để add constraint như nào cho đúng.
Chúng ta cần định hình chính xác vị trí của label như sau:
* Cách 0 point so với mép phải của view
* Cách 20 point so với mép dưới của view
Đặt chuột vào label, giữ chuột phải sau đó kéo vào view, sẽ có 1 popup hiện lên để chọn tuỳ chọn, chọn "Trailing space to Safe Area" để set constraint cho label và mép phải của view
![](https://images.viblo.asia/7543173e-89c9-47be-82f2-86281b5329f3.png)
Tương tự làm với mép duới của view và label. Vậy là đã xong vị trí của label trên view.

## Resolving Layout Constraint Issues
Khi làm việc với các giao diện phức tạp hơn, chúng ta add nhiều constraint hơn sẽ dễ xảy ra việc conflict giữa các constraint. Trong trường hợp như vậy, Xcode đều có thể báo cho chúng ta thấy đang bị conflict như nào. Với các giao diện bị conflict constraint sẽ dẫn đến UI không được chuẩn theo mình tạo ra, bị lệch không tuân theo constraint đã quy định.
Ví dụ trong trường hợp này chúng ta cố tình kéo button về phía tay trái, Xcode sẽ thông báo các constrait lỗi có màu da cam như sau:
![](https://images.viblo.asia/1c4d3ca8-2005-4c1d-bfb5-b381aec56e1b.png)
Nếu update frame, chúng ta sẽ thấy các constraint lỗi hiển thị màu đỏ.
Xcode có cơ chế tự sửa lỗi này, bằng cách chọn "Update frames" và click "Fix Misplacement" button. Giao diện sẽ được fix.
Tuy nhiên trên thực tế khi làm việc với các constraint, bạn cần phải tự mình xử lý các conflict này sẽ tốt hơn vì đôi khi Xcode tự sửa sẽ làm hết conflict nhưng giao diện không đúng theo ý mình.

## Safe Areas
Trên document outline bạn có thấy nhắc tới Safe Area, nãy khi bạn thêm 2 constraint vào label cũng thấy có 2 lựa chọn sau:
* Trailing space to Safe Area
* Bottom space to Safe Area
Vậy Safe Area là gì?
Safe Area được giới thiệu lần đầu tiên trong Xcode 9 để thay thế các hướng dẫn layout top & bottom được sử dụng trong các phiên bản Xcode cũ hơn.
Cụ thể như sau, vào document outline và chọn Safe Area.
![](https://images.viblo.asia/7e036f53-bb6d-4868-ac1c-9e0c566d7b51.png)
Vùng màu xanh là vùng an toàn, có nghĩa là nó đảm bảo không bị che khuất bởi các layout khác. 
Safe Area giúp cho các nhà phát triển có thể dễ dàng làm việc với các constraint vì nó sẽ tự động cập nhật layout khi view bị che bởi navigation hay status bar.
Ví dụ như hình ảnh dưới đây
![](https://images.viblo.asia/a15d1ccc-b357-4dd6-9042-bbfdab720005.png)
Nếu không có navigation bar thì view sẽ tự động chiếm toàn bộ màn hình trừ phần status bar, còn nếu có thì nó sẽ tự động nằm dưới cách Top 1 đoạn để hiển thị navigation bar. Trường hợp title của navigation bar lớn thì nó vẫn tự động điều chỉnh view cho phù hợp

## Sửa constraint
Nếu label trên muốn sửa cách mép view 16 point thì mình phải làm như nào?
Cách đơn giản là trên doccument outline, nhấn chọn constraint đó, sau đó nhìn Attributes inspector ở bên phải màn hình sẽ thấy 1 số thuộc tính  relation, constant, and priority. Mình sửa constant từ 0 thành 16 vậy là OK
![](https://images.viblo.asia/771f9dbb-62fe-4511-afc3-7da74476f993.png)
Bạn có thể chạy lại app và xem, hoặc xem trực tiếp trên preview cũng được
Trên đây là nhưng điều cơ bản nhất của Auto Layout. Khi làm với những giao diện phức tạp hơn thì chúng ta sẽ thấy rõ hơn cách sử dụng các constraint. Ngoài ra constraint cũng có thể được viết bằng code được. Tuy nhiên để viết được bằng code thì bạn nên sử dụng thành thạo chúng trên storyboard trước đã.

## Bài viết tham khảo
https://www.appcoda.com/learnswift/auto-layout-intro.html