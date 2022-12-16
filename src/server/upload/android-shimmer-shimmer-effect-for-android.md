![](https://images.viblo.asia/1aec1741-b714-4104-a67b-5cf4860d8be6.gif)


# Giới thiệu 
Shimmer là cái gì ? tại sao nó  sinh ra ?? :

Shimmer là một thư viện  cung cấp một cách dễ dàng để thêm hiệu ứng load data cho  ứng dụng Android của chúng ta (Nó giúp người dùng có trải nghiệm tốt hơn khi dùng app) 
Facebook đã sử dụng thằng này để chỉ trạng thái khi load data (so pro :D :D) .
Shimmer được triển khai dưới dạng bố cục, có nghĩa là chúng ta có thể tự xậy dựng bố cục cho hiệu ứng load data trong code của mình (cái này tý xem code sẽ rõ hơn)

# Về mặt lí thdata

1.Download,Building

đầu tiên chung ta cần add thư viện Shimmer vào trong build.gradle 
```
dependencies {
       implementation 'com.facebook.shimmer:shimmer:0.1.0@aar'
}
```

2. Sử dụng như thế nào 

**trong flie xml**
```
<com.facebook.shimmer.ShimmerFrameLayout
     android:id="@+id/shimmer_view_container"
     android:layout_width="wrap_content"
     android:layout_height="wrap_content"
>
     ...(your complex view here)...
</com.facebook.shimmer.ShimmerFrameLayout>
```
**trong activity(với  code java với kotlin tý mình sẽ thực hành cho các bạn thấy rõ**
```
ShimmerFrameLayout container = 
  (ShimmerFrameLayout) findViewById(R.id.shimmer_view_container);
container.startShimmer();

```
# Bắt tay vào làm nào 
    
  * Mình sẽ tạo 1 project  sử dụng Rxjava2 ,  Retrofit  để request ,xử lí data(xem chi tiết tại  https://viblo.asia/p/kotlin-tim-hieu-ve-rxjava2-va-retrofit-phan-i-07LKXOQe5V4 ) từ API: https://api.learn2crack.com/   và 1  recycleview để hiển thị dữ liệu
    và sử dụng shimmer trong quá trình đợi load data*
                
1.**add thêm các thư viện cần thiết vào  build.gradle**

```
    //shimmer
    compile 'com.facebook.shimmer:shimmer:0.1.0@aar'

    // Android
    compile 'com.android.support:recyclerview-v7:27.1.0'
            ''
    compile 'com.android.support:support-annotations:26.1.0'
    compile 'com.android.support:cardview-v7:27.1.0'
    compile 'com.android.support:design:27.1.0'

    // RxJava
    compile 'io.reactivex.rxjava2:rxjava:2.0.1'
    compile 'io.reactivex.rxjava2:rxandroid:2.0.1'

    // Retrofit
    compile 'com.squareup.retrofit2:retrofit:2.3.0'
    compile 'com.squareup.retrofit2:converter-gson:2.1.0'
    // RxJava adapter for retrofit
    compile 'com.squareup.retrofit2:adapter-rxjava2:2.2.0'
```

   2. Xây dựng layout giống như khung item khi chúng ta show dữ liệu (dataplaceholderlayout.xml)
    
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_marginBottom="1dp">

    <View
        android:id="@+id/tv_name"
        android:layout_width="100dp"
        android:layout_height="15dp"
        android:layout_marginEnd="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginStart="12dp"
        android:layout_marginTop="12dp"
        android:background="@color/colorItemAndroidVersion"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.0"
        app:layout_constraintStart_toStartOf="@+id/guideline"
        app:layout_constraintTop_toTopOf="@+id/guideline2" />

    <View
        android:id="@+id/tv_version"
        android:layout_width="50dp"
        android:layout_height="15dp"
        android:layout_marginEnd="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:background="@color/colorItemAndroidVersion"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.037"
        app:layout_constraintStart_toStartOf="@+id/guideline"
        app:layout_constraintTop_toBottomOf="@+id/tv_name" />

    <View
        android:id="@+id/tv_api_level"
        android:layout_width="100dp"
        android:layout_height="15dp"
        android:layout_marginEnd="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:background="@color/colorItemAndroidVersion"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.023"
        app:layout_constraintStart_toStartOf="@+id/guideline"
        app:layout_constraintTop_toBottomOf="@+id/tv_version" />

    <View
        android:id="@+id/imageView"
        android:layout_width="110dp"
        android:layout_height="100dp"
        android:layout_marginBottom="16dp"
        android:layout_marginEnd="8dp"
        android:layout_marginLeft="8dp"
        android:layout_marginRight="8dp"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:background="@color/colorItemAndroidVersion"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/guideline"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/guideline2" />

    <android.support.constraint.Guideline
        android:id="@+id/guideline"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:orientation="vertical"
        app:layout_constraintGuide_begin="123dp" />

    <android.support.constraint.Guideline
        android:id="@+id/guideline2"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="16dp"
        android:orientation="horizontal"
        app:layout_constraintGuide_end="120dp"
        app:layout_constraintTop_toTopOf="parent" />
</android.support.constraint.ConstraintLayout>
```

3.Xây dựng layout cho activity (activity_main.xml) nơi sẽ sử dụng thằng shimmer nay 
    
   Chúng ta sẽ add 4 thằng dataplaceholderlayout vào layout tương ứng là  4 item trong recycleview khi đã load xong dữ liệu
    
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".features.ListAndroidVersionActivity">

    <com.facebook.shimmer.ShimmerFrameLayout
        android:id="@+id/shimmer_view_container"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_gravity="center"
        android:layout_marginTop="15dp"
        android:orientation="vertical">

        <LinearLayout
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:orientation="vertical">
            <!--4 dong include thể hiện cho 4 item trong RecyclerView đang được load data-->
            <include layout="@layout/data_placeholder_layout" />

            <include layout="@layout/data_placeholder_layout" />

            <include layout="@layout/data_placeholder_layout" />

            <include layout="@layout/data_placeholder_layout" />

        </LinearLayout>

    </com.facebook.shimmer.ShimmerFrameLayout>

    <android.support.v7.widget.RecyclerView
        android:id="@+id/rv_android_list"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        app:layout_constraintLeft_toLeftOf="parent"
        app:layout_constraintRight_toRightOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```


4.**Xây dựng activiti xử lí load data và thằng shimmer (ListAndroidVersionActivity) 

   Chúng ta start/stop Shimmer animation bằng cách gọi phương thức startShimmerAnimation()/stopShimmerAnimation()
     gọi phương thức này ở  onResume()/oPause()  trong activity  
   

```
package com.example.framgiatongxuanan.viblo_shimmer_effect.features

import android.os.Bundle
import android.os.Handler
import android.support.v7.app.AppCompatActivity
import android.support.v7.widget.LinearLayoutManager
import android.support.v7.widget.RecyclerView
import android.util.Log
import android.view.View
import android.widget.Toast
import com.example.framgiatongxuanan.viblo_shimmer_effect.ApiService
import com.example.framgiatongxuanan.viblo_shimmer_effect.R
import com.example.framgiatongxuanan.viblo_shimmer_effect.adapter.AndroidVersionAdapter
import com.example.framgiatongxuanan.viblo_shimmer_effect.data.AndroidVersion
import com.example.framgiatongxuanan.viblokolin.features.androidversion.Repository
import io.reactivex.android.schedulers.AndroidSchedulers
import io.reactivex.schedulers.Schedulers
import kotlinx.android.synthetic.main.activity_main.*


/**
 * Created by FRAMGIA\tong.xuan.an on 08/01/2018.
 */
class ListAndroidVersionActivity : AppCompatActivity() {
    private val TAG = ListAndroidVersionActivity::class.java.simpleName
    private var mAdapter: AndroidVersionAdapter? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initRecyclerView()
        requestAndroidVersion()

    }

    override fun onResume() {
        super.onResume()
        shimmer_view_container.startShimmerAnimation()
    }

    override fun onPause() {
        super.onPause()
        shimmer_view_container.stopShimmerAnimation()

    }

    // khởi tao recyclerview
    private fun initRecyclerView() {
        rv_android_list.setHasFixedSize(true)
        val layoutManager: RecyclerView.LayoutManager = LinearLayoutManager(this)
        rv_android_list.layoutManager = layoutManager
    }

    // request data tu server
    private fun requestAndroidVersion() {
        Repository.createService(ApiService::class.java).getAndroidVersion()
                .observeOn(AndroidSchedulers.mainThread())
                .subscribeOn(Schedulers.io())
                .subscribe(
                        //cú pháp của rxjava trong kotlin
                        { result ->
                            //request thành công
                            handleSuccessAndroidVersion(result)
                        },
                        { error ->
                            //request thất bai
                            handlerErrorAndroidVersion(error)
                        }
                )
    }

    //Xử lí dữ liệu khi request thành công
    private fun handleSuccessAndroidVersion(result: List<AndroidVersion>) {
       /*mình dùng thằng Handler().postDelayed này để delay lại quá trình load xong dữ liệu để các bạn có thể thấy rõ hơn animation*/
        Handler().postDelayed({
            mAdapter = AndroidVersionAdapter(result)
            rv_android_list.adapter = mAdapter
            shimmer_view_container.stopShimmerAnimation()
            shimmer_view_container.visibility = View.GONE
        }, 5000)

    }

    //Xử lí dữ lieu khi request thất bại
    private fun handlerErrorAndroidVersion(error: Throwable) {
        Log.e(TAG, "handlerErrorAndroidVersion: ${error.localizedMessage}")
        Toast.makeText(this, "Error ${error.localizedMessage}", Toast.LENGTH_SHORT).show()
    }
}

```

**Để chi tiết hơn về project các bạn đọc các comment mình đã note và tham khảo source code dưới đây**

github: https://github.com/oTongXuanAn/viblo_shimmer_effect/tree/antx/master


# Tài liệu tham khảo
http://facebook.github.io/shimmer-android/

https://medium.com/mindorks/android-design-shimmer-effect-fa7f74c68a93