Bài này mình sẽ đề cập đến việc sử dụng phân trang trong Laravel
# 1. Basic Usage
## 1.1. Paginating Query Builder Results
Có 1 vài cách để phân trang các items. Cách đơn giản là sử dụng phương thức `paginate` trong `query builder` hoặc` Eloquent query`. Phương thức này tự động setting các limit, offset dựa vào current page. Mặc định, current page sẽ được dùng dựa vào giá trị của page trong đối số query string từ HTTP Request.

> Note: Hiện tại, toán tử `paginate` không thể thực hiện với `groupBy`. Nếu bạn cần sử dụng groupBy trong khi paginate, chúng tôi khuyên bạn nên tự tạo paginator sẽ được đề cập ở phần sau

### "Simple Pagination"

Nếu bạn chỉ muốn hiển thị đơn giản "Next" và "Previews" links trên pagiantion view, bạn có thể sử dụng phương thức `simplePaginate` để thực hiện một truy vấn hiệu quả hơn.

## 1.2. Paginating Eloquent Results

Bạn cũng có thể sử dụng `paginate` trong Eloquent queries:
```php
$users = App\User::paginate(15);
```
Bạn cũng có thể gọi `paginate` sau khi thêm các điều kiện để truy vấn:
```php
$users = User::where('votes', '>', 100)->paginate(15);
```
Bạn cũng có thể sử dụng phương thức `simplePaginate` trong Eloquent models:
```php
$users = User::where('votes', '>', 100)->simplePaginate(15);

```
## 1.3. Manually Creating A Paginator
Đôi khi bạn muốn tự tạo các pagination instance, truyền nó vào 1 mảng các items. Bạn hoàn toàn có thể làm điều này bằng cách tạo `Illuminate\Pagination\Paginator` hoặc `Illuminate\Pagination\LengthAwarePaginator` instance dựa vào như cầu của bạn.

Class `Paginator` không cần biết tổng số bản ghi trong tập kết quả, tuy nhiên vì lý do đó mà nó không thể lấy được chỉ số của trang cuối cùng. Class `LengthAwarePaginator` chấp nhận hầu hết các tham số giống như `Paginator` nhưng nó yêu cầu tổng số bản ghi nữa :D

Nói một cách khác, `Paginator` tương ứng với phương thức `simplePaginate` trong query builder và Eloquent trong khi `LengthAwarePaginator` tương ứng với phương thức `paginate`.

> Note: Khi bạn tự tạo phân trang, bạn nên tự "slice" mảng kết quả bạn truyền vào để phân trang. Nếu bạn không biết làm như thế nào, hãy thử dùng hàm array_slice PHP function
> 
> => bạn cần tự phân trang kết quả các items, class kia chỉ bổ sung các thông tin paginate cho bạn thôi
> 
> Ví dụ: https://stackoverflow.com/questions/43601095/laravel-5-4-lengthawarepaginator

Xem xét ví dụ nhé:
```php
public function filterModels($page, $perPage) {
    $query = User::newQuery();
    
    ....
    $query->get();
    
    return new LengthAwarePaginator($query->forPage($page, $perPage), $collection->count(), $perPage, $page);
}
```
# 2. Các tham số trả về trong Paginator
Các tham số này bạn có thể tham khảo khi thiết kế API hoặc dùng với các framework khác
```JSON
{
   "total": 50,	// tổng số bản ghi
   "per_page": 15,	// số bản ghi trên 1 trang
   "current_page": 1,	// trang hiện tại
   "last_page": 4,	// trang cuối cùng
   "first_page_url": "http://laravel.app?page=1",
   "last_page_url": "http://laravel.app?page=4",
   "next_page_url": "http://laravel.app?page=2",
   "prev_page_url": null,
   "path": "http://laravel.app",
   "from": 1,	// hiên thị từ bản ghi số 1 trong database
   "to": 15,	// hiển thị đến bản ghi số 15 trong database
   "data":[
        {
            // Result Object
        },
        {
            // Result Object
        }
   ]
}
```
# 3. Paginator Instance Methods
Ngoài ra Paginator cung cấp rất nhiều phương thức để bạn tiện sử dụng:

| Method  | Description |
| -------- | -------- |
|$results->count()|Lấy số lượng các mục cho trang hiện tại.|
|$results->currentPage()|Lấy số trang hiện tại.|
|$results->firstItem()|Lấy số lượng kết quả của mục đầu tiên.|
|$results->getOptions()|Lấy các tùy chọn phân trang.|
|$results->getUrlRange($start, $end)|Tạo một loạt các URL phân trang.|
|$results->hasMorePages()|Xác định xem có đủ các mục để chia thành nhiều trang không.|
|$results->items()|Lấy các mục cho trang hiện tại|
|$results->lastItem()|Lấy số kết quả của mục cuối cùng trong kết quả. Get the result number of the last item in the results.|
|$results->lastPage()|Lấy số trang của trang có sẵn cuối cùng  (Cơ mà cái này không khả dụng khi sử dụng `simplePaginate`)|
|$results->nextPageUrl()|Lấy URL cho trang tiếp theo.|
|$results->onFirstPage()|Xác định xem paginator có ở trang đầu tiên không.|
|$results->perPage()|Số lượng các mục sẽ được hiển thị trên mỗi trang.|
|$results->previousPageUrl()|Lấy URL cho trang trước.|
|$results->total()|Xác định tổng số mục phù hợp trong kho lưu trữ dữ liệu.(Cái này cũng không khả dụng khi sử dụng `simplePaginate`)|
|$results->url($page)|Lấy URL cho một số trang nhất định.|
|$results->getPageName()|Lấy biến chuỗi truy vấn được sử dụng để lưu trữ trang.|
|$results->setPageName($name)|Đặt biến chuỗi truy vấn được sử dụng để lưu trữ trang.|

# Tổng kết
* Laravel hỗ trợ 2 phương thức cho phân trang: `paginate` và `simplePaginate` ứng với 2 instance trả về `Illuminate\Pagination\LengthAwarePaginator` và `Illuminate\Pagination\Paginator` dùng cho cả query builder và Eloquent.
* Paginate không hỗ trợ với `groupBy`, nếu bạn muốn sử dụng `groupBy`, bạn nên tự xây dựng paginator.
* Khi tự xây dựng Paginate thủ công sử dụng các instance của Laravel, hãy chứ ý truyền items vào là kết quả đã phân trang nhé :D. Lớp LengthAwarePaginator có tác dụng bổ sung các thông tin phân trang cho bạn thôi.

Mình tham khảo qua https://laravel.com/docs/6.x/pagination#paginator-instance-methods