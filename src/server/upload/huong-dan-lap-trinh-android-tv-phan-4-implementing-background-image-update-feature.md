# Giới thiệu
Một ứng dụng TV sẽ thật sự nhàm chán nếu không có background đẹp. Việc thiết lập backgound động cho ứng dụng Android TV rất dễ dàng. Leanback đã hỗ trợ chúng ta rất tốt trong việc change background động dựa theo nội dung và bạn đã chọn. Ở bài này chúng ta sẽ cùng tìm hiểu về cách implement tính năng này nhé
# Các event cơ bản
Trước khi hướng dẫn implement tính năng dynamic background, mình sẽ giới thiệu đến các bạn 2 event cơ bản của mỗi item trong leanback đó là **OnItemViewSelectedListener()**  và  **OnItemViewClickedListener()**

- OnItemViewSelectedListener(): Được gọi khi một item được focus
- OnItemViewClickedListener(): Được gọi khi một item được lựa chọn

```
        setOnItemViewClickedListener(new OnItemViewClickedListener() {
            @Override
            public void onItemClicked(Presenter.ViewHolder viewHolder, Object o, RowPresenter.ViewHolder viewHolder1, Row row) {
            }
        });
        setOnItemViewSelectedListener(new OnItemViewSelectedListener() {
            @Override
            public void onItemSelected(Presenter.ViewHolder viewHolder, Object o, RowPresenter.ViewHolder viewHolder1, Row row) {
            }
        });
```
Ở đây chúng ta sẽ sử dụng **OnItemViewSelectedListener** Để implement dynamic background function
# SimpleBackgroundManager
Ở đây chúng ta tạo ra SimpleBackgroundManager để thực hiện việc change background của ứng dụng
```
public class SimpleBackgroundManager {
 
    private static final String TAG = SimpleBackgroundManager.class.getSimpleName();
 
    private final int DEFAULT_BACKGROUND_RES_ID = R.drawable.default_background;
    private static Drawable mDefaultBackground;
 
    private Activity mActivity;
    private BackgroundManager mBackgroundManager;
 
    public SimpleBackgroundManager(Activity activity) {
        mActivity = activity;
        mDefaultBackground = activity.getDrawable(DEFAULT_BACKGROUND_RES_ID);
        mBackgroundManager = BackgroundManager.getInstance(activity);
        mBackgroundManager.attach(activity.getWindow());
        activity.getWindowManager().getDefaultDisplay().getMetrics(new DisplayMetrics());
    }
 
    public void updateBackground(Drawable drawable) {
        mBackgroundManager.setDrawable(drawable);
    }
 
    public void clearBackground() {
        mBackgroundManager.setDrawable(mDefaultBackground);
    }
}
```
Class này sẽ chứa một BackgroundManager. Đây chính là công cụ để thay đổi background 

**updateBackground**  sẽ thay đổi nền và **clearBackground**  sẽ cập nhật lại hình ảnh mặc định(res/drawable/default_background.xmlvà cập nhật res/values/colors.xml.)
Sử dụng trong MainFragment
```
public class MainFragment extends BrowseFragment {
 
    ...
 
    private static SimpleBackgroundManager simpleBackgroundManager = null;
 
    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
 
        ...
 
        simpleBackgroundManager = new SimpleBackgroundManager(getActivity());
    }
 
    private void setupEventListeners() {
        setOnItemViewSelectedListener(new ItemViewSelectedListener());
    }
 
    private final class ItemViewSelectedListener implements OnItemViewSelectedListener {
        @Override
        public void onItemSelected(Presenter.ViewHolder itemViewHolder, Object item,
                                   RowPresenter.ViewHolder rowViewHolder, Row row) {
            // each time the item is selected, code inside here will be executed.
            if (item instanceof String) { // GridItemPresenter row
                simpleBackgroundManager.clearBackground();
            } else if (item instanceof Movie) { // CardPresenter row
                simpleBackgroundManager.updateBackground(getActivity().getDrawable(R.drawable.movie));
            }
        }
    }
```
Chạy thử

![](https://images.viblo.asia/76e92ec3-6aa5-42cb-9f56-fb33ea574e3c.png)
# Sử dụng picasso
Theo cách implement trên thì mỗi khi di chuyển item thì background sẽ liên tục được cập nhật lại, điều này có thể ảnh thưởng đến hiệu xuất của Tivi những thiết bị vốn dĩ cấu hình đã không được mạnh mẽ. Do đó chúng ta sẽ sử dụng TimerTask để delay một khoảng thời gian nhất định khi tiến hành update background
Ở đây chúng ta sử dụng Picasso để nâng cao hiệu xuất load ảnh
Tạo lớp mới PicassoBackgroundManager, thực hiện như sau
```
public class PicassoBackgroundManager {
 
    private static final String TAG = PicassoBackgroundManager.class.getSimpleName();
 
    private static int BACKGROUND_UPDATE_DELAY = 500;
    private final int DEFAULT_BACKGROUND_RES_ID = R.drawable.default_background;
    private static Drawable mDefaultBackground;
    // Handler attached with main thread
    private final Handler mHandler = new Handler(Looper.getMainLooper());
 
    private Activity mActivity;
    private BackgroundManager mBackgroundManager = null;
    private DisplayMetrics mMetrics;
    private URI mBackgroundURI;
    private PicassoBackgroundManagerTarget mBackgroundTarget;
 
    Timer mBackgroundTimer; // null when no UpdateBackgroundTask is running.
 
    public PicassoBackgroundManager (Activity activity) {
        mActivity = activity;
        mDefaultBackground = activity.getDrawable(DEFAULT_BACKGROUND_RES_ID);
        mBackgroundManager = BackgroundManager.getInstance(activity);
        mBackgroundManager.attach(activity.getWindow());
        mBackgroundTarget = new PicassoBackgroundManagerTarget(mBackgroundManager);
        mMetrics = new DisplayMetrics();
        activity.getWindowManager().getDefaultDisplay().getMetrics(mMetrics);
 
    }
 
    /**
     * if UpdateBackgroundTask is already running, cancel this task and start new task.
     */
    private void startBackgroundTimer() {
        if (mBackgroundTimer != null) {
            mBackgroundTimer.cancel();
        }
        mBackgroundTimer = new Timer();
        /* set delay time to reduce too much background image loading process */
        mBackgroundTimer.schedule(new UpdateBackgroundTask(), BACKGROUND_UPDATE_DELAY);
    }
 
 
    private class UpdateBackgroundTask extends TimerTask {
        @Override
        public void run() {
            /* Here is TimerTask thread, not UI thread */
            mHandler.post(new Runnable() {
                @Override
                public void run() {
                     /* Here is main (UI) thread */
                    if (mBackgroundURI != null) {
                        updateBackground(mBackgroundURI);
                    }
                }
            });
        }
    }
 
    public void updateBackgroundWithDelay(String url) {
        try {
            URI uri = new URI(url);
            updateBackgroundWithDelay(uri);
        } catch (URISyntaxException e) {
            /* skip updating background */
            Log.e(TAG, e.toString());
        }
    }
 
    /**
     * updateBackground with delay
     * delay time is measured in other Timer task thread.
     * @param uri
     */
    public void updateBackgroundWithDelay(URI uri) {
        mBackgroundURI = uri;
        startBackgroundTimer();
    }
 
    private void updateBackground(URI uri) {
        try {
            Picasso.with(mActivity)
                    .load(uri.toString())
                    .resize(mMetrics.widthPixels, mMetrics.heightPixels)
                    .centerCrop()
                    .error(mDefaultBackground)
                    .into(mBackgroundTarget);
        } catch (Exception e) {
            Log.e(TAG, e.toString());
        }
    }
 
    /**
     * Copied from AOSP sample code.
     * Inner class
     * Picasso target for updating default_background images
     */
    public class PicassoBackgroundManagerTarget implements Target {
        BackgroundManager mBackgroundManager;
 
        public PicassoBackgroundManagerTarget(BackgroundManager backgroundManager) {
            this.mBackgroundManager = backgroundManager;
        }
 
        @Override
        public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom loadedFrom) {
            this.mBackgroundManager.setBitmap(bitmap);
        }
 
        @Override
        public void onBitmapFailed(Drawable drawable) {
            this.mBackgroundManager.setDrawable(drawable);
        }
 
        @Override
        public void onPrepareLoad(Drawable drawable) {
            // Do nothing, default_background manager has its own transitions
        }
 
        @Override
        public boolean equals(Object o) {
            if (this == o)
                return true;
            if (o == null || getClass() != o.getClass())
                return false;
 
            PicassoBackgroundManagerTarget that = (PicassoBackgroundManagerTarget) o;
 
            if (!mBackgroundManager.equals(that.mBackgroundManager))
                return false;
 
            return true;
        }
 
        @Override
        public int hashCode() {
            return mBackgroundManager.hashCode();
        }
    }
}
```
Update file MainFragment
```
public class MainFragment extends BrowseFragment {
 
    ...
 
    private static PicassoBackgroundManager picassoBackgroundManager = null;
 
    @Override
    public void onActivityCreated(Bundle savedInstanceState) {
 
        ...
 
        picassoBackgroundManager = new PicassoBackgroundManager(getActivity());
    }
 
    private void setupEventListeners() {
        setOnItemViewSelectedListener(new ItemViewSelectedListener());
    }
 
    private final class ItemViewSelectedListener implements OnItemViewSelectedListener {
        @Override
        public void onItemSelected(Presenter.ViewHolder itemViewHolder, Object item,
                                   RowPresenter.ViewHolder rowViewHolder, Row row) {
            if (item instanceof String) {                    // GridItemPresenter
                picassoBackgroundManager.updateBackgroundWithDelay("http://heimkehrend.raindrop.jp/kl-hacker/wp-content/uploads/2014/10/RIMG0656.jpg");
            } else if (item instanceof Movie) {              // CardPresenter
                picassoBackgroundManager.updateBackgroundWithDelay(((Movie) item).getCardImageUrl());
            }
        }
    }
 
    ...
 
    private void loadRows() {
        mRowsAdapter = new ArrayObjectAdapter(new ListRowPresenter());
 
        ...
 
        for(int i=0; i<10; i++) {
            Movie movie = new Movie();
            if(i%3 == 0) {
                movie.setCardImageUrl("http://heimkehrend.raindrop.jp/kl-hacker/wp-content/uploads/2014/08/DSC02580.jpg");
            } else if (i%3 == 1) {
                movie.setCardImageUrl("http://heimkehrend.raindrop.jp/kl-hacker/wp-content/uploads/2014/08/DSC02630.jpg");
            } else {
                movie.setCardImageUrl("http://heimkehrend.raindrop.jp/kl-hacker/wp-content/uploads/2014/08/DSC02529.jpg");
            }
            movie.setTitle("title" + i);
            movie.setStudio("studio" + i);
            cardRowAdapter.add(movie);
        }
```
Chạy thử 

![](https://images.viblo.asia/328065c5-5b02-4856-9d08-59d739dd85e9.png)

# Cảm ơn các bạn đã theo dõi
Nguồn: http://corochann.com/android-tv-application-hands-on-tutorial-4-122.html