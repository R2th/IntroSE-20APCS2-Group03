(Link bài gốc: https://qiita.com/uhyo/items/acd645744fa61c805097)
# Ý nghĩa của thư viện tiêu chuẩn
Vậy thì tại sao lại cần thư viện tiêu chuẩn trong JS? Đó là bởi nó thúc đẩy mở rộng chức năng cho JS. Spec ngôn ngữ JS cũng đâu đó khá phức tạp nhưng nó lại có xu hướng đặt nặng vào cú phát, ngữ pháp. Nếu xét một ngôn ngữ đã có những hàm thuận tiện cho việc viết chương trình hay chưa thì chưa thể nói các funtion trong JS là phong phú được. Và kết quả là những module tiện lợi như lodash rất được yêu thích. Vậy vấn đề là gì? Việc lodash được sử dụng trên nhiều site cũng đồng nghĩa với việc lượng lớn source code của lodash hằng ngày đều bay trên mạng internet. Mở rộng funtion cho JS sẽ khiến lodash không cần thiết nữa và giao thông cũng bớt ùn tắc.

Thêm vào đó, như mới nói trên đây, các funtion được thêm vào JS từ trước đến nay đều được sử dụng và cung cấp dưới dạng biến global. Nếu vậy thì cứ khi thêm một funtion mới thì số lượng biến global lại tăng lên. Ví dụ gần đây trên ES2017 có thêm funtion liên quan đến chia sẻ memory, và 2 biến global mới đã được thêm là ShareArrayBuffer và Atomics.

Với phương thức này, khả năng là sẽ xuất hiện ảnh hưởng đến hoạt động của code đã có, nghĩa là nảy sinh vấn đề mất tính tương thích compatibility với những cái phía sau. Ví dụ gần đây JS có định thêm biến global là "global" nhưng người ta phán đoán được nếu thêm nó sẽ làm mất tính tương thích những cái phía sau nên đã đổi tên thành globalThis.

Do JS là ngôn ngữ coi trọng tính tương thích của những cái phía sau nên nếu vẫn ở trạng thái phải lo lắng đến việc tính chất bị phá vỡ thì tốc độ thêm funtion vao JS sẽ bị hạ thấp. Thực tế là biến "global" đã nói ở trên do có tranh cãi liên quan đến tính tương thích bị phá vỡ mà việc tiêu chuẩn hoá bị chậm vài năm so với kế hoạch ban đầu.

Đối với vấn đề này, sẽ không thêm funtion bổ sung vào global, mà dùng cách implement dưới dạng module mới rồi từ đó chọn phương thức "import" để tránh được nó. Bởi code đã có không thể đang import module mới thêm vào được.

Thêm vào đó, nếu số biến global tăng lên thì chi phí khởi tạo context chạy JS cũng tăng lên nên việc tránh được điều này cũng trở thành một điểm cộng. Nếu funtion được chuẩn bị dưới dạng module thì overhead sẽ chỉ phát sinh khi nó được import.
# Ví dụ cụ thể về thư viện tiêu chuẩn
Như đã trình bày thì Thư viện tiêu chuẩn mới chỉ là specs đang trong quá trình tiêu chuẩn hoá. Tuy nhiên rất nhanh chóng người ta đã bàn luận về các module nên được thêm vào thư viện tiêu chuẩn.
## KV Storage
KV Storage là Key-value store mới cho trình duyệt. Có thể nói nó là một "localStorage" được modern hoá và remake thành. Đương nhiên nội dung bên trong mới đang ở giai đoạn đề xuất chưa được quyết định nhưng ở thời điểm viết spec thì Google Chrome đã implement và trang bị nó dưới dạng thử nghiệm, chúng ta giơf đã có thể thử dùng thực tế. Như trong [the Web's First Built-in Module](https://developers.google.com/web/updates/2019/03/kv-storage) có ghi nó đang được cung cấp dưới dạng thư viện tiêu chuẩn. Bạn có thể đọc [bài viết giới thiệu của Google](https://developers.google.com/web/updates/2019/03/kv-storage) để tìm hiểu thêm về cách sử dụng. Dưới đây tôi chỉ trích một dòng thôi nhưng các bạn có thể import funtion từ std:kv-storage như sau:

```
import {storage, StorageArea} from 'std:kv-storage';
```
Cá nhân tôi khá quan tâm đến việc đuôi khai báo là std: chứ không phải là js: nhưng có lẽ nguyên nhân nằm ở chỗ :js vẫn còn chưa ổn định nên họ mới sửa đổi như vậy.

KV Storage là funtion duy nhất trong số các funtion ở bài viết này bạn có thể thử nghiệm luôn. Để thử cần bật flag experimental của Google Chrome lên nhé (cụ thể tham khảo link phía trên.

## Accessing the originals
Đây là một cái rất mới chỉ mới là ý tưởng mà chưa được TC39 process nhưng là đề án để đưa cả những funtion từ trước đến nay đang được cung cấp dưới dạng biến global, vào thư viện tiêu chuẩn dưới dạng module.

Bối cảnh của đề án này xuất phát từ issue có những trường hợp ngay từ đầu đã không thể tin tưởng được API mà biến global cung cấp. Specs thời kỳ đầu của JS khá lỏng lẻo trong đó có kể cả object được cung cấp từ hệ thống xử lý cũng có thể rewrite được, JS về sau để đảm bảo tính tương thích vẫn duy trì sự lỏng lẻo này cho đến hiện tại. Chính vì thế mà API được cung cấp từ hệ thống xử lý cũng có khả năng đang bị rewrite.

Ví dụ Array.isArray là funtion cấu trúc tìm hiểu xem một object nhận được có phải là array hay không.
```
/** 与えられたオブジェクトが配列なら要素を追加する関数 */
function addToArr(obj) {
  if (Array.isArray(obj)) {
    obj.push(123);
  }
}

addToArr([1, 2, 3]);    // pushされる
addToArr({foo: "bar"}); // 何も起きない
```
Ở đây hàm addToArr đã định nghĩa sẽ dùng câu if để điều tra xem obj có phải là array không, và obj.push dùng để phòng chống phát sinh error. Đoạn code này có vẻ không có vấn đề gì.
Thế nhưng, nếu đoạn code thành như sau thì lại có vấn đề.
```
/** 与えられたオブジェクトが配列なら要素を追加する関数 */
function addToArr(obj) {
  if (Array.isArray(obj)) {
    obj.push(123);
  }
}

// Array.isArrayを書き換える！！！！！！
Array.isArray = ()=> true;

addToArr([1, 2, 3]);    // pushされる
addToArr({foo: "bar"}); // ここでエラーが発生
```
Với đoạn code này thì Array.isArray đã bị thay đổi để trả về giá trị true, nên addToArr đang bị phá vỡ. Từ đây có thể thấy addToArr chỉ đúng khi đảm bảo được addToArr không bị rewrite.

Chắc chẳng có thằng nào ngốc đến nỗi rewrite Arr.isArray ngay dưới định nghĩa addToArr như ví dụ này nhưng nó nói lên rắng việc Array là biến global có khả năng bị rewrite ở chỗ nào đó chẳng hề liên quan và việc đảm bảo addToArr không phát sinh error sẽ trở nên vô cùng khó khăn.

Nếu ta sử dụng được accessing the originals đề xuất lần này thì đoạn code sẽ được viết lại như sau:
```
import { isArray_static } from "std:global/Array";

function addToArray(obj) {
  if (isArray_static(obj)) {
    obj.push(123);
  }
}
```
Vâỵ cái gì đã thay đổi? Từ module std:global/Array, hàm isArray_static được load lên và được sử dụng thay thế cho Array.isArray. Nói tóm lại std:global/Array cung cấp funtion mang biến global tên là Array, isArray là property mang Array được export dưới tên là isArray_static. isArray_static này là cái mà Array.isArray đã định nghĩa và nó được đảm bảo sẽ không bị rewrite bởi những nhân tố bên ngoài. Như vậy ta có thể giải quyết được vấn đề về khả năng Array.isArray có thể không hoạt động như dự định.

Đến đây các bạn có nhận ra còn điểm nào đáng lo ngại trong code trên không? Đó là có thể Array.prototype.push có khả năng đang bị rewrite. Đoạn code trên mà bị tấn công như sau thì sẽ không hoạt động như mong muốn.
```
import { isArray_static } from "std:global/Array";

function addToArray(obj) {
  if (isArray_static(obj)) {
    obj.push(123);
  }
}

// Array.prototype.pushを消してしまう
Array.prototype.push = null;

addToArray([1, 2, 3]); // エラーが発生
```
Giải pháp đối với vấn đề này đương nhiên là get cả Array.prototype.push từ thư viện tiêu chuẩn. Thực tế nội dung trong Array.prototype.push từ trước đến nay đều đang được export từ std:global/Array dưới dang push. Vậy nên sẽ code như sau:
```
import { isArray_static, push } from "std:global/Array";

function addToArray(obj) {
  if (isArray_static(obj)) {
    push.call(obj, 123);
  }
}

// Array.prototype.pushを消してしまう
Array.prototype.push = null;

addToArray([1, 2, 3]); // OK!
```
Vì push phải được sử dụng dưới dạng method nên this phải thành obj. Vậy nên tôi đang dùng method call.

Vậy là addToArray đã hoàn thành!
chưa nhỉ. Thực tế là vẫn chưa đâu. Các bạn tinh ý hẳn sẽ nhận ra nếu Function.prototype.call mà bị rewrite thì push.call có khả năng sẽ thất bại. Vậy nên hãy import cả Function.prototype.call từ thư viện tiêu chuẩn.
```
import { isArray_static, push } from "std:global/Array";
import { call } from "std:global/Function";

function addToArray(obj) {
  if (isArray_static(obj)) {
    call.call(push, obj, 123);
  }
}
```
Để dùng call để rewrite push.call(obj, 123) thì this của call phải là push. Như vậy cân phải call nó như push.call(obj, 123).

Đến đây bạn nào nghĩ "Đợi đã" thì chưa suy nghĩ thấu đáo rồi. call.call là Function.prototype.call nên cái này chưa giải quyết được vấn đề. Để có thể xoá bỏ nỗi bất an khi Function.prototype.call bị nhiễm bẩn thì Function.prototype.call đã được sử dụng rồi. Chúng ta chỉ cần dùng cái này thay thế là giải quyết được. Code sample cuối sẽ như thế này.

May thay trên ES2015 [Reflect.apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/apply) dùng tránh sự phụ thuộc vào Function.prototype.call đã được thêm rồi. 
```
import { isArray_static, push } from "std:global/Array";
import { apply } from "std:global/Reflect";

function addToArray(obj) {
  if (isArray_static(obj)) {
    apply(push, obj, [123]);
  }
}
```
Với sample này thì toàn bộ đều đang được get từ thư viện tiêu chuẩn. Vậy nên dù cái gì có bị rewrite như thế nào từ bên ngoài thì cũng không ảnh hưởng đến chương trình này. Có thể nói đây là chương trình rất chắc chắn. Như vậy với đề án thêm module dưới std:global vào thư viện tiêu chuẩn ta có thể viết được chương trình không bị phá vỡ bởi các nhân tố bên ngoài.

Tuy nhiên, cách này khá vòng vo, táo bạo so với các chương trình thông thường. Bạn có thể phản biện rằng với ngôn ngữ như JS mà phải đảm bảo tính an toàn đến mức này thì cũng là vấn đề đấy. Thế nhưng xét về nhu cầu thì đúng là cũng có chứ không phải không.

Đến đây tôi muốn nói rằng trong thư viện tiêu chuẩn còn có một cách như thế này để các bạn sử dụng. Bằng việc import từ module, bạn có thể phòng chống được việc funtion mục tiêu có thể bị rewrite bởi các nhân tố bên ngoài.

(còn tiếp)