Xin chào các bạn hôm nay mình sẽ nói đến các phương pháp hay nhất để tối ưu SEO trên ứng dụng Nuxt.js của các bạn.
Nuxt js giúp bạn tăng khả năng tối ưu hóa công cụ tìm kiếm của trang web để có thứ hạng tốt hơn.

Trong bài viết này mình sẽ không nói đến SEO là gì? Hay là làm các nào để nó có thể hoạt động?. Vì những khái niệm nó các bạn có thể rất 
dễ dàng tìm kiếm được thông qua `google`. Mình sẽ tập trung giải quyết những việc cần thay đổi để giúp chúng ta có thể SEO tốt hơn trong Nuxt.js nhé.

#### Luôn chọn chế độ `Universal` trong chế độ SPA

NuxtJs cung cấp hai chế độ khác nhau, một ở chế độ  `Universal` và một chế độ khác là SPA (Single Page Application). Vì sao chế độ `Universal` lại quan trọng đối với SEO?.
Trang web SPA được biết đến với tốc độ tải nhanh và cập nhật rất nhanh so với các trang web thông thường khác Nhưng chúng không thân thiện với SEO. Khi trang web SPA tải, nó chỉ gửi nội dung Html cơ bản mà không được hiển thị, sau đó nó sẽ đưa ra một yêu cầu javascript khác.Nhưng điều gì sẽ xảy ra nếu việc render javascript mất thời gian?.Vấn đề ở đây là khi trình thu thập dữ liệu SEO truy cập vào trang web, nó sẽ  chỉ thấy Html cơ bản , vì vậy nó sẽ  không thấy bất kỳ dữ liệu thích hợp nào để đánh `index ` cho trang web của bạn.

``` html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Home</title>
  </head>
  <body>
    <div id="app"></div>
    <script src="/js/app.js"></script>
  </body>
</html>
```

Chế độ `Universal` sẽ giải quyết vấn đề này bằng cách chuyển dữ liệu đã được render hoàn chỉnh  giúp cho Trình thu thập dữ liệu SEO có thể hiểu và đánh `index` trên trang web của bạn.Đó là lý do tại sao chế độ `Universal` rất quan trọng với SEO.
Giờ tiếp theo chúng ta cần cài đặt một số packages npm để nang cao khả năng SEO của website.

#### Thêm một `Sitemap`
`Sitemap` là một tệp XML chứa các URL của các trang web của bạn để các công cụ tìm kiếm có thể dễ dàng thu thập dữ liệu trong các trang của bạn. Bạn có thể thêm một `Sitemap` trong ứng dụng của mình. Nhưng trước tiên ta cần cái đặt chúng.
``` html
yarn add @nuxtjs/sitemap
```

Sau khi cài đặt `Sitemap` bạn chỉ cần thêm vào file nuxt.config.js.

``` html
modules: [
    // ...  other modules
    '@nuxtjs/sitemap' // <--- This one!
  ],
```

Để kiểm tra xem `Sitemap`  có được cài đặt đúng cách hay không.Chỉ cần nhấn `/sitemap.xml` trước URL trang chủ của bạn, sau đó bạn sẽ có thể xem liệu các liên kết trang của mình có được hiển thị đúng hay không.

#### Thêm Google Analytics

Google Analytics rất quan trọng để theo dõi lưu lượng truy cập trang web của bạn và kiểm tra hiệu suất. Để thêm google analytics trong Nuxtjs, chúng ta chỉ cần cài đặt mô-đun sau:

``` html
yarn add @nuxtjs/google-analytics
```

Sau đó, truy cập nuxt.config.js của bạn và thêm mô-đun:

``` html
modules: [
    '// ... other modules 
    '@nuxtjs/google-analytics'  // <--- This one!
  ],
```

Bây giờ chúng ta cần kết nối tài khoản google analytics của mình với ứng dụng nuxt . Để làm được điều đó,bạn  cần thêm id google analytics bên trong nuxt.config.js


``` html
googleAnalytics: {
    id: "{YOUR GOOGLE ANALYTICS ID}",
    dev: false
  },
```


#### Thêm thẻ `Meta`

##### Đặt thẻ `Meta` cho một trang
Ở đây, bạn sẽ thêm phương thức `head()` vào một trang cụ thể và thêm thẻ `meta` trong phương thức đó.

``` html
export default {
	data() {
		return {}
	},
	head() {
		return {
			title: 'About Us',
			meta: [
			{
				hid: 'title',
				name: 'title',
				content: 'About Us',
			},
			{
				hid: 'description',
				name: 'description',
				content: process.env.npm_package_description,
			},
		],
	}
},
```


##### Đặt thẻ `Meta` động

Thẻ meta động sử dụng khi chúng ta cần  khi  trong cùng một trang hoặc thành phần mà muốn  hiển thị nhiều mục. ví dụ: ta có ứng dụng giỏ hàng và chúng ta cần thẻ meta cho từng sản phẩm.Nhưng trong trường hợp đó ta sẽ cần  sử dụng một thành phần duy nhất và gọi nhiều lần. Ở  đây ta  cần thẻ `meta` động.

``` html
meta: [
	{
		hid: 'title',
		name: 'title',
		content: 'Natural ' + `${this.productName}`,
	},
	{
		hid: 'description',
		name: 'description',
		content:
		'Natural' +
		`${this.productName}` ,
	},
]
```
Ở  đây biến productName chứa tên của sản phẩm cụ thể đó và đặt thẻ `meta`.


----

#### Kết Luận
Dưới đây mình đã giới thiếu một số các phương pháp để có thể tối ưu SEO trong dứng dụng Nuxt. Hi vọng các bạn thích bài viết này.
Nếu có bất kì thắc mắc gì hãy để lại comment ở phía dưới nhé.

---

### Tham Khảo chi tiết hơn

https://nuxtjs.org/examples/seo-html-head/


https://nuxtjs.org/guides/features/meta-tags-seo/