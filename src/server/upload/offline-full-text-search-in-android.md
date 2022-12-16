# Tổng quan
Full-text search (FTS) - khái niệm không còn quá xa lạ đối với chúng ta. Và khi nói đến FTS, chắc không thể không liên tưởng đến [Elasticsearch](https://www.elastic.co/) đúng không nào? Nhưng trong bài viết này, mình sẽ đề cập đến Offline FTS - nghĩa là sẽ search với data được lưu trữ trên chính thiết bị của bạn. Tại sao lại như vậy?

Bởi vì SQLite đã hỗ trợ FTS và nó có sẵn cho Android và cả iOS.
# Why FTS?
Giả sử chúng ta đang có một hệ thống tìm kiếm sách theo title. Nếu dùng câu truy vấn bình thường thì chúng ta sẽ có như sau:
| ID | Title | Published Year |
| -------- | -------- | -------- |
| 1     | The Alchemist     | XXXX     |
| 2     | Thank You For Being My Friend     | XXXX     |
| 3     | To Kill A Mockingbird     | XXXX     |
| 4     | Say Please, Little Bear     | XXXX     |
| 5     | Christmas: The Snow Queen     | XXXX     |

```
Keyword: 'mockingbird'
=> SELECT * FROM books WHERE title LIKE '%mockingbird%';
```

Mỗi khi user tìm kiếm, hệ thống sẽ thực hiện một câu truy vấn như vậy và phải scan toàn bộ table *books* để tìm kiếm tên sách ứng với *keyword*. Bởi vì để biết tên sách có chứa *keyword* hay không chúng ta phải kiểm tra title của từng quyển sách một trong table.

Với FTS, dữ liệu được đánh index và hệ thống sẽ dựa vào index để đưa ra kết quả tìm kiếm.

# How it works?

Như mình đã đề cập, module [FTS5](https://www.sqlite.org/fts5.html) của SQLite cho phép chúng ta triển khai FTS mà không cần phải setup một công cụ nào khác ở server (như Elasticsearch).
Bây giờ, mình sẽ tạo một ứng dụng tìm kiếm sách và sử dụng database local.

Và để sử dụng **FTS5**, chúng ta cần define table như sau:
```
CREATE VIRTUAL TABLE books USING FTS5(title);
```

Với câu lệnh trên, chúng ta vừa tạo ra một table sử dụng module **FTS5** cho chức năng FTS. Ngoài ra, còn có option *UNINDEXED* nếu các bạn muốn cho một field nào đó không được đánh index.

```
CREATE VIRTUAL TABLE books USING FTS5(title, published_year UNINDEXED);
```

Và insert sample data vào table
```
INSERT INTO movies ('title', 'published_year') 
VALUES ('The Alchemist', 'XXXX'), 
       ('Thank You For Being My Friend', 'XXXX'),
       ('To Kill A Mockingbird', 'XXXX'),
       ('Say Please, Little Bear', 'XXXX'),
       ('Christmas: The Snow Queen', 'XXXX');
```

Và với ví dụ trên, chúng ta sẽ thực thi câu query như sau:

```
Keyword: 'mockingbird'
=> SELECT * FROM books WHERE books MATCH 'mockingbird';
```

Và khi sử dụng FTS, chúng ta không cần phải khai báo field trong mệnh đề **WHERE**, mà FTS sẽ tự động search theo các field mà bạn đã đánh index.
Trường hợp nếu muốn thực hiện *autocomplete*, cần show ra danh sách các quyển sách match với *keyword* mà người dùng nhập vào. Trong trường hợp này, các *keyword* có thể sẽ là:
```
mocking
bird
mockingbird
```
Vậy nên ta cần update lại câu query ở trên như sau:

```
=> SELECT * FROM books WHERE books MATCH '*keyword*';
```

Câu query ở trên sẽ lấy tất cả các quyển sách có title chứa *keyword* mà user nhập.

Ví dụ
```
Keyword: 'as'
=> SELECT * FROM books WHERE books MATCH '*as*';
```
Kết quả sẽ là:

| ID | Title | Published Year |
| -------- | -------- | -------- |
| 4     | Say Please, Little Bear     | XXXX     |
| 5     | Christmas: The Snow Queen     | XXXX     |

## Rank the results
Tất nhiên, chúng ta sẽ phải sắp xếp kết quả tìm kiếm được theo thứ tự chính xác so với *keyword*. Và với phiên bản **FTS3** và **FTS4**, chúng ta phải tự implement chức năng này và thực hiện xếp hạng kết quả. Nhưng ở phiên bản **FTS5**, việc xếp hạng vô cùng dễ dàng với câu query như sau:

```
SELECT * FROM books WHERE books MATCH '*keyword*' ORDER BY rank;
```

Để tìm hiểu thêm về cách tính toán và xếp rank, các bạn có thể đọc thêm ở [đây](https://en.wikipedia.org/wiki/Okapi_BM25).

## Weights for fields

Đây chỉ là sample app, giả sử table của chúng ta có nhiều hơn một field được đánh index và khi search tất cả các field được đánh index sẽ được so sánh, thế nhưng chúng ta lại muốn kết quả so sánh với một field nào đó được sếp rank cao hơn?
Giả sử như chúng ta có hai field `title` và `description` và khi user nhập một *keyword* nào đó, bạn muốn hiển thị cho người dùng danh sách kết quả có *title* match với *keyword* được sếp rank cao hơn so với *description*?

```
CREATE VIRTUAL TABLE books USING FTS5(title, description, published_year UNINDEXED);

INSERT INTO movies ('title', 'description', 'published_year') 
VALUES ('The Alchemist', 'blabla...', 'XXXX'),
       ('Thank You For Being My Friend', 'blabla...', 'XXXX'),
       ('To Kill A Mockingbird', 'blabla...', 'XXXX'),
       ('Say Please, Little Bear', 'blabla...', 'XXXX'),
       ('Christmas: The Snow Queen', 'blabla...', 'XXXX');
```

Câu query của chúng ta sẽ như sau:
```
SELECT * FROM books WHERE books MATCH '*keyword*' AND rank MATCH 'bm25(10.0, 1.0)' ORDER BY rank;
```

* Nếu chúng ta không chỉ định hàm *rank* mà chỉ sử dụng *ORDER BY rank*, SQLite sẽ tự động sử dụng hàm *bm25()* mà không có tham số đầu vào (nghĩa là các field được đánh index sẽ có trọng số ngang nhau). Vì vậy để thay đổi trọng số cho các field theo ý muốn, chúng ta cần truyền vào thông số cho hàm *bm25()* như ví dụ ở trên. Và thứ tự sẽ dựa theo thứ tự các field mà chúng ta đã khai báo khi tạo bảng.

# Kết luận
Module **FTS5** trong SQLite hỗ trợ việc tìm kiếm Offline FTS trong cả Android lẫn iOS mà không cần phải phụ thuộc vào bất kì các plugin, engineer hay bất kì một server nào từ bên ngoài. Vì vậy nó rất thuận tiện cho các ứng dụng cá nhân.

Cảm ơn các bạn đã đọc bài.
## Tham khảo
AndroidPub