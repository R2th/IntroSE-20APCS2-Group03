Sau 6 tháng kể từ ngày Java 10 release thì JDK 11 đã ra mắt. Trong 6 tháng thì Java đã trang bị thêm những gì, chúng ta điểm qua một số điểm nổi bật nhé
## 1. java.lang.String 

Có lẽ sự thay đổi trong String là một trong những thay đổi quan trọng nhất trong API JDK 11. Có một số method mới hữu dụng dưới đây.
1. *boolean isBlank ()*: return true nếu chuỗi rỗng hoặc chỉ chứa dấu cách, ngược lại trả về false.
2. *Stream lines()*: trả về các chuỗi được trích xuất từ chuỗi này
3. *String repeat (int)*: trả về 1 chuỗi có giá trị là ghép nối chuỗi ban đầu n lần
4. *String strip ()*: Trả về một chuỗi mà tất cả dấu cách được xóa
5. *String stripLeading ()*: và String stripTrainling (): loại bỏ khoảng trắng ở đầu hoặc cuối

## 2.java.nio.file.Files

1. *String readString (Path)*: đọc tất cả nội dung từ một tệp thành một chuỗi, giải mã byte thành các ký tự bằng cách sử dụng mã hóa UTF-8 .

2. *String readString (Path, Charset)*: hoạt động giống như phương thức (1), chỉ giải mã byte thành ký tự sử dụng Charset.

3. *Path writeString (Path, CharSequence, java.nio.file. OpenOption [])*: Nếu ta viết một chuỗi ký tự CharSequence vào một tệp, các ký tự này sẽ được mã hóa theo byte (sử dụng UTF-8 ).

4. *Path writeString (Path, CharSequence, java.nio.file. Charset, OpenOption [])*: hoạt động giống như method (3), nhưng việc mã hóa các ký tự theo byte được thực hiện bằng cách sử dụng Charset

## 3. java.util.concurrent.PriorityBlockingQueue java.util.PriorityQueue
1. *void forEach (java.util.function.Consumer):* thực hiện hành động được chỉ định cho từng mục của Iterable cho đến khi tất cả các phần tử đã được xử lý.

2. *boolean removeAll (java.util.Collection)*: xóa tất cả các phần tử của Collection.

3. *boolean removeIf (java.util.function.Predicate)*: Loại bỏ tất cả các phần tử của Collection này thỏa mãn điều kiện đưa vào.

## 4. java.util.function.Predicate
*Predicate not(Predicate)*: trả về phủ định của Predicate truyền vào.
Mời các bạn xem thêm các cách viết sau nhé: 
```
lines.stream ()

.filter (s ->! s.isBlank ())
```
```
lines.stream ()

.filter (Predicate.not (String :: ISBLANK))
```
```
lines.stream ()
.filter (not(String :: ISBLANK))
```
## 5. javax.swing.DefaultComboBoxModel javax.swing.DefaultListModel
1. *void addAll (Collection)*: thêm tất cả các phẩn tử có trong Collection.

2. *void addAll (int, Collection)*: thêm tất cả các phần tử có trong Collection, bắt đầu từ index được chỉ định.

## 6. Others
Ngoài các thay đổi lớn phía trên còn có các bổ sung khác của JDK 11, các bạn có thể tự tìm hiểu nhé, ví dụ như:
1. java.io.ByteArrayOutputStream:
*void writeBytes (byte [])*

2. java.io.InputStream:
*io.InputStream nullInputStream ()*

3. java.io.OutputStream:
*io.OutputStream nullOutputStream ()*

4. java.io.Reader:
*io.Reader nullReader ()*

5. java.io.Writer:
*io.Writer nullWriter ()*

6. java.lang.ref.Reference:
*lang.Object clone ()*

### Have fun coding !!!