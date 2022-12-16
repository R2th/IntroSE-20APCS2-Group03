Sự thật chức năng các hàm, lớp làm gì chỉ có thể được tìm thấy ở một nơi: code. Chỉ có code mới thực sự có thể cho bạn biết nó đang có gì và làm gì. Đây là nguồn thông tin thực sự chính xác duy nhất. Do đó, mặc dù comment là đôi khi là cần thiết, nhưng chúng ta sẽ tìm cách để tối thiểu nó trong code của mình để tránh gây hoang mang thông tin :v. Comment thường được khuyên là không nên cho vào trong code

“Don’t comment bad code—rewrite it.”

# 1. Comments Do Not Make Up for Bad Code
Một trong những lý do chính để bạn comment là bad code. Bạn viết xong 1 đoạn code, bạn đọc lại và thấy nó thật khó hiểu và vô tổ chức. Sau đó bạn thêm một vài đoạn comment vào giải thích cho các đoạn code đó và tự nhủ với mình "Đoạn code đã tốt hơn rồi". Không, sẽ tốt hơn là bạn nên xóa nó đi :D
Một đoạn mã tốt với chỉ với một vài comment sẽ tốt hơn rất nhiều so với sự lộn xộn và phức tạp của một đoạn mã với quá nhiều comment. Thay vì dành thời gian để viết comment cho những mớ hỗn độn của mình thì hãy dành thời gian để xóa nó.

# 2. Explain Yourself in Code: Tự giải thích trong code
Xem xét đoạn code sau với comment
```Java
// Check to see if the employee is eligible for full benefits
if ((employee.flags & HOURLY_FLAG) && (employee.age > 65))
```
Bạn thấy ổn không? Có comment giải thích đoạn if cho bạn. Vậy tại sao không để nó tự giải thích như thế này chẳng hạn

`if (employee.isEligibleForFullBenefits())`

Chỉ mất vài giây để người đọc hiểu đoạn code muốn đề cập đến vấn đề gì thay vì đọc comment

# 3. Good Comments
Nhận xét nên hạn chế được đưa vào code, tuy nhiên dưới đây là một số good comment bạn nên đưa vào để bổ sung các thông tin hữu ích cho các đoạn code của bạn.
## 3.1. Legal Comments: Comment về pháp lý
Đó là các comment để cho người khác biết ai viết đoạn code đó. Bạn nên comment để cho người khác biết. Nếu bạn dùng PHPStorm, các đoạn comment này được sinh mỗi khi bạn tạo file:
```php
<?php
/**
 * Created by PhpStorm.
 * User: FRAMGIA\nguyen.van.minhb
 * Date: 20/07/2018
 * Time: 08:50
 */
class Controller_Event extends \Controller
```
## 3.2. Các comment chứa thông tin

Đó là các thông tin khá hữu ích, cung cấp các thông tin cơ bản nhất về 1 hàm (chẳng hạn đầu vào, đầu ra):
```java
// Returns an instance of the Responder being tested.
protected abstract Responder responderInstance();
```
Hoặc đôi khi là format dữ liệu đầu ra để bổ sung cho lập trình viên
```java
// format matched kk:mm:ss EEE, MMM dd, yyyy
Pattern timeMatcher = Pattern.compile(
"\\d*:\\d*:\\d* \\w*, \\w* \\d*, \\d*");
```
Tuy nhiên lời khuyên ở đây là tốt nhất bạn vẫn nên để tên hàm nói lên các thông tin này. Nếu không thể hoặc muốn bổ trợ thì hãy dùng comment. (Ví dụ như Accesstor, Mutators hay các nhận định thì bản chất tên hàm đã nói lên ý nghĩa của nó rồi, chắc không cần comment nữa)

Lời khuyên thứ 2 là bạn nên dùng PHPStorm để nó có thể sinh chuẩn format này cho bạn mã bạn đỡ phải nghĩ :D

## 3.3. Giải thích thêm cho mục đích, quyết định


Đôi khi, comment nên giải thích các thông tin hữu ích về việc thực thi và cung cấp ý định đằng sau quyết định, các đoạn code xử lý (trả lời câu hỏi Why). 

Đây là một ví dụ. Bạn có thể không đồng ý với giải pháp của lập trình viên để giải quyết vấn đề, nhưng ít nhất bạn biết những gì ông đã cố gắng để làm.
```C
public void testConcurrentAddWidgets() throws Exception {
    WidgetBuilder widgetBuilder = new WidgetBuilder(new Class[]{BoldWidget.class});
    String text = "'''bold text'''";
    ParentWidget parent = new BoldWidget(new MockWidgetRoot(), "'''bold text'''");
    AtomicBoolean failFlag = new AtomicBoolean();
    failFlag.set(false);
    
    //This is our best attempt to get a race condition
    //by creating large number of threads.
    for (int i = 0; i < 25000; i++) {
        WidgetBuilderThread widgetBuilderThread =
            new WidgetBuilderThread(widgetBuilder, text, parent, failFlag);
        Thread thread = new Thread(widgetBuilderThread);
        thread.start();
    }
    assertEquals(false, failFlag.get());
}
```
## 3.4. Đưa ra cảnh báo hậu quả

Đôi khi rất hữu ích khi cảnh báo những người lập trình khác về những hậu quả nhất định. Ví dụ dưới đây đưa ra các cảnh báo sử dụng hàm nếu bạn không có thời gian để tắt nó đi:
```C
// Don't run unless you
// have some time to kill.
public void _testWithReallyBigFile()
{
    writeLinesToFile(10000000);
    response.setBody(testFile);
    response.readyToSend(this);
    String responseString = output.toString();
    assertSubString("Content-Length: 1000000000", responseString);
    assertTrue(bytesSent > 1000000000);
}
```
## 3.5. TO DO comment
Đó là comment các công việc bạn chưa kịp thực hiện hoặc các chức năng bạn có thể phát triển trong tương lai:
```C
//TODO-MdM these are not needed
// We expect this to go away when we do the checkout model
protected VersionInfo makeVersion() throws Exception
{
    return null;
}
```
# 4. Bad comments
Đa số các comment đều thuộc thể loại này. Kể cả đối với các good comment người ta vẫn khuyên bạn không nên đưa nó vào trong code nếu thực sự không cần thiết.
## 4.1. Comment thừa
Những comment như thế này là những comment không có ý nghĩa, đôi khi có làm gián đoạn hay khó chịu với người đọc. Xét ví dụ sau:

`i++; // increment i`

Chắc hẳn ví dụ này hơi ngây thơ. Thôi thử vào Laravel đi, lớp "User" mặc định nhé:
```php
class User extends Authenticatable
{
    use Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];
}
```
Những comment như trên quả thật là thừa. Gần như ai cũng biết các biến `$fillable, $hidden` hay thâm chí là `$table, $primaryKey` để lưu làm gì rồi (vì nó đã có trong document và quy ước chung), comment như vậy không bố trợ thêm mà gây dài dòng khó chịu cho đoạn code.
## 4.2. Commented-Out Code
Đó là những comment như thế nào. Đó là những comment không được chạy nhưng vẫn được comment kiểu như thế này:
```C
this.bytePos = writeBytes(pngIdBytes, 0);
//hdrPos = bytePos;
writeHeader();
writeResolution();
//dataPos = bytePos;
if (writeImageData()) {
    writeEnd();
    this.pngBytes = resizeByteArray(this.pngBytes, this.maxPos);
}
else {
    this.pngBytes = null;
}

return this.pngBytes;
```
Những người khác thấy rằng mã đã nhận xét sẽ không có đủ can đảm để xóa nó. Họ sẽ nghĩ nó ở đây vì một vào lý do và rất quan trọng không dám xóa.
Họ sẽ đặt ra các câu hỏi, tại sao đoạn code này ở đây? Nó có quan trọng? Họ để lại nó như là một lời nhắc với một vài sự thay đổi?

Đã có một thời gian, trở lại vào những năm sáu mươi, khi mã bình luận ra có thể là hữu ích. Nhưng bây giờ công nghệ phát triển, chúng ta đã có các hệ thống quản lý mã nguồn trong một thời gian rất dài (như git chẳng hạn), những comment như vậy là hoàn toàn không cần thiết. Những hệ thống sẽ nhớ code giúp chúng ta. Chúng ta không phải bình luận thêm nữa. Chỉ xóa mã. Chúng ta sẽ không mất nó. Hứa đó :D.

## 4.3. Đừng comment khi bạn có thể sử dụng biến để thay thế
Hãy ưu tiên sử dụng biến, hàm hơn là comment. Thay vì comment nhiều như thế này

```C
// does the module from the global list <mod> depend on the
// subsystem we are part of?
if (smodule.getDependSubsystems().contains(subSysMod.getSubSystem()))
```
Hãy biến chúng thành các biến:
```C
ArrayList moduleDependees = smodule.getDependSubsystems();
String ourSubSystem = subSysMod.getSubSystem();
if (moduleDependees.contains(ourSubSystem))
```
Lần đầu viết đoạn code bạn có thể comment và sau đó viết đoạn code để thực hiện comment đó. Tuy nhiên trong lần tái cấu trúc, hãy thêm biến để xóa bỏ các comment đó như ông Robert Cecil Martin đã làm =))

## 4.4. Nonlocal Information
Ý tưởng chung của nó là khi bạn comment gì thì bạn tập trung vào vấn đề đó. Nếu bạn phải viết comment và sau đó, hãy chắc chắn nó miêu tả cho đoạn code xuất hiện gần đó. Không được cung cấp thông tin toàn hệ thống trong ngữ cảnh nào đó xa xôi:
```php
/**
* Port on which fitnesse would run. Defaults to <b>8082</b>.
*
* @param fitnessePort
*/
public void setFitnessePort(int fitnessePort)
{
    this.fitnessePort = fitnessePort;
}
```
## 4.5. Comment có quá nhiều thông tin
Comment không cần đưa lịch sử công nghệ vào :v, chỉ cần đưa RFC cho họ tự tìm là được rồi:
```php
/*
RFC 2045 - Multipurpose Internet Mail Extensions (MIME)
Part One: Format of Internet Message Bodies
section 6.8. Base64 Content-Transfer-Encoding
The encoding process represents 24-bit groups of input bits as output
strings of 4 encoded characters. Proceeding from left to right, a
24-bit input group is formed by concatenating 3 8-bit input groups.
These 24 bits are then treated as 4 concatenated 6-bit groups, each
of which is translated into a single digit in the base64 alphabet.
When encoding a bit stream via the base64 encoding, the bit stream
must be presumed to be ordered with the most-significant-bit first.
That is, the first bit in the stream will be the high-order bit in
the first 8-bit byte, and the eighth bit will be the low-order bit in
the first 8-bit byte, and so on.
*/
```

# Tổng kết
* Hạn chế đưa comment vào code của bạn, hãy cố gắng để các hàm, các biến, các lớp tự nói lên chức năng của nó. Một vài trường hợp "good comment" như comment về pháp lý để chứng thực tác giả, comment tổng quan về chắc năng hàm (input, output), comment để đưa ra lý do quyết định thực hiện quyết định (tại sao lại if, for, while ở chỗ này). Còn lại hầu như là các "bad comment".
* Lý thuyết chỉ mang tính chất lời khuyên để code của bạn dễ đọc hơn chứ không bắt buộc bạn phải tuân theo, vì vậy thực tiễn bạn có thể thay đổi, miễn là code của bạn dễ đọc với bạn và với team là được =)).
# Tài liệu tham khảo
Chapter 4: [Clean Code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)