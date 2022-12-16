# Giới thiệu
Ở phần trước mình đã giới thiệu sơ qua về cấu trúc của một ứng dụng android TV và xây dựng những thành phần cơ bản. Ở phần này chúng ta sẽ đi sâu vào tìm hiểu về BrowseSupportFragment một component không thể thiếu cho bất kỳ ứng dụng android TV nào

# Cấu trúc của BrowseSupportFragment
![](https://images.viblo.asia/1108c272-504c-48a8-8979-6558bb78b116.png)

Đầu tiên hãy tạo một Android TV Activity và quan sát các component của nó, các content đựoc hiển thị trong các item dạng Grid, Mỗi tiêu đề bên trái sẽ có một hàng nội dung bên phải, mối quan hệ này là một - một. Kết hợp tiêu đề và hàng nội dung này là một ListRow. BrowseSupportFragment sẽ chứa một bộ ListRow (nhiều hàng) hình bên dưới khung chữ nhật là một ListRow. Và RowsAdapter là tập hợp tất cả các ListRow

![](https://images.viblo.asia/3e095116-1f61-4d8b-83f1-5a920ca41700.png)

Tiếp theo hãy nhìn vào bên trong của mỗi ListRow.  Nội dung của Header đựoc xác định bởi ArrayObjectAdapter(RowAdapter), đó là một tập hợp các Object  (Gọi là CardInfo hoặc Item).  
CardInfo này có thể là bất kỳ đối tượng nào, Về việc hiển thị CardInfo này mình sẽ viết trong phần sau, chi tiết cách sử dụng và custom nó như thế nào theo ý mình
Tóm lại 

-  ArrayObjectAdapter (RowsAdapter) ← A set of ListRow
- ListRow = HeaderItem + ArrayObjectAdapter (RowAdapter)
- ArrayObjectAdapter (RowAdapter) ← A set of Object (CardInfo/Item) 

# Presenter class
Đây chính là linh hồn của CardInfo, thiết kế của CardInfo được xác định bởi Presenter. Presenter định nghĩa cách hiển thị / trình bày cardInfo. Lớp Presenter chính nó là một lớp trừu tượng, vì vậy bạn cần phải mở rộng lớp này cho thiết kế giao diện người dùng phù hợp với ứng dụng của bạn.
Khi bạn custom một Presenter thì cần phải Overrite lại các method sau
- onCreateViewHolder(Viewgroup parent)
- onBindViewHolder(ViewHolder viewHolder, Object cardInfo/item)
- onUnbindViewHolder(ViewHolder viewHolder)

Để biết chi tiết về các phương thức, bạn có thể vào xem code của lớp Presenter
# Kết hợp HeadersSupportFragment & RowsSupportFragment
Tiến hành custom một Presenter như sau
```
    private class GridItemPresenter extends Presenter {
        @Override
        public ViewHolder onCreateViewHolder(ViewGroup parent) {
            TextView view = new TextView(parent.getContext());
            view.setLayoutParams(new ViewGroup.LayoutParams(GRID_ITEM_WIDTH, GRID_ITEM_HEIGHT));
            view.setFocusable(true);
            view.setFocusableInTouchMode(true);
            view.setBackgroundColor(getResources().getColor(R.color.default_background));
            view.setTextColor(Color.WHITE);
            view.setGravity(Gravity.CENTER);
            return new ViewHolder(view);
        }
 
        @Override
        public void onBindViewHolder(ViewHolder viewHolder, Object item) {
            ((TextView) viewHolder.view).setText((String) item);
        }
 
        @Override
        public void onUnbindViewHolder(ViewHolder viewHolder) {
 
        }
    }
}
```
Sau khi custom presenter bạn chỉ cần truyền nó vào hàm init của rowAdapter
Trong MainFragment trong project ở phần 1 bạn chỉ cần thêm vào
```
    private void loadRows() {
        mRowsAdapter = new ArrayObjectAdapter(new ListRowPresenter());
 
        /* GridItemPresenter */
        HeaderItem gridItemPresenterHeader = new HeaderItem(0, "GridItemPresenter");
 
        GridItemPresenter mGridPresenter = new GridItemPresenter();
        ArrayObjectAdapter gridRowAdapter = new ArrayObjectAdapter(mGridPresenter);
        gridRowAdapter.add("CardInfo 1");
        gridRowAdapter.add("CardInfo 2");
        gridRowAdapter.add("CardInfo 3");
        gridRowAdapter.add("CardInfo 4");
        mRowsAdapter.add(new ListRow(gridItemPresenterHeader, gridRowAdapter));
 
        /* set */
        setAdapter(mRowsAdapter);
    }
```
Thử chạy
![](https://images.viblo.asia/bafd4a91-a015-4dd6-b0c2-0e4235815e3e.png)
# Cảm ơn đã theo dõi
Cảm ơn các bạn đã theo dõi bài viết của mình ở bài tiếp theo mình sẽ hướng dẫn chi tiết custom một card info để đáp ứng yêu cầu của app mà bạn đang làm