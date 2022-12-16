Kỉ nguyên 4.0 đang bắt đầu, và Web là một thế giới rất rộng lớn mà trong tương lai sẽ phát triển với tốc độ rất nhanh. Trong bài viết này, mình sẽ tổng hợp lại tất cả các định nghĩa, khái niệm và kiến thức cơ bản nhất của Web, mặc dù nó không còn là khái niệm xa lạ với chúng ta nữa. Tuy vậy, mình hy vọng bài viết này sẽ giúp bạn có một cái nhìn toàn diện và khái quát hơn về Web.
# *`Internet là gì?`*
Đây có lẽ là một câu hỏi rất khó để trả lời, bởi vì **Internet** đơn giản chỉ là **Internet** thôi đúng không? Và để tìm ra một định nghĩa chính xác quả thực rất khó. Theo Wikipedia:
> The **Internet** is the global system of interconnected computer networks that use the Internet protocol suite (TCP/IP) to link devices worldwide.
> 

Tạm dịch: **Internet** là một mạng lưới giao tiếp của máy tính và nó sử dụng *Internet protocol suite* (mô hình TCP/IP) để kết nối với các thiết bị trên toàn cầu.

Tuy nhiên, định nghĩa trên vẫn khá mơ hồ và trừu tượng. Vậy thực sự thì **Internet** là gì?

Nói một cách đơn giản nhất, **Internet** là sự kết nối giữa các máy tính với nhau và chúng kết nối với nhau thông qua đường dây điện thoại (ví dụ như công nghệ ADSL ngày trước), sóng điện từ (Wi-Fi), dây cáp (cáp đồng, cáp quang, ...) và tất cả các cơ chế truyền dữ liệu khác. Cơ chế truyền dữ liệu ở đây về cơ bản là cách để đưa thông tin từ nơi này sang nơi khác mà thôi, vậy nên vẫn còn vô vàn các cách kết nối **Internet** khác mà thậm chí chúng ta còn chưa nghĩ ra.
***
*Nếu bạn để ý thì bản thân từ **Internet** thực ra đã nói lên tất cả: **Inter** là một prefix để miêu tả sự vật sự việc có liên kết với nhau còn **net** có nghĩa là mạng lưới. Vậy **Inter-net**  đơn giản chỉ là một mạng lưới được liên kết với nhau mà thôi!*
***
# *`World Wide Web là gì?`*
Theo Wikipedia:
> The **World Wide Web** (abbreviated **WWW** or the **Web**) is an information space where documents and other web resources are identified by Uniform Resource Locators (URLs), interlinked by hypertext links, and can be accessed via the **Internet**.
> 
Tạm dịch: **World Wide Web** (viết tắt là **WWW** hay **Web**) là một không gian gồm có nhiều tài liệu và các tài nguyên web được định nghĩa bởi Uniform Resource Locators (chúng ta sẽ nói về cái này sau), được liên kết bởi các đường dẫn (link) và có thể được truy cập thông qua Internet.

Vậy là đã khá rõ ràng rồi, **Web** là một nơi mà chúng ta có thể chia sẻ, tìm kiếm tài liệu, thông tin, ... giữa các máy tính với nhau thông qua Internet (và đừng hỏi lại Internet là gì nhé).
# *`Server là gì? Client là gì?`*
Chúng ta là những người sử dụng máy tính, chính vì thế kết nối Internet vào lúc nào, hay bao lâu là tùy vào ý thích của mỗi người. Nhưng bạn đã bao giờ tự hỏi, nếu như tất cả các máy tính đều ngắt kết nối thì sao? Nhỡ một máy tính kết nối còn một máy tính không thì truyền dữ liệu kiểu gì? Và nếu có một máy tính nào đó kết nối Internet 24/7? Vâng, và bạn đã đoán đúng rồi đấy! Loại máy tính có kết nối Internet 24/7 chính là **server** và đương nhiên loại máy tính còn lại là **client** - chính là chúng ta, những người sử dụng Internet. 

Vậy **server** có điểm khác biệt gì so với **client**? Thực ra, giữa chúng không hề có sự khác biệt nào lớn, **server** cũng giống như những chiếc máy tính chúng ta đang sử dụng, khác ở chỗ nó được cài đặt một phần mềm gọi là server software. Khi **client** muốn chia sẻ thông tin, nó sẽ gửi yêu cầu (request) lên **server** thông qua trình duyệt (browser). Lúc này, nhiệm vụ của server software là tiếp nhận request đó và trả về thông tin tương ứng (respond) cho **client**.
# *`Uniform Resource Locators (URLs) là gì?`*
Đã bao giờ bạn tự hỏi làm thế nào để browser tìm thấy một trang web? Câu trả lời rất đơn giản, đó chính là **URL**  - địa chỉ của một trang web. Tất cả các trang web đều có thể được truy cập thông qua thông qua **URL** bằng cách nhập vào thanh địa chỉ trên browser. Nhưng để có thể có được **URL**, bạn sẽ phải đăng kí tên miền (domain name), và giống như địa chỉ nhà, tên miền là duy nhất và không có sự trùng lặp.

Tại sao đăng kí tên miền lại mất phí? Lý do là bởi vì ***các server lưu trữ tên miền*** của cả thế giới phải được cập nhật và chúng ta phải chi trả cho điều đó. 
***
***Các server lưu trữ tên miền:** đây là các server đặc biệt lưu trữ tên miền của cả thế giới
 hay còn gọi là Domain Name System (DNS) servers. Tuy nhiên, mình sẽ không đề cập đến nó trong bài viết này. Tạm thời, bạn hãy coi nó giống như một quyển danh bạ chứa địa chỉ web của cả thế giới nhé.*
 ***
Đến đây, có lẽ bạn sẽ hiểu thêm một chút: khi truy cập vào một trang web, thì server của trang web đó có thể ở bất cứ đâu trên thế giới. Và để tìm được server này thì browser sẽ request đến DNS server trước, rồi sau đó nó sẽ trả về địa chỉ của server mà bạn muốn request. Bằng cách này, bạn có thể truy cập đến tất cả các trang web trên thế giới. 
 ***
 
*Giả sử, bạn muốn truy cập vào google.com, thì browser của bạn sẽ request đến DNS server ở Hà Nội trước, rồi sau đó DNS server ở Hà Nội sẽ trả về địa chỉ server của Google ở San Francisco chẳng hạn (chỉ là giả sử thôi nhé).*
 ***
 
#  *` Khác biệt giữa *.com, *.net, *.org, ...?`*
Thực tế là cũng không hề có sự các biệt giữa các phần mở rộng này. Chỉ có điều `*.com` là phần mở rộng phổ biến nhất kể từ khi Web được biết tới. Vậy nên khi đăng kí tên miền, người ta sẽ đăng kí `*.com` trước, sau đó đến các phần mở rộng ít phổ biến hơn như `*.net`, `*.org`, `*.tv`, ... Lưu ý một điều là `*.com` và `*.net` là hai tên miền hoàn toàn khác nhau đấy nhé.
***
# ***`(Updating...)`***
# *`Lời kết`*
Hi vọng với bài viết này, bạn đã có cái nhìn khái quát và toàn diện hơn về lập trình web nói riêng và thế giới Web nói chung. Tuy nhiên, bài viết vẫn còn rất nhiều thiếu sót, các bạn hãy comment góp ý để giúp mình có thể hoàn thiện bài viết này cũng như các bài viết tiếp theo được hay và đầy đủ hơn nhé.