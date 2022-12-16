Google map marker là một thành phần không thể thiếu và rất hữu ích trong Google Maps. Map maker là một địa chỉ gắn lên một địa điểm cụ thể nào đó trên bản đồ , có thể sử dụng hình ảnh , biểu tượng hoặc hình ảnh dạng bitmap làm biểu tượng đánh dấu trên Google Maps . Dựa vào thông số API này ta có thể custom được giao diện của marker .Bạn muốn có một Google Map Marker theo ý muốn hay sở thích của mình thì bài viết này là danh cho bạn.
# Khởi đầu
Hướng dẫn này mình sẽ không hướng dẫn các bạn triển khai Google Maps API vào dự án của bạn nữa , Nếu bạn chưa biết triển khai hãy đọc sơ lược về nó để nắm được cơ bản về Google Map API nhé .<br>
Triển Khai Google Maps API : (https://developers.google.com/maps/documentation/android-sdk/marker)<br>
# Tìm hiểu về đối tượng MarkerOptions
Đối tượng MakerOptions cung cấp cho ta rất nhiều nhưng phương thức hữu ích để tạo ra một marker trong Google Map API .Bạn nên tham khảo các phương thức của MarkerOptions để tạo ra một marker tuyệt vời.
![](https://images.viblo.asia/64c9db5a-e3ca-4c69-9fc7-d863270e7eb1.PNG)
## 1. Tạo ra một điểm marker mặc định trên bản đồ 
Để tạo ra một marker trên Google Map rất dễ dàng . Ta chỉ cần khởi tạo một đối tượng LatLng chứa Tọa độ và MarkerOptions . Sau đó sử dụng phương thức addMarker() để thêm nó vào Google Map.<br>
```
@Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        LatLng sun = new LatLng(16.080439, 108.220402);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sun,13));
        mMap.addMarker(new MarkerOptions()
            .title("Sun*")
            .snippet("Sun* vô đối")
            .position(sun));
    }
```
![](https://images.viblo.asia/04bf3f53-e315-4682-9199-cad79c1aedb9.jpg)
## 2. Tạo ra một điểm marker bằng Biểu tượng trên bản đồ
Với sự trợ giúp của đối tượng MarkerOptions bạn có thể tạo một marker với một hình ảnh .Với lớp **BitmapDescriptorFactory** sẽ cung cấp nhiều phương thức khác nhau có thể giúp bạn thay đổi hình ảnh thành marker lên trên bản đồ Google lấy từ resources, assets, file , v.v.
```
@Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        LatLng sun = new LatLng(16.080439, 108.220402);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sun, 13));
        mMap.addMarker(new MarkerOptions()
                .icon(BitmapDescriptorFactory.fromResource(R.drawable.icoin_xanh_la))
                .title("Sun*")
                .snippet("Sun* vô đối")
                .position(sun));
    }
```
![](https://images.viblo.asia/471a4b35-2dc4-4618-a3e2-28b98c4dba40.jpg)
## 3. Tạo ra một điểm marker bằng Bitmap trên bản đồ
Cũng như mô tả ở trên đôi khi bạn có nhưng hình ảnh ở dạng Bitmap, bạn cũng có thể sử dụng Hình ảnh đó làm một marker trên Google Maps
```
@Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        Drawable myDrawable = ResourcesCompat.getDrawable(getResources(), R.drawable.icoin_xanh_la, null);
        Bitmap markerBitmap = ((BitmapDrawable) myDrawable).getBitmap();

        LatLng sun = new LatLng(16.080439, 108.220402);
        mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(sun, 13));
        mMap.addMarker(new MarkerOptions()
                .icon(BitmapDescriptorFactory.fromBitmap(markerBitmap))
                .title("Sun*")
                .snippet("Sun* vô đối")
                .position(sun));
    }
```
![](https://images.viblo.asia/471a4b35-2dc4-4618-a3e2-28b98c4dba40.jpg)
## 4. Tạo một nhiều điểm marker trên bản đồ
Có rất nhiều lý do tại sao bạn phải tạo nhiều điểm trên bản đồ .Giả sử bạn có một danh sách rất nhiều điểm cần thêm vào bản đồ  và danh sách đó chưa các tọa độ bao gồm kinh độ và vĩ độ.

Dùng LatlngBound để hiển thị các điểm trên cùng màn hình một cách dễ dàng .Nó sẽ lấy điểm A là điểm đầu tiên và điểm B là điểm cuối cùng trong danh sách
```
@Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        //khi mà bản đồ load xong
        mMap.setOnMapLoadedCallback(new GoogleMap.OnMapLoadedCallback() {
            @Override
            public void onMapLoaded() {
                List<LatLng> locations = new ArrayList<>();
                locations.add(new LatLng(16.080288, 108.220364));
                locations.add(new LatLng(16.080492, 108.219768));
                locations.add(new LatLng(16.080660, 108.220782));
                locations.add(new LatLng(16.081082, 108.219275));
                locations.add(new LatLng(16.082464, 108.221303));
                locations.add(new LatLng(16.079227, 108.220037));
                for (LatLng latLng : locations) {
                    mMap.addMarker(new MarkerOptions()
                            .position(latLng)
                            .title("Tiêu đề của điểm"));
                }

                LatLngBounds.Builder builder = new LatLngBounds.Builder();
                builder.include(locations.get(0)); //điểm A
                builder.include(locations.get(locations.size() - 1)); //điểm B
                LatLngBounds bounds = builder.build();
                CameraUpdate cu = CameraUpdateFactory.newLatLngBounds(bounds, 200);
                mMap.moveCamera(cu);
                mMap.animateCamera(CameraUpdateFactory.zoomTo(14), 2000, null);
            }
        });
    }
```
![](https://images.viblo.asia/fd742787-3612-4780-a269-1fb46131382d.jpg)
## 5. Custom một marker tùy ý muốn trên bản đồ
Trong nhiều dự án liên quan đến Google Maps API bạn thường gặp nhưng marker đại diện cho công ty hay ứng dụng của bạn. Vì vậy phần này sẽ hướng đẫn bạn tạo một marker theo ý muốn. Ở phần này chúng ta sẽ tạo cố cục cho marker bằng **XML** sau đó chuyển đổi **XML** thành **Bitmap** .Như phía trên mình đã nói tới tác dụng của **BitmapDescriptorFactory.fromBitmap ()** .
### 5.1 Tạo file XML cho marker
Trước tiên bạn tạo một file tên **custom_marker_layout.xml** ở trong thư mục layout nhé.
Ở đây mình sủ dụng thư viện ``implementation 'de.hdodenhof:circleimageview:2.1.0'`` để tạo một hình ảnh đẹp và nhanh chóng , bạn cũng có thể custom hình ảnh theo ý của mình.
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="52dp"
    android:layout_height="wrap_content"
    android:id="@+id/custom_marker_view"
    xmlns:app="http://schemas.android.com/apk/res-auto">

    <de.hdodenhof.circleimageview.CircleImageView
        android:id="@+id/user_dp"
        android:layout_width="42dp"
        android:layout_height="46dp"
        app:civ_border_color="#fff"
        android:layout_alignParentTop="true"
        android:layout_gravity="center_horizontal"
        android:layout_marginLeft="4dp"
        android:layout_marginTop="3.5dp"
        android:contentDescription="@null"
        android:src="@drawable/saitama" />
    <RelativeLayout
        android:layout_width="50dp"
        android:layout_height="59dp"
        android:backgroundTint="#26c7db"
        >

        <TextView
            android:text="saitama"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:gravity="center"
            android:textSize="7sp"
            android:layout_marginLeft="10dp"
            android:textColor="#000"
            android:alpha="0.8"
            android:background="#fff"
            android:id="@+id/name"
            android:layout_centerVertical="true"
            android:layout_centerHorizontal="true" />


    </RelativeLayout>
    
</RelativeLayout>
```
### 5.2 Viết phương thức createMarker() để tạo một marker dạng Bitmap
Ở đây phương thức createMarker trả về dạng **Bitmap** bởi vì bước sau ta sẽ dùng phương thức ``BitmapDescriptorFactory.fromBitmap () `` để đưa marker đã custom thành điểm đánh dấu trên bản đồ
```
public static Bitmap createMaker(Context context, @DrawableRes int resource, String _name) {

        View marker = ((LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE)).inflate(R.layout.custom_marker_layout, null);

        CircleImageView markerImage = (CircleImageView) marker.findViewById(R.id.user_dp);
        markerImage.setImageResource(resource);
        TextView txt_name = (TextView)marker.findViewById(R.id.name);
        txt_name.setText(_name);

        DisplayMetrics displayMetrics = new DisplayMetrics();
        ((Activity) context).getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        marker.setLayoutParams(new ViewGroup.LayoutParams(52, ViewGroup.LayoutParams.WRAP_CONTENT));
        marker.measure(displayMetrics.widthPixels, displayMetrics.heightPixels);
        marker.layout(0, 0, displayMetrics.widthPixels, displayMetrics.heightPixels);
        marker.buildDrawingCache();
        Bitmap bitmap = Bitmap.createBitmap(marker.getMeasuredWidth(), marker.getMeasuredHeight(), Bitmap.Config.ARGB_8888);
        Canvas canvas = new Canvas(bitmap);
        marker.draw(canvas);

        return bitmap;
    }
```
### 5.3 Đưa marker vào bản đồ
Lúc này ta sử dụng phương thức onMapReady() để thêm marker đã custom lên bản đồ.
```
@Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;

        //khi mà bản đồ load xong
        mMap.setOnMapLoadedCallback(new GoogleMap.OnMapLoadedCallback() {
            @Override
            public void onMapLoaded() {
                LatLng customMarkerLocation = new LatLng(16.080288, 108.220364);

                mMap.addMarker(new MarkerOptions()
                        .position(customMarkerLocation)
                        .icon(BitmapDescriptorFactory.fromBitmap(createMaker(MainActivity.this,R.drawable.saitama,"Saitama"))));
                mMap.moveCamera(CameraUpdateFactory.newLatLngZoom(customMarkerLocation, 13));
            }
        });
    }
```
![](https://images.viblo.asia/65867093-83f5-4176-b1e9-6c70275ce972.jpg)

**Chúc các bạn thành công !**