Là một lập trình viên chắc hẳn các bạn đã từng nghe qua khái niệm RSS hay RSS feed, vậy RSS là gì, nó có tác dụng như thế nào cho website của bạn, và làm thế nào để đọc và hiển thị RSS feed trên trang web React của bạn? Bài viết ngày hôm nay của mình sẽ giải đáp hết các thắc mắc trên, các bạn cùng đón xem nhé.

# RSS Feed là gì

RSS là từ viết tắt của “Really Simple Syndication“, theo nghĩa tiếng việt thì nó là định dạng tài liệu. RSS là một dạng tiêu chuẩn định dạng tài liệu dựa vào XML. Nó có tác dụng giúp cho người dùng có thể dễ dàng update và tìm kiếm thông tin bằng cách tóm tắt thông tin trong một đoạn dữ liệu ngắn. RSS là định dạng tài liệu phổ biến vì sự thuận tiện của nó và đặc biệt nó hướng người dùng rất tốt.

Về bản chất, việc bạn parser data ra từ link feed để hiển thị trên website cũng hoàn toàn tưong tự như khi bạn gọi lên serve để lấy data vây. Tuy nhiên việc lấy data từ RSS để hiển thị rất đơn giản, nhanh chóng và không phụ thuộc vào server nên bạn không cần lo lắng về vấn đề serve 500 hay các config về api lằng nhằng, chỉ cần có link feed và internet, phần hiển thị rss sẽ luôn chạy. Do đó có thể thấy RSS sẽ giúp cho bạn tiết kiệm được khá nhiều tài nguyên và chi phí. Khi bạn dùng RSS thì băng thông của bạn sẽ được giải phóng nhiều hơn, chi phí truyền và phân phối sẽ ít hơn.

# Lấy data từ RSS như thế nào

Phần giới thiệu đã xong, bây giờ chúng ta sẽ đi tới phần hướng dẫn sử dụng rss cho React.

Để lấy được data từ một feed rss, việc đầu tiên bạn cần làm là parser data từ feed đó ra thành dịnh dạng mà React có thể đọc hiểu được. Rất may mắn là chúng ta có một package reader khiến cho việc đọc dữ liệu từ RSS trở nên cực kỳ dễ dàng. Package mà mình muốn nói tới ở đây là **rss-parser**

Việc đầu tiên cần làm là install package, cú pháp thì chắc không còn gì xa lạ nữa đúng không, chúng ta sẽ dùng lệnh 
```
npm install --save rss-parser
```

Sau đó, hãy import package này vào nơi bạn muốn parser data rss ra, hãy chắc chắn rằng bạn có khai báo proxy để tránh lỗi khi parser data nhé

```
import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
type Props = {}

const Page = ({}: Props) => {
    const [rssItems, setRssItems] = useState([]);
    useEffect(() => {
        const parser = new Parser();
        parser.parseURL(`${CORS_PROXY}https://www.reddit.com/.rss`, (err, feed) => {
          if (err) throw err;
          setRssItems(feed.items);
        });
    return (
        console.log(rssItems)
    )
}
```
Vậy là xong, bạn có thể lấy data từ trong rssItems để hiển thị ra theo bất cứ kiểu nào bạn muốn. Rất đơn giản phải không. Tuy nhiên, đã là dev web thì không ai là không biết tới kẻ đó, kẻ đã làm cho bao thế hệ dev đau đầu nhức óc, lao tâm khổ tứ để thuần phục. Hắn luôn tìm cách đào thải những cố gắng của chúng ta. Vậy kẻ đó là ai mà nghe nguy hiển tới vậy, hơn nữa hắn liên quan gì tới việc đọc và chạy rss của chúng ta?

Vâng kẻ mà minh muốn nói tới ở đây chính là IE. Bạn đoán không sai đâu, IE hoàn toàn không đựoc support trong package **rss-parser**. Vây là bao công sức của chúng ta nãy giờ đã đi tong chỉ với câu nói "à web cần chạy trên IE nữa em nhé".

Tuy nhiên sau một thời gian tìm kiếm và nghiên cứu, mình cũng đã tìm ra cách để bắt tay hợp tác với IE. Tạm thời chia tay với **rss-parser** chúng ta sẽ parser data của feed thủ công bằng 
cách sử dụng request
```
import React, { useState, useEffect } from 'react';
import Parser from 'rss-parser';

const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';
type Props = {}

const Page = ({}: Props) => {
    const [rssItems, setRssItems] = useState([]);
    
    function FetchDataFromRssFeed() {
        const request = new XMLHttpRequest();
        request.onreadystatechange = () => {
          if (request.readyState === 4 && request.status === 200) {
            const parser = new DOMParser();
            const xml = parser.parseFromString(request.responseText, 'text/xml');
            const items = xml.querySelectorAll('item');
            setRssItems(Array.from(items, (item) => item));
          }
    };
    request.open('GET', 'https://www.reddit.com/.rss', true);
    request.send();
  }
    
    useEffect(() => {
        FetchDataFromRssFeed()
    },[]);
    
    return (
        console.log(rssItems)
    )
}
```
Tada, vậy là không cần xài package, tuy hơi dài dòng một chút nhưng bây giờ bạn đã có thể thoải mái sử dụng rss để lấy data trên trang React của mình rồi.

Bài viết của mình cũng xin được khép lại tại đây. Nếu có thắc mắc gì hãy để lại comment nhé.