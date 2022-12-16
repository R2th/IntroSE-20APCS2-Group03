Việc mở nhiều Activity và pass Data để thực hiện một công việc nào đó, nó không còn xa lạ gì với những Android Developer. Nhưng nếu cứ thực hiện liên tục 1 công việc lặp đi lặp lại sẽ thật buồn chán, tất nhiên sẽ có nhiều phản biện rằng: cách đó là tốt rồi. Điều này sẽ được đề cập từ từ được không nhỉ ^^ Chúng ta cùng nhau tìm ra một cách làm MỚI và xem nó có sự khác biệt gì nha. :)
Trước tiên mình cũng nêu ra mấy cách làm thông thường ta hay dùng thông qua một Ví dụ để trực quan nhất.
**Ví dụ:**
Một màn hình sẽ hiển thị thông tin (như hình dưới) đây là Activity `TomDetailActivity`, tại đây cần show mấy thông tin được nhận từ `MainActivity` truyền sang.

![](https://images.viblo.asia/5620cc40-bc3e-4c7c-ad98-d9a8e1974d74.png)

### 1. Cách làm cũ
**Sử dụng Intent và Bundle**

Đây là một cách làm thường xuyên nhất mà mỗi Developer hay dùng, nó cũng khá đơn giản để áp dụng. Nếu mà chia nhỏ ra thì sẽ có 2 cách.

***Intent :***

`MainActivity.java`

```
private void serializeTomData() {
        Intent intent = new Intent(this, TomDetailActivity.class);
        intent.putExtra(Common.NAME_KEY, "Dr. Tom Pro");
        intent.putExtra(Common.NAME_KEY, "Eat. Climbing. Love mouse.");
        intent.putExtra(Common.NAME_KEY, R.drawable.ic_avatar_tom);
        startActivity(intent);
    }
```

***Bundle:***

`MainActivity.java`

```
private void serializeTomDataWithBundle() {
        Intent intent = new Intent(this, TomDetailActivity.class);
        Bundle bundle = new Bundle();
        bundle.putString(Common.NAME_KEY, "Dr. Tom Pro");
        bundle.putString(Common.NAME_KEY, "Eat. Climbing. Love mouse.");
        bundle.putInt(Common.NAME_KEY, R.drawable.ic_avatar_tom);
        intent.putExtra(Common.EXTRA_TOM, bundle);
        startActivity(intent);
    }
```

Với 2 cách làm trên thì đều có chung 1 cách nhận data ở bên màn `TomDetailActivity` và code dưới đây mình xử lý trong method `onCreate()`, mình đã note trong comment code luôn :)

`TomDetailActivity.java`

```
public class TomDetailAct extends AppCompatActivity {

    private String name;
    private String shortBio;
    private int idAvatar;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tom_detail);
        Intent intent = getIntent();
        /*
        * Apply for Bundle way
        * bundle != null
        * name = bundle.getString(Common.NAME_KEY)
        * */
//        Bundle bundle = intent.getBundleExtra(Common.EXTRA_TOM);
//        if (bundle == null) return;
        name = intent.getStringExtra(Common.NAME_KEY);
        shortBio = intent.getStringExtra(Common.SHORT_BIO_KEY);
        idAvatar = intent.getIntExtra(Common.PROFILE_PHOTO_ID, 0);
    }
}
```

**Serializable & Parcelable**

Thiết nghĩ rằng đây là một cải tiến khá hay trong Passing Data, chúng ta thường áp dụng cho Object có nhiều thuộc tính và có nhiều ưu điểm hơn so với cách làm trên: như tốc độ truyền,... Bạn có thể đọc thêm về [Parcelable](https://developer.android.com/reference/android/os/Parcelable)
Cả 2 cách dùng này Android đều support bằng việc dùng Intent hoặc Bundle đều được. Và ở đây mình sẽ demo code dùng Serializable, với Parcelable nếu bạn chưa biết thì đọc tài liệu ở trên rồi làm tương tự như cách này của mình là được thôi.

Trước tiên bạn có một Object chung có các thông tin cần truyền (name, bio, avatarId) , gọi chung đó là **User.class**

`User.java`

```
public class User implements Serializable {

    private String name;
    private String shortBio;
    private int photoId;

    public User(String name, String shortBio, int photoId) {
        this.name = name;
        this.shortBio = shortBio;
        this.photoId = photoId;
    }
}
```

Bạn sửa lại MainActivity và TomDetailActivity một chút như sau:

`MainActivity.java`

```
private void serializeTomData() {
        Intent intent = new Intent(this, TomDetailActivity.class);
        User user = new User("Dr. Tom Pro", "Eat. Climbing. Love mouse.", R.drawable.ic_avatar_tom);
        intent.putExtra(Common.EXTRA_TOM, user);
        startActivity(intent);
    }
```

`TomDetailActivity.java`

```
public class TomDetailActivity extends AppCompatActivity {

    private User mUser;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_tom_detail);
        Intent intent = getIntent();
        mUser = (User) intent.getSerializableExtra(Common.EXTRA_TOM);
    }
}
```

=> **Nhận xét qua 4 cách làm trên:**
1. Serialization : putExtra(*key*, *value*)
2. Deserialization: getStringExtra(*key*)

Đó là những điểm chung ta có thể thấy ngay, nhưng nếu chúng ta có đến vài chục hay hàng trăm Activity như trên mà mỗi cái có 1 sự sai sót về dữ liệu (chưa hề biết được là do bên truyền hay bên nhận). Như thế sẽ mất gấp đôi thời gian để checking. Đó là về lý thuyết còn trên thực tế effort cho việc debug nó có thể lớn hơn nhiều đó.
Trước thực tế như vậy, chúng ta cùng xem giải pháp tiếp theo sẽ là gì ? :)

### 2. CÁCH LÀM MỚI

Từ nhận xét ở trên điểm chung quan trọng nhất : putExtra(*key*, *value*) rồi lấy dữ liệu ra : getStringExtra(*key*)
Vậy mình sẽ tạo ra 1 interface có 2 method `intent` : lấy ra intent để mở ra activity mới và method `launch` : khởi động chính activity đó. Interface này được gọi là `ActivityArgs`

`ActivityArgs.kt`

```
interface ActivityArgs {

  /**
   * @return returns an intent that can be used to launch this activity.
   */
  fun intent(activity: Context): Intent

  /**
   * Launches the activity given your activity context.
   *
   * The default implementation uses the intent generated from [intent]
   */
  fun launch(activity: Context) = activity.startActivity(intent(activity))
}
```

Tiếp theo, tạo một class thực thi bước quan trọng ở trên : `TomProfileActivityArgs` , tại đây bạn xử lý logic về việc convert data phức tạp hay chỉ đơn giản là passing - receiving.

`TomProfileActivityArgs.kt`

```
/**
 * Arguments to launch [TomDetailActivity]
 */
private const val NAME_KEY = "name_key"
private const val SHORT_BIO_KEY = "short_bio_key"
private const val PROFILE_PHOTO_ID = "profile_photo_id_drawable"

data class TomProfileActivityArgs(
    var name: String,
    var shortBio: String,
    var profilePhotoId: Int
) : ActivityArgs {

  override fun intent(activity: Context): Intent = Intent(
      activity, TomDetailActivity::class.java
  ).apply {
    putExtra(NAME_KEY, name)
    putExtra(SHORT_BIO_KEY, shortBio)
    putExtra(PROFILE_PHOTO_ID, profilePhotoId)
  }

  companion object {
    fun deserializeFrom(intent: Intent): TomProfileActivityArgs {
      return TomProfileActivityArgs(
          name = intent.getStringExtra(NAME_KEY),
          shortBio = intent.getStringExtra(SHORT_BIO_KEY),
          profilePhotoId = intent.getIntExtra(PROFILE_PHOTO_ID, 0)
      )
    }
  }
}
```

Việc còn lại khá đơn giản, hãy launch activity **TomDetailActivity** ở bất kì đâu bạn muốn. Chỉ việc gọi method *launch(context)*  như đã định nghĩa thôi. Mình sẽ thực hiện nó trong MainActivity code dưới đây

`MainActivity.kt`

```
@SuppressLint("Registered")
class MainActivity : AppCompatActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_main)
    btn_detail.setOnClickListener({ goToTomProfile() })
  }

  private fun goToTomProfile() {
    TomProfileActivityArgs(
        "Dr. Tom Pro",
        "Eat. Climbing. Love mouse.",
        R.drawable.ic_avatar_tom
    )
        .launch(this)
  }
}
```

Bên TomDetailActivity gọi method deserializeFrom(intent) để lấy data ra thôi.

`TomDetailActivity.kt`

```
@SuppressLint("Registered")
class TomDetailActivity : AppCompatActivity() {

  private val args by lazy {
    TomProfileActivityArgs.deserializeFrom(intent)
  }

  override fun onCreate(savedInstanceState: Bundle?) {
    super.onCreate(savedInstanceState)
    setContentView(R.layout.activity_tom_detail)
    avatar.setImageResource(args.profilePhotoId)
    name.setText(args.name)
    bio.setText(args.shortBio)
  }
}
```

### 3. Demo

Mình cũng đã thực hiện 1 demo để cách bạn dễ dàng theo dõi trực tiếp 

![](https://images.viblo.asia/23706438-80af-46b7-b521-8199343a719d.gif)

### 4. Tổng kết

Với cách làm mới này mình có thể dễ dàng care những sai sót trong quá trình truyền dữ liệu và tiết kiệm effort rất nhiều, vì mình chỉ quan tâm tới những class mang tên **ActivityArgs**  như : **TomDetailActivityArgs**

Maintain sẽ thuận tiện hơn rất nhiều khi có sự thay đổi yêu cầu, hiển thị thêm thông tin hoặc giảm bớt thông tin đi, chỉnh sửa convention name key, v.v..  những việc đó rất dễ dàng.

Cuối cùng mình hy vọng phương pháp trên đem lại sự hữu ích và thú vị cho các bạn!!!

[Download Github Source](https://github.com/thanhviet-ucan/LaunchActivityBetter)