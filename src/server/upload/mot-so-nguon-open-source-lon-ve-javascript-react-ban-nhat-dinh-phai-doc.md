Hello,

Trong bài viết này mình sẽ giới thiệu một số nguồn opensource mà có lẽ bạn sẽ cần đọc nó. Mỗi một project trong danh sách này đều có những thứ bạn có thể học được. Mình sẽ chỉ giới thiệu một số ít thôi, phương châm của mình là đọc kỹ chứ không đọc qua loa, tràn lan. Mình cũng sẽ chỉ giới thiệu những nuồn nào mà mình đã trực tiếp nghiên cứu kỹ về nó, hoặc chí ít cũng đã sử dụng nó rồi và thấy hay.

## [Wp-calypso (Automattic - team Wordpress)](https://github.com/Automattic/wp-calypso)

![](https://images.viblo.asia/ff8b0770-457a-4f9d-8872-f5e63efc28ff.png)

Đây là repo đầu tiên mình tiếp cận khi học React. Đây là phiên bản mới của **phần quản trị**  của Wordpress. Khi team Automattic nhận thấy một số vấn đề với PHP trong nền tảng quản trị của Wordpress, họ đã lựa chọn React cho phiên bản tiếp theo. (Bạn có thể xem giới thiệu về nó [tại đây](https://developer.wordpress.com/calypso/)) Phải nói rằng có rất nhiều thứ mình học được trong repo này mà vẫn ảnh hưởng đến mình tận bây giờ. Với repo này, chúng ta sẽ phải config thủ công tất cả mọi thứ, từ route, server, server-side-rendering, ....

Về Automattic thì có lẽ cũng không cần giới thiệu nhiều, team này thì level cao lắm. Một số sản phẩm nổi bật ngoài wordpress của họ có thể bạn đã nghe là: jetpack, mongoose, gutenberg, ... Riêng gutenberg thì mình sẽ giới thiệu sau đây.

Bạn nên cố gắng thử setup một vài project theo flow của Wp-calypso, sẽ có rất nhiều điều hay cho bạn khám phá.

## [Mattermost](https://github.com/mattermost/mattermost-server)

Mattermost là một nền tảng alternative của Slack, opensource đang khá nổi ở thời điểm bây giờ.
![](https://images.viblo.asia/90c04101-6e5c-4111-88de-808722587e4c.jpg)

Mình không đánh giá cao Mattermost ở phía client, nhưng phía Server của họ viết phải nói là rất tốt, bạn nào học Go lang thì đây là một dự án **không thể bỏ qua** được. Nhưng nói như thế không có nghĩa là phía client của họ là bỏ đi. Vẫn có rất nhiều thứ mà ta có thể học được ở họ, chẳng hạn như việc tách component, state ra từng repo riêng rẽ để tái sử dụng trong Webapp, mobile app, desktop app, ... Đặc biệt là bạn sẽ học được cách mà một ứng dụng hoàn chỉnh được build như thế nào, bao gồm: server, webapp, mobile app, desktop app, ...

## [VS Code - Microsoft](https://github.com/microsoft/vscode)
![](https://images.viblo.asia/b2020d77-7370-4a7b-8bed-5cad7e6c22ec.png)

Cái này thì chắc cũng không cần giới thiệu nhiều đâu nhỉ. Đây sẽ là nơi bạn học về Typescript, Javascript và phong cách viết code sạch sẽ gọn gàng, chuẩn chỉ từ một team lớn.

## [React-spectrum (Adobe)](https://github.com/adobe/react-spectrum)

Một thế lực mới nổi kể từ khi React đưa vào khái niệm về Hooks, có thể nói rằng đây là nơi bạn sẽ học được cách sử dụng hooks tốt nhất, vì đâu đâu cũng là hooks cả.

Đây là một thư viện UI của **Adobe**, nhưng mình thấy gần như toàn bộ đều được viết bởi **Devon Govett**, đây là người đã tạo ra trình bundler có tên là **Parcel** (trình đóng gói phần mềm tương tự như webpack, rollup). Trong repo này bạn sẽ học cách tách component ra đến từng đơn vị nhỏ nhất: types, hooks, ui.

Có thể nói rằng đây là Repo mà bạn không thể bỏ qua được nếu như muốn học về React hooks nâng cao.

## [Gutenberg (Automattic - team Wordpress)](https://github.com/WordPress/gutenberg)

Sẽ thật là thiếu sót nếu như **Gutenberg** không được nằm trong danh sách yêu thích của mình. Đây là dự án làm mình mất ăn mất ngủ khá nhiều khi nghiên cứu về nó, về độ phức tạp và sự nhất quán của nó.

![](https://images.viblo.asia/d3184da7-951a-4b8f-b5da-b42fd034c92c.png)

Gutenberg là trình soạn thảo để tạo ra một trang Wordpress phiên bản mới, để thay thế cho phiên bản cũ bằng PHP. Phiên bản mới được Automattic viết lại hoàn toàn bằng React. Như vậy đủ thấy về độ phức tạp của nó phải không nào?

Repo này sẽ không làm bạn thất vọng về độ phức tạp, đủ để giữ chân bạn, không bao giờ làm bạn chán. Lúc nào bạn có thể config được một dự án tương tự theo flow của nó thì coi như bạn đã hiểu về Gutenberg. Với mình, có lẽ mất gần 1 tháng cho **Gutenberg** để build 1 project tương tự. (hồi đó mình làm một công cụ chỉnh sửa website)

## [Linode manager](https://github.com/linode/manager)
Chỉ vỏn vẹn 550 star thôi nhưng chúng ta nên biết rằng đây là phần quản trị của Linode, một nền tảng quản lý server, cloud server rất lớn, đang chạy thật và thu tiền về cho Linode hàng ngày.
![](https://images.viblo.asia/07f7645c-320c-492b-97d3-a3ae9d334a49.png)

Cũng không có gì ghê gớm ở Repo này, nhưng phải thừa nhận có những thứ giờ mình viết hàng ngày vẫn là chịu ảnh hưởng của nó.

## [Babel](https://github.com/babel/babel)

Khỏi phải giới thiệu nhiều, đây là nơi mà chúng ta sẽ được học quá nhiều thứ về cách viết Javascript. Repo này thuộc dạng "Kinh điển" phải đọc của mọi thời đại.

## [D3](https://github.com/d3/d3)
![](https://images.viblo.asia/6ec13151-0489-4a29-934c-dd69f8e39a0a.jpg)

Nói chung về mảng chart, bạn không cần phải nghiên cứu quá nhiều thứ như: Highchart, armchart, ... Thay vào đó bạn chỉ cần nghiên cứu kỹ D3. Sau đó chuyển sang C3 và giai đoạn cuối cùng là tự build một thư viện Chart của riêng mình. Như vậy là đủ rồi!

## Facebook

Cuối cùng là các opensource của Facebook, bạn có thể đọc như React, React-native, Draftjs, ...

Khi nghiên cứu hệ open source của Facebook, chúng ta lưu ý có 3 phần chính:

1. Các mã nguồn đang được mainternant thường xuyên: https://github.com/facebook
2. Các mã nguồn dạng vườn ươm, đang ở dạng ý tưởng thử nghiệm: https://github.com/facebookincubator
3. Các mã nguồn đã không còn support, được đưa vào archive: https://github.com/facebookarchive

Ngoài ra, bên lề một chút xíu, và mặc dù không phải là opensource, nhưng [**Repo này**](https://github.com/ladifire-opensource/facebook-codebase) gồm một số mã được tải từ Facebook, nhằm mục đích nghiên cứu và học tập. Một số trong này đã được mình phân loại, nhưng sẽ không được lưu đầy đủ, vì việc lưu chúng cũng không cần thiết, thiếu module nào ta có thể dễ dàng tải được từ Facebook. Một số trong này cũng rất lộn xộn, vì đụng đâu mà mình thấy cần lưu thì mình sẽ lưu, chứ không hề phân loại ra. Mục đích chỉ là để cá nhân mình đọc và viết lại thôi, còn trong quá trình viết lại thì gần như là mình sẽ truy cập Facebook để xem đúng mã nguồn mới nhất. Lời khuyên cho các bạn muốn nghiên cứu đống mã nguồn này: "Hãy đọc chúng hàng ngày, mỗi khi rảnh hãy lôi ra đọc. Trước khi đi ngủ, mở chúng ta và đọc. Đọc mãi thì sẽ thành quen và hiểu dần." Gần như toàn bộ mã trong này mình đều đã viết lại hết, không toàn bộ nhưng khoảng 80%, mình vẫn đang sử dụng chúng cho các dự án của mình. Mình cũng hi vọng sắp tới sẽ opensource được càng nhiều càng tốt.