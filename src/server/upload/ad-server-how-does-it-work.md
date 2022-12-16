Mời các bạn xem lại [Part 1: VAST & VPAID](https://viblo.asia/p/video-ads-part-1-vast-vpaid-XL6lANgA5ek)

Kể từ thuở sơ khai của quảng cáo trực tuyến từ 2 thập niên trước, một số lượng các công nghệ đã được giới thiệu trong hệ sinh thái quảng cáo `AdTech ecosystem` để giải quyết các vấn đề mà `advertisers` (nhà quảng cáo) và `publisher`(nhà phân phối, xuất bản quảng cáo) gặp phải, và cải thiện toàn bộ quy trình mua bán phương tiện truyền thông (*media buying and selling process*)

Mặc dù việc phát minh ra các nền tảng quảng cáo `AdTech platform` như nền tảng theo yêu cầu (**DSPs** - [*demand-side platforms*](https://en.wikipedia.org/wiki/Demand-side_platform)), nền tảng cung cấp (**SSPs** - [*Supply-side platforms*](https://en.wikipedia.org/wiki/Supply-side_platform)) và trao đổi quảng cáo ([*ad exchanges*](https://en.wikipedia.org/wiki/Ad_exchange)) đã giúp định hình cảnh quan của hệ sinh thái quảng cáo trực tuyến, thật khó để nhìn lại một công nghệ quảng cáo cụ thể nào đó mà được tạo lại trong những ngày đầu quảng cáo trực tuyến và vẫn còn liên quan đến hôm nay như lúc đó - **the Ad server.**

## Ad server là gì?
`Ad server` là một phần của công nghệ quảng cáo (`AdTech`) được sử dụng bởi `publisher`, `advertiser`, `ad agencies`(đại lý quảng cáo) và `ad network` (mạng quảng cáo) để quản lý và chạy các chiến dịch quảng cáo (`ad compaign`). 

`Ad server` chịu trách nhiệm đưa ra quyết định tức thời về những quảng cáo sẽ hiện trên trang web, và cung cấp cho chúng. Trên hết, *ad server* sẽ thu thập và báo cáo số liệu (như số lần hiển thị, số lần click...) để *advertiser* nắm rõ số liệu và theo dõi được hiệu suất của quảng cáo.

### Ad Server đầu tiên 
Xuất hiện đầu tiên năm 1995 bởi công ty *FocaLink Media Service*, khi ngành quảng cáo trực tuyến ở giai đoạn đầu và được sử dụng để giúp các *publisher* quản lý quảng cáo trực tuyến và kiểm soát việc phân phối của họ.

Trước đó, các khả năng nhắm mục tiêu quảng cáo (`ad-targeting`) là khá hạn chế, các *advertiser* chỉ có thể nhắm mục tiêu quảng cáo dựa trên các thong tin `header` rất hạn chế lấy được từ trình duyệt của người dùng, như:
* Ngôn ngữ đặt trên máy tính người dùng
* *URL* của trang mà quảng cáo được tải lên
* Loại và *version* của trình duyệt
* Hệ điều hành của người dùng

Kể từ đó, các máy chủ quảng cáo đã đi một chặng đường dài, không ngừng phát triển cùng với toàn bộ hệ sinh thái để đáp ứng nhu cầu ngày càng tăng của cả *publisher* và *advertiser*.

Một số chức năng đã được thêm vào `ad server` theo thời gian, như nhắm mục tiêu, kiểm soát ngân sách, giới hạn tần suất... và chúng cũng đã được tích hợp vào nhiều nền tảng mới *DSP*, *SSP*.

### Nhiệm vụ của Ad Server
`Ad server` có thể được dùng bởi *publisher* (còn được gọi là `First-Party Ad server`) và *advertiser* (`Third-party ad server`). Mặc dù là chung công nghệ nhưng các `ad server` được dùng bởi *publisher* và *advertiser* vì những lý do khác nhau.

![](https://images.viblo.asia/36d703cb-62ee-4267-9bc7-e89441ebd284.png)

#### First-Party Ad Server
*Server* này cho phép *publisher* quản lý `ad slot` trên trang *web* của họ và hiển thị các quảng cáo đã được bán trực tiếp cho *advertiser* thông qua các chiến dịch trực tiếp (`direct compaign`)

Trong trường hợp không có chiến dịch trực tiếp nào, *first-party ad server* sẽ hoạt động như một nền tảng quản lý giúp quyết định mã quảng cáo nào (như từ *third-party ad server* hay *SSP ad network*) để phân phát trong các `ad slot`.

*First-Party Ad server* chịu trách nhiệm nhắm mục tiêu, tức là đưa ra quyết định về việc quảng cáo nào sẽ hiển thị trên trang *web* dựa trên các tham số nhắm mục tiêu theo sắc thái, phân phát, thu thập và báo cáo dữ liệu (như số lần hiển thị, số lần click...)

Ngoài ra chúng được sử dụng để dự báo quảng cáo tồn kho - tức là số lượng quảng cáo tồn kho và loại mà *publisher* sẽ có sẵn để bán trong tương lai dựa trên các chiến dịch và dự báo lượng truy cập hiện tại.

### Third-Party Ad Server
Bằng cách sử dụng `ad server` này, *advertiser* sẽ có thể dễ dàng theo dõi các chiến dịch quảng cáo của họ. `Ad Tag` từ `Ad server` của *advertiser* sẽ được tải bởi *publisher* (*first-party ad server*), do đó chức năng của nó bị hạn chế ơn so với *first-party ad server*. Nó chủ yếu chỉ được sử dụng để thu thập dữ liệu của chiến dịch quảng cáo  và xác minh các số liệu nhất định như số lần hiển thị và số lần click...

*Third-party ad servers* có thể được sử dụng cho một số tối ưu hóa như *advertiser* có thể quyết định thay đổi quảng cáo được sử dụng trong chiến dịch hoặc chạy 1 loạt các thử nghiệm A/B của quảng cáo, nhưng mục tiêu chính nó được xác định ở phía *first-party ad server*.

Sự khác biệt chính của *third-party* được các *advertiser* sử dụng để tổng hợp tất cả các thông tin chiến dịch (báo cáo, đối tượng) trên tất cả các *publiser*, *ad network* và các nền tảng khác mà chiến dịch chạy. Dùng công cụ kiểm toán để đo lường và xác minh xem các hiển thị đã thực sự phân phối đúng cách, Các *publisher* và *advertiser*, vì nhiều lý do, có thể báo cáo các số liệu khác nhau, nhưng mức độ khác biệt nhất định được coi là bình thường. *Third-party ad server* cũng cung cấp cho *advertiser* quyền sở hữu và kiểm soát dữ liệu được thu thập (thông tin về đối tượng)

## Cách hoạt động của ad server
### First-party Ad server

![](https://images.viblo.asia/350cc83b-0ee8-46d5-95a1-390817aa3510.png)

1. *User* gởi *request* lên *Publisher web server* để load nội dung
2. *Publisher web server* trả về *HTML* và *browser* load nội dung
3. *Ad request* gởi lên *publisher ad server* để hiển thị trên các *ad slot*
4. *Publisher ad server* chọn *compaign* dựa trên thông tin nhận được từ *user*
5. *Publisher ad server* trả về *Javascript tag*, và *ad* sẽ hiển thị cho *user*


### Third-party ad server
Sau một vài năm, *advertiser* cũng phát hiện ra rằng họ cần một cách để lưu trữ quảng cáo của họ và đo lường hiệu suất của các chiến dịch của họ bằng cách phân tích số liệu trên nhiều *publisher*

![](https://images.viblo.asia/fc27cf44-0c84-4a80-ab6e-95ddb6137e7f.png)
1. *User* gởi *request* lên *Publisher web server* để load nội dung
2. *Publisher web server* trả về *HTML* và *browser* load nội dung
3. *Ad request* gởi lên *publisher ad server* để hiển thị trên các *ad slot*
4. *Publisher ad server* chọn *compaign* dựa trên thông tin nhận được từ *user*
5. *Publisher ad server* gởi trả về một *ad markup* (mã được thêm vào trong *ad slot*) chứa một URL chỉ đến *advertiser ad server*
6. *Ad markup* gởi một *request* lên *Advertiser ad server*
7. *Advertiser ad server* gởi *markup* đến *publisher site* và hiển thị *ad* cho *user*

*Third-party ad server* cho phép *advertiser*:
* Lưu trữ và quản lý mã quảng cáo của họ
* Thiết lập tiêu chí theo dõi cho các chiến dịch quảng cáo
* Theo dõi hiệu suất của toàn bộ chiến dịch trên tất cả các *publisher* trong một hệ thống
* Đo lường phạm vi tiếp cận của chiến dịch trong khi tính đến tỷ lệ đồng xem (*co-viewership*) giữa các *publisher*
* Xác minh các báo cáo được cung cấp bởi *publisher*
* Tối ưu hóa các chiến dịch

**REFERENCES**

https://clearcode.cc/blog/what-is-an-ad-server/

https://en.wikipedia.org/wiki/Demand-side_platform

https://en.wikipedia.org/wiki/Supply-side_platform

https://en.wikipedia.org/wiki/Ad_exchange