Bí quyết thành công trong việc đáp ứng hệ thống triệu user của những công ty lớn (và cả công ty nhỏ). Tại sao caching lại là kỹ thuật tối quan trọng để phù phép ứng dụng rùa bò của chúng ta thành siêu phẩm vạn người mê?

Chắc chắn sẽ không phải nói quá khi khẳng định **caching là kỹ thuật mà mọi developer đều cần phải biết**. Từ backend tới frontend, từ web app tới mobile, hay thế giới mới lạ của ML và AI, blockchain... đều có sự tham gia của những thành phần làm nhiệm vụ caching. Caching có thể xuất hiện dưới hình thức to lù lù như dàn CDN ta hay thuê, hay nhỏ tí nị như chiếc bộ nhớ L1 của CPU. 

Có lẽ vì vậy mà chỉ cần search google với các từ khóa liên quan tới caching là ngay lập tức bạn sẽ bị choáng ngợp bởi số lượng kết quả và kiến thức liên quan. Vậy thì có cách nào để biết **mình đang ở đâu** trong thế giới cache bao la rộng lớn này, cũng như biết với **level của mình hiện tại** thì **tiếp cận loại cache gì là phù hợp** không?

Câu trả lời, tất nhiên là có, và đó chính là điều mà series **Caching đại pháp** của mình truyền tải. Đây không phải là một series blog show off công nghệ hay sách giáo khoa giới thiệu cho các bạn mọi loại cache có trên đời mà là **một con đường** mình đã đi qua. Giờ đây các bạn có thể đi theo (hoặc tham khảo cho vui) để từng bước nâng cao trình độ bản thân.

![](https://images.viblo.asia/d2b7c4de-4e8e-4f7b-810b-12ddcf749779.jpg)

## First things first 

Nhưng trước tiên, hãy tạm thời bình tĩnh, rót chén nước trà và nhâm nhi để tìm hiểu 1 chút về tác giả và nguồn gốc lịch sử của series này.

Tác giả, tất nhiên là mình, **Minh Monmen** trong sự cố gắng làm thế giới trở nên tốt đẹp hơn (xàm xí thôi) bằng cách viết ra những bài viết **có thể làm theo** và **có thể học hỏi / chửi bới** hơn là những bài viết mang tính chất giới thiệu công nghệ khủng hay những hệ thống phức tạp của các công ty lớn.

Còn series này? Tất nhiên là được ra đời từ nhiều đêm trăn trở và nhiều lần được nghe câu hỏi: **Ứng dụng của tôi chậm thế này, tôi phải làm thế nào?** rồi. 

Thật ra thì series này cũng nằm trong kế hoạch năm 2021 của mình, chen giữa series mình đang thực hiện gần đây là [Performance Optimization Guideline](https://viblo.asia/s/performance-optimization-guideline-DVK2jDQ2KLj). Nếu bạn nào theo dõi thì sẽ biết bài tiếp theo của series đó sẽ là:

- Performance Optimization 106: Caching optimization - Con đường lắm chông gai

Bài viết tới này mình sẽ nêu lên những vấn đề về mặt performance khi động chạm tới hệ thống caching. Tuy nhiên điều mà mình vẫn băn khoăn là **làm thế nào để người ta có thể tối ưu được hệ thống caching**, trong khi còn **chưa có hiểu biết đầy đủ về nó?**. Chính vì vậy, series **Caching đại pháp** này được ra đời trước bài viết kia để chuẩn bị cho các bạn những kiến thức cần thiết để tiếp cận bài viết của mình hiệu quả hơn.

Nội dung của series [**Caching đại pháp**](https://viblo.asia/s/caching-dai-phap-QqKLvpNbl7z) này sẽ bao gồm 3 phần (dự kiến):

- **Caching đại pháp 1: Nấc thang lên level của developer** <~ YOU ARE HERE
- [Caching đại pháp 2: Chọn cache thế nào cho hợp lý](https://viblo.asia/p/caching-dai-phap-2-cache-the-nao-cho-hop-ly-ByEZkawE5Q0)
- Caching đại pháp 3: Vấn đề và cách giải quyết

Hãy bắt đầu với phần đầu tiên: **Nấc thang lên level của developer** trước nhé.

## Level 0: Những concept cơ bản

Đôi điều về **tất cả các loại cache** mà bạn cần phải hiểu:

- Caching là hành động **lưu trữ lại** kết quả của **action tốn thời gian** để phục vụ việc **sử dụng lại nhanh hơn**. Đây theo mình là định nghĩa ngắn nhất và đi vào trọng tâm nhất về caching. Nếu nắm định nghĩa này không chắc thì các bạn rất dễ bị đầu độc bởi những hiểu lầm kiểu caching là redis, caching là lưu trên ram,... Hãy nhớ 3 từ khóa: **lưu trữ lại**, **action tốn thời gian** và **sử dụng lại nhanh hơn**.
- Bộ nhớ cache thường có dạng **key-value** (Vì sao lại có dạng key-value thì là bởi vì độ phức tạp để tìm data trong KV store thường là O(1)):
    + Hashmap trong code
    + Key-value database (redis, memcache,...)
    + File (với key là filename)
- Bộ nhớ có dạng key-value do đó **operation cơ bản** với cache sẽ gồm:
    + Get (by key)
    + Set (by key)
    + Delete (by key)
- 1 value được lưu vào cache thường đi kèm với tham số **TTL - Time To Live**, tức là cái hạn sử dụng để loại bỏ value này khỏi cache. Giữ cho data tươi mới và giải phóng dung lượng cho cache.
- Vấn đề chung mà mọi loại cache phải xử lý: **Stale data**, tức là data không đúng với data gốc.

Xong, đây là những đặc điểm chung của mọi loại cache mà bạn cần phải nhớ. Còn đây là tiêu chí để xem xét **có cần cache cái này không**:

- **Tốn nhiều time / resource**
- **Kết quả dùng lại được nhiều lần**

Đây cũng là điểm tối quan trọng, luôn giữ trong đầu 2 tiêu chí này để xác định có cần cache không nhé. Ví dụ:

- Data get từ DB mất 500ms nhưng chỉ request 1 lần trong 1 trang khỉ ho cò gáy không ai vào ~> **chưa cần cache**
- Đoạn CSS build mất 100ms nhưng tất cả user đều phải load ~> **cần cache**

## The bigger picture

Bức tranh tổng quan về hệ thống caching thường gặp do mình tự vẽ từ kiến thức của bản thân, do đó còn nhiều thiếu sót rất mong các bạn có thể góp ý bổ sung thêm.

![](https://images.viblo.asia/9855d467-f0b8-4022-b974-bf706863c35c.png)

Ở đây các bạn có thể nhìn thấy 4 layer chính khi nói tới 1 application phổ biến là: Client side, proxy, application và database. Tại mỗi layer này thì đều có những hệ thống cache tương ứng và chúng ta có thể có các mức độ kiểm soát khác nhau. Ngoài ra còn 1 layer ẩn chính là lớp OS / Kernel mà dev cỏ chúng ta gần như không kiểm soát được.

**Client side:** là layer tại device của người dùng (mobile app, browser)

Đặc điểm: Caching phục vụ trải nghiệm của **1 người dùng**. Do đó việc cache cái gì và cache bao lâu sẽ phục vụ trải nghiệm người dùng chứ không phải hệ thống.

Tại lớp này chúng ta có **1 phần quyền kiểm soát** thông qua việc:
- Đặt HTTP header để control cache của request (hên xui)
- Configuration cache HTTP request trong lib
- Implement cache chủ động vào local storage

*1 phần quyền kiểm soát* là do các hoạt động tương tác với cache sẽ tốn thời gian, công sức và khó sửa chữa khi có vấn đề xảy ra.

**Proxy / LB:** là các layer trung gian trước khi request của người dùng tới được application của chúng ta. Các lớp này có thể là CDN, Reverse proxy, Gateway,...

Đặc điểm: Caching tại các lớp trung gian chủ yếu phục vụ **content tĩnh** cho **số lượng lớn người dùng**.

Tại lớp này chúng ta có **phần lớn quyền kiểm soát** thông qua việc:
- Đặt HTTP header để control cache của request
- Configuration cache HTTP request trên các server trung gian

*Phần lớn quyền kiểm soát* là do việc tương tác với cache có thể thực hiện 1 cách tự động, tuy nhiên sẽ tốn công sức và bị phụ thuộc vào bên thứ 3 khi muôn giải quyết các vấn đề xảy ra.

**Application:** là lớp cache tại application.

Đặc điểm: Caching phục vụ **content động** cho **số lượng lớn người dùng**.

Tại lớp này chúng ta có **toàn quyền kiểm soát** thông qua việc:
- Configuration các addon / plugin có sẵn
- Implement cache chủ động

*Toàn quyền kiểm soát* là việc chúng ta chủ động quyết định cache cái gì, ở đâu và dễ dàng tương tác, chỉnh sửa,... hệ thống cache do hệ thống này hoàn toàn vô hình với người dùng và ít bị phụ thuộc vào bên thứ 3.

**Database:** là lớp cache tại database.

Đặc điểm: Caching phục vụ **truy xuất dữ liệu**.

Tại lớp này, mình chỉ xem xét các bạn là những **người dùng database**, do đó các bạn cũng sẽ chỉ có **1 phần quyền kiểm soát** đối với việc database sẽ cache thứ gì hay như thế nào thông qua:
- Config query cache
- Config memory usage

*1 phần quyền kiểm soát* là việc chúng ta chỉ có thể coi database là 1 cái blackbox và optimize dựa trên các thông số được recommend của nhà cung cấp.

**OS / Kernel:** là lớp cache của OS/ Kernel xuất hiện tại mọi thành phần của hệ thống.

Đặc điểm: Caching phục vụ **xử lý dữ liệu**.

Tại lớp này, chúng ta gần như **không có quyền kiểm soát** đối với việc OS sử dụng các bộ nhớ để cache ra sao. Đối với phần lớn developer thì cũng chưa cần phải đi sâu vào lớp này nhiều làm gì. Tối ưu tại lớp này thường liên quan tới **Micro-optimization** và chưa thật sự cần thiết với chúng ta.

## Level 1: Monolith webpage with single server

Mới tập tọe làm web, chắc các bạn cũng sẽ như mình, sẽ bắt đầu với những ứng dụng **kiểu cũ**: monolithic, chạy trên 1 server, render data html,... Chúng ta hãy cùng phân tích 1 chút về đặc điểm ứng dụng tại level này nhé:

- Chủ yếu là các trang tin tức, bài viết, CRUD... có thể là tự code hoặc sử dụng sản phẩm có sẵn như wordpress, joomla,...
- Server side render, tức là HTML + data được render sẵn trên web server chứ không dùng mấy kiểu framework JS mới mới như React hay Vue
- Html template, static js, css lưu trong DB hoặc sử dụng view engine
- Hệ thống đang chạy sẵn, do đó yếu tố **tận dụng những thứ có sẵn** và **ít thay đổi hệ thống** rất quan trọng.
- Ưu tiên trải nghiệm của 1 user do hệ thống chưa quá nặng về scale.
- Data còn khá nhỏ

Đây là những thứ mà ứng dụng này bị chậm:

- 1 trang html có thể được tạo thành từ 10-50 query DB, độ trễ 2-3s
- Media data (image / video) trên trang load chậm làm trang bị trắng khoảng 2-10s

Đây là những thứ mình sẽ tối ưu bằng caching:

![](https://images.viblo.asia/72cf632c-67ce-4e35-b2aa-7330d898c9a5.png)

Cụ thể:

![](https://images.viblo.asia/05e9f2dd-65a1-4a9b-8c34-494be4119b9c.png)

1. **Enable query cache trong DB** 

Các loại RDBMS như MySQL, PostgreSQL,... đều có cơ chế query cache ngay trong DB, chỉ cần config bật lên là được. Các bạn có thể google search về từng loại database cache với từ khóa **<db-name> cache**

Các ứng dụng ở level này có mức độ reuse query rất cao giữa các user cũng như cùng 1 user request trang có nhiều phần lặp lại. Phần này không cần control quá nhiều ở data cache nên có thể dùng luôn query cache trong DB.

1 điểm nữa để các bạn consider DB cache là data size của bạn. Nếu data size còn nhỏ và có thể chứa toàn bộ data trong RAM của DB thì bật Query cache là đủ.

Ví dụ bật cache trên MySQL:

```markdown
MariaDB [(none)]> SET GLOBAL query_cache_type = 1;
Query OK, 0 rows affected (0.00 sec)
```

2. **Enable cache css, js, html template bằng file**

Sử dụng file để làm cache cho các thành phần phải render từ DB. 

**Ưu điểm:** 
- Zero dependencies, gần như application nào cũng có thể dùng được.
- Được framework hỗ trợ tận răng. Nhất là mấy ứng dụng kiểu wordpress hay xenforo cũng sử dụng loại cache này để tăng tốc site. Các bạn nhiều khi chẳng cần làm gì mà chỉ enable nó lên là xong. Với các application dựng từ framework thì việc bật cache file lên cũng khá dễ dàng.

3. **Cache full page hoặc 1 phần page html bằng file**

Wordpress, xenforo,... đều đã có plugin. Các framework sử dụng view engine cũng hỗ trợ cache result html.

> 1 hiểu lầm cơ bản là các bạn coi thường file cache và nghĩ cứ disk IO là chậm (so với redis chẳng h ạn). Nhưng nên nhớ rằng Redis nếu chạy trên server riêng thì bạn sẽ so sánh tốc độ của **disk IO local file** và **network tới server redis** (chứ không phải disk IO và memory nhé). Chưa biết mèo nào cắn mỉu nào đâu.

Ví dụ việc cache full page trên laravel:

```php
class NewsController extends Controller {
    public function index() {
        if ( Cache::has('news_index') ) {
            return Cache::get('news_index');
        } else {
            $news = News::all();
            $cachedData = view('news.index')->with('news', $news)->render();
            Cache::put('news_index', $cachedData);                                         
            return $cachedData;           
        }  
    }
}
```

4. **Serve media bằng CDN**

Các bạn đẩy các file media như video,image,... ra các CDN (Content Delivery Network). Bản chất CDN là các hệ thống cache theo vị trí địa lý, giúp người dùng ở VN hay người dùng US khi request media file cho ứng dụng đều không bị chậm. Đây là thứ ảnh hưởng rất lớn đến trải nghiệm của người dùng trên ứng dụng, do đó cũng cần được xem xét để tách ra ngay từ những bước tối ưu đầu tiên.

Để sử dụng được CDN cho media thì các bạn phải làm mấy việc:

- Tách việc upload media file ra hệ thống riêng hoặc routing riêng (domain riêng). Thời nay anh em hay sử dụng các hệ thống base trên S3 của AWS để chứa file media.
- Cấu hình CDN (mua dịch vụ hoặc free như cloudflare) để serve media file

Có rất nhiều các nhà cung cấp S3-like storage trên thế giới như AWS, GCP, Digital Ocean,... hay tại VN như các công ty làm cloud. Bạn có thể tùy ý lựa chọn.

**Kết quả:** Thời mới đi làm mình đã sử dụng file cache để tối ưu 1 trang báo xây dựng bằng xenforo, giúp giảm thời gian load 1 trang html từ 2s xuống 200ms, giảm thời gian load toàn bộ trang từ 18s xuống 8s bằng việc bật cache lại các query result, các html part trong 1 page và sử dụng CDN cho media file. Những action này can thiệp rất ít tới code hệ thống, chủ yếu là config và cài đặt plugin.

## Level 2: Monolith webpage with multiple server

Tiến hóa lên level 2, mình làm quen với hệ thống có nhiều server với lượng traffic lớn hơn mặc dù ứng dụng thì không khác mấy. Cache tại level này mình sẽ có thêm nhiệm vụ tăng khả năng đáp ứng của hệ thống, còn thời gian response 1 page thì có thể giảm hoặc giảm ít hơn chút so với level 1 là được rồi.

Điểm qua 1 vài đặc điểm ứng dụng hiện tại:

- Chạy trên nhiều server, do đó vấn đề sai khác data giữa các server nếu dùng file cache cần phải giải quyết.
- Lượng traffic cao nên phải focus mạnh vào cache toàn trang để giảm gánh nặng của application và DB
- Lượng data lớn hơn nhưng cấu hình DB thì nhỏ
- Có hệ thống proxy / LB đứng phía trước.

Đây là những loại cache mình sử dụng cho ứng dụng này:

![](https://images.viblo.asia/a0cc9d31-87b1-4387-8988-63535eae7805.png)

Cụ thể:

![](https://images.viblo.asia/8f891d05-a94c-4bbe-b04a-981e41b596ca.png)

1. **Cache Data Object và HTML Template bằng 3rd storage**

Query cache của database có 1 điểm bất lợi là locking và có thể khiến performance tổng thể của DB đi xuống. Do đó ở đây mình move việc cache kết quả ra khỏi database và chuyển hoàn toàn xuống tầng application. 

Do application chạy trên nhiều server nên ưu tiên lúc này chuyển sang tính đúng đắn của dữ liệu nhiều hơn, nên mình đã chuyển từ file cache (chỉ chạy trên từng server) sang hệ thống cache riêng sử dụng Redis / memcache. Ngoài ra mình sẽ cần 1 bộ nhớ cache chung để nâng cao hiệu quả cache, và lúc này dùng redis/memcache được cài đặt trên server riêng sẽ rất hiệu quả.

Lúc này mình tập trung vào cache mấy cái:
- Html template (cho các hệ thống template như laravel blade)
- Data object (như query result, http result)

> 1 ứng dụng có bao nhiêu object có thể cache thì biết cache opject nào? Hãy nhớ lại 2 tiêu chí: **Tốn thời gian / tài nguyên** và **Sử dụng lại nhiều lần** để lựa chọn.

Ví dụ cache query result với laravel:

```php
class NewsController extends Controller {
    public function index() {

        $user = Users::where('id', 1)->first();

        // Cache query result
        if ( Cache::store('redis')->has('news') ) {
            $news = Cache::store('redis')->get('news');
        } else {
            $news = News::all();
            Cache::store('redis')->put('news', $news);                                         
        }

        return view('news.index')
            ->with('news', $news)
            ->with('user', $user)
            ->render();
    }
}
```

2. **Cache opcode bằng memory** 

Phần này chỉ có tác dụng với những ngôn ngữ thông dịch kiểu PHP, việc bật cache operation code với những code base to và nặng sẽ giúp cải thiện đáng kể performance của ứng dụng và giảm thời gian 1 request đi kha khá.

Ở đây mình đã bật cache Opcode với opcache. Chi tiết tham khảo chị gu gờ nhé.

3. **Cache thêm static asset trên CDN**

Mình tiếp tục sử dụng CDN cho các static content dạng css, js, font,...

Để sử dụng CDN cho css, js thì các bạn phải làm mấy việc:

- Tách css, js ra thành file tĩnh khỏi các thành phần động (đừng cười, nhiều hệ thống không viết js, css ở file riêng đâu)
- Implement các cơ chế invalidate css, js file thông qua querystring, file hash,... nếu cần thiết 
- Cấu hình CDN để serve static file

4. **Cache toàn trang trên Reverse Proxy**

Sử dụng cache toàn trang trên reverse proxy như nginx, haproxy để cache lại toàn bộ html page.

Để sử dụng cache toàn trang thì các bạn phải làm mấy việc:
- Xác định phần nào là **phần tĩnh với mọi user**, phần nào là **phần động với từng user**. Phần động chuyển qua gọi ajax, phần tĩnh được cache full html.
- Cấu hình reverse proxy để cache lại html response.

Đây là biện pháp để dừng request của người dùng ngay tại lớp Proxy/LB và giảm tải cho ứng dụng, là 1 trong những chiêu thức quan trọng và hữu hiệu nhất với các hệ thống dạng bài viết. Vừa cải thiện đáng kể trải nghiệm của user trên trang và tăng khả năng đáp ứng lượng traffic lớn của hệ thống.

Ví dụ config cache trên nginx:

```css
http {
    ...
    proxy_cache_path /data/nginx/cache keys_zone=one:10m;
    server {
        proxy_cache mycache;

        location / {
            proxy_pass http://localhost:8000;
        }
    }
}
```

**Kết quả:** Mình đã tối ưu 1 trang web livestream (monolith, multi server) bằng việc tách phần tĩnh (là phần html) ra để cache toàn trang và phần get link live (động cho từng user) chuyển qua ajax. Kết hợp với CDN cho static asset và redis cho các data object đã giúp mình tăng số CCU mà hệ thống có thể chịu được lên rất nhiều.

## Level 3: Web API with SPA

Tiếp tục lên tới level 3, khi ứng dụng của mình mở rộng tới mobile và web SPA. Việc của mình là phải tối ưu API để response của 1 request chỉ từ 50ms - 100ms.

Hãy cùng điểm qua vài đặc điểm của các Web API và Web SPA:

- SPA chứa toàn bộ html, js, css của ứng dụng và có thể triển khai dạng tĩnh
- Web API chỉ chứa data, do đó application không mất resource để render html template
- Client phải gọi nhiều request tới server hơn
- Việc tách biệt các thành phần stateless, stateful giúp ứng dụng dễ dàng triển khai lên container hơn.

Ở level này, việc tách biệt hoàn toàn phần static data như html, js, css,... ra khỏi phần data đã giúp cho caching trở nên dễ dàng hơn kha khá. Tại level này, mình đã focus vào các yếu tố sau:

![](https://images.viblo.asia/c7c78636-6554-4729-940d-dc025c816492.png)

Cụ thể là:

![](https://images.viblo.asia/53717858-c890-4ab2-9708-f43d07019735.png)

1. **Tiếp tục cache data object với 3rd storage**

Tối ưu việc cache data object bằng redis, memcache thông qua theo dõi tỷ lệ cache hit/miss và sửa đổi các luồng API get data.

Chỗ này thì đã làm từ trước rồi mình sẽ không nói thêm nữa.

2. **Cache static asset trên CDN**

Phần này thực hiện dễ hơn so với level trước, do các framework JS hiện đại đã làm sẵn việc tách html, css, js ra thành các file tĩnh và có thể dễ dàng cache lại trên CDN hơn so với trước đây.

3. **Cache http response trên client**

Vì client phải gọi nhiều request tới server hơn, do đó lúc này các bạn sẽ cần quan tâm nhiều hơn tới trải nghiệm người dùng và phải cải thiện nó thông qua việc can thiệp vào client cache thông qua HTTP header.

Client cache bằng Header sẽ có mấy kiểu:
- Kiểu cache hoàn toàn response trên client, **không có request mới** được tạo ra. Kiểu này sử dụng header **Cache-Control** hoặc các header kiểu cũ như **Pragma**, **Expires**
- Kiểu cache trên client nhưng hết hạn thì browser vẫn tạo ra request mới. Lúc này hệ thống header **Etag**, **If-none-match** và **Last-Modified**, **If-Modified-Since** sẽ làm nhiệm vụ validate lại data trên server có thay đổi gì so với client không. Nếu data không đổi thì server sẽ trả cho client 1 response trống với HTTP code 304 để tiết kiệm tài nguyên network.

> **Lưu ý:** Browser mặc định tôn trọng các header cache và thực hiện cache tự động nếu không có config gì khác. Tuy nhiên app mobile mặc định KHÔNG cache trừ khi có config cho phép cache trên các lib request http.

> **Lưu ý 2:** Việc sử dụng cache http response trên client cần được thực hiện thận trọng, bởi vì nếu các bạn làm sai, lỡ cache những thứ không nên cache thì việc xử lý hậu quả sẽ cực kỳ cực kỳ vất vả đó nhé. Tệ nhất chính là bạn phải **đi bảo từng user** phải xóa cache trên device của họ đấy.

**Kết quả:** Mình đã tối ưu 1 hệ thống thương mại điện tử dạng webview nhúng trong app với thời gian load rất ấn tượng, chờ khoảng 50ms để bắt đầu load content và load hết toàn trang mất 3-4s.

## Level 4: Microservices

Lên đến level 4, lúc này mình focus vào tối ưu nhiều hơn các hệ thống xử lý dữ liệu (do phần static asset đã tách biệt hoàn toàn và xử lý xong ở level trước rồi). Hãy cùng điểm qua 1 vài đặc điểm của hệ thống này:

- Hệ thống gồm nhiều service, nhiều database khác nhau.
- Triển khai hoàn toàn bằng container. Do đó việc sử dụng file cache nên hạn chế.
- Yêu cầu performance cao với lượng tải lớn.
- Lượng data rất lớn và yêu cầu hệ thống cache cũng có thể scale được.

Lúc này, bài toán caching với micro services trở nên chuyên biệt hơn và cần phải có cách xử lý đáp ứng nhiều yếu tố hơn chứ không chỉ **cache xong là xong** nữa.

![](https://images.viblo.asia/c8f039e1-af88-473f-be83-ab37134ee0f9.png)

Wow, dùng nhiều quá phải không? Tất nhiên là nó phải có tính kế thừa từ những level trước rồi. Có nhiều cái đã dùng ở level trước, nhưng giờ tiếp tục dùng nhưng ở level cao hơn.

![](https://images.viblo.asia/b81e8cab-928c-4ad4-80ed-32c6c363cf3e.png)

1. **Cache database index và hot data**

Thật ra cái này không liên quan nhiều tới cache lắm mà là tối ưu database nhiều hơn. Ở đây với tư cách là devops và người thiết kế hệ thống thì mình sẽ phải đảm bảo config database tối ưu cho việc cache lại index và hot data trên RAM. Việc này sẽ gồm rất nhiều các việc nhỏ hơn kiểu:

- Tối ưu index size
- Capacity planning
- Optimize DB config

Tuy nhiên về mặt tổng thể thì nó vẫn là cache, do đó mình vẫn đưa vào đây.

2. **Cache Data Object**

Mặc dù vẫn là cache data object đã implement từ những level trước, nhưng đối với hệ thống micro services thì việc sử dụng hiệu quả loại cache này trở thành yếu tố tối quan trọng của hệ thống.

Ở đây mình sử dụng chủ yếu 2 loại storage là: **3rd storage (redis, memcache)** và **memory (hashmap, variable)**. Lúc này việc lựa chọn storage quan trọng hơn nhiều so với các level trước và đây là những yếu tố bạn phải cân nhắc:

**3rd storage (redis, memcache)** cho khả năng scale và performance rất tốt nhờ cluster, phù hợp với đa số trường hợp.
**Memory cache (hashmap, variable)** có khả năng scale và hiệu quả thấp hơn do chỉ tồn tại trên từng app instance, nhưng tốc độ sẽ nhanh hơn rất nhiều so với remote cache như redis. Do đó nó phù hợp với những ứng dụng đặc thù có yêu cầu performance rất cao. Bọn mình đã phải tối ưu để nhiều service có latency < 1ms thông qua việc sử dụng memory cache hợp lý.

Chi tiết hơn về việc chọn các loại cache mình sẽ nói ở bài viết sau.

3. **Cache API response trên reverse proxy và CDN** 

Tại level này thì việc sử dụng cache reverse proxy và CDN đã trở thành cơ bản, tuy nhiên để cache được API response thì các bạn phải rất hiểu về từng endpoint của mình: cái nào cần cache và cache bao lâu. Việc này sẽ khá tốn thời gian để implement Cache header cho từng loại endpoint cũng như rà soát vấn đề toàn vẹn dữ liệu, do vậy mình không khuyến khích mọi người làm nó quá sớm nếu chưa thật sự có traffic khủng khiếp.

4. **Cache chủ động Data Object trên client**

Tại level này, các ứng dụng client đã tương đối phức tạp và việc tối ưu trải nghiệm người dùng trở nên quan trọng hơn. Do đó anh em client sẽ tiến thêm 1 bước trong việc chủ động cache lại data trên client. Việc này giống như facebook vẫn show được bài viết khi ứng dụng offline vậy. Việc cache lại data trên client sẽ giảm được rất nhiều request tới server, tuy nhiên mình cũng không khuyến khích các bạn làm quá sớm, vì dữ liệu cache trên client rất khó quản lý và nếu không cẩn thận có thể gây ra những vấn đề về toàn vẹn dữ liệu dở khóc dở cười luôn.

## Level 5: Hardcore

Thật ra level này mình cũng chưa đạt tới, chỉ nghe đồn là các tiền bối ở đây sẽ tối ưu tới tận cách dùng memory của OS, tới tận việc dùng L1, L2, L3 của CPU,... Nghe đã thấy sợ hãi rồi nên là thôi bỏ qua nhé.

## Tổng kết

Trên đây là con đường mình đã đi qua để có thể nâng cao dần hiểu biết của bản thân liên quan đến caching. Các bạn sẽ thấy nó tương ứng với từng thời kỳ, từng sản phẩm mình đã trải qua và có độ phức tạp từ thấp tới cao. 

Có thể con đường của các bạn sẽ khác khi tiếp cận từ định nghĩa, các loại cache nói chung, cách implement,... và có thể sẽ hơi loạn loạn 1 chút khi không biết với bài toán này thì mình sẽ cần những loại cache gì. Hy vọng là thông qua con đường của mình, các bạn sẽ có 1 cái nhìn mới lạ, đi từ thực tế và sát hơn với những gì các bạn đang làm hàng ngày. 

Trong bài viết sau, mình sẽ nói kỹ hơn 1 số trường hợp cache cụ thể mà mình đã trải qua và các yếu tố để lựa chọn giải pháp cache nhé. Link phần 2: [Caching đại pháp 2: Cache thế nào cho hợp lý?](https://viblo.asia/p/caching-dai-phap-2-cache-the-nao-cho-hop-ly-ByEZkawE5Q0)

P/s: Hãy ủng hộ tác giả bằng việc **upvote** + **clip** bài viết và series này nhé!

Bái bai.