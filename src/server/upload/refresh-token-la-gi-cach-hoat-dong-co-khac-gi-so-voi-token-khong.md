<p>Ở những b&agrave;i trước ch&uacute;ng ta đ&atilde; n&oacute;i nhiều về JWT l&agrave; g&igrave;? V&igrave; sao phải sử dụng JWT, trong suốt qu&aacute; tr&igrave;nh sử dụng JWT ch&uacute;ng t&ocirc;i c&oacute; nhận được nhiều phản hồi về chủ đề JWT. Trong đ&oacute; c&oacute; một vấn đề m&agrave; c&oacute; nhiều bạn chưa hiểu đ&oacute; l&agrave; &#39;Refresh token l&agrave; g&igrave;&#39;. Nếu bạn c&oacute; chung một c&acirc;u hỏi như vậy th&igrave; b&agrave;i viết n&agrave;y sẽ d&agrave;nh cho bạn.&nbsp;</p>

<p>
	<br>
</p>

<p>Điều đầu ti&ecirc;n, nếu c&aacute;c bạn chưa hiểu về <a href="https://anonystick.com/blog-developer/json-web-token-van-de-xac-thuc-rest-api-voi-jwtjson-web-token-201906074991365" rel="noopener noreferrer" target="_blank">JWT l&agrave; g&igrave;?</a>
	<a href="https://anonystick.com/blog-developer/token-la-gi-va-tai-sao-lai-co-refresh-token-2020010818628894.jsx" rel="noopener noreferrer" target="_blank">Token l&agrave; g&igrave;?</a> Th&igrave; c&oacute; lẽ n&ecirc;n dừng lại ở đ&acirc;y, v&igrave; c&aacute;c b&aacute;n sẽ kh&ocirc;ng hiểu được cụm từ &quot;Refresh token&quot; n&agrave;y đ&acirc;u. Ch&iacute;nh v&igrave; vậy, bạn h&atilde;y quay lại những b&agrave;i viết trước kia để hiểu hơn. H&atilde;y dừng lại nếu chưa hiểu về <a href="https://anonystick.com/blog-developer/json-web-token-van-de-xac-thuc-rest-api-voi-jwtjson-web-token-201906074991365" rel="noopener noreferrer" target="_blank">JWT l&agrave; g&igrave;?</a>
	<a href="https://anonystick.com/blog-developer/token-la-gi-va-tai-sao-lai-co-refresh-token-2020010818628894.jsx" rel="noopener noreferrer" target="_blank">Token l&agrave; g&igrave;?</a></p>

<p>V&agrave; c&oacute; một điều nữa đ&oacute; l&agrave; c&aacute;ch hoạt động của token JWT rất kh&aacute;c với Refresh token, t&ocirc;i đ&atilde; từng viết một b&agrave;i viết giải th&iacute;ch rất r&otilde; về c&aacute;ch hoạt động của một token th&ocirc;ng qua một v&iacute; dụ về sinh vi&ecirc;n đi ở trọ đ&oacute; l&agrave; : <a href="https://anonystick.com/blog-developer/authorization-framework-access-token-refresh-token-cung-giong-viec-sinh-vien-thue-nha-tro-2019061161976500" rel="noopener noreferrer" target="_blank">Authorization Framework: Access Token, Refresh Token cũng giống việc sinh vi&ecirc;n thu&ecirc; nh&agrave; trọ</a></p>

<h2>Refresh token l&agrave; g&igrave;?</h2>

<p>
	<br>
</p>

<p>Refresh token thực chất n&oacute; cũng ch&iacute;nh l&agrave; một token. Nhưng n&oacute; kh&aacute;c với Token Auth của JWT về chức năng đ&oacute; l&agrave; Refresh Token chỉ c&oacute; một nhiệm vụ duy nhất đ&oacute; l&agrave; đề lấy một token mới, n&ecirc;&uacute; token được cấp ph&aacute;t cho user hết hạn. Refresh token được cấp cho User c&ugrave;ng với token khi user x&aacute;c thực đầu ti&ecirc;n nhưng thời gian của ch&uacute;ng kh&aacute;c nhau. Với token th&igrave; c&oacute; thể 1 giờ, nhưng Refresh Token l&agrave; c&oacute; khi l&agrave; 10 ng&agrave;y.</p>

<p>
	<br>
</p>

<h2>Refresh token hoạt động như thế n&agrave;o?</h2>

<p>
	<br>
</p>

<p>Trong thực tế của JWT, Refresh token đ&atilde; được giới thiệu để cải thiện quy tr&igrave;nh quản l&yacute; như sau.</p>

<ul>
	<li>M&aacute;y kh&aacute;ch sử dụng t&ecirc;n người d&ugrave;ng v&agrave; mật khẩu để x&aacute;c thực</li>
	<li>M&aacute;y chủ tạo token JWT với thời gian hiệu lực ngắn hơn (v&iacute; dụ: 10 ph&uacute;t) v&agrave; Refresh Token với thời gian hiệu lực d&agrave;i hơn (v&iacute; dụ: 7 ng&agrave;y)</li>
	<li>Khi m&aacute;y kh&aacute;ch truy cập v&agrave;o giao diện y&ecirc;u cầu x&aacute;c thực, n&oacute; sẽ mang Token theo</li>
	<li>Nếu Token chưa hết hạn, m&aacute;y chủ sẽ trả về dữ liệu m&agrave; kh&aacute;ch h&agrave;ng cần sau khi x&aacute;c thực</li>
	<li>Nếu x&aacute;c thực thất bại khi truy cập v&agrave;o giao diện y&ecirc;u cầu x&aacute;c thực bằng Token (v&iacute; dụ: trả về lỗi 401), kh&aacute;ch h&agrave;ng sử dụng Refresh Token để &aacute;p dụng cho Token mới từ giao diện l&agrave;m mới</li>
	<li>Nếu Refresh Token chưa hết hạn, m&aacute;y chủ sẽ cấp Token mới cho m&aacute;y kh&aacute;ch</li>
	<li>M&aacute;y kh&aacute;ch sử dụng Token mới để truy cập v&agrave;o giao diện y&ecirc;u cầu x&aacute;c thực</li>
</ul>

<p>Nh&igrave;n sơ qua ta cũng thấy c&aacute;ch l&agrave;m việc của một Refresh Token kh&aacute;c ho&agrave;n to&agrave;n so với Token được giới thiệu ph&iacute;a tr&ecirc;n.</p>

<p>
	<br>
</p>

<h2>Refresh token được lưu ở đ&acirc;u?</h2>

<p>
	<br>
</p>

<p>Kh&aacute;c với token JWT được lưu ở Cookies, Session, hay localStorage th&igrave; Refresh Token được lưu ở database ở ph&iacute;a server (với t&ocirc;i n&oacute; l&agrave; vậy). V&igrave; sao lại như vậy, v&igrave; Refresh Token sẽ kh&ocirc;ng sử dụng cho việc khi m&aacute;y kh&aacute;ch y&ecirc;u cầu tr&ecirc;n giao diện, v&agrave; n&oacute; chỉ được sử dụng khi một token hết hạn. N&oacute; kh&ocirc;ng ảnh hưởng đến hiệu suất của database, hay li&ecirc;n quan đến việc phản hồi từng y&ecirc;u cầu của Client, n&ecirc;n n&oacute; kh&ocirc;ng cần thiết phải lưu như một token b&igrave;nh thường.</p>

<p>
	<br>
</p>

<h2>Refresh token gi&uacute;p được g&igrave; ngo&agrave;i lấy token mới</h2>

<p>
	<br>
</p>

<p>Kiến tr&uacute;c tr&ecirc;n hay c&ograve;n gọi l&agrave; Refresh Token c&oacute; thể hiểu l&agrave; n&oacute; cung cấp một c&aacute;ch để v&ocirc; hiệu h&oacute;a một token ở một User n&agrave;o đ&oacute; ngay ở ph&iacute;a m&aacute;y chủ. Cụ thể l&agrave; khi user logout, hoặc tồi tệ hơn nữa đ&oacute; ch&iacute;nh l&agrave; &quot;token bị đ&aacute;nh cắp&quot; th&igrave; điều g&igrave; sẽ xảy ra? Mặc d&ugrave; phương ph&aacute;p n&agrave;y sẽ c&oacute; một khoảng thời gian nhất định dựa theo nhiều điều kiện. Nhưng đối với một hệ thống đơn giản th&igrave; sử dụng kiến tr&uacute;c n&agrave;y l&agrave; kh&aacute; ổn rồi. C&ograve;n những hệ thống lớn th&igrave; chưa đủ để đảm bảo việc bảo vệ t&agrave;i nguy&ecirc;n cho người d&ugrave;ng. Th&ecirc;m v&agrave;o đ&oacute; như l&agrave; trustIP...</p>

<p>
	<br>
</p>

<h2>T&oacute;m lại</h2>

<p>
	<br>
</p>

<p>Việc sử dụng <a href="https://anonystick.com/blog-developer/authorization-framework-access-token-refresh-token-cung-giong-viec-sinh-vien-thue-nha-tro-2019061161976500">JWT</a> gi&uacute;p cải thiện hiệu quả của c&aacute;c nh&agrave; ph&aacute;t triển trong việc ph&aacute;t triển c&aacute;c chức năng x&aacute;c thực người d&ugrave;ng, giảm độ phức tạp của kiến tr&uacute;c hệ thống, tr&aacute;nh một số lượng lớn c&aacute;c truy vấn bộ đệm v&agrave; cơ sở dữ liệu v&agrave; giảm độ trễ phản hồi của giao diện doanh nghiệp. Tuy nhi&ecirc;n, những ưu điểm n&agrave;y của JWT cũng l&agrave;m tăng kh&oacute; khăn trong việc quản l&yacute; Token. Bằng c&aacute;ch giới thiệu Refresh Token, kh&ocirc;ng chỉ c&oacute; thể tiếp tục sử dụng c&aacute;c lợi thế do JWT mang lại, m&agrave; c&ograve;n c&oacute; thể l&agrave;m cho t&iacute;nh ch&iacute;nh x&aacute;c của quản l&yacute; Token đ&aacute;p ứng nhu cầu của doanh nghiệp được n&acirc;ng l&ecirc;n một tầm cao mới.</p>

Tổng hợp các bài viết về javascript: https://bit.ly/2YKBvMR