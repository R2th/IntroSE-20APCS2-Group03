# 10 điều mọi nhà phát triển ứng dụng Android nên biết về kiến trúc


Kiến trúc trong một ứng dụng nguyên khối có thể được mô tả đơn giản là vị trí của các Class trong hệ thống và cách chúng giao tiếp. Chúng tôi vẽ một cái nhìn tổng quan về vai trò và trách nhiệm của các lớp này trong khi nhóm chúng.

Dưới đây là một số điều có thể giúp tôi hiểu về kiến trúc:

### 1. Kiến trúc là ngôn ngữ và nền tảng bất khả tri : 
Kiến trúc dựa trên các nguyên tắc lập trình. Những nguyên tắc hướng dẫn này, có thể là nguyên tắc SOLID hoặc các mẫu thiết kế / kiến trúc ổn định và kiến thức có thể được áp dụng trên các ngôn ngữ và nền tảng. Đầu tư thời gian vào kiến trúc học tập trả hết tiền. Nó không chỉ giúp chúng tôi thiết kế kiến trúc tốt hơn mà còn cải thiện kỹ năng mã hóa của chúng tôi.

### 2. Sự nhầm lẫn về MVP / MVVM :
Trách nhiệm của MVP (Model-View-Presenter) / MVVM (Model-View-ViewModel) là tách UI khỏi mã. Chúng ta sử dụng Presenter / ViewModel để loại bỏ bất kỳ mã logic nào khỏi View (Activity / Fragment). Sự tách biệt này liên quan đến VP / VVM để lại cho chúng ta Model (M) có nhiệm vụ cung cấp dữ liệu cho Người trình bày / ViewModel.

Những gì tôi thường thấy là Presenter và ViewModel được triển khai một cách chăm chỉ với các giao diện và quan sát nhưng ngoài ra đó là sự hỗn loạn. Tôi nghĩ rằng điều này có thể đổ lỗi cho việc sử dụng VP / VVM cho toàn bộ kiến trúc của một ứng dụng và không nỗ lực để định hình Mô hình ( M ). MVP / MVVM đóng một vai trò quan trọng như một mẫu kiến trúc nhưng kiến trúc của một ứng dụng vượt xa sự phân tách UI.

### 3. Kiến trúc rất quan trọng nhưng không thiết yếu : 
Kiến trúc học tập xuất hiện ở giai đoạn sau trong quá trình phát triển của một nhà phát triển ứng dụng Android. Một trong những lý do là các ứng dụng của chúng tôi có thể hoạt động tốt hơn ngay cả khi không có kiến trúc, vậy tại sao phải dành thêm thời gian? Làm thế nào chúng ta sẽ thuyết phục sếp / khách hàng của mình rằng thời gian thêm mà chúng ta dành có thể không có bất kỳ lợi ích ngay lập tức?

Chỉ sau một vài phiên bản, chúng tôi nhận ra sự lộn xộn của chúng tôi nhưng sau đó thì đã quá muộn. Khi chúng ta tiếp tục gặp rắc rối, hết lần này đến lần khác, chúng ta bắt đầu hiểu được sự cần thiết của kiến trúc.

### 4. Kiến trúc cải thiện khả năng thay đổi : 
Kiến trúc sẽ không quan trọng lắm nếu chỉ có một phiên bản được phát hành của một ứng dụng. Trong thực tế, đây là cách tiếp cận mà nhiều người trong chúng ta thực hiện, trong khi phát triển ứng dụng, đó là thiển cận.

Nếu tôi phải chỉ ra lợi ích lớn nhất của việc có một kiến trúc phù hợp thì đó sẽ là sự dễ dàng sửa đổi và hiệu quả của nó.

Đúng là chúng ta không thể thấy trước mọi thứ mà ứng dụng có thể trở thành trong tương lai nhưng một kiến trúc tốt có đủ linh hoạt để điều chỉnh theo những thay đổi chưa biết trong tương lai.

### 5. Kiến trúc không đòi hỏi kiến thức đặc biệt : 
Đối với một lập trình viên giỏi, thiết kế kiến trúc xuất hiện một cách tự nhiên. Đây là một phần lặp lại của điểm số 1 nhưng nó rất quan trọng vì vậy tôi nghĩ nên vặn nó một chút và trình bày lại

Dagger / RxJava hoặc bất kỳ công cụ nào khác yêu cầu chúng tôi tìm hiểu những thứ cụ thể cho chúng. Trong trường hợp kiến trúc, đó chỉ là các nguyên tắc và hướng dẫn lập trình. Chúng ta càng trở nên giỏi về mã hóa thì chúng ta càng có thể hình dung được kiến ​​trúc của một ứng dụng.

### 6. Kiến trúc đòi hỏi kỷ luật và sự kiên nhẫn : 
Kiến trúc giống như một cái cây. Chúng ta không thể có quả vào ngày chúng ta trồng nó. Phải mất thời gian và công sức để thiết kế một kiến trúc và đó là một quá trình đang diễn ra. Mỗi thay đổi trong ứng dụng sẽ yêu cầu một quyết định chu đáo trước khi thực hiện.

Thiệt hại lớn đến kiến trúc ứng dụng khi chúng ta bắt đầu dùng phím tắt. Những lời hứa mà chúng ta tự thực hiện (để làm sạch mã sau này) chỉ bị phá vỡ hết lần này đến lần khác.

Chúng ta cần phải hiểu những gì chúng ta đang nhận được nếu không nó sẽ là một khởi đầu tuyệt vời chỉ để mất sau này. Kiến trúc là cam kết suốt đời của chúng tôi đối với một ứng dụng.

### 7. Thành phần Kiến trúc của Google : 
Năm 2017 Google đã giới thiệu Thành phần Kiến trúc . Các thành phần kiến trúc không có ở đó chỉ để chuyển sự lộn xộn từ Activity / Fragment sang ViewModel. Các thành phần của Kiến trúc này có sẵn để tạo điều kiện cho chúng tôi thiết kế kiến trúc của ứng dụng. Các thành phần này giúp dễ dàng thực hiện kiến trúc mà nếu không thì sẽ là một nhiệm vụ khó khăn.

Ví dụ, LiveData giúp dễ dàng quan sát các thay đổi trong dữ liệu quá tôn trọng vòng đời của Hoạt động / Đoạn. Người ta có thể tìm thấy ViewModel một cách để tồn tại thay đổi cấu hình nhưng ý nghĩa thực sự của nó là giúp chúng ta tách UI khỏi logic.

### 8. Chúng ta không cần phải trở thành một Kiến trúc sư phần mềm : 
Mọi kiến ​​trúc sư phần mềm là một nhà phát triển nhưng không phải mọi nhà phát triển đều là một kiến ​​trúc sư. Trong một tổ chức lớn có các kiến ​​trúc sư phần mềm được chỉ định. Đối với họ, điều cần thiết là phải có kiến thức sâu sắc về các mẫu kiến trúc khác nhau và cách chúng hoạt động.

Là một nhà phát triển, nó giúp có một sự hiểu biết về kiến trúc để chúng ta có thể hiểu được các khái niệm trừu tượng được triển khai. Điều này trở nên quan trọng hơn nếu chúng ta đang làm việc tự do hoặc trong một công ty khởi nghiệp với nguồn lực hạn chế. Trong trường hợp như vậy, nó sẽ đủ để có kiến thức cơ bản về kiến trúc.

Có nhiều mẫu và nguyên tắc đơn giản mà chúng ta có thể áp dụng để tạo ra một kiến trúc phong nha cho ứng dụng của mình mà không đi quá sâu vào thế giới kiến ​​trúc.

### 9. Lợi ích của kiến trúc : 
Như đã đề cập trước đó, một trong những lợi thế là tính dễ thay đổi. Thêm các tính năng và sửa đổi mới trở nên dễ dàng và nhanh chóng nếu các thành phần được phân tách hợp lý và giao tiếp một cách có tổ chức. Sự tách biệt này dẫn đến nhiều lợi thế khác như khả năng kiểm tra, trong đó chúng ta có thể dễ dàng kiểm tra các thành phần trong sự cô lập.

### 10. Bắt đầu từ đâu? 
Kiến trúc có ở khắp mọi nơi, hệ thống nhúng, ứng dụng web, phần mềm doanh nghiệp, ứng dụng điện thoại di động, v.v ... Mỗi ứng dụng đòi hỏi một kiểu kiến trúc khác nhau. Trừ khi chúng ta muốn trở thành kiến trúc sư phần mềm, chúng ta phải chọn lọc những gì chúng ta bắt đầu.

Đọc tốt để hiểu nhu cầu của kiến trúc và việc triển khai nó sẽ là Kiến trúc sạch của Robert C. Martin (còn gọi là chú Bob) và một chút sâu sắc là Thiết kế hướng tên miền: Giải quyết sự phức tạp trong trái tim của phần mềm của Eric Evans.

Google cung cấp hướng dẫn về kiến trúc ứng dụng với sự phụ thuộc chảy theo một hướng nhưng đó là mức tối thiểu. Khi bạn đã nắm bắt được rằng bạn có thể muốn triển khai một mẫu kiến trúc phân lớp được hướng dẫn bởi Clean Architecture . Cách tiếp cận này dễ dàng và sẽ phù hợp với hầu hết các ứng dụng.

nguồn : https://proandroiddev.com/10-things-every-android-app-developer-should-know-about-architecture-75ffc37df556