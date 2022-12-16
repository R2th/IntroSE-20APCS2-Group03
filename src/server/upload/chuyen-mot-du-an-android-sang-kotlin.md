# Lời mở đầu
Đây là thời điểm mà bạn nên xem xét lại việc liệu Java có nên là ngôn ngữ ưu tiên cho các dự án dựa trên Android hay không? Và, đã liệu có phải đã đến lúc nên chuyển sang `Kotlin`, ngôn ngữ mới dành để phát triển Android?

# “Vấn đề” các developer đang gặp phải với Java là gì?
**Java đã được phát hành cách đây 20 năm.** Vì vậy, mà vô hình chung nó cũng sẽ bị lỗi thời bởi mỗi phiên bản `Java` mới đều phải tương thích với các phiên bản trước đó. Tóm lại, `Java` đang bắt đầu để lộ yếu điểm của mình khi phải cạnh tranh với các ngôn ngữ lập trình mới hơn, nhẹ hơn, ngắn gọn hơn, biểu cảm và hiện đại. Tuy vậy, đừng nghĩ rằng `Kotlin` đã có khả năng soán ngôi của Java. Nó thậm chí còn chưa thể đuổi kịp nữa – do đó mà `Java` vẫn là ngôn ngữ lập trình chính thức cho Android.

Vấn đề là ngôn ngữ này đã quá già và những vấn đề của nó đang bắt đầu trở nên nghiêm trọng hơn. Trong khi đó, đối thủ Kotlin có hai lợi thế chính so với Java:
* Nó được tạo dựa trên chính ngôn ngữ Java với hơn 20 năm kinh nghiệm được tích góp.
* Nó được tích hợp tất cả các tính năng hiện đại cần thiết mà các Java mobile developer luôn khao khát.

# Giới thiệu về Kotlin: Ngôn ngữ mới
Bây giờ, nếu Java là ngôn ngữ lập trình cho tất cả các vấn đề của Android thì có thể xem Kotlin đây là “ngôn ngữ cuối cùng” cho tất cả lập trình ứng dụng. Ngôn ngữ này hoàn toàn tương thích với Java, bạn có thể sử dụng Kotlin code từ Java và ngược lại. Song song đó, nó cũng rất dễ dàng để compile sang Native hoặc JavaScript để phát triển code có thể chạy trên iOS. Có thể nói rằng tính linh hoạt của Kotlin là vô cùng tuyệt vời.

Một số lợi thế lớn nhất của việc sử dụng Kotlin thay vì Java là:

* Tích hợp nhiều tính năng thân thuộc giúp tăng năng suất của các nhà phát triển;
* Là một compiler tốt;
* Kotlin tương thích với tất cả các framework và thư viện Java, và nó được thiết kế để tích hợp dễ dàng với các hệ thống xây dựng Marven và Gradle;
* Cung cấp nhiều cải thiện nâng cao cho run-time.

# Lý do để bạn nên chuyển dự án Android sang ngôn ngữ Kotlin:
:old_key: **Kotlin là một ngôn ngữ mạnh mẽ**

:old_key: **Kiểm thử mang lại độ chính xác cao nhờ ngăn ngừa những lỗi lập trình thông thường**

:old_key: **Ngắn gọn hơn Java**

:old_key: **Đi kèm với một Compiler thông minh và an toàn hơn**

:old_key: **Dễ bảo trì, nâng cấp**

:old_key: **Hỗ trợ tốt hơn cho Functional Programming**

# Nội dung chính
### Bước đầu chuyển sang Kotlin
Tôi đã giới thiệu cho bạn những ưu điểm của Kotlin, **bây giờ là những thứ bạn cần phải làm tuần tự để thực hiện việc chuyển đổi dự án của bạn:**
1. Đọc về cú pháp cơ bản của Kotlin.
2. Làm một số ví dụ đơn giản để áp dụng những thứ bạn vừa đọc được.
3. Chuyển đổi các file Java (`.java`) trong dự án của bạn thành những file Kotlin (`.kt`), dần dần, từng chút một.
4. Duyệt lại các file Kotlin đã chuyển đổi và làm cho chúng trở nên sáng sủa hơn.
5. Lặp lại từ bước 3 đến khi người đánh giá code của bạn hài lòng với thành quả của bạn.
6. Gửi dự án cho khách hàng hoặc đơn giản tạo ra 1 file `.apk` để sử dụng thành quả của chính bạn :D

### Khả năng tương tác
Đi từng bước là một cách tiếp cận hợp lý. `Kotlin` biên dịch thành mã byte Java và hai ngôn ngữ có thể tương tác với nhau. Ngoài ra, có thể có cả hai ngôn ngữ trong cùng một dự án. Vì vậy, bạn không cần thiết phải di chuyển tất cả code sang ngôn ngữ khác. Nhưng nếu đó là mục tiêu của bạn, hãy lặp lại các bước ở trên để *nâng cao tay nghề của mình*. Bằng cách này, nó có tính khả thi cao hơn để duy trì một ứng dụng ổn định trong suốt quá trình migrating và tìm hiểu khi bạn thực hiện.

### Các phương pháp kiểm thử sẽ giải tỏa tâm lý cho bạn
Áp dụng Unit test cho dự án sẽ đảm bảo rằng những thay đổi mà bạn tạo ra không phá vỡ dự án của bạn. Chắc chắn bạn không muốn vào một ngày, dự án của mình xuất hiện những lỗi mà chính bản thân bạn cũng không lý giải nổi.

Bắt đầu sử dụng Unit test với các dữ liệu đơn giản là sự lựa chọn dễ dàng nhất dành cho bạn. Chúng được sử dụng trong toàn bộ dự án, từ từ từng bước một, bạn có thể chuyển tất cả các phương thức test của dự án từ Java sang Kotlin.

Nếu không có các phương thức kiểm thử, bạn phải tốn công hơn để kiểm thử thủ công dự án của bạn bằng các cử chỉ vuốt chạm trên thiết bị. Và điều đó không sớm thì muộn cũng khiến các bạn bị *nản trí*.

### Mã code được chuyển đổi không phải lúc nào cũng đẹp đẽ
Sau khi hoàn thành việc chuyển đổi Java thành Kotlin một cách cơ bản, lướt qua các file code, chắc chắn nó sẽ không clear hoàn toàn. Việc bạn cần làm bây giờ là tìm đọc những bài viết về coding style của Kotlin. Và bạn sẽ nhận ra còn cả quá trình dài phía trước để thành thạo Kotlin. Bộ chuyển đổi từ Java sang Kotlin hoạt động tốt, tuy nhiên có những phương thức và tính năng không thể chuyển đổi một cách hoàn toàn tự động. Tất nhiên như bản thân tôi đánh giá, Kotlin vẫn có một chút gì đó **linh hoạt** hơn so với Java.

Khi bạn bắt đầu thấm nhuần văn phong của Kotlin, bạn sẽ tìm được nhiều điều hay ho khiến bạn muốn tiếp tục tìm hiểu. Đơn giản như trong nhiều trường hợp, một giá trị không phải là `null`, vì vậy bạn thường bỏ qua quá trình kiểm tra `null`. Trong Kotlin, các giá trị không cần thiết phải khởi tạo trực tiếp trong 1 constructor, nó có thể sử dụng với `lateinit`.  Kotlin giảm thiểu số lượng check `null` mà bạn phải thêm vào, ví dụ đoạn code:
``
supportActionBar?.setDisplayShowTitleEnabled(false)
``
chỉ được thực hiện hàm `setDisplayShowTitleEnabled` sau dấu `?` nếu đối tượng `supportActionBar` tồn tại - tức là `non-null`.

Ngoài ra ta cũng có thể viết đoạn code với đối tượng `non-null` một cách nhanh chóng như sau:

```php
toolbarBack?.let {
    it.scaleX = 0f
    it.scaleY = 0f
}
```

### Trở nên thành thạo hơn
Code ngắn gọn hơn không phải lúc nào cũng là điều xấu. Hãy xem ví dụ dưới đây:
```php
@Override
public View getView(int position, View convertView, ViewGroup parent) {
        if (null == convertView) {
           convertView = createView(parent);
        }
        bindView(convertView);
        return convertView;
}
```
```php
override fun getView(position: Int, convertView: View?, parent: ViewGroup) =
    (convertView ?: createView(parent)).also { bindView(it) }
```
Hai đoạn code trên thực hiện cùng một chức năng là kiểm tra xem `convertView` có null không và `getView` trong `createView (...)` hoặc trả về `convertView`. Việc thu gọn từ 8 dòng code xuống còn 2 dòng code thật sự ấn tượng đấy chứ nhỉ?

### Sự kì diệu của các lớp dữ liệu - `Data class`

Để làm cho rõ ràng hơn nữa về cách thức ngắn gọn của Kotlin, các `data class` dễ dàng quản lý như sau:
```php
public class Player {

    private final String mFirstName;
    private final String mLastInitial;
    private final Avatar mAvatar;

    public Player(String firstName, String lastInitial, Avatar avatar) {
        mFirstName = firstName;
        mLastInitial = lastInitial;
        mAvatar = avatar;
    }

    public String getFirstName() {
        return mFirstName;
    }

    public String getLastInitial() {
        return mLastInitial;
    }

    public Avatar getAvatar() {
        return mAvatar;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        Player player = (Player) o;

        if (mAvatar != player.mAvatar) {
            return false;
        }
        if (!mFirstName.equals(player.mFirstName)) {
            return false;
        }
        if (!mLastInitial.equals(player.mLastInitial)) {
            return false;
        }

        return true;
    }

    @Override
    public int hashCode() {
        int result = mFirstName.hashCode();
        result = 31 * result + mLastInitial.hashCode();
        result = 31 * result + mAvatar.hashCode();
        return result;
    }
}
```

Giờ, hãy nhìn sang bên Kotlin:
```php
data class Player( val firstName: String?, val lastInitial: String?, val avatar: Avatar?)
```

Bạn cũng nhận ra sự **vi diệu** của Kotlin rồi chứ? :D

### Mở rộng chức năng
```php
import android.os.Parcel

/**
 * Writes a single boolean to a [Parcel].
 * @param toWrite Value to write.
 */
fun Parcel.writeBoolean(toWrite: Boolean) = writeByte(if (toWrite) 1 else 0)

/**
 * Retrieves a single boolean from a [Parcel].
 */
fun Parcel.readBoolean() = 1 == this.readByte()
```
Bạn có thể gọi phương thức `writeBoolean(...)` và `readBoolean(...)` ở khắp mọi nơi với đối tượng kiểu `Parcel`. Chúng tương tự như các `public method` phải không nào?


Thêm một ví dụ đơn giản nữa nhé:

Java:
```php
getSupportFragmentManager().beginTransaction()
        .replace(R.id.quiz_fragment_container, myFragment)
        .commit();
```

Kotlin
```php
fun FragmentActivity.replaceFragment(@IdRes id: Int, fragment: Fragment) {
    supportFragmentManager.beginTransaction().replace(id, fragment).commit()
}
```

# Kết luận
Java không đi đâu cả, và sẽ còn phải một thời gian dài cho đến khi nó bị Kotlin loại bỏ hoàn toàn.
Mặt khác, Kotlin vẫn sẽ tiếp tục phát triển mạnh mẽ với ngày càng nhiều developer chuyển qua sử dụng nó. Cụ thể là, Atlassian, Pinterest, Basecamp, Coursera đều đã triển khai các tính năng mới của Kotlin vào ứng dụng di động của họ.

Còn bạn, quyết định chuyển sang Kotlin hay không là do bạn, nhưng hãy đọc lại bài viết này thêm một lần nữa để tự tin đưa ra quyết định sáng suốt cho bản thân mình nhé.


#### Nguồn tham khảo:
https://medium.com/androiddevelopers/migrating-an-android-project-to-kotlin-f93ecaa329b7