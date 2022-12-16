Okay bài viết này là những gì mình có được trong lúc mình mày mò <b>viết code</b>, <b>làm việc</b> và cũng như đọc từ cuốn sách **[clean code](https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882)** để có được những dòng code sạch hơn, bài viết chỉ mang tính chất tham khảo để cải thiện công việc thôi nha. Okay bắt đầu thôi!

Có lẽ nhiều bạn, nhiều anh chị em khi làm việc trong giới lập trình đôi khi cũng đặt ra câu hỏi này trong đầu - **Vì sao** chúng ta cần có những đoạn **mã sạch** (dịch thô từ clean code), và chúng ta **làm cách nào** để viết ra được những đoạn mã sạch đó? 

Rồi, có lẽ mọi vấn đề trên đời được sinh ra đều có lí do của nó mọi người nhỉ! Thế clean code sinh ra để làm gì ta? Chỉ đơn giản là làm code của chúng ta trở nên sạch sẽ hơn thôi à? Hmm nghe có vẻ khó hiểu nhỉ vậy thì chúng ta sẽ cùng nhau tìm hiểu sâu hơn nha!

---

# 1. Bad code và những người bạn:
Khi chúng ta có ý tưởng về việc phát triển một phần mềm để giúp đỡ con người trong việc giao đồ ăn như là grab, baemin, ... hay đơn giản là trong mùa covid-19 chúng ta cần phát triển nhanh một phần mềm để khai báo y tế, ... (dưới bài viết sẽ chỉ lấy các nhãn hàng làm ví dụ không có yếu tố công kích nha)

Có thể trên mạng sẽ xuất hiện một vài nền tảng như wordpress hay wix, ... sẽ giúp chúng ta tạo ra những trang web mà **không cần phải code** chẳng hạn.

Nhưng bạn ơi đời mà, sẽ luôn luôn có những **yêu cầu đặc biệt** đến từ những vị khách hàng thân yêu của chúng ta nên là code là một phần không thể thiếu trong phát triển phần mềm.

Và rồi những dòng code nhanh chóng được viết ra và đôi khi khách hàng thay đổi yêu cầu liên tục khiến code của chúng ta thay đổi 1 cách chóng mặt. Khi đó con quỷ "áp lực" sẽ thôi thúc chúng ta rằng: "Thôi viết tạm vậy đi ít bữa quay lại sửa sau" - và ... không có sau này luôn khi mà chúng ta đã giao sản phẩm cho khách hàng!
<img src="https://images.viblo.asia/eaa4f6a7-4fdf-43c9-8178-1b34baff4c7c.jpg" alt="fix bug"/>

Thế thì viết code xấu có hại gì cho chúng ta không nhỉ? Có vẻ như là không khi đó là những dòng code do chính chúng ta viết ra và khi **người khác** nhìn vào thì "Ối giồi ôi, tôi đang đọc cái gì thế này! :(". Haiz và đó cũng chính xác là cảm giác của chúng ta khi đọc những dòng bad code của người khác đấy các bạn à...

![](https://images.viblo.asia/e21b4dbd-f6a8-4c7b-a28c-28733fa22f59.jpg)

Để mình kể các bạn nghe một câu chuyện lượm lặt từ quyển clean code và nó là một ví dụ khá hay nhé.

Chuyện là có một anh junior nọ ngót nghét có cho mình vài năm kinh nghiệm trong lập trình jav a vừa apply vào một công ty lớn có tên là **Suck**. Công ty có một product quá tuyệt vời với hàng trăm ngàn người dùng trong nước và dự định mở rộng ra nước ngoài, anh ta rất háo hức khi được tuyển vào công ty này.

Và khi anh ấy được tuyển vào, anh ấy được xếp giới thiệu về hai bộ phận chính của công ty: 

- Một team là team **OXE** maintain source code cũ và dự án tỷ đô đang chạy trên đống source cũ đó.
- Còn một team **BP** hội tụ đầy đủ các nhân tài trong công ty để xây lại project với một kiến trúc hoàn toàn mới!

Và thế là anh nhân viên này được chỉ định join vào team **OXE** để maintain "**đống bùi nhùi**" do những người đi trước để lại. Gọi nó là "đống bùi nhùi" tại vì:

- Khi product mới bắt đầu, tiền bạc công ty chưa có nhiều và yêu cầu thì thay đổi liên tục và khi ấy công ty thuê một vài anh coder vài năm kinh nghiệm với mức kinh phí không quá cao để xây dự án từ ban đầu. 
- Và cứ thế thời gian cứ trôi, product càng phát triển, yêu cầu này đắp vào yêu cầu kia, code mới đắp lên code cũ chỉ để phù hợp với yêu cầu khách hàng mà không restructure lại hệ thống, phân tách code không rõ ràng, đặt tên biến thì không theo một quy tắc nào cả... Tất cả hội tụ lại đã tạo nên 1 product tuyệt vời như ngày hôm nay!

---

# 2. Cái giá phải trả của Bad Code:

Thế bad code khiến chúng ta phải **trả giá** như thế nào? Đối với dev chúng ta thì:
- Uầy refactor lại đống code xấu xí này nào.
- Đập đi xây lại cho nhanh, nhìn gớm quá anh em.

Nhưng mà có ai đảm bảo rằng sau khi chúng ta **refactor hay đập đi xây lại** thì những chức năng trước kia nó vẫn chạy mượt mà không hay là nó lại sinh ra 7749 cái bug mới và team tester mới vào nó lại đập vào mặt mấy anh dev ấy chứ :(

Quay lại câu chuyện của anh Junior ở trển, về mặt công ty, họ phải chia nguồn tiền ra làm hai vừa để duy trì hệ thống cũ nhưng đồng thời cũng phải xây dựng hệ thống mới mà vẫn phục vụ được hàng trăm nghìn users trong nước, chà quả là đau cái ví quá đây mà.

> Người đời có câu: "**Mọi sai lầm đều phải trả giá**" và cái giá ở đây là tiền, rất nhiều tiền của công ty và nhanh chóng công ty đó đã từ bỏ team phát triển source code mới sau hơn một năm đi tiếp vì không đủ kinh phí duy trì và họ phải tập trung vào việc cải thiện kiến trúc ở source code cũ.

<br>
Đấy tuy đi nhanh để kiếm tiền nhưng mà cuối cùng chúng ta phải dùng tiền để đền bù cho những tổn hại đó. Vậy tại sao chúng ta không hạn chế nó ngay từ đầu!

Oke nói tới đây thì chắc nhiều anh chị em sẽ cầm gạch lên và định ném mình nhưng mà khoan, nghe cũng đúng mà nhỉ, nhưng mà bằng cách nào? 

Không phải tự nhiên mà chúng ta có những người đi trước mang tên **leader, senior hay những người chuyên làm về thiết kế hệ thống**, ... họ là những người đã kinh qua biết bao cái dự án, đối mặt với cả tỷ vấn đề, nắm trong tay hàng trăm ngàn kinh nghiệm,... mình nói thế thôi chớ mọi người cũng là con người, là những người **đi trước** chúng ta và họ đã gặp qua những vấn đề này rồi và các công ty cần những người như này vào làm việc để dự án có thể vừa **phát triển nhanh** và cấu trúc **chất lượng code vẫn tốt**!

### Thế những vấn đề này có cần phải đợi đến khi chúng ta gặp mới rút ra được kinh nghiệm không? 

- Rất may là các lập trình viên kì cựu và tài giỏi đi trước đều đã để lại cho chúng ta những kinh nghiệm quý báu.
- Việc của chúng ta là nên đọc, hiểu trước, tập thực hành và khi có vấn đề thật sự chúng ta có thể áp dụng nó một cách hiệu quả hơn là ngồi sáng chế ra "bánh xe" một lần nữa!

---

# 3. Thế chúng ta đối mặt với Bad Code như thế nào?
Có lẽ mấy bạn đã từng **tốn hàng giờ** để cố đọc và hiểu một vài đoạn code đã có từ lâu và không ai **dám đụng** vì sợ nó sẽ phát sinh những lỗi không mong muốn hay đơn giản là bạn refactor code của chính bạn và nhận ra mình đã viết cái gì đây nhỉ?

Và thỉnh thoảng những đoạn code được cho là "**good code**" đôi khi cũng nhanh chóng trở thành "**bad code**" vì:
- Chúng ta than phiền về yêu cầu thay đổi theo cách cản trở cách mà chúng ta đã thiết kế code ban đầu. 
- Lịch trình của chúng ta quá chặt chẽ để cải thiện chất lượng code.
- Chúng ta đổ lỗi cho những người quản lý ngốc nghếch và những "người khách hàng yêu mến"

**Nhưng bạn à, đó là do chúng ta chưa chuyên nghiệp đấy.**

Những người khách hàng tìm đến chúng ta để **kiểm chứng** lại yêu cầu của họ có phù hợp với hệ thống không. Trong khi đó những người quản lý họ sẽ **sắp xếp thời gian biểu** để dự án chạy và phù hợp với chúng ta để cùng làm việc với khách hàng.

Và chúng ta là những người hoàn toàn có thể giúp hệ thống tránh được những **sai sót** **không cần thiết** và đặc biệt là những sai sót như thế có thể mang đến cho chúng ta những đoạn **mã xấu** (bad code).

Và đôi khi dev chúng ta lại sợ nói ra vì... sợ làm không đúng mấy anh manager lại đuổi việc :). Nhưng mà thật sự là manager họ rất mong chúng ta **trao đổi** để đưa ra **những giải pháp** tốt nhất cho hệ thống của mình.

Giả sử bệnh nhân yêu cầu bác sĩ nên chữa thế này, thế kia cho mình và yêu cầu đưa thuốc bổ, thuốc cung cấp vitamin C,D, .... và bác sĩ họ sẵn sàng **từ chối** để đáp ứng những yêu cầu của bệnh nhân tại vì bác sĩ mới là những người biết bệnh nhân **đang gặp bệnh gì** và **cần phải đưa thuốc gì** chứ không phải là bệnh nhân. Thì ở đây dev chúng ta là những người bác sĩ, là những người biết hệ thống cần gì và khách hàng chính là những người bệnh nhân.

> Và chúng ta rút ra được từ câu chuyện trên đó là đôi khi chúng ta là những người quyết định chất lượng code, không phải khách hàng. Không phải khách hàng đưa gì chúng ta cần phải làm đó mà cần có sự đồng ý từ hai phía nha mọi người.

---

# 4. Thế clean code là gì và nó "trông" như thế nào?
Bjarne Stroustrup, người tạo ra ngôn ngữ lập trình C++ đã nói vài điều thế này:
> I like my code to be elegant and efficient. The logic should be straightforward to make it hard for bugs to hide, the dependencies minimal to ease maintenance, error handling complete according to an articulated strategy, and performance close to optimal so as not to tempt people to make the code messy with unprincipled optimizations. Clean code does one thing well.

Okay mình sẽ tóm tắt lại đại ý của Bjarne là code của chúng ta nên thanh lịch và rõ ràng :D, mình sẽ làm rõ hơn bằng các ý sau:
- Logic nên được trình bày rõ ràng để tránh việc tồn tại bug (chỗ này khá khó hiểu nhỉ và chúng ta sẽ cùng hiểu rõ nó hơn ở những phần sau!).
- Xử lý lỗi đầy đủ (điều này mình thường thấy mấy lập trình viên hay mắc phải vì cố gắng làm cho nó chạy trước này).
- Đừng cố optimize những đoạn code không cần thiết và làm cho nó trở nên khó hiểu (riêng chỗ này mình sẽ làm rõ ở các phần sau này).
- Clean code sẽ làm 1 việc duy nhất và làm tốt nhất có thể.
- Bjarne có đề cập tới "not to tempt people to make the code messy", khi chúng ta "chạm tới những đường code xấu" chúng ta thường có xu hướng làm nó tệ hơn bằng cách code thêm vào mà không restructure đoạn code đó! Mình sẽ lấy ví dụ chúng ta cần tìm đường đi từ một điểm đến một điểm bằng nhiều loại phương tiện khác nhau, chúng ta sẽ đơn giản implement như sau:
```java
class Navigator {
       private Transport.Type transportType;

       Navigator(Transport.Type transportType) {
            this.transportType = transportType;
       }

       JsonNode buildRoute(Point startPoint, Point endPoint) {
            if (this.transportType == Transport.Type.BUS) {
                    // Do some logic here
            } else if (this.transportType == Transport.Type.BIKE) {
                   // Do some logic here
            }
       }
}
```

```javascript
function buildRoute(startPoint, endPoint, transportType) {
        switch(transportType) {
                case 'BUS':
                        // Do some logic here
                case 'BIKE':
                        // Do some logic here
                default:
                    throw new Error('Unsupport transport type');
        }
}
```
Đoạn code trên đã vi phạm khá nhiều điều trong cách viết code clean, và ở đây mình sẽ chỉ đề cập tới việc sửa logic tính toán dựa trên điểm bắt đầu và kết thúc và cho ra các node đường đi dựa trên phương tiện.

Ở đây theo như Bjarne đề cập thì clean code chỉ nên làm một việc và việc switch case các logic xử lý ở đây đã làm cho nó làm nhiều hơn một việc rồi, và khi chúng ta sửa logic cách tính đường đi của xe bus chẳng hạn, chúng ta lại phải sửa logic trong một đống bòng bong này và nó làm cho code trở nên "phình to" ra!

-> Chúng ta có thể tạm rút ra là bad code sẽ cố làm tất cả mọi thứ (ở đây là làm mọi thứ trong 1 function) và nó làm "mờ" đi mục đích chính của phương thức (đoạn này sẽ khó hiểu và mình sẽ giải thích thêm ở phần sau).

"Big" Dave Thomas, sáng lập công ty OTI, cha đẻ của Eclipse strategy đã nói rằng:
> Clean code can be read, and enhanced by a developer other than its original author. It has unit and acceptance tests. It has meaningful names. It provides one way rather than many ways for doing one thing. It has minimal dependencies, which are explicitly defined, and provides a clear and minimal API. Code should be literate since depending on the language, not all necessary information can be expressed clearly in code alone

"Big" Dave Thomas cũng đã đề cập tới việc clean code nên cung cấp 1 cách để xử lý công việc hơn là nhiều cách, khá giống với ý của Bjarne "Clean code sẽ làm 1 việc duy nhất và làm tốt nhất có thể." và đi kèm với ý này đó là nó nên có một cái tên rõ nghĩa, đầy đủ. Quay lại ví dụ getNodes chúng ta có thể hình dung như thế này:
```
function getNodesByTransport(startPoint, endPoint, transport) {
        const SUPPORT_TRANSPORTS = {
                'BUS': calcNodeByBus,
                'BIKE': calcNodeByBike,
        };
        if (!SUPPORT_TRANSPORTS[trasnport]) { throw new Error('....'); }
        return SUPPORT_TRANSPORTS[trasnport](startPoint, endPoint);
}
```

Có thể thấy ở đây chúng ta đã tách biệt việc xử lý logic tìm ra node ra các function nhỏ hơn, và ở hàm getNodesByTransport chỉ tập trung vào việc là lấy nodes dựa trên transport thôi còn việc tính toán sẽ để cho các function nhỏ hơn xử lý, mặc dù ở đây chưa phải là best practice nhưng idea ở đây là function này đang làm 1 việc duy nhất và làm tốt việc của nó!

À và vị Big daddy này còn đề cập tới test nửa, đúng vậy, code clean là một code có đầy đủ test đấy nhá, mặc dù test khá là khó áp dụng ở ngay tại những ngày đầu dự án mới phát triển, nhưng khi dự án bắt đầu "phình to" ra các bạn nên nghĩ tới việc viết test nha, các bạn có thể nghiên cứu thêm về các kiến thức testing như TDD, BDD, ...
# 5. Đúc kết lại:
Chà clean code quả là cả một quá trình nhỉ nhưng chúng ta nên học hỏi về clean code để cuộc đời của chúng ta và đồng nghiệp đỡ khổ, không khéo lại làm dự án công ty trở thành một đống hỗn độn cũng nên. Chính vì vậy mà lập trình viên như chúng
ta là những người cần học hỏi, cải thiện cách code, tổ chức code và tổ chức hệ thống, ... từ đó giúp cho công ty của chúng ta tiết kiệm được đống tài sản và không chừng còn được thưởng thêm ấy chứ. :D

Viết code là một nghệ thuật và coder là một nghệ nhân và người tổ chức code là một nghệ sĩ. Không có cái nào là tuyệt đối cả nhưng chúng ta cần học hỏi kinh nghiệm của những người đi trước để cách tổ chức code của chúng ta trở nên tốt hơn :D.
Mọi người nhớ follow mình trong bài tiếp theo nha, phần tiếp theo mình sẽ đề cập tới cách viết code với những cái tên có "ý nghĩa" nha, không chỉ đơn giản là cách bạn đặt tên hàm mà nó còn nằm ở nhiều khía cạnh khác nữa đó!

Tóm lại các bạn đã hiểu "sơ" qua vì sao chúng ta cần phải code những dòng code cẩn thận và ở phần tiếp theo chúng ta sẽ đi sâu hơn về cách triển khai những dòng code ấy trên thực tế nha!