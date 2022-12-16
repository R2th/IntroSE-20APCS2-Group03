### I) Sơ lược về fragment
Như các bạn đã biết Fragment nó được hiểu như là một sub Activity, nó cũng có vòng đời hoạt độnh riêng nhưng gắn liền với vòng đời của activity, nó sinh ra để giải quyết các vấn đề mà activity không thực hiện được, cụ thể ở đây chính là chức năng đa màn hình, việc nắm rõ được cách thức hoạt động và làm việc với nó đòi hỏi chúng ta phải thực hành nhiều, vì vậy hôm nay mình sẽ làm một ví dụ về việc add và replace fragment với cơ chế backstack để các bạn hiểu rõ hơn một phần cách thức hoạt động của nó.

### II) Add và Replace Fragment
Ở đây mình sẽ tạo ra 2 fragment với vòng đời như sau

```javascript
      public class FragmentA extends Fragment {

        int a = 0;

        @Override
        public void onCreate(@Nullable Bundle savedInstanceState) {
            Log.d("fragmentA", "fragmentA: onCreate");
            super.onCreate(savedInstanceState);
        }

        @Nullable
        @Override
        public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
            Log.d("fragmentA", "fragmentA: onCreateView với biến a = " + a);
            return inflater.inflate(R.layout.layout_fragment_a, container, false);
        }

        @Override
        public void onStart() {
            Log.d("fragmentA", "fragmentA: onStart");
            super.onStart();
        }

        @Override
        public void onResume() {
            Log.d("fragmentA", "fragmentA: onResume");
            super.onResume();
        }

        @Override
        public void onPause() {
            Log.d("fragmentA", "fragmentA: onPause");
            super.onPause();
        }

        @Override
        public void onStop() {
            Log.d("fragmentA", "fragmentA: onStop");
            super.onStop();
        }

        @Override
        public void onDestroyView() {
            Log.d("fragmentA", "fragmentA: onDestroyView");
            super.onDestroyView();
        }

        @Override
        public void onDestroy() {
            Log.d("fragmentA", "fragmentA: onDestroy");
            super.onDestroy();
        }
    }
   ``` 
###
##### layout_fragment_a.xml
```javascript
    <?xml version="1.0" encoding="utf-8"?>
    <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:background="@color/colorPrimaryDark">

        <TextView
            android:id="@+id/txt_title"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Fragment A"
            android:textColor="#fff"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintLeft_toLeftOf="parent"
            app:layout_constraintRight_toRightOf="parent"
            app:layout_constraintTop_toTopOf="parent" />

    </android.support.constraint.ConstraintLayout>
 ```
###

##### Class Fragment B
```javascript
    public class FragmentB extends Fragment {

        @Override
        public void onCreate(@Nullable Bundle savedInstanceState) {
            Log.d("fragmentB", "fragmentB: onCreate");
            super.onCreate(savedInstanceState);
        }

        @Nullable
        @Override
        public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
            Log.d("fragmentB", "fragmentB: onCreateView");
            return inflater.inflate(R.layout.layout_fragment_b, container, false);
        }

        @Override
        public void onStart() {
            Log.d("fragmentB", "fragmentB: onStart");
            super.onStart();
        }

        @Override
        public void onResume() {
            Log.d("fragmentB", "fragmentB: onResume");
            super.onResume();
        }

        @Override
        public void onPause() {
            Log.d("fragmentB", "fragmentB: onPause");
            super.onPause();
        }

        @Override
        public void onStop() {
            Log.d("fragmentB", "fragmentB: onStop");
            super.onStop();
        }


        @Override
        public void onDestroyView() {
            a = 5;
            Log.d("fragmentB", "fragmentB: onDestroyView");
            super.onDestroyView();
        }

        @Override
        public void onDestroy() {
            Log.d("fragmentB", "fragmentB: onDestroy");
            super.onDestroy();
        }
    }
```
###
##### layout_fragment_b.xml
  ```javascript
        <?xml version="1.0" encoding="utf-8"?>
        <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:background="@color/colorAccent">

            <TextView
                android:id="@+id/txt_title"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="FragmentB"
                android:textColor="#fff"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintLeft_toLeftOf="parent"
                app:layout_constraintRight_toRightOf="parent"
                app:layout_constraintTop_toTopOf="parent" />

       </android.support.constraint.ConstraintLayout> 
 ```
       
* Ở đây các bạn để ý kỹ ở **Fragment A** mình có tạo ra 1 biến **a = 0** và in giá trị của nó ra hàm **onCreateView()**, đồng thời thay đổi giá trị của nó **a = 5** ở hàm **onDestroyView()**, mình sẽ giải thích kỹ phần này sau.

Code ở activity mình sẽ triền khai như sau:
####

```javascript

        public class MainActivity extends AppCompatActivity implements View.OnClickListener {
            Button btnAdd, btnReplace;
            FragmentManager fragmentManager;

            @Override
            protected void onCreate(Bundle savedInstanceState) {
                super.onCreate(savedInstanceState);
                setContentView(R.layout.activity_main);
                btnAdd = findViewById(R.id.btn_add);
                btnReplace = findViewById(R.id.btn_replace);
                btnAdd.setOnClickListener(this);
                btnReplace.setOnClickListener(this);
                fragmentManager = getSupportFragmentManager();
                FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                fragmentTransaction.add(R.id.container, new FragmentA(), null);
                //fragmentTransaction.replace(R.id.container, new FragmentA(), null);
                fragmentTransaction.commit();
            }

        @Override
        public void onClick(View v) {
            switch (v.getId()) {
                case R.id.btn_add:
                    FragmentTransaction fragmentTransaction = fragmentManager.beginTransaction();
                    fragmentTransaction.add(R.id.container, new FragmentB());
                    fragmentTransaction.addToBackStack(null);
                    fragmentTransaction.commit();
                    break;
                case R.id.btn_replace:
                    FragmentTransaction fragmentTransaction1 = fragmentManager.beginTransaction();
                    fragmentTransaction1.replace(R.id.container, new FragmentB());
                    fragmentTransaction1.addToBackStack(null);
                    fragmentTransaction1.commit();
                    break;
            }
        }
}
```
- Các bạn chú ý ở đây khi chạy ứng dụng lên, ở hàm **onCreate()** của activity mình sẽ tiến hành add **fragmentA** vào activity, ở đây mình có đóng comment ở hàm replace fragment là bởi vì khi chúng ta thêm fragment đầu tiên vào activity thì add với replace nó đều như nhau. Bên cạnh đó mình có thêm sự kiện click cho 2 button với button A khi click sẽ add fragmentB và button B sẽ replace FragmentB, lưu ý các khi thêm fragment vào activity thì chúng ta phải gọi thêm hàm **addToBackStack()** để thêm thằng FragmentTranSaction này vào trong back stack, nếu không việc add hay replace fragment ở đây sẽ không có ý nghĩa gì cả.
###
##### activity_main.xml
```javascript
        <?xml version="1.0" encoding="utf-8"?>
        <android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:tools="http://schemas.android.com/tools"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            tools:context=".MainActivity">

            <FrameLayout
                android:id="@+id/container"
                android:layout_width="0dp"
                android:layout_height="0dp"
                app:layout_constraintBottom_toTopOf="@+id/btn_add"
                app:layout_constraintLeft_toLeftOf="parent"
                app:layout_constraintRight_toRightOf="parent"
                app:layout_constraintTop_toTopOf="parent" />


            <Button
                android:id="@+id/btn_add"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Add"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintLeft_toLeftOf="parent"
                app:layout_constraintRight_toLeftOf="@id/btn_replace" />

            <Button
                android:id="@+id/btn_replace"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"
                android:text="Replace"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintLeft_toRightOf="@id/btn_add"
                app:layout_constraintRight_toRightOf="parent" />

        </android.support.constraint.ConstraintLayout>
```
* Sau khi chạy ứng dụng thì màn hình hiển thị của ta có dạng như sau:

![](https://images.viblo.asia/6c627fe6-02dd-4e40-972a-752ec473d756.png)

- Lúc này màn log ở fragment A sẽ hiển thị như sau:                                                                        

        fragmentA: onCreate
        fragmentA: onCreateView với biến a = 0
        fragmentA: onStart
        fragmentA: onResume

- Tiếp theo mình sẽ tiến hành click vào button Add để tiến hành add fragment B vào activity và xem kết quả

![](https://images.viblo.asia/18eb1b72-0f1e-45bd-8586-18db3fbb13d7.png)

- Lúc này log ở fragment B sẽ là:

        fragmentB: onCreate
        fragmentB: onCreateView
        fragmentB: onStart
        fragmentB: onResume

- Lúc này Fragment B sẽ chồng lên Fragment A và trạng thái vòng đời Fragment A vẫn như cũ và không thay đổi gì cả, nó vẫn hoạt động bình thường
và sau khi chúng ta bấm nút back để quay lại Fragment A và log ở Fragment B  sẽ hiển thị như sau:

![](https://images.viblo.asia/6c627fe6-02dd-4e40-972a-752ec473d756.png)

        fragmentB: onPause
        fragmentB: onStop
        fragmentB: onDestroyView
        fragmentB: onDestroy
- Có thể thấy lúc này Fragment B đã bị destroy và gỡ bỏ khỏi activity và Fragment A vẫn hoạt động bình thường 

- Tiếp theo chúng ta sẽ tiến hành click vào button Replace để tiến hành replace fragment B:
![](https://images.viblo.asia/18eb1b72-0f1e-45bd-8586-18db3fbb13d7.png)
- Màn hình log hiển thị về vòng đời của fragment B khi add hay replace đều như nhau nên mình sẽ không hiển thị lại, chủ yếu mình sẽ tập trung vào fragment A hơn: 

        fragmentA: onPause
        fragmentA: onStop
        fragmentA: onDestroyView (các bạn chú ý khi hàm onDestroyView() này được gọi thì mình có gán giá trị a = 5)
        
- Kết quả sau khi tiến hành replace fragment B thì thằng fragment B nó sẽ thay thế cho fragment A, lúc này fragment A sẽ tự động gọi các hàm như onPause, onStop, onDestroyView, điều đó cũng cho ta thấy rằng thằng FragmentA nó bị **destroyView** nhưng mà **instance của nó vẫn còn tồn tại**, do đó nó vẫn chưa bị destroy hoàn toàn, cụ thể các bạn sẽ thấy hàm onDestroy() của fragment A vẫn chưa gọi, do đó nó vẫn chưa hoàn toàn bị gỡ khỏi activity
- Và sau khi chúng ta bấm nút back thì kết quả sẽ như sau:

        fragmentA:onCreateView với biến a = 5
        fragmentA: onStart
        fragmentA: onResume
- Có thể thấy rằng lúc này **fragment A sẽ restore lại view** và hàm onCreateView được gọi đầu tiên chứ không phải hàm onCreate(), đồng thời biến a in ra giá trị 5 cũng đủ cho ta thấy được khi chúng ta tiến hành replace Fragment B thì fragment A lúc này nó chỉ đơn giản bị destroy view nhưng instance của nó vẫn còn, do đó các biến global của nó vẫn còn lưu lại giá trị, điều này rất có lợi cho việc cập nhật lại dữ liệu khi fragment nó restore lại view.

### III)Tổng kết
- Mình vừa giới thiệu cho các bạn về cơ chế làm việc của các fragment khi add với replace:
    * add (Fragment B) (back)->  remove (Fragment B)
    * replace (fragment B)  (back)-> restore (fragment A)
    
- Khi hiểu được cơ chế của nó chúng ta sẽ làm việc dễ dàng hơn với fragment.