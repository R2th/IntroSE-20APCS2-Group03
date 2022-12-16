Trong bài viết trước, mình đã giới thiệu cho các bạn về 1 thư viện load ảnh rất mạnh mẽ, đó là Fresco, bạn nào quan tâm có thể xem ở [đây](https://viblo.asia/p/tim-hieu-ve-thu-vien-load-anh-fresco-XL6lAoaRKek) Tuy nhiên, còn 1 thư viện load ảnh khá mới lạ với những bạn lập trình viên mới như mình với nhiều tính năng rất thú vị nữa, đó là Universal Image Loader. Trong bài viết này, mình sẽ giới thiệu qua và làm 1 ví dụ nho nhỏ để xem thư viện này có gì hot và hoạt động như thế nào nhé.

## 1. Giới thiệu
UIL (Universal Image Loader) là 1 thư viện mã nguồn mở, dùng để load ảnh từ URL hay bộ nhớ trong của thiết bị, có hỗ trợ cache ảnh và load ảnh.
Các đặc điểm quan trọng:
*   Khả năng tùy biến cao, mọi thứ đều có thể được cấu hình
*    Hỗ trợ cache ảnh
*    Cung cấp nhiều cách để lấy được 1 bitmap và tải nó lên view
*    Load ảnh đa luồng

## 2. Ví dụ trong Project Android
Trên là khái quát sơ qua về thư viện load ảnh này, mình sẽ làm 1 ví dụ đơn giản sử dụng UIL để load 1 bức ảnh trên mạng có URL sẵn. Màn hình chính cớ 1 Button và 1 ImageView, khi click vào button sẽ thực hiện load ảnh trên mạng về và hiển thị lên ImageView.

#### 2.1 Thực hiện xin quyền và add thêm thư viện vào trong build.gradle
Do là load ảnh trên mạng xuống nên chắc chắn sẽ phải xin quyền INTERNET ở trong AndroidManifest rồi
```
 <uses-permission android:name="android.permission.INTERNET" />
```

Tiếp đến trong build.gradle cấp độ app, các bạn implementation thêm thư viện 
```
implementation 'com.nostra13.universalimageloader:universal-image-loader:1.9.5'
```
để có thể sử dụng được UIL nhé.

#### 2.2 Xây dựng xml và javacode
Trong xml, mình sẽ tạo giao diện đơn giản là 1 button và 1 Imageview, sau đó ánh xạ chúng lên javacode
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <Button
        android:id="@+id/button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="Show image"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.47"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintVertical_bias="0.245" />

    <ImageView
        android:id="@+id/image_loader"
        android:layout_width="200dp"
        android:layout_height="300dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.497"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toBottomOf="@+id/button"
        app:layout_constraintVertical_bias="0.301" />


```

Trong javacode, tạo thêm 1 đối tượng ImageLoader để thực hiện load ảnh tử URL vào trong ImageView

```
 private static final String URL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoun4AJtfk5wAAAacsWpl9vzDX7one70TUoYpnbfjY8mJkazRd";

    private Button buttonShowImage;
    private ImageView imageBackground;
    private ImageLoader imageLoader;

    public static DemoFrescoFragment getInstance() {
        return new DemoFrescoFragment();
    }

    @Nullable
    @Override
    public View onCreateView(@NonNull LayoutInflater inflater, @Nullable ViewGroup container, @Nullable Bundle savedInstanceState) {
        View view = LayoutInflater.from(getActivity()).inflate(R.layout.fragment_demo_fresco, container, false);
        return view;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);

        imageBackground = getActivity().findViewById(R.id.image_loader);
        buttonShowImage = getActivity().findViewById(R.id.button);
        buttonShowImage.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                showImage();
            }
        });
    }

    private void showImage() {
        imageLoader = ImageLoader.getInstance();
        if (getActivity() != null) {
            imageLoader.init(ImageLoaderConfiguration.createDefault(getActivity()));
        }
        imageLoader.displayImage(URL, imageBackground);
    }
```

Để hiển thị ảnh, sử dụng method displayImage của imageLoader, ở đây các bạn có thể truyền vào rất nhiều tham số khác ngoài URL của ảnh và imageView để hiển thị ảnh, các bạn có thể tự tìm hiểu thêm. Sử dụng UIL khá đơn giản phải không nào.
Source code các bạn có thể tham khảo tại [đây](https://github.com/hungth-1726/DemoUIL)

## 3. Tổng kết
Mình đã giới thiệu sơ lược về thư viện load ảnh Universal Image Loader và làm 1 ví dụ demo về cách sử dụng. Bạn đọc nào có thắc mắc hay câu hỏi gì thì hãy comment bên dưới để chúng ta cùng bàn luận thêm nhé. Hi vọng các kiến thức trong bài viết này sẽ hữu ích cho  bạn đọc.