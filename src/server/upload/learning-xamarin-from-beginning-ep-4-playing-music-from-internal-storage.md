Chào mọi người, kì trước chúng ta đã cùng làm 1 sample Audio playing, hôm nay chúng ta tiếp tục tìm hiểu thêm về load các file music từ Local và play với Xamarin Android nhé. :grinning: 
***
 **Access to Local storage**  
Tiếp tục sử dụng source của [kì trước](https://viblo.asia/p/learning-xamarin-from-beginning-ep-3-audio-playing-Ljy5Vy1olra) , chúng ta mở MainActivity.cs và thêm một số using cần thiết như sau:     
```    
using System;
using System.IO;
using static Android.Widget.AdapterView;
using System.Linq;
using Xamarin.Essentials;
```
Nếu solution của bạn chưa add NuGet Package Essentials thì bạn right click vào Project -> **Manage NuGet Packages...**, chọn tab **Browse**, tìm theo tên **Xamarin.Essentials** và install nhé. Chúng ta cần dùng nó cho việc yêu cầu cấp quyền truy cập Internal Storage đấy.  
Kế tiếp ở MainActivity.cs chúng ta thêm đoạn code để yêu cầu cấp quyền truy cập vào hàm **OnCreate** như sau:  
```
public class MainActivity : AppCompatActivity
    {
        MediaPlayer _player = new MediaPlayer();
        protected override async void OnCreate(Bundle savedInstanceState)
        {
            base.OnCreate(savedInstanceState);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            // Set our view from the "main" layout resource
            SetContentView(Resource.Layout.activity_main);
            Xamarin.Essentials.Platform.Init(this, savedInstanceState);
            var permission = await Xamarin.Essentials.Permissions.CheckStatusAsync<Xamarin.Essentials.Permissions.StorageRead>();
            if (permission != PermissionStatus.Granted)
            {
                permission = await Xamarin.Essentials.Permissions.RequestAsync<Xamarin.Essentials.Permissions.StorageRead>();
            }
```
***
**Load music files từ Internal Storage và xử lý Play Music khi chọn 1 item**  
Ở activity_main.xml chúng ta thêm một LinearLayout để chứa MusicList như bên dưới, ngay trên 2 button Play và Pause.  
```
<LinearLayout
        android:orientation="vertical"
        android:minWidth="25px"
        android:minHeight="25px"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:id="@+id/linearLayout1">
        <ListView
            android:minWidth="25px"
            android:minHeight="25px"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:id="@+id/musicList" />
    </LinearLayout>
```
Tiếp theo chúng ta truy cập vào Internal Storage, load nhạc trong thư mục Music lên 1 ListView bằng đoạn code sau, cũng ở trong hàm OnCreate.  
```
string MusicDirectory = Android.OS.Environment.GetExternalStoragePublicDirectory(Android.OS.Environment.DirectoryMusic).ToString();
            var musicList = (ListView)FindViewById(Resource.Id.musicList);
            var list = Directory.EnumerateFiles(Convert.ToString((Android.OS.Environment.GetExternalStoragePublicDirectory(Android.OS.Environment.DirectoryMusic))), 
                "*", SearchOption.AllDirectories).Select(Path.GetFileName).ToList(); 
            musicList.Adapter = new ArrayAdapter<String>(this, Android.Resource.Layout.SimpleListItem1, list);
```
Cuối cùng là ở event itemClick của ListView, chúng ta khởi tạo player theo file music và play thôi.  
```
musicList.ItemClick += (object sender, ItemClickEventArgs e) =>
            {
                string abc = Android.OS.Environment.GetExternalStoragePublicDirectory(Android.OS.Environment.DirectoryMusic).ToString();
                _player.Reset();
                _player.SetDataSource(this, Android.Net.Uri.Parse(MusicDirectory + "//" + musicList.GetItemAtPosition(e.Position).ToString()));
                _player.Prepare();
                _player.Start();
            }; 
```  
Chú ý là kì trước ở phần xử lý Play music chúng ta cần hàm _player.Prepare()_ nhé các bạn, kì trước chúng ta đã chép sẵn file nhạc vào project rồi, nên không cần hàm này, còn kì này chúng ta load file từ Internal Storage nên cần có hàm Prepare này.  
Run source với device simulator, chúng ta sẽ có giao diện sample như sau:  
![](https://images.viblo.asia/8b9e0262-8918-4149-9aff-761ac6040ce8.png)  

Và giờ thì chạy thử và test play pause music nhé. :grinning:  
***
**Tạm kết**  
 Chúng ta vừa thực hiện play music từ Internal Storage, kì tới chúng ta sẽ tiếp tục hoàn thiện các tính năng cho MusicApp của chúng ta nhé. :roller_coaster::roller_coaster::roller_coaster:
***
Link tham khảo:  
https://docs.microsoft.com/en-us/xamarin/xamarin-forms/  
https://www.c-sharpcorner.com/article/how-to-play-audio-in-xamarin-android-app-using-visual-studio-2015/  
https://docs.microsoft.com/en-us/xamarin/android/platform/files/