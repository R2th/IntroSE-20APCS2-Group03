Docker bây giờ gần như là **kiến thức bắt buộc** đối với các anh em Dev và Devops, nhưng mà đối với sinh viên IT nói chung vẫn còn khá mơ hồ và không biết tác dụng thực tế của nó. Hôm nay mình sẽ chia sẻ với anh em về Docker, thứ mà mình ước mình biết sớm từ hồi còn đi học.

## 1. Khái niệm Docker
**Docker là hệ thống dùng để ảo hóa ứng dụng**. Anh em có thể đã quen với máy ảo Windows, máy ảo Linux, thì Docker cũng là ảo, nhưng không phải ảo hóa hệ điều hành, mà chỉ ảo hóa 1 ứng dụng thôi. Docker sẽ không có giao diện, nhưng thực tế ứng dụng vẫn được chạy ngầm trong đó. 

Ví dụ anh em search docker image của thằng Wordpress và chạy cái image ấy thì anh em sẽ có ngay 1 con wordpress trên máy của mình với các cài đặt mặc định. Docker image lúc này đã chạy và được gọi là Docker container, nó là 1 con máy ảo hóa ứng dụng wordpress, có Ram CPU như thường, nhưng trên đó chỉ chạy mỗi wordpress mà thôi.

## 2. Tác dụng của Docker cho anh em sinh viên

### a. Không cần cài nhiều thứ lằng nhằng khi lập trình

Các anh em sinh viên IT khi lập trình một project thường là cài toàn bộ những thư viện cần thiết của một Framework nào đó lên con máy của anh em, rồi code và chạy. Không phải sinh viên mà gần như ai cũng vậy.

Có một lần mình phải làm project bằng Nodejs cùng thằng bạn. Cay một cái là mình anti tất cả framework nào của thằng JS, nên lúc làm rất ngại cài đặt với cả học, cuối cùng cứ dề dà rồi lại phải code trong 1 tối cho xong  😓

Hồi đó chỉ ước hay là mượn luôn máy thằng bạn về code cái module của mình, xong rồi mình trả, không hề biết tồn tại một cái hay như là Docker. Thằng docker cho phép mình build thành image cái ứng dụng mình code, với nền tảng ban đầu là 1 cái image khác. Như vậy, nếu mình chọn cái image ban đầu là image Nodejs, sau đó copy code của mình vào đó rồi build thành image của mình thì sẽ thành công.

Đến bây giờ, khi muốn chạy một chương trình gì đó ăn cắp trên mạng, mình luôn xem nó có viết Dockerfile sẵn để build image hay không, không có thì mình cũng tự build để chạy xong xóa sau. **Tất cả những image base ví dụ như Python3, Python2, Java8, Nodejs đều được các ông Dev khủng trên thế giới verify hết rồi**, môi trường của nó được setup hoàn hảo chứ không 1 đống bùi nhùi như trên máy mình, app gì cũng có, nhiều khi cài thư viện lung tung còn ghi đè hết lên của nhau 😓 

Nếu clone code về và build trên máy mình thì thường xuyên ra lỗi thiếu thư viện này nọ, nhưng nếu build bằng docker thì gần như không có chuyện ấy xảy ra, vì môi trường của nó hoàn hảo quá rồi, sau này không dùng đến lại xóa đi, còn nếu build trên máy mình thì đống thư viện vẫn còn ở 1 folder nào đó mình cũng chả biết.

### b. Khả chuyển, dễ dàng chia sẻ
Anh em cứ tưởng tượng khi mình lập trình xong một sản phẩm, sau đó muốn cho bạn bè mình chạy để xem, hoặc muốn mang từ máy tính ở nhà sang cái máy tính trên công ty. Thậm chí anh em phát triển sản phẩm vì cộng đồng, bây giờ chưa có tiền mua tên miền, thuê server, anh em sẽ build thành docker image, sau đó gửi cho bạn bè mình chạy.

Mọi thứ vô cùng tiện lợi. Docker hub là một nền tảng lưu trữ và chia sẻ free các docker image. Anh em chỉ việc lập cái nick tên thật kêu, build cái image rồi đẩy lên đây, image ấy sẽ mang tên của anh em luôn. 

### c. Lưu trữ các phiên bản cũ hơn của project
Thằng Docker có một thứ để phân biệt giữa những lần build khác nhau, đấy là image tag. Ví dụ một image như sau: `hehe/haha:dev-1` là một image của người dùng hehe, với tên image là haha và tag của nó là dev-1. Anh em đẩy cái image này lên Dockerhub, sau đó build một image khác có tên là `hehe/haha:dev-2` thì anh em sẽ được một image khác với image ban đầu, dù cho ứng dụng chạy trên đó cũng vẫn chỉ là ứng dụng haha mà thôi. Và nếu anh em để tag cũ dev-1 thì khi đẩy lên Dockerhub sẽ ghi đè vào cái có sẵn.

Mình có thể build thành nhiều image với những version khác nhau của ứng dụng, song hành với việc bump version trên github để so sánh đối chiếu. 

------------------------------------------------------------------------------------

Tóm lại, tác dụng của Docker trong học tập rất hay. Nếu anh em làm project, sau đó đẩy code lên github và đẩy image lên Dockerhub, anh em có thể tự tin đi thuyết trình project mà không cần phải mang theo máy tính cá nhân của mình. Nó có thể dễ dàng chia sẻ cho tất cả mọi người và lưu trữ toàn bộ quá trình làm việc của anh em.

## 3. Điểm yếu của Docker
Những điểm yếu này là những điểm yếu mà mình tự nhận thấy khi làm việc với Docker, anh em đọc mang tính chất tham khảo, có thể không đúng với tất cả mọi người.

### a. Phụ thuộc vào kiến trúc hệ thống của con máy anh em dùng
Điểm ức chế nhất của thằng Docker này đó là nó phụ thuộc vào kiến trúc con máy dùng để build image. Nếu dev mà dùng Linux để build,  image đó chỉ chạy được trên hệ thống giống vậy, cho sang Windows hoặc Mac có thể bị lỗi. Ngoài ra kiến trúc chip cũng ảnh hưởng lớn. Build trên kiến trúc amd x64 sau đó mang sang chip arm chạy cũng có thể bị lỗi.

Công ty mình cấp Mac M1 để làm việc. Nhiều người nghe vậy thấy phê, nhưng thực ra dùng rồi mới nhận thấy sự ức chế của nó. Mac M1 chạy chip arm, còn hầu hết Docker image trên Dockerhub đều build amd64, lúc chạy trên Mac thì 99% bị xung đột chip.

Hơn nữa môi trường Deploy lại toàn là Linux/amd64, thành ra riêng thời gian chỉnh sửa sao cho nó build không bị lỗi cũng ngốn kha khá thời gian rồi.

Để cải thiện vấn đề này, Docker cli có một argument là --platform để dev có thể tùy chỉnh platform cho image, và các nhà phát triển Docker cũng đang phát triển command [buildx](https://docs.docker.com/build/building/multi-platform/) để build multi-platform.

### b. Khó khi bắt đầu
Docker là một khái niệm mơ hồ đối với những sinh viên nào mới bắt đầu làm dev. Đối với mình cũng vậy thôi, bởi vì hồi đi học tất cả các project đều được thực hiện trong tình trạng anh em còn gà mờ, setup môi trường trên máy tính còn khó khăn.

Tất cả những gì sinh viên cần là làm sao để hoàn thiện project nhanh nhất để còn viết báo cáo với làm slide thuyết trình, trong khi Docker là thứ không hỗ trợ việc lập trình, thậm chí cài đặt cũng mất thời gian. Do không có nhu cầu cần tìm hiểu nên sinh viên cũng chưa quan tâm nhiều tới nó.

### c. Docker không giúp chia sẻ dữ liệu
Sau khi build image, anh em chỉ có thể chia sẻ những thông tin mà anh em đã copy vào đó từ trước.

Sau khi dev một cái web và build image, anh em chỉ có thể lưu source code ở trong đó. Còn khi anh em chạy image đó, web được dựng và hoạt động một thời gian, tất cả những dữ liệu được tạo ra, ví dụ những dữ liệu đẩy vào trong database thì sẽ không được lưu lại vào image.

Anh em mà chạy cái image ấy ở một nơi khác thì dữ liệu không được lưu lại bên trong, chỉ giống với mặc định ban đầu mà thôi. Giải pháp cho vấn đề này là mount volume, nhưng cũng vẫn phải chạy trên cùng một hệ thống lưu trữ dữ liệu đó mới được.

### d. Lập trình khó khăn
Để lập trình trên Docker cũng là một điều khá khó khăn, vì nó không có giao diện. Do vậy một vài kĩ thuật hay ho ra đời để phục vụ lập trình trên hệ thống remote, đó là `Remote Dev` và `Remote Debug`.

Trên đây là bài trình bày về tác dụng và điểm yếu của Docker đối với sinh viên trong quá trình học tập. Tất cả đều là ý kiến chủ quan của mình, có thể không giống với rất nhiều tài liệu về docker nên khuyến khích độc giả đọc với mục đích tham khảo.