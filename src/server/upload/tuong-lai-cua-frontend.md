## Tại sao nên đọc bài này?

- Cùng xem trí tưởng tượng của thằng viết bài này bay xa tới đâu
- Một số vấn đề hiện nay của frontend

## Tương lai của frontend

Mình được gọi là làm việc nghiêm túc ở ngành lập trình khoảng 4 năm, còn thực tế kinh nghiệm làm web thì chắc khoảng 12-13 năm gì đó. Bằng quãng thời gian cũng khá dài, đam mê đọc những cái mới cũng thấy được frontend hồi đó khác với frontend bây giờ thế nào. Dĩ nhiên những công nghệ ra sau sẽ giải quyết những bài toán trước đó và nó cứ lặp lại như vậy vì… đời nào thì cũng có nỗi khổ riêng mà.

Mình cũng thấy những vấn đề về frontend hiện tại và hy vọng, trong viễn cảnh mà mình tưởng tượng, các vấn đề đó đều sẽ bị loại bỏ.

Cùng mình bay cao cũng với trí tưởng tượng nhé, và tương lai mình hướng tới ra sẽ là **5 năm tới.**

## Almost everything is web

Đúng rồi, hầu hết cả mọi thứ đều sẽ là web. Ý mình là mấy cái app trên điện thoại các bác đó, hầu hết các app cơ bản kiểu todo list, reminder, calendar, clock… bla bla bắt đầu phổ biến đều viết bằng web.

Vì sao ư? vì thiết bị phần cứng sẽ càng ngày càng mạnh hơn dẫn tới khoảng cách về performance giữa web và native app càng ngày càng thu hẹp lại mà trong khi làm web thì nhanh, gọn lẹ, nhân lực dồi dào hơn nữa.

![Untitled.png](https://images.viblo.asia/94115e83-403f-496a-9d26-bb8dd6473dc5.png)

Dĩ nhiên sẽ có bạn tin rằng Flutter sẽ vươn lên thành một thế lực, mình cũng tin như vậy, nó sẽ trở thành đối trọng với web nhưng mình tìn web vẫn sẽ chiếm ưu thế hơn.

[WebAssembly](https://webassembly.org/)

[Ionic vs. React Native: Performance Comparison](https://ionicframework.com/blog/ionic-vs-react-native-performance-comparison/)

[Ionic Article: Ionic vs Flutter: Best Platform for Hybrid App Development](https://ionic.io/resources/articles/ionic-vs-flutter-comparison-guide)

## Cắt CSS/HTMl sẽ bị AI cướp mất

Nói về mấy cái tool biến từ PTS/AI/Figma/Sketch thành html thì có lẽ mình đã nghe từ gần 10 năm trước rồi. Tuy nhiên tất cả đều có một hạn chế là đống HTML/CSS gen ra thì không dùng được vì vị trí các component, cách co giãn đều bị cố định nên là output của tụi nó hầu hết đều là “Look good, but doesn’t work 🙃”

Tuy nhiên với sức mạnh của AI và các tool design tiên tiến như Figma hay Sketch thì việc design một component có khả năng co giãn, gen ra code một cách gọn gàng không còn là việc quá khó khăn nữa.

Do đo, tương lai frontend tụi mình chủ yếu sẽ làm về state/logic là nhiều thôi, còn mấy việc cắt ghép css thì có tool nó làm hết rồi nhé. [Lo mà học state đi!](https://thanhle.blog/blog/state-trong-frontend-la-gi-tai-sao-nen-gioi-cai-nay)

[Anima: Design to code | High-fidelity prototypes](https://www.animaapp.com/)

[Overlay | Design production ready code components](https://overlay-tech.com/?ref=article-figmaconcept)

[CopyCat | Figma Plugin For React.js Devs](https://www.copycat.dev/)

## Phần cứng càng ngày càng … to và mạnh hơn

![Untitled 1.png](https://images.viblo.asia/0d9cbc81-3a74-40cd-9804-a676b19b991b.png)

Phần cứng chưa tới giới hạn, do đó nó sẽ còn phát triển vượt tốc trong vòng 5 năm tới. Đối với một frontend dev, bạn sẽ phải đối mặt với cơ hội, cũng như thách thức:

- Mạnh mạnh hơn, CPU mạnh hơn, RAM nhiều hơn (Nghĩa là có quyền load nhiều resource hơn)
- Màn hình lớn hơn, DPI cao hơn (Nghĩa là phải code cho nhiều layout hơn, standard cũng cao hơn)
- CPU mạnh hơn, RAM nhiều hơn (Nghĩa là frontend sẽ phải làm nhiều việc hơn, như là Xử lý hình ảnh, lưu data offline, train AI …)

## TypeScript sẽ là ngôn ngữ phổ biến nhất

![Untitled 2.png](https://images.viblo.asia/848781e1-6ef8-428d-a02a-60f8253585fb.png)

Javascript thì đỉnh đó nhưng… TypeScript thì toẹt cmn vời ông mặt trời 🌞. Nhìn vào tốc độ phát triền của TypeScript cùng những lợi ích nó mang lại xem. Mình tin rằng tương lai TypeScript sẽ chiếm nhiều thị phần nhất. Và vì TypeScript sẽ trở thành ông hoàng, bạn có thể:

- Cài đặt, sử dụng module/library dễ dàng hơn
- Code ít bug hơn, tự tin hơn

## Sẽ có một framework frontend trở thành top

Nextjs đang là top framework, nhưng chưa vững vàng. Mình tin là 5 năm nữa sẽ có một framework đủ chín để nắm gần như là tất cả thị phần. Với framework này, mình tin nó sẽ giải quyết những vấn đề đang tồn đọng:

- Lazy hydration, Lazy load component
- Gần với những thứ cơ bản của web hơn, nghĩa là chỉ có 3 phần HTML, CSS, JS và những thứ đó rất clean
- Lazy build (Nghĩa là khi update một phần rất nhỏ của app, thì cũng sẽ thay đổi tất nhỏ ở bạn build hiện tại và gửi trực tiếp xuống cho browser)
- Template syntax sẽ là HTML hoặc thứ gì khá giống như vậy, thay vì đống JSX mất công phải học thêm một xíu
- Giao tiếp giữa browser và server trên một giao thức mới nhanh hơn, tin cậy hơn và real-time
- Auto optimize for `Above the fold` screen
- Có một build tool dễ config hơn, chạy nhanh hơn, tùy chỉnh mạnh hơn (Đồng nghĩa với cái chết của webpack)

[Remix - Build Better Websites](https://remix.run/)

[Astro](https://astro.build/)

[Qwik](https://qwik.builder.io/docs/overview)

[Rust Is The Future of JavaScript Infrastructure - Lee Robinson](https://leerob.io/blog/rust)

## Frontend có thể run một node của blockchain

![Untitled 3.png](https://images.viblo.asia/e0599113-d1d7-4267-8f47-a63b101d807e.png)

Với state hiện tại của blockchain, no way bạn có thể kết nối trực tiếp với một node của Blockchain mà không phải thông qua một bên thứ 3. Hiện tại để run được một node của blockchain thì cấn rất rất nhiều tài nguyên, và chi phí để duy trì node đó. Vì vậy rất khó để mỗi máy tính có thể join vào blockchain dưới dạng một node riêng biệt.

Đây cũng là vấn đề của blockchain hiện tại

> Làm sao bạn gọi một ứng dụng là Decentralized khi nó cần phải truy cập vào node của một bên thứ ba???
> 

Mình tin là tương lại blockchain sẽ nhẹ hơn để có thể run được ở browser. Solve được bài toàn Decentralized hoàn toàn khi ai cũng có thể tham gia vào vận hành blockchain

[Home](https://minaprotocol.com/)

[Celo: Mobile-First DeFi Platform for Fast, Secure, and Stable Digital Payments](https://celo.org/)

## Tổng kết

Dĩ nhiên đây chỉ là dự đoán của mình, có một số vấn đề mình thấy đang là big problem của tech hiện tại và hy vọng nó sẽ được solve trong tương lai.

Người ta hay nói làm trong “ngành” này nếu không học liên tục thì chắc chắn sẽ bị bỏ lại, vì vậy mình luôn nói với mọi người “ngành” này cần rất nhiều sự “tò mò”.

![Untitled 4.png](https://images.viblo.asia/79d77f5a-b1c9-4f3d-95f0-d5de8b6b1c49.png)

Bài gốc: https://thanhle.blog/blog/tuong-lai-cua-frontend