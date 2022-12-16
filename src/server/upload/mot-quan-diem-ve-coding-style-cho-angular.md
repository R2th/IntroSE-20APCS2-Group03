**Coding Style** là một quy tắc quan trọng mà bất kỳ nhóm phát triển nào cũng nên xác định và đưa ra để thống nhất cho mọi người trong nhóm thực hiện theo để các đoạn mã được viết 1 cách chuẩn hơn, dễ bảo trì và sử dụng lại,...Nếu bạn đã code 1 cách chuyên nghiệp, bạn sẽ biết rất rõ **coding style** quan trọng như thế nào đối với nhiều người, nhiều nhà phát triển. Vô số giờ trong sự nghiệp của tôi đã được dành để tranh luận về **coding style**.

Sự đồng thuận giữa mọi người là một điều quan trọng trước khi viết dòng mã đầu tiên trong dự án, tuy nhiên điều này không nên được cố định trong toàn bộ vòng đời dự án. Đó là một tập hợp liên tục các bài học xuất phát từ thử nghiệm và kinh nghiệm của tôi.

Điều đó cũng không có nghĩa là bạn nên thay đổi suy nghĩ mỗi ngày, mà bạn nên đánh giá, thảo luận và quyết định với nhóm của mình khi dự án của bạn phát triển.

Sau khi viết các ứng dụng **Angular** kể từ những ngày đâu, tôi đã phát triển phong cách **coding style** của mình, chịu ảnh hưởng mạnh mẽ từ những người mà tôi đã làm việc cùng, đọc rất nhiều mã code hay đơn giản là từ những các dự án thử nghiệm của tôi.

Trong bài viết này, tôi muốn chỉ ra phong cách của tôi cho các ứng dụng **Angular** của mình để code trông được thẩm mỹ hơn, dễ đọc, dễ bảo trì, sử dụng lại và lý do đằng sau các quyết định của tôi. Hy vọng, nó sẽ truyền cảm hứng cho bạn và nhóm của bạn để áp dụng một số hoặc để làm cho riêng bạn.

Bất kỳ đề xuất nào từ các bạn sẽ luôn được cực kỳ hoan nghênh về cách cải thiện nó!

## HTML Wrapping

**Angular templates** có khá nhiều cú pháp bổ sụng bên cạnh cú pháp HTML thông thường và đôi khi chúng tương đối khó đọc. 

Và đề nghị đầu tiên của tôi liên quan đến wrapping. Tôi thường để không vượt quá 80 ký tự cho mỗi cột cho tất cả các file, để giúp nó đơn giản và dễ đọc hơn nhiều so với khi để quá nhiều ký tự trên 1 dòng.


Đây là một elemant được viết mà không có bất kỳ **convention** nào:
![](https://images.viblo.asia/e9f116e0-3729-4287-98b9-d7afc6769557.png)

Mọi thứ trông thật lộn xộn. Hầu như mọi dự án tôi làm việc trong khi tư vấn được viết theo cách tương tự. Chúng ta sẽ viết lại đoạn trích ở trên bằng cách sử dụng một bộ quy tắc đơn giản để làm cho nó dễ đọc hơn.

### Định nghĩa quy tắc để viết các thẻ HTML
* Khi một phần tử có hai thuộc tính trở lên, thông thường tôi chỉ viết một thuộc tính trên mỗi dòng.
* Các thuộc tính phải được viết theo một thứ tự cụ thể
* Trừ khi sử dụng một thuộc tính duy nhất, thẻ đóng phải được viết trên dòng tiếp theo

![](https://images.viblo.asia/29f85d3c-44ce-4168-855d-8649e15751f1.png)


Tôi đề nghị xác định một thứ tự cụ thể như sau:
1. Structural directives
2. Animations
3. Static properties
4. Dynamic properties
5. Events


Hãy cùng xem một ví dụ cá nhân về cách tôi viết theo quy tắc trên:
![](https://images.viblo.asia/604aec2b-c88c-403c-962b-d41ecdc67ffa.png)


Thậm chí tốt hơn, tôi đã luôn sử dụng các `structural directives` dành riêng cho `ng-container`:
![](https://images.viblo.asia/ebc3ff82-f030-4214-a51d-9bf7fe10849f.png)

Mặc dù tôi nghĩ rằng bạn có thể trộn lẫn thứ tự của các thuộc tính dựa trên quan điểm chủ quan, nhưng tôi cảm thấy khá mạnh mẽ về việc hiển thị các **structural directives** trước bất kỳ điều gì khác.

Một `structural directives` cho tôi biết (trước khi tôi cần biết bất cứ điều gì khác):
* Là elemant này đang được hiển thị? Và tại sao?
* Là elemant này đang được lặp đi lặp lại?

Theo tôi, điều này có thể tạo điều kiện cho việc đọc qua và hiểu cấu trúc của các `templates` của bạn.

## Pipes
`Pipes` rất mạnh: chúng có thể biến đổi các giá trị trong các templates và tránh trùng lặp/logic trong các components của chúng tôi. Chúng có thể được tái sử dụng và trộn dễ dàng, và dễ viết.

Nhưng chúng có dễ đọc và phát hiện không? Có và không

Điều này rất chủ quan và là một điểm nhỏ nhưng tôi vẫn nghĩ rằng nó có thể có giá trị để chia sẻ. Bất cứ khi nào tôi thấy một pipe trong template của mình, tôi có xu hướng bọc chúng trong ngoặc đơn ("()"). Cảm giác phân chia được cung cấp bởi dấu ngoặc đơn cho tôi một manh mối rằng giá trị đang được chuyển đổi và nhìn chung là dễ nhìn hơn:
![](https://images.viblo.asia/0550cace-48c8-4825-b010-29de8c2ab28a.png)

Khi sử dụng nhiều pipe, nó thậm chí có thể quan trọng hơn:
![](https://images.viblo.asia/5b0740ff-92fb-4b46-83dd-a9d977853a4e.png)

## Lifecycle Hooks
### Interfaces
Thêm interfaces với **lifecycle hooks** là không bắt buộc nhưng là dựa trên kinh nghiệm, tôi khuyên bạn nên làm theo.
### Thứ tự

Khi tôi tìm kiếm các `lifecycle hooks`, tôi thường hướng đến hàm tạo và mong muốn chúng nhìn thấy tất cả chúng cùng nhau và không trộn lẫn với các phương thức lớp khác. Lý tưởng nhất, chúng nên được xác định theo cùng thứ tự chúng thực hiện.

Và những gì tôi khuyên là:
* Luôn luôn thêm interfaces
* Thêm các thuộc tính public và private ở trên constructor
* Thêm các methods ngay bên dưới constructor và trên các methods của component
* Thêm tất cả chúng gần nhau
* Thêm chúng theo thứ tự chúng thực thi. Mặc dù vậy, phải thừa nhận rằng điều này hơi khó để theo dõi một cách nhất quán, vì vậy tôi đoán nó là một trong những điều ít quan trọng nhất

![](https://images.viblo.asia/0a13aac8-f133-4ce3-8deb-752518946e5f.png)
### Logic

Tôi thường tránh trực tiếp viết bất kỳ logic nào trong các lifecycle hooks, đề nghị của tôi là gói gọn logic trong các phương thức riêng tư và gọi chúng trong các lifecycle hooks:
![](https://images.viblo.asia/ed0ec649-0b1b-4e47-8af8-0506324ccc0d.png)

## Các methods và properties của components
Angular sử dụng các decorators cho các phương thức và thuộc tính của components để tăng cường chức năng của nó.


Có rất nhiều người trong số họ xác định một thứ tự cụ thể để tuân theo sẽ là quá sức, nhưng điều quan trọng tôi cố gắng làm theo là xác định vị trí của các thuộc tính và phương thức với cùng một `decorators` gần nhau.


Sau đây là những gì tôi sẽ xem xét là một ví dụ xấu:
![](https://images.viblo.asia/7fc59a1d-e481-4331-a122-f6a6e63b5f10.png)

Và dưới đây là cách tôi sẽ viết nó. Ngoài ra, hãy chú ý có một dòng trống ở giữa các nhóm thuộc tính có cùng decorator - Tôi nghĩ rằng nó giúp dễ đọc:
![](https://images.viblo.asia/e4ddf99d-ae9e-46a6-97ac-c94ad9a21c07.png)


Tôi không có ý kiến mạnh mẽ về điều này, nhưng cố gắng xác định các thuộc tính thành phần private và public không được đánh dấu với bất kỳ decorator riêng biệt với các thuộc tính được `decorator`. Theo kinh nghiệm của tôi, trộn chúng lên chỉ dẫn đến sự nhầm lẫn và cảm giác hỗn loạn.
## Naming
Tôi biết đặt tên mọi thứ là tương đối khó. 

Khi nói đến việc đặt tên, tôi luôn phải nghĩ hai lần hoặc nhiều hơn để đưa ra một cái tên dễ hiểu, không mơ hồ và dễ tìm kiếm:
* Có thể hiểu được: cái này làm gì, trong nháy mắt?
* Không rõ ràng: ví dụ: nếu chúng ta có nhiều sự kiện nhấp chuột trên một thành phần, thì sự kiện này đề cập đến sự kiện nào? Vì vậy, vâng, đặt tên cho nó trên Click không phải là cách để đi
* Dễ tìm kiếm: Tôi thấy mã đặt tên hơi giống SEO: người dùng của tôi (đồng đội hoặc tôi) sẽ tìm kiếm thứ gì đó đặc biệt này - và làm cách nào tôi có thể viết mã để đảm bảo họ có thể tìm kiếm dễ dàng hơn?
## Route Components
Tôi có xu hướng đặt tên các Route Component với một trang hậu tố.

Ví dụ: trang xác thực thường được gọi là `auth-page.component.ts` - cho tôi biết nó là một thành phần được định tuyến và tôi thường sử dụng nó để bọc và hiển thị các components khác thông qua `router-outlet`.


Một số quy tắc tôi có xu hướng tuân theo khi đặt tên các components là:
* Cố gắng sử dụng không quá 3 từ (không bao gồm tiền tố). Không có lý do cụ thể tại sao. Tất nhiên, đôi khi, đơn giản là không dễ dàng tôn trọng quy tắc này.
* Cố gắng tránh lặp lại các từ hoặc ngữ cảnh đã được sử dụng với các thành phần khác, vì nó sẽ làm chậm trong khi sử dụng chức năng tìm kiếm của IDE của tôi và cũng dẫn đến mở nhầm các tệp khác, điều này cuối cùng gây lãng phí thời gian và nguồn gốc của sự thất vọng.
* Đồng thời, cũng cố gắng không quá chung chung. Ví dụ: nếu chúng ta gọi một cài đặt thành phần - cài đặt là gì? Giúp đỡ một chút ở đây và cung cấp thêm một số bối cảnh (ví dụ: cài đặt ứng dụng, cài đặt hồ sơ, cài đặt tổ chức, v.v.).

## ES Imports
Giữ cho việc import tệp của bạn được sắp xếp và gọn gàng là một thách thức, đặc biệt là khi sử dụng IDE để tự động thêm chúng khi bạn nhập. Khi các tập tin của bạn phát triển, chúng có xu hướng khá lộn xộn.

Đây là cách tôi sắp xệp việc import của mình:

1. Angular imports luôn ở trên đầu.
2. Rx imports.
3. Bên thứ ba (không cốt lõi).
4. Local/Project imports luôn ở cuối.

Nó cũng là một thực hành tốt để để lại comments trên mỗi nhóm:
![](https://images.viblo.asia/8cb9ba18-ea43-4e6f-b31f-ef4fe06234c4.png)

# Tài liệu tham khảo
https://blog.bitsrc.io/an-opinionated-styleguide-for-angular-af623d54e2b8
https://angular.io/guide/styleguide