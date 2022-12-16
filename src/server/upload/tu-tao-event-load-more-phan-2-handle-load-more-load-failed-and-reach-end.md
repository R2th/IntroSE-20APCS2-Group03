> Khi làm việc với dự án Android chúng ta sẽ thường cần làm việc với RecyclerView khá nhiều. Dưới đây là demo cách làm việc với RecyclerView có xử lý các trường hợp load more, load failed, reach end

![](https://images.viblo.asia/64735b08-a0c8-486d-aeb7-7ae227db844f.gif)

### Bước 1: Thêm các class và file xml bên dưới vào trong project của bạn :
**EndlessRecyclerViewScrollListener**
> Ta có class này đẻ nghe ngóng các động thái của recycle view như là sự kiện load more
```
public abstract class EndlessRecyclerViewScrollListener extends RecyclerView.OnScrollListener {
    // The minimum amount of items to have below your current scroll position
    // before loading more.
    private int visibleThreshold = 5;
    // The current offset index of data you have loaded
    private int currentPage = 0;
    // The total number of items in the dataset after the last load
    private int previousTotalItemCount = 0;
    // True if we are still waiting for the last set of data to load.
    private boolean loading = true;
    // Sets the starting page index
    private int startingPageIndex = 0;

    RecyclerView.LayoutManager mLayoutManager;

    public EndlessRecyclerViewScrollListener(RecyclerView.LayoutManager layoutManager) {
        this.mLayoutManager = layoutManager;
    }

    public int getLastVisibleItem(int[] lastVisibleItemPositions) {
        int maxSize = 0;
        for (int i = 0; i < lastVisibleItemPositions.length; i++) {
            if (i == 0) {
                maxSize = lastVisibleItemPositions[i];
            }
            else if (lastVisibleItemPositions[i] > maxSize) {
                maxSize = lastVisibleItemPositions[i];
            }
        }
        return maxSize;
    }

    // This happens many times a second during a scroll, so be wary of the code you place here.
    // We are given a few useful parameters to help us work out if we need to load some more data,
    // but first we check if we are waiting for the previous load to finish.
    @Override
    public void onScrolled(RecyclerView view, int dx, int dy) {
        int lastVisibleItemPosition = 0;
        int totalItemCount = mLayoutManager.getItemCount();

        if (mLayoutManager instanceof StaggeredGridLayoutManager) {
            int[] lastVisibleItemPositions = ((StaggeredGridLayoutManager) mLayoutManager).findLastVisibleItemPositions(null);
            // get maximum element within the list
            lastVisibleItemPosition = getLastVisibleItem(lastVisibleItemPositions);
        } else if (mLayoutManager instanceof GridLayoutManager) {
            lastVisibleItemPosition = ((GridLayoutManager) mLayoutManager).findLastVisibleItemPosition();
        } else if (mLayoutManager instanceof LinearLayoutManager) {
            lastVisibleItemPosition = ((LinearLayoutManager) mLayoutManager).findLastVisibleItemPosition();
        } 

        // If the total item count is zero and the previous isn\'t, assume the
        // list is invalidated and should be reset back to initial state
        if (totalItemCount < previousTotalItemCount) {
            this.currentPage = this.startingPageIndex;
            this.previousTotalItemCount = totalItemCount;
            if (totalItemCount == 0) {
                this.loading = true;
            }
        }
        // If it’s still loading, we check to see if the dataset count has
        // changed, if so we conclude it has finished loading and update the current page
        // number and total item count.
        if (loading && (totalItemCount > previousTotalItemCount)) {
            loading = false;
            previousTotalItemCount = totalItemCount;
        }

        // If it isn’t currently loading, we check to see if we have breached
        // the visibleThreshold and need to reload more data.
        // If we do need to reload some more data, we execute onLoadMore to fetch the data.
        // threshold should reflect how many total columns there are too
        if (!loading && (lastVisibleItemPosition + visibleThreshold) > totalItemCount) {
            currentPage++;
            onLoadMore(currentPage);
            loading = true;
        }
    }
    
    // Call this method whenever performing new searches
    public void resetState() {
        this.currentPage = this.startingPageIndex;
        this.previousTotalItemCount = 0;
        this.loading = true;
    }

    // Defines the process for actually loading more data based on page
    public abstract void onLoadMore(int page);

}
```

**BaseRecyclerViewAdapter.class**
> Class này tạo ra cho  mình 1 RecycleView gắn kết với các sự kiện recycleview chúng ta tạo ra ở fragment 
```
public abstract class BaseRecyclerViewAdapter<T>
        extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    protected LayoutInflater mInflater;
    protected List<T> mDataList;
    protected ItemClickListener mItemClickListener;

    protected BaseRecyclerViewAdapter(@NonNull Context context,
            ItemClickListener itemClickListener) {
        mInflater = LayoutInflater.from(context);
        mItemClickListener = itemClickListener;
        mDataList = new ArrayList<>();
    }

    public void add(List<T> itemList) {
        mDataList.addAll(itemList);
        notifyDataSetChanged();
    }

    public void set(List<T> dataList) {
        List<T> clone = new ArrayList<>(dataList);
        mDataList.clear();
        mDataList.addAll(clone);
        notifyDataSetChanged();
    }

    public void clear() {
        mDataList.clear();
        notifyDataSetChanged();
    }

    @Override
    public int getItemCount() {
        return mDataList.size();
    }

    public interface ItemClickListener {
        void onItemClick(View view, int position);
    }
}
```

**LoadMoreRecyclerViewAdapter**
```
* Any class extend this class
* + should implement getCustomItemViewType
* + should call super.onBindViewHolder(holder, position); inside onBindViewHolder
*/

public abstract class LoadMoreRecyclerViewAdapter<T> extends BaseRecyclerViewAdapter<T> {
   private static final int TYPE_PROGRESS = 0xFFFF;
   private RetryLoadMoreListener mRetryLoadMoreListener;
   private boolean mOnLoadMoreFailed;
   private boolean mIsReachEnd;

   protected LoadMoreRecyclerViewAdapter(@NonNull Context context,
           ItemClickListener itemClickListener,
           @NonNull RetryLoadMoreListener retryLoadMoreListener) {
       super(context, itemClickListener);
       mRetryLoadMoreListener = retryLoadMoreListener;
   }

   @Override
   public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
       switch (viewType) {
           case TYPE_PROGRESS:
               View view = mInflater.inflate(R.layout.item_recyclerview_bottom, parent, false);
               return new BottomViewHolder(view, mRetryLoadMoreListener);
       }
       throw new RuntimeException("LoadMoreRecyclerViewAdapter: ViewHolder = null");
   }

   @Override
   public int getItemViewType(int position) {
       if (position == bottomItemPosition()) {
           return TYPE_PROGRESS;
       }
       return getCustomItemViewType(position);
   }

   private int bottomItemPosition() {
       return getItemCount() - 1;
   }

   protected abstract int getCustomItemViewType(int position);

   @Override
   public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
       if (holder instanceof BottomViewHolder) {
           ((BottomViewHolder) holder).mTvNoMoreItem.setVisibility(
                   mIsReachEnd ? View.VISIBLE : View.GONE);

           ((BottomViewHolder) holder).mProgressBar.setVisibility(
                   mIsReachEnd ? View.GONE : mOnLoadMoreFailed ? View.GONE : View.VISIBLE);
           ((BottomViewHolder) holder).layoutRetry.setVisibility(
                   mIsReachEnd ? View.GONE : mOnLoadMoreFailed ? View.VISIBLE : View.GONE);
       }
   }

   @Override
   public int getItemCount() {
       return mDataList.size() + 1; // +1 for progress
   }

   private static class BottomViewHolder extends RecyclerView.ViewHolder {
       private ProgressBar mProgressBar;
       private TextView mTvNoMoreItem;
       private Button mBtnRetry;
       private View layoutRetry;
       private RetryLoadMoreListener mRetryLoadMoreListener;

       BottomViewHolder(View itemView, RetryLoadMoreListener retryLoadMoreListener) {
           super(itemView);
           mRetryLoadMoreListener = retryLoadMoreListener;
           mProgressBar = (ProgressBar) itemView.findViewById(R.id.progress);
           layoutRetry = itemView.findViewById(R.id.layout_retry);
           mBtnRetry = (Button) itemView.findViewById(R.id.button_retry);
           mTvNoMoreItem = (TextView) itemView.findViewById(R.id.text_no_more_item);

           layoutRetry.setVisibility(View.GONE); // gone layout retry as default
           mTvNoMoreItem.setVisibility(View.GONE); // gone text view no more item as default

           mBtnRetry.setOnClickListener(new View.OnClickListener() {
               @Override
               public void onClick(View v) {
                   mRetryLoadMoreListener.onRetryLoadMore();
               }
           });
       }
   }

   /**
    * It help visible progress when load more
    */
   public void startLoadMore() {
       mOnLoadMoreFailed = false;
       notifyDataSetChanged();
   }

   /**
    * It help visible layout retry when load more failed
    */
   public void onLoadMoreFailed() {
       mOnLoadMoreFailed = true;
       notifyItemChanged(bottomItemPosition());
   }

   public void onReachEnd() {
       mIsReachEnd = true;
       notifyItemChanged(bottomItemPosition());
   }

   public interface RetryLoadMoreListener {
       void onRetryLoadMore();
   }
}
```

**item_recyclerview_bottom**
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="60dp"
    android:orientation="horizontal"
    android:gravity="center"
    >

    <ProgressBar
        android:id="@+id/progress"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_centerHorizontal="true"
        />

    <LinearLayout
        android:id="@+id/layout_retry"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:gravity="center"
        >

        <TextView
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Load failed"
            />

        <Button
            android:id="@+id/button_retry"
            android:layout_marginLeft="30dp"
            android:layout_width="wrap_content"
            android:layout_height="wrap_content"
            android:text="Try Again"
            />

    </LinearLayout>

    <TextView
        android:id="@+id/text_no_more_item"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:text="No more item"
        android:gravity="center"
        />

</RelativeLayout>
```
**Bước 2: Chỉnh sửa lại RecyclerView adapter của bạn lại, dạng như thế này**

> Có lưu ý là phải implement getCustomItemViewType và phải gọi super.onBindViewHolder(holder, position) trong onBindViewHolder

```
public class MyRecyclerViewAdapter extends LoadMoreRecyclerViewAdapter<Item> {
    private static final int TYPE_ITEM = 1;

    public MyRecyclerViewAdapter(Context context, ItemClickListener itemClickListener,
            RetryLoadMoreListener retryLoadMoreListener) {
        super(context, itemClickListener, retryLoadMoreListener);
    }

    @Override
    public RecyclerView.ViewHolder onCreateViewHolder(ViewGroup parent, int viewType) {
        if (viewType == TYPE_ITEM) {
            View view = mInflater.inflate(R.layout.recyclerview_item, parent, false);
            return new ItemViewHolder(view);
        }
        return super.onCreateViewHolder(parent, viewType);
    }

    @Override
    public void onBindViewHolder(RecyclerView.ViewHolder holder, int position) {
        if (holder instanceof ItemViewHolder) {
            Item item = mDataList.get(position);
            ((ItemViewHolder) holder).myTextView.setText(item.getTitle());
        }
        super.onBindViewHolder(holder, position);
    }

    @Override
    protected int getCustomItemViewType(int position) {
        return TYPE_ITEM;
    }

    private class ItemViewHolder extends RecyclerView.ViewHolder implements View.OnClickListener {
        private TextView myTextView;

        ItemViewHolder(View itemView) {
            super(itemView);
            myTextView = (TextView) itemView.findViewById(R.id.info_text);
            itemView.setOnClickListener(this);
        }

        @Override
        public void onClick(View view) {
            if (mItemClickListener != null) {
                mItemClickListener.onItemClick(view, getAdapterPosition());
            }
        }
    }
}
```

**Bước 3: Ở fragment hoặc Activity có load more**

```
public class MainActivity extends AppCompatActivity
        implements MyRecyclerViewAdapter.ItemClickListener, MyRecyclerViewAdapter.RetryLoadMoreListener {
    private RecyclerView mRecyclerView;
    private MyRecyclerViewAdapter adapter;
    private int currentPage;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
       ...

        LinearLayoutManager layoutManager = new LinearLayoutManager(this);
        mRecyclerView.setLayoutManager(layoutManager);
        adapter = new MyRecyclerViewAdapter(this, this, this);
        mRecyclerView.setAdapter(adapter);
   
        mRecyclerView.addOnScrollListener(new EndlessRecyclerViewScrollListener(layoutManager){
            @Override
            public void onLoadMore(final int page) {
                currentPage = page;
                loadMore(page);
            }
        });
    }

    @Override
    public void onItemClick(View view, int position) {

    }

    @Override
    public void onRetryLoadMore() {
        loadMore(currentPage);
    }

    private void loadMore(final int page){
        adapter.startLoadMore();

        // example read end
         if(page == 3){
               adapter.onReachEnd();
               return;
        }
        
        // start load more
    }
    
    // example load failed
    //void onAPIFailed(exception){
    //     adapter.onLoadMoreFailed();
    //}
    
}
```