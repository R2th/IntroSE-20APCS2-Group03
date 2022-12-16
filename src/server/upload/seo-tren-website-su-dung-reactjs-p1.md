Đối với những website thông tin hoặc thương mại, Search engine optimization (SEO) là một phần không thể thiếu để đưa website đến với người dùng internet. Hiểu đơn giản là chúng ta có một món đồ muốn bán, nhưng làm thế nào để cho nhiều người biết là chúng ta đang bán hàng, thì SEO chính là tổng hợp nhiều kỹ thuật để làm được việc đó.

Ở Việt Nam nói riêng, Google Search vẫn đang là công cụ tìm kiếm chiếm ưu thế rất lớn, khi website của bạn được hiển thị ở trang 1 trên kết quả tìm kiếm của Google Search (Top 10) với những từ khóa tìm kiếm tương ứng, thì cũng đồng nghĩa với việc lượng truy cập của website sẽ tăng lên => Dịch vụ sẽ được nhiều người biết đến => Kiếm được nhiều $.

ReactJS là thư viện sử dụng để tạo ra website bằng Javascript, tuy ra đời chưa lâu nhưng ReactJS được đánh giá rất cao về hiệu quả của nó đem lại khi lập trình ứng dụng. Tuy nhiên có 1 điểm khá bất cập là vấn đề SEO trên các ứng dụng làm bằng ReactJS chưa được giải quyết triệt để hoặc khá phức tạp. 

Như các website thông thường, HTML sẽ được render trên server, và trả về cho Browser nội dung hầu như là HTML/CSS, Googlebot sẽ crawl nội dung HTML của link và Index nội dung này phục vụ cho việc tìm kiếm.

Tuy nhiên với ứng dụng làm bằng ReactJS, nội dung được render ra từ server khá ngắn gọn như sau, hoàn toàn không có các nội dung phục vụ cho việc tìm kiếm:

```html
<!doctype html>
<html lang="jp">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="Pragma" content="no-cache"/>
    <meta http-equiv="Cache-Control" content="no-store"/>
    <meta http-equiv="Cache-Control" content="no-cache"/>
    <meta http-equiv="Expires" content="-1"/>
    <meta name="viewport" content="width=1024">
    <title>サンプル</title>
</head>
<body>
    <noscript>Javascript機能が無効状態になっております。</noscript>
    <div id="app"></div>
    <script type="text/javascript" src="/js/main.deae0a3214307a60a8ea.js"></script>
</body>
</html>
```

Ở trong bài viết này, tôi tập trung vào việc xử lý SEO cho ứng dụng được viết bằng ReactJS để đáp ứng được Googlebot, bài viết có 2 phần:
1. Test vấn đề SEO với ứng dụng viết bằng ReactJS (Nội dung bạn đang đọc)
2. Giải quyết vấn đề SEO với ứng dụng viết bằng ReactJS (Phần tiếp theo)

Thông thường, cách xử lý vấn đề SEO cho ứng dụng viết bằng Javascript đó là render nội dung HTML trên server trước khi trả về cho Browser. Có nghĩa là thay vì trả về nội dung reference đến file .js như ở ví dụ trên, và file .js sẽ render ra HTML ở trình duyệt, 
thì trên server sẽ render ra HTML và trả về luôn mã HTML cho Googlebot có thể đọc được và index nội dung.
Một cách khác "ngon" hơn là đối với những Request phát sinh từ các Crawler-Bot, thì sẽ trả về HTML render từ server, còn những Request phát sinh từ End-User thì vẫn render ra như cũ để đảm bảo tốc độ xử lý/hiển thị.
Hoặc đơn giản hơn là sử dụng thư viện như là [Next.js](https://nextjs.org/) để xây dựng ứng dụng.

Trước tiên tôi sẽ test xem liệu Googlebot có thông minh để tự động render được ra HTML từ React Component hay không, nếu không thể, thì làm cách nào để giải quyết.
Cứ phải test phát đã thì mới làm tiếp được…

Thông thường thì Google sẽ crawl website từ 1 link (lấy từ các nguồn khác nhau), sau đó sẽ phân tích nội dung và index, thật may là cái tool crawl này được visible cho user dưới dạng online để test, nó tên là Google’s Fetch as Google tool . Đây là chức năng chính sử dụng cho việc Crawl của Googlebot, chức năng này sẽ hiển thị nội dung sau khi Crawl của 1 link input vào.

Có thể sử dụng Tool này để biết:
- Googlebot có thể truy cập vào link input vào không
- Googlebot sẽ hiển thị website như thế nào sau khi crawl
- Xem có bất kỳ resource nào (Ảnh, Video, JS, ..) mà Googlebot không truy cập được không.

Để bắt đầu, thì cần tạo 1 ứng dụng ReactJS, sau đó public lên 1 server nào đó, có thể là heroku hoặc bất cứ server cloud free nào bạn biết, miễn là có link public để access vào ứng dụng:

```js
class App extends Component {
  render() {
    return (
     <div>
        <h1>Googlebot will always crawl</h1>
      </div>
    );
  }
}
```
Để Fetch bằng Google tool, truy cập vào Google Search Console, màn hình sẽ dạng như sau:

![](https://images.viblo.asia/a41a8d9b-5cef-4611-b8d3-c8efc9588a4c.png)

Lựa chọn loại Website và input domain ứng dụng của bạn vào ô textbox, ở đây tôi lấy là https://react-seo-app.herokuapp.com/ , sau đó click vào button "Add a Property"

Sau đó thì Google sẽ yêu cầu bạn xác nhận website muốn thực hiện test, thực hiện xác nhận như hướng dẫn trên màn hình.

![](https://images.viblo.asia/4df01b97-4c3c-454b-9753-55858cfc02b4.png)

Sau khi xác nhận xong, bạn sẽ nhìn thấy Sidebar như hình dưới đây:

![](https://images.viblo.asia/53772ba1-c1f7-4b61-9bcd-b9b605f6989d.png)

Click vào menu Crawl trên Sidebar, màn hình dưới đây sẽ hiển thị:

![](https://images.viblo.asia/a2438d20-79f6-4080-8e5e-9017228ecec0.png)

Sử dụng Fetch as Google, bạn có thể kiểm tra link trong website của bạn bằng cách input URI vào ô textbox, sau đó click 1 trong 2 button FETCH hoặc FETCH AND RENDER.

Fetch: Sẽ thực hiện crawl link được input vào, sau đó hiển thị HTTP Response, không thực hiện hiển thị nội dung.

Fetch and Render: Giống như Fetch, nhưng sẽ hiển thị nội dung mà Googlebot crawl được.

Vì để thực hiện test xem ứng dụng sẽ được crawl ra dữ liệu gì, nên ở đây tôi chọn FETCH AND RENDER, màn hình kết quả như sau:

![](https://images.viblo.asia/63c443ab-1e5a-4d1e-aeaa-21399c670962.png)

Ở ví dụ trên, Googlebot có thể xem được chính xác những gì mà người dùng khi vào trực tiếp đường link trên Browser. 
Tuy nhiên với một số website, Googlebot chỉ output ra 1 trang blank không có nội dung gì cả, đó là có thể là trường hợp với những website render quá chậm hoặc sử dụng Ajax để render ra dữ liệu sau khi gọi API Server.

Thông thường thì các website làm bằng ReactJS thường là sẽ gọi API để lấy data, sau đó render ra các component, nên tôi sẽ tập trung test trường hợp này, bằng cách setTimeout cho việc render chậm hơn 20s, coi như là thời gian xử lý: Gọi API, xử lý nghiệp vụ, ...
```js
    class App extends React.Component {
      constructor() {
        super();
        this.state = { message: "" };
      }
      componentDidMount() {
        setTimeout(() => {
          this.setState({
            message: "Googlebot will always crawl"
          })
        }, 20000);
      }
      render() {
        return (
          <div>
            <h1>{ this.state.message }</h1>
          </div>
        )
      }
    }
    export default App;
```

Sau khi áp dụng setTimeout, thì Googlebot sẽ render ra như sau:

![](https://images.viblo.asia/e9145c63-8720-4ed2-9ebb-e809df5a9932.png)

Chuẩn, ra một trang blank không có nội dung gì.

Chốt lại bây giờ làm thế nào để hiển thị nội dung trong trường hợp này đây?

Có một vài cách cơ bản nghĩ được ra như sau
- Render ra những nội dung nào cần Google hiển thị càng nhanh càng tốt (ưu tiên cao), còn những nội dung nào không cần thì để sau.
- Nếu cách trên không được, thì thực hiện render ra HTML ở server trước khi trả về, có vẻ sẽ hiệu quả.
- Tạo/sử dụng asynchronous calls trong ứng dụng
- Sau đó, test lại mỗi trang sử dụng Fetch as Google xem Googlebot sẽ xử lý như thế nào.

Cách best nhất là nếu website nặng, thì nên render ra HTML ở server. Cách này thì chắc chắn 100% là Googlebot sẽ crawl được và sẽ hiển thị trên trang tìm kiếm của Google.
Trong phần tiếp theo, tôi sẽ sử dụng thêm một số cách/thư viện để thực hiện render ra HTML trên server, và tối ưu bằng cách chỉ render trên server với những request bắt nguồn từ Googlebot.

Tham khảo: https://blog.pusher.com/seo-react-fetch-as-google/