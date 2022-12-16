Trong phiên bản 28 của thư viện hỗ trợ Android có một số thành phần thú vị mà bạn có thể chưa biết . Chúng ta hãy cúng tìm hiểu nào.

[Cách sử dụng](https://material.io/develop/android/docs/getting-started/): Thêm dependencies 
```
implementation 'com.android.support:design:28.0.0'
```
# Material Button
Material Button là một widget có thể được sử dụng để hiển thị một button với material style trong giao diện app của bạn. Lớp này extends từ lớp AppCompatButton mà bạn có thể đã sử dụng trong các dự án của mình, nhưng điều gì làm cho điều này khác đi? Đơn giản là button này đi theo phong cách thiết kế "Material Design" của google thôi :v. Giúp chúng ta "look-and-feel" như nó như một "material nature".
![](https://images.viblo.asia/16dc391d-cde8-48e6-959c-6a5142e96333.png)
Chúng ta thêm Material Button vào file layout giống như các thành phần khác thôi.

```xml
<android.support.design.button.MaterialButton
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="MATERIAL BUTTON"
    android:textSize="18sp"
    app:icon="@drawable/ic_android_white_24dp" />
```

Theo mặc định, lớp này sẽ sử dụng accent color của chủ đề của bạn cho màu nền cùng với màu trắng cho text.
Một số attributes của Material Button:

**app:icon** : Được sử dụng để xác định một drawable sẽ được hiển thị ở đầu nút
![](https://images.viblo.asia/bdcd927c-abac-4a0d-97e1-bfc42e3564d3.png)

**app:iconTint**: Được sử dụng để tô màu cho biểu tượng được sử dụng từ thuộc tính app: icon

**app:iconTintMode**: Xác định chế độ được sử dụng cho biểu tượng màu
![](https://images.viblo.asia/cfdb213f-69ac-4977-ac47-f12b6ca7e99d.png)

**app:iconPadding**: Padding được áp dụng cho biểu tượng được sử dụng từ thuộc tính app: icon
![](https://images.viblo.asia/04bc7e66-e74a-41dd-b9bd-7e965355919c.png)
**app:additionalPaddingLeftForIcon** : Xác định phần padding được áp dụng ở bên trái của biểu tượng được sử dụng từ thuộc tính app: icon
![](https://images.viblo.asia/34227d22-5893-4bd5-8dec-b5759d6173c4.png)
**app:additionalPaddingRightForIcon**: Xác định phần padding được áp dụng ở bên phải biểu tượng được sử dụng từ thuộc tính app: icon
![](https://images.viblo.asia/6e1b34f4-4c49-437d-abfa-d5c795da060d.png)
**app:rippleColor** : Màu được sử dụng cho hiệu ứng gợn - ripple effect.

**app:backgroundTint**: Được sử dụng để áp dụng một tông màu cho nền của nút. Nếu bạn muốn thay đổi màu nền của nút, hãy sử dụng thuộc tính này thay vì background để tránh phá vỡ button style.

**app:backgroundTintMode**: Được sử dụng để xác định chế độ được sử dụng cho tông màu nền
![](https://images.viblo.asia/8f29d8ea-8768-47bb-bf45-82666aedbdb7.png)
**app:strokeColor** : Màu được sử dụng cho viền

**app:strokeWidth**  : Chiều rộng của viền
![](https://images.viblo.asia/7ea8fb03-f363-4699-93b2-70030a00ab27.png)

**app:cornerRadius** : Bán kính để bo tròn button
![](https://images.viblo.asia/416d6752-53cf-45c3-82b0-f3aa4dfbc2d9.png)
# Chip
Chip cho phép chúng ta hiển thị 1 chip view bên trong 1 layout. Về bản chất, đây là 1 view hiển thị text bên trong 1 background tròn, mục đích giúp hiển thị tập hợp các textual được lựa chọn. Mình đang hiểu view này sẽ giúp ta hiển thị danh sách kiểu như các tag hay hashtag hay danh sách các đề suất cho ứng dụng (kiểu như catelogy) được chọn -> Cái này trên github khá nhiều library và mình cũng đã phải sử dụng cho dự án các lib này phục vụ cho việc hiển thị list tag, tuy nhiên việc custom hay tuỳ biến lại khá mệt …. nên nếu có CHIP view thì có thể sẽ giảm thời gian code hơn
![](https://images.viblo.asia/57e499f0-d7b3-4973-b788-91c23f6b3ce4.png)
![](https://images.viblo.asia/2740b403-af94-4bbb-b7de-d007b277430b.png)
Chúng ta có thể thêm Chip vào layout như sau, sử dụng thuộc tính app: chipText để đặt văn bản được hiển thị trên chip:
```xml
<android.support.design.chip.Chip
    android:id="@+id/some_chip"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    app:chipText="This is a chip" />
```
Ngoài ra còn có một tập hợp các thuộc tính khác có thể được sử dụng để tạo kiểu cho chip:

**app:checkable**  : Được sử dụng để khai báo check được selected / not selected ? Nếu bị tắt, kiểm tra sẽ hoạt động giống như một nút

**app:chipIcon**  : Được dùng để hiển thị icon trong chip
![](https://images.viblo.asia/9384e809-0692-4bff-8c4d-5e4801b4488a.png)
**app:closeIcon**  : Được dùng để hiển thị close icon trong chip
![](https://images.viblo.asia/e996740f-9a39-462c-86f5-2eae95fa68bb.png)
Ngoài ra, chip còn support 2 listerner là :

**setOnCheckedChangeListener** : Nếu chip là checkable, có khả năng chúng ta sẽ muốn lắng nghe khi trạng thái kiểm tra này đã được thay đổi:
```kotlin
some_chip.setOnCheckedChangeListener { button, checked ->  }
```
 **setOnCloseIconClickListener** : Điều tương tự cũng áp dụng khi chúng ta muốn lắng nghe sự tương tác với biểu tượng đóng khi nó được sử dụng.
```kotlin
some_chip.setOnCloseIconClickListener {  }
```
# Chip group
Đây là 1 view tập hợp các Chip. Các bạn có thể tưởng tượng nó giống như quan hệ RadioButton  và RadioGroup. Nó đảm bảo rằng chip được nhóm chính xác với nhau. Ví dụ :
![](https://images.viblo.asia/86f7bd7d-70cd-42aa-8c88-d08e101cd77a.png)
Code: 
```xml
<android.support.design.chip.ChipGroup
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <android.support.design.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:chipText="This" />

    <android.support.design.chip.Chip
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:chipText="is" />

    // more chips...

</android.support.design.chip.ChipGroup>
```
Mặc định, các chip sẽ được xuất hiện có thể khá chật chội trong ChipGroup. Để khắc phục việc đó, bạn có thể tạo spacing giữa các chip view:

**app:chipSpacing** :  Thêm spacing giữa các chip cả trên trục dọc và trục ngang.
**app:chipSpacingHorizontal**  : Thêm spacing giữa các chip trên trục ngang.
**app:chipSpacingVertical**  : Thêm spacing giữa các chip trên trục dọc.
![](https://images.viblo.asia/8766e124-5243-4c00-a76f-ae483e7248ae.png)
**app:singleLine** : Cho phép hiển thị GroupChip trên 1 row.
![](https://images.viblo.asia/9f28a074-23e1-4bab-88b1-9f7265939ecd.png)
Khi sử dụng attribute này, vì chỉ hiển thị trên 1 row nên chúng ta cần cho chúng có thể scroll được để có thể xem được tất cả các chip:
```xml
<HorizontalScrollView
    android:layout_width="wrap_content"
    android:layout_height="wrap_content">

    <android.support.design.chip.ChipGroup
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        app:singleLine="true">

        <android.support.design.chip.Chip
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            app:chipText="Some chip" />

        // more chips...
    </android.support.design.chip.ChipGroup>

</HorizontalScrollView>
```
# Material Card View
Đây là class được thừa hưởng nhiều điểm giống với CardView và được cung cấp material style.
![](https://images.viblo.asia/4d4912d7-4007-4f9c-b03b-2f231036a3b9.png)
Được thêm vào layout như sau : 
```xml
<android.support.design.card.MaterialCardView
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_margin="16dp">
    ... child views ...
</android.support.design.card.MaterialCardView>
```
Bạn có thể định kiểu thêm cho cardview bằng cách sử dụng hai trong số các thuộc tính đi kèm với nó:

**app:strokeColor** :  Màu viền cho CardView

**app:strokeWidth** : Độ rộng của viền cho CardView

Cũng như hai thuộc tính này, bạn vẫn có thể tạo kiểu cho cardview bằng cách sử dụng các thuộc tính có sẵn ban đầu như ứng dụng: cardBackgroundColor.
# Bottom App Bar
Đây là một widget mới, có thể mở ra một style design mới cho màn hình, rất có ích cho những màn hình đòi hỏi nhiều property hay nhiều setting …

Bottom App Bar là một component hoàn toàn mới cho phép chúng ta hiển thị toolbar ở phía dưới đáy của màn hình – cũng tương tự như thanh công cụ toolbar mà ta thường sử dụng (nhưng ở phía trên cùng của màn hình).
![](https://images.viblo.asia/dcb1d373-5684-47bd-978b-fffe690ecc7e.png)
```xml
<android.support.design.bottomappbar.BottomAppBar
    android:layout_width="match_parent"
    android:layout_height="wrap_content"
    android:layout_gravity="bottom"
    app:backgroundTint="@color/colorPrimary"
    app:popupTheme="@style/ThemeOverlay.AppCompat.Light"
    app:theme="@style/ThemeOverlay.AppCompat.Dark.ActionBar">
```
Nó cũng được gán một thanh menu như toolbar bằng cách:

```kotlin
bottom_app_bar.replaceMenu(R.menu.main)
```
Khi nói đến một số kiểu thiết kế cho Bottom App Bar, một số thuộc tính bạn có thể dùng như:

**app:fabAttached** : Trạng thái cho phép có hay không việc đính kèm thêm FAB (Floating action button) và trong bottom app bar. Bạn có thể đính kèm fab bằng cách sử dụng app: layout_anchor. Nếu FAB được đính kèm, nó sẽ được chèn vào  bottom app bar
![](https://images.viblo.asia/97a11c07-2ba6-4b14-94c9-d3f21bd1c657.png)
**app:fabAlignmentMode**  :  Khai báo vị trí của FAB được gắn vào. Nó có thể là end:
![](https://images.viblo.asia/3c52c053-1d5e-4c7b-ab55-f9cb47dc5b33.png)
Hoặc cũng có thể là center:
![](https://images.viblo.asia/a018414b-09e7-4e40-89d2-ebf9232b0d7f.png)
**app:fabCradleVerticalOffset** :  Khai báo toạ độ theo chiều dọc so với FAB. Mặc định sẽ là 0dp
![](https://images.viblo.asia/ed5508fd-6a28-413e-909a-2302a22be1f9.png)
Hoặc nâng cao hơn chút:

**app:backgroundTint** :  Được sử dụng cho việc áp dụng tô màu cho background của view.

Lưu ý:
1. Chúng ta muốn sử dụng cả FAB và BottomAppBar thì phải để chúng bên trong CoordinatorLayout
2. Nên gọi “app:backgroundTint” thay cho việc gọi setBackground để quản lý background tốt hơn.
3. Gọi  setTitle or setSubtitle sẽ không hiệu quả vì nó sẽ bị override hoặc empty.

Bài viết được tham khảo từ [đây](https://medium.com/google-developer-experts/exploring-the-v28-android-design-support-library-2c96c6031ae8)