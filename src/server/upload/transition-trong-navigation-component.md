Navigation Component giúp bạn triển khai các yêu cầu điều hướng phổ biến nhưng phức tạp trong ứng dụng của mình, cho phép bạn dễ dàng cung cấp các trải nghiệm nhất quán và có thể được dự đoán dễ dàng hơn cho người dùng ứng dụng của mình.

Component này cũng cung cấp hỗ trợ để hiển thị các hiệu ứng chuyển tiếp và chia sẻ các phần tử trong việc transition giữa các fragment khác nhau.

![](https://images.viblo.asia/753f4cdc-4e97-458c-b9a9-73205d69c929.png)

Các transition xảy ra khi người dùng di chuyển giữa các fragment, chẳng hạn như từ màn hình list sang màn hình chi tiết. Việc sử dụng các motion là một lựa chọn tốt để giúp người dùng hình dung được sự thay đổi/di chuyển giữa hai màn hình với nhau. Chúng giúp người dùng tự định hướng hệ thống phân cấp ứng dụng của bạn, sử dụng chuyển động để cho biết các yếu tố có liên quan với nhau như thế nào.

Ví dụ: khi một phần tử mở rộng để lấp đầy toàn bộ màn hình, phần mở rộng biểu thị rằng cửa sổ mới là phần tử con hoặc chi tiết. Màn hình mà từ nó đi ra phần mở rộng đó là thành phần cha của nó.

![](https://images.viblo.asia/b2740d5e-aed8-4ee7-adbb-76dfa01c6780.gif)

Navigation Component cho phép người dùng thực hiện chuyển tiếp giữa các fragment và hỗ trợ thêm việc chuyển tiếp phần tử được chia sẻ giữa các điểm đến.
Các chuyển đổi phần tử được chia sẻ được xử lý tự động trong code của bạn thay vì thông qua file navigation XML, vì chúng yêu cầu tham chiếu các view mà bạn muốn đưa vào trong quá trình chuyển đổi phần tử được chia sẻ.

### Implementation

Trong ví dụ này, tôi đã implement một quá trình chuyển đổi đơn giản giữa một fragment có chứa một phần tử và fragment chi tiết cho phần tử này.
Đầu tiên cần include các dependency:

```
implementation 'androidx.navigation:navigation-fragment-ktx:2.1.0-alpha05'
```

Sau đó là tạo các fragment và xác định mối quan hệ giữa chúng. Tôi đã tạo ra hai fragment: **ParentFragment** và **DetailFragment**. Hai fragment được liên kết và biểu đồ điều hướng như bên dưới:

![](https://images.viblo.asia/5d27771d-b0f5-4c4c-a63e-39711638b8d9.png)

Fragment đầu tiên có MaterialCard với image sẽ được chuyển sang fragment tiếp theo.Thành phần ImageView có một thuộc tính được gọi là **transitionName**, phải giống nhau trong hai layout.

```
//fragment_parent.xml
<com.google.android.material.card.MaterialCardView
            android:id="@+id/cardView"
            android:clickable="true"
            android:focusable="true"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            ...>

        <androidx.appcompat.widget.LinearLayoutCompat
                android:orientation="vertical"
                android:layout_width="match_parent"
                android:layout_height="match_parent">

            <ImageView
                    android:id="@+id/imageView"
                    android:transitionName="imageView"
                    android:src="@color/blueGray300"
                    android:layout_width="200dp"
                    android:layout_height="200dp"/>
          ...
```

```
//fragment_detail.xml
  ...
            <ImageView
                    android:transitionName="imageView"
                    app:layout_collapseMode="parallax"
                    android:src="@color/blueGray300"
                    android:layout_width="match_parent"
                    android:layout_height="200dp"/>
            ...
```

Bây giờ, chúng ta sẽ implement hành động điều hướng. Các phần mở rộng biến chứa tham số **Extras** của câu lệnh **navigate()**. Tôi có thể thêm hình ảnh được chia sẻ bổ sung, có **transitionName** là "**imageView**". Sau đó, tôi gọi chức năng điều hướng.

```
//ParentFragment.kt
cardView.setOnClickListener{
  val extras = FragmentNavigatorExtras(
    imageView to "imageView"
  )
  findNavController().navigate(R.id.detailAction, null, null, extras)
}
```

Sau đó, override hàm **onCreate** trên class **DetailFragment** để hiển thị hình động.

```
//DetailFragment.kt
override fun onCreate(savedInstanceState: Bundle?) {
  super.onCreate(savedInstanceState)
  sharedElementEnterTransition = TransitionInflater.from(context).inflateTransition(android.R.transition.move)
}
```

![](https://images.viblo.asia/9b3ffdcd-36d0-4f15-9db9-479855bde893.gif)

Chúng ta có thể sử dụng thư viện Glide để tải hình ảnh từ một URL. Điều duy nhất mà chúng ta phải làm là tải hình ảnh trong hai fragment từ cùng một URL.
```
Glide.with(context!!).load(IMAGE_URI).centerCrop().into(imageView)
```

URL có thể được chuyển giữa các fragment bằng cách sử dụng **Bundle** và chuyển nó trong lệnh gọi điều hướng hoặc làm đối số đích trongnavigation grap.

Đây là link sample cho ví dụ trên: [link sample](https://github.com/serbelga/android_navigation_shared_elements?source=post_page-----bc5e7922ecdf----------------------)

Bài viết gốc:
https://medium.com/@serbelga/shared-elements-in-android-navigation-architecture-component-bc5e7922ecdf