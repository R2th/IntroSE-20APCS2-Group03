Ắt hẳn các coding newbies khi mới tập tễnh bước chân vào công việc code thì không khó tránh khỏi tư duy mặc định sẽ là "***làm cho nó hoạt động***", thú thật là mình cũng vậy vì mình cũng là một newbie mà :laughing:. Mình có đọc được đâu đó một số bài viết liên quan đến công việc refactoring code và gặp được một cụm rất hay và cũng là một bậc cao hơn của cụm ở trên đó là "***làm cho nó hoạt đông, làm cho nó đúng và làm cho nó nhanh***". Gần đây thì khi làm dự án, nhờ được anh Team Lead "gõ đầu" và "khai sáng" liên tục thì mình cũng đã có cơ hội hiểu hơn và thực hành được 3 design patterns phổ biến của Rails đó là: **Adapter pattern**, **Service objects**, và **Decorator pattern**.

![meme4life](https://images.viblo.asia/6bb1df96-20bb-4d7c-a9c8-0bc74971c2e6.jpg)


Bài viết hôm nay mình xin phép được chia sẻ về một trong 3 design patterns phổ biến đã nêu ở trên, đó là Adapter Pattern. Ở bài lần này sẽ bao gồm 2 đầu mục chính đó là: Giới thiệu sơ về adapter pattern là gì và cuối cùng là một demo nhỏ về cách áp dụng adapter pattern trong một dự án RoR.

# 1. Adapter Pattern là gì?

![](https://images.viblo.asia/c49a47c3-c9a9-4b49-89dd-963d71489772.png)


Adapter pattern là một design pattern trong lập trình ứng dụng, cung cấp cho các class khác nhau khả năng làm việc chung với nhau mà không phải chỉnh sửa gì trong mỗi class đó. Trong Rails thì adapter pattern thường được sử dụng để đóng gói các API clients, cung cấp một interface có thể sử dụng lại được để gọi các APIs ngoài hệ thống. Ở demo bên dưới chúng ta sẽ sử dụng adapter pattern để refactor lại code đã viết để giao tiếp với API bên thứ 3.

Bây giờ mình xin có một demo nho nhỏ về việc sử dụng Adapter Pattern để xử lý việc gửi request và nhận response trong một dự án Rails đơn giản nhé ạ. Let's dive in.

# 2. DEMO TIME

## 2.1 Demo background

Ở demo này mình sẽ làm một ứng dụng đơn giản để lấy thông tin cơ bản của các Hero trong tựa game Dota 2 đình đám của Valve. Vì không có nhiều thời gian để chuẩn bị một database với đầy đủ các chỉ số, thuộc tính, hay các kỹ năng của Hero nên mình xin được sử dụng OpenDotaAPI, một API bên thứ 3 để lấy các dữ liệu và hiển thị cho người dùng ạ. Mọi người nếu ai có nhu cầu sử dụng API này làm các demo nhỏ hoặc các dự án cá nhân thì có thể truy cập vào đây để xem các tài liệu về API này [OpenDota API](https://docs.opendota.com/)

Đồng thời mình cũng sử dụng gem **rest-client** để thực hiện các hành động gọi API luôn, mọi người có thể sử dụng Net::HTTP để gọi cũng được nhưng cách sử dụng có thể khác đôi chút.

## 2.2 Getting started

Ban đầu mình xin phép không đề cập về các bước init project nhé ạ, vì đây là các thứ cơ bản khi thực hành tạo một ứng dụng Rails rồi nên chắc ai cũng phải biết thôi, bỏ qua sẽ tiết kiệm thời gian cho mọi người có nhiều space để focus vào phần chính của chúng ta đó là Adapter Pattern hơn.

Sau khi các công đoạn như init project, cài các gem hỗ trợ, hay setup routes đã xong thì mình bắt đầu tạo controller để thực hiện gọi và xử lý response trả về từ API để hiển thị ra cho người dùng, controller của mình sẽ như bên dưới.

![*heroes_controller.rb*](https://images.viblo.asia/75239a89-986b-4b03-845f-2615c462ac49.png)

Chạy `rails s` phát xem sao nhờ.

![Demo-screenshot-1](https://images.viblo.asia/185da6f7-4e5d-480d-bcef-1491acb044f6.png)

Yass! Nhìn có vẻ ngon nhỉ mọi người. Ở bảng này thì mình chỉ show ra vài thông tin cơ bản nhất của một hero thôi, đầu tiên là tên, icon hiển thị trên in-game minimap, chỉ số chính (Sức mạnh, nhanh nhẹn hay trí tuệ), đánh xa hay đánh gần, các vị trị có thể đảm nhận trong game,  và cuối cùng là hero có mấy chân (không mấy hữu ích, nhưng API nó lại có trường này nên mình cho hiển thị ra luôn). Cột cuối cùng là button có kèm link dẫn tới trang Wiki của chính hero đó. Đến đây thì hẳn sẽ có các anh em thở phào nhẹ nhõm vì cuối cùng demo đã chạy ngon, chúng ta vừa thỏa mãn tiên đề ở trên "làm cho nó hoạt động"  :clap: , nhưng... NOT SO FAST!! :hand:

Như mọi người đã thấy, trong controller trên thì để có data để hiển thị ra cho người dùng thì mình phải mình phải thực hiện các hành động sau trong controller:
1. Thực hiện gọi API và gán `response` bằng kết quả nhận về từ API: `response = RestClient.get("https://api.opendota.com/api/heroes")`
2. Tiếp theo là thực hiển kiểm tra status code của response trả về có thành công hay không.
3. Nếu status code là 200 hoặc 201 thì sẽ thực hiện parse JSON response sang dạng hash để có thể hiển thị cho người dùng trong Rails view.
4. Ở đây mình còn sử dụng decorator để thêm màu mè cho data lúc hiển thị cho người dùng. (Optional)

Ở đây chúng ta chỉ mới thực hiện phương thức GET và không truyền lên bất kỳ query parameter nào, thử hình dung nếu chúng ta phải xử lý cả việc serialize data để gửi kèm request lên API thì controller của chúng ta sẽ bị scale lên kha khá nhỉ, chưa kể trường hợp nếu đâu đó trong dự án chúng ta cần thực hiện lại việc gọi API lấy thông tin Hero lần nữa, thì không lẽ phải thực hiện lại tất tần tật 3 bước xử lý chính như trên sao? That's no no, đây là lúc chúng ta sẽ áp dụng Adapter vào dự án của mình.

## 2.3 Apply adapter pattern

Đầu tiên mình sẽ tạo một folder adapters ở đường dẫn app, có nghĩa là adapters sẽ nằm đồng cấp với các controllers, models hay views luôn nhé, tiếp sau tạo một thư mục có thể đặt tên theo tên API bên thứ 3 của bạn để phân biệt phòng trường hợp mọi người sẽ gọi các API ở nhiều bên, ở đây mình sẽ đặt là dota2 thôi. Trước nhất thì chúng ta sẽ tạo một BaseAdapter.

![base_adapter.rb](https://images.viblo.asia/af373e15-d79e-4ad0-b5a0-14aba3934eba.png)


Trong `BaseAdapter` này, chúng ta sẽ có 2 hàm với 2 mục đích đó là:
* execute_request: Nhìn tên đoán chức năng thôi anh em, hàm này để thực hiện việc gửi request lên API bên thứ 3 thôi. Mọi người có thể thấy mình sẽ truyền vào `RestClient::Request.execute` 2 arguments đó là **url** và **method**. Nếu có lỗi thì rescue và trả về response lỗi thôi, ở đây thì mình vừa giảm được cho `HeroesController` ở trên 1 tác vụ đó là gọi API.
* handle_result: Ở hàm này mọi người sẽ thấy hơi khó hiểu một tí vì có dính tới Deserializer nữa nhưng đừng lo, mình sẽ đề cập tới nó ngay bên dưới thôi nên mọi người có thể hiểu đại khái là nó sẽ handle và xử lý response trả về từ hàm thực hiện gọi API ở trên.

Tiếp theo chúng ta sẽ tiến hành viết một class deserializer để xử lý response trả về từ API bên thứ 3 nhé. tạo một thư mục deseriazlizers trong thư mục dota2 vừa tạo ở trên và mình đặt tên cho nó là CommonInfo.

![Deserializer common_info.rb](https://images.viblo.asia/21d98621-fce0-4eec-87a1-10f3c1986f7c.png)

Mình sẽ nói đôi chút về phần deserializer này.
1. Initialize class này và thực hiện lấy argument truyền vào.
2. Hàm success? để kiểm tra xem response trả về có thành công hay không, quen không anh em? Nó được dùng để kiểm tra trong controller ở trên của chúng ta đấy.
3. Hàm fail? thì ngược lại với success? thôi.
4. Hàm data để thực hiển parse body của response từ JSON qua hash để có thể sử dụng được ở Rails View.
5. Hàm status_code để thực hiện lấy status code của response trả về.
6. Và cuối cùng là lấy ra error trong response body đã được parse ở hàm data.

Các hàm trong class deserializer trên là tùy theo business của dự án hoặc tùy theo output mà các bạn mong muốn adapter trả về sau khi xử lý response thôi chứ không bắt buộc phải có đủ các hàm như trên để adapter có thể hoạt động được nhé. Nhờ class deserializer này mà controller của mình đã giảm bớt thêm được 2 việc nữa đó là kiểm tra status code của response, và parse JSON response body để sử dụng trong Rails.

Nếu các bạn phải truyển thêm params khi gọi API và cần phải chuyển params đó từ Rails Hash sang JSON, hay define URI hoặc define method lúc gọi API là GET, POST, etc. Thì các bạn cần thêm một class serializer để xử lý request và data trước khi gọi API nữa nhé, nó cũng có cấu trúc tương tự như class deserializer ở trên thôi.

![Serializer common_info.rb](https://images.viblo.asia/84d91d5a-fd21-43e4-a1eb-19ebfe3b74aa.png)

Cũng phải nói đôi chút về serializer này.
1. Initialize thì chắc mọi người đều biết rồi.
2. Hàm uri này để chúng ta lấy URI của API cần gọi thôi.
3. Hàm method để lấy method của request chúng ta sắp gửi đi.
4. Hàm cuối là body, hàm này quan trọng khi mọi người cần truyền params lên khi gọi API, cái này để chuyển data từ dạng Hash của Rails sang JSON để API bên thứ 3 có thể hiểu và xử lý được.

Và cuối cùng là nới chúng ta sẽ sử dụng các mảnh ghép ở trên để tiến hành gọi API lấy về thông tin của các Hero trong game. Đó là `HeroesAdapter`.

![heroes_adapter.rb](https://images.viblo.asia/e7fc443c-d124-4cb8-9c91-26498eaf3a68.png)

Như mọi người thấy ở đây, trước tiên chúng ta sẽ tiến hành xử lý request và chuẩn bị params để gọi API thông qua hàm `serializer_params`, trong đó mình có gọi `execute_request` đã viết ở `BaseAdapter` và request ở đây sẽ là request được xử lý thông qua `Dota2::Serializers::CommonInfo` đã implement ở trên, đồng thời truyền vào params gồm uri, method, và body.

Sau đó thì mình sẽ tiến hành deserialize response trả về thông qua `Dota2::Deserializers::CommonInfo` bằng cách gọi hàm `execute` trong adapter này. Từ đó `HeroesController` của mình có thể rút gọn lại như dưới.

![heroes_adapter.rb with adapter implemented](https://images.viblo.asia/c42e4b40-377c-400f-a8af-3afff6e68d2d.png)

Controller này giờ đã được tối giản hơn và cũng trực quan hơn rồi nhỉ? Tất cả nhờ vào `HeroesAdapter` đã xử lý input và output của chúng ta như mong muốn rồi . Giờ thì `rails s` lại phát xem còn chạy bình thường không nhé mọi người.

![Demo-screenshot-2](https://images.viblo.asia/43827df3-da55-4cbe-9e01-67f83614af04.png)

Hooray! Vẫn chạy ngon, vậy là chúng ta đã thật sự hoàn thành mục tiêu được đặt ra ở bài viết này rồi. Có một điều mình cũng muốn note lại cho mọi người đó là các `BaseAdapter`, `Serializer` hay `Deserialzier` ở trên đều có thể dùng lại khi mọi người viết thêm các adapter mới để gọi các API khác bên thứ 3 nữa nên lợi ích nó mang lại là nhiều hơn ngoài việc chỉ làm controller cho mọi người gọn lại không thôi.

Đến đây thì bài viết cũng khá dài rồi nên mình xin phép dừng ở đây, từ demo nhỏ này mình tin là mọi người sẽ có khả năng để tự làm cho mình những demo siêu to khủng lồ hơn nữa. Mong là mọi người thấy bài viết này bổ ích, và cảm ơn mọi người đã dành thời gian đọc hết bài ạ.

### Happy coding, guys :stuck_out_tongue_winking_eye: