## Giới thiệu
AMP ⚡ là viết tắt của Accelerated Mobile Pages là một dự án của Google nhằm giúp lập trình viên xây dựng những trang web thân thiện với thiết bị di động và tăng tốc độ tải trang lên đáng kể. Một trang web tuân thủ AMP sẽ được google lưu ở máy chủ của mình và sẽ cho tốc độ tải trang gần như tức thì, so cool, so mượt ⚡
<br><br>

Trong bài viết này mình sẽ không đi sâu vào tìm hiểu AMP, mà sẽ tìm hiểu cách áp dụng AMP vào các dự án Nuxt.js, bắt đầu thôi. 😀

## Cài đặt
Đây là example chính chủ hướng dẫn cài đặt AMP vào ứng dụng Nuxt.js, chúng ta có thể tham khảo:
[Nuxt with AMP](https://github.com/nuxt/nuxt.js/tree/dev/examples/with-amp)


Trong bài viết này chúng ta sẽ làm khác đi một chút, vẫn cho kết quả tương tự. Trước tiên tạo file ampify.js trong thư mục plugins có nội dung như sau:


```js
// plugins/ampify.js
const ampScript = '<script async src="https://cdn.ampproject.org/v0.js"></script>'
const ampBoilerplate = '<style amp-boilerplate>body{-webkit-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-moz-animation:-amp-start 8s steps(1,end) 0s 1 normal both;-ms-animation:-amp-start 8s steps(1,end) 0s 1 normal both;animation:-amp-start 8s steps(1,end) 0s 1 normal both}@-webkit-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-moz-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-ms-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@-o-keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}@keyframes -amp-start{from{visibility:hidden}to{visibility:visible}}</style><noscript><style amp-boilerplate>body{-webkit-animation:none;-moz-animation:none;-ms-animation:none;animation:none}</style></noscript>'

module.exports = (html) => {
  // Add ⚡ to html tag
  html = html.replace(/<html/gi, '<html ⚡')

  // Combine css into single tag
  let styleConcat = ''
  html = html.replace(/<style[^>]*>]*>(.*?)?</style>/gi, (match, sub) => {
    styleConcat += sub
    return ''
  })
  html = html.replace('</head>', `<style amp-custom>${styleConcat}</style></head>`)

  // Remove preload and prefetch tags
  html = html.replace(/<link[^>]*rel="(?:preload|prefetch)?"[^>]*>/gi, '')

  // Remove amphtml tag
  html = html.replace(/<link[^>]*rel="(?:amphtml)?"[^>]*>/gi, '')
  
  // Remove data attributes from tags
  html = html.replace(/s*=>]*="[^"]*"|[^=>s]*)/gi, '')

  // Remove JS script tags except for ld+json
  html = html.replace(/<scriptb[^<]*(?:(?!</script>)<[^<]*)*</script>/gi, (match) => {
    return (/application/ld+json/gi.test(match)) ? match : ''
  })

  // Replace img tags with amp-img
  html = html.replace(/<img([^>]*)>/gi, (match, sub) => {
    return `<amp-img ${sub} layout=intrinsic></amp-img>`
  })

  // Add AMP script before </head>
  html = html.replace('</head>', ampScript + ampBoilerplate + '</head>')

  return html
}
```

Mục đích của đoạn script trên là chỉnh sửa mã HTML của trang web trước khi nó được render/generate để phù hợp với AMP. Trước tiên là thêm ⚡ vào thẻ mở <html>, đây là điều bắt buộc để xác định đây có phải là trang hổ trợ AMP hay không.
<br><br>
Tiếp theo, gộp tất cả nội dung trong các thẻ <style> vào một thẻ <style> duy nhất có chứa thuộc tính amp-custom. Lưu ý, không được bật config extractCSS lên đâu đấy nhé, hơn nữa dung lượng css cũng không được vượt quá 50,000 bytes, không sẽ bị báo validation ngay.
<br><br>
Tiếp theo, đoạn script sẽ loại bỏ tất cả các thẻ được preload hoặc prefetch, loại bỏ tất cả các thẻ <link rel=”amphtml”> và <script> ngoại trừ các thẻ sử dụng cấu trúc JSON-LD được chấp nhận bỏi AMP. Convert các thẻ <img> thành <amp-img>, lưu ý thẻ amp-img không có attribute width cũng sẽ bị đánh fail, cuối cùng thêm đoạn AMP Boilerplate Code vào thẻ <head>.
<br><br>
Để sử dụng plugin trên, chỉnh sửa file `nuxt.config.js` như bên dưới, trong ví dụ này chỉ nhưng trang nằm trong thư mục /amp/ mới được convert mã HTML sang AMP:

```js
    // nuxt.config.js
const ampify = require('./plugins/ampify')

module.exports = {
  /*
  ** Hooks configuration
  */
  hooks: {
    // This hook is called before saving the html to flat file
    'generate:page': (page) => {
      if (/^/amp//gi.test(page.route)) {
        page.html = ampify(page.html)
      }
    },
    // This hook is called before serving the html to the browser
    'render:route': (url, page, { req, res }) => {
      if (/^/amp//gi.test(url)) {
        page.html = ampify(page.html)
      }
    }
  }
}
```
Sau khi hoàn thành, bạn có thể kiểm tra xem trang web của mình đã pass AMP hay chưa bằng cách sử dụng tool [AMP Project validator](https://validator.ampproject.org/)
<br><br>
Chúc các bạn thành công.
    
Tham khảo:
* [AMP project](https://www.ampproject.org/)
*   [AMP Project validator](https://validator.ampproject.org/)
 * [Nobi.dev](https://nobi.dev)