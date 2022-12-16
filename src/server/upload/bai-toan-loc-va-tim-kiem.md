Khi bạn làm việc đủ lâu và có nhiều trải nghiệm thực tế trong các dự án thì bạn càng nhận ra rằng việc viết code có tính **tái sử dụng** là một trong những yếu tố quan trọng dẫn tới việc thành công của dự án. Vậy nên, bây giờ khi bắt đầu với một **task**, **feature mới**, ngoài việc để ý code làm sao có đúng **yêu cầu của bài toán đặt ra**, mình còn để ý đến **khả năng mở rộng**, **tính tái sử dụng**, để tránh gặp những tình huống phải đi **clone code** cho các chức năng tương tự nhau.

Khi bạn viết code có tính tái sử dụng bạn sẽ có những lợi ích như sau:

* ***Tiết kiệm được thời gian, nguồn lực của dự án***
* ***Đảm bảo về chất lượng code và tính năng, khi một logic được dùng đi dùng lại thì xác suất có sai số cũng ít hơn***
* ***Đem lại cảm giác dễ chịu cho người maintain*** 
* ***Giúp bản thân trưởng thành hơn ^^***

Để có thể làm được điều này thay vì nhận lao vào code ngay khi nhận task, chúng ta nên chậm lại một chút, **phân tích nghiệp vụ bài toán**, **trao đổi với đồng nghiệp xem có logic nào tương tự chưa**, **trao đổi với BA xem có các tính năng gần giống như vậy ở tương lai hay không ?** Áp dụng tư tưởng 
 > ### "Nếu cho tôi 6 giờ để đốn hạ một cái cây, tôi sẽ dành 4 giờ đầu để mài sắc lưỡi rìu." - Abraham Lincoln

Khá lâu rồi mình chưa chia sẻ bài viết nào trên Viblo, quả thực mà nói sau 7 năm đi vào hoạt động, các bài viết trên diễn đàn ngày càng đa dạng và chất lượng hơn. Để tìm được chủ để mới và hấp dẫn độc giả là bài toán khá khó với mình. Tuy nhiên, hưởng ứng sự kiện [May Fest](https://www.facebook.com/viblo.asia/posts/2041392416032544) năm nay. Mình sẽ chia sẻ một số tips mình cảm thấy có thể giúp ích được mọi người phần nào. Bài toán lần này mình chia sẻ liên quan đến chủ đề **tìm kiếm và lọc**.

# 1. Vấn đề gặp phải
Khi bạn làm việc với các màn hình có tính năng quản lí thì gần như chắc chắn bạn sẽ gặp phải tính năng **lọc và tìm kiếm**. Ví dụ khi bạn quản lí danh sách học sinh, bạn sẽ tìm kiếm theo *tên*, *mã học sinh* hay lọc theo *khối*, *lớp* ... Khi dữ liệu càng nhiều và đa dạng, số lượng các trường bạn lọc sẽ ngày càng nhiều lên theo thời gian.
![](https://images.viblo.asia/6b0811b3-e77d-43b6-a894-4a57544bb860.png)

Dưới đây là một ví dụ, trong một màn hình quản lí của mình cần lọc qua **12 trường**, đứng trên góc độ của lập trình viên khi gặp phải bài toán như thế này chúng ta nghĩ ngay đến việc sẽ phải **where theo 12 điều kiện**. Trước đây khi gặp bài toán tương tự như vậy, mình thường xử lí như sau. Mình code **PHP** nên tạm thời sử dụng **syntax** của nó, hi vọng các bạn code các ngôn ngữ khác sẽ hiểu được tư tưởng chung.


```php
        $query = $this->model->query();
        
        if (isset($fillter['user'])) {
            $query = $query->where('user_id', $fillter['user']);
        }

        if (isset($fillter['city'])) {
            $query = $query->where('city_id', $fillter['city']);
        }
        
        if (isset($fillter['dist'])) {

            $query = $query->whereIn('district_id', $fillter['dist']);
        }

        if (isset($fillter['status'])) {

            $query = $query->where('status_id', $fillter['status']);
        }

        if (isset($fillter['course'])) {
            $query = $query->where('course', $fillter['course']);
        }
        
        if (isset($fillter['main_phone'])) {
            $query = $query->where('main_phone', 'like', '%' . $fillter['main_phone'] . '%');
        }
        ...
```
Nhìn vào đoạn code trên chúng ta có thể thấy về logic thì **không có gì sai**, nhưng có hai vấn đề gặp phải là ***sử dụng quá nhiều if else dẫn đến logic code dài lê thê*** và ***không có tính tái sử dụng***.
# 2. Giải quyết vấn đề
Nếu nhìn bài toán xa thêm một chút bạn sẽ thấy bài toán lọc và tìm kiếm sẽ xuất hiện **tương tự ở các module** của bạn trong dự án. Vậy nên có hai vấn đề cần giải quyết ở đây là: 

* ***Giải quyết bài toán if else, làm sao để code bớt lê thê đi***
* ***Áp dụng logic này cho các màn hình hiển thị danh sách có bộ lọc và tìm kiếm khác nhau - tái sử dụng***

Để áp dụng một logic chung trong các module khác nhau, mình áp dụng **tính kế thừa** của oop, các này không có gì mới mẻ cả đúng không nào. Với các logic liên quan đến query trong DB, thường chúng ta sẽ đặt chúng trong lớp **repository** và kế thừa chúng. Ngoài áp dụng tính kế thừa, chúng ta có thể xây dựng logic ở một function riêng rồi theo dạng các **helper** rồi gọi đến nó cho các tình huống khác nhau. Ở đây để bàn toán **clear** hơn mình sẽ áp dụng **helper** vào cho mọi người dễ theo dõi.

Nhìn lại bài toán lọc và tìm kiếm mình sẽ chia ra input của bài toán bao gồm **3 yếu tố**
1. ***Đối tượng tìm kiếm: Sinh viên, Con Chó, Con Mèo ...***
2. ***Điều kiện tìm kiếm: Tên là A, học lớp X  ...***
3. ***Toán tử: So sánh với điều kiện tìm kiếm như nhỏ hơn,  lớn hơn(<, > ),so sánh gần giống(%), so sánh chính xác(===)***

Vậy là function của mình sẽ định nghĩa như sau 
```php
function buildQueryFromCondition(&$query, $conditions, $operations) {
    foreach ($operations as $key => $operationItem) {
        if (!isset($conditions[$key])) {
            continue;
        }

        $operation = is_array($operationItem) ? $operationItem[0] : $operationItem;
        $field = is_array($operationItem) ? $operationItem[1] : $key;

        if ($operation == 'like') {
            $query = $query->where($field, 'like', '%'. $conditions[$key]. '%');
        } else if ($operation == 'equals') {
            $query = $query->where($field, '=', $conditions[$key]);
        } else if ($operation == 'not_equals') {
            $query = $query->where($field, '!=', $conditions[$key]);
        } else if ($operation == 'not_in') {
            $query = $query->whereNotIn($field, $conditions[$key]);
        } else if ($operation == 'in') {
            $query = $query->whereIn($field, $conditions[$key]);
        }
    }

    return $query;
}
```
Ví dụ mình cần lọc và tìm kiếm ở màn hình quản lí danh sách học sinh, chúng ta có thể áp dụng logic này như sau 
```php
    public function getStudents(Request $request) {
        $query = Student::query();
        $conditions = $request->only([
            'name'
            'email',
            'phone',
            'course',
            ...
        ]);
        $filter_users = [
            'name' => 'like',
            'email' => 'like',
            'phone' => 'like',
            'course' => 'equals',
            ...
        ],
        buildQueryFromCondition($query, $condition, $filter_users);
        
        return $query->get();
    }
```

Giải thích qua một chút thì tương ứng với mỗi **key** của **condition(điều kiện tìm kiếm)**. Mình sẽ **map** chúng với mỗi **operation item(toán tử)**, nếu không khớp thì tiếp tục với **continue**. Ngược lại nếu khớp thì ta check tiếp toán tử là gì(**like, not_in, in, equals**) để tìm kiếm theo **điều kiện phù hợp**. Từ nay về sau và từ sau về nay, trong dự án của mình mỗi khi cần logic để lọc và tìm kiếm đối tượng nào đó, ***bạn chỉ cần áp dụng duy nhất một logic này tùy theo điều kiện tìm kiếm và toán tử***. Lúc đó bạn sẽ thấy việc code của mình đơn giản và dễ chịu hơn rất nhiều.
# 3 .Tổng kết

Như vậy là mình đã giới thiệu cho các bạn một **case study** cụ thể trong **bài toán lọc và tìm kiếm**. Nhìn thì có vẻ dài và lan man nhưng bạn chỉ cần tập trung vào **function buildQueryFromCondition** là có thể cơ bản hiểu dược **nội dung của bài viết**. Nhìn chung là sau khi bạn đi code một thời gian, đủ kiến thức để phát triển một tính năng thì cũng cố gắng tìm cách code sao cho **có tính tái sử dụng, đảm bảo có thể mở rộng được nếu cần nhé**. 

***Chúc các bạn code vui, khỏe, thoải mái !!!***