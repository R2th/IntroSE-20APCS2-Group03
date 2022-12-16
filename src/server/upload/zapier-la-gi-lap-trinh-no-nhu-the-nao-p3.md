Ở bài viết trước mình đả hướng dẩn khá rỏ ràng về Zapier Platform , các bạn có thể tham khảo ở đây nhé. https://viblo.asia/p/zapier-la-gi-lap-trinh-no-nhu-the-nao-p2-RQqKLOaz57z

Bài viết tiếp theo này mình hướng các bạn làm sao để viết một Zap hoàn chỉnh bằng Zapier CLI nhé.

### 4. Tạo ứng dụng bằng Zapier CLI.

Ứng dụng CLI là một dạng API App của bạn. Bạn xây dựng một ứng dụng Node.js để xuất một đối tượng  và tải nó lên Zapier. Đối với những người không quen thuộc với thuật ngữ của Zapier, đây là cách các bạn nắm được khái niệm trong Zapier CLI và cách để trải nghiệm nó.

 * Authentication:  (thường) cho phép chúng tôi biết thông tin đăng nhập để yêu cầu người dùng. Điều này được sử dụng trong phần Tài khoản Connect Connect của Trình soạn thảo Zap.
 * Triggers :  đọc dữ liệu từ API của bạn. Những cái này có phần riêng trong Trình soạn thảo Zap.
 * Creates : gửi dữ liệu tới API của bạn để tạo bản ghi mới. Những thứ này được liệt kê dưới các hành động của Zap Editor.
 * Searches :  trong đó tìm thấy hồ sơ cụ thể trong hệ thống của bạn. Những thứ này cũng được liệt kê dưới các hành động của Zap Editor.
 * Resources :  xác định loại đối tượng trong API của bạn (giả sử là một liên hệ) và các hoạt động có sẵn để thực hiện trên đó. Chúng được tự động trích xuất thành Triggers, Tìm kiếm và Tạo.


#### a. Yêu cầu cơ bản về cấu hình và cài đặt. 

Tất cả các ứng dụng Zapier CLI được chạy bằng Node.js v8.10.0.

- Bạn có thể phát triển bằng bất kỳ phiên bản Node nào mà bạn thích, nhưng mã cuối cùng của bạn phải tương thích với v8.10.0. Nếu bạn sử dụng các tính năng chưa có trong v8.10.0, bạn có thể dịch mã của mình sang định dạng tương thích với Babel (hoặc tương tự).

- Để đảm bảo sự ổn định cho người dùng , khuyến khích bạn chạy thử nghiệm trên v8.10.0 trước khi mã của bạn đến tay người dùng. Điều này có thể được thực hiện theo nhiều cách.

- Ngoài ra, bạn có thể thay đổi phiên bản nút cục bộ của mình bằng các công cụ như nvm hoặc n. Sau đó, bạn có thể hoán đổi sang phiên bản đó với nvm, sử dụng v8.10.0 hoặc thực hiện kiểm tra zapier nvm exec v8.10.0 để bạn có thể chạy thử mà không phải chuyển đổi phiên bản trong khi phát triển.

```
# cài đặt zapier ở global 
npm install -g zapier-platform-cli

# cài đặt thông tin người dùng Zapier's platform để deploy
zapier login
```

Zapier CLI của bạn nên được cài đặt và sẵn sàng hoạt động vào thời điểm này. Tiếp theo, Sẽ tạo ra ứng dụng đầu tiên!

```
# tạo một thư mục với các tệp yêu cầu tối thiểu
zapier init example-app

# di chuyển vào thư mục 
cd example-app

# cài đặt tất cả các thư viện cần thiết cho ứng dụng của bạn
npm install
```

Dưới đây là các file basic nhất cần cài ở project NodeJs của bạn .

![](https://images.viblo.asia/af970853-4a14-44c1-9304-100265292938.png)


Bây giờ bạn nên có một ứng dụng địa phương làm việc. Bạn có thể chạy một số lệnh cục bộ để thử.

```
# run the local tests
# the same as npm test, but adds some extra things to the environment
zapier test
```

Tiếp theo, bạn có thể muốn tải ứng dụng lên Store của Zapier để bạn có thể bắt đầu thử nghiệm trực tiếp.

```
# push your app to Zapier
zapier push
```

Như phần trên là một quy trình có bản để có một ứng dụng Zap hoàn chỉnh. Vậy chúng ta sẽ bắt đầu đi từng phần chi tiết để hoàn thiện phần logic mình muốn làm nhé . 

#### b. Tìm hiểu cấu trúc thư mục .

- Local App Definition 

Dưới là cấu trúc cây thu mục tối thiểu để bạn có thể deploy một ứng dụng Zapier nhé.

![](https://images.viblo.asia/df0f825a-c455-4cc0-ab27-74c3a78b4aa6.png)


Định nghĩa cốt lõi của App bạn sẽ trông giống như thế này và là những gì **index.js**  sẽ cung cấp và chỉ export theo định dạng duy nhất này :

```JavaScript
const App = {
  // both version strings are required
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,

  // see "Authentication" section below
  authentication: {},

  // see "Dehydration" section below
  hydrators: {},

  // see "Making HTTP Requests" section below
  requestTemplate: {},
  beforeRequest: [],
  afterResponse: [],

  // See "Resources" section below
  resources: {},

  // See "Triggers/Searches/Creates" section below
  triggers: {},
  searches: {},
  creates: {}
};

module.exports = App;
```


Như đả nói ở bài trước chỉ cần có 2 phần chính là Trigger và Action là đủ để mình có thể deploy được 1 app Zapier hoàn chỉnh và phục vụ mục đích rồi. Nên mình sẽ nói qua nhũng phần cần thiết thôi .

#### c. Authentication
Ở phần này có nhiều cách Authen mình đả nói ở phần trước. Cong bây giờ mình chỉ hước dẩn các bạn phần authen **Custom** theo kiểu API key đơn giản để các bạn có thể hình dung được hệ thống như thế nào.


Đây là những gì hầu hết các ứng dụng được điều khiển bởi API App . Bạn có thể sẽ cung cấp một số phần mềm trung gian trước tùy chỉnh hoặc **requestTemplate** để hoàn tất xác thực bằng cách thêm/thay đổi các tiêu đề cần thiết.

> Ứng dụng mẫu: kiểm tra https://github.com/zapier/zapier-pl platform-example-app-custom-auth để biết ứng dụng ví dụ hoạt động cho auth tùy chỉnh.

```JavaScript
const authentication = {
  type: 'custom',
  // "test" là một chức năng cụ thể chứ không phải là Unit test đâu nhe. 
  test: {
    // Đây là link API get để request authen.
    url:
      'https://.example.com/api/accounts/me.json'
  },
   // Đây là Field của trường API key mình cần cung cấp. Nếu mapping với server thì server gửi tocken về và mình có thể dùng token này để thực hiện bước Trigger. 
   // Những thông số ở đây đều được quy định trong document và mình phải đọc để nắm rỏ detail của các field này nhé .
  fields: [
    {
      key: 'subdomain',
      type: 'string',
      required: true,
      helpText: 'Found in your browsers address bar after logging in.'
    },
    {
      key: 'api_key',
      type: 'string',
      required: true,
      helpText: 'Found on your settings page.'
    }
  ]
};
// Setting cho phần request API authen lên server của mình .
// các bạn xem lại phần request bằng Ajax nhe. cái này tương tự vậy thôi .
const addApiKeyToHeader = (request, z, bundle) => {
  request.headers['X-Subdomain'] = bundle.authData.subdomain;
  const basicHash = Buffer(`${bundle.authData.api_key}:x`).toString('base64');
  request.headers.Authorization = `Basic ${basicHash}`;
  return request;
};

// Bước này là add phần authen vào App trong thư mục index.js nhé .

const App = {
  // ...
  authentication: authentication,
  beforeRequest: [addApiKeyToHeader]
  // ...
};
```

#### d. Triggers/Searches/Creates

Kích hoạt, Tìm kiếm và Tạo là cách ứng dụng xác định những gì nó có thể làm. Kích hoạt đọc dữ liệu vào Zapier . Tìm kiếm xác định hồ sơ cá nhân (tìm công thức theo tiêu đề). Tạo bản ghi mới trong hệ thống của bạn (thêm một công thức vào danh mục).

Định nghĩa cho mỗi trong số này theo cùng một cấu trúc. Đây là một ví dụ về một kích hoạt:

```
const recipeListRequest = {
  url: 'http://example.com/recipes'
};

const App = {
  //...
  triggers: {
    new_recipe: {
      key: 'new_recipe', // xác định duy nhất kích hoạt
      noun: 'Recipe', // user-friendly từ được sử dụng để chỉ tài nguyên
      // `display` điều khiển phần trình bày trong Trình soạn thảo Zapier
      display: {
        label: 'New Recipe',
        description: 'Triggers when a new recipe is added.'
      },
      // `operation` thực hiện lệnh gọi API được sử dụng để tìm nạp dữ liệu
      operation: {
        perform: recipeListRequest
      }
    },
    another_trigger: {
      // Another trigger definition...
    }
  }
};

```

Bạn có thể tìm thêm chi tiết về định nghĩa cho từng định nghĩa bằng cách xem  [Trigger Schema](https://zapier.github.io/zapier-platform-schema/build/schema.html#triggerschema), [Search Schema](https://zapier.github.io/zapier-platform-schema/build/schema.html#searchschema), và [Create Schema](https://zapier.github.io/zapier-platform-schema/build/schema.html#createschema).

#### e. Kết bài. 

Bài viết trên mình chỉ đúc rút từ trang chủ của Zapier và kinh nghiệm làm dự án của mình . Nó thực sự không chi tiết lắm nhưng đủ để các bạn hiểu thực hiện một ứng dụng Zapier như thế nào. 

Thực sự khâu deploy của nó hơi phức tạp và cần nhiều thời gian cũng như số lượng người dùng cố định mới đủ điều kiện để deploy được lên Store của nó. Nhưng đôi nét để các bạn hiểu về công nghệ mới này như thế là đủ. 

Cảm ơn bạn đã đọc bài viết này. Thank for ...