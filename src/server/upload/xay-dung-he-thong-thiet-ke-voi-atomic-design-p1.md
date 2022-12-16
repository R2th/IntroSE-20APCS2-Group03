Atomic Design là một trong những phương pháp được sử dụng để tối ưu thiết kế của sản phẩm. Phương pháp này giúp cho thiết kế có sự thống nhất, rõ ràng và đặc biệt khả năng chỉnh sửa, cải thiện được dễ dàng. 

# Atomic Design là gì?
> Atomic Design là một phương pháp thiết kế giao diện ưu tiên việc thực hiện thiết kế các thành phần riêng lẻ và kết hợp chúng lại với nhau, thay vì thiết kế cả trang. 

![](https://images.viblo.asia/9f504aa2-ccf3-4a73-afe6-78f9785f296d.png)

Atomic Design được chia thành 5 yếu tố chính:

## 1. Atoms
![](https://images.viblo.asia/4d2d60af-90b1-4068-830a-bd017ceb0519.jpg)
Atoms: là các bước xây dựng các block nhỏ nhất (ví dụ: buttons, textarea, input, radio, label, etc...). Chúng cũng có thể chứa các thành phần trừu tượng như colours và fonts chữ.

## 2. Molecules
![](https://images.viblo.asia/b891c3c8-7fed-47ae-a91a-2d7ddbda8575.jpg)
Molecules: Molecules là sự tập hợp của các Atoms nhóm lại với nhau, là các phần tử bên ngoài như đơn vị (ví dụ: một input field và một button có thể kết hợp thành một khung tìm kiếm). Molecules có thể đơn giản hoặc phức tạp, được xây dựng để tái sử dụng hoặc chỉ dụng một lần. 

## 3. Organisms
![](https://images.viblo.asia/6b569164-5be3-411f-8a66-142920806a23.jpg)
Organisms: Tương tự với Molecules, Organism gồm tập hợp các Molecules. (Ví dụ: Header trang có thể kết hợp từ một logo, thanh điều hướng và khung tìm kiếm)

## 4. Templates
![](https://images.viblo.asia/7a58f871-be1a-4e9f-818a-92c661465c5c.jpg)
Templates: là kết hợp các organisms với nhau tạo thành các trang.

## 5. Pages
![](https://images.viblo.asia/6bf0f6f4-2844-4f9a-95f3-c535699eebad.jpg)
Pages: là trang được tạo nên từ Templates. Ở bước này chúng ta có thể xem templates của mình với requirements đã đúng và đủ chưa. Nếu chưa thì có thể quay lại các bước 1, 2, 3, 4 để chỉnh sửa khi cần thiết.

# Tại sao lại là Atomic Design?
## 1. Khả năng mix & match các component
![](https://images.viblo.asia/c972ec17-fa2d-4399-9db1-df9a09f7cf53.jpg)

Hãy tưởng tượng chúng ta có 3 trang Homepage, Blog và Article và đều sử dụng khối màu xanh lá với cùng mục đích. Vậy thì thật tốn thời gian nếu ngồi sửa cả 3 file này riêng rẽ. Atomic sinh ra để giải quyết vấn đề này, chúng ta sẽ tạo ra các Atom và chỉnh sửa lại thành những Molecules and kể cả Organisms. Với việc này nghĩa là chúng ta có thể tạo ra các element mà có thể reuseable dễ dàng

## 2. Dễ dàng hiểu layout
Với Atomic Design những bên liên quan như marketing hay code team có thể dễ dàng hình dung những thành phần có trong sản phẩm của mình và có thể follow một cách suôn sẻ. Điều này cũng giúp sự tương tác giữa team design và team dev trở nên dễ dàng hơn thay vì chỉ làm styleguide thông thường. 

## 3. Chỉnh sửa hoặc xóa element dễ dàng hơn
Các component được tạo ra, các trang sử dụng instances lấy từ các component này trên các site của mình. Như vậy khi có sự thay đổi, chúng ta chỉ cần chỉnh sửa component là mọi instances cũng sẽ thay đổi theo. Tương tự như vậy, với những thành phần không như ý muốn xóa đi thì nó cũng dễ dàng được loại bỏ. Điều này giúp chúng ta tiết kiệm effort hơn bao giờ hết. Thử tưởng tượng chúng ta có 100 màn và có 100 element về button. Khách hàng yêu cầu đổi màu, đổi fontweight mà chúng ta vào từng màn chỉnh sửa thì có mà hết nguyên ngày!

Để tìm hiểu kĩ hơn về Atomic Design, các bạn có thể tham khảo link sau [Atomic Web Design](https://bradfrost.com/blog/post/atomic-web-design/) và [Patternlab](http://demo.patternlab.io/)

Trên đây là bài viết tìm hiểu về Atomic Design, trong phần tiếp theo mình sẽ cùng đi vào thực hành để vận dụng lý thuyết trên vào thực tế. Và mình cũng sẽ dành 1 bài viết nữa dành cho Dev Team khi sử dụng Atomic vào code! Hẹn gặp lại các bạn vào bài viết sau!