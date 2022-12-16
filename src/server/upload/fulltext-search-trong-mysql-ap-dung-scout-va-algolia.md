# I. Bài toán đặt ra
## Bài toán 1
Giả sử ta có 1 bảng dữ liệu khách hàng(có khoảng 10000 bản ghi). Bây giờ chúng ta muốn tìm 2000 khách hàng có description bắt đầu bằng từ Queen.

Câu lệnh quen thuộc mà chúng ta thường sử dụng: 
    `SELECT * FROM items WHERE description LIKE 'Queen%' LIMIT 2000` 
Trước khi xem kết quả, chúng ta hãy xem hiệu năng của câu lệnh mang lại bằng việc thêm từ khóa EXPLAIN vào trước câu lệnh trên. Ta thấy kết quả như sau:
![](https://images.viblo.asia/7991ae47-9be2-49a8-a7c9-64e4d188d2cd.png)

Ta chú ý một vài cột trong bảng dữ liệu này như:
- type: All (Sau khi thực hiện câu lệnh MySQL sẽ duyệt qua toàn bộ bản ghi để lấy ra dữ liệu - thể hiện ở cột rows MySQL đã quét hơn 1M data, nếu trong table có 10M, 100M thì chắc chắn sẽ rất mất thời gian).
- Còn một vài trường như:
    - table : Table liên quan đến output data.
    - type : Mức độ từ tốt nhất đến chậm nhất như sau: system, const, eq_ref, ref, range, index, all


## Bài toán 2
- Giả sử bạn không thể nhớ hết được cả câu cần tìm, mà chỉ nhớ được một số từ có trong câu đó thôi, thì chúng ta sẽ làm thế nào để tìm được các bản ghi đó? Nếu sử dụng câu lệnh như lúc đầu thì nó có chạy được hay không?
![](https://images.viblo.asia/0f92f597-a755-4989-a2eb-075c78998517.png)

- Câu trả lời của chúng ta là Không. Và còn rất nhiều mặt hạn chế của Search bình thường như:
    - Khi không đánh index thì Tốc độ tìm kiếm chậm.
    - Không tìm được từ đồng nghĩa.
    - Không tìm được các từ viết tắt phổ biến.
    - Không tìm kiếm cách từ như ví dụ trên.
    - Không search được do lỗi chính tả...
    - Gặp vấn đề trong tìm kiếm tiếng việt có dấu và không dấu.
 Vậy giải pháp của vấn đề trên là MySQL đã hỗ trợ thêm MySQL Fulltext Search.
 
# II. MySQL Fulltext Search(FTS)
- **Full text search là kĩ thuật tìm kiếm toàn văn cho phép tìm kiếm các mẩu thông tin khớp với một chuỗi trên một hay một số cột nhất định.**
- Một chỉ mục toàn văn trong MySQL là một chỉ mục có kiểu FULLTEXT. Các chỉ mục FULLTEXT chỉ được dùng với các bảng có thể được tạo ra từ các cột CHAR, VARCHAR, hay TEXT.
- Sử dụng cơ chế ranking(dựa trên mức độ phù hợp của các tài liệu tìm thấy, tài liệu trả về càng phù hợp thì có số rank càng cao).

## 2.1 Inverted Index
Điều làm nên sự khác biệt giữa FTS và các kĩ thuật search thông thường chính là Inverted index.
### Inverted Index là 1 kĩ thuật index trong database, một kĩ thuật quan trọng trong Fulltext Search. Thế Inverted Index là gì?
**Inverted Index là một cấu trúc dữ liệu, nhằm mục đích map giữa các từ, chữ số và các document chứa chúng.**
Cụ thể hơn:
- là kĩ thuật đánh index theo đơn vị term.
- nhằm mục đich map giữa các term với các bản ghi chưa term đó.
### Vậy việc tạo index theo term như trên có lợi thế nào?
Hãy giả sử bạn muốn query cụm từ "Son, is, Developer", thì thay vì việc phải scan từng document một, bài toán tìm kiếm document chứa 3 term trên sẽ trở thành phép toán union của 3 tập hợp
Để dễ hiểu, các bạn xem ví dụ dưới đây:
```
    D1 = "Son is Developer"
    D2 = "Developer PHP"
    D3 = "Son is Developer and Student"
```

Inverted Index:
```
    "Son" => {D1,D3}
    "is" => {D1, D3}
    "Developer" => {D1, D2, D3}
    "PHP" => {D2}
    "and" => {D3}
    "Student" => {D3}
```

**Cách hoạt động:** Đầu tiên hệ thống nó sẽ tách chuỗi tìm kiếm ra thành các từ Son, is, Developer. Sau đó sẽ tìm trong inverted index và được các tập hợp như sau:

{D1,D3}

{D1,D3}

{D1,D2,D3}

Query cụm “Son, is, Developer” thì ta sẽ có biểu thức union:
{D1,D3} union {D1,D3} union {D1, D2, D3} = {D1}

=> việc tìm kiếm trở nên nhanh hơn nhiều thay vì việc phải scan toàn bộ table để tìm ra tài liệu có chứa từ đó.

**Thực hiện FTS**
- Để thực hiện được FTS chúng ta cần lưu ý về cách đánh chỉ mục Fulltext:
- Nếu đánh chỉ mục cho 2 cột thì khi search chúng ta cũng phải điền cả 2 cột
- Thư tự đánh thế nào thì thứ tự search cũng phải vậy.
- Lưu ý: Fulltext là trường hợp đặc biệt của đánh index trong bảng Ví dụ như sau:

![](https://images.viblo.asia/6e6a4a5c-ba01-4c59-8150-2b8b78b9dee8.png)

## 2.2 Kỹ thuật Fuzzy Search
**- Fuzzy Seach** (tìm kiếm "mờ") là khái niệm để chỉ kỹ thuật để tìm kiếm một xâu "gần giống" (thay vì "giống hệt") so với một xâu cho trước.
### So sánh Substring
- Nó giống LIKE trong SQL. Giả sử như người dùng nhập vào xâu “framgia”, bạn có thể trả về những kết quả có chứa từ “framgia” như “framgia Vietnam”, “lap trinh vien framgia”.
### Khoảng cách Levenshtein
- Khoảng cách Levenshtein là số bước ít nhất biến một xâu A thành xâu B thông qua 3 phép biến đổi:
    - Thêm một ký tự
    - Bớt một ký tự
    - Thay đổi một ký tự

## 2.3 IN BOOLEAN MODE
- Search theo từ khóa tìm kiếm
- Dùng toán từ ‘+’ hoặc ‘-’ để quyết định từ nào sẽ được trả về kết quả. 
![](https://images.viblo.asia/501de23d-5823-4fe2-ad67-d6bac2b0c91b.png)

![](https://images.viblo.asia/b9b3d5c3-f5ad-4b3f-84c6-635be0ddfadc.png)

## 2.4 Query Expansion
![](https://images.viblo.asia/6f85a087-9676-4637-9a0f-aebeb0401890.png)

**MySQL sẽ thực hiện search 2 lần, trong lần search thứ 2 MySQL sẽ tìm kết hợp cụm từ tìm kiếm gốc với những từ thích hợp nổi bật so với từ khóa gốc**. Mặt khác đây chính là cái hay nhất trong fulltext search
- Tìm được từ đồng nghĩa
- Tìm được từ viết tắt
- Sửa lỗi chính tả
- Đánh lại trọng số weight

##  2.5 Đánh index kiểu B-tree
**- B-Tree là cậy tự cân bằng (self-balancing), nghĩa là khi thêm hoặc xoá 1 node thì cây sẽ có những action để đảm bảo chiều cao của cây càng thấp càng tốt. Mỗi node cha có giá trị lớn hơn node con này và nhỏ hơn node con khác. Nó sẽ tìm con trỏ bên phải bằng cách nhìn vào dữ liệu ở node pages, các node page có chứa dữ liệu của các node con.**

- Cách đánh index: ALTER TABLE users ADD INDEX idx_description(description(5)), sau đó cũng sử dụng SHOW INDEX FROM TABLE để kiểm tra và ta được kết quả sau. 
![](https://images.viblo.asia/be7e91c6-962c-4c4d-8195-e68b108deb08.png)

So sánh với câu search like lúc ban đầu, so sánh về tốc độ cũng như hiệu năng của câu lệnh sau khi được đánh index. 
![](https://images.viblo.asia/fe73c785-a388-404b-89b3-6f1e1dd88803.png)

Về hiệu năng 
![](https://images.viblo.asia/615c76bc-c872-4d28-b2fa-0985cac42a93.png)

Chú ý :
- Các chỉ mục không nên được sử dụng trong các bảng nhỏ.
- Các chỉ mục không nên được sử dụng trên các cột mà chứa một số lượng lớn giá trị NULL.
- Không nên dùng chỉ mục trên các cột mà thường xuyên bị sửa đổi (Insert, Update…)

# 3. Áp dụng FTS với Scout and Algolia Packages

Bước 1. Cài đặt ứng dụng Laravel:

    composer create-project --prefer-dist laravel/laravel blog

Bước 2. Cài đặt Packages

1. laravel/scout

    `composer require laravel/scout` 

Sau khi chạy câu lệnh thành công, mở file "config/app.php" và thêm service provider.
```
    'providers' => [
       Laravel\Scout\ScoutServiceProvider::class,
    ]
```
Chạy câu lệnh để tạo file scout.php trong thư mục config:

    php artisan vendor:publish --provider="Laravel\Scout\ScoutServiceProvider"

2. algolia/algoliasearch-client-php

    `composer require algolia/algoliasearch-client-php`

Bước 3. Cấu hình cho Packages
Giờ bạn hãy mở file .env và thêm id và sercet vào như dưới đây.

```
    ALGOLIA_APP_ID=<app id>
    ALGOLIA_SECRET=<app secret>
```
    
Bước 4. Thiết lập Model

```
    use Laravel\Scout\Searchable;
    use Illuminate\Database\Eloquent\Model;

    class Post extends Model
    {
       use Searchable;
    }
```

Bước 5: Cấu hình chỉ mục

```
    class Post extends Model
    {
       public function searchableAs()
       {
          return 'content';
       }

       public function toSearchableArray()
       {
          $array = $this->toArray();
          return $array;
       }
    }
```

Bước 6: Đánh chỉ mục

    `php artisan scout:import "App\Post"`

Bước 7: Truy vấn

```
    Route::get('/search', function (Request $request) {
       return App\Post::search($request->search)->get();
    });
```

# 4. Kết luận
Đây là phân giới thiệu chi tiết để các bạn có thẻ nắm được phần nào về Fulltext search cũng như là cách đánh index. Hiện nay có rất nhiều engine package hỗ trợ tìm kiếm rất tốt như: Algolia (mất phí), elasticsearch...nhưng việc tìm hiểu trên MySQL vẫn có gì đó hay ho hơn.