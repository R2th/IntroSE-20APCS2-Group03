Trong hướng dẫn này, chúng ta sẽ tạo Color Picker Dialog bằng cách sử dụng thư viện GitHub được gọi là thư viện AmbilWarna. Thư viện này là một thư viện khá tốt và được hàng trăm ứng dụng sử dụng. Vì vậy, đây là hướng dẫn từng bước hoàn chỉnh cho việc tạo ứng dụng có sử dụng Color Picker Dialog

## Bước 1.
Mở file build.gradle(Module:app) trong project

![](https://images.viblo.asia/c2dd6dbc-a124-4a12-9029-9ec89264b291.png)

## Bước 2.
Thêm `compile ‘com.github.yukuku:ambilwarna:2.0.1’` vào trong dependencies.

![](https://images.viblo.asia/cf30b751-fd6f-4316-90fb-206ab703d8fd.png)

## Bước 3.
Thêm đoạn mã dưới đây vào trong file MainActivity.java

```
package com.android_examples.colorpicker_android_examplescom;
import android.support.v4.content.ContextCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.RelativeLayout;
import android.widget.Toast;

import yuku.ambilwarna.AmbilWarnaDialog;

public class MainActivity extends AppCompatActivity {

    Button button;
    RelativeLayout relativeLayout;
    int DefaultColor ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        relativeLayout = (RelativeLayout) findViewById(R.id.activity_main);

        button = (Button) findViewById(R.id.button);

        DefaultColor = ContextCompat.getColor(MainActivity.this, R.color.colorPrimary);

        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {

                OpenColorPickerDialog(false);

            }
        });
    }

    private void OpenColorPickerDialog(boolean AlphaSupport) {

        AmbilWarnaDialog ambilWarnaDialog = new AmbilWarnaDialog(MainActivity.this, DefaultColor, AlphaSupport, new AmbilWarnaDialog.OnAmbilWarnaListener() {
            @Override
            public void onOk(AmbilWarnaDialog ambilWarnaDialog, int color) {

                DefaultColor = color;

                relativeLayout.setBackgroundColor(color);
            }

            @Override
            public void onCancel(AmbilWarnaDialog ambilWarnaDialog) {

                Toast.makeText(MainActivity.this, "Color Picker Closed", Toast.LENGTH_SHORT).show();
            }
        });
        ambilWarnaDialog.show();

    }

    }
```

Thêm đoạn mã dưới đây vào file activity_main.xml

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
    tools:context="com.android_examples.colorpicker_android_examplescom.MainActivity">

    <Button
        android:text="open Color Picker Dialog"
        android:layout_width="fill_parent"
        android:layout_height="wrap_content"
        android:layout_centerVertical="true"
        android:layout_centerHorizontal="true"
        android:id="@+id/button" />

</RelativeLayout>
```
## Bước 4.

Chạy thử demo:

![](https://images.viblo.asia/7f82bbbb-9eb7-4ca2-b5b9-7a0cca630639.png)

![](https://images.viblo.asia/cfee269b-965d-4d9a-8056-1fb3b82ff90f.png)

![](https://images.viblo.asia/7f68b858-dd48-40a9-a8eb-1864cc13be06.png)

[Source code](https://www.mediafire.com/file/6u4k3dzoo1zv1vl/ColorPicker-Android-Examples.com.zip)

[Source](https://www.android-examples.com/android-create-color-picker-dialog-example-tutorial-using-library/)