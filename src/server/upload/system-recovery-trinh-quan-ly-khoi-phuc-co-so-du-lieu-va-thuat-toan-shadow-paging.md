Để tiếp tục loạt bài viết về System Recovery, bài viết này sẽ trình bày về trình quản lý cơ sở dữ liệu và thuật toán shadow-paging  - một thuật toán khá đơn giản. 

## Trình quản lý khôi phục CSDL
Trình quản lý khôi phục là thành phần chịu trách nhiệm xử lý các thao tác cam kết (commit) và hủy bỏ (abort). Nó cũng chịu trách nhiệm cho quá trình khởi động lại, phục hồi từ thất bại của hệ thống, đưa cơ sở dữ liệu trở lại trạng thái phù hợp, nơi nó có thể xử lý các giao dịch một lần nữa.
![](https://images.viblo.asia/e4e72b65-035a-4d28-98e9-729a986fb315.PNG)
Mô hình quản lý phục hôi: Trình quản lý phục hồi gọi trình quản lý bộ đệm để giúp nó thực hiện các hoạt động cam kết, hủy bỏ và khởi động lại.

Nói tóm lại, các hoạt động cần phải có tác dụng sau: 
* Commit (*Ti*): Ghi các trang cập nhật của *Ti* vào cơ sở dữ liệu ổn định. Hoạt động này là một hoạt động nguyên tử, tức là toàn bộ hoặc không có gì, thậm chí trong trường hợp hệ thống lỗi. Ngoài ra, việc thực thi của nó là không thể bị gián đoạn; một khi giao dịch được cam kết, nó không thể bị hủy bỏ sau đó.
* Abort (*Ti*): Phục hồi tất cả các dữ liệu mà *Ti* cập nhật đến các giá trị nó đã có trước khi *Ti* thực hiện. Giống như Commit, việc thực thi của nó là không thể bị gián đoạn: một khi giao dịch bị hủy bỏ, nó không thể được cam kết.
* Restart: Bỏ bỏ tất cả các giao dịch đã hoạt động tại thời điểm lỗi hệ thống. Ngoài ra, bất kỳ cập nhật của các giao dịch đã cam kết mà chưa được ghi vào cơ sở dữ liệu ổn định trước khi hệ thống gặp lỗi (Chúng có thể chỉ được ghi vào log và chưa được lưu vào cơ sở dữ liệu ổn định trước khi thất bại) sẽ được ghi vào ngay bây giờ. Kết quả là cơ sở dữ liệu giờ chứa tất cả các cập nhật đã cam kết và không bị hủy bỏ.

Để thực hiện các hoạt động này, trình quản lý phục hồi phải tuân theo các quy tắc nhất định. Bản chất của các quy tắc này là kiểm soát khi dữ liệu bẩn được flush vào đĩa.
### Thực hiện hủy bỏ
Xem xét các hoạt động Abort (*Ti*). Giả sử *Ti* đã ghi trang P và không có giao dịch nào khác đã ghi P kể từ P lần cuối đọc từ bộ lưu trữ ổn định. Nếu P không được chuyển sang lưu trữ ổn định sau thời gian *Ti đầu tiên* ghi P, thì trình quản lý khôi phục chỉ đơn giản Deallocates(P). Nếu không, nó phải ghi trạng thái trước của P vào cơ sở dữ liệu ổn định; nghĩa là, nó phải khôi phục lại giá trị P của nó trước khi *Ti* được thực hiện. Thông thường, điều này là đơn giản, kể từ khi *Ti* cập nhật bản ghi của nó đến P và bản ghi log chứa hình ảnh trước của P.

Tuy nhiên, điều gì sẽ xảy ra nếu việc hủy bỏ đang được thực thi để giúp phục hồi sau sự cố hệ thống? Đó là, *Ti* đang thực thi tại thời điểm xảy ra lỗi hệ thống và quy trình khởi động lại đang thực thi Abort (*Ti*) để dọn dẹp mọi thứ. Có thể hình dung rằng bản cập nhật *Ti* vào P đã được chuyển sang cơ sở dữ liệu ổn định trước khi thất bại, nhưng bản cập nhật của nó không được chuyển sang bộ nhớ ổn định trước khi xảy ra lỗi.![](https://images.viblo.asia/92b861eb-a5de-40fd-96ee-e13f58cf74ae.PNG)

Trong trường hợp này, không thể hoàn tác cập nhật *Ti* vào P, vì hình ảnh trước đó đã bị mất. Tình huống không thể chấp nhận này phải được ngăn chặn bằng cách thực thi quy tắc sau:

**The Write-Ahead Log Protocol:** Không flush một bản cập nhật không được cam kết vào cơ sở dữ liệu ổn định cho đến khi bản ghi log chứa hình ảnh trước đó của nó được flush vào log.

Có một cách đơn giản để tránh việc ghi sổ để thực thi quy tắc này, đó là không bao giờ flush một bản cập nhật không được cam kết vào cơ sở dữ liệu ổn định. Chỉ cần xả nó vào log. Điều này đôi khi được gọi là phương pháp **no-steal**, bởi vì một khe cache bị chiếm bởi một trang cập nhật không bao giờ bị “stolen”, vì vậy nó có thể được sử dụng để lưu trữ một trang khác nó đọc được. Sau khi giao dịch được thực hiện, flush trang chứa cập nhật vào cơ sở dữ liệu ổn định. Bằng cách đó, bạn không bao giờ phải lo lắng liệu hình ảnh trước đó có trong log hay không, bởi vì sẽ không bao giờ cần phải hoàn tác một bản cập nhật không được cam kết trong cơ sở dữ liệu ổn định. Hoàn tác sẽ không bao giờ được yêu cầu. Vì vậy, cách này đôi khi được gọi là chiến lược **no-undo**.

Các hệ thống điện tử tránh việc ghi sổ bằng cách duy trì nhiều phiên bản của mỗi trang. Thay vì ghi đè một trang, họ tạo một phiên bản mới của trang. Theo định kỳ, các phiên bản cũ không còn cần thiết sẽ bị thanh trừng. Bằng cách giữ các phiên bản cũ trong cơ sở dữ liệu, hình ảnh trước đó không cần phải được ghi lại, vì vậy The Write-Ahead Log Protocol được tự động thỏa mãn.

### Thực hiện cam kết
Bây giờ chúng ta hãy xem xét hoạt động Commit (*Ti)* và giả sử *Ti* đã ghi trang P. Vì kết quả của giao dịch phải bền và cam kết là nguyên tử, tất cả các bản cập nhật của *Ti* phải được lưu trữ ổn định trước khi Commit-in vào log hoặc trong cơ sở dữ liệu ổn định. Cụ thể, sau khi hình ảnh của *Ti* cập nhật đến P (có nghĩa là, giá trị mà *Ti* đã viết cho P) phải ở đó. Điều này có nghĩa là trình quản lý khôi phục phải thực thi một quy tắc khác:

**The Force-at-Commit Rule**: Không cam kết giao dịch cho đến khi hình ảnh sau của tất cả các trang đã cập nhật được lưu trữ ổn định (trong log hoặc cơ sở dữ liệu ổn định).

Một cách đơn giản để thực hiện quy tắc force-at commit là phải flush các bản cập nhật của giao dịch vào cơ sở dữ liệu ổn định trước khi nó cam kết. Điều này đôi khi được gọi là một cách tiếp cận **force**, bởi vì tất cả các bản cập nhật của một giao dịch được force vào cơ sở dữ liệu ổn định trước khi cam kết. Điều này tránh mọi yêu cầu ghi chép để biết bản cập nhật nào không có trong cơ sở dữ liệu ổn định và do đó phải được xóa trong log trước khi cam kết. Nó cũng tránh làm lại các bản cập nhật đã cam kết, vì chúng luôn nằm trong cơ sở dữ liệu trước khi chúng được cam kết.  làm lại các bản cập nhật đã cam kết, vì chúng luôn nằm trong cơ sở dữ liệu trước khi chúng được cam kết. Vì lý do này, đôi khi nó được gọi là chiến lược **no-redo**. Tuy nhiên, nó không hiệu quả đối với các trang nóng; đó là, những trang thường xuyên được cập nhật. Như chúng ta sẽ thấy, các thuật toán ghi log tốt nhất tránh được sự kém hiệu quả này, mặc dù nó đòi hỏi một số ghi chép kiểm toán (bookkeeping) phức tạp.

Lưu ý rằng cách tiếp cận *no-steal* để thực thi giao thức *The Write-Ahead Log Protocol* và cách tiếp cận *force* để thực thi quy tắc *The Force-at-Commit Rule* là trái ngược nhau 

> ![](https://images.viblo.asia/68ab693c-361f-4b78-b736-1ff0fb3152c0.PNG)Tránh Hoàn tác hoặc Làm lại. Tùy thuộc vào thời điểm giao dịch Cập nhật được xóa, hoàn tác hoặc làm lại có thể tránh được.

Bất kỳ cách tiếp cận nào được thực hiện, có vẻ như một số yêu cầu hoàn tác hoặc làm lại sẽ được thực hiện. Mặc dù các thuật toán ghi log thực sự có thể thực hiện một số thao tác hoàn tác và/hoặc làm lại, nhưng có những kỹ thuật tránh cả hai, được mô tả trong phần tiếp theo.

Thao tác thứ ba của trình quản lý khôi phục là restart. Restart yêu cầu một chút nghiệp vụ kế toán. Cần biết các giao dịch nào đang hoạt động vào thời điểm xảy ra sự cố, vì vậy nó có thể hủy bỏ chúng và cập nhật những cam kết các giao dịch không được ghi vào cơ sở dữ liệu ổn định, sau đó có thể làm lại chúng. Hơn nữa, restart có thể bị lỗi, nghĩa là nếu hệ thống lỗi khi Restart đang chạy, nó phải có thể  thực hiện lại được Restart. Điều này có nghĩa là restart phải đảm bảo rằng, tại mọi thời điểm, hệ thống luôn ở trạng thái restart có thể thực thi chính xác (đó chính xác là yêu cầu giống như các thực thi thông thường). Điều này đòi hỏi phải sắp xếp cẩn thận các cập nhật để lưu trữ ổn định.

Với tất cả các quy tắc này, chúng ta đã sẵn sàng để xem các thuật toán thực hiện quản lý khôi phục. Thuật toán quản lý khôi phục tốt nên thêm ít chi phí disk cho việc xử lý giao dịch thông thường. Những nguyên nhân chính gây tốn kém là do các flushing quá thường xuyên (tạo ra lưu lượng dư thừa) và ghi log lại quá nhiều dữ liệu. Mục tiêu thứ hai là khôi phục nhanh chóng từ thất bại, vì vậy hệ thống chỉ sập trong một thời gian ngắn. Thời gian chết càng ngắn, tính sẵn có càng cao. Nếu hệ thống có thể phục hồi ngay lập tức lỗi, thì nó có thể lỗi thường xuyên mà không ai quan tâm (miễn là nó có thể thực hiện một số giao dịch!).
## Thuật toán shadow-paging
Shadow Paging là một cách đơn giản để thực hiện quản lý phục hồi. Đây là một trong những thuật toán phục hồi dễ dàng nhất để thực hiện bởi vì nó không yêu cầu quản lý log, một thành phần tương đối phức tạp. Nó không được sử dụng rộng rãi trong các sản phẩm thương mại bởi vì nó không được đánh giá hiệu quả cao với các giao dịch như ghi log. Tuy nhiên, vì nó đơn giản, chúng ta sẽ tìm hiểu nó trước.

Ý tưởng chính là để lưu trữ tất cả các bản cập nhật của một giao dịch trong một shadow copy của cơ sở dữ liệu. Ngoài ra còn có một bản sao chính của cơ sở dữ liệu, mà trạng thái mô tả việc thực hiện tất cả các giao dịch đã cam kết và không bị hủy bỏ. Khi giao dịch cam kết, copy shadow được hoán đổi với bản chính của cơ sở dữ liệu, do đó cài đặt bản cập nhật. Để kích hoạt chiến lược này, cơ sở dữ liệu tổng thể được cấu trúc như một cây các trang. Giả sử rằng cơ sở dữ liệu bao gồm một tập hợp các tập tin, nơi mà mỗi tập tin là một chuỗi các trang. Trong trường hợp này, trang gốc của cơ sở dữ liệu chính chứa các con trỏ đến trang gốc của mỗi tệp tin. Trang gốc của tệp là một bảng trang có chứa một chuỗi các con trỏ tới các trang của tệp tin. Để giữ mọi thứ đơn giản, giả sử rằng các tệp đủ nhỏ để trỏ tới tất cả các trang của tệp có thể phù hợp với trang gốc của tệp tin. Ví dụ, trong hình cơ sở dữ liệu có hai tệp có tên A và B.
![](https://images.viblo.asia/883edf7d-6a78-4e23-ba42-dd7aac1cc9d9.PNG)
 Tệp A có một bảng trang được xác định bởi `APt,m`, trong đó "m" có nghĩa là "master". Hình này cho thấy các con trỏ tới hai trang đầu tiên của tệp , A1 và A2.
 
 Để giữ mô tả này đơn giản, giả sử rằng các giao dịch thực hiện theo thứ tự. Do đó, tối đa một giao dịch hoạt động tại bất kỳ thời điểm nào. Trong bộ nhớ chính mỗi giao dịch có một bản sao lưu trong bộ nhớ cache của bảng trang của mỗi tệp mà nó đọc hoặc viết. Ví dụ, các bảng trang lưu trữ trong bộ nhớ cache cho giao dịch *Ti* được hiển thị trong hình. Ban đầu, nội dung của các bảng trang đã lưu trong bộ nhớ cache này giống với nội dung của chúng trong lưu trữ ổn định. Khi giao dịch thực hiện, các trang được fetch vào bộ nhớ chính. Giao dịch này cập nhật một số trang đó. Khi một trong những trang bẩn đó được làm sạch, nó được ghi vào một vị trí không sử dụng trong lưu trữ ổn định. Đó là, bản sao cũ của trang không bị ghi đè. Sau đó, bản sao của bảng trang trong bộ nhớ chính được cập nhật để trỏ tới trang được cập nhật trong bộ nhớ ổn định, và mục cập nhật bảng trang được đánh dấu là "cập nhật".
 
 Ví dụ, hình sau cho thấy kết quả của việc flush một phiên bản mới trang A2, nơi A2 cũ là bản gốc của trang trước khi giao dịch *Ti* thực hiện cập nhật của nó và A2 mới là phiên bản của trang bao gồm bản cập nhật.
![](https://images.viblo.asia/140f086e-36db-4df6-8717-55bda7144ae8.PNG)
Để cam kết một giao dịch, sẽ làm như sau:
1. Đối với mỗi trang P mà giao dịch được cập nhật, nếu P là bẩn trong bộ nhớ cache, nó sẽ được flush như mô tả ở trên.
2. Khởi tạo một danh sách gọi là tệp updated để bao gồm tên của mọi tệp được cập nhật bởi giao dịch.
3. Đối với mỗi tệp F trong tệp Updated, hoạt động như sau:
* Thiết lập một khóa viết trên trang gốc của F. Coi L là vị trí của nó trong lưu trữ ổn định.
* Đối với mỗi trang của F được đánh dấu là cập nhật trong bảng trang đã lưu trong bộ nhớ cache của F, sao chép chỉ mục của trang đó từ bảng trang cache của F vào bảng trang shadow của nó.
* Viết shadow copy của bảng trang của F tới vị trí không sử dụng L’ của bộ nhớ ổn định.
* Thay L bằng L’ trong mục nhập cho F trong tệp Cập nhật.

Ví dụ, nếu một giao dịch cập nhật trang A2 của tệp A, và B1 của tệp B, khi kết thúc thủ tục này, trạng thái bộ nhớ chính và dung lượng lưu trữ ổn định sẽ như thể hiện trong hình sau.
![](https://images.viblo.asia/a0f4f82e-70d5-441c-9ed6-afefe16009cf.PNG)
Khi điều này được thực hiện, chúng ta lặp lại cơ bản cùng một quá trình cho trang gốc của cơ sở dữ liệu, như sau:
1. Thiết lập một khóa viết trên trang gốc của cơ sở dữ liệu.
2. Đọc trang gốc của cơ sở dữ liệu vào bộ nhớ cache. Gọi đây là shadow copy của bảng trang trên cơ sở dữ liệu.
3. Đối với mỗi tệp F trong tệp tin cập nhật, sao chép con trỏ kết hợp (đến bảng shadow page của F trong lưu trữ ổn định) vào mục nhập của F trong bảng shadow page của cơ sở dữ liệu.
4. Ghi đè trang gốc của cơ sở dữ liệu trong bộ nhớ ổn định với shadow copy của trang gốc của cơ sở dữ liệu. Thao tác viết này của một trang duy nhất làm cho tất cả các trang cập nhật của giao dịch trở thành một phần của cơ sở dữ liệu chủ.
5. Giải phóng tất cả các khóa mà giao dịch thu được trên các trang dữ liệu, file bảng trang và trang gốc của cơ sở dữ liệu. Hủy danh sách Các bản Cập nhật và các bản sao của bảng trang được lưu trong bộ nhớ cache của giao dịch.

Như kết quả của bước 4 (hình sau) các bảng shadow page của hình trên hiện là bảng trang chính. Các bảng trang tổng thể cũ bây giờ là rác và do đó được gắn nhãn "g" trong hình (`APt,g` và `BPt,g`). Các phiên bản cũ của trang được cập nhật bởi giao dịch cũng là rác, tức là các trang `A2,old` và `B1,old`. Để hủy bỏ giao dịch, chỉ cần hủy tất cả các trang được cập nhật trong bộ nhớ cache và lưu trữ ổn định vì trang gốc của CSDL và bảng trang nó trỏ đến không thay đổi, không có trang nào được cập nhật bởi giao dịch bị hủy là một phần của cơ sở dữ liệu chính. Vì vậy, không có gì để hoàn tác.
![](https://images.viblo.asia/61e8df15-bb3f-4b9d-bb2d-849c4f88809e.PNG)

Một kết thúc mở trong câu chuyện này là làm thế nào để quản lý không gian có sẵn trong lưu trữ ổn định. Một cách tiếp cận là sử dụng một danh sách không gian có sẵn, gọi nó là Avail và coi nó như một tệp tin khác. Ví dụ: Avail có thể là một bit map, một mảng nhị phân nơi mỗi bit Avail[j] cho biết liệu trang j trong bộ nhớ ổn định có  sẵn có không.

Giả sử Avail phù hợp trong một trang, và một con trỏ tới Avail được lưu trữ trong trang gốc của cơ sở dữ liệu. Khi một giao dịch làm sạch một trang P lần đầu tiên, nó cần phải phân bổ một trang trong bộ nhớ ổn định để giữ shadow copy của P. Để làm điều này, nó đọc một bản sao của Avail vào bộ nhớ cache (nếu nó chưa có) xác định một trang k có sẵn, xóa bit trong Avail, đánh dấu Avail[k] được cập nhật và lưu shadow copy của P ở vị trí k. Khi giao dịch cam kết, các mục đã cập nhật trong bản sao trong bộ nhớ, cái mà được ghi vào bộ nhớ ổn định.

Một kết thúc mở khác là làm thế nào để cho phép hai hoặc nhiều giao dịch để thực hiện đồng thời. Trong trường hợp này, mỗi giao dịch có một bản sao riêng của bảng trang của mỗi tệp tin cập nhật. Điều này cho phép mỗi giao dịch theo dõi các trang mà nó được cập nhật. Ngoài ra, để đảm bảo rằng mỗi giao dịch đọc giá trị cam kết cuối cùng của mỗi trang mà nó truy cập, một bản sao chung của bảng trang tổng thể cũng được duy trì trong bộ nhớ cache. Khi giao dịch đọc một trang lần đầu tiên, nó sử dụng con trỏ trong bảng trang tổng thể lưu trữ trên toàn bộ, không phải là trang trong bảng trang lưu trữ bên trong giao dịch của nó. Để xem lý do tại sao, giả sử có hai giao dịch đang thực hiện, *T1* và *T2*, và trình tự hoạt động sau đây thực hiện:
1. *T1* cập nhật trang A1 của tập tin A.
2. *T2* cập nhật trang A2 của tập tin A.
3. *T2* cam kết.
4. *T1* đọc trang A2 của tập tin A.

Trong bước (4), *T1* nên đọc giá trị A2 do *T2* tạo ra. Tuy nhiên, sau khi *T2* cam kết, bảng trang của *T1* vẫn có một con trỏ với giá trị ban đầu của A2, chứ không phải trang được viết bởi *T2*. Vì vậy, khi *T1* đọc A2, nó cần phải sử dụng con trỏ đến A2 trong bảng trang tổng thể. 

Như đã nói ở đầu phần này rằng shadow paging không được sử dụng thường xuyên trong các sản phẩm thương mại bởi vì nó không tốt khi tỷ lệ giao dịch cao. Lý do là bước một trong thủ tục cam kết, yêu cầu tất cả các trang được cập nhật bởi giao tác được ghi vào cơ sở dữ liệu ổn định. Điều này cần rất nhiều I/O ngẫu nhiên, nó tương đối tốn kém.

Do quy tắc, không thể tránh ghi tất cả các bản cập nhật của giao dịch để lưu trữ ổn định trước khi giao dịch cam kết. Tuy nhiên, chúng ta có thể thực hiện nó hiệu quả hơn trong shadow paging bằng cách thêm các bản cập nhật vào một log, đó là một tệp tuần tự. Việc tuần tự ghi vào đĩa có thể được thực hiện nhanh hơn gấp 100 lần so với ghi ngẫu nhiên vào đĩa bởi vì chúng tránh được sự di chuyển của đầu đĩa và độ trễ quay. Do đó, một hệ thống có thể đạt được một tỷ lệ giao dịch cao hơn nhiều bằng cách viết theo log tuần tự hơn là viết ngẫu nhiên vào cơ sở dữ liệu ổn định. Cuối cùng, tất cả các trang cập nhật cần phải được ghi lại vào cơ sở dữ liệu ổn định. Tuy nhiên, điều này có thể được làm sau (không cần làm ngay), vì vậy tỷ lệ viết ngẫu nhiên có ảnh hưởng nhỏ hơn đến thông lượng giao dịch.

-----

Trong phần tiếp theo, chúng ta sẽ tìm hiểu về Các thuật toán phục hồi CSDL dựa trên LOG. Hẹn gặp lại.

-----
Tài liệu dịch và tham khảo - The book: 09_Philip A. Bernstein, Eric Newcomer. Principles of Transaction Processing (2nd edition). Morgan Kaufmann, 2009 - Chapter 7: System Recovery