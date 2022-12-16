![](https://images.viblo.asia/b01e60e5-a004-44c8-88fe-6c60ae64681b.png)

Nhóm thiết kế của Google định nghĩa rõ ràng về Settings trong ứng dụng Android của bạn thực hiện những việc gì :

*Settings của ứng dụng cho phép người dùng chỉ ra tùy chọn để ứng dụng hoạt động như thế nào.*

Google cũng nói rõ rằng rằng người dùng của bạn nên điều hướng đến màn hình cài đặt ứng dụng, hoặc từ menu điều hướng, hoặc trên thanh toolbar, với item Settings.

Thêm màn hình Settings trong ứng dụng của bạn cho phép người dùng có quyền kiểm soát một số chức năng của ứng dụng. 
Điều này làm cho trải nghiệm của dùng được tốt hơn, khi mà người dùng lúc này kiểm soát được ứng dụng hoạt động như thế nào.

Chúng tôi khuyên bạn nên cấp quyền truy cập cài đặt ứng dụng. Điều này sẽ cung cấp trải nghiệm người dùng tốt hơn cho người dùng của bạn, dẫn đến đánh giá tốt hơn trên Google Play, dẫn đến tăng số lần tải xuống ứng dụng (tăng doanh thu).

Tôi cho rằng bạn phải tương tác với cài đặt của ứng dụng trên thiết bị của mình, ví dụ bằng cách chọn nhạc chuông mặc định hoặc bằng cách kiểm soát quyền riêng tư trên ứng dụng. 
Hầu như tất cả các ứng dụng phổ biến nhất mà bạn đã tải xuống hoặc sẽ tải xuống trên Google Play, đều bao gồm màn hình Settings để bạn kiểm soát hành vi của ứng dụng.

Ví dụ về một ứng dụng phổ biến có màn hình cài đặt là ứng dụng Chrome của Google. Trong màn hình cài đặt của ứng dụng này, người dùng có thể chọn công cụ tìm kiếm mặc định, thay đổi hành vi thông báo, kiểm soát sự riêng tư của người dùng, v.v. ..

Bạn có thể tự mình xem nội dung này bằng cách tải xuống ứng dụng Chrome từ Google Play (nếu bạn chưa có nó thiết bị của bạn). 
Ảnh chụp màn hình sau đây là từ ứng dụng Chrome, hiển thị màn hình cài đặt của ứng dụng.

![](https://images.viblo.asia/6492a186-8335-439c-86c6-36e97f5adbea.png)

Trong bài đăng này, bạn sẽ học cách tạo màn hình cài đặt ứng dụng và cũng như cách đọc các giá trị người dùng đã chọn từ cài đặt ứng dụng. 

## Chuẩn bị

* Hiểu biết cơ bản về một số API của Android (như SharedPreferences).
* Android Studio : 3.0 trở lên.
* Plugin Kotlin : 1.1.51 hoặc cao hơn.

### 1. Tạo Android Studio Project

Mở Android Studio và tạo một project mới, với một activity rỗng , đặt tên là SettingsActivity. Bạn nhớ chọn **Include Kotlin support** nhé.

![](https://images.viblo.asia/65ad1bc3-1ea0-4be1-864b-2fa7f99259e4.jpg)

### 2. Tạo một PreferenceFragment

Để hỗ trợ API 11 (Honeycomb) trở lên, chúng ta có thể sử dụng PreferenceFragment. Lớp này chỉ đơn giản là một Fragment, hiển thị một thứ bậc của các đối tượng ưu tiên, chẳng hạn như danh sách.

```
import android.os.Bundle
import android.preference.PreferenceFragment
import android.support.v7.app.AppCompatActivity
 
class SettingsActivity : AppCompatActivity() {
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
 
        if (fragmentManager.findFragmentById(android.R.id.content) == null) {
            fragmentManager.beginTransaction()
                    .add(android.R.id.content, SettingsFragment()).commit()
        }
    }
 
 
    class SettingsFragment : PreferenceFragment() {
        override fun onCreate(savedInstanceState: Bundle?) {
            super.onCreate(savedInstanceState)
            addPreferencesFromResource(R.xml.preferences)
        }
    }
}
```

Trong đoạn mã ở trên, chúng ta đã tạo một lớp SettingsFragment bên trong SettingsActivity (vì lớp SetttingsFragment quá nhỏ). 
Lưu ý rằng lớp SettingsFragment của chúng ta kế thừ từ PreferenceFragment, và có phương thức addPrerenceFromResource bên trong onCreate (). 

Trong phương thức này, chúng tôi đã cung cấp cho nó một ID tài nguyên R.xml.preference của XML, để khởi chạy-khi Fragment được tạo. 

Cuối cùng, chúng ta lưu trữ Fragment vào Activity, bằng cách sử dụng FragmentTransaction để thêm nó vào UI-bên trong onCreate () của SettingsActivity.

### 3. Tạo Preferences

Tạo file XML và đặt tên là preferences.xml. Lưu file này bên trong thư mục res / xml trong project. 

Lưu ý rằng bạn có thể đặt tên file này với bất kỳ tên nào, nhưng thông thường bạn nên sử dụng tên "preferences". Ngoài ra, bạn thường chỉ nên có một file như vậy trong một project.

```
<?xml version="1.0" encoding="utf-8"?>
<PreferenceScreen xmlns:android="http://schemas.android.com/apk/res/android">
    <CheckBoxPreference
            android:key="checkbox"
            android:summary="Tap to check if on or off"
            android:title="Checkbox Preference" />
    <RingtonePreference
            android:key="ringtone"
            android:showDefault="true"
            android:showSilent="true"
            android:summary="Pick a ringtone you like"
            android:title="Ringtone Preference" />
    <EditTextPreference
            android:dialogTitle="Enter a text"
            android:key="text"
            android:summary="Click to show a text entry dialog"
            android:title="EditText Preference" />
    <ListPreference
            android:dialogTitle="Select duration"
            android:entries="@array/settings_list_preference_titles"
            android:entryValues="@array/settings_list_preference_values"
            android:key="list"
            android:summary="Click to show a list to choose from"
            android:title="List Preference" />
    <SwitchPreference
            android:key="switch"
            android:title="Switch Preference"
            android:summary="Click to switch on or off"
            android:defaultValue="true"/>
</PreferenceScreen>
```

File xml bắt đầu với thẻ <PreferenceScreen> . Bên trong thẻ này, chúng ta có các thuộc tính sau :
    
* android: key: thuộc tính này được sử dụng để lấy giá trị trong đối tượng SharedPreferences.
* android: title: đặt tiêu đề cho Preference. Đây là văn bản đậm.
* android: summary: thiết lập bản tóm tắt cho Preference (điều này không bắt buộc). Đây là văn bản nhạt màu dưới tiêu đề.
* android: defaultValue: đặt giá trị mặc định cho Preference.

Chúng ta sẽ đi qua từng Preference mà chúng ta đã định nghĩa ở trên. Lưu ý rằng bạn cũng có thể thêm hoặc tùy chỉnh Preference qua trình chỉnh sửa tuỳ chọn Android Studio.

![](https://images.viblo.asia/681aa23b-ae74-4788-bcd0-9b382a0f6362.png)