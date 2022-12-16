Đầu tháng 5 vừa rồi, Facebook vừa release một phiên bản mới và cực kì khủng, được gọi là "The New Facebook", facebook mới này sử dụng front-end hoàn toàn được viết lại bằng React và Relay.

Mục tiêu của facebook mới này là nhanh hơn, trải nghiệm tương tác tốt hơn so với phiên bản cũ. Và như Facebook có nói trong một bài báo của họ, họ chủ yếu làm việc theo 2 chỉ đạo kĩ thuật sau:

> ***Càng ít càng tốt và càng sớm càng tốt**: Chúng tôi chỉ xử lý các resource chúng tôi cần, và chúng tôi cố gắng để có chúng ngay sau khi chúng tôi cần.*
> 
> ***Kinh nghiệm kỹ thuật phục vụ trải nghiệm của người dùng**: Mục tiêu cuối cùng của chúng tôi đều hướng về người dùng sử dụng website của chúng tôi. Vì thế chúng tôi nghĩ về những vấn đề trong UX, và chúng tôi có thể áp dụng kinh nghiệm để hướng dẫn các kỹ sư thực hiện điều đúng đắn nhất.*

# Cấu trúc lại CSS
Rất nhiều nỗ lực đã được thực hiện để biến CSS trở nên nhẹ và có thể maintain dễ dàng hơn.

Phiên bản trước của Facebook load hơn 400KB dung lượng file CSS **đã được nén** chỉ khi nó loading trang homepage, và chỉ 10% trong số đó được sử dụng để khởi tạo trong quá trình render.

Vậy sao Facebook lại xảy ra tình trạng này? Nhìn chung thì đây cũng là tình trạng chung của mọi project: Với mỗi feature mới bạn thêm vào, có nghĩa là bạn cần thêm CSS. Và những CSS cũ hiếm khi bị xóa đi vì bạn not-sure-nó-có-ảnh-hưởng-ở-đâu-không. Và cuối cùng thì bạn có một đống CSS mà chả ai muốn đụng vào để dọn dẹp nữa.

Giải pháp của họ là chạy Atomic CSS khi build.

> Atomic CSS là cách khai báo các class sao cho mỗi class chỉ mô tả một tính năng duy nhất. Để xây dựng component lớn hơn, chúng ta sẽ kết hợp các class nguyên tử này lại với nhau.

Kết quả thực sự rất thú vị vì nó đã giảm đến 80% CSS trên trang homepage, trong khi facebook mới còn hỗ trợ thêm dark mode và font size động.

# Sử dụng SVG trong JavaScript

Trong phiên bản trước của Facebook, SVG được sử dụng trong thẻ `<img>`, điều này có thể gây ra lỗi nhấp nháy icon khi icon được render sau các content khác.

Trong phiên bản mới, SVG được sử dụng trong thẻ `<svg>`, điều này có nghĩa là chúng được đóng gói và được phân phối cùng với các component xung quanh nó. Kĩ thuật này có thể làm tăng thời gian load của một số component, nhưng nó đảm bảo không gặp lỗi nhấp nháy icon trước đó và từ đó làm gia tăng trải nghiệm của người dùng.

# Phân chia code JavaScript
Kích thước của code có thể liên kết trực tiếp tới hiệu suất load của trang web. Và ở đây chúng ta nói về Facebook, nói thẳng ra thì nó không phải một project nhỏ và như thế tức là kích thước của code rất quan trọng. Đó là lý do họ phát triển một vài API mới để tuân theo câu "thần chú" của họ:

> *Càng ít càng tốt và càng sớm càng tốt*

Tuân theo câu "thần chú" này, Facebook đã thiết kế các tầng load code JavaScript được phân chia, các JavaScript cần thiết cho khởi tạo render được phân chia thành 3 tầng:

### Tầng 1

Mục đích ở đây là đưa phản hồi lập tức bằng cách render phần UI nền tổng quát của trang đang load. Phần source code để render nền là rất nhỏ.

![](https://images.viblo.asia/8c857f0e-7f26-4427-9999-723eb11e6f71.png)

Tầng 1 thường sử dụng cú pháp import kiểu:
```javascript:js
import ModuleA from 'ModuleA';
```

### Tầng 2

Tầng 2 bao gồm mọi thứ thể hiện đầy đủ content. Sau khi render, nó sẽ không thay đổi khi không có tương tác của người dùng.

![](https://images.viblo.asia/249d1e08-cdd6-418a-ae9c-2e6eb014508e.png)

Nếu người dùng tương tác với trang, ví dụ mở menu ở bên trên bên phải, một khung sẽ xuất hiện để lập tức đưa ra phản hồi giống như lần trước.

![](https://images.viblo.asia/d161cb45-df5c-4846-a995-861cf8200e8f.png)

Tầng 2 sử dụng **importForDisplay**. Nó trả về một wrapper dựa trên promise để truy cập vào module trong khi nó được load. Ngay khi một **importForDisplay** xuất hiện trong code, module sẽ được tự động chuyển sang tầng 2.

```sql:js
importForDisplay ModuleBDeferred from 'ModuleB';
```

### Tầng 3

Tầng 3 bao gồm tất cả mọi thứ mà được render phía sau và không ảnh hưởng đến màn hình chính. Trong trường hợp này, nó render phần content của menu bên trên bên phải.

Tầng 3 sử dụng **importForAfterDisplay**. Nó cũng trả về một wrapper dựa trên promise để truy cập vào module trong khi nó được load. Ngay khi một **importForAfterDisplay** xuất hiện trong code, module sẽ được tự động chuyển sang tầng 3.

Nhờ có hệ thống các Tầng này, kích thước JavaScript của một trang được chia thành 3 tầng, màn hình loading được render nhanh hơn mà không làm giảm trải nghiệm của người dùng.

# A/B Testing với UI

Cách phổ biến để so sánh 2 phiên bản khác nhau của UI là thực hiện A/B Testing (dùng thử và xem phiên bản UI nào tốt hơn dựa trên nhận xét của người dùng - Cách Facebook hiện đang thực hiện). Cách thông thường là chúng ta download cả 2 phiên bản cho tất cả mọi người, và một số người sẽ dùng phiên bản A, và một số sẽ dùng phiên bản B.

Nhưng điều này cũng có nghĩa là chúng ta sẽ download cũng phần code mà không được sử dụng, điều này chống lại "thần chú" của Facebook. Đó là lý do tại sao họ build một declare cho API mà khi trang được load, server sẽ có thể kiểm tra xem phiên bản nào cần được gửi đến client.

```javascript:js
const Composer = importCond('NewComposerExperiment', {
  true: 'NewComposer',
  false: 'OldComposer',
});
```

# Chỉ cung cấp component khi cần

Thường trong các project đều có các component phức tạp mà quá trình render được thay đổi khác nhau tùy thuộc vào dữ liệu. Hiện nay, một bài post trên Facebook có thể có ảnh, video, địa điểm checkin, gif, bla bla...

Sẽ rất nặng nếu load tất cả component để xử lý tất cả các thể loại khác nhau có thể có của một bài post, thậm chí khi bài post đấy chỉ chứa mỗi text thôi.

Đó là lý dó tại sao các dependency được quyết định tại runtime, phụ thuộc vào dữ liệu được trả về từ máy chủ:

```swift:js
... on Post {
  ... on PhotoPost {
    @module('PhotoComponent.js')
    photo_data
  }
  ... on VideoPost {
    @module('VideoComponent.js')
    video_data
  }
}
```

Nếu bài post có ảnh, nó sẽ include component xử lý ảnh. Điểm mạnh của chức năng này là nó có thể dùng ở bất kì node nào cần thiết. Nếu PhotoComponent vẫn còn nặng, nó sẽ được load theo từng fragment, phụ thuộc vào dữ liệu của nó.

# Theo dõi kích thước JavaScript

Hệ thống các tầng và các điều kiện render đã làm cho project "nhẹ" hơn nhiều, nhưng rồi Facebook lại tự hỏi là làm thế nào để giữ cho kích thước code được kiểm soát sau một thời gian? Đây là lúc Facebook giới thiệu JavaScript budget.

Dựa trên các công cụ kỹ thuật, mỗi trang của Facebook có một giới hạn kích thước mà không thể vượt qua. Họ tạo ra một vài công cụ để theo dõi kích thước của bộ code, và kích hoạt cảnh báo nếu nó vượt quá một ngưỡng nhất định.

# Tải trước data trong khi download JavaScript

Nhiều ứng dụng web hiện nay download và thực thi code JavaScript để render trang khởi tạo, sau đó mới fetch data từ server về. Bằng cách sử dụng Relay, Facebook biết rằng data trang đó cần và trực tiếp fetch chúng ngay từ khi server nhận được request. Vì thế nó có thể render ra trang với content hoàn chỉnh nhanh hơn.

# Trì hoãn dữ liệu

Một vài câu query sẽ tốn nhiều thời gian để chạy hơn những câu khác. Vì thế, khi bạn xem một Facebook profile, các thông tin cơ bản (tên, ảnh đại diện, ...) sẽ được fetch nhanh hơn, tuy nhiên sẽ mất nhiều thời gian hơn để fetch các bài viết trên timeline.

Ngày nay chúng ta đã có thể fetch cả 2 loại data này trong một câu query duy nhất với [defer ](https://www.apollographql.com/docs/react/v2.4/features/defer-support/) của GraphQL khi data được đưa vào 1 luồng stream và sẽ được trả về ngay khi sẵn sàng, sẽ không có thời gian đợi của phần câu query chậm hơn. Nó cho phép Facebook render nhanh hơn một phần của trang profile với tên, ảnh đại diện, bla bla, và render một loading page cho những content khác mà cần thêm thời gian để render.

# Điều hướng nhanh

Một điểm rất quan trọng để có UX tốt của một web app là nó có điều hướng nhanh. Người dùng sẽ rất khó chịu khi phải đợi vài giây sau khi click thì màn hình mới thay đổi. Facebook tạo ra một bản đồ điều hướng và liên kết các hướng với các trang đích để render nhanh nhất có thể. Để có thể render nhanh nhất có thể, Facebook có một cơ chế khiến cho client fetch nội dung thậm chí cả trước khi click vào link.

![](https://images.viblo.asia/c18cc453-a3a4-4402-9bea-5ffcbeb3ade6.jpeg)

Sẽ có một cơ chế preloading khi người dùng hover link. Sau đó nó sẽ bắt đầu fetch code và dữ liệu ngay khi người dùng đang click (mouse down). Cuối cùng, sẽ có sự thay đổi ngay sau khi người dùng click xong.

Để cải thiện triệt để trải nghiệm người dùng và tránh màn hình trắng, [React Suspense transition](https://reactjs.org/docs/react-api.html#reactsuspense) được sử dụng để luôn có một trang đang render, hoặc là trang trước đó, hoặc là một bộ khung của trang mới.

# Code song song

Có hàng tấn code lazy loading được viết ở trong phiên bản mới này, tuy nhiên nếu Facebook đã quyết định áp dụng lazy load cho một route, với code fetch dữ liệu cho route đó giống như chúng ta bàn bên trên, nó sẽ dẫn đến một thứ thế này:

![](https://images.viblo.asia/670d0ebc-829a-4f8c-abe7-47f800e0140b.jpeg)

Chúng ta cần 2 lần render để render toàn bộ trang, để giải quyết vấn đề này, Facebook đã tạo ra các file có chức năng chia code thành hai phần, và quá trình fetch code và fetch data giờ được chạy song song với nhau. Từ đó quá trình render chạy nhanh hơn.

![](https://images.viblo.asia/88dbd056-30bd-4caa-b170-bc0047bc4128.jpeg)

# End

Facebook thật sự đã làm rất tốt trong việc gia tăng trải nghiệm của người dùng triệt để nhất có thể. Mọi thứ đã được giải thích bên trên không chỉ riêng cho Facebook, chúng ta có thể áp dụng chúng vào bất kì ứng dụng client-side nào. Qua bài viết hy vọng các bạn có thể tìm hiểu thêm chút về những gì một công ty to như Facebook thực hiện project của mình :D