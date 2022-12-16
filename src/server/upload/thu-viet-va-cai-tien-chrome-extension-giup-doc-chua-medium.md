# Intro
**Chrome (Edge) Extension** hay nói chung hơn là Browser extension luôn là công cụ rất hữu ích hỗ trợ chúng ta trong quá trình duyệt web. Thử tưởng tượng, khi phần lớn thời gian của bạn dùng để duyệt web, đọc tin tức, mua sắm, làm việc,... mà có những extension giúp tiết kiệm thời gian và công sức thì quả là tốt biết bao nhiêu. Trang [Extension Monitor ](https://extensionmonitor.com/blog/breaking-down-the-chrome-web-store-part-1) thống kê tại thời điểm  8/2019 đã có hơn 188,620 extension với tổng số hơn 1,230,081,087 lượt cài đặt. Và extension nào cũng có: từ dịch trang web, tổng hợp tin tức, OCR ảnh sang text cho đến hiển thị hình ảnh Shia Labeouf cùng câu nói nổi tiếng "JUST DO IT!", vân vân và vân vân. Trong bài này chúng ta cùng tìm hiểu thêm một tính năng hay ho nữa của Chrome Extension đó là cho phép tùy biến các thông số của request được gửi đi từ trình duyệt áp dụng vào một trường hợp cụ thể: bypass Medium paywall. OK, let's go!

![](https://ph-files.imgix.net/53741997-9cb4-491b-a801-95646951026e?auto=format&auto=compress&codec=mozjpeg&cs=strip&h=240&fit=max)

**Update**: Tải về Nodium cho:
- ~~Chrome/Edge: https://chrome.google.com/webstore/detail/nodium/egbbkobkjhplmjkhiigidfppcjljickb?hl=en-US~~ Extension đã bị review reject nên các bạn làm theo hướng dẫn trong repo: [https://github.com/vigov5/nodium](https://github.com/vigov5/nodium) nhé.
- Firefox: https://addons.mozilla.org/en-US/firefox/addon/nodium/
# Medium Paywall
## The story begin...
Medium là một blogging platform/publisher từng mong muốn cách mạng nền truyền thông online. Medium cung cấp nền tảng cho phép các tác giả đăng bài và có thể là tự hosting blog của họ trên domain riêng. Chất lượng các bài viết trên Medium thì cũng phụ thuộc vào các tác giả đăng bài trên đó, và cũng có rất nhiều publisher có chất lượng như [Gen](https://gen.medium.com/) hay [OneZero](https://onezero.medium.com/). Đối với dân IT như mình thì hay đọc trên [UXPlanet](https://uxplanet.org/), [Towards Data Science](https://towardsdatascience.com/).

Tuy nhiên, điều này đã thay đổi khi Medium quyết định 2 điều:

- Put great stories behind the metered paywall. (đưa những bài viết tốt ra đằng sau paywall)
- Help people find the great stories they care about. (giúp người dùng tìm được những bài viết hay ho mà họ quan tâm)

nghĩa là giờ đây hàng tháng bạn chỉ được đọc free 3 bài viết xịn, (+1 là 4 nếu bạn đăng ký thành viên) còn sau đó bạn sẽ phải trả 5$/tháng nếu muốn đọc tiếp. Tất nhiên họ có [lí do và bussiness model](https://blog.medium.com/the-medium-model-3ec28c6f603a) của mình. Thế nhưng nghịch lý xảy ra: những tác giả tạo ra nội dung cho phép Medium hiện thực hóa paywall của mình giờ lại bị chặn đọc nội dung trên Medium cũng bằng chính paywall đó. Đọc thêm ở [đây](https://hackernoon.com/why-i-quit-my-medium-membership-909909657ba), ở [đây](https://www.niemanlab.org/2019/03/the-long-complicated-and-extremely-frustrating-history-of-medium-2012-present/) và ở [đây](https://medium.com/hackernoon/the-paywall-paradox-of-medium-3dd0a6a7bde6).

![](https://images.viblo.asia/90f8ebce-06c4-4a2a-b74d-ba761e48bbe2.png)

Và thế là cuộc chia li diễn ra, có người ở lại, và cũng có những người ra đi chọn cho mình một platform mới (wordpress,...) hoặc tự hosting chính nội dung của mình như [Hacker Noon](https://hackernoon.com), [Signal v Noise](https://m.signalvnoise.com/), [freeCodeCamp](https://www.freecodecamp.org/),... Chúng ta sẽ không bàn nhiều đến vấn đề này ở đây.

Tuy nhiên (lần 2), Medium CEO, và cũng là nhà đồng sáng lập của Twitter, Evan Williams có tweet rằng:

![](https://images.viblo.asia/b0148817-8db3-45fb-bd43-b7093e9a0265.png)

nghĩa là tất cả các link Medium nếu đến từ Twitter feed sẽ không bị chặn bởi paywall nữa. Thế là xuất hiện trick bypass như sau:

- Cách 1: Mở twitter lên, đến phần DMs (direct message) và tự DM chính mình link Medium, click vào link và thế là paywall biến mất.
- Cách 2: Mở incognito mode lên (hoặc clear cookie và local storage) và coi như chúng ta chưa từng đăng nhập vào Medium, như vậy ta sẽ được đọc free.

Vậy có cách nào ít tốn công hơn không ?. Câu trả lời chính là browser extension.

## The trick

Trick để bypass Medium paywall tất cả nằm ở [Referer header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referer). 

> The Referer request header contains the address of the previous web page from which a link to the currently requested page was followed. The Referer header allows servers to identify where people are visiting them from and may use that data for analytics, logging, or optimized caching, for example.

Khi gửi kèm header trong request lên server, server sẽ biết được người dùng đến từ trang web nào. Và để có thể fake rằng các link Medium chúng ta vừa click vào đến từ Twitter, chỉ cần chèn thêm đường link nào đó của Twitter vào phần này:

```
Referer: https://t.co/
```

(`t.co` là domain dùng để rút gọn link của Twitter). Đơn giản vậy thôi.

## What we do

Mình sẽ ko bàn đến vấn đề [đạo đức](https://github.com/manojVivek/medium-unlimited/issues/32) có nên bypass hay không ở đây vì thực tế có rất nhiều người đã làm extension này rồi. Và dù sao thì họ cũng sẽ bypass anyway thôi (mà Medium tạo ra con đường này mà). Các extension, có thể kể đến [Medium Unlimited](https://github.com/manojVivek/medium-unlimited), [Medium Infinity Reader](https://chrome.google.com/webstore/detail/medium-infinity-reader/fgmeboblogphchmhbkppjdjohckmmhan), vân vân và tất cả đều dựa trên trick hoặc là cực đoạn hơn bằng việc block luôn cookie của Medium. Tuy nhiên có vài vấn đề:
- Ngoài medium.com thì còn có các subdomain và cả các trang khác nữa sử dụng Medium. Các extension đều đang hard-code các URL này trong code dẫn đến tình trạng khó cập nhật mỗi khi có một trang mới:

![](https://images.viblo.asia/ca3062ea-cdf0-4a4a-9085-e81dfdb766d2.png)

- Việc blocking cookie không phải bao giờ cũng là ý tưởng tốt.

Chúng ta sẽ implement lại đồng thời cải tiến nó thành extension **Nodium** như dưới đây.
![](https://images.viblo.asia/8d461122-7d58-456a-9fa4-f1fa216ad23d.png)

# Let's start coding
## Components of Nodium
Hình dưới cho chúng ta cái nhìn khái quát nhất về Nodium:

![](https://images.viblo.asia/5ada968f-a659-45d9-b22b-d617c008c131.png)

Dưới đây là cụ thể các thành phần và chức năng của extension. Code cũng khá dễ hiểu nên mình sẽ show code và giải thích lần lượt.

## Domain DB
Là nơi lưu các domain mà extension đã phát hiện ra được. Ở đây ta sử dụng [chrome.storage.local](https://developer.chrome.com/extensions/storage), một kiểu local storge cho extension. Đối với mỗi domain/url ta tiến hành `setupIntercept` (cụ thể hơn ở phần sau).

```background.js
chrome.storage.local.get(['urls'], function (result) {
  let DEFAULT_URLS = ['https://medium.com/*'];
  if (!Object.keys(result).length) {
    chrome.storage.local.set({ urls: DEFAULT_URLS });
  } else {
    DEFAULT_URLS = result.urls;
  }

  setupIntercept(DEFAULT_URLS);
});
```

## background.js
Gồm 2 flow:

- Flow 1: tương ứng đường màu tím trong hình vẽ. Ta chặn bắt các request của trình duyệt mà trùng với danh sách các domain trong DB. Đối với các request này. Ta sẽ thêm vào referrer header để bypass paywall.

```background.js
function setupIntercept (urls) {
  function intercept (details) {
    details.requestHeaders = details.requestHeaders.filter(rh => rh.name !== 'Referer');
    details.requestHeaders.push({ name: 'Referer', value: 'http://t.co' });
    return { requestHeaders: details.requestHeaders };
  }

  chrome.webRequest.onBeforeSendHeaders.removeListener(intercept);

  let options = ["blocking", "requestHeaders", "extraHeaders"];
  if (isFirefox) options.pop();

  chrome.webRequest.onBeforeSendHeaders.addListener(
    intercept,
    { urls: urls },
    options
  );
}
```
Sử dụng [chrome.webRequest.onBeforeSendHeaders](https://developer.chrome.com/extensions/webRequest#event-onBeforeSendHeaders) cho phép ta thay đổi tùy ý các header cũng như các thông tin khác của request.
- Flow 2: tương ứng đường màu đỏ trong hình vẽ. Ta thực thi đoạn code trong **detector.js** để phát hiện trang hiện tại có sử dụng Medium không. Để thực hiện việc này ta cần đến [chrome.webNavigation.onCompleted](https://developer.chrome.com/extensions/webNavigation#event-onCompleted). Sự kiện này xảy ra khi sau khi DOM đã được load (nghĩa là trang web đã được load xong). Nếu có dấu hiệu và domain này chưa có trong DB thì sẽ thêm vào và gửi message đến **content_script.js** hiển thị notification báo người dùng load lại trang để bypass.
```background.js
chrome.webNavigation.onCompleted.addListener(function (details) {
  chrome.tabs.executeScript({ file: "detector.js" }, function (result) {
    let [detected, origin, url] = result[0];

    chrome.storage.local.get(['urls'], function (current) {
      let pattern = `${origin}/*`;

      if (detected && current.urls.indexOf(pattern) == -1) {
        current.urls.push(pattern);
        chrome.storage.local.set({ urls: current.urls });

        chrome.tabs.insertCSS({ file: "notify.css" });

        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
          chrome.tabs.sendMessage(tabs[0].id, { origin }, function (response) { });
        });

        setupIntercept(current.urls);
      }
    });
  })

}, {
  url: [{ urlMatches: "https:\/\/*\/*" }, { urlMatches: "http:\/\/*\/*" }],
});
```

##  content_script.js
Thực hiện việc lắng nghe message được gửi đến từ **background.js** và hiển thị pop-up. Vì đối với trang mới thì sau khi load trang xong ta mới phát hiện ra được nó có dùng Medium không nên phải tốn 1 lần reload còn từ đó về sau sẽ không cần nữa.

```content_script.js
chrome.runtime.onMessage.addListener(
    function (message, sender, sendResponse) {
        if (!document.getElementById('nodium-root')) {
            const element = document.createElement('div');
            element.setAttribute('id', 'nodium-root');
            element.innerHTML = `Nodium | <strong>${message.origin}</strong> added. Please reload 👍`;
            document.body.appendChild(element);

            setTimeout(function () { document.getElementById('nodium-root').remove(); }, 5000);
        }
    }
);
```
![](https://images.viblo.asia/89af7180-2c7c-4e86-aadf-943fba121997.png)

## detector.js
Để có thể phát hiện ra trang có sử dụng Medium không, chúng ta sẽ dựa vào chính những thông tin mà Medium đã dùng để tracking. Ở đây mình tìm thấy 2 cái:
- Medium sẽ set một vài key trong local storage để biết được người dùng tháng này đã đọc bao nhiêu bài, còn bao nhiêu bài, vân vân...
![](https://images.viblo.asia/3541398e-da46-4a41-bd06-9aac62bd54a8.png)
```detector.js
var nodiumDetector1 = [
  "post-article|first-post-viewed-timestamp",
  "post-article|posts-viewed-today-count",
  "post-article|first-post-viewed-month-timestamp",
  "post-article|posts-viewed-month-count",
  "post-article|first-post-viewed-today-timestamp",
  "post-article|non-moc-posts-viewed-month-count"
].some((key) => localStorage.getItem(key) != null);
```
- Đối với các trang sử dụng tên miền riêng, và với link ở home page, chưa vào đọc bài viết thì sử dụng thêm các local storage key khác có chứa link medium trong value (chắc là một dạng tracking khác):

```detector.js
var nodiumDetector2 = [
  "branch_session_first",
  "branch_session"
].some((key) => {
  let data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data).link.indexOf("medium.com") != -1;
  }
});
```

Nếu phát hiện thấy có một trong hai đặc điểm này thì sẽ được thêm vào blacklist :joy:.
## popup.js
Phần này có nhiệm vụ lấy dữ liệu danh sách các domain có trong DB và hiển thị pop-up đơn giản cho người dùng thấy. Mình code thuần HTML, JS và sử dụng [Tailwind CSS](https://tailwindcss.com/) để style.

![](https://images.viblo.asia/7dcb9afb-fcd5-4409-8e99-c7199e2bc56d.png)

# Nodium in Action
Thử nghiệm với link sau https://towardsdatascience.com/digit-significance-in-machine-learning-dea05dd6b85b

![](https://images.viblo.asia/18bd3efd-3540-4bff-91a0-4d6958d4db58.gif)

# The End

Source code: https://github.com/vigov5/nodium . Tất cả chỉ chưa đến 300 dòng code thôi :v
Bạn có thể tải file zip của repo về rồi Load Upack extension để sử dụng nhé. Nếu thấy hữu ích thì đừng quên star repo ủng hộ tác giả nhé :joy:. Bye~