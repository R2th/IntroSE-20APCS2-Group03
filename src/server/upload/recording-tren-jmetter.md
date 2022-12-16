***Những gì bạn nhìn thấy khi vào một trang web cũng giống như phần nổi của tảng băng.***

![](https://images.viblo.asia/c54a86cf-9006-40ac-ac46-33b94fad5b7e.png)


Chúng ta truy cập vào trang web bằng 1 đường link tuy nhiên bên trong nó lại là cả một quy trình phức tạp. Rất nhiều request gửi lên server, request thì yêu cầu server trả về nội dung của link vừa gửi, request yêu cầu trả về hình ảnh, icon, màu sắc… với tất cả những yêu cầu này server sẽ phải làm việc và trả về cho client từ đó hiển thị nên một trang web hoàn chỉnh.

Như vậy, để tạo test script cho Web Application trên JMeter, chúng ta sẽ phải mô phỏng các request được bắn ra như trên để gửi lên server. Và Jmetter sẽ hỗ trợ chúng ta lấy các request đó qua tính năng Recording
Dưới đây mình sẽ hướng dẫn các bạn Recording bằng Jmetter với Firefox

**Bước 1:** Tất nhiên là bạn phải mở Jmetter lên rồi

**Bước 2:** Tạo "Thread group"
![](https://images.viblo.asia/3f7d4e75-964a-452f-999d-c76c84432055.png)

**Bước 3:** Ở đây mình dùng trang web http://jmeter.apache.org để test. Và ở bước này chúng ta điền thông tin trang web
![](https://images.viblo.asia/9779ddbb-05c1-4d89-bbde-e2e5d575a529.png)

**Bước 4:** Tạo test script recorder. Phần Global Setting là nơi chúng ta nhập cổng Post giao tiếp giữa Jmetter à Firefox. Ở đây mình để 8080, các bạn có thể để 8888 cũng được
![](https://images.viblo.asia/e1466318-09f2-46db-b032-10a500746dc2.png)

Sau khi tạo xong chúng ta nên tạo thêm mũ View Results tree để xem kết quả trả về
![](https://images.viblo.asia/229c0f84-6106-4d25-ba77-566866b30144.png)

 **Bước 5:** Một trang web có rất nhiều màn hình. Để lấy từng request cho mỗi màn chúng ta nên tạo ra các  bản recorde riêng và đặt tên theo tên màn hình.
 Ở đây mình test cho trang  http://jmeter.apache.org và muốn lấy  recorde lại các request của phần Download
 ![](https://images.viblo.asia/700a72c1-c3c1-43ba-8781-65fe7f5863f6.png)
 
 Mình sẽ tạo ra một Recording Controller và đặt tên là DownloadPage
 
 ![](https://images.viblo.asia/f48e1178-5b2f-4dae-bcfd-e1573ec2b736.png)
 
 Tổng quan thì mình đã tạo đầy đủ các phần của Jmetter. Bây giờ mình chỉ cần cấu hình Firefox nữa là xong
 ![](https://images.viblo.asia/8c11cf8f-5f5d-45ad-876c-e22294f7abfb.png)

**Bước 6:** Bật trình duyệt Firefox, click Menu -> Options

Sau đó bạn chọn General -> Network settings -> Settings… Và set như mình đây nhé. Port chính là con số bạn nhập ở Bước số 4

![](https://images.viblo.asia/66e94cd1-9268-447b-8173-0a2f48c9090f.png)

**Bước 7:** Sau khi thiết lập xong proxy trên Firfox, bạn click button Start ở HTTP(s) Test Script Recorder để bắt đầu chạy. Đây được hiểu là một element “kết nối” Jmeter và Browser, tức là khi chúng ta thực hiện các thao tác để recording thì nó có nhiệm vụ bắt các request được bắn từ browser và đẩy vào Jmeter. 

Lúc này bạn vào thư mục bin sẽ thấy file  ***ApacheJmeterTemporaryrootCA.crt*** được sinh ra.

**Bước 8**: Bạn mở trình duyệt  Firefox, click Options ở phần tìm kiếm bạn search từ khóa ‘certificates’ và click ‘View Certificates…’ và chọn tab Authorities > Import > folder bin của Jmeter > ApacheJmeterTemporaryrootCA.crt > click button Open

![](https://images.viblo.asia/fce09596-a724-4c58-8948-fee4ae2c9859.png)

![](https://images.viblo.asia/f7a563e8-3a05-4886-ae29-75e1b111282d.png)

Ngay khi thêm xong chứng chỉ  để HTTPS tin cậy bạn có thể thực hiện recording
![](https://images.viblo.asia/da8006e8-d787-470f-874f-0cf53bc0c228.png)

Và cuối cùng check các request trả về, và chọn các request bạn cần trong mục Download page

**Các trường hợp có thể gặp phải:** 

Sau khi chạy xong Jmetter quay trở lại Firefox có thể bạn sẽ gặp lỗi này. Đừng lo vì bạn đã thay đổi proxy của Firefox mà. Hãy đặt lại nó thôi
![](https://images.viblo.asia/dbf87f04-42e1-486c-9bca-236ae5456590.png)

Từ trình duyệt Firefox mở : Menu > Help > More Troubleshooting Information > Refresh Firefox
![](https://images.viblo.asia/7bfbce8e-1c2f-4c57-ab2a-a68752e343ec.png)


***Video tham khảo:***   https://m.youtube.com/watch?v=m4bxF756ZGw