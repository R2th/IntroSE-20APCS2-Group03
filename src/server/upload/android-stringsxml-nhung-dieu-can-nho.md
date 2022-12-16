Chắc hẳn trong chúng ta - mỗi Android Developer khi phát triển project đều ít nhất một lần sử dụng đến file strings.xml. Mỗi lần tạo một file layout trong đó bạn hard code text luôn trong file .xml khi tạo pull request cho mọi người review bạn sẽ ăn một đống comment "hard code"x3.14. Vậy tại sao fix cứng text trong file .xml lại không được . Lý do được đưa ra là :
- Ứng dụng của chúng ta cần hỗ trợ đa ngôn ngữ, nếu bạn fix cứng text như vậy thì đa ngôn ngữ coi như bó tay :disappointed_relieved: 
- Khi cần sửa text đó theo design bạn có thể sửa luôn trong file strings.xml thay vì phải đi tìm file giao diện đó rồi sửa rất mất thời gian
Nhưng chúng ta đã sử dụng strings.xml đúng cách chưa? Chúng ta cùng đi tìm hiểu nhé :hand: 

**Không sử dụng lại cho các màn hình khác nhau**
1. Hãy tưởng tượng bạn có một hộp thoại cho việc Đăng nhập và Đăng ký. Cả hai hộp thoại bạn đã quyết định sử dụng chung một chuỗi là R.string.loading cho việc thông báo chờ đăng nhập hay đăng ký
```
<string name"loading">Loading please wait...</string>
```
Nhưng đến cuối khi design thay đổi bạn quyết định sử dụng một chuỗi khác, bạn sẽ phải tạo ra hai chuỗi string khác nhau và sử nó trong file .xml hay trong file .java mà bạn đã sử dụng. Thay vào đó nếu ngay từ đầu chúng ta đã tạo ra hai chuỗi từ trước thì bạn chỉ cần sử chúng trong file strings.xml
```
<string name"sign_in_loading">Loading sign in please wait...</string>
<string name"sign_up_loading">Loading sign up please wait...</string>
```
2. Bạn sẽ không bao giờ biết ngôn ngữ nào ứng dụng của bạn có thể hỗ trợ. Trong một ngôn ngữ, bạn có thể sử dụng cùng một từ cho các ngữ cảnh khác nhau, nhưng trong một ngôn ngữ khác bạn sẽ cần phải sử dụng các từ khác nhau cho các ngữ cảnh khác nhau 
```
<string name"download_file_yes">Yes</string>
<string name"terms_of_use_yes">Yes</string>
```
res/value/strings.xml
```
<string name"download_file_yes">Гаразд</string>
<string name"terms_of_use_yes">так</string>
```
res/value-UA/strings.xml
**Tách rời**
Các chuỗi riêng biệt cho các màn hình khác nhau cần đường tách biệt và có comment cho các khối string khác nhau để dễ dàng quản lý .
```
<!--settings screen start-->
    <string name="setting_log_out">Log out</string>
    <string name="setting_notification_policy">Notification Policy</string>
    <string name="setting_contact_us">Contact Us</string>
<!--settings screen end-->

<!--profile screen start-->
    <string name="profile_name">Name</string>
    <string name="profile_email">Email</string>
    <string name="profile_work">Work</string>
<!--profile screen end-->
```
1. Thêm các tiền tố cho mỗi chuỗi để có thể nhận biết ngay màn hình đang sử dụng chuỗi đó 
2. Sắp xếp file strings.xml theo các màn hình khác nhau kèm theo comment sẽ giúp dễ dàng quản lý và phiên dịch các chuỗi sang các ngôn ngữ khác nhau
Bạn cũng có thể tạo các file strings.xml cho các màn hình khác nhau ví dụ như settings-strings.xml hoặc profile-strings.xml. Nhưng với ứng dụng lớn tầm 20-30 màn hình và có đến 20-30 file strings.xml thì thật lộn xộn và khó quản lý.
**Sử dụng Resources#getString(int id, Object… formatArgs) để định dạng chuỗi**
Không bao giờ được thực hiện nỗi chuỗi thông qua toán tử + vì có thể trong các ngôn ngữ khác nhau thứ tự từ có thể thay đổi
```
<string name="login_welcome_back"> - welcome back </string>
```
res/value/strings.xml
```
String username = "Hoang Long"
String result = username + " " + getString(R.string.login_welcome_back);
/EN result "Hoang Long - welcome back"
```
Cách chính xác là sử dụng Resources#getString(int id, Object… formatArgs)
```
<string name="login_welcome_back">%s - welcome back </string>
```
res/value/strings.xml
```
<string name="login_welcome_back">з поверненням %s</string>
```
res/value-UA/strings.xml
```
String username = "Hoang Long"
String result = username + " " + getString(R.string.login_welcome_back);
//EN result "Hoang Long - welcome back"
//UA result "з поверненням Hoang Long"
```
**Số nhiều**
Không bao giờ giải quyết số nhiều trong mã java của bạn, bởi vì các ngôn ngữ khác nhau có các quy tắc khác nhau cho thỏa thuận ngữ pháp với số lượng.
```
<string name="minute">minute</string>
<string name="minutes">minutes</string>
```
res/value/strings.xml
```
int minutes = Calendar.getInstance().get(Calendar.MINUTE);
String text = (minutes == ) ? getString(R.string.minute) : getString(R.string.minutes);
```
Đúng ra chúng ta nên sử dụng **Resources#getQuantityString (int id, int quantity)**
```
<plurals name="minutes">
    <item quantity="one">minute</item>
    <item quantity="other">minutes</item>
</plurals>
```
res/values/strings.xml
```
int minutes = Calendar.getInstance().get(Calendar.MINUTE);
String text = getResources().getQuantintyString(R.plurals.minutes,minutes);
```
**Từ nổi bật**
Nếu bạn muốn thay đổi màu của một số từ trong TextView - ForegroundColorSpan không phải lúc nào cũng là lựa chọn tốt nhất. Vì việc highlight từ phụ thuộc vào index nó không phù hợp và an toàn cho các ứng dụng đa ngôn ngữ. Tốt hơn hết là sử dụng các thể màu html trong file strings.xml
Hãy tưởng tượng bạn có văn bản "Discover and play games". Và bạn muốn tô màu chữ "Discover" và "play" sang màu xanh nước biển
```
<string name="html_text" formatted="false">
    <![CDATA[
    <font color=\'#28b5f5\'>Discover</font> and <font color=\'#28b5f5\'>play</font> games.
    ]]>
</string>
```
```
TextView textView = findViewById(R.id.txtView);
textView.setText(Html.fromHtml(getString(R.string.html_text)));
```

## Tổng kết 
- Trong bài viết trên mình đã chia sẻ một số lưu ý cần nhớ khi sử dụng file strings.xml một cách tốt nhất trong ứng dụng của mình, mong các bạn góp ý để mình có thể quản lý tốt hơn trong ứng dụng.