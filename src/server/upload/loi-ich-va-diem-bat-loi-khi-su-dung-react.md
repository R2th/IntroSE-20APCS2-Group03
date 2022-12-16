Dịch từ bài viết [Reactを使うメリットとデメリット](https://qiita.com/HorieH/items/87e155a16ad847354e71) của tác giả [@HorieH](https://qiita.com/HorieH)
# React là gì?
Ở thời đại hiện nay, việc sử dụng HTML cùng jQuery được coi như một sự kết hợp đương nhiên. Nhưng nếu bạn muốn tạo một trang web động thì đoạn code jQuery của bạn sẽ cực kỳ phức tạp.

Vậy nếu ngay từ đầu ta dựng trang với JavaScript thì sao? Từ nhu cầu đó, React ra đời. React  được phát triển bởi Facebook và bản thân trang Facebook tạo bởi React. Với React, ta sẽ sử dụng JSX, xuất output là HTML (DOM) bằng JavaScript.

# JSX là gì?
1. Là cú pháp đặc biệt dùng để xuất HTML (DOM) bằng React

2. Chỉ cần biết syntax HTML, bạn sẽ sử dụng được JSX

      Vậy điểm khác giữa JSX và HTML là gì?
   - "class" được thay bằng "className"
   - Khi chỉnh style cho JSX, ta dùng {{}}; trong khi đó, dấu (-) không thể dùng cho JSX
   
              `{{margin-bottom:"1px"}} -> {{marginBottom:"1px"}}`
- Biến (variable) cần được bọc trong ngoặc nhọn {}
# Lợi ích khi sử dụng React
- Bạn được giải phóng khỏi jQuery
- Cool ngầu khi code JavaScript của bạn được viết bằng cách viết mới nhất
- Chạy ổn, mượt
- Do khi viết bằng React, các thành phần của trang sẽ được chia thành các phần nhỏ, vừa có thể sử dụng lại, vừa dễ maintain, lại phù hợp với atomic design đang thịnh hành gần đây.
- Nếu đã biết React, bạn sẽ có thể tạo app cho di động dùng ReactNative

# Điểm bất lợi khi dùng React
- Doc viết bằng tiếng Anh
- Do không viết trên nền HTML nên không dùng kết hợp với PHP được.
- Các JS library mà bạn vẫn dùng có thể sẽ không xài được nữa. Do các module dạng react-xxxx có thể được tạo và dùng thay thế, chỉ cần install bằng npm
- Khi upgrade version, có thể cách viết cũng sẽ thay đổi chút ít. Tuy nhiên, gần đây những thay đổi cũng không quá lớn, nên chỉ cần chú ý một chút thôi là sẽ không xảy ra vấn đề gì.
- Việc config để sử dụng được React hơi phức tạp. Bạn gần như không code được React với Windows, cần phải cài Node.js và cần thêm nhiều library như babel hay webpack. Thế nhưng đừng do, chỉ cần làm theo hướng dẫn sẵn có dành cho người mới bắt đầu: [create-react-app](https://reactjs.org/blog/2016/07/22/create-apps-with-no-configuration.html) bạn sẽ setting được môi trường thao tác sử dụng babel hoặc webpack. Và sau khi đã tạo môi trường 1 lần, sau đó bạn có thể dễ dàng tiếp tục thao tác.
- React không giỏi trong việc xử lý Ajax
- Cần biết ES6 trước khi bắt đầu với React
# Hãy cùng xem các cấp độ học React
Lv.0 Học cách viết ES6
Lv.1 Thử chạy React bằng cách làm theo hướng dẫn create-react-app
Lv.2 Học qua React tutorial hay sample code
Lv.3 Học cách chuyển page bằng react-router
Lv.4  Học Redux
Lv.5 Học về lên kết giữa react và redux bằng react-redux
Lv.6 Học cách chuyển trang bằng cách dùng redux-router
Lv.7 Học xử lý Ajax bằng react-saga
# Một vấn đề mới lại phát sinh, vậy Redux là gì?
Redux là một framework giúp cho phân chia gọn gàng việc quản lý và flow xử lý chương trình. Redux và React thường được sử dụng cùng nhau. Trước khi Redux xuất hiện, người ta sử dụng một framework gần với nó là Flux.

Việc sử dụng Redux sẽ giúp code dễ maintain hơn nhưng việc học Redux sẽ tốn thời gian và công sức. Nếu không học bạn sẽ chẳng hiểu nổi tại sao code Redux lại được viết như vậy.

Không chỉ được dùng kết hợp với React, gần đây, Redux còn được dùng với Ruby

Nếu chỉ làm sản phẩm nhỏ, chỉ cần React là đủ, chưa cần biết về Redux

# Tổng kết
Nếu bạn muốn tạo một trang với đa số các thành phần ở trạng thái tĩnh, hãy dùng jQuery.

Nếu muốn tạo trang web động tựa như một application, hãy nghĩ tới React nhé.