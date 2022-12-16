# 1. Giới thiệu
Thông thường, để hiện thị một list dữ liệu lớn mình sẽ nghĩ ngay đến việc sử dụng RecyclerView. Nhưng để sử dụng được RecyclerView thì bạn phải implement adapters, viewholders, ... và nó khá tốn effort để tạo ra một list các items. Dựa vào những yếu tố đó, Groupie được sinh ra.

Groupie là một thư viện đơn giản và linh hoạt để tạo ra các RecyclerView layouts phức tạp. Groupie coi content mà bạn muốn hiển thị là logic group, nó giúp bạn xử lý các thông báo thay đổi từ user. Dễ dàng xử lý update, insert nội dụng không đồng bộ và những sự thay đổi content từ phía user. Mỗi item, nó có sẵn các abstract của item view types, item layouts, viewholders, span sizes.

![](https://images.viblo.asia/5f2820b6-6b93-4280-b294-796573737df7.png)  ![](https://images.viblo.asia/8ee13c27-f0d5-4048-879a-d27d00508ec8.png)



# 2. Import thư viện

Setup trong Gradle như sau :

+ Ở project level build.gradle : 

```java
buildscript {
    ext.kotlin_version = '1.3.71'
    repositories {
        jcenter()
    }
    dependencies {
        classpath "org.jetbrains.kotlin:kotlin-gradle-plugin:$kotlin_version"
    }
}
```

+ Ở app level build.gradle : 

```java
apply plugin: 'kotlin-android'
apply plugin: 'kotlin-android-extensions'

android {
  ....
  
   // IMPORTANT!  Enables kotlin synthetic view properties.
   // See: https://github.com/Kotlin/KEEP/blob/master/proposals/android-extensions-entity-caching.md
    androidExtensions {
        experimental = true
    }
	
}

dependencies {
    implementation "org.jetbrains.kotlin:kotlin-stdlib:$kotlin_version"
    implementation 'com.xwray:groupie:$groupie_version'
    implementation "com.xwray:groupie-viewbinding:$groupie_version" 
    implementation 'com.xwray:groupie-kotlin-android-extensions:$groupie_version'
}
```

- Version của Groupie hiện tại đang là 2.8.1

- Groupie chứa một module cho Kotlin và Kotlin Android extensions. Nó không viết lại ViewHolder, Kotlin gen ra các view và Groupie sử dụng một generic holder.
- Groupie cũng có một module hỗ trợ cho Android's view binding, module này cũng hỗ trợ cho  Android data binding, do vậy, nếu project của bạn sử dụng cả databinding và view binding thì bạn không cần phải thêm dependence cho databinding nữa.
- Nếu sử dụng *groupie-viewbinding* thì hãy đảm bảo điều kiện Android Gradle Plugin 3.6.0 hoặc cao hơn. 
- Nếu bạn sử dụng Gradle Plugin cũ hơn, thì hãy implement thư viện *groupie-databinding* để gen các view holders, thư viện này tạm thời vẫn sử dụng được, nhưng nó sẽ bị xóa trong tương lai, mọi người cẩn thận nhé : 

```java
implementation "com.xwray:groupie-databinding:$groupie_version" 
```

# 3. Demo

+ Sử dụng GroupAdapter khi tạo một adapter cho RecyclerView như thông thường : 

```java
val adapter = GroupAdapter()
recyclerView.setAdapter(adapter)
```

### Groups

Group là đơn vị xây dựng của Groupie, một Item riêng lẻ là một Group của 1. Bạn có thể add vào adapter Group hoặc Item thay thế cho nhau.

```java
groupAdapter += HeaderItem()
groupAdapter += CommentItem()

val section = Section()
section.setHeader(HeaderItem())
section.addAll(bodyItems)
groupAdapter += section
```

Nếu content của GroupAdapter thay đổi thì sẽ tự động gửi thông báo, thêm một item thì gọi notifyItemAdded(), thêm một group thì gọi notifyItemRangeAdded().

Content của Group mà thay đổi thì sẽ tự động gửi thông báo đến cha của nó, khi thông báo được gửi cho GroupAdapter thì nó sẽ gửi thông báo thay đổi cuối cùng. Cho dù cấu trúc data của bạn như thế nào thì bạn cũng không cần phải thông báo hoặc theo dõi các index theo cách thủ công.

```
section.removeHeader(); // results in a remove event for 1 item in the adapter, at position 2
```

Có một số cách implement Group đơn giản trong thư viện : 
+ Section, danh sách content với header group và footer group là tùy chọn, nó hỗ trợ các animation cho việc update và những thay đổi khác.
+ ExpandableGroup, là một là một group cha đơn lẻ với danh sách nội dung có thể được ẩn và hiện.

Vòng đời  (và thiết kế di động) rất phức tạp, vì vậy các Groups được thiết kế sao cho dễ dàng tạo ra những cái mới và xác định hành vi của user. Bạn nên tạo nhiều Groups nhỏ, đơn giản, tùy chỉnh khi có nhu cầu thay đổi.

### Items

Groupie giản lược sự phức tạp của nhiều item view types. Mỗi Item sẽ định nghĩa một id layout, và nhận callback để  bind layout. Bạn cũng có thể thêm trực tiếp một Item vào GroupAdapter.

Item with Kotlin: Class  *Item*  sẽ cung cấp cho bạn những callbacks đơn giản để bind các model object và gen ra các thuộc tính của nó. Vì là mình có Kotlin Android extensions nên là không cần thiết phải viết một view holder: 

```java
import com.xwray.groupie.kotlinandroidextensions.Item
import com.xwray.groupie.kotlinandroidextensions.GroupieViewHolder
import kotlinx.android.synthetic.main.song.*

class SongItem(private val song: Song) : Item() {

    override fun getLayout() = R.layout.song

    override fun bind(viewHolder: GroupieViewHolder, position: Int) {
        viewHolder.title.text = song.title
        viewHolder.artist.text = song.artist
    }
}
```

Item with data binding: Class  *Item*  sẽ cung cấp cho bạn những callbacks đơn giản để bind các model object và gen ra các binding. Vì là mình sử dụng data binding nên là không cần viết một view holder : 

```java
public class SongItem extends BindableItem<SongBinding> {

    public SongItem(Song song) {
        this(song);
    }    

    @Override public void bind(SongBinding binding, int position) {
        binding.setSong(song);
    }

    @Override public int getLayout() {
        return R.layout.song;
    }
}
```

Nếu bạn đang chuyển đổi những ViewHolders có trước đó rồi, thì khuyến khích bạn nên sử dụng những name có sẵn từ binding như R.id.title ...

```java
 @Override public void bind(SongBinding binding, int position) {
        binding.title.setText(song.getTitle());
    }
```

Bạn cũng có thể phối hợp BindableItem và những Items khác trong adapter, vì vậy bạn có thể tạo các viewholder kế thừa bằng cách tạo Item<MyExistingViewHolder>. 

Có thể tự tạo viewholder của riêng mình bằng cách cho MyExistingViewHolder kế thừa thằng GroupieViewHolder, và nhớ import com.xwray.groupie.Item và com.xwray.groupie.GroupieViewHolder.
    
Cuối cùng là trong Item<MyExistingViewHolder> override hàm bind : 
 
```java
 @Override
    public MyExistingViewHolder createViewHolder(@NonNull View itemView) {
        return new MyExistingViewHolder(itemView);
    }
```
    
Trên đây là toàn bộ phần giới thiệu của mình về thư viện Groupie. Cảm ơn quý zị đã xem hết bài :D
    
    
# Tham khảo : 
    
 Groupie library : https://github.com/lisawray/groupie#kotlin
    
   Xin chào và hẹn gặp lại ! (F)