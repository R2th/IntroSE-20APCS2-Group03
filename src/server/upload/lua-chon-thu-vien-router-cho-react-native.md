Sau khi xem bài nói về React Router v4 tại React Conference, tôi cảm thấy khá hứng thú và muốn thử dùng thư viện router cho native của họ. Tôi đã có kinh nghiệm sử dụng thư viện này để phát triển web và rất hài lòng với api của nó. Thời gian đó, tôi đang sử dụng một thư viện khác là React Native Router Flux, nhưng tôi không cảm thấy muốn gắn bó với nó cho lắm.

Cuối cùng thì tôi đã quyết định không tiếp tục sử dụng React Router, nhưng nó đã tạo điều kiện cho tôi để thử một vài thư viện khác.

TL;DR - Tôi đã lựa chọn React Navigation làm thư viện router cho app của mình.

# React Native Router Flux

https://github.com/aksonov/react-native-router-flux

RNRF là một trong những thư viện đầu tiên của React Native. Cả thư viện này và React Native đã được cải thiện rất nhiều từ lần release đầu tiên vào tháng 9, 2015. Đây là những điều tôi thích về RNRF khi bắt đầu sử dụng nó:


- Nó là thư viện hoàn thiện nhất vào thời điểm đó.
- Nó có rất nhiều documentation và một loạt các cấu hình bạn có thể sử dụng.
- Nhiều chức năng - tùy biến nav bar và tab bar, định hướng động.

Bộ api quá lớn của nó cuối cùng lại là một trong những lí do tôi chuyển sang dùng thư viện khác. Nó rất mạnh mẽ nhưng lại khá khó để làm quen trong bối cảnh tôi cũng mới bắt đầu học React Native. Tuy documentation và các ví dụ cách sử dụng của nó vẫn đang được tác giả cải thiện nhưng tôi vẫn cảm giác nó là một thư viện phức tạp hơn những gì tôi cần.

# React Router

https://github.com/ReactTraining/react-router

Như đã nói, tôi có hứng thú với việc sử dụng React Router cho native. Sau khi dùng thử nó, có thể nói là nó đáp ứng được mong đợi của tôi. Routing gần như giống như trên web - một lợi thế nếu bạn đã quen sử dụng nó - và api rất đơn giản và dễ học.

Tại sao tôi lại không dùng nó nữa?

Thư viện này không mang lại cảm giác của native. Bản thân React Native là một sự trừu tượng hóa của 2 trải nghiệm khác nhau, và thư viện này làm cho routing trở thành một lớp khác làm lu mờ đi trải nghiệm native. Nó vẫn chạy được, nhưng tôi cảm giác bị gò bó bởi bộ API nhỏ bé của nó. Có thể tôi đã không dành cho nó đủ thời gian khi tôi lướt qua các thư viện khác nhau, nhưng điều mà tôi muốn nhấn mạnh đó là thư viện routing cho native thì cần phải mang đến trải nghiệm giống như native.

Trong khi những kinh nghiệm sử dụng thư viện này trong quá khứ làm cho nó có chút gì đó lợi thế, tôi không cảm thấy việc chuyển từ web qua native dễ dàng hay tự nhiên gì cả. Kích thước màn hình nhỏ làm cho các trang có nội dung hoặc mục đích cũng nhỏ hơn. Những thứ mà có thể chỉ cần gói gọn trong một trang như ở desktop có thể trở thành các tab trên mobile, với một context dùng chung. Có thể làm được điều đó là một vấn đề quan trọng đối với tôi.

# React Native Navigation

https://github.com/wix/react-native-navigation

Sau React Router, tôi đã dùng thư React Native Navigation bởi Wix. Tôi bị cuốn hút bởi khía cạnh native của thư viện này. Wix đã viết [một đoạn giải thích dài tại sao anh ấy lại tạo ra thư viện này](https://github.com/wix/react-native-controllers#why-do-we-need-this-package) và nó đã thuyết phục được tôi dùng thử. Nếu có thời gian thì bạn nên đọc nó, nhưng dưới đây là một câu TL;DR để tóm gọn lại vấn đề:

> Sử dụng package này, chúng ta có thể dùng được các component của native thay vì phải dựa vào các giải pháp viết bằng Javascript thuần.

Nghe rất hứa hẹn đúng không :D

Vậy thì, trải nghiệm của tôi sau khi dùng thử nó là gì?

Nó phức tạp hơn rất nhiều trong việc setup ban đầu, nhiều hơn mọi thư viện tôi đã dùng. Đương nhiên là vậy, thay vì được viết dựa trên React Native, Wix đã xây dựng lại toàn bộ từ đầu. Điều đó có nghĩa là bạn không chỉ install một package, mà còn phải thay đổi setup của code Objective-C và Java nữa.

Điều đầu tiên làm tôi cảm thấy lo lắng khi sử dụng thư viện này là tôi có một vài vấn đề với hoạt động của chức năng vuốt trái của iOS. Wix đang trong giai đoạn phát triển phiên bản 2.0 cho thư viện và tôi nghĩ là điều đó sẽ làm cho những issue như của tôi bị giảm sự chú ý. Hơn nữa, trong quá trình sử dụng tôi nhận ra tôi không thể làm được một số việc trong ứng dụng mà tôi đang phát triển. Tôi cần phải render một view cố định, không bao giờ thay đổi nằm dưới navigation bar khi di chuyển giữa các màn hình. Không có một cách nào có thể đạt được điều đó với API hiện tại bởi vì implementation của phía native sẽ quyết định việc view có thay đổi hay không. Ví dụ, tôi không thể render màn hình nằm trong một layout không thay đổi được.

Nên tôi đã thử thư viện cuối cùng...

# React Navigation

https://github.com/react-navigation/react-navigation

React Navigation là thứ mà tôi vẫn luôn tìm kiếm. Nó là một giải pháp được viết bằng JS, nhưng nó chạy rất tốt. Rất rất tốt.

Documentation của nó rất tuyệt - tốt nhất trong những thư viện tôi đã thử - và nó giúp tôi vừa làm quen vừa thử nghiệm những use case mà tôi cần.

Một điều cụ thể mà tôi thích đó là việc thư viện định nghĩa bằng thuật ngữ Navigators. Navigators giống như một tập hợp các route, nhưng nó cũng có thể được lồng nhau. Nên như những gì tôi đã nói về việc muốn thể hiện navigation trên native mang lại trải nghiệm như native - mô hình này có vẻ giống như vậy. Nếu chúng ta có nhiều màn hình trong ứng dụng, và một vài màn hình lại có tab, chúng ta có thể lồng TabNavigator vào trong một StackNavigator.

Tuy việc này cũng có thể làm được bởi các thư viện khác, nhưng tôi vẫn thấy React Navigation cụ thể hóa việc đó một cách tốt nhất. Nó cũng cho phép tôi render component cố định mà tôi đã nói ở trên. Tôi cảm thấy mình dễ dàng nắm bắt được routing trong ứng dụng bằng những hiểu biết về Navigators cũng như một vài navigation props. Thêm một section cho việc tích hợp với redux và thế là quá ổn.

Bài viết được dịch từ [Choosing a Routing Library for React Native](https://medium.com/@ian.mundy/choosing-a-routing-library-for-react-native-604f97e58729) của tác giả **Ian Mundy**