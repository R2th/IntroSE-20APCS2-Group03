# 1. Cấu trúc thư mục .
Cấu trúc thư mục trong bất kỳ dự án nào cũng rất quan trọng đối với khả năng bảo trì và nếu bạn sử dụng redux, bạn sẽ thực sự cần phải suy nghĩ về tổ chức phù hợp để bạn có thể dễ dàng truy cập bất kỳ mô-đun nào trong mã của mình sau này. Có hai cách tiếp cận cơ bản để cấu trúc các thư mục trong React Native. 
Cách thứ nhất là cách tiếp cận theo chức năng, nơi các thư mục được đặt tên theo chức năng của các tệp của họ, ví dụ: 
`containers`, `components`, `actions`, `reducers`.

Thấy thì đơn giản, nhưng đối với quy mô khủng khiếp và bao gồm tất cả các tệp cần thiết cho một màn hình thì nó là một mớ hỗn độn. 

Cách thứ hai là cách tiếp cận tính năng đầu tiên, trong đó mỗi thư mục chứa mọi thứ về một mô-đun cụ thể trong ứng dụng, vì vậy trong trường hợp này bạn sẽ có các thư mục như :`profile`, `login`, `feed`, `notifications` ...

Cách chia này tốt hơn nhiều nhưng không có sự phân biệt rõ ràng giữa UI và redux của bạn.
Giải pháp tốt nhất là luôn cố gắng tách các tệp quản lý  khỏi các thành phần UI. 

Vì vậy, bạn có thể sử dụng cách tiếp cận tốt nhất của cả hai loại , đó là kiến trúc tệp `Ducks`. Trong phương pháp này, tất cả các tệp UI được phân lập trong thư mục `Views` có kiến trúc bên trong là chức năng đầu tiên và tất cả các tệp liên quan đến trạng thái được lưu trong thư mục redux, với một bộ yêu cầu cụ thể. 

Do việc mô tả chi tiết mô hình mô đun của Ducks nằm ngoài phạm vi của bài viết này, nếu bạn đang tạo một dự án mới, hãy tìm kiếm nó và xem cách bạn có thể triển khai nó trong ứng dụng của mình.
# 2. Lock dependencies 

Nếu tệp package.json của bạn có phần phụ thuộc trông giống như "some-cool-library": "^ 0.4.2", bạn có thể muốn xóa ký tự ^ để khóa phụ thuộc vào phiên bản cụ thể đó. Điều này sẽ đảm bảo rằng bạn không nhập các thay đổi đột phá từ các phiên bản mới của thư viện vào dự án của bạn.


# 3. Sử dụng package.json để tránh các đường dẫn tương đối

Nếu bạn là nhà phát triển React Native, bạn có thể có một cái gì đó như thế này ở đâu đó trong mã của bạn:

`import MyList from '../../../../../views/components/MyList'.`

Nó không được đẹp và nhìn rất mệt mỏi,  không dễ bảo trì. Nhưng có một cách để giải quyết nó! Nếu bạn muốn tránh gõ tất cả những ../../../ và nhập trực tiếp từ thư mục components, tất cả những gì bạn phải làm là tạo tệp package.json bên trong components, với nội dung sau: `{ "name": "components" }`

Bây giờ thư mục được biến thành một mô-đun và bạn có thể nhập như thế này:

`import MyList from 'components/MyList'`. 

Tuy nhiên, lưu ý rằng việc thực hiện này sẽ vô hiệu hóa tính năng nhập tự động hoàn thành trong Visual Studio Code, do đó bạn chỉ muốn sử dụng nó trong các trường hợp cụ thể, ví dụ như để nhập tài sản tĩnh (images).

# 4. Sử dụng gỡ lỗi nếu bạn gửi các lệnh gọi API thường xuyên.
Nếu bạn đang gửi một yêu cầu API cho mỗi lần nhấn phím (ví dụ: tìm nạp các đề xuất tìm kiếm trong khi người dùng đang gõ một cái gì đó vào thanh tìm kiếm), số lượng yêu cầu có thể áp đảo nếu người dùng gõ nhanh. Bạn có thể sử dụng chức năng của `lodash` là `_.debounce(onChangeText, 500)`  nếu bạn muốn đặt giới hạn tốc độ để gửi yêu cầu.

# 5. Triển khai các loading indicators trong khi chờ phản hồi API
Đây là một cái gì đó thực sự dễ thực hiện, nhưng nó sẽ cải thiện đáng kể cảm giác của ứng dụng của bạn và làm cho nó trông phản ứng nhanh hơn và chuyên nghiệp hơn cho người dùng.

# 6. Thực hiện empty placeholders khi không có dữ liệu
Empty placeholders, cho dù chúng ta handle hình ảnh hay nhãn đơn giản nhưng bạn không có bất kỳ thông điệp nào khi Empty, sẽ làm cho ứng dụng trông không được tốt ngay cả trong trường hợp có dữ liệu nhưng đã kết thúc tải thêm trang. Ấn tượng đầu tiên là vô cùng quan trọng và người dùng mới của bạn có thể sẽ gặp phải trường hợp không có dữ liệu nhưng vẫn đợi chămg chằm để mong kết quả hiển thị ra trong vô vọng . Hãy để họ nhìn thấy thông báo là không có dử liệu hay 1 cái gì đó tương tự .

# 7. Tránh tính toán nặng trong render()
Hàm render () của bạn cần đơn giản nhất có thể, vì nó là hàm được gọi là nhiều nhất trong toàn bộ vòng đời. Vì vậy, hãy giữ cho nó sạch khỏi tất cả các tính toán nặng nề để tăng hiệu suất ứng dụng của bạn. Nếu bạn muốn tăng tốc một thành phần cụ thể, một trong những điều đầu tiên bạn nên làm là đếm số lần kết xuất của bạn và xem có quá nhiều trong số chúng không.

# 8 . Pure Components
Do một trong những vấn đề hiệu năng lớn nhất trong React Native là quá nhiều lệnh render() không cần thiết, nên bạn có thể mở rộng PureComponent, với mục đích là giảm số lượng các cuộc gọi này. Ví dụ, một thành phần chức năng sẽ hiển thị mỗi khi thành phần chính của nó hiển thị, nhưng một thành phần thuần túy sẽ không, bởi vì nó thực hiện một phương thức vòng đời `shouldComponentUpdate` để kiểm tra xem một kết xuất có thực sự cần thiết hay không (nó thực sự kiểm tra các thay đổi về state hoặc props). Tuy nhiên, bạn cần cẩn thận và hiểu cách thức hoạt động của nó, bởi vì bạn có thể gặp phải các phủ định sai nếu thành phần của bạn chứa các cấu trúc dữ liệu phức tạp có thay đổi mà bạn không được phát hiện.

# 9 . Dọn dẹp các tham số bạn không sử dụng trong các thành phần nữa

Nếu thành phần của bạn đã trải qua một số tái cấu trúc nặng, rất có thể một số đạo cụ mà nó nhận được sẽ không được sử dụng nữa. Dọn dẹp thường xuyên để có mã sạch hơn và ý tưởng chung tốt hơn về luồng dữ liệu trong ứng dụng của bạn.

# 10 .Tổ chức các hằng số của bạn

Nếu bạn có các biến cấu hình mà bạn sử dụng ở nhiều nơi trong ứng dụng của mình, chẳng hạn như chiều cao của thanh điều hướng, chiều rộng menu bên, kích thước trang cho các lệnh gọi API, enum, v.v., hãy giữ tất cả chúng như các hằng số được đặt tên trong một tệp đặc biệt để bạn luôn có thể tìm và chỉnh sửa chúng dễ dàng.
Màu sắc cũng vậy. Thay vì mã hóa các giá trị HEX trên toàn dự án, hãy giữ tất cả các màu của bạn trong một tệp để bạn luôn có thể theo dõi mọi giá trị. Và vâng, bạn nên tạo các hằng số ngay cả cho màu đen và trắng, vì các yêu cầu thiết kế có thể được thay đổi sau đó (do đổi thương hiệu, chủ dự án đã bị thay đổi, v.v.) và bạn có thể cần thay đổi tất cả các màu đen trong dự án của mình sang khác màu đen hoặc màu khác nhau hoàn toàn. Hãy chắc chắn sửa đổi và dọn dẹp tệp này thường xuyên để nó không bị lộn xộn với các giá trị cũ, không sử dụng. Đặt tên cho màu sắc của bạn đúng cách cũng rất quan trọng. Nếu màu ứng dụng chính của bạn là màu xanh lam, hãy đặt tên không đổi là COLOR_BLUE vì nếu sau này nó được đổi thành màu đỏ, bạn sẽ phải đổi tên từng phiên bản thành COLOR_RED. Sử dụng COLOR_BASE thay thế. 

Bạn cũng nên giữ tất cả các message strings  của mình trong một tệp bản địa hóa để bạn có thể dịch chúng dễ dàng khi có nhu cầu. Ngay cả khi bạn không cần phải dịch ứng dụng của mình trong tương lai gần đây, thì vẫn rất tốt để có một danh sách với tất cả các tin nhắn ở một nơi.

# 11. Hẹn gặp lại bạn trong các bài viết tiếp theo nhé . 😍👍👍👍

Nội dung sưu tầm và đúc kết từ kinh nghiệm của mình. Cảm ơn bạn đọc .