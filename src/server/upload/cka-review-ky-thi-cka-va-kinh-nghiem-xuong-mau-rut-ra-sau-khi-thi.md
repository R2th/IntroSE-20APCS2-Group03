# Mở đầu
Chắc hẳn anh em nào có đang làm việc với Kubernetes hoặc liên quan tới Kubernetes thì cũng đều đã nghe qua về chứng chỉ CKA, tên đầy đủ là **Certified Kubernetes Administrator**.

Nhân tiện vừa mới thi xong chứng chỉ nên mình chia sẻ với mọi người một chút về Cert này và kinh nghiệm để thi đi sao cho hiệu quả!

![image.png](https://images.viblo.asia/ff77d819-ba00-414f-91dd-c9520afd2d3e.png)

**Mô tả sơ qua về chứng chỉ này:**
- Đây là chứng chỉ do CNCF tổ chức và để chứng nhận những người vượt qua nó có đủ bộ kỹ năng và kiến thức để quản trị vận hành hệ thống Kubernetes
- Bài thi có thể được thực hiện offline hoặc online kèm có người giám sát qua camera
- Thời gian của bài thi là 120 phút với số lượng câu hỏi khoảng từ 17-25 câu, mỗi câu hỏi có trọng số khác nhau (dao động từ 4% tới 13% cho mỗi câu) tùy mức độ khó dễ
- Trong mỗi câu hỏi là một yêu cầu thực hành theo một hoặc nhiều ý khác nhau, và đúng tới đâu sẽ được chấm điểm tới đó
- Môi trường thi sẽ cung cấp cho bạn 1 session remote tới 1 máy ảo cài ubuntu, trên đó bạn được phép bật terminal để thực hiện chính cho việc giải các yêu cầu của đề thi + có 1 session firefox để tra cứu thông tin từ nguồn cho phép (như kubernetes.io)
- Để đạt chứng chỉ bạn cần đạt tối thiểu 66%/100% và chứng chỉ có hạn 03 năm. Sau 3 năm bạn sẽ cần thi để renew Cert
- Lệ phí thi là $395, các bạn có thể mua trên Linux Foundation và săn sale (hay có ở Black Friday) thì sẽ có voucher giảm 50% chỉ còn dưới $200

Đến thời điểm hôm nay cũng đang có ***chương trình KM 50%*** cho cert CKA, các bạn có thể [**tham khảo ở đây**](https://training.linuxfoundation.org/cyber-2022/?utm_source=lf&utm_medium=homepage-ticker&utm_campaign=22Q4+Training+Cyber+Week)
## Trải nghiệm lần đầu thi CKA
Mình có mua voucher thi CKA đúng 1 năm trước (mình thi trước khi VC hết hạn 4 ngày) có sale 50% là còn $187 (~4.3tr VNĐ). Mình mua trên trang Linux Foundation và thanh toán bằng thẻ Credit Card thì thấy nó rất nhanh và đơn giản.
![image.png](https://images.viblo.asia/4b9b2919-1897-4f66-bdba-00c9ea91ecd8.png)

Khi đã quyết định thi, mình lên trang [**Portal của Linux Foundation**](https://trainingportal.linuxfoundation.org/learn/dashboard/) để bắt đầu thủ tục đăng ký thi và cũng bắt đầu tìm hiểu về quy định trong quá trình thi. Mình đăng ký là 9h30 này 24/11/2022 bắt đầu thi. Sau khi đăng ký khoảng 1 ngày thì sẽ nhận được email confirm về ngày giờ thi và hương dẫn thi chi tiết. 
![image.png](https://images.viblo.asia/10326f5a-bb6d-4be7-83c2-e0940d97f81e.png)
Đúng ngày đúng giờ, 9h kém (trước giờ thi 30 phút) mình vào phòng họp thì phát hiện ổ cắm không có điện :|. Bắt đầu thấy có gì không lành. Mình book sang phòng khác và chuyển đồ sang. Mình dùng laptop + màn hình + bàn phím + chuột ngoài.

Sau đó mình bắt đầu **checkin lần 1**, sẽ gồm các bước như sau:
- Vào Linux Foundation Portal làm thủ tục checkin
- Cài đặt PSI secure Browser (dùng để thi và giám sát qua đây)
- Tắt hết các phần mềm không được phép sử dụng trong quá trình thi (PSI secure browser sẽ quét các phần mềm nếu phát hiện sẽ báo failed bạn phải tắt đi rồi check lại)
- Giơ ảnh CMND (hoặc giấy tờ tùy thân được chấp nhận) lên webcam để chụp + chụp ảnh mặt chính diện --> chờ verify mất hơn 5 phút. 
- Sau khi verify xong thì Proctor sẽ yêu cầu bạn làm một số việc sau:
    - Giơ lại CMND lên web cam
    - Dùng webcam quay một lượt phòng thi bao gồm 4 bức tường, trần nhà, sàn nhà
    - Dùng web cam quay một lượt 4 góc bàn, dưới chân chỗ mình ngồi
    - Yêu cầu đưa điện thoại cho họ nhìn thấy và để xa khỏi tầm với nhưng trong phạm vi nhìn thấy của webcam, tháo các thiết bị điện tử khác ra (như đồng hồ..)
    - Dí sát từng bên tai vào webcam để đảm bảo không hack/cheat
    - Nói chung cái bước verify này phải mất thêm tầm 15-20 phút nữa
Như vậy checkin lần 1 cơ bản đã xong, nhưng lúc này trên phần mềm PSI Secure Browser cái camera của mình bị treo hình --> Proctor bảo browser đi bật lại --> Nhưng khi bật lại thì coi như checkin lại từ đầu :|

**Checkin lần 2:**

Lặp lại toàn bộ các bước như checkin lần 1, tuy nhiên lần này thì có vẻ nhanh hơn chút, khoảng 10 phút là xong. Proctor bảo ok rồi, sẽ release bài thi cho mình ngay đây thì đúng lúc bắt đầu hiện ra cái trang đầu tiên, còn đang giới thiệu về các context của bài thì thì phần mềm báo mạng không ổn định và tự tắt luôn cái PSI secure browser luôn :|. Lúc này là khoảng 10h kém 15 rồi. Không còn cách nào khác lại phải checkin lại.

**Checkin lần 3:**

Tiếp tục lặp lại toàn bộ các bước như checkin lần 1, nhưng lần này lão Proctor hành mình phải gần 40 phút mới xong, nóng ruột vô cùng. Cứ cầm webcam quay xong lại bắt quay lại. Mình nhớ lúc checkin lần 3 xong thì khoảng 10h15 hoặc hơn. Lúc này là mệt lắm rồi, vì cầm nguyên con laptop để quay khắp phòng hơn chục lần + tâm lý lo lắng sợ rớt mạng phát nữa thì không biết phải làm sao.

Ơn giời cũng tới phần làm bài thi. 

**Nhưng drama bây giờ mới thực sự bắt đầu 😭😭😭** 

Sau khi làm bài dc khoảng 5 phút thì mình phát hiện phía trên bên trái của giao diện thi là cột thời gian còn lại màu xanh lá, đang hiện thị còn 78 phút nữa. Như vậy tổng thời gian thi của mình chỉ vào khoảng 80 phút. 
Lúc này là hoảng thật sự, vì thi thử trên killer.sh lần đầu mất 2h mà chỉ làm kịp 19/25 câu. Bây giờ chỉ còn có 80 phút nữa thì tạch chắc rồi.

Mình có complain với Proctor nhưng chỉ nhận dc phản hồi kiểu "tao có biết gì đâu, mình claim với Linux Foundation đi hoặc call số hotline. Chúc mày may mắn" 😱😱😱

Lúc này thì chán hẳn và xác cmn định là chuẩn bị thi lần 2 :(. Nhưng mà may mắn là càng làm thì càng thấy câu hỏi ở đây dễ và ngắn hơn hẳn các câu test thử trên killer.sh. Mình làm hết 17 câu thì thấy vẫn còn hơn 20 phút nữa, nghĩa là chỉ làm mất khoảng 60 phút là xong 17 câu rồi. 

Có những câu hỏi dễ quá làm mình phải đọc lại xem có đúng là nó dễ như vậy không, và xem lại thì nó chỉ 3% hay 4% thôi nên chắc là nó dễ thật chứ không phải lừa đảo đánh bẫy.

20 phút cuối mình dùng để check các câu chưa chắn chắn, và phát hiện chưa làm câu về network policy nên vẫn kịp hoàn thiện. 

Lúc này mới yên tâm là không phải thi lại rồi, có rớt mạng nữa cũng không sợ :)

## Kinh nghiệm xương máu rút ra
***Qua trải nghiệm đầy đau thương thì mình rút ra một số kinh nghiệm, hy vọng các ae sau này đi thi thì tránh mắc phải***:
- Nếu có thể thì nên dùng webcam gắn ngoài. Mình bê nguyên qua laptop đê quay lúc checkin muốn rời cả tay luôn
- Nên chuẩn bị không gian thi cẩn thận, có check trước các điều kiện điện mạng, ánh sáng. Nếu dùng phòng họp ở cty thì nên book luôn nửa ngày đó, để dự trù các vấn đề phát sinh (như mình)
- Nên có mặt ở địa điểm thi sớm hơn tầm 1 tiếng để check các điều kiện và checkin càng sớm càng tốt
- Đảm bảo network thật ổn định, lỡ nó bị disconnect là lại phải checkin lại như mình thì toang
- Các câu hỏi đều cho đánh dấu để quay lại sau (ở phía dưới cùng của câu hỏi có nút) nên câu nào cảm thấy không thơm thì next luôn, cứ câu dễ làm trước
- Mỗi câu hỏi đều có context của nó, ấn vào nút `copy` ở góc ô hiển thị tên context để để copy và paste nó vào terminal (nơi làm bài thi)
- Với các tham số cho câu hỏi thì chỉ cần click chuột vào là nó tự copy rồi, sang terminal ấn `ctrl+shift+v` để paste vào
- Khi tìm kiếm trên trình duyệt firefox trên máy remote thì copy bằng `ctrl+c` hoặc `ctrl+insert` đều được, còn paste thì ấn `shift+insert`.
- Nên đặt ngay alias khi vào bài thi và nên thực hành sử dụng các alias này cho thuần thục, nó sẽ tiết kiệm cho bạn cực kỳ nhiều thời gian
```
export do="--dry-run=client -oyaml"
export now="--force --grace-period 0"
export ow="-owide"
```
- Một số config đơn giản bạn nên học thuộc như cấu hình volume sử dụng hostPath, emptyDir, hay các khai volumeMount vì khi search doc sẽ khá lâu trong khi config chỉ 2-3 dòng
- Nên tập luyện thật nhiều các thao tác với tài nguyên bằng các câu lệnh imperative, kiểu tạo pod, tạo deployment, expose service, tạo role, assign role.. 
- Trình duyệt firefox trong máy remote đó không hỗ trợ tìm kiếm text (ctrl + F) do đó phải tập luyện tìm theo keyword và nhớ nó ở khoảng nào trong tài liệu để kéo cho nhanh

## Đánh giá cá nhân của mình về bài thi CKA
Cá nhân mình cho rằng đề thi CKA rất hay, vì nó là các câu hỏi thực hành trực tiếp trên các môi trường kubernetes do họ setup trước, do đó đánh giá được mức độ hiểu và mức độ thuần thục của ứng viên khi tham gia test.

Nội dung các câu hỏi của CKA thì khá đa dạng và mình thấy bao trùm gần như toàn bộ các kiến thức cơ bản của Kubernetes. Nói là cơ bản vì mình không thấy có câu hỏi nào quá sâu tới mức phải động não suy nghĩ cả.

Các câu hỏi trong CKA thì không quá khó, nhưng nếu là lần đầu làm chắc chắn bạn sẽ bỡ ngỡ vì không quen với việc phải trả lời câu hỏi đó như thế nào. Nếu bạn nào đã thi thử trên killer.sh thì bài thi thật chắc chỉ bằng 60% bài thi trên killer thôi. 

Nếu một người có kinh nghiệm làm việc với k8s thì chưa chắc thi được CKA, vì nó sẽ có nhiều nội dung đôi khi trong thực tế chúng ta ít khi phải đụng tới. Nếu một người chỉ chăm chỉ học lý thuyết và ít thực hành thì lại càng khó, vì vốn dĩ đây là bài test thực hành. Do đó nắm rõ lý thuyết + thực hành đủ nhiều thì sẽ tự tin thi pass được.

Với cá nhân mình thì đã làm việc với k8s một thời gian + có đọc lý thuyết cơ bản về các thành phần của k8s thì thấy chỉ cần luyện khoảng 1 tuần làm đề để quen với format câu hỏi và cách trả lời là có thể tự tin đi thi được.

**Đây là những trải nghiệm của cá nhân mình cũng như những bài học mình rút ra được sau khi thi. Trong bài tiếp theo mình sẽ chia sẻ về một số nguồn tài liệu cho các bạn tham khảo, cũng như cách học làm sao cho hiệu quả và đúng trọng tâm cho việc thi CKA.**