![](https://images.viblo.asia/0d57e852-bf92-4a2c-a9db-5f346b1a7864.png)


**Thiết kế lại ảnh chụp giao diện trên App Store của ứng dụng HeyDoctor**


Bây giờ hãy thử chơi một trò chơi. Bạn chọn một ứng dụng trên điện thoại mà bạn thực sự thích dùng. Coi như bạn là tác giả của ứng dụng này và đang tìm cách quyên tiền từ các nhà đầu tư. Bạn có một phút để quảng bá ứng dụng của mình để mời nhà đầu tư đổ tiền vào. Tiền nằm ngay trên bàn, nhưng chỉ khi bạn có thể thuyết phục họ trong 60 giây thì mới được tính là gọi đầu tư thành công. 

Bạn có làm được không? Bạn mô tả ứng dụng của bạn hoạt động như thế nào? Bạn có chỉ ra được ứng dụng này là duy nhất trên đời, so sánh với các đối thủ cạnh tranh không? Bạn có thể nhanh chóng chỉ ra các trải nghiệm người dùng tuyệt vời như thế nào trên ứng dụng đó trong 60s không?

Mất trung bình 7 giây để người dùng trên App Store quyết định liệu họ có muốn tải xuống ứng dụng của bạn hay không. Một nghiên cứu về quyết định tải xuống liên quan đến 25.000 khách truy cập cho thấy, 10.000 lượt cài đặt được chỉ rõ là do Ảnh chụp (screenshots) của App đó làm họ thấy hứng thú và cài đặt app đó.

> Chúng tôi phát hiện ra rằng thời gian trung bình mà mọi người dành cho mỗi App trên store là 7 giây. Thực tế là, phần lớn mọi người rời khỏi trang giới thiệu App thậm chí sớm hơn. Những người dùng tích cực thì nán lại lâu hơn một chút, nhưng tất cả đều theo cùng một quy trình: nhìn icon app, thấy hay thì click vào, xem hai ảnh chụp màn hình đầu tiên và đọc dòng đầu tiên của mô tả ứng dụng (app description) - Peter Fodor, [Tại sao 7 giây có thể thêm khách hoặc làm mất khách hàng đối với App của bạn](https://asostack.com/why-7-seconds-could-make-or-break-your-mobile-app-f41000fb2a17)
> 

Ảnh chụp màn hình là bản sao cách dùng App và phản ánh trải nghiệm người dùng của ứng dụng. Tôi đã nghiên cứu 100 ứng dụng hàng đầu và ảnh chụp màn hình của họ bằng cách sử dụng dữ liệu được thu thập ở trang Incipia. Tôi sẽ đưa ra những phát hiện chính từ nghiên cứu đó trong bài này.


# Ứng dụng sẽ đem ra mổ xẻ: HeyDoctor

![](https://images.viblo.asia/193e16df-0b1a-4411-be91-90c12f561a13.png)


[HeyDoctor](https://www.heydoctor.co/) là một ứng dụng cho phép người dùng nhận đơn thuốc trực tuyến mà không cần phải đến gặp bác sĩ ở bệnh viện. Bạn có thể xem link đến trang ứng dụng ở App Store tại đây: https://itunes.apple.com/us/app/id1269448452?mt=8

HeyDoctor có thể kê toa và bổ sung thuốc theo toa cho các loại thuốc khác nhau, từ thuốc ngừa thai, thuốc mọc tóc đến thuốc điều trị nhiễm trùng đường tiết niệu, tham gia thử nghiệm thuốc và nhiều thứ nữa. Bạn cũng có thể được điều trị cho các trường hợp như điều trị mụn trứng cá, UTI, điều trị đau họng và vv. Ứng dụng di động của HeyDoctor đã được đón nhận nồng nhiệt trên App Store với 122 đánh giá xếp hạng 4,7 sao.


Chúng ta sẽ thiết kế lại ảnh chụp màn hình của HeyDoctor và tìm hiểu về làm thế nào để thiết kế ảnh chụp một cách dễ thu hút nhất, bắt mắt nhất.

### Chú ý

Xin lưu ý rằng tôi không làm việc tại HeyDoctor và quan điểm thể hiện trong nghiên cứu này là của riêng tôi. Tôi không phải là nhà thiết kế, người quản lý sản phẩm hoặc người chịu trách nhiệm thiết kế làm việc tại HeyDoctor, tôi cũng không có quyền truy cập vào cơ sở dữ liệu người dùng của họ. Các quyết định thiết kế của họ có thể dựa trên các mục tiêu kinh doanh, ưu tiên về con người hoặc các ràng buộc kỹ thuật. Do đó, mọi tình huống nghiên cứu đưa ra đều phục vụ mục đích của tôi là học hỏi, và tôi chắc chắn không gợi ý HeyDoctor từ bỏ ảnh chụp màn hình hiện tại của họ và áp dụng thiết kế lại của tôi.


![](https://images.viblo.asia/05581987-66e5-4efe-835d-e568ba30c718.png)

“Muốn cải tiến giao diện chứ gì? Cứ là phẳng (flat design) hết cái app của anh là được” — Một lão nào đó đã từng nói. Ảnh bởi:@parasmael

## Thiết kế hiện tại
Chúng ta sẽ làm việc dựa trên ứng dụng iOS của HeyDoctor. Dưới đây là những ảnh chụp màn hình hiện có của App như sau:


![](https://images.viblo.asia/927e614b-2786-46b0-99ae-87eea3d9a641.png)


Ảnh hiện tại tuân thủ tốt theo tiêu chuẩn về đặt tiêu đề, đưa ra được các chức năng của App để người dùng dễ dàng hiểu ứng dụng dùng để làm gì. Chúng ta không quan tâm đến việc thiết kế lại thương hiệu hoặc thiết kế lại giao diện người dùng, vì thế chúng ta sẽ cố gắng giữ lại toàn bộ giao diện chức năng và chỉ cải tiến ảnh chụp màn hình app cho phù hợp với thiết kế mới của chúng ta.


## Người dùng được hưởng lợi gì từ app này?

Trước khi chúng ta tìm hiểu và bắt đầu thực hiện các thay đổi giao diện, chúng ta cần tìm hiểu người dùng cài đặt HeyDoctor để làm gì và họ tìm kiếm gì khi họ khám phá ứng dụng này.

1. **Lấy thuốc theo toa và mua thêm thuốc**. Người dùng đang tìm một cách dễ dàng để mua thuốc theo toa và mua thêm thuốc (nếu đã có sẵn đơn) trực tuyến mà không cần phải đi khám bác sĩ.
1. **Điều trị bệnh**. Người dùng đang tìm kiếm cách điều trị bệnh trực tuyến.
1. **Nói chuyện với bác sĩ**. Người dùng muốn nói chuyện với một bác sĩ nhưng họ không thể đến bệnh viện do thời gian ngặt nghèo, khó khăn về tài chính hoặc bận đi làm.
1. **Làm tất cả những điều bên trên mà không cần bất kỳ thủ tục giấy tờ bảo hiểm nào**. Người dùng không muốn liên quan đến bảo hiểm y tế vì họ không có bảo hiểm, hoặc chi phí bảo hiểm của họ quá cao.


## Dùng ảnh chụp màn hình hay hình thu nhỏ?

Kích thước màn hình đã tăng 72% kể từ khi chiếc iPhone đầu tiên được ra mắt với màn hình 3,5 inch. Kích thước màn hình trung bình của điện thoại thông minh được bán ở Mỹ vào năm 2018 là 5,5 inch. Màn hình càng ngày càng to ra và các nhà thiết kế sản phẩm liên tục cải tiến giao diện để tận dụng không gian bổ sung này. Người ta nghĩ rằng màn hình lớn hơn sẽ khiến các nhà thiết kế đưa thêm nhiều chú thích vào ảnh chụp màn hình. Nhưng những gì chúng ta có thể thấy là hoàn toàn ngược lại.

> Chúng tôi liên tục quan sát và thấy rằng ít hơn 4% người dùng hứng thú với một ứng dụng có ảnh chụp màn hình theo chiều dọc được phóng to lên (chụp nguyên màn hình ứng dụng và không chú thích gì) và chỉ có 2% quan tâm đến ảnh chụp màn hình theo chiều ngang. Đối với game, thậm chí còn ít hơn chỉ 0.5% quan tâm đến ảnh chụp khi chơi game sẽ ra sao. Điều này có lẽ là do game thì nhìn qua là biết cách chơi ngay cả khi chỉ cần nhìn qua ảnh thu nhỏ (ảnh chụp 1 góc thú vị của game thay vì toàn bộ màn hình) - Peter Fodor
>




Như vậy là ít hơn 4% người dùng truy cập vào trang ứng dụng của bạn và nhấn vào xem ảnh chụp app của bạn.

Các nhà thiết kế đã bắt đầu chú ý đến số liệu này. Rất nhiều ứng dụng bắt đầu xử lý ảnh chụp màn hình của họ dưới dạng hình thu nhỏ để xem nhanh, thay vì chụp nguyên màn hình ứng dụng. Người dùng trong năm 2016 thường chạm vào ảnh chụp màn hình để đọc văn bản mô tả trong đó. Nhưng với bố cục App Store mới và màn hình lớn hơn, người dùng không hề muốn chạm vào ảnh chụp màn hình của bạn nữa.


Hãy xem xét một số thiết kế lại ảnh chụp màn hình từ năm 2016 đến năm 2018. Chú ý về việc hầu hết App sử dụng ít từ hơn và chuyển sang phông chữ lớn hơn.

![](https://images.viblo.asia/f6b7c3db-01f6-41e1-873a-965689f09e56.png)

## Dù gái hay trai, chỉ 2 là đủ

![](https://images.viblo.asia/f2364c20-bbcb-4ba1-a89b-196ad4c94805.gif)

78 trong số 100 ứng dụng hàng đầu có 5 ảnh chụp màn hình, 13 ứng dụng có 4 ảnh chụp màn hình, 6 ứng dụng có 3 ảnh chụp màn hình và 3 ứng dụng chỉ có 2 ảnh chụp màn hình. Là một nhà phát triển, bạn sẽ nghĩ rằng người dùng quan tâm đến cả năm ảnh chụp màn hình vì 5 ảnh có nhiều nội dung hơn, phải không? 
> Sai rồi.


***Chỉ có 9% người dùng cuộn qua hai ảnh chụp màn hình đầu tiên***. Ảnh chụp màn hình theo chiều ngang thậm chí chỉ thu hút khoảng 5%. Điều này làm cho chúng ta bắt buộc phải thu hút người dùng trong hai ảnh chụp màn hình đầu tiên. Chỉ ra cho người dùng biết ứng dụng của bạn làm gì trong màn hình đầu tiên và tìm cách lừa để người dùng cuộn sang ảnh chụp thứ 2, và hi vọng là họ sẽ quan tâm để cuộn tiếp sang ảnh thứ 3, thứ 4.

> Những phát hiện của nghiên cứu của chúng tôi cho thấy, bạn phải giải thích lợi ích cốt lõi của ứng dụng trong hai ảnh chụp đầu tiên (iOS10, Google Play) hoặc ba (iOS11) nếu bạn đang sử dụng hình ảnh dọc. Nếu bạn thực sự muốn sử dụng hình ảnh theo chiều ngang, bạn sẽ chỉ có một cơ hội duy nhất để người dùng nhìn thấy thôi -  Peter Fodor

Hãy xem xét hai ảnh chụp màn hình đầu tiên của một số ứng dụng phổ biến.

![](https://images.viblo.asia/60d6c500-ccf8-43ca-821d-8a58d0e3c72c.png)

## Chỉ rõ các chức năng chính trong giao diện người dùng

Người dùng lướt qua ảnh chụp màn hình của bạn và cố gắng tìm hiểu các chức năng trong ứng dụng của bạn. Đưa chú thích vào ảnh chụp giúp họ hiểu ngữ cảnh phía sau màn hình. Nhà thiết kế sẽ giúp người dùng dễ dàng đánh giá hơn bằng cách làm nổi bật các phần tử giao diện đi kèm với chú thích tiêu đề bên trên.

Chúng ta hãy xem xét một số ví dụ.

![](https://images.viblo.asia/3fe24fc6-5d50-4f62-abfc-97fd1925e520.png)

## Bài học rút ra là gì?

1. **Giải thích chức năng người dùng cần nhất ở ứng dụng của bạn trong hai ảnh chụp màn hình đầu tiên**. Chỉ 9% người dùng vào trang ứng dụng của bạn sẽ cuộn qua hai ảnh chụp màn hình đầu tiên.
1. **Tăng kích thước phông chữ và giảm bớt chữ đi**. Với màn hình lớn hơn, người dùng sẽ có điều kiện để vuốt ngón tay và lướt qua các ảnh chụp màn hình thay vì phải nhấn vào nó để lướt xem. Ít hơn 4% người dùng sẽ nhấn vào ảnh chụp màn hình của bạn để xem thêm.
1. **Chụp các góc giao diện ứng với chính xác tính năng mà bạn đang mô tả bằng chữ bên trên**. Đừng chỉ đơn giản là bê nguyên cả màn hình vào. Nó giúp người dùng tập trung và dễ hiểu hơn về cái họ sẽ được hưởng và khả năng cao sẽ làm người dùng hứng thú để lướt qua xem ảnh tiếp theo.

Bây giờ chúng ta đã rõ hơn một chút về cách làm cho ảnh chụp màn hình dễ đọc hơn, hãy bắt đầu áp dụng các phát hiện đó vào ảnh chụp màn hình của HeyDoctor.

# Bước 1: Cập nhật ảnh App chạy trên iPhone thế hệ mới hơn

Ảnh chụp màn hình của HeyDoctor đang sử dụng thế hệ iPhone cũ. Mặc dù tôi không phải fan cuồng iPhone, tôi vẫn luôn thích nhìn các app chạy trên iPhone mới nhất. Chúng ta hãy cập nhật ảnh chụp App HeyDoctor:

![](https://images.viblo.asia/377fbcec-51e5-49c4-80d0-2e0e4c4b7b41.png)

# Bước 2: Cắt giảm tiêu đề cho ngắn gọn

Chúng ta sẽ cố gắng làm cho tiêu đề dễ đọc hơn một chút bằng cách kể các tính năng của người dùng theo định dạng ngắn gọn. Chúng ta cũng sẽ loại bỏ mô tả vì chỉ cần một tiêu đề là đủ hình dung ra chức năng.

![](https://images.viblo.asia/6d9aa27e-3337-4cd2-8db4-a8270a61664f.png)


Ảnh chụp màn hình thứ ba đang chụp trang settings của ứng dụng, trong khi chú thích bên trên lại đang nói về việc ứng dụng không yêu cầu chính sách bảo hiểm. Hãy thay thế bằng một màn hình phù hợp. Tôi sẽ thay thế nó bằng màn hình đầu tiên bạn thấy khi bạn cố gắng mua thuốc theo toa, gián tiếp ngụ ý rằng bạn không cần bảo hiểm để bắt đầu mua thuốc.

![](https://images.viblo.asia/a64b890c-9207-4889-99d5-6afeda1f06d6.png)


# Bước 3: Làm nổi bật các tiêu điểm trên giao diện

Như chúng ta đã học ở trên, việc làm nổi bật các yếu tố giao diện người dùng có liên quan đến tiêu đề bên trên ảnh, làm cho giao diện dễ nhìn và dễ đọc hơn. Nó cũng giúp người dùng hiểu thao tác, hiểu chức năng dễ dàng hơn.

## Giao diện Chat của người dùng
Hãy xem App Tinder làm nổi bật giao diện Chat của họ như thế nào:

![](https://images.viblo.asia/2270c958-8a2b-4d1a-a3c4-a1a8eb353fe6.png)

Họ khéo léo sử dụng hình ảnh hồ sơ và màn hình chát dạng bong bóng với các yếu tố thương hiệu như màu sắc, để bắt chước giao diện chat thực sự khi dùng app.

Chúng ta hãy thử làm một cái tương tự:

![](https://images.viblo.asia/379aaad6-d78c-47b1-b6d1-9030dbd28e77.png)

Hãy chèn nội dung này vào ảnh chụp màn hình:

![](https://images.viblo.asia/9e4003d5-38f4-4a69-befc-33d3417277ed.png)

Tôi đã cố gắng tích hợp thương hiệu của HeyDoctor vào các bong bóng chat. Tôi không thấy cần phải đưa avatar vào bởi vì các bác sĩ mà bạn chat trong ứng dụng không cần ảnh đại diện.

## Ảnh dạng thẻ và đổ bóng

Chúng ta hãy xem cách Uber làm nổi bật các yếu tố giao diện người dùng của họ.

![](https://images.viblo.asia/ee5f1080-9f61-4f88-8f73-b3740950ed0c.png)


Tôi thích cách tối giản này. Làm nổi bật các yếu tố giao diện người dùng bằng cách đưa vào thẻ và có bóng đổ. Chúng ta sẽ sử dụng phong cách này để nhấn mạnh một số yếu tố trong ảnh chụp màn hình của chúng ta.

![](https://images.viblo.asia/4979292b-4689-48bd-8d72-81c9ddc645bd.png)

Tôi quyết định chuyển tiêu đề xuống bên dưới cái điện thoại để người dùng nhìn thấy giao diện trước trước khi họ đọc chú thích.

![](https://images.viblo.asia/65fadfde-26df-4fbd-93f2-8dd2a00200fb.png)

# Bước 4: Thay đổi dung nhan

Chúng ta đã thực hiện nhiều thay đổi cho ảnh chụp màn hình của mình để tối ưu hóa cho khả năng được để ý đến. Bây giờ chúng ta hãy làm cho nó trông đẹp hơn. Thiết kế hình ảnh đẹp hơn có thể thu hút thêm nhiều người quan tâm một cách đáng kinh ngạc, và không nên bỏ qua trong khi thiết kế lại ảnh chụp màn hình.

## Đưa ảnh chụp app về dạng Nghiêng 45 độ

Điện thoại có ảnh chụp render dưới dạng nghiêng, nhìn sẽ rất hiện đại và bóng bẩy. Bạn có thể thấy các điện thoại đẳng cấp dưới dạng ảnh nghiêng ở hầu như ở khắp mọi nơi từ các sản phẩm quảng cáo hoàn hảo của Apple đến các mockups được đánh giá cao trên Dribble.com.

Tôi đã thực hiện một vài sự thay đổi góc nhìn từ màn hình chúng ta vừa thiết kế bên trên.


![](https://images.viblo.asia/9930a25b-f735-414a-9f82-1f1ec7c35930.png)


Tôi sẽ chọn mockup phối cảnh đầu tiên và cắt đôi thành hai ảnh chụp màn hình vì chúng ta mới chỉ thiết kế có 3 ảnh chụp màn hình và trong App Store có thể thêm tối đa 5 ảnh. (Và rõ ràng việc cắt 1 góc ảnh đã làm kích thích trí tò mò của người dùng vuốt qua trang tiếp theo xem app nó làm gì) và tiện tay vuốt tiếp...)

![](https://images.viblo.asia/3f78af67-00c9-4390-b478-d376ebe83949.png)

Tôi đã thêm chú thích vào trang đầu tiên - “Bác sĩ cá nhân của bạn”. Dễ đọc, tóm tắt những gì ứng dụng thực hiện và súc tích.

## Thay đổi màu nền

Sự tương phản giữa màu nền và ảnh chụp hơi quá gắt nếu theo quan điểm của tôi. Hãy để tôi thay đổi cho nó thành một màu xanh nhạt hơn.

![](https://images.viblo.asia/50539425-cf53-4f56-bf1b-5fafbf3c0b86.png)

Chúng ta sẽ tạo một gradient với các màu mới mà chúng ta chọn.

![](https://images.viblo.asia/39b5b199-1441-4409-b638-e37489be6925.png)

Hãy thử đưa vào xem nó trông như thế nào trong ảnh chụp màn hình của chúng ta.

![](https://images.viblo.asia/5e275c6e-bb3a-4f9e-ab5e-e379f24ba140.png)

> Hoàn hảo!

Tôi thêm một đường chia ngay bên dưới tiêu đề để nó thể hiện một sự cách biệt giữa tiêu đề và ảnh chụp.

![](https://images.viblo.asia/5b1a9556-7bab-4acd-a258-0d56959f14d5.png)

Tôi đã chụp một ảnh dạng vector khá là đẹp từ trên trang chủ https://www.heydoctor.co/. Hãy sử dụng nó để tạo ảnh chụp màn hình cuối cùng.

![](https://images.viblo.asia/6f6aa716-0e48-4d0b-b71a-133c7a26a6a8.png)

## Thiết kế đã hoàn chỉnh

### Trước

![](https://images.viblo.asia/e180605d-db77-4db6-8ba2-08cff7eb0e02.png)

### Sau

![](https://images.viblo.asia/228d6b81-dcca-43b1-be7f-b8d39b84a9dd.png)


# Kết luận

Như vậy, chúng ta đã thực hiện chỉ bốn tinh chỉnh nhỏ, lặp đi lặp lại ở các ảnh chụp màn hình. Kết quả cuối cùng là các ảnh chụp màn hình dễ nhìn và cho cảm giác hiện đại. Và hơn nữa, không cần quá giỏi về đồ họa để điều chỉnh được các ảnh chụp cho đẹp hơn. Nghiên cứu một vài ứng dụng trong App Store đã giúp ích rất nhiều, cho chúng ta hiểu ra cần phải làm gì để App của mình được tìm kiếm nhiều hơn.

**Cảm ơn vì đã đọc!** Đây là một dự án vui vẻ cuối tuần của tôi và tôi rất vui được chia sẻ nó với bạn. Hy vọng rằng, bài này cung cấp cho bạn thông tin chi tiết về việc tạo ảnh chụp màn hình trong App Store. Vui lòng hỏi bất kỳ câu hỏi nào mà bạn thắc mắc trong phần nhận xét bên dưới.

Đây là một bài dịch. Link bài gốc: https://medium.freecodecamp.org/ux-best-practices-how-to-design-scannable-app-screenshots-89e370bf433e



-----

Lời người dịch: Các bạn đọc trong bài viết gốc sẽ thấy, CEO đồng thời là Co-founder của HeyDoctor đã để ý đến bài viết này. Các bạn hãy đoán xem anh ấy nói gì và comment xuống bên dưới nhé! :)