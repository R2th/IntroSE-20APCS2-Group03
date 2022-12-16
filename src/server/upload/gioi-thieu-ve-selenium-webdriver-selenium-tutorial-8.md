### Giới thiệu về tool test Selenium Webdriver
Trong những loạt bài trước đó chúng ta đã cùng tập trung tìm hiểu cũng như nghiên cứu về về tính năng và các khía cạnh khác của Selenium IDE. Từ những chức năng cơ bản của tool, chúng ta đã tạo ra một vài những script đơn giản và cách xác định các phần tử web trên trình duyệt Firefox, Chrome, IE.

Bây giờ, sau khi đã thành thạo với Selenium IDE, chúng ta sẽ chuyển sang làm quen với việc tạo ra các kịch bản kiểm thử ở mức cao hơn bằng tool Selenium Webdriver. Đây được coi là một trong những công cụ kiểm thử tự động khá thú vị.

Selenium Webdriver được coi như là một trong những tool test auto mạnh mẽ và thông dụng nhất của bộ công cụ Selenium. WebDriver được xem như là phiên bản mở rộng sau khi cải tiến các điểm không cần thiết cũng như hạn chế của Selenium RC, như không yêu cầu máy chủ Selenium phải bắt đầu trước khi thực thi các kịch bản test. Cũng không giống như Selenium IDE, phiên bản WebDriver tương thích với nhiều trình duyệt và nền tảng hơn hẳn. 

Selenium RC khi kết hợp với WebDriver API được biết đến như Selenium 2.0. Selenium được phát triển nhằm mục đích hỗ trợ các trang web động và có gọi Ajax. Nó cũng hỗ trợ đa dạng các trình điều khiển để thực thi kiểm thử di động dạng web. 

### Kiến trúc của WebDriver

![](https://images.viblo.asia/3305819c-e6a7-4351-b939-d8d373526671.png)

WebDriver trực tiếp gọi tới trình duyệt web và toàn bộ kịch bản kiểm thử được thực thi theo cách này. WebDriver sử dụng sự hỗ trợ, khả năng của trình duyệt để tự động hóa.

Khác với Selenium RC, Selenium WebDriver không nhất thiết yêu cầu Selenium Server phải bắt đầu trước khi thực thi kịch bản kiểm thử. Người dùng có thể tận dụng lợi thế này. Việc có hoặc không yêu cầu Selenium Server tùy thuộc vào mong muốn thực thi kiểm thử của họ trên cùng một máy tại nơi đặt trình duyệt.

**Một số trường hợp ngoại lệ cần có Selenium Server khi sử dụng Selenium WebDriver:**
* Khi người dùng mong muốn thực thi kịch bản test trên máy remote.
* Khi người dùng mong muốn thực thi kịch bản test trên HtmlUnit Driver - là một trình duyệt web nhưng không có giao diện đồ họa người dùng. Script sẽ được thực thi ngầm ở background mode và sẽ không có việc mở browser lên và tương tác trên đó.
* Khi người dùng muốn thực thi kịch bản test trên đa nền tảng.

WebDriver là một framework hướng đối tượng thuần túy và hoạt động trên layer của hệ điều hành. Nó sử dụng chính khả năng tương thích trực tiếp của trình duyệt để tự động hóa mà không cần đến bất cứ thiết bị ngoại vi nào. Với nhu cầu ngày càng tăng, nó đã dần trở nên phổ biến, có một cơ sở người dùng và không xa sẽ trở thành một trong những công cụ kiểm thử tự động với mã nguồn mở được sử dụng rộng rãi nhất. 

### Tính năng của Selenium WebDriver
1. **Tương thích với trình duyệt**

![](https://images.viblo.asia/18b63b43-76a5-4986-a0d4-26ce0383ca4d.jpg)
WebDriver hỗ trợ đa dạng các loại trình duyệt web và những phiên bản của nó. Từ những trình duyệt thông thường hiện nay như: Chrome, FireFox... cho đến những trình duyệt hiếm gặp như HtmlUnit. Điều này hoàn toàn không hề thấy ở những bản Selenium RC và Selenium IDE.

HtmlUnit Browser thực thi các kịch bản test tương tự như với các trình duyệt khác, chỉ ngoại trừ một thực tế là nó chạy ở chế độ Headless - chạy mà không cần mở trình duyệt. Do đó, người dùng sẽ không thể nhìn thấy kịch bản đang được thực thi như thế nào. Tuy nhiên việc này lại hỗ trợ tăng tốc độ chạy testcase, không cần cài đặt các trình duyệt và người dùng có thể sử dụng máy tính/ trình duyệt để làm các công việc khác mà không bị ảnh hưởng.

WebDriver cũng hỗ trợ việc kiểm thử trên di động với các trang dạng web. Do đó nó cung cấp AndroidDriver và IphoneDriver để thực hiện được việc kiểm thử trên di động.

Lưu ý: Một số trình duyệt web rất mới thì WebDriver không sẵn sàng hỗ trợ.

2. **Hỗ trợ ngôn ngữ**

Trong những bài hướng dẫn trước, chúng ta đã học về cách tạo ra kịch bản bằng việc sử dụng tính năng record - ghi và playback - phát lại. Chúng ta cũng thấy được cách để tạo ra kịch bản một cách thủ công bằng cách dùng các câu lệnh Selenese. Trong khi tạo ra các kịch bản test, chúng ta sẽ gặp nhiều ràng buộc khác nhau.

**Một số hạn chế/ràng buộc khi sử dụng Selenium IDE:**
* Không hỗ trợ việc lặp lại và câu lệnh điều kiện
* Không hỗ trợ vòng lặp
* Không hỗ trợ xử lý lỗi
* Không hỗ trợ test các kịch bản độc lập

Các hạn chế ở trên có thể được khắc phục hoàn toàn khi sử dụng ngôn ngữ lập trình. WebDriver tạo điều kiện cho người sử dụng được lựa chọn các ngôn ngữ lập trình khác nhau và tạo ra các kịch bản test của mình với chính ngôn ngữ được chỉ định.

**Selenium WebDriver hỗ trợ các ngông ngữ lập trình sau:**

![](https://images.viblo.asia/b70c1bed-2520-415c-9ef7-b02163698de7.jpg)

* Java
* C#
* PHP
* Pearl
* Ruby
* Python

Do đó người dùng có thể chọn bất kỳ 1 ngôn ngữ lập trình nào (trong số các ngôn ngữ được kể ra ở trên) dựa trên khả năng của mình và bắt đầu tạo ra kịch bản test.

3. **Tốc độ**

Khi so sánh với các tool khác của bộ công cụ Selenium, WebDriver trở thành tool có tốc độ nhanh nhất trong số đó. Việc giao tiếp không cần thông qua bất cứ thiết bị ngoại vi nào mà trực tiếp kết nối thẳng với trình duyệt tương tự như người sử dụng. Do đó, WebDriver tận dụng được khả năng tương thích với trình duyệt để tự động hóa.

![](https://images.viblo.asia/d0043d46-9e2c-49e4-aec0-10823a7c1809.jpg)

Các tool khác từ bộ công cụ Selenium giống như Selenium RC không giao tiếp trực tiếp với trình duyệt web. Thư viện Client sẽ giao tiếp với Server điều khiển Selenium - Selenium Remote Control Server và Remote Control giao tiếp với lõi Seleninum để có thể giao tiếp với trình duyệt web. Việc trải qua nhiều tầng giao tiếp như vậy làm giảm tốc độ thực thi của những công cụ này.

![](https://images.viblo.asia/b08fb6a3-f7c6-4820-a67d-6563749a2318.gif)

4. **Drivers, Methods and Classes**

WebDriver cung cấp một loạt các giải pháp cho một số các thách thức trong kiểm thử tự động. Nó giúp cho chúng ta xử lý các loại phần tử web phức hợp như checkbox, dropdowns và thông báo với sự trợ giúp của tìm kiếm động.

Với sự ra đời và phát triển của lĩnh vực di động, WebDriver API cũng đã lớn mạnh và giới thiệu một vài các kỹ thuật chủ chốt để bước chân vào chân trời này. WebDriver cho phép người dùng thực hiện kiểm thử các trang web trên thiết bị di động. Nó cung cấp hai trong số các drivers cần thiết để kiểm thử trên mobile
* AndriodDriver
* IphoneDriver

Hơn thế nữa, WebDriver API khá là đơn giản và dễ sử dụng. Nó không bao gồm các tập lệnh lặp lại. 

### Tổng kết
Trong bài hướng dẫn này, chúng ta đã cùng làm quen với Selenium WebDriver bằng những phác thảo cơ bản về kiến trúc, tính năng và giới hạn của nó. Dưới đây là một số những ý chính của bài viết:
* Bộ công cụ Selenium bao gồm 4 loại cơ bản: Selenium IDE, Selenium RC, WebDriver, Selenium Grid.
* WebDriver cho phép một người dùng có thể thực hiện kiểm thử tự động các dạng web. Và đó là một tool hoàn toàn khác biệt, có nhiều ưu điểm hơn Selenium RC.
* WebDriver hỗ trợ đa dạng các trình duyệt, ngôn ngữ lập trình và cả môi trường test.
* WebDriver tương tác trực tiếp với trình duyệt và sử dụng tính tương thích của nó để tự động hóa.
* Sự hỗ trợ của WebDriver không chỉ giới hạn ở ngoại vi của những hành động người dùng truyền thống. Thay vào đó, nó hỗ trợ cơ chế xử lý một cách hiệu quả các hành động phức tạp của người dùng với dropdowns, gọi Ajax, luân chuyển giữa các cửa sổ, điều hướng, xử lý các cảnh báo...
* WebDriver cho phép người dùng thực hiện test các dạng web trên thiết bị di động bằng cách sử dụng AndroidDriver và IphoneDriver.
* Khả năng gọi trực tiếp tới trình duyệt mà không cần tới bất kỳ sự can thiệp nào từ bên ngoài đã chứng minh WebDriver là công cụ có tốc độ nhanh nhất trong bộ Selenium.

Nguồn bài viết: https://www.softwaretestinghelp.com/selenium-webdriver-selenium-tutorial-8/