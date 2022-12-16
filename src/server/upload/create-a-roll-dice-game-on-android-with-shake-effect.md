Xin chào mọi người, chắc hẳn ae trong cuộc đời đã từng chơi game xúc xắc rồi nhỉ ? Có ai thắc mắc nó đã được tạo ra như thế nào ?

Hôm nay mình chia sẻ bài viết của mình, làm thế nào để tạo ra được game tương tự như thế trên android.

Ảnh chúng ta sẽ sử dụng:

![](https://images.viblo.asia/3d95d875-4c2d-4a2a-8a07-e7b6bfe6deb8.png)
![](https://images.viblo.asia/e9bb9ee5-0905-46d4-9258-41140a95af7b.png)
![](https://images.viblo.asia/8714273b-7397-4e5d-ae5f-6c651fbc648f.png)
![](https://images.viblo.asia/b6e3a80a-c583-48ab-9dd7-631bd0c40ad2.png)
![](https://images.viblo.asia/4dfca9db-d7ef-4608-bf45-c57a3b486d3d.png)
![](https://images.viblo.asia/ff31c32e-d3c9-487a-beda-046c24d99177.png)

Thuật toán bài này khá đơn giản:
Chúng ta sẽ random 1 ảnh trong 6 ảnh này. Trong quá trình random sẽ sử dụng Shake Effect để tăng hiệu ứng 
## Tạo Animation
Đầu tiên, chúng ta cần tạo animation cho quá trình random để người dùng thấy hiệu ứng được đẹp hơn:

```
<?xml version="1.0" encoding="utf-8"?>
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <rotate
        android:duration="70"
        android:fromDegrees="-10"
        android:interpolator="@android:anim/linear_interpolator"
        android:pivotX="50%"
        android:pivotY="50%"
        android:repeatCount="5"
        android:repeatMode="reverse"
        android:toDegrees="10" />

    <translate
        android:duration="70"
        android:fromXDelta="-10"
        android:interpolator="@android:anim/linear_interpolator"
        android:repeatCount="5"
        android:repeatMode="reverse"
        android:toXDelta="10" />
</set>
```

## Tạo giao diện màn hình
![](https://images.viblo.asia/9c55c85f-412a-446b-8e0b-5c0eef03c1f3.png)
Chúng ta sẽ tạo màn hình như bên trên: 
Giao diện bao gồm : 2 con  xúc xắc. Mỗi khi nhấn vào button sẽ hiển thị lên giá trị của mỗi con
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.ssaurel.dicer.MainActivity">

    <LinearLayout
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="80dp"
        android:orientation="horizontal"
        android:layout_centerHorizontal="true">

        <ImageView
            android:id="@+id/imageView1"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:layout_marginRight="20dp"
            android:src="@drawable/dice_2"/>

        <ImageView
            android:id="@+id/imageView2"
            android:layout_width="100dp"
            android:layout_height="100dp"
            android:src="@drawable/dice_4"/>

    </LinearLayout>

    <Button
        android:id="@+id/rollDices"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Roll Dices"
        android:textSize="20sp"
        android:layout_alignParentBottom="true"
        android:layout_marginBottom="30dp"
        android:layout_centerHorizontal="true"/>

</RelativeLayout>
```

## Java code
Khi click vào button, chúng ta sẽ khởi tạo giá trị animation cho ảnh bằng cách sử dụng : AnimationUtils
AnimationUtils là class giúp chúng ta thực hiện dễ dàng hơn với animation. 
Để tìm hiểu thêm, các bạn có thể tham khảo tại đây: 
https://developer.android.com/reference/android/view/animation/AnimationUtils
```
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.ImageView;

import java.util.Random;

public class MainActivity extends AppCompatActivity {

  public static final Random RANDOM = new Random();
  private Button rollDices;
  private ImageView imageView1, imageView2;

  @Override
  protected void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);
    rollDices = (Button) findViewById(R.id.rollDices);
    imageView1 = (ImageView) findViewById(R.id.imageView1);
    imageView2 = (ImageView) findViewById(R.id.imageView2);

    rollDices.setOnClickListener(new View.OnClickListener() {
        @Override
        public void onClick(View view) {
        final Animation anim1 = AnimationUtils.loadAnimation(MainActivity.this, R.anim.shake);
        final Animation anim2 = AnimationUtils.loadAnimation(MainActivity.this, R.anim.shake);
        final Animation.AnimationListener animationListener = new Animation.AnimationListener() {
          @Override
          public void onAnimationStart(Animation animation) {
          }

          @Override
          public void onAnimationEnd(Animation animation) {
            int value = randomDiceValue();
            int res = getResources().getIdentifier("dice_" + value, "drawable", "com.ssaurel.dicer");

            if (animation == anim1) {
             imageView1.setImageResource(res);
            } else if (animation == anim2) {
              imageView2.setImageResource(res);
            }
          }

          @Override
          public void onAnimationRepeat(Animation animation) {

          }
        };

        anim1.setAnimationListener(animationListener);
        anim2.setAnimationListener(animationListener);

        imageView1.startAnimation(anim1);
        imageView2.startAnimation(anim2);
      }
    });
  }

  public static int randomDiceValue() {
    return RANDOM.nextInt(6) + 1;
  }
}
```

Rất đơn giản, chúng ta đã có thể tạo 1 app chơi đơn giản sau những giờ làm việc.

Rất mong nhận được sự góp ý của các bạn !

Bài viết được tham khảo từ: https://android.jlelse.eu/create-a-roll-dice-game-on-android-with-shake-effect-527b14f0c492