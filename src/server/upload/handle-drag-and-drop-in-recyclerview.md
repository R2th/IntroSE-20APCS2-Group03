Trước khi vào bài viết các bạn hãy xem ví dụ sau

![](https://images.viblo.asia/bc21bad7-1262-4d6d-84b1-c8dadab088d5.gif)

Đây là ứng dụng Trello, một ứng dụng tương đối quen thuộc đối với sinh viên thường được sử dụng khi để quản lý công việc trong team. Như các bạn thấy, trong khi mình kéo thả các task thì các task đã tự sắp xếp lại để lại khoảng trống cho vị trí mới của task đang được kéo.

Khi thả tay task đang được kéo sẽ được update vào lại vị trí vào vị trí mới của mình. Bài viết hôm nay mình sẽ hướng dẫn các bạn xử lý tính năng này.

# 1) ItemTouchHelper.Callback
ItemTouchHelper.Callback là một abstract class sử dụng để liên lạc giữa ItemTouchHelper và ứng dụng của bạn. Nó cho phép bạn kiểm soát ViewHolder nào được tương tác và trả về callback mỗi khi người dùng thực hiện hành động. 

Một số phương thức thường sử dụng:

 1. int getMovementFlags( @NonNull recyclerView: RecyclerView, 
                                                    @NonNull viewHolder: RecyclerView.ViewHolder)

Trả về giá trị dùng để xác định hướng có thể di chuyển của ViewHolder. và bạn sử dụng 2 method là makeFlag(int, int) và makeMovementFlag(int, int) để tạo giá trị trả về cho hàm này

Note: Nếu bạn muốn ViewHolder không thể drag hay sử dụng makeFlag(0,0) hoặc makeMovementFlag(0, 0)

2.  boolean onMove(@NonNull recyclerView: RecyclerView, 
                                    @NonNull viewHolder: RecyclerView.ViewHolder, 
                                    @NonNull target: RecyclerView.ViewHolder)

Được gọi khi người dùng di chuyển 1 item đã được chọn từ vị trí cũ sang vị trí mới với viewholder là viewHolder của item đang drag và target là ViewHolder đích đến hiện tại của item đó, trả về giá trị true thì ItemTouchHelper sẽ hiểu rằng item đã được di chuyển sang vị trí mới


3. void clearView(@NonNull recyclerView: RecyclerView, 
                                   @NonNull viewHolder: RecyclerView.ViewHolder)

Hàm này sẽ được gọi thi bạn thả tay item đang drop vào vị trí mới

# 2) Ví dụ
Note: Trong ví dụ này mình sẽ chia ra làm 4 trường hợp:

- 1 list & 1 column in 1 recyclerView

![](https://images.viblo.asia/3a68a7c3-e132-4830-b23a-f44135c9aed8.jpg)

- 1 list & 2 column in 1 recyclerView

![](https://images.viblo.asia/de00a91a-7b61-443d-8267-156bee9e8908.jpg)

- 2 list & 1 column in 1 recyclerView

![](https://images.viblo.asia/e0817525-2055-455c-b31e-d8b0cc6bfd33.jpg)

- 2 list & 2 column in 1 recyclerView

![](https://images.viblo.asia/46de7511-12a2-4b50-9503-275bbf096241.jpg)

Toàn bộ code demo mình sẽ gửi link ở cuối bài viết. Trong bài này mình chỉ demo và giải thích trường hợp 2 list & 2 column và các class chính sẽ sử dụng nhé.

### 1. activity_main.xml

```
<?xml version="1.0" encoding="utf-8"?>
<layout>
    <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
        xmlns:app="http://schemas.android.com/apk/res-auto"
        xmlns:tools="http://schemas.android.com/tools"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        tools:context=".MainActivity">

        <androidx.recyclerview.widget.RecyclerView
            android:id="@+id/recyclerView"
            android:layout_width="0dp"
            android:layout_height="0dp"
            app:layoutManager="androidx.recyclerview.widget.LinearLayoutManager"
            app:layout_constraintBottom_toBottomOf="parent"
            app:layout_constraintEnd_toEndOf="parent"
            app:layout_constraintStart_toStartOf="parent"
            app:layout_constraintTop_toTopOf="parent"
            tools:listitem="@layout/item_one_column" />
    </androidx.constraintlayout.widget.ConstraintLayout>
</layout>
```

### 2. ItemTouchListener.java

```
public class ItemTouchListener extends ItemTouchHelper.Callback {
    private RecyclerView.Adapter itemAdapter;

    public ItemTouchListener(RecyclerView.Adapter itemAdapter) {
        this.itemAdapter = itemAdapter;
    }

    @Override
    public int getMovementFlags(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder) {
        if (viewHolder instanceof TitleViewHolder) {
            return makeFlag(0, 0); //Kiểm tra xem ViewHolder đang action có phải title hay không. Nếu là title thì sẽ không có action gì cả
        }
        return makeFlag(ItemTouchHelper.ACTION_STATE_DRAG,
                ItemTouchHelper.DOWN | ItemTouchHelper.UP | ItemTouchHelper.START | ItemTouchHelper.END); //Trong trường hợp không phải title thì có thể di chuyển lên xuống trái phải để tiến tới các viewholder đích   
    }

    @Override
    public boolean onMove(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder, @NonNull RecyclerView.ViewHolder target) {
        if (target instanceof TitleViewHolder) { //Kiểm tra xem đích đến có phải title hay không, nếu là title thì không có action gì cả
            return false;
        }
        int currentPosition = viewHolder.getAdapterPosition(); //lấy vị trí hiện tại của item đang drag
        int newPosition = target.getAdapterPosition(); // lấy vị trí mới của item đang drop
        if (currentPosition < newPosition) { //Thưc hiện đổi chỗ trong đoạn từ vị trí hiện tại đến vị trí đích
            for (int i = currentPosition; i < newPosition; i++) { 
                if (itemAdapter instanceof OneColumnItemAdapter) {
                    Collections.swap(((OneColumnItemAdapter) itemAdapter).getData(), i, i + 1);
                }

                if (itemAdapter instanceof TwoColumnItemAdapter) {
                    Collections.swap(((TwoColumnItemAdapter) itemAdapter).getData(), i, i + 1);
                }

                if (itemAdapter instanceof OneColumnWithViewTypeAdapter) {
                    Collections.swap(((OneColumnWithViewTypeAdapter) itemAdapter).getData(), i, i + 1);
                }

                if (itemAdapter instanceof TwoColumnWithViewTypeAdapter) {
                    Collections.swap(((TwoColumnWithViewTypeAdapter) itemAdapter).getData(), i, i + 1);
                }
            }
        } else {
            for (int i = currentPosition; i > newPosition; i--) {
                if (itemAdapter instanceof OneColumnItemAdapter) {
                    Collections.swap(((OneColumnItemAdapter) itemAdapter).getData(), i, i - 1);
                }

                if (itemAdapter instanceof TwoColumnItemAdapter) {
                    Collections.swap(((TwoColumnItemAdapter) itemAdapter).getData(), i, i - 1);
                }

                if (itemAdapter instanceof OneColumnWithViewTypeAdapter) {
                    Collections.swap(((OneColumnWithViewTypeAdapter) itemAdapter).getData(), i, i - 1);
                }

                if (itemAdapter instanceof TwoColumnWithViewTypeAdapter) {
                    Collections.swap(((TwoColumnWithViewTypeAdapter) itemAdapter).getData(), i, i - 1);
                }
            }
        }
        itemAdapter.notifyItemMoved(currentPosition, newPosition); //đổi chỗ vị trí hiện tại với vị trí mới
        return true;
    }

    @Override
    public void clearView(@NonNull RecyclerView recyclerView, @NonNull RecyclerView.ViewHolder viewHolder) {
        super.clearView(recyclerView, viewHolder);
        //Thực hiện call api, lưu database,... update vị trí mới cho item đã drag với vị trí mới là viewholder.getAdapterPosition()
    }
    
        @Override
    public void onSwiped(@NonNull RecyclerView.ViewHolder viewHolder, int direction) {
    }
}
```

### 3. TwoColumnWithViewTypeAdapter.java

```
public class TwoColumnWithViewTypeAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {

    private List<String> data;

    public TwoColumnWithViewTypeAdapter(List<String> data) {
        this.data = new ArrayList<>();
        this.data.add("List 1");
        this.data.addAll(data);
        this.data.add(10, "List 2");
    }

    @Override
    public int getItemViewType(int position) {
        if (isTitle(position)) { 
            return ViewType.VIEW_TYPE_TITLE;
        }
        return ViewType.VIEW_TYPE_DATA;
    }

    private boolean isTitle(int position) {
        return data.get(position).equals("List 1") || data.get(position).equals("List 2");
    }

    @NonNull
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        if (viewType == ViewType.VIEW_TYPE_DATA) {
            ItemTwoColumnBinding binding = ItemTwoColumnBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
            return new ItemTwoColumnViewHolder(binding);
        }
        ItemTitleBinding binding = ItemTitleBinding.inflate(LayoutInflater.from(parent.getContext()), parent, false);
        return new TitleViewHolder(binding);
    }

    @Override
    public void onBindViewHolder(@NonNull RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof ItemTwoColumnViewHolder) {
            ((ItemTwoColumnViewHolder) holder).bindData(data.get(position));
        }
        if (holder instanceof TitleViewHolder) {
            ((TitleViewHolder) holder).bindData(data.get(position));
        }
    }

    @Override
    public int getItemCount() {
        return data == null ? 0 : data.size();
    }

    public List<String> getData() {
        return data;
    }
}
```
### 4. MainActivity.java

```
public class MainActivity extends AppCompatActivity implements DialogInterface.OnClickListener {

    private static final String FORMAT_ITEM = "Item %d";
    private static final int NUMBER_ITEM = 20;
    private ActivityMainBinding binding;
    private List<String> data = new ArrayList<>();
    private RecyclerView.Adapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        binding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        showData();
    }

    private void initData() {
        data.clear();
        for (int i = 1; i <= NUMBER_ITEM; i++) {
            data.add(String.format(Locale.getDefault(), FORMAT_ITEM, i));
        }
    }

    private void showData() {
        new AlertDialog.Builder(this)
                .setCancelable(false)
                .setItems(R.array.selection, this)
                .create()
                .show();
    }

    @Override
    public void onClick(DialogInterface dialog, int which) {
        initData();
        switch (which) {
            case 0:
                adapter = new OneColumnItemAdapter(data);
                break;
            case 1:
                adapter = new TwoColumnItemAdapter(data);
                binding.recyclerView.setLayoutManager(new GridLayoutManager(this, 2));
                break;
            case 2:
                adapter = new OneColumnWithViewTypeAdapter(data);
                break;
            case 3:
                adapter = new TwoColumnWithViewTypeAdapter(data);
                GridLayoutManager gridLayoutManager = new GridLayoutManager(this, 2);
                gridLayoutManager.setSpanSizeLookup(new GridLayoutManager.SpanSizeLookup() {
                    @Override
                    public int getSpanSize(int position) {
                        if (adapter.getItemViewType(position) == ViewType.VIEW_TYPE_TITLE) { //Kiểm tra xem vị trí position có phải là title hay không? Nếu là title sẽ chiếm 2 khoảng không của RecyclerView
                            return 2;
                        }
                        return 1;
                    }
                });
                binding.recyclerView.setLayoutManager(gridLayoutManager);
                break;
        }
        binding.recyclerView.setAdapter(adapter);
        ItemTouchListener itemTouchListener = new ItemTouchListener(adapter);
        ItemTouchHelper itemTouchHelper = new ItemTouchHelper(itemTouchListener);
        itemTouchHelper.attachToRecyclerView(binding.recyclerView);
    }
}
```

Và đây là kết quả
![](https://images.viblo.asia/4de36c13-db1a-452b-884c-ad60d644060e.gif)

Bạn có thể tham khảo thêm code của mình tại [đây](https://github.com/nguyenducanhit/DragAndDropInRecyclerView)

## TÀI LIỆU THAM KHẢO

https://developer.android.com/reference/kotlin/androidx/recyclerview/widget/ItemTouchHelper.Callback