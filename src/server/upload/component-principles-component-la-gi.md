Các component là các đơn vị của quá trình triển khai hệ thống. Chúng là các thực thể nhỏ nhất mà có thể được triển khai như một phần của hệ thống. Ví dụ
- Trong JAVA là các file jar.
- Trong Ruby là các file gem.
- Trong .NET là các DLL.

Trong các ngôn ngữ biên dịch, chúng là các tập hợp của các binary file. Còn đối với tất cả các ngôn ngữ nói chung, chúng là hạt nhân của quá trình triển khai hệ thống.

Các component có thể gắn với nhau vào trong một executable duy nhất. Hoặc chúng có thể được tổng hợp lại thành một archive, như `.war` file. Hoặc chúng có thể được triển khai riêng biệt như các dynamically loaded plugin như là `.jar` hay `.dll` hay `.exe` file. 

Bất kể chúng được triển khai theo cách nào, các component được thiết kế tốt luôn có khả năng triển khai độc lập, do đó nó cũng luôn có khả năng phát triển độc lập.

# Ngắn gọn về lịch sử của Component
Trong thời kỳ đầu phát triển phần mềm, các lập trình viên điều phối vị trí bộ nhớ và xếp chúng vào chương trình của họ. Một trong những dòng code đầu tiên trong chương trình là câu lệnh *origin*, được dùng để khai báo địa chỉ mà chương trình sẽ được load.

Cùng xem một chương trình PDP-8 đơn giản dưới đây. Nó bao gồm một subroutine tên là `GETSTR`, cho phép nhập một string từ bàn phím và lưu vào trong bộ nhớ.

![](https://images.viblo.asia/3ac08719-af1a-407f-b7b8-d73978aa0932.png)

Lệnh `*200` ở đầu chương trình yêu cầu trình biên dịch generate code mà sẽ được tải ở địa chỉ 200 (hệ 8).

Loại chương trình này là một khái niệm rất xa lạ đối với phần lớn các lập trình viên ngày nay. Họ hiếm khi phải nghĩ về nơi mà một chương trình phải được tải trong bộ nhớ máy tính. Nhưng trong những thời kỳ đầu, đây là một trong những quyết định đầu tiên mà một lập trình viên phải làm. Vào những ngày đó, chương trình không thể di dời vị trí.

Vậy hồi đó làm thế nào để chúng ta có thể truy cập các hàm thư viện? Thực tế, lập trình viên đã include source code của các hàm thư viện với code trong ứng dụng của họ và biên dịch thành một chương trình duy nhất. Thư viện được giữ trong source code, không phải theo từng binary file.

Vấn đề của cách tiếp cận này là trong thời đại đó, các thiết bị chạy chậm và bộ nhớ thì đắt đỏ và giới hạn. Xử lý như trên khiến mỗi lần biên dịch chương trình phải biên dịch lại toàn bộ tốn rất nhiều thời gian, bộ nhớ thì lại không đủ để có thể nạp toàn bộ chương trình vào binary khiến cho trình biên dịch đã chậm rồi lại còn tốn thêm công sức.

Thời gian trôi qua, hàm của thư viện càng lớn thì tốc độ biên dịch càng chậm. Biên dịch một chương trình lớn có thể tốn hàng giờ đồng hồ.

Để rút ngắn thời gian biên dịch, các lập trình viên tách source code của các hàm thư viện ra khỏi application. Họ biên dịch riêng thư viện thành các binary ở một vị trí bộ nhớ riêng. Họ tạo một symbol table cho hàm thư viện và biên dịch chúng cùng với application code. Khi chạy một ứng dụng, chúng ta sẽ cần load các thư viện trước, sau đó mới load đến application. Bộ nhớ sắp xếp trông như hình dưới đây.

![](https://images.viblo.asia/afae70b4-5098-43cd-b38a-151b27f1be2d.png)

Cách này cũng đã hoạt động ổn định một thời gian khi application còn vừa với bộ nhớ trong khoảng địa chỉ từ 0000 đến 1777. Nhưng sau này khi application to lên và lớn hơn phần bộ nhớ định sẵn cho nó. Lúc này lập trình viên phải chia application thành hai phần địa chỉ, nhảy qua thư viện.

![](https://images.viblo.asia/1b39b965-cb58-4020-8ee8-cf64965046d7.png)

Dễ thấy rằng đây không phải là một cách làm bền vững. Theo thời gian, thư viện cũng sẽ phình lên và sẽ vượt quá phần bộ nhớ mà nó được cấp sẵn, và người ta lại tiếp tục phải chia cắt thư viện vào phần bộ nhớ mới. Sự phân mảnh này của các chương trình và các thư viện sẽ tiếp tục cùng với sự lớn lên của bộ nhớ máy tính.

Rõ ràng là có thứ chúng ta cần phải xử lý ở đây.

# Relocatability

Giải pháp ở đây là các binary có khả năng thay đổi vị trí. Ý tưởng đằng sau cũng khá đơn giản. Trình biên dịch được thay đổi sao cho output là các binary code mà có thể thay đổi vị trí trong bộ nhớ bằng một smart loader. Bộ loader sẽ được cho biết nơi load relocatable code. Relocatable code sẽ được gắn cờ để cho bộ loader biết phần nào của những dữ liệu đã được load cần phải bị thay thế để load ở địa chỉ đã chọn.

Bây giờ thì lập trình viên có thể cho bộ loader biết nơi load thư viện và nơi load app. Bộ loader sẽ nhận các binary đầu vào, load và realocate từng thứ một. Cách này cho phép lập trình viên chỉ tải những function mà họ cần.

Trình biên dịch cũng được thay đổi để đưa tên của các function vào metadata trong relocatable binary.
- Nếu một chương trình được gọi là một library function, trình biên dịch sẽ đặt tên theo dạng *external reference*. 
- Nếu một chương trình định nghĩa một library function, trình biên dịch sẽ đặt tên theo dạng *external definition*. 

Sau đó bộ loader có thể link external reference với external definition một khi nó xác định được nơi load các definitions đó.

Và linking loader được sinh ra từ đó.

# Linker

Linking loader cho phép các lập trình viên phân chia chương trình của họ thành các compilable và loadable segment. Phương thức này vẫn còn hoạt động tốt cho tới khi chương trình càng ngày càng tiếp tục phình dần.

Cuối cùng thì các linking loader trở nên quá chậm so với mức chịu đựng. Function library thì được lưu trên các thiết bị chậm chạp như băng từ. Thậm chí ổ đĩa cứng cũng còn rất chậm. Linking loader phải đọc hàng tá, thậm chí hàng trăm các binary library để xử lý việc tham chiếu bên ngoài. Chương trình lớn dần lên thì các library function cũng tăng lên tương ứng, một linking loader có thể mất hơn một tiếng đồng hồ để có thể load chương trình.

Kết quả là, quá trình loading và quá trình linking được chia thành 2 phase. Các lập trình viên sẽ đảm nhiệm phần chậm - phần linking - và đưa nó vào thành một application riêng biệt được gọi là linker. Output của một linker là một linked relocated mà một relocating loader có thể load rất nhanh chóng. Điều này cho phép các lập trình viên có thể tạo nên một executable sử dụng slow linker, nhưng sau đó họ có thể load nó lên rất nhanh ở bất cứ thời điểm nào.

Cho tới năm những năm 1980, các lập trình viên lúc này đang làm việc với C và một số ngôn ngữ bậc cao. Và tham vọng của họ đối với các chương trình ngày càng cao. Các chương trình chạy hàng trăm ngàn dòng code không còn là điều hiếm thấy.

Source module được biên dịch từ file `.c` vào trong file `.o`, và sau đó đưa vào linker để tạo ra các executable file có khả năng load nhanh chóng. Biên dịch từng module riêng lẻ cũng tương đối nhanh, nhưng khi biên dịch toàn bộ module cũng mất kha khá thời gian. Linker lại còn tốn thời gian hơn nữa. Và rồi chúng ta lại tiếp tục mất hàng giờ để triển khai chương trình.

Có vẻ như các lập trình viên đã chịu đựng những vấn đề này không ngừng nghỉ. Trong suốt những năm 1960, 1970 và 1980, tất cả những thay đổi được thực hiện để tăng tốc quy trình làm việc đều bị cản trở bởi tham vọng của các lập trình viên và quy mô của các chương trình họ đã viết. Họ dường như không thể thoát khỏi vấn đề thời gian deploy hàng giờ đồng hồ. Thời gian load vẫn nhanh, nhưng thời gian compile-link là điểm nghẽn.

Chúng ta có thể thấy được sự áp dụng định luật Murphy về quy mô chương trình:
> Chương trình sẽ tiếp tục lớn để có thể lấp đầy thời gian compile và linking.

Tuy nhiên nguyên tắc này đã bị phá vỡ bởi định luật Moore. Ổ cứng bắt đầu phình ra và dần trở nên nhanh hơn rõ rệt. Bộ nhớ máy tính bắt đầu rẻ bất ngờ và phần lớn dữ liệu trên ổ cứng có thể được cache trên RAM. Computer clock rate tăng từ 1MHz tới 100MHz.

Vào giữa những năm 1990, thời gian dành cho việc linking bắt đầu giảm nhanh hơn so với tham vọng của chúng ta có thể làm cho các chương trình phát triển hơn. Trong nhiều trường hợp, thời gian linking giảm xuống còn vài giây. Đối với những công việc nhỏ, ý tưởng về một linking loader lại trở nên khả thi.

Đây trở thành kỷ nguyên của Active-X, các shared library, và sự khởi đầu của các tệp `.jar`. Máy tính và thiết bị hoạt động nhanh đến mức chúng ta có thể thực hiện linking tại thời điểm loading. Chúng tôi có thể link một số tệp `.jar` với nhau hoặc một số shared library chỉ trong vài giây và thực thi chương trình kết quả. Và vì vậy kiến trúc component plugin đã ra đời.

Ngày nay, chúng ta thường gửi các tệp `.jar` hoặc DLL hoặc các shared library dưới dạng plugin cho các application. Ví dụ: nếu bạn muốn tạo một bản mod cho Minecraft, bạn chỉ cần đưa các tệp `.jar` tùy chỉnh của mình vào một thư mục nhất định. Nếu bạn muốn cắm Resharper vào Visual Studio, bạn chỉ cần đưa vào các tệp DLL thích hợp

# Kết

Các dynamically linked file có thể được cắm với nhau trong ngay tại runtime, chính là các software component của một architecture. Tuy đã tốn hàng chục năm, nhưng cuối cùng thì chúng ta đã đến một thời điểm mà component plugin architecture trở thành một điều rất bình thường và gần như đã là mặc định, trái ngược với nỗ lực khổng lồ trước đây.

-----

*Dịch và tham khảo từ [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*