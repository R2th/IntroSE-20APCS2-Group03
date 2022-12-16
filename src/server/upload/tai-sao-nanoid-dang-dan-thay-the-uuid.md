UUID là một trong những số định danh được sử dụng nhiều nhất trong phát triển phần mềm. Tuy nhiên, trong vài năm qua, các giải pháp thay thế khác đã thách thức sự tồn tại của nó.

Trong số này, NanoID là một trong những đối thủ cạnh tranh hàng đầu để tiếp quản UUID. Vì vậy, trong bài viết này, tôi sẽ thảo luận về các tính năng của NanoID, nơi nó tỏa sáng và những hạn chế của nó để bạn hiểu rõ hơn về thời điểm sử dụng nó.
# NanoID và cách sử dụng
Việc tạo UUID với JavaScript rất đơn giản với packet npm. Tuy nhiên tôi là 1 Ruby dev thì tôi sẽ dùng gem nanoid :rofl::joy:

Install:  `gem "nanoid"`
Usage:
```
require 'nanoid'

Nanoid.generate
"YZHm7hEisuUnK9krZtprB"
```
#  NanoID chỉ có kích thước 108 bytes
Không giống như UUID, NanoID có kích thước nhỏ hơn 4,5 lần và không có bất kỳ phụ thuộc nào. Hơn nữa, giới hạn kích thước đã được sử dụng để giảm kích thước đi 35% .

Việc giảm kích thước ảnh hưởng trực tiếp đến kích thước của dữ liệu. Ví dụ: một đối tượng sử dụng NanoID nhỏ và gọn để truyền và lưu trữ dữ liệu. Với sự phát triển ứng dụng, những con số này trở nên rõ ràng.
# An toàn hơn
Trong hầu hết các trình tạo ngẫu nhiên, chúng sử dụng `Math.random()` . Tuy nhiên, NanoID sử dụng `crypto module` và `Web Crypto API` an toàn hơn.
Ngoài ra, NanoID đã sử dụng thuật toán riêng của nó được gọi là [uniform algorithm](https://github.com/ai/nanoid/blob/main/index.js) trong quá trình triển khai trình tạo ID thay vì sử dụng `random % alphabet`
# Nhanh và gọn
NanoID nhanh hơn 60% so với UUID. Thay vì có 36 ký tự trong bảng chữ cái của UUID, NanoID chỉ có 21 ký tự.

`0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz-`

Ngoài ra, NanoID hỗ trợ 14 ngôn ngữ lập trình khác nhau bao gồm
C#, C++, Clojure and ClojureScript, Crystal, Dart & Flutter, Deno, Go, Elixir, Haskell, Janet, Java, Nim, Perl, PHP, Python with dictionaries, Ruby , Rust, Swift.

Nó cũng hỗ trợ PouchDB, CouchDB WebWorkers, Rollup và các thư viện như React và Reach-Native.
# Custom Alphabets
Một tính năng hiện có khác của NanoID là nó cho phép các nhà phát triển sử dụng các bảng chữ cái tùy chỉnh. Bạn có thể thay đổi các ký tự hoặc kích thước của id như bên dưới:
Với JS:
```
import { customAlphabet } from 'nanoid';
const nanoid = customAlphabet('ABCDEF1234567890', 12);
model.id = nanoid();
```

Với Ruby:
```
require 'nanoid'

Nanoid.generate(alphabet: '1234567890abcdef', size: 12)
=> "6ceb481c83ad"
```
# Không có sự phụ thuộc của bên thứ ba
Vì NanoID không phụ thuộc vào bất kỳ hoạt động phụ thuộc nào của bên thứ ba nên theo thời gian, nó trở nên  ổn định hơn.

Điều này có lợi để tối ưu hóa kích thước gói trong thời gian dài và làm cho nó ít bị các vấn đề đi kèm với dependencies.
# Hạn chế và Trọng tâm trong tương lai
Dựa trên nhiều ý kiến trong StackOverflow, không có nhược điểm hoặc hạn chế đáng kể nào khi sử dụng NanoID.

Ngoài ra, nếu bạn sử dụng NanoID làm khóa chính của bảng, sẽ có vấn đề nếu bạn sử dụng cùng một cột làm clustered index. Điều này là do NanoID không tuần tự.
![image.png](https://images.viblo.asia/2314d711-e88d-4bff-b1f0-c4c376811ca7.png)
Các điểm chuẩn trên cho thấy hiệu suất của NanoID so với các trình tạo id chính khác.
Nó có thể tạo ra hơn 2,2 triệu ID duy nhất mỗi giây với bảng chữ cái mặc định và hơn 1,8 triệu ID duy nhất mỗi giây khi sử dụng bảng chữ cái custom.
Với kinh nghiệm sử dụng cả UUID và NanoID, tôi khuyên bạn nên sử dụng NanoID thay vì UUID cho bất kỳ dự án nào trong tương lai khi xem xét kích thước nhỏ, tính thân thiện với URL, bảo mật và tốc độ của nó.
# References
https://blog.bitsrc.io/why-is-nanoid-replacing-uuid-1b5100e62ed2

https://github.com/radeno/nanoid.rb