# Giới thiệu
Ở phần trước mình đã giới thiệu đến các bạn BrowseSupportFragment một component cực kỳ quan trọng trong mọi ứng dụng android TV, Ngày hôm này mình sẽ giới thiệu về presenter và viewholder, và cách để custom một item trong BrowseSupportFragment

![](https://images.viblo.asia/bafd4a91-a015-4dd6-b0c2-0e4235815e3e.png)

Trong phần trước chúng đã đã tạo ra GridItemPresenter, tuy nhiên giao diện của nó chỉ là một Textview\
Để custom giao diện cho một item chúng ta cần những thành phần sau đây

**Presenter**: CardPresenter
**ViewHolder’s view**: ImageCardView
**CardInfo/Item**: Video class

# ImageCardView
ImageCardView được cung cấp bởi thư viện Leanback có trong Android SDK nó cung cấp một thiết kế dạng card bao gồm thumbnail image, text title và text content\
ImageCardView entends từ  BaseCardView class. BaseCardView được extends từ FrameLayout. Bạn có thể dùng ImageCardView hoặc tự tạo cho mình một View bất kỳ để phù hợp với business của từng app.

![](https://images.viblo.asia/7a527f20-76fe-4d7e-83c5-039e8771fade.jpg)
# Implement CardPresenter, Movie class
Tiến hành tạo class Movie, Mỗi object Movie sẽ chịu trách nhiệm cung cấp data cho một ImageCardView
```
public class Movie {
 
    private static final String TAG = Movie.class.getSimpleName();
 
    static final long serialVersionUID = 727566175075960653L;
    private long id;
    private String title;
    private String studio;
 
    public Movie() {
    }
 
    public long getId() {
        return id;
    }
 
    public void setId(long id) {
        this.id = id;
    }
 
    public String getTitle() {
        return title;
    }
 
    public void setTitle(String title) {
        this.title = title;
    }
 
    public String getStudio() {
        return studio;
    }
 
    public void setStudio(String studio) {
        this.studio = studio;
    }
```
Tạo CardPresenter extends từ class Presenter, CardPresenter bao gồm ViewHolder extends từ Presenter.ViewHolder, ViewHolder này được sử dụng để trình bày UI cho Movie Item
```
public class CardPresenter extends Presenter {
 
    private static final String TAG = CardPresenter.class.getSimpleName();
 
    private static Context mContext;
    private static int CARD_WIDTH = 313;
    private static int CARD_HEIGHT = 176;
 
    static class ViewHolder extends Presenter.ViewHolder {
        private Movie mMovie;
        private ImageCardView mCardView;
        private Drawable mDefaultCardImage;
 
        public ViewHolder(View view) {
            super(view);
            mCardView = (ImageCardView) view;
            mDefaultCardImage = mContext.getResources().getDrawable(R.drawable.movie);
        }
 
        public void setMovie(Movie m) {
            mMovie = m;
        }
 
        public Movie getMovie() {
            return mMovie;
        }
 
        public ImageCardView getCardView() {
            return mCardView;
        }
 
        public Drawable getDefaultCardImage() {
            return mDefaultCardImage;
        }
 
    }
 
    @Override
    public ViewHolder onCreateViewHolder(ViewGroup parent) {
        mContext = parent.getContext();
 
        ImageCardView cardView = new ImageCardView(mContext);
        cardView.setFocusable(true);
        cardView.setFocusableInTouchMode(true);
        cardView.setBackgroundColor(mContext.getResources().getColor(R.color.fastlane_background));
        return new ViewHolder(cardView);
    }
 
    @Override
    public void onBindViewHolder(Presenter.ViewHolder viewHolder, Object item) {
        Movie movie = (Movie) item;
        ((ViewHolder) viewHolder).setMovie(movie);
 
        ((ViewHolder) viewHolder).mCardView.setTitleText(movie.getTitle());
        ((ViewHolder) viewHolder).mCardView.setContentText(movie.getStudio());
        ((ViewHolder) viewHolder).mCardView.setMainImageDimensions(CARD_WIDTH, CARD_HEIGHT);
        ((ViewHolder) viewHolder).mCardView.setMainImage(((ViewHolder) viewHolder).getDefaultCardImage());
    }
 
    @Override
    public void onUnbindViewHolder(Presenter.ViewHolder viewHolder) {
    }
 
    @Override
    public void onViewAttachedToWindow(Presenter.ViewHolder viewHolder) {
        // TO DO
    }
}
```
Cuối cùng là settup cho adapter 
```
private void loadRows() {
        mRowsAdapter = new ArrayObjectAdapter(new ListRowPresenter());
        ...
 
        /* CardPresenter */
        HeaderItem cardPresenterHeader = new HeaderItem(1, "CardPresenter");
        CardPresenter cardPresenter = new CardPresenter();
        ArrayObjectAdapter cardRowAdapter = new ArrayObjectAdapter(cardPresenter);
 
        for(int i=0; i<10; i++) {
            Movie movie = new Movie();
            movie.setTitle("title" + i);
            movie.setStudio("studio" + i);
            cardRowAdapter.add(movie);
        }
        mRowsAdapter.add(new ListRow(cardPresenterHeader, cardRowAdapter));
 
         ...
    }
```
Thử chạy
![](https://images.viblo.asia/c84bc658-acfe-4d4e-9e82-694f37100398.png)

Tiến hành load ảnh thumbnail cho card item. ở đây mình sử dụng Picasso
Thêm Url vào Movie class
```
   private String cardImageUrl;
 
    public String getCardImageUrl() {
        return cardImageUrl;
    }
 
    public void setCardImageUrl(String cardImageUrl) {
        this.cardImageUrl = cardImageUrl;
    }
    public URI getCardImageURI() {
        try {
            return new URI(getCardImageUrl());
        } catch (URISyntaxException e) {
            return null;
        }
    }
```
Update ViewHolder
```
    public ViewHolder(View view) {
        super(view);
        mCardView = (ImageCardView) view;
        mImageCardViewTarget = new PicassoImageCardViewTarget(mCardView);
        mDefaultCardImage = mContext.getResources().getDrawable(R.drawable.movie);
    }

    protected void updateCardViewImage(URI uri) {
        Picasso.with(mContext)
                .load(uri.toString())
                .resize(Utils.convertDpToPixel(mContext, CARD_WIDTH),
                        Utils.convertDpToPixel(mContext, CARD_HEIGHT))
                .error(mDefaultCardImage)
                .into(mImageCardViewTarget);
    }
    }
 
    @Override
    public void onBindViewHolder(Presenter.ViewHolder viewHolder, Object item) {
        Movie movie = (Movie) item;
        ((ViewHolder) viewHolder).setMovie(movie);
 
        Log.d(TAG, "onBindViewHolder");
        if (movie.getCardImageUrl() != null) {
            ((ViewHolder) viewHolder).mCardView.setTitleText(movie.getTitle());
            ((ViewHolder) viewHolder).mCardView.setContentText(movie.getStudio());
            ((ViewHolder) viewHolder).mCardView.setMainImageDimensions(CARD_WIDTH, CARD_HEIGHT);
            ((ViewHolder) viewHolder).updateCardViewImage(movie.getCardImageURI());
            //((ViewHolder) viewHolder).mCardView.setMainImage(((ViewHolder) viewHolder).getDefaultCardImage());
        }
    }
```
```
public static class PicassoImageCardViewTarget implements Target {
        private ImageCardView mImageCardView;
 
        public PicassoImageCardViewTarget(ImageCardView imageCardView) {
            mImageCardView = imageCardView;
        }
 
        @Override
        public void onBitmapLoaded(Bitmap bitmap, Picasso.LoadedFrom loadedFrom) {
            Drawable bitmapDrawable = new BitmapDrawable(mContext.getResources(), bitmap);
            mImageCardView.setMainImage(bitmapDrawable);
        }
 
        @Override
        public void onBitmapFailed(Drawable drawable) {
            mImageCardView.setMainImage(drawable);
        }
 
        @Override
        public void onPrepareLoad(Drawable drawable) {
            // Do nothing, default_background manager has its own transitions
        }
    }
```
Thêm URL cho Movie item
```
    private void loadRows() {
 
        ...
 
        for(int i=0; i<10; i++) {
            Movie movie = new Movie();
            movie.setCardImageUrl("http://heimkehrend.raindrop.jp/kl-hacker/wp-content/uploads/2014/08/DSC02580.jpg");
            movie.setTitle("title" + i);
            movie.setStudio("studio" + i);
            cardRowAdapter.add(movie);
        }
         ...
    }
```
Chạy thử
![](https://images.viblo.asia/40d59872-921c-4b9c-a30c-aeb64b20ed9d.png)
# Cảm ơn các bạn đã theo dõi
Nguồn: http://corochann.com/android-tv-application-hands-on-tutorial-3-105.html