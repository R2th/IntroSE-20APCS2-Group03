Trong những năm qua công nghệ lập trình Android được thay đổi và cập nhật liên tục, nhưng điều không đổi là nó luôn làm để nhu cập hiển thị cập nhật dữ liệu cho người dùng một cách thuận tiện nhất. Kể từ 2014 đến này RecyclerView luôn là giải pháp tốt nhất để hiển thị dữ liệu dạng list. Trong bài viết này, chúng ta sẽ bắt đầu nhìn một cái nhìn tổng quan về các vấn đề gặp phải khi sử dụng RecyclerView, từ việc sử dụng cơ bản cho đến việc tuân thủ những quy tắc mới nhất và thực tiễn tốt nhất từ Google để built một ứng dụng Android mới. Cuối cùng mình sẽ giới thiệu một thư viện về RecyclerView để giải quyết những vấn đề mà bạn có thể đã gặp phải một cách dễ dàng hơn
## The Adapter Pattern
- Trước hết chúng ta cần hiểu quan về Adapter Pattern. Mỗi Recycler View luôn có một Adapter tương ứng. Các adapter có trách nhiệm lấy model để map chung với mỗi thành phần tương ứng của View ( ViewHolders), do đó tuân thủ theo Adapter design pattern 
- Adapter Pattern là một mẫu thiết kế  thuộc nhóm cấu trúc (Structural Pattern) cho phép các view (giao diện) không liên quan tới nhau có thể làm việc cùng nhau. Đối tượng giúp kết nối các view gọi là Adapter.
Adapter Pattern giữ vai trò trung gian giữa hai lớp, chuyển đổi interface của một hay nhiều lớp có sẵn thành một interfac khác, thích hợp cho lớp đang viết. Điều này cho phép các lớp có các interface khác nhau có thể dễ dàng giao tiếp tốt với nhau thông qua interface trung gian, không cần thay đổi code của lớp có sẵn cũng như lớp đang viết.
- Với định nghĩa trên, chúng ta có thể hiểu rằng phần logic cụ thể không nằm trong Adapter, tuy nhiên một lỗi phổ biến mà ta hay gặp phải là chúng ta hay viết việc sử lí logic trong adapter, làm cho chúng ít được tái sử dụng và module hoá. Hơn nữa việc mix tầng View với tầng logic là không ổn một chút nào!

![](https://images.viblo.asia/1cad1ef6-d425-4c8c-88cc-a8c8b08b2977.gif)

> Adapter là một phần của View do đó không nó không nên có một chút logic nào, mục đích duy nhất của nó là kết nối giữ out put của logic với View
## Tìm hiểu qua các method 
Sau khi hiểu khái niệm về Adapter chúng ta tìm hiểu về cách Adapter hoạt động cơ bản:
1. Set Data models trong phần khởi tạo hay qua phương thức setter
2. getItemCount() : get số phần tử có trong adapter
3. getItemViewType(): ánh xạ dữ liệu thành các loại View tương ứng
4. Dựa vào viewType tạo ra những kiểu view tương ứng onCreateViewHolder()
5. Liên kết View với Model : onBindViewHolder()
6. Tạo nhiều ViewHolder và implement View logic tương ứng 


``` java 
public class SimpleAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    private ArrayList<Item> itemList;

    // 1
    public SimpleAdapter(ArrayList<Item> itemList) {
        this.itemList = itemList;
    }

    // 2
    @Override
    public int getItemCount() {
        return itemList == null ? 0 : itemList.size();
    }

    // 3
    @Override
    public int getItemViewType(int position) {
        Item item = itemList.get(position);
        return item.getViewType();
    }

// 4
    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        switch (viewType) {
            case Item.ItemType.MESSAGE: {
                View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_message, parent, false);
                return new MessageViewHolder(view);
            }
            case Item.ItemType.STORY: {
                View view = LayoutInflater.from(parent.getContext()).inflate(R.layout.item_story, parent, false);
                return HeaderViewHolder(view);
            }
            default: throw new RuntimeException("Unkown Type");
        }
    }

    // 5
    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        Item item = itemList.get(position);
        switch (item.getViewType()) {
            case Item.ItemType.MESSAGE:
                ((MessageViewHolder)holder).bind((MessageModel)item);
                break;
            case Item.ItemType.STORY:
                (StoryViewHolder)holder).bind((StoryModel)item);
                break;
            default:
                break;
        }
    }

    // 6
    static class MessageViewHolder extends RecyclerView.ViewHolder {
        public MessageViewHolder(View itemView) {
            super(itemView);
            // bind views...
        }
        
        public void bind(MessageModel messageModel) {
            // bind data to views...
        }
    }
    
     static class StoryViewHolder extends RecyclerView.ViewHolder {
        public StoryViewHolder(View itemView) {
           super(itemView);
           // bind views...
        }
        
        public void bind(StoryModel storyModel) {
            // bind data to views...
        }
    }
```

Khá là dài với một ví dụ adapter đơn giản. Vậy nếu một adapter với trên 20 view type thì trông nó sẽ như nào @@ .Và nếu chúng ta cần một số tiện ích như bổ sung quản lý trạng thái khi scroll thì sao?
Sau khi viết Adapter này ta thấy rằng, chúng lặp đi lặp lại đoạn code này mỗi lần, tất nhiên bạn có thể sử dụng copy paste thần chưởng để xử lý việc này nhưng đó không phải là một giải pháp lí tưởng.

Sang 2017, Google đã giới thiệu một kiến trúc phát triển app tuyệt vời đó là Architecture Component và hướng dẫn cách xây dựng chúng. Một trong số khuyến nghị trong hướng dẫn này là tuân thủ theo Single Source Of Truth
- Ngắn gọn thì nguyên tắc này nói rằng
- Mọi thành phần muốn nhận dữ liệu sẽ nhận từ một nguồn duy nhất
- Mỗi thành phần muốn cập nhật dữ liệu cũng sẽ cập nhật từ một nguồn duy nhất

Một trong những cách dễ nhất để tuân theo nguyên tắc này là sử dụng Observable. Mỗi điểm đích muốn nhận dữ liệu sẽ observe nó và khi dữ liệu được cập nhật nó sẽ được thông báo
![](https://images.viblo.asia/6657eb2a-6878-4f1f-aa73-e3ac9137d358.jpeg)
Để implement theo nguyên tắc này cần sử dụng Architecture Component, Room, LiveData, RxJava được giới thiệu để xử lý việc này. Room được biết khi nào database thay đổi sẽ noti cho tất cả những nơi quan sát

```java
@Query("SELECT * FROM items")
abstract Flowable<List<Item>> observeTable();
```
- Khi mỗi hành động thêm, sửa, xóa được thực hiện, Room sẽ tạo ra list mới với noti nó tới mọi nơi quan sát với list đó, mà sau đó chúng ta có thể update View tùy ý 

1. Với việc gọi  NotifyDataSetChanged trong adapter sẽ tạo ra new list, nó sẽ render lại toàn bộ danh sách, điều này dẫn đến hiệu suất và UX kém
2. Bằng cách tính toán sự khác biệt giữ list cũ và list mới sau đó mới tính sự khác biệt của 2 list để update dữ liệu. Rất may là chúng ta có Class DiffYtil để xử lý chính xác việc này

```java 
public class ItemDiffCallback extends DiffUtil.Callback {
    protected Item[] oldList, newList;

    public ItemDiffCallback(Item[] oldList, Item[] newList) {
        this.oldList = oldList;
        this.newList = newList;
    }

    @Override
    public int getOldListSize() {
        return oldList == null ? 0 : oldList.length;
    }

    @Override
    public int getNewListSize() {
        return newList == null ? 0 : newList.length;
    }

    @Override
    public boolean areItemsTheSame(int oldItemPosition, int newItemPosition) {
        return oldList[oldItemPosition].equals(newList[newItemPosition]);
    }

    @Override
    public boolean areContentsTheSame(int oldItemPosition, int newItemPosition) {
        String oldValue = oldList[oldItemPosition].getValue();
        String newValue = newList[newItemPosition].getValue();
        return oldValue.equals(newValue);
    }
}



@MainThread
void update(final ArrayList<Item> newList) {
    final DiffUtil.DiffResult result = DiffUtil.calculateDiff(new ItemDiffCallback(currentList, newList), false);
    currentList= newList;
    result.dispatchUpdatesTo(SimpleAdapter.this);
}
```

- Trông có vẻ không tệ cho đến khi bạn nhận ra rằng thực tế có nhiều case sẽ tốn nhiều effore khi implement areContentTheSame.  Quan trọng nhất là chúng ta phải viết class này cho từng model trong adapter.
> Là một lập trình viên chúng ta luôn hướng đến những thứ tối ưu và smart nhất để không tốn nhiều thời gian viết những đoạn code lặp đi lặp lại nhàm chán

![](https://images.viblo.asia/1e582b05-07de-4239-9e02-f838518cc832.gif)

## Giải pháp 
- Sau nhiều lần gặp những issue trong nhiều project cùng với việc cố gắng giải quyết chúng như sử dụng list adapter và libraries, tôi quyết định viết ra lib nhỏ để giải quyết những vấn đề của riêng mình. Kết quả đạt được là
1. Tìm ra một cách nhanh, và dễ dàng để built module adapter với support multiple view type
2. Sử dụng DiffUtils cùng với concise API
3. Thêm các cải tiến mới trong Adapter nguyên thủy theo kiểu module hóa sẽ làm cho module tính năng này không ảnh hưởng đến module tính năng khác tiếp cận theo hướng plug & play


## One Adapter 

![](https://images.viblo.asia/a9d3f4ee-3ffc-4b23-bb1c-35fd0415ef24.png)

- One Adapter là một adapter có nhiều module khác nhau mà bạn có thể xác định module nào phù hợp với ứng dụng của mình
- Với mỗi module có thể chia làm 2 phần
1. Configuration: ProvideModuleConfig là một phương thức bắt buộc  trong đó lớp cấu hình module có liên quan sẽ được tạo. Class này chứa thông tin chính của adapter khi khởi tạo và thực hiện logic bên trong chúng
2.  Utility: mỗi module đi kèm với tập hợp các phương thức được override mà bạn có thể sử dụng

### Item Module 
- Item Module được sử dụng để tạo và binding tất cả ViewHolder cho bạn. Trong method onBind, ban có thể nhận các tham số mà model được map với tình View và ViewBinder sẽ cho phép ta tìm ra các view được xác định trong layout file

```java
new OneAdapter()
    .attachItemModule(new MessageModule())
    
    
    
    class MessageModule extends ItemModule<MessageModel> {
      @NotNull @Override
      public ItemModuleConfig provideModuleConfig() {
          return new ItemModuleConfig() {
              @Override
              public int withLayoutResource() { return R.layout.message_model; }
          };
      }

      @Override
      public void onBind(@NotNull MessageModel model, @NotNull ViewBinder viewBinder) {
          TextView title = viewBinder.findViewById(R.id.title);
          title.setText(model.title);
      }
    
     @Override
      public void onUnbind(@NotNull ViewBinder viewBinder) {
          // unbind logic like stop animation, release webview resources, etc...
      }
}
```

### Multiple Item Modules
- Có nhiều viewType? , No problem, chỉ cần tạo ItemModule khác và attach nó vào Adapter

```java
new OneAdapter()
    .attachItemModule(new MessageModule())
    .attachItemModule(new StoryModule())
    
    
class MessageModule extends ItemModule<MessageModel> { ... }
class StoryModule extends ItemModule<StoryModel> { ... }
```

### Item Module’s Event 
- Item Module có thể dễ dàng add thêm các event như OnClick... 

```java 
new OneAdapter()
    .attachItemModule(new MessageModule().addEventHook(new MessageClickEvent())
    
    
class MessageClickEvent extends ClickEventHook<MessageModel> {
    @Override
    public void onClick(@NonNull MessageModel model, @NonNull ViewBinder viewBinder) { 
        // place your on click logic here
    }
}
    
```

### Paging Module 

- Paing Module được sử dụng dùng tạo và binding specific ViewHolder ở list khi adapter ở trạng thái load more. Callback VisibleThreshold được gọi để biết có bao nhiêu mục trước khi kết thúc list nên callback onLoadMore được chạy

```java
new OneAdapter()
    .attachPagingModule(new PagingModuleImpl()) 
    
    class PagingModuleImpl extends PagingModule {
    @NotNull @Override
    public PagingModuleConfig provideModuleConfig() {
        return new PagingModuleConfig() {
            @Override
            public int withLayoutResource() { return R.layout.load_more; } // can be some loading animation

            @Override
            public int withVisibleThreshold() { return 3; } // invoke onLoadMore 3 items before the end
        };
    }

    @Override
    public void onLoadMore(int currentPage) {
        // place your load more logic here... like asking the ViewModel to load the next page of data
    }
}
```

### Emptiness Module 
- Empiness Module được sử dụng để tạo và ràng buộc một ViewHolder cụ thể khi Adapter không có dữ liệu để render 

```java 
new OneAdapter()
    .attachEmptinessModule(new EmptinessModuleImpl())
    
    
    class EmptinessModuleImpl extends EmptinessModule {
    @NotNull @Override
    public EmptinessModuleConfig provideModuleConfig() {
        return new EmptinessModuleConfig() {
            @Override
            public int withLayoutResource() { return R.layout.empty_state; }
        };
    }

    @Override
    public void onBind(@NotNull ViewBinder viewBinder) { ... }

    @Override
    public void onUnbind(@NotNull ViewBinder viewBinder) { ... }
}
```
- Module này làm cho việc tái sử dụng các module trong các adapter khác nhau rất dễ dàng. Hơn nữa, các module có thể test được nhiều hơn so với triển khai adapter theo cách truyền thống do thực tế là mỗi module độc lập với phần module sử lý logic liên kết với model

### Kết hợp chúng với nhau 

```java 
// Create & attach OneAdapter
OneAdapter oneAdapter = new OneAdapter()
        .attachItemModule(new MessageModule().addEventHook(new clickEventHook()))
        .attachItemModule(new StoryModule())
        .attachEmptinessModule(new EmptinessModuleImpl())
        .attachPagingModule(new PagingModuleImpl())
        .attachTo(recyclerView);

// Basic use of OneAdapter's API
oneAdapter.setItems(List<Object>);
oneAdapter.clear();
oneAdapter.add(Object);
oneAdapter.add(index, Object);
oneAdapter.add(List<Object>);
oneAdapter.remove(index);
oneAdapter.remove(Object);
oneAdapter.update(Object);
```

Bạn có thể tham khảo thêm tại : https://github.com/ironSource/OneAdapter 

## Reference
-  https://proandroiddev.com/adapting-your-recyclerview-the-2019-approach-e47edf2fc4f3