![](https://images.viblo.asia/2972370f-3c92-4572-8281-7e43dce90496.png)

# CQRS là gì ? 
CQRS là một pattern cho việc xử lý CRUD dữ liệu, viết tắt của từ Command Query Responsibility Segregation. Trong đó bóc tách thành 2 thành phần `Command` và `Query` .
- Command : là các thao tác ghi dữ liệu - WRITE
- Query : là các thao tác đọc dữ liệu - READ

Tư tưởng của CQRS, là các thao tác Query thì cần tách biệt với các thao tác Command, để tránh xẩy ra các ảnh hưởng phụ về business process và tạo các luồng xử lý rõ ràng, chặt chẽ.

Được gói gọn như sau: 
- Query: select và trả về dữ liệu, nhưng không thay đổi trạng thái của hệ thống
- Command : thay đổi dữ liệu/thay đổi trạng thái hệ thống, nhưng không trả về dữ liệu

**Mục đích của bài viết này nhằm trình bày, khi áp dụng CQRS vào coding thì sẽ như thế nào, không nhằm giải thích các lập luận.**

Vì vậy, để hiểu rõ hơn các lập luận về kiến trúc CQRS, có lẽ bước đầu tiên các bạn cần tìm hiểu một vài khái niệm về CQS (Command Query Separation) , Command, Query và Command Bus.

Các bạn có thể tham khảo tại:

- CQRS – Simple architecture : 
https://www.future-processing.pl/blog/cqrs-simple-architecture/  
- Một bản dịch khá hay : 
https://edwardthienhoang.wordpress.com/2018/01/26/command-query-responsibility-segregation-cqrs/

## CQRS với Spring Boot demo
Trong bài viết mình sử dụng Spring Boot làm một demo nhỏ. 

Để tạo Spring Boot project , các bạn có thể generate từ đây https://start.spring.io/  hoặc trên IDE ( intelij chẳng hạn).

Như cấu trúc project thông thường, mình cũng sẽ có các layers như sau .
-   Service layer
    -   IBookQueryService
    -   IBookCommandService
-   Controller layer
    -   BookQueryController
    -   BookCommandController
-   Representations
    -   BookQueryDto
    -   BookCreateCommandDto
### Service 

Thao tác giữa 2 vai trò READ và WRITE đuọc tách biệt trong IBookQueryService và IBookCommandService như sau.

``` Java
public interface IBookQueryService {
    
    List<Book> getAllBooks();

    Book getBookInfo(String bookId);

}
```


``` Java
public interface IBookCommandService {
    void create(String name, Date publishDate);
}
```

### Controller
BookQueryController sẽ gồm có các resource SELECT,cũng sẽ Autowired IBookQueryService ở Query Controller tương ứng

``` Java
@Controller
public class BookQueryController {

    @Autowired
    private IBookQueryService bookQueryService;

    @GetMapping("/books")
    @ResponseBody
    public List<Book> allBooks() {
        return bookQueryService.getAllBooks();
    }

    @GetMapping("/books/{bookId}")
    @ResponseBody
    public ResponseEntity<Book> bookInfo(@PathVariable("bookId") String bookId) {
        Book bookInfo = bookQueryService.getBookInfo(bookId);
        if (bookInfo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(bookInfo);
    }
}
```


``` Java
@Controller
public class BookCommandController {

    @Autowired
    private IBookCommandService bookCommandService;

    @PostMapping("/book/create")
    @ResponseStatus(HttpStatus.OK)
    public void createBook(@RequestBody BookCreateCommandDto dto) {
        bookCommandService.create(dto.getName(), dto.getPublishDate());
    }
}
```

### Representations
Tiếp theo là các data transfer object, các lớp sẽ được convert từ Entity.

Trong ví dụ này,  [Book](https://github.com/manhnv118/cqrs-simple-architecture/blob/master/src/main/java/manhnv/web/manhnv/cqrs/sample/entity/Book.java) như một minh họa của class Entity mapping với table trong database. 

``` Java
@Data
public class BookCreateCommandDto {
    private String name;
    private Date publishDate;
}
```

# Tổng kết
Cơ bản mình đã trình bày xong tổng quát về CQRS. 

Tư tưởng của CQRS rất rõ ràng, chặt chẽ.
Một `Query request` thì cần tách biệt với `Command request`.
- Query: chỉ select và trả về dữ liệu, nhưng không thay đổi data
- Command : update thay đổi dữ liệu, nhưng không trả về dữ liệu

Bài viết có sử dụng một số hình ảnh từ internet, full source code bạn có thể download từ link dưới.

# Download 
Full source code demo: 
https://github.com/manhnv118/cqrs-simple-architecture