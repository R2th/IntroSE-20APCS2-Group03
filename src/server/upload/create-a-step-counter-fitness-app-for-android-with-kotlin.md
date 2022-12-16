Chào các bạn, hôm nay mình sẽ giúp các bạn làm một ứng dụng nhỏ về Step Counter Fitness nhé, chúng ta sẽ tận dụng Sensor của smartphone để làm việc này kết hợp với việc sử dụng Kotlin chứ ko phải java như trước nữa.

Đầu tiên, chúng ta cần tạo ra một giao diện để hiển thị thông tin cho người dùng nhận biết. Đơn giản thôi, chỉ cái TextView để đưa ra các con số thông tin khi có sự thay đổi là dc rồi.


```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.ssaurel.stepcounter.MainActivity">

    <TextView
        android:id="@+id/stepsLbl"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="108dp"
        android:text="Steps"
        android:textSize="50sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/stepsValue"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginEnd="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="48dp"
        android:text="0"
        android:textSize="35sp"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/stepsLbl" />
</android.support.constraint.ConstraintLayout>
```

Tiếp theo, trên *MainActivity* chúng ta sẽ viết code bằng Kotlin và sử dụng *SensorManager*. Chúng ta đừng quên đăng kí một listener cho Sensor để nhận thông tin cập nhật nhé. và trong MainActivity chúng ta cần implement *SensorEventListener* interface.
Với việc implement *SensorEventListener*, chúng ta sẽ biết dc những thay đổi thông qua *onSensorChanged* . Thông qua cái tham số là một mảng *SensorEvent*, chúng ta sẽ lấy dc các giá trị để cập nhật:

```
package com.ssaurel.stepcounter

import android.content.Context
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.os.Bundle
import android.support.v7.app.AppCompatActivity
import android.widget.Toast
import kotlinx.android.synthetic.main.activity_main.*

class MainActivity : AppCompatActivity(), SensorEventListener {

    var running = false
    var sensorManager:SensorManager? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        sensorManager = getSystemService(Context.SENSOR_SERVICE) as SensorManager
    }

    override fun onResume() {
        super.onResume()
        running = true
        var stepsSensor = sensorManager?.getDefaultSensor(Sensor.TYPE_STEP_COUNTER)

        if (stepsSensor == null) {
            Toast.makeText(this, "No Step Counter Sensor !", Toast.LENGTH_SHORT).show()
        } else {
            sensorManager?.registerListener(this, stepsSensor, SensorManager.SENSOR_DELAY_UI)
        }
    }

    override fun onPause() {
        super.onPause()
        running = false
        sensorManager?.unregisterListener(this)
    }

    override fun onAccuracyChanged(p0: Sensor?, p1: Int) {
    }

    override fun onSensorChanged(event: SensorEvent) {
        if (running) {
            stepsValue.setText("" + event.values[0])
        }
    }
}
```

Trong đoạn code trên bạn cần lưu ý là chỉ khi nào việc *getDefaultSensor(Sensor.TYPESTEPCOUNTER)* trả về khác giá trị null thì khi đó bạn mới có thể registerListener và bạn hoàn toàn có thể control được việc dùng nhận thông tin bằng cách gọi đến *sensorManager?.unregisterListener(this).*  

Các bạn cần chú nữa là chúng ta ko thể test được vấn đề này trên máy ảo nhé, vì máy ảo thì làm gì có Sensor. 

![](https://images.viblo.asia/42022268-14c7-4c94-8390-f79c3302d99f.png)

Trên đây là hình ảnh kết quả thu dc khi test ứng dụng. Qua đây chắc các bạn cũng hiểu thêm chút về cách sử dụng Sensor rồi chứ cũng như cách làm việc với nó trên Kotlin thay vì java như trước đây.
Cảm ơn các bạn đã quan tâm, bài viết dc dịch từ [Create a Step Counter Fitness App for Android with Kotlin](https://medium.com/@ssaurel/create-a-step-counter-fitness-app-for-android-with-kotlin-bbfb6ffe3ea7).