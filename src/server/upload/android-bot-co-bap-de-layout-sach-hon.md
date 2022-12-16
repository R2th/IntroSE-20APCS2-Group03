> Đã bao giờ các bạn phải dùng đi dùng lại một View (TextView, ImageView, Edittext, Button...ect) mà phải gõ lại những đoạn code nhàm chán giống nhau ? Việc làm như thế có 1 lợi ích rất lớn...đó là ít cần dùng não, còn hệ quả mà nó đem lại là XML file trở lên dài dòng, khó maintain và cực kì tốn cơn :joy: ...khi mà muốn thay đổi thuộc tính của các view thì lại phải rồi gõ lại từng thuộc tính của từng view, ông nào thông minh hơn thì dùng replace để thay thuộc tính mới vào thuộc tính cũ. 

Một developer không thể nào dùng cách cơ bắp như vậy được, nó cực kì "tốn cơm" và dài dòng. Rất may Android hỗ trợ cho chúng ta có thể định nghĩa style và apply nó cho các view tương tự như CSS đối với HTML.
Bạn đã biết đến theme và style ? Chúng đều được dùng để định nghĩa các style để áp dụng cho view, vậy điểm khác nhau là gì ? Khi nào dùng theme, khi nào dùng style ?

* Style: là tập hợp các thuộc tính để **áp dụng cho một view cụ thể**.
* Theme: là tập hợp các thuộc tính để áp dụng cho toàn bộ app, hoặc một activity nào đó, hoặc một layout view (Ví dụ view lớn bao ngoài các view con).

Như vậy, có thể thấy được style và theme về cơ bản thì khá là giống nhau, khác biệt nằm ở phạm vi áp dụng. Bây giờ chúng ta sẽ cùng nhau tìm hiểu và làm rõ từng thằng nhé.

# Theme
* Một ứng dụng Android sẽ phải sử dụng ít nhất một Theme, nếu để ý trong file Manifest.xml bạn sẽ thấy trong cặp thẻ application sẽ có thuộc tính android:theme="@style/AppTheme", nếu xóa thuộc tính này đi ứng dụng sẽ dính lỗi crash. Vì đơn giản, một view muốn hiển thị thì nó cần phải biết nó sẽ được hiển thị như thế nào, màu sắc ra làm sao...theme sẽ là cái quyết định cho những vấn đề đó.

* Đi vào file styles.xml (res -> values -> style.xml, styles là nơi chứa các định nghĩa về theme và style để sử dụng tương tự như strings.xml, colors.xml hay dimens.xml) ta sẽ thấy thẻ
```csharp
<style name="AppTheme" parent="Theme.AppCompat.Light.DarkActionBar">
```

 Hơi loằng ngoằng nhỉ ? Thực ra nó cũng đơn giản thôi, android đã xây dựng sẵn cho chúng ta cơ số các theme mà chỉ việc lôi ra dùng. Việc truy cập cũng tương tự như cách truy cập vào thuộc tính của một đối tượng bằng cách sử dụng dấu  ".",hãy sử dụng thử các theme khác nhau để thấy sự khác biệt giữa chúng. Nhưng lưu ý là cần sử dụng Theme.AppCompat cho application nhé.

 **Vậy làm sao để custom một theme ?**

 Đây là theme mặc định của mình: 

```markdown
<style name="AppTheme" parent="Theme.AppCompat.Light">
        <item name="colorPrimary">@color/colorPrimary</item>
        <item name="colorPrimaryDark">@color/colorPrimaryDark</item>
        <item name="colorAccent">@color/colorAccent</item>
</style>
```

 Mấy cái colorPrimary, colorAccent là gì ? Nó chỉ đơn giản là các biến được định nghĩa bởi Android. Hệ thống sẽ sử dụng chúng làm màu mặc định cho các view. Ví dụ các bạn để colorPrimary là màu đỏ thì status bar sẽ mặc định là màu đỏ. Vậy làm sao để tạo một custom theme ?

 Nó thuần hướng đối tượng luôn, chỉ cần kế thừa và override lại các thuộc tính của theme. Ví dụ, bây giờ mình cần tạo một theme cho HomeActivity:

 ```
 <style name="AppTheme.HomeActivity" parent="AppTheme">
        <item name="colorPrimary">@android:color/holo_red_light</item>
        <item name="colorPrimaryDark">@android:color/holo_red_dark</item>
        <item name="android:textColor">@android:color/holo_blue_dark</item>
 </style>
 ```

Khi theme con kế thừa theme cha bằng cách sử dụng parent, thì nó sẽ nhận kết các thuộc tính từ cha, nếu như ghi lại thuộc tính đã được định nghĩa thì nó sẽ cập nhật mới nhất.
Bây giờ run app lên các bạn sẽ thấy app bar sẽ có màu đỏ nhẹ, chữ sẽ có màu xanh đậm. Vậy làm sao để biết tên của những thuộc tính mà android đã định nghĩa để sử dụng ? Bạn chỉ cần tạo ra các thẻ `<item name="@android:`

IDE sẽ hiển thị một loạt các thuộc tính, bạn áp dụng thử từng cái hoặc google để biết công dụng của chúng nó.

Bây giờ,  để áp dụng theme cho activity ta có 2 cách:

1.  Đặt trong thẻ activity của manifest.xml
    ```
    <activity android:name=".HomeActivity"
              android:theme="@style/AppTheme.HomeActivity" >
    ```
2. Đặt trong code:

    Nếu như chưa set theme ở manifest, bạn hoàn toàn có thể đặt nó ở code (Nhớ đặt trước super.onCreate( ))

    ```
            setTheme(R.styles.AppTheme_HomeActivity)
            super.onCreate(savedInstanceState)
    ```

# Style

Tại sao cần sử dụng style khi mà đã có theme ?  Nếu bạn design của ứng dụng có 3 button dùng cho các mục đích khác nhau, mỗi button có padding, màu sắc, font chữ, margin...etc riêng. Trong khi bạn cần sử dụng lại rất nhiều lần. Không nhẽ lại ngồi gõ lại từng thuộc tính mỗi khi dùng một button ? Style sinh ra để làm điều này, nó nhỏ hơn theme dùng để apply cho detail của các view.

Custom style cũng tương tự như custom theme vậy, tạo trong styles.xml rồi mang đi sử dụng. Ví dụ ở HomeActivity của mình có 1 loại button mà mình cần tái sử dụng nhiều lần, mình sẽ làm như sau: 

```html
<style name="HomeActivity.Button" parent="TextAppearance.AppCompat.Button">
    <item name="android:layout_margin">5dp</item>
    <item name="android:padding">5dp</item>
    <item name="android:textColor">@color/colorPrimary</item>
    <item name="android:fontFamily">sans-serif-black</item>
    <item name="android:layout_width">100dp</item>
    <item name="android:layout_height">40dp</item>
    <item name="android:background">@color/colorAccent</item>
</style>
```

Tương tự như theme, ta sẽ cần kế thừa style từ một lớp nào đó để có được những thuộc tính dành cho button. Nếu chưa biết chọn parent là gì thì mình khuyên các bạn bật suggestion của android studio và gõ một vài keyword rồi thử những gợi ý của nó để biết được keyword rồi apply hoặc google để rõ hơn. Các thuộc tính như margin, padding...etc là những thuộc tính cơ bản của button, để lấy được tất cả các thuộc tính mà có thể custom, ta chỉ cần gõ `<item name = "android: ">` là IDE cũng sẽ show một list, từ đó ta sẽ tìm hiểu được các keyword của nó. Đó là cách học của mình thay vì đọc docs.

Sau khi đã có style rồi ta chỉ việc sử dụng:

```html
    <Button style="@style/HomeActivity.Button"
        android:text="Click me"
    />
```

Rõ ràng là việc làm này cực kì cực kì tiện lợi, tiết kiệm được thời gian, dễ dàng sửa lại toàn bộ design nhanh chóng và rút gọn code trong xml layout tối đa.

 Ok that's all. Chúc các bạn code vui, khỏe, có ích :joy::joy: