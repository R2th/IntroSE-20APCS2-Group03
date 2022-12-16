Bài viết tiếp theo của Phần 1: [React Native Tips](https://viblo.asia/p/react-native-tipsp1-bWrZnwyplxw)

### 1. Cấu trúc thư mục
Cấu trúc thư mục trong bất kỳ dự án nào thì cũng rất quan trọng cho việc maintain sau này và nếu bạn sử dụng redux, bạn sẽ thực sự  cần nghĩ về việc tổ chức thư mục để có thể dễ dàng truy cập các modules trong code sau này. Có 2 cách tiếp cận cơ bản để cấu trúc thư mục trong React Native. Cách 1 là cách tiếp cận hướng **function**, nơi folders được đánh tên bởi function của các files, ví dụ *containers, components, actions, reducers*. Cách này có vẻ đơn giản nhưng thực sự sẽ rất khó để kiểm soát khi ứng dụng scale theo thời gian. Cách tiếp cận thứ 2 là theo hướng **feature**, nơi mỗi folder chứa mọi thứ về các module trong app, trong trường hợp này, bạn có các folders như: *profile, login, feed, notifications*,... Cách này ứng dụng có thể scale tốt hơn nhưng không có sự phân chia rõ ràng giữa UI và redux. Vì vậy cách tốt nhất là luôn luôn cố gắng phân chia trạng thái quản lý files từ UI components. Có 1 cách tiếp cận sau: tất cả file UI được đưa vào trong folder *views*, cấu trúc phía trong theo kiểu *function* và các file trạng thái được đưa vào trong folder *redux*
### 2. Sử dụng package.json để tránh đường dẫn tương đối
Nếu bạn là React Native developer, chắc hẳn bạn đã từng phải import như ví dụ sau:

`import MyList from '../../../../../views/components/MyList'`

Việc viết đường dẫn trên rất mất thời gian cũng như khó để maintain. Có cách để giải quyết vấn đề đó, nếu bạn muốn tránh việc gõ *"../../../"* và import trực tiếp từ folder *components*, việc bạn cần làm chỉ là tạo file *package.json* trong folder *components* với nội dung sau: 

{"name": "components"} 

Bây giờ, thư mục đã chuyển thành module, bạn có thể import cú pháp như sau:

`import MyList from 'components/MyList'`

### 3. Sử dụng debounce khi call API thường xuyên
Nếu bạn đang thực hiện gửi các request API với tốc độ nhanh, ví dụ như khi người dùng gõ bất kỳ chữ nào đó trong SearchBar để call API lấy dữ liệu đổ về danh sách. Bạn có thể dùng **lodash** với function **_.debounce**(onChangeText, 500) để cài đặt limit speed mỗi lần gửi request lên server.
### 4. Implement loading indicator trong khi đợi API response.
Loading indicator giống với ProgressBar trong Android. Việc implement loading indicator rất đơn giản, nhưng lợi ích của nó mang lại thì rất tuyệt vời cho trải nghiệm người dùng ứng dụng của bạn đấy.
### 5. Implement empty placeholder khi không có dữ liệu
Tương tự với việc loading indicator thì việc sử dụng empty placeholders là rất cần thiết, ví dụ như 1 bức ảnh hoặc 1 dòng text đơn giản với nội dung là "Bạn không có tin nhắn nào. Hãy bắt đầu trò chuyện với mọi người nào."  Điều đó sẽ khiến cho người dùng biết là không có dữ liệu và khuyến khích họ sử dụng ứng dụng nhiều hơn để tương tác với các tính năng hơn là 1 màn hình trống không và không hiển thị gì cả.
### 6. Nắm bắt các cách hoạt động trên cả 2 nền tảng iOS và Android.
Mặc dù bạn không phải là lập trình viên native iOS/Android nhưng bạn cũng cần phải biết cách sử dụng iOS Pods, Info.plist và cách để link thư viện. Điều tương tự cũng với Android và các file Gradle và config trong file AndroidManifest.
### 7. Tránh công việc tính toán nặng trong render()
Function render() cần phải đơn giản và nhẹ nhất có thể, vì đây là nơi được gọi nhiều nhất trong vòng đời ứng dụng. Nên giữ nó gọn gàng để tăng performance cho ứng dụng.
### 8. Pure Components
1 trong những vấn đề về hiệu năng lớn nhất trong React Native đó là có quá nhiều lời gọi render() không cần thiết. Bạn có thể cân nhắc dùng **PureComponent**, với mục đích là để cắt giảm số lần gọi xuống. Ví dụ, 1 functional component render mỗi lần khi parent component render, nhưng với pure component sẽ không, vì nó implement method **shouldComponentUpdate** để check nếu render có thực sự được yêu cầu không? 
### 9. Dọn dẹp các parameters không sử dụng trong components 
Nếu component của bạn đã được refactor vài lần, rất có thể sẽ có vài props không còn cần nữa. Hãy dọn dẹp nó thường xuyên để code gọn gàng hơn và làm cho người khác dễ đọc hiểu code hơn khi bắt tay vào dự án sau này.
### 10. Tổ chức các constants 
Nếu bạn config các biến sử dụng trong app, ví dụ như chiều cao navigation bar, chiều rộng side menu,.. Hãy đặt chúng trong file mà bạn có thể dễ dàng tìm kiếm cũng như chỉnh sửa sau này. 
Tương tự với các màu, hãy tạo 1 file chứa các mã màu và với các strings bạn cũng nên tạo file riêng để có thể translate với các local khác nhau.
### 11. Liên tục check giao diện app trên các nền tảng và các thiết bị khác nhau
Bạn nên thường xuyên quan sát ứng dụng của bạn trên các độ phân giải màn hình khác nhau. Ngay cả khi bạn chỉ phát triển cho 1 nền tảng, hãy quan tâm đến các nền tảng khác. Ví dụ, ActionSheetIOS sẽ không hoạt động trên Android vì vậy bạn cần phải viết lại code cho riêng Android cho phù hợp.
### 12. Chọn kiểu đặt tên biến
Bạn thích style **camelCase**. Hoặc bạn biết **undersore_case**. Cả 2 đều tuyệt, nhưng đều có ưu và nhược điểm riêng. Vì vậy hãy chọn 1 style cho riêng mình để thống nhất ứng dụng và không mix 2 loại này lẫn nhau nhé.
### 13. Gia tăng vùng chạm với hitSlop 
Nếu bạn có 1 button nhỏ, và thực sự nó quá khó để nhấn, bạn có thể gia tăng giá trị padding để mở rộng vùng chạm khi muốn click vào nó. Bên cạnh đó, bạn còn có thể sử dụng thuộc tính **hitSlop** để làm việc này với mục đích tương tự
### 14. Xử lý vấn đề với keyboard
Bạn đã từng gặp trường hợp khi bạn muốn nhấn vào 1 phần tử trong list nhưng bàn phím đang mở, bạn phải thực hiện chạm vào màn hình 2 lần đó là chạm vào để đóng bàn phím và chạm vào để tương tác với list. Sử dụng **<ScrollView>** và **<FlatList>** đều có thuộc tính **keyboardShouldPersistTaps**. Cài đặt thuộc tính trên với giá trị "**always**" sẽ tránh được tình huống phía trên. 
1 vấn đề cũng hay gặp đó là bàn phím đè lên text input khi bạn nhập ký tự. Thật là may mắn khi có 1 thư viện hỗ trợ chúng ta xử lý việc đó là [react-native-keyboard-aware-scrollview](https://github.com/wix/react-native-keyboard-aware-scrollview)
### 15. Validate cả local và server
Sao lại thế? Vì có 1 số việc server có thể validate ví dụ như việc kiểm tra email có tồn tại trong database hay không? Bên cạnh đó tại local bạn cũng nên validate email trước khi gửi request lên server ví dụ như việc: format regex, số lượng ký tự hoặc kiểm tra email trống,..
### 16. Sử dụng cấu trúc dữ liệu phù hợp 
Bạn có thể sử dụng array để chứa tập hợp dữ liệu hoặc có thể sử dụng cấu trúc dữ liệu key-value. Hoặc với lượng dữ liệu có cấu trúc, hãy cân nhắc việc sử dụng SQLite hoặc Realm nhé.
### 17. Tránh việc cài đặt width và height cho component cha
Nếu component con đã cài đặt width và height, việc check lại width và height cho component cha là cần thiết. Vì component cha sẽ tự resize dựa trên width và height của component con
### 18. Data set cứng khi API chưa sẵn sàng
Nếu bạn đang đợi API, bạn có thể set cứng dữ liệu trong reducers để hiển thị lên. Cách này sẽ không ngăn quá trình phát triển tính năng mới, và khi API đã có sẵn thì công việc sẽ được tiếp tục.
### 19. Hãy quan tâm về các đoạn code phức tạp
Bạn nên quan tâm về các đoạn code phức tạp. Ví dụ 1 component sử dụng nhiều thời gian để tính toán dữ liệu nhận về từ server. Bạn có thể sử dụng extension [codemetrics](https://github.com/kisstkondoros/codemetrics) trong Visual Studio Code để thấy được sự phức tạp trong mỗi method
### 20. Xem xét sự khác nhau giữa navigating vs pushing 
Không quan trọng việc bạn sử dụng thư viện navigation nào, nhưng tựu chung đều giống nhau về chức năng. Ví dụ action yêu cầu pushing new screen vào stack trong khi yêu cầu khác lại là đi đến screen đã loaded trước đó. Action push thêm vào top của stack và navigate đến nó. Action navigate sẽ nhảy đến thành phần gần nhất của stack nếu 1 thành phần đó đã được mounted. 
### 21. Material Design cho Android và Human Interface cho iOS
Design detail như font size, text spacing, độ phân giải ảnh, chiều cao, chiều rộng button cần phải theo 1 khuôn mẫu chung duy nhất, nhất quán và hướng đến giao diện người dùng thoải mái nhất. 

 ### Tham khảo
 [React Native Tips — Part 2
](https://medium.com/mop-developers/50-react-native-tips-part-2-2-51d5cd2baa4a)