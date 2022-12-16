(Link bài gốc: https://qiita.com/uhyo/items/acd645744fa61c805097)
# Polyfill thì thế nào
Sau khi dùng được thư viện tiêu chuẩn rồi thì vấn đề đặt ra là làm thế nào để tạo và sử dụng được Polyfill. Dù sau này module có dần được thêm vào thư viện tiêu chuẩn thì cũng sẽ xuất hiện khác biệt thời thời gian implement tuỳ theo từng môi trường chạy. Ví dụ như js:temporal. Dù module này có được thêm vào thì với trình duyệt chưa được xử lý thì cũng sẽ phát sinh lỗi với đoạn code dưới đây
```
import { CivilDate } from "js:temporal";
```
Để có thể xử lý được vấn đề này, chúng ta cần một cơ chế "nếu không xác định được tên module đang được chỉ định thì load Polyfill".
Hiện tại có rất nhiều phương án để giải quyết được vấn đề này rồi nên tôi sẽ giới thiệu vài cái nhé. Thực ra phần bối cảnh còn có Layerd API nhưng ở đây không đi sâu vào nó.
## Layered APIs fallback syntax
Đây là [phương án](https://docs.google.com/document/d/1jRQjQP8DmV7RL75u_67ps3SB1sjfa1bFZmbCMfJCvrM/edit) trong đó cho phép chỉ định đích fallback bằng phương pháp dưới đây.
(nếu bạn đọc link thì cũng hiểu, nói chung cũng chỉ là một phương án)
```
import { storage } from
       "std:kv-storage|https://some-cdn.com/kv-storage.js";
```
Điểm mấu chốt nằm ở chỗ std:kv-storage và https://some-cdn.com/kv-storage.js được ngăn cách với nhau bằng |. Do vậy trình duyệt chưa xác định được std:kv-storage vẫn load được URL đằng sau để thực hiện Polyfill được. (trường hợp này có một vấn đề là trên các trình duyệt mà cơ bản ký hiệu | vẫn chưa được xử lý thì không thể chạy được)
## import maps
Có một phương án khác đi từ hướng tiêu chuẩn Web. Cũng giống như KV storage đã trình bày phía trước, cái này đã được implement thực nghiệm trên Chrome rồi. 
import maps được chỉ định như sau trong file HTML.
```
<script type="importmap">
{
  "imports": {
    "std:kv-storage": [
      "std:kv-storage",
      "https://some-cdn.com/kv-storage.js"
    ]
  }
}
</script>
```
Script element mang thuộc tính type đặc biệt có tên là type="importmap" hoạt động dưới dạng import map. Bên trong là JSON. Như đã thấy import map có chức năng đọc tên module thành URL hoặc tên module khác. Tức là với import map trên đây, nếu module có tên "std:kv-storage" được chỉ định thì trước tiên sẽ thử module std:kv-storage, nếu không được sẽ thử sang /node_modules/kvs-polyfill/index.mjs. Chúng giống như các dùng | phía trên.
Phương pháp này có điểm mạnh là lệnh import chủ chốt chỉ cần để nguyên import from "std:kv-storage"; là được nhưng lại có điểm yếu là chỉ có thể hoạt động trên Web platform. Và với những trình duyệt vốn không xác nhận được import maps thì cũng không có ý nghĩa gì nên cũng chẳng khác cách trên là mấy.
# Các cách import thư viện tiêu chuẩn khác
Như trình bày phía trên, để import thư viện tiêu chuẩn ta cần dùng lệnh import để chỉ định tên module mang tiền tố :js như sau:
```
import { CivilDate } from "js:temporal";
```
Cách này đang nhận được hỗ trợ nhiều nhất, nhưng vẫn còn ứng cử viên khác vẫn đang được tranh luận. Vẫn chưa có quyết định cuối cùng. 
Cả :js và std: đều được xuất hiện trong cuộc tranh luận này.
Dù là cái nào thì điểm mấu chốt vẫn là phân biệt được với module truyền thống (user định nghĩa).
## Cách chọn gốc import khác string
Đây là phương án biến vế bên phải của from thành cái khác string, để biến nó thành cái khác dưới level syntax (như dưới đây):
```
imoort { CivilDate } from std.temporal;
```
Cảm giác như có biến global std: .
Ngoài ra còn có cách sau:
```
import { CivilDate } from <temporal>;
```
## Cách reuse scoped package của npm
Đây là phương án thêm thành phần như @std/ và trước tên module.
```
import { CivilDate } from "@std/temporal";
```
Trong các cách thay thế thì đây là phương án khá được yêu thích nhưng nhìn từ điểm có phân biệt được thư viện tiêu chuẩn với những module khác không thì nó kém hơn một bậc (tạm thời về @std thì có vẻ ổn). Mặt khác nó còn có điểm mạnh là Polyfil khá dễ dàng.
## Cách chọn URL
```
import { CivilDate } from "https://www.ecma-international.com/ecmascript/temporal";
```
Có thể dài quá không nhớ nổi nhưng nếu Polyfill được chính thức hỗ trợ thì chắc sẽ nhẹ nhàng hơn (node.js có vẻ khá vất vả).
# Kết luận
Vậy là bài viết này đã giới thiệu về khái nhiệm Thư viện tiêu trong trong JS. Thư viện tiêu chuẩn là nhóm các module được bao gồm trong spec, có đặc trưng là khi import sử dụng tên module mắt đầu bằng :js (hoặc std:). Theo khái niệm Thư viện tiêu chuẩn, ta không cần phải lo lắng về tính tương thích của những cái sau đó, cùng với việc có thể thêm các chức năng năng ngữ còn là giải pháp overhead cho việc thêm funtion.

Phương án này vẫn còn chưa hoàn thiện chẳng hạn giữa js: và std: vẫn chưa xác định tiền tố, ... nhưng dù là JS hay funtion mới của Web, ta có thể nghĩ rằng tương lai mà các module tiêu chuẩn (trừ những cái mang tính ngữ pháp) sẽ được cung cấp đang đến gần. Nhất định đến lúc đó hãy trang bị thêm nhé.