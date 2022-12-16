Với mỗi một dev thì ai cũng có riêng cho mình các **công cụ bí mật**, hay còn gọi là **vũ khí** ẩn dấu khó lòng tiết lộ mà nó giúp các ka-ca coder làm việc **rất nhanh và thuận lợi**. Thôi thì hôm nay lỡ nên đây nói rồi nên mình cũng xin mạn phép chia sẻ một số vũ khí mà mình thu lượm sưu tập được. Nói chung là vũ khí cùi, mòn, ghẻ nở, ngon đủ cả. Không biết dưới đây nó có ngon với các bạn không, ít nhất hiện tại với mình thì nó đều ngon cả, hi vọng là nó cũng có ích với các bạn. Dưới đây mình sẽ đề cập qua 2 phần mục chính trong bài viết:
   
   **1: Các Extension hữu ích**
   
   **2: Các dev tool hữu ích**



-----


![](https://images.viblo.asia/2de12ac1-5fad-4b56-a04e-64b56fb3dd2e.jpg)



### A: CÁC EXTENSION HỮU ÍCH

Phần này mình sẽ liệt kê các extension hữu ích mà mình hay sử dụng trên 2 trình duyệt rất phổ thông hiện nay là Chrome và Firefox.

* [Firebug (firefox)](http://www.techbeamers.com/use-firebug-and-firepath-in-firefox/): Vâng một addon cực kỹ nổi tiếng trên firefox, việc test, debug, write code multiple line hay view network giờ đây tiện lợi hơn bao giờ hết. Đây hẳn là một supper plugin mà bạn nên sử dụng trong quá trình phát triển website.
* [FirePath](http://toolsqa.com/selenium-webdriver/xpath-firebug-firepath/): là 1 addon truy vấn xpath (plugin phụ thuộc của firebug), Giờ đây bạn có thể truy vấn Xpath (Select XmlDom) mà không cần phải dò đường chi tiết nữa.. bạn chỉ cần mở cửa sổ devtool của trình duyệt nên và inspect tới element HTML mà mình muốn và Firepath sẽ tự động detect chuỗi Xpath cho bạn, hẳn là một công cụ rất tuyệt vời cho bạn nào muốn crawler data từ website :) 
* [ Selenium (firefox)](https://www.guru99.com/install-selenuim-ide.html): Là một tiện ích kiểm thử firepath cũng khá hiệu quả, nó cũng là món đồ khá lợi hại cho dân tester.
* [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?utm_source=chrome-app-launcher-info-dialog), [react-detector](https://chrome.google.com/webstore/detail/react-detector/jaaklebbenondhkanegppccanebkdjlh?utm_source=chrome-app-launcher-info-dialog), [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?utm_source=chrome-app-launcher-info-dialog): Bộ 3 extension trên chrome trợ giúp trong việc phát triên một ứng dụng react- redux.
* [Allow-Control-Allow-Origin](https://chrome.google.com/webstore/detail/allow-control-allow-origi/nlfbmbojpeacfghkpbjhddihlkkiljbi?utm_source=chrome-app-launcher-info-dialog) (chrome): Là 1 add on cho phép bạn qua mặt Cross-domain request . Đại loại nó giúp các dev web client động test call api tới các nguồn dữ liệu web không cho phép chia sẻ tài nguyên mà không bị dính lỗi cross resource origin. Bạn nào chưa biết về Cros domain thì [xem thêm tại đây](https://toithacmac.wordpress.com/2016/03/30/cross-domain-request-trong-javascript-la-gi/) nhé.
* [ anonymoX](https://chrome.google.com/webstore/detail/anonymox/icpklikeghomkemdellmmkoifgfbakio?utm_source=chrome-app-launcher-info-dialog) (chrome): Plugin này cho phép bạn fakeIP sang 1 ip khác. Điều này khá hữu ích khi mà tại mạng bạn truy cập đang bị chặn bởi 1 một địa chỉ nào đó. Khi đó hãy nghĩ ngay tới plugin này. Bật nó nên và chọn anonymoX is On => Vậy là điều hướng bị chặn của bạn sẽ tự động được detect với 1 ip tự động.
* [ ColorZilla](https://chrome.google.com/webstore/detail/colorzilla/bhlhnicpbhignbdhedgjhgdocnmhomnp?utm_source=chrome-app-launcher-info-dialog) (chrome): giúp bạn detect màu trên trình duyệt chỉ bằng vài vài cú nháy chuột và trỏ tới bất kì đia điểm nào trên trình nội dung trình duyệt và mã màu sẽ tự động được sinh ra
* [Markdown Here](https://chrome.google.com/webstore/detail/markdown-here/elifhakcjgalahccnjkneoccemfahfoa?utm_source=chrome-app-launcher-info-dialog): Sử dụng để viết markdown trên github. Sự khác biệt duy nhất của tiện ích này so với viết markdown thông thường trên github là nó có hẳn 2 cửa sổ: 1 cửa sổ để viết, còn 1 cửa sổ preview song song luôn  (github thì vừa phải viết vừa phải preview). Bạn nào chưa biết về markdown thì giờ như này nhé.. Bạn vào bất kỳ một library nào nổi tiếng được public trên github giúp mình coi. Rồi vô đó kéo xuống dưới, bạn có thấy document của họ viết hướng dẫn sử dụng libary không ==> Are you oke, vâng document đó viết bằng mark down đó .
* [User-Agent Switcher for Chrome](https://chrome.google.com/webstore/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg?utm_source=chrome-app-launcher-info-dialog): Ooh giờ bạn có thể sử dụng trình duyệt của mình mà lướt web như một thiết bị điện thoại rùi nhé. Nó khá hữu ích khi test các request là mobile. Bạn không cần phải sử dụng điện thoại để test các yêu cầu có header là mobile. Bạn chỉ cần cài extension và chọn chế độ giả lập mobile tương ứng với các os (ios, android, windows phone ...) . Giờ đây các yêu cầu gửi về sẽ được hiểu là gửi cho thiết bị điện thoại.
* [ AccessURL](https://addons.mozilla.org/en-US/android/addon/access-url/): tiện ích chia sẻ tài nguyên cần đăng nhập. Khi bạn muốn chia sẻ một tài khoản của khóa học, hay một thư viện nào đó trên website mà có tài khoản. Bạn không muốn cho thằng bạn của mình mượn. => Oke cài đặt plugin này và login tài khoản trên website rồi click vào extension => create một liên kết + chọn thời gian tồn tại cho liên kết ==> Chia sẻ cho lũ bạn, ae cộng đồng  (url này sẽ hết hiệu lực khi nó hết hạn hoặc người dùng access url logout ra khỏi hệ thống).
* [JSON Formatter](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?utm_source=chrome-app-launcher-info-dialog): Format chuỗi json xuất ra trên trang web nhìn đẹp hơn.


### B: CÁC DEV-TOOL


Ở phân này mình sẽ chia các devtool này thành 4 nhóm các devtool chính là các nhóm


* Mini devtool: là các devtool hỗ trợ không phân biệt ngôn ngữ
* Database tool: là các công cụ quản lý database
* Subversion tool: là các công cụ quản lý phiên bản mã nguồn
* Chat tool: là các công cụ chat.


**1. Mini devtool**

* [Postman](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop): support tool test api đây rồi. Cung cấp gần như đầy đủ các option để test api, các chế độ authen hay các kiểu giả lập khác nhau cũng được cung cấp trên postman. Sau khi cài đặt bạn có thể xem các example có sẵn của nó. Post man hơn nữa còn cung cấp lưu trữ, export ra các api để tiện chia sẻ cho các đồng nghiệp.
* [Cmder](http://cmder.net/): multiple tab command line: Là một tiện ích hỗ trợ dòng lệnh trên nhiều cửa số tab khác nhau, rất dễ quản lý. Bạn không cần phải bật nhiều cửa sổ command trên window nữa, Cmder còn hỗ trợ cả dòng lệnh git tích hợp, khá nhiều dòng lệnh trên linux cũng được tích hợp trên đây nữa nhé.
* [ Putty](https://www.putty.org/): tiên ích ssh từ client tới máy chủ vps và làm việc với dòng lệnh.
* [ LinqPad](https://www.linqpad.net/): Sử dụng test Linq trong .Net , bác nào dùng .Net Linq thì sử dụng thằng này oke quá rồi. Họ cung cấp cả bản trả phi và không phí. Mình thấy sử dụng không phí cũng khá oke.

**2. Database tool**

* **MongoChef** hay **RoboMongodb**: Đây là 2 công cụ hỗ trợ phát triển vơi Cơ sở dữ liệu (CSDL) Mongodb riêng biêt các bạn nhé. Tuy nhiên bạn sẽ không cần phải đăn đó để chọn nhiều nữa vì giờ đây nhóm phát triển MongoChef đã thống nhất với người phát triển triển RoboMongodb và đi tới hợp nhật MongoChef với RoboMongodb và cho ra đời một sản phẩm có tên Studio3T. 
* **Studio3T**: Đã trình bày ở trên. Giờ thì cứ nghĩ tới mongodb bạn hãy chọn ngay Studio3T nhé. Công cụ này hỗ trợ phát triển thao tác với cơ sở dữ liệu Mongodb. Hỗ trợ các snippet truy vấn, view data.
* **MySql Workbench**: Hỗ trợ các thao tác quản lý với CSDL MySQL. 
* **Navicat**: `Navicat Premium is a multi-connection database development tool `: Mới nhìn qua dòng trên trang chủ thôi đã thấy nó thú vị thế nào rồi. Nó hỗ trợ kết nối và làm việc với hầu như tất cả các cơ sở dữ liệu quan hệ (Sql Server, MySql, Postgresql, Oracle, Sqlite, MariaDB). Còn điều gì tuyệt vời hơn khi mà chỉ cần dùng 1 công cụ đã có thể làm việc với toàn bộ các cơ sở dữ liệu rồi. Tuy vẫn còn một số hạn chế nhất định song với các làm việc cơ bản nó đáp ứng gần như là khá tốt.


 **3. Subversion tool**
 
*  **Tortoirse Git**: Hỗ trợ quản lý git với giao diện ui trực quan. Bạn nào làm việc về Tortoirse SVN rồi thì sử dùng thằng này nhìn gui rất giống vì cùng là một nhà sản xuất mà.
*  **Tutoirse SVN**: mình lại vừa nói ở trên mất rồi. Đại loại nó làm việc và quản lý với mã nguỗn SVN. Tuy giờ rất ít sử dụng nhưng khi bạn làm việc với các dự án của JAV thì họ vẫn chuộng cái này lắm nhé.
*  **Source tree**: Được phát hành bởi alasian. Source tree cũng là một gui tool quản lý mã nguồn git và thường là bộ đôi rất ăn ý khi đi chung với bitbucket.
*  **Team Foundation Server**: Quản lý mã nguỗn cùng với team foundation server của microsoft. Công cụ này thường được tích hợp trong Visual Studio của MS.

**4: Chat tool**

* **Hipchat**: công cụ chat làm việc nhóm này interage được rất nhiều các môi trường phát triển khác. Có thể kế đến như github, bitbucket, facebook group ... Khi được tích hợp với các môi trường trên đồng nghĩa với việc mọi hoạt động của các môi trường tích hợp sẽ được thông báo trên group chat được tích hợp. Rất thuận lợi phải không nào.
* **Slack**: không thể không kể đến ông này. Một dịch vụ chat rất nổi tiếng được các cộng đồng startup khá yêu thích. Giao diện đẹp, hỗ trợ upload file, ảnh và quản lý các nhóm group riêng biết cũng khá hay. Ngoài ra slack cũng tích hợp với các môi trường từ bên thứ 3 không hề thua kém gì hipchat. Cả 2 về cơ bản đều sử dụng webhook tích hợp với các môi trường từ bên thứ 3 này .
* **Skype**: Là công cụ chat văn phòng thì là hay hơn. Tuy không interage môi trường bên thứ 3 như hipchat và slack. Tuy nhiên skype lại được đông đảo cộng đồng người dùng và sử dụng trong môi trường làm việc, tuyển dụng nhớ tính sử dụng nhanh gọn nhẹ và call video khá tốt, nên nó vẫn luôn là chat tool được yêu thích hàng đầu.
* **Chatwork**: Là công cụ chat rất được ưa thích ở Nhật.



-----



Mình tin là các công cụ trên đây không ít thì nhiều các bạn đã từng dùng qua. Hi vọng là các devtool trên là hữu ích giúp bạn làm việc tăng năng xuất hiệu quả hơn. Comment thêm phía dưới những devtool mà bạn đang làm việc để mọi người cùng học hỏi nhé :D.