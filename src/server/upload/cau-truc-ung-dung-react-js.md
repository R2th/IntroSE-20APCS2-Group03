Để quản lý state của app React,  có nhiều cách để cấu trúc một ứng dụng React js

### Cấu trúc dựa theo nhiệm vụ của file hay dựa theo tính năng hoặc loại dữ liệu 

Trong ví dụ và các bài hướng dẫn của các project Redux/React , kể cả phiên bản chính thức trên trang chủ của redux, thì cấu trúc file phổ biến là theo chức năng của file: actions, reducers, container và (presentational) components 

```ruby
- app/
  - actions/
      CallActions.js
      ArtifactActions.js
      FilterActions.js
      ...
  - reducers/
      CallReducer.js
      ArtifactReducer.js
      FilterReducer.js
      ...
  - containers/
      CallGraph.jsx
      FlameChart.jsx
      FilterPanel.jsx
  - components/
      ...
  index.js
  rootReducer.js
```

Tôi đã sử dụng cấu trúc này ngay từ đầu và nhận thấy, giới hạn của phương pháp này là khó mở rộng được. Trong các folder chức năng này, các file giống nhau về mặt nhiệm vụ nhưng tính năng và miền dữ liệu sẽ tăng lên trong các ứng dụng thực tế. Kết quả là trong folder sẽ càng ngày càng nhiều file. Ngoài ra, khi tôi bắt đầu một tính năng mới, tôi sẽ mất nhiều thời gian để tìm tất cả các file liên quan đến tính năng đấy.

Sau đó, tôi thử nhóm các file theo các tính năng. 

```ruby
  /features
    /feature1
      component.js
      container.js
      actions.js
      reducer.js
      saga.js
    /feature2
    /feature3
```

Nhưng có một vấn đề đó là một tính năng hay một màn hình thường bao gồm nhiều miền dữ liệu. Vd, khi render một trang list sản phẩm , thì cần phải render search, filter , sort , modal , .... Ta sẽ phải tạo tương ứng bằng đấy file component và container, sẽ không thể tái sử dụng được.

Ngoài ra, một miền dữ liệu có thể được chia sẻ giữa các tính năng và nó cũng không thực sự là một tính năng hay một view. Các folder reducers, actions, constant, liên quan đến điều khiển luồng dữ liệu và xử lý logic trong khi containers và components dùng để xây dựng các view. 

Tôi thử xây dựng cấu trúc bằng cách tách các containers và components từ các folder tính năng:

```ruby
-app/
  - data/
    - artifacts/
        ArtifactReducer.js
        ArtifactActions.js
        ArtifactSelectors.js 
    - calls/
        CallsReducer.js
        CallsActions.js
        CallsSelectors.js
    - filters/
        ...
    - threads/
        ...
    - ...
  - containers/
      FlameChartContainer.jsx // depends on calls, threads, filters
      FilterContainer.jsx     // depends on filters
      CallGraphContainer.jsx  // depends on artifacts and filters
  - components/
      ...
  index.js
  rootReducer.js
```

Với cách cấu trúc này, ta có một vài ưu điểm:
- Các miền dữ liệu và logic nghiệp vụ khác nhau liên quan đến actions, reducers được độc lập và đóng gói 
- Các tính năng và các view có thể được xây dựng dựa theo dữ liệu và các sự phụ thuộc có thể được xác định rõ ràng.
- Các React component được tái sử dụng cho các tính năng và view 

### Module import và export 

Với hệ thống module ES6, mỗi file là một module và chúng ta cần export các hàm và các biến từ các file đấy và import chúng vào để sử dụng. Vì vậy, khi một container phụ thuộc vào một miền dữ liệu, chúng ta có thể cần import các reducers, actions, ...

```ruby
import CallReducer from '../data/calls/CallReducer.js';
import * as CallActions from '../data/calls/CallActions.js';
import * as CallSelectors from '../data/calls/CallSelectors.js';
```

Như vậy, cần yêu cầu phải import nhiều kèm theo các đường dẫn liên quan và cấu trúc của miền dữ liệu  /data/calls. Các tốt hơn là đóng gói miền dữ liệu bằng cách tạo file index.js

```ruby
// data/calls/index.js
import CallReducer from './CallReducer';
import * as CallSelectors from './CallSelectors';
import * as CallActions from './CallActions';
export {
  CallReducer,
  CallSelectors,
  CallActions
}
```

File index.js trở thành một public API cho miền dữ liệu đấy và giấu cấu trúc file bên trong đi. Kết quả là, sự phụ thuộc vào module trong một container sẽ được giảm đi chỉ còn một import duy nhất.

```ruby
import { CallReducer, CallSelectors, CallActions } from '../data/calls'
```

Bạn có thể thay đổi cấu trúc bên trong của module miền dữ liệu mà không phải lo lắng làm phá vỡ sự phụ thuộc. 

### Test được đặt ở đâu?

Có nhiều vị trí để đặt test, nhưng tôi khá lười, nên chỉ muốn được nhìn file source ngay. Vậy nên, tôi chuyển test vào trong folder app 

```ruby
- app/
  - data/
    - spec/
        CallReducer.spec.js
        CallSelectors.spec.js
      CallReducer.js
      CallActions.js
      CallSelectors.js
```

Bằng cách sử dụng Karma, ta có thể scan và tìm được tất cả các file test một cách dễ dàng. Vì vậy, chuyển các filet test như thế không ảnh hưởng gì lắm.

```ruby
// karma.conf.js
files:[
 'src/app/**/*.spec.js'
]
```

### Kết luận
Với cách cấu trúc này, dự án có thể chia tách thành miền dữ liệu, logic nghiệp vụ, các view mà vẫn đảm bảo sự phụ thuộc và tái sử dụng các component.