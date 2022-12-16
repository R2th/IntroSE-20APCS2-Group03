# I. Dẫn nhập
* Với phiên bản mới nhất, Android đã cũng cấp cho chúng ta những cách thức mạnh mẽ để tạo một UI hoàn chỉnh, tuy nhiên, việc này cũng sẽ dễ dẫn đến việc hiểu không đúng và sử dụng sai mục đích. 
* Việc sử dụng đúng cách Theme và Style sẽ tạo thuận lợi cho việc maintain, giảm bớt độ phức tạp của việc thay đổi UI và sẵn sàng để hỗ trợ dark-mode. 
* Trong bài viết này, chúng ta sẽ tìm hiểu 2 khái niệm cơ bản nhất của Android UI đó là Theme và Style. Các bạn cũng có thể tham khảo chuỗi các bài viết về Android UI tại [đây](https://medium.com/@crafty).
# II. Nội dung chính
## 1. Theme != Style
* Tuy Theme và Style đều sử dụng chung một cú pháp `<style>` nhưng chúng phục vụ cho các mục đích khác nhau. Chúng ta có thể hiểu cả hai như là các cặp `key-value` trong đó `key` là các thuộc tính và `value` là các `resource`. Chúng ta sẽ đi làm rõ từng thành phần này.
## 2. Style
### a. Style là gì?
* Style là tập hợp các giá trị thuộc tính của View. Chúng ta có thể hiểu Style giống như một `Map<view attribute, resource>`. Trong đó các key là các thuộc tính của view (ví dụ: các thuộc tính được khai báo cho một widget mà chúng ta cài đặt trong file layout). Style là dành riêng cho mỗi loại widget và các widget khác nhau sẽ hỗ trợ các tập thuộc tính khác nhau
> Style là tập hợp các thuộc tính của view, cụ thể cho một loại widget.
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->
<style name="Widget.Plaid.Button.InlineAction" parent="…">
  <item name="android:gravity">center_horizontal</item>
  <item name="android:textAppearance">@style/TextAppearance.CommentAuthor</item>
  <item name="android:drawablePadding">@dimen/spacing_micro</item>
</style>
```
* Như ví dụ trên, mỗi key trong Style là thứ mà chúng ta có thể cài đặt trong layout.
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->
<Button …
  android:gravity="center_horizontal"
  android:textAppearance="@style/TextAppearance.CommentAuthor"
  android:drawablePadding="@dimen/spacing_micro"/>
```
* Tách riêng chúng ra một Style sẽ giúp ích cho việc sử dụng lại ở nhiều view khác và maintain sau này.
### b. Cách sử dụng
* Style được sử dụng riêng biệt cho mỗi view trong layout.
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->
<Button …
  style="@style/Widget.Plaid.Button.InlineAction"/>
```
* View chỉ có thể áp dụng một Style – trái ngược với các hệ thống khác như CSS trên web, nơi các thành phần có thể cái đặt nhiều lớp CSS.
### c. Phạm vi sử dụng
* Style áp dụng cho view thì chỉ có tác dụng với view đó, không ảnh hưởng tới các view con. Ví dụ, nếu chúng ta có một ViewGroup với 3 button, cài đặt style `InlineAction` cho ViewGroup sẽ không áp dụng cho các button. Các value được cung cấp bởi style sẽ được kết hợp với các giá trị được cài đặt trực tiếp trong layout.
## 3. Theme
### a. Theme là gì?
* Theme là một tập hợp các resource được đặt tên mà có thể được tham chiếu bởi style, layout... Theme cung cấp tên ngữ nghĩa cho các Android resource để chúng ta có thể tham khỏa chúng sau này, ví dụ `colorPrimary` là tên ngữ nghĩa cho một màu nhất định.
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->
<style name="Theme.Plaid" parent="…">
  <item name="colorPrimary">@color/teal_500</item>
  <item name="colorSecondary">@color/pink_200</item>
  <item name="android:windowBackground">@color/white</item>
```
* Những resource được đặt tên này được biết đến như là các thuộc tính của Theme, vậy nên Theme là `Map<theme attribute, resource>`. Các thuộc tính của Theme khác với các thuộc tính của view bởi vì chúng không phải định nghĩa cho một view riêng lẻ mà là tên ngữ nghĩa trỏ đến value được áp dụng rộng rãi trong ứng dụng. 
* Một Theme sẽ cung cấp các giá trị cụ thể cho các resource được đặt tên này. Trong ví dụ ở trên, thuộc tính `colorPrimary` xác định rằng màu chính cho Theme là teal. Bằng cách trừu tượng hóa resource với Theme, chúng ta có thể cũng cấp các giá trị cụ thể khác nhau (ví dụ `colorPrimary=orange`) trong các Theme khác nhau.
> Theme là tập hợp các resource được đặt tên, sử dụng rộng rãi trên một ứng dụng.
### b. Cách sử dụng
* Chúng ta có thể định nghĩa Theme trong một component có chứa `Context` (ví dụ `Activity`, `View`, `ViewGroup`)
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->

<!-- AndroidManifest.xml -->
<application …
  android:theme="@style/Theme.Plaid">
<activity …
  android:theme="@style/Theme.Plaid.About"/>

<!-- layout/foo.xml -->
<ConstraintLayout …
  android:theme="@style/Theme.Plaid.Foo">
```
* Chúng ta cũng có thể cài đặt Theme trong code bằng cách bọc một `Context` có sẵn với một `ContextThemeWrapper` mà chúng ta có thể sử dụng để inflate một layout.
* Sức mạnh của Theme thực sự đến từ cách chúng ta sử dụng nó. Chúng ta có thể xây dựng các widget linh hoạt hơn bằng các tham khảo các thuộc tính của Theme. Các Theme khác nhau cũng cấp các giá trị riêng lẻ sau đó. Ví dụ chúng ta muốn đặt màu nền cho một phần của view:
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->
<ViewGroup …
  android:background="?attr/colorSurface">
```
* Thay vì cài đặt màu tĩnh (`#ffffff` hoặc `@color resource`), chúng ta có thể giao phó cho Theme bằng cách sử dụng cú pháp `?attr/themeAttributeName`. Cú pháp này có nghĩa là: truy vấn trong Theme cho giá trị của thuộc tính semantic này. Mức độ gián tiếp này cho phép chúng ta cũng cấp các behavior khác nhau (ví dụ cũng cấp màu nền khác nhau trong các theme light và dark) mà không phải tạo ra nhiều layout hoặc style gần giống nhau nhưng cho một vài biến thể màu.
> Sử dụng cú pháp ?attr/themeAttributeName để truy vấn theme lấy giá trị của thuộc tính ngữ nghĩa.
### c. Phạm vi sử dụng
* Theme có thể được truy cập giống như một property của `Context` và có thể được tồn tại trong bất kỳ đối tượng nào có `Context`, ví dụ `Activity`, `View` hoặc `ViewGroup`. Những đối tượng này tồn tại trong một cây – nơi `Activity` chứa `ViewGroup` – `ViewGroup` chứa `View`. Định nghĩa Theme ở bất kỳ cấp độ nào của tầng cây này đều có tác dụng với các nút, ví dụ cài đặt Theme cho `ViewGroup` sẽ áp dụng cho toàn bộ `View` của nó (ngược lại với Style là chỉ áp dụng cho một view)
```
<!-- Copyright 2019 Google LLC.	
   SPDX-License-Identifier: Apache-2.0 -->
<ViewGroup …
  android:theme="@style/Theme.App.SomeTheme">
  <! - SomeTheme also applies to all child views. -->
</ViewGroup>
```
* Lưu ý rằng behavior này chỉ áp dụng tại thời điểm layout inflat. Mặc dù `Context` cung cấp phương thức `setTheme` hoặc Theme cung cấp phương thức `applyStyle` nhưng chúng cần được gọi trước khi inflat. Cài đặt một Theme mới hoặc áp dụng Style sau khi inflat sẽ không các tác dụng với view hiện tại.
# III. Kết
* Việc hiểu rõ sự khác nhau và sự tương tác của Theme và Style sẽ giúp cho resource của chúng ta được quản lý dễ dàng hơn. Nội dung của bài viết được tham khảo tại [đây](https://medium.com/androiddevelopers/android-styling-themes-vs-styles-ebe05f917578).