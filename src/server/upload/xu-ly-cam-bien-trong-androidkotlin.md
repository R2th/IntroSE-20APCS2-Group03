Ta đều biết cảm biến là thiết bị phần cứng giúp điện thoại thông minh của ta thông minh hơn. Trong hướng dẫn này, ta sẽ xem cách thực hiện và sử dụng các loại cảm biến khác nhau được sử dụng trong điện thoại Android. Hiện nay, hầu hết các thiết bị chạy Android đều có cảm biến tích hợp để đo chuyển động, định hướng và các điều kiện môi trường khác nhau.
Một số cảm biến được sử dụng:
1. Proximity sensors- Tiết kiệm pin trong khi gọi
2. Cảm biến nhiệt độ và độ ẩm được sử dụng để tính toán và báo cáo điểm sương
3. Khi đi du lịch có thể dùng la bàn để xác định được định hướng
.
.
.
Bạn có thể xem thêm ở đây : https://developer.android.com/guide/topics/sensors

Ok bây giờ tiến hành ứng dụng sensor
### **Những sensor của máy bạn**
Để liệt kê tất cả sensor của máy bạn:
```
class MainActivity : AppCompatActivity() {
    private lateinit var mSensorManager: SensorManager


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        // Get an instance of the sensor service, and use that to get an instance of
        // a particular sensor.
        mSensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        val deviceSensors: List<Sensor> = mSensorManager.getSensorList(Sensor.TYPE_ALL)
        Log.v("Total sensors",""+deviceSensors.size)
        deviceSensors.forEach{
            Log.v("Sensor name",""+it)
        }
    }

}
## **Để kiếm tra liệu sensor có tồn tại trong thời gian chạy:**
class MainActivity : AppCompatActivity() {
    private lateinit var mSensorManager: SensorManager
 
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mSensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        if (mSensorManager.getDefaultSensor(Sensor.TYPE_AMBIENT_TEMPERATURE) != null) {
            // Success!
            Log.v("success","yes")
        } else {
            // Failure!
            Log.v("Failure","No sensor found")
        }
    }
}
```
Bạn có thể thay đổi tên sensor tùy thuộc vào yêu cầu của bạn:
Giám sát sự kiện cảm biến:
To monitor sensor events we need to implement tow callback methods exposed through SensorEventListener interface
Để giám sát sự kiện sensor ta cần thêm 2 phương thức callback ở SensorEventListener Interface
1. onAccuracyChanged() - Phát hiện độ chính xác cảm biến nó được đại diện bởi 4 hằng số:
```
* SENSOR_STATUS_ACCURACY_LOW
* SENSOR_STATUS_ACCURACY_MEDIUM
*  SENSOR_STATUS_ACCURACY_HIGH
*  SENSOR_STATUS_UNRELIABLE
```
2.onSensorChanged()- Bao gồm thông tin về dữ liệu sensor mới, bao gồm độ chính xác của dữ liệu, timestamp mà dữ liệu được tạo ra và những bản ghi của dữ liệu mới
```
class MainActivity : AppCompatActivity(), SensorEventListener {
    private lateinit var mSensorManager: SensorManager
    private var mSensors: Sensor? = null
    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {

    }

    override fun onSensorChanged(p0: SensorEvent?) {
//        Sensor change value
        val millibarsOfPressure = p0!!.values[0]
        if (p0.sensor.type == Sensor.TYPE_LIGHT)
            Toast.makeText(this, "" + millibarsOfPressure + " lx", Toast.LENGTH_SHORT).show()
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        mSensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
//        Define the sensor 
        mSensors = mSensorManager.getDefaultSensor(Sensor.TYPE_LIGHT)

    }

    override fun onResume() {
        super.onResume()
//        Register the sensor on resume of the activity 
        mSensorManager.registerListener(this, mSensors, SensorManager.SENSOR_DELAY_NORMAL)
    }

    override fun onPause() {
        super.onPause()
//        unregister the sensor onPause else it will be active even if the activity is closed
        mSensorManager.unregisterListener(this)
    }
}
```
Cảm ơn đã đọc :yum:
Nguồn (https://developer.android.com/guide/topics/sensors/)