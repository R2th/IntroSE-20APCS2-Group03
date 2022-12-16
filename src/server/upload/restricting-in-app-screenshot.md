# Introduction
When building an app it may be required to restric the in app screenshot for security purpose or others. This is easily archeived by using FLAG in your Activity's onCreate or Frag's. However what if you already have an app with multiple classes? In this case it is better to have a Base Activity or Fragment where others extends. Check the eamples below to restrict the users from taking a screenshot of your App.

Option 1:
The basic. Add this single line of Code to your onCreate Activity.

` getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);`
 

Note: When using this you will have to write duplicates of this code on each and every acticity you are trying to retrict screenshot. The best way around this is like i said, create another abstract base activity where other activities will extend here making it extreemly easier to add only the same line of code but it is effective for all other activities that extends it.
 
 Option 2:
 Create BaseActivity
 
```
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

public class BaseActivity extends AppCompatActivity {

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        //Restrict screenshot feature from all activities that extends this base activity
        getWindow().setFlags(WindowManager.LayoutParams.FLAG_SECURE, WindowManager.LayoutParams.FLAG_SECURE);
    }

    @Override
    protected void onStart() {
        super.onStart();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
    }
}
```

That's it. Your app whenever a screenshot is requested will display an error at the notification (Check Image Below) telling users it is not supported by the App. Happy Coding!!!

![](https://images.viblo.asia/629fd8ce-cdb9-4f75-b85d-8edac26e0e09.png)