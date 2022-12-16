# **1. Notification là gì ?**

Một notification là một thông điệp mà Android hiển thị bên ngoài giao diện ứng dụng của bạn để cung cấp cho người dùng lời nhắc, tin nhắn, hay bất kỳ thông tin gì từ ứng dụng của bạn. Người dùng có thể nhấn vào notification để mở ứng dụng, hoặc thực hiện một hành động trực tiếp trên notification như gửi tin nhắn.

Ví dụ :
![image.png](https://images.viblo.asia/d56640a6-7b99-4f6f-8f37-8788883b0e0e.png)


# **2. Channel trong Notification**

Kể từ Android 8.0 trở lên, ta phải đăng ký notification channel của app với hệ thống, còn với những phiên bản thấp hơn thì nó sẽ được bỏ qua

```
class MyApplication : Application() {

    companion object{
        fun CHANNEL_ID_GAME() = "Channel Game"
    }

    override fun onCreate() {
        super.onCreate()

        // Create the NotificationChannel
        createNotificationChannel()
    }

    private fun createNotificationChannel() {

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

            // Create the NotificationChannelGame
            val nameChanelGame = getString(R.string.channel_game_name)
            val descriptionTextChanelGame = getString(R.string.channel_game_description)
            val importanceChanelGame = NotificationManager.IMPORTANCE_DEFAULT
            val mChannelGame = NotificationChannel(MyApplication.CHANNEL_ID_GAME(), nameChanelGame, importanceChanelGame)
            mChannelGame.description = descriptionTextChanelGame

            // Register the channel with the system; you can't change the importance
            // or other notification behaviors after this
            val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(mChannelGame)
        }
    }
}
```

# **3. Cách tạo một Notification**

### 3.1. Với phiên bản Android 8.0 trở xuống

```
val notification = NotificationCompat.Builder(this)
       .setContentTitle(CONTEND_TITLE_CHANEL_GAME)
       .setContentText(CONTENT_NOTIFICATION_CHANEL_GAME)
       .setSmallIcon(R.drawable.ic_baseline_videogame_asset_24)
       .setLargeIcon(bitmap)
       .setColor(resources.getColor(R.color.red))
       .setAutoCancel(true)
       .build()
```

Notification khi được khởi tạo
![image.png](https://images.viblo.asia/9245f672-dcad-4a0d-bb6f-7a00875ef4e1.png)

### 3.2. Với phiên bản Android 8.0 trở lên
Notification phải được gắn liền với 1 Channel ID được khởi tạo trước (như ví dụ tạo chanel trên)

```
val notification = NotificationCompat.Builder(this, MyApplication.CHANNEL_ID_GAME())
       .setContentTitle(CONTEND_TITLE_CHANEL_GAME)
       .setContentText(CONTENT_NOTIFICATION_CHANEL_GAME)
       .setSmallIcon(R.drawable.ic_baseline_videogame_asset_24)
       .setLargeIcon(bitmap)
       .setColor(resources.getColor(R.color.red))
       .setAutoCancel(true)
       .build()
```

Notification khi được khởi tạo
![image.png](https://images.viblo.asia/65c5b20c-57ad-4875-a5ef-ccbf51c0695b.png)


# **4. Quản lý Notification bằng Channel**

Channel cho phép người dùng lựa chọn thông báo nào của ứng dụng được phép hiển thị. Nếu một ứng dụng chỉ sử dụng một channel để hiển thị tất cả các Notification, người dùng sẽ không thể lựa chọn Notification mà họ muốn xem, và nếu người dùng chặn một channel Notification thì có thể họ sẽ không bao giờ nhận được Notification từ ứng dụng nữa.

Ta sẽ khởi tạo 2 Chanel và xem sẽ có gì xảy ra
```
class MyApplication : Application() {

   companion object{
       fun CHANNEL_ID_GAME() = "Channel Game"
       fun CHANNEL_ID_JOB() = "Channel Job"
   }

   override fun onCreate() {
       super.onCreate()

       // Create the NotificationChannel
       createNotificationChannel()
   }

   private fun createNotificationChannel() {

       if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {

           // Create the NotificationChannelGame
           val nameChanelGame = getString(R.string.channel_game_name)
           val descriptionTextChanelGame = getString(R.string.channel_game_description)
           val importanceChanelGame = NotificationManager.IMPORTANCE_DEFAULT
           val mChannelGame = NotificationChannel(MyApplication.CHANNEL_ID_GAME(), nameChanelGame, importanceChanelGame)
           mChannelGame.description = descriptionTextChanelGame
           
           // Create the NotificationChannelJob
           val nameChanelJob = getString(R.string.channel_job_name)
           val descriptionTextChanelJob = getString(R.string.channel_job_description)
           val importanceChanelJob = NotificationManager.IMPORTANCE_DEFAULT
           val mChannelJob = NotificationChannel(MyApplication.CHANNEL_ID_JOB(), nameChanelJob, importanceChanelJob)
           mChannelJob.description = descriptionTextChanelJob

           // Register the channel with the system; you can't change the importance
           // or other notification behaviors after this
           val notificationManager = getSystemService(NOTIFICATION_SERVICE) as NotificationManager
           notificationManager.createNotificationChannel(mChannelGame)
           notificationManager.createNotificationChannel(mChannelJob)
       }
   }
}
```
Khi ta mở phần Setting của ứng dụng ta sẽ thấy 2 Channel vừa tạo
![image.png](https://images.viblo.asia/788e68c5-a9f3-42ad-85fb-70db93fdf152.png)
Nếu tắt thông báo từ các Channel thì ta sẽ không nhận được thông báo từ Channel đó nữa cho đến khi ta mở thông báo lại