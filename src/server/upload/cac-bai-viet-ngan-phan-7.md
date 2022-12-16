![](https://i2.wp.com/beautyoncode.com/wp-content/uploads/2022/09/sunglasses-g78cc49f47_1280.jpeg)

## MVC là gì?

Lập trình web ngày càng phát triển, từ ban đầu là các trang web tĩnh chỉ với HTML / CSS rồi phát triển lên trang web động và các hệ thống web ngày càng trở nên đồ sộ với sự làm việc chung của cả ngàn lập trình viên.

Để làm việc với hệ thống ngày càng phức tạp, có nhiều mô hình kiến trúc khác nhau để phân chia code sao cho đỡ phức tạp hơn và dễ dàng làm việc với nhiều người.

Mô hình được sử dụng phổ biến nhất là **MVC** (Model – View – Controller).

MVC giúp phân chia một ứng dụng lớn thành từng nhóm cụ thể khác nhau với mục đích và nhiệm vụ khác nhau.

Các thành phần:

– **Model**: Là trung tâm của MVC, model là cấu trúc dữ liệu của ứng dụng, đứng độc lập với giao diện người dùng, chịu trách nhiệm quản lý dữ liệu, xử lý logic.

– **View**: Là giao diện của ứng dụng

– **Controller**: Là bộ điều khiển, nhận đầu vào là các yêu cầu và xử lý bằng cách gọi đến View, Model.

Trong mô hình này, Model và View sẽ không tương tác với nhau, chỉ có Controller là nói chuyện với cả Model và View.

![](https://i0.wp.com/beautyoncode.com/wp-content/uploads/2022/09/mvc.png)

([Read more here](https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller))


## Hoisting trong JavaScript

Điều khiến JavaScript khó hiểu với những người mới hay chuyển từ ngôn ngữ khác qua chính là JavaScript cho phép sử dụng biến và hàm ngay cả trước cả khi bạn khai báo chúng.

**Vậy điều gì đã khiến mình có thể truy cập vào các biến và hàm ngay cả khi chúng chưa được khai báo?** 
Đó chính là **cơ chế Hoisting trong JavaScript**.

Bạn có nhớ **hai** giai đoạn của một **“Execution Context”** là **Memory Creation** và **Code Execution**(đọc thêm ở [bài viết này](https://beautyoncode.com/dieu-gi-xay-ra-khi-chay-mot-chuong-trinh-javascript/)).

**Hoisting** trong JavaScript chính là sau giai đoạn **Memory Creation**, các biến và hàm sẽ được cấp bộ nhớ trước khi code được thực thi, biến được cấp bộ nhớ với giá trị undefined , còn hàm thì sẽ được cấp bộ nhớ cho toàn bộ nội dung bên trong hàm f nameFunction(). Vì thế, bước vào giai đoạn thực thi Code Execution, thì các giá trị này đã có sẵn để sử dụng.

**Hoisting** trong JS sẽ dễ gây hiểu nhầm nếu bạn không hiểu về JavaScript Engine nên bạn cần tìm hiểu cơ chế này để dễ debug chương trình của mình nhé.

Mời bạn đọc thêm chi tiết ở [bài blog này](https://beautyoncode.com/hoisting-trong-javascript/).

## Mảng trong JavaScript

Có hai cách để tạo mảng trong JavaScript là tạo đối tượng của lớp Array: let arr = new Array(1, 2)hay sử dụng cú pháp mảng []: let arr1 = [3, 4]

Khi làm việc với một danh sách, sẽ có các thao tác cơ bản như: (các phương thức của mảng sẽ bắt đầu với dấu .)

– thêm một phần tử vào danh sách .push(), .unshift(), .splice()

– xóa một phần tử ra khỏi danh sách .pop(), .shift(), .splice()

– thay thế phần tử trong mảng với .splice()

– lặp qua từng phần tử của mảng để lấy dữ liệu hay xử lý logic for, .forEach(), .map() (lưu ý map trả về mảng mới)

– kiểm tra index của một giá trị trong mảng với .indexOf()

– kiểm tra giá trị nào với vị trí index đã biết .at()

– nối hai mảng với nhau với .concat()

– nối các phần tử trong mảng với một ký tự liên kết với .join()

– chuyển đổi mảng về chuỗi với .toString() (lưu ý phương thức này của object, và array cũng là object)

– tìm kiếm phần tử đầu tiên thỏa điều kiện với .find()

– tìm kiếm tất cả phần tử thỏa điều kiện với .filter()

– lấy ra một mảng con từ mảng ban đầu

– sắp xếp mảng theo một thứ tự nào đó với .sort(), đảo ngược mảng với .reverse()

– kiểm tra tất cả các phần tử trong mảng thỏa điều kiện với .every(), kiểm tra một vài phần tử trong mảng thỏa điều kiện với .some()

**Khi sử dụng các phương thức này bạn cần chú ý một số điều sau:**

– Hiểu rõ phương thức sử dụng làm gì

– Nắm rõ cú pháp

– Kiểm tra giá trị trả về

– Kiểm tra xem phương thức có làm thay đổi mảng ban đầu hay không

Bạn có thể đọc thêm ví dụ ở [bài viết sau](https://dev.to/codewithtee/15-array-methods-in-javascript-1p1m).

## BeautyOnCode - các bài viết được xem nhiều nhất

Hôm kiểm tra blog giật mình nhận ra BeautyOnCode đã xuất bản 86 bài viết. Vậy là cái ngày đạt con số 100 đầu tiên đang tiến tới rất gần 🥰

(Chuyện tâm linh là cứ viết 100 bài là bạn tự dưng nổi tiếng luôn 😅)

Sau khi lướt qua lượt xem nhìn nhận ra có nhiều bài viết đạt số người xem khá ấn tượng, nên mình đã thêm một chuyên mục “Xem Nhiều Nhất” với số lượt xem từ 500 trở lên (có bài hơn 2k views), có 36 bài viết hiện đang ở đây.

Điều là mình vui nhất là các bài viết được xem nhiều nhất lại về kỹ thuật, các chủ đề tech được giới thiệu theo phong cách tự do lại được bạn đọc đón nhận ngày càng nhiều.

Top 5 bài viết trên một ngàn lượt xem về tech:

- “Giới thiệu về Linux” (https://beautyoncode.com/gioi-thieu-ve-linux/) đạt 2252 lượt xem

- “Khám phá đại bản doanh Python series overview” (https://beautyoncode.com/dai-ban-doanh-python-series-overview/) đạt 1517 lượt xem

- “Lớp trong Python” (https://beautyoncode.com/lop-trong-python/) với 1405 lượt xem

- “Iterable, iterator và generator trong Python” (https://beautyoncode.com/iterator-va-generator-trong-python/) với 1369 lượt xem

- “Làm quen câu lệnh và hệ thống tập tin trong Linux” (https://beautyoncode.com/lam-quen-cau-lenh-va-he-thong-tap-tin-trong-linux/) với 1304 lượt xem

Thêm vào đó, một số bài viết non-tech cũng được bạn đọc quan tâm:

- [danang.fyi](http://danang.fyi/) and repo danang-cuisine (https://beautyoncode.com/danang-fyi-va-repo-danang-cusine/) với 955 lượt xem

- “Giáo dục và ý nghĩa cuộc sống” (https://beautyoncode.com/sach-giao-duc-va-y-nghia-cuoc-song-j-krishnamurti/) với 730 lượt xem

-“Nữ giới trong lĩnh vực STEAM” (https://beautyoncode.com/nu-gioi-trong-linh-vuc-stem/) với 665 lượt xem

Nay bạn có thể xem các bài viết này bằng cách bấm vào [**“XEM NHIỀU NHẤT”**](https://beautyoncode.com/category/most-views/) ở thanh điều hướng chính của blog nhé.

Bật mí nhỏ là đây chỉ mới là lượt xem trực tiếp trên blog cá nhân, bên cạnh đó còn hơn **30** ngàn lượt xem trên viblo, kipalog nữa.

Nhân đây mình cũng gửi lời cám ơn đến tất cả mọi người đã ủng hộ blog trong suốt 3 năm vừa qua với hơn 40 ngàn lượt xem trên blog BeautyOnCode hơn 35 ngàn lượt xem trên Viblo, Kipalog.

Cám ơn sự tin tưởng của gần 2,000 bạn theo dõi trên Careerly, hơn 600 bạn theo dõi trên fanpage BeatyOnCode, gần 700 người theo dõi trên Linkedin, 300 bạn theo dõi trên Kipalog, gần 50 bạn theo dõi trên Viblo.

Cám ơn sự tin tưởng và đồng hành của mọi người, đây chính là nguồn động lực giúp mình chăm học hơn mỗi ngày.

Hi vọng có thể mang đến nhiều bài viết thú vị và bổ ích cho mọi người.

Thank you.

## Kỹ năng debug
Khi gặp bug, hẳn bạn sẽ chăm chăm vào con bug và tìm cách sửa chúng. Tuy nhiên việc fix được một con bug chưa quan trọng bằng việc tìm hiểu nguyên nhân vì sao chúng lại xảy ra và làm sao tránh sinh thêm bug tương tự trong tương lai.

Julia Evans giới thiệu đến bạn một số cách để quy trình debug hiệu quả hơn (từ paper “Learning to Troubleshooting”), bằng cách chú trọng vào nguyên nhân, nâng cao kiến thức để có thêm nhiều manh mối khi debug:

#### Học code base

Đầu tiên bạn cần hiểu về code base của dự án, hiểu về cách dự án đang hoạt động.

#### Học về hệ thống

Hiểu về ngôn ngữ, thư viện, hệ thống bạn đang sử dụng. Ví dụ như HTTP caching hoạt động ra sao, CORs diễn ra như thế nào, …

#### Học về các công cụ

Biết và có thể sử dụng các công cụ debug như debugger, devtools, profilers, trace, dumps …

#### Học các chiến lược

Tìm hiểu về các chiến lược có thể debug hiệu quả như viết unit test hay viết một chương trình nhỏ để tái tạo lại bug, in và tracking log, nghỉ ngơi, nói chuyện với người có kinh nghiệm hơn, …

#### Học từ trải nghiệm

Không ngại sai và học hỏi nghiêm túc từ các trải nghiệm, giúp đỡ người khác fix bugs cũng là một cách tăng trải nghiệm của bản thân. Cảng nhiều kinh nghiệm thì việc debug sẽ càng dễ dàng hơn.

https://jvns.ca/blog/2022/08/30/a-way-to-categorize-debugging-skills/

---
Nội dung này thuộc [BeautyOnCode's short posts](https://beautyoncode.com/category/short-posts/) là các bài viết ngắn tóm tắt nội dung và ý kiến cá nhân từ các nguồn như các slack channels (công ty, cộng đồng), các new letters, …

Các bài viết này cũng được đăng ở:

👉 [BeautyOnCode trên Careerly](https://careerly.vn/profiles/1140) (lời hứa với Careerly) Trên đây có gần 900 người theo dõi, và là trang tin công nghệ khá hay, bạn có thể tải app rồi theo dõi mình nhé.

👉 [Blog BeautyOnCode, chuyên mục “Short Posts”](https://beautyoncode.com/category/short-posts/)

👉 [Fanpage BeautyOnCode](https://www.facebook.com/beautyoncode)

👉 Trang [notion này](https://graphicdthanh.notion.site/BeautyOnCode-short-posts-c2996f46c7674f50bf9b88bb491094ab) tổng kết các bài viết

Nếu bạn thích đọc hàng ngày thì hãy follow các trang trên nhé. Chúc bạn đọc vui ^^

---

If you think these contents are helpful, you could send me an encouraging by:
- Support me
  - [☕️ Buy me a coffee](https://ko-fi.com/beautyoncode)
  - [😇 Send a hi on Momo](https://me.momo.vn/beautyoncode)
  - [👀 Visit support page](beautyoncode.com/support/)
- Visit my blog at [beautyoncode.com](beautyoncode.com)
- Follow me on:
  - [Careerly](https://careerly.vn/profiles/1140)
  - [fanpage](facebook.com/beautyoncode)
  - [linkedin](https://www.linkedin.com/in/graphicdthanh/)

🤘 Chat with me 🤘 

See you around, friends!