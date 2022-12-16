# I. Dẫn nhập
* Như trong nội dung bài viết trước của mình về [Xử lý Android Intent với Google Chrome cho Android]( https://viblo.asia/p/xu-ly-android-intent-voi-google-chrome-cho-android-63vKjke6Z2R), với việc khai báo **package-name** đính kèm nếu trong trường hợp không tìm thấy app trên device, Android OS sẽ tự động mở Google Play Store để user có thể cài app (đương nhiên là app của chúng ta phải được public ^^). Tuy nhiên, sẽ xảy ra một vấn đề ở đây là những param mà chúng ta đính kèm trong Intent sẽ không thể nhận được khi app được user cài vào máy từ Google Play Store. 
* Đặt ra một tình huống cụ thể, khách hàng muốn khuyến khích user cài đặt app bằng nguồn chính thống từ Google Play Store thông qua một đường link giới thiệu để nhận voucher khuyến mãi. Đối với những user cài đặt app thành công từ nguồn chính thống và mở app lần đầu tiên thì họ sẽ nhận voucher khuyến mãi; còn khi cài đặt từ những nguồn khác thì sẽ không có gì! Tình huống đặt ra nghe có vẻ khó khả thi vì chúng ta phải thông qua một bên thứ ba (Google Play Store) để hiện thực điều mà khách hàng mong muốn ^^.
* Để giải quyết được tình huống nêu trên, trong bài viết này mình sẽ giới thiệu cho các bạn về [Google Play Referrer](https://developer.android.com/google/play/installreferrer).
# II. Nội dung chính
## 1. Yêu cầu để sử dụng Google Play Referrer:
* Để có thể sử dụng **Google Play Referrer** đúng như mong muốn, chúng ta phải thoải mãn 2 yêu cầu sau:
1. App chưa được cài đặt. Điều này là bắt buộc, vì nếu đã cài đặt rồi thì user làm sao có thể cài đặt từ Google Play Store ^^
2. Không thể sử dụng chung với Android Intent của Google Chrome (**Chrome Intent**) bởi vì chúng ta sẽ phải thông qua Google Play Store. Chrome Intent chỉ hữu dụng khi app đã được cài đặt.
## 2. Cấu hình cho Google Play Referrer:
* Đầu tiên, chúng ta sẽ cấu hình trong file **AndroidManifest.xml** bằng cách đăng ký một **receiver** để nhận thông tin từ Google Play Store:
```
<receiver android:name="com.demo.sun.InstallListener" android:exported="true">
	<intent-filter>
		<action android:name="com.android.vending.INSTALL_REFERRER" />
	</intent-filter>
</receiver>
```
* Trong trường hợp này, **com.demo.sun.InstallListener** đóng vai trò là một Broadcast Receiver. Chúng ta sẽ xử lý logic trong class này:
```
public class InstallListener extends BroadcastReceiver {
    @Override
    public void onReceive(Context context, Intent intent) {
    	// called in the install referrer broadcast case
    }
}
```
## 3. Xử lý app logic
* Sau khi đã có Broadcast Receiver, chúng ta sẽ tiến hành xử lý param mong muốn:
```
@Override
public void onReceive(Context context, Intent intent) {
	String rawReferrerString = intent.getStringExtra("referrer");
	if(rawReferrerString != null) {
		Log.i("MyApp", "Received the following intent " + rawReferrerString);
	}
}
```
## 4. Xử lý luồng data
* Chúng ta cần xử lý khi user truy cập vào đường link giới thiệu, thông thường là sẽ redirect tới trang thông tin của app trên Google Play Store như sau:
1. market://details?id=com.demo.sun
2. https://play.google.com/store/apps/details?id=com.demo.sun
* Để đính kèm param, chúng ta thêm **&referrer=special_param** vào hai link trên. Với **special_param** là giá trị mong muốn nhận được. Việc xử lý redirect này sẽ được từ phía server, ví dụ như gọi một hàm như sau:
```
var fallbackFunction = function() {
	window.location.replace('market://details?id=com.demo.sun&referrer=special_param');
};
```
# III. Kết
* Hy vọng với nội dung của bài viết này, các bạn sẽ có thêm một sự lựa chọn tối ưu để giải quyết các yêu cầu từ phía khách hàng.
* Nội dung bài viết mình có tham khảo [đây]( https://blog.branch.io/technical-guide-to-google-play-referrer/)