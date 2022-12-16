Tiếp tục với chủ đề Rx và RecyclerView, bài này mình sẽ kết hợp giữa Rx và RecyclerView Adapter, bên cạnh đó sử dụng Data binding. Vậy ta sẽ phải hoàn thành 3 điều sau:
- Tạo một RecyclerView Adapter chung cho tất cả
- Nó phải trả về binding trong Rx stream
- Nó cũng phải hộ trợ multiple item type.
Vậy, hãy tạm quên callback hay delegate đi nhé!
Đầu tiên chúng ta sẽ viết một class RxRecyclerAdapter để Rx làm việc với Adapter. 
### RxDataSource đơn giản hoá việc sử dụng RxRecyclerAdapter
Giả sử bạn có một String array list muốn hiển thị như sau:
```
//Dummy DataSet
dataSet = new ArrayList<>();
dataSet.add("this");
dataSet.add("is");
dataSet.add("an");
dataSet.add("example");
dataSet.add("of rx!");
```
Đây là những gì bạn sẽ làm:
1. Enable databinding với việc thêm vào build.gradle:
```
    dataBinding {
      enabled = true
      }
```
2. Tạo layout:
```
    <?xml version="1.0" encoding="utf-8"?>
    <layout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:tools="http://schemas.android.com/tools">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:orientation="vertical"
        android:padding="@dimen/activity_horizontal_margin">

        <TextView android:id="@+id/textViewItem"
                  android:layout_width="match_parent"
                  android:layout_height="wrap_content"
                  tools:text="Recycler Item"/>

    </LinearLayout>
    </layout>
```
    
3.  Tạo một instance của RxDataSource
 ```
     RxDataSource<String> rxDataSource = new RxDataSource<>(dataSet);
 ```
4. Cast bindRecyclerView truyền trong RecyclerView và layout với LayoutBinding.
```
rxDataSource
  .map(String::toLowerCase)
  .repeat(10)
  .<ItemLayoutBinding>bindRecyclerView(recyclerView,
                               R.layout.item_layout)
  .subscribe(viewHolder -> {
         ItemLayoutBinding b = viewHolder.getViewDataBinding();
         b.textViewItem.setText(viewHolder.getItem());
  });
```
và output :

![](https://images.viblo.asia/1c79054f-9a18-4b4e-9670-022e9bfbb570.png)

Lưu ý rằng chúng ta không cần gọi
`observeOn(AndroidSchedulers.mainThread())`
bởi hiện tại đang ở mainThread hoặc nếu muốn gọi nó thì sẽ bị delay ~20–30 milliseconds.

Ta sẽ thử một ví dụ thực tế hơn nhé:

Giả sử bạn muốn tự động cập nhật dataSet, search dataSet hay filter để trả về các kết quả đặc biệt.

Ví dụ ta làm như sau:
```
RxTextView.afterTextChangeEvents(searchEditText).subscribe(event -> {
  rxDataSource.updateDataSet(dataSet) 
      .filter(s -> s.contains(event.view().getText()))
      .updateAdapter();
});
```

![](https://images.viblo.asia/4384bb46-ede3-43b1-8d28-e83d90e8d54c.gif)

Với ví dụ ở trên, đăng ký RxBinding cho textEchange, khi có sự kiện nhập dữ liệu vào sẽ cập nhật vào `base dataSet`. Điều này là quan trọng bởi RxDataSoure thay đổi thể hiện của dataSet khi gọi các method như filter, map...
Có một số hạn chế là, bạn không thể thay đổi type của dataSet, ví dụ như các hàm `map`, `flatmap' không thể trả về một kiểu khác của data source. 
###     RxRecyclerAdapter đơn giản hóa khi bạn có nhiều kiểu item

Bạn muốn có nhiều kiểu item trong RecyclerView, ví dụ như một header và một item.
1. Tạo danh sách ViewHolderInfo xác định tất cả các layout.
```
List<ViewHolderInfo> vi = new ArrayList<>();
vi.add(new ViewHolderInfo(R.layout.item_layout, TYPE_ITEM)); 
vi.add(new ViewHolderInfo(R.layout.item_header_layout, TYPE_HEADER));
```
2. Tạo thể hiện của RxDataSource:
```
RxDataSource<String> rxDataSource = new RxDataSource<>(dataSet);
```

3. Call bindRecyclerView và truyền vào recyclerView, viewHolderInfo và implement getItemViewType:
```
rxDataSource
.bindRecyclerView(recyclerView, viewHolderInfoList,
    new OnGetItemViewType() {
      @Override public int getItemViewType(int position) {
        if (position % 2 == 0) {
          return TYPE_HEADER; //headers are even positions
        }
        return TYPE_ITEM;
      }
    }
  ).subscribe(vH -> {
    //Check instance type and bind!
    final ViewDataBinding b = vH.getViewDataBinding();
    if (b instanceof ItemLayoutBinding) {
      final ItemLayoutBinding iB = (ItemLayoutBinding) b;
      iB.textViewItem.setText("ITEM: " + vH.getItem());
    } else if (b instanceof ItemHeaderLayoutBinding) {
      ItemHeaderLayoutBinding hB = (ItemHeaderLayoutBinding) b;
      hB.textViewHeader.setText("HEADER: " + vH.getItem());
    }
  });
/* and like before, you can do this as well 
   rxDataSource.filter(s -> s.length() > 0) 
              .map(String::toUpperCase)
              .updateAdapter();
*/
```

Và output chúng ta có được sẽ như thế này:

![](https://images.viblo.asia/b0ba86b6-fab1-4559-8b89-30a6dcd4260f.png)

[Nguồn tài liệu](https://medium.freecodecamp.org/simplifying-recyclerview-adapters-with-rx-databinding-f02ebed0b386)