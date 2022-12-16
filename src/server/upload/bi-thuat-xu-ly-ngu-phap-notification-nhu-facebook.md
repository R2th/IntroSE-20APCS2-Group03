Notification đã không còn xa lạ với xã hội 4.0 hiện đại. Từ nền tảng social network cho đến nền tảng ecommerce, từ hệ thống CMS đơn giản cho đến hệ thống CRM phức tạp thì notification đều là một thành phần không thể thiếu. Thế nhưng ở mỗi nền tảng, mỗi hệ thống thì gần như chúng ta lại phải xây dựng lại hệ thống notification từ đầu bởi những thứ được phản ánh trong notification ở mỗi hệ thống là khác nhau.

Ví dụ như facebook có những object user, post, comment,... trong khi shopee lại có object shop, product, order,... và mỗi object lại có những thuộc tính khác nhau. Thế là mỗi khi làm hệ thống notification ta lại phải thiết kế lại DB để phù hợp với từng loại object này. Vậy làm sao để có thể xây dựng một hệ ngữ pháp cho notification mà không phải viết lại từ đầu cho mỗi hệ thống?

Đó chính là thứ mình sẽ đề cập đến trong bài viết này.

![](https://images.viblo.asia/30e805e3-3463-4128-b3d2-a796a4c2eb0c.jpg)

## First things first

Tất nhiên đầu tiên sẽ lại là màn giới thiệu của tác giả: **Minh Monmen** - một Solution Architect kiêm DevOps kiêm Backend kiêm Frontend kiêm đủ thứ. Tuy nhiên hôm nay mình sẽ đóng vai một chuyên gia ngôn ngữ để nói chuyện với các bạn. Mặc dù là hồi xưa mình khá kém tiếng Anh tuy nhiên hy vọng là **tiếng Notification** thì mình sẽ giỏi hơn đủ để các bạn hiểu được bài viết này.

À gần như trong bài viết này mình sẽ ít nói đến khía cạnh công nghệ xử lý kiểu như xử lý queue, bulkwrite,... hay thiết kế hệ thống notification ra sao nhé. Những thứ đó mình đã nói trong những bài viết khác kiểu như series [Nghệ thuật xử lý background job](https://viblo.asia/s/nghe-thuat-xu-ly-background-job-0gdJzvqnJz5) hay series [Chuyện anh thợ xây và write-heavy application](https://viblo.asia/s/chuyen-anh-tho-xay-va-write-heavy-application-24lJDz46KPM). Còn ở đây chúng ta chỉ nói đến cách xử lý ngữ pháp notification thôi.

Ok chưa? Let's go!

## Từ hệ thống notification sơ khai

Hệ thống notification đầu tiên mà mình làm từ 6 năm trước thì là hệ thống notification được tích hợp trong CMS, tức là notification để phục vụ cho admin ấy. Cũng chỉ có duy nhất 1 mục đích cần notification là khi admin xuất báo cáo sẽ cần có thời gian xử lý và sẽ báo lại vô notification. Vào thời đó mình cũng chưa biết gì về ngữ pháp notification nên mình chỉ làm một bản ghi notification đơn giản như sau:

- `user_id`: id của user nhận notification, chính là người dùng CMS ấy
- `type`: loại notification, kiểu như là `report_completed`, `report_failed`,...
- `content`: chứa nội dung notification (nội dung gần như fix cứng theo type)
- `report_url`: url của báo cáo dùng để download khi người dùng click vào notification
- `created_at`: thời gian tạo notification
- `read_at`: thời gian đọc notification

Với nhu cầu là thông báo cho admin khi báo cáo đã được tạo xong thì một bản ghi notification đơn giản như trên cũng đã đáp ứng đủ. Lúc này chưa có mấy cái yêu cầu oằn tà là vằn kiểu như multi language, content chứa data, bôi đậm bôi nhạt,... gì đâu. Cái điểm duy nhất hơi thốn là việc notification này chỉ phục vụ được có 2 mục đích là: **download báo cáo nếu có report_url** hoặc **chỉ mang tính chất thông báo chung chung nếu không có report_url**. 

Sau này mình muốn sử dụng notification cho mục đích khác thì phải thêm cột chứa data cho mục đích mới đó đồng thời code thêm ở frontend xử lý việc click vô noti thì dựa vào type nào để thực hiện hành động gì, lấy data từ field nào,...

Tưởng tượng dùng một hệ thống notification như vầy để phục vụ độ 10 loại notification với 10 loại data khác nhau thôi thì sẽ mất công như nào rồi phải không?

![](https://images.viblo.asia/3de9f6e1-de0f-403b-8781-42e30bbabf82.jpg)

## Cho tới yêu cầu về một hệ thống notification hiện đại

Cho tới khi mình đảm nhận vai trò thiết kế hệ thống notification cho mạng xã hội thì mình mới ý thức được về những yêu cầu của một hệ thống notification hiện đại và tập trung. Hãy cùng điểm qua một vài yêu cầu của bài toán notification giống Facebook này nhé:

- **Chứa thông tin về nội dung**: notification phải có chứa nội dung từ hành động tạo ra nó. Ví dụ như: **Người dùng A đã thích bài viết của bạn**. Trong đó **Người dùng A** là thông tin từ hành động.
- **Có thể thay đổi nội dung noti**: nội dung noti có thể thay đổi khi thông tin bên trong thay đổi. Ví dụ như khi thêm 1 người dùng vào thì nội dung noti sẽ thay đổi thành **Người dùng A, B, C, D đã thích bài viết của bạn**, rồi người dùng đổi tên, người dùng bỏ like,...
- **Có khả năng gộp nhiều hành động vào 1 noti**: nếu có nhiều hành động tương tự xảy ra trong 1 khoảng thời gian ngắn thì notification sẽ được gộp lại thành 1 noti. Ví dụ như: **Người dùng A, B, C đã thích bài viết của bạn**.
- **Multi language**: notification phải có thể hiển thị được với nhiều ngôn ngữ khác nhau. Tất nhiên là **không đồng thời** mà sẽ dựa vào ngôn ngữ của từng người dùng tại 1 thời điểm.
- **Format được**: Chí ít là có thể in đậm được thông tin quan trọng trong noti. Ví dụ như: "**Người dùng A** đã thích bài viết của bạn".
- **Có thể click vào noti để thực hiện hành động gì đó**: khi click vào noti thì người dùng có thể được dẫn tới trang chi tiết bài viết chẳng hạn.

Một điều lưu ý quan trọng là mọi yêu cầu phía trên đều dẫn đến việc bạn phải có khả năng **rebuild** notification từ các thông tin bên trong. Tức là các thông tin bên trong notification phải đủ để bạn có thể rebuild lại notification đó như là user_name, image, post_name,... Các bạn nhớ để ý chi tiết này nhé vì đây là điểm khác biệt lớn nhất giữa 1 hệ thống kiểu cũ chỉ sinh notification dạng text (không có khả năng rebuild) và 1 hệ thống hiện đại.

Rút kinh nghiệm từ việc thiết kế hệ thống notification đơn giản ở trên thì mình đã bỏ field `report_url` ở trên và thay bằng 1 object là `data`. Field `data` này sẽ chứa các loại thông tin khác nhau tùy vào loại notification mà mình cần. Ví dụ như sẽ có: `post_id`, `comment_id`, `user_id`, `user_name`,... 

Mọi chuyện đều tốt cho đến khi số loại notification và data trong đó bùng nổ dẫn đến việc cái field `data` của mình nhìn như 1 đống lộn xộn với vài chục property khác nhau cho từng loại noti. Và đây sẽ là vẻ mặt của bạn khi muốn biết: **Giờ khi 1 user like bài viết của mình thì cần thông tin từ field nào**:

![](https://images.viblo.asia/ba1dd4f6-24ae-4788-9080-f05538a8e5dc.gif)

## Event grammar và ngữ pháp cho notification

May thay khi gặp phải vấn đề này thì mình chợt nhớ tới 1 bài viết mình đã đọc từ lâu về việc xây dựng cấu trúc dữ liệu cho hệ thống analytic (cụ thể là lưu dữ liệu cho các event): [Scaling Your Analytics Schema Using Events Grammar](https://developerzen.com/choosing-an-analytics-schema-scales-using-events-grammar-939578a2a8de). Bài viết này thì được lấy cảm hứng từ một bài viết khác của trang **snowplow.io** khi họ xây dựng hệ thống universal analytic để phục vụ nhiều nhu cầu cho nhiều sản phẩm khác nhau. Link bài viết đó đây: [Towards universal event analytics – building an event grammar](https://snowplow.io/blog/towards-universal-event-analytics-building-an-event-grammar/). Tác giả cũng đã gặp một bài toán tương tự khi phải xử lý quá nhiều loại event với nhiều loại data khác nhau khiến việc lưu trữ cũng như nhớ được **event này dùng data nào** trở nên khó khăn. 

Trở lại với bài toán của mình thì bản chất của hệ thống notification cũng là một event-based system. Tức là notification cũng được sinh ra từ các event và phản ánh thông tin của event. Do đó cái gọi là **event grammar** chắc chắn cũng có thể dùng luôn được cho notification. Voala, quả là mặt trời chân lý chói qua tim đấy :D.

Về cơ bản thì ý tưởng của event grammar được lấy từ ngữ pháp của ngôn ngữ mà chúng ta vẫn thường nói hàng ngày (mà cụ thể với tác giả bài viết trên thì là tiếng anh). Trong đó 1 câu được hình thành từ 6 thành phần sau:

![](https://images.viblo.asia/608a9019-7e7d-49ff-b15a-0ef40148dffd.png)

6 thành phần đó bao gồm:

- **Subject**: Chủ thể gây ra hành động
- **Verb**: Động từ thể hiện hành động
- **Direct Object**: Đối tượng bị tác động chính của hành động
- **Indirect Object**: Đối tượng phụ bị ảnh hưởng bởi hành động
- **Prepositional Object**: Đối tượng có mặt trong hành động thông qua một giới từ (in, for, of,...). Kiểu 1 object có liên quan tới hành động thôi.
- **Context**: Hoàn cảnh xảy ra hành động, có thể bao gồm thông tin trả lời cho các câu hỏi: **Where?**, **When?**, **How?**

Một số ví dụ được đề cập trong bài viết của **snowplow** sẽ giúp các bạn hiểu hơn về cách phân tách một event thành các thành phần trên. Hãy chú ý hình dạng của các thành phần trong từng example map với grammar ở trên nhé:

**Ví dụ trong e-commerce:**

![](https://images.viblo.asia/0b7bd16a-576a-4ead-bfd4-64d93d892bda.png)

![](https://images.viblo.asia/0b7bd16a-576a-4ead-bfd4-64d93d892bda.png)

![](https://images.viblo.asia/6e414c1b-93b0-4d9d-b9d9-ace24f9932f0.png)

**Hay social network:**

![](https://images.viblo.asia/6ebc6b19-cded-4056-82b5-7536b2643375.png)

![](https://images.viblo.asia/502937a6-c03b-494d-98ff-b9bdf37739d0.png)

![](https://images.viblo.asia/1d6cddea-ac51-4f34-89e5-c79402dee4e1.png)

**Hay trong game luôn:**

![](https://images.viblo.asia/47f40d2d-dda0-4be9-bcb5-eeec2b028d5d.png)

![](https://images.viblo.asia/0ec15af0-6622-4d85-a4a7-76c412ceba94.png)

![](https://images.viblo.asia/8864f5e8-5dc4-4efc-8bb7-d8641c2469dd.png)

Về cơ bản thì hệ event grammar trên đã phản ánh đúng những thứ mà một hệ thống notification cần diễn đạt luôn rồi =))). Tuy nhiên, để phù hợp hơn với yêu cầu bài toán của mình về khía cạnh **gộp nhiều thông báo làm một** thì mình sẽ có thay đổi 1 chút. Phần data cho notification sẽ gồm những thông tin sau:

- **subjects**: 1 list các chủ thể gây ra hành động
- **subject_count**: số lượng chủ thể. Field `subjects` sẽ không thể lưu hết toàn bộ số chủ thể của hành động (có thể lên tới hàng nghìn) mà chỉ lưu đại diện 1 số lượng nhất định. Do đó sẽ cần 1 field riêng để lưu số lượng chủ thể thật sự.
- **di_object**: Đối tượng bị tác động chính của hành động
- **in_object**: Đối tượng phụ bị ảnh hưởng bởi hành động
- **pr_object**: Đối tượng có mặt trong hành động thông qua một giới từ (in, for, of,...).

Mỗi loại object hay subject phía trên sẽ là 1 object có cấu trúc như sau:

- **id**: id của object
- **name**: tên của object. Đối với user thì là tên, đối với bài post hay comment thì là trích dẫn,...
- **type**: loại object
- **image**: ảnh đại diện cho object

Ở đây thì mình không cần verb nữa vì type của notification cũng đã phản ánh thông tin này rồi. Ngoài ra context cũng không cần thiết bởi các thông tin về thời gian, địa điểm đã có các field khác lưu lại rồi.

Tới đây thì mình có thể dùng 1 template engine để tạo ra notification từ những thông tin trong data như sau (trong ví dụ này mình sử dụng template [mustache](mustache.github.io/) nhưng thông qua thư viện [handlebars](handlebarsjs.com/) để có thể thêm nhiều logic vào template):

```
{{ subjects[0].name }} đã thích bài viết của bạn.

~> Monmen đã thích bài viết của bạn.

{{ subjects[0].name }} đã bình luận vào bài viết trong {{ pr_object.name }}.

~> Monmen đã bình luận vào bài viết trong Group nhí nhố.

{{ subjects[0].name }} đã trả lời bình luận của {{ in_object.name }} trong {{ pr_object.name }}.

~> Monmen đã trả lời bình luận của Thỏ bảy màu trong Group nhí nhố
```

Bỗng nhiên việc viết template trở nên khá dễ dàng và không bị rối loạn bởi data type do mình đã sử dụng một cấu trúc câu tương tự như khi chúng ta nói chuyện vậy. Tới đây thì việc mất công nhất các bạn phải làm đó là transform data của từng event thành data của notification bằng cách map đâu là subject, đâu là direct object, đâu là indirect object,... Còn sau khi đã map xong rồi thì mọi thứ đã trở nên dễ dàng và dễ hiểu hơn rất nhiều.

## Gộp nhiều notification làm một

Để làm được điều này thì điều quan trọng nhất các bạn cần thiết kế đó là 1 chiếc **key** dùng để biết những notification nào sẽ được gộp với nhau. Và chiếc key này cần có tính chất quan trọng đó là **unique** để cho phép notification được ghi đè lên nhau. Chí ít là unique với từng user.

Ví dụ: đối với 1 user thì tất cả like dành cho 1 bài post phải được gộp vào với nhau chẳng hạn. Vậy thì **key** ở đây sẽ gồm có các yếu tố:

**<type>** + **<post_id>** + **<user_id>**

Trong đó **user_id** là id của người nhận notification (cũng là chủ post), **type** là `like_post` chẳng hạn. Như vậy thì nếu có 10 user vào like chung 1 post của user A thì user A cũng chỉ nhận được 1 chiếc notification thôi.

- User B like post của User A
~> Tạo 1 notification có key là: `like_post:post_123:user_A` và nội dung `User B đã thích bài viết của bạn` cho user A. Lúc này thì user B sẽ là `subjects[0]`

- User C like post của User A
~> Thêm user C vào subjects đầu tiên của noti có key là `like_post:post_123:user_A`, lúc này mảng `subjects` sẽ gồm user C (index 0) và user B (index 1), `subject_count=2` và chúng ta sẽ compile lại template để có notification mới ghi đè lên noti cũ với nội dung: `User C và 1 người khác đã thích bài viết của bạn`.

À quên để template nhận được nhiều subject như trên thì cần thay đổi chút chút như sau:

```
{{ subjects[0].name }}{{#if (gt subject_count 1) }} và {{ math subject_count '-' 1 }} người khác{{/if}} đã thích bài viết của bạn.

~> Monmen và 2 người khác đã thích bài viết của bạn.
```

> Trong này mình có đăng ký 2 thêm custom helper vào handlebars là `gt` để check xem subject_count có lớn hơn 1 không và `math` để thực hiện việc tính toán trừ subject_count đi 1 đơn vị (chính là thằng được nêu tên trong noti).

Xong, giải quyết được yêu cầu về gộp notification.

Một lưu ý quan trọng khi các bạn đặt unique key đó là mỗi loại notification sẽ có 1 cái logic unique hoàn toàn khác nhau, nên mình sẽ thường **combine hết các yếu tố cần unique vào làm 1 key dạng string hoặc buffer** để lưu trong DB. Và kinh nghiệm xương máu của mình đó là hãy cố làm **unique key này càng nhẹ càng tốt**, hãy viết tắt rồi dùng buffer nếu có thể bởi vì sẽ cần 1 chiếc unique index rất to để chứa toàn bộ cái key này. Khi bảng notification của các bạn lên tới vài chục hay vài trăm triệu record thì 1 vài byte các bạn tiết kiệm được khi tạo key cũng đáng giá cả Gigabyte RAM cho index đấy nhé.

## Xử lý multi language

Động tới multi language thì các bạn thường nghĩ ngay tới i18n các thứ đúng không? Có rất nhiều cách để đạt được yêu cầu về multi language. Ví dụ như:

- **Chỉ trả về toàn bộ raw data, client sẽ làm nhiệm vụ build notification với i18n** (có bên đã làm thế này đó nhé =)))
~> Rất không khả thi, gây gánh nặng cho client, không phù hợp với các hệ thống push, mỗi khi có type noti mới lại phải sửa code client
- **Build notification theo language trong từng request của client dựa vào header `Accept-Language`**
~> Mặc dù có phản ứng nhanh với việc thay đổi ngôn ngữ của user tuy nhiên vẫn là không khả thi, gây gánh nặng cho hệ thống notification **khi read data** và không phù hợp với hệ thống push từ server (do lúc push thì làm gì có request nào từ client mà biết language). Ngoài ra cũng tiềm ẩn rủi ro lỗi khi compile trong lúc gọi API.
- **Build sẵn notification cho từng language và trả về theo request của client**
~> Hệ thống không bị nặng khi read nữa nhưng mà lại lưu thừa quá nhiều data và nặng khi tạo notification. Giả mà hệ thống có chục cái ngôn ngữ thì cũng ối zồi ôi. Loại.
- **Build notification cho 1 ngôn ngữ và trigger compile lại khi user thay đổi ngôn ngữ**
~> Cách này thì tốn nhiều công sức nhất, cũng chỉ phù hợp với hệ thống có lưu lại cài đặt ngôn ngữ của người dùng. Ngoài ra cũng phải xử lý event thay đổi cài đặt ngôn ngữ để compile lại nên notification có thể không được thay đổi ngay sau khi user đổi ngôn ngữ. Tuy nhiên đây là cách phù hợp nhất với mình và về cơ bản là giảm được cả gánh nặng khi đọc (chỉ đọc từ DB ra không cần làm gì) và khi ghi (chỉ compile 1 ngôn ngữ). Cái nặng nề là compile lại toàn bộ noti của user khi thay đổi ngôn ngữ thì cũng không xảy ra thường xuyên.

Việc dịch template thì tương đối dễ dàng. Kể cả chia động từ (nếu ngôn ngữ là tiếng anh) thì cũng có thể xử lý qua if else của handlebar rồi.

## Xử lý format

Gọi là format cho nó to chứ thật ra là noti cũng thường chỉ cần mỗi việc in đậm thôi. Giải pháp đầu tiên mà anh em đều nghĩ đến đó là template HTML. Tức là thay vì 1 cái template text thông thường thì sẽ thêm mấy cái thẻ `<b>` vào và báo client hiển thị dạng HTML là xong:

```
<b>{{ subjects[0].name }}{{#if (gt subject_count 1) }} và {{ math subject_count '-' 1 }} người khác{{/if}}</b> đã thích bài viết của bạn.

~> <b>Monmen và 2 người khác</b> đã thích bài viết của bạn.
```

Đơn giản đúng không? Thế nhưng sử dụng template html sẽ gặp một số vấn đề như sau:

- **Web thì hiển thị html dễ, nhưng mobile thì không, bôi đậm trên mobile trong các ui element cần có xử lý riêng.**
- **Xảy ra vấn đề về XSS nếu render noti dạng html. Nếu backend escape trước thì mobile hiển thị không đúng, mà backend không escape thì bên web hiển thị html lại dễ bị tấn công XSS.**
- **Cần tách text riêng để push notification. Cái này thốn nè. Giờ lại phải bóc text từ cái tụi html kia để nhét vô firebase push do cái push của firebase làm gì có hiển thị html đâu.**

Một số bên thì sẽ phải chơi dạng 1 content dạng text, 1 content dạng html (ví dụ như chính Viblo đây, các bạn có thể bật F12 lên xem request nhá =))) để giải quyết vấn đề này (mà thật ra là cũng chưa giải quyết được triệt để với trường hợp của mobile phải hiển thị html). 

Bí quá thì tất nhiên là đi xem người khổng lồ làm thế nào rùi. Mở facebook và inspect xem ông lớn làm thế nào xem sao.

```json
{
	"body": {
		"delight_ranges": [],
		"image_ranges": [],
		"inline_style_ranges": [],
		"aggregated_ranges": [],
		"ranges": [
			{
				"entity": {
					"__typename": "User",
					"id": "xxx",
				},
				"entity_is_weak_reference": false,
				"length": 10,
				"offset": 0
			}
		],
		"color_ranges": [],
		"text": "Hồ Sỹ Nghi likes your photo: \"Mặc dù mình là người hay chém gió,...\""
	}
}
```

Ồ, anh Mark chơi một bài gọi là **decorators**, nôm na là content của notification thì vẫn là text bình thường, nhưng sẽ có 1 mảng đi kèm chứa các vị trí cần đánh dấu và độ dài của nó. Các bạn hãy nhìn trường `ranges` có 2 field là `offset` và `length` nhé. Tương ứng với việc bắt đầu từ **offset 0** với **độ dài 10 ký tự** sẽ được bôi đậm (chính là độ dài của từ **Hồ Sỹ Nghi**).

Ngoài ra có rất nhiều field khác cũng theo kiểu `ranges` như trên được mình gọi chung là các **decorators**, tức là những thông tin mang tính **trang trí** cho nội dung chính là `text`.

Ngẫm lại thì cách làm này công nhận là rất hay, vừa giải quyết được bài toán hiển thị trên cả web và mobile, vừa hạn chế được việc dính vào html và XSS, lại vừa có thể tách được phần text ra một cách dễ dàng mà không cần phải lưu đồng thời cả bản html. Yolo việc của chúng ta chỉ là đứng trên đôi vai của người khổng lồ bằng cách học theo thôi =))).

> Việc tách 1 mảng ranges được bôi đậm bao gồm offset và length nhìn thì tưởng phức tạp nhưng thực ra là **cực kỳ đơn giản** với sự trợ giúp của **regex**. Mình hoàn toàn có thể dùng template như cũ, qua 1 bước xử lý nhẹ là đã có kết quả như mong muốn rồi.
    
Giờ notification của mình sẽ có dạng:
    
```json
{
    "content": "Monmen đã bình luận vào bài viết của Viblo",
    "highlights": [
        {
            "offset": 0,
            "length": 6
        },
        {
            "offset": 37,
            "length": 5
        }
    ]
}
```
    
~> **Monmen** đã bình luận vào bài viết của **Viblo**

Thiết kế này cực kỳ hữu dụng đó các bạn, giúp mình không chỉ trong việc xây dựng notification mà còn trong cả các hệ thống chat, bài viết,... khi muốn thêm các thể loại thông tin markup khác nhau vào văn bản mà vẫn giữ nguyên được tính toàn vẹn của văn bản ban đầu (về độ dài, vị trí các ký tự,...).

## Handle action khi click vào noti

Tới đây chúng ta chỉ còn một vấn đề cuối cùng để đáp ứng hết các yêu cầu đã đặt ra là việc handle action khi click vào noti sẽ được xử lý ra sao với việc mỗi noti lại có data khác nhau và action cũng khác nhau. Một cách xử lý truyền thống là client sẽ dựa vào type của noti để xác định xem khi click vào thì sẽ xử lý thế nào. Tuy nhiên cách xử lý này có một nhược điểm cực kỳ to lớn là việc nó sẽ yêu cầu client phải update mỗi khi có thêm 1 type noti mới. Điều này là không thể chấp nhận được vì nó sẽ làm cho client phải update liên tục và không thể đảm bảo được tính tương thích của các phiên bản client. 

Thêm vào đó thì client lại phải làm thêm một việc là xác định xem với type này thì sẽ cần dùng data từ field nào để xử lý. Ví dụ muốn vào detail 1 bài post thì phải lấy được `post_id` từ notification vậy. 

Để giải quyết được vấn đề này thì mình đã sử dụng một phương thức có tính tổng quát cao hơn đó là xử lý dựa trên url. Với mỗi một notification giờ đây sẽ đi kèm với 1 url được xác định sẵn từ lúc compile noti và việc cuả client chỉ là mở url này lên mà thôi.

Ví dụ:

- **User A đã thích bài viết của bạn** ~> url = `/posts/<post_id>`.
- **User A đã thích comment của bạn trong bài viết X** ~> url = `/posts/<post_id>?comment_id=<comment_id>`.
- **User A đã gửi cho bạn lời mời kết bạn** ~> url = `/users/<user_id>`.
...

Kiểu như vậy. Với mobile để xử lý được các url nội bộ này thì cũng phải implement một cơ chế gọi là **deeplink**, cho phép mở một màn hình nào đó của app bằng url. Ví dụ như với url có dạng: `fb://posts/<post_id>` thì sẽ mở màn hình detail của post với id đó lên. Nếu cao cấp hơn và để đồng bộ giữa bản web và mobile thì các bạn tìm hiểu thêm về **universal link** nữa nhé. Universal link cho phép dùng link web dạng `http://` để điều hướng như một **deeplink** và sẽ thống nhất trên cả nền tảng web và mobile.

Với cách xử lý này thì gần như client không cần phải xử lý gì thêm mỗi khi mình có thêm type notification mới hay action mới (chỉ cần xử lý khi có màn hình mới và loại deeplink mới thôi). Kỹ thuật này phù hợp cho cả bản web, mobile và cả action khi push notification từ firebase.

## Tổng kết

Với thiết kế hệ thống notification như trên, mình đã có thể đáp ứng được hết các loại notification cho hệ thống mạng xã hội, e-commerce, cms,... chỉ với một lần thiết kế. Hệ thống này có thể được tách thành service riêng và dùng lại cho nhiều dự án khác nhau mà không cần phải thiết kế lại làm gì.

Ngoài ra event-grammar còn là kỹ thuật được mình ứng dụng trong nhiều phần khác nhau của hệ thống như hệ thống event-source nội bộ, hệ thống tracking, analytics,... để tổ chức data một cách tổng quát hơn.

Hy vọng qua bài viết này các bạn đã có cho mình một ý tưởng để làm hệ thống notification **một lần và dùng mãi** nhé. 

Tạm biệt.

**p/s: Nếu các bạn có câu hỏi hãy comment và nhớ upvote nếu thấy hay và hữu ích nha.**