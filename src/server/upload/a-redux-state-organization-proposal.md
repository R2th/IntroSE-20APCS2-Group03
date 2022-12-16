Khi sử dụng `Redux`, rất khó để bắt đầu tổ chức `state` của bạn. Tôi đã thấy nhiều sinh viên của mình thêm `properies` khi họ cần. Cách đó có thể khiến bạn có một `component` khủng khiếp gây ra bởi một `state` khổng lồ.
Ví dụ: bạn có thể sẽ có một cái gì đó như thế này:

![](https://images.viblo.asia/721e6b98-14a7-43a6-841b-cbf3cacd541b.png)

Vấn đề tôi tìm thấy trong `state` ở trên là tất cả `properies` đều là `mixed`.

- `auth_token` sẽ được sử dụng chủ yếu theo cách tập trung: `ApiClient service` hoặc phần mềm trung gian.
- `movies` là danh sách `entities`. Nó sẽ được sử dụng trên toàn bộ ứng dụng để hiển thị thông tin do ứng dụng cung cấp.
- `fetching` là một cờ hiện tại, ví dụ, chúng tôi sẽ sử dụng nó trong `specific view` (`Component`) để hiển thị `spinner` đang tải.

Chúng ta có thể thấy cách `properies` được trộn lẫn về độ lớn - bởi vì `movies` (`data`) không có cùng mức độ quan trọng như `fetching` (`flag`) - và cách sử dụng - bởi vì chúng được sử dụng ở những nơi hoàn toàn khác nhau.
Hai điểm này có thể ảnh hưởng đến thiết kế, một `state` hỗn hợp có thể ảnh hưởng đến `modularity` của `selector` (`mapStateToProps`).

## Suggested solution

Sau một số nỗ lực, tôi đã nghĩ ra một tổ chức `state` giải quyết vấn đề trên. Nó kết thúc khá linh hoạt, phù hợp với một số dự án với các cấu trúc khác nhau.

![](https://images.viblo.asia/ba5bdcf0-40ba-4d98-bcc1-0532ad38d14f.png)

`State` này được tạo bằng cách sử dụng `combineReducers` để xác định các phần `state` riêng biệt được điều khiển bởi các `reducers` khác nhau. Lưu ý rằng tôi đã sử dụng Tên thuộc tính `Shorthand` để xác định các thuộc tính của đối tượng: `authentication` là `shorthand` để xác thực: `authentication`, là hàm thứ hai `reducer` mà tôi sẽ mô tả sau.

## Authentication Reducer

`Authentication reducer` có nghĩa là `store` và kiểm soát tất cả dữ liệu liên quan đến người dùng hiện đang đăng nhập. Bạn có thể bỏ qua phần này nếu bạn không có bất kỳ xác thực `strargety` nào trong ứng dụng của bạn. Trong đó, bạn có thể lưu những thứ như `object` người dùng hiện tại, mã thông báo xác thực. Điều này thực sự hữu ích, ví dụ, khi bạn muốn nhớ `session` vì nó có thể được duy trì và tải trước khi tạo `store`. Ở đây, một hướng dẫn thực sự thú vị giải thích cách làm điều đó một cách dễ dàng.

`Reducer` sẽ lắng nghe các loại hành động cụ thể có liên quan đến xác thực: `SIGN_IN_SUCCESS SIGN_UP_SUCCESS LOG_OUT`

## Entities Reducer

Đây là phần đặc biệt nhất của `reducer`. Chúng tôi đã từng thấy `reducers` dựa trên một sự thay đổi lớn đối với `action.type` với một danh sách các biến đổi cho `state`. Nhưng điều này sẽ kiểm soát toàn bộ tập hợp dữ liệu của `Front-End` của chúng tôi với ít hơn 20 dòng `code`.

Ý tưởng là `property` này của `state stores` một `local database` với tất cả `entities` mà chúng tôi phải làm việc và đã được cung cấp cho từ `Back-End` vào một lúc nào đó. Hãy nói rằng chúng ta tiếp tục với ví dụ về `movies`, thì đây có thể là một `state` có thể:

![](https://images.viblo.asia/4f3b124f-3ecc-41af-bb86-24c5fc6e64ff.png)

Như bạn có thể thấy, `state` được tách thành các nhóm `entity` khác nhau, các nhóm này tạo ra các mảng, nhưng `objects` với các khóa liên quan đến ID của mọi đối tượng của mọi `entity`. Điều này sẽ tránh sự lặp lại. Ý tưởng chính là cái này hoạt động như một `mini local relational database`: không có gì được lặp lại mà được tham chiếu. Bằng cách tránh lồng nhau, chúng tôi làm cho việc liên kết dữ liệu dễ dàng hơn và tránh sự không nhất quán.

Nếu dữ liệu của bạn là tất cả `local`, bạn sẽ không gặp vấn đề gì khi quản lý theo cách này, nhưng nếu bạn đang sử dụng API, rất có thể nó sẽ cung cấp dữ liệu theo cách lồng nhau. Để xử lý dữ liệu thành định dạng của chúng tôi, bạn có thể sử dụng `normalizr`. Sau một số cấu hình, nó sẽ có thể `flatten` gọi hàm bình thường. Nó sẽ trả về một `object` với hai thuộc tính: `entities` và `result`. Các thực thể sẽ là dữ liệu `fetched` và được chuẩn hóa theo định dạng của chúng tôi; Kết quả sẽ là mối quan hệ của ID của `root entity` mà bạn vừa `fetched`.

`Entity!` Thật là một sự trùng hợp, phải không? Không thực sự, thực sự. Tôi đã nhận được `potype` này từ `Redux Real World Example` mà `consume API Github` chuẩn hóa dữ liệu của nó.

Nhờ định dạng này, chúng tôi có thể viết một `reducer` kiểm soát toàn bộ `entities part` của `state` chỉ bằng một vài dòng:

![](https://images.viblo.asia/dfc83bf2-917c-46d6-8b70-59b6e0010f82.png)

Mỗi khi `action` của chúng tôi bao gồm `property entities`, nó sẽ được hợp nhất với giá trị `state entities` hiện tại 

## Pages Reducer

Tất cả dữ liệu của chúng tôi đang được xử lý tự động và `merged` vào `state`! Tuy nhiên, chúng ta nên cẩn thận: dữ liệu của chúng tôi được lưu trữ trong các đối tượng, không có mảng, vì vậy không có thứ tự.

Chúng ta nên giữ thứ tự kết quả do `Back-End` cung cấp, họ có thể sẽ tiêu tốn rất nhiều tài nguyên (vì vậy tiền) để quyết định thứ tự `movies` được trình bày cho mọi người dùng (Netflix, ai đó?). Nhưng bằng cách `normalizing` chúng, chúng tôi đã bỏ qua thứ tự đó. Đây là lý do tại sao `normalizr` cung cấp cho chúng tôi kết quả, mối quan hệ của ID đại diện cho `fetched resource`.

Bạn đã tải một bộ phim duy nhất có ID 101 (API phản hồi 1 `object`)? Số `results property` sẽ là 101; tìm nạp một mảng phim có ID 101 và 100 (API gửi một mảng)? kết quả sẽ là mảng này [101.100] (giữ thứ tự). Xem một ví dụ dưới đây:

![](https://images.viblo.asia/094a877a-a198-4979-8de7-9a79d8b51202.png)

Lưu ý rằng phản hồi ban đầu là một mảng phim và thuộc tính kết quả của đối tượng được chuẩn hóa cũng là một mảng, giữ nguyên thứ tự ban đầu.

Không có khoảng trống nào trong `entities reducer` cho mảng `results` này, vì vậy chúng tôi phải đặt nó ở một nơi khác: `pages reducer`. `Pages reducer` là tất cả về các biến cục bộ mà các trang khác nhau cần để hiển thị thông tin của nó. Mảng của `elements`, `loading flags`, có thể là dữ liệu biểu mẫu nếu không sử dụng biểu mẫu `redux`. Ý tưởng cơ bản là trong khi `entities reducers` đang lưu dữ liệu từ `resource`, thì `pages reducer` lưu trữ dữ liệu liên quan đến màn hình `rendering`.

![](https://images.viblo.asia/c7ef526f-d256-4f47-8847-ab3dd75c79cf.png)

Như bạn có thể thấy, khi `mapping state` thành `props` trong `containers`, ta sẽ tạo mảng `mapping` tất cả các thành phần trong kết quả (`state.pages.boxOffice.myListMovies`, danh sách ID) cho dữ liệu thực tế trong thực thể.

Ý tưởng là chia lại `state.pages property` thành một tập hợp tất cả các trang bạn đang hiển thị trong ứng dụng của mình. Ví dụ: mọi `component` được tải bởi `route React Router`.

## Wrapping up

Cấu trúc này sẽ giúp bạn mở rộng quy mô ứng dụng dựa trên dữ liệu của mình một cách dễ dàng. Nếu bạn phải thêm các loại `entity` khác, nó sẽ thắng ảnh hưởng đến cấu trúc của trang. Nếu bạn muốn thêm một màn hình khác tải `entity` hiện tại theo một cách khác, bạn có thể làm việc với `pages reducer` mà không cần bận tâm về kiểm soát dữ liệu. Tất cả những điều này sẽ giúp chúng tôi tuân theo nguồn nguyên lý đơn giản, điều này sẽ giúp bạn tránh được nhiều vấn đề trong quá trình phát triển.

Cảm ơn và hi vọng bài viết có ích cho công việc của bạn.