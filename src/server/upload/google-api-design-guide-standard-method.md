Trong phần này, mình sẽ giới thiệu những standard methods trong Google Design APIs. Nó là:

- List
- Get
- Create
- Update
- Delete

Những standard methods này giúp làm giảm độ phức tạp và tăng tính nhất quán khi thiết kế API. Khoảng 70% các APIs trong Google APIs là các standard methods. Còn lại là các custom methods. Standard methods này rất dễ để developer học hỏi và sử dụng.

Dưới đây là bảng map giữa standard methods  và  HTTP methods

|Standard method| HTTP method | HTTP Request Body | HTTP Response Body
|---|---|---|---|
| List | GET: collection URL | N/A | Resource* list  |
| Get  | GET: resource URL  | N/A  | Resource*  |
| Create  | POST: collection URL  | Resource  | Resource*  |
| Update  | PUT/PATCH: resource URL  | Resource  | Resource*  |
| Delete  | DELETE: resource URL  | N/A  | google.protobuf.Empty**  |

Dưới đây mà những mô tả chi tiết về từng standard methods.

## List

Method `List` sẽ trả về danh sách dữ liệu. Method `List` có thể  không hoặc đi kèm thêm các parameters. Output sẽ match với các parameters input.

`List` thường xuyên được sử dụng như một công cụ search resource. List dữ liệu phù hợp sẽ bị giới hạn về kích thước và không được lưu trong cached. Nếu bạn mong muốn tìm kiếm dữ liệu với kích thước rộng hơn, lúc đó, custom method `Search` sẽ được sử dụng thay thế `List`.

HTTP mapping:

- `List` method phải sử dụng HTTP GET verd.
- Sẽ không có request body ở trong method này.
- Response trả về nên là list resource đi cùng với optional metadata.

Example+
```proto
// Lists books in a shelf.
rpc ListBooks(ListBooksRequest) returns (ListBooksResponse) {
  // List method maps to HTTP GET.
  option (google.api.http) = {
    // The `parent` captures the parent resource name, such as "shelves/shelf1".
    get: "/v1/{parent=shelves/*}/books"
  };
}

message ListBooksRequest {
  // The parent resource name, for example, "shelves/shelf1".
  string parent = 1;

  // The maximum number of items to return.
  int32 page_size = 2;

  // The next_page_token value returned from a previous List request, if any.
  string page_token = 3;
}

message ListBooksResponse {
  // The field name should match the noun "books" in the method name.  There
  // will be a maximum number of items returned based on the page_size field
  // in the request.
  repeated Book books = 1;

  // Token to retrieve the next page of results, or empty if there are no
  // more results in the list.
  string next_page_token = 2;
}
```

## Get

Method `Get` sẽ lấy ra một resouce được chỉ định. Tất nhiên, `Get` không hoặc có thể sẽ có đi kèm parameters. Giá trị nhận được sẽ thỏa màn parameters đó.

HTTP mapping:

- `Get` method `phải` sử dụng HTTP GET verd.
- Resource nào được chỉ định lấy ra, resource name nên map URL path.
- Những remaining request message fields sẽ map trong URL query parameters.
- Request sẽ không có request body.
- Resource data sẽ được thể hiện toàn bộ trong response body. 

Example:
```proto
// Gets a book.
rpc GetBook(GetBookRequest) returns (Book) {
  // Get maps to HTTP GET. Resource name is mapped to the URL. No body.
  option (google.api.http) = {
    // Note the URL template variable which captures the multi-segment resource
    // name of the requested book, such as "shelves/shelf1/books/book2"
    get: "/v1/{name=shelves/*/books/*}"
  };
}

message GetBookRequest {
  // The field will contain name of the resource requested, for example:
  // "shelves/shelf1/books/book2"
  string name = 1;
}
```

## Create

Method `Create` sẽ tạo ra dữ liệu, a resource. Ví dụ mình có API

- /api/v1/users.

Resouce được tạo ra từ method `Create` sẽ `phải` là user mà không phải product hay cái gì đó. Method `Create` có thể có hoặc không đi kèm parameters.

HTTP mapping:

- `Create` method phải sử dụng HTTP POST verd.
- Trong Url path, nên chỉ định một từ để thể hiện ý nghĩa của resource sẽ được tạo ra. Ví dụ như ta một tạo ra một resouce book. Đường dẫn của ta sẽ phải là: `/api/v1/books`. Chẳng hạn vậy.
- Những remaining request message fields sẽ map trong URL query parameters.
- Request body phải chứa resource sẽ được tạo ra.
- Resource được tạo ra sẽ được thể hiện toàn bộ trong response body. 

Example:

```proto
// Creates a book in a shelf.
rpc CreateBook(CreateBookRequest) returns (Book) {
  // Create maps to HTTP POST. URL path as the collection name.
  // HTTP request body contains the resource.
  option (google.api.http) = {
    // The `parent` captures the parent resource name, such as "shelves/1".
    post: "/v1/{parent=shelves/*}/books"
    body: "book"
  };
}

message CreateBookRequest {
  // The parent resource name where the book is to be created.
  string parent = 1;

  // The book id to use for this book.
  string book_id = 3;

  // The book resource to create.
  // The field name should match the Noun in the method name.
  Book book = 2;
}

rpc CreateShelf(CreateShelfRequest) returns (Shelf) {
  option (google.api.http) = {
    post: "/v1/shelves"
    body: "shelf"
  };
}

message CreateShelfRequest {
  Shelf shelf = 1;
}
```

## Update

Method `Update` đúng như ý nghĩa của nó là update resouce được chỉ định. Nhấn mạnh là resouce cụ thể, được chỉ định, chứ không phải toàn bộ resouce hay một vài resouce. `Update` sẽ cập nhật thông tin mới và trả về thông tin đã được cập nhật.

Nhưng resource properties có thể thay đổi được thì nên sử dụng method `Update`. Khi bạn muốn `rename` hoặc `move` a resource, bạn cần sử dụng một custom method. Không bao giờ được sử dụng method `Update` ở trường hợp này.

HTTP mapping:

- `Update` method khi hỗ trợ toàn bộ cho resource thì sẽ phải sử dụng  HTTP PUT verb.
- `Update` method khi chỉ hỗ trợ một phần resource thì sẽ phải sử dụng HTTP PATCH verb.
- Resouce được chỉ định được `update` sẽ được gắn vào URL.
- Request body sẽ chứa properties của resource.
- Response sẽ phải chứa resource đã được cập nhật.

Trong một số trường hợp, method `Update` cũng nên support `Create` method. Lý do là bởi, trong thiết kế API, có thể `Update` là method duy nhất có thể create resources.

Example:

```proto
// Updates a book.
rpc UpdateBook(UpdateBookRequest) returns (Book) {
  // Update maps to HTTP PATCH. Resource name is mapped to a URL path.
  // Resource is contained in the HTTP request body.
  option (google.api.http) = {
    // Note the URL template variable which captures the resource name of the
    // book to update.
    patch: "/v1/{book.name=shelves/*/books/*}"
    body: "book"
  };
}

message UpdateBookRequest {
  // The book resource which replaces the resource on the server.
  Book book = 1;

  // The update mask applies to the resource. For the `FieldMask` definition,
  // see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask
  FieldMask update_mask = 2;
}
```

## Delete

Method `Delete` được thiết kế để xóa hoặc đặt schedules cho quá trình xóa một resouce được chỉ định. `Delete` method nên trả về  google.protobuf.Empty`.

Một API không nên sử dụng thông tin nào được trả về  từ method này. Bởi vì, nó không thể gọi nhiều lần. Xóa một lần là mất tiêu rồi còn xóa lần sau sao được nữa :v

HTTP mapping:

- `Delete` method phải sử dụng  HTTP DELETE verb.
- Resource được chỉ định xóa phải nằm trên URL path.
- Request body không được tồn tại ở method này.
- Nếu `Delete` method sẽ xóa ngay lập tức resouce, response trả về nên là empty response.
- Nếu `Delete` method chỉ đánh dấu là resource nào sẽ bị xóa, response nên trả về the updated resource.

Example:

```proto
// Deletes a book.
rpc DeleteBook(DeleteBookRequest) returns (google.protobuf.Empty) {
  // Delete maps to HTTP DELETE. Resource name maps to the URL path.
  // There is no request body.
  option (google.api.http) = {
    // Note the URL template variable capturing the multi-segment name of the
    // book resource to be deleted, such as "shelves/shelf1/books/book2"
    delete: "/v1/{name=shelves/*/books/*}"
  };
}

message DeleteBookRequest {
  // The resource name of the book to be deleted, for example:
  // "shelves/shelf1/books/book2"
  string name = 1;
}
```

Source: https://cloud.google.com/apis/design/standard_methods