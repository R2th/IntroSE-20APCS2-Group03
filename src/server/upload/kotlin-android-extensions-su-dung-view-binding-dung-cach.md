Sử dụng View Binding trong các classes không phải Activities, Fragments và Views như thế nào

Nếu bạn sử dụng Kotlin Android Extensions, bạn chắc chắn đã nghe đến tính năng View Binding. ["Say goodbye to findViewById"](https://antonioleiva.com/kotlin-android-extensions/) của Antonio Leiva là một bài viết rất nổi tiếng về vấn đề này

Lợi ích của việc sử dụng View Binding của KTX là làm cho source code của bạn ngắn gọn hơn, bạn không còn phải sử dụng findViewById hoặc @BindView annotation của thư viện ButterKnife. Ít hơn 1 dòng code cho mỗi view được sử dụng. Nghe có vẻ tuyệt vời.
Nhưng đó chỉ là phần nổi của tảng băng.

![](https://images.viblo.asia/990072c5-0464-41fc-95c3-75106b69ef2c.jpg)

Tôi sẽ giới thiệu cho các bạn phần chìm của tảng băng: `_$_findCachedViewById`

Khi bạn sử dụng KTX và import view được khai báo trong xml vào class của bạn. Compiler tự động tạo ra một method đặc biệt cho bạn đó là `_$_findCachedViewById`
Để thấy nó bạn cần mở Kotlin bytecode và dịch ngược lại sang Java như [bài viết này](https://medium.com/@mydogtom/tip-how-to-show-java-equivalent-for-kotlin-code-f7c81d76fa8).

Trong tài liệu chính thức nói:
```
“Android Extensions plugin supports different kinds of containers. The most basic ones are Activity, Fragment and View, but you can turn (virtually) any class to an Android Extensions container by implementing the LayoutContainer interface…”
```

Khi bạn sử dụng View Binding extensions trong một class không phải là "Activity, Fragment hoặc View" bạn phải implement interface LayoutContainer. Điều đó không đúng. Nếu bạn truyền 1 instance View vào class của ạn, bạn có thể gọi KTX view trên instance đó. Nếu bạn đang trong ViewHolder, bạn có thể sử dụng trực tiếp itemView:

```
import android.support.v7.widget.RecyclerView
import android.view.View
import kotlinx.android.synthetic.main.recycler_item.view.*

class IcebergViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {

    fun bind(item: GlacierItem){
        itemView.textViewHummock.text = item.universalName ?: "I am not cached"
    }
 
}
```

Đừng bao giờ làm vậy!
Điều này sẽ ngăn compiler cache lại các views. Đây là bằng chứng
```
public final class IcebergViewHolder extends ViewHolder {
   
   public final void bind(@NotNull GlacierItem item) {
      Intrinsics.checkParameterIsNotNull(item, "item");
      View var10000 = this.itemView;
      Intrinsics.checkExpressionValueIsNotNull(this.itemView, "itemView");
      
      AppCompatTextView var2 = (AppCompatTextView)var10000.findViewById(id.textViewHummock);
      
      Intrinsics.checkExpressionValueIsNotNull(var2, "itemView.textViewHummock");
      String var10001 = item.getUniversalName();
      var2.setText(var10001 != null ? (CharSequence)var10001 : (CharSequence)"I am not cached");
   }
   
}
```
Dịch ngược lại Kotlin bytecode sang Java, bạn có thể thấy nó gọi `findViewById`

Bạn có thể cố gắng tìm kiếm giải pháp cho vấn đề đó và thấy rằng bạn cần implement interface LayoutContainer. Đó là cái bẫy. Và bây giờ ViewHolder sẽ như sau:
```
import android.support.v7.widget.RecyclerView
import android.view.View
import kotlinx.android.synthetic.main.recycler_item.view.*

class IcebergViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView), LayoutContainer {

    override val containerView: View?
        get() = itemView

    fun bind(item: GlacierItem){
        itemView.textViewHummock.text = item.universalName ?: "I look like I am cached but I'm not"
    }
    
}
```

Ngay khi bạn implement LayoutContainer, biến findViewCache và các mdthod dingCachedViewById, clearFindViewByIdCache được tự động tạo ra. Nhưng nếu bạn nhìn kỹ hơn một chút, không có cái nào được sử dụng bên trong bind method hoặc bất cứ chỗ nào khác. Vậy cơ chế cache vẫn không hoạt động.

```
public final class IcebergViewHolder extends ViewHolder implements LayoutContainer {
   private HashMap _$_findViewCache;

   @Nullable
   public View getContainerView() {
      return this.itemView;
   }

   public final void bind(@NotNull GlacierItem item) {
      Intrinsics.checkParameterIsNotNull(item, "item");
      View var10000 = this.itemView;
      Intrinsics.checkExpressionValueIsNotNull(this.itemView, "itemView");
      
      AppCompatTextView var2 = (AppCompatTextView)var10000.findViewById(id.textViewHummock);
      
      Intrinsics.checkExpressionValueIsNotNull(var2, "itemView.textViewHummock");
      String var10001 = item.getUniversalName();
      var2.setText(var10001 != null ? (CharSequence)var10001 : (CharSequence)"I look like I am cached but I'm not");
   }
   
   public View _$_findCachedViewById(int var1) {
      if (this._$_findViewCache == null) {
         this._$_findViewCache = new HashMap();
      }

      View var2 = (View)this._$_findViewCache.get(var1);
      if (var2 == null) {
         View var10000 = this.getContainerView();
         if (var10000 == null) {
            return null;
         }

         var2 = var10000.findViewById(var1);
         this._$_findViewCache.put(var1, var2);
      }

      return var2;
   }

   public void _$_clearFindViewByIdCache() {
      if (this._$_findViewCache != null) {
         this._$_findViewCache.clear();
      }

   }
}
```

Cách đúng đắn:

```
import android.support.v7.widget.RecyclerView
import android.view.View
import kotlinx.android.extensions.LayoutContainer
import kotlinx.android.synthetic.main.recycler_item.*

class IcebergViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView), LayoutContainer {

    override val containerView: View?
        get() = itemView

    fun bind(item: GlacierItem){
        textViewHummock.text = item.universalName ?: "You did it!"
    }

}
```

Bạn cần xóa itemView trước textViewHummock. Khi bạn làm như vậy thì câu lệnh import cũng thay đổi từ
```
import kotlinx.android.synthetic.main.recycler_item.view.*
```
thành
```
import kotlinx.android.synthetic.main.recycler_item.*
```

Hãy xem code khi dịch ngược lại sang Java:

```
public final class IcebergViewHolder extends ViewHolder implements LayoutContainer {
   private HashMap _$_findViewCache;

   @Nullable
   public View getContainerView() {
      return this.itemView;
   }

   public final void bind(@NotNull GlacierItem item) {
      Intrinsics.checkParameterIsNotNull(item, "item");
     
      AppCompatTextView var10000 = (AppCompatTextView)this._$_findCachedViewById(id.textViewMatch);
     
      Intrinsics.checkExpressionValueIsNotNull(var10000, "textViewMatch");
      String var10001 = item.getUniversalName();
      var10000.setText(var10001 != null ? (CharSequence)var10001 : (CharSequence)"You did it!");
   }

   public View _$_findCachedViewById(int var1) {
      if (this._$_findViewCache == null) {
         this._$_findViewCache = new HashMap();
      }

      View var2 = (View)this._$_findViewCache.get(var1);
      if (var2 == null) {
         View var10000 = this.getContainerView();
         if (var10000 == null) {
            return null;
         }

         var2 = var10000.findViewById(var1);
         this._$_findViewCache.put(var1, var2);
      }

      return var2;
   }

   public void _$_clearFindViewByIdCache() {
      if (this._$_findViewCache != null) {
         this._$_findViewCache.clear();
      }

   }
}
```

Bây giờ nó đã sử dụng `_$_findCachedViewById` trong bind method. Bạn đã làm được điều tuyệt vời!


TL;DR
Bên trong ViewHolder, đừng bao giờ viết:

```
itemView.textViewBlaBla.text = myItem.blaBla
```

Điều này sẽ giết chết hiệu năng của View Holder.
Hãy sử dụng interface LayoutContainer

HẾT

[Nguồn bài gốc](https://proandroiddev.com/kotlin-android-extensions-using-view-binding-the-right-way-707cd0c9e648)