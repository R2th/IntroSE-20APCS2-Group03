Gần 2 tháng trời ăn nằm với Golang, cũng nếm đủ vị chua-cay-ngọt-bùi. Cứ nghĩ đến viễn cảnh ứng dụng của mình mà được lên production thì sẽ nở mày nở mặt với đồng nghiệp. Nhưng đời không như mơ, khi ứng dụng đang chạy ở môi trường UAT, khi tôi còn đang chìm đắm trong giấc ngủ sau thời gian dài cố gắng hoàn thành deadline thì đ' hiểu sao nhận được cái thông báo lỗi **TOO MANY CONNECTION** và database đã ra đi chân lạnh toát =)). Nhưng cũng từ đây, bản thân lại có thêm sự tò mò, sự tìm hiểu để tối ưu hoá cho ứng dụng của mình trở nên mượt mà hơn. Hôm nay, mình sẽ chia sẻ lại những gì mà mình đã tìm hiểu được để nâng cao hiệu năng ứng dụng của mình khi tương tác với database nhé. 

Dạo qua một vòng blog, diễn đàn này nọ để tìm hiểu nguyên nhân gây lỗi, mình có đọc được khá nhiều vài nói về sql.DB của Golang và cách sử dụng những câu lệnh truy vấn tới cơ sở dữ liệu SQL. Tuy nhiên, hầu hết chúng chỉ lướt qua những phương *SetMaxOpenConns(), SetMaxIdleConns() và SetConnMaxLifetime()* - các phương thức này có thể được dùng để cấu hình các hành vi của sql.DB và thay đổi hiệu năng của nó. Trong bài viết này, tôi muốn giải thích chính xác các hàm này hoạt động thế nào và ảnh hưởng (tích cực và tiêu cực) của chúng.

**Mở và Idle các kết nối:**

Tôi sẽ bắt đầu với một số kiến thức nền tảng. Một đối tượng sql.DB là một pool các kết nối tới cơ sở dữ liệu chứa các kết nối *đang được sử dụng*  (in-use) và các kết nối *idle*. Một kết nối được đánh dấu là đang sử dụng khi bạn dùng nó để thực hiện một tác vụ cơ sở dữ liệu, chẳng hạn như thực hiện một câu lệnh SQL... . Khi tác vụ đã hoàn thành, kết nối sẽ được đánh dấu là *idle*.

Khi bạn **ra lệnh** sql.DB thực hiện một tác vụ cơ sở dữ liệu, trước tiên nó sẽ kiểm tra trong pool đang có bất kỳ kết nối idle nào hay không. Nếu có, Go sẽ tái sử dụng nó và đánh dấu đang được sử dụng trong suốt tác vụ. Nếu không, Go sẽ tạo thêm kết nối để bạn sử dụng.

**Phương thức  SetMaxOpenConns**

Mặc định số lượng kết nối mở (đang sử dụng + idle) là **không giới hạn** trong cùng thời điểm. Tuy nhiên bạn có thể tự giới hạn thông qua phương thức SetMaxOpenConns() như sau:

```go
// Initialise a new connection pool
db, err := sql.Open("mysql", "mysql://user:pass@localhost:3306/dbName")
if err != nil {
    log.Fatal(err)
}

// Set the maximum number of concurrently open connections (in-use + idle)
// to 5. Setting this to less than or equal to 0 will mean there is no 
// maximum limit (which is also the default setting).
db.SetMaxOpenConns(5)
```

Trong ví dụ trên, số lượng kết nối mở xuất hiện đồng thời trong pool đã được giới hạn là 5. Nếu cả 5 kết nối đều được đánh dấu đang sử dụng và bạn cần thêm một kết nối mới, ứng dụng sẽ phải đợi tới khi một trong 5 kết nối được giải phóng và trở thành idle.

Để mô tả sự ảnh hưởng của việc thay đổi MaxOpenConns, tôi đã thực hiện benchmark test với số lượng kết nối mở tối đa là 1, 2, 5, 10 và không giới hạn. benchmark thực thi song song các câu lệnh INSERT trên một cơ sở dữ liệu MySQL và đây là kết quả thu được:

```
BenchmarkMaxOpenConns1-8                 500       3129633 ns/op         478 B/op         10 allocs/op
BenchmarkMaxOpenConns2-8                1000       2181641 ns/op         470 B/op         10 allocs/op
BenchmarkMaxOpenConns5-8                2000        859654 ns/op         493 B/op         10 allocs/op
BenchmarkMaxOpenConns10-8               2000        545394 ns/op         510 B/op         10 allocs/op
BenchmarkMaxOpenConnsUnlimited-8        2000        531030 ns/op         479 B/op          9 allocs/op
```

**Lưu ý**: benchmark này không có mục đích giả lập hành vi thực sự của một ứng dụng. Tôi chỉ đang muốn mô phong hành vi của sql.DB và ảnh hưởng của việc thay đổi *MaxOpenConns* đến hành vi của nó.

Với benchmark này chúng ta có thể thấy càng nhiều kết nối được cho phép, thì việc thực hiện lệnh INSERT vào cơ sở dữ liệu càng nhanh hơn (3129633 ns/op với 1 kết nối mở so với 531030 ns/op cho số lượng kết nối không giới hạn – tức là nhanh hơn khoảng 6 lần). Lý do là bởi càng nhiều kết nối mở được cho phép, sẽ có càng nhiều truy vấn cơ sở dữ liệu được thực hiện đồng thời.

**Phương thức SetMaxIdleConns**

sql.DB mặc định cho phép tối đa 2 kết nối idle tồn tại trong pool. Bạn có thể thay đổi điều này bằng cách cài đặt phương thức SetMaxIdleConns() như sau:

```go
// Initialise a new connection pool
db, err := sql.Open("mysql", "mysql://user:pass@localhost:3306/dbName")
if err != nil {
    log.Fatal(err)
}

// Set the maximum number of concurrently idle connections to 5. Setting this
// to less than or equal to 0 will mean that no idle connections are retained.
db.SetMaxIdleConns(5)
```

Theo lý thuyết, cho phép nhiều kết nối idle hơn tồn tại trong pool sẽ cải thiện hiệu năng, vì điều này sẽ làm giảm khả năng phải tạo mới một kết nối từ đầu – từ đó giúp tiết kiệm tài nguyên.
Hãy xem kết quả của benchmark phía trên với số lượng kết nối idle tối đa là none, 1, 2, 5, 10 (và số lượng kết nối mở là không giới hạn):

```go
BenchmarkMaxIdleConnsNone-8          300       4567245 ns/op       58174 B/op        625 allocs/op
BenchmarkMaxIdleConns1-8            2000        568765 ns/op        2596 B/op         32 allocs/op
BenchmarkMaxIdleConns2-8            2000        529359 ns/op         596 B/op         11 allocs/op
BenchmarkMaxIdleConns5-8            2000        506207 ns/op         451 B/op          9 allocs/op
BenchmarkMaxIdleConns10-8           2000        501639 ns/op         450 B/op          9 allocs/op
```

Khi *MaxIdleConns* được đặt là none, một kết nối mới sẽ được khởi tạo từ đầu cho mỗi câu INSERT, và ta có thể thấy từ benchmark rằng thời gian và lượng bộ nhớ sử dụng trung bình là khá cao.
Chỉ cho phép 1 kết nối *idle* tồn tại và được tái sử dụng tạo ra khác biệt rất lớn đối với benchmark này – nó làm giảm thời gian runtime trung bình xuống khoảng 8 lần và giảm lượng bộ nhớ cần dùng xuống khoảng 20 lần. Việc tiếp tục tăng kích thước của pool chứa kết nối idle sẽ mang lại hiệu năng tốt hơn nữa, mặc dù những cải thiện sẽ không rõ rệt.

**Vậy bạn có nên duy trì một pool lớn cho kết nối idle?** Câu trả lời phụ thuộc vào ứng dụng.
Bạn cần nhận ra rằng để giữ một kết nối idle tồn tại sẽ tốn chi phí – nó sẽ chiếm dụng phần bộ nhớ có thể dùng cho ứng dụng hoặc cơ sở dữ liệu.

Cũng có thể xảy ra việc một kết nối bị idle quá lâu sẽ không sử dụng được nữa. Ví dụ, cài đặt wait_timeout (https://dev.mysql.com/doc/refman/5.7/en/server-system-variables.html#sysvar_wait_timeout) của MySQL sẽ tự động đóng bất kỳ kết nối nào không được sử dụng trong vòng 8 tiếng (mặc định).

Khi điều này xảy ra, sql.DB sẽ xử lý nó một cách dễ dàng. Các kết nối không tốt (**bad**) sẽ tự động được thử lại 2 lần, sau đó Go sẽ loại bỏ kết nối khỏi pool và tạo kết nối mới. Vì vậy việc cài đặt MaxIdleConns quá cao sẽ dẫn tới việc một số kết nối trở nên vô dụng và nhiều tài nguyên phải sử dụng hơn khi có một pool nhỏ hơn cho kết nối *idle* (với ít kết nối hơn nhưng chúng được sử dụng thường xuyên hơn). Do đó bạn thật sự sẽ chỉ muốn giữ lại một kết nối idle nếu có nhiều khả năng bạn sẽ sớm tái sử dụng nó.

Một vấn đề nữa cần chỉ ra đó là MaxIdleConns nên luôn luôn nhỏ hơn hoặc bằng MaxOpenConns. Go bắt buộc điều này và sẽ tự động giảm MaxIdleConns khi cần thiết.

**Phương thức SetConnMaxLifetime**

Giờ hãy xem xét phương thức *SetConnMaxLifetime()*, được dùng để cài đặt thời gian tối đa mà một kết nối có thể được tái sử dụng. Phương thức này sẽ hữu ích nếu cơ sở dữ liệu SQL của bạn cũng cài đặt một vòng đời tối đa cho kết nối, hoặc nếu – ví dụ - bạn muốn thực hiện hoán đổi cơ sở dữ liệu một cách dễ dàng phía sau một load balancer.

```go
Phương thức được sử dụng như sau:
// Initialise a new connection pool
db, err := sql.Open("mysql", "mysql://user:pass@localhost:3306/dbName")
if err != nil {
    log.Fatal(err)
}

// Set the maximum lifetime of a connection to 1 hour. Setting it to 0
// means that there is no maximum lifetime and the connection is reused
// forever (which is the default behavior).
db.SetConnMaxLifetime(time.Hour)
```

Trong ví dụ này, toàn bộ kết nối của chúng ta sẽ **hết hạn** trong 1 giờ sau khi chúng được khởi tạo, và không thể tái sử dụng sau khi chúng hết hạn. Nhưng lưu ý rằng:
- Việc này không đảm bảo một kết nối sẽ tồn tại suốt 1 giờ trong pool; sẽ có khả năng kết nối trở nên vô dụng vì một số lý do và tự động bị đóng trước thời gian đó.
- Một kết nối có thể vẫn được sử dụng sau khoảng thời gian 1 giờ sau khi được tạo ra – nó chỉ không thể bắt đầu được tái sử dụng sau khoảng thời gian này.
- Đây không phải là khoảng thời gian idle timeout. Kết nối sẽ hết hạn trong vòng 1 giờ sau khi nó được tạo ra – không phải 1 giờ sau lần cuối nó trở nên idle.
- Mỗi giây một lần sẽ có có một quá trình dọn dẹp diễn ra tự động để loại bỏ các kết nối **đã hết hạn** ra khỏi pool.
Về lý thuyết, *ConnMaxLifetime* càng ngắn thì kết nối càng hết hạn nhanh – và do đó – kết nối cần khởi tạo lại từ đầu nhiều hơn.
Để minh họa điều này, tôi đã chạy một benchmark với ConnMaxLifetime là 100ms, 200ms, 500ms, 1000ms và không giới hạn (tái sử dụng mãi mãi), với các cài đặt mặc định là số lượng kết nối mở không giới hạn và số lượng kết nối idle là 2. Những con số này nhỏ hơn rất rất nhiều so với giá trị bạn sẽ dùng trong hầu hết các ứng dụng, nhưng chúng phù hợp để minh họa về mặt hành vi.

```go
BenchmarkConnMaxLifetime100-8               2000        637902 ns/op        2770 B/op         34 allocs/op
BenchmarkConnMaxLifetime200-8               2000        576053 ns/op        1612 B/op         21 allocs/op
BenchmarkConnMaxLifetime500-8               2000        558297 ns/op         913 B/op         14 allocs/op
BenchmarkConnMaxLifetime1000-8              2000        543601 ns/op         740 B/op         12 allocs/op
BenchmarkConnMaxLifetimeUnlimited-8         3000        532789 ns/op         412 B/op          9 allocs/op
```

Trong các benchmark này, bạn có thể thấy lượng bộ nhớ được sử dụng nhiều hơn gấp 3 lần với thời gian 100ms so với thời gian là không giới hạn, và thời gian chạy trung bình của mỗi câu INSERT cũng dài hơn một chút.
Nếu bạn có cài đặt ConnMaxLifetime trong code của mình, điều quan trọng là bạn phải tần suất mà các kết nối hết hạn (và sau đó được khởi tạo lại). Ví dụ nếu bạn có tổng 100 kết nối và ConnMaxLifetime là 1 phút, thì ứng dụng của bạn có khả năng sẽ loại bỏ và khởi tạo lại (trung bình) 1,67 kết nối mỗi giây. Bạn sẽ không muốn tần suất này lớn tới mức gây cản trở hiệu năng hơn là giúp cải thiện nó.

**Vượt quá giới hạn kết nối**

Cuối cùng, bài viết này sẽ không thể hoàn thiện nếu không đề cập tới việc điều gì sẽ xảy ra nếu bạn vượt quá một hard limit số lượng các kết nối cơ sở dữ liệu.

Tôi sẽ thay đổi max_connections = 5, nghĩa là chỉ cho phép tổng cộng 5 kết nối và chạy lại benchmark với số lượng kết nối mở là không giới hạn

```go
BenchmarkMaxOpenConnsUnlimited-8    --- FAIL: BenchmarkMaxOpenConnsUnlimited-8
    main_test.go:14: mysql: Error 1040: Too many connections
    main_test.go:14: mysql: Error 1040: Too many connections
    main_test.go:14: mysql: Error 1040: Too many connections
```
Ngay khi đạt tới giới hạn 5 kết nối, driver cơ sở dữ liệu của tôi ngay lập tức trả về thông điệp lỗi *Error 1040: Too many connections* thay vì hoàn thành câu lệnh INSERT.

Để tránh những lỗi như vậy, chúng ta chỉ cần cài đặt tổng lượng kết nối mở tối đa (*đang sử dụng + idle*) trong sql.DB nhỏ hơn 5. Như ví dụ mình hoạ bên dưới:

```go
// Initialise a new connection pool
db, err := sql.Open("mysql", "mysql://user:pass@localhost:3306/dbName")
if err != nil {
    log.Fatal(err)
}

// Set the number of open connections (in-use + idle) to a maximum total of 3.
db.SetMaxOpenConns(3)
```

Giờ sẽ chỉ có tối đa 3 kết nối được tạo bởi sql.DB tại bất kỳ thời điểm nào, và benchmark trên sẽ không có lỗi khi chạy.
Tuy nhiên việc này dẫn tới một cảnh báo lớn: khi đạt tới giới hạn số lượng kết nối mở, và toàn bộ các kết nối đều đang được sử dụng, bất kỳ tác vụ mới nào mà cơ sở dữ liệu cần thực hiện đều bị buộc phải chờ tới khi một kết nối được giải phóng và được đánh dấu là *idle*. Trong ngữ cảnh một ứng dụng web, ví dụ, HTTP request của người dùng sẽ bị ‘treo’ và thậm chí bị timeout khi đang chờ thực hiện một tác vụ nào đó của cơ sở dữ liệu.

Nhằm giảm thiểu điều này bạn cần luôn luôn truyền vào đối tượng context.Context một giá trị timeout ngắn, cố định khi tạo các lời gọi tới cơ sở dữ liệu, sử dụng các phương thức hỗ trợ ngữ cảnh (context – enabled method) như ExecContext().

**Tóm lại**
1.	Theo quy tắc chung, bạn nên đặt giá trị MaxOpenConns một cách rõ ràng. Nó phải nhỏ hơn bất kỳ giới hạn cứng nào về số lượng kết nối do cơ sở dữ liệu và cơ sở hạ tầng của bạn cài đặt.
2.	Giá trị MaxOpenConns và MaxIdleConns cao hơn sẽ dẫn đến hiệu suất tốt hơn. Nhưng lợi nhuận đang giảm dần và bạn nên lưu ý rằng việc có một nhóm kết nối không hoạt động quá lớn (với các kết nối không được sử dụng lại và cuối cùng bị hỏng) thực sự có thể dẫn đến giảm hiệu suất.
3.	Để giảm thiểu rủi ro từ ý 2 ở trên, bạn có thể muốn cài đặt thời gian ConnMaxLifetime tương đối ngắn. Nhưng bạn sẽ không muốn nó quá ngắn dẫn đến các kết nối bị hủy và tạo lại thường xuyên một cách không cần thiết.
4.	MaxIdleConns phải luôn nhỏ hơn hoặc bằng MaxOpenConns.


Link bài viết gốc ở đây nha mọi người: https://chiasekienthuc.netlify.app/blog/use-sql-db-right-way. Nếu thấy hữu ích thì cho em xin vài lượt upvote để em có thêm động lực. Cảm ơn mọi người nhiều :D :D và chúc mọi người sống sót qua mùa EURO khoẻ mạnh.