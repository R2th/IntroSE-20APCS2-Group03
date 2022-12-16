Kể từ khi trở thành ngôn ngữ được hỗ trợ chính thức cho phát triển Android, Kotlin đã nhanh chóng phát triển phổ biến.
Google đã báo cáo rằng số lượng các ứng dụng được tạo bằng Kotlin đã tăng 6 lần.

Nếu trước đây bạn đã sử dụng RxJava hoặc RxAndroid và muốn chuyển sang Kotlin hoặc muốn bắt đầu lập trình với Kotlin, hướng dẫn này là dành cho bạn. 
Chúng ta sẽ đề cập đến các yếu tố cần thiết để tạo RxJava 2.0 Observers, Observables và luồng dữ liệu trong Kotlin.

## RxJava là gì ?

RxJava là một mã nguồn mở triển khai từ thư viện ReactiveX giúp bạn tạo các ứng dụng theo kiểu lập trình reactive.
Mặc dù RxJava được thiết kế để xử lý các luồng dữ liệu đồng bộ và không đồng bộ, nhưng nó không bị giới hạn ở các kiểu dữ liệu “truyền thống”.

Định nghĩa về "dữ liệu" của RxJava khá rộng và bao gồm những thứ như cache, biến, thuộc tính và thậm chí cả các sự kiện nhập của người dùng như nhấp chuột và vuốt.

Mặc dù ứng dụng của bạn không xử lý các con số khổng lồ hoặc thực hiện các phép biến đổi dữ liệu phức tạp, điều đó không có nghĩa là ứng dụng đó không được hưởng lợi từ RxJava!

## RxJava hoạt động như thế nào ?

RxJava kế thừa từ design pattern Observer, dựa trên mối quan hệ giữa Observers và Observables.
Để tạo một đối tượng RxJava cơ bản, bạn cần :

* Tạo một Observable.
* Cung cấp cho Observable một số dữ liệu.
* Tạo một Observer.
* Đăng ký Observer cho Observable.

Ngay sau khi Observable có ít nhất một Observer, nó sẽ bắt đầu phát ra dữ liệu. 
Mỗi khi Observable phát ra một mẩu dữ liệu, nó sẽ thông báo cho Observer được chỉ định của nó bằng cách gọi phương thức onNext(), và sau đó Observer sẽ thực hiện một số hành động để đáp ứng với phát xạ dữ liệu này.
Khi Observable đã hoàn thành việc phát ra dữ liệu, nó sẽ thông báo cho Observer bằng cách gọi onComplete (). Sau đó, Observable sẽ chấm dứt và luồng dữ liệu sẽ kết thúc.

Nếu exception xảy ra, thì onError () sẽ được gọi, và Observable sẽ chấm dứt ngay lập tức mà không phát ra thêm bất kỳ dữ liệu nào hoặc gọi onComplete ().

## Tạo Observers and Observables trong Kotlin

Observer và Observable là các thành phần cơ bản của RxJava, vì vậy hãy bắt đầu bằng cách tạo:

* Một Observable đơn giản phát ra một luồng dữ liệu ngắn để đáp ứng với một sự kiện nhấn nút.
* Một Observable phản ứng với dữ liệu này bằng cách in các thông điệp khác nhau tới Logcat của Android Studio.

Mở Android Studio, tạo Project mới, chọn **Include Kotlin support** . Tiếp theo, trong file build.gradle của project thêm thư viện RxJava như sau :

```
dependencies {
  implementation fileTree(dir: 'libs', include: ['*.jar'])
  implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
  implementation 'androidx.appcompat:appcompat:1.0.0-alpha1'
  implementation 'androidx.constraintlayout:constraintlayout:1.1.0'
  implementation 'io.reactivex.rxjava2:rxjava:2.1.9'
 
}
```

Mở layout **activity_main.xml** và thêm button như sau :

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
  xmlns:tools="http://schemas.android.com/tools"
  android:layout_width="match_parent"
  android:layout_height="match_parent"
  android:orientation="vertical"
  tools:context=".MainActivity" >
 
  <Button
      android:id="@+id/button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="Start RxJava stream" />
 
</LinearLayout>
```

Có một vài cách khác nhau để tạo một Observable, một trong những cách dễ nhất là sử dụng toán tử just() để chuyển đổi một hoặc nhiều đối tượng thành Observable.

Trong đoạn code sau, chúng ra sẽ tạo một Observable ( myObservable ) và cho nó các items 1,2,3,4 và 5. 
Chúng ta cũng tạo ra một Observer (myObserver), đăng kí nó với myObservabe, và sau đó yêu cầu nó in một message tới Logcat mỗi khi nó nhận được một phát xạ mới :

```
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.util.Log
import io.reactivex.Observable
import io.reactivex.Observer
import io.reactivex.disposables.Disposable
import kotlinx.android.synthetic.main.activity_main.*
 
class MainActivity : AppCompatActivity() {
 
  private var TAG = "MainActivity"
 
  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)
      setContentView(R.layout.activity_main)
 
//Start the stream when the button is clicked//
 
      button.setOnClickListener { startRStream() }
 
  }
 
  private fun startRStream() {
 
//Create an Observable//
 
      val myObservable = getObservable()
 
//Create an Observer//
 
      val myObserver = getObserver()
 
//Subscribe myObserver to myObservable//
 
      myObservable
              .subscribe(myObserver)
  }
 
  private fun getObserver(): Observer<String> {
      return object : Observer<String> {
          override fun onSubscribe(d: Disposable) {
          }
 
//Every time onNext is called, print the value to Android Studio’s Logcat//
 
          override fun onNext(s: String) {
              Log.d(TAG, "onNext: $s")
          }
 
//Called if an exception is thrown//
 
          override fun onError(e: Throwable) {
              Log.e(TAG, "onError: " + e.message)
          }
 
//When onComplete is called, print the following to Logcat//
 
          override fun onComplete() {
              Log.d(TAG, "onComplete")
          }
      }
  }
 
//Give myObservable some data to emit//
 
  private fun getObservable(): Observable<String> {
      return Observable.just("1", "2", "3", "4", "5")
  }
}
```

Lúc này, bạn có thể chạy ứng dụng và test :

* Click nút Start RxJava.
* Mở logcat của Android Studio.

Tại thời điểm này, Observable sẽ bắt đầu phát ra dữ liệu của nó, và Observer sẽ in các thông điệp của nó tới Logcat. 
Đầu ra Logcat của bạn sẽ như sau:
![](https://images.viblo.asia/2c6e6824-1aae-476a-b236-891152a26efc.png)

Bạn có thể tham khảo Project mẫu [tại đây](https://github.com/tutsplus/reactive-kotlin-programming-basic-example).

## Kotlin Extensions cho RxJava

Lúc này chúng ta đã biết cách thiết lập một RxJava đơn giản trong Kotlin, hãy xem cách bạn có thể đạt được điều này với ít mã hơn, sử dụng các chức năng mở rộng của RxKotlin.

Hãy thêm các dependencies như sau :

```
dependencies {
  implementation fileTree(dir: 'libs', include: ['*.jar'])
  implementation "org.jetbrains.kotlin:kotlin-stdlib-jdk7:$kotlin_version"
  implementation 'androidx.appcompat:appcompat:1.0.0-alpha1'
  implementation 'androidx.constraintlayout:constraintlayout:1.1.0'
  implementation 'io.reactivex.rxjava2:rxjava:2.1.9'
 
//Add the following//
 
  implementation 'io.reactivex.rxjava2:rxkotlin:2.2.0'
 
}
```

Trong ví dụ sau, chúng ta đang sử dụng chức năng mở rộng toObservable () của RxKotlin để biến List thành Observable.

Chúng ta cũng sử dụng chức năng mở rộng subscribeBy(), vì nó cho phép xây dựng một Observer sử dụng các đối số được đặt tên, dẫn đến mã rõ ràng hơn.

```
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import io.reactivex.rxkotlin.subscribeBy
import io.reactivex.rxkotlin.toObservable
import kotlinx.android.synthetic.main.activity_main.*
 
class MainActivity : AppCompatActivity() {
 
  override fun onCreate(savedInstanceState: Bundle?) {
      super.onCreate(savedInstanceState)
      setContentView(R.layout.activity_main)
 
//Start the stream when the button is clicked//
 
      button.setOnClickListener { startRStream() }
 
  }
 
  private fun startRStream() {
 
      val list = listOf("1", "2", "3", "4", "5")
 
//Apply the toObservable() extension function//
 
      list.toObservable()
 
//Construct your Observer using the subscribeBy() extension function//
 
              .subscribeBy(
 
                      onNext = { println(it) },
                      onError = { it.printStackTrace() },
                      onComplete = { println("onComplete!") }
 
              )
  }
}
```

Kết quả như sau :

![](https://images.viblo.asia/c62a3f13-5b22-435d-a0b2-05469b64d907.png)