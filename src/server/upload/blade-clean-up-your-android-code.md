# Blade - Clean up your Android code
## Giới thiệu
Blade là một thư viện cho boilerplate destruction - *"Just code what is worth coding"*
* Tạo boilerplate code bằng việc sử dụng các annotations, giúp chúng ta tiết kiệm thời gian.
* Code được tạo ra là  fully traceable.
* Mọi thứ được tạo ra suốt quá trình compile time.
* Bao gồm các modules.

## Modules
Library này được chia thành các modules. Mỗi module cung cấp một anotation và support các classes khác nhau:
* `arg`
* `extra`
* `parcel`
* `mvp`
* `state`

Annotation đặc biệt: `@Blade`

## Usage
Tạo config file với tên là `blade.yaml` trong application directory, cùng với các modules chúng ta cần.
```
modules:
  - arg
  - extra
  - mvp
  - parcel
  - state
```
Sau đó chúng ta sẽ thêm một dependency classpath mới.
```
classpath 'eu.f3rog.blade:plugin:2.7.1'
```
Và cuối cùng, apply gradle plugin.
```
apply plugin: 'blade'
```

## @Blade
Nếu chúng ta không dùng bất kì `@Extra` bên trong class, nhưng muốn library tạo ra các phương thức `blade.I` cho class đó thì annoate nó với `@Blade`, như: 
```
@Blade
public class MyActivity extends Activity {
    // no attributes with @Extra
}
```
Tương tự với việc áp dụng cho `@Arg`.

## arg
* **arg** module cung cấp `@Arg` annotation.
* Được dùng để tạo một phương thức `newInstance()` cho các class `Fragment`.

Nếu không sử dụng thư viện này chúng ta có thể sẽ có đoạn code như sau:
```
public class MyFragment extends Fragment {

    private static final String ARG_TEXT = "arg_text";
    private static final String ARG_DATA = "arg_data";

    public static MyFragment newInstance(String text, MyData data) {
        MyFragment frag = new MyFragment();
        Bundle args = new Bundle();
        args.putString(ARG_TEXT, text);
        args.putParcelable(ARG_DATA, data);
        frag.setArguments(args);
        return frag;
    }

    private String mText;
    private MyData mData;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        mText = getArguments().getString(ARG_TEXT);
        mData = (MyData) getArguments().getParcelable(ARG_DATA);
    }
}
```
Nhưng với thư viện Blade chúng ta chỉ cần:
```
public class MyFragment extends Fragment {

    @Arg
    String mText;
    @Arg
    MyData mData;

}
```

Class `blade.F` (= Fragment) được tự động tạo ra cho chúng ta. Class này chứa 1 method cho mỗi Fragment class với annotated fields:
* `X newX(T1 arg1[, T2 arg2, ...])` - Tạo new instance của lớp X.

Ví dụ cho `MyFragment` class bên trên, nó sẽ chứa methob có tên là `newMyFragment(...)` với 2 parameters: `String` và `MyData`. Vậy nên, chúng ta có thể dễ dàng tạo new fragment bằng việc gọi:
```
F.newMyFragment("some-string", new MyData());
```
Sau đó các giá trị sẽ được inject tương ứng với các field được annotated với `@Arg`, tại thời điểm bắt đầu `onCreate(Bundle)`.

Class `blade.F` không phải là một final class, vì vậy chúng ta có thể extend nó và thêm nhiều methods hơn.

* ***Xem thêm**: Custom serialization (https://github.com/FrantisekGazo/Blade/wiki/arg)*

## extra
* **extra** module cung cấp `@Extra` annotation.
* Annotation tạo ra các `newIntent()` methods cho các lớp `Activity` hoặc `Service`.

Ví dụ :
```
public class MyActivity extends Activity {

    private static final String EXTRA_TEXT = "extra_text";
    private static final String EXTRA_DATA = "extra_data";

    public static Intent newIntent(Context context, String text, MyData data) {
        Intent intent = new Intent(context, MyActivity.class);
        intent.putExtra(EXTRA_TEXT, text);
        intent.putExtra(EXTRA_DATA, data);
        return intent;
    }

    private String mText;
    private MyData mData;

    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        Bundle extras = getIntent().getExtras();
        mText = extras.getString(EXTRA_TEXT);
        mData = (MyData) extras.getParcelable(EXTRA_DATA);
    }
}
```
Với thư viện này ta có thể rút gọn thành: 
```
public class MyActivity extends Activity {

    @Extra
    String mText;
    @Extra
    MyData mData;

}
```
Class `blade.I` (= Intent) Cũng sẽ tự động được tạo ra cho chúng ta. Class này chứa 2 methods cho mỗi class `Activity` với các annotated fields:
* `Intent forX(Context c, T1 extra1[, T2 extra2, ...])` - Tạo new Intent có thể được dùng cho việc start một new activity.
* `void startX(Context c, T1 extra1[, T2 extra2, ...])` - Tạo new Intent và starts new activity.

Ví dụ cho `MyActivity` class như trên, nó sẽ chứa các method với  tên `forMyActivity(Context,String,MyData)` và `startMyActivity(Context,String,MyData)`. Chúng ta có thể dễ dàng start new `Activity` bằng việc gọi:
```
I.startMyActivity(context, "some-string", new MyData());
```
Sau đó các giá trị sẽ được inject tương ứng với các field được annotated với `@Extra`, tại thời điểm bắt đầu `onCreate(Bundle)` method (Đối với `Service`/`IntentService` nó sẽ bắt đầu ở `onStartCommand(Intent, int, int)/onHandleIntent(Intent)`).

Class `blade.I ` cũng không phải là một final class, vì vậy chúng ta có thể extend nó và thêm nhiều methods hơn.

* ***Xem thêm**: Custom serialization (https://github.com/FrantisekGazo/Blade/wiki/extra)*

### `launchMode:singleTop` Activity
Module này cũng hỗ trợ các Activities với `launchMode:singleTop`. Các fields annotated với `@Extra` cũng được inject tại thời điểm bắt đầu `onNewIntent(Intent)`.

## mvp
Module này nên được xem xét trước khi sử dụng vì nó không hỗ trợ phiên bản mới nhất của dagger và Android hiện tại nên sử dụng ViewModel pattern, điều này được khuyến nghị và maintain bới Google.
* ***Xem thêm**: https://github.com/FrantisekGazo/Blade/wiki/mvp*

## parcel
* **parcel** module cung cấp `@Parcel` và `@ParcelIgnore` annotation.

### @Parcel
* Dùng để tạo ra Parcelable implementation.

Ví dụ:
```
public class MyClass implements Parcelable {

     String text;
     int number;
     boolean flag;
     double[] doubleArray;

     protected MyClass(Parcel in) {
         text = in.readString();
         number = in.readInt();
         flag = in.readByte() != 0;
         doubleArray = in.createDoubleArray();
     }

     public static final Creator<MyClass> CREATOR = new Creator<MyClass>() {
         @Override
         public MyClass createFromParcel(Parcel in) {
             return new MyClass(in);
         }

         @Override
         public MyClass[] newArray(int size) {
             return new MyClass[size];
         }
     };

     @Override
     public int describeContents() {
         return 0;
     }

     @Override
     public void writeToParcel(Parcel dest, int flags) {
         dest.writeString(text);
         dest.writeInt(number);
         dest.writeByte((byte) (flag ? 1 : 0));
         dest.writeDoubleArray(doubleArray);
     }
}
```
Nhưng với thư viện Blade ta chỉ cần: 
```
@blade.Parcel
public class MyClass implements Parcelable {

     String text;
     int number;
     boolean flag;
     double[] doubleArray;

     protected MyClass(Parcel in) {
     }

     @Override
     public int describeContents() {
         return 0;
     }

     @Override
     public void writeToParcel(Parcel dest, int flags) {
     }
}
```
Class được annotate với `@Parcel`:
* Implement Parcelable interface
* Chứa constructor với parameter kiểu Parcel

### @ParcelIgnore
Dùng annotation nếu chúng ta muốn Blade ignore một vài field, khi writing/reading instance cho class to/from parcel.
```
@blade.Parcel
public class MyClass implements Parcelable {

     int number; // this field will be processed
     @blade.ParcelIgnore
     String text; // this field will be ignored

     protected MyClass(Parcel in) {
     }

     @Override
     public int describeContents() {
         return 0;
     }

     @Override
     public void writeToParcel(Parcel dest, int flags) {
     }
```

## state
* **state** module provides `@State` annotation.
* Annotation này giúp đơn giản việc quản lý state của Activity, Fragment hoặc View và các class khác. 

Mỗi class `T` chứa các thuộc tính đã annotate với `@State` sẽ tạo một helper class tên là `T_Helper` với 2 static methods:
* `saveState(Bundle)`
* `restoreState(Bundle)`

Các lớp extend từ `Fragment`, `Activity` hoặc `View` sẽ được quản lý tự động, vì vậy chúng ta sẽ không cần gọi `saveState(Bundle)` hay `restoreState(Bundle)`. Nhưng đối với các classes khác chúng ta phải gọi 2 method này khi cần thiết. 

Nếu không sử dụng thư viện này: 
```
public class MyActivity extends Activity {

    private static final String EXTRA_TEXT = "extra_text";
    private static final String EXTRA_DATA = "arg_data";

    private String mText;
    private MyData mData;

    @Override
    protected void onSaveInstanceState(Bundle outState) {
        super.onSaveInstanceState(outState);
        outState.putParcelable(EXTRA_DATA, mData);
        outState.putString(EXTRA_TEXT, mText);
    }

    @Override
    protected void onRestoreInstanceState(Bundle savedInstanceState) {
        super.onRestoreInstanceState(savedInstanceState);
        mData = savedInstanceState.getParcelable(EXTRA_DATA);
        mText = (MyData) savedInstanceState.getString(EXTRA_TEXT);
    }

}
```
Nhưng với thư viện Blade chúng ta chỉ cần: 
```
public class MyActivity extends Activity {

    @State
    String mText;
    @State
    MyData mData;

}
```
* ***Xem thêm**: Custom serialization (https://github.com/FrantisekGazo/Blade/wiki/state)*

## Tham khảo
1.  https://github.com/FrantisekGazo/Blade