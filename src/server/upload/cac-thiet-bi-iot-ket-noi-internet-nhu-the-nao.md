# Mở đầu
Xin chào các bạn!
Hôm nay mình cùng các bạn sẽ đi tìm hiểu một chủ đề khá thú vị. Không phải là các công nghệ cao siêu dùng trong IOT. Không phải là các giao thức truyền tải, giao tiếp mạng. Và cũng chẳng phải là chuyện bao lâu thì chúng ta sẽ bị gắn chíp sinh học biến thành siêu nhân tường tận mọi điều. Vấn đề hôm nay sẽ đơn giản thôi, như tiêu đề bài viết "Các thiết bị IOT kết nối internet như thế nào?".

![](https://images.viblo.asia/a69c5547-eb32-402a-9956-39792d172b92.png)

Chắc hẳn nói đến IOT (Internet Of Thinks - internet kết nối vạn vật) thì chúng ta sẽ nghĩ ngay đến việc các thiết bị, các vật sẽ được kết nối internet. Vậy các thiết bị đó kết nối với internet, kết nối với thế giới bên ngoài như thế nào? Các thiết bị đó kết nối với nhau ra sao? Chúng ta cùng đi tìm hiểu nhé.
# Giới thiệu
Như chúng ta đã biết Các thiết bị IOT thông thường sẽ sử dụng các loại sóng không dây với đa dạng các loại khác nhau như wifi, bluetooth, Zigbee, RF, ...
Và không phải tất cả các thiết bị IOT nào cũng cần phải kết nối với internet. Trong bài viết này mình chỉ đề cập đến các thiết bị phải kết nối internet thôi nhé. Mục tiêu đầu tiên khi cài đặt các thiết bị này là làm sao để kết nối nó được vào môi trường internet.

**Phân tích một chút nào.**

- Đối với thiết bị sử dụng sóng wifi làm phương thức truyền dẫn thì các thiết bị đó có thể kết nối với internet thông qua điểm truy cập wifi.

    Quá đơn giản chỉ cần nhập SSID và PASSWORD là xong. Nhưng mà hãy nhớ rằng các thiết bị IOT thông thường sẽ không có bàn phím và màn hình để nhập 2 cái thông tin ở trên vào. Chúng ta không thể cài đặt cứng cái SSID và PASSWORD vào trong chương trình như mấy bài trước được. Nhỡ chúng ta thay đổi mật khẩu cái wifi hoặc cầm đi chỗ khác để sử dụng thì sao? Vậy phải làm sao ta??... 

    Đúng rồi, chúng ta phải kết nối nó với một thiết bị khác có bàn phím và màn hình để có thể nhập được 2 thông tin trên như cái máy tính hay cái điện thoại của mình chẳng hạn. Cách kết nối thế nào mình xin trình bày ở phần bên dưới.
- Đối với các thiết bị sử dụng sóng không thể kết nối với mạng internet thì sao. Thì tất nhiên chúng không thể kết nối trực tiếp đến mạng internet được rồi. Mà phải kết nối gián tiếp. Chúng phải có một bộ chuyển đổi (gateway), liên kết chúng với hệ thống mạng có dây hoặc không dây rồi kết nối ra bên ngoài.

# Các mô hình kết nối
Với sự khác nhau về thành phần trong hệ thống, các thiết bị và cách kết nối khác nhau mình sẽ chia hệ thống mạng IOT ra thành các loại mô hình kết nối đơn giản như sau:

## Mô hình 1

![](https://images.viblo.asia/b17f19df-caf9-4353-b073-265ef34dd281.png)

Ở mô hình này, các thiết bị sẽ kết nối trực tiếp với gateway. Gateway sẽ có nhiệm vụ định tuyến, tiền xử lý dữ liệu và chuyển tiếp dữ liệu giữa 2 thành phần devices và server. Gateway thông thường sẽ kết nối với mạng internet bên ngoài bằng dây để đảm bảo đường truyền được ổn định nhất.

Với cách kết nối này thì các thiết bị truyền nhận dữ liệu với server là rất nhanh. Nhưng khoảng cách để truyền thì sẽ phụ thuộc vào công nghệ truyền tín hiệu mà thiết bị đó sử dụng. Trên thực tế sẽ có nhiều gateway để tăng tốc độ truyền tải dữ liệu cũng như mở rộng tầm hoạt động của hệ thống

## Mô hình 2

![](https://images.viblo.asia/9bfe21b3-4f89-44c9-ae12-7b0efe6bbb53.png)

Ở mô hình này, các thiết bị vừa làm chức năng của thiết bị đầu cuối vừa có thể định tuyến cho dữ liệu gửi từ thiết bị khác về Gateway gốc. Gateway thì nó vẫn làm nhiệm vụ của nó. Như là một cậu bé liên lạc dễ thương. Gateway sẽ định tuyến, tiền xử lý dữ liệu và truyền nhận dữ liệu giữa các bên để giữ cho kết nối được thông suốt.

Các bạn có thể thấy. Đối với mô hình này thì các thiết bị có thế kết nối với khoảng cách cực xa. Bên cạnh đó thì độ trễ cũng là một vấn đề  cần bàn tới. Khoảng cách xa thì độ trễ truyền nhận không thể nhỏ được phải không nào.

## Mô hình 3

![](https://images.viblo.asia/e62abfb5-3a77-4a1a-8606-76466605f4f2.png)

Mô hình này sẽ gần giống với mô hình 1. Điểm khác ở đây là sẽ không cần gateway nữa. Các thiết bị sẽ trực tiếp kết nối lên server trên cloud. Yêu cầu để các thiết bị có thể làm được điều đó là các thiết bị phải sử dụng công nghệ kết nối trực tiếp được vào mạng internet như sử dụng kết nối wifi, 2G, 3G, 4G, 5G,... Và như mình đã nói ở trên để cài đặt ban đầu cho các thiết bị này kết nối được mạng ta phải kết nối chúng với một thiết bị thông minh khác như điện thoại thông minh chẳng hạn. Sau đó cấu hình các cài đặt cần thiết để chúng có thể tự liên lạc được với thế giới đầy những điều thú vị ở bên ngoài.
# Áp dụng vào hệ thống Bể cá thông minh
Hệ thống bể cá thông minh của chúng ta sử dụng Wemos có kết nối wifi. Và chúng được kết nối trực tiếp với mạng wifi trong gia đình từ đó có thể đi ra ngoài internet kết nối với server. Từ phần 1 đến giờ mình để các cài đặt wifi ở trong code không thể thay đổi được khi đã nạp vào wemos. Việc cần làm của chúng ta là phải viết 1 đoạn chương trình thực hiện chức năng kết nối ban đầu, thiết lập cấu hình wifi cho Wemos.

Vậy làm sao để  Wemos kết nối được với điện thoại hay máy tính đây?

Các bạn hãy nhớ rằng wemos của chúng ta có một chức năng phát wifi để các thiết bị khác kết nối vào như một điểm truy cập (Access point) và nó có thể làm web server nữa.

Ý tưởng để kết nối giữa wemos và máy tính như sau:
- Wemos phát wifi cho máy tính truy cập vào. Không cài đặt mật khẩu cho dễ nhớ.
- Wemos sẽ thành một web server để máy tính truy cập vào. 
- Máy tính sẽ gửi SSID của wifi và PASSWORD của mạng wifi đó cho server wemos. 
- Wemos nhận được tên và mật khẩu của wifi thì sẽ ngắt chế độ phát wifi, ngắt server web và chuyển sang chế độ kết nối đến mạng wifi và làm việc bình thường.

Các bạn hãy xem sơ đồ sau để dễ hình dung hơn

![](https://images.viblo.asia/04b16d21-49d1-4a38-bc13-c25202cda47e.PNG)
# Kết luận
Vậy là chúng ta đã tìm hiểu qua cách mà các thiết bị (devices) kết nối với internet rồi. Mình hi vọng các bạn nhớ các mô hình để khi cài đặt bị lỗi kết nối hay sai gì đó thì ta có thể khoanh vùng lỗi ở phần kết nối nào để sửa cho nhanh gọn nhẹ.

Mình xin kết thúc bài viết hôm nay tại đây. Bài sau chúng ta sẽ cùng nhau cài đặt theo đúng sơ đồ bên trên nhé.

Cảm ơn các bạn đã đọc bài viết của mình! :)