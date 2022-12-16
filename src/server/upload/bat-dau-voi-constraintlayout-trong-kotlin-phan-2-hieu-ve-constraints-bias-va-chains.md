## 1) Constraints (Ràng buộc) là gì?
ConstraintLayout làm việc dựa vào những ràng buộc. Ràng buộc đơn giản là một mối liên kết giữa thành phần trong Layout, tức là View này ràng buộc vào View kia mà sắp xếp
Khi tạo các Constraints, có vài quy tắc phải tuân theo:
* Mỗi view phải có ít nhất hai ràng buộc: Horizontal và Vertical. Nếu ràng buộc này không được thêm vào, thì view của bạn sẽ được đặt mặc định tại điểm zero.
* Bạn chỉ có thể tạo các ràng buộc, chỉ khi có một xử lý ràng buộc đó với điểm cố định để liên kết chung mặt phẳng. Vì vậy, một mặt phẳng thẳng đứng (bên trái và bên phải) của view chỉ có thể bị hạn chế, đối với mặt phẳng đứng khác.
* Bạn có thể tạo ra nhiều ràng buộc từ View khác đến từ một điểm.
## 2) Thêm các Constraints (Ràng buộc)
Theo mặc định, khi bạn thêm vào một phần tử vào layout, ví dụ:

 ``` <Button

      android:id="@+id/button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      android:text="Button" />
```
Nó nhận vị trí (0,0), về cơ bản điểm 0 là trục ngang và trục dich, Trên giao diện thiết kế bố trí, bạn có thể dễ dàng kéo điểm này vào bất kỳ điểm nào khác mà bạn muốn. Như ở giữa màn hình, Nếu bạn thực hiện, các dòng code trong XML sẽ thêm các thuộc tính bổ sưng tương tự.
```
    tools:layout_editor_absoluteX="148dp"
    tools:layout_editor_absoluteY="231dp"
```
## 3) Thêm các Constraints Automatically (Ràng buộc tự động)
Android studio có khả năng auto khi thêm ràng buộc, khi bạn thêm View trong màn hình Design.
![](https://images.ctfassets.net/1es3ne0caaid/1rY4eNOLTumcY4UUEOIKe6/d3e9591513acf57bdf9fc61ff0dfc17d/constraintLayout-2-autoadd-constraints.gif)
Mặc định, *Autoconnect icon* (U like icon) bị tắt. Hãy bật autoconstraint, Sau đó chúng ta kéo phần văn bản sang phần bên trái Layout. Như vậy ta đã tạo ràng buộc tự động.

```
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintTop_toTopOf="parent" 
```
Tuy nhiên khi bạn xây dựng Layout phức tạp hơn, bạn nên tạo và thao tác các ràng buộc bằng tay.
Để thêm các ràng buộc theo cách thử công, kéo các điểm ở một trong bốn phía ở bên dưới.
![](https://images.ctfassets.net/1es3ne0caaid/4HvTVMHx20cSSkOEMiAUWe/db00d7ed833022f00f4f1d235180b4a5/constraintLayout-2-manual-add-constraints.gif)
Bạn tạo 2 thuộc tính trong TextView trong file XML.
```
app:layout_constraintStart_toStartOf="parent"
app:layout_constraintTop_toTopOf="parent" 
```
Nếu bạn nhận thấy, đó là những ràng buộc tương tự mà chúng ta nhận được khi chúng ta tự động tạo ra chúng. Ngoài ra nó đã tạo ra 2 thuộc tính khác.
```
android:layout_marginStart="8dp"
android:layout_marginTop="8dp"
```
## 4) Relative constraints (Quan hệ ràng buộc)
Quan hệ ràng buộc có nghĩa là cho phép bạn định vị một yếu tố liên quan đến yếu tố khác, giống như có trong RelativeLayout.
### a) Ràng buộc bottom to bottom
 ` app:layout_constraintBottom_toBottomOf="@+id/referenced_view"`
 ![](https://images.ctfassets.net/1es3ne0caaid/3rA4OtYucoiew2scCUeaC2/d79bbf5e233f1acfa6e34071833504e9/constraintLayout-2-bottom-to-bottom.png)
### b) Ràng buộc top to top
`app:layout_constraintTop_toTopOf="@+id/referenced_view"`
![](https://images.ctfassets.net/1es3ne0caaid/6jv9sFYNP2g2QK4YuCWGcU/184ceea35bb66a07e9a97b62771f8a50/constraintLayout-2-top-to-top.png)
### c) Ràng buộc start to start
`app:layout_constraintStart_toStartOf="@+id/referenced_view"`
![](https://images.ctfassets.net/1es3ne0caaid/4rqR3eISyk8G4O0o8Qq20E/8b403f516dcaef782ec8e6b9c91e3fcd/constraintLayout-2-start-to-start.png)
### d) Ràng buộc left to left
`app:layout_constraintLeft_toLeftOf="@id/view"`
### e) Ràng buộc end to end
`app:layout_constraintEnd_toEndOf="@+id/referenced_view"`
![](https://images.ctfassets.net/1es3ne0caaid/1zvNt9MBsYcwMQIaoaawWG/2e592d7636478748dcab4032b02c5ba5/constraintLayout-2-end-to-end.png)
### f) Ràng buộc start to end 
`app:layout_constraintStart_toEndOf="@+id/referenced_view"`
![](https://images.ctfassets.net/1es3ne0caaid/6wCHve2ASI8cmoMck8aEo2/a4ca21da6684ef8327927c6950d08769/constraintLayout-2-start-to-end.png)
### g) Ràng buộc end to start
`app:layout_constraintEnd_toStartOf="@+id/referenced_view"`
![](https://images.ctfassets.net/1es3ne0caaid/L7ozAgxU8SKSG6wUEe2Qi/872376f5f4a29a6eeb0a86b85a6b6a0e/constraintLayout-2-end-to-start.png)
### h) Ràng buộc bottom to top
`app:layout_constraintBottom_toTopOf="@+id/referenced_view"`
![](https://images.ctfassets.net/1es3ne0caaid/43YMWsLNNYaMCkOA4cYcmA/4081347bdddcf963f15fbf48e0979588/constraintLayout-2-bottom-to-top.png)
## 5) Circular positioning (Vị trí vòng cung)
`layout_constraintCircle` Tham chiếu ID bạn muốn ràng buộc nó
`layout_constraintCircleRadius` Khoản cách giữa liên kết của bạn
`layout_constraintCircleAngle` Góc của liên kết (tính từ 0 đến 360)
![](https://images.ctfassets.net/1es3ne0caaid/1j1lz5zAgCqKSwscSsyaqs/e6af57f9ad6622faa2598b63c44c6d8b/constraintLayout-2-circular.png)
 <android.support.constraint.ConstraintLayout 
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

  ```
<Button
    android:id="@+id/buttonA"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:layout_marginStart="8dp"
    android:layout_marginTop="8dp"
    android:layout_marginEnd="8dp"
    android:layout_marginBottom="8dp"
    android:text="Button A"
    app:layout_constraintBottom_toBottomOf="parent"
    app:layout_constraintEnd_toEndOf="parent"
    app:layout_constraintStart_toStartOf="parent"
    app:layout_constraintTop_toTopOf="parent" />

  <Button
    android:id="@+id/buttonB"
    android:layout_width="wrap_content"
    android:layout_height="wrap_content"
    android:text="Button B"
    app:layout_constraintCircle="@+id/buttonA"
    app:layout_constraintCircleAngle="45"
    app:layout_constraintCircleRadius="110dp" />

</android.support.constraint.ConstraintLayout>
```
## 6) Gỡ bỏ ràng buộc
Để loại bỏ thuộc tính ràng buộc từ file xml, bạn có thể loại bỏ nó từ Design Layout.
![](https://images.ctfassets.net/1es3ne0caaid/6LWbBeeqwEesiUWSkEI0wA/1f315d941eb41d92523e918c0a74f0d0/constraintLayout-2-removing-constraints.gif)
## 7) Bias là gì?
Bias dùng khoảng cách giữa View và ràng buộc. Nó có thể theo chiều dọc hoặc chiều ngang.
   ```
 <Button
      android:id="@+id/button"
      android:text="Button"
      android:layout_width="wrap_content"
      android:layout_height="wrap_content"
      app:layout_constraintLeft_toLeftOf="parent"
      app:layout_constraintRight_toRightOf="parent"/>
```
Mặc định, Button theo chiều ngang có Bias là 0.5 
![](https://images.ctfassets.net/1es3ne0caaid/4MAkxEAYrYGisY0yYWgqiU/c89f88a6a529cae44d4ad2eb80e59261/constraintLayout-2-bias-1.png)
Bây giờ bạn muốn điều chỉnh Button này sang một chút bên phải hoặc bên trái, các giá trị trong khoảng 0 -> 0.4 sẽ đẩy nút về bên trái màn hình. Giá trị từ 0.6 đến 1 sẽ đẩy Button qua bên phải màn hình.
`app:layout_constraintHorizontal_bias="0.7"`
![](https://images.ctfassets.net/1es3ne0caaid/7JZk3lVZPa0cs22uuacaI/cfe586b151410ac7e653319279b8b8aa/constraintLayout-2-bias-2.png)
## 8) Chains (chuổi)
Để tạo Chains, bạn chọn nhiều View cùng 1 lúc, kick chuột phải, chọn Chains và add vào.
![](https://images.ctfassets.net/1es3ne0caaid/59wbGuLGcMaooGQsOYUiQy/27dab0d1bc546900f2385d813c08762c/constraintLayout-2-add-chains.gif)
* chain mode (kiểu chuổi)
Chúng ta có thể phân khối View theo chiều ngang hoặc chiều dọc, với các kiểu
* Chain mode: spread
Theo kiểu này, View được phân đối đều. Khoảng cách giữa các View là như nhau
![](https://images.ctfassets.net/1es3ne0caaid/4FniR7iXW84uYU4qCKAmKy/8a99d5fe1e0d70d97ac14e8b669803c2/constraintLayout-2-chain-mode-spread.png)
```
  <android.support.constraint.ConstraintLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

      <Button
        android:id="@+id/firstButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/secondButton"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toStartOf="parent"/>

      <Button
        android:id="@+id/secondButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintTop_toTopOf="parent"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/firstButton"/>

    </android.support.constraint.ConstraintLayout>
```
Lưu ý: Chế độ chuổi không được chỉ định trực tiếp thông qua thuộc tính chuổi. 
* Chain mode: spread inside
Trong chế độ này, view đầu tiền và cuối cùng được gắn vào ràng buộc ở mỗi đầu và phần còn lại được phân bố đều giữa chúng.
![](https://images.ctfassets.net/1es3ne0caaid/ls0n0jz7RQG6AMyumewsm/1ff84e434ede6c122529951bfeb6f235/constraintLayout-2-chain-mode-spread-inside.png)
```
<?xml version="1.0" encoding="utf-8"?>
    <android.support.constraint.ConstraintLayout 
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

      <Button
        android:id="@+id/firstButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/secondButton"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="spread_inside"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

      <Button
        android:id="@+id/secondButton"
        android:layout_width="wrap_content"
        android:layout_height="47dp"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/thirdButton"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/firstButton"
        app:layout_constraintTop_toTopOf="parent" />

      <Button
        android:id="@+id/thirdButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/secondButton"
        app:layout_constraintTop_toTopOf="parent" />

    </android.support.constraint.ConstraintLayout>
```
* Chain mode: packed
Chế độ kiểu này, view được đóng gói cùng nhau sau khi bao gồm cả lề.
![](https://images.ctfassets.net/1es3ne0caaid/54J96CjQyQg4oyKkwIguMS/efc05af6e2abce66e7a6b510891fa46e/constraintLayout-2-chain-mode-packed.png)
 ```
<?xml version="1.0" encoding="utf-8"?>
    <android.support.constraint.ConstraintLayout
      xmlns:android="http://schemas.android.com/apk/res/android"
      xmlns:app="http://schemas.android.com/apk/res-auto"
      xmlns:tools="http://schemas.android.com/tools"
      android:layout_width="match_parent"
      android:layout_height="match_parent"
      tools:context=".MainActivity">

      <Button
        android:id="@+id/firstButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/secondButton"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintHorizontal_chainStyle="packed"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

      <Button
        android:id="@+id/secondButton"
        android:layout_width="wrap_content"
        android:layout_height="47dp"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toStartOf="@+id/thirdButton"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/firstButton"
        app:layout_constraintTop_toTopOf="parent" />

      <Button
        android:id="@+id/thirdButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginTop="8dp"
        android:layout_marginBottom="8dp"
        android:text="Button"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.5"
        app:layout_constraintStart_toEndOf="@+id/secondButton"
        app:layout_constraintTop_toTopOf="parent" />

    </android.support.constraint.ConstraintLayout>
```
### 9) Chain weighting (đo chuổi)
Các thuộc tính giúp thêm đo lường View khi sử dụng chuổi. 
```
layout_constraintHorizontal_weight
layout_constraintVertical_weight
```
Để sử dụng thuộc tính này, View phải được sử dụng match_constraint cho chiều rộng hoặc chiều cao tùy thuộc vào trục của chain.
![](https://images.ctfassets.net/1es3ne0caaid/2lTJur8XmEIooQk0QgQy4W/598fea06c3e5e1870654053bedc05cfe/constraintLayout-2-chain-weight-1.png)
Chế độ `spread_inside` dùng để đo lường khi bạn sử dụng `layout_constraintHorizontal_weight`. Băt đầu Button sử dụng weight = 2 trong khi phần còn lại weight = 1.
![](https://images.ctfassets.net/1es3ne0caaid/7D3XVeflq8ykysYSgGUQia/d735fa5f6d54ec012d1900e7e3a6e077/constraintLayout-2-chain-weight-2.gif)
## 10) Phần kết luận
Trong phần này , chúng ta đã tìm hiểu về các ràng buộc. Chúng ta đã tìm hiểu liên kết bố cục. Trong phần tiếp theo, chúng ta sẽ tìm hiểu về những người trợ giúp trong ConstraintLayout

## 11) Tài liệu tham khảo
https://github.com/neoighodaro/constraint-layout-demo

Cảm ơn bạn đã theo dõi bài viết, mời bạn xem phần 3 của constraintLayout:
https://viblo.asia/p/bat-dau-voi-constraintlayout-trong-kotlin-phan-3-su-dung-helpers-groups-va-barriers-eW65GemJZDO

*Tham thảo tại: https://pusher.com/tutorials/constraintlayout-kotlin-part-2*