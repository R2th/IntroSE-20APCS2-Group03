Xin chào mọi người, trong bài viết này mình sẽ chia sẻ cách để tạo ra 1 cách valicate 1 Edittext với animation trông đẹp mắt hơn !

Mình sẽ làm tương tự như ví dụ sau:
![](https://images.viblo.asia/7ee30a7f-f19e-4ece-9d96-c55693e55555.gif)

Bắt đầu nhé !!

## Tạo giao diện
```
<FrameLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content">

        <TextView
            android:layout_marginTop="30dp"
            android:layout_marginStart="5dp"
            android:background="@drawable/big_circle"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content" />

        <ImageView
            android:rotation="-7"
            android:layout_marginTop="150dp"
            android:layout_marginStart="20dp"
            android:src="@drawable/lock_icon"
            android:layout_width="50dp"
            android:layout_height="50dp" />


        <android.support.v7.widget.CardView
            app:cardBackgroundColor="@color/colorAccent"
            app:cardCornerRadius="8dp"
            android:elevation="5dp"
            android:rotation="3"
            android:layout_marginStart="55dp"
            android:layout_marginTop="50dp"
            android:layout_marginEnd="50dp"
            android:layout_width="match_parent"
            android:layout_height="170dp">

            <LinearLayout
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:orientation="vertical">

                <TextView
                    android:layout_marginTop="15dp"
                    android:layout_marginStart="15dp"
                    android:layout_marginBottom="5dp"
                    android:background="@drawable/circle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content" />

                <TextView
                    android:layout_marginTop="10dp"
                    android:layout_marginStart="15dp"
                    android:layout_marginBottom="5dp"
                    android:background="@drawable/circle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content" />

                <TextView
                    android:layout_marginTop="10dp"
                    android:layout_marginStart="15dp"
                    android:layout_marginBottom="5dp"
                    android:background="@drawable/circle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content" />

                <TextView
                    android:layout_marginTop="10dp"
                    android:layout_marginStart="15dp"
                    android:background="@drawable/circle"
                    android:layout_width="wrap_content"
                    android:layout_height="wrap_content" />
            </LinearLayout>
        </android.support.v7.widget.CardView>

        <android.support.v7.widget.CardView
            android:id="@+id/validationCardview"
            android:rotation="-2"
            android:elevation="10dp"
            app:cardCornerRadius="8dp"
            app:contentPadding="3dp"
            android:layout_marginStart="90dp"
            android:layout_marginEnd="30dp"
            android:layout_marginTop="50dp"
            android:background="@color/cardview_light_background"
            android:layout_width="match_parent"
            android:layout_height="wrap_content">

            <LinearLayout
                android:layout_width="2dp"
                android:layout_height="match_parent"
                android:orientation="horizontal"
                android:layout_marginStart="30dp"
                android:background="@android:color/holo_red_light"/>

            <LinearLayout
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:orientation="vertical">

                <lib.mozidev.me.extextview.ExTextView
                    android:id="@+id/validation1TextView"
                    android:layout_margin="5dp"
                    android:textSize="20sp"
                    android:gravity="center"
                    android:textColor="@android:color/black"
                    android:text="@string/validation1"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content" />

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="1dp"
                    android:orientation="horizontal"
                    android:background="@android:color/holo_blue_light" />

                <lib.mozidev.me.extextview.ExTextView
                    android:id="@+id/validation2TextView"
                    android:layout_margin="5dp"
                    android:textSize="20sp"
                    android:gravity="center"
                    android:textColor="@android:color/black"
                    android:text="@string/validation2"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content" />

                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="1dp"
                    android:orientation="horizontal"
                    android:background="@android:color/holo_blue_light" />

                <lib.mozidev.me.extextview.ExTextView
                    android:id="@+id/validation3TextView"
                    android:layout_margin="5dp"
                    android:textSize="20sp"
                    android:gravity="center"
                    android:text="@string/validation3"
                    android:textColor="@android:color/black"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content" />


                <LinearLayout
                    android:layout_width="match_parent"
                    android:layout_height="1dp"
                    android:orientation="horizontal"
                    android:background="@android:color/holo_blue_light" />

                <lib.mozidev.me.extextview.ExTextView
                    android:id="@+id/validation4TextView"
                    android:layout_margin="5dp"
                    android:textSize="20sp"
                    android:gravity="center"
                    android:textColor="@android:color/black"
                    android:text="@string/validation4"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content" />

            </LinearLayout>
        </android.support.v7.widget.CardView>

        <ImageView
            android:id="@+id/allDoneImageView"
            android:visibility="invisible"
            android:elevation="15dp"
            android:layout_marginTop="160dp"
            android:layout_marginEnd="30dp"
            android:layout_gravity="end"
            android:src="@drawable/check_icon"
            android:layout_width="40dp"
            android:layout_height="40dp" />

    </FrameLayout>
```

## Password Validation
Ta sẽ tạo ra 3 regular expressions như sau để xử lý việc validate password:
```
String specialCharRegex= ".*[@#!$%^&+=].*";
String UpperCaseRegex= ".*[A-Z].*";
String NumberRegex= ".*[0-9].*";
```

Sau đó ta sẽ check các điều kiện để thoả mãn chuỗi regex này:
```
if(password.matches(specialCharRegex)){
  //special char present
}
```

## Xử lý animations
Để xử lý animation gạch text, ta sẽ sử dụng thư viện sau : https://github.com/zijing07/ExTextView
### 1. StrikeThroughText Animation
```
StrikeThroughPainting strikeThroughPainting = new StrikeThroughPainting(CustomTextView);
// Basic Usage
strikeThroughPainting.strikeThrough();
// All Options
strikeThroughPainting
        .cutTextEdge(cutEdge)
        .color(strokeColor)
        .strokeWidth(strokeWidth)
        .mode(StrikeThroughPainting.MODE_DEFAULT)
        .linePosition(0.7F)
        .firstLinePosition(0.6F)
        .totalTime(10_000L)
        .callback(new StrikeThroughPainting.StrikeThroughPaintingCallback() {
            @Override
            public void onStrikeThroughEnd() {
                Snackbar.make(findViewById(R.id.container),
                        "Callback after animation", Snackbar.LENGTH_LONG).show();
            }
        })
        // do the draw!
        .strikeThrough();
// Clear Strike Through
strikeThroughPainting.clearStrikeThrough();
```
### 2. Translation from left to right 
```
TranslateAnimation animation = new TranslateAnimation(0.0f, 75.0f,
        0.0f, 0.0f);
animation.setDuration(200);  // animation duration
animation.setRepeatCount(1);  // animation repeat count
animation.setRepeatMode(2);
validation1TextView.startAnimation(animation);      //animate from left to right and back
```

### 3. AllDone Image Popup 
Chúng ta cần tạo file scale_up và  scale_down animations trong  XML ( res-> thư mục anim )

**Scale_up**: 
```
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <scale
        android:duration="200"
        android:fromXScale="0"
        android:fromYScale="0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toXScale="1.0"
        android:toYScale="1.0" />
</set>
```
**Scale_down :**
```
<set xmlns:android="http://schemas.android.com/apk/res/android">
    <scale
        android:duration="200"
        android:fromXScale="1.0"
        android:fromYScale="1.0"
        android:pivotX="50%"
        android:pivotY="50%"
        android:toXScale="0"
        android:toYScale="0" />
</set>
```
Chúng ta sẽ xử lý logic ẩn hiện ảnh như sau: 
```
Animation imageScaleUp = AnimationUtils.loadAnimation(this, R.anim.scale_up);
allDoneImageView.startAnimation(imageScaleUp);
allDoneImageView.setVisibility(View.VISIBLE);
```

```
Animation imageScaleDown = AnimationUtils.loadAnimation(this, R.anim.scale_down);
allDoneImageView.startAnimation(imageScaleDown);
allDoneImageView.setVisibility(View.VISIBLE);
```
Cũng khá đơn giản đúng không ạ , chỉ vài đoạn code nhỏ, chúng ta đã tạo ra được 1 hiệu ứng khá đẹp dùng để validation !

Bài viết được tham khảo từ: 
https://android.jlelse.eu/password-validation-animation-android-cb6585e26b65

Các bạn có thể thao khảo code tại : https://github.com/shashankchandak/Password_Validation_Animation