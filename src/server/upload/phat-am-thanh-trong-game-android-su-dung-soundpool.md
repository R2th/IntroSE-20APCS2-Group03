### SoundPool là gì
SoundPool là một tập hợp các mẫu âm thanh được tải vào bộ nhớ từ resource bên trong file APK hoặc từ hệ thống file. Điều đó có nghĩa là nó được thiết kế để chơi những file âm thanh ngắn, do đó nó phù hợp cho việc tạo hiệu ứng âm thanh trong game ví dụ đạn nổ, ăn coin, lên level.

### Tạo SoundPool
```Java
SoundPool sp = new SoundPool(10, AudioManager.STREAM_MUSIC, 0);
```

với Android 5.0 trở lên cách tạo SoundPool sẽ khác như sau:
```Java
AudioAttributes attrs = new AudioAttributes.Builder()
        .setUsage(AudioAttributes.USAGE_GAME)
        .setContentType(AudioAttributes.CONTENT_TYPE_SONIFICATION)
        .build();
SoundPool sp = new SoundPool.Builder()
        .setMaxStreams(10)
        .setAudioAttributes(attrs)
        .build();
```

Đoạn code trên tạo sound pool cho tối đa là 10 luồng âm thanh (số luồng âm thanh phát đồng thời) và sử dụng stream là `AudioManager.STREAM_MUSIC`.

Để có thể điều chỉnh volume đúng đến stream Music trong game của bạn cần gọi method sau ở Activity cần control volume:
```Java
setVolumeControlStream(AudioManager.STREAM_MUSIC);
```

### Load âm thanh vào SoundPool
Khi đã tạo SoundPool xong bạn cần load các đoạn âm thanh muốn play vào để có thể sẵn sàng phát bất cứ khi nào.
Cần ghi nhớ id của các đoạn âm thanh hiệu ứng để có thể play
```Java
int soundIds[] = new int[10];
soundIds[0] = sp.load(context, R.raw.sound_explosion, 1);
soundIds[1] = sp.load(context, R.raw.sound_gain_coin, 1);
soundIds[2] = sp.load(context, R.raw.sound_level_up, 1);
//load các file hiệu ứng âm thanh cho game và lưu lại id
```

### Play âm thanh đã load
Khi cần phát âm thanh giả sử ăn coin 
```Java
sp.play(soundIds[1], 1, 1, 1, 0, 1.0);
```

Với các params như sau:

* soundID id của file âm thanh return từ method load()
* leftVolume volume của kênh bên trái (range = 0.0 to 1.0)
* rightVolume volume của kênh bên phải (range = 0.0 to 1.0)
* Độ ưu tiên (0 = lowest priority)
* Chế độ lặp âm thanh (0 = no loop, -1 = loop forever)
* Tốc độ chơi (1.0 = normal playback, range 0.5 to 2.0)

### Phần kết
Bạn cần nhớ rằng SoundPool không nên sử dụng để play files có dung lượng quá 1MB, file càng nhỏ thì hiệu năng càng tốt cho ứng dụng.

Một điều nữa bạn cần phải release SoundPool sau khi sử dụng xong, hoặc trong onDestroy của activty.

HẾT.