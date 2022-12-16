## Tại sao nên đọc bài này

- Trả lời cho câu hỏi, em học xong HTML, CSS và JS rồi thì làm gì để pro nữa anh?

> 🐣 Bữa đọc đâu đó cũng thấy một bạn viết format này, thấy hay quá nên nay mình học theo, hy vọng mọi người thích nó


🐣: Em nghe mấy người hay nói về State, State Mangement rồi dùng Redux các thứ, vậy State với State management là gì vậy anh?

🐔: À, trong cái app của em thì sẽ có trạng thái (state) đúng không, ví dụ như nút Like/Reaction trên facebook sẽ có nhiều trạng thái (Like, Tim, Haha, khóc, phẫn nộ,...). Thì việc em biết cái nút đang ở trạng thái nào nghĩa là em biết state của nó

![Untitled.png](https://images.viblo.asia/565ff3c9-30d6-431c-830b-11666e776aae.png)

Còn state management là gì hả? Thì một app có một đống state rối rắm, rườm rà như vậy, mình là thằng frontend dev thì cần phải quản lý (manage) đống trạng thái (state) đó nên gọi là State management thôi!

🐣: Ra vậy, mà em thấy lúc học jQuery rồi làm Landing page thì cũng đâu cần quan tâm nó là gì đâu ta?

🐔: Khá là đúng, vì các app dùng jQuery hay là Landing page thì hấu hết nó nằm ở dạng tĩnh, hoặc rất ít tương tác, mà ít tương tác thì ít có state, nên cơ bản e không cần quan tâm tới nó lắm. State thì vẫn có nhưng nó không tới mức phức tạp để mình cần quan tâm

Sau này khi mà máy tính của người dùng càng ngày càng mạnh lên, thì người ta muốn đưa nhiều việc tính toán xuống browsers, do đó họ build ra những framework để làm web app như là Angular, React, Vuejs,... nè.

![Untitled 1.png](https://images.viblo.asia/b48c0b06-5229-403e-a5dc-45f6176dd5a0.png)

Hồi trước khi state chủ yếu lưu ở database, sau đó người ta render trực tiếp nó vào HTML thì hầu hết mấy người back-end làm cái này nên tụi Frontend chỉ có “cắt HTML/CSS” thôi. Bây giờ thì state được đẩy xuống thông qua API, và tụi Frontend phải khổ hơn là cầm API đó, call để lấy data về, xử lý xong rồi mới render ra. Từ đó đẻ ra một đống state mới phát sinh.

🐣: Thế thằng Redux là để quản lý state ở React chứ gì, em học xong nó lâu rồi!

🐔: Yup, Redux là một thư viện để quản lý state, nhưng mà nó có thể dùng ở hầu hết các framework khác như Angular, Vuejs, ... hay cả ở backend luôn, có điều bộ đội React + Redux là kết hợp ok nhất nên em thấy ai bảo học xong React cũng học Redux thôi.

🐣: Mà nó có liên quan gì tới redux-thunk hay redux-sagas không anh?

🐔: Hai thằng đó để thêm việc call Asynchronous cho Redux á, nói chung là với định nghĩa của Redux thì các hàm xử lý state trong đó bắt buộc phải là Pure và Synchronous. Nhưng mà vấn đề em muốn call api thì sao? Nó là Asynchronous mà, do đó em cần thêm một số thư viện để làm mấy thứ như vậy, nói chung là khà... rườm rà

![Untitled 2.png](https://images.viblo.asia/b24acd04-4725-4ddb-a2d4-bf025a8a469e.png)

🐣: Em đọc đống đó cũng thấy rối, có cách nào đỡ rườm rà hơn không anh?

🐔: Có chứ, nhiều lắm anh có viết ở đây nè:

[Chọn lib state management nào bây giờ?](https://thanhle.blog/blog/chon-lib-state-management-nao-bay-gio)

Nói chung là em phải tìm hiểu xem Project và team của mình hợp với thư viện nào, anh có một số tiêu chí như:

- Feature - Chức năng ngon không, hợp với prj của mình ko
- Easy to add - Cài vào prj có dễ không
- Easy to write - Rồi sài nó làm sao? Mình viết dc mà thằng bạn mình không làm dc là chết rồi
- Community - Cộng đồng thế nào? Lỡ bug cái biết hỏi ai

Kì này anh đang dùng [React-query](https://react-query.tanstack.com/), thấy cực kì ổn, ai trong team cũng khen 😗

🐣: Hehe cảm ơn anh. Đầu bài anh có nói tại sao nên giỏi cái này, anh nói cho em với

🐔: 

**Ok, đầu tiên là vì nó quan trọng!**

![Untitled 3.png](https://images.viblo.asia/ca2b3b92-3894-4b60-a496-4187acb9cbc5.png)

Như lúc nãy anh có nói á, việc máy của user ngày càng mạnh lên thì thì frontend mình càng ngày càng phải làm nhiều hơn, và việc quan trọng nhất là manage state. Vì lúc này em sẽ cần call khá nhiều api để có thể tái hiện lại cái state lưu sẵn ở backend để thể hiện cho user. Rồi khi user tương tác với app thì mình cũng phải coi xử lý state làm sao, update lại state chỗ nào, call api lưu kết quả, rồi còn coi xem api call đó có thành cong hay không!

Do đó nó là công việc mà nếu em code frontend phải làm, và sẽ phải làm rất nhiều trong tương lai

**Thứ hai là vì nó nhiều tiền.**

![Untitled 4.png](https://images.viblo.asia/30e12092-998b-4304-871c-018e81c337c7.png)

Thực ra cái này kéo theo do hệ quả của cái trên thôi, vì nó quan trọng và vì nó cũng khá khó, do đó em làm được thì em có nhiều tiền thôi. Nếu so với một frontend chỉ biết cắt ghép HTML/CSS thì người biết làm state, biết làm web app dùng React, vuejs, Angular,... đồ đó thì lương của em sẽ rất rất cao. Anh đã từng thấy báo giá một số dự án làm web landing page đồ và tưởng tượng no way mà anh có thể làm được trang web đó trong vài ngày với giá 10-15tr. Trong khi anh làm cái web app nhàn nhàn 6-7 tiếng trên Upwork cũng được tầm 4-5tr đi uống cocktail rồi

Do đó làm frontend thì phải quan tâm tới State Management đi, không là không thành “vua của các nghề” được đâu.

**Thứ ba là nó biến em trở nên đa năng hơn.**

![Untitled 5.png](https://images.viblo.asia/2a0a0fb3-83df-45f1-9836-36822d918c83.png)

Việc em nắm rõ việc state thế nào, tổ chức ra sao sẽ giúp em mở rộng con đường muốn đi hơn. Vì hầu hết các kĩ năng quản lý state sẽ khá giống việc em code backend, do đó sau này học thêm tí back-end là trở thành Phun Sờ Tắc Đì ve lớp pờ rồi! Ngay cả sau này em có nhảy qua code blockchain cũng vậy, cực kì dễ luôn nhé. Anh phải nói là giỏi về state thì dễ học code blockchain hơn là qua học backend luôn đó.

À ngoài ra em nắm được state thì em cũng code được ở gần như bất cứ framework nào: Angular, Vuejs, Svelte,... đểu quẩy dc hết nhé

🐣: Oh nghe quan trọng thật đó, có cách nào học dễ không anh?

🐔: Anh không biết có cách nào học tốt hơn không, nhưng đối với anh thì làm nhiều, tự coi lại mình code có chỗ gì không ổn, rồi đọc thêm cách giải quyết vấn đề đó như thế nào là cách học hiệu quả nhất.



À, anh có hệ thống lại về state management ở hình trên, em thử xem có học được không nhé:

- Cơ bản quản lý state là việc mình xử lý: State + Event = State mới. Vd em có nút Reaction ở đầu đang có state là Like, user click vào nó chọn Event Thả tim, vậy em phải handle event đó với state hiện tại để chuyển thành state Thả tim
- Event thì chỉ có 2 nguồn chính thôi: Một là từ users (click, scroll, hover, type,...), 2 là từ các 3rd party khác (Api response, websocket, service workers)
- Với state mới thì mình sẽ có 2 đường: Một là update lại UI (cái này thường framework/lib nó làm cmnr); hai là Update lại vào 3rd party, vd call api để lưu lại bài viết chẳng hạn.

 Anh lấy ví dụ về việc Post 1 bài trên Facebook nhé:

- State đầu tiên: New feed (Post, comment,...), user hiện tại, list bạn bè,...
- Event: User nhập vào ô status “Hôm nay bạn cảm thấy thế nào?”
- Mình sẽ có logic xử lý user gõ vào ô đó thì lưu lại Text của status đó, đồng thời cũng check thêm xem trong content thằng này gõ có Hash tag hay Mention đứa nào đi ăn bún đậu mắm tôm không? Nếu có thì update state để hiện cho nó cái dropdown show ra cho nó chọn cho nhanh cái
- Vậy là update thành state hiện tại hiện thêm cái dropdown, bây giờ react mới map cái state đó để render ra cái dropdown cho user click vào
- Rồi khi user có Event click xong, thì mình lại update lại state là “Tạo chọn xong rồi, tắt hộ bố cái”
- Ok cuối cùng thì cũng viết xong, `Enter` thôi
- Bây giờ mình sẽ nhận Event đó, lưu cái status đó vào trong State new Feed để render ra luôn thằng users. Đồng thời, gửi thêm một cái Event vào 3rd party cụ thể ở đây là call API để lưu lại status.
- Xong

🐣: Ohhh, nghe anh giải thích cũng khá đơn giản á!

🐔: Uh anh phải tốn bao nhiêu não mới hệ thống được như vậy á. Tuy nhiên nó không tầm thường đâu. Nó giúp em học các lib về quản lý state khác nhanh hơn nhiều luôn

🐣: Ở chỗ nào anh?

🐔: Theo như anh biết là tất cả các thư viện về quản lý state đều dựa trên concept trên. Việc em tách được đâu là State hiện tại, Đâu là Event, Đâu là state mới giúp em code clean hơn và rành mạch hơn. VD hàm để xử lý Event thì nên để ở đâu, state mới nên tính như thế nào nè,... Rồi tự đó map sang tụi thư viện nó support cho mình ở phần nào, để mình chỉ cần quan tâm phần còn lại thôi

À ngoài ra anh cũng share một cách viết state cho các bạn ở đây nè:

[State management gọn gàng](https://thanhle.blog/blog/state-management-gon-gang)

🐣: Cảm ơn anh vì đã bỏ thời gian xàm xàm ở đây. Hy vọng anh sau này pro hơn nữa!

*Thôi mỏi tay + hết trí tưởng tượng rồi, mọi người ai thấy cần hỏi gì thì comment ở dưới nhé!*

Bài gốc: https://thanhle.blog/en/blog/state-trong-frontend-la-gi-tai-sao-nen-gioi-cai-nay