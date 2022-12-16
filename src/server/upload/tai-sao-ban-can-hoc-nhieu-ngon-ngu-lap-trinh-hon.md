## Mối quan hệ "mở" của tôi với nhiều ngôn ngữ lập trình
Tôi đã lập trình được khoảng 4 năm nay. Tôi bắt đầu với C #  cho việc phát triển các trò chơi, sau đó chuyển sang Python cho Machine Learning. Tôi cũng đã học Javascript và Typecript để làm Font-end. Sau đó, tôi muốn tạo ra các ứng dụng di động nên tôi đã học Ionic, React và React Native. Để tạo ra một Back-end hiệu quả hơn, thì Go là sự lựa chọn hoàn hảo. Flutter xuất hiện để tôi học được cách tạo ra nhiều ứng dụng di động hơn. Tôi đã chọn Java khi còn ngồi trên ghế giảng đường và với PHP khi làm việc tại Facebook.

Tôi không nói tôi là một chuyên gia về bất kỳ ngôn ngữ nào cả. Tôi đã có nhiều kinh nghiệm với một số ngôn ngữ / Framework hơn những ngôn ngữ khác. Tại sao tôi học những ngôn ngữ này? Vì tôi dễ bị dụ dỗ. Tôi tìm thấy một vài tính năng thú vị trong một số ngôn ngữ khác và tôi muốn học nó.

![](https://images.viblo.asia/6885fc0b-7069-4c05-b305-1c3dc2f5e96f.jpeg)

Nhưng tại sao tôi lại khuyên các bạn làm như vậy giống tôi? Bởi vì bạn không thể chọn đúng công cụ trừ khi bạn biết tất cả các công cụ là gì và công cụ đó để làm gì? Chọn đúng công cụ và vũ khí có thể giúp bạn chiến thắng hầu hết các trận chiến. Cá nhân tôi đã nhận thấy rằng điều đó là vô cùng hữu ích trong cuộc sống của tôi. Chọn ngôn ngữ phù hợp cho vấn đề cần giải quyết nào đó sẽ ít nhiều làm giảm đáng kể những nỗ lực cần thiết để giải quyết vấn đề nói trên.

## Giải quyết vấn đề đầu tiên của tôi
Hãy để tôi đưa ra một ví dụ rất đơn giản về việc khi biết ngôn ngữ phù hợp sẽ giúp tôi tiết kiệm rất nhiều thời gian trong khi vẫn có thể thoải mái bỏ qua 1 vài phần chính của vấn đề.
Một vài tháng trước, tôi đã tìm kiếm tai nghe bluetooth phù hợp cho bản thân và tôi đã quyết định sử dụng AirPods -  được cho rằng là mảnh ghép công nghệ tốt nhất mà Apple đã phát hành. Tôi đã thử nhiều tai nghe bluetooth khác nhưng không có cái nào trong số chúng tiện lợi như sản phẩm này. 
Dù sao đi nữa thì vấn đề ở đây là tôi đang sử dụng máy tính xách tay Windows song song với điện thoại Android (để sử dụng cá nhân). AirPods sẽ tự động kết nối với điện thoại của tôi nhưng điều đó lại không đúng với trường hợp là máy tính xách tay của tôi. Tôi sẽ phải thực hiện cài đặt và kết nối với AirPods bằng tay thêm 1 LẦN. Đây là một quá trình đau đớn vì tôi liên tục muốn chuyển đổi giữa điện thoại và máy tính xách tay của mình. Tôi cần một nút có thể giúp tôi dễ dàng kết nối AirPods với máy tính xách  tay của mình.

Suy nghĩ đầu tiên của tôi là sử dụng Python vì tôi chắc chắn rằng tôi có thể tìm thấy một thư viện Python cho phép tôi điều khiển bluetooth của máy tính. Không đúng. Không có thư viện duy trì tốt để làm điều đó. Nơi rõ ràng tiếp theo để xem xét là tại Node.js. Hãy yên tâm tôi đã tìm thấy một thư viện Javascript để điều khiển bluetooth trên máy tính xách tay của mình. Bằng cách chạy tập lệnh Nodejs nhỏ này, tôi có thể kết nối với AirPods của mình ngay lập tức.

```
// App.js
const device = new bluetooth.DeviceINQ();

const airpodsAddress = "18:81:0E:B2:6B:A6"
const airpodsName = "Akshat's Airpods";

device.findSerialPortChannel(airpodsAddress, function (channel) {

    // make bluetooth connect to remote device
    bluetooth.connect(airpodsAddress, channel, function (err, connection) {
        if (err) return console.error(err);

        console.log('YAY! Airpods Connected');
        // Don't need a communication stream between the two 
        // so let's just exit the stream.  
        setTimeout(() => process.exit(0), 5000);
        
    });
});
```

Bây giờ tôi cần một nút cho phép dễ dàng truy cập trên màn hình để chạy tập lệnh đó cho tôi. Tôi nghĩ rằng tôi chỉ đơn giản là có thể đặt tập lệnh đó trên thanh tác vụ của mình nhưng windows đã không cho phép tôi đặt bất cứ thứ gì để có thể thực hiện được việc này. Tôi đã tạo một tập lệnh Batch mà tôi nghĩ rằng tôi có thể gắn trên thanh tác vụ, nhưng thật đáng thất vọng. Sau đó, tôi nghĩ ngôn ngữ nào cho phép tôi tạo tệp .exe (có thể thực thi) cho các cửa sổ mà tôi có thể gắn trên thanh tác vụ của mình nhỉ?

Golang đến giải cứu. Tôi đã tạo ra 1 đoạn Script rất ngắn, chỉ đơn giản chạy node script của tôi mà thôi.

```
// main.go
package main

import (
	"fmt"
	"os/exec"
)

func main() {
	output, err := exec.Command("npm", "start").CombinedOutput()

	if err != nil {
		fmt.Println(err.Error())
	}
	fmt.Println(string(output))
}
```

Tạo một Shortcut cho  đuôi thực thi .exe trên máy tính để bàn của tôi và đặt cho nó biểu tượng dễ thương nào đó. Đặt tiếp phím tắt đó trên thanh tác vụ của tôi.
BÙM! Đã xong. Một nút đơn giản luôn có thể truy cập cho phép tôi kết nối với AirPods rất nhanh đã được hoàn thành.
![](https://images.viblo.asia/90081548-e550-492e-8002-eb4c05746e6e.gif)

Tôi nhận ra rằng tôi cũng có thể đạt được kết quả tương tự bằng cách sử dụng C#. Nhưng tôi đã không muốn cài đặt Visual Studio một IDE khủng khiếp trên máy tính xách tay của mình. Tôi cũng có thể đóng gói ứng dụng Nodejs của mình vào exe bằng cách sử dụng một số công cụ khác như nexe nhưng đó chỉ là công việc không cần thiết.
Đây chỉ là một ví dụ đơn giản về việc biết các công cụ khác nhau có thể giúp bạn giải quyết vấn đề của mình dễ dàng hơn nhiều. Nếu tất cả những gì tôi biết chỉ là Python hoặc Java hoặc Go thì đây sẽ là một điều rất khó thực hiện. Tôi có rất nhiều ví dụ để biết sử dụng ngôn ngữ phù hợp, giảm đáng kể thời gian và công sức cần thiết để giải quyết vấn đề.

## Tổng kết
1. Thật sự rất vui khi học các ngôn ngữ lập trình khác nhau. Thêm vào đó, việc này giúp mở rộng tầm nhìn của bạn và đưa bạn ra ngoài vùng "an toàn" của bạn.
2. Một lý do khác để học nhiều ngôn ngữ là để rèn luyện bản thân suy nghĩ về các vấn đề bên ngoài một ngôn ngữ hoặc mô hình. Lập trình hướng đối tượng là tuyệt vời nhưng cũng rất tuyệt nếu chúng ta biết lập trình hàm hoặc lập trình hướng thủ tục. Một khi bạn có thể tự rèn luyện suy nghĩ về lập trình bên ngoài ngôn ngữ cụ thể của mình, bạn sẽ không còn bị giới hạn bởi các giới hạn của nó.
3. Ngôn ngữ đầu tiên bạn sẽ học sẽ khó khăn và ngôn ngữ thứ hai sẽ còn khó khăn hơn nữa nhưng sau đó mọi chuyện chỉ như đi dạo trong công viên. Nó chỉ thay đổi cú pháp và một số vấn đề nào đó. Sau đó, bạn có thể tìm hiểu tất cả về các thư viện và Frameworks cụ thể của ngôn ngữ đó.
4. Một lý do thuyết phục khác mà tôi có thể nghĩ đến việc học nhiều ngôn ngữ hơn là WASM. Web "Nhúng" sẽ cho phép bạn chạy bất kỳ ngôn ngữ nào bạn muốn trên trình duyệt. Điều này có nghĩa là nếu bạn học các ngôn ngữ tốc độ hơn như C ++, để tận dụng sự nhanh chóng đó trên các trình duyệt và tạo ra thứ gì đó tuyệt vời như https://squoosh.app/. Thông tin thêm về điều đó ở [đây](https://www.youtube.com/watch?v=ipNW6lJHVEs)

## Cuối cùng ...
1. Nếu bạn là một nhà phát triển Javascript hoặc Python. Tôi khuyên bạn nên học một ngôn ngữ nào đó cấp thấp hơn. Bạn có thể đi xuống C hoặc C ++, nhưng tôi sẽ đề nghị đó là Golang. Bạn có thể dễ dàng có được 1 ngôn ngữ C ++ với tốc độ cao mà không có sự thất vọng của gia đình C.
2. Ngược lại cho tất cả các nhà phát triển ngôn ngữ cấp thấp, hãy 1 lần thử Python hoặc Javascript. Nếu bạn không 1lần thử những ngôn ngữ này, bạn sẽ bỏ lỡ. Python giống như mã giả và Javascript ở khắp mọi nơi hiện nay. Cả hai ngôn ngữ này cho phép bạn sử dụng các ngôn ngữ cấp thấp cùng với chúng. Bạn có thể viết các mô-đun C ++ cho Nodejs và Python. Vì vậy, hãy tin tôi, nó sẽ thay đổi cuộc sống của bạn.

Tôi hy vọng tôi đã thuyết phục được bạn tham gia vào một mối quan hệ "mở" khác với ngôn ngữ chính của bạn và có được một số trải nghiệm thú vị mới.
Nếu bạn biết 2 ngôn ngữ rất khác nhau, kinh nghiệm của bạn là gì? Bạn nghĩ nó đã giúp bạn như thế nào trong sự nghiệp? Hãy cho tôi biết trong các ý kiến ở bên dưới.

P.S - Tôi hy vọng bạn thích bài viết này. Đây là bài đầu tiên của tôi. Tôi thực sự sẽ đánh giá cao một số thông tin phản hồi. Xin vui lòng để lại nó trong các ý kiến.

Bài dịch từ: https://medium.com/@akshatgiri/why-you-need-to-learn-more-programming-languages-9160d609eac3