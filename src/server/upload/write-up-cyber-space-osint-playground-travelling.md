Lâu lắm mình mới làm CTF và viết write up, nên lần này chúng ta sẽ cùng thử thách với một thể loại rất là thú vị trong CTF nhé. Mục tiêu lần này của chúng ta là thể loại **OSINT** tại trang OSINT playground do Cyber Space tổ chức.

![](https://images.viblo.asia/6a2807ae-106f-4101-83ac-7eb4e0d2fbcd.png)

# Giới thiệu
## Cyber Space
Cyber Space là một nhóm hoạt động trong lĩnh vực an toàn thông tin, họ có một fanpage tại https://www.facebook.com/cyberg0100 (trên này cũng thường xuyên đăng memes về Cyber Sec). Đúng như mô tả trên fanpage của họ: `"Cybersecurity, OSINT, Threat Intelligence"`. Cyber Space bắt đầu nổi lên với những bài viết, thử thách cộng đồng, dự án,... liên quan tới các kỹ thuật OSINT. Thời điểm Cyber Space dấn thân vào "Secbiz" thì những nội dung về OSINT tại Việt Nam chưa xuất hiện nhiều. Phải nói thật rằng nhờ có các bài viết của Cyber Space mà mình mới biết về OSINT.

Dưới đây là một số bài viết rất hay của Cyber Space mà các bạn nên đọc:
- Series điều tra tổ chức Hoa Khuya:
    - [Điều tra số Hoa Khuya phần 1: Từ lời đồn đến thực tế](https://cyberlances.wordpress.com/2020/03/31/thuc-hien-dieu-tra-so-to-chuc-hoa-khuya/)
    - [Điều tra số Hoa Khuya phần 2: Thiên đường ấu dâm đồi trụy](https://cyberlances.wordpress.com/2020/04/01/dieu-tra-so-hoa-khuya-phan-2-thien-duong-au-dam-doi-truy/)
    - [Điều tra số Hoa Khuya phần 3: Cánh hoa tàn](https://cyberlances.wordpress.com/2020/04/13/dieu-tra-so-hoa-khuya-phan-3-canh-hoa-tan/)
- [Hướng dẫn giảm thiểu nguy cơ an ninh mạng dành cho nạn nhân của các vụ lộ lọt dữ liệu](https://cyberlances.wordpress.com/2022/07/17/huong-dan-giam-thieu-nguy-co-an-ninh-mang-danh-cho-nhung-nan-nhan-cua-cac-vu-lo-lot-du-lieu/)
- [Hướng dẫn cho người mới bắt đầu thực hiện kiểm chứng trên mạng xã hội](https://cyberlances.wordpress.com/2021/11/24/huong-dan-cho-nguoi-moi-bat-dau-thuc-hien-kiem-chung-tren-mang-xa-hoi/)

## OSINT
OSINT là từ viết tắt của Open-source intelligence. OSINT là kỹ thuật thu thập thông tin từ các nguồn tin tức công khai trên Internet, trên mạng xã hội,... Bất cứ nguồn tin công khai nào đều có thể được sử dụng, từ bài viết trên các trang web, bài đăng trạng thái trên mạng xã hội, bài báo nghiên cứu khoa học,... cho tới những tấm ảnh check-in khi đi chơi.

![](https://images.viblo.asia/7fe1ff14-0e34-4076-898d-da38317490eb.png)

Các dữ liệu trên sau khi thu thập về sẽ được chắt lọc, phân tích để lấy được thông tin cần thiết. Kết quả của quá trình OSINT có thể định hướng cho các hoạt động sau này. Có thể hình dung quá trình OSINT giống như việc Cảnh sát hình sự tiến hành điều tra phá án vậy (còn anh bạn Digital Forensics thì giống như quá trình pháp y - phân tích sau khi một sự kiện đã diễn ra).

![](https://images.viblo.asia/326607ff-7e1e-46de-81e1-c9ee5d805d68.png)

# Write up OSINT playground
Write up của mình sẽ hạn chế đề cập đến những hình ảnh hoặc tư liệu có trong đề bài mà có thể bị google bot tìm được. Tránh việc khi người chơi làm bài thì lại vô tình tìm thấy write up do mình viết.

![](https://images.viblo.asia/22a300c6-23f3-4abd-a6dd-6794d6579144.png)

*Do Cyber Space vẫn tiếp tục cập nhật thêm các thử thách, và mình thì cũng không tự tin có thể giải được toàn bộ thử thách, nên bài viết này sẽ còn được cập nhật tiếp tục theo thời gian. Các bạn nhớ check bài viết của mình thường xuyên nhé, chừng nào mình còn làm được thì sẽ còn cập nhật.*

## Travelling
### Lost - 50
![](https://images.viblo.asia/f4543386-187f-4737-b3aa-517a4f86f94c.png)

- Mục tiêu: tìm ra tên con phố nơi có thể chụp được bức ảnh này.
- Link ảnh: https://1drv.ms/u/s!ArPnIPrcTV7Xab6zk8rne5KZCTA?e=UyUs0T

Nhìn lướt qua cả bức ảnh thì không có gì đáng chú ý cả. Dựa vào chữ trên biển quảng cáo thì chúng ta biết rằng ảnh này được chụp tại đất nước "anh em láng giềng".

![](https://images.viblo.asia/d84fbc18-c02a-4c88-add2-23036ad61bf9.png)

Ban đầu mình cũng nghĩ đến việc tìm thông tin từ POLYEC GROUP này. Hướng tìm kiếm là các dự án bất động sản, công trình,... Nhưng sau đó mình nghĩ phương án này có thể tốn quá nhiều thời gian. Giả sử tìm hướng này có thể ra được đáp án thì cũng tồn tại những vấn đề sau:
-  Bức ảnh này được chụp cách đây bao lâu? nếu thời gian quá xa thì thông tin liệu có còn hay không?
-  Số lượng dự án bất động sản có nhiều hay không? nếu quá nhiều, hoặc có một số dự án lẻ tẻ không được công bố rầm rộ trên Internet thì khó mà tìm được.
-  Liệu đây có phải là một công ty xây dựng, chủ thầu bất động sản? Nhỡ chỉ là cái tên nhét vào biển quảng cáo thì chỉ tốn thời gian vô ích.

Do có nhiều vấn đề như trên, thậm chí còn nhiều vấn đề khác nữa nhưng mình lười viết hết lên đây, nên phương án tiếp theo là tìm chi tiết khác hiệu quả hơn trong việc tìm kiếm. 

Để tìm kiếm chính xác hơn, chúng ta sẽ cần chú ý vào các chi tiết "độc nhất", "đặc biệt" của bức ảnh. Ở đây chúng ta có thể để ý được một kiến trúc lạ lạ màu đỏ ở phía bên trái bức ảnh.

![](https://images.viblo.asia/1d3c10d1-45b7-4df6-a98c-94f9e7998d8f.png)

Giờ chúng ta sẽ thử tìm kiếm bằng [Google Lens](https://www.google.com/imghp) với ảnh này. Chúng ta sẽ co lại phần tìm kiếm để tập trung vào kiến trúc màu đỏ.

![](https://images.viblo.asia/a3707e2b-f64f-4cd2-b273-df9c34997279.png)
*<div align="center">Chọn tìm kiếm từ hình ảnh</div>*

![](https://images.viblo.asia/9a2c868d-9257-4393-a8f6-d7c4978ddc56.png)
*<div align="center">Lấy đường dẫn của ảnh</div>*

![](https://images.viblo.asia/b6987686-aaa8-4071-ba76-26565d422510.png)
*<div align="center">Dán đường dẫn của ảnh vào công cụ Google Lens</div>*

Kết quả tìm được lần này khá tốt, tốt hơn nhiều so với lần đầu tiên mình làm bài này.

![](https://images.viblo.asia/c71c88c4-1de6-40a4-b566-b6d41b1c2840.png)

Nếu kết quả chưa được như ý thì chúng ta có thể kéo thả căn chỉnh phạm vi hình ảnh tìm kiếm. Như lần này mình đã tìm được hẳn link wikipedia ngon. Trong link còn có hẳn toạ độ địa điểm này trên google map luôn.

![](https://images.viblo.asia/41d30531-9d13-4999-9002-db0e55ec3378.png)

Nếu lần đầu tìm kiếm chưa ra thì chúng ta có thể căn chỉnh lại tiếp. Trong lần đầu làm bài này, mình có chỉnh thế nào cũng chỉ ra mỗi cái link của con tem ngu si đần này 🙂🙃. Ngoài ra hầu như không có thông tin giá trị nào. Không có tên kiến trúc, không có địa điểm, chỉ có mỗi thông tin là chụp tại Macau: [tem ngu si đần](https://www.ebay.com/itm/325191348340?_trkparms=amclksrc%3DITM%26aid%3D1110018%26algo%3DHOMESPLICE.COMPLISTINGS%26ao%3D1%26asc%3D20201210111451%26meid%3D5222346ec0b84d55a9ea7f73b1271f41%26pid%3D101110%26rk%3D6%26rkt%3D12%26sd%3D403436448051%26itm%3D325191348340%26pmt%3D1%26noa%3D0%26pg%3D2563228%26algv%3DItemStripV101HighAdFeeWithCompV3RankerWithKnnRecallV1&_trksid=p2563228.c101110.m1982&amdata=cksum%3A3251913483405222346ec0b84d55a9ea7f73b1271f41%7Cenc%3AAQAHAAABEA%252FJiT7ssNXrEsx1zZncFUUkLU8ikMh%252FiWOsxkTqeqIbE5K4lpcDSKjAfQ%252F1if83xbmqMCqKQaqcpfRF053k%252BNVQBZemRML9t8kPCCVqtEzmoqDRM8lLgr67lBxd%252FNfL3nIJalbjAoHK%252F8WlXIQC5tD1CQwNnY9w7QbNjuI2J%252BK1Ik41ZcESi6qDWNmUm5H%252BvQE7a088zJcpbp%252BHZXFYgavQbEgbpZ14Hhd92G%252B1UsOqaYqkM7lOoKrgHsPMXYN7Q%252F50oNXebK8yO5h8WFPyzwjFZJSSin8w2tPzz00dQy01xkyae%252BOwR%252BFvjmwNxeAo5fDCIacKthPDVrEXnZsLCPsH2pJTSaGGUGRry0KxenWR%7Campid%3APL_CLK%7Cclp%3A2563228)

Tại địa điểm trong Wiki trỏ tới đây, theo góc chụp thì bức ảnh trong đề bài khả năng cao là được chụp tại đường **Av. da Ponte da Amizade** kia. Nhưng sao chúng ta không du lịch Macau thử để nhìn cho chính xác hơn nhỉ?

Trước tiên hãy bấm vào khu vực ở góc dưới phía trái màn hình để chuyển sang chế độ ảnh vệ tinh.

![](https://images.viblo.asia/ea086e83-0c5c-48a9-9b12-a26deab0e1f1.png)

![](https://images.viblo.asia/e42045e0-3ab0-449f-92aa-370e0ba71282.png)

Trông đẹp hơn hẳn rồi, giờ thì chúng ta sẽ cuộn chuột lên để phóng to hình ảnh. Cuộn tới khi chúng ta nhảy dù xuống mặt đất luôn.

![](https://images.viblo.asia/72f83c10-9f82-4cb9-add7-cd910c14bd47.png)

Hình ngọc trai này nhìn gần cũng đẹp phết, ngay cạnh chúng ta còn là ảnh khi toà nhà to to chưa xây xong luôn. Giờ chúng ta sẽ click chuột vào vị trí bất kỳ để du lịch trên Google maps. Đi theo hướng men theo toà nhà để xem có góc nào đẹp hơn không.

![](https://images.viblo.asia/23d21c89-0979-4221-8fb3-cf101edc5480.png)

![](https://images.viblo.asia/e8ef0601-9601-4d23-a6ee-33e698e59af3.png)

Xời, đúng cái góc có 2 con xe trắng kia luôn. Giờ chỉ cần đi submit tên đường `Av. da Ponte da Amizade` là chúng ta sẽ nhận được 1 thông báo sai flag 🤡. Chậm lại chút và đi search google tiếp nào.

![](https://images.viblo.asia/a588cd4b-a496-4821-a616-ecef18ccfa16.png)

Bây giờ mới chính thức hoàn thành.

### Dancing - 50
![](https://images.viblo.asia/9f542843-904b-467f-a14a-235dc8103769.png)

- Mục tiêu: tìm ra tên cửa hàng mà người trong video đang nhảy ngay phía trước cửa.
- Link ảnh: https://1drv.ms/v/s!ArPnIPrcTV7Xb1wotPXWUgOGZnU?e=ek7eR3

Trong video có một địa điểm tên là TANGO CENTRO

![](https://images.viblo.asia/ca1f2918-9246-44e3-8e92-196d8e2bb08a.png)

Làm bài Lost rồi thì bài này còn dễ hơn. Chỉ cần search google là ra ngay địa điểm của toà nhà trên maps.

![](https://images.viblo.asia/5a8f4c33-94d4-44e7-8c30-fbb2ab0dc40a.png)

Cũng du lịch y như bài vừa rồi, chúng ta sẽ thấy cửa hàng cần tìm tên là **Kruidvat**.

![](https://images.viblo.asia/8f6b11a2-b2fd-45fd-9be6-2cb7e2a84422.png)

### Time - 50
![](https://images.viblo.asia/38a3139d-228e-46bf-ad7d-44c89a9f2e12.png)

- Yêu cầu: tìm thời gian chính xác theo giờ Việt Nam mà bức ảnh này được đăng lên Instagram.
- Link ảnh: https://www.instagram.com/p/BvHxQsAgr3V/

Tại thời điểm này mình chỉ còn một lần submit flag cuối cùng :v Hơi căng nha.

Trong bài đăng có ghi ngày đăng, nhưng chúng ta cần thời gian chính xác từng giờ, phút, giây cơ.

![](https://images.viblo.asia/aa581699-4ece-4a09-bbac-b1c33bc7e05c.png)

Như một thói quen, tất nhiên chúng ta sẽ F12 lên rồi, check check nhẹ cái HTML xem có gì không nào.

![](https://images.viblo.asia/f58ab6e3-d446-4ab2-93b9-09f922b392a0.png)

OK, phần làm mình bay mất 4 lần submit flag đây này. Rõ ràng thời gian đăng bài chính xác đã có rồi, đó là 19 giờ 36 phút 54 giây ngày 17/3/2019. Ừ, vấn đề là giao diện lại hiển thị rằng bài này được đăng vào ngày 18/3/2019. Tức là ở đây có sự chênh lệch múi giờ.

Theo mình đoán thì thời gian chính xác người dùng đăng bức ảnh này lên đúng là 2019-03-17T19:36:54.000Z rồi, còn trang web chuyển sang ngày 18/3/2019 để tiện với người dùng ở Việt Nam hơn thôi.

Vậy thì muốn biết thời gian chính xác theo giờ tại Việt Nam thì chúng ta cần biết thời gian đăng bài thực tế chênh lệch bao nhiêu tiếng với thời gian ở Việt Nam. Để giải quyết vấn đề này thì mình đăng một bài lên Instagram để tính xem lệch bao nhiêu tiếng.

![](https://images.viblo.asia/1a03f84f-ef5a-4cb0-9455-f11781bd3ef1.png)

Ảnh trên mình đăng lên Instagram vào khoảng hơn 8h sáng, và đến 11h13 thì mình mới nhớ ra để lên kiểm tra. Thời gian đăng bài thực tế lúc này là 2022-09-28T01:01:51.000z => tức 1 giờ 1 phút 51 giây. Vậy thì múi giờ chênh lệch ở đây là 7 tiếng. Lúc này mình nhận ra bản thân đã bị Overthinking rồi, nó là GMT+0 với GMT+7 chứ còn gì nữa 🙃🙂.

 Vậy đối với bài đăng trong đề bài, chúng ta sẽ cộng thêm 7 tiếng nữa. Ta được **02:36:54**.

### Icy - 100
![](https://images.viblo.asia/2ef42645-9c49-426b-b0b1-ec6741b3fcdb.png)

- Mục tiêu: tại vị trí hầm tránh thiên tai của Oreo trên Google Maps có một công ty đã đăng ảnh. Công ty này có bao nhiêu con chó?

OK, vậy đầu tiên chúng ta cần tìm xem hầm tránh thiên tai của Oreo nằm ở đâu đã. Thông tin này rất dễ tìm thấy. Tình cờ là trước khi tham gia giải OSINT này mình đã từng thấy một bài đăng trên Facebook nói về việc Oreo xây hẳn một căn hầm tránh thiên tai, chỉ để lưu công thức làm bánh và các mẫu bánh.

![](https://images.viblo.asia/9017ef01-e530-459f-9a32-1326616a5c88.png)

Tại toạ độ này trên Google Maps có ngay cái ảnh to đùng với lũ Husky =))

![](https://images.viblo.asia/68692180-3531-49e3-878f-7ff63ef13b1e.png)

Sau khi click vào ảnh, chúng ta biết được rằng tấm ảnh được đăng bởi **Svalbard Husky** - công ty cho thuê chó Husky kéo xe tuyết (chắc thế).

![](https://images.viblo.asia/4cb42769-a8fc-4056-a1df-2a15fb63d767.png)

![](https://images.viblo.asia/1d4b4a66-14e4-473f-8332-1b141555ab4d.png)

Thăm quan trang web thôi nào.

![](https://images.viblo.asia/e6e7fc8b-9d2e-41f6-bbb6-9ce5aa65808d.png)

Đọc thêm thông tin công khai về công ty này, chúng ta dễ dàng tìm được số lượng chó mà họ đang sở hữu.

![](https://images.viblo.asia/782ec195-cb4c-4624-a6fd-06cd179765e9.png)

![](https://images.viblo.asia/25278d4a-429f-4790-826c-75a54806140d.png)

Quá là trời Husky lun 😆

### Sign - 150
![](https://images.viblo.asia/a509a010-8129-4791-9369-5fbbc994a46c.png)

- Mục tiêu: tên gọi phổ thông của toà nhà độc nhất gần địa điểm chụp bức ảnh.
- Link ảnh: https://1drv.ms/u/s!ArPnIPrcTV7XchhiqjBS0V52ep8?e=JUe4WG

Trong ảnh là một tấm biển quảng cáo có chữ Helsinki. Khi tìm kiếm về Helsinki thì chúng ta được biết đây chính là thủ đô của Phần Lan, đồng thời cũng là một địa điểm du lịch nổi tiếng.

Nếu là một địa điểm nổi tiếng thì việc tìm một toà nhà độc nhất nào đó sẽ dễ dàng hơn nhiều.

![](https://images.viblo.asia/c9090c52-3ecd-4493-a839-d032f84a583f.png)

Tuy nhiên chúng ta vẫn cần nhiều thông tin hơn để xác định được địa điểm chính xác. Khi tìm kiếm nguồn ảnh trên Google, mình tìm được bức ảnh trong đề bài trên Shutterstock.

![](https://images.viblo.asia/3ecbf607-b658-491a-8544-c6e5b548a282.png)

Bức ảnh trên được chụp tại Kansalaistori Square. Vậy giờ chúng ta chỉ cần tìm kiếm trong phạm vi hẹp hơn rất nhiều.

![](https://images.viblo.asia/23a936bb-a21c-44c0-9c94-d6556f135b69.png)

Giờ thì đi tìm tên thường được gọi của cái thư viện này.

![](https://images.viblo.asia/af6e678c-c9dc-42b6-a4a7-60a5f478f5d5.png)

Đáp án là **Oodi**.

### CULT - 150
![](https://images.viblo.asia/e4ad89bf-c281-4c8c-a480-41fb22fe94cf.png)

- Mục tiêu: tìm tên cũ của toà nhà màu hồng trong ảnh.
- Link ảnh: https://1drv.ms/u/s!ArPnIPrcTV7Xcwbr-ODvmmU3FaM?e=ys51ou

Tiếp tục với Google Image nàooooooo

![](https://images.viblo.asia/6e9ce87b-3a2c-4a4d-b29f-dcfadbcd5324.png)

Thu hẹp phạm vi tìm kiếm lại thì chúng ta có được một vài kết quả về cửa hàng bánh Cutie Pie. Ở trong link trên có bức ảnh giống y hệt mặt tiền con phố chúng ta muốn tìm. Mà còn có thêm cả địa chỉ trên Google Maps nữa chứ.

![](https://images.viblo.asia/7a6fb0ea-0567-4642-8bfe-15972115856b.png)

![](https://images.viblo.asia/7aadba2d-53fe-481e-b85f-42ac19dd94d6.png)

Khi trỏ vào 2 địa điểm khác cũng ở chung địa chỉ, chúng ta sẽ thấy có 2 nơi từng thuê mặt bằng này để kinh doanh, 1 quán bar và 1 quán ăn. Nhưng đây là cú lừa thôi. 

![](https://images.viblo.asia/4f6e9601-a695-4e54-8628-5829b6959551.png)

Hãy chú ý đến giao diện của Google Maps, ở góc trên bên phải có một phần để chúng ta điều chỉnh, xem lại các ảnh chụp trong quá khứ.

![](https://images.viblo.asia/b53a01f3-46e4-486b-a106-3a3437bebd11.png)

Chọn mốc thời gian ngay trước mốc gần nhất, chúng ta sẽ có được đáp án. Đó là một quán Pizza tên là **MOWIE**, cũng chính là đáp án của bài này.

![](https://images.viblo.asia/efb80ee5-0547-4955-9cb0-4434976edc62.png)

### Japanese - 300
![](https://images.viblo.asia/3bfe1417-346f-4abb-b70e-ce2a2a32a0a8.png)

- Mục tiêu: có một người Nhật Bản đã tweet về trải nghiệm tại một địa điểm trong khoảng 1km quanh Hồ Gươm vào ngày 22/9/2022. Số hiệu chuyến bay đến Việt Nam của người đó vào ngày 13/9/2022 là gì?

Bài này tuy chỉ có 300 điểm nhưng thực sự tốn khá nhiều thời gian để tìm kiếm. Qua dữ kiện từ đề bài chúng ta chỉ biết là phải tìm một bài đăng của một người Nhật trên Twitter vào ngày 22/9/2022. Trong bài viết có thể sẽ đề cập đến "Việt Nam", "Hà Nội". Khả năng cao là du khách này sẽ không thể biết rằng "Yeah, tôi đang ở gần Hồ Gươm/Hồ Hoàn Kiếm". Do đó có thể họ sẽ nói về địa chỉ, tên địa điểm (VD: quán ăn xxx, quán cafe xxx,...).

Mình nghĩ khả năng cao nhất là trong bài đăng sẽ có ảnh chụp về địa điểm đó (mấy ai đi du lịch mà không chụp ảnh chứ). Nếu may mắn thì trong ảnh sẽ có kèm địa chỉ quán, hoặc ít nhất là biển hiệu, tên quán, menu,... còn không thì sẽ tốn thời gian để tìm các địa điểm ăn chơi quanh Hồ Gươm.

Dù vậy thì việc tìm kiếm trên Twitter cũng không nhanh hơn là bao. Chúng ta sẽ sử dụng công cụ tìm kiếm nâng cao của Twitter. Tìm kiếm các bài viết bằng tiếng Nhật từ ngày 22/9/2022 đến 23/9/2022 (do nếu chỉ chọn mỗi ngày 22/9/2022 thì sẽ lỗi và không tìm được bài nào hết). Gợi ý của bài này thâm vãi, mình mua gợi ý để mong được gợi ý từ khoá tìm kiếm sát hơn, nhưng chỉ nhận được gợi ý là: dùng tìm kiếm nâng cao của Twitter đê 👿.

Mình chọn luôn tìm kiếm hình ảnh. Với mình thì khả năng trong tweet có ảnh địa điểm là cao nhất.

![](https://images.viblo.asia/f4ca68be-9415-4774-8396-b7fc9ae64164.png)

Bây giờ là thời gian dài dài dài ngụp lặn trong đống bài đăng. Trong đề bài chỉ nói rằng địa điểm được nhắc đến cách Hồ Gươm khoảng 1km. Đây là một con số không đáng tin lắm, vì nó có thể chênh lệch tuỳ vị trí bạn dứng. Do đó kể cả những địa điểm cách khoảng 2km mình cũng cần kiểm tra lại cho chắc.

Tích cực quay tay, vận may sẽ đến 👻💥🤘Mình đã tìm được một bức ảnh chụp một cửa hàng đồ ăn nhanh ở Hàng Bài, rất là gần Hồ Gươm luôn. Lúc nhìn thấy bài đăng này là mình đã cảm thấy đây là hướng đi đúng rồi.

![](https://images.viblo.asia/133ac4b5-10d5-4196-9e57-3fff656ef5e5.png)

![](https://images.viblo.asia/eb8405a4-62eb-4673-baa6-a3978573e890.png)

Chắc là tài khoản này rồi, giờ thì cần vào trang cá nhân của tài khoản này, sau đó kéo nhanh xuống tới ngày 13/9/2022. Chắc mấy anh em wjbu sẽ thích tài khoản này đây, ở đâu mà chẳng có người tốt và wjbu 🤪🤣.

Kéo xuống thì mình thấy một bài đăng về việc máy bay của VietJet có khả năng sẽ khởi hành muộn. Trong ảnh chụp thì có 2 chuyến bay của VietJet, một chuyến có số hiệu VJ823, chuyến còn lại có số hiệu VJ93x (số cuối đã bị cắt đi).

Có tận 10 lần submit flag cho bài này cơ mà, submit thử VJ823 thôi, tại sao lại không nhỉ 😌

![](https://images.viblo.asia/000ff27d-2681-452e-aa8d-cb874895f6f0.png)

Tất nhiên flag không phải VJ823 rồi. Tiếp tục kéo đi. Dưới nữa có một bài đăng về lịch trình chuyến bay của VietJet, khởi hành lúc 9h30 ngày 13/9/2022 tại Narita tới Hà Nội. Vậy là chắc kèo chuyến bay VJ93x rồi. Tiếc là trong ảnh này chưa có số hiệu chuyến bay luôn, app làm chán thế nhờ.

![](https://images.viblo.asia/1a6e3bba-a147-44c5-b574-4416940bf9bc.png)

Tầm 1 2 3 5 bài viết nữa là có ảnh checkin với số hiệu chuyến bay luôn rồi. Flag là **VJ933** ✌️

![](https://images.viblo.asia/c780c707-7d6e-44aa-834c-1471304b5868.png)

![](https://images.viblo.asia/28cf6eb1-a16b-4309-a41a-cf0bd807411a.png)

### The Queen - 500
![](https://images.viblo.asia/71a08d39-5dd2-4174-a98f-2070548adfed.png)

- Mục tiêu: tìm một toà nhà gần nơi có hình ảnh nữ hoàng trong bức ảnh.

Bắt đầu với việc tìm kiếm trên googlee map. Vì là tìm kiếm địa điểm nên chúng ta sẽ giới hạn chỉ lọc các kết quả tìm kiếm liên quan tới nước Anh. Ngoài ra chúng ta cũng cần chú ý các kết quả liên quan tới loại thùng rác đặc biệt trong ảnh.

![](https://images.viblo.asia/03fcd835-d06f-4e07-a7df-bd2dfd9e9df8.png)

Trong số các kết quả tìm kiếm, kết quả đầu tiên là một bài viết trên Linkedin của tài khoản Nidhi Turakhia. Sau khi tìm kiếm một hồi trong phần Activity của tài khoản này, chúng ta sẽ thấy bài viết sau.

![](https://images.viblo.asia/26e7f6c2-db57-42f4-8a44-fed6aeaad24e.png)

Trong bài viết là loại thùng rác đặc biệt trong ảnh tại đề bài. Và địa điểm được nhắc đến ở đây là sân bay Heathrow tại London - Anh. Lại đến lúc du lịch rồi 🤠

OK, giờ thì cả cái sân bay này rất lớn, muốn tìm ra được địa điểm chính xác cần chú ý hơn vào yêu cầu ở đề bài: "nơi có hình ảnh nữ hoàng". Nhưng nữ hoàng ở đâu trong cái ảnh? Đây chính là câu trả lời khi chúng ta phóng to ảnh lên.

![](https://images.viblo.asia/728acc5d-9f5e-4d86-9d81-4fa8937ad0b6.png)

Đã thấy nữ hoàng, tuy nhiên nhìn vào đây mình chẳng biết nó là cái gì cả. Vậy sao chúng ta không tìm điểm mốc dễ nhìn thấy hơn trên Google Maps? Ví dụ như một toà nhà đặc biệt.

![](https://images.viblo.asia/977a910b-ba59-4e43-a1c2-da77a041eb87.png)

Ở khu vực này của bức ảnh có hình một toà nhà rất tốt để chọn làm mốc. Phân tích về toà nhà này như sau:
- Mái màu đen. Theo kiểu sắp xếp không đồng nhất, chỗ thì nhô lên, chỗ thì thụt xuống.
- Tường nhà có màu nâu, cam.
- Toà nhà có một phần sân mái bằng khá rộng.
- Gần toà nhà có một con đường, chúng ta có thể thấy xe cộ đi lại trên đó.

Sau một hồi tìm kiếm thì mình đã tìm được toà nhà nói trên, cũng đoán được góc chụp của bức ảnh có thể như sau:

![](https://images.viblo.asia/163bf606-2290-4037-a818-4169cbd070a8.png)

![](https://images.viblo.asia/4aa264a6-b996-48d7-850e-e1e416dd821e.png)

Và toà nhà cần tìm là khách sạn Hilton Garden Inn.