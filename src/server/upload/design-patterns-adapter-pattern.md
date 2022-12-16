Adapter Pattern hoạt động như một cầu nối giữa 2 giao diện không tương thích. Adapter Pattern được xếp vào nhóm các pattern Kiến Trúc.

Adapter Pattern sử dụng `01 class` đơn để đảm nhiệm việc kết nối các giao diện độc lập hoặc không tương thích.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/75591960-59be-404b-a24b-5c92aa4ef0c8.png)

- Chúng ta có `01 interface MediaPlaying` và `01 class` mô tả thực thể `MediaPlayer` triển khai giao diện đó. Mặc định thì `MediaPlayer` có thể phát các tệp định dạng Mp3.
- Ngoài ra chúng ta còn có `01 interface AdvancedPlaying` và các `class` triển khai giao diện bổ sung này. Các `class` này có thể phát các tệp Vlc hoặc Mp4.
- Bây giờ thì chúng ta muốn `MediaPlayer` có thể phát được các tệp định dạng khác nữa ngoài Mp3 mặc định.
- Để làm được điều này, chúng ta cần tạo `01 class MediaAdapter` triển khai `interface MediaPlaying` và sử dụng các `object AdvancedPlaying` để phát tệp được yêu cầu.
- `MediaPlayer` sẽ sử dụng `MediaApdater` bằng cách truyền vào đó định dạng media muốn phát mà không cần biết tới các `class` thực thụ được sử dụng để phát tệp.
- Cuối cùng là `PatternDemo` với code `main` sẽ sử dụng `MediaPlayer` để phát các định dạng media khác nhau.

Về mặt quản lý code, chúng ta có `01 package adapterpattern`. Code client trong `main` sẽ chỉ tham chiếu duy nhất tới `MediaPlayer` và trỏ `interface MediaPlaying`. Do đó chúng ta sẽ chỉ có duy nhất `class MediaPlayer` và `interface MediaPlaying` để mở `public`. Tất cả các thành phần còn lại của `package` đều sẽ được đặt `access modifier` là `default`.

### Bước 1

Tạo các `interface` để phát tệp bao gồm `MediaPlaying` và `AdvancedPlaying`.

`adapterpattern/MediaPlaying.java`
```java
package adapterpattern;

public interface MediaPlaying {
   public MediaPlaying play(String mediaType, String fileName);
}
```

`adapterpattern/AdvancedPlaying`
```java
package adapterpattern;

interface AdvancedPlaying {
   public AdvancedPlaying playVlc(String fileName);
   public AdvancedPlaying playMp4(String fileName);
}
```

### Bước 2

Tạo các `class` triển khai `interface AdvancedPlaying`.

`adapterpattern/VlcPlayer.java`
```java
package adapterpattern;

class VlcPlayer
implements AdvancedPlaying {
   @Override
   public AdvancedPlaying playVlc(String fileName) {
      System.out.println("Đang phát tệp Vlc. Tên tệp: " + fileName);
      return this;
   }

   @Override
   public AdvancedPlaying playMp4(String fileName) {
      // do nothing
      return this;
   }
}
```

`adapterpattern/Mp4Player.java`
```java
package adapterpattern;

public class Mp4Player
implements AdvancedPlaying {
   @Override
   public AdvancedPlaying playVlc(String fileName) {
      // do nothing
      return this;
   }

   @Override
   public AdvancedPlaying playMp4(String fileName) {
      System.out.println("Đang phát tệp Mp4. Tên tệp: " + fileName);
      return this;
   }
}
```

### Bước 3

Tạo `class MediaAdapter` triển khai `MediaPlaying`.

`adapterpattern/MediaAdapter.java`
```java
package adapterpattern;

public class MediaAdapter
implements MediaPlaying {
   AdvancedPlaying advancedPlayer;

   public MediaAdapter(String mediaType) {
      advancedPlayer = initPlayer(mediaType);
   }

   private AdvancedPlaying initPlayer(String mediaType) {
      if (mediaType.equalsIgnoreCase("vlc"))    return new VlcPlayer();
      if (mediaType.equalsIgnoreCase("mp4"))    return new Mp4Player();
      else                                                   return null;
   }

   @Override
   public MediaPlaying play(
      String mediaType,
      String fileName
   ) {
      if (mediaType.equalsIgnoreCase("vlc")) {
         advancedPlayer.playVlc(fileName);
         return this;
      }
      if (mediaType.equalsIgnoreCase("mp4")) {
         advancedPlayer.playMp4(fileName);
         return this;
      }
      else {
         System.out.println("Định dạng không được hỗ trợ");
         return this;
      }
   }
}
```

### Bước 4

Tạo `class MediaPlayer` triển khai `MediaPlaying`.

`adapterpattern/MediaPlayer.java`
```java
package adapterpattern;

public class MediaPlayer
implements MediaPlaying {
   @Override
   public MediaPlaying play(
      String mediaType,
      String fileName
   ) {
      if (mediaType.equalsIgnoreCase("mp3")) {
         System.out.println("Đang phát tệp Mp3. Tên tệp: " + fileName);
         return this;
      }
      if (
         mediaType.equalsIgnoreCase("vlc") ||
         mediaType.equalsIgnoreCase("mp4")
      ) {
         MediaAdapter adapter = new MediaAdapter(mediaType);
         adapter.play(mediaType, fileName);
         return this;
      }
      else {
         System.out.println("Kiểu tệp không hợp lệ. Định dạng `" + mediaType + "` không được hỗ trợ.");
         return this;
      }
   }
}
```

### Bước 5

Sử dụng `MediaPlayer` để phát các định dạng tệp khác nhau.

`PatternDemo.java`
```java
import adapterpattern.MediaPlayer;

public class PatternDemo {
   public static void main(String[] args) {
      MediaPlayer player = new MediaPlayer();
      player.play("mp3", "beyond the horizon.mp3")
            .play("mp4", "alone.mp4")
            .play("vlc", "far far away.vlc")
            .play("avi", "mind me.avi");
   }
}
```

### Bước 6

Kiểm chứng lại kết quả in ra ở `console`.

`console`
```java
Đang phát tệp Mp3. Tên tệp: beyond the horizon.mp3
Đang phát tệp Mp4. Tên tệp: alone.mp4
Đang phát tệp Vlc. Tên tệp: far far away.vlc
Kiểu tệp không hợp lệ. Định dạng `avi` không được hỗ trợ.
```