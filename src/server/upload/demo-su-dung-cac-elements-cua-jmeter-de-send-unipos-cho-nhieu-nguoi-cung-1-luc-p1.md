Bài viết chủ yếu để demo cách sử dụng các Element trong Jmeter là chính, không bàn đến khía cạnh sử dụng đúng mục đích của Unipos (bow)

Trong bài này mình sẽ demo cách sử dụng các elements của Jmeter để thực hiện scenario có các steps bên dưới:
### Scenario
1. Khai báo các configs cần thiết
2. Xử lý số lần lặp của request dựa vào số lượng members cần tặng điểm
3. Login account unipos
4. Lấy thông tin profile của account login
5. Lấy danh sách members muốn tặng Unipos
6. Xử lý ngẫu nhiên các message được gởi đến các members
7. Xử lý ngẫu nhiên các core value muốn tag đến các members
8. Chia đều điểm unipos hiện có và gởi đến danh sách members muốn tặng điểm

* Bonus thêm phần tạo file bat để chạy sau 1 click chuột, xả hết điểm unipos trong một nốt nhạc.

OK, let's start ^^

### 1. Khai báo các configs cần thiết
Để bắt đầu chúng ta cần chuẩn bị config 1 số elements quen thuộc như bên dưới:

+ HTTP Cookie Manager : Cái này add vào là được, không cần chỉnh config gì cả. Mục đích để chứa và gởi cookies giống trình duyệt thôi. Có 3 cách cơ bản để sử dụng element này, bao gồm:
1.  - Quản lý cookie lưu trữ và gửi cookie giống như trình duyệt web. ( cách hiện tại đang dùng )
1.  - Lưu cookie nhận được vào biến của Jmeter.
1.  - Thêm cookie theo cách thủ công vào Cookie Manager.
Mình sẽ giới thiệu cách sử dụng 2 config còn lại ở các demo sau.

+ HTTP Header Manager : Một số các header có thể sử dụng chung cho các requests như: Accept-Language, Accept-Encoding, User-Agent, Referer .... HTTP Headers tiêu chuẩn thường có dạng tương tự như sau:

![](https://images.viblo.asia/318df1aa-43d1-4cb9-8df0-ad2dd2fd53a3.jpg)

Ứng với site Unipos thì ta sẽ dùng config như bên dưới:
![](https://images.viblo.asia/fd76f5b6-69de-4f2d-9a17-3ac287a53fec.jpg)

Tìm hiểu chi tiết hơn và 1 số ví dụ về config này [ở đây](https://www.blazemeter.com/blog/using-jmeters-http-header-manager).

+ CSV Data Set Config : Chuẩn bị 1 file CSV Data Set Config để chứa thông tin các members cần tặng unipos , tên members cần lưu giống như cách mình gởi trong unipos ( Ex: nguyen.van.a ). File này chỉ cần chứa 1 cột data là member được rồi.

![](https://images.viblo.asia/c74b3794-0831-41fb-8078-80e708b0e1f6.jpg)

Tiếp theo là thiết lập trong Jmeter để gán giá trị vào biến, field Variable Names dùng để khai báo tên biến, nếu dùng nhiều biến hơn thì mỗi biến cách nhau bằng dấu phẩy, hiện tại file CSV chỉ có một cột data nên chỉ cần khai báo tên một biến.

![](https://images.viblo.asia/7a4db951-3e4d-4851-a426-7a70a1cd9be8.png)

+ Random CSV Data Set Config: Element này mặc định không có trong Jmeter nhưng có thể cài thông qua Jmeter Plugins Manager , tải và hướng dẫn cài đặt [ở đây](https://jmeter-plugins.org/wiki/PluginsManager/) , cài xong thì sẽ xuất hiện thêm element Random CSV Data Set Config . Chức năng thì như tên gọi, cơ bản nó sẽ đọc dữ liệu từ file CSV và lưu trữ vào biến khai báo nhưng đọc theo thứ tự ngẫu nhiên. Mình cần tạo 2 config này để xử lý ngẫu nhiên các message và các tag được gởi cho members, gởi đi gởi lại 1 message vs 1 tag thì chán lắm ^^

![](https://images.viblo.asia/e16fe5ad-93c2-4510-8f76-0c5e3944ab14.png)

File CSV message và tags như bên dưới

![](https://images.viblo.asia/954cf0d8-52f7-4c8f-b027-a676fae73217.jpg)

Config xong click vào Test CSV Readaing thử phát luôn để xem nó đọc được không :P Nếu đọc file bị lỗi font, mất chữ này nọ thì các bạn tùy chỉnh ở field File encoding nhé .

### 2. Xử lý số lần lặp của request dựa vào số lượng members cần tặng điểm

+ Mình cần lấy được số lines numbers trong file CSV, sau này nếu thêm hay bớt members trong file CSV thì Test Plan tự động tăng giảm số lần lặp tương ứng.
Để xử lý lấy số lượng members thì mình cần code 1 ít, thêm BeanShell sampler vào Thread Group để làm việc này :

![](https://images.viblo.asia/e0d2053d-4abd-4b9e-a461-41b480940e84.png)

```
import java.io.File;
import java.io.FileReader;
import java.io.LineNumberReader;FileReader fileReader = new FileReader(new File("D:\\ToolsQA\\apache-jmeter-5.0\\bin\\members2.csv"));
LineNumberReader lineReader = new LineNumberReader(fileReader);
int linenumber = 0;
int sumline = 0;
while (lineReader.readLine() != null){
linenumber++;
log.info("count inside is "+linenumber);
}

//linenumber–; // do not include header row
log.info("count out sde is "+linenumber);
//log.info(linenumber);
//store lines number into ${__P(LineCount)}
props.put("LineCount", Integer.toString(linenumber));
lineReader.close();
```

Nhìn code ghê ko ^^ .... mình google đó :v: không cần phải biết quá nhiều , chỉ cần bạn biết rõ mình cần gì để đi hỏi và tìm câu trả lời :P 

OK, chạy 1 lần là mình đã có số lượng members rồi, nhét nó vào Once Only Controller thôi ( click chuột phải vào BeanShell sampler > Insert Parent > Logic Controller > Once Only Controller )

+ Tạo một Loop Controller và sử dụng biến `${__P(LineCount)}` mình lấy được ở step trước. Mục đích để kiếm soát số lần lặp request dựa vào số lượng members cần tặng điểm.

Đến đây thì Testplan của chúng ta sẽ có cấu trúc như bên dưới

![](https://images.viblo.asia/3187f05a-b08e-44b9-9bb4-472d2361f143.png)

Ta sẽ có 1 thread và các request ở trong group Loop Controller sẽ lặp lại dựa trên số lượng member trong file CSV . 

### 3. Login account unipos

Tạo 1 HTTP request như bên dưới :

```
POST https://unipos.me/a/jsonrpc

POST data:
{"jsonrpc":"2.0","method":"Unipos.Login","params":{"email_address":"[your email]","password":"[your pass]"},"id":"Unipos.Login"}

```

![](https://images.viblo.asia/b7b077f4-474d-4067-a61e-46ced7671053.png)

Sau khi gởi request Login thì trong response trả về sẽ có chứa token của account login: 

![](https://images.viblo.asia/62b146c0-09be-480d-bf2a-925bc77646e4.png)

Ta cần add Regular Expression Extractor vào request để get token này như bên dưới :

![](https://images.viblo.asia/d3af274e-5e3a-4bd1-9897-c08b87ef4d06.png)

Các bạn chú ý các field sau đây: 
- Name of created variable : Field này dùng để khai báo tên biến sẽ chứa giá trị token
- Regulare Expression: cấu trúc khai báo để lấy giá trị token trong response , tùy theo từng đạng response trả về mà ta có cấu trúc khác nhau, mình sẽ có 1 bài riêng chuyên sâu về phần này
- Default value: giá trị mặc định nếu không tìm thấy token 

các field còn lại config như hình. Vậy là xong phần Login account unipos

Đến đây đã hơi dài quá rồi nên mình xin ngừng phần này ở đây, mình liệt kê các element được sử dụng cho đến step này cho các bạn tiện nghiên cứu, các element nào các bạn chưa rõ có thể GG hoặc để lại comment mình sẽ giải đáp sau:

+ HTTP Cookie Manager
+ HTTP Header Manager
+ CSV Data Set Config
+ plugin - Random CSV Data Set Config
+ Thread Group
+ Once Only Controller
+ BeanShell Sampler
+ Loop Controller
+ HTTP request
+ Regular Expression Extractor