Chào mọi người, kì này chúng ta sẽ cùng nhau tìm hiểu cách thao tác audio với Xamarin for Android, qua 1 sample Audio playing nhé. :grinning: 
***
 **Add class Media Player và copy file audio vào thư mục solution**  
Tạo project mới (tạm đặt tên là MusicApp nhé): New -> Project -> Android App (Xamarin) .  
Kế tiếp mình add using Android.Media.  
```
    using Android.App;
    using Android.OS;
    using Android.Support.V7.App;
    using Android.Runtime;
    using Android.Widget;
    using Android.Media;
```
Kế tiếp chúng ta tạo 1 thư mục mới trong thư mục Resources, đặt tên là **raw**. Thư mục này sẽ dùng để chứa file audio của chúng ta. Copy 1 file audio vào đây.   
![](https://images.viblo.asia/283321e0-9e63-4afe-8162-f179e5d4629e.png)
***
**Tạo đối tượng player để thao tác audio file**  
Ở MainActivity.cs, chúng ta khai báo đối tượng player để thao tác file audio.  
```
MediaPlayer _player;
```
Sau đó ở hàm OnCreate chúng ta khởi tạo đối tượng.  
```
_player = MediaPlayer.Create(this, Resource.Raw.Rockabye); 
```  
Ở MainActivity.xaml chúng ta khai báo 2 button là playButton và pauseButton.  
```
<Button
        android:text="@string/playButton"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:minWidth="25px"
        android:minHeight="25px"
        android:id="@+id/playButton" />
    <Button
        android:text="@string/pauseButton"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:minWidth="25px"
        android:minHeight="25px"
        android:id="@+id/pauseButton" />
```
Text của button thì các bạn khai báo ở file Resources\values\strings.xml nhé.  
Kế đến chúng ta vào file MainActivity.cs và thêm code cho phần play pause button như sau:  
```
            var playButton = FindViewById<Button>(Resource.Id.playButton);
            playButton.Click += delegate {
                _player.Start();
            };
            var pauseButton = FindViewById<Button>(Resource.Id.pauseButton);
            pauseButton.Click += delegate {
                _player.Pause();
            };
```
Đây là code của hàm OnCreate sau khi implement đoạn trên vào.  
![](https://images.viblo.asia/f54ba95f-102e-4a41-8199-ebf053b34818.png)
Run source với device simulator, chúng ta sẽ có giao diện sample như sau: 
![](https://images.viblo.asia/40e6aa42-8e1a-4b41-8613-0baf288432d1.png)

Và giờ thì chạy thử và test play pause music nhé. :grinning:  
***
**Tạm kết**  
 Trên đây là 1 sample play music với Xamarin for Android. Lần tới chúng ta sẽ cùng nhau tiếp tục thêm các nội dung khác để cái sample này xịn sò hơn nhé (load playlist, thêm button, seekbar các thứ). :roller_coaster::roller_coaster::roller_coaster:
***
Link tham khảo:  
https://docs.microsoft.com/en-us/xamarin/xamarin-forms/  
https://www.c-sharpcorner.com/article/how-to-play-audio-in-xamarin-android-app-using-visual-studio-2015/