# 1. Context
- Context là trạng thái của ứng dụng tại một thời điểm nhất định.
- Context là 1 lớp cơ bản chứa hầu hết các thông tin về môi trường ứng dụng của android, tức là mọi thao tác, tương tác với hệ điều hành đều phải thông qua lớp này.
- Context là 1 abstract class, nó cung cấp cho các lớp triển khai các phương thức truy cập vào tài nguyên của ứng dụng và hệ thống. Ví dụ như nó có thể khởi tạo và chạy các activities, broadcast, các intents....
- Sở dĩ hầu hết các lớp liên quan đến UI (layout, button, textview...) đều phải super context vì bản thân chúng đảm nhận việc truy cập resource(R.id, R.layout...). Nếu chúng ta không tham chiếu đến Context thì sẽ không dùng được các resource mà chúng ta đã tạo ra.
- Hệ thống cấp bậc Context: 

Context

| — ContextWrapper

| — — Application

| — — ContextThemeWrapper

| — — — Activity

| — — Service

| — — — IntentService

| — MockContext

Thông thường, bạn hay sử dụng 2 loại context là Application và Activity:

+ Application context: gắn liền với vòng đời của ứng dụng và luôn luôn giống nhau xuyên suốt vòng đời ứng dụng.
     getApplication(),
     getApplicationContext().
+ Activity context: gắn liền với vòng đời của Activity và nó sẽ bị hủy khi activity bị hủy.
    getBaseContext(),
    Activity.this.
    
Tips: Bất cứ khi nào bạn cần thao tác với Views hãy sử dụng Activity context, còn không sử dụng Application context là đủ.
Ví dụ: khi bạn sử dụng Toast, bạn có thể sử dụng 1 trong 2 loại contex trên, nhưng vì nó có thể được show lên từ bất cứ nơi đâu trong ứng dụng, vì vậy bạn nên sử dụng Application context là hợp lý (Trong head-first android họ cũng sử dụng getApplicationContext());

Tránh sử dụng getBaseContext() - lớp này được triển khai khi 1 class extends từ ContextWrapper. Mà lớp này lại có khoảng 40 lớp con trực tiếp và không trực tiếp. Vì vậy, nên gọi trực tiếp đến getContext, Activity, Fragment... để tránh gây ra memory leak.

getApplicationContext() là 1 instance của class Application - được dùng để duy trì trạng thái global cho app.

Lỗi mà mọi người hay gặp khi sử dụng context là Memory Leak.
# 2. Memory leak
+ Memory leak là rò rỉ bộ nhớ,  xảy ra khi bộ nhớ được cấp phát nhưng không bao giờ được giải phóng.
+ Trong khi làm việc với Android, đối tượng context rất hay được sử dụng, vì nó thường được sử dụng để load và truy cập vào resource.
+ Leak: được hiểu là việc bạn giữ 1 tham chiếu tới context và nó ngăn cản việc GC(Garbage Collection - trình thu gom rác) thu gom nó.
+ Khi xảy ra sự kiện xoay màn hình, activity sẽ bị destroy và recreate lại nhưng trạng thái của activity vẫn được giữ lại. Như vậy hệ thống sẽ load lại UI của ứng dụng từ resource. Trong trường hợp bạn cần load 1 cái gì đó nặng và không muốn phải load lại khi xoay màn hình thì bạn sẽ để nó là static.

Ví dụ mình có đoạn code như sau: 
```java
private statis Drawable sBackground;

Override
protected void onCreate(Bundle state){
    super.onCreate(state);
    
    TextView label = new TextView(this);
    label.setText("Leak is bad!");
    
    if(sBackground == null) {
        sBackground = getDrawable(R.drawable.bit_map);  
    }
    label.setBackgroundDrawable(sBackground);
    setContentView(label);
}
```
+ Đoạn code trên có vẻ khá nhanh, nhưng lại thực sự sai. Lúc này drawable sẽ giữ 1 tham chiếu đến TextView, mà chính nó lại có 1 tham chiếu đến context (activity). Đây là trường hợp đơn giản nhất dẫn đến memory leak, còn nhiều trường hợp nữa sẽ dẫn đến memory leak nhiều hơn và gây ra out of memory nhanh hơn(inner class).

Có 2 cách đơn giản để tránh memory leak trong trường hợp này:
+ Tránh thoát khỏi context trong phạm vi
+ Sử dụng Application context: context này sẽ sống khi ứng dụng sống và nó không phụ thuộc vào vòng đời của activity. Nếu bạn cần giữ 1 đối tượng lâu dài mà cần đến context thì nên dùng application context.

Tóm lại để tránh memory leak nên làm theo 1 số bước sau:

+ Không giữ reference đến context trong thời gian dài(1 reference nên đi cùng với vòng đời của activity)
+ Cố gắng sử dụng application context thay vì activity context
+ Nên để inner class là static và sử dụng WeakReference
+ Không khai báo biến static cho view hoặc activity
+ Nhớ rằng luôn unregister broadcast, timer trong activity. Cancel asyncTask, thread trong onDestroy
+ Sử dụng weakReference khi cần 
+ Một Garbage collector không chống lại được memory leak.

# 3. Cách tránh memory leak 
Có một số cách cụ thể để tránh Memory Leak như sau:

a. Broadcast receiver
- Nếu đăng ký ở onStart() thì nên hủy đăng ký ở onStop().
- Nếu đăng ký ở onResume() thì nên hủy đăng ký ở onPause()
- Và nên hủy đăng ký ở onDestroy

b. Static Activity and View Reference
- Nếu bạn khai báo view hoặc activity là static thì sẽ ngăn GC không thu hồi được bộ nhớ khi activity bị destroy. Vì vậy đừng bao giờ khai báo chúng là static.

c. Singleton class reference
- Không nên truyền activity context vào class singleton, thay vào đó là truyền application context.
- Hủy singleton trong onDestroy. Nếu bạn truyền activity context vào trong class singleton thì hãy đảm bảo nó được set về null.
Inner class reference
- Như đã đề cập ở trên, đừng bao giờ khai báo static cho biến inner class
- Nên khai báo inner class là static class
- Hoặc là sử dụng weakReference cho view/activity, vì GC có thể thu gom chúng.

d. Anonymous class reference
- Tương tự ý trên

e. AsyncTask reference
- Luôn cancel asyncTask trong onDestroy
- Nếu class AsyncTask được khai báo trong activity thì nó nên để static class (như ý trên).
- Có thể sử dụng weakReference

f. Thread reference
- Gọi thread.interrupt trong onDestroy.

g. TimerTask reference
- Cancel timer trong onDestroy.

Trên đây là một số cách tránh Memory Leak, mọi người tham khảo nhé. Chúc mọi người code vui vẻ.

# Tham khảo
[Context ](https://developer.android.com/reference/android/content/Context)

[What is Context in Android ?](https://www.geeksforgeeks.org/what-is-context-in-android/)

[9 Cách tránh Memory Leak](https://medium.com/android-news/9-ways-to-avoid-memory-leaks-in-android-b6d81648e35e)