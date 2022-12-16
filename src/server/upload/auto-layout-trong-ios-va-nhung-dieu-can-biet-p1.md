# 1. Understanding Auto Layout
Auto layout là một tập hợp các quy tắc ràng buộc vị trí của view, nhằm mục đích tự động tính toán kích thước và vị trí của tất cả các views nằm trong hệ thống view được phân cấp của các bạn. Ví dụ bạn có thể ràng buộc một button rằng nó sẽ nằm giữa theo chiều ngang của một image và cạnh trên cùng của button luôn luôn cách cạnh dưới của image 8 point. Nếu kích thước hoặc vị trí của image thay đổi thì vị trí của button tự động thay đổi cho phù hợp.

Cách thiết kế ràng buộc cho phép bạn thiết kế giao diện người dùng tự đông thay đổi dựa theo sự thay đổi của các tác nhân bên trọng hoặc bên ngoài ứng dụng (Internal and external changes). Đầu tiên chúng ta sẽ đi tìm nguyên nhân mà giao diện người dùng thay đổi nhé
## 1.1 External Changes
External changes xảy ra khi kịch thước hoặc hình dạng của supperview có sự thay đổi. Với mỗi lần thay đổi bạn cần update hệ thống các layout của các bạn để có thể sử dụng tốt nhất các không gian màn hình. Sau đây là một số nguồn thông dụng dẫn đến external change:
* Người dùng thay đổi kích thước của window
* Người dùng truy cập hoặc ngừng truy cập chế độ Split View trong iPad
* The  device rotates
* Có cuộc gọi đến và audio recording bar xuất hiện hoặc biến mất
* Bạn muốn hộ trợ các kích thước khác nhạu
* Bạn muốn hỗ trợ các loại kích thước màn hình khác nhau

Hầu hết những sự thay đổi này có thể xảy ra runtime và chúng yếu cầu một phản hồi ngay lập tức từ ứng dụng của các bạn. Ngoài ra, như là hỗ trợ cho nhiều kích thước màn hình khác nhau, ứng dụng cũng cần thích nghi với các môi trường (các kích thước màn hình) khác nhau. Ngay cả thông thường thì kích thước màn hình cũng thường k thay đổi lúc runtime, nhưng việc tạo một giao diện dễ dàng adaptive khiến cho ứng dụng của các bạn chạy tốt trên cả iPhone 4S, iPhone 6 Plus hoặc thậm chí cả iPad.  Auto Layout là một component chủ đạo cho việc hỗ trợ Slide Over và Split Views trên iPads
## 1.2 Internal Change
Internal changes xảy ra khi kích thước của views hoặc thanh điều khiển trong giao diện người dùng thay đổi. Dưới đay là một vài trường hợp cụ thể của internal changes
* Contents được hiển thị trong app có sự thay đổi
* App hỗ trợ đa ngôn ngữ
* App hỗ trợ dynamic type

Khi mà content trong app thay đổi, content mới yêu cầu một layout khác so với layout cũ. Điều này thường xảy ra khi app hiển thị text hoặc images. Ví dụ, một ứng dụng tin tức cần thay đổi layout dựa vào kích thước của từng loại tin tức. Tương tự, một ứng dụng ghép ảnh cẩn phải xử lý một loạt các kích thước hình ảnh và tỉ lệ các khung hình.

Quốc tế hoá là một quá trình khiến cho ứng dụng của bạn adapt với nhiều ngôn ngữ khác nhau, vùng miền và văn hoá. Layout của một ứng dụng toàn c ầu hoá, phải tính đến những khác biệt này phải phải hiên thị chính xác ở tất cả các ngôn ngữ và khu vực mà ứng dụng hỗ trợ.

Quốc tế hoá có 3 hiệu ứng chính trong layout. Đầu tiên khi bạn translate giao diện người dùng của bạn sang một ngôn ngữ khác, lable yêu cầu một khoảng không gian chứa lable khác. Ví dụ tiếng Đức thì cần nhiều thông gian hơn tiếng anh, và tiếng Nhật thì còn ít hơn rất nhiều.

Thứ hai, định dạng để hiển thị ngày tháng và numbers có thể thay đổi từ vùng miền này tới vùng miền khác, thậm chí nếu ngôn ngữ k hề thay đổi. Mặc dù những thay đổi này thường nhỏ hơn so với thay đổi ngôn ngữ, tuy nhiên giao diện người dùng vẫn cần adapt cho phù hợp

Thứ ba, việc thay đổi ngôn ngữ không chỉ ảnh hưởng đến size of text mà còn ảnh hưởng đến cả bố cục của layout. Ngôn ngữ khác nhau có hướng layout khác nhau. Tiếng anh, thì thông thường viết từ trái qua phải, tuy nhiên tiếng Ả rập hay tiếng do thái thì viết từ phải qua trái.  

# 2. Auto Layout Without Constraints
Stack view cung cấp một cách đơn giản để tận dụng sực mạnh của auto layout mà không giới thiệu sự phức tạp của Constraints. Một single stack view định nghĩa một hàng hoặc cột của các phần tử trong user interface. Stack view xắp xếp các phaafn từ dựa vào tính chất của đối tượng
* axis: (UIStackView only): Định nghĩa chiều của stackview: vertical hoặc horizontal
* orientation: (NSStackView only): Định nghĩa chiều của stackview: vertical hoặc horizontal
* distribution: Định nghĩa bố cục của các views dưa theo các trục
* alignment: Định nghĩa bố cục của views vuông góc với trục của stack views
* spacing: Định nghĩa khoảng cách giữa các view kề nhau.

Để sử dụng một stack view, trong trình tạo giao diện kéo vào một Stack View theo chiều ngang hoặc dọc lên canvas. Sau đó kéo các content và thả nó vào stack view.

Nếu một đối tượng có sẵn một kích thước theo nội dung, nó xuất hiện trong stack view với kích thước hiện tại của nó. Nếu nó không có kích thước mặc định Interface Builder (trình tạo giao diện) sẽ cung cập một kích thước mặc định cho nó. Ban có thể thay đổi kích thước của đối tượng và Interface Builder sẽ thêm constraints để duy trì kích thước của đối tượng đó

# 3. Anatomy of a Constraint
![](https://images.viblo.asia/1189dfbb-ff0d-49c2-815b-0b5add31e2aa.png)

Cùng nhau mổ xẻ, nghiên cứu 1 Constraint nhé các bạn.
Theo như hình ảnh trên, trạng thái ràng buộc này cho biết, điểm đầu của view màu đỏ nằm sau view màu xanh và cách điểm cuối của view màu xanh 8 point. Phương trình này 
“ReadView.Leading = 1.0 x BlueView.trailing + 8.0” gồm có một số phần như sau:

* **Item 1**: Item đầu tiên trong phương trình, trong trường hợp này là RedView. Item phải là một View hoặc một layout guide
* **Attribute 1**: Thuộc tính bị ràng buộc của item 1. Trong trường hợp này là view leading. (Điểm đầu tiên của view)
* **Relationship**: Mối quan hệ giữa bên trái và bên phải của phương trình. Giá trị của relationship có thể thuộc 1 trong 3 giá trị: bằng, lớn hơn hoặc nhỏ hơn. Trong trường hợp này bên trái và bên phải bẳng nhau
* **Multipller**: Hệ số - giá trị của attribute được nhân với hệ số này. Trong trường hợp này là 1.0, các bạn cũng có thể bỏ Multipller đi nếu hệ số bằng 1.0
* **Item 2**: Item thứ 2 trong phương trình, trong trường hợp này là blue view. Không giống như item 1, item 2 có thể để trống
* **Attribute 2**: Attribute bị ràng buộc trong item 2. Trong trường hợp này là điểm cuối của blue view. Nếu item thứ 2 để trống thì sẽ k có attribute 2 này.
* **Constant**: Hằng số. Bù trừ hằng số. Trong trường hợp này là 8.0 points. Giá trị này đươc thêm vào cho Attribute 2.

Hầu hết các constraint được định nghĩa dựa trên mối quan hệ giữa 2 item trong cùng 1 giao diện người dùng. Những items này có thể đại diệnm cho View hoặc layout guides. Constraints cũng có thể được định nghĩa dự trên 2 attributes khác nhau của cùng một item. Ví dụ, đặt tỉ lệ khung hình giữa chiều rộng và chiều cao. Bạn cũng có thể đặt một giá trị không đổi (constant value) cho chiều rộng và chiều cao của item đó. Khi bạn làm việc với một constant value thì item thứ 2 cần để trống, và hệ số Multipller là 0.0 
lúc này phương trình constant của các bạn còn lại ***Item1.Attribute 1 = Constant”***
## 3.1 Auto Layout Attributes
Trong auto layout, các attributes được xác định một vị trí của view có thể bị ràng buộc. Thông thường nó bao gồm 4 cạnh (leading - Điểm đầu, trailling - Điểm cuối, top - Điểm trên, bottom - điểm dưới) cũng như width, height và thuộc tính vertical and horizontal centers. Text item thì còn có thêm một hoặc nhiều thuộc tính baseline - đường cơ sở. Để biết danh sách đầy đủ các attributes, các bạn có thể tham khảo [NSLayoutAttribute.](https://developer.apple.com/documentation/uikit/nslayoutattribute)
![](https://images.viblo.asia/24cb6cd7-be9a-4b2f-93a7-80b0dbc9ddf1.png)

Diễn giải giá trị

Giá trị trong Auto Layout luôn là points . Tuy nhiên, ý nghĩa chính xác của các phép đo này có thể khác nhau tùy thuộc vào các thuộc tính có liên quan và hướng bố trí của View
| Auto Layout Attributes | Value | Notes |
| -------- | -------- | -------- |
| Width & Height     | Kích thước của view     | Các thuộc tính này có thể được gán giá trị không đổi hoặc được kết hợp với các thuộc tính Chiều cao và Chiều rộng khác. Các giá trị này không được âm.     |
| Top, Bottom & Baseline     | Các giá trị tăng khi bạn di chuyển màn hình xuống dưới .     | Các thuộc tính này chỉ có thể được kết hợp với các thuộc tính Center Y, Top, Bottom và Baseline.     |
| Leading, Trailing     | Các giá trị tăng lên khi bạn di chuyển về phía cạnh sau. Đối với điều hướng bố cục từ trái sang phải, giá trị tăng khi bạn di chuyển sang phải. Đối với hướng bố cục từ phải sang trái, giá trị tăng khi bạn di chuyển sang trái.     | Các thuộc tính này chỉ có thể được kết hợp với các thuộc tính Leading, Trailing, or Center X  |
| Left, Right     | Các giá trị tăng nếu bạn di chuyển về phía tay phải | Các thuộc tính này chỉ có thể sử dụng kết hợp với thuộc tính Left, Right, Center X. Hạn chế sử dụng các thuộc tính Left và Right này mà nên dụng Leading và Trailing để thay thế.  |
| Center X, Center Y     | Cách giải thích phụ thuộc vào các thuộc tính khác trong phương trình | **Center X** có thể kết hợp với các thuộc tính Center X, Leading, Trailing, Right và Left.  **Center Y** có thể kết hợp với Center Y, Top, Bottom và Baseline .  |


## 3.2  Sample Equations
Một loạt các parameters và attributes có sẵn cho các phương trình cho phép bạn tạo ra rất nhiều kiểu Constraint khác nhau. Bạn có thể định nghĩa khoảng cách giữa các view, căn chỉnh các khung hình của view, định nghĩa sự liên quan giữa kích thước của 2 view, hoặc thận chí xác định tỉ lệ khung hình của các view. Tuy nhiên không phải tất cả các attributes đều tương thích.

Có hai kiểu cơ bản của attributes. Thuộc tính kích thước (Size attributes - ví dụ như width và height) và Thuộc tính vị trí ( location attributes - ví dụ như leading, lef và top). 
* **Size attributes**  được sử dụng để xác định độ lớn của một item mà không cần quan tâm đến một dấu hiệu nào về vị trí của chúng
* **Location attributes** thường được sử dụng để xác định vị trí của một item so với 1 item khác. Tuy nhiên chúng không quan tâm đến kích thước của item..  

Với những điểm khác nhau nêu trên, chúng ta có các quy tắc sau
* Bạn không thể thay đổi ràng buộc Size attributes thành Location attributes.
* Bạn không thể gán một hằng số cho một cho một Location attributes (leading, left và top) 
* Bạn không thể sử dụng một hệ số không xác định với Location attributes.
* Với Location attributes bạn không thể ràng buộc thuộc tính nằm dọc với thuộc tính nằm ngang. (vertical attributes and horizontal attributes)
* Với Location attributes bạn không thể ràng buộc Leading hoặc Trailing attributes thành Left hoặc Right attributes.

Ví dụ, cài đặt Top của một item với 1 hằng số là 20.0 points là không có ý nghĩa nếu bạn không đặt thêm bất kì ràng buộc nào khác. Bạn phải luôn luôn xác định location attributes của item so với một item khác. Ví dụ 20 points dưới top của supperview chẳng hạn. 

Một số phương trình thông thường các bạn hay gặp.
1. Đặt một hằng số cho chiều cao (height)

    ```View.height = 0.0 * NotAnAttribute + 40.0```

2.  Đặt khoảng cách cố định giữa hai nút buttons

    ```Button_2.leading = 1.0 * Button_1.trailing + 8.0```

3. Chỉnh cho 2 button có điểm đầu tiên giống nhau. 

    ```Button_1.leading = 1.0 * Button_2.leading + 0.0```

4. Xác định 2 button có chung 1 chiều rộng (width)

    ```Button_1.width = 1.0 * Button_2.width + 0.0```

5. Xác định 1 view nằm giữa supperview

    ```View.centerX = 1.0 * Superview.centerX + 0.0```
    
    ```View.centerY = 1.0 * Superview.centerY + 0.0```

6. Xác định một view với một tỉ lệ khung hình không đổi 1:2 (width - height)

    ```View.height = 2.0 * View.width + 0.0```
    
 # Kết.
Thông qua bài viết đầu tiên về Auto Layout trong iOS mình đã trình bày cơ bản và khái quát nhất về Auto Layout và Constraint. Trong phần tiếp theo mình sẽ tìm hiểu và hướng dẫn các bạn về cách làm việc với Constraint và Auto Layout thông qua Interface Builder sử dụng xCode. Rất mong các bạn đón đọc nhé ^^!