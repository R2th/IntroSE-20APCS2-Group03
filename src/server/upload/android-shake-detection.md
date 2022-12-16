Chào các bạn, dạo gần đây anh em thi nhau lắc momo để kiếm 5 tỷ. Hôm nay mình sẽ chia sẻ bài viết về Shake detection hay còn gọi là sự kiện lắc điện thoại.
Hệ thống của Android cung cấp cơ sở để phát hiện người nghe cảm biến chuyển động với class Sensor.
Sensor  có thể được sử dụng để theo dõi sự di chuyển thiết bị ba chiều hoặc thay đổi trong môi trường của thiết bị. Android cung cấp Sensor api để làm việc được đơn giản hơn.
Như ảnh dưới đây:
![](https://images.viblo.asia/33b358a2-3b81-4a7c-a888-d88c5a746253.png)

Android hỗ trợ ba loại cảm biến:

1.  Chuyển động cảm biến : Chúng được sử dụng để đo lực gia tốc và lực lượng quay cùng với ba trục.
2. Cảm biến vị trí : Chúng được sử dụng để đo vị trí vật lý của thiết bị.
3.  Cảm biến môi trường : Chúng được sử dụng để đo lường sự thay đổi môi trường như nhiệt độ, độ ẩm, vv
## 1.  Detector Class
Chúng ta sẽ tạo ra 1 lớp để nhận biết được action khi chúng ta lắc điện thoại. Lớp này implement từ SensorEventListener  
```

import android.hardware.Sensor;
import android.hardware.SensorEvent;
import android.hardware.SensorEventListener;
import android.hardware.SensorManager;
import android.util.FloatMath;
 
public class ShakeDetector implements SensorEventListener {
 
    /*
     * The gForce that is necessary to register as shake.
     * Must be greater than 1G (one earth gravity unit).
     * You can install "G-Force", by Blake La Pierre
     * from the Google Play Store and run it to see how
     *  many G's it takes to register a shake
     */
    private static final float SHAKE_THRESHOLD_GRAVITY = 2.7F;
    private static final int SHAKE_SLOP_TIME_MS = 500;
    private static final int SHAKE_COUNT_RESET_TIME_MS = 3000;
 
    private OnShakeListener mListener;
    private long mShakeTimestamp;
    private int mShakeCount;
 
    public void setOnShakeListener(OnShakeListener listener) {
        this.mListener = listener;
    }
 
    public interface OnShakeListener {
        public void onShake(int count);
    }
 
    @Override
    public void onAccuracyChanged(Sensor sensor, int accuracy) {
        // ignore
    }
 
    @Override
    public void onSensorChanged(SensorEvent event) {
 
        if (mListener != null) {
            float x = event.values[0];
            float y = event.values[1];
            float z = event.values[2];
 
            float gX = x / SensorManager.GRAVITY_EARTH;
            float gY = y / SensorManager.GRAVITY_EARTH;
            float gZ = z / SensorManager.GRAVITY_EARTH;
 
            // gForce will be close to 1 when there is no movement.
            float gForce = (float)Math.sqrt(gX * gX + gY * gY + gZ * gZ);
 
            if (gForce > SHAKE_THRESHOLD_GRAVITY) {
                final long now = System.currentTimeMillis();
                // ignore shake events too close to each other (500ms)
                if (mShakeTimestamp + SHAKE_SLOP_TIME_MS > now) {
                    return;
                }
 
                // reset the shake count after 3 seconds of no shakes
                if (mShakeTimestamp + SHAKE_COUNT_RESET_TIME_MS < now) {
                    mShakeCount = 0;
                }
 
                mShakeTimestamp = now;
                mShakeCount++;
 
                mListener.onShake(mShakeCount);
            }
        }
    }
}
```
## 2 . Main activity
Khi bắt đầu hoạt động, hãy khai báo các biến sau:

```
	// The following are used for the shake detection
	private SensorManager mSensorManager;
	private Sensor mAccelerometer;
	private ShakeDetector mShakeDetector;
```

```
		// ShakeDetector initialization
		mSensorManager = (SensorManager) getSystemService(Context.SENSOR_SERVICE);
		mAccelerometer = mSensorManager
				.getDefaultSensor(Sensor.TYPE_ACCELEROMETER);
		mShakeDetector = new ShakeDetector();
		mShakeDetector.setOnShakeListener(new OnShakeListener() {
 
			@Override
			public void onShake(int count) {
				/*
				 * The following method, "handleShakeEvent(count):" is a stub //
				 * method you would use to setup whatever you want done once the
				 * device has been shook.
				 */
				handleShakeEvent(count);
			}
		});
```

Cần phải registerListener tại onResume và  unregisterListener tại onPause

```
@Override
	public void onResume() {
		super.onResume();
		// Add the following line to register the Session Manager Listener onResume
		mSensorManager.registerListener(mShakeDetector, mAccelerometer,	SensorManager.SENSOR_DELAY_UI);
	}
 
	@Override
	public void onPause() {
		// Add the following line to unregister the Sensor Manager onPause
		mSensorManager.unregisterListener(mShakeDetector);
		super.onPause();
	}
```

Trong android manifest cần khai báo: 
```
<uses-feature android:name="android.hardware.sensor.accelerometer" android:required="true" />
```
chúng ta sẽ xử lý action khi lắc tại function : "handleShakeEvent(action)"

Như vậy, chỉ cần một chút code, chúng ta đã có thể tạo ra ứng dụng khá hay cho anh em lắc thoải mái rồi.
Bài viết được tham khảo tại: 
http://laptrinhandroid.net.vn/tong-quan-sensor-trong-lap-trinh-android.html
http://jasonmcreynolds.com/?p=388