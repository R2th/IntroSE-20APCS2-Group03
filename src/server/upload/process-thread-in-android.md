# 1 Process and Thread
Chăc hẳn các ban làm android thì cũng rất quen với cụm từ Main Thread hay luồng chính, tuy nhiên chắc các bạn cũng thắc mắc Main Thread là gì? Nó từ đâu sinh ra và tại sao lại cần sự hiện diện của nó đúng không nào? Chúng ta cùng tìm hiều về  nó nhé.

Android có 4 components chính là Activity, Service, BroadcastReceiver, ContentProvider, khi một component của ứng dụng được khởi chạy mà trước đó ứng dụng không có bất kì component nào đang chạy, Hệ thống android khởi động một tiến trình (process) Linux cho ứng dụng với một luồng duy nhất. 

Mặc định tất cả các component của cùng một ứng dụng sẽ được chạy trên một process và thread duy nhất (nó còn đựoc gọi là "main" thread).

Nếu một component của ứng dụng được khởi chạy mà trước đó process của ứng dụng đã được khởi động(vì component khác của ứng dụng vẫn còn tồn tại) thì component này sẽ được khởi động trong process của ứng dụng đã được tạo trước đó mà không tạo thêm process hay thread mới. Tuy nhiên bạn cũng có thể xắp xếp các component của ứng dụng chạy trên các processes riêng biệt.

Các bạn có thể hiểu đơn giản rằng, Trong điện thoại có rất nhiều ứng dụng, mỗi ứng dụng lại có rất nhiều các thành phần, mỗi thành phần lại chạy trên các luồng khác nhau, và các luồng này thì được quản lý bằng các process khác nhau. Các bạn có thể hình dung qua hình sau 

![](https://images.viblo.asia/38eca35a-c6b5-4613-84e9-15e9b97bb46d.png)

## 1.1 Processes
### 1.1.1 Overview
Măc định, tất cả các components của cùng ứng dụng sẽ chạy trên cùng một process và hầu hết các ứng dụng ko nên thay đổi điều đó. Tuy nhiên bạn cũng có thể control xem compnent nào chạy trên process nào bằng cách điều chinh trong file manifest


Với mỗi một thẻ của một component trong android như ```<activity/>```, ```<service/>```, ```<receiver/>``` và ```<provider/>```, hệ thống hỗ  trợ một thuộc tính ```android:process``` (đầu vào là một string định nghĩa proceess name) giúp các bạn có thể chỉ rõ xem component đó được khởi chạy trên process nào.


Bạn cũng có thể xác định process default cho toàn bộ ứng dụng bằng cách xác định thuộc tình ```android:process``` cho thẻ ```application```. Mặc định thì process của ứng dụng được gán bằng packagename của ứng dụng.


Hệ thống Android có thể kết thúc một process tại một vài thời điểm nhất định, khi hệ bộ nhớ của hệ thống thấp và các tiến trình khác có độ ưu tiên cao hơn để phục vụ người dùng. Các component của ứng dụng đang chạy trong process đó sẽ bị hủy và sẽ được tái khởi động lại khi người dùng quay trở lại ứng dụng đó. 


Khi quyết định xem proceses nào sẽ bị hủy, Hệ thống Android sẽ cân nhắc tầm quan trọng của process đó đối với người dùng. Ví dụ, hệ thống sẽ dễ dàng tắt bỏ một process mà chứa các activity không còn hiển thị trên màn hình, so với một process mà lưu trữ các activity đang được hiển thị.


### 1.1.2 Process hierarchy
Để quyết định process nào nên bị hủy khi thiếu bộ nhớ, Android đặt từng process vào một hệ thống với độ ưu tiên phân cấp, dựa trên các component đang chạy bên trong chúng và trạng thái của những component đó. Duới đây là các loại process được phân cấp theo thứ tự. Càng đứng đầu thì độ ưu tiên càng cao.
1. **Foreground process** là một process mà hiện tại người dùng đang tuơng tác. Các component khác nhau có thể làm cho process của nó được coi là foreground theo nhiều cách khác nhau. Một process được coi là foreground nếu được chứa một trong các điều kiện sau
* Chứa một ```Activity``` đang được hiển thị với người dùng(khi mà method ```onResume()``` của activity đang được gọi)
* Chứa một ```BroadcastReceiver``` mà hiện tại đang được chạy(khi mà method ```onReceive()``` của BroadcastReceiver đang thực thi)
* Chứa một ```Service``` hiện tại đang thực thi code trong một trong các callback ```onCreate()```, ```onStart()```, ```onDestroy()```.

Sẽ chỉ có một vài process như vậy trong hệ thống và chúng sẽ bị giết như một cách cuối cùng nếu bộ nhớ quá thấp. 

2. **Visible process** là process ko phải ở trạng thái foreground tuy nhiên đang thực hiện những công việc mà người dùng có thể ý thức được, do đó việc kill các process này sẽ ảnh hưởng đến các trải nghiệm người dùng. Một process sẽ được coi là visible process nếu thỏa mãn một trong các điều kiện sau
* Chứa một Activity hiển thị với người dùng tuy nhiên k ở trạng thái foreground (thay vì method ```onResume()``` thì method ```onPause()``` sẽ được gọi). Ví dụ Acitivity hiện thị một Dialog tuy nhiên vẫn cho phép Activity  đó hiển thị phía sau
* Chứa một service mà đang được chaỵ dưới dạng một foreground service thông qua method ```Service.startForeground()```
* Chứa một Service hệ thống đang sử dụng cho một tính năng cụ thể mà user có thể biết ví dụ như hình nền động, bàn phím ảo...


Số lượng các process đang ở trạng thái này ảnh hưởng ít hơn so với foreground, tuy nhiên kill process này ảnh hướng rất nhiều đến trải nghiệm người dùng.


3. **Service process** Là process chứa một service được khởi chạy bằng cách gọi method ```startService()```. Mặc dù các processs này không trực tiếp hiện thị với người dùng, nhưng chúng thông thường vẫn đang xử lý các tác vụ mà người dùng quan tâm (ví dụ như một background service dùng để upload hoặc download), cho nên hệ thống vẫn giữ các process này hoạt động trừ khi hệthoosng không còn đủ bộ nhớ cho các process thuộc 2 loại đã nêu trên foreground và visible processs


Các service đã được chạy trong một thời gian dài (chẳng hạn như 30 phút trở lên) có thể bị hạ cấp về tầm quan trọng để process chứa chúng rơi vào danh sách LRU được lưu trữ trong bộ nhớ cached được nói đến ở phần tiếp theo. Điều này trách cho việc một service chạy quá lâu và gây rò rỉ bộ nhớ.


4. **Cached process** là một proces mà không cần thiết vào thời điểm hiện tại, hệ thống có thể thoải mái kill khi cần bộ nhớ ở bất kì đâu. Trong một hệ thống hoạt động bình thường thì đây là trường hợp duy nhất cần quản lý bộ nhớ: Một hệ thống chạy tốt sẽ có rất nhiều cached process luôn luôn sẵn sàng (để phục vụ tốt hơn cho việc chuyển đổi giữa các ứng dụng) và thường xuyên loại bỏ những cái cũ nhất khi cần thiết. Nếu bộ nhớ càng nhiều thì giữ được càng nhiều cached process và trải nghiệm người dùng càng cao.


Các process này thường giữ một hoặc nhiều hơn các activity không hiển thị với người dùng (phuơng thức ```onStop()``` đã được gọi) 


Những processes này đựoc lưu trữ ở một danh sách gọi là LRU (bản chất là một LinkedHashMap) nơi mà process cuối cùng trong danh sách sẽ bị kill để giải phóng bộ nhớ. 


## 1.2 Thread
### 1.2. 1 Overview
Như mình nói ở trên, trong Android chúng ta có rất nhiều process,với mỗi một process chúng ta có thể tạo ra nhất nhiều thread trong đó, như hình sau
![](https://images.viblo.asia/2cd96752-4921-4f8e-b1b1-f24ac7dbe8fc.png)


Khi một ứng dụng được khởi chạy, một process được sinh ra (nếu chúng chưa được khởi chạy trước đó bởi bất kì component nào của ứng dụng), hệ thống sẽ tự động khởi tạo một thread cho ứng dụng trong process đó, gọi là "main" thread. Thread này vô cùng quan trọng vì nó phụ trách việc nhận tuơng tác từ phía giao diện người dùng, bao gồm cả việc vẽ các sự kiện và update lại các giao diện người dùng. Như vậy "main" thread đôi hi còn được gọi là UI thread. Tuy nhiên trong một vài trường hợp đặt biệt "main" thread không phải là UI Thread.


Hệ thống không tạo ra các thread riêng biệt cho từng instance của các component.Tất cả các component đều được chạy trên một process và đựoc khởi tạo trên UI thread và các method xử lý của hệ thống đều được xử lý trên thread đó. Do đó các phuơng thức callback của hệ thống như (```onKeyDown()```, ```onStart()```, ```onStop()```...) đều được gọi về trên UI thread của process.


Khi ứng dụng của bạn thực hiện các tác vụ kéo dài để thực hiện các lệnh từ người dùng, việc chỉ sử dụng một luồng duy nhất trong process mà hệ thống tạo ra sẽ gây rất chậm cho ứng dụng nhất là những tác vụ tuơng tác với internet. Việc block UI trong một khoảng thời gian dài (hiện tại là 5s) sẽ gây ra hiện tượng ANR (application not responding). Người dùng có thể quyết định tắt ứng dụng của các bạn.

![](https://i.stack.imgur.com/r969o.png)

Vì vậy chúng ta có những quy tắc khi sử dụng UI thread như sau
1. Không được block UI Thead
2. Không được truy cập vào Android UI tookit từ thread không phải UI thread. (Không được udpate ui ngoài main thread)

Thông qua bài viết này mình đã hướng dẫn cho các bạn một cái nhìn cơ bản nhất về Process, Thread trong Android.

Rất cảm ơn các bạn đã đón đọc.