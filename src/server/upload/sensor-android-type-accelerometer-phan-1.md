> Một trong những điều mà làm cho việc phát triển cho các thiết bị di động khác biệt so với các nền tảng khác là một điện thoại di động hoặc máy tính bảng được đóng gói đầy đủ các cảm biến và phần cứng mà các nhà phát triển có thể tận dụng lợi thế để làm dữ liệu đầu vào. Trong hướng dẫn này bạn sẽ được giới thiệu Sensor Framework của Android. Bạn sẽ tìm hiểu cách xác định những bộ cảm biến có sẵn trên một thiết bị và cách làm thế nào để đọc dữ liệu từ bộ cảm biến đó.
### Bộ cảm biến của thiết bị
*Có ba loại cảm biến cơ bản chính cần phải lưu ý: cảm biến chuyển động, môi trường, và vị trí thiết bị. Cảm biến chuyển động phát hiện những thay đổi xung quanh ba trục của thiết bị: X, Y và Z, như được minh hoạ dưới đây:*
![](https://images.viblo.asia/8aa2f9dc-122e-4949-9b70-1b28eb397840.png)
Cảm biến chuyển động bao gồm các con quay hồi chuyển, gia tốc và cảm biến quay vector.

Cảm biến môi trường thu thập thông tin về môi trường mà điện thoại đang ở trong đó. Chúng bao gồm các cảm biến độ ẩm và nhiệt độ môi trường, ánh sáng và áp xuất.

Loại cảm biến cơ bản cuối cùng, đó là vị trí thiết bị, thực hiện chính xác những gì bạn mong đợi: nhận biết vị trí của thiết bị. Thể loại này bao gồm các cảm biến xoay và cảm biến từ.

Bất kỳ cảm biến nào mà không thuộc một trong ba loại cơ bản trên được coi là một bộ cảm biến hỗn hợp. Các cảm biến này không thật sự là cảm biến theo nghĩa đen, nhưng thay vào đó thu thập dữ liệu của chúng từ nhiều cảm biến vật lý trên một thiết bị và tổng hợp nó. Ví dụ như đếm số bước, cảm biến trọng lực và cảm biến xoay vectơ.

### Đọc dữ liệu cảm biến
**Khám phá bộ cảm biến trên thiết bị**
Để truy cập các cảm biến trên một thiết bị, bạn sẽ cần phải sử dụng lớp SensorManager, bạn có thể lấy nó như là một dịch vụ hệ thống từ một Activity.
```
mSensorManager = (SensorManager) getSystemService( Context.SENSOR_SERVICE );
```
Một khi bạn có một SensorManager, bạn có thể lấy một Sensor cơ bản, hoặc lấy một List (danh sách) của các đối tượng Sensor (cảm biến) dựa trên một loại tham số. Đối với ví dụ này chúng ta sẽ truy xuất List (danh sách) của tất cả các đối tượng Sensor (cảm biến), như sau:
```
List<Sensor> sensorList = mSensorManager.getSensorList( Sensor.TYPE_ALL );
```
Bạn sẽ nhận thấy rằng chúng ta sử dụng TYPE_ALL ở đây. Nếu chúng ta chỉ muốn một tập hợp nhỏ hơn của bộ cảm biến, chúng ta có thể truyền vào bất kỳ kiểu thuộc tính nào được hỗ trợ, chẳng hạn như ở dưới đây.
```
TYPE_AMBIENT_TEMPERATURE 
TYPE_DEVICE_PRIVATE_BASE
TYPE_GAME_ROTATION_VECTOR 
TYPE_GEOMAGNETIC_ROTATION_VECTOR 
TYPE_GRAVITY
TYPE_GYROSCOPE
TYPE_GYROSCOPE_UNCALIBRATED 
TYPE_HEART_BEAT 
TYPE_HEART_RATE 
TYPE_LIGHT
TYPE_LINEAR_ACCELERATION 
TYPE_MAGNETIC_FIELD
TYPE_MAGNETIC_FIELD_UNCALIBRATED 
TYPE_MOTION_DETECT
```
Một khi bạn đã có Sensor mà bạn muốn làm việc với, bạn có thể bắt đầu lấy dữ liệu từ chúng.
### Sensor Event Listener
Ví dụ sau đây là Event sensor TYPE_ACCELEROMETER
```
class MainActivity : AppCompatActivity(), SensorEventListener {
    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
        //TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
    }

    override fun onSensorChanged(p0: SensorEvent?) {
        p0?.let { getAccelerometer(it) }
    }

    private lateinit var sensorManager: SensorManager
    private var isColor = false
    private var lastUpdate: Long = 0
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initView()
    }

    private fun initView() {
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
        lastUpdate = System.currentTimeMillis()
    }

    private fun getAccelerometer(event: SensorEvent) {
        val values = event.values
        // Movement
        val x = values[0]
        val y = values[1]
        val z = values[2]

        val accelationSquareRoot =
            (x * x + y * y + z * z) / (SensorManager.GRAVITY_EARTH * SensorManager.GRAVITY_EARTH)

        val actualTime = System.currentTimeMillis()
        Toast.makeText(
            applicationContext, accelationSquareRoot.toString() + " " +
                    SensorManager.GRAVITY_EARTH, Toast.LENGTH_SHORT
        ).show()

        if (accelationSquareRoot >= 2)
        //it will be executed if you shuffle
        {

            if (actualTime - lastUpdate < 200) {
                return
            }
            lastUpdate = actualTime//updating lastUpdate for next shuffle
            if (isColor) {
                show_change_sensor.setBackgroundColor(Color.GREEN)

            } else {
                show_change_sensor.setBackgroundColor(Color.RED)
            }
            isColor = !isColor
        }
    }

    override fun onResume() {
        super.onResume()
        sensorManager.registerListener(this,sensorManager.getDefaultSensor(Sensor.TYPE_ACCELEROMETER),SensorManager.SENSOR_DELAY_NORMAL)
    }

    override fun onPause() {
        super.onPause()
        sensorManager.unregisterListener(this);
    }
}
```
**Chúc mọi người áp dụng thành công . Thank so much !**