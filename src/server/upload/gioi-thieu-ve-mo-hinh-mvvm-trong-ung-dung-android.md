###  MVVM architecture pattern
> MVVM là viết tắt của Model –View – ViewModel. MVVM được phát triển dựa trên kiến trúc MVP, có cấu trúc khá tương đồng
> Hình ảnh dưới đây sẽ mô tả về mối quan hệ giữa các thành phần trong pattern này.

![](https://images.viblo.asia/ae0f036b-01f1-4072-ba34-d166191b209f.png)

**Và sau đây chúng ta sẽ tìm hiểu lần lượt từng phần**

### Set up :
Ở build.gradle level app chúng ta hãy thêm vào:
```
...
android {
  ...
  dataBinding {
    enabled = true
  }
}
```
### View : Thành phần giao diện của ứng dụng.
**View là thành phần duy nhất mà người dùng có thể tương tác được trong chương trình, nó chính là thành phần mô tả dữ liệu. Trong lập trình android, View là một activity, fragment, hay một custom view...
Sau đây là một số hành động mà view có thể thực hiện:**

-Starting activity

-Lắng nghe sự kiện từ người dùng

-Hiển thị Toast, Dialog , Snackbars.

-…

Ví dụ : đó là 1  activity hoặc fragment có thẻ <layout></layout> bao gồm <data> để liên kết trực tiếp đến các thành phần của viewModel 
```xml
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="https://schemas.android.com/apk/res/android"
    xmlns:app="https://schemas.android.com/apk/res-auto">

    <data>

        <variable
            name="loginViewModel"
            type="com.journaldev.androidmvvmdatabindinglivedata.LoginViewModel" />
    </data>


    <ScrollView
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="center"
            android:layout_margin="8dp"
            android:orientation="vertical">

            <android.support.design.widget.TextInputLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                app:error="@{loginViewModel.errorEmail}"
                app:errorEnabled="true">

                <EditText
                    android:id="@+id/inEmail"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:hint="Email"
                    android:inputType="textEmailAddress"
                    android:padding="8dp"
                    android:text="@={loginViewModel.email}" />

            </android.support.design.widget.TextInputLayout>

            <android.support.design.widget.TextInputLayout
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                app:error="@{loginViewModel.errorPassword}"
                app:errorEnabled="true">

                <EditText
                    android:id="@+id/inPassword"
                    android:layout_width="match_parent"
                    android:layout_height="wrap_content"
                    android:hint="Password"
                    android:inputType="textPassword"
                    android:padding="8dp"
                    android:text="@={loginViewModel.password}" />

            </android.support.design.widget.TextInputLayout>


            <Button
                android:id="@+id/button"
                android:layout_width="match_parent"
                android:layout_height="wrap_content"
                android:layout_marginTop="8dp"
                android:onClick="@{()-> loginViewModel.onLoginClicked()}"
                android:text="LOGIN" />


            <ProgressBar
                android:id="@+id/progressBar"
                style="?android:attr/progressBarStyleLarge"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:layout_gravity="center_horizontal"
                android:layout_marginTop="8dp"
                android:visibility="@{loginViewModel.busy}" />


        </LinearLayout>

    </ScrollView>

</layout>
```
    
### ViewModel
**ViewModel là một abstraction của View. Nó sẽ lấy dữ liệu từ tầng Model, xửu lý UI logic sau đó hiển thị data có liên quan tới view. ViewModel sẽ không có bất kỳ behavior nào để tương tác với View. Như vậy để nhận biết khi nào cần hiển thị dư liệu, View sẽ đăng ký nhận notification từ ViewModel. Một số chức năng cụ thể mà ViewModel có thể thực hiện :**

Truy suất và thông báo hiển thị dữ liệu cho view.
    
Xử lý visibility của View
    
Xác thực dữ liệu đầu vào
    
**… ViewModel chỉ nên biết về application context. Chúng ta chỉ nên thực hiện một số hành động liên quan đến context tại ViewModel như sau :**
    
Start a service
    
Bind to a service
    
Gửi một broadcast
    
Đăng ký broadcast receiver
    
Load resource values
    
**ViewModel không nên:**
    
Hiện thị một dialog
    
Start activity
    
Inflate layout
    
 Ví dụ về Viewmodel ;
    
```java
package com.journaldev.androidmvvmdatabindinglivedata;

import android.arch.lifecycle.LiveData;
import android.arch.lifecycle.MutableLiveData;
import android.arch.lifecycle.ViewModel;
import android.os.Handler;


public class LoginViewModel extends ViewModel {


    public MutableLiveData<String> errorPassword = new MutableLiveData<>();
    public MutableLiveData<String> errorEmail = new MutableLiveData<>();

    public MutableLiveData<String> email = new MutableLiveData<>();
    public MutableLiveData<String> password = new MutableLiveData<>();
    public MutableLiveData<Integer> busy;

    public MutableLiveData<Integer> getBusy() {

        if (busy == null) {
            busy = new MutableLiveData<>();
            busy.setValue(8);
        }

        return busy;
    }


    public LoginViewModel() {

    }

    private MutableLiveData<User> userMutableLiveData;

    LiveData<User> getUser() {
        if (userMutableLiveData == null) {
            userMutableLiveData = new MutableLiveData<>();
        }

        return userMutableLiveData;
    }


    public void onLoginClicked() {

        getBusy().setValue(0); //View.VISIBLE
        new Handler().postDelayed(new Runnable() {
            @Override
            public void run() {


                User user = new User(email.getValue(), password.getValue());

                if (!user.isEmailValid()) {
                    errorEmail.setValue("Enter a valid email address");
                } else {
                    errorEmail.setValue(null);
                }

                if (!user.isPasswordLengthGreaterThan5())
                    errorPassword.setValue("Password Length should be greater than 5");
                else {
                    errorPassword.setValue(null);
                }

                userMutableLiveData.setValue(user);
                busy.setValue(8); //8 == View.GONE

            }
        }, 3000);
    }
}
    
```
### Model
**Model chứa phần data được lấy từ nhiều nguồn khác nhau, ví dụ như:**
    
• REST API
    
• Realm db
    
• SQLite db
    
• Handles broadcast
    
• Shared Preferences
    
• Firebase
    
• …
**Model sẽ chứa toàn bộ business logic, mix giữa các luồng dữ liệu( giữa local data và remote data) trước khi dữ liệu đó được hiển thị cho client. Model còn chứa cái object và các thành phần dữ liệu **
    
ví dụ về Model user :

```java
package com.journaldev.androidmvvmdatabindinglivedata;


import android.util.Patterns;

public class User {

    private String mEmail;
    private String mPassword;


    public User(String email, String password) {
        mEmail = email;
        mPassword = password;
    }

    public String getEmail() {
        if (mEmail == null) {
            return "";
        }
        return mEmail;
    }


    public String getPassword() {

        if (mPassword == null) {
            return "";
        }
        return mPassword;
    }

    public boolean isEmailValid() {
        return Patterns.EMAIL_ADDRESS.matcher(getEmail()).matches();
    }


    public boolean isPasswordLengthGreaterThan5() {
        return getPassword().length() > 5;
    }

}
```

### Kết luận :
    
**Cũng giống như MVP, MVVM thực hiện abtract trạng thái và thể hiện của View, cho phép chúng ta phân tách rõ ràng việc phát triển giao diện với xử lý business logic. MVVM đã kế thừa những ưu điểm vốn có của MVP, kết hợp với những lợi thế của data binding đem đến một pattern có khả năng phân chia các thành phần với từng chức năng riêng biệt, dễ dàng trong việc maintain, redesign. MVVM cũng đem lại khả năng test rất dễ dàng.**
    
    
Trên đây là 1 số điều mình cần giưới thiệu với các bạn về Mvvm .  Chúc các bạn có nền tảng kiến thức trên