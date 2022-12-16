Có một tính năng mà có thể ít bạn dev Android trên Android Studio biết đến, đó là *data binding*. Loạt bài viết này của mình sẽ giới thiệu cho các bạn các tính năng rất hữu dụng của nó, và để mở đầu, mình sẽ hướng dẫn các bạn cách sử dụng data binding để nói lời tạm biệt với findViewById.

Các bạn xem thử đoạn code sau:
```
TextView hello = (TextView) findViewById(R.id.hello);
```
Hiện nay có tồn tại một số công cụ với nhiệm vụ chính là để dev được giải phóng khỏi đoạn code này, nhưng với sự ra đời của phiên bản Android Studio 1.5, giờ đây chúng ta đã có một cách chính thức để có thể làm việc này.
Trước tiên, bạn vào build.gradle của app và thêm phần sau vào block android:
```
android {
    …
    dataBinding.enabled = true
}
```
Điều tiếp theo cần làm là vào layout xml, và wrap ViewGroup bằng thẻ <layout>
```
<layout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools">
    <RelativeLayout
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            android:paddingLeft="@dimen/activity_horizontal_margin"
            android:paddingRight="@dimen/activity_horizontal_margin"
            android:paddingTop="@dimen/activity_vertical_margin"
            android:paddingBottom="@dimen/activity_vertical_margin"
            tools:context=".MainActivity">

        <TextView
                android:id="@+id/hello"
                android:layout_width="wrap_content"
                android:layout_height="wrap_content"/>

    </RelativeLayout>
</layout>
```
Bằng việc sử dụng thẻ layout, khi compile, Android Studio sẽ process layout để tìm tất cả các View trong đó và ghi nhớ chúng cho bước tiếp theo. Tất cả các layout không có thẻ layout bên ngoài sẽ không có bước xử lý này, vì vậy các bạn có thể vọoc thử với một số layout mà không cần phải thay đổi cả project :grinning:
Điều tiếp theo các bạn phải làm là thay đổi cách app load file layout đó tại runtime. Vì cái này được hỗ trợ từ bản Eclaire, nên các bạn sẽ không bị phụ thuộc vào các thay đổi framework mới để load các file layout được preprocess. Do đó, các bạn sẽ phải thay đổi chút xíu cho quy trình load của mình.
Trong Activity, thay vì viết thế này:
```
setContentView(R.layout.hello_world);
TextView hello = (TextView) findViewById(R.id.hello);
hello.setText("Hello World"); // for example, but you'd use
                              // resources, right?
```
Thì các bạn viết thế này
```
HelloWorldBinding binding = 
    DataBindingUtil.setContentView(this, R.layout.hello_world);
binding.hello.setText("Hello World"); // you should use resources!
```
Tại đây, bạn có thể thấy rằng một lớp là **HelloWorldBinding** đã được tạo cho file layout **hello_world.xml** và cái View với id là “@+id/hello” được gán vào một trường final tên là **hello**. Không cần phải cast hay findViewById gì cả.
Và một điều rất bất ngờ thú vị là cơ chế truy cập View này không chỉ dễ dàng hơn nhiều so với findViewById, mà còn nhanh hơn! Quá trình binding sẽ chạy một lượt qua tất cả các View trong layout để gán vào các trường. Còn khi bạn dùng findViewById, thì mỗi lần gọi findViewById thì lại phải scan view hierarchy một lần.
Bạn nào tinh mắt thì có thể thấy nữa là tên biến sẽ được viết theo kiểu camel case (ví dụ như hello_world.xml trở thành lớp HelloWorldBinding), vì vậy nếu các bạn đã đặt một view là “@+id/hello_text”, thì tên trường sẽ là helloText.
Khi bạn inflate layout cho RecyclerView, ViewPager hoặc những thứ khác không set nội dung Activity, bạn sẽ phải sử dụng các generated type-safe method trên generated class. Có một số cách phù hợp với LayoutInflater, vì vậy bạn có thể chọn 1 cách phù hợp nhất với trường hợp bạn muốn dùng.
    
```
HelloWorldBinding binding = HelloWorldBinding.inflate(
    getLayoutInflater(), container, attachToContainer);
```
    
Nếu bạn không attach View được inflate vào Viewgroup chứa nó, bạn sẽ phải lấy quyền access vào View hierarchy được inflate. Các bạn có thể làm điều này bằng phương thức getRoot() của binding.
    
```
linearLayout.addView(binding.getRoot());
```

Các bạn có thể đang tự hỏi "nếu mình có layout với các configuration khác nhau với một số View khác nhau thì sao?" Xin trả lời là các giai đoạn tiền xử lý layout và runtime inflation sẽ giải quyết vấn đề này cho bạn bằng cách thêm tất cả View ID vào lớp được tạo và set chúng thành null nếu chúng không ở trong layout được inflate.

Khá kỳ diệu ha? Lợi ích to lớn nhất của cách làm này là các bạn sẽ không phải dùng reflection hay high-cost technique nào cả. Nhìn chung, bạn có thể rất dễ dàng đưa data binding vào trong các app hiện tại của bạn để làm cho "đời bớt khổ" và layout của bạn có thể load nhanh hơn một chút :D
    
Nguồn: https://medium.com/androiddevelopers/no-more-findviewbyid-457457644885