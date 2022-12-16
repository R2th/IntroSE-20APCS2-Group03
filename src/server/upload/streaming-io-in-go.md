Trong Go, các hoạt động đầu vào và đầu ra được thực hiện bằng cách sử dụng các  mô hình hóa dữ liệu nguyên thủy dưới dạng các luồng byte có thể được đọc hoặc ghi vào. Để thực hiện việc này, gói Go IO cung cấp các giao diện(interface)  io.Reader và io.Writer, cho các hoạt động nhập và xuất dữ liệu tương ứng, như thể hiện trong hình bên dưới:
![](https://images.viblo.asia/617a79d3-0d30-431a-8a7b-22a69e15970d.png)

Go đi kèm với nhiều API hỗ trợ truyền trực tuyến IO từ các tài nguyên như cấu trúc trong bộ nhớ, tệp, kết nối mạng, đến một vài cái tên. Bản ghi này tập trung vào việc tạo các chương trình Go có khả năng truyền dữ liệu trực tuyến bằng các giao diện io.Reader và io.Writer sử dụng các triển khai tùy chỉnh cũng như các chương trình từ thư viện chuẩn. <br>

# Io.Reader
Một trình đọc, được đại diện bởi giao diện io.Reader, đọc dữ liệu từ một số nguồn vào một bộ đệm truyền , nơi nó có thể được truyền trực tuyến và sử dụng, như được minh họa bên dưới:
![](https://images.viblo.asia/f0c3f9d3-c470-4865-bb9e-679e61c2fa96.png)

Để một loại hoạt động như một trình đọc, nó phải triển khai phương thức Read(p []byte) từ giao diện io.Reader(được hiển thị bên dưới):<br>
```
type Reader interface {
    Read(p []byte) (n int, err error)
}
```

Việc triển khai Read()phương thức sẽ trả về số byte đã đọc hoặc lỗi nếu xảy ra. Nếu nguồn đã hết nội dung, Đọc sẽ trở lại io.EOF.<br>
## Quy tắc đọc
Sau phản hồi trên Reddit, tôi đã quyết định thêm phần này về cách đọc có thể hữu ích. Hành vi của người đọc sẽ phụ thuộc vào việc triển khai nó, tuy nhiên, có một số quy tắc, từ tài liệu io.Reader mà bạn nên biết khi sử dụng trực tiếp từ người đọc:
1. Read() sẽ đọc đến  len(p) bên trong p, khi có thể.
2. Sau một Read()cuộc gọi, ncó thể ít hơn sau đó len(p).
3. Khi có lỗi, Read()vẫn có thể trả về nbyte trong bộ đệm p. Ví dụ: đọc từ một ổ cắm TCP bị đóng đột ngột. Tùy thuộc vào việc sử dụng của bạn, bạn có thể chọn giữ nguyên byte phoặc thử lại.
4. Khi một Read()dữ liệu có sẵn cạn kiệt, một trình đọc có thể trả về một khác 0 nvà err=io.EOF. Tuy nhiên, tùy thuộc vào việc triển khai, reader có thể chọn trả về khác 0 n và err = nil ở cuối luồng. Trong trường hợp đó, bất kỳ tiếp theo lần đọc phải trở lại n=0, err=io.EOF.
5. Cuối cùng, một cuộc gọi đến Read() điều đó trở lại n=0 và err=nil không có nghĩa là EOF là lần gọi tiếp theo Read() có thể trả lại nhiều dữ liệu hơn.

Như bạn có thể thấy, việc đọc đúng một luồng trực tiếp từ một reader có thể rất khó. May mắn thay, các readers từ thư viện tiêu chuẩn tuân theo các cách tiếp cận hợp lý giúp truyền phát dễ dàng. Tuy nhiên, trước khi sử dụng reader, hãy tham khảo tài liệu của nó.
## Truyền dữ liệu từ readers 
Truyền dữ liệu trực tiếp từ reader thật dễ dàng. Phương thức Read được thiết kế để được gọi trong một vòng lặp, với mỗi lần lặp, nó đọc một đoạn dữ liệu từ nguồn và đặt nó vào bộ đệm p. Vòng lặp này sẽ tiếp tục cho đến khi phương thức trả về io.EOFlỗi. <br>
Sau đây là một ví dụ đơn giản sử dụng trình đọc chuỗi, được tạo bằng strings.NewReader(string), để truyền các giá trị byte từ nguồn chuỗi:<br>
{@embed: https://gist.github.com/hoangnt-2197/65eeba76229e45da2e0856c4a2730a8a}

Mã nguồn trên tạo một bộ đệm truyền dài 4 bytep với make([]byte,4). Bộ đệm được giữ có mục đích nhỏ hơn độ dài của nguồn chuỗi. Điều này là để chứng minh cách phân luồng dữ liệu từ một nguồn lớn hơn bộ đệm.<br>
Cập nhật: ai đó trên Reddit đã chỉ ra rằng phần trước có một lỗi. Mã sẽ không bao giờ bắt được các trường hợp có lỗi không phải là nil! = Io.EOF. Sau đây là mã sửa lại. <br>
{@embed: https://gist.github.com/hoangnt-2197/1f6e793cd1a534d6e776f4ccfab453ef}

## Triển khai một tùy trình io.Reader 
Phần trước sử dụng triển khai trình đọc IO hiện có từ thư viện chuẩn. Bây giờ, hãy xem cách viết triển khai của riêng chúng ta. Sau đây là một triển khai nhỏ của một io.Readertrong đó lọc ra các ký tự không phải chữ cái khỏi luồng của nó.<br>
{@embed: https://gist.github.com/hoangnt-2197/75523d2fa09c32ad0ea800edec6b1f53}
Khi chương trình được thực thi, nó sẽ in ra: <br>
```
$> go run alpha_reader.go
HelloItsamwhereisthesun
```
## Chuỗi Readers 
Thư viện chuẩn đã có nhiều readers thực hiện. Đó là một thành ngữ phổ biến khi sử dụng một reader làm nguồn của một reader khác. Chuỗi các trình đọc này cho phép một reader sử dụng lại logic từ một reader khác như được thực hiện trong đoạn mã nguồn sau đây cập nhật alphaReader để chấp nhận một io.Reader làm nguồn của nó. Điều này làm giảm độ phức tạp của mã bằng cách chuyển các mối quan tâm về quản lý luồng cho trình đọc gốc.
{@embed: https://gist.github.com/hoangnt-2197/a18b5215fd895998ad4b38e6bd30cb37}

Một ưu điểm khác của cách tiếp cận này alphaReaderlà hiện có khả năng đọc từ bất kỳ trình đọc nào. Ví dụ: đoạn mã sau cho biết cách alphaReadercó thể được kết hợp với một os.Filenguồn để lọc ra các ký tự không phải chữ cái từ một tệp:<br>
{@embed: https://gist.github.com/hoangnt-2197/aabb3c5eae2fa0d756258137500eef24}
# io.Writer
Người viết, được đại diện bởi giao diện io.Writer, truyền dữ liệu từ bộ đệm và ghi nó vào tài nguyên đích như minh họa bên dưới:<br>
![](https://images.viblo.asia/1db78ce1-d6a6-44d0-8884-50dece13fcfc.png)
Tất cả người viết luồng phải triển khai phương thức Write(p []byte)từ giao diện io.Writer(hiển thị bên dưới). Phương thức này được thiết kế để đọc dữ liệu từ bộ đệm pvà ghi nó vào một tài nguyên đích được chỉ định.<br>
```
type Writer interface {
    Write(p []byte) (n int, err error)
}
```
Việc triển khai Write()phương thức sẽ trả về số byte được ghi hoặc lỗi nếu có. <br>
## Sử dụng writers 
Thư viện tiêu chuẩn đi kèm với nhiều io.Writer loại được triển khai trước . Làm việc với các writers trực tiếp là đơn giản như trong đoạn mã sau đây,  sử dụng loại bytes.Buffer như một io.Writer để ghi dữ liệu vào một bộ nhớ đệm.
{@embed: https://gist.github.com/hoangnt-2197/b7690400cedcfd83419b405fd8f7a558}
## Triển khai một tùy chỉnh io.Writer 
Đoạn mã trong phần này cho biết cách triển khai một tùy chỉnh io.Writerđược gọi là chanWriterghi nội dung của nó vào kênh Go dưới dạng một chuỗi các byte. <br>
{@embed: https://gist.github.com/hoangnt-2197/7f76f41d071e20f54b41d1cff391214a}
Để sử dụng trình viết, mã chỉ cần gọi phương thức writer.Write()(trong một quy trình riêng) trong hàm main(). Bởi vì chanWriter cũng thực hiện giao diện io.Closer, phương thức writer.Close() được gọi để đóng kênh đúng cách để tránh bất kỳ bế tắc nào khi truy cập kênh. <br>
# Các types và packages hữu ích cho IO
Như đã đề cập, thư viện chuẩn Go đi kèm với nhiều chức năng hữu ích và các loại khác giúp bạn dễ dàng làm việc với streaming IO .
# os.File
Loại os.Fileđại diện cho một tệp trên hệ thống cục bộ. Nó thực hiện cả hai io.Reader và io.Writer và do đó, có thể được sử dụng trong bất kỳ bối cảnh IO trực tuyến nào. Ví dụ: ví dụ sau cho thấy cách ghi các lát chuỗi liên tiếp trực tiếp vào một tệp:<br>
{@embed: https://gist.github.com/hoangnt-2197/76de2a2439562052dd9409f1e46d9103}

Ngược lại, kiểu io.Filecó thể được sử dụng như một trình đọc để truyền trực tuyến nội dung của tệp từ hệ thống tệp cục bộ. Ví dụ: đoạn mã nguồn sau đây đọc một tệp và in nội dung của nó: <br>
{@embed: https://gist.github.com/hoangnt-2197/633749a7743520d697378bb7e8f8c1e2}

## Các tiêu chuẩn output, input và error
Các osgói cho thấy ba biến, os.Stdout, os.Stdin, và os.Stderr, đó là loại *os.Fileđại diện xử lý tập tin cho đầu ra của hệ điều hành tiêu chuẩn, đầu vào, và lỗi tương ứng. Ví dụ: đoạn mã nguồn sau in trực tiếp ra đầu ra tiêu chuẩn:
{@embed: https://gist.github.com/hoangnt-2197/1dbc737dfc1381e9cc37ef079085c1b3}
## io.Copy ()
Chức năng io.Copy() giúp dễ dàng truyền dữ liệu từ trình đọc nguồn đến trình ghi mục tiêu. Nó tóm tắt mô hình vòng lặp for (chúng ta đã thấy cho đến nay) và xử lý đúng cách io.EOF và số lượng byte.<br>
Phần sau cho thấy phiên bản đơn giản của chương trình trước đó sao chép nội dung của trình đọc trong bộ nhớ proberbs và sao chép nó sang trình viết file:<br>*
{@embed: https://gist.github.com/hoangnt-2197/d83ad16026084c2d6b9e90d263dd29d8}
Tương tự, chúng ta có thể viết lại chương trình trước đó đọc từ một tệp và in ra đầu ra tiêu chuẩn bằng cách sử dụng io.Copy()hàm như hình dưới đây:<br>
{@embed: https://gist.github.com/hoangnt-2197/21908fbdfb78e7d61e8cb96d7c8e0e8c}
## io.WriteString ()
Hàm này cung cấp sự tiện lợi khi viết một giá trị chuỗi vào một trình ghi cụ thể:<br>
{@embed: https://gist.github.com/hoangnt-2197/b14b22fca707623b39dda628b87f51b2}
## Pipe writers và readers
Loại io.PipeWriter và io.PipeReader Mô hình IO hoạt động như trong các ống bộ nhớ. Dữ liệu được ghi vào đầu ghi của ống và được đọc trên đầu đọc của ống bằng cách sử dụng các quy trình truy cập riêng biệt. Phần sau tạo cặp đầu đọc / ghi đường ống bằng cách sử dụng cặp io.Pipe() mà sau đó được sử dụng để sao chép dữ liệu từ bộ đệm proverbs sang io.Stdout:<br>
{@embed: https://gist.github.com/hoangnt-2197/6f3824d0b0b5f7598a8210a4329e0a24}
## Buffered IO
Go hỗ trợ IO được đệm qua gói bufiogiúp dễ dàng làm việc với nội dung văn bản. Ví dụ: chương trình sau đây đọc nội dung của một tệp được phân tách theo từng dòng bằng giá trị '\n': <br>
https://gist.github.com/hoangnt-2197/4fc3089706e58ef298d4667162d04060
## Util package
Package ioutil, một gói phụ của io, cung cấp một số chức năng tiện lợi cho IO. Ví dụ: hàm sau sử dụng ReadFile để tải nội dung của tệp vào a []byte. <br>
{@embed: https://gist.github.com/hoangnt-2197/569e181c06bd59591b9e978fec1b1a7d}
# Kết luận
Vậy trong bài viết này mình đã giới thiệu cho các bạn về io.io.Reader và io.Writer, cũng như giới thiệu qua cho các bạn các loại và gói io hay dùng trong go. Hi vọng bài viết này đêm lại nhiều giá trị cho các bạn !
Tài liệu tham khảo : https://medium.com/learning-the-go-programming-language/streaming-io-in-go-d93507931185