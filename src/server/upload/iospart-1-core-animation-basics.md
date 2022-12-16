## Giới thiệu
Tham khảo: https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/CoreAnimationBasics/CoreAnimationBasics.html#//apple_ref/doc/uid/TP40004514-CH2-SW3

Core Animation cung cấp một hệ thống với mục đích tạo hiệu ứng cho các view và các loại phần tử khác trong iOS Application. Core Animation không thay thế các view trong ứng dụng, thay vì thế nó là công nghệ tích hợp các view với nhau để cung cấp một hiệu suất và hoạt ảnh tốt hơn cho nội dung. 

Để thực hiện được như thế, nó phải lưu nội dung của các view vào bitmap để phần cứng đồ hoạ có thể sử dụng được chúng. Trong một vài trường hợp, sự lưu trữ này khiến các dev phải suy nghĩ về việc quản lý contents trong ứng dụng, có thể ta sử dụng Core Animation nhiều nhưng không hề biết là nó nằm ở đâu. Ngoài chế độ caching nội dung các view, Core Animation cũng xác định cách chỉ định trực quan hoá nội dung tùy ý, tích hợp nội dung đó với view và làm động nó cùng với các phần tử khác.

Sử dụng Core Animation để thay đổi view và các đối tượng hiển thị. Hầu hết là thay đổi các thuộc tính của đối tượng. Ví dụ, sử dụng Core Animation tạo hiệu ứng để thay đổi vị trí của view, size hoặc opacity. Khi thay đổi, Core Animation tạo hiệu ứng giữa giá trị hiện tại của thuộc tính và giá trị mới chỉ định. Thông thường. không sử dụng Core Animation để thay thế nội dung của view 60fps. Thay vào đó, sử dụng Core Animation để di chuyển view toàn màn hình, làm mờ view đó hoặc thay đổi các thuộc tính hình ảnh khác.

## Cơ sở cho Drawing và Animations

Các đối tượng layer là các mặt 2D được tổ chức trong không gian 3D và là trái tim để làm việc với Core Animation. 

Giống như các view, các layer quản lý thông tin về hình học, nội dung và các thuộc tính hình ảnh bề mặt của chúng. Nhưng *khác* với View ở điểm gì ? Các layer không xác định diện mạo, mà chỉ quản lý thông tin trạng thái xung quanh một bitmap, bản thân bitmap có thể là kết quả của bản vẽ của view hoặc hình cố định. Vì lý do này, các layer sử dụng trong app được coi là các đối tượng mô hình, vì chúng chỉ quản lý dữ liệu. Khái niệm này khá quan trọng vì nó ảnh hưởng đến hành vi của hiệu ứng.

### The Layer-Based Drawing Model

Hầu hết các layer không thực hiện vẽ trong app. Thay vào đó, một layer capture content và lưu nó vào trong bitmap, sau đó khi thay đổi một thuộc tính của lớp, đó là thay đổi thông tin trạng thái được liên kết với layer. Khi một thay đổi được ghi nhận kích hoạt hiệu ứng, Core Animation chuyển lớp bitmap của lớp và thông tin trạng thái cho phần cứng đồ hoạ, việc này sẽ hiển thị bitmap bằng thông tin mới như hình dưới. Thao tác với bitmap trong phần cứng mang lại hiệu ứng động nhanh hơn so với thao tác với phần mềm
![](https://images.viblo.asia/f3e62045-0e72-410d-a348-4846a2d698d5.png)

Vì nó thao tác trên 1 bitmap tĩnh, layer được draw khác so với view được draw. Với view, các thay đổi với view thường dẫn đến lệnh gọi view draw là drawRect: để vẽ lại content với các tham số mới. Với cách này khá tốn tài nguyên vì sử dụng CPU  trên main thread. Core Animation tránh được  khuyết điểm này bằng cách thao tác bitmap được lưu trong cache để đạt được cái hiệu ứng tương tự

Mặc dù Core Animation sử dụng các content được lưu trong cache càng nhiều càng tốt thì app vẫn phải cung cấp giá trị ban đầu và thi thoảng vẫn phải cập nhật nó. Có một số cách để app cung cấp layer object với các content được mô tả chi tiết trong [Providing a Layer’s Contents](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/SettingUpLayerObjects/SettingUpLayerObjects.html#//apple_ref/doc/uid/TP40004514-CH13-SW4)

### Layer-Based Animations

Dữ liệu và thông tin trạng thái của 1 layer object được tách rời khỏi phần hiển thị trực quan của nội dung layer đó trên màn hình. Sự tách biệt này cung cấp cho Core Animation cách để có thể can thiệp và thay đổi các giá trị trạng thái cũ sang các giá trị trạng thái mới. Hình dưới minh hoạ một và loại kiểu animation có thể thực hiện trên layer. Để biết danh sách các thuộc tính trigger animation hãy xem [Animatable Properties](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/AnimatableProperties/AnimatableProperties.html#//apple_ref/doc/uid/TP40004514-CH11-SW1)

![](https://images.viblo.asia/4d5247b2-3556-4379-8ac8-daf1cb0da88a.png)

Trong qúa trình hoạt ảnh, Core Animation thực hiện tất cả các bản vẽ theo từng frame về phần cứng. Tất cả những gì ta phải làm là chỉ định điểm bắt đầu và điểm kết thúc của hình ảnh còn lại để Core Animation lo. Ta cũng có thể chỉ định thông tin về thời gian, các tham số hoạt ảnh khi cần, nếu không thì Core Animation có các giá trị mặc định phù hợp nếu ta không set.

Để biết thêm thông tin về cách bắt đầu hoạt ảnh và định cấu hình các tham số hoạt ảnh, hãy xem [Animating Layer Content](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/CreatingBasicAnimations/CreatingBasicAnimations.html#//apple_ref/doc/uid/TP40004514-CH3-SW1).

### Layer-Object xác định hình học của chúng

Một trong những công việc của layer là quản lý hình học trực quan cho các content của chúng. Vậy hình học trực quan là gì ? Chúng bao gồm:
- Bounds
- Position
- Rotated/Scaled/Transformed
Giống như view, 1 layer có các frame và bounds rectangle-sử dụng để xác định vị trí và nội dung của nó. Ngược lại thì layer có những thứ mà view không có, đó là anchor point-xác định điểm xung quanh các thao tác xảy ra.

#### Layer sử dụng 2 hệ toạ độ
Layer sử dụng cả 2 hệ thống toạ độ dựa trên **điểm** và **hệ toạ độ đơn vị** để chỉ định vị trí của nội dung. Hệ toạ độ nào được sử dụng dựa vào loại thông tin truyền đạt. 

- Toạ độ dựa trên điểm được sử dụng khi chỉ định giá trị ánh xạ trực tiếp đến toạ độ màn hình hoặc phải được chỉ định liên quan đến các lớp khác, ví dụ như thuộc tính vị trí layer

- Toạ độ đơn vị được sử dụng khi giá trị không nên được gắn với toạ độ màn hình, vì nó liên quan đến một số giá trị khác, ví dụ thuộc tính anchorPoint của layer chỉ định 1 điểm liên quan đến giới hạn của chính layer đó- có thể thay đổi.

Trong số các cách sử dụng phổ biến nhất cho toạ độ dựa trên điểm là chỉ định kích thước và vị trí của layer bằng cách sử dụng bounds và position của lớp. Các giới hạn xác định hệ toạ độ của chính layer và kích thước của lớp trên màn hình.
Thuộc tính xác định ví trí của layer so với hệ toạ độ cha hoặc mẹ. Mặc dù các layer có các thuộc tính khung , thuộc tính đó được lấy từ các giá trị trong bounds và position

Hướng của bounds layer và frame rectangle luôn khớp với hướng mặc định của hình dưới đây. Trong iOS, gốc của hình chữ nhật nằm ở trên cùng góc trái của layer. Trong OS X thì nó nằm ở dưới cùng góc trái. Nếu chia sẻ Core Animation code giữa iOS và OS X thì phải cân nhắc sự khác biệt này

![](https://images.viblo.asia/f459c452-92c2-48c2-a0da-80bb038c0176.png)

Một điểm lưu ý nữa ở hình trên là, thuộc tính postion nằm ở giữa layer, thuộc tính đó là một trong số thay đổi định nghĩa dựa trên giá trị trong thuộc tính anchorPoint của layer. Điểm anchorPoint biểu thị điểm xuất phát toạ độ nhất định được mô tả chi tiết trong [Anchor Points Affect Geometric Manipulations](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/CoreAnimationBasics/CoreAnimationBasics.html#//apple_ref/doc/uid/TP40004514-CH2-SW17)

anchor point là một trong một số thuộc tính mà được chỉ định bằng cách sử dụng hệ toạ độ đơn vị. Core Animation sử dụng toạ độ đơn vị để biểu diễn các thuộc tính có giá trị có thể thay đổi khi kích thước của layer thay đổi, giống như kiểu chỉ định tỷ lệ % của tổng giá trị có thể. Mỗi toạ độ trong hệ toạ độ đơn vị có phạm vi từ 0.0 -> 1.0. Ví dụ theo trục X, cạnh trái nằm ở toạ độ 0.0 và phải nằm ở 1.0. Dọc theo trục y, hướng của các giá trị toạ độ đơn vị thay đổi phụ thuộc vào nền tảng như hình dưới đây

![](https://images.viblo.asia/17285ee6-23c7-4049-8d64-001be57b8ebb.png)

Tất cả các giá trị toạ độ, cho dù chúng là điểm hoặc toạ độ đơn vị được chỉ định là số dấu phẩy động, điều này tạo nên độ chính xác có thể nằm giữa các toạ độ bình thường, rất thuận tiện đối với màn hình retina, trong đó 1 điểm có thể biểu thị bởi nhiều pixel. Các giá trị dấu phẩy động cho phép bỏ qua độ phân giải của thiết bị bên dưới và chỉ định các giá trị ở độ chính xác gần nhất


#### Anchor point ảnh hưởng đến thao tác hình học
Các thao tác liên quan đến hình học của một lớp xảy ra liên quan đến điểm anchor point của lớp đó, có thể thông qua thuộc tính `anchorPoint` của layer. Tác động của điểm anchor point đáng chú ý nhất khi thao tác với các vị trí hoặc biến đổi các thuộc tính của layer. Bất kỳ thay đổi nào liên quan đến layer cũng liên quan đến điểm anchor point.

Hình dưới đây cho thấy cách thay đổi anchor point từ giá trị mặc định sang giá trị ảnh hưởng đến thuộc tính của layer. Mặc dù layer không di chuyển trong giới hạn của layer cha, việc di chuyển anchor point từ trung tâm của layer sang gốc giới hạn của lớp làm thay đổi giá trị trong thuộc tính vị trí

![](https://images.viblo.asia/75fec5ae-07be-4302-89d3-621347d18e8c.png)

Tiếp đến là hình cho thấy việc thay đỏi anchor point ảnh hưởng đến các biến đổi được áp dụng cho layer. Khi thay đổi rotated của layer. Phép quay xảy ra xung quanh anchor point, vì anchor point mặc định được đặt ở chính giữa layer, điều này tạo ra hành vi xoay như mong đợi, tuy nhiên nếu thay đổi anchor point thì kết quả quá trình rotate sẽ khác

![](https://images.viblo.asia/4ee67e8d-b5b7-442d-9635-cc7c7b042cd5.png)

### Layer có thể điều khiển theo 3 chiều

Mọi layer có 2 ma trận biến đổi mà cỏ sử dụng thao tác với layer và content của nó. Thuộc tính [Transform](https://developer.apple.com/documentation/quartzcore/calayer/1410836-transformhttps://developer.apple.com/documentation/quartzcore/calayer/1410836-transform) của CALayer chỉ định các thay đổi mà muốn ứng dụng trên layer và các sublayer. Thông thường sử dụng thuộc tính này khi muốn thay đổi chính layer đó. Ví dụ, ta phải sử dụng thuộc tính để scale hoặc rotate layer hoặc thay đổi vị trí tạm thời. Thuộc tính [sublayerTransform](https://developer.apple.com/documentation/quartzcore/calayer/1410888-sublayertransform) xác định các phép biến đổi bổ sung chỉ áp dụng cho các lớp con và sử dụng phổ biến nhất để thêm hiệu ứng hình ảnh vào content của ngữ cảnh sử dụng.

Transform hoạt động bằng cách nhân các giá trị toạ độ thông qua ma trận để có toạ độ mới đại diện cho các phiên bản được chuyển đổi của các điểm ban đầu. Vì giá trị Core Animation có thể được chỉ định ở không gian ba chiều, mỗi toạ độ điểm có 4 giá trị, chúng dược nhân thông qua ma trận 4x4 giống như hình dưới dây. Trong Core Animation, transform ở hình dưới được biểu diễn bởi kiểu [CATransform3D](https://developer.apple.com/documentation/quartzcore/catransform3d). Thật may là ta không phải thay đổi trực tiếp field của cấu trúc này để thực hiện các thay đổi chuẩn. Core Animation cung cấp một bộ chức năng toàn diện cho việc tạo scale, translation, và mà trận đảo ngược để so sánh ma trận, ngoài việc thao tác biến đổi bằng các hàm, Core Animation còn mở rộng hỗ trợ mã key-value cho phép sửa đổi một transform sử dụng key paths. Để biết danh sách các key paths có thể sửa đổi ta nên đọc về [CATransform3D Key Paths](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/Key-ValueCodingExtensions/Key-ValueCodingExtensions.html#//apple_ref/doc/uid/TP40004514-CH12-SW1)

![](https://images.viblo.asia/c7789ffa-a338-4db2-a4e1-354d5627dc0b.png)

Tiếp đến hình ảnh bên dưới cho thấy các cấu hình ma trận cho một số transformation mà ta có thể thực hiện. Nhân bất kỳ toạ độ với identity transform sẽ trả về cùng một toạ độ. Đối với các transform khác, các toạ độ được modify phụ thuộc vào thành phần ma trận mà ta thay đổi. Ví dụ, để translate theo trục X, ta gán 1 số != 0 cho `tx` và gán `ty` và `tz` có giá trị 0. Với phép rotation, ta sẽ gán giá trị `sin` và `cosin` thích hợp

![](https://images.viblo.asia/324225db-5eb4-4cf0-b5ef-339d9dc21908.png)

## Layer Trees phản ánh các khía cạnh khác nhau của trạng thái Animation

Một ứng dụng sử dụng Core Animation có 3 set layer object. Mỗi set của đối tượng layer có vai trò khác nhau để tạo content của ứng dụng xuất hiện trên màn hình:

- Các object trong *model layer tree* (đơn giản hơn là 'layer-tree') là set mà app tương tác nhiều nhất. Objects trong tree này là một model object  lưu trữ các giá trị đích cho bất kỳ animation nào. Bất cứ khi nào thay đổi thuộc tính của một layer, có thể sử dụng những object này.\
- Các object trong *presentation tree* chứa các giá trị trong in-flight cho bất kỳ animation nào đang chạy. Trong khi các Object trê chứa các giá trị đích cho một animation, các object trong *presentation tree* phản ánh các giá trị hiện tại khi chúng xuất hiện trên màn hình, và đương nhiên không nên sửa đổi các object trong set này. Thay vào đó, ta sử dụng các object này để đọc các giá trị animation hiện tại, có thể toạ một animation mới bắt đầu từ các giá trị đó.
- Các object trong *render tree* thực hiện các animation thực và là chúng là private đối với Core Animation

Mỗi set của đối tượng layer được tổ chức trong một cấu trúc phân cấp giống như view trong ứng dụng. Thực tế, một ứng dụng bật layer cho tất cả các view của nó, cấu trúc khởi tạo của mỗi cây trùng khớp với phân cấp view. Tuy nhiên, một ứng dụng có thể thêm các đối tượng layer, nghĩa là layer không liên kết với một view vào hệ thống phân cấp khi cần thiết. Ta nên làm điều này trong các tình huống để tối ưu hiệu suất cho content. Hình dưới cho thấy phân tích của các layers trong một app. Window trong hình dưới bao gồm một content view, nó chứa một button view và 2 layer độc lập. Mỗi view có một layer object tương ứng tạo thành một phần của hệ thống phân cấp layer

![](https://images.viblo.asia/b6d0c71c-6771-4e08-a77b-66ea4c989ed8.png)https://images.viblo.asia/b6d0c71c-6771-4e08-a77b-66ea4c989ed8.png

Đối với mỗi object trong layer tree, có một đối tượng phù hợp trong presentation và render tree trong hình dưới đây. Các ứng dụng chủ yếu hoạt động với các object trong layer tree, nhưng đôi khi có thể truy cập các object trong presentation tree. Cụ thể, truy cập thuộc tính `presentationLayer` của một object trong layer tree trả về object tương ứng trong presentation tree. Ta có thể truy cập vào đối tượng đó để đọc giá trị hiện tại của một thuộc tính ở giữa quá trình animation

![](https://images.viblo.asia/05ec307d-1bef-44d4-b8bb-0ef73f51806c.png)

Lưu ý: Chỉ nên truy cập các đối tượng trong presentation tree trong khi animation đang hoạt động, Trong khi một animation đang diễn ra, presenation tree chứa các giá trị của layerr khi chúng xuất hiện trên màn hình ngay lúc đó. Khác với layer tree, luôn phản ánh gía trị cuối cùng được set bởi code và tương đương với state cuối cùng của animation

## Mối quan hệ giữa layer và view

Layer không phải là sự thay thế view. Không thể tạo nên giao diện trực quan bằng object layer. Các layer cung cấp cấu trúc cơ sở cho view, cụ thể, các layer giúp việc vẽ và làm động các content của view một cách dễ dàng và duy trì fps cao trong khi thực hiện, khiến cho app không bị giật. Tuy nhiên có nhiều thứ mà các layer không làm được như xử lý sự kiện, draw content, .... Vì lý do này, mọi app phải có một hoặc nhiều views để xử lý các tương tác đó.

Trong iOS, tất cả các view đều được hỗ trợ bởi một layer tương ứng, nhưng trong OS X, ta phải quyết định xem view nào nên có các layer. Trong OS X v10.8 trở lên, có thể thêm tất cả các layer vào view. Tuy nhiên vẫn có thể vô hiệu hoá các lớp trong trường hợp không cần. Các layer làm tăng bộ nhớ của app lên một chút nhưng lợi ích chúng mang lại thì rất nhiều, vậy nên tốt nhất là nên kiểm tra hiệu suất của app trước khi tắt support layer

Khi bật support layer ở view, hệ thống chịu trách nhiệm tạo đối tượng layer bên dưới và giữ cho layer đó đồng bộ với view. Tất cả các view trong iOS đều được hỗ trợ layer và hiện tại thì OS X cũng thế

Lưu ý: Đối với các view được support layer, nên thao tác view thay vì layer. Trong iOS các view chỉ là lớp bao xung quanh layer, vì vậy mọi thao tác thực hiện với layer mới hoạt động tốt được. Nhưng có những trường hợp trong cả iOS và OS X khi thao tác với layer thay vì view có thể mang lại kết quả không mong muốn.

Ngoài các layer được liên kết với view, ta cũng có thể tạo các object layer không có view tương ứng. Ta cũng có thể nhúng các layer độc lập này bên trong bất kỳ layer nào khác, bao gồm các đối tượng đã được liên kết với view. Thường sử dụng các đối tượng layer độc lập như một cách tối ưu hoá. Ví dụ: nếu muốn sử dụng cùng một image ở nhiều nơi, ta có thể tải hình ảnh một lần và liên kết nó với nhiều layer độc lập và thêm các layer đó vào layer tree. Mỗi layer sau đó đề cập đến image gốc thay vì tạo một image copy trong bộ nhớ.

Để biết thông tin về cách enable layer support, xem ở [Enabling Core Animation Support in Your App](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/SettingUpLayerObjects/SettingUpLayerObjects.html#//apple_ref/doc/uid/TP40004514-CH13-SW5) và cách tạo cấu trúc phấn cấp layer và các tip hãy xem [Building a Layer Hierarchy](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/BuildingaLayerHierarchy/BuildingaLayerHierarchy.html#//apple_ref/doc/uid/TP40004514-CH6-SW2)