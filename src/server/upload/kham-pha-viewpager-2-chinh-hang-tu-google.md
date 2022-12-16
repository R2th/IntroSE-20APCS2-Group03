Nếu bạn là một nhà phát triển Android thì chắc hẳn bạn đã không còn lạ lẫm gì với ViewPager. ViewPager dùng cho việc hiển thị 1 tập hợp các đoạn nội dung theo dạng vuốt mà nội dung cần nhiều diện tích hiển thị, như ảnh chẳng hạn. ViewPager trước nằm ở gói thư viện support v4 nhưng sau đó được Google ưu ái cho vào cả thư viện androidx, nhưng bây giờ ta có một phiên bản mới hơn, xịn xò hơn với những ưu điểm so với ViewPager cũ, nó đặt đặt tên là ViewPager2. Vậy ViewPager 2 có gì hay và chúng ta có cần thiết phải dùng nó không thì hãy cũng tôi phân tích ở bài viết này.
## Hỗ trợ RecyclerView, DiffUtil
Trong một số trường hợp đối với người dùng việc mỗi thành phần view pager hiển thị thì họ đều xem là như nhau. Một view được hiển thị và một view khác được vuốt qua thay thế cho view cũ, nhưng trong trường hợp chúng ta muốn hiển thị nhiều kiểu xem của cùng một chế độ thì lúc đó ra sẽ gặp một chút vấn đề, nhưng đối với RecyclerView thì lại giải quyết khá dễ dàng. ViewPager 2 sẽ giúp bạn giải quyết bài toán này. Sự khác biệt ở đây là việc sử dụng RecyclerView , [ViewPager 2](https://developer.android.com/jetpack/androidx/releases/viewpager2#1.0.0-alpha01) có mà ViewPager không có. Điều đó có nghĩa là nó giống như việc cách mà ta đã dùng RecyclerView để hiển thị dữ liệu mà ta mong muốn. Việc này sẽ giúp ứng dụng mượt hơn và trải nghiệm người dùng tốt hơn mà cũng đơn giản hơn cho nhà phát triển vì RecyclerView là thứ mà bắt buộc các developer phải làm việc hàng ngày rồi.
Các tính năng của RecyclerView đều được áp dụng hết khi làm việc với ViewPager2, nếu bạn đã làm việc với DiffUtil thì bạn biết nó hữu tích thế nào rồi phải không? Và thật tuyệt vời vì bạn cũng có thể dùng DiffUtil cho view pager để thay đổi và cập nhật dữ liệu sẽ rất tiện lợi cho những dữ liệu kiểu động và hay có sự thay đổi, hệ thống cũng phải yêu cầu luôn cập nhật dữ liệu mới liên tục.
## Hỗ trợ RTL (Right to left layout) và Vertical Orientation (Hỗ trợ vuốt layout kiểu dọc)
Các tính năng khác mà tôi muốn nói đến ở đây là tính năng hỗ trợ RTL và hỗ trợ vuốt dọc, điều này sẽ giúp cho chúng ta tạo ra những ứng dụng có trải nghiệm tốt hơn, tuy rằng trước đây khi chưa có ViewPager2 chúng ta vẫn có thể khiến nó vuốt dọc được bằng cách custom code transform của nó, nhưng nó khá mất thời gian và khó làm. Vậy còn gì hơn khi mà nó đã được hỗ trợ sẵn rồi chỉ 1 2 dòng code là đã có thể bật tính năng đó lên rồi.
Ở phiên bản Viewpager2 này ta có thể sử dụng RecyclerView.Adapter thay thế cho PagerAdapter, nhưng đừng lo lắng nếu bạn làm việc với Fragment vẫn còn FragmentStateAdapter để làm việc với fragment nhé. FragmentStateAdapter sẽ thay thế cho FragmentStatePagerAdapter. Nghĩa là ở ViewPager2 sẽ không có FragmentStateAdapter. Việc định nghĩa và thay thế lại thế này tôi thực sự thích nó, vì rất clear, muốn làm view thì dùng ReyclerView.Adapter muốn làm với Fragment thì dùng FragmentStateAdapter.
Bên cạnh đó việc clear này sẽ giúp cho bạn dễ maintain hơn. Hiện nay RecyclerView không chỉ phổ biến vì tính tái sử dụng view của nó và view pager mới này cũng giảm từ 3169 dòng code xuống còn 538 dòng code. Nếu bạn đã từng ngụp lặn trong đống code này rồi hẳn sẽ thấy là nó vô cùng phức tạp, rất nhiều tính toán, tùy chỉnh cho gesture, state, drawing. 
## Hiểu sâu hơn về ViewPager2
Khi chúng ta làm việc với ViewPager2 ta nên hiểu sâu về nó một chút, sâu xa của nó là gì để khi gặp vấn đề bạn sẽ có kiến thức tốt để giải quyết nó nhanh nhất. ViewPager2 cũng giống như ViewPager nó được extend từ ViewGroup class. Dưới đây là sơ đồ cấu tạo của nó
![](https://images.viblo.asia/b44af176-87de-47af-a112-b8c80ae48fcc.png)
### Recycler View
ViewPager2 sử dụng RecyclerView để handle việc hiển thị nội dùng mà bạn giao cho chúng. Như tôi đã nói từ trước ta có thể dùng hầu hết cách tính năng mà RecyclerView mang lại.
### Layout manager
Vâng chính xác là Layout manager mà bạn đã dùng nó trong RecyclerView đó ạ. Nhờ Layout manager mà ta có thể set được chiều và hướng của layout mà ta muốn hiển thị. Bạn có thể dùng hàm setOrientation() để điều chỉnh hướng của layout , trước ViewPager chỉ hỗ trợ ngang nhưng từ giờ bạn đã có thêm tùy chọn rồi nhé.
### Page Change Callback
Bạn có thể lắng nghe sự hiện page change ở class OnPageChangeCallback class cụ thể với các event
* onPageScrolled() — Gọi khi sự kiến scroll khi bắt đầu diễn ra và dính tới page đó
* onPageSelected() — Được gọi khi một page đã được selected
* onPageScrollStateChanged() — Được gọi khi trang thái scol thay đổi
### Adapter
Bạn có thể dùng chung RecyclerView.Adapter với các RecyclerView khác, vì bản chất nó là một mà. Nên h có thế thấy ViewPager như một extend ở RecyclerView
### Pager Snap Helper
Đây không phải là một thứ mà chúng ta có thể configure nhưng tôi muốn chỉ ra cách sử dụng nó khác thế nào so với ViewPager cũ. Ở đây PagerSnapHelper class được sử dụng cho ViewPager2 để mô phỏng snapping đến các item được selected khi có yêu cầu về vị trí của item khi cuộn. Có thể bạn đã sử dụng nó ở RecyclerView rồi nhưng điều này cho thấy việc tái sử dụng các thành phần trong framwork đang được Google làm tốt dần lên.
![](https://images.viblo.asia/72409c03-6c91-479c-99b3-6a36ff13a7da.gif)
Một số hàm ở ViewPager cũ vẫn được sử dụng trong ViewPager2 có thể kể đến như:
* setCurrentItem() — Set item hiện tại để hiển thị lên
* getCurrentItem() —get index của Item khi đang hiển thị.
* setPageTransformer() -Set  transformer vaf apply custom transformations khi page thay đổi.
### Implementing the View Pager
Để add ViewPager2 bạn chỉ cần thêm dependency vào file build.gradle:
```
implementation 'androidx.viewpager2:viewpager2:1.0.0-alpha01'
```
Và khi định nghĩa là layout sẽ như sau:
```
<androidx.viewpager2.widget.ViewPager2
        android:id="@+id/view_pager"
        android:layout_width="match_parent"
        android:layout_height="match_parent"/>
```
Giờ thì ta đã  có layout được định nghĩa rồi, ta cần assign cho nó chút data bằng việc tạo một Adapter được kết thừa từ RecyclerView.Adaper, sau đó ta sẽ set adaper cho view pager. Về mặc định orientation của ViewPager2 là chiều ngang:
```
androidx.viewpager2.widget.ViewPager2.ORIENTATION_HORIZONTAL
```

![](https://images.viblo.asia/ee5ed71d-8d4c-4abf-8bda-6053cad6e4e3.gif)

Nếu bạn không thích hướng ngang thì đổi thành hướng dọc
```
view_pager.orientation = ORIENTATION_VERTICAL
```

![](https://images.viblo.asia/1a95955c-b81d-4b49-a4cf-2b154d7fc0ea.gif)

Ngoài ra trong nếu có sự thay đổi về mặt dữ liệu bạn có thể thông quà DiffUtil để xử lí việc reload dữ liệu trong viewpager.

Tôi mong những gì vừa chia sẻ sẽ có ích cho các bạn và có thể áp dụng nó vào dự án mình đang thực hiện. Chúc các bạn may mắn.
Tham khảo:

- [Exploring the View Pager 2](https://medium.com/google-developer-experts/exploring-the-view-pager-2-86dbce06ff71)
- [ViewPager2](https://developer.android.com/jetpack/androidx/releases/viewpager2#1.0.0-alpha01)