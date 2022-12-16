### 1. Mở đầu
Qua bài viết này mình sẽ hướng dẫn các bạn mới tìm hiểu về Android làm một ứng dụng sử dụng về SavedInstanceState và Shared Preferences, và sự khác nhau của chúng là gì? Project này mình sử dụng ngôn ngữ Java.
Chúng ta bắt đầu thôi.
### 2. Tạo XML cho MainActivity
Trước tiên các bạn khỏi tạo một project ở chế độ Empty Activity bằng Android Studio với tên mà các bạn muốn. Ứng dụng của chúng ta chỉ có một màn hình duy nhất là Main Activity.
Các bạn hãy thiết kế một màn hình giống như dưới đây

![](https://images.viblo.asia/529c9487-d9f7-48a2-8464-0b7964d7f843.png)

Để làm được điều đó các bạn vào res, rồi layout và mở file xml activity_main lên. Các bạn nên dùng ConstraintLayout, cũng có thể kéo thả nếu bạn nào quen rồi, hoặc cũng có thể code bằng tay. Và đây là code XML của mình
```Kotlin
<?xml version="1.0" encoding="utf-8"?>
<androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:padding="16dp"
    app:layout_constraintGuide_end="120dp"
    tools:context=".MainActivity">

    <TextView
        android:id="@+id/text_count"
        android:layout_width="0dp"
        android:layout_height="0dp"
        android:background="@color/color_background"
        android:gravity="center"
        android:text="0"
        android:textColor="@color/color_white"
        android:textSize="112dp"
        app:layout_constraintBottom_toBottomOf="@id/guideline_upper"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <androidx.constraintlayout.widget.Guideline
        android:id="@+id/guideline_upper"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="horizontal"
        app:layout_constraintGuide_end="120dp" />

    <Button
        android:id="@+id/button_black"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:background="@color/color_black"
        android:text="Black"
        android:textColor="@color/color_white"
        app:layout_constraintEnd_toStartOf="@+id/button_red"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/text_count" />

    <Button
        android:id="@+id/button_red"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:background="@color/color_red"
        android:text="Red"
        android:textColor="@color/color_white"
        app:layout_constraintEnd_toStartOf="@+id/button_blue"
        app:layout_constraintStart_toEndOf="@+id/button_black"
        app:layout_constraintTop_toBottomOf="@+id/text_count" />

    <Button
        android:id="@+id/button_blue"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:background="@color/color_blue"
        android:text="Blue"
        android:textColor="@color/color_white"
        app:layout_constraintEnd_toStartOf="@+id/button_green"
        app:layout_constraintStart_toEndOf="@+id/button_red"
        app:layout_constraintTop_toBottomOf="@+id/text_count" />

    <Button
        android:id="@+id/button_green"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:background="@color/color_green"
        android:text="Green"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/button_blue"
        app:layout_constraintTop_toBottomOf="@+id/text_count" />

    <Button
        android:id="@+id/button_count"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="Count"
        app:layout_constraintEnd_toStartOf="@+id/button_reset"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button_black" />

    <Button
        android:id="@+id/button_reset"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:text="Reset"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toEndOf="@+id/button_count"
        app:layout_constraintTop_toBottomOf="@+id/button_red" />

</androidx.constraintlayout.widget.ConstraintLayout>
```
### 3. Tạo Key class
Mục đích là tạo ra các Key dùng trong project
Các bạn tạo 1 class trong package chứa MainActivity : New -> Java Class, gõ tên class là  Key và tích chọn loại là @Anotation sau đó OK

![](https://images.viblo.asia/331152ba-bfb0-4f3f-a362-b78c59ed785e.png)
Đây là code trong Key Class
```Kotlin
import androidx.annotation.StringDef;

@StringDef({Key.COUNT_KEY, Key.COLOR_KEY})
public @interface Key {
    String COUNT_KEY = "count_key";
    String COLOR_KEY = "color_key";
}
```
### 4. Sử dụng SavedInstanceState
Bài toán đặt ra:  Khi một màn hình ứng dụng của người dùng (Activity) đang ở một trạng thái ở bất kỳ trong quá trình sử dụng, vào khi đó user quay màn hình thì Activity sẽ Destroy và sau đó khởi tạo 1 Activity mới. Và như vậy một số giá trị biến trước đó sẽ trở về giá trị ban đầu, ví dụ như số điểm của người chơi game trở về 0, tiến trình của progress bar cũng về vị trí ban đầu ...

Như các bạn biết thì SavedInstanceSate dùng để lưu trữ trạng thái của Activity khi cấu hình thay đổi ví dụ như xoay màn hình chẳng hạn.
Đây là code ở MainActivity

```Kotlin
package vn.sunasterisk.buoi10_saveintancestate_sharedpreferences;

import android.content.SharedPreferences;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity
        implements View.OnClickListener {

    private TextView mTextCount;
    private Button mButtonBlack;
    private Button mButtonRed;
    private Button mButtonBlue;
    private Button mButtonGreen;
    private Button mButtonCount;
    private Button mButtonReset;

    private int mCount;
    private int mColor;

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        registerListeners();

        returnState(savedInstanceState);
    }
    
    private void returnState(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            mCount = savedInstanceState.getInt(Key.COUNT_KEY);
            mColor = savedInstanceState.getInt(Key.COLOR_KEY);

            mTextCount.setText(String.valueOf(mCount));
            mTextCount.setBackgroundColor(mColor);
        }
    }

    private void registerListeners() {
        mButtonBlack.setOnClickListener(this);
        mButtonRed.setOnClickListener(this);
        mButtonBlue.setOnClickListener(this);
        mButtonGreen.setOnClickListener(this);
        mButtonCount.setOnClickListener(this);
        mButtonReset.setOnClickListener(this);
    }

    private void initViews() {
        mTextCount = findViewById(R.id.text_count);
        mButtonBlack = findViewById(R.id.button_black);
        mButtonRed = findViewById(R.id.button_red);
        mButtonBlue = findViewById(R.id.button_blue);
        mButtonGreen = findViewById(R.id.button_green);
        mButtonCount = findViewById(R.id.button_count);
        mButtonReset = findViewById(R.id.button_reset);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_black:
            case R.id.button_red:
            case R.id.button_blue:
            case R.id.button_green:
                changeTextBackground(v);
                break;
            case R.id.button_count:
                count();
                break;
            case R.id.button_reset:
                reset();
                break;
            default:
                break;
        }
    }

    private void changeTextBackground(View v) {
        Drawable background = v.getBackground();
        mColor = ((ColorDrawable) background).getColor();
        mTextCount.setBackgroundColor(mColor);
    }

    private void count() {
        mCount++;
        mTextCount.setText(String.valueOf(mCount));
    }

    private void reset() {
        mCount = 0;
        mTextCount.setText(String.valueOf(mCount));

        mColor = getResources().getColor(R.color.color_background);
        mTextCount.setBackgroundColor(mColor);

        SharedPreferences.Editor editor = mSharedPreferences.edit();
        editor.clear();
        editor.apply();
    }

    /**
     * nếu cấu hình bị thay đổi: xoay màn hình, thay đổi ngôn ngữ, bàn phím thì
     * chúng ta có thể lưu những dữ liệu đơn giản như int, string vào đây
     */
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt(Key.COUNT_KEY, mCount);
        outState.putInt(Key.COLOR_KEY, mColor);
    }

    /**
     * Phương thức này có thể lấy ra dữ liệu của saveInstanceSate
     * ngoài OnCreate() nhưng vẫn khuyến khích sử dụng trong OnCreate() hơn.
     * vì trong onCreate() được gọi khi Activity khởi tạo
     */
    @Override
    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        // returnState(savedInstanceState);
    }
}
```
Các bạn chạy ứng dụng thao tác khi ấn button Count và chọn Background cho màn hình sau đó quay màn hình, xem nó khác gì với khi không sử dụng SavedInstanceState nhé!

Vậy khi tắt ứng dụng và mở lại thì nó có lưu các giá trị Count và màu nền trước đó nữa không? Câu trả lời là không. Những ứng dụng lưu lại những giá trị trước đó khi tắt ứng dụng và bật lại thì chúng làm thế nào ????
### 5. Sử dụng Shared Preference
Để giải quyết bài toán trên thì bạn có thể dụng đối tượng SharedPreference của Android cung cấp. Các bạn xem code đầy đủ trong MainActivity dưới đây
```Kotlin
package vn.sunasterisk.buoi10_saveintancestate_sharedpreferences;

import android.content.SharedPreferences;
import android.graphics.drawable.ColorDrawable;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity
        implements View.OnClickListener {

    /**
     * - SaveInstanceState dùng để giữ lại dữ liệu đơn giản như String, int theo dạng
     * key-value trong trường trước hợp cấu hình ứng dụng thay đổi.
     * Vậy nhữn giữ liệu lớn hơn, phức tạp hơn thì chúng ta làm thế nào?
     * Chúng ta có thể dùng ViewModel, LocalStorage, ...
     * - Khi ta hủy ứng dụng và bật lại thì dữ liệu lưu bởi SaveInstanceState
     * không còn nữa. Có một số trường hợp người dùng muốn bật lại ứng dụng
     * và vẫn muốn lấy lại dữ liệu trước đó, ta có thể dùng SharedPreferences
     */

    private static final String TAG = MainActivity.class.getSimpleName();

    private TextView mTextCount;
    private Button mButtonBlack;
    private Button mButtonRed;
    private Button mButtonBlue;
    private Button mButtonGreen;
    private Button mButtonCount;
    private Button mButtonReset;

    private int mCount;
    private int mColor;

    private SharedPreferences mSharedPreferences;
    private String sharedFile = "vn.sunasterisk.sharedpreferences";

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        initViews();
        registerListeners();

        Log.d(TAG, "onCreate: ");

        //returnState(savedInstanceState);

        getDataFromPreferences();
    }

    private void getDataFromPreferences() {
        mSharedPreferences = getSharedPreferences(sharedFile, MODE_PRIVATE);
        mCount = mSharedPreferences.getInt(Key.COUNT_KEY, 0);
        mColor = mSharedPreferences.getInt(Key.COLOR_KEY, mColor);

        mTextCount.setText(String.valueOf(mCount));
        mTextCount.setBackgroundColor(mColor);
    }

    /**
     * phương thức này lấy các giá trị của acitivity trước đó mà bị thay đổi cấu
     * hình, update lại giao diện
     *
     */
    private void returnState(Bundle savedInstanceState) {
        if (savedInstanceState != null) {
            mCount = savedInstanceState.getInt(Key.COUNT_KEY);
            mColor = savedInstanceState.getInt(Key.COLOR_KEY);

            mTextCount.setText(String.valueOf(mCount));
            mTextCount.setBackgroundColor(mColor);
        }
    }

    private void registerListeners() {
        mButtonBlack.setOnClickListener(this);
        mButtonRed.setOnClickListener(this);
        mButtonBlue.setOnClickListener(this);
        mButtonGreen.setOnClickListener(this);
        mButtonCount.setOnClickListener(this);
        mButtonReset.setOnClickListener(this);
    }

    private void initViews() {
        mTextCount = findViewById(R.id.text_count);
        mButtonBlack = findViewById(R.id.button_black);
        mButtonRed = findViewById(R.id.button_red);
        mButtonBlue = findViewById(R.id.button_blue);
        mButtonGreen = findViewById(R.id.button_green);
        mButtonCount = findViewById(R.id.button_count);
        mButtonReset = findViewById(R.id.button_reset);
    }

    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.button_black:
            case R.id.button_red:
            case R.id.button_blue:
            case R.id.button_green:
                changeTextBackground(v);
                break;
            case R.id.button_count:
                count();
                break;
            case R.id.button_reset:
                reset();
                break;
            default:
                break;
        }
    }

    private void changeTextBackground(View v) {
        Drawable background = v.getBackground();
        mColor = ((ColorDrawable) background).getColor();
        mTextCount.setBackgroundColor(mColor);
    }

    private void count() {
        mCount++;
        mTextCount.setText(String.valueOf(mCount));
    }

    private void reset() {
        mCount = 0;
        mTextCount.setText(String.valueOf(mCount));

        mColor = getResources().getColor(R.color.color_background);
        mTextCount.setBackgroundColor(mColor);

        SharedPreferences.Editor editor = mSharedPreferences.edit();
        editor.clear();
        editor.apply();
    }

    /**
     * nếu cấu hình bị thay đổi: xoay màn hình, thay đổi ngôn ngữ, bàn phím thì
     * chúng ta có thể lưu những dữ liệu đơn giản như int, string vào đây
     */
    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putInt(Key.COUNT_KEY, mCount);
        outState.putInt(Key.COLOR_KEY, mColor);
        Log.d(TAG, "onSaveInstanceState: ");
    }

    /**
     * Phương thức này có thể lấy ra dữ liệu của saveInstanceSate
     * @param savedInstanceState
     */
    @Override
    protected void onRestoreInstanceState(@NonNull Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        Log.d(TAG, "onRestoreInstanceState: ");
    }

    @Override
    protected void onStart() {
        super.onStart();
        Log.d(TAG, "onStart: ");
    }

    @Override
    protected void onResume() {
        super.onResume();
        Log.d(TAG, "onResume: ");
    }

    @Override
    protected void onPause() {
        super.onPause();
        Log.d(TAG, "onPause: ");

        SharedPreferences.Editor editor = mSharedPreferences.edit();
        editor.putInt(Key.COUNT_KEY, mCount);
        editor.putInt(Key.COLOR_KEY, mColor);

        // không đồng bộ
        editor.apply();


        /*đồng bộ, trong một vài trường có thể chặn 1 số hoạt động, không khuyến
        khích dùng*/
        //editor.commit();
    }

    @Override
    protected void onStop() {
        super.onStop();
        Log.d(TAG, "onStop: ");
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "onDestroy: ");
    }
}
```
Các bạn chạy lên sử dụng, tắt và bật ứng dụng để trải nghiệm.
### 6. Tổng Kết
Vậy qua bài viết này này mình đã hướng dẫn các bạn làm một ứng dụng nho nhỏ để xem SavedInstanceState, SharedPreferences hoạt động như thế nào cũng như sự khác nhau giữa chúng.
Các bạn có thể xem source code ở [đây](https://github.com/awesome-academy/Buoi10_AA_PA1908)

Cám ơn đã theo dõi bài viết !