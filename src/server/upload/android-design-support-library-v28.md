**I.Giới thiệu**
   - Việc thiết kế giao diện của Android ngày các phát triển theo cách hiện đại hoá hơn
   - Google mong muốn các nhà phát triển app, thiết kế app của mình theo phong cách đó để tạo bản sắc cho app Android, mà nó hoàn toàn khác so với IOS
   - Vì thế Android design support library được tạo ra mục đính giúp developer thiết kế giao diện app một cách thống nhất hơn, màng đúng phong cách đơn giản hoá của Android.
   - Mới đây thôi Google đã nâng cấp design support library version V28 để bổ xung một số tính nằng rất hưu ích mà mình muốn giới thiệu cho các bạn ngay sau đây.

**II.Giới thiệu các tính năng mới của design support library**
1. Material Button
    - Nó có chức năng như một button bình thường được extends từ AppCompatButton 
    - Được thiết kế lại giao diện để trở nên sinh động hơn
    - Có thể setting nhiều thuộc tính hơn
    - code:
        ```
            <android.support.design.button.MaterialButton
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="MATERIAL BUTTON"
            android:textSize="10sp"
            app:icon="@drawable/icon_test" />
        ```
        
     - image:
         -  ![](https://images.viblo.asia/48320e07-d1a4-4b12-95a6-37ead1da6a65.png)   
         -  ![](https://images.viblo.asia/3f0eab9e-c03b-4ef8-b34b-03bcd08ba90c.png)
            ![](https://images.viblo.asia/249ce143-1426-448d-b498-7349b531fa19.png)
     -  Các thuộc tính có thể thay đổi điều khiển
         -  `app: iconTint` -> Được sử dùng để tô màu biểu tượng icon đang được sử dụng
         -  `app: iconTintMode` -> Xác định chế độ được sử dụng cho màu biểu tượng
         -  `app: iconPadding ` -> Áp dụng padding cho biểu tượng icon
         -  `app: additionalPaddingLeftForIcon` -> thêm khoản cách bên trái cho icon
         -  `app: additionalPaddingRightForIcon` -> thêm khoản cách bên phải cho icon
         -  `app: rippleColor ` -> Màu hiệu ứng tương tác
         -  `app: backgroundTint` -> Nếu bạn muốn thay đổi màu nền của nút hãy sử dụng thuộc tính này
         - `app: backgroundTintMode` -> Xác định chế độ dụng cho màu nền
         - `app: strokeColor` -> Màu sắc nut khi button stroke
         - `app: strokeWidth` -> Chiều rộng khi button stroke
         - `app: angleRadius` -> Được sử dụng để xác định bán kính bo tròn button

2. Chip
    - Chức năng như một textview thông thường 
    - Nó được custom lại để hiển thị icon, text và được bo tròn bởi 1 background và có 2 trạng thái đã chọn hoặc chưa chọn
    - code
        ```
            <android.support.design.chip.Chip
            android:id="@+id/id_chip"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:chipText="This is a chip" />
        ```
     - image:
         - ![](https://images.viblo.asia/505fce01-5574-423a-8b55-831cd4be0a38.png)
         - ![](https://images.viblo.asia/cbe38546-bbfa-465e-ac3f-21bfd2c9ede6.png)
     - Các thuộc tính có thể thay đổi điều khiển
         - `app:chipText` -> Hiển thị text
         - `app:checkable` -> Được sử dụng để khai báo xem con chip có thể được chuyển đổi thành đã chọn / không được chọn. 
         - `app: chipIcon` -> Được sử dụng để hiển thị biểu tượng bên trong chip
         - `app: closeIcon` - Được sử dụng để hiển thị biểu tượng đóng trong chip   

     - Các sự kiện
         - Dùng `id_chip.setOnCheckedChangeListener { button, checked ->  }` Xác nhận sự thay đổi giữa 2 trạng thái chọn và chưa chọn
         - Dùng `id_chip.setOnCloseIconClickListener {  }` > sự kiện click vào Chip
 
 3. Material Card View
    -  Chức năng như một Card View thông thường
    -  Được custom lại để dùng Card View như một khối hộp
    -  code
        ```
        <android.support.design.card.MaterialCardView
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_margin="16dp">
            ... child views ...
            </android.support.design.card.MaterialCardView>
        ```
    - image:
        - ![](https://images.viblo.asia/5b26d117-ff17-44d7-bce7-5ebb22c4f854.png)
    - Các thuộc tính có thể thay đổi điều khiển
        - `app: strokeColor` - Màu được sử dụng cho stroke nhất định
        - `app: strokeWidth` - Chiều rộng được áp dụng cho stroke của chế độ xem

4. Bottom App Bar
    -  Chức năng hoàn toàn mới nó là một thanh công cụ bên dưới, như một loại menu mới của app
    -  code
         ```
        <android.support.design.bottomappbar.BottomAppBar
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:layout_gravity="bottom"
            app:backgroundTint="@color/colorPrimary"
            app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
            app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">
        ```
    -  image: 
        -  ![](https://images.viblo.asia/a833755e-3324-49a7-bc1d-be0681835c8f.png)
     - Các thuộc tính có thể thay đổi điều khiển
         -   `app: fabAttached` -> xác định việc gắn nút bên dưới (FAB)
         -   `app: layout_anchor` -> trên thành phần FAB mà bạn muốn đính kèm, sử dụng ID của thanh ứng dụng phía dưới. Nếu một FAB được đính kèm, nó sẽ được chèn vào thanh ứng dụng phía dưới
         -   `app: fabAlignmentMode` - > Khai báo vị trí của button (FAB) đã được gắn vào thanh ứng dụng phía dưới, xác nhận với 2 giá trị (end/center)

**IV.Kết Thúc**
- Kết quả sử dụng
    - Công việc thiết kế giao diện trở nên đơn giản hơn
    - Tốn ít thời gian thiết kế hơn, giao diện lại đẹp hơn
    - Công việc custom lại giao diện đơn giản hơn