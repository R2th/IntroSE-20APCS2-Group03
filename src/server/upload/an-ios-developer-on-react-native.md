Khi lần đầu tiên tôi bắt gặp Wind of React Native, tôi nghĩ đó không chỉ là một cách để các nhà phát triển web nhúng chân vào các ứng dụng di động bản địa. Khái niệm mà các nhà phát triển JavaScript có thể viết một ứng dụng iPhone trong JavaScript chắc chắn là một cái gì đó mà tôi nghĩ là thật tuyệt vời, nhưng tôi nhanh chóng nhún nhảy ra khỏi ý tưởng sử dụng nó. Sau khi tất cả, tôi đã được làm phát triển iOS bản địa như là một sở thích trong nhiều năm, và chuyên nghiệp với Chalk + Chisel (chính thức Bolster) trong gần hai năm tại thời điểm đó.

Tôi đã thực hiện hàng chục ứng dụng iOS - những ứng dụng tốt mà tôi tự hào. Các ứng dụng được xây dựng trong Xcode và được viết bằng Mục tiêu-C, bởi vì đó là cách nó luôn luôn xảy ra. Đó là những gì Apple đã cho chúng tôi để làm cho các ứng dụng iOS, do đó, đó là những gì tôi và tất cả các nhà phát triển khác được sử dụng. Sau đó, hai năm trước khi Apple phát hành Swift ngôn ngữ lập trình, tôi đã không ngần ngại để thử nó ra.

Nó vẫn còn trong Xcode, và nó vẫn (rõ ràng) Apple chấp thuận cho phát triển các ứng dụng iOS, vì vậy tôi chim bồ câu đúng và chọn nó đẹp - ahem - nhanh chóng. Tôi đã có nội dung trong bong bóng hệ sinh thái của Apple. Phản ứng bản xứ dường như là một thử nghiệm thú vị, nhưng trong tâm trí của tôi, bất kỳ ứng dụng gốc thực nào vẫn cần phải được viết theo cách thực tế. Nó dường như là một sự lãng phí thời gian cho tôi để không chỉ học JavaScript mà tôi đã không có kinh nghiệm, mà là một cách xây dựng ứng dụng hoàn toàn mới khi tôi đã bắt đầu làm chủ việc xây dựng chúng theo cách "thực sự".

###  Nhanh chóng chuyển tiếp một vài tháng, và tôi tự tin đủ để nói tôi không bao giờ có thể viết một ứng dụng iOS trong Objective-C hoặc Swift một lần nữa.

Chúng tôi đã nhận được một dự án ứng dụng dành cho thiết bị di động mới và tôi đã xem xét các yêu cầu và thiết kế. Ngay khi tôi định nhấp vào biểu tượng Xcode xanh tuyệt đẹp để bắt đầu một dự án mới, Giám đốc Tương tác của chúng tôi, Adam, bước đi và nói, "hãy làm việc này trong React Native".

Ông giải thích rằng một phần của hợp đồng của chúng tôi cho dự án này là có một con đường rõ ràng hướng tới để làm cho ứng dụng này có sẵn cho Android là tốt. Và mặc dù React Native chưa có sẵn cho Android, chúng tôi biết Facebook đã tích cực làm việc trên nó. Về mặt lý thuyết, nếu chúng tôi xây dựng ứng dụng trong Phản ứng bản xứ cho iOS, nhiều phần của nó sẽ "làm việc" trên Android vào thời điểm phát hành.

Vâng, tôi không hạnh phúc. Tôi cảm thấy như thể tôi đang ở đỉnh cao của khả năng phát triển iOS của tôi và đã được yêu cầu ném tất cả đi. Tôi nghi ngờ khả năng của mình để cung cấp một sản phẩm chất lượng đúng thời gian cho đường cong học tập không thể tránh được. Nhưng thậm chí còn hơn thế nữa, tôi ngờ rằng React Native tự nó có khả năng sản xuất một sản phẩm chất lượng. Nhìn lại, tôi thậm chí không nghĩ rằng nghi ngờ là không có lý. Vào thời điểm đó, React Native đã ra mắt dưới dạng beta. Tài liệu thiếu, số lượng các thư viện phản ứng nguồn mở và các thành phần có nguồn gốc mở là không đáng kể, và các mã ví dụ hoặc Stack Overflow posts để tham khảo hầu như không tồn tại.

Tôi nở một nụ cười. Nhưng đi với thái độ kín đáo của tôi chỉ làm hại hơn. Trở ngại đầu tiên của tôi là học Flexbox, React Native của cách làm bố cục UI. Đến xây dựng giao diện, đặt ra UI hoàn toàn trong code tôi thất vọng vượt quá niềm tin. Tôi cố gắng xây dựng những cái nhìn đơn giản nhất.

### Nhưng nó không chỉ là UI - mọi thứ đều khác. Đó là điểm tranh cãi lớn nhất đối với tôi.

Mỗi lần tôi bị mắc kẹt hoặc không hiểu gì, tôi tự nói với mình rằng "Tôi có thể làm điều này trong 5 giây trong Objective-C". Mỗi lần tôi sẽ khám phá ra một lỗi trong React Native (và có một con số tốt), tôi nghĩ, "lỗi này không tồn tại trong Objective-C, tại sao tôi đang chiến đấu với nó?"

Trong suốt hai tuần lễ, tôi rất đau khổ trong công việc. Tôi đã trải qua cảm giác như một chuyên gia phát triển iOS cảm thấy như mình chưa bao giờ viết một dòng mã trong cuộc đời mình. Nó đã được đánh bại, cho đến khi tôi có một ngày cuối tuần để rõ ràng đầu của tôi. Tôi đã một bước trở lại và nhận ra rằng Adam đã làm rất nhiều nghiên cứu về React Native. Tôi phải tin anh ta là giám đốc tương tác của chúng tôi để không dẫn tôi xuống một con đường xấu. Tôi thề sẽ đi làm vào thứ hai, cúi đầu xuống, giả vờ Mục tiêu-C và Swift thậm chí không tồn tại, và tìm ra điều này.

### Học để yêu React

Một vài tuần trước, chúng tôi đã gửi ứng dụng Phản ứng gốc đầu tiên của chúng tôi lên App Store. Tôi rất tự hào về cách ứng dụng bật lên, và tôi không thể chờ đợi để viết bài tiếp theo của chúng tôi. Chỉ trong hơn một tháng, hãy xem xét tôi đầy đủ trên tàu React Native. Điều gì làm thay đổi suy nghĩ của tôi?

### Mô hình React

Trong phản ứng, mọi giao diện người dùng sẽ được sống trong phương thức render() và được kiểm soát bằng "trạng thái". Phương thức render () của bạn xác định UI sẽ tìm kiếm ra sao cho mỗi trạng thái, và khi gọi setState (), React sẽ tìm ra những gì cần thay đổi và thực hiện nó cho bạn. Hãy tưởng tượng một cái nhìn đơn giản với một nhãn hiệu "Hello World" và một nút. Mỗi nút bấm cần phải thay đổi nhãn giữa "Hello World" và "Goodbye World". Trong Objective-C, tôi sẽ cần một số xấu nếu tuyên bố trong xử lý nút của tôi như thế nào.

```
if ([label.text isEqual:@”Hello World”]) {
    label.text = @”Goodbye World”;
} else {
    label.text = @”Hello World”;
}
```

Nó hoạt động tốt, nhưng mà code UI là hoàn toàn tách rời từ nơi tôi tạo ra các nhãn ở nơi đầu tiên (có thể được trong mã hoặc trong xây dựng giao diện). Trong React, chúng ta sẽ định nghĩa một buttonClicked bool trong trạng thái của chúng ta, nhãn của chúng ta trong render () sẽ giống như sau:

```
<Text>
    {this.state.buttonClicked ? ‘Hello World’ : ‘Goodbye World’}
</Text>
```

và trình xử lý nút của chúng tôi đơn giản như:

```
this.setState({buttonClicked: !this.state.buttonClicked});
```

Tất cả mã chế độ xem ở một nơi, và trạng thái điều khiển tất cả. Điều này làm cho việc hiểu và gỡ lỗi mã dễ dàng hơn nhiều.

### Flexbox

Công cụ bố cục giao diện người dùng mà tôi ghét nhiều lúc đầu tiên bây giờ là một trong những điều tôi yêu thích về React native. Tôi sẽ thừa nhận rằng lần đầu tiên bạn khó có thể nắm bắt được điều đó, nhưng một khi bạn làm điều đó, việc xây dựng UI cho nhiều kích cỡ màn hình khác nhau rất nhanh và dễ dàng. Tôi đã trở nên nghiện việc trợ giúp trực quan của Trình tạo Giao diện trong Xcode. Autolayout bây giờ dường như quá phức tạp so với Flexbox. Phong cách tạo kiểu CSS mà Flexbox sử dụng làm cho việc sử dụng lại phong cách trở nên dễ dàng như dán bản sao. Và phần tốt nhất của tất cả cho phép bạn tinh chỉnh các giá trị phong cách để hoàn thiện trong thời gian không ...

### Live/Hot Reload

Đúng rồi. Nhìn thấy nút của bạn trông như di chuyển hơn 5 điểm ảnh ở bên phải cũng dễ như Command + S. React Native có thể được cấu hình để tự động render lại chế độ xem hiện tại trong iPhone Simulator mà không cần xây dựng lại dự án Xcode. Điều này rất lớn vì bạn không chỉ tiết kiệm thời gian mà không phải xây dựng lại, nhưng bạn có thể làm việc theo một chế độ xem được lồng vào sâu trong ứng dụng và tinh chỉnh giao diện người dùng mà không cần phải điều hướng trở lại màn hình đó.

Nguồn Medium.