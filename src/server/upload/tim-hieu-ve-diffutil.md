![](https://images.viblo.asia/dd3341b7-69ef-4c01-a38f-638ac13d5ffd.jpeg)
Khi sử dụng RecyclerView điều chúng ta thường hay làm nhất là cập nhật lại dữ liệu phải không nào?

Ngoài ``notifyDataSetChanged() ``   ``Android L`` cung cấp cho chúng ta những loại ``notify`` khác nhau để thông báo cho RecyclerView như là: ``notifyItemChange() ``, ``notifyItemMoved() ``, ``notifyItemInserted `` ...

Nhưng đối với dữ liệu tương đối lớn, việc thao tác trở nên phức tạp rất khó để biết phần nào thay đổi để  thông báo cho RecyclerView biết mà cập nhật dữ liệu view cho đúng. Cách bạn hay nghĩ tới là dùng ``notifyDataSetChanged() `` để cập nhật. Tuy nhiên hàm notify này sẽ kiểm tra toàn bộ danh sách và nó không chừa một item nào trong danh sách cả, chính vì vậy sẽ làm hiệu suất của app thấp làm giảm trải nghiệm của người dùng. Nhưng đừng lo lắng có một lớp tiện ích tên là DiffUtil sẽ giúp chúng ta làm việc đó.

# 1. DiffUtil là gì?
Qua phần giới thiệu chắc chắn bạn đã phần nào hình dung ``DiffUtil `` là gì rồi phải không? 
Bạn có thể hiểu nó tìm điểm khác nhau giữa 2 list và cung cấp đầu ra là một list đã được cập nhật, nó được sử dụng để thông báo cập nhật cho một adapter của RecyclerView. ``DiffUtil `` vẫn sử dụng các method của RecyclerView.Adapter để thông báo cho adapter cập nhật dữ liệu như:
* notifyItemChange()
* notifyItemMovie()
* notifyItemInserted()

Một thông tin thêm cho bạn nào thích tìm tòi là nó sử dụng thuật toán của [Eugeue W.Myers](https://en.wikipedia.org/wiki/Eugene_Myers) để tính toán số lần thay đổi.
# 2. Cách hoạt động:
Khi triển khai ``DiffUtil `` cần lưu ý đến một số hàm sau đây:
* getOldListSize(): Nó trả về kích thước của danh sách cũ.
* getNewListSize(): Nó trả về kích thước của danh sách mới.
* areItemsTheSame(int oldItemPosition, int newItemPosition): Kiểm tra xem các mục riêng lẻ của danh sách có giống nhau không. Điều này có thể được thực hiện thông qua việc kiểm tra ``ID``  của chúng.
* areContentsTheSame(int oldItemPosition, int newItemPosition): Kiểm tra xem nội dung của dữ liệu danh sách có giống nhau không. Phương thức này được gọi bởi ``DiffUtil`` chỉ khi areItemsTheSame trả về là true.
* getChangePayload(int oldItemPosition, int newItemPosition): Nếu areItemTheSame trả về true và areContentsTheSame trả về là false, DiffUtil gọi phương thức này để trả về sự thay đổi.

Hình mô tả bên dưới sẽ giúp bạn dễ hình dung hơn.

![](https://images.viblo.asia/f32ae1ea-e238-41c5-837d-b10e4f984d6e.jpeg)

Giải thích sơ đồ:
Mình sẽ lấy ví dụ cho các bạn dễ hình dung: Chúng ta có hai danh sách Person. DiffUtil sẽ so sánh từng Person một của danh sách với nhau.
Điều đầu tiên muốn biết 2 người khác nhau hay không là so sánh Giấy chứng minh nhân dân (CMND) phải không nào bằng cách sử dụng hàm ``areItemsTheSame() ``. 

Nếu khác sẽ tiếp tục thực hiện thay đổi và tiếp tục so sánh phần tử tiếp theo. Ngược lại giống nhau sẽ tiếp tục so sánh hình dáng có gì thay đổi không ``areContentsTheSame() ``. Điều này có nghĩa là cùng một đối tượng nhưng các thuộc tính đã có sự thay đổi.

Nếu như 2 item này giống nhau thì bảo quản và không thực hiện thay đổi gì cả. Ngược lại item mới này đã thay đổi một số dữ liệu thì sẽ đi tiếp đến hàm ``getChangePayLoad() ``ở đây dữ liệu sẽ được cập nhật lại.

Đọc tới đây chắc hẳn bạn đã hiểu phần nào rồi phải không? Ở đây mình có một link [github](https://github.com/AnkitSinhal/DiffUtilExample) các bạn luyện tập theo nhé.
# 3. Kết hợp với RxJava
Một vấn đề chúng ta rất dễ gặp là đối với dữ liệu cực kì lớn hoặc tính toán và so sánh phức tạp thì chúng ta nên tránh thực hiện trên mainthread. Chúng ta nên thực hiện nó ở Background và thực hiện cập nhật tại mainthread. Rxjava sẽ giúp chúng ta điều đó.

Đây là một ví dụ nhỏ việc kết hợp giữa chúng:
```
public Observable<DiffUtil.DiffResult> getAllStoreProducts(final List<Product> oldData) {
        return mApi.getAllStores().flatMap(new Func1<List<Store>, Observable<Store>>() {
            @Override
            public Observable<Store> call(List<Store> stores) {
                return Observable.from(stores);
            }
        }).flatMap(new Func1<Store, Observable<List<Product>>>() {
            @Override
            public Observable<List<Product>> call(Store store) {
                return mApi.getStoreProducts(store.getStoreId());
            }
        }, new Func2<Store, List<Product>, List<Product>>() {

            @Override
            public List<Product> call(Store store, List<Product> products) {
                for (int i = 0; i < products.size(); i++) {
                    Product product = products.get(i);
                    product.setStore(store);
                    products.set(i, product);
                }
                return products;
            }
        }).flatMap(new Func1<List<Product>, Observable<DiffUtil.DiffResult>>() {
            @Override
            public Observable<DiffUtil.DiffResult> call(List<Product> products) {
                return Observable.just(DiffUtil.calculateDiff(new ProductListDiffCallback(oldData, products)));
            }
        });

    }
```
Tùy vào trường hợp của mình mà cách thực thi khác nhau. Nhưng mục đích chung vẫn là phát ra một DiffResult.

Tiếp theo trong phương thức subscribe override hàm ``onNext`` chúng ta gởi DiffResult đến mainThread:
```
@Override
public void onNext(DiffUtil.DiffResult result) {
    result.dispatchUpdatesTo(mProductAdapter);
}
```

# 4. Tổng kết:
**DiffUtil** tính toán sự khác biệt giữa hai danh sách truyền vào, danh sách cũ là danh sách đang hiển thị trên recyclerView, danh sách mới mà danh sách đã có thay đổi ( thêm, xóa hay là chỉnh sửa ...).

**DiffUtil** chứa danh sách dữ liệu đã update có thể được gởi đến adapter của chúng ta. Trường hợp danh sách không có gì thay đổi DiffUtil vẫn giữ dữ liệu cũ và adapter sẽ không phải làm gì cả. Giúp cho việc refresh dữ liệu trong ứng dụng của chúng ta tối ưu hơn.

Đây là những kiến thức mình học được và muốn chia sẽ với các bạn. Cảm ơn các bạn đã quan tâm bài viết này. Hãy nhớ để lại ý kiến hoặc đóng góp cho bài viết của mình hoàn thiện hơn nhé! :grinning: