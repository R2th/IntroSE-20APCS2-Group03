# Mở đầu:
Như mọi người đã biết, performance là vấn đề gì đó cực kỳ quan trọng và làm đau đầu không ít lập trình viên.
Đối với những lập trình viên mới vào nghề và chưa có nhiều kinh nghiệm làm việc, họ sẽ ít để ý tới vấn đề này.Họ sẽ chỉ đơn giản code để có thể chạy mọi thứ, đó là điều đã quá tuyệt vời.
Tuy nhiên, khi càng làm việc, tiếp xúc với những dự án thực tế cho khách hàng, họ bắt đầu nhận ra rằng.Không phải chỉ code cho chạy mọi thứ, mà performance cũng là một thứ gì đó quan trọng không kém.
Mình xin lấy ví dụ ở bài viết này, là performance khi lấy data để trả về cho các app mobile.Khi mà nhu cầu dữ liệu trả về càng nhiều.Khối lượng những câu query chọc vào Database càng phình to, đồng nghĩa với thời gian để get các dữ liệu này sẽ càng lâu.
Và tất nhiên, đó là điều không một khách hàng nào mong muốn.Hãy đặt bạn vào vị trí người dùng cuối, hãy tưởng tượng bạn phải mất hơn 1s để có thể load được timline của 1 app, chỉ hơn 1s, nhưng đó là cả 1 vấn đề.
Bạn sẽ không bao giờ thích điều này, và dĩ nhiên, người khác cũng vậy.
Bạn sẽ tìm đủ mọi cách để cái thiện nó, nào là sử dụng include để hạn chế N+1, refactor lại code để hạn chế việc thừa query...
Hôm nay mình xin đóng góp thêm một cách, đó là sử dụng rails caching.Đối với những lập trình viên có nhiều kinh nghiệm, sẽ không xa lạ với phương pháp này.Mình xin chia sẽ để những người mới vào, chưa có nhiều kinh nghiệm có thể nắm được và tự áp dụng cho mình.
# Giới thiệu về Rails caching
Bây giờ chúng ta sẽ đi tìm hiểu về cách sử dụng rails caching này nhé.
Mình sẽ làm ví dụ với trường hợp get data api cho ứng dụng mobile.
Mình có 1 bảng user_makeups và 1 bảng occupations.Với quan hệ 
`UserMakeup belongs_to :occupation`, và 
`Occupation has_many :user_makeups`.
Khi lấy user_makeups trả về, yêu cầu là phải có occupation của user_makeup đó.
Khi đó, có phải trong serializer của bạn chỉ cần khai báo `has_one :occupation, serializer: OccupationSerializer`.
Và hãy xem log nhé: 
![](https://images.viblo.asia/5fa85518-9b2a-4daa-ac57-9fef2dd99a7d.png)
Ồ hãy xem điều gì đã xảy ra, có phải chúng ta đã dính N+1 phải không nào.Đúng vậy, N+1 đã xuất hiện khi nó select để lấy mỗi occupation của mỗi user_makeup.
Để fix N+1 cũng khá đơn giản, chỉ cần bạn thêm include(:occupation) khi get user_makeups là xong.
Hãy chạy lại và xem kết quả nhé.
![](https://images.viblo.asia/16dcf43b-08ba-46b0-931b-8ec761cad6fa.png)
Vậy là N+1 đã được giải quyết.Đến đây, bạn đã tăng được performance khá đáng kể, và bạn vui vì điều đó.Tuy nhiên, hãy tưởng tượng, khi bạn không chỉ cần lấy occupation của makeups, mà còn là vô vàn thứ khác nữa.Thì chúng ta cũng sẽ có 1 list khá nhiều câu query dạng như vậy.
Bạn đã thấy vấn đề chưa, dù N+1 đã được giải quyết.Nhưng khi lượng data quan hệ khá nhiều, bạn sẽ có khá nhiều query, và nó cũng là vấn đề đối với performance của bạn.
Hãy thử nghĩ, tại sao chúng ta không load những dữ liệu đó lần đầu, rồi sau đó cất chúng vào đâu đó. Rồi từ lần sau sẽ chỉ lấy chúng ra và dùng thôi.Ý tưởng không tồi đúng không nào.
Đúng vậy, và Rails Caching chính là thứ đó, điều mà mình sắp nói đến.
Rails caching hoạt động như cách mình nói, sẽ get dữ liệu bình thường ở lần đầu, sau đó cất vào cache(redis) và sau đó chỉ cần lấy ra dùng mà không cần chọc vào DB nữa.
Vậy cùng bắt tay xem làm sao để caching được chúng.
# Cùng thử dùng rails caching
Như mình đã nói ở trên, chúng ta sẽ sử dụng redis để hổ trợ lưu trữ, do đó hãy kiểm tra rằng bạn đã có `gem 'redis-rails'` trong gem file nhé.
Ngoài ra hãy config trong `config/environments/development.rb`:
```
config.action_controller.perform_caching = true

config.cache_store = :redis_store, 'redis://cache:6379/0', { expires_in: 90.minutes }
```
Sau khi config xong, hãy bắt đầu nhé.
Trước tiên, vì bạn muốn sau khi get dữ liệu lần đầu, dữ liệu occupation sẽ được cache trong redis.Nên bạn sẽ cần define 1 cached_occupation trong user_makeup.rb như sau:
```
 def cached_occupation
    Rails.cache.fetch("occupations:#{occupation_id}", expires_in: Settings.cache_ttl.long) { occupation } if occupation_id
  end
```
Hãy chú ý đến câu lệnh fetch, nó sẽ có 3 phần chính mà bạn cần quan tâm.

1: occupations:#{occupation_id} đây chính là tên Key để lưu giá trị cho occupation trong cache.Như ở trên, mỗi occuaption sẽ được lưu trữ trong 1 key duy nhất dựa vào id của nó, với định dạng: occupations:id_of_occupation.

2: expires_in: Settings.cache_ttl.long: đây chính là thơi gian sống mà bạn muốn lưu trữ nó trên cache, và thời gian bao nhiêu là tùy thuộc ở bạn.

3: { occupation } : đây chính là giá trị sẽ được lưu cùng với key tương ứng.
Có 2 loại cache hay dùng, đó là Rails.cache.fetch và Rails.cache.read.
Vậy 2 thứ này có gì khác nhau mà ở đây mình lại sử dụng fetchmà không phải là read.
Đối với fetch, trước hết nó sẽ vào cache và tìm theo key của chúng ta, nếu không tìm thấy dữ liệu với key đó, nó sẽ tự động thêm mới vào cache với cặp key-value đó, và đưa dữ liệu cho chúng ta.
Vậy còn read, read trước tiên cũng sẽ tìm xem trong cache có dữ liệu theo key muốn tìm không, nếu có sẽ đưa dữ liệu cho chúng ta, nhưng nếu không.Chúng sẽ đưa dữ liệu key-value lúc đó ra, nhưng không lưu vào cache.Như vậy lần sau sẽ không có mà dùng lại.
Sau khi đã cache vào redis, thì nhiệm vụ của chungs ta khá đơn giản.
Chỉ cần thay `has_one :occupation, serializer: OccupationSerializer` thành `has_one :cached_occupation, key: :occupation`. Và hãy bỏ cả phần include(:occupation) khi nảy nhé.
Hãy thử và xem kết quả nào.

Bài viết này mình chỉ chia sẽ cho các bạn mới, chưa có nhiều kinh nghiệm.Có gì sai sót mong được mọi người góp ý.