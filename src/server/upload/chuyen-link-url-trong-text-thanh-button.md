# 1. Ý tưởng
Trong 1 đoạn chat nhiều lúc chúng ta thường hay đính kèm theo url để gửi cho bạn bè nhưng chúng ta lại không muốn nó hiển thị trực tiếp  vì thường các link đó  quá dài -> Do đó mình có ý tưởng chuyển các url đó thành các button cho thân thiện.
# 2. Base Adapter
Mình đã hướng dẫn ở 1 bài viblo trước đây [BaseAdapter](https://viblo.asia/p/xay-dung-1-abstract-baseadapter-trong-recyclerview-JQVkVrQzkyd)
Trong bài viết này mình sẽ dùng BaseAdapter trên link ở trên hoặc bạn có thể xem trực tiếp ở đây [BaseAdapter](https://github.com/FamilyVN/ChangeUrlToButton/tree/master/app/src/main/java/com/vutuananh/changeurltobutton/view/adapter)
# 3. Các layout item của recycler view
##  3.1. item_recycler_view_button.xml
Đây là button sẽ hiển thị thay url trong text.
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <Button
        android:id="@+id/btn_open"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="Open"
        android:textSize="14sp"/>
</layout>
```
## 3.2. item_recycler_view_text.xml
Đây là item text view hiển thị text sau khi đã loại bỏ url
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <data>

        <variable
            name="viewModel"
            type="com.vutuananh.changeurltobutton.model.ViewModel"/>
    </data>

    <TextView
        android:id="@+id/tv_text"
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:text="@{viewModel.text}"
        android:textColor="@android:color/black"
        android:textSize="14sp"/>
</layout>
```
## 3.3. item_recycler_view_message.xml
Đây là item chính nó gồm 2 thành phần chính là
- 1 text view sẽ hiển thị khi text truyền vào ko có chứa url
- 1 recycler view sẽ hiển thị khi text truyền vào có chứa url -> Recycler view này sẽ có 2 loại item là text view và button (thay thế url)
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android">

    <data>

        <variable
            name="viewModel"
            type="String"/>
    </data>

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="wrap_content"
        android:layout_margin="10dp"
        android:background="@drawable/bg_text_view"
        android:orientation="vertical">

        <TextView
            android:id="@+id/tv_message"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:text="@{viewModel}"
            android:textColor="@android:color/black"
            android:textSize="14sp"/>

        <android.support.v7.widget.RecyclerView
            android:id="@+id/recycler_url"
            android:layout_width="match_parent"
            android:layout_height="wrap_content"
            android:visibility="gone"/>
    </LinearLayout>
</layout>
```
# 4. activity_main.xml
Thành phần chính là 1 reycler view
```
<?xml version="1.0" encoding="utf-8"?>
<layout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    tools:context="com.vutuananh.changeurltobutton.MainActivity">

    <LinearLayout
        android:layout_width="match_parent"
        android:layout_height="match_parent">

        <android.support.v7.widget.RecyclerView
            android:id="@+id/recycler_message"
            android:layout_width="match_parent"
            android:layout_height="match_parent"/>
    </LinearLayout>
</layout>
```
# 5. ViewModel
```
public static final int TYPE_TEXT = 1;
    public static final int TYPE_URL = 2;
    private String text;
    private int type;

    public ViewModel(String text) {
        this.text = text;
        type = TYPE_TEXT;
    }

    public ViewModel(String text, int type) {
        this.text = text;
        this.type = type;
    }

    public String getText() {
        return text;
    }

    public int getType() {
        return type;
    }

```
# 6. UrlPosition
```
 public static class UrlPosition {
        private String url;
        private int start;
        private int end;

        public UrlPosition(String url, int start, int end) {
            this.url = url;
            this.start = start;
            this.end = end;
        }

        public String getUrl() {
            return url;
        }

        public int getStart() {
            return start;
        }

        public int getEnd() {
            return end;
        }
    }
```
# 7. MainActivity
## 7.1. Khởi tạo data test
```
private static final String[] ARRAY = {
        "Bản dịch từ: https://ksylvest.com/posts/2017-08-12/fabrication-vs-factorygirl",
        "http://s2phim.net/xem-phim/nguoi-hau-cua-thieu-gia-mu/141347",
        "Đại gia Hà Nội đổi 10 cây vàng lấy sanh cổ gây “chấn động” một thời",
        "Giá vàng hôm nay 2/5: Bất ngờ giảm mạnh sau kì nghỉ lễ",
        "Trong tuần trước, vàng SJC mặc dù đã đứng sát ngưỡng 37 triệu đồng nhưng không thể chinh phục mốc này. Trong những phiên giữa tuần, vàng SJC hụt hơi và đã có lúc chỉ còn 36,75 triệu đồng. Phải tới phiên cuối cùng trước kỳ nghỉ lễ, giá vàng mới bật tăng trở lại mốc 36,84 triệu đồng mỗi lượng.",
        "Converting array to list in Java\n https://stackoverflow.com/questions/2607289/converting-array-to-list-in-java",
        "Fabrication hay FactoryGirl nhanh hơn khi viết Rspec https://viblo.asia https://viblo.asia https://viblo.asia https://viblo.asia Viblo"
    };
```
## 7.2. getUrlList() Function tách string truyền vào thành 1 list data gồm 2 loại là text và url
```
public List<ViewModel> getUrlList(String text) {
        if (TextUtils.isEmpty(text) || TextUtils.isEmpty(text.trim())) {
            return null;
        }
        Matcher urlMatcher = Patterns.WEB_URL.matcher(text);
        List<ViewModel.UrlPosition> urlPositionList = new ArrayList<>();
        while (urlMatcher.find()) {
            int start = urlMatcher.start();
            int end = urlMatcher.end();
            String url = text.substring(start, end);
            urlPositionList.add(new ViewModel.UrlPosition(url, start, end));
        }
        List<ViewModel> viewModelList = new ArrayList<>();
        if (urlPositionList.isEmpty()) return null;
        int start = 0;
        for (ViewModel.UrlPosition urlPosition : urlPositionList) {
            String startStr = text.substring(start, urlPosition.getStart());
            if (!TextUtils.isEmpty(startStr.trim())) {
                viewModelList.add(new ViewModel(startStr));
            }
            viewModelList.add(new ViewModel(urlPosition.getUrl(), ViewModel.TYPE_URL));
            start = urlPosition.getEnd();
            if (urlPositionList.indexOf(urlPosition) == urlPositionList.size() - 1) {
                if (start < text.length()) {
                    String endStr = text.substring(start, text.length());
                    if (!TextUtils.isEmpty(endStr.trim())) {
                        viewModelList.add(new ViewModel(endStr));
                    }
                }
            }
        }
        return viewModelList;
    }
```
## 7.3. Khởi tạo recycler view chính 
- Chúng ta sẽ sử dụng SingleTypeAdapter để làm adapter chính 
- Arrays.asList(ARRAY) là để chuyển array String ở trên thành List
```
        mBinding = DataBindingUtil.setContentView(this, R.layout.activity_main);
        final SingleTypeAdapter<String> adapter = new SingleTypeAdapter<>(this, R.layout.item_recycler_view_message);
        adapter.addAll(Arrays.asList(ARRAY));
        mBinding.recyclerMessage.setAdapter(adapter);
        mBinding.recyclerMessage.setLayoutManager(new LinearLayoutManager(this));
```

## 7.4. Reycler view lồng recycler view 
Chú ý dưới đây chúng ta sẽ xử lý recycler view lồng trong recycler view 

Đoạn dưới chúng ta check xem có url trong string truyền vào adapter cha không : Nếu không có thì ẩn recycler view và hiển thị text view như bình thường, nếu có thì hiển thị recycler view và ẩn text view
```
   final List<ViewModel> viewModelList = getUrlList(adapter.get(position));
                final ItemRecyclerViewMessageBinding binding = (ItemRecyclerViewMessageBinding) holder.getBinding();
                if (viewModelList == null || viewModelList.isEmpty()) {
                    binding.tvMessage.setVisibility(View.VISIBLE);
                    binding.recyclerUrl.setVisibility(View.GONE);
                    return;
                }
                binding.tvMessage.setVisibility(View.GONE);
                binding.recyclerUrl.setVisibility(View.VISIBLE);
```
- Vì chúng ta có 2 loại item là button và text nên chúng ta sẽ sử dụng MultiTypeAdapter để làm adapter chính 
```
adapter.setDecorator(new BaseViewAdapter.Decorator() {
            @Override
            public void decorator(BindingViewHolder holder, int position, int viewType) {
                final List<ViewModel> viewModelList = getUrlList(adapter.get(position));
                final ItemRecyclerViewMessageBinding binding = (ItemRecyclerViewMessageBinding) holder.getBinding();
                if (viewModelList == null || viewModelList.isEmpty()) {
                    binding.tvMessage.setVisibility(View.VISIBLE);
                    binding.recyclerUrl.setVisibility(View.GONE);
                    return;
                }
                binding.tvMessage.setVisibility(View.GONE);
                binding.recyclerUrl.setVisibility(View.VISIBLE);
                MultiTypeAdapter adapterUrl = new MultiTypeAdapter(MainActivity.this);
                adapterUrl.addViewTypeToLayoutMap(ViewModel.TYPE_TEXT, R.layout.item_recycler_view_text);
                adapterUrl.addViewTypeToLayoutMap(ViewModel.TYPE_URL, R.layout.item_recycler_view_button);
                adapterUrl.addAll(viewModelList, new MultiTypeAdapter.MultiViewTyper() {
                    @Override
                    public int getViewType(Object item) {
                        if (item instanceof ViewModel) {
                            return ((ViewModel) item).getType();
                        }
                        return 0;
                    }
                });
                adapterUrl.setDecorator(new BaseViewAdapter.Decorator() {
                    @Override
                    public void decorator(BindingViewHolder holder, int positionChild, int viewType) {
                        if (holder.getBinding() instanceof ItemRecyclerViewButtonBinding) {
                            ItemRecyclerViewButtonBinding buttonBinding = (ItemRecyclerViewButtonBinding) holder.getBinding();
                            final String url = viewModelList.get(positionChild).getText();
                            buttonBinding.btnOpen.setOnClickListener(new View.OnClickListener() {
                                @Override
                                public void onClick(View v) {
                                    openLinkInBrowser(MainActivity.this, url);
                                }
                            });
                        }
                    }
                });
                binding.recyclerUrl.setAdapter(adapterUrl);
                binding.recyclerUrl.setLayoutManager(new LinearLayoutManager(MainActivity.this));
            }
        });
```
# Hình ảnh 
![](https://images.viblo.asia/2f5daac6-456f-46dc-8d53-55d4ee903867.png)
![](https://images.viblo.asia/d07bfad6-d405-49b5-a70f-5f77beb96403.png)
# Code
[ChangeUrlToButton](https://github.com/FamilyVN/ChangeUrlToButton)