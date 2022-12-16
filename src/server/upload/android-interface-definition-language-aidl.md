Đã bao giờ các bạn ứng dụng muốn của mình có thể giao tiếp (gửi/nhận) dữ liệu từ ứng dụng khác hay không?

Chúng ta có thể sử dụng Content Provider để có thể chia sẻ dữ liệu(database/file ...) giữa các ứng dụng với nhau, tuy nhiên bạn không thể sử dụng Content Provider để giao tiếp hay xử lý logic giữa các ứng dụng.

Android cung cấp một cách để có thể giao tiếp liên các ứng dụng. đó là AIDL - Android Interface Definition Language. Chúng ta cùng đi vào tìm hiểu và làm một ứng dụng thú vị nhé 

AIDL - Android Interface Definition Language (không phải là một ngôn ngữ mới) là một cách cho phép bạn có thể định nghĩa một cách mà cả client và server (1 ứng dụng đóng vai trò là server cho các ứng dụng khác đóng vai trò là client có thể truy cập tới) có thể giao tiếng với nhau thông qua truyền thông liên tiến trình Interprocess communication (IPC). Thông thường, trong Android một process (tiến trình) không thể trực tiếp truy cập vào bộ nhớ của một tiến trình khác. Vì vậy để có thể các tiến trình có thể giao tiếp với nhau, chúng cần phân tách các đối tượng thành dạng đối tượng nguyên thủy (primitive object) mà hệ thống có thể hiểu được 

* Lưu ý
Chỉ nên sử AIDL nếu bạn muốn các ứng dụng khác có thể kết nối tới service của ứng dụng bạn thông qua truyền thông liên tiến trinh. Còn nếu bạn chỉ đơn thuần muốn sử dụng service trong ứng dụng của mình bạn nên sử dụng [Binder](https://developer.android.com/guide/components/bound-services#Binder). 

Ở ví dụ này mình sẽ hướng dẫn các bạn xử lý để có thể control nhạc trên service của ứng dụng A từ activity của ứng dụng B. 

{@youtube: https://www.youtube.com/watch?v=CGex_nbfN18&feature=youtu.be}

Như các bạn thấy thì mình có thể control nhạc trên Service của app IPC Server từ ICP Client.

# 1. Tạo .aidl file.
AIDL sử dụng cú pháp rất đơn giản cho phép bạn khai báo một interface với một hoặc nhiều phuơng thước có thể có một hoặc nhiều tham số và trả về một giá trị. Các tham số và giá trị trả về có thể thuộc bất kì loại nào thậm chí các interface hoặc object được tạo ra bởi các AIDL khác.

Bạn cần xây dựng một .aidl file sử dụng ngôn ngữ Java, mỗi một .aidl file cần định nghĩa duy nhất một interface.

Mặc định AIDL hộ trỡ các kiểu dữ liệu sau
- 8 kiểu dữ liệu nguyên thủy trong java (int, byte, short, long, float, double, boolean, char)
- String
- CharSequence
- List, Map 
  Tất cả các phần tử trong List, Map phải là một trong những loại dữ liệu được hỗ trợ trong danh sách này hoặc một trong các đối tượng được định nghĩa thông qua một aidl interface khác.

Khi định nghĩa aidl interface bạn cần lưu ý
- Phuơng thưsc có thể nhận vào 0 hoặc nhiều parameter và trả về void hoặc một giá trị cụ thể 
- aidl chỉ hỗ trợ các phương thức không hỗ trợ các static field

Để tạo file aidl các bạn sử dụng AS làm như sau. 

![](https://images.viblo.asia/4f1aad12-3dc9-4373-a0e1-ef98c85d55de.gif)

đây là file aidl của mình đã tạo xong. Nó là 1 interface như sau
```
// IMusicService.aidl
package com.toandoan.icpsample;
import com.toandoan.icpsample.model.Track;

// Declare any non-default types here with import statements

interface IMusicService {
    String getSongName();

    Track getCurrentTrack();

    void changeMediaStatus();

    void playSong();

    void play();

    void pause();

    int getCurrentDuration();

    int getTotalDuration();
}
```

Lưu ý sau khi viết xong file aidl các bạn cần rebuild lại project để SDK tool gen ra file java để có thể sử dụng. File java sẽ được lưu trữ trong folder ```gen/```

# 2. implement interface 
Khi bạn rebuild ứng dụng, android SDK tool sẽ tạo ra 1 file ```.java``` với tên giống như tên của file aidl. File ```.java``` được gen bao gồm 1 subclass ```Stub```. Các bạn có thể theo dõi file của mình như sau

![](https://i.gyazo.com/25eed16e6861bbdc370274a7917e57a0.png)

* Lưu ý 
Subclass ```Stub``` định nghĩa một vài phuơng thức helper, phuơng thức quan trọng nhất là asInterFace() với đầu vào là một Binder và trả về một instance của Stub interface. Mình sẽ hướng dẫn ở dưới. 

Lúc này ```mBinder``` là một khởi tạo của ```Stub``` class đã implement các method define trong interface, biến này có thể trả về cho các client sử dụng thông qua method ```public IBinder onBind(Intent intent) ```

Có một số lưu ý khi implement interface 
* Các phuơng thức gọi đến sẽ không đảm bảo được gọi trên main thread nên bạn cần xử lý multil thread và xây dựng thread-save
* Mặc định các method được gọi một cách tuần tự, nếu service mất một vài giây để thực hiện request, bạn không nên xử lý các request này trên main thread vì nó có thể dẫn đến ANR. 
* Không có bất cứ Exception nào được ném trả lại cho client gọi phuơng thức.

# 3. Expose interface to clients
Khi bạn đã implement interface cho Service của bạn ở bước 2, nhiệm vụ tiếp theo của bạn là xuất ra interface này để cho các client có thể bind tới service của bạn.

Dưới đây là service của mình dùng để play nhạc, public ra cho các client có thể connect tới và sử dụng
```
package com.toandoan.icpsample.service;

import android.app.Notification;
import android.app.Service;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.os.RemoteException;
import android.support.annotation.Nullable;
import android.support.annotation.RequiresApi;
import com.toandoan.icpsample.IMusicService;
import com.toandoan.icpsample.R;
import com.toandoan.icpsample.model.Track;

/**
 * Created by doan.van.toan on 8/24/18.
 */

public class MusicService extends Service {
    private static final int NOTIFICATION_ID = 1;
    private Notification mNotification;

    private IMusicService.Stub mBinder = new IMusicService.Stub() {

        @Override
        public String getSongName() throws RemoteException {
            return mPlayerManager.getSongName();
        }

        @Override
        public Track getCurrentTrack() throws RemoteException {
            return null;
        }

        @Override
        public void changeMediaStatus() throws RemoteException {
            mPlayerManager.changeMediaStatus();
        }

        @Override
        public void playSong() throws RemoteException {
            mPlayerManager.playSong();
        }

        @Override
        public void play() throws RemoteException {
            mPlayerManager.play();
        }

        @Override
        public void pause() throws RemoteException {
            mPlayerManager.pause();
        }

        @Override
        public int getCurrentDuration() throws RemoteException {
            return mPlayerManager.getCurrentDuration();
        }

        @Override
        public int getTotalDuration() throws RemoteException {
            return mPlayerManager.getTotalDuration();
        }
    };

    private MediaPlayerManager mPlayerManager;

    @Override
    public void onCreate() {
        super.onCreate();
        mPlayerManager = new MediaPlayerManager(getApplicationContext());
        startForegroundService();
    }

    @Nullable
    @Override
    public IBinder onBind(Intent intent) {
        return mBinder;
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        return super.onStartCommand(intent, flags, startId);
    }

    private void startForegroundService() {
        startForeground(NOTIFICATION_ID, getNotification());
    }

    @RequiresApi(api = Build.VERSION_CODES.JELLY_BEAN)
    private Notification getNotification() {
        if (mNotification == null) {
            String title = "IPC Testing";
            try {
                title = mPlayerManager.getSongName();
            } catch (RemoteException e) {
                e.printStackTrace();
            }
            mNotification = new Notification.Builder(this).setContentTitle(title)
                    .setContentText("IPC Testing")
                    .setSmallIcon(R.mipmap.ic_launcher)
                    .build();
        }
        return mNotification;
    }
}
```

Mình đã implement cho tất cả các method của interface ```IMusicService```. MediaPlayerManager là một class mình custom để control nhạc. Các bạn có thể theo dõi chi tiết nó xử lý nhạc như thế nào trong link github mình gửi phía dưới nhé. 

Nhiệm vụ tiếp theo là gửi aidl file của bạn cho client để implement. Các bạn cũng tạo tuơng tự
Tạo folder aidl/ vào copy file aidl từ phía server của bạn và paste vào đó, sau đó rebuild lại để SDK gen ra file java.

Bây giờ các client của bạn chăng hạn như activity hoặc fragment có thể gọi method ```bindService``` để có thể connect tới service của bạn. Trong method ```onServiceConnected()``` ở client có 1 instance là ```mBinder``` bạn có thể sử dụng chúng để khởi tạo ra instance của interface. như sau.

```
    private IMusicService mService;
    private boolean mIsServiceConnected;

    private ServiceConnection mServiceConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            mService = IMusicService.Stub.asInterface(iBinder);
            mIsServiceConnected = true;
        }

        @Override
        public void onServiceDisconnected(ComponentName componentName) {
            mIsServiceConnected = false;
        }
    };
 ```
 
 Bước tiếp theo là chúng ta cần connect tới service của server bằng connection này.
 [Bình thường từ android dưới 5.0 chúng ta có thể bind trực tiếp tới service thông qua một implicit intent ](https://developer.android.com/about/versions/android-5.0-changes) đại loại như
 
 ```
  context.bindService(new Intent("com.toandoan.icpsample.service.MusicService"), 
                        mServiceConnection, Context.BIND_AUTO_CREATE);)
 ```
 
vì sẽ xảy ra lỗi. ```Service Intent must be explicit``` 
mà chúng ta cần gọi một cách tường minh, Ở đây service của server mình đăng kí 1 action cho Service như sau
```
    <application...>
        <service
            android:name=".service.MusicService"
            android:enabled="true"
            android:exported="true">
            <intent-filter>
                <action android:name="com.toandoan.icpsample.service.MusicService.BIND"/>
            </intent-filter>
        </service>
    </application>
```
 
 Và xác định rõ package và action cho service. Như vậy là thành công
```
        Intent intent = new Intent("com.toandoan.icpsample.service.MusicService.BIND");
        intent.setPackage("com.toandoan.icpsample.service");
        bindService(intent, mServiceConnection, Context.BIND_AUTO_CREATE);
```
 Và thế là các bạn có thể sử dụng các method mà interface IMusicService đã xuất ra.
 
 # 4. Passing objects over IPC
Như mình nói ở trên để có thể giao đổi liên tiến trình chúng cần phân tách các đối tượng thành dạng đối tượng nguyên thủy (primitive object) mà hệ thống có thể hiểu được. Vì vậy AIDL chỉ suport một số kiểu dữ liệu nguyên thủy và một số kiểu dữ liệu khác như String, List, Map, CharSequence.
Bài toán đặt ra là chúng ta muộn truyền một đối tượng thông qua AIDL thì làm như thế nào? 
Câu trả lời là phân tách đối tượng đó thành các kiểu dữ liệu nguyên thủy và truyền qua client như bình thường.

Các bước cần làm như sau
1. Tạo 1 đối tượng implement ```Parcelable``` interface
2. Implement method ```writeToParcel``` và ghi nhữnng biến cuả object mà bạn muốn truyền thông qua method ```.writeXXX``` của ```Parcel```
3. Thêm một biến static là ```CREATOR``` implement ```Parcelable.Creator``` interface.
4. Cuối cùng tạo một ```.aidl``` interface đại diện cho class đó của bạn

Các bước từ 1 đến 3 các bạn có thể sử dụng AS có thể giúp bạn gen ra 1 cách dễ dàng
![](https://images.viblo.asia/a2bb56f5-b612-4d63-8b99-1cb606739159.gif)

Bước 4 mình đã tạo 1 aidl file như sau
```
// Track.aidl
package com.toandoan.icpsample.model;

// Define current track model

parcelable Track;
```


Ở client muốn sử dụng bạn chỉ cần define class và aidl tuơng tự là có thể sử dụng được.

Dưới đây là demo của mình, các bạn có thể clone về và chạy thử demo. Cám ơn các bạn đã theo dõi. 

1 Server: https://github.com/DoanVanToan/ICPService 


2 Client: https://github.com/DoanVanToan/ICPClient