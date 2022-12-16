## Introduction

Theo mặc định, các module ES6 trong create-react-app sử dụng đường dẫn tương đối (relative paths), cơ chế này work tốt trong trường hợp chúng ta import những module tương đối gần.
```JavaScript
import { createGoal } from './actions'

import { selectAuth } from './selectors';
```

Nhưng sử dụng đường dẫn tương đối sẽ trở thành nỗi ám ảnh thực sự khi bạn làm việc trên những ứng dụng có cấu trúc cây thư mục được lồng sâu (deeply nested), nhiều cấp (multi levels), bởi vì bạn sẽ phải sử dụng đến ký tự chấm-chấm (dot-dot) rất nhiều lần.

```JavaScript
import { createGoal } from '../../../AppContainer/actions';

import { selectAuth } from '../../../AppContainer/selectors';
 ```
 
Và bạn hãy tưởng tượng xem, còn gì kinh khủng hơn vào một ngày đẹp trời, vì lý do nào đó, bạn buộc phải di chuyển một module đã được import rất nhiều nơi đến một nơi khác trong cây thư mục. Giờ thì đành ngậm ngùi ngồi đếm dot-dot và chỉnh sửa đường dẫn import sao cho match với path đến module cần import thôi đúng không nào. 

Nếu việc thay đổi này xảy đến đối với 1 hoặc 2 module thì không sao, có thể là chúng ta sẽ kiên nhẫn để chỉnh sửa đường dẫn import trong sự hài lòng và thoải mái.  Nhưng với số lượng file thay đổi lớn, điều này thực sự rất tẻ nhạt và tốn thời gian.

Vấn đề này đặt ra câu hỏi: 

Liệu có cách nào để import một file theo cùng một cách, bất kể chúng ta đang đứng ở đâu trong cây thư mục ?  

Và câu trả lời là có. Powered bởi absolute imports

```JavaScript
import { createGoal } from 'containers/AppContainer/actions';

import { selectAuth } from 'containers/AppContainer/selectors';
```

Bất kể bạn import các file đó từ đường dẫn nào đều giống nhau. Bạn không còn phải lăn tăn , lo sợ thừa hay thiếu dot-dot nữa.

## Implement

1. Tạo file cấu hình .env đặt ở root của cây thư mục (cùng cấp với package.json) 
2. Set biến môi trường NODE_PATH bằng ./src

Hết rồi.

Đến đây, chắc các bạn sẽ tự hỏi tại sao create-react-app lại làm được như vậy. Theo mình tìm hiểu được thì create-react-app được cấu hình theo cách mà webpack của nó sẽ tự động nhận các tệp .env (.env.development, .env.production ...), và đọc các biến môi trường trong đó có NODE_PATH, sau đó import tuyệt đối (absolute imports) được sử dụng. 

Biến môi trường NODE_PATH work ở cả môi trường development và production. Bởi vì nó được nhúng trong suốt thời gian build, vì vậy ứng dụng của chúng ta sẽ có quyền truy cập vào môi trường của mình thông qua process.env

.env trong create-react-app thực sự vi diệu. Trong những article tiếp theo mình sẽ có một bài viết chi tiết nói về file cấu hình này các bạn nhé.

Create-react-app adds Custom Environment Variables docs: https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#adding-custom-environment-variables

Đến đây, nếu chưa làm được hay chưa rõ ở bước nào, các bạn nhập comment bên dưới mình sẽ lấy ví dụ minh hoạ nhé.

## Conclusion 

Absolute imports giúp chúng ta tiết kiệm rất nhiều thời gian và bớt đau đầu hơn. Bởi vì bạn không còn phải lăn tăn hay đong đếm số lượng dot-dot bạn cần mỗi khi import module hoặc thay đổi vị trí module. 

A big thanks to create-react-app :clap:

Chúc các bạn học tốt :bow: