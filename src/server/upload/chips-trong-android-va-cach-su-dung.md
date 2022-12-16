# Chips là gì trong Android? 
   Chip cho phép người dùng nhập thông tin, thực hiện lựa chọn, lọc nội dung hoặc kích hoạt hành động. Mặc dù các nút dự kiến sẽ xuất hiện nhất quán và có lời kêu gọi hành động quen thuộc, nhưng các con chip sẽ xuất hiện linh hoạt dưới dạng một nhóm gồm nhiều yếu tố tương tác.
  
## 1. Phân loại
**- Input chips**  là : Chip đầu vào đại diện cho thông tin được sử dụng trong các trường, chẳng hạn như một thực thể hoặc các thuộc tính khác nhau.
![unnamed.png](https://images.viblo.asia/144c578c-c7cb-4588-a3cd-68951d9eacd7.png)
**- Choice chips**  là: Trong các bộ chứa ít nhất hai tùy chọn, các chip lựa chọn đại diện cho một lựa chọn duy nhất.
![unnamed (1).png](https://images.viblo.asia/eb29e943-1039-40e6-9c92-9d2b019bf5d3.png)
**- Filter chips** là: Chip bộ lọc đại diện cho các bộ lọc cho một bộ sưu tập.
![unnamed (2).png](https://images.viblo.asia/a5ccb879-3e15-40ed-bae5-7982f35f1543.png)
**- Action chips** là: Các chip hành động kích hoạt các hành động liên quan đến nội dung chính.
## 2. Thành phần chính
 ![unnamed (3).png](https://images.viblo.asia/80388153-c032-43d6-91e4-f468b433977b.png)
* **1.  Container**: 
Các thùng chứa chip chứa tất cả các phần tử chip và kích thước của chúng được xác định bởi các phần tử đó. Một vùng chứa cũng có thể được xác định bằng một nét vẽ.
* **2.  Thumbnail [optional]**: 
Hình thu nhỏ xác định các thực thể (chẳng hạn như cá nhân) bằng cách hiển thị hình đại diện, logo hoặc biểu tượng.
* **3.  Text**: 
Văn bản chip có thể là tên thực thể, mô tả, thẻ, hành động hoặc hội thoại.
* **4. Remove icon [optional]**: 
Chip đầu vào có thể bao gồm biểu tượng Xóa.
##  3. Sử dụng
### 1.  Add library material design to Gradle
### 2.  Add code in xml
``` kotlin
<com.google.android.material.chip.Chip
android:id="@+id/chip"
android:layout_width="wrap_content"
android:layout_height="wrap_content"
android:text="@string/text"/>
```
### 3. Event onClick
``` kotlin
chip.setOnClickListener {
// Responds to chip click
}

chip.setOnCloseIconClickListener {
// Responds to chip's close icon click if one is present
}

chip.setOnCheckedChangeListener { chip, isChecked ->
// Responds to chip checked/unchecked
}
```
### 4. Chip Group
![image.png](https://images.viblo.asia/727b0981-a2ee-4f4e-be9a-2c24ba6905d4.png)
``` kotlin
<com.google.android.material.chip.ChipGroup
android:id="@+id/chipGroup"
android:layout_width="match_parent"
android:layout_height="wrap_content">

<!-- Chips can be declared here, or added dynamically. -->

</com.google.android.material.chip.ChipGroup>
```
### 5. Một ChipGroup cũng có thể giới hạn các chip của mình trong một hàng duy nhất bằng cách sử dụng thuộc tính app:singleLine. Việc sử dụng một hàng có thể bắt buộc phải bọc ChipGroup bằng HorizontalScrollView.
![image.png](https://images.viblo.asia/d983fed4-5d7d-4863-ac68-110463c9e1f7.png)
```kotlin
<HorizontalScrollView
... >
<com.google.android.material.chip.ChipGroup
...
app:singleLine="true">

<!-- Chips can be declared here, or added dynamically. -->

</com.google.android.material.chip.ChipGroup>
</HorizontalScrollView>
```
### 6. Chip spacing
Một ChipGroup có thể chèn khoảng cách giữa các chip trong một hàng hoặc giữa các hàng chip bằng thuộc tính app:chipSpacing. Khoảng cách ngang và dọc khác nhau có thể được thiết lập bằng cách sử dụng các thuộc tính app:chipSpacingHorizontal và app:chipSpacingVertical.
Lưu ý: Ứng dụng:chipMinTouchTargetSize sẽ ghi đè khoảng cách chip dọc cho số tiền thấp hơn.

Hình ảnh sau đây hiển thị một nhóm chip có app:chipSpacingHorizontal="42dp".
![image.png](https://images.viblo.asia/5e2be872-27d3-4979-85b7-85a052706051.png)
### 7. Multiple exclusion scope
Thuộc tính app:singleSelection có thể được đặt thành true trên ChipGroup để chuyển đổi hành vi chọn một lần và chọn nhiều lần của các chip con.

Thuộc tính app:selectionRequired có thể được đặt thành true trên ChipGroup để ngăn không cho tất cả các chip con bị bỏ chọn (tức là ít nhất một tùy chọn phải được chọn).
### 8. Handling checked chips
Có thể quan sát các thay đổi đối với trạng thái kiểm tra/bỏ kiểm tra chip con như sau:
```kotlin
val checkedChipId = chipGroup.checkedChipId // Returns View.NO_ID if singleSelection = false
val checkedChipIds = chipGroup.checkedChipIds // Returns a list of the selected chips' IDs, if any

chipGroup.setOnCheckedChangeListener { group, checkedId ->
// Responds to child chip checked/unchecked
}
```
## 4. Tài liệu
- Document: https://m2.material.io/components/chips/android#filter-chip
- Project tutorial: https://github.com/material-components/material-components-android/blob/master/docs/components/Chip.md