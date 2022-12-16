# Sử dụng RecyclerView
## 1 Overview
RecyclerView là một ViewGroup nó được dùng để chuẩn bị và hiện thị các View tương tự nhau. RecyclerView được cho là sự kế thừa của ListView và GridView , và nó được giới thiệu trong phiên bản [suport-v7](https://developer.android.com/reference/android/support/v7/app/package-summary) mới nhất.  Một trong những lý do khiến RecyclerView được ưa chuộng là nó là một framework có thể mở rộng, và đặc biệt nó cung cấp khả năng triển khai cả bố cục Hozizontal và Vertical. Sử dụng RecyclerView khi mà data có các thành phần thay đổi trong quá trình chạy dựa trên hành động của người dùng hoặc các dự kiện mạng.

Nếu muốn sử dụng RecyclerView, bạn sẽ cần làm việc với các thành phần sau:
![](https://images.viblo.asia/fe297888-aac1-4cad-b3da-2162965f6adc.png)

* RecyclerView.Adapter :  đây là nơi xử lý dữ liệu và gán cho View.
* Layoutmanager: xác định ra vị trí của các item trong RecyclerView.
* ItemAnimator: Tạo hiệu ứng cho các hành động thêm , sửa, xóa các item điều này rất khó thực hiện với phiên bản tiền nhiệm (ListView)

Ngoài ra Recyclerview còn triển khai ViewHolder Parternn . ViewHolder Partern đã được khuyến khích sử dụng với ListView nhưng với RecyclerView nó đã được tích hợp sẵn thật đơn giản phải không ạ? 
## 2 Nó hoạt động như thế nào?
![](https://images.viblo.asia/9e976ef4-ab85-400a-9c54-7321158e6e17.png)
Một khi RecyclerView được kết nối với Adapter , Adapter sẽ tạo ra đối tượng  của các hàng (ViewHolder object) cho đến khi lấp đầy kích thước của RecyclerView và lưu trong HeapMemory . Sau đó sẽ không tạo thêm bất kỳ hàng nào để lưu trong bộ nhớ nữa
Theo cách này nếu ngườ dùng trượt danh sách, các item đã trượt khỏi màn hình sẽ được giữ ở trong bộ nhớ để tái sử dụng lại sau và mỗi khi một hàng mới được chèn vào màn hình thì đối tượng ViewHolder được lưu trong bộ nhớ sẽ được mang ra để tái sử dụng và gán dữ liệu .  Nếu không gán lại dữ liệu cho ViewHolder object thì sẽ hiện thị dữ liệu được gán trước đó. Theo cách này thì kể cả danh sách có 1000 item, thì chỉ có khoảng 7 đối tượng ViewHolder được tạo ra .

RecyclerView đã được thiết kế bao gồm nhiều việc tối ưu hóa do đó chùng ta không cần làm những điều sau:
- Khi danh sách được hiển thị lần đầu tiên , nó sẽ gán dữ liệu cho một vài ViewHoler object . Ví dụ nếu các View hiển thị trên màn hình có vị trí từ 0 - 9 , thì RecyclerView sẽ tạo và gán dữ liệu cho các ViewHolder đó, ngoài ra còn tạo thêm và gán dữ liệu cho View thứ 10 . theo cách này thì nếu người dùng trượt danh sách , thế View kế tiếp đã sẵn sàng để hiển thị .
- Nếu người dùng trượt danh sách , RecyclerView sẽ tạo mới một ViewHolder object nếu nó thực sự cần thiết. Và nó cũng lưu lại các ViewHolder object đã bị trượt khỏi màn hình để tái sử dụng lại sau. Nếu người dùng đổi hưởng trượt  thì các ViewHolder Object vừa bị trượt ra khỏi màn hình ngay lập tức . Mặt khác nếu người dùng trượt danh sách theo cùng một hướng thì những ViewHolder nào bị trượt khỏi màn hình xa nhất sẽ được mang quay trở lại để gán dữ liệu mới. Viewholder sẽ không cần được tạo mới mà chỉ cập nhật dữ liệu của chúng.
- Khi các item được hiển thị thay đổi, bạn có thể thông báo cho adapter bằng cách gọi một phương thức RecyclerView.Adapter.notify ... () thích hợp. Mình sẽ nói rõ ở phần Adapter

## 3 Các thành phần của RecyclerView

#### LayoutManagers
Một RecyclerView cần có một  layout manager và một adapter để được khởi tạo. Layout manager sẽ xác định các item bên trong RecyclerView được hiển thị như thế nào và khi nào phải tái sử dụng lại các item view ( những item đã bị trượt khỏi màn hình)
![](https://images.viblo.asia/66eb083f-042f-4cc3-9050-b6c7e1b977dd.jpg)
* LinearLayoutManager : hiển thị các item trong danh sách có thể cuộn theo chiều dọc (horizontal) hoặc chiều ngang ( Vertical).
![](https://images.viblo.asia/fcb06cbc-c9b7-4c73-ab82-8399eb592e48.gif)


* GridLayoutManager : hiển thị các item trong danh sách theo dạng lưới  .
![](https://images.viblo.asia/7b54b56d-e468-4242-89e4-05976c55a0a2.png)
* StaggeredGridLayoutManager : hiển thị các item trong danh sách theo dạng lưới  so le nhau.
Để tạo ra một custom layout manager, thì phải kế thừa [RecyclerView.LayoutManager](https://developer.android.com/reference/android/support/v7/widget/RecyclerView.LayoutManager) class.

Đây là video của  [Dave Smith's](https://www.youtube.com/watch?v=gs_C1E8HwvE&index=22&list=WL) trình bày về custom layout manager 

Một chú ý quan trọng đối với Layout manager là nếu không khai báo layout manager thì RecyclerView sẽ không hiển thị và cửa số log cat sẽ thông báo:

Notes: In recent version of the Support Library, if you don't explicitly set the LayoutManager, the RecyclerView will not show! There is a Logcat error though E/RecyclerView: No layout manager attached; skipping layout

#### RecyclerView.Adapter
![](https://images.viblo.asia/2d9240fd-62fc-4818-aa02-63bb2d660021.png)
RecyclerView sẽ bao gồm một loại adapter mới nó hoạt động tương tự với các loại adapter bạn đã sử dụng trước đó nhưng có một vài điểm khác bọt như yêu cầu ViewHolder . Và bạn sẽ phải overide lại 3 phương thức chính.
Hãy cùng xem bức ảnh dưới đây để hiểu về 3 phương thức này nhé :
![](https://images.viblo.asia/2aa7e875-959d-44e9-a022-488051c0b2d3.png)

Adapter sẽ làm gần như tất cả các công việc cho RecyclerView nó kết nối Datasource vơi các View item.
1. Để vẽ được danh sách trên màn hình ,RecyclerView sẽ hỏi Adapter sẽ có tổng cộng bao nhiêu item. Và Adapter của chúng ta sẽ trả lời thông tin này ở trong hàm getItemCount().
2. Bất cứ khi nào RecyclerView quyết định nó cần tạo một ViewHolder và lưu trong bộ nhớ, nó sẽ gọi onCreateViewHolder (). Trong phương thức này, Adapter trả về bố cục xml .
3. Mỗi khi ViewHolder được tạo trước đó được sử dụng lại, RecyclerView sẽ bảo Adapter cập nhật dữ liệu của nó. Bạn tùy chỉnh quy trình này bằng cách ghi đè lên BindViewHolder().

#### ItemAnimator
RecyclerView.ItemAnimator sẽ tạo ra các hoạt ảnh cho ViewGroup khi các item thay đổi như thêm, sửa, xóa. DefaultItemAnimator được sử dụng cho các hoạt ảnh cơ bản và nó hoạt động khá ổn. Các bạn có thể xem thêm phần dưới này để có thêm thông tin.

### Sử dụng RecyclerView
Để sử dụng RecyclerView sẽ có 7 bước chính sau đây:

* Thêm RecyclerView support library vào gradle build file
* Định nghĩa ra model class để sử dụng  data source
* Thêm  RecyclerView vào trong activity mà bạn muốn hiển thị
* Tạo một tệp XML để xác định một item được biểu diễn như nào
* Tạo ra RecyclerView.Adapter và ViewHolder để gán dữ liệu cho các item
* Kết nối adapter với data source để đưa vào  RecyclerView
Mình sẽ trình bày chi tiết ở phần dưới ..

#### Cài đặt thư viện
Đảm bảo bạn đã thêm RecyclerView suport library vào dependency trong app/build.gradle:
```
dependencies {
    ...
    implementation 'com.android.support:design:28.0.0'
}
```
Sau đó ấn  "Sync Project with Gradle files" để IDE download những resouce cần thiết.
#### Định nghĩa ra Model
Mỗi RecyclerView cần có một nguồn dữ liệu. Trong trường hợp này tôi sẽ tạo ra một lớp Hero đại diện cho data model sẽ được hiển thị bởi RecyclerView :
```
public class Hero {
    private String mName;
    private int mImage;

    public Hero(String mName, int mImage) {
        this.mName = mName;
        this.mImage = mImage;
    }

    public String getName() {
        return mName;
    }

    public void setName(String mName) {
        this.mName = mName;
    }

    public int getImage() {
        return mImage;
    }

    public void setImage(int mImage) {
        this.mImage = mImage;
    }
}
```
#### Thêm RecyclerView vào trong layout
bên trong  file layout của activity mà bạn muốn hiển thị res/layout/activity_hero.xml, hãy thêm  RecyclerView từ support library vào:
```
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context=".MainActivity">

    <android.support.v7.widget.RecyclerView
        android:id="@+id/recyclerHero"
        android:layout_width="0dp"
        android:layout_height="0dp"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

</android.support.constraint.ConstraintLayout>
```
ở trong phần preview chúng ta có thể thấy Recyclerview ở trong layout của activity:
![](https://images.viblo.asia/3ddfeec2-ac61-4600-8a7a-b75738e6e971.PNG)
Giờ đây RecyclerView đã được nhúng vào activity layout file. Kế tiếp chúng ta sẽ định nghĩa ra layout cho mỗi item của danh sách
#### Tạo ra Custom row layout 
Trước khi tạo ra Adapter , hãy định nghĩa ra XML layout file sử dụng cho mỗi row của danh sách. item layout file dưới đây chỉ chứa một ImageView hiển thị ảnh của Hero và một TextView hiển thị tên Hero.
```
<?xml version="1.0" encoding="utf-8"?>
<android.support.constraint.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:app="http://schemas.android.com/apk/res-auto"
    xmlns:tools="http://schemas.android.com/tools"
    android:layout_width="match_parent"
    android:layout_height="wrap_content">

    <ImageView
        android:id="@+id/image_hero"
        android:layout_width="0dp"
        android:layout_height="@dimen/dp_180"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        android:scaleType="center"
        app:layout_constraintBottom_toBottomOf="parent"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="parent" />

    <TextView
        android:id="@+id/text_name"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_marginStart="8dp"
        android:layout_marginTop="8dp"
        android:layout_marginEnd="8dp"
        android:layout_marginBottom="8dp"
        android:text="TextView"
        android:textColor="#FFF"
        app:layout_constraintBottom_toBottomOf="@+id/image_hero"
        app:layout_constraintEnd_toEndOf="parent"
        app:layout_constraintHorizontal_bias="0.112"
        app:layout_constraintStart_toStartOf="parent"
        app:layout_constraintTop_toTopOf="@+id/image_hero"
        app:layout_constraintVertical_bias="1.0" />
</android.support.constraint.ConstraintLayout>
```
Sau khi đã tạo custom layout xong , hãy tạo ra Adapter để hiển thị data cho RecyclerView.

#### Tạo ra RecyclerView.Adapter
Tại đây chúng ta sẽ tạo ra Adapter là nơi xử lý dữ liệu và gán data cho RecyclerVIew.  Vai trò của Adapter sẽ chuyển đổi một object tại một vị trí trở thành 1 hàng của danh sách sẽ được gắn vào RecyclerView.

Tuy nhiên đối với RecyclerView Adapter sẽ yêu cầu "ViewHolder" object trong đó mô tả và cung cấp quyền truy cập vào tất cả các View trong mỗi item row.
Chúng ta sẽ tạo ra một Adapter và holder bên trong HeroAdapter như sau:
```
public class HeroAdapter extends 
RecyclerView.Adapter<HeroAdapter.ViewHolder> {

    public class ViewHolder extends RecyclerView.ViewHolder {
        private ImageView mImageHero;
        private TextView mTextName;

        public ViewHolder(@NonNull View itemView) {
            super(itemView);
            mImageHero = itemView.findViewById(R.id.image_hero);
            mTextName = itemView.findViewById(R.id.text_name);
        }
    }
}
```

Chúng ta đã có một Adapter và ViewHolder, giờ sẽ hoàn thiện nốt Adapter . Đầu tiên tạo ra các biến cho danh sách các Hero và truyền chúng qua hàm tạo:
```
public class HeroAdapter extends
RecyclerView.Adapter<HeroAdapter.ViewHolder> {
    private Context mContext;
    private ArrayList<Hero> mHeros;

    public HeroAdapter(Context mContext, ArrayList<Hero> mHeros) {
        this.mContext = mContext;
        this.mHeros = mHeros;
    }
```
Mọi Adapter sẽ có 3 phương thức quan trọng:
```
public class HeroAdapter extends RecyclerView.Adapter<HeroAdapter.ViewHolder> {
    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        LayoutInflater inflater = LayoutInflater.from(mContext);
        View heroView = inflater.inflate(R.layout.item_hero, parent, false);
        ViewHolder viewHolder = new ViewHolder(heroView);
        return viewHolder;
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        Hero hero = mHeros.get(position);
        Glide.with(mContext)
                .load(hero.getImage())
                .into(holder.mImageHero);
        holder.mTextName.setText(hero.getName());
    }

    @Override
    public int getItemCount() {
        return mHeros.size();
    }
```
#### Kết nối Adapter với RecyclerView
```
public class HeroActivity extends AppCompatActivity {
    private ArrayList<Hero> mHeros ;
    private RecyclerView mRecyclerHero;
    private HeroAdapter mHeroAdapter ;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_hero);
        mRecyclerHero = findViewById(R.id.recyclerHero);
        mHeros = new ArrayList<>();
        createHeroList();
        mHeroAdapter = new HeroAdapter(this,mHeros);
        mRecyclerHero.setAdapter(mHeroAdapter);
        mRecyclerHero.setLayoutManager(new LinearLayoutManager(this));
    }

    private void createHeroList() {
        mHeros.add(new Hero("Thor",R.drawable.image_thor));
        mHeros.add(new Hero("IronMan",R.drawable.image_ironman));
        mHeros.add(new Hero("Hulk",R.drawable.image_hulk));
        mHeros.add(new Hero("SpiderMan",R.drawable.image_spiderman));
        mHeros.add(new Hero("Thor",R.drawable.image_thor));
        mHeros.add(new Hero("IronMan",R.drawable.image_ironman));
        mHeros.add(new Hero("Hulk",R.drawable.image_hulk));
        mHeros.add(new Hero("SpiderMan",R.drawable.image_spiderman));
        mHeros.add(new Hero("Thor",R.drawable.image_thor));
        mHeros.add(new Hero("IronMan",R.drawable.image_ironman));
    }
}
```
Giờ hãy biên dịch và chạy kết quả sẽ như thế này :
![](https://images.viblo.asia/157960bc-862e-4ac0-a76c-68d0826b1593.jpg)
Bài viết của mình đến đây đã khá dài mình xin viết tiếp, ở bài viết sau.. Cảm ơn các bạn đã dành thời gian để đọc bài viết của mình!!!!!