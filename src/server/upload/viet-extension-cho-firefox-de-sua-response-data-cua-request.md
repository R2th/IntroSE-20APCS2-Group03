# Giới thiệu
Bài viết này sẽ hướng dẫn bạn viết một extension cho trình duyệt Firefox dùng để tự sửa response data của các HTTP request mà không cần phải dựa vào các extension bên thứ ba.

# File `manifest.json`
Mỗi một extension của Firefox sẽ cần đến một file `manifest.json`. File JSON này sẽ chứa các thông tin về extension như tên, phiên bản của extension và các cài đặt khác. Các key cần phải có trong file `manifest.json` là `manifest_version` (phiên bản của `manifest.json`, hiện tại luôn được set bằng `2`), `name`, `version`. Ví dụ:
```json
{
	"manifest_version": 2,
	"name": "Test Extension",
	"version": "1.0",
}
```
Các bạn có thể tìm hiểu thêm về key khác của `manifest.json` tại [đây](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/manifest.json#list_of_manifest.json_keys).

Trong bài viết này, mình sẽ viết một extension ví dụ dùng để lọc các truyện được upload bởi một nhóm ở trên trang MangaDex (`mangadex.org`), cụ thể là mục Latest Updates. Extension này sẽ chặn một response (dạng JSON) do server API của trang web (`api.mangadex.org`) trả về, sửa lại response đó rồi mới trả về để client xử lý tiếp. Để làm được điều đó, ta cần phải dùng đến 2 API mà Firefox cấp cho là [`webRequest`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest) và `webRequestBlocking`. Ngoài ra, do trang này hoạt động theo kiểu lazy loading nên script JS sẽ cần phải hoạt động ngầm, thay vì chạy bằng `onLoad` event. Do đó, file `manifest.json` cho extension này sẽ là:
```json
{
	"manifest_version": 2,
	"name": "Test Extension",
	"version": "1.0",
	
	"background": {
		"scripts": ["background.js"]
	},
	
	"permissions": ["webRequest", "webRequestBlocking", "https://mangadex.org/*", "https://api.mangadex.org/*"]
}
```
Key `background` sẽ được dùng để khai báo các script sẽ chạy ngầm khi extension được cài đặt (ở ví dụ này, script sẽ được đặt tên là `background.js`). Còn key `permissions` được extension dùng để request những API, host mà nó được phép dùng/truy cập. Trong file trên, `permissions`có:
* `webRequest`: cho phép extension nghe (listen) các HTTP request bằng các API.
* `webRequestBlocking`: cần thiết khi ta muốn sửa request/response. Có thể hiểu là nó sẽ giúp chặn các request/response, cho phép bạn sửa chúng rồi mới cho đi tiếp.
* `"https://mangadex.org/*", "https://api.mangadex.org/*"`: là các host mà extension được phép động đến. Mặc dù script sẽ sửa request từ `api.mangadex.org`, `permissions` vẫn cần có trang chính là `mangadex.org` để nó chạy khi mở trang này.

# Script JS để sửa request
Trong script `background.js`, bạn sẽ cần phải viết một function và add một listener để nó tự chạy function đó mỗi khi nhận được request từ API của server. `browser.webRequest.onBeforeRequest.addListener` sẽ giúp bạn thực hiện điều này bằng cách gọi một function khi có request được tạo.
```js
browser.webRequest.onBeforeRequest.addListener(
	listener,
	{urls: ["https://api.mangadex.org/chapter?*"], types: ["xmlhttprequest"]},
	["blocking"]
);
```
Với đoạn code trên, `webRequest` sẽ gọi hàm `listener` mỗi khi nó nhận được request match với pattern `https://api.mangadex.org/chapter?*` và thuộc loại `xmlhttprequest`. Tham số cuối cùng của hàm trên là `extraInfoSpec` được set  là `["blocking"]` để cho request trờ thành synchronous (thay vì asynchronous), giúp ta có thể sửa request.

Tiếp theo, ta sẽ viết hàm `listener`. Hàm này sẽ nhận tham số đầu vào [`details`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#details) do [`webRequest.onBeforeRequest` gửi](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest#parameters), lấy các request và sửa response body của các request đó. Để lấy ra các request, ta cần gọi hàm [`webRequest.filterResponseData`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/onBeforeRequest) với tham số là `requestId` được lấy từ `details` (`details.requestId`) để nó trả về [`webRequest.StreamFilter`](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/StreamFilter), cho phép ta theo dõi và chỉnh sửa các response. Ngoài ra, ta còn dùng tiếp 2 Web API [`TextDecoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextDecoder) và [`TextEncoder`](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder). `TextDecoder` được dùng để decode bytes của response data từ các request thành string, còn `TextEncoder` được dùng để encode lại string đó ra bytes.
```js
function listener(details) {
	let filter = browser.webRequest.filterResponseData(details.requestId);
    let decoder = new TextDecoder("utf-8");
	let encoder = new TextEncoder();
	...
```
`webRequest.StreamFilter` cung cấp 4 event để ta có thể dùng là: `onstart`, `ondata`, `onstop`, `onerror`. Trong ví dụ này, ta chỉ cần đến 2 event là `ondata` và `onstop`.

## Event `ondata`
Event `ondata` sẽ được gọi khi `filter` nhận được response data. Trong event này, ta chỉ cần append data của request vào một mảng data.
```js
    let data = [];
    filter.ondata = event => {
        data.push(event.data);
    };
```
**Note**: do trang web này trả về response theo các chunk (các bạn dùng `console.log(event.data)` sẽ thấy console log ra khá nhiều lần thay vì 1) nên nếu muốn parse dưới dạng JSON thì phải gom hết toàn bộ data của request về mới parse được. Với các request mà không trả về theo các chunk, bạn có thể edit trực tiếp trên event này mà không cần đến event `onstop` cũng được (tham khảo ví dụ [này](https://github.com/mdn/webextensions-examples/blob/a545cdcd6993f9d6cfe5b1a3a3d1c4cacf1a380a/http-response/background.js#L6)).

## Event `onstop`
Event `onstop` sẽ được gọi tới khi filter không nhận thêm được data nào (request đã trả về hết response data). Ở event này, ta sẽ dùng `TextDecoder` decode lần lượt từng response chunk rồi ghép kết quả vào một string.
```js
    filter.onstop = event => {
        let str = "";
        if (data.length == 1) {
            str = decoder.decode(data[0]);
        } else {
            for (let i = 0; i < data.length; i++) {
                let stream = (i == data.length - 1) ? false : true;
                str += decoder.decode(data[i], {stream});
            }
        }
        ...
```
Tiếp theo, ta chỉ cần sửa response data dựa trên string vừa ghép lại (với ví dụ này chỉ cần parse sang JSON object, xoá các element trong list thoả mãn điều kiện là được). Sau khi sửa xong, việc cuối cùng cần làm là encode lại dữ liệu đã được sửa thành bytes và gửi lại cho `filter` để nó trả về client.
```js
        // Xử lý dữ liệu
        ...
        
        filter.write(encoder.encode(processed_data));
		filter.disconnect();
	}
	return {};
```
# Kết quả
Kết quả file `background.js` sau khi viết xong:
```js
function listener(details) {
	let filter = browser.webRequest.filterResponseData(details.requestId);
	let decoder = new TextDecoder("utf-8");
	let encoder = new TextEncoder();
	
	let data = [];
	filter.ondata = event => {
		data.push(event.data);
	};

	filter.onstop = event => {
		let str = "";
		if (data.length == 1) {
			str = decoder.decode(data[0]);
		} else {
			for (let i = 0; i < data.length; i++) {
				let stream = (i == data.length - 1) ? false : true;
				str += decoder.decode(data[i], {stream});
			}
		}
		var json_data = JSON.parse(str);
		data_length = Object.keys(json_data.data).length;
		try {
			for (let i = 0; i < data_length; i++) {
				relationships = json_data.data[i].relationships;
				var group = "";
				
				for (let j = 0; j < Object.keys(relationships).length; j++) {
					if (relationships[j].type == "scanlation_group" && "attributes" in relationships[j]) {
						group = relationships[j].attributes.name;
					}
				}

				if (group == "Bilibili Comics") {
					json_data.data.splice(i, 1);
					i = i - 1;
					data_length = data_length - 1;
				}
			}
		} catch (err) {
			console.log(err);
		}

		filter.write(encoder.encode(JSON.stringify(json_data)));
		filter.disconnect();
	}
	return {};
}

browser.webRequest.onBeforeRequest.addListener(
	listener,
	{urls: ["https://api.mangadex.org/chapter?*"], types: ["xmlhttprequest"]},
	["blocking"]
);
```
Việc cuối cùng bạn cần làm là vào `about:debugging` -> `This Firefox` -> `Load temporary Add-on...` và chọn file `manifest.json` để cài đặt extension mới này lên Firefox.

![Untitled.png](https://images.viblo.asia/1241caeb-1e53-4f25-b922-5d8ffd3bcda1.png)

Trước:

![truoc.jpg](https://images.viblo.asia/8b609122-8cea-46a9-b68e-4128ca73855a.jpg)

Sau khi apply extension:

![sau.jpg](https://images.viblo.asia/9374caa1-9e00-401e-a3ed-32d1680d2e90.jpg)

Hy vọng bài này sẽ giúp các bạn đang muốn viết extension cho Firefox biết cách dùng API `webRequest` để sửa request của trang web.

Với trình duyệt Chrome, tuy engine của Chrome có API `webRequest` nhưng lại không cài đặt hàm `filterResponseData()` nên extension này không hoạt động trên Chrome được. Khi đó, bạn sẽ cần phải dùng đến các extension phức tạp khác để làm việc này.

![firefox masterrace.jpg](https://images.viblo.asia/26bf72aa-3dbc-492f-a8e5-a259077e426d.jpg)