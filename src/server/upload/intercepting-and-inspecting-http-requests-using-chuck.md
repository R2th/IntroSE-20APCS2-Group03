# Introduction
Ever wanted a UI for the contents of your Http requests/response? Then Chuck is just what you need. It is a simple in-app Http inspector for Android OkHttp clients. Chuck intercepts and persists all HTTP requests and responses inside your very own application. Lets get started by creating a demo project. I have created one and named it ChuckDemo.

## Step 1
Add Chuck Library to your gradle.
**build.graddle**

```
 dependencies {
   debugCompile 'com.readystatesoftware.chuck:library:1.1.0'
   releaseCompile 'com.readystatesoftware.chuck:library-no-op:1.1.0'
 }
```

Now that we have imported out library we can make a simple http call to demo in the application.

## Step 2
Add Http library to the project. (Note: You can use retrofit or volley or whatever suits you)
**build.graddle**
`compile 'com.squareup.okhttp:okhttp:2.5.0'`

Now we are all set and can make a simple call to monitor the http request/response. Open up the MainActivity.java and create a method that makes and http call.

**MainActivity.java**

```
package com.example.pane.chuckdemo;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;

import com.readystatesoftware.chuck.ChuckInterceptor;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        makeHttpCall();
    }

    private void makeHttpCall() {
        OkHttpClient client = new OkHttpClient.Builder()
            .addInterceptor(new ChuckInterceptor(this))
            .build();
        Request request = new Request.Builder()
            .url("http://www.vogella.com/index.html")
            .build();
        client.newCall(request).enqueue(new Callback() {
            @Override
            public void onFailure(Call call, IOException e) {
                e.printStackTrace();
            }

            @Override
            public void onResponse(Call call, final Response response) throws IOException {
                if (!response.isSuccessful()) {
                    throw new IOException("Unexpected code " + response);
                } else {
                    // do something wih the result
                }
            }
        });
    }
}
```
Now we add permission to the Manifest file.

**AndroidManifest**

`<uses-permission android:name="android.permission.INTERNET"/>`

Run the app and you wilkl notice the check notification at the notification bar on the top of the device scree. Refer video below for demo.

![](https://images.viblo.asia/f2b19be6-ca07-4855-a22f-a70bea98f7d1.gif)