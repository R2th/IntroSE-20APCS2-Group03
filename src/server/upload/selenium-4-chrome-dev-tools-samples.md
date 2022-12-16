## 1.  Chrome Dev Tools là gì? 

Chrome DevTools là một bộ công cụ dành cho nhà phát triển web được tích hợp trực tiếp vào trình duyệt Google Chrome. DevTools có thể giúp bạn chỉnh sửa trang nhanh chóng và chẩn đoán sự cố một cách nhanh chóng, điều này cuối cùng giúp bạn xây dựng các trang web tốt hơn, nhanh hơn.

## 2. Mô phỏng loại network

Bạn có thể mô phỏng các loại mạng khác nhau bằng cách sử dụng đoạn code dưới đây. Tất cả những gì bạn cần làm là thay đổi thông lượng tải xuống / tải lên và ConnectionType.
Bạn cũng có thể ngắt kết nối của trình duyệt Chrome và chạy thử nghiệm của mình bằng cách đặt tham số đầu tiên thành true trong phương thức emulateNetworkConditions.
Bạn có thể thay đổi các giá trị và xem thời gian tải thay đổi như thế nào.

```
@Test
  public  void emulateNetworkConditionTest(){
    chromeDevTools.send(Network.enable(Optional.of(1000000), Optional.empty(), Optional.empty()));
    chromeDevTools.send(
        emulateNetworkConditions(false,100,200000,100000, Optional.of(ConnectionType.cellular4g)));
    long startTime = System.currentTimeMillis();
    driver.navigate().to("https://www.swtestacademy.com");
    long endTime = System.currentTimeMillis();
    System.out.println("Load time is "+ (endTime-startTime));
  }
```

## 3. Ghi đè UserAgent

- User Agent (UA) là gì ? 
Trước tiên, để hiểu hơn về User Agents (UA) thì nó là một chuỗi nhận dạng của trình duyệt khi gửi yêu cầu đến Web Server (máy chủ web). Khi trình duyệt web của bạn truy cập 1 trang Web bất kỳ, trình duyệt web của bạn có thể gửi một HTTP Request bao gồm chuỗi UA đến Web Server. Nội dung của UA tùy thuộc vào trình duyệt web các bạn dùng, mỗi trình duyệt đều có riêng 1 chuỗi UA nhất định. Dể hiểu hơn, User Agents là cách để trình duyệt web nói với Web Server rằng: “Xin chào, tôi là Google Chrome trên Windows” hoặc “Chào, tôi là Firefox chạy trên Linux”.

Hiểu đơn giản, khi đăng nhập trang Facebook với trình duyệt Google Chrome thì Facebook sẽ nhận được thông tin rằng có một máy tính sử dụng trình duyệt website Chrome đăng nhập vào trang của họ, Facebook nhận biết thông tin này thông qua user agent.

Ví dụ chuỗi UserAgent : Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36

Vậy trong Selenium 4 ta sử dụng như thế nào ?
Hãy sửa đổi UserAgent và kiểm tra xem nó có hoạt động hay không. chromeDevTools sẽ gửi phương thức để lấy Network object làm tham số. Đối tượng đó có một phương thức gọi là setUserAgentOverride nhận đối số là chuỗi. Đối số này sẽ là chuỗi UserAgent mới của bạn.

```
 @Test
  public void userAgentOverride(){
    String fakeAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36";
    driver.navigate().to("https://www.whoishostingthis.com/tools/user-agent/");
    Assert.assertNotEquals(driver.findElement(By.cssSelector(".info-box.user-agent")).getText(),fakeAgent);
    chromeDevTools.send(Network.setUserAgentOverride(fakeAgent,
        Optional.empty(), Optional.empty()));
    driver.navigate().to("https://www.whoishostingthis.com/tools/user-agent/");
    Assert.assertEquals(driver.findElement(By.cssSelector(".info-box.user-agent")).getText(),fakeAgent);
  }
```

Vậy khi nào cần sử dụng UserAgent 

nếu bạn muốn thử nghiệm các ứng dụng web dành cho thiết bị di động và đó là lúc UserAgent phát huy tác dụng. Bạn có thể thay đổi trình duyệt của mình thành trình duyệt di động bằng cách cung cấp tác nhân người dùng di động.

```
 @Test
  public void webToMobileView(){
    String fakeAgent = "Mozilla/5.0 (Linux; Android 7.0; SM-G930V Build/NRD90M) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.125 Mobile Safari/537.36";
    chromeDevTools.send(Network.setUserAgentOverride(fakeAgent,
        Optional.empty(), Optional.empty()));
    driver.navigate().to("https://www.amazon.com");

```

## 4. Load Insecure Web Site(Tải trang web không an toàn)

Đôi khi, các trang web có vấn đề về SSL. Bạn cần chấp thuận rằng bạn muốn tiếp tục điều hướng trang web. Tuy nhiên, ChromeDevTools cho phép bạn chấp nhận cảnh báo đó một cách dễ dàng.

![](https://images.viblo.asia/28018e04-2242-435b-b80d-7fdc7c023cb7.png)

```
@Test
  public void loadInsecureWebsite() {
    chromeDevTools.send(Security.enable());
    chromeDevTools.send(Security.setIgnoreCertificateErrors(true));
    driver.get("https://expired.badssl.com/");
  }
```

Giờ đây, bạn có thể điều hướng trang mà không có bất kỳ trang cảnh báo nào.

Bài viết trên đây hy vọng sẽ hữu ích cho các bạn !

link tham khảo :  

https://www.swtestacademy.com/selenium-4-chrome-dev-tools-samples/