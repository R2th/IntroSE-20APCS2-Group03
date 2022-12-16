Các Ruby Gem tốt nhất mà bạn có thể sử dụng trong các dự án Rails của bạn là gì?

Đó là những gì bạn có thể khám phá trong bài viết này!

Tôi sẽ cung cấp cho bạn 7 gems, nhưng không phải là những gems cũ mà bạn đã thấy hàng triệu lần, tôi sẽ chia sẻ với bạn một số gem rất hữu ích, nhưng ít được biết đến.

Nhưng trước khi chúng tôi làm điều đó...

**Một lời cảnh báo.**

Tôi đã thấy một số người dùng gem cho mọi thứ. Ban đầu nghe có vẻ hữu ích. Nhưng họ không cần dành một chút thời gian để suy nghĩ liệu gem đó có giải quyết được vấn đề mà họ gặp phải hay không, đó có phải là một lựa chọn tốt nhất, nó được duy trì tốt và có tài liệu đầy đủ không,... Đó là một sai lầm.

**Tại sao?**

Bởi vì càng nhiều thứ mà dự án của bạn phụ thuộc vào, thì có càng nhiều rủi ro khi mọi thứ thay đổi. Và mọi thứ luôn thay đổi theo thời gian. Phiên bản Rails mới, phiên bản Ruby mới, tính năng mới...

**Nhưng...**

Gem có thể giúp bạn tiết kiệm rất nhiều thời gian, giúp bạn làm sạch code của mình và tránh các vấn đề bảo mật, vì vậy hãy sử dụng chúng một cách khôn ngoan!

**Còn bây giờ:**

Hãy bắt đầu với danh sách các gem.

# 1. Tìm các dead route để giữ code của bạn sạch sẽ
Khi ứng dụng Rails của bạn phát triển, bạn sẽ tích lũy thêm rất nhiều route khác.

Một ngày nào đó bạn muốn thay đổi code và một số các route này trở nên cũ, không cần dùng đến nữa.

Nhưng chúng sẽ ở lại đó, trong `config/routes.rb` của bạn, khiến việc quản lý trở nên khó khăn hơn.

Làm thế nào để bạn tìm thấy những route đó để xóa?

Có một gem gọi là `traceroute`.

Nó tải các route của bạn và so sánh chúng với các action của controller mà bạn đã xác định.

Nhưng hiện tại nó có hai hạn chế:

1. Nó không hoạt động với Rails 6
2. Nó không phát hiện hành động điều khiển ngầm

Bạn có thể tìm thấy nó [ở đây](https://gist.githubusercontent.com/matugm/c298767ad1d97a52f76630bfc03008a1/raw/d1bfa23a0bf4ab24cf295eea030f4e3dccf653d7/check-routes.rb).
# 2. Làm cho việc migration của bạn an toàn hơn để bạn có thể tránh các vấn đề
Rails migration có thể gây ra rất nhiều vấn đề nếu làm sai.

**Ví dụ:**

Việc xóa một cột có thể gây ra sự cố vì Rails có bộ đệm của các cột và việc migrate không được thiết lập lại bộ đệm này.

**Tin tốt?**

Bạn không cần phải nhớ tất cả những điều này.

Với sự trợ giúp của gem `strong_migrations`, bạn sẽ biết khi nào bạn có một trong những lần migrate không an toàn này trước khi nó được đưa vào production.
# 3. Ngăn chặn transaction không an toàn
Một Rails transaction được coi là một hoạt động "tất cả hoặc không có gì khác".

Nó trông như thế này:

```
Book.transaction do
  # ...
end
```

Nhưng nếu bạn thực hiện những việc nằm ngoài sự kiểm soát transaction, như ghi vào tệp hoặc thực hiện một yêu cầu API, thì hiệu ứng "tất cả hoặc không có gì" không còn đúng nữa.

Như bạn có thể tưởng tượng, điều này dẫn đến tất cả các loại vấn đề.

**Giải pháp là gì?**

Thực tế, không phải là công nghệ cao, chỉ cần tránh các "tác dụng phụ", hoặc làm những việc có ảnh hưởng đến "thế giới bên ngoài" của giao dịch.

`isolator gem` có thể giúp với điều này.

Nó kiểm tra tất cả các transaction của bạn để đảm bảo chúng an toàn.

Tất cả bạn phải làm là cài đặt gem, sau đó khi phát hiện một transaction xấu, nó sẽ đưa ra một ngoại lệ.

Hãy thử một lần!
# 4. Tìm các test chậm của bạn và làm cho chúng nhanh hơn
Bạn thật sự không hề muốn test chạy chậm.

Nhưng có những công cụ giúp bạn tìm ra lý do tại sao các bài test của bạn chậm để bạn có thể khắc phục chúng!

Một trong những công cụ này là sự kết hợp của `test-prof + ruby-prof`.

Đây là cách sử dụng nó:
```
TEST_RUBY_PROF=1 rake
```
**Outputs**
```
%self       total       self        wait        child       calls      name
43.21       2.001      2.001       0.000        0.000       1        Kernel#sleep
2.97        0.184      0.138       0.000        0.046       1640     Array#permutation
1.39        0.064      0.064       0.000        0.000       144      PG::Connection#async_exec
```

Ở đây tôi có thể thấy rõ gọi đến `sleep`, nhưng đây có thể dễ dàng là một lần gọi API, đọc một tệp lớn, truy vấn SQL chậm,...

Một điều khác bạn có thể làm là sử dụng event profiler.

**Như thế này:**

```
EVENT_PROF='sql.active_record' EVENT_PROF_EXAMPLES=1 rake
```

Điều này giúp bạn tìm ra bài test nào đang chạy các truy vấn chậm nhất.

Rails 6 đã thêm thử nghiệm song song, bạn có thể kích hoạt tính năng này trong `test/test_helpers.rb` nếu bạn đang nâng cấp dự án hiện tại của mình.
# 5. Làm cho dữ liệu của bạn nhất quán hơn
Validation là tuyệt vời.

Nhưng vấn đề không phải là bạn sử dụng framework nào để xây dựng ứng dụng web của mình, bạn luôn có thể bỏ qua chúng bằng cách nhập dữ liệu trực tiếp vào cơ sở dữ liệu, tạo bản ghi bằng SQL thô hoặc sử dụng một số phương thức trong ORM để bỏ qua xác thực.

**Nói cách khác…**

Validation của bạn chỉ bảo vệ bạn khỏi lỗi người dùng, nhưng không phải lỗi nhà phát triển.

Những lỗi nhà phát triển có thể làm cho dữ liệu của bạn không nhất quán.

**Tin tốt?**

Hầu hết - nếu không phải tất cả - các cơ sở dữ liệu SQL hiện đại triển khai các "constraints", một bộ quy tắc như validation, nhưng ở cấp cơ sở dữ liệu.

Vì vậy, nếu bạn muốn tăng tính nhất quán dữ liệu của bạn, bạn có thể thực hiện các ràng buộc này.

Một gem có thể giúp bạn là [database_consistency](https://github.com/djezzzl/database_consistency).

**Làm thế nào để sử dụng gem này?**

Đầu tiên, bạn cần cài đặt nó, không có gì khó khăn.

Thứ hai, bạn chạy `bundle exec database_consistency` trong terminal, bên trong dự án mà bạn muốn kiểm tra.

**Nó sẽ tạo ra một báo cáo như thế này:**

```
fail Comment title column should be required in the database
fail Comment author column should be required in the database
```

**Tiếp theo là gì?**

Thêm các `database constraints` bị thiếu, trong trường hợp này, not-null, với migration `change_column_null`.
# 6. Tái cấu trúc code!
Bạn muốn cải thiện code của mình, nhưng không chắc bắt đầu từ đâu?

**Lấy một số metrics!**

Có nhiều code metric, như độ phức tạp và chu kỳ.

Chu kì xem xét sự thay đổi theo thời gian trong code của bạn.

Hãy sử dụng lịch sử thay đổi git của bạn.

**Kết quả?**

Một danh sách các tập tin thay đổi nhiều nhất.

Có một cơ hội tốt là nếu bạn dành 90% thời gian để thay đổi mô hình `User` đó, thì đó là một ứng cử viên tốt để tái cấu trúc.

Một gem có thể giúp bạn với điều này là `attractor`.

**Chạy nó như thế này:**

```
attractor report -p app
```

Nó tạo ra một báo cáo HTML và một danh sách các tệp mà bạn có thể sử dụng để tập trung vào.
# 7. Tìm hiểu code nào được sử dụng trong production & code nào không
Cuối cùng là một công cụ khác để giúp bạn cải thiện code của mình.

Nó được gọi là `coverband`.

Nếu bạn chạy gem này trong `production`, bạn sẽ nhận được báo cáo về mã nào đang được chạy.

Bạn thậm chí có thể theo dõi điểm không sử dụng!

![](https://images.viblo.asia/4a909d5c-e674-485f-8a32-1029e6f0b3f9.png)

Điều này có thể giúp bạn đưa ra quyết định khi xóa code & làm sạch dự án của bạn.
# Tổng kết
Bạn đã tìm hiểu về 7 Ruby gem mạnh mẽ và ít được biết đến mà bạn có thể sử dụng trong các dự án (chủ yếu là Rails) để làm cho các bài test của bạn nhanh hơn, cải thiện code của bạn và tăng tính an toàn.

Hãy nhớ những cảnh báo nhỏ về lạm dụng gem, nhưng đừng để điều đó cản trở bạn thử những gem mới.

*Bài viết được dịch từ: 7 Best Ruby Gems Most People Haven’t Heard About / By Jesus Castello https://www.rubyguides.com*