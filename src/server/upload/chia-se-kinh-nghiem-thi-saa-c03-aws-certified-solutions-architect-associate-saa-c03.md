*Chào mọi người, mình vừa pass chứng chỉ SAA-C03 vừa qua nên muốn lan tỏa niềm vui cùng một số kinh nghiệm cho mọi người. Mình là người bắt đầu từ số 0, chưa có kinh nghiệm về cloud, task công việc cũng không đụng chạm đến, nhưng với nỗi niềm ham học hỏi, ~~bản chất đua đòi~~, mình đã tìm hiểu và may mắn gặt hái được chứng chỉ cloud đầu tiên.*

## 0. Tổng quan
*SAA vừa cập nhật phiên bản thi từ C02 lên C03 hồi đầu tháng 9/2022. Với C03 sẽ nhiều câu hỏi về độ vận dụng đưa giải pháp giúp giải quyết vấn đề thực tế hơn là lý thuyết. Mình biết sẽ có rất nhiều anh em đang lên kế hoạch chuẩn bị cho cột mốc này nên cũng xin mạn phép chia sẻ lại quá trình học và ôn thi sau đây.*

![](https://images.viblo.asia/8420d1b8-db19-4f9b-9a67-757386706094.png)

### Trường hợp của mình, quá trình ôn thi chia ra làm 2 giai đoạn, giai đoạn chuẩn bị kiến thức nền và giai đoạn luyện đề.

## 1. Chuẩn bị kiến thức

Vì bắt đầu từ con số 0 nên mình cần hiểu được những kiến thức cơ bản trước, may mắn là một số khái niệm về API Gateway, LoadBalancer, Naming server ,TLS/SSL , Container, Networking,.. đã được học từ trước nên cũng dễ lướt qua nhanh. 

Quá trình học kéo dài 2 tháng, mình đã lập plan cụ thể là 1 tháng rưỡi thôi tuy nhiên do tham lam đăng kí thêm khóa tiếng Nhật kaiwa, học song song nên không có hoàn toàn thời gian cho Cloud, ~~anh em đừng tham lam như mình~~.
Khóa học thì anh em có thể tham khảo nhiều nguồn, riêng mình, học khóa của sư phụ Stephane Maarek, ~~ai thi aws cũng sẽ nghĩ đến thanh niên này~~. Mình đọc trên reddit nghe nhiều người recommend khóa của Dojo, Cloudguru tốt hơn, tuy nhiên do  ~~lười~~ thấy Stephane đã cover đầy đủ rồi nên không nhất thiết học thêm 1 khóa nữa. Mọi người charge cho khóa học tầm 11 -12$ thôi (bỏ con tép bắt con tôm), nhớ canh thời gian giảm giá của Udemy thì còn giảm sâu nữa.

![image.png](https://images.viblo.asia/6a693b2b-bd8f-4ac6-bbc7-c41770bb25e1.png)

Khóa học khá dài tầm 30 tiếng, mỗi ngày học 1 tiếng sẽ mất khoảng 1 tháng. Nên làm lab nhiều vào để ghi nhớ và có kinh nghiệm hơn. Về lab mình recommend channel “Cloudmind" `https://www.youtube.com/c/Cloudemind` của 1 anh người Ziệc Nam, hướng dẫn chi tiết hơn cả Stephane (mọi người nên like và đăng kí để tạo động lực cho anh ấy ra thêm video).

*Nên học phong cách ghi chép, tóm tắt lại bằng sổ tay những thông tin quan trọng, vì sẽ rất hữu dụng khi luyện đề*.

![](https://images.viblo.asia/c2ec0840-f879-442b-9a8c-3c6d23f8d1db.jpg)

Đừng ngại mất tiền khi làm lab, đôi khi bạn sẽ mất 1-2 đô gì đấy trong suốt quá trình học, riêng mình tốn 16 đô do quên clean up dịch vụ khi thực hành xong =)). Cuối mỗi chương có các câu hỏi ôn tập, nên làm hết và hiểu, sẽ có vài câu trong đấy có mindset khá giống với đề thật.


**Kiến thức quan trọng**

Đề thi rải rác khắp các chương, tuy nhiên nên tập trung hiểu rõ vài chương quan trọng như **EC2, IAM, VPC, EBS, DB, S3, Serverless, Decoupling, Migrate to Cloud**,... Nên vừa học vừa đọc **blog** ` https://kungfutech.edu.vn/bai-viet/aws/gioi-thieu` để hiểu hơn, nó giúp tóm tắt và củng cố lại kiến thức của chương học . Mình thường học vào buổi nghỉ trưa ở quán coffee gần công ty.
(Recommend những nơi yên tĩnh để học, với mình là TheLab coffee ở bờ hồ sau công ty, yên tĩnh, nhạc jazz, ~~nhân viên xinh~~, đèn ~~mờ~~ vàng dễ đọc sách ghi chép).

## 2. Giai đoạn luyện đề

![image.png](https://images.viblo.asia/f2ddef54-7647-4cc8-bde9-1eb85172581c.png)

Giai đoạn luyện đề, bỏ ra thêm mớ tiền để mua thêm khóa luyện đề của Stephane, mua thêm của **Neal Davis**, Dojo. Với SAA-C03, trên reddit mọi người vote cho đề của Dojo nhiều nhất. 
Nếu để so sánh, theo ý kiến cá nhân của mình thì Davis giống real exam nhất, có vài câu như copy ra, mình trúng tủ được 2-3 câu gì đấy – **Davis > Dojo > Stephane**. Có nhiều câu hỏi nâng cao nằm ngoài kiến thức mà Stephane đã cover nên anh em chịu khó đọc thêm trên FAQ (Với mình vướng nhiều câu hỏi sâu về DynamoDB, trong khi Stephane chỉ overview về nó). 

Mình thi thử đề của Dojo thì trung bình là 7x- 8x% trong khi thi Davis chỉ 6x-7x%. Với những câu sai anh em nên xem lại description, tra thêm **cheatsheet** `https://tutorialsdojo.com/comparison-of-aws-services/`, Dojo có bảng so sánh các dịch vụ dễ nhầm lẫn rất hay, bị hỏi rất nhiều trong exam. ***Nếu anh em cũng đạt số điểm với range như thế thì hãy tự tin thi thật, anh em đủ khả năng pass rồi đấy***. Lưu ý đề thi thật gồm 65 câu (50 câu lấy điểm+ 15 câu khảo sát ngẫu nhiên không tính điểm), multi choice chỉ tính đáp án đúng, nên ae có nhỡ chọn đáp án phụ sai cũng ko bị trừ điểm. Khả năng pass là rất cao so với practice test trên udemy.

Hàng miễn phí thì mọi người có thể lên youtube, channel “Cloud Guru” sẽ có nhiều clip sửa đề, tuy nhiên vì hàng miễn phí nên chất lượng cũng không so được với các khóa udemy, có 1 vài câu sửa bị sai. Nhưng nếu anh em tìm ra được thì anh em không sợ gì nữa =))

## 3. Đăng ký thi

Mình đăng kí thi ở PearsonVUE (sẽ được thêm 10p) nên thi ở trung tâm rồi về, thi ở nhà sẽ nhiều quy định hơn, dễ đánh rớt anh em, một điều anh em lưu ý, chỉ có thể đăng kí thi tối thiểu thời gian trước 48 giờ, mình định thi thứ 5 nhưng chưa đủ thời gian nên phải đăng kí thứ 6. Thi giờ hành chính theo ca, thứ 7 CN họ off, nên anh em phải xin nghỉ 1 buổi để dự thi.

Các nước non-native English sẽ được cộng thêm 30 phút, tuy nhiên mình không lấy thêm, do thời gian dài lắm rồi, mình làm xong còn doi ra tận 30p để check flag  =)). Các năm gần đây, sau khi thi xong sẽ không còn báo kết quả ngay, anh em phải chờ tối đa 5 ngày để kết quả trả về. Với mình thì khoảng 6 tiếng, mình thi xong lúc 11h đến khoảng 6 giờ chiều là có kết quả trả về mail rồi.

![image.png](https://images.viblo.asia/d679d181-d6b7-4156-9660-637b1e7a15d6.png)

##  4. Kết

Sau cùng, anh em nên lên reddit để đọc thêm kinh nghiệm thi của những người đi trước, kể cả những topic thi rớt. Với mình, mình học được nhiều thứ quan trọng từ kinh nghiệm bị đánh rớt hơn là từ những người thi đỗ lần đầu. Nếu anh em có chẳng may bị đánh rớt thì cũng đừng bận tâm, hãy check lại bảng điểm xem phần nào mình thiếu sót và cải thiện hơn, SAA không hề dễ, ai cũng hiểu điều đó, nên việc tạch lần 1 lần 2 là chuyện bình thường. **Chúc anh em may mắn** ^^.