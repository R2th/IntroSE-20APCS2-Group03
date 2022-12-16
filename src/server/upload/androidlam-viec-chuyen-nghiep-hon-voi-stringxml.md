Khi thực hiện các dự án Android nói riêng và các dự án lập trình nói chung, việc sử dụng và biểu thị dữ liệu string là rất thường xuyên. Việc nắm được cách sử dụng và giải quyết một số vấn đề cơ bản với loại dữ liệu này là rất cần thiết. Do đó, bài viết này sẽ nêu ra các cách sử dụng resource string đơn giản trong Android để giúp mọi người làm việc chuyên nghiệp và hiệu quả hơn.

  Ngoài ra, việc sử dụng các phải pháp đồng nhất cho một vấn đề gặp phải ở các thời điểm khác nhau sẽ giúp cho việc tìm kiếm và sửa lỗi trở nên đơn giản và dễ dàng hơn.
## 1. String Array:
  Thay vì lưu các array với kiểu string trong code bạn cũng có thể dùng String array để lưu các array ngay trong xml. Việc này có thể giúp bạn kết hợp định dạng, tạo kiểu (cách thức định dạng, tạo kiểu được mô tả ở những phần tiếp theo) cho string của mỗi item ngay khi khai báo.

  * **Khai báo:**
  ```
  <string-array name="txt_fruits">
        <item>Banana</item>
        <item>Orange</item>
        <item>Star fruit</item>
    </string-array>
  ```


  * **Truy xuất:**
    Trong Kotlin sử dụng **resources.getStringArray()**

  ```java
  val fruits = resources.getStringArray(R.array.txt_fruits)
  ```
## 2. String chứa các kí tự đặc biệt:
Một số kí tự khi khai báo trong string sẽ bị báo lỗi hoặc không hiển thị đúng lên màn hình như là: `'`, `"`, `\`, `@`, `?`, `&`, `...`, `<`, `>`  và khi nhiều khoảng trắng đứng liền kề sẽ bị gộp thành một.

![alt](https://i.im.ge/2021/08/24/pp3zX.png)
Để giải quyết vấn đề trên bạn có thể dùng các cách sau đây:

1. Đặt string trong dấu ngoặc kép.

Có thể sử dụng cho các kí tự: `'`, `"`, `@`, `?`, trường hợp nhiều khoảng trống đứng liền kề, ...

![alt](https://i.im.ge/2021/08/24/ppgWM.png)

2. Đặt `\` trước kí tự đặc biệt.

Có thể sử dụng cho các kí tự: `'`, `"`, `\`, `@`, `?`, ...

![alt](https://i.im.ge/2021/08/24/pJM0M.png)

3. Dùng code để hiển thị.

Có thể sử dụng cho các kí tự:

– `&` thay bằng `&amp;`

– `…` thay bằng `&#8230;`

– `<` thay bằng `&lt;`

– `>` thay bằng `&gt;`
-...

![alt](https://i.im.ge/2021/08/24/varoh.png)

## 3. Tạo kiểu với thẻ HTML:
Khi trong một string nhưng lại được yêu cầu định dạng, màu sắc khác nhau cho một số thành phần trong string, bạn có thể định dạng từng thành phần của string bằng các thẻ HTML ngay trong file xml, một số thẻ thông dụng sau:
* In đậm: `<b>`
* In nghiên: `<i>`
* Gạch chân: `<u>`
* Gạch ngang: `<strike>`


* **Khai báo:**
```
    <string name="txt_example_bold_text"><b>Bold</b> text</string>
    <string name="txt_example_italic_text"><i>Italic</i> text</string>
    <string name="txt_example_underline_text"><u>Underline</u> text</string>
    <string name="txt_example_strike_through_text"><strike>strike</strike>text</string>
```
* **Truy xuất:**
- Đối với file `.xml`:

  sử dụng `@string/[tên_string]`

- Đối với file Kotlin:

  sử dụng `textView.setText(R.string.[tên_string])`

  > *chú ý: khi dùng `textView.text = getString(R.string.[tên_string])` thẻ HTML sẽ không hoạt động.*

  khi chạy nội dung sẽ được hiển thị như sau:

  [![QFBEWK.md.png](https://i.im.ge/2021/08/29/QFBEWK.md.png)](https://im.ge/i/QFBEWK)

Ngoài những thẻ HTML có thể sử dụng trực tiếp như trên, bạn vẫn có thể sử dụng các thẻ HTML khác bằng cách sử dụng **CDATA** như sau:

* **Khai báo:** Hãy bọc string bằng khai báo CDATA, bên trong là định dạng theo HTML

```
    <!--tạo link liên kết-->
    <string name="txt_example_link_text">You can read documentation for app developers in
        <![CDATA[
            <a href="https://developer.android.com/docs">here</a>
        ]]>
    </string>
    <!--Tạo danh sách-->
    <string name="txt_example_bullet_points_text"> Android programming language
        <![CDATA[
            <ul>
            <li> Java </li>
            <li> Kotlin </li>
        </ul>
        ]]>
    </string>
```

* **Truy xuất:**
```Java
    val text = if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.N) {
        Html.fromHtml(getString(R.string.[tên_string]), Html.FROM_HTML_MODE_LEGACY)
    } else {
        Html.fromHtml(getString(R.string.[tên_string]))
    }
    textView.text = text
```

khi chạy nội dung sẽ được hiển thị như sau:

[![BXAHx.md.png](https://i.im.ge/2021/08/24/BXAHx.md.png)](https://im.ge/i/BXAHx)

## 4. Formatting String:
  Trước đây, khi trong chuỗi có một hoặc nhiều biến số mình đã sử dụng việc khai báo nhiều string trước và sau biến số sau đó dùng toán tử `+` để nối các chuỗi như ví dụ dưới đây.

  ví dụ: chuỗi thông báo số lượng like của bài viết.

  * **Khai báo:**
  ```
  <string name="txt_notification_1">Your post has </string>
  <string name="txt_notification_2"> likes </string>
  ```
  * **Truy xuất:**
  ```Java
  val numberOfLikes = 100
  val notificationText = getString(R.string.txt_notification_1) + numberOfLikes.toString() + getString(R.string.txt_notification_2)

    textView.text = notificationText
  ```

  Dừng ngay việc nối chuỗi bằng toán tử `+`, thay vào đó hãy dùng *Formatting String*. Thực hiện nó bằng cách đặt các đối số định dạng vào chuỗi, giúp bạn linh động trong việc sử dụng các chuỗi.


  * Ví dụ 1: Khi bạn muốn thông báo về việc nâng cấp version ứng dụng. Trong ví dụ này, tên người dùng và số version sẽ được thay đổi tương thích.

[![B0G18.md.png](https://i.im.ge/2021/08/25/B0G18.md.png)](https://im.ge/i/B0G18)

  * **Khai báo:**
  ```
  <string name="txt_update_version_des">Hello %1$s!\nNew version of this app is available. \n Please update to version %2$s now.</string>
  ```
  Cú pháp:  
  >*%[thứ_tự_xuất_hiện\$\]kiểu_định_dạng*

  Chúng ta có các kiểu định dạng sau:
  * **s** – Dùng để thay thế bằng một chuỗi
  * **d** – Dùng để thay thế bằng một số nguyên
  * **f** – Dùng để thay thế bằng một số thực

  * **Truy xuất:**

  ```Java
       val userName = "Ngoc Len"
       val versionApp = BuildConfig.VERSION_NAME

       textView.text = getString(R.string.txt_update_version_des, userName, versionApp)
  ```

  *Ví dụ 2: Bạn có thể ứng dụng trong trường hợp xử lí ứng dụng đa ngôn ngữ.
Trong các ngôn ngữ khác nhau thứ tự từ có thể thay đổi.

* **Khai báo:**
  * file `values/strings.xml`:
  ```
  <string name="txt_expire_time">Time: from %1$s to %2$s</string>
  ```

  * file `values-jp/strings.xml`:
  ```
  <string name="txt_expire_time">時間: %1$s から %2$s　まで</string>
  ```

* **Truy xuất:**

  ```Java
  val startDate = "22/08/2020"
  val EndDay = "22/08/2021"

  textView.text = getString(R.string.txt_expire_time, startDate, EndDay)

  //result
  //EN: Time: from 22/08/2020 to 22/08/2021
  //JP: 時間: 22/08/2020 から 22/08/2021　まで

  ```

## 5. Quantity strings (plurals)：
  Các ngôn ngữ khác nhau sẽ có các quy tắc riêng đối với các từ ngữ đi với số lượng. Chẳng hạn, trong Tiếng Anh có sự khác nhau về từ ngữ khi sử dụng với số ít hoặc số nhiều. Đừng giải quyết số nhiều bằng việc khai báo 2 chuỗi riêng biệt trong string.xml rồi dùng if trong mã Java hoặc Kotlin. Điều này khá phức tạp đối với ứng dụng đa ngôn ngữ. Hãy dùng Quantity strings để đạt hiệu quả cao hơn.

  Ví dụ: Khi bạn muốn thông báo về số tin nhắn mới.

  * **Khai báo:**
  Dùng thẻ `plurals` thay vì thẻ `string`.
  ```
  <plurals name="txt_new_message_notification">
        <item quantity="one">You have %d new message.</item>
        <item quantity="other">You have %d new messages.</item>
    </plurals>
  ```

  Trong đó:

   Mỗi `item` định nghĩa một trường hợp. Thuộc tính `quantity` cho biết khi nào nên sử dụng chuỗi này. (Bạn có thể tham khảo thêm các quantity tại [đây](https://developer.android.com/guide/topics/resources/string-resource.html#Plurals))

  * **Truy xuất:**
  Trong Kotlin sử dụng **resources.getQuantityString()**
  ```Java
  textView.text = resources.getQuantityString(R.plurals.txt_new_message_notification, numberOfNewMessage, numberOfNewMessage)
  ```

  Trong đó: Các tham số được truyền vào như sau:
  - `R.plurals.txt_new_message_notification`: id định danh plurals
  - `numberOfNewMessage`: tham số này được sử dụng để xác định chính xác chuỗi được sử dụng.
  - `numberOfNewMessage`: tham số này được sử dụng cho đối số được định dạng trong item. Nếu trong item của bạn không có đối số thì không cần truyền tham số này, cũng như, nếu trong item của bạn có n đối số bạn sẽ truyền thêm n tham số.

  ## 6. Tạo Kiểu với SpannableString:
    Bạn có thể tạo kiểu các string một cách linh động với các thẻ HTML trong file string.xml, vậy nếu bạn muốn tạo kiểu các string một cách linh động như vậy trong code Java hoặc Kotlin thì phải làm sao? SpannableString sẽ giúp bạn làm việc đó.

   * **Khai báo:**  
   ```
   <string name="txt_styling_with_SpannableString">Styling with SpannableString </string>
   ```
   * **Truy xuất và tạo kiểu cho text:**
   ```java
        // get string
        val exampleString = getString(R.string.txt_styling_with_SpannableString)
        // Khai báo SpannableString
        val exampleSpan = SpannableString(exampleString)
        // set size
        exampleSpan.setSpan(
            //object: set text size
            AbsoluteSizeSpan(resources.getDimensionPixelSize(R.dimen.font_size_big)),
            //start index
            13,
            //end index
            exampleString.length,
            //flags
            0
        )
        // set color
        exampleSpan.setSpan(
            //object: set text color
            ForegroundColorSpan(Color.BLUE),
            //start index
            13,
            //end index
            exampleString.length,
            //flags
            0
        )
        // set style
        exampleSpan.setSpan(
            //object: set style is bold
            StyleSpan(Typeface.BOLD),
            //start index
            0,
            //end index
            exampleString.length,
            0
        )
        // set text
        viewBiding.text3.text = exampleSpan

   ```
   Ngoài việc sử dụng `AbsoluteSizeSpan(int size)` set size bằng tham số `size` truyền vào, ta còn có thể dùng `RelativeSizeSpan(float proportion)`set size với tỉ lệ bằng tham số `proportion` được truyền vào.

   ```java
   exampleSpan.setSpan(
       //object: set size lớn gấp 1.5
       RelativeSizeSpan(1.5f),
       //start index
       13,
       //end index
       exampleString.length,
       //flags
       0
   )
   ```

   khi chạy nội dung sẽ được hiển thị như sau:
[![QFBijc.md.png](https://i.im.ge/2021/08/29/QFBijc.md.png)](https://im.ge/i/QFBijc)

## Tổng kết:
  Trên đây mình đã nêu ra các cách sử dụng resource string và các ví dụ cơ bản, hi vọng giúp mọi người hiểu hơn về cách sử dụng và ứng dụng chúng một cách linh động, chuyên nghiệp hơn.

  **Trong bài này có tham khảo:**
  - https://developer.android.com/guide/topics/resources/string-resource#StylingWithSpannables