Xin chào các bạn, có lẽ trong top những **trending keywords** khác trong giới công nghệ hiện nay thì không thể không nhắc đến **Internet of Things - IoT**. Song song với sự phát triển như vũ bão của internet thì việc kết nối vạn vật vào mạng internet đã trở thành một xu thế tất yếu. Chính vì lý do đó mình  xin được phép viết một series rất cơ bản về Internet of Things bắt đầu từ những việc nhỏ nhất như điều khiển được các thiết bị trong nhà của bạn mà không hề tốn kém chi phí, lại giúp các bạn làm về kĩ thuật hiểu hơn về nguyên lý hoạt động của một hệ thống **Internet of Things** như thế nào. Trong bài viết này mình sẽ hướng dẫn các bạn làm một ứng dụng đơn giản đó chính là **Bật tắt đèn qua internet**. OK chúng ta bắt đầu thôi

# Sơ lược về Internet of Things

Cái tên đã đủ để nói lên tất cả, công nghệ **IoT - Internet of Things** chính là các kĩ thuật giúp có tất cả các vật xung quanh chung ta đều có thể kết nối, điều khiển, quản lý, theo dõi ... thông qua mạng toàn cầu internet. Sự lợi ích của nó thì chắc chắn không cần phỉa bàn luận nhiều nữa rồi. Hãy tưởng tượng một ngày nào đó bạn đi công tác xa nhà mà vẫn có thể quản lý, theo dõi được ngôi nhà của mình từ xa thì sẽ tiện lợi biết bao phải không? Hoặc như một thành phố thông minh sẽ an toàn biết bao nếu như tất cả mọi thứ thậm chí là mọi người đều được kết nối, quản lý, theo dõi và thông báo rất kịp thời thông qua internet. Tầm quan trọng của IoT chúng ta không cần phải bàn tới nữa, tuy nhiên chúng ta là dân kĩ thuật thì cần phải hiểu sâu hơn về nguyên lý hoạt động của một hệ thống **IoT** hơn là chỉ **chém gió** hay **biết cái tên** phải không nào. 

![](https://www.parmonet.com/adminv/newtech/picstore/c7e4e7365b814ccb459e665aad9dec82t.jpg)

# Các công phu cần chuẩn bị

## Khẩu quyết và tâm pháp

Rõ ràng **Internet of Things** không phải là một vấn đề mới, nó không quá khó để học nhưng cũng không phải quá đơn giản cho những người mới bắt đầu. Vậy trước tiên để học được môn võ công này chúng ta cần phải luyện tập cho mình một vài loại công phu mà có thể đã **thất truyền** trong trí nhớ của bạn từ những thời học đại học như:

* Kiến thức cơ bản về điện
* Kiếc thức cơ bản về mạch điện tử
* Kiến thứcc cơ bản về giao thức mạng
* Kiến thức cơ bản về lập trình

Mình nghĩ chỉ cần bằng đó thứ chúng ta có thể vận dụng để thực hiện các ứng dụng IoT nho nhỏ được rồi. Giờ đã có khẩu quyết và tâm pháp rồi chúng ta chỉ cần lựa chọn vũ khí chiên đấu nữa là có thể bắt đầu được ngay. Chúng ta cùng nhau điểm qua một số vũ khí lợi hại này nhé

## Lựa chọn binh khí

Sau đây là một số vũ khí chúng ta cần chuẩn bị trước khi chiến đấu nha:

### Bo mạch Wemos D1

Hiểu đơn giản thì chúng ta sẽ cần phải có một thứ gì đó để kết nối giữa các thiết bị trong nhà với mạng internet để qua đó chúng ta có thể điều khiển được các thiết bị này từ một nơi khác bất kì thông qua internet. Muốn làm được điều này thì chúng ta tất nhiên phải có một mạch điện tử có thể kết nối được với Wifi và một mạch rất phổ thông tích hợp sẵn module **ESP8266** đó chính là mạch **Wemos D1**. Mạch này trên thị trường bán với gía tầm 100K. Nhìn qua hình dáng em nó sẽ như sau:

![](https://elementztechblog.files.wordpress.com/2016/10/wemos_d1_esp8266.jpg)

Trong đó chúng ta cần chú ý đến con chip hình chữ nhật có chữ **Wifi** gần phía bên tay phải. Đây chính là chip điện tử **ESP 8266** sử dụng để kết nối, nhận và gửi dữ liệu thông qua sóng Wifi. Nói nôm na cho dễ hiểu, bạn sẽ cần sử dụng chip này để kết nối với mạng Wifi sẵn có trong nhà bạn. Sau đó bạn sẽ gửi các tín hiệu điều khiển thông qua Wifi để điều khiển các thiết bị trong nhà của bạn. Chúng ta chỉ cần hiểu cơ bản như vậy là đủ. Tuy nhiên cần có một số lưu ý khi sử dụng bất kì một bảng mạch nào đó là bạn phải biết được **Datasheet** của nó, tức là vị trí các chân cắm ở đâu, ý nghĩa là gì tránh trường hợp **Râu ông nọ cắm cằm bà kia** dẫn đến **tan nhà nát cửa** hay nôm na là **chập mạch**. Sau đây mình xin phép được đưa luôn cái datasheet này cho bạn nào lười tìm hiểu. :disappointed: 

![](https://arduinomaster.ru/wp-content/uploads/2017/12/2017-12-30_13-45-11.png)

Các bạn cần chú ý một số chân căm quan trọng sau:

* Chân **GND** chính là chân âm cực hay còn gọi là chân **LOW**, khi các bác lập trình nối các thiết bị thì mình cần phải nối cực âm vào chân này.
* Các chân **D0 - D15** là các chân dương cực sử dụng để cắm vào các cực dương của các thiết bị cần được điều khiển. Ví dụ trong điều khiển đèn LED chúng ta cần cắm chân dài của đèn LED vào một trong các chân dương cực này. Ngoài ra còn các chân khác nữa mình cũng chưa có thời gian tìm hiểu hết, tuy nhiên trong ví dụ điều khiển thiết bị cơ bản thì chúng ta chỉ cần sử dung các chân này là đủ rồi.

### Bo test - Bread board

**Breadboard** hay còn gọi là bo test là một thiết bị vô cùng tiện lợi để chúng ta có thể kiểm tra sơ đồ nguyên lý và kết nối các thiết bị của chúng ta vào mạch **Wemos D1** một cách dễ dàng. Khi làm việc với các bo mạch điện tử, để lắp ráp mạch, sẽ rất bất tiện khi phải hàn linh kiện mà chưa thể biết hàn như vậy có đúng hay không? Các bạn chuyên nghiệp có thể nói rằng, chúng ta có thể dùng **Proteus** để mô phỏng. Nhưng với mình, điều đó không có gì thú vị cả, mình thích trải nghiệm cảm giác rắp ráp mạch hơn. Việc ra đời mạch cắm thử **breadboard** có thể giải quyết được vấn đề nêu trên và hơn đó là dễ dàng sử dụng dành cho người mới bắt đầu. Chúng ta cùng tìm hiểu qua một chút về cấu tạo cũng như nguyên lý hoạt động của nó nhé.

Đây là bản **breadboard** mình mua tại một cửa hàng linh kiện điện tử trên đường Trần Quốc Hoàn với giá 18K. Các bạn cũng có thể mua ở một số nơi khác với cấu tạo tương tự.

![](https://images.viblo.asia/c1a42c9e-9fa2-40a3-b8f4-2c7fdfc64ddb.png)

Về cơ bản thì chúng ta dù là dân không chuyên nghiệp thì khi nhìn qua **bo test** này cũng thấy được rằng đây là các lỗ cắm. Mục đích để làm gì nhỉ? Thì đương nhiên là để cắm dây rồi. Kích thước cạnh của nó là **2.54mm (0.1 inch)**, và chúng cũng cách nhau một khoảng cách tương tự. Tiếp đến là những con số, cũng không cần tinh ý cũng nhận thấy rằng, chúng được viết lên breadboard để ta dễ dàng xác định đươc vị trí của một ô. Ngoài ra, còn 2 thanh đỏ, xanh ở hai bên thể hiện nơi các bạn nên gắn cực âm và cực dương. Nhưng mà nó chỉ là kí hiệu thôi, bạn thích cắm đường màu đỏ vào cực âm, đường màu xanh vào cực dương cũng được. Ngoài ra còn một số lưu ý nhỏ các bạn cầm nắm được:

* **Thứ nhất** Với breadboard như mình mua ở trên, nó có sự đứt quãng giữa các đường xanh, đỏ. Điều đó có ý nghĩa rằng, đoạn xanh / đỏ bên này sẽ không nối với đoạn xanh / đỏ bên kia. 
* **Thứ hai** Các lỗ ở giữa **breadboard** (phía trong đường xanh đỏ) sẽ thông với nhau theo từng cột. Tức là cùng một số cột sẽ được dẫn điện giống như nhau. Để dễ hiểu hơn các bạn xem phần lõi dây mình vẽ ra từ cái bo test trên nhé. Nhìn là hiểu ngay thôi mà.

![](http://k1.arduino.vn/img/2015/12/30/0/1828_1232246-1451478749-0-bboardwires.jpg)

### Arduino IDE

Đây là một IDE vô cùng hữu dụng và đã rất quen thuộc cho các anh em lập trình cho phần cứng. Các bạn cũng không mất quá nhiều thời gian để làm quen với nó đâu. Khi cài đặt xong nó sẽ có giao diện như thế này 


![](https://images.viblo.asia/2f41c860-9d74-4d3e-aad9-f4e291c9f190.png)

Một lưu ý nhỏ nữa là nếu các bạn sử dụng  **Arduino** trên MacOSX thì cần cài thêm driver ảo hoá cổng USB thành cổng COM. Các bạn có thể tham khảo cách install tại [đây](https://github.com/adrianmihalko/ch340g-ch34g-ch34x-mac-os-x-driver) nhé.

### App Blynk
![](https://i.ytimg.com/vi/G7PhfmkCHhg/hqdefault.jpg)

Các bạn tải ứng dụng **Blynk** về máy nhé. Nó chính là một ứng dụng sử dụng để điều khiển nhà thông minh thông qua giao thức MQTT mà không cần phải cài đặt thêm server. Blynk cũng cung cấp SDK cho module ESP 8266 mà chúng ta đang sử dụng. Việc cần làm của chúng ta chỉ là thêm các button để điều khiển nhà thông minh của chúng ta thông qua mạch **Wemos D1**. Giá sử chúng ta đang kết nối một thiết bị tại cổng D0 mà muốn bật tắt thiết bị này thông qua Blynk thì việc đơn giản chỉ việc thêm một Button vào màn hình làm việc và cấu hình như sau:

![](https://images.viblo.asia/570e9c08-85fd-4d1d-b6c3-dd68d7325a4f.png)

Giả sử bạn có 4 bóng đèn thì chúng ta sẽ có một sơ đồ điều khiển như sau:

![](https://images.viblo.asia/868de954-7fc6-4ea5-9ad4-26ec8a8decec.png)

### Dây cắm

Rõ ràng là để kết nối các thiết bị điện với nhau không thể thiếu thứ này rồi. Có một số lưu ý về các loại dây này đó chính là đầu ra của chúng. Có 2 loại đầu ra là đầu **đực** (loại nào có cái dài ra để cắm gọi là đầu đực) và đầu **cái** (loại nào có lỗ để cắm vào gọi là đầu cái). Do có hai đầu đó nên dây cắm sẽ chia thành 3 loại là dây cắm **đực - đực**, dây cắm **đực - cái** và dây cắm **cái - cái**. Tuỳ từng trường hợp cụ thể mà các bạn dùng dây cho phù hợp. Mình thì mua cả một bó gồm 3 loại hết tầm 20K thôi về để test cho thoải mái.

![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0Sd_FaQQ2PRD45gUclBREcbVvqGwwEPWm0CIDHUt6pC0XkJAPAg)

OK vậy là mọi thứ đã sẵn sàng rồi các bạn bắt tay vào code thôi nào.

# Cách nối chân điều khiển thiết bị trên Wemos D1

Sau khi đã nắm được sơ đồ nguyên lý rồi thì việc nối chân của chúng ta vô cùng đơn giản. Các bạn sử dụng 4 bóng đèn LED để demo cho 4 thiết bị trong nhà của các bạn. Nối cực dương của đèn LED (cực có chân dài hơn) vào các rãnh số 10, 15, 20, 25 như trên bo test. Bởi vì các rãnh này thông với nhau theo chiều dọc nên cùng một rãnh sẽ có dòng điện như nhau. Các bạn nối với các chân tương ứng là D1 đến D4 trên mạch Wemos D1. Vậy là đã xong phần cực dương, thế còn cực âm thì sao nhỉ. Các bạn nối hết vào chân **GND** trên **Wemos D1** nhé. Và do hay đường bên ngoài của bo test thông nhau theo chiều ngang nên các bạn chỉ cần cắm một chân âm cực vào là đủ. Để làm được điều này các bạn cần có dây cắm loại **đực - đực** nhé. Nếu các bạn chưa hình dung về cách thiết bị đấu nối như nào trên bo test thì có thể tham khảo trong hình sau:


![](https://images.viblo.asia/ad79d865-a830-457e-8c97-2d82384837dd.jpg)

Còn đây là các đường ra trên Wemos D1

![](https://images.viblo.asia/e0d1d4c8-3f53-419e-aa3a-eea5df063812.jpg)

# Burn code cho Wemos D1

Sau khi kết nối xong các cổng việc cần làm của chúng ta là viết phần mềm cho Wemos D1. Như đã nói ở trên sau khi chuẩn bị hết phần cứng thì việc giao tiếp giữa phần cứng và mạng internet được thực hiện thông qua giao thức **MQTT**. Việc implement giao thức này khá phức tạp nên mình sẽ đề cập trong một bài viết khác. Tại đây chúng ta sử dụng một giải pháp của bên thứ 3 cung cấp nền tảng kết nối giữa phần cứng và internet đó chính là **Blynk**. Blynk cung cấp SDK trực tiếp cho Arduino các bạn chỉ cần chạy nó là xong. Sau khi cài SDK Blynk cho Arduino thì các bạn vào phần example như sau:

![](https://images.viblo.asia/ff9cdd14-a13a-4f4c-bc88-284d7f6aa9ef.png)

Các bạn sẽ có code như sau:

```
#define BLYNK_PRINT Serial


#include <ESP8266WiFi.h>
#include <BlynkSimpleEsp8266.h>

// You should get Auth Token in the Blynk App.
// Go to the Project Settings (nut icon).
char auth[] = "YourAuthToken";

// Your WiFi credentials.
// Set password to "" for open networks.
char ssid[] = "YourNetworkName";
char pass[] = "YourPassword";

void setup()
{
  // Debug console
  Serial.begin(9600);

  Blynk.begin(auth, ssid, pass);
  // You can also specify server:
  //Blynk.begin(auth, ssid, pass, "blynk-cloud.com", 8442);
  //Blynk.begin(auth, ssid, pass, IPAddress(192,168,1,100), 8442);
}

void loop()
{
  Blynk.run();
}

```
Việc cần làm của các bạn là thay các thông số cho hợp lý:

* **YourAuthToken:** chính là token mà bạn đã đăng kí app blynk. Nó sẽ gửi về email cho bạn sau khi đăng kí tài khoản
* **YourNetworkName:** chính là địa chỉ mạng Wifi nhà bạn
* **YourAuthToken:** chính là mật khẩu Wifi nhà bạn.

Bước cuối cùng là cắm dây kết nối Wemos D1 của bạn vào máy tính và tiến hành burn code. Sau khi burn code xong là chúng ta có thể điều khiển các đèn LED một cách dễ dàng thông qua app Blynk.

# Kết quả 

Sau khi burn code vào Wemos D1 và tiến hành thêm các button vào app Blynk. Nhớ là kết nối đúng chân thì mới kết nối được nhé bạn. Sau đây là video kết quả

{@youtube: https://youtu.be/8bXnv_0rcfQ}


# Kết luận

Trên đây là bài hướng dẫn ở mức cơ bản cho những bạn yêu thích tìm hiểu công nghệ IoT. Bạn có thể thực hiện điều khiển các thiết bị phần cứng một cách dễ dàng với chi phí không quá đắt đỏ. Tất nhiên để trên khai vào mạng điện trong nhà thì chúng ta còn cần thêm vào một số phần cứng khác nữa. Mình sẽ trình bày trong các phần tiếp theo. Xin chào các bạn và hẹn gặp lại nhé.