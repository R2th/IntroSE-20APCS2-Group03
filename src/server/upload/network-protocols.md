Các Network stack làm một số điều dường như không thể. Nó truyền đáng tin cậy trên các mạng không đáng tin cậy của chúng tôi, thường không có bất kỳ trục trặc nào có thể phát hiện được. Nó thích hợp để tắc nghẽn mạng. Nó cung cấp giải quyết tới hàng tỷ active nodes. Nó định tuyến các gói tin xung quanh cơ sở hạ tầng mạng bị hỏng, lắp ráp chúng lại theo đúng thứ tự ở phía bên client ngay cả khi chúng đã bị hỏng. Nó chứa các nhu cầu phần cứng tương tự bí truyền, như cân bằng trên hai đầu của cáp Ethernet. Điều này tất cả hoạt động rất tốt mà người dùng không bao giờ nghe về nó, và thậm chí hầu hết các lập trình viên không biết nó hoạt động như thế nào.

**Network routing**

Trong những ngày đầu tiên của điện thoại analog, thực hiện một cuộc gọi điện thoại có nghĩa là bạn thực hiện một kết nối điện liên tục từ điện thoại của bạn cho bạn bè của bạn. Nó giống như một sợi dây được chạy trực tiếp từ bạn đến họ. Không có dây như vậy, tất nhiên – kết nối được thực hiện thông qua các hệ thống chuyển mạch phức tạp – nhưng nó tương đương với một dây điện.

Có quá nhiều nút Internet để nó hoạt động theo cách này. Chúng tôi không thể cung cấp đường dẫn trực tiếp, không gián đoạn từ mỗi máy đến từng máy khác mà họ muốn nói chuyện.

Thay vào đó bucket-brigaded – handed từ một bộ định tuyến tiếp theo, trong một chuỗi, mỗi một mang nó đến gần đích của nó. Mỗi bộ định tuyến giữa máy tính xách tay và google.com của tôi được kết nối với một số bộ định tuyến khác, duy trì bảng định tuyến thô cho biết bộ định tuyến nào gần với phần nào của Internet hơn. Khi một gói tin  đến đích google.com, việc tra cứu nhanh trong bảng định tuyến sẽ cho bộ định tuyến biết gói nào sẽ đi tiếp theo để đưa nó đến gần Google hơn. Các gói nhỏ, vì vậy mỗi bộ định tuyến trong chuỗi liên kết lên bộ định tuyến tiếp theo chỉ trong một phần nhỏ của giây.

Định tuyến chia nhỏ thành sub-problems. Đầu tiên, giải quyết: đích của dữ liệu là gì? Điều này được xử lý bởi IP, Giao thức Internet , địa chỉ IP. IPv4, vẫn là phiên bản IP phổ biến nhất, chỉ cung cấp 32 bit không gian địa chỉ. Nó bây giờ được phân bổ đầy đủ , do đó, thêm một nút vào Internet công cộng yêu cầu tái sử dụng một địa chỉ IP hiện có. IPv6 cho phép 2 128 địa chỉ (khoảng 10 38 ), nhưng chỉ có khoảng 20% ​​thông qua vào năm 2017.

Bây giờ chúng ta có địa chỉ, chúng ta cần phải biết cách định tuyến một gói tin thông qua Internet tới đích của nó. Định tuyến diễn ra nhanh chóng, vì vậy không có thời gian để truy vấn cơ sở dữ liệu từ xa để định tuyến thông tin. Ví dụ, bộ định tuyến Cisco ASR 9922 có dung lượng tối đa 160 terabits mỗi giây. Giả sử gói đầy đủ 1.500 byte (12.000 bit), đó là 13,333,333,333 gói mỗi giây trong một rack 19 inch duy nhất!

Để định tuyến nhanh, các bộ định tuyến duy trì các bảng định tuyến cho biết các đường dẫn đến các nhóm địa chỉ IP khác nhau. Khi một gói dữ liệu mới đến, router sẽ tìm kiếm nó trong bảng, cho biết router nào gần nhất với đích đến. Nó sẽ gửi gói tin đến peer đó và chuyển sang gói tiếp theo. Công việc của BGP là giao tiếp thông tin bảng định tuyến này giữa các bộ định tuyến khác nhau, đảm bảo các bảng định tuyến cập nhật.

IP và BGP cùng nhau không tạo ra một Internet hữu ích, thật không may, bởi vì chúng không cung cấp cách nào để chuyển dữ liệu một cách đáng tin cậy. Nếu bộ định tuyến bị quá tải và giảm gói tin, chúng tôi cần một cách để phát hiện sự mất mát và yêu cầu truyền lại.

**Packet switching**

Nếu Internet hoạt động bằng các bộ định tuyến truyền dữ liệu cho nhau down line , điều gì sẽ xảy ra khi dữ liệu lớn? Nếu chúng tôi yêu cầu video 88,5 MB của The Birth & Death of JavaScript thì sao?

Chúng tôi có thể cố gắng thiết kế một mạng nơi tài liệu 88,5 MB được gửi từ máy chủ web đến bộ định tuyến đầu tiên, sau đó đến bộ định tuyến thứ hai, v.v. Thật không may, mạng đó sẽ không hoạt động ở quy mô Internet, hoặc thậm chí ở quy mô mạng nội bộ.

Đầu tiên, máy tính là những máy hữu hạn với lượng lưu trữ hữu hạn. Nếu một bộ định tuyến nhất định chỉ có 88,4 MB bộ nhớ đệm, nó chỉ đơn giản là không thể lưu trữ các tập tin video 88,5 MB. Dữ liệu sẽ được giảm xuống và tệ hơn, tôi sẽ không nhận được chỉ dẫn nào. Nếu một bộ định tuyến quá bận rộn đến nỗi nó sẽ làm giảm dữ liệu, nó không thể mất thời gian để cho tôi biết về dữ liệu bị bỏ.

Thứ hai, máy tính không đáng tin cậy. Đôi khi, các nút định tuyến không thành công. Đôi khi, neo của tàu bị vô tình làm hỏng cáp quang dưới nước, chiếm phần lớn Internet .

Vì những lý do này và hơn thế nữa, chúng tôi không gửi 88,5 MB thư trên Internet. Thay vào đó, chúng tôi chia nhỏ chúng thành các gói, thường trong vùng lân cận là 1.400 byte mỗi gói. Tệp video của chúng tôi sẽ được chia thành 63,214 hoặc các gói riêng biệt để truyền.

**Out-of-order packets**

Đo một sự chuyển giao thực tế của The Birth & Death of JavaScript với công cụ capture gói tin Wireshark , tôi thấy tổng số 61.807 gói nhận được, mỗi gói 1,432 byte. Nhân hai số đó, chúng tôi nhận được 88,5 megabyte, đó là kích thước của video. (Điều này không bao gồm phí được thêm vào bởi các giao thức khác nhau, nếu có, chúng tôi sẽ thấy số cao hơn một chút.)

Việc chuyển giao đã được thực hiện qua HTTP, một giao thức được phân lớp trên TCP, Giao thức điều khiển truyền dẫn . Nó chỉ mất 14 giây, vì vậy các gói tin đến với tốc độ trung bình khoảng 4.400 mỗi giây, hoặc khoảng 250 micro giây mỗi gói. Trong 14 giây, máy của tôi đã nhận được tất cả 61.807 gói trong số đó, có thể không đúng thứ tự, tập hợp lại chúng vào toàn bộ tệp khi chúng xuất hiện.

Việc khôi phục gói tin TCP được thực hiện bằng cách sử dụng cơ chế tưởng tượng đơn giản nhất: một bộ đếm. Mỗi gói được gán một số thứ tự khi nó được gửi đi. Ở phía bên nhận, các gói được đặt theo thứ tự theo số thứ tự. Một khi tất cả chúng theo thứ tự, không có khoảng trống, chúng ta biết toàn bộ tập tin có mặt.

(Số thứ tự TCP thực tế có xu hướng không phải là số nguyên chỉ đơn giản là tăng 1 lần mỗi lần, nhưng chi tiết đó không quan trọng ở đây.)

Làm thế nào để chúng ta biết khi tập tin được hoàn thành, mặc dù? TCP không nói gì về điều đó; đó là công việc của các giao thức cấp cao hơn. Ví dụ: phản hồi HTTP chứa tiêu đề “Nội dung Độ dài” chỉ định độ dài phản hồi theo byte. Máy khách đọc Content-Length, sau đó tiếp tục đọc các gói TCP, lắp ráp chúng trở lại thứ tự ban đầu của chúng, cho đến khi nó có tất cả các byte được chỉ định bởi Content-Length. Đây là một trong những lý do mà các tiêu đề HTTP (và hầu hết các tiêu đề giao thức khác) đến trước tải trọng trả lời: nếu không, chúng ta sẽ không biết kích thước của tải trọng.

Khi chúng tôi nói “khách hàng” ở đây, chúng tôi thực sự đang nói về toàn bộ máy tính nhận. TCP reassembly xảy ra bên trong hạt nhân, vì vậy các ứng dụng như trình duyệt web và curl và wget không phải tự lắp ráp lại các gói TCP. Nhưng hạt nhân không xử lý HTTP, vì vậy các ứng dụng phải hiểu tiêu đề Content-Length và biết có bao nhiêu byte để đọc.

Với số thứ tự và sắp xếp lại gói, chúng ta có thể truyền các chuỗi byte lớn ngay cả khi các gói dữ liệu đến không đúng thứ tự. Nhưng nếu một gói bị mất trong quá trình vận chuyển, hãy để lại một lỗ hổng trong phản hồi HTTP?

**Transmission windows and slow start**

Tôi đã tải xuống bình thường The Birth & Death of JavaScript với Wireshark được bật. ảnh chụp, tôi thấy gói tin sau khi nhận được gói tin thành công.

Ví dụ, một gói tin với số thứ tự 563,321 đã đến. Giống như tất cả các gói TCP, nó có một “số thứ tự tiếp theo”, là số được sử dụng cho gói sau. “Số thứ tự tiếp theo” của gói này là 564,753. Các gói tin tiếp theo đã làm, trên thực tế, có số thứ tự 564,753, vì vậy mọi thứ đều tốt. Điều này xảy ra hàng ngàn lần mỗi giây sau khi kết nối được tăng tốc.

Thỉnh thoảng, máy tính của tôi gửi một tin nhắn đến máy chủ nói, ví dụ, “Tôi đã nhận được tất cả các gói tin đến và bao gồm số gói 564,753.” Đó là một ACK, để xác nhận : máy tính của tôi thừa nhận việc nhận các gói tin của máy chủ. Trên một kết nối mới, hạt nhân Linux sẽ gửi một ACK sau mỗi mười gói. Điều này được kiểm soát bởi hằng số TCP_INIT_CWND , mà chúng ta có thể thấy được định nghĩa trong mã nguồn của hạt nhân Linux.

( CWND trong TCP_INIT_CWND là viết tắt của cửa sổ nghẽn : lượng dữ liệu được phép trong di chuyển cùng một lúc. Nếu mạng bị tắc nghẽn – quá tải – thì kích thước cửa sổ sẽ bị giảm, làm chậm quá trình truyền gói.)

10 packet là khoảng 14 KB, vì vậy chúng tôi bị giới hạn ở mức 14 KB dữ liệu trong 1 lần di chuyển tại một thời điểm. Đây là một phần của TCP slow start : các kết nối bắt đầu với các cửa sổ nghẽn nhỏ. Nếu không có gói nào bị mất, người nhận sẽ liên tục tăng cửa sổ nghẽn, cho phép nhiều gói hơn trong 1 lần gửi cùng một lúc.

Cuối cùng, một gói tin sẽ bị mất, vì vậy cửa sổ nhận sẽ bị giảm, làm chậm quá trình truyền tải. Bằng cách tự động điều chỉnh cửa sổ nghẽn, cũng như một số thông số khác, người gửi và người nhận giữ cho dữ liệu di chuyển nhanh như mạng sẽ cho phép, nhưng không nhanh hơn.

Điều này xảy ra trên cả hai mặt của kết nối: mỗi bên ACKs các thông điệp của bên kia, và mỗi bên duy trì cửa sổ nghẽn của riêng mình. Cửa sổ không đối xứng cho phép giao thức tận dụng tối đa các kết nối mạng với băng thông ngược dòng và hạ lưu không đối xứng, giống như hầu hết các kết nối Internet trong nhà và di động.

**Reliable transmission**

Máy tính không đáng tin cậy; mạng làm bằng máy tính không đáng tin cậy. Trên mạng có quy mô lớn như Internet, lỗi là một phần hoạt động bình thường và phải được cung cấp. Trong một mạng gói tin , điều này có nghĩa là retransmission : nếu máy khách nhận các gói tin số 1 và 3, nhưng không nhận được 2, thì nó cần yêu cầu máy chủ gửi lại gói bị thiếu.

Khi nhận được hàng nghìn gói dữ liệu mỗi giây, như trong video tải xuống 88,5 MB của chúng tôi, các lỗi đã gần như được đảm bảo. Để chứng minh điều đó, hãy quay lại Wireshark của tôi để tải xuống. Đối với hàng ngàn gói dữ liệu, mọi thứ diễn ra bình thường. Mỗi gói chỉ định một “số thứ tự tiếp theo”, tiếp theo là một gói khác với số đó.

Đột nhiên, có gì đó không ổn. Gói 6,269th có “số thứ tự tiếp theo” là 7,208,745, nhưng gói đó không bao giờ xuất hiện. Thay vào đó, một gói với số thứ tự 7.211.609 đến. Đây là một gói không đúng thứ tự: một cái gì đó bị thiếu.

Chúng tôi không thể nói chính xác điều gì đã xảy ra ở đây. Có lẽ một trong những bộ định tuyến trung gian trên Internet đã bị quá tải. Có lẽ bộ định tuyến cục bộ của tôi đã bị quá tải. Có thể ai đó đã bật lò vi sóng, giới thiệu nhiễu điện từ và làm chậm kết nối không dây của tôi. Trong mọi trường hợp, gói tin bị mất và chỉ báo duy nhất là gói dữ liệu không mong muốn.

TCP không có đặc biệt “Tôi bị mất gói!” thông điệp. Thay vào đó, ACK được tái sử dụng khéo léo để chỉ ra sự mất mát. Bất kỳ gói out-of-order nào khiến cho người nhận phải tái ACK gói “tốt” cuối cùng – gói cuối cùng theo đúng thứ tự. Trong thực tế, người nhận đang nói “Tôi nhận được gói 5, mà tôi đang ACKing. Tôi cũng nhận được một cái gì đó sau đó, nhưng tôi biết nó không phải gói 6 vì nó không khớp với số thứ tự tiếp theo trong gói 5.”

Nếu hai gói tin đơn giản chuyển sang chuyển tiếp, điều này sẽ dẫn đến một ACK phụ và mọi thứ sẽ tiếp tục bình thường sau khi nhận được gói tin không đúng thứ tự. Nhưng nếu gói tin đã thực sự bị mất, các gói dữ liệu không mong muốn sẽ tiếp tục đến và người nhận sẽ tiếp tục gửi các ACK trùng lặp của gói tin tốt cuối cùng. Điều này có thể dẫn đến hàng trăm ACK trùng lặp.

Khi người gửi thấy 3 ACK trùng lặp trong một hàng, nó giả định rằng gói tin sau bị mất và truyền lại nó. Điều này được gọi là TCP fast retransmit bởi vì nó nhanh hơn so với phương pháp tiếp cận dựa trên thời gian chờ lâu hơn. Thật thú vị khi lưu ý rằng bản thân giao thức không có cách nào rõ ràng để nói “hãy truyền lại ngay lập tức!” Thay vào đó, nhiều ACK phát sinh tự nhiên từ giao thức đóng vai trò như trình kích hoạt.

(Một thử nghiệm suy nghĩ thú vị: điều gì sẽ xảy ra nếu một số ACK trùng lặp bị mất, không bao giờ tiếp cận người gửi?)

Truyền lại là phổ biến ngay cả trong các mạng hoạt động bình thường. Trong quá trình quay video tải xuống 88,5 MB của chúng tôi, tôi đã thấy điều này:

* Cửa sổ nghẽn nhanh chóng tăng lên khoảng một megabyte do tiếp tục truyền thành công.

* Một vài nghìn gói tin xuất hiện theo thứ tự; mọi thứ đều bình thường.

* Một gói bị hỏng.

* Dữ liệu tiếp tục rót ở mức megabyte mỗi giây, nhưng gói vẫn bị thiếu.

* Máy của tôi gửi hàng chục ACK trùng lặp của gói tin đã biết cuối cùng, nhưng hạt nhân cũng lưu trữ các gói không theo thứ tự đang chờ xử lý để khôi phục sau này.

* Máy chủ nhận các ACK trùng lặp và gửi lại gói bị thiếu.

* ACK của khách hàng của tôi cả gói tin bị thiếu trước đó và các gói sau đó đã được nhận do truyền dẫn không theo thứ tự. Điều này được thực hiện bằng cách đơn giản ACKing gói gần đây * nhất, mà ngầm ACKs tất cả những người trước đó là tốt.

* Quá trình chuyển tiếp tục, nhưng với cửa sổ nghẽn bị giảm do gói bị mất.


Điều này là bình thường; nó đã xảy ra trong mọi lần tải xuống toàn bộ nội dung tải xuống mà tôi đã thực hiện. TCP rất thành công trong công việc của mình mà chúng tôi thậm chí không nghĩ rằng các mạng không đáng tin cậy trong việc sử dụng hàng ngày của chúng tôi, mặc dù chúng không hoạt động bình thường trong điều kiện bình thường.

**Physical networking**

Tất cả dữ liệu mạng phải được truyền qua phương tiện vật lý như cáp đồng, cáp quang và radio ,không dây. Trong số các giao thức tầng vật lý, Ethernet là giao thức nổi tiếng nhất. Sự phổ biến của nó trong những ngày đầu của Internet đã khiến chúng tôi thiết kế các giao thức khác để phù hợp với những hạn chế của nó.

Đầu tiên, hãy lấy các chi tiết vật lý ra khỏi con đường. Ethernet được kết nối chặt chẽ nhất với các đầu nối RJ45, trông giống như các phiên bản 8 chân lớn hơn của các giắc cắm điện thoại bốn chân cũ hơn. Nó cũng được kết hợp với cáp cat5 (hoặc cat5e, hoặc cat6, hoặc cat7), trong đó có tám dây tổng số được xoắn thành bốn cặp. Các phương tiện truyền thông khác tồn tại, nhưng đây là những thứ chúng ta thường gặp nhất ở nhà: tám dây được bọc trong một vỏ bọc nối với giắc cắm tám chân.

Ethernet là một giao thức tầng vật lý : nó mô tả cách các bit biến thành tín hiệu điện trong cáp. Nó cũng là một giao thức lớp liên kết : nó mô tả kết nối trực tiếp của một nút đến nút khác. Tuy nhiên, nó hoàn toàn là điểm-điểm và không nói gì về cách dữ liệu được định tuyến trên mạng. Không có khái niệm về kết nối theo nghĩa của kết nối TCP, hoặc các địa chỉ có thể gán lại theo nghĩa địa chỉ IP.

Là một giao thức, ethernet có hai công việc chính. Đầu tiên, mỗi thiết bị cần lưu ý rằng nó được kết nối với một thứ gì đó và một số thông số như tốc độ kết nối cần được thương lượng.

Thứ hai, một khi liên kết được thiết lập, Ethernet cần mang dữ liệu. Giống như các giao thức TCP và IP cấp cao hơn, dữ liệu Ethernet được chia thành các gói. Cốt lõi của gói là một khung , có trọng tải 1.500 byte, cộng thêm 22 byte cho thông tin tiêu đề như địa chỉ MAC nguồn và đích, thời lượng tải trọng và tổng kiểm tra. Những lĩnh vực này rất quen thuộc: các lập trình viên thường xử lý các địa chỉ và độ dài và kiểm tra, và chúng ta có thể tưởng tượng tại sao chúng lại cần thiết.

Sau đó khung được bao bọc trong một lớp tiêu đề khác để tạo thành gói đầy đủ. Những tiêu đề này … lạ.Chúng bắt đầu va chạm với thực tế cơ bản của các hệ thống điện tương tự, vì vậy chúng trông giống như không có gì chúng ta từng đưa vào một giao thức phần mềm. Một gói Ethernet đầy đủ chứa:

* Lời mở đầu, là 56 bit (7 byte) xen kẽ 1 và 0. Các thiết bị sử dụng điều này để đồng bộ hóa đồng hồ của họ, giống như khi mọi người đếm ngược “1-2-3-GO!” Máy tính không thể đếm quá 1, vì vậy chúng đồng bộ hóa bằng cách nói “10101010101010101010101010101010101010101010101010101010”.

* Một dấu phân cách khung bắt đầu 8 bit (1 byte), là số 171 (10101011 ở dạng nhị phân). Điều này đánh dấu sự kết thúc của phần mở đầu. Lưu ý rằng “10” được lặp lại một lần nữa, cho đến khi kết thúc có “11”.

* Khung chính nó, chứa địa chỉ nguồn và đích, tải trọng, v.v., như mô tả ở trên.
Khoảng cách giữa các khe là 96 bit (12 byte), nơi dòng bị bỏ trống. Có lẽ, đây là để cho các thiết bị còn lại bởi vì họ đang mệt mỏi.

Đặt tất cả điều này lại với nhau: những gì chúng tôi muốn là truyền 1.500 byte dữ liệu của chúng tôi. Chúng tôi thêm 22 byte để tạo khung, cho biết nguồn, đích, kích thước và tổng kiểm tra. Chúng tôi bổ sung thêm 20 byte dữ liệu phụ khác có thể đáp ứng nhu cầu của phần cứng, tạo ra một gói Ethernet đầy đủ.

Bạn có thể nghĩ đây là phần cuối của ngăn xếp. Nó không phải, nhưng mọi thứ trở nên tồi tệ hơn vì thế giới tương tự chọc qua nhiều hơn.

**Networking meets the real world**

Hệ thống kỹ thuật số không tồn tại; mọi thứ đều tương tự.

Giả sử chúng ta có một hệ thống CMOS 5-volt. (CMOS là một loại hệ thống kỹ thuật số, đừng lo lắng về nó nếu bạn không quen thuộc.) Điều này có nghĩa rằng một tín hiệu đầy đủ sẽ là 5 volts, và một tín hiệu hoàn toàn sẽ là 0. Nhưng không có gì là bao giờ hoàn toàn hoặc tắt hoàn toàn; thế giới vật chất không hoạt động như thế. Trong thực tế, hệ thống CMOS 5-volt của chúng tôi sẽ xem xét bất cứ điều gì trên 1,67 volt là 1, và bất cứ điều gì dưới 1,67 là 0.

(1.67 là 1/3 của 5. Đừng lo lắng về lý do tại sao ngưỡng là 1/3. Nếu bạn muốn đào, có một bài viết wikipedia, tất nhiên! Ngoài ra, Ethernet không phải là CMOS hoặc thậm chí liên quan đến CMOS, nhưng CMOS và cắt 1/3 của nó làm cho một minh hoạ đơn giản.)

Gói Ethernet của chúng tôi phải đi qua một dây vật lý, có nghĩa là thay đổi điện áp trên dây. Ethernet là một hệ thống 5-volt, vì vậy chúng tôi ngây thơ mong đợi mỗi 1 bit trong giao thức Ethernet là 5 volt và mỗi bit 0 là 0 volt. Nhưng có hai nếp nhăn: đầu tiên, phạm vi điện áp là -2,5 V đến + 2,5 V. Thứ hai, và kỳ lạ hơn, mỗi bộ 8 bit được mở rộng thành 10 bit trước khi nhấn dây.

Có 256 giá trị 8 bit có thể và 1024 giá trị 10 bit có thể, vì vậy hãy tưởng tượng điều này như một bảng ánh xạ chúng. Mỗi byte 8 bit có thể được ánh xạ tới bất kỳ một trong bốn mẫu 10 bit khác nhau, mỗi mẫu sẽ được chuyển trở lại cùng một byte 8 bit trên đầu nhận. Ví dụ, giá trị 10 bit 00.0000.0000 có thể ánh xạ tới giá trị 8 bit 0000.0000. Nhưng có lẽ giá trị 10 bit 10.1010.1010 cũng ánh xạ tới 0000.0000. Khi một thiết bị Ethernet thấy 00.0000.0000 hoặc 10.1010.1010, chúng sẽ được hiểu là byte 0 (nhị phân 0000.0000).

(Cảnh báo: bây giờ sẽ có một số từ điện tử.)

Điều này tồn tại để phục vụ một nhu cầu cực kỳ tương tự: cân bằng điện áp trong các thiết bị. Giả sử mã hóa 8 bit đến 10 bit này không tồn tại và chúng tôi gửi một số dữ liệu xảy ra là tất cả 1 giây. Dải điện áp của Ethernet là -2,5 đến +2,5 volt, vì vậy chúng tôi đang giữ điện áp của cáp Ethernet ở mức +2,5 V, liên tục kéo các electron từ phía bên kia.

Tại sao chúng ta quan tâm đến một bên kéo nhiều electron hơn cái kia? Bởi vì thế giới tương tự là một mớ hỗn độn và nó sẽ gây ra tất cả các loại hiệu ứng không mong muốn. Để có một: nó có thể tính phí các tụ điện được sử dụng trong các bộ lọc thông thấp, tạo ra một bù đắp ở cấp tín hiệu chính nó, cuối cùng gây ra lỗi bit. Những lỗi đó sẽ mất thời gian để tích lũy, nhưng chúng tôi không muốn các thiết bị mạng của chúng tôi đột nhiên bị hỏng dữ liệu sau hai năm thời gian hoạt động đơn giản bởi vì chúng tôi đã xảy ra gửi nhiều số nhị phân 1s hơn 0 giây.

(Các từ điện tử kết thúc ở đây.)

Bằng cách sử dụng mã hóa 8b / 10b , Ethernet có thể cân bằng số lượng 0 và 1 được gửi qua dây, ngay cả khi chúng tôi gửi dữ liệu chủ yếu là 1s hoặc chủ yếu là 0 giây. Phần cứng theo dõi tỷ lệ từ 0 đến 1, ánh xạ các byte 8 bit đi tới các tùy chọn khác nhau từ bảng 10 bit để đạt được cân bằng điện. (Các tiêu chuẩn Ethernet mới hơn, như Ethernet 10 GB, sử dụng các hệ thống mã hóa khác nhau và phức tạp hơn.)

Chúng tôi sẽ dừng lại ở đây, bởi vì chúng tôi đã vượt quá phạm vi của những gì có thể được coi là lập trình, nhưng có nhiều vấn đề giao thức hơn để thích ứng với lớp vật lý. Trong nhiều trường hợp, các giải pháp cho các vấn đề phần cứng nằm trong chính phần mềm, như trong trường hợp mã hóa 8b / 10b được sử dụng để sửa lỗi DC. Điều này có lẽ là một chút bối rối đối với chúng tôi là những người lập trình: chúng tôi thích giả vờ rằng phần mềm của chúng ta sống trong một thế giới hoàn hảo Platonic, không có những khiếm khuyết thô tục của thể chất. Trong thực tế, tất cả mọi thứ là tương tự, và có sức chứa phức tạp đó là công việc của mọi người, bao gồm cả phần mềm.

**The interconnected network stack**

Giao thức Internet được coi là một chồng các lớp. Ethernet cung cấp truyền dữ liệu vật lý và liên kết giữa hai thiết bị điểm-điểm. IP cung cấp một lớp địa chỉ, cho phép các bộ định tuyến và các mạng có quy mô lớn tồn tại, nhưng nó không có kết nối. Các gói được bắn vào ether, không có dấu hiệu cho biết liệu chúng có đến hay không. TCP thêm một lớp truyền đáng tin cậy bằng cách sử dụng số thứ tự, sự thừa nhận và truyền lại.

Cuối cùng, các giao thức mức ứng dụng như HTTP được xếp lớp trên cùng của TCP. Ở cấp độ này, chúng tôi đã có địa chỉ và ảo tưởng về truyền dẫn đáng tin cậy và kết nối liên tục. IP và TCP lưu các nhà phát triển ứng dụng liên tục reimplementing truyền lại gói và địa chỉ và như vậy.

Tính độc lập của các lớp này là quan trọng. Ví dụ, khi các gói tin bị mất trong quá trình truyền video 88,5 MB của tôi, các bộ định tuyến đường trục của Internet không biết; chỉ máy của tôi và máy chủ web mới biết.Hàng chục ACK trùng lặp từ máy tính của tôi tất cả đều được định tuyến cẩn thận trên cùng một cơ sở hạ tầng định tuyến bị mất gói gốc. Có thể bộ định tuyến chịu trách nhiệm về việc thả gói bị mất cũng là bộ định tuyến mang theo mili giây thay thế sau đó. Đây là một điểm quan trọng để hiểu Internet: cơ sở hạ tầng định tuyến không biết về TCP; nó chỉ định tuyến. (Có những ngoại lệ đối với điều này, như mọi khi, nhưng nó thường đúng.)

Các lớp của ngăn xếp giao thức hoạt động độc lập, nhưng chúng không được thiết kế độc lập. Các giao thức cấp cao hơn có xu hướng được xây dựng trên các giao thức cấp thấp hơn: HTTP được xây dựng trên TCP được xây dựng trên IP được xây dựng trên Ethernet. Các quyết định thiết kế ở các cấp thấp hơn thường ảnh hưởng đến các quyết định ở cấp độ cao hơn, thậm chí nhiều thập kỷ sau đó.

Ethernet là cũ và liên quan đến lớp vật lý, do đó, nhu cầu của nó thiết lập các thông số cơ sở. Tải trọng Ethernet tối đa là 1.500 byte.

Gói IP cần phải vừa với khung Ethernet. IP có kích thước tiêu đề tối thiểu là 20 byte, do đó tải trọng tối đa của gói IP là 1.500 – 20 = 1.480 byte.

Tương tự như vậy, gói tin TCP cần phải phù hợp với gói IP. TCP cũng có kích thước tiêu đề tối thiểu là 20 byte, để lại trọng tải TCP tối đa là 1.480 – 20 = 1.460 byte. Trong thực tế, các tiêu đề và giao thức khác có thể làm giảm thêm. 1.400 là kích thước tải trọng TCP bảo thủ.

Giới hạn 1,400 byte ảnh hưởng đến thiết kế giao thức hiện đại. Ví dụ, các yêu cầu HTTP thường nhỏ. Nếu chúng ta phù hợp với chúng thành một gói thay vì hai, chúng ta sẽ giảm xác suất mất một phần của yêu cầu, với khả năng truyền lại TCP tương ứng. Để nén từng byte ra khỏi các yêu cầu nhỏ, HTTP / 2 chỉ định nén cho tiêu đề, thường nhỏ. Nếu không có ngữ cảnh từ TCP, IP và Ethernet, điều này có vẻ ngớ ngẩn: tại sao thêm nén vào tiêu đề của giao thức để tiết kiệm chỉ một vài byte? Bởi vì, như thông số HTTP / 2 nói trong phần giới thiệu về phần 2, việc nén cho phép “nhiều yêu cầu được nén thành một gói”.

HTTP / 2 thực hiện nén tiêu đề để đáp ứng các ràng buộc của TCP, bắt nguồn từ các ràng buộc trong IP, xuất phát từ các ràng buộc trong Ethernet, được phát triển vào những năm 1970, được đưa vào thương mại vào năm 1980 và được tiêu chuẩn hóa vào năm 1983.

Một câu hỏi cuối cùng: tại sao kích thước tải trọng Ethernet được đặt ở mức 1.500 byte? Không có lý do sâu sắc; nó chỉ là một điểm giao dịch tốt đẹp. Có 42 byte dữ liệu không tải trọng cần thiết cho mỗi khung hình.Nếu trọng tải tối đa chỉ là 100 byte, chỉ 70% (100/142) thời gian sẽ được sử dụng để gửi tải trọng. Một tải trọng 1.500 byte có nghĩa là khoảng 97% (1500/1542) thời gian được dành để gửi tải trọng, đó là một mức độ hiệu quả tốt đẹp. Đẩy kích thước gói tin cao hơn sẽ yêu cầu bộ đệm lớn hơn trong các thiết bị, mà chúng tôi không thể biện minh đơn giản để có được một phần trăm hoặc hai hiệu quả. Tóm lại: HTTP / 2 có tiêu đề nén vì giới hạn RAM của các thiết bị mạng vào cuối những năm 1970.