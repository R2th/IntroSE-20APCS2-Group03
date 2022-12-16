Chào các bạn, hôm nay mình xin giới thiệu với các bạn các bước để cài đặt hoàn thiện môi trường cho Selenium Webdriver trên Eclipse. Chắc hẳn đối với những bạn mới tìm hiểu về Automation testing thì Tool hỗ trợ đặc biệt được giới thiệu rất nhiều trên internet đó chính là bộ công cụ hoàn toàn miễn phí nhà Selenium bao gồm: Selenium IDE, Selenium RC, WebDriver, Selenium Grid. Năm 2008, Selenium team đã quyết định gộp Selenium RC và WebDriver để tạo ra Selenium 2 với nhiều tính năng mạnh mẽ hơn, mà hiện nay phần lớn các project Selenium đều sử dụng. Tuy nhiên, trong bài bài này mình chỉ giới thiệu cho các bạn về Selenium Webdriver, chắc chắn làm theo hướng dẫn của mình thì các bạn sẽ cài đặt toàn bộ môi trường, thư viện cho Selenium thành công. Mình sẽ không giới thiệu về  các khái niệm liên quan đến Selenium, vì cái này các bạn tự google search sẽ ra rất nhiều, đọc mỏi mắt cũng không hết hehe.


Các bạn có thể tham khảo ở một số link sau để hiểu sâu hơn về Selenium nhé:

**1**.Trang chủ: https://www.seleniumhq.org/ trang này rất hay bao gồm tất cả các file để download và toàn bộ document từ beginer đến master :))



**2**.Kênh Youtube: https://www.youtube.com/watch?v=fZhwpqKcEQc&list=PLyGqUe6Oa_5Elc-Dv9jPzHKDx-m2GvMOd đây là loạt video hướng dẫn viết test script kiểu step by step nên rất dễ học cho các bạn tự học mà không có thầy =))


Tiếp theo, không lê la nữa mình sẽ đi vào nội dung chính ngay và luôn đây.
Các bạn đều biết muốn viết code thì các bạn phải có phần mềm để chạy thử code, tương tự như vậy muốn test script chạy thì các bạn cũng phải cài đặt môi trường cho nó. Vậy làm sao để biết đã cài đặt đủ chưa? Có thiếu thư viện nào không? Cùng làm theo mình nhé :)

# I. Cài đặt Java Environment và Eclipse:
1.Cài đặt Java Environment, cái này cực kỳ đơn giản: 

Các bạn click link http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html 

Tick chọn  "Accept License Agreement"

Tiếp theo, là chọn bản phù hợp để tải về máy và cài đặt bình thường. Có một chút lưu ý, nếu quá trình cài đặt gặp lỗi các bạn có thể tham khảo ở link https://www.youtube.com/watch?v=Wp6uS7CmivE (nhưng thường sẽ rất dễ và không có lỗi gì ^^)

2.Cài đặt Eclipse:

Download tại https://www.eclipse.org/downloads/?  

# II. Down driver cho các trình duyệt:
1.  Chrome:
https://sites.google.com/a/chromium.org/chromedriver/downloads
2.  Firefox:
https://github.com/mozilla/geckodriver/releases
Các bạn nhớ nhớ chọn bản phù hợp với máy và hệ điều hành trước khi tải về nhé( tránh "râu ông nọ cắm cằm bà kia" máy dùng hệ điều hành Linux lại tải bản Windown về thì không dùng được đâu nha :))

***Note:***

Sau khi tải về máy thì Save vào một folder vừa để khoa học mà sau dễ tìm lại, lưu vào ổ D cho đỡ mất khi các bạn cài lại win nhé. Mình ví dụ như folder có tên D:\\SeleniumWebdriver
Bước tiếp theo khá là quan trọng đó là chèn đường dẫn D:\\SeleniumWebdriver vào path trong Enviroment System, nhớ đừng bỏ qua nhé:

![](https://images.viblo.asia/97de38b1-7895-4ab7-ae9b-7b33c0d206f7.png)

# III. Down selenium Webdriver:
1. Link: https://www.seleniumhq.org/download/

![](https://images.viblo.asia/3723f1da-12c3-4d50-8d65-43f5fe1f027f.png)

Nhớ lưu vào cùng folder D:\\SeleniumWebdriver ở trên nhé :)

***Note:***

Đa số các máy làm đến bước này là ok, nhưng mình có gặp một số trường hợp hơi khác và cần làm theo một bước nữa:
Khởi động Eclipse lên, tạo 1 project, sau đó click chuột phải vào project -> Build Path -> Configure Build Path -> Java Build Path -> Libraries -> Add External Jars. Chọn file các bạn vừa tải về ở bước III. 

Vậy là đã xong rồi đó :)
# IV. Demo open browser

Mình sẽ demo một chương trình Selenium đầu tiên và rất cơ bản sau khi cài đặt xong toàn bộ môi trường nhé. Các bạn xem video ở link dưới
https://www.useloom.com/share/d6b1f48188d9472896e659303687190f

Mình trình bày khá ngắn gọn và rõ ràng từng bước để các bạn thực hiện nên mong tất cả các bạn đều thực hiện thành công. Nếu có thắc mắc gì thì các bạn cứ comment ở dưới nhé, mình sẽ trả lời. Thank u !!!