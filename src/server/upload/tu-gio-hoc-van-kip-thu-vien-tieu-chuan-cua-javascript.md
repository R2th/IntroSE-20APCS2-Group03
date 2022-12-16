(Link bài gốc: https://qiita.com/uhyo/items/acd645744fa61c805097)

“Thư viện tiêu chuẩn” đại khái là một nhóm chức năng được trang bị một cách tiêu chuẩn cho ngôn ngữ lập trình. Phần lớn các ngôn ngữ lập trình đều có thư viện tiêu chuẩn ở rất nhiều dạng thức khác nhau. Thư viện tiêu chuẩn là một phần của ngôn ngữ lập trình và thường các chức năng sẽ được thêm vào thư viện tiêu chuẩn theo mỗi lần version up ngôn ngữ.

Bài viết này sẽ giới thiệu “thư viện tiêu chuẩn” trong JavaScript là như thế nào, xen lẫn quá trình phát triển của nó. Kể cả những bạn phải hỏi “thư viện tiêu chuẩn là cái gì vậy?” hay những bạn thấy “cái đó cơ bản quá rồi, không cần giải thích cũng hiểu” cũng hãy cùng đọc qua nhé.

Ở thời điểm viết bài này những cái liên quan đến thư viện tiêu chuẩn vẫn chưa chuẩn hóa chút nào nên rất có thể nội dung sau này sẽ còn thay đổi nhiều. Tốt nhất là khi sử dụng bạn hãy tự tìm hiểu những thông tin mới nhất nhé.

# Thư viện tiêu chuẩn theo nghĩa rộng
Nói đến các chức năng được trang bị tiêu chuẩn trong JavaScript hẳn mọi người đang nghĩ đến rất nhiều thứ. Ví dụ như Math chẳng hạn, nó cung cấp rất nhiều hàm và hằng dưới dạng property của Math object, ví dụ như Math.floor dùng để tách các chữ số sau dấu thập phân. Chính Math tồn tại như một biến global. Ngoài ra, còn có binary data hay Date object để thể hiện ngày giờ. ArrayBuffer, Unit8Array hay parseInt - tồn tại như một biến global - cũng hay được sử dụng. Như vậy, chức năng ngôn ngữ tích hợp trong JavaScript chủ yếu được cung cấp dưới dạng biến global.

Những cái này là chức năng được định nghĩa trong đặc tả ngôn ngữ JavaScript (ECMAScript) nên đến đây có thể nói đây chính là “thư viện tiêu chuẩn trong JavaScripts". Thế nhưng cái “thư viện tiêu chuẩn" tôi muốn nói đến trong bài viết này lại không phải cái này.  Chức năng ngôn ngữ được cung cấp thông qua việc sử dụng biến global như thế này là “thư viện tiêu chuẩn" theo nghĩa rộng,  mà bài viết này cái mà tôi muốn giải thích không phải là thư viện tiêu chuẩn theo nghĩa rộng đó.

Đối với JavaScript đang được kỳ vọng là kể cả trong tương lai vẫn sẽ được bổ sung thêm nhiều chức năng nữa, thì nếu chỉ mở rộng chức năng dưới cách thức như thế này (sử dụng biến global) thì rồi sẽ đến giới hạn. Và thư viện tiêu chuẩn tôi sẽ giải thích trong bài viết này, hay nói cách khác là thư viện tiêu chuẩn theo nghĩa hẹp chính là cái giải quyết cho vấn đề trên. Các bạn chú ý cách phân chia nghĩa rộng, nghĩa hẹp là cách chia riêng trong bài viết, không phải cái được nhiều người sử dụng rộng rãi.

# Ôn tập: Module
Thư viện tiêu chuẩn mà tôi sẽ giải thích lần này có liên quan rất lớn đến Module nên tôi sẽ giải thích một chút về Module. Những bạn đã biết rồi có thể bỏ qua nha. Module là chức năng ngôn ngữ được thêm vào JavaScript trên ES2015, đặc trưng với 2 lệnh import và export. Nói chung 1 file js sẽ là 1 module. Với lệnh export, sẽ khai báo những hàm được export từ module đó hoặc những giá trị khác (binding). Còn lệnh import thì có thể  import những cái export từ các module khác vào để sử dụng.

Dưới đây là ví dụ về việc sử dụng module cấu thành từ 2 file.

```
foo.js

export function fooFunction(x) {
    return x * 2;
}
```

```
index.js

import { fooFunction } from './foo.js';

console.log(fooFunction(123)); // 246
```

Ở ví dụ này, foo.js là lệnh export và đang export hàm fooFuntion.

index.js đang import fooFuntion từ foo.js vào để sử dụng.

Lần này tôi muốn các bạn chú ý xem module của đối tượng load trong câu import đang được chỉ định như thế nào. Ở ví dụ này gốc import đang được lấy là “./foo.js", có nghĩa là rõ ràng nó đang load foo.js từ cùng một directory.

Với lệnh import, việc làm thế nào đọc được gốc import đang được chỉ định đang được giao phó cho môi trường chạy. Hiện tại các môi trường chạy JavaScript chủ yếu có 2 cái là Trình duyệt và node.js nhưng gốc import sử dụng được ở mỗi cái là khác nhau. 

Trường hợp là trình duyệt thì đơn giản rồi, gốc import chính là URL. Ví dụ trên có thể thấy được URL tương đối nên trình duyệt có thể xử lý được. URL tuyệt đối được sử dụng như sau 
```
import React from "https://dev.jspm.io/react";
```

Mặt khác câu chuyện với node.js thì phức tạp hơn một chút. Với đường dẫn tương đối kiểu như ./foo.js ngoài việc node.js cũng có thể hoạt động được còn có đặc trưng là có thể rút gọn phần mở rộng thành  ./foo. Ngoài ra, cũng giống import React from "react"; bằng việc chỉ định tên module chứ không phải đường dẫn thì còn có thể load được module tương ứng từ node_modules. Nhưng mặt khác lại không thể sử dụng schema như http:// để load module từ trên internet được.

# Rốt cục Thư viện tiêu chuẩn là cái gì
Cuối cùng cũng vào vấn đề chính.

Kết luận một câu là “thư viện tiêu chuẩn" được giới thiệu trong bài viết này (thư viện tiêu chuẩn theo nghĩa hẹp) là module được cung cấp với cái tên đặc biệt. Ví dụ cụ thể tôi sẽ nói sau nhưng tên đặc biệt ở đây chính là tên module được bắt đầu bằng “js:”. Module của thư viện tiêu chuẩn được đưa vào hệ thống xử lý, rồi load bằng lệnh import mà không cần tiêu chuẩn đặc biệt. Ví dụ, nếu module có tên temporal được bao gồm trong thư viện tiêu chuẩn thì nếu muốn sử dụng temporal sẽ thực hiện như sau:
```
// Import CivelDate từ temporal module của thư viện tiêu chuẩn
import { CivilDate } from 'js:temporal';
```
Như lúc nãy tôi có nói, module của thư viện tiêu chuẩn sẽ sử dụng tên “js:modulename" rồi load bằng lệnh import. Mấu chốt là format bắt đầu với “js:” này không trùng với phương pháp chỉ định gốc import đã có mà chúng ta đã đề cập bên trên (URL, tên module). Có nghĩa là chúng ta có thể thêm mới các module mà không phá vỡ code từ trước đến nay có sử dụng module. Hơn nữa “js:” cũng được đăng ký trên IANA. Theo đó, ta có thể tránh được tình trạng URL bắt đầu bằng “js:” trong tương lai bị sử dụng với mục đích khác.

Về thư viện tiêu chuẩn, người ta vẫn đang tiếp tục thảo luận theo hướng: cùng với chức năng ngôn ngữ cơ bản của JavaScript, cả những chức năng cho trình duyệt cũng có thể xử lý như thư viện tiêu chuẩn. Nếu như vậy thì sẽ phát sinh câu hỏi là nên đưa toàn bộ vào “js:” hay chia tên thành “html:” cho trình duyệt, “node:” cho node.js. Vấn đề này đã có những thảo luận xung quanh nhưng có vẻ vẫn chưa đưa ra được câu trả lời cuối cùng.

##  JavaScript Standard Library Proposal

Giờ mới show nhưng cái được gọi là thư viện tiêu chuẩn trong bài viết này chính là proposal (state 1) dưới đây nhé. Gọi là proposal nhưng mới đang ở trạng thái trước khi có thể sử dụng chính thức như đặc tả của JavaScript, và Stage 1 cũng có nghĩa là mới đang ở mức TC9 (Ban kỹ thuật phụ trách tiêu chuẩn hoá JavaScript (ECMAScript) cuối cùng cũng có quan tâm đến phạm vi vấn đề đó mà thôi. Tóm lại Thư viện tiêu chuẩn của JavaScript vẫn còn ở mức rất ra mới hoàn thiện đặc tả, nếu phải mất thêm vài năm cho đến lúc có thể thực hành cũng không có gì là lạ. 

[JavaScript Standard Library Proposal](https://github.com/tc39/proposal-javascript-standard-library)

Trong proposal có thảo luận về việc đưa “cấu trúc gọi là thư viện tiêu chuẩn" vào sử dụng nhưng hãy lưu ý là “module như thế nào sau này được đưa vào JavaScript như thư viện tiêu chuẩn" lại là vấn đề khác.
(Tính theo các ví dụ đưa ra) Vai trò chủ đạo trong proposal lần này là các bên của Google. Đây mới chỉ là proposal ở giai đoạn đầu nhưng Google tỏ ra rất tích cực trong việc xúc tiến proposal này. Ở phần sau tôi sẽ giới thiệu cụ thể nhưng Google Chrome đã implement thư viện tiêu chuẩn mang tính thử nghiệm rồi nha các bạn.
 
(Còn tiếp)