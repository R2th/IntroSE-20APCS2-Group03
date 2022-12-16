![](https://images.viblo.asia/b494704d-dcf5-45a3-800c-668cfdbcf672.png)


# Tôi nên dùng Context nào trong Android?

> Đối với những dev mới thì chỉ cần nói đến Context là gì cũng đủ khiến họ cảm thấy thách thức, đối với các dev đã có kinh nghiệm thì đôi cũng có thể dễ bị nhầm lẫn khi lựa chọn nên sử dụng Context nào cho hợp lý. Mà nếu sử dụng sai cũng có thể gây ra các vấn đề memory leak,...



-----


Sự nhầm lẫn xuất phát chủ yếu từ thực tế là có một số cách để truy cập Context mà không có sự khác biệt rõ rệt (nhìn thoáng qua). Dưới đây là bốn cách mà bạn có thể truy cập Context trong một Activity.

* getContext()
* getBaseContext()
* getApplicationContext()
* getActionBar().getThemedContext()

# Context là cái gì nhỉ?
Theo cá nhân mình nghĩ thì Context là trạng thái của app của bạn ở bất kỳ thời điểm nào. App context đại diện cho một global hoặc base configuration của app và một Activity hoặc Service có thể được xây dựng dựa trên nó và đại diện cho một configuration instance của app của bạn hoặc một trạng thái chuyển tiếp cho nó.

Nhìn vào [source code của Context](https://github.com/android/platform_frameworks_base/blob/master/core/java/android/content/Context.java), bạn có thể thấy rằng Context là một abstract class và các comment ở trong class đó là:

> Interface to global information about an application environment. This is an abstract class whose implementation is provided by the Android system. It allows access to application-specific resources and classes, as well as up-calls for application-level operations such as launching activities, broadcasting and receiving intents, etc.


-----



Điều mà mình nhận ra ở đây là Context cung cấp một triển khai hay dùng để truy cập các application level như là tài nguyên của hệ thống. Các tài nguyên ở mức độ application có thể truy cập các thư như là các String resource (`getResources()` hoặc `getAssets()`) và tài nguyên ở mức độ system là bất cứ thứ gì mà bạn truy cập nó bằng `Context.getSystemService()`.



-----


Một vấn đề thực tế, hãy xem qua các comment ở các method, chúng củng cố các khái niệm sau:

* getSystemService(): Trả về một tham chiếu đến một service ở mức độ system bằng tên. Lớp của đối tượng được trả về thay đổi bởi tên được yêu cầu.
* getResources(): Trả về một Resources instance cho package của app của bạn.
* getAssets(): Trả về một Resources instance cho package của app của bạn.

Tất cả các phương thức trên ở trong class Context đều là abstract method! Chỉ có một instance của `getSystemService(Class)` có một triển khai và nó gọi đến một abstract method. Nghĩa là, triển khai của chúng được cung cấp hầu hết là bởi các class triển khai chúng, bao gồm các class sau:
* ContextWrapper
* Application
* Activity
* Service
* IntentService

Hệ thống cấp bậc ở docs chính thức của Google là:

Context 

| — ContextWrapper 

|— — Application 

| — — ContextThemeWrapper 

|— — — — Activity 

| — — Service 

|— — — IntentService


# ContextThemeWrapper
Cùng xem một số method nào:
```java
@Override
public Resources getResources() {
if (mResources != null) {
 return mResources;
}
if (mOverrideConfiguration == null) {
 mResources = super.getResources();
 return mResources;
} else {
 Context resc = createConfigurationContext(mOverrideConfiguration);
 mResources = resc.getResources();
 return mResources;
}
}
@Override public Resources.Theme getTheme() {
  if (mTheme != null) {
   return mTheme;
  }
  mThemeResource = Resources.selectDefaultTheme(
                        mThemeResource,
                         getApplicationInfo().targetSdkVersion);
  initializeTheme();
  return mTheme;
}
@Override public Object getSystemService(String name) {
if (LAYOUT_INFLATER_SERVICE.equals(name)) {
 if (mInflater == null) {
  mInflater = LayoutInflater.from(
                     getBaseContext()).cloneInContext(this);
 }
 return mInflater;
}
return getBaseContext().getSystemService(name);
}

```
Bất kỳ cái gì extend từ ContextThemeWrapper đều sử dụng theme của bạn khi trả về các System resource và các application resource. Class này cũng triển khai getBaseContext() được sử dụng trong Context.

Có 3 điều mà mình nhận ra khi nhìn qua ContextThemeWrapper:

* Bất kỳ cái gì extend ContextThemeWrapper sẽ luôn luôn là Activity hoặc một class mà là subclass của Activity.
* ContextThemeWrapper lấy theme vào trong account khi truy cập các system service và các application resource.
* Mình sẽ tránh sử dụng getBaseContext().

# Tại sao tránh sử dụng getBaseContext()?
BaseContext trả về bất kỳ context nào được bao bởi ContextWrapper. Bằng cách nhìn vào code, mình có thể nói rằng cái này giống như một Activity hoặc Application tuy nhiên ContextWrapper có hơn 40 con trực tiếp và không trực. Đây chính là vấn đề, nghĩa là cái mà method này trả về sẽ mơ hồ và mình sẽ ưu tiên sử dụng getContext() hoặc Activity, FragmentActivity, ActionBarActivity,... trực tiếp **để mình có thể biết rằng cái mà mình đang giữ là gì và mình giữ tham chiếu đến cái gì có thể gây ra memory leak**. 

# ContextThemeWrapper sẽ áp dụng application theme của bạn

Đoạn code mà mình đã chia sẻ ở trên không thực sự rõ ràng, tuy nhiên bạn cũng có thể test để xác nhận nó. Theo mình nghĩ Cách tốt nhất để làm việc này là tạo một app đơn giản với một ListView mà sử dụng `android.R.layout.simple_list_item_1` để hiển thị các item. Để app theme mặc định của bạn là Light và khởi tạo ArrayAdapter bằng cách sử dụng getApplicationContext(). Bạn sẽ để ý rằng text sẽ không nhìn thấy hoặc hiếm khi nhìn thấy bởi vì mặc định là màu trắng. Thay đổi code để array adapter nhận “this” hoặc đơn giàn getContext() và bạn sẽ thấy text của mình.


# Khi nào nên dùng getApplicationContext() ?
`getApplicationContext()` trả về một instance của class Application. Application được dùng để duy trì một trạng thái global cho app của bạn. Bạn có thể có hoặc không cung cấp triển khai của bạn trong class này.

Có nên sử dụng Application Context không? Trả lời các câu hỏi sau:
* Đối tượng mà truy cập context có tồn tại lâu không? Việc giữ tham chiếu đến Activity trong một đối tượng tồn tại lâu hoặc thread có thể gây ra memory leak. Trong trường hợp này, nên sử dụng application context.
* Bạn có đang truy cập bất kỳ system service nào hoặc các application resource nào mà nên “được theme” không? Ví dụ, việc inflate các View hoặc fetch các drawable có màu? Nếu bạn đang fetch cái gì đó mà sử dụng theme thì không nên sử dụng application context.

Một số lưu ý:
* Không sử getApplicationContext() với LayoutInflater, trừ khi bạn thực sự muốn bỏ qua theme của bạn.
* Khi không chắc chắn, cố gắng sử dụng getApplicationContext() đầu tiên.

# Khi nào nên sử dụng getThemedContext()?
Method getThemedContext() xuất hiện đầu tiên ở ActionBar. Mục đích chính của method này là để cung cấp chính xác theme context đến các View mà bạn muốn thêm vào ActionBar. Tưởng tượng rằng một app mà sử dụng một light theme với dark actionbar. Bất kỳ text nào hoặc custom view bạn thêm vào ActionBar cần được theme cho dark theme. Đây là lúc getThemedContext() hữu dụng.

# Khi nào chúng ta nên sử dụng getContext()?
Bạn có thể sử dụng getContext() trong hầu hết mọi instance mà không tồn tại lâu dài và không liên quan đến việc thêm các View vào trong ActionBar. Bạn hoàn toàn có thể sử dụng nó trong các instance tồn tại lâu dài nhưng phải cẩn thận giữ nó trong WeakReference và check nếu nó null.

# Lời kết
Mình hy vọng bài viết này làm sáng tỏ Context nào mà bạn nên sử dụng. Hãy comment nếu bạn thấy có gì đó sai sai hoặc bổ sung thêm để bài viết này hay hơn nhé!

Nguồn: https://nguyenanhtoan.com/cung-tim-hieu-ve-context-trong-android/