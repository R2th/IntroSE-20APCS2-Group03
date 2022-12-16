> I choose a lazy person to do a hard job. Because a lazy person will find an easy way to do it. - Bill Gates

# Mở bài

Bác Gates đã bảo răng bác luôn muốn chọn những người lười biếng vì họ sẽ tìm ra cách thực hiện việc đó một cách đơn giản hơn.
Hơn nửa, đôi khi có một số công việc nhàm chán phải lặp đi lặp lại nhiều lần, trong một ngày. Với một developer thì tại sao không tìm một cách nào đó nhàn hơn để làm? 
Hôm nay mình sẽ giới thiệu với các bạn cách để tự động hóa một số công việc bằng NodeJS và Heroku, hoàn toàn miễn phí. 
Sau đó, các bạn có thể áp dụng vào chính công việc hiện tại của các bạn như gửi mail, tự động chúc mừng sinh nhật trên Facebook, và hàng tá việc khác nữa.

# Áp dụng.
Để áp dụng, mình sẽ hướng dẫn các bạn viết một cái script vui vui nhằm áp dụng thử tự động hóa một số việc đơn giản. Mình sẽ viết một cái script lấy bài từ Subreddit [r/listentothis](https://www.reddit.com/r/listentothis/) và post sang Facebook Page bằng NodeJS mỗi giờ một lần.

Serie gồm hai phần:

* Viết script
* Tự động hóa bằng Heroku

# Code nào 
Đầu tiên là mình sẽ viết một script để nó tự động lấy bài bên Subreddit và post sang Facebook Page. Các bước cụ thể sẽ như sau:

1. Tạo dự án
2. Config Api của Đít đỏ
3. Lấy random post từ Subreddit [r/listentothis](https://www.reddit.com/r/listentothis/)
4. Config [Facebook Page API](https://developers.facebook.com/docs/pages/getting-started)
5. Post status lên [Facebook Page](http://fb.com/listenthisawesomesong)

# Tạo dự án 
Ở đây mình sẽ sử dụng NodeJS cùng một số package như snoowrap cho Reddit API và node-fetch để post bài lên Page. Ngoài ra dùng thêm dotenv để config các biến envionement nữa thôi. Easy
```bash
npm init -y
touch index.js
npm i snoowrap node-fetch dotenv
```
# Config Đít Đỏ
Để Config Đít Đỏ thì mình sử dụng Snoowrap package. Setup gồm hai bước là tạo Reddit App và tạo Token vĩnh viễn.

## Tạo Reddit App
Đầu tiên, các bạn vào [https://www.reddit.com/prefs/apps](https://www.reddit.com/prefs/apps) để tạo App Reddit. 

![Screenshot-from-2019-11-16-23-46-34](https://htknguyen.com/content/images/2019/11/Screenshot-from-2019-11-16-23-46-34.png)

Ở mục Redirect URL nhớ gõ url https://not-an-aardvark.github.io/reddit-oauth-helper/ nhé. Nó sẽ giúp bạn tạo Token vĩnh viễn nhanh hơn.

Sau khi tạo xong thì lưu lại Client ID và Client Secret lại.


## Tạo Token vĩnh viễn

Tạo Token vĩnh viễn thì các bạn tiếp tục vào https://not-an-aardvark.github.io/reddit-oauth-helper/. Sau đó điền Client Secret và Client ID vào. Nhớ tick vào **Permanent** sau đó tạo Token. Kéo xuống dưới nó sẽ hiện Token. Lưu tiếp 2 cái Token đó lại là xong.

![Reddit-OAuth-Helper--1-](https://htknguyen.com/content/images/2019/11/Reddit-OAuth-Helper--1-.png)

# Lấy random post từ Subreddit

Đến đây mình bắt đầu vào file `index.js` để bắt đầu Code.

```javascript
const fetch = require("node-fetch");
const snoowrap = require("snoowrap");
require("dotenv").config();

(async () => {
  try {
    // Config Snoowrap
    const r = new snoowrap({
      userAgent:
        "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/75.0.3770.100 Safari/537.36",
      clientId: process.env.REDDIT_CLIENT_ID,
      clientSecret: process.env.REDDIT_CLIENT_SECRET,
      refreshToken: process.env.REDDIT_REFRESH_TOKEN
    });

    // Get Sub Reddit
    const subReddit = r.getSubreddit("listentothis");

    // Get Random post
    const randomPost = await subReddit.getRandomSubmission();
    console.log(randomPost);
  } catch (error) {
    console.error(error);
  }
})();
```

Kết quả sẽ trả về Object một bài post random từ Subreddit r/listentothis. Ở đây mình sẽ lấy demo 3 giá trị thôi: Title, Author và Url của bài bát đó.

```javascript
const messageData = {
    url: randomPost.url,
    author: randomPost.author.name,
    title: randomPost.title
};
```

Kết quả như sau

```json
{ url: 'https://youtube.com/watch?v=eiHvJVHzrvM',
  author: 'Encyclopedia_Green',
  title: '100 Proof Haze - Jimmy Mack [rap/hiphop]' 
}
```

# Config Facebook Page API
Tiếp theo là các bạn phải [tạo Page, sau đó tạo App trên Facebook Developer](https://developers.facebook.com/docs/pages/getting-started). Và lấy token vĩnh viễn. Các bạn chưa biết cách lấy Token vĩnh viễn thì xem ở [đây](https://sujipthapa.co/blog/generating-never-expiring-facebook-page-access-token) nhé. Đoạn này nhiều bài hướng dẫn nên mình lười viết lại quá.

# Post Status lên Page
Tiếp theo là mình post status lên Page bằng [Facebook Page API](https://developers.facebook.com/docs/pages/publishing/) thôi.

```javascript
// Post Status
    const access_token = process.env.FACEBOOK_ACCESS_TOKEN;
    const messageData = {
      url: randomPost.url,
      author: randomPost.author.name,
      title: randomPost.title
    };
    const messageTemplate = `Listen and enjoy to this song ${messageData.title} | Credit: ${messageData.author}
  `;
    const url = `https://graph.facebook.com/v5.0/101580544646661/feed?message=${messageTemplate}&link=${messageData.url}&access_token=${access_token}`;
    const postStatus = await fetch(url, {
      method: "POST"
    });
    const response = await postStatus.json();
    console.log(response);
```

# Test thử

Bật Tơ Mi Nồ lên và gõ `node index.js` để test. Nếu kết quả như sau là chính xác

```json
{ id: '101580544646661_102170374587678' }
```

# Kết luận
Đến đây là coi như đẫ xong cái script đơn giản, tự động lấy bài bên Reddit để post qua Facebook Page rồi nhé. Các bạn có thễ xem thử kết quả ở Page http://fb.com/listenthisawesomesong của mình.
Source Code của script này mình ở đây https://github.com/nguyen47/listen-to-this
Phần sau mình sẽ giới thiệu cách để tự động hóa việc này bằng Heroku. Đơn giản và không tốn chi phí gì cả.


Hiện tại mình đang tập tọe viết Blog ở địa chỉ [https://htknguyen.com/](https://htknguyen.com/). Nếu bạn nào có hứng thú thì ghé vào blog của mình nghe mình chém gió loạn lên dưới góc độ một thằng Developer cùi nhé. *Bắn tim*