*Bài này mình làm cũng khá lâu rồi mà quên đưa lên Viblo. (bow)*

Trong quá trình làm dự án, bỗng chị team lead QA có hỏi: 
“mọi người ai có kinh nghiệm test performance trên WEB và APP không nhỉ ?
Em/chị thì đang test đo perfomance search trên WEB bằng F12 của browser thôi
Còn của APP thì chưa biết”
Nghe rất quen và nhớ ra là đã từng test performance trên App rồi, nhưng qua thời gian đã quên khá nhiều, thế nên quyết định đây cũng là cơ hội tìm hiểu lại và nâng cao thêm vốn hiểu biết.
Tìm hiểu về cách tạo test script cho Mobile bằng cách recording trên JMeter

Vậy câu hỏi là làm sao có thể giả lập được Mobile ở trên JMeter? Mobile cũng giống như Computer, khi thực hiện các thao tác thì bên trong nó sẽ thực hiện đẩy các request lên server yêu cầu xử lý, server sẽ phải xử lý và trả về dữ liệu cho Mobile hiển thị các kết quả. Như vậy ở đây để tạo test script trên mobile, chúng ta sẽ phải biết được trên các thiết bị của mình đã thực hiện gửi những request nào lên server để xử lý.

Sẽ có 2 cách:

* **Cách 1**: Tìm cách nào đó để biết được Mobile đã gửi những request nào lên server, sau khi đã có thông tin thì thiết lập nó ở trên JMeter để mô phỏng.
* **Cách 2**: Trong nội bộ team QA đã có vài bài Seminar hướng dẫn tạo test script Web Application bằng cách recording trên JMeter thì ở trên JMeter hoàn toàn có thể làm tương tự để recording trên Mobile.
Và tất nhiên cách 2 sẽ đơn giản hơn nhiều. Let’s go......

# Bước chuẩn bị
## Network (Mạng)
Phải đảm bảo rằng máy tính đang cài đặt JMeter và Mobile đang cùng kết nối vào một mạng (tốt nhất là nên sử dụng chung cùng 1 wifi).
Sau khi đã cùng kết nối chung 1 mạng, ở trên máy tính hãy kiểm tra thông tin IP
* Ở trên MacOS: mở Terminal (Command + Space) sau đó gõ ifconfig
![](https://images.viblo.asia/43c6c10a-05a6-4389-bcb1-b4d2d1cf89ad.png)

* Ở trên Windows: mở Command Line (Window + R) hoặc search cmd, sau đó gõ ipconfig
![](https://images.viblo.asia/9ff0d064-a07a-4eca-9803-1ac164faea25.JPG)

*  Sau khi đã lấy được IP, hãy lưu lại nó để chút nữa sẽ sử dụng đến. Ở đây mình sẽ thực hiện recording trên máy MacOS với IP 192.168.1.10. Ở trên Windows hoàn toàn tương tự (nhưng vì là máy bàn nên ko kết nối wifi được nên mượn tạm máy MAC của vợ :D)

## JMeter
**Bước 1**: Thực hiện mở JMeter (hiện tại đang sử dụng JMeter version 5.1.1).
Ở trên thanh toolbar của JMeter, click vào Templates (icons 2 quyển sách nằm ở phía góc trên cùng bên trái của màn hình)

![](https://images.viblo.asia/fee232ff-1469-453f-b1fa-d2fde3bf5b47.jpg)

**Bước 2**: Sau khi click vào button Templates sẽ có 1 pop-up hiển thị, ở trên select box Select Template click vào và chọn đến Recording, sau đó click vào button Create.
![](https://images.viblo.asia/02bb8645-7fab-4fa9-ade6-66fa41c20fb3.jpg)

**Bước 3**: Sau khi click vào button Create, sẽ xuất hiện thêm 1 popup nữa để bạn điền các thông tin về trang web chuẩn bị thực hiện tạo test script. Ở đây mình sẽ dùng trang https://sun-asterisk.vn/ để demo, chúng ta sẽ điền thông tin trang web sẽ thực hiện vào trong popup này.
* hostToRecord: là domain của trang web cần viết script
* recordingOutputFile: là tên của file log ghi lại thông tin request, response khi chúng ta thực hiện recording, có thể đặt tên tuỳ ý bạn.
* schemeToRecord: Protocol của trang web thực hiện viết script (HTTP/HTTPS)
![](https://images.viblo.asia/59051871-abab-4749-a41a-fd51711e2ecf.png)

Ngay sau khi click vào button Create, JMeter sẽ tạo sẵn cho chúng ta 1 template có thể thực hiện recording như bên dưới:
![](https://images.viblo.asia/566d155b-d853-4a9d-8d42-4b7a2da14e7f.jpg)

Trong template của JMeter Recording đã tạo sẵn có các elements sau:
* Test Plan: Bất cứ test script nào trong JMeter đều được nằm trong Test Plan
* User Defined Variables: Chứa các biến do người dùng define, trong đây sau khi tạo xong JMeter đã đưa thông tin chúng ta đã điền ở bước 3 vào đây với 2 biến là host và scheme.
![](https://images.viblo.asia/27440368-d776-4efc-86f2-30bfbeaf5cc3.jpg)

* HTTP Request Default: Element này đưa các thông tin của đường dẫn như protocol, domain, port của trang web, nếu có thay đổi chỉ cần thay đổi 1 lần ở đây mà không cần phải vào từng request (với điều kiện các request con phải trống). Ở trong template recording của JMeter cũng đã điền cho chúng ta thông tin đã điền ở bước 3.
![](https://images.viblo.asia/79ba891c-9234-43ac-b809-71abae7ebfe8.jpg)

* HTTP Cookie Manager: Giúp người dùng mô phỏng tương như như Cookie của Browser.
* Thread Group: tương tự như là 1 test suite, sẽ control kịch bản test trong JMeter.
* Recording Controller: là 1 Controller Element của JMeter, default các request sau khi được recording sẽ nằm bên trong Element này.
* View Result Tree: là 1 Listener chứa kết quả khi chạy các request trong script.
* HTTP(S) Test Script Recorder: Tác nhân chính để thực hiện recording. HTTP(S) Test Script Recorder trên JMeter chúng ta sử dụng port 8888 để thực hiện recording.
![](https://images.viblo.asia/ce87b6bd-d9e7-447a-b245-2c174252fb69.jpg)

* View Result Tree nằm bên dưới HTTP(S) Test Script Recorder: là nơi chứa thông tin của các request trong quá trình thực hiện recording.

## Certificate (Chứng chỉ)
Di chuyển đến đến folder bin của JMeter ($JMETER_HOME/bin) sau đó tìm file ApacheJMeterTemporaryRootCA.crt. Nếu không tìm thấy file này thì hãy quay lại JMeter, tại phần HTTP(S) Test Script Recorder thực hiện click button Start, lúc này Certificate sẽ được tạo ra và bạn có thể ấn Stop luôn để tạm dừng việc recording (chúng ta vẫn chưa đến bước này ). Cách này áp dụng đối với trường hợp chưa có certificate hoặc certificate bị hết hạn.

***Lưu ý**: File ApacheJMeterTemporaryRootCA.crt sẽ có thời gian hợp lệ trong một khoảng thời gian (mặc định là 7 ngày), để chắc chắn certificate chưa bị hết hạn, hãy click vào file này trong folder bin để kiểm tra thời hạn sử dụng của nó nhé.*
![](https://images.viblo.asia/0854a3f5-1fef-492f-87a0-7a6e51375c1b.png)

Sau khi có file ApacheJMeterTemporaryRootCA.crt, làm cách nào nhanh nhất để lưu file này để có thể dễ dàng download nhất (có thể qua mail hoặc drive...)
# Thiết lập ở trên Mobile
***Note***: *Trên thiết bị Mobile của bạn, đảm bảo đã thực hiện thiết lập mật khẩu khoá màn hình*
## Android
Ở đây mình đang sử dụng thiết bị Samsung Galaxy S9+ đang chạy Android version 9.0

**Bước 1**: Download về chứng chỉ đã thực hiện gửi Certificate ở bước trên ở bước 1.3. Certificate.
Sau khi download file về, click vào file vừa down, máy sẽ yêu cầu nhập tên của chứng chỉ. Phần này các bạn có thể điền tên theo tuỳ thích sau đó click vào OK.
![](https://images.viblo.asia/1a7f2167-8ebf-412b-a786-9bf19563efef.jpg)

Xuất hiện màn hình yêu cầu nhập mật mã máy, thực hiện nhập. Lúc này máy sẽ thông báo cài đặt thành công.

**Bước 2**: Cài đặt wifi
Cài đặt Proxy Thủ công và điền vào thông tin vào bên dưới như sau:
* Máy chủ: điền IP máy tính của bạn đang sử dụng JMeter mà chúng ta đã thực hiện sau bước 1.1. Network (192.168.1.10)
* Cổng: điền thông tin của Cổng đã thiết lập ở HTTP(S) Test Script Recorder trên JMeter đã thực hiện ở bước 1.2. JMeter
Sau khi thực hiện điền thông tin trên click vào Lưu. Đến đây chúng ta đã hoàn thành việc thiết lập ở trên thiết bị Android. (Hình bên dưới)
![](https://images.viblo.asia/9c4d00be-a047-49f8-8f8b-219c3d7d8091.jpg)

## iOS
Ở đây mình đang sử dụng thiết bị iPhone XR đang chạy iOS 13.1.3

**Bước 1**: Cũng giống như trên Android, hãy download về chứng chỉ đã thực hiện gửi Certificate ở bước trên ở bước 1.3. Certificate.

**Bước 2**: Sau khi download Certificate về, click vào file vừa tải, lúc này sẽ xuất hiện màn hình thông báo đã tải về hồ sơ thành công.

![](https://images.viblo.asia/e99a5060-c284-4561-8e75-63b3cefe5e7b.png)

**Bước 3**: Vào cài đặt, click vào Đã tải về hồ sơ

![](https://images.viblo.asia/7a5cc568-68fa-445a-a8be-36b20c1d40f5.png)

**Bước 4**: Lúc này sẽ xuất hiện màn hình để cài đặt chứng chỉ, click vào Cài đặt sau đó nhập mật khẩu của điện thoại.

![](https://images.viblo.asia/ba26ed65-02ff-48d7-9e24-0dc5bad24653.png)

Xuất hiện màn hình Cảnh báo, tiếp tục click vào Cài đặt
![](https://images.viblo.asia/5387014a-9971-4e59-9c5a-567edcc474aa.png)

Sau khi cài đặt xong, lúc này sẽ xuất hiện màn hình thông tin của chứng chỉ kèm theo tick xanh thông báo Đã xác minh. Lúc này bạn có thể click Xong và làm bước tiếp theo.
![](https://images.viblo.asia/6b4de975-8bfc-48fb-bea4-bb4907c2f3fe.png)

**Bước 5**: Trên thiết bị iOS, vào Cài đặt > Cài đặt chung > Giới thiệu và kéo xuống dưới cùng tìm đến Cài đặt tin cậy chứng nhận

![](https://images.viblo.asia/adcabe93-3115-4792-a800-f6429939699f.png)

Xuất hiện màn hình Cài đặt tin cậy chứng nhận, thực hiện bật tin cậy cho JMeter bằng cách gạt sang phải (xuất hiện màu xanh) như hình, sau đó ấn Tiếp tục
![](https://images.viblo.asia/b9d624c7-b547-43ac-8968-a4ccfc1bbc12.png)

Hoàn thành việc cài đặt chứng chỉ cho JMeter.

**Bước 6**: Cài đặt wifi
Cài đặt Proxy Thủ công và điền vào thông tin vào bên dưới như sau:
* Máy chủ: điền IP máy tính của bạn đang sử dụng JMeter mà chúng ta đã thực hiện sau bước 1.1. Network (192.168.1.10)
* Cổng: điền thông tin của Cổng đã thiết lập ở HTTP(S) Test Script Recorder trên JMeter đã thực hiện ở bước 1.2. JMeter
Sau khi thực hiện điền thông tin trên click vào Lưu. Đến đây chúng ta đã hoàn thành việc thiết lập ở trên thiết bị iOS. (Hình bên dưới)
![](https://images.viblo.asia/cf69814c-8eb7-48fb-84a7-0ccfc0aa3078.png)

Đến đây là chúng ta đã xong công việc thực hiện thiết lập ở trên thiết bị iOS.
# Recording
Sau khi đã thiết lập ở trên các thiết bị mobile tương ứng, chúng ta hãy thử bật Trình duyệt (Browser) lên và vào 1 trang web bất kì, sẽ thấy màn hình tương tự như sau:
![](https://images.viblo.asia/bc3dfa7f-69ed-44cf-b5d7-1b6d3b4dac97.jpg)

Mọi người cứ yên tâm, nếu gặp tình trạng như trên chứng tỏ chúng ta đã thiết lập đúng. Lý do là bởi vì trên JMeter chúng ta chưa thực hiện mở Proxy. Hãy quay lại máy tính, mở màn hình HTTP(S) Test Script Recorder và click vào button Start
![](https://images.viblo.asia/5777854e-751c-4a44-a3da-d5325cdabdcd.png)

Sau đó, ở trên trình duyệt của thiết bị Mobile, thực hiện vào các bước ở trang web mà chúng ta muốn recording. Ở đây mình thực hiện vào trang web https://sun-asterisk.vn/ và làm các bước sau:
1. Vào trang chủ
2. Click menu bar -> Click link Cơ hội nghề Nghiệp
3. Click Sun* logo để về trang chủ
***Note**: Ở đây trong phần URL Pattern to Include ở HTTP(S) Test Script Recorder mình thực hiện điền: “`sun-asterisk.*`"
![](https://images.viblo.asia/41e1caac-9d25-4e90-a6ff-5177fbfa3e14.png)

Sau khi Click vào Start, sẽ hiển thị pop-up:
![](https://images.viblo.asia/7c17c529-f995-4fbd-b54d-625e0ff757f9.png)

Đây chỉ là dòng thông báo chứ không phải báo lỗi gì cả, nên mọi người đừng lo. Bên cạnh đó JMeter sẽ tự sinh ra cho chúng ta 1 Certificate có hiệu lực trong 7 ngày tên là ApacheJMeterTemporaryRootCA.crt (mình đã đề cập trước đó). Mọi người cứ click vào button OK và tiếp tục recording thôi, sau khi Click OK xong sẽ xuất hiện popup như bên dưới (Từ JMeter version 5.0 bắt đầu có thêm popup này):
![](https://images.viblo.asia/23e2de42-b72c-4d8d-b7f9-4bef5351743b.png)

Tại popup này, mặc định sẽ hiển thị HTTP Sampler settings là Transaction name, đây là controller giúp các bạn có thể “nhóm” các request được sinh ra từ 1 click lại thành 1 Transaction. Ở đây các bạn có thể điền tên của transaction tương ứng với thao tác bạn vừa thực hiện. Ở kịch bản recording này mình sẽ làm thứ tự các bước sau đây:
1. Vào trang chủ -> Home
2. Click link Cơ hội nghề Nghiệp -> Career opportunities
3. Click Sun* logo để về trang chủ -> Home
Mọi người sẽ lần lượt thực hiện, điền tên transaction vào popup Recorder ở trên, sau đó thực hiện các thao tác nghiệp vụ để recording.
![](https://images.viblo.asia/2896a16c-5305-4396-af95-20892106e8d1.png)

Sau khi kết thúc, click vào button Stop trong popup Recorder để hoàn tất. Và bây giờ mọi người quay về màn hình JMeter, click mũi tên vào Element Recording Controller sẽ thấy các request các bạn thực hiện đã được đưa vào JMeter.
![](https://images.viblo.asia/a0bea283-443c-4b12-8fd0-af74adb3accf.png)

Click vào View Result Tree bên dưới HTTP(S) Test Script Recorder mọi người sẽ thấy toàn bộ các request được sinh ra trong quá trình bạn thực hiện recording, như hình ảnh dưới sẽ có rất nhiều request và không thấy một vài request này xuất hiện trong test script của chúng ta, vì sao vậy? Ở trên chúng ta đã thực hiện thiết lập chỉ lấy những request có domain là sun-asterisk.* nên những request này sẽ không được đưa vào test script.
![](https://images.viblo.asia/f8af30b6-c95b-4461-a20e-1eb638582cf0.png)

Như vậy, mình đã hoàn thành việc hướng dẫn mọi người thực hiện recording trên Mobile đối với JMeter. Ở ví dụ trên mình đã demo việc recording 1 web trên browser, tuy nhiên nếu các bạn cần vẫn có thể thực hiện ở trên các ứng dụng của mobile bình thường như trên. (Chi tiết mình sẽ thực hiện vào phần sau, và đưa ra những lỗi thường gặp cũng nhưng cách khắc phục)