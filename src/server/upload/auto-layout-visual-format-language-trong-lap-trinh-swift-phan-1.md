Trong bài viết này, chúng ta sẽ tìm hiểu về cách sử dụng Auto Layout Visual Format trong code để layout UI cho App.

Auto Layout Visual Formart Language (VFL) cho phép chúng ta định nghĩa các constraints bằng việc sử dụng một đoạn "ASCII-art formatted string" (tạm hiểu là một đoạn chuỗi ASCII)

Với một dòng code, chúng ta có thể tạo ra nhiều constraints ở cả chiều ngang (Horizontal)  và dọc (Vertical).  Từ đó, tiết kiệm được lượng lớn code chúng ta phải dùng khi tạo từng constrainst một.

Qua bài viết này, các bạn sẽ nắm được cách:
- Tạo ra các Horizontal và Vertical Contraints 
- Định nghĩa views bên trong chuỗi VFL
- Sử dụng hằng số metrics bên trong chuỗi VFL
- Sử dụng các layout options để tạo mối liên hệ giữa các đối tượng trên UI
- Xử lý Safe Area trên các dòng iphone X đổ lên

## Bắt đầu
Đầu tiên, truy cập link bên dưới để download project:\
https://koenig-media.raywenderlich.com/uploads/2017/11/Grapevine-Starter-1.zip\
Project đã tạo sẵn 1 số đối tượng cho quá trình Layout. Chạy project, chúng ta sẽ thu được kết quả như hình dưới đây

Các đối tượng UI đều nằm ở góc trên bên trái của View. Đó là do các AutoLayout Constraints đã bị remove trong quá trình biên dịch (Bạn không nên làm điều này trong các Project thực tế ^^. Ở ví dụ này, việc tạo sẵn các đối tượng bằng Interface Builder là để chúng ta không phải viết một lượng lớn code khởi tạo, layout chúng ta sẽ tạo lại bằng code) 

## Visual Format String Grammar
Trước khi bắt tay vào layout, chúng ta nên có những kiến thức cơ bản về VFL
Đầu tiên, VFL Format string có thể chia thành các thành phần nhỏ hơn"

![](https://images.viblo.asia/d7f08b2d-26fd-4d46-84c0-fb6709c226a3.png)

1. Hướng của Contraints (Không bắt buộc). Bạn có thể lựa chọn 1 trong các giá trị:
- H: Horizontal - Chiều ngang 
- V: Vertical - Chiều dọc
- Không khai báo: Auto Layout set mặc định là Horizontal - Chiều ngang
2. Leading Spacing, Top Spacing so với Superview (Không bắt buộc)
- Khoảng cách từ top của View cần layout với top của Superview (Veritcal)
- Khoảng cách từ leading (góc trái) của View cần layout với leading của Superview (Horizontal)
  Những bạn nào đã quen thực hiện Auto Layout bằng Interface Builder (làm trực tiếp trên Storyboard) sẽ dễ tưởng tượng ra 2 giá trị này.

 3. View mà bạn đang layout (Bắt buộc)
 4. Liên kết với các view khác (Không bắt buộc)
  5.  Trailing Spacing và Bottom Spacing so với Superview (Không bắt buộc)
- Khoảng cách từ bottom (cạnh dưới cùng) của view so với bottom của Superview
- Khỏng cách từ trailing (cạnh bên phải) của view so với traiing của Superview

Trong hình có 2 ký tự đặc biệt xuất hiện, ý nghĩa của chúng là:
- "?" - thành phần này là không bắt buộc bên trong đoạn mã layout
- "\*" - thành phần này có thể xuất hiện 0 hoặc một vào lần bên trong đoạn mã layout

## Các ký hiệu hợp lệ
- "|" - Superview
- "-" - Khoảng cách tiêu chuẩn (Thường là 8 points, giá trị này có thể thay đổi nếu đấy là khoảng cách đến một cạnh của Superview) 
- ''==" - Bằng 
- "-20-" - kích thước không tiêu chuẩn (20 points)
- "<=" - Nhỏ hơn hoặc bằng
- ">=" - Lớn hơn hoặc bằng
- @250 - Mức ưu tiên của Contraint (Có thể nhận giá trị từ 0 đến 1000)  
    -  250: Mức ưu tiên thấp
    -  750: Mức ưu tiên cao
    -  1000: Mức bắt buộc

**Ví dụ:**
```Swift
  H:|-[icon(==iconDate)]-20-[iconLabel(120@250)]-20@750-[iconDate(>=50)]-|
```
- Giải thích

    H: Layout theo hướng ngang (Horizontal)
    |-[icon: cạnh trái của icon sẽ có khoảng cách tiêu chuẩn so với cạnh trái của superview
    
    ==iconDate: kích thước của icon được tính bằng độ rộng của iconDate
    
    ]-20-[iconLabel: cạnh phải của icon cách 20 points so với cạnh phải của iconLabel
    
    [iconLabel(120@250)]: iconLabel nên có độ rộng là 120 points. Mức ưu tiên được set ở mức thấp, Auto Layout có thể phá bỏ ràng buộc này nếu 1 xung đột phát sinh
    
    [iconDate (>=50)]: iconDate có độ rộng nên lớn hơn hoặc bằng 50 points
    
     -|: cạnh phải của iconDate nên có khoảng cách tiêu chuẩn so với cạnh phải của superview
Đây là những kiến thức cơ bản và quan trọng về VFL mà các bạn nên nắm rõ trước khi sử dụng chúng

## Bắt đầu tạo các Constraints
Apple cung cấp cho chúng ta các phương thức
constraints(withVisualFormat:options:metrics:views:) trong NSLayoutConstraint để tạo các Contraints bằng VFL. Bạn sẽ sử dụng hàm này để layout cho project của chúng ta

Mở ViewController.swift trong Xcode và làm theo các bước sau:
- Ẩn bớt một số đối tượng, chỉ để lại iconImageView và appNameLabel để chúng ta layout (mục đích bước này chỉ là để chúng ta dễ quan sát)
![](https://images.viblo.asia/1eae4790-a2ec-40a5-a94f-7164edb79d31.png)

- Build và Run lại project, ta thu được kết quả như hình dưới
![](https://images.viblo.asia/b1004b79-0c44-4b7f-81f1-79dd1f51df47.png)
- Tạo một funtion, tại đây chúng ta sẽ đặt hết code liên quan đến Layout. Thêm những dòng code dưới đây vào trong function. Và nhớ gọi function trong viewDidLoad() ^^

- (1)  Tạo ra một dictionary chứa các string đại diện cho các views mà chúng ta sẽ xử lý 
- (2)  Tạo một array có kiểu NSLayoutConstraint để chứa các layout mà chúng ta tạo ra. Bạn có thể activate cho từng Layout, tuy nhiên đưa vào một array, sau đó activate cho Array này sẽ tiết kiệm code cho chúng ta
![](https://images.viblo.asia/6a26f4e4-9aa4-4aef-ab97-99225059e777.png)
- Tiếp đó, chúng ta bắt đầu thực hiện layout, đầu tiên là theo chiều dọc 
- (3) Tạo Vertical Constraints cho iconImageView. Cạnh trên cách 20 points (Top Spacing) so với cạnh trên của superview, chiều cao là 30 points (Nếu chiều đang là Veritcal, sẽ mặc định hiểu là đang set Height) 
- (4) Tạo Vertical Constraints cho nameLabel. Cạnh trên cách 23 points (Top Spacing) so với cạnh trên của superview. 
- (5) Tạo Vertical Constraints cho skipButton. Cạnh trên cách 20 points (Top Spacing) so với cạnh trên của superview.
- Các Constraints được tạo ra đều được append vào allConstraints. views trong phương thức được gọi là dictionary chứa các view và string nhãn tương ứng đã tạo ban đầu. metrics sẽ được đề cập rõ hơn trong phần 2 của bài viết này, hiện tại chúng ta sẽ set nil.
![](https://images.viblo.asia/d8299b0a-93b0-4c4e-823f-f86badd788d6.png)
- Sau khi tạo xong các Veritcal Constraints, chúng ta cần tạo Horizontal Constraints để hoàn thiện Layout cho 1 đối tượng
- (6) Setup Horizontal cho cả 3 đối tượng. Cạnh trái của iconImageView sẽ cách 15 points (Leading Spacing) so với cạnh trái của superview, chiều rộng là 30 points. Cạnh trái của nameLabel sẽ cách 8 points (do không đề cập nên được set defaut) so với cạnh phải của iconImageView (Có thể hiểu đây là khoảng cách giữa 2 đối tượng). Tương tự, skipButton cách appNameLabel 8 points, và cách lề phải của superview là 15 points.
- (7) Activate các Constraint vừa tạo 
 ![](https://images.viblo.asia/4cb1b71d-8742-43ea-9b8d-60a955149329.png)
- Build và Run project, thu được kết quả như sau:
![](https://images.viblo.asia/33cbff2b-d15b-41ac-b74f-bad9afbadf86.png)
- Để hiểu rõ hơn về các thông số chúng ta vừa set, chúng ta sẽ xem hình minh hoạ bên dưới: 
![](https://images.viblo.asia/6be0503f-7a7e-4d95-8bd3-a695e67567db.png)
- Chúng ta sẽ tiếp tục Layout các đối tượng còn lại trong View. Quay lên viewDidLoad(), xoá đi các dòng lệnh isHidden nãy đã viết.. Sau đó bổ sung vào dictionary views các đối tượng còn lại kèm nhãn string tương ứng:
 ![](https://images.viblo.asia/9488c041-757f-49c4-bde3-20a57787ff75.png)
 - Thêm đoạn code bên dưới vào function Layout(), trước dòng activate allConstraints
 ![](https://images.viblo.asia/ff955bc4-4393-476a-9391-40d45e52098d.png)
 - (8) Cạnh phải của Summary cách lề phải của superview 15 points, cạnh trái cách lề trái của superview 15 points. Tương tự với welcomLabel
 - (9) Cạnh trên của appImageView sẽ cách cạnh dưới của iconImageView 10 points.
 - (10) Cạnh trên của welcomeLabel cách cạnh dưới của appImageView 10 points.
 - (11) Cạnh trên của summaryLabel sẽ cách cạnh dưới của welcomLabel 4 points.
 -  (12) Cạnh trên của pageControl sẽ cách 15 points so với cạnh dưới của summaryLabel. Chiều cao của pageControl là 9 points. Cạnh dưới của pageControl sẽ cách lề dưới cùng của superview 15 points.
 -  Build và run lại project, thu được kết quả như hình:/
 
  ![](https://images.viblo.asia/0ded2fd5-4ee1-4b2a-806b-7954f092cf04.png)\
Tuy nhiên ảnh và pageControl đang bị dính vào lề trái chứ không phải ở giữa. Để giải quyết tình trạng đó, chúng ta có thể thêm 1 Horizontal Constraint cho chúng, sao cho khoảng cách so với 2 bên lề trái, phải của superview là giống nhau, tương tự với cách chúng ta làm với welcomLabel và summaryLabel.\
Ở đây, chúng ta có thể sử dụng một cách khác, đó là Layout Options

## Layout Option
Nếu đã layout trực tiếp trên Storyboard, chắc hẳn chúng ta không lạ gì cách set cho đối tượng nằm ngang bằng với 1 đối tượng khác (Center Horizontally và Center Vertically - xem ví dụ và hình minh hoạ bên dưới để dễ hiểu hơn). Ở đây Layout Option cho phép chúng ta thực hiện những thao tác tương tự bằng việc sử dụng các phương thức NSLayoutFormatOptions.AlignAllCenterY và NSLayoutFormatOptions.AlignAllCenterX.
- Quay lại đoạn code của chúng ta và xoá bỏ đi 2 dòng này 
![](https://images.viblo.asia/29020317-ab2e-4beb-876c-ce9a491fa041.png)
- Chúng ta vừa xoá bỏ đi Vertical Constraints cho nameLabel và skipButton. Vậy bây giờ chúng ta cần một ràng buộc khác để xác định chúng. Nhớ là chúng ta vẫn giữ nguyên iconImageView, do đó nó vẫn được xác định đầy đủ các yếu tố. Bây giờ có thể dựa vào iconImageView để layout cho nameLabel và skipButton, ta sẽ sắp xếp chúng thàng 1 hàng ngang. Để thực hiện việc đó, ta cần sửa một chút topRowHorizontalConstraints và thêm 1 tham số cho phương thức khởi tạo của nó.\
![](https://images.viblo.asia/18dcc1a7-ada2-46f0-9cf3-a53ade009a74.png)\
Nhìn hình minh hoạ để hiểu cách xác định Vertical Constraints dựa vào 1 đối tượng đã được xác định đầy đủ\
 ![](https://images.viblo.asia/d48b14a2-eccf-43a8-860e-d2aea6357c98.png)
 
 - Tương tự như vậy, chúng ta sẽ xoá đi welcomeHorizontalConstraints. Có thể thấy bây giờ welcomeLabel không có Layout Horizontal. ta cần tạo 1 ràng buộc khác cho nó. 
 - Để được như lúc ban đầu, chúng ta có thể sửa summaryLabelVerticalConstraints thành như sau:
 ![](https://images.viblo.asia/c96bd171-e0a3-497f-bff0-d1a544e849cf.png)
- Build và Run lại Project, ta thu được kết quả tương tự như lúc ban đầu. Horizontal Constraints của welcomLabel được xác định như sau (lề trái, lề phải trùng với của summaryLabel). 
![](https://images.viblo.asia/44b63568-3f54-4d65-8511-48d99c356596.png)

- Ở đây chúng ta cũng có thể thay [.alignAllLeading, .alignAllTrailing] thành [.alignAllCenterX] cũng sẽ cho kết quả tương tự (Nhưng cách thực hiện không giống nhau, khi đó nó sẽ căn đoạn chính giữa của welcomeLabel và summaryLabel trùng nhau)
- Chúng ta sẽ sửa tương tự cho summaryToPageVerticalConstraints và imageToWelcomeVerticalConstraints như sau:
 ![](https://images.viblo.asia/a9c08898-6a09-498c-9685-5c4f71adfe1b.png)
 - Build và Run lại project, chúng ta sẽ thu được kết quả cuối cùng:
 ![](https://images.viblo.asia/62fc51f8-8be6-49fd-86ca-8382ff9504c4.png)


Ở phần sau của bài viết này, mình sẽ đề cập tới Metrics cũng như cách xử lý với Safe Area trên các dòng iphone "tai thỏ" (từ X đổ lên)

Nguồn tham khảo: https://www.raywenderlich.com/277-auto-layout-visual-format-language-tutorial