### 1/ Giới thiệu:
Trong kiểm thử tự động, nếu các phần tử không được tìm thấy bởi các thuộc tích như id, class, name, ... thì XPath trong Selenium WebDriver được sử dụng để tìm một element trên trang web. Trong nội dung bài này, mình sẽ giới thiệu các bạn sử dụng tool ChroPath trong việc hỗ trợ xác định XPath một cách chính xác và nhanh nhất.

Trước khi vào tìm hiểu ChroPath thì ta cùng tìm hiểu sợ lại khái niệm của XPath. Nói nôm na XPath được định nghĩa là đường dẫn XML. Nó là một cú pháp hoặc ngôn ngữ để tìm kiếm bất kỳ phần tử nào trên trang web bằng cách sử dụng biểu thức XML path. XPath được sử dụng để tìm vị trí của bất kỳ phần tử nào trên trang web bằng cách sử dụng cấu trúc DOM HTML. 

Định dạng cơ bản của XPath được giải thích bên dưới:
![](https://images.viblo.asia/f2a04a52-0768-49e8-9ae0-0c10d305fec0.png)

### 2/ Cài đặt và khởi động ChroPath:
**Các bước cài đặt ChroPath:**

+ Mở trình duyệt Chrome và truy cập vào link sau:
https://chrome.google.com/webstore/detail/chropath/ljngjbnaijcbncmcnjfhigebomdlkcjo?hl=en
+ Chọn vào nút “Add to Chrome”
![](https://images.viblo.asia/030fcc1e-f0ae-4ac9-8b13-07ed467137ab.PNG)

+ Chọn vào nút Add extension
![](https://images.viblo.asia/ecb43c54-3acd-44d4-a093-09cf1bfacbb4.PNG)

+ Tắt và khởi động lại trình duyệt, sẽ có biểu tượng ChroPath trên thanh tab bar của trình duyệt
![](https://images.viblo.asia/18c36c73-4c3a-4028-915e-22f68e16e362.PNG)

**Khởi động ChroPath:**
+ Để khởi động ChroPath thì ta Click chuột phải và chọn Inspect.

+ Tại Chrome Dev Tools panel, ta chọn ChroPath
![](https://images.viblo.asia/41b6c683-30fa-4607-8473-c40d96078212.PNG)

### 3/ Tìm hiểu các tính năng của ChroPath
Sau khi cài đặt thành công ChroPath thì chúng ta cùng nhau vọc tool này nhé: 

Chropath sẽ hỗ trợ chúng ta các tính năng sau:

**3.1 Xác định XPath tương đối:**

+ Khởi động ChroPath
+ Chọn giá trị ở ô **#1** option: `rel XPath`
+ Select phần tử mà chúng ta muốn lấy giá trị XPath tương đối

![](https://images.viblo.asia/42636422-36e0-4ee2-beb1-56a4926e9cc3.PNG)



Kết quả ta thấy được ChroPath sẽ tự sinh ra một giá trị XPath tương đối cho duy nhất một phần tử mà chúng ta muốn tìm kiếm.
Ta có thể nhận thấy:
* **#2**: Hiển thị giá trị Xpath được sinh ra dưới dạng tương đối, và ta có thể copy được giá trị này
* **#3**: Hiển thị giá trị thẻ element trong DOM mapping với Xpath
* **#4**: Hiển thị highlight element trên UI mapping  với Xpath
* **#5**: Hiển thị highlight element trên DOM mapping  với Xpath

**3.2 Xác định XPath tuyệt đối:**

+ Khởi động ChroPath
+ Chọn giá trị ở ô **#1** option: `abs XPath`
+ Select phần tử mà chúng ta muốn lấy giá trị XPath tương đối
![](https://images.viblo.asia/533bc35e-86bd-402f-8a85-be4720367ab4.PNG)


Kết quả ta thấy được ChroPath sẽ tự sinh ra một giá trị XPath tuyệt đối cho duy nhất một phần tử mà chúng ta muốn tìm kiếm. Tương tự như trên, ở **#2** sẽ hiển thị giá trị Xpath được sinh ra dưới dạng tuyệt đối

**3.3 Xác định CSS selector:**
+  Khởi động ChroPath
+ Chọn giá trị ở ô **#1** option: `CSS selector`
+ Select phần tử mà chúng ta muốn lấy giá trị CSS

![](https://images.viblo.asia/c5b05182-d01b-42e3-899f-319f96d56a65.PNG)


Kết quả ta thấy được ChroPath sẽ tự sinh ra một giá trị CSS cho duy nhất một phần tử mà chúng ta muốn tìm kiếm. Tương tự như trên, ở **#2** sẽ hiển thị giá trị Xpath được sinh ra dưới dạng cssSelector

**3.4 Tự viết một XPath:**
+ Khởi động ChroPath
+ Chọn giá trị ở ô option: `selectors`
+ Nhập giá trị XPath vào textbox bên cạnh: ví dụ ta sẽ nhập `//button[contains(text(),'Submit')]`
![](https://images.viblo.asia/0fa7ab07-7f4d-4e4f-8850-2eb0f22f7895.PNG)

Kết quả ta thấy được ChroPath sẽ trả về cho ta một phần tử element là button **"Submit"** trên UI tương ứng với giá trị XPath chúng ta đã nhập.  Ngoài việc tự động generate ra Xpath, ChroPath còn có thể cho ta nhập các giá trị Xpath của chúng ta tự define và sẽ giúp chúng ta kiểm tra cú pháp của Xpath cũng như giúp chúng ta biết được xpath đó sẽ mapping với element nào trên UI.

Trường hợp nhập sai cú pháp XPath thì sẽ hiển thị lỗi màu đỏ ở texbox nhập:
![](https://images.viblo.asia/5d5d7136-43e0-4d6e-8ed0-f67a8c654dcd.PNG)

### **4/ Một số tính năng hữu ích khác khi sử dụng ChroPath:**

+ Nếu có nhiều phần tử trên trang web được tìm thấy ứng với giá trị XPath/CSS được nhập, ChroPath sẽ tự scroll window đến phần tử đầu tiên tương ứng với XPath/CSS được tìm thấy.
+ Nếu có nhiều phần tử trên trang web được tìm thấy ứng với XPath/CSS được nhập. ChroPath sẽ hiển thị tất cả các phần tử này và theo thứ tự xuất hiện. Trên trang web, ứng với mỗi phần tử tương ứng sẽ xuất hiện đường viền màu xanh nét đứt xung quanh để làm nổi bật phần tử này.
+ Nếu bạn di chuột vào bất kỳ phần tử tương ứng nào phù hợp trong tab ChroPath, đường viền nét đứt màu xanh sẽ chuyển thành đường viền dấu chấm màu cam để làm nổi bật thành phần tương ứng trong trang web.
+ Trường hợp phần tử được tìm thấy không nằm trong vùng hiển thị của trang web, thì khi hover chuột vào phần tử đó trong ChroPath tab, thì trang web sẽ tự động scrool đến vùng hiển thị của phần tử đó và được làm nổi bật bởi đường viền dấu chấm màu cam.

### **5/ Đôi dòng tâm sự cuối:**
Thật ra thì cũng có nhiều tool tương tự hỗ trợ cho ta trong việc xác định XPath (FirePath, XPathHepper...), tuy nhiên nguyên nhân chính mình chọn ChroPath để giới thiệu trong bài này là vì đây là 1 tool mình cảm thấy nó rất linh hoạt và hỗ trợ rất nhiều trong việc cho các bạn automation té, và mình biết được thông tin của tool này là ở Selenium Conference 2018: https://confengine.com/selenium-conf-2018/proposal/6018/chropath-a-smarter-way-to-get-locators-and-verify-them

Và trên mạng mình tìm kiếm cũng chưa có nhiều bài viết về tool ChroPath này. 
Mình hy vọng bài viết này có thể giúp các bạn biết thêm 1 tool mới, hữu ích trong việc phát triển kiểm thử tự động.

*Tham khảo:*

https://confengine.com/selenium-conf-2018/proposal/6018/chropath-a-smarter-way-to-get-locators-and-verify-them

http://selenium-makeiteasy.blogspot.com/2017/04/hello-guys-i-have-developed-tool_22.html