> Cập nhật: Mình đã bắt đầu viết Series "Học dịch ngược code Babel" [**tại đây**](https://viblo.asia/p/bai-mo-dau-series-hoc-dich-nguoc-code-babel-4dbZNG1alYM)

Chào các bạn!

Trong bài này mình sẽ nói về cách học tập để trở thành một lập trình viên Reactjs chuyên nghiệp, mình sẽ không dùng các thuật ngữ chuyên ngành như Junior, Senior, Expert, ... để diễn đạt mức độ thành thục khi sử dụng Reactjs, vì rằng các thuật ngữ này đã bị mọi người sử dụng gần như để mô tả số năm kinh nghiệm (đôi khi là trách nhiệm về công việc trong team) thì đúng hơn, không phản ánh đúng bản chất của level **chuyên nghiệp**  mà mình đang nói đến trong bài.

*Bài viết là ý kiến chủ quan của người viết, nên có thể phù hợp hoặc không phù hợp với bạn. Hãy cân nhắc trước khi đọc tiếp!*

### **Vậy một lập trình viên Reactjs như thế nào mới được gọi là chuyên nghiệp?**

Nếu bạn đạt tất cả **8 tiêu chí** dưới đây thì xin chúc mừng! Bạn có thể gọi là một lập trình viên Reactjs chuyên nghiệp rồi.
### 1. Hiểu rõ về Reactjs
Trước hết bạn phải hiểu rõ về Reactjs (đương nhiên rồi), không nhất thiết bạn phải hiểu tất tần tật mọi thứ về nó, vì nếu hiểu được như thế thì bạn đã vượt trên cả level này rồi. Hiểu về Reactjs ở một mức độ mà khi đụng đến bất cứ một vấn đề nào, bạn đều biết phải làm gì để giải quyết nó mà không phải hỏi người khác (việc tham khảo các giải pháp khác trên mạng đôi khi cũng là cần thiết để bạn đối chiếu và kiểm chứng cách giải quyết của mình, nhưng tuyệt đối **phải bỏ thói quen gặp vấn đề là google search ngay**).

Để đạt được điều này trong 2 năm, bạn cần:
* Đọc gần như hết các nội dung trong tài liệu chính thống của [reactjs.org](https://reactjs.org): Đọc và nghiền ngẫm, **viết thử sandbox bất cứ thứ gì đọc được** để kiểm chứng lại và biến nó thành kiến thức của bạn - nếu không làm vậy sẽ khó nhớ hơn.
* Đọc rất nhiều mã nguồn mở các dự án sử dụng Reactjs: trên Github có hàng tá dự án lớn có sẵn mã nguồn cho bạn tham khảo. Những thứ hay ho hầu hết bạn sẽ học được ở đây.
* Viết sandbox rất nhiều: Sandbox giúp bạn test nhanh một vấn đề nào đó mà không phải mất nhiều công sức, hãy chăm chỉ viết sandbox!
* Tham gia càng nhiều dự án mã nguồn mở càng tốt: Cố gắng tạo ra nhiều issues cho mỗi dự án bạn tham gia. Khi tạo issue, có nghĩa là bạn thực sự đang bắt đầu tìm hiểu sâu về code của dự án đó. Ngoài ra bạn sẽ có cơ hội được giao tiếp với các tay coder chuyên nghiệp, bạn sẽ học được từ họ không chỉ là kiến thức mà còn là cách thức tổ chức 1 repo, cách trả lời các issues của members. Giao tiếp với họ cũng sẽ giúp bạn khả năng diễn đạt bằng tiếng anh tốt hơn. Và hãy cố gắng thử submit dăm ba cái PR (Pull request) xem, bạn sẽ thấy với các dự án Opensource lớn, việc để submit được một PR lên code của nó cũng khoai lắm, code phải đạt rất nhiều tiêu chí mới được chúng nó merge. Điểm này sẽ giúp bạn nhận ra nhiều vấn đề về quy trình làm việc hiện tại của team bạn. 

### 2. Coding "Pro"
Kỹ năng này thường sẽ đạt được khi mà bạn đã:
* Viết code đến mòn cả bàn phím, chai cả tay
* Lúc nào cũng nghĩ đến cái mình đang làm, đi xe trên đường vẫn không ngừng nghĩ về nó. Đôi khi đến mức đèn đỏ mà éo biết để dừng lại
* Đọc gần như hết code của những Open sources lớn về React - **Chưa đủ** - Bắt chước viết lại các đoạn code của họ, lâu dần trở thành kiến thức của mình, đụng đến là lôi ra ngay.
* Vẫn chưa đủ đâu nhé! một số các component mà bạn thích thì opensource không đáp ứng được, thông thường là lúc bạn vào một sản phẩm thương mại nào đó và thấy họ làm cái này rất PRO, cái kia GOOD thế. Rồi bạn lại google search mong sao tìm được cái tương tự như của họ. Đương nhiên là những thứ như thế không bao giờ có thể tìm được opensource rồi. Vì vậy mình khuyên bạn rằng ngoài đọc Opensource, bạn còn phải đọc cả code đã được build, minify ra nữa cơ. Điều này không dễ xơi chút nào, nhưng hãy bình tĩnh, đọc hết bài mình sẽ chỉ cho bạn cách đọc code đã build.
* Code clean, no-comments: Code clean thì cũng không phải khó, có rất nhiều eslint, tslint có thể tham khảo ngay từ khi bắt đầu viết, lâu dần sẽ quen tay và trở thành thói quen. Nhưng no-comment thì khá là khó. Hãy luyện dần, bớt comment linh tinh dần đi rồi đến lúc bạn sẽ thấy comment là thừa thãi. Mình thường chỉ comment ở cấp độ function, class thôi, bên trong thì họa hoằn lắm gặp chỗ nào nó đặc biệt phức tạp thì mới viết comment.

Một số bạn cho rằng, việc code clean với một dự án nhỏ thì dễ, nhưng khi dự án lớn lên thì khó. Đây chỉ là suy nghĩ của những tay coder nghiệp dư (thợ code). Dù ở mức độ nào, dự án nhỏ hay lớn bạn vẫn phải luôn code thật clean, dù tiến độ gấp, dù bạn code 10 dòng hay 1000 dòng thì vẫn phải luôn luôn clean. **Nếu bạn code không clean => Bạn vẫn chưa được gọi là chuyên nghiệp!** 

### 3. Tốc độ code
Code chuyên nghiệp thì tốc độ cũng là một yêu cầu bắt buộc, ít nhất cũng phải:
* Gõ phím bằng 10 ngón, "không mổ cò"
* Gõ mà không cần phải nhìn bàn phím
* Sử dụng các snippest (hầu hết IDE đều hỗ trợ) khi viết code để giảm thiểu thời gian gõ những đoạn code basic.
* Hạn chế dùng chuột tối đa

### 4. Nói không với các thư viện ăn sẵn (packages)
Một số bạn sẽ cho rằng tiêu chí này không phù hợp, yêu cầu dự án, tiến độ, ... bắt buộc bạn phải dùng các UI packages. Khi mình tham gia một số các Fanpage về Reactjs (ngôn ngữ Việt Nam), mình thấy những câu hay được hỏi nhất thường là:

**Cái này phải dùng thư viện nào? ... Dùng ABC của thư viện XYZ này thì phải config ntn để xxxx? v.v...**. 

Đối chiếu lại các bạn nhân viên cty mình cũng thấy rằng, khi gặp một vấn đề gì đó, phần lớn các bạn đều sẽ nghĩ đến hướng tìm thư viện để giải quyết vấn đề đó.

Nhiều bạn nghĩ rằng bất cứ vấn đề gì cũng đều đã có thư viện người ta viết sẵn rồi, cài và dùng thôi. Mình sẽ liệt kê ra một số nhược điểm khi bạn sử dụng các thư viện ăn sẵn nhé:
* Khi bạn còn là sinh viên dùng thư viện ăn sẵn, ok đúng thôi!. Ra trường vài năm vẫn giữ thói quen đó thì nên xem lại mình. code 5~10 năm vẫn là fan của các thư viện ăn sẵn thì bạn thực sự cần xem lại mình (khuyên chân thành đấy!). Mình đã gặp nhiều người > 10 năm kinh nghiệm giờ suốt ngày đụng đến vấn đề gì cũng ngồi tìm thư viện ăn sẵn. OMG!. Nếu bạn cho rằng dùng thư viện ăn sẵn cũng k có gì xấu, miễn là xong việc là được thì xem ý tiếp theo:
* Các thư viện được xây dựng là rất tốt, (bản thân mình tự build có thể sẽ không bằng cái người ta đã làm ra và được nhiều người dùng), OK, nhưng trong hầu hết trường hợp, bạn sẽ chỉ dùng 1 phần rất nhỏ của thư viện đó, cũng có nghĩa là khi bạn import nó vào Project của mình thì lượng code thừa thãi có thể sẽ nhiều hơn lượng code mà bạn sử dụng. Hãy tưởng tượng khi project của bạn lớn lên, các dòng code thừa đó thực sự là shit, nó sẽ góp phần kéo hiệu suất cả ứng dụng xuống rất đáng kể! Để kiểm chứng vấn đề này, bạn có thể sử dụng công cụ lighthouse của Chrome và xem lượng code thừa trong các dự án của mình (nếu bạn là fans của các thư viện ăn sẵn)
* Nếu bạn yêu thích sử dụng thư viện ăn sẵn thì dù có code đến 30 năm, trình độ của bạn vẫn không khác một sinh viên mới ra trường là bao nhiêu. Khi gặp một vấn đề cơ bản nào đó thì không tự mình giải quyết được, bạn và ông sinh viên đó đều có cách giải giống nhau là sử dụng Google để tìm cái thư viện nào ngon ngon mà dùng.

**Lời khuyên:** Hãy bắt đầu xây dựng các thư viện của riêng mình ngay từ đầu, từ khi bạn còn non trẻ, rồi xây dựng, nâng cấp cải tiến nó dần theo năm tháng. Chỉ có làm như vậy thì trình độ của bạn mới thực sự được cải tiến dần theo thời gian. Nếu như bạn thấy quá khó để bắt đầu, hãy xây dựng những thứ đơn giản trước, chẳng hạn như viết một component Button thôi, để viết được trọn vẹn nó cũng không phải là điều dễ dàng rồi. Bạn sẽ thấy rằng cũng là component Button đó thôi, năm nay nhìn lại cái năm trước mình viết thì quả là như Shit. Nếu bạn thấy thế thật thì chúc mừng vì rõ ràng năm nay bạn đã tiến bộ hơn năm trước rồi.

#### Một case study thực tế của mình.

Cách đây mấy năm, lúc mình làm một dự án Chat giống như kiểu Slack, khi ứng dụng phải load một danh sách rất dài các tin nhắn, việc render ra DOM tất cả các tin nhắn đó sẽ làm cho trình duyệt bị LAG, rõ ràng rồi nhỉ. Vậy là mình phải đi tìm hiểu kỹ thuật Windowing. Đây là kỹ thuật chỉ render ra DOM một số lượng phần tử nhất định (trong khoảng không gian của màn hình người dùng, thường là cộng thêm một chút phía trên và phía dưới). Sau đó mình đã tìm thấy react-virtualized, mới đầu tìm hiểu về nó thì thấy nó rất kỳ diệu, nhưng khi implement cụ thể vào dự án của mình thì không thể nào config cái react-virtualized đó sao cho nó giống Slack được (cái mà mình đã lỡ yêu mất rồi). Cụ thể:
* Để làm được một infinitive list có "load 2 chiều (tức là khi scroll lên trên hay xuống dưới cùng của list, nó đều phải load thêm tin nhắn cũ hoặc mới hơn)" với react-virtualized thì không hề dễ, đương nhiên là vẫn làm được nhưng không được như ý mình. Sau một thời gian mày mò config được load 2 chiều, lại gặp một vấn đề: Khi load xuôi thì mọi thứ đều ổn, nhưng khi load ngược lên trên, mỗi khi load xong thì scroll bị nhảy đi một chút và không giữ nguyên trạng thái ban đầu, cái này làm cho mình khó chịu vcđ, bạn hiểu cảm giác nó bị giật đó không?
* Không thể custom để thêm một skeleton cho list ở cuối cùng hoặc trên cùng khi đang load thêm cho nó giống với Slack
* Khi danh sách của bạn có các phần tử với chiều cao khác nhau, bạn phải viết hàm Measure các chiều cao này, cache lại trong ứng dụng của bạn. Việc này đáng lẽ ra phải được làm tự động phía library của react-virtualized, nhưng lại bắt người dùng phải làm 1 việc hết sức mất thời gian và thừa thãi. Ngoài ra, việc measure của react-virtualized cũng làm cho list của bạn lúc render ra bị thay đổi chiều cao phần tử tại thời điểm vừa render => cảm giác bị giật khá khó chịu;
* Tóm lại là nó không thể bằng người trong mộng của mình là Slack. => **Mình đặt ra quyết tâm viết một cái Virtualized list như Slack**, quả thực ở thời điểm đó mình hơi liều, vì lúc đó (và có thể là bây giờ nữa) trên opensource cũng chỉ có mỗi react-virtualized và react-window là 2 thư viện tốt nhất chuyên xử lý windowing render. mà cả 2 cái này đều cùng của một ông viết ra cả.

1. Để thực hiện quyết tâm này, mình đã save tất cả code của Slack về (code đã build. minify rồi nhé), chôm từ html của web họ thôi.
2. Dùng các công cụ online để làm đẹp cái đống shit code vừa chôm được về, chỉ là làm cho nó dễ đọc hơn thôi, không bao giờ có thể dịch ngược được code js đã build đâu nhé!
3. Cài đặt addon của React vào Chrome, inspect để xem cấu trúc component của Slack:

![](https://images.viblo.asia/210a6f4c-f561-43ea-82c1-aba793e03602.jpg)

Đây đích thị là những từ khóa mà mình sẽ dùng để tìm trong đống Shit code vừa chôm được của nó: DynamicList, Scrollbar, ListItem, .... Chạy đâu cho thoát!

4. Từ các từ khóa này, mình sẽ lọc ra các đoạn code của những component mình cần, thu hẹp phạm vi nghiên cứu lại cho đỡ khổ!
5. Bắt đầu công cuộc nghiên cứu code đã được build nào:

Nói thật là khi mới bắt đầu đọc code JS đã được build, mình thực sự rất hoang mang vì có nhiều chỗ không hiểu nó là cái quái gì cả. Bạn thử xem đoạn này nhé!

```js
var C = h()({}, k["a"].propTypes, {
            layout: b["b"].instanceOf(w["a"]),
            loadPre: b["b"].func,
            loadPost: b["b"].func,
            loadAround: b["b"].func,
            itemToScroll: b["b"].string,
            animateOnScroll: b["b"].bool
        });
        var j = h()({}, k["a"].defaultProps, {
            layout: void 0,
            loadPre: g["noop"],
            loadPost: g["noop"],
            loadAround: g["noop"],
            itemToScroll: void 0,
            animateOnScroll: true
        });
        var S = function(e) {
            p()(t, e);

            function t(e) {
                n()(this, t);
                var a = l()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                a.onScroll = a.onScroll.bind(a);
                a.setHeight = a.setHeight.bind(a);
                a.layout = e.layout || new w["a"];
                a.node = null;
                a.scrollTop = a.layout.setContainerHeight(e.height, 0);
                a.scrollTop = a.layout.setKeys(e.keys, a.scrollTop);
                var r = a.layout.getBounds(a.scrollTop, a.scrollTop + e.height),
                    i = r.start,
                    s = r.end;
                var o = a.layout.getTops();
                a.state = h()({}, a.state, {
                    start: i,
                    end: s,
                    tops: o
                });
                return a
            }

```

Bạn có hiểu được đoạn này từ đâu mà thằng Babel nó build ra được không?

```js
function t(e) {
                n()(this, t);
                var a = l()(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
```

Lúc đó mình không biết hỏi ai cả, thực ra là mình có hỏi một số người, nhưng họ cũng k hiểu nguồn ban đầu là gì thì Babel sẽ build ra được đoạn này. Vậy nên mình quyết định là hỏi ông Babel: Mày build cái này từ clg thế? Đen thay là nó éo trả lời mình, nên mình lại phải đi tìm hiểu thêm cả thằng Babel nữa. Sau một thời gian ngắn tìm hiểu em Babel thì cũng ra được vấn đề. Như sau:

Đoạn đó thực chất là khi một class được kế thừa từ 1 class khác, đương nhiên trong constructor phải gọi hàm super của thằng cha. Chỉ có thế thôi, thực chất đoạn code trên là từ cái này mà build ra (đại khái thế thôi nhé):

```js
class MyComponent extends React.Component {
	constructor(props) {
		super(props);

		...
	}
}
```

Tổ mẹ nó chứ, cái đoạn code vỡ lòng của React mà nó build ra được một thứ oằn tà là vằn như vậy cũng nể thật. Ở thời điểm đó đối với mình hiểu được cái code của Babel là một hạnh phúc rất lớn. Nó cho mình động lực để nghiền ngẫm code Slack mỗi ngày, mình đã đọc đến quên cả ăn, ngủ (chỉ có đi vệ sinh thì vẫn phải đi), (sự thật, không hề chém).

Có công mài sắt thì có ngày thành kim thôi, đọc nhiều code Babel đến mức mà giờ nhìn code Babel thì cũng không khác gì source code, làm cho mình có khả năng có thể hiểu được rất nhiều mã nguồn của mấy thằng khủng, cho dù nó dấu như mèo dấu c*t (không open source). Và component của mình đã thực sự khắc phục được các vấn đề mà mình gặp với react-virtualized sau quá trình mấy năm sử dụng và nâng cấp. Mình cũng hi vọng là trong năm nay sẽ publish nó ra cho cộng đồng dùng. :)

Kết quả cuối cùng mình đã viết được 1 component giống của Slack đến khoảng 90%, không dám nói là giống hệt nhưng những chức năng cơ bản thì không khác gì Slack. Tất nhiên là trong quá trình viết cũng gặp rất nhiều vấn đề, đôi khi chán nản không tìm ra giải pháp thì mình lại để yên nó vậy, một thời gian sau quay lại thì lại tìm ra giải pháp. Cứ miệt mài nâng cấp cải tiến như vậy thì cuối cùng nó cũng rất là ngon.

Tóm lại là vầy: Việc đọc JS đã được build ra đã giúp mình học hỏi code của rất nhiều ông khủng, làm cho trình độ của mình được cải tiến rất nhiều, nhiều hơn đọc Opensource!

### 5. Có kỹ năng Debug, test, CI/CD, performance analytics, ...
Mấy thứ này là hiển nhiên nên mình cũng không muốn nói nhiều ở đây, chỉ nhấn mạnh một chút là bạn cần phải biết quan sát, đo lường hiệu suất những thứ do mình viết ra, để biết đường mà cải tiến nó thôi. Ví dụ đơn giản như bạn viết 1 trang thương mại điện tử mà Performance < 20 điểm thì cũng coi như là vứt đi rồi.

### 6. Thành thục, các công cụ quản lý và build source code
Thành thục được webpack đã cả là một vấn đề, bạn phải đọc hết Docs của webpack, config rất nhiều dự án, thử thay đổi các thông số trong config để xem kết quả. Đến lúc nào có thể tự ngồi viết được file config thì thôi!

Như thế vẫn chưa đủ, ngoài Webpack, bạn còn phải biết đến Rollup, Parcel. Nếu bạn trả lời được câu hỏi: Khi nào thì dùng Webpack, khi nào dùng Rollup, khi nào dùng Parcel để build mã nguồn thì coi như bạn đã đạt tiêu chí này!

Ngoài ra, bạn cũng cần phải sử dụng thành thạo npm, yarn để quản lý mã nguồn. Bạn có biết khi nào nên dùng npm, khi nào nên dùng yarn chưa?

### 7. Tiếng Anh tốt
Không nói nhiều, một lập trình viên giỏi cần sử dụng tốt tiếng Anh, đó là điều đương nhiên. Lý do thì ai cũng biết rồi nên nói ra sẽ là thừa.

### 8. Đóng góp cho cộng đồng
Tiêu chí cuối cùng mình đặt ra là "Đóng góp cho cộng đồng". Nếu bạn là một lập trình viên chuyên nghiệp mà luôn giữ khư khư những thứ của mình, không chịu chia sẻ cho người khác, thì vẫn không phải là chuyên nghiệp. Hãy nhớ rằng bạn đang sống trong một cộng đồng, bạn muốn tiến lên thì bản thân cái cộng đồng đó nó cũng phải tiến lên. OK?

## Tạm kết
Bài này mình viết khá là dài, mình cũng đoán là có nhiều quan điểm mình đưa ra không vừa ý với một số bạn. Mình mong là các bạn sẽ đóng góp ý kiến cho mình để bài viết này sẽ có ích hơn cho những bạn trẻ! Cảm ơn bạn đã dành thời gian đọc hết bài của tôi!