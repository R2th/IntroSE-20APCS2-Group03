Với việc càng ngày càng nhiều mẫu mã thiết bị Android ra đời thì người ta đã nghĩ ra những cách khác nhau để bố trí giao diện ứng dụng sao cho phù hợp để tận dụng diện tích màn hình. Một trong số đó là ***Fragment***. Đây là một thành phần khá quan trọng, được sử dụng rất nhiều trong những ứng dụng chuyên nghiệp, nó khá giống activity. Và trong bài viết này chúng ta cùng tìm hiểu về nó nhé ! 
# Sự ra đời và tầm quan trọng của Fragment
Mỗi một đối tượng khi ra đời đều có nguyên nhân và mục đích của nó.Vậy thì mục đích ra đời của Fragment là gì ?
Trở lại năm 2010 Steve Jobs và Apple đã cho ra mắt dòng sản phẩm iPad, thiết bị sở hữu một màn hình cảm ứng lớn (9.7 inch). Không chỉ có vậy, Apple và các Apple developers đã tối ưu hóa giao diện người dùng cho iPad ,giao diện đa cột trên một màn hình ra đời. Đây là một sản phẩm mang tính cách mạng của Apple và ngay lập tức nó đã thu về cho Apple những doanh số bán hàng khổng lồ.

![](https://images.viblo.asia/f224e8d9-e254-47d4-b2ee-9cf4f5fdf6dd.png)

Các nhà sản xuất điện thoại lúc đó như Acer hay Asus lập tức ra mắt các máy tính bảng chạy Android 2.3 mà không cho Google kịp có cơ hội viết lại Android cho phù hợp với trải nghiệm màn hình lớn. Màn hình  có đầy các khoảng trắng rất vô ích. Vì trên máy tính bảng có màn hình lớn nên người dùng có xu hướng dùng cả hai tay để thao tác, dẫn tới giao diện một cột truyền thống không những gây lãng phí không gian mà còn gây khó khăn, bất tiện cho người dùng khi thao tác.Các thiết bị máy tính bảng chạy Android 2.3 khi đó không khác gì một chiếc điện thoại với một hình lớn, thất bại đầu tiên trên thị trường máy tính bảng chạy Android so với iPad. Nhưng dù sao cũng không hi vọng nhiều vào những thiết bị "học đòi" phải không nào :).

Để bắt kịp cuộc đua với Apple cũng như sức ép từ phía các OEM, Google đã phải xây dựng một phiên bản Android đặc thù cho tablet(máy tính bảng) – Android 3.0 HoneyComb – với một loạt các thư viện mới, mà chủ yếu, là Fragment. Khi đem áp dụng vào thực tế, thì nếu so lại với giao diện iPad bên trên, thì mỗi Fragment sẽ là một cột trong một Activity lớn.

Và nguồn gốc của sự ra đời của Fragment là như vậy. Tuy nhiên, không dừng lại ở đó, Fragment đã phát triển rất nhanh và vượt cả ý tưởng ban đầu chỉ nhằm để tối ưu giao diện cho Activity.Có lẽ đã hiểu rõ ưu điểm của Fragment, ngay khi Android 4.0 Ice Cream Sandwich ra đời, thì thư viện support cho Fragment cũng xuất hiện và hỗ trợ ngược lại tới tận API4, tức Android 1.6, để các developers trước là không cần viết lại ứng dụng cho Android 2.3 về trước và 3.0 về sau, mặt khác để họ có thể tận dụng sức mạnh của Fragment trên các phiên bản Android cũ hơn.

Bạn có thể thấy sẽ có ứng dụng hoàn toàn không dùng đến Fragment, nếu UI của nó đủ đơn giản. Nhưng trong nhiều trường hợp, nếu bạn biết triển khai một Activity thành nhiều Fragment con, có thể sẽ giúp tiết kiệm khá nhiều thời gian thiết kế, xây dựng và sửa lỗi nữa đấy.
Vai trò cơ bản của Fragment đó là giúp giảm tải cho lập trình viên khi phải thiết kế giao diện linh động trên nhiều màn hình lớn nhỏ khác nhau. 

# Fragment Và Sự Tương Thích Ngược
Như bạn có thể thấy rằng, Fragment ra đời cũng bởi một lý do chính, đó là hỗ trợ giao diện trên tablet. Nên Fragment rất gắn liền với sự ra đời của tablet. Và hệ điều hành đánh dấu cho việc hỗ trợ chính thức tablet chính là hệ điều hành Android 3.0 (APL level 11).

Vậy thì, nếu project của bạn có khai báo minSdkVersion từ 11 trở lên, thì không có gì để nói. Nhưng nếu giá trị thiết lập này nhỏ hơn 11 thì hệ thống vẫn hỗ trợ tương thích ngược đến với các ứng dụng như thế này, nhưng sẽ có một chút khác biệt đối với việc quyết định sử dụng lớp Fragment.

Khi xây dựng Fragment, bạn sẽ luôn thấy có hai lựa chọn Fragment ở hai package khác nhau như hai dòng đầu tiên ở hình bên dưới. Một Fragment thuộc về android.app và một Fragment thuộc về android.support.v4.app. Tất nhiên, bạn chỉ nên sử dụng một trong hai thôi, cách chọn lựa Fragment nào để sử dụng thì mình sẽ nói rõ hơn ở dưới đây.

![](https://images.viblo.asia/60253195-edea-48de-beb2-eb521313654e.png)
Sau đây là cách chọn lựa Fragment nào dành cho project của bạn:

* Nếu minSdkVersion của ứng dụng từ 11 trở lên. Bạn cứ thoải mái sử dụng Fragment trong gói android.app như dòng đầu tiên ở hình trên. Kèm theo đó bạn phải sử dụng phương thức getFragmentManager() khi cần hiển thị động Fragment lên Activity .

* Nếu minSdkVersion của ứng dụng nhỏ hơn 11. Bạn hãy dùng đến Fragment ở gói tương thích ngược android.support.v4.app ở dòng thứ hai của hình. Nhưng khi này bạn phải dùng phương thức getSupportFragmentManager() cho mục đích hiển thị động Fragment. Và lại có ràng buộc nữa rằng Activity chứa đựng Fragment khi này không phải Activity thường mà phải là FragmentActivity. Tuy nhiên nếu bạn thấy Activity bạn dùng đang kế thừa từ AppCompatActivity rồi thì cũng yên tâm nhé, vì AppCompatActivity  hỗ trợ Fragment đến các hệ điều hành Android cũ hơn.
# Định nghĩa Fragment
Chúng ta đã biết về lịch sử ra đời của fragment rồi, vậy thì fragment thực sự là cái gì ?
> A Fragment represents a behavior or a portion of user interface in an Activity. You can combine multiple fragments in a single activity to build a multi-pane UI and reuse a fragment in multiple activities. You can think of a fragment as a modular section of an activity, which has its own lifecycle, receives its own input events, and which you can add or remove while the activity is running (sort of like a “sub activity” that you can reuse in different activities).

![](https://images.viblo.asia/ff4f3b5c-64bd-45ab-8dd8-58b8417ff1aa.jpg)

Bạn có thể hình dung Fragment chịu trách nhiệm quản lý một không gian màn hình, nhiều khi không gian này cũng chính là toàn màn hình. Và cái không gian màn hình đó của Fragment phải nằm trong một Activity nào đó. Một Activity có thể có nhiều Fragment, có khi nhiều Fragment của Activity đó cùng nhau hiển thị lên một màn hình, cũng có khi chúng luân phiên hiển thị nếu như mỗi chúng đều chiếm cả không gian màn hình. Và một ý nữa, một Fragment nào đó cũng có thể được khai báo và sử dụng bởi nhiều Activity khác nhau.

**Một số đặc điểm của Fragment mà mình đã tổng kết được:**
* Fragment là một thành phần android độc lập, được sử dụng bởi một activity, giống như một sub-activity.
* Fragment có vòng đời và giao diện riêng.
* Các Fragment thường có một file java đi kèm với file giao diện xml. Các fragment không có file giao diện xml thường được gọi là headless fragments.
* Vòng đời của fragment bị ảnh hưởng trực tiếp bởi vòng đời của activity chủ . Ví dụ, khi hoạt động bị tạm dừng, tất cả phân đoạn trong nó cũng vậy, và khi hoạt động bị hủy, tất cả phân đoạn cũng vậy.
* Một Fragment có thể được sử dụng trong nhiều Activitiy.
* Fragment được thêm vào API 11 trở lên.
* Fragment sử dụng phương thức getActivity() để lấy ra Activity cha
* Fragment được định nghĩa trong file xml của activity (static definition) hoặc có thể sửa đổi fragment khi đang chạy (dynamic definition)

Như đã nói ở trên Fragment khá giống Activity, nó cũng có các trạng thái và vòng đời riêng của mình. Chúng ta cùng tìm hiểu ở phần sau đây nhé !

# Vòng đời của một Fragment
### Giống như activity, Fragment có thể tồn tại ở các trạng thái:

***Resume(Hoạt động)***
 Fragment hiển thị trong activity đang chạy.
 
***Pause(Tạm dừng)***
 Một hoạt activity ở trong foreground và có tiêu điểm, nhưng activity mà fragment này nằm trong vẫn hiển thị (activity tở foreground mờ một phần hoặc không che phủ toàn bộ màn hình).
 
***Stop(Dừng lại)***
Cũng giống với Activity, Fragment bị dừng khi bị thành phần nào đó che khuất hoàn toàn. Hay bị gỡ ra khỏi Activity.
Dừng chưa phải là chấm hết cho đời sống của Fragment. Cụ thể là các trạng thái của nó vẫn còn được lưu trữ, để phòng trường hợp Fragment này được trở lại hiển thị cho người dùng.

***Dead(Chết)***
Nếu Fragment bị gỡ ra khỏi Activity, nhưng không được đưa vào Back Stack trước đó, thì nó sẽ kết thúc vòng đời. Hoặc Activity chứa Fragment này bị gỡ khỏi Back Stack, Fragment cũng sẽ chết theo.

### Sơ đồ vòng đời của Fragment
![](https://images.viblo.asia/c81498d3-405d-4763-a814-63b92e73f675.png)


***onAttach()***

Callback này được gọi khá sớm, ngay khi Activity chứa nó được kích hoạt. Hoặc ngay khi được gắn vào Activity.
Callback này được gọi một lần duy nhất trong vòng đời Fragment.

***onCreate()***

Callback này được gọi khi Fragment bắt đầu khởi tạo từ các dữ liệu đầu vào.
Khác với onCreate() của Activity, rằng bạn có thể tạo giao diện cho màn hình ở callback này, thì với Fragment chúng ta còn phải đợi qua callback tiếp theo mới có thể tạo giao diện được.
Callback này cũng được gọi một lần trong vòng đời Fragment.  Bạn nên khởi tạo các thành phần cơ bản của Fragment mà bạn muốn duy trì khi Fragment bị dừng hoặc tạm dừng, sau đó được phục hồi lại.



***onCreateView()***

Khi Fragment bắt đầu vẽ UI lên màn hình, callback này được gọi. Nên chúng ta sẽ tận dụng callback này cho các thiết lập về giao diện.
Bạn thấy rằng, theo như sơ đồ trên, thì callback này sẽ được gọi lại khi mà Fragment được gỡ ra khỏi Activity nhưng được đưa vào Back Stack, và được gọi lại hiển thị sau đó.

***onActivityCreated()***

Callback này được gọi ngay sau khi onCreateView() được gọi. Nó báo hiệu trạng thái Activity chứa nó được khởi tạo hoàn toàn. Tuy ít được sử dụng hơn các callback khác, nhưng bạn cũng có thể tận dụng nó để thay đổi giao diện hay các tương tác với Activity chứa Fragment này thoải mái được rồi.

***onStart()***

Khi Fragment bắt đầu được nhìn thấy bởi người dùng và chuẩn bị nhận tương tác.

***onResume()***

Người dùng hoàn toàn nhìn thấy và tương tác được với Fragment.

***onPause()***

Callback này như một dấu hiệu cho thấy rằng người dùng đang rời khỏi Fragment hiện tại.

***onStop()***

Fragment chính thức không còn được nhìn thấy nữa.

***onDestroyView()***

Chắc chắn là đối tượng View sẽ bị hủy ở callback này. Và do đó các khởi tạo view của bạn ở onCreateView() sẽ nhanh chóng không còn nữa.
Nếu như Fragment được đưa vào Back Stack, thì khi được lấy ra lại sau đó, callback onCreateView() sẽ được gọi lại.

***onDestroy()***

Callback này chỉ như một lời “nhắc nhở” về vận mệnh của Fragment mà thôi.

***onDetach()***

Callback này gọi đến báo hiệu Fragment sẽ được gỡ khỏi Activity đang chứa nó. Kết thúc vòng đời của Fragment.

Lý thuyết có vẻ hơi nhiều rồi, bây giờ chúng ta cùng đi vào thực hành tạo một Fragment nhé.

# Tạo một Fragment
Một điều vô cùng quan trọng là Fragment không bao giờ tách khỏi Activity. Muốn dùng Fragment thì bạn phải đặt hoặc gọi từ Activity.

Có hai cách để đặt/gọi Fragment từ Activity. 
### Static Fragment
Bạn đặt “cứng” trong file contentView XML của activity với thẻ <fragment>.
    
Ví dụ ta có 2 static fragment là MyFragment1.java(fragment1.xml) và MyFragment2.java(fragment2.xml). 
Trong file activity_main.xml khai báo tĩnh
```
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="horizontal"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
 
    <fragment class="me.myapp.MyApp.MyrFragment1"
              android:id="@+id/fragment_one"
              android:layout_weight="1"
              android:layout_width="0dp"
              android:layout_height="match_parent" />
 
    <fragment class="me.myapp.MyApp.MyrFragment2"
              android:id="@+id/fragment_two"
              android:layout_weight="2"
              android:layout_width="0dp"
              android:layout_height="match_parent" />
 
</LinearLayout>
```
Thuộc tính class chỉ đến đường dẫn chứa file java tương ứng.

**Chú ý:** Bắt buộc phải có thuộc tính android:id. Nếu không sẽ gây lỗi.

Hai class MyFragment1.java và MyFragment2.java phải extends Fragment
Và phải ghi đè phương thức onCreateView:
```
public View onCreateView(LayoutInflater inflater, ViewGroup container, Bundle savedInstanceState) {
    super.onCreateView(inflater, container, savedInstanceState);
    View view = inflater.inflate(R.layout.fragment1, container, false);
    return view;
}
```
Định nghĩa hai file fragment1.xml và fragment2.xml như sau:

fragment1.xml

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:background="#FF0000"
    android:layout_height="match_parent">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="fragment 1"
        android:textSize="30dp"
        android:layout_gravity="center"
        />
</LinearLayout>
```
fragment2.xml
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    android:orientation="vertical" android:layout_width="match_parent"
    android:background="#AA0099"
    android:layout_height="match_parent">
    <TextView
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="fragment 2"
        android:textSize="30dp"
        android:layout_gravity="center"
        />
</LinearLayout>
```

**Kết quả:**

![](https://images.viblo.asia/49b49d1f-b10f-4be4-9f6d-73845ee48afe.png)

### Dynamics Fragment

Nếu như với cách hiển thị tĩnh trên kia, bạn phải chỉ định thẻ fragment nào sẽ chứa đựng Fragment nào một cách cố định. Thì với cách hiển thị động này, bạn chỉ cần khai báo một vùng không gian nào đó sẽ chứa đựng Fragment.

Ví dụ:
Sửa lại file maiv_activity ở ví dụ trên như sau:

```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:orientation="vertical"
    android:layout_width="match_parent"
    android:layout_height="match_parent">

    <FrameLayout
        android:id="@+id/frame_layout"
        android:layout_width="match_parent"
        android:layout_height="300dp">
    </FrameLayout>

    <Button
        android:id="@+id/btn_add"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:text="add fragment" />

</LinearLayout>
```
Và trong file MainActivity , sửa lại cũng sửa lại thành:
```
public class MainActivity extends AppCompatActivity {

    Button btn;
    FragmentManager fm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.main_activity);

        fm = getSupportFragmentManager();

        btn = (Button) findViewById(R.id.btn_add);
        btn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                FragmentTransaction ft_add = fm.beginTransaction();
                ft_add.add(R.id.frame_layout, new MyFragment1());
                ft_add.commit();
            }
        });
    }
}
```
Ở đây mình dùng Fragment ở gói tương thích ngược android.support.v4.app nên phải dùng phương thức getSupportFragmentManager() .

**Kết quả:**

![](https://images.viblo.asia/190cedda-bc0e-4244-b663-015507fd58b7.png)

Ở vú dụ trên mình đã dùng 2 lớp FragmentTransaction và FragmentManager, để biết tác dụng của 2 lớp này chúng t acungf tìm hiểu ở phần sau đây.

# Quản lý Fragment
**FragmentManager**

Đây là một lớp dùng để quản lý các Fragment, lớp này được tích hợp vào trong mỗi Activity để giúp các Activity có thể dễ dàng để thêm (add), xóa (remove) hoặc thay thế (replace) các Fragment ra khỏi một vùng không gian một cách linh động.

Có hai lớp FragmentManager mà bạn có thể cân nhắc sử dụng.

![](https://images.viblo.asia/b0d0b8ec-9410-4d30-bdc1-d628de8db66f.png)

* FragmentManager ở gói android.app – Được gọi thông qua phương thức *getFragmentManager() *của Activity sử dụng khi  project của bạn khai báo minSdkVersion lớn hơn 11.

* FragmentManager ở gói android.support.v4.app – Được gọi thông qua phương thức *getSupportFragmentManager()* của Activity. Nếu project của bạn khai báo minSdkVersion nhỏ hơn 11 thì bạn buộc phải dùng lớp quản lý này để có thể mang Fragment đến với các hệ điều hành trước Android 3.0.

Lớp này có một phương thức rất hữu dụng đó là.

*findFragmentById()* – Khi dùng phương thức này bạn sẽ truyền vào cho nó một ID. ID này có thể là ID của thẻ fragment như với mục hiển thị tĩnh . Hoặc ID của Layout chứa Fragment như ví dụ tạo Fragment động như trên. Kết quả của phương thức này sẽ trả về cho bạn một Fragment được chứa trong layout có ID mà bạn vừa cung cấp.

**FragmentTransaction**

Khi đã có FragmentManager, bạn bắt đầu thực hiện việc thêm, xóa, thay đổi thoải mái các Fragment dựa vào FragmentTransaction này. Bạn có thể “triệu hồi” FragmentTransaction thông qua phương thức beginTransaction() từ FragmentManager.

FragmentTransaction có các phương thức thú vị để bạn quản lý các Fragment như sau.

* add()* – Khi FrameLayout còn rỗng, tức chưa chứa đựng bất kỳ Fragment nào, thì bạn có thể dùng phương thức này để add Fragment vào cho FrameLayout đó. Như bạn sắp làm quen với code add một FirstFragment sau đây.

* *replace()* – Khi bạn muốn thay thế một Fragment đang có sẵn ở FrameLayout bằng một Fragment nào đó khác.

* *remove(*) – Khi bạn muốn gỡ bỏ Fragment ra khỏi một FrameLayout nào đó.

* *addToBackStack()* – Khi bạn quản lý Fragment bởi các phương thức replace() hay remove() trên đây, bạn có thể sử dụng thêm phương thức addToBackStack() này. Nếu bạn gọi đến phương thức này trước khi gọi commit() sẽ được nói ở dưới, thì hệ thống sẽ đưa Fragment ở transaction hiện tại vào Back Stack. Điều này có ý nghĩa là, Fragment bị thay thế hay bị gỡ ra khỏi Layout  ở transaction này sẽ không bị xóa khỏi hệ thống mà vẫn còn được quản lý bên trong Back Stack. Và do Fragment không bị hủy khỏi Back Stack, nên nếu user nhấn nút back sau đó, họ hoàn toàn có thể quay trở lại với Fragment trước đó đã bị gỡ ra.

* *commit()* – Cho dù bạn có quản lý hiển thị Fragment bằng add(), replace() hay remove() thì bạn cũng phải gọi commit() cuối cùng, để FragmentTransaction biết sẽ bắt đầu thực hiện các transaction mà bạn đã ra lệnh đó.

Ví dụ sử dụng FragmentManager và Fragment Transaction:
```
FragmentManager fm = getFragmentManager();

// add
FragmentTransaction ft_add = fm.beginTransaction();
ft_add.add(R.id.your_placehodler,new YourFragment());
ft_add.commit();

// replace
FragmentTransaction ft_rep = fm.beginTransaction();
ft_rep.replace(R.id.your_placehodler, new YourFragment());
ft_rep.commit();

// remove
Fragment fragment = fm.findFragmentById(R.id.your_placehodler);
FragmentTransaction ft_remo = fm.beginTransaction();
ft_remo.remove(fragment);
ft_remo.commit();
```

# **Kết bài**
Đây là bài viết đâu tiên của mình trên Viblo.Bài viết dựa trên hiểu biết của mình và những tài liệu hữu ích trên internet. Nếu có câu hỏi hay bổ sung thỏa luận thì comment ở dưới nhé.Rất mong được nhận góp ý của các bạn .
Cảm ơn đã đọc đến cuối bài nhé :).

Tài liệu tham khảo:

1.https://developer.android.com/guide/components/fragments.html

2.https://kipalog.com/

3.https://viblo.asia

4.https://yellowcodebooks.com

5.http://eitguide.net