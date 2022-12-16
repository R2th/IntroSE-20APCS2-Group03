![](https://images.viblo.asia/6485311b-53fb-4c5f-b6d0-b4bc637ad0c7.png)

Một trong những điều khó chịu nhất khi sử dụng RecyclerViews là RecyclerViews về bản chất không lưu trữ trạng thái khi tái chế. Do đó, mỗi item được reset về trạng thái ban đầu từ khi tạo khi bạn cuộn khỏi View. Vấn đề ở đây là các vị trí cuộn được reset về vị trí 0 khi bạn có các carousels RecyclerView lồng nhau. Làm cho bạn tự hỏi làm thế nào các ứng dụng khác (tức là Netflix, Google Play Store) xử lý vấn đề này.

![](https://images.viblo.asia/7e2887ab-a215-46db-92d1-490b362fc98e.gif)

### Lưu trữ các trạng thái carousel

Ý tưởng đằng sau giải pháp này là chúng tôi sẽ lưu index cuộn hiện tại của từng carousel ngang trong một số cấu trúc dữ liệu trước khi nó được tái chế. Theo cách đó, khi các views trở về foreground, chúng ta có thể truy xuất các index đã lưu và đặt positions cuộn cho carousel.

Vài điều cần xem xét:

* Tất cả các thay đổi nên được thực hiện trong adapter bên ngoài.
* Chúng ta nên lưu trữ một LinearLayoutManager trong holder và khởi tạo nó khi chúng ta tạo RecyclerView bên trong đó.
* Tạo một SparseIntArray hoặc map để giữ position cuộn của mỗi carousel.

```Java
public class OuterAdapter extends RecyclerView.Adapter<RecyclerView.ViewHolder> {
    
    private ArrayList<ArrayList<Integer>> mDataList;
    private SparseIntArray positionList = new SparseIntArray();
    
    
        private class OuterViewHolder extends RecyclerView.ViewHolder {

        private RecyclerView innerRecycler;
        private InnerAdapter adapter;
        private LinearLayoutManager layoutManager;

        public OuterViewHolder(View itemView) {
            super(itemView);

            innerRecycler = itemView.findViewById(R.id.innerRecycler);
            layoutManager = new LinearLayoutManager(mContext);
            innerRecycler.setLayoutManager(layoutManager);

            adapter = new InnerAdapter();
            innerRecycler.setAdapter(adapter);
        }
}
```

Bây giờ override `onViewRecycled` để lưu position của item hiển thị đầu tiên trong carousel đó.
```Java
    @Override
    public void onViewRecycled(RecyclerView.ViewHolder viewHolder) {
        
        // Store position
        final int position = viewHolder.getAdapterPosition();
        int firstVisiblePosition = viewHolder.layoutManager.findFirstVisibleItemPosition();
        positionList.put(position, firstVisiblePosition);

        super.onViewRecycled(viewHolder);
}
```
### Lấy trạng thái carousel

Bây giờ các trạng thái được lưu trữ, chúng ta có thể truy xuất chúng một cách linh hoạt trong `onBindViewHolder` trên mỗi vị trí.

```Java
@Override
    public void onBindViewHolder(RecyclerView.ViewHolder viewHolder, final int position) {
        viewHolder.setData(mDataList.get(position));

        // Retrieve and set the saved position 
        int lastSeenFirstPosition = listPosition.get(position, 0);
        if (lastSeenFirstPosition >= 0) {
            viewHolder.layoutManager.scrollToPositionWithOffset(lastSeenFirstPosition, 0);
        }
}
```
Bây giờ chúng ta đã có các RecyclerView lồng nhau giữ trạng thái của chúng khi chúng ta tái chế hoặc cuộn qua danh sách! Mặc dù giải pháp này hoạt động tốt nhất khi SnapHelper được sử dụng cho băng chuyền vì các vị trí gần nhất với item truy cập đầu tiên được sử dụng làm điểm tham chiếu. Tương tự như vậy, dữ liệu và xem các thay đổi cho từng item carousel có thể được lưu trữ và truy xuất khi tái chế.

Tôi thực sự hy vọng điều này sẽ giúp ai đó đối mặt với cùng một vấn đề! :)

Tham khảo: [Medium](https://android.jlelse.eu/storing-scroll-positions-of-nested-recyclerviews-9e9e8eb3196d)