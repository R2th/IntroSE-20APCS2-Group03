Xin chào mọi người, hôm nay mình sẽ viết bài về Swipe Gesture trong android. Vậy Swipe Gesture là gì ? nó để làm gì ?

Swipe Gesture  cho phép bạn điều chỉnh cách thức người dùng tương tác với các ứng dụng của bạn như double tab, vuốt lên, xuống, trái,phải.

Trong bài này, chúng ta sẽ làm 1 ứng dụng nhỏ như sau: người dùng thực hiện action trên app, sẽ toat ra action đó.

Giao diện như sau:
![](https://images.viblo.asia/053213a6-e847-4786-ae2a-7bf8d37e3ea5.PNG)

## Tạo giao diện
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="fill_parent"
    android:layout_height="fill_parent"
    android:background="@drawable/background" >

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentRight="true"
        android:layout_centerInParent="true"
        android:layout_margin="5dp"
        android:src="@drawable/swipe_left" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentLeft="true"
        android:layout_centerInParent="true"
        android:layout_margin="5dp"
        android:src="@drawable/swipe_right" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentBottom="true"
        android:layout_centerInParent="true"
        android:layout_margin="5dp"
        android:src="@drawable/swipe_up" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentTop="true"
        android:layout_centerInParent="true"
        android:layout_margin="5dp"
        android:src="@drawable/swipe_down" />

    <ImageView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerInParent="true"
        android:layout_margin="5dp"
        android:src="@drawable/double_tap" />

</RelativeLayout>
```
## Tạo classs handle action
 Bây giờ hãy tạo một lớp java đặt tên SimpleGestureFilter.java dùng để detech các action mà chúng ta xử lý:
 
 ```
import android.app.Activity;
import android.view.GestureDetector;
import android.view.GestureDetector.SimpleOnGestureListener;
import android.view.MotionEvent;
 
public class SimpleGestureFilter extends SimpleOnGestureListener {
 
 // Swipe gestures type
 public final static int SWIPE_UP = 1;
 public final static int SWIPE_DOWN = 2;
 public final static int SWIPE_LEFT = 3;
 public final static int SWIPE_RIGHT = 4;
 
 public final static int MODE_TRANSPARENT = 0;
 public final static int MODE_SOLID = 1;
 public final static int MODE_DYNAMIC = 2;
 
 private final static int ACTION_FAKE = -13; // just an unlikely number
 
 // Swipe distances
 private int swipe_Min_Distance = 100;
 private int swipe_Max_Distance = 350;
 private int swipe_Min_Velocity = 100;
 
 private int mode = MODE_DYNAMIC;
 private boolean running = true;
 private boolean tapIndicator = false;
 
 private Activity context;
 private GestureDetector detector;
 private SimpleGestureListener listener;
 
 public SimpleGestureFilter(Activity context,
 SimpleGestureListener simpleGestureListener) {
 
 this.context = context;
 this.detector = new GestureDetector(context, this);
 this.listener = simpleGestureListener;
 }
 
 public void onTouchEvent(MotionEvent event) {
 
 if (!this.running)
 return;
 
 boolean result = this.detector.onTouchEvent(event);
 // Get the gesture
 if (this.mode == MODE_SOLID)
 event.setAction(MotionEvent.ACTION_CANCEL);
 else if (this.mode == MODE_DYNAMIC) {
 
 if (event.getAction() == ACTION_FAKE)
 event.setAction(MotionEvent.ACTION_UP);
 else if (result)
 event.setAction(MotionEvent.ACTION_CANCEL);
 else if (this.tapIndicator) {
 event.setAction(MotionEvent.ACTION_DOWN);
 this.tapIndicator = false;
 }
 
 }
 // else just do nothing, it's Transparent
 }
 
 public void setMode(int m) {
 this.mode = m;
 }
 
 public int getMode() {
 return this.mode;
 }
 
 public void setEnabled(boolean status) {
 this.running = status;
 }
 
 public void setSwipeMaxDistance(int distance) {
 this.swipe_Max_Distance = distance;
 }
 
 public void setSwipeMinDistance(int distance) {
 this.swipe_Min_Distance = distance;
 }
 
 public void setSwipeMinVelocity(int distance) {
 this.swipe_Min_Velocity = distance;
 }
 
 public int getSwipeMaxDistance() {
 return this.swipe_Max_Distance;
 }
 
 public int getSwipeMinDistance() {
 return this.swipe_Min_Distance;
 }
 
 public int getSwipeMinVelocity() {
 return this.swipe_Min_Velocity;
 }
 
 @Override
 public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX,
 float velocityY) {
 
 final float xDistance = Math.abs(e1.getX() - e2.getX());
 final float yDistance = Math.abs(e1.getY() - e2.getY());
 
 if (xDistance > this.swipe_Max_Distance
 || yDistance > this.swipe_Max_Distance)
 return false;
 
 velocityX = Math.abs(velocityX);
 velocityY = Math.abs(velocityY);
 boolean result = false;
 
 if (velocityX > this.swipe_Min_Velocity
 && xDistance > this.swipe_Min_Distance) {
 if (e1.getX() > e2.getX()) // right to left
 this.listener.onSwipe(SWIPE_LEFT);
 else
 this.listener.onSwipe(SWIPE_RIGHT);
 
 result = true;
 } else if (velocityY > this.swipe_Min_Velocity
 && yDistance > this.swipe_Min_Distance) {
 if (e1.getY() > e2.getY()) // bottom to up
 this.listener.onSwipe(SWIPE_UP);
 else
 this.listener.onSwipe(SWIPE_DOWN);
 
 result = true;
 }
 
 return result;
 }
 
 @Override
 public boolean onSingleTapUp(MotionEvent e) {
 this.tapIndicator = true;
 return false;
 }
 
 @Override
 public boolean onDoubleTap(MotionEvent arg) {
 this.listener.onDoubleTap();
 ;
 return true;
 }
 
 @Override
 public boolean onDoubleTapEvent(MotionEvent arg) {
 return true;
 }
 
 @Override
 public boolean onSingleTapConfirmed(MotionEvent arg) {
 
 if (this.mode == MODE_DYNAMIC) { // we owe an ACTION_UP, so we fake an
 arg.setAction(ACTION_FAKE); // action which will be converted to an
 // ACTION_UP later.
 this.context.dispatchTouchEvent(arg);
 }
 
 return false;
 }
 
 static interface SimpleGestureListener {
 void onSwipe(int direction);
 
 void onDoubleTap();
 }
}
```
##  MainActivity.java
 Cuối cùng hãy đến MainActivity.java  của bạn và thêm mã sau đây. Trong class này,  tôi làm một số điều được liệt kê dưới đây:
1.  Implement SimpleGestureListener để lắng nghe actionỉ của người dùng.
2. Tạo một instance của class SimpleGestureFilter mà chúng ta đã tạo ở trên.
3. Cuối cùng sử dụng phương thức onSwipe (int direction) và onDoubleTap để bắt các action
```
package com.example.swipe_screen_demo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.MotionEvent;
import android.widget.Toast;

import com.example.swipe_screen_demo.SimpleGestureFilter.SimpleGestureListener;

public class MainActivity extends AppCompatActivity implements
		SimpleGestureListener {
	private SimpleGestureFilter detector;

	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		setContentView(R.layout.activity_main);

		// Detect touched area
		detector = new SimpleGestureFilter(MainActivity.this, this);
	}

	@Override
	public boolean dispatchTouchEvent(MotionEvent me) {
		// Call onTouchEvent of SimpleGestureFilter class
		this.detector.onTouchEvent(me);
		return super.dispatchTouchEvent(me);
	}

	@Override
	public void onSwipe(int direction) {
		
		//Detect the swipe gestures and display toast
		String showToastMessage = "";

		switch (direction) {

		case SimpleGestureFilter.SWIPE_RIGHT:
			showToastMessage = "You have Swiped Right.";
			break;
		case SimpleGestureFilter.SWIPE_LEFT:
			showToastMessage = "You have Swiped Left.";
			break;
		case SimpleGestureFilter.SWIPE_DOWN:
			showToastMessage = "You have Swiped Down.";
			break;
		case SimpleGestureFilter.SWIPE_UP:
			showToastMessage = "You have Swiped Up.";
			break;

		}
		Toast.makeText(this, showToastMessage, Toast.LENGTH_SHORT).show();
	}

	
	//Toast shown when double tapped on screen
	@Override
	public void onDoubleTap() {
		Toast.makeText(this, "You have Double Tapped.", Toast.LENGTH_SHORT)
				.show();
	}

}
```
Khá đơn giản đúng không ?  Chỉ cần 1 đoạn code ngắn gọn, chúng ta đã xử lý được action của người dùng.
Các bạn có thể tải source code tại đây: https://github.com/sonusurender/Swipe_Gesture_Demo

Bài biết được tham khảo từ: https://www.androhub.com/android-swipe-gesture/