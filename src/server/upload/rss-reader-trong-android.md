Xin chào mọi người, hôm nay mình sẽ viết một bài chia sẻ về cách đọc RSS trong android.
## Vậy, Rss là gì ? 
RSS ( viết tắt từ Really Simple Syndication ) là một tiêu chuẩn định dạng tài liệu dựa trên XML nhằm giúp người sử dụng dễ dàng cập nhật và tra cứu thông tin một cách nhanh chóng và thuận tiện nhất bằng cách tóm lược thông tin vào trong một đoạn dữ liệu ngắn gọn, hợp chuẩn.
Hiểu ngắn gọn nghĩa là: khi bạn làm 1 website đọc tin tức chẳng hạn, bây giờ bạn muốn hiển thị nó lên 1 app chạy trên android hoặc IOS thì bạn phải trả ra một định dạng mà các hệ điều hành đó đọc hiểu (cliend). Hiện tại, có 2 định dạng mà ta hay sử dụng đó là JSON và XML . Vè JSON, mình sẽ có 1 bài chia sẻ về lần sau.
Cách tạo ra RSS như thế nào? 
Bản chất của RSS là dựa trên XML, vậy chúng ta sẽ trả ra các định dạng XML. Ở bài này mình sẽ giới thiệu một số thẻ và cách sử dụng java để tạo ra  1 app lấy RSS, mình sẽ không đi sâu vào cách tạo ra XML vì nó khá khó và mất nhiều thời gian. Hồi mình học đại học là mất  4 tháng để tìm hiểu và học nó :)
## Một số cú pháp cơ bản của XML:
XML ta tạo ra sẽ theo cây thư mục sau:
![](https://images.viblo.asia/eb09a740-eb30-4d12-a37f-1d3cb1569ce1.jpg)
cơ bản sẽ có các thuộc tính sau:
```
<?xml version="1.0" encoding="UTF-8"?>
<company>
    <employee>
        <firstname>
            Tanmay
        </firstname>
        <lastname>
            Patil
        </lastname>
        <contactno>
            123456789
        </contactno>
    </employee>
    <employee>
        <firstname>
            Taniya
        </firstname>
        <lastname>
            Mishra
        </lastname>
        <contactno>
            123456789
        </contactno>
    </employee>
    <employee>
        <firstname>
            Cuong
        </firstname>
        <lastname>
            Nguyen
        </lastname>
        <contactno>
            0979306603
        </contactno>
    </employee>
</company>
```
Hiện có 1 số trang web đang trả ra RSS miễn phí như :https://www.24h.com.vn/guest/RSS/, https://vnexpress.net/rss để các bạn có thể làm thử :)
## Vậy , nếu có RSS rồi, ta sẽ đọc nó bằng Java như thế nào ?
Đây là nội dung chúng ta sẽ đọc để hiển thị lên android
```
<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
 <title>RSS Title</title>
 <description>This is an example of an RSS feed</description>
 <link>http://www.example.com/main.html</link>
 <lastBuildDate>Mon, 06 Sep 2010 00:01:00 +0000 </lastBuildDate>
 <pubDate>Sun, 06 Sep 2009 16:20:00 +0000</pubDate>
 <ttl>1800</ttl>

 <item>
  <title>Example entry</title>
  <description>Here is some text containing an interesting description.</description>
  <link>http://www.example.com/blog/post/1</link>
  <guid isPermaLink="true">7bd204c6-1655-4c27-aeee-53f933c5395f</guid>
  <pubDate>Sun, 06 Sep 2009 16:20:00 +0000</pubDate>
 </item>

 <item>
  <title>Second example entry</title>
  <description>More text containing even more interesting description.</description>
  <link>http://www.example.com/blog/post/2</link>
  <guid isPermaLink="true">7a4a56b6-1655-4c27-aeee-33e4453f2675</guid>
  <pubDate>Sun, 06 Sep 2009 18:14:00 +0000</pubDate>
 </item>

</channel>
</rss>
```
### 1. Trước tiên trong Android Manifest ta sẽ thêm quyền truy cập internet
```
<uses-permission android:name="android.permission.INTERNET" />
```
### 2. Tạo layout hiển thị
```
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    android:paddingBottom="@dimen/activity_vertical_margin"
    android:paddingLeft="@dimen/activity_horizontal_margin"
    android:paddingRight="@dimen/activity_horizontal_margin"
    android:paddingTop="@dimen/activity_vertical_margin"
    tools:context="com.sample.foo.simplerssreader.MainActivity">

    <Button
        android:id="@+id/fetchFeedButton"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_alignParentEnd="true"
        android:text="Fetch" />

    <android.support.design.widget.TextInputLayout
        android:id="@+id/textInputLayout"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_marginEnd="@dimen/activity_horizontal_margin"
        android:layout_toStartOf="@id/fetchFeedButton"
        android:hint="Rss feed source">

        <EditText
            android:id="@+id/rssFeedEditText"
            android:layout_width="match_parent"
            android:layout_height="wrap_content" />

    </android.support.design.widget.TextInputLayout>

    <TextView
        android:id="@+id/feedTitle"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/textInputLayout"
        android:text="Feed Title: " />

    <TextView
        android:id="@+id/feedDescription"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/feedTitle"
        android:text="Feed Description: " />

    <TextView
        android:id="@+id/feedLink"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_below="@id/feedDescription"
        android:text="Feed Link: " />

    <android.support.v4.widget.SwipeRefreshLayout
        android:id="@+id/swipeRefreshLayout"
        android:layout_width="match_parent"
        android:layout_height="match_parent"
        android:layout_below="@id/feedLink"
        android:layout_marginTop="@dimen/activity_vertical_margin">

        <android.support.v7.widget.RecyclerView
            android:id="@+id/recyclerView"
            android:layout_width="match_parent"
            android:layout_height="match_parent" />
    </android.support.v4.widget.SwipeRefreshLayout>
</RelativeLayout>
```
![](https://images.viblo.asia/1ec3d867-768f-4b5c-9b90-c6ca70600a31.png)

### 3. Xử lý logic trên Java
 ```
public class MainActivity extends AppCompatActivity {

    private RecyclerView mRecyclerView;
    private EditText mEditText;
    private Button mFetchFeedButton;
    private SwipeRefreshLayout mSwipeLayout;
    private TextView mFeedTitleTextView;
    private TextView mFeedLinkTextView;
    private TextView mFeedDescriptionTextView;

    private List<RssFeedModel> mFeedModelList;
    private String mFeedTitle;
    private String mFeedLink;
    private String mFeedDescription;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mRecyclerView = (RecyclerView) findViewById(R.id.recyclerView);
        mEditText = (EditText) findViewById(R.id.rssFeedEditText);
        mFetchFeedButton = (Button) findViewById(R.id.fetchFeedButton);
        mSwipeLayout = (SwipeRefreshLayout) findViewById(R.id.swipeRefreshLayout);
        mFeedTitleTextView = (TextView) findViewById(R.id.feedTitle);
        mFeedDescriptionTextView = (TextView) findViewById(R.id.feedDescription);
        mFeedLinkTextView = (TextView) findViewById(R.id.feedLink);

        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        mFetchFeedButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                new FetchFeedTask().execute((Void) null);
            }
        });
        mSwipeLayout.setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                new FetchFeedTask().execute((Void) null);
            }
        });
    }
}
```
Như các bạn đã thấy, code trên không ó gì đặc biệt, chỉ set sự kiện onclick , cái quan trọng ta sẽ sử dụng Asynctask để lấy dữ liệu về
```
private class FetchFeedTask extends AsyncTask<Void, Void, Boolean> {

        private String urlLink;

        @Override
        protected void onPreExecute() {
            mSwipeLayout.setRefreshing(true);
            urlLink = mEditText.getText().toString();
        }

        @Override
        protected Boolean doInBackground(Void... voids) {
            if (TextUtils.isEmpty(urlLink))
                return false;

            try {
                if(!urlLink.startsWith("http://") && !urlLink.startsWith("https://"))
                    urlLink = "http://" + urlLink;

                URL url = new URL(urlLink);
                InputStream inputStream = url.openConnection().getInputStream();
                mFeedModelList = parseFeed(inputStream);
                return true;
            } catch (IOException e) {
                Log.e(TAG, "Error", e);
            } catch (XmlPullParserException e) {
                Log.e(TAG, "Error", e);
            }
            return false;
        }

        @Override
        protected void onPostExecute(Boolean success) {
            mSwipeLayout.setRefreshing(false);

            if (success) {
                mFeedTitleTextView.setText("Feed Title: " + mFeedTitle);
                mFeedDescriptionTextView.setText("Feed Description: " + mFeedDescription);
                mFeedLinkTextView.setText("Feed Link: " + mFeedLink);
                // Fill RecyclerView
                mRecyclerView.setAdapter(new RssFeedListAdapter(mFeedModelList));
            } else {
                Toast.makeText(MainActivity.this,
                        "Enter a valid Rss feed url",
                        Toast.LENGTH_LONG).show();
            }
        }
    }
```
Sau đó, ta tiến hành parse data rồi hiển thị lên Listview 
```
public List<RssFeedModel> parseFeed(InputStream inputStream) throws XmlPullParserException,
                                                                    IOException {
        String title = null;
        String link = null;
        String description = null;
        boolean isItem = false;
        List<RssFeedModel> items = new ArrayList<>();

        try {
            XmlPullParser xmlPullParser = Xml.newPullParser();
            xmlPullParser.setFeature(XmlPullParser.FEATURE_PROCESS_NAMESPACES, false);
            xmlPullParser.setInput(inputStream, null);

            xmlPullParser.nextTag();
            while (xmlPullParser.next() != XmlPullParser.END_DOCUMENT) {
                int eventType = xmlPullParser.getEventType();

                String name = xmlPullParser.getName();
                if(name == null)
                    continue;

                if(eventType == XmlPullParser.END_TAG) {
                    if(name.equalsIgnoreCase("item")) {
                        isItem = false;
                    }
                    continue;
                }

                if (eventType == XmlPullParser.START_TAG) {
                    if(name.equalsIgnoreCase("item")) {
                        isItem = true;
                        continue;
                    }
                }

                Log.d("MyXmlParser", "Parsing name ==> " + name);
                String result = "";
                if (xmlPullParser.next() == XmlPullParser.TEXT) {
                    result = xmlPullParser.getText();
                    xmlPullParser.nextTag();
                }

                if (name.equalsIgnoreCase("title")) {
                    title = result;
                } else if (name.equalsIgnoreCase("link")) {
                    link = result;
                } else if (name.equalsIgnoreCase("description")) {
                    description = result;
                }

                if (title != null && link != null && description != null) {
                    if(isItem) {
                        RssFeedModel item = new RssFeedModel(title, link, description);
                        items.add(item);
                    }
                    else {
                        mFeedTitle = title;
                        mFeedLink = link;
                        mFeedDescription = description;
                    }

                    title = null;
                    link = null;
                    description = null;
                    isItem = false;
                }
            }

            return items;
        } finally {
            inputStream.close();
        }
    }
```
### 4.Tạo model
```
public class RssFeedModel {

    public String title;
    public String link;
    public String description;

    public RssFeedModel(String title, String link, String description) {
        this.title = title;
        this.link = link;
        this.description = description;
    }
}
```
### Hiển thị data
```
public class RssFeedListAdapter
        extends RecyclerView.Adapter<RssFeedListAdapter.FeedModelViewHolder> {

    private List<RssFeedModel> mRssFeedModels;

    public static class FeedModelViewHolder extends RecyclerView.ViewHolder {
        private View rssFeedView;

        public FeedModelViewHolder(View v) {
            super(v);
            rssFeedView = v;
        }
    }

    public RssFeedListAdapter(List<RssFeedModel> rssFeedModels) {
        mRssFeedModels = rssFeedModels;
    }

    @Override
    public FeedModelViewHolder onCreateViewHolder(ViewGroup parent, int type) {
        View v = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.item_rss_feed, parent, false);
        FeedModelViewHolder holder = new FeedModelViewHolder(v);
        return holder;
    }

    @Override
    public void onBindViewHolder(FeedModelViewHolder holder, int position) {
        final RssFeedModel rssFeedModel = mRssFeedModels.get(position);
        ((TextView)holder.rssFeedView.findViewById(R.id.titleText)).setText(rssFeedModel.title);
        ((TextView)holder.rssFeedView.findViewById(R.id.descriptionText))
                                                             .setText(rssFeedModel.description);
        ((TextView)holder.rssFeedView.findViewById(R.id.linkText)).setText(rssFeedModel.link);
    }

    @Override
    public int getItemCount() {
        return mRssFeedModels.size();
    }
}
```

Kết quả hiển thị :
![](https://images.viblo.asia/fdc0cff6-9895-4678-9563-e6ec678f4c0c.png)

Bài viết được tham khảo trên :

https://www.androidauthority.com/simple-rss-reader-full-tutorial-733245/

https://freetuts.net/cau-truc-cay-trong-xml-514.html

Code các bạn có thể  tham khảo tại : https://github.com/obaro/SimpleRSSReader