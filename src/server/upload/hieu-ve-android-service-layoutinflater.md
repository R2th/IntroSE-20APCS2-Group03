##  Trong bài viết này mình muốn chia sẻ với các bạn về LayoutInflater, 1 trong những Service quan trọng của Android.
Như các bạn đã biết để vẽ 1 view thì chúng ta có 2 cách: có thể tạo trực tiếp bằng code:
```
View view = new View(context);
```
như thế này. Khi muốn truy cập các view để làm gì đó thì chỉ cần gọi thẳng thằng đối tượng view vừa tạo là có thể truy cập tùy ý rồi, thật tiện lợi. Điểm trừ là khi muốn custom lại thì sẽ rất tốn công và khó khăn.
Hoặc cách 2 là vẽ bằng file XML:
```
<?xml version="1.0" encoding="utf-8"?>
<LinearLayout xmlns:android="http://schemas.android.com/apk/res/android"
              android:layout_width="match_parent"
              android:layout_height="match_parent"
              android:orientation="vertical" >
    <TextView android:id="@+id/text"
              android:layout_width="wrap_content"
              android:layout_height="wrap_content"
              android:text="Hello, I am a TextView" />
    <Button android:id="@+id/button"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Hello, I am a Button" />
</LinearLayout>
```
Đa số chúng ta đều thấy vẽ trên XML sẽ đẹp hơn và dễ dàng custom view lại theo ý muốn, nhưng bù lại thì khi muốn truy nhập vào view trong XML ( để set sự kiện listener chẳng hạn ) thì nhiều người lại chưa biết làm như thế nào.
Đó chính là công việc của LayoutInflater.

## Theo Android Developer:
> Instantiates a layout XML file into its corresponding View objects.

Có thể hiểu là LayoutInflater là 1 component giúp bạn chuyển layout file XML thành View Object trong Android. Bạn thường sử dụng nó trong phương thức onCreateView của fragment hoặc khi custom View, khi mà bạn cần chuyển XML thành POJO

## 1. Cách khởi tạo đối tượng LayoutInflater
>   It is never used directly. Instead, use Activity.getLayoutInflater() or Context#getSystemService to retrieve a standard LayoutInflater instance that is already hooked up to the current context and correctly configured for the device you are running on.

Có thể thấy ta sẽ không dùng trực tiếp Constructor của class LayoutInflater được. Có 2 cách chính để lấy ra đối tượng ấy:
### * Giống như mọi Service khác của Android
```
LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
```
Cách này có hơi dài dòng nên tôi thường không dùng.
### * Dùng static method trong LayoutInflater
```
LayoutInflater layoutInflater = LayoutInflater.from(context);
```
Cách này là cách tôi hay sử dụng, vì nó ngắn gọn :)). Thực chất nó cũng như cách 1 thôi :) 
```
/**
     * Obtains the LayoutInflater from the given context.
     */
    public static LayoutInflater from(Context context) {
        LayoutInflater LayoutInflater =
                (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        if (LayoutInflater == null) {
            throw new AssertionError("LayoutInflater not found.");
        }
        return LayoutInflater;
    }
```
## 2. Sử dụng phương thức inflate()
Được rồi, đã có đối tượng layoutInflater rồi, giờ làm sao để parse XML code thành ra object của Java đây? 
Công việc của LayoutInflater là đọc XML layout file và chuyển đổi các thuộc tính của nó thành 1 View trong Java code, bằng cách dùng phương thức inflate(). 
Ta có 2 phương thức inflate với chữ kí khác nhau:
```
1. View view = layoutInflater.inflate(int resource, ViewGroup parent);
2. View view = layoutInflater.inflate(int resource, ViewGroup parent, boolean attachToRoot);
```
Tham số thứ 3 attachToRoot bạn chưa cần hiểu, hãy nhìn vào 2 tham số đầu tiên: resource chính là id của file xml bạn cần chuyển đổi, và parent là ViewGroup nơi mà xml layout file(tham số thứ nhất) có thể được nhúng vào, LayoutInflater sẽ chuyển đổi xml layout file thành View và sử dụng các thuộc tính phù hợp với ViewGroup parrent. 

Phương thức inflate trả về view đã được chuyển đổi từ XML ra.

Khá dễ hiểu, phải không :) 
## 3. attachToRoot ? true hay false
Thuộc tính thứ 3 này tôi nghĩ nhiều người sẽ thấy khá loạn khi không biết khi nào nên đặt là true, không biết khi nào đặt là true.

Phía google miêu tả không được rõ ràng cho lắm:
> *attachToRoot*	**boolean**: Whether the inflated hierarchy should be attached to the root parameter? If false, root is only used to create the correct subclass of LayoutParams for the root view in the XML.

Đây là đoạn code mà layoutInflater sử dụng:
```
if (attachToRoot) {
                        root.addView(view, params);
                    } else {
                        view.setLayoutParams(params);
                    }
```
Về cơ bản thì attachToRoot nếu được set bằng true, thì view bạn vừa inflate sẽ được add vào trong  (ViewGroup) parent **ngay lập tức**, còn không thì nó (có thể) được add **sau đó**, bằng cách nào đó tùy trường hợp mà bạn sử dụng.
Tưởng tượng bạn có 1 view:
```
<Button xmlns:android="http://schemas.android.com/apk/res/android"
                android:layout_width="match_parent"
                android:layout_height="match_parent"
                android:id="@+id/custom_button"/>
```
Bây giờ tôi muốn programmatically add Button này vào LinearLayout bên trong Fragment hoặc Activity. Nếu LinearLayout của tôi đã là một biến thành viên, mLinearLayout, tôi có thể chỉ cần thêm như sau:
```
inflater.inflate(R.layout.custom_button, mLinearLayout, true);
```
hoặc 
```
inflater.inflate(R.layout.custom_button, mLinearLayout);
```
do mặc định attachToRoot sẽ có giá trị là true. 
Một cách sử dụng thích hợp khác của việc set true cho attachmentToRoot là khi ta Custom Views. 
```
public class MyCustomView extends LinearLayout {
    ...
    /* gọi init() trong constuctor của MyCustomView*/
    private void init() {
        LayoutInflater inflater = LayoutInflater.from(getContext());
        inflater.inflate(R.layout.view, this);
    }
}
```
### Trường hợp attachToRoot set False
Hãy xem khi nào bạn muốn đặt attachToRoot thành false. Khi đó, View được chỉ định không được đính kèm với View Group trong tham số thứ hai của inflate() tại ngay thời điểm ấy.
Nhìn lại case Button mình vừa set, bạn làm như thế này cũng không sai:
```
Button button = (Button) inflater.inflate(R.layout.custom_button, mLinearLayout, false);
mLinearLayout.addView(button);
```
Ở đây bạn hoàn toàn có thể add view thủ công, nhưng có vài trường hợp bạn bắt buộc không được add thủ công.

1 item view của RecyclerView sẽ không được set attachToRoot true, hoặc là set False và gọi thủ công addView 
```
public ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
    LayoutInflater inflater = LayoutInflater.from(getActivity());
    View view = inflater.inflate(android.R.layout.list_item_recyclerView, parent, false);
    return new ViewHolder(view);
}
```
Nếu bạn tự add thủ công sẽ có vấn đề đấy :) Thử xem sao :) 

Thằng RecyclerView sẽ nhận trách nhiệm add thay cho mình, do nó còn phải xử lý thêm nhiều nữa "under the hood". Hiện tại chúng ta chưa cần hiểu đến đó.
Một vài thằng sẽ phải set attachToRoot false như: RecyclerView, Dialog, Fragment..., bạn có thể tìm hiểu thêm.

Mong bài viết của mình sẽ giúp đỡ được bạn nào còn đang khó khăn. Thân ái chào tạm biệt !!