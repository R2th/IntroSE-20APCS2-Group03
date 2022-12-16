Lại một ngày lảm nhảm :duck:, kể cho các bạn nghe về cửa hàng bánh bao của X.

X quyết định mở một cửa hàng bán bánh bao. Không đi theo lối tư duy thông thường, cậu quyết định sẽ có những hướng đi đột phá về mặt công nghệ (làm bánh bao :duck: ), và giải pháp đó là: Bánh bao as ... code. 

## Bánh bao as code?

Bánh bao as code là "định hướng" (provisioning) bánh bao qua một "dây chuyền" (*It is actually not what I planned to describe, but well* :laughing:) để đảm bảo được hai đặc tính: **Consistent** và **predictable** (Không biết dùng từ gì trong tiếng Việt để diễn tả cho ... đúng :confused: ) của bánh bao. Chúng ta hãy phân tích kĩ hơn về câu trước. Thứ nhất, bánh bao được làm thông qua một "dây chuyền", vậy là **nó không còn là manual process nữa**. Thứ hai, mục đính là đạt được đặc tính **consistent** . Có nghĩa là mỗi khi bạn dùng "dây chuyền" để tạo ra bánh bao, nó sẽ làm bánh bao một cách rất **consistent**. Điều này rất quan trọng, nhất là khi bạn có nhiều cửa hàng bán bánh bao ở khắp năm châu bốn bể (KFC goal :duck: ).

Sau khi phác thảo xong, X lên kế hoạch về cách thực hành giải pháp trên. Đầu tiên, bánh bao as code thì hiển nhiên là phải ... viết code rồi. Tiếp đó, để có thể centralize và quản lí code, chúng ta sẽ store nó tại một source control (version control, eh ?!). Tiếp đó, X nghĩ tới nên dùng declarative hay imperative.

## Declarative and Imperative

Để làm bánh bao theo hướng imperative. Đầu tiên, chúng ta cần "nói" với "dây chuyền" chúng ta sẽ cần gì: nguyên liệu. Tiếp đó, dạy "dây chuyền" cách lấy nguyên liệu.

```
function get_bột_mì();
function get_trứng();
function get_thịt_lợn();
function get_hành_lá();
function get muối();
...
```
Sau đó, chúng ta cần "nói" với "dây chuyền" cách để từ những nguyên liệu đó, làm thế nào tạo ra được bánh bao. 
```
function nhào_bột()
function cho_trứng_vào_bột()
function băm_thịt()
...
```
Nghe khá đơn giản đúng không? Bây giờ, ví dụ như chúng ta muốn làm bánh bao bằng cách declarative. Lúc này, "dây chuyền" sẽ có một số "dữ liệu" và "hướng" các để làm ... đồ ăn ( so not only bánh bao, but food in general :duck: ). Chúng ta sẽ "bảo" với "dây chuyền": Giờ nè, làm bánh bao đi, gọi là bánh bao vị ... kem dừa nè. Bao gồm những nguyên liệu này nè.

```
food bánh_bao bánh_bao_vị_kem_dừa {
bột_mì
thịt
trứng
kem
muối
...
}
```

Vậy là một cái bánh bao vị ... kem dừa hoàn thành. "Dây chuyền" sẽ có predefined routine về cách làm thế nào để lấy nguyên liệu. Chúng ta có thể thêm nguyên liệu để tùy biến, còn là "dây chuyền" sẽ tự chủ động implement. X quyết định đi theo hướng declarative.

## Idempotent

X không chỉ quan tâm tới ... bánh bao, X còn quan tâm tới sức khỏe của khách hàng. X quyết định sẽ bán hàng theo hướng **idempotent**. Lấy ví dụ như sau: Khách hàng đặt hàng bánh bao. X làm bánh bao xong và đưa cho khách hàng. Một lúc sau, khách hàng lại bảo X làm bánh bao, X sẽ không làm thêm bánh bao. Vì X đã biết về **state** của khách hàng. Khách hàng đã có bánh bao rồi, nếu khách hàng lại đưa ra **instruction** giống như cũ, X sẽ không làm gì cả vì **instruction đã match với state khách hàng mong muốn**. Khách hàng đã có bánh bao. Với trường hợp non-idempotent, mỗi lần khách hàng đưa ra một **instruction giống như cũ**, X sẽ lại đưa cho khách hàng bánh bao.

Giải thích một cách rộng và ... có nghĩa hơn thì:

>  idempotent in the sense that if you haven't changed anything about your configuration and you apply it again to the same environment, nothing will change in the environment because your defined configuration matches the reality.

Tất nhiên, bán hàng thế thì sẽ lỗ. Nên giả tưởng thì được, chứ bán như thế thì không được. :laughing: 

## Push vs Pull

Concept này khá trừu tượng trong việc ... bán bánh bao. (Lại) lấy ví dụ như: Trong trường hợp push, khi khách bảo: xin miếng bánh. X sẽ đưa (push) miếng bánh cho khách hàng. Còn trong trường hợp pull, khi khách bảo: xin miếng bánh, khách sẽ cố ... lấy miếng bánh khỏi X (pull), X sẽ nói ok. (service vs self serivce :laughing:). 

Mở rộng ví dụ thì push là **push defined configuration to the target environment**, còn pull là **an agent running on target environment, it pull its configuration from central source on a regular basis** (gitlab runner).

## Conclusion

Vậy là X đã làm xong dây chuyền bánh bao as ... code. Còn bạn đã có khái niệm về infracstructure as code. Xin chúc mừng :congratulations: . 

Tính mình thích viết, viết đủ thứ bà lằng nhằng, tới mình sẽ chuyển nhà sang [blog cá nhân](https://phihuyhoang.github.io/) để viết ... bà lằng nhằng tiếp. Rảnh ghé chơi nha.

Somewhere, xx-xx-20xx

Rice