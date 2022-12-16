**1. Headless Browser là gì?**

Headless Browser là một trình duyệt web không có giao diện đồ họa người dùng. Headless Browser cũng giống như các trình duyệt khác, chỉ khác là không có UI. Khi thực thi Selenium tests thì những testcase sẽ được thực thi ngầm (thực hiện ở background mode) và sẽ không có việc mở browser lên và tương tác trên đó.

Một số Headless Browser phổ biến hiện nay có thể kể đến đó là:
* Headless Chrome
* PhantomJS
* SlimerJS
* TrifleJS
* HTMLUnit driver

**2. Những lợi ích khi sử dụng Headless Browser?**
*  **Cải thiện tốc độ và performance trong việc thực thi Selenium tests:** Việc sử dụng Headless Browser trong việc thực thi Selenium tests này sẽ không thực sự mở trình duyệt, chỉ đơn giản là thực hiện ngầm (thực hiện ở background mode). Do đó, các testcases sẽ được thực hiện nhanh hơn.
*  **Không cần cài đặt trình duyệt để thực hiện test:** Đối với khi chạy test trên các trình duyệt thì bắt buộc người dùng phải cài đặt trình duyệt tương ứng để chạy test. Tuy nhiên khi sử dụng Headless Browser thì người dùng không cần phải thực hiện việc cài đặt browser để thực thi test. Từ đó sẽ đơn giản hóa việc thiết lập môi trường test.
*  **Giúp bạn có thể làm những công việc khác:** Việc không sử dụng trình duyệt giúp cho bạn có thể sử dụng trình duyệt hoặc máy của bạn để làm bất cứ điều gì khác trong khi các testcasé chạy ngầm. Tiết kiệm thời gian giúp bạn có thể thực hiện các công việc khác thay vì cứ nhìn vào màn hình.

**3. PhantomJS là gì?**

- PhantomJS là một headless browser nên nó không có giao diện đồ họa người dùng (GUI). Nhưng vì PhantomJS cung cấp một API Javascript, nên điều này mới làm cho trình duyệt trở nên hữu ích. Ở bài này, tôi sẽ sử dụng PhantomJS để demo cho các bạn.

- Đầu tiên các bạn hãy download PhantomJS Driver về ở đường dẫn sau: http://phantomjs.org/download.html

- Sau khi download xong, bạn thực hiện giải nén, ở thư mục bin của thư mục giải nén các bạn sẽ thấy phantomjs binary executable file như trong hình:
![](https://images.viblo.asia/37997f72-ac45-43ef-8152-cfc7ffe8c616.jpg)

**4. Thực thi Selenium Tests bằng Headless Browser sử dụng PhantomJS:**

- Thực hiện download và import file phantomjsdriver-1.4.1.jar vào dự án. Các bạn có thể download tại đường links: https://mvnrepository.com/artifact/com.codeborne/phantomjsdriver/1.4.1 

     ![](https://images.viblo.asia/5b3aae3e-a473-4b3b-89b2-fc1b2e39b68e.jpg)

- Hoặc các bạn có thể download file này bằng Maven:
```
<dependency>
    <groupId>com.codeborne</groupId>
    <artifactId>phantomjsdriver</artifactId>
    <version>1.4.1</version>
</dependency>
```


- Để có thể sử dụng được Headless Browser, các bạn có thể tham khảo đoạn code sau:
```
		DesiredCapabilities caps = new DesiredCapabilities();
		caps.setJavascriptEnabled(true);
		caps.setCapability(PhantomJSDriverService.PHANTOMJS_EXECUTABLE_PATH_PROPERTY, "path to phantomjs binary executable file");	
		driver = new PhantomJSDriver(caps);
```

- Ở đoạn code trên, khi thực thi testcase, Selenium sẽ khởi tạo một Headless Browser để thực thi test. Nó sẽ không mở lên trình duyệt và chỉ thực thi test ở background mode:
![](https://images.viblo.asia/0f90f66d-2328-4739-a5ba-1c78cf6bb042.png)

Kết quả khi thực thi test trên Headless Browser:
![](https://images.viblo.asia/1782059f-d969-48f0-8d8f-cfc296b6f6bb.jpg)

Kết quả khi thực thi test trên Chrome Browser:
![](https://images.viblo.asia/b5047e7c-3a05-4d6f-9149-f3e0a5555da4.jpg)

**5. Kết luận:**
- Như hình trên thì tốc độ chạy nhanh hơn gần 2s (1 testcase) so với chạy chế độ non-headless, điều này cực kì hữu ích khi số lượng kịch bản test trong dự án lớn (vài trăm/ vài ngàn testcases), giảm thiểu thời gian run regression test và nhận được kết quả phản hồi sớm hơn
- Tuy nhiên không phải lúc nào Headless Browser cũng là sự lựa chọn tốt hơn bởi vì độ ổn định và chính xác của headless browser không cao/ nhiều trường hợp xảy ra bug trên headless browser nhưng ko tìm thấy trên non-headless browser.
- Vì vậy, tùy vào mục đích sử dụng, các bạn có thể chọn cho mình một giải pháp tối ưu nhất.

Tham khảo: https://www.guru99.com/selenium-with-htmlunit-driver-phantomjs.html