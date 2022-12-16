## **Biến**
### Sử dụng tên biến có nghĩa và dễ phát âm

**Không tốt:**
```javascript
const yyyymmdstr = moment().format('YYYY/MM/DD');
```

**Tốt:**
```javascript
const currentDate = moment().format('YYYY/MM/DD');
```
-----

### Sử dụng cùng từ vựng cho cùng loại biến

**Không tốt:**
```javascript
getUserInfo();
getClientData();
getCustomerRecord();
```

**Tốt:**
```javascript
getUser();
```
-----

### Sử dụng các tên có thể tìm kiếm được
Chúng ta sẽ đọc code nhiều hơn là viết chúng. Điều quan trọng là code chúng ta
viết có thể đọc được và tìm kiếm được. Việc đặt tên các biến *không* có ngữ
nghĩa so với chương trình, chúng ta có thể sẽ làm người đọc code bị tổn thương
tinh thần.
Hãy làm cho các tên biến của bạn có thể tìm kiếm được. Các công cụ như
[buddy.js](https://github.com/danielstjules/buddy.js) và
[ESLint](https://github.com/eslint/eslint/blob/660e0918933e6e7fede26bc675a0763a6b357c94/docs/rules/no-magic-numbers.md)
có thể giúp nhận ra các hằng chưa được đặt tên.

**Không tốt:**
```javascript
// 86400000 là cái quái gì thế?
setTimeout(blastOff, 86400000);

```

**Tốt:**
```javascript
// Khai báo chúng như một biến global.
const MILLISECONDS_IN_A_DAY = 86400000;

setTimeout(blastOff, MILLISECONDS_IN_A_DAY);

```
-----

### Sử dụng những biến có thể giải thích được
**Không tốt:**
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
saveCityZipCode(address.match(cityZipCodeRegex)[1], address.match(cityZipCodeRegex)[2]);
```

**Tốt:**
```javascript
const address = 'One Infinite Loop, Cupertino 95014';
const cityZipCodeRegex = /^[^,\\]+[,\\\s]+(.+?)\s*(\d{5})?$/;
const [, city, zipCode] = address.match(cityZipCodeRegex) || [];
saveCityZipCode(city, zipCode);
```
-----

### Tránh hại não người khác
Tường minh thì tốt hơn là ẩn.

**Không tốt:**
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((l) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  // Khoan, `l` làm cái gì vậy?
  dispatch(l);
});
```

**Tốt:**
```javascript
const locations = ['Austin', 'New York', 'San Francisco'];
locations.forEach((location) => {
  doStuff();
  doSomeOtherStuff();
  // ...
  // ...
  // ...
  dispatch(location);
});
```
-----

### Đừng thêm những ngữ cảnh không cần thiết
Nếu tên của lớp hay đối tượng của bạn đã nói lên điều gì đó rồi, đừng lặp
lại điều đó trong tên biến nữa.

**Không tốt:**
```javascript
const Car = {
  carMake: 'Honda',
  carModel: 'Accord',
  carColor: 'Blue'
};

function paintCar(car) {
  car.carColor = 'Red';
}
```

**Tốt:**
```javascript
const Car = {
  make: 'Honda',
  model: 'Accord',
  color: 'Blue'
};

function paintCar(car) {
  car.color = 'Red';
}
```
-----

### Sử dụng những tham số mặc định thay vì kiểm tra các điều kiện lòng vòng

**Không tốt:**
```javascript
function createMicrobrewery(name) {
  const breweryName = name || 'Hipster Brew Co.';
  // ...
}

```

**Tốt:**
```javascript
function createMicrobrewery(breweryName = 'Hipster Brew Co.') {
  // ...
}

```
-----

## **Hàm**
### Đối số của hàm (lý tưởng là ít hơn hoặc bằng 2)
Giới hạn số lượng param của hàm là một điều cực kì quan trọng bởi vì nó làm cho
hàm của bạn trở nên dễ test hơn. Trường hợp có nhiều hơn 3 params có thể dẫn
đến việc bạn phải test hàng tấn test case khác nhau với những đối số riêng biệt.

1 hoặc 2 đối số là trường hợp lý tưởng, còn trường hợp 3 đối số thì nên tránh
nếu có thể. Những trường hợp khác (từ 3 params trở lên) thì nên được gộp lại.
Thông thường nếu có nhiều hơn 2 đối số thì hàm của bạn đang cố thực hiện quá
nhiều việc rồi đấy. Trong trường hợp ngược lại, phần lớn thời gian một đối
tượng cấp cao sẽ là đủ để làm đối số.

Kể từ khi Javascript cho phép tạo nhiều đối tượng một cách nhanh chóng, mà
không cần nhiều lớp có sẵn, bạn có thể sử dụng một đối tượng nếu bạn cần truyền
nhiều đối số.

Để làm cho rõ ràng một hàm mong đợi những thuộc tính gì, bạn có thể sử dụng
cấu trúc destructuring của ES6. Điều này có một số ưu điểm:

1. Khi một ai đó nhìn vào hàm, những thuộc tính nào được sử dụng sẽ trở nên
rõ ràng ngay lập tức.
2. Destructuring cũng sao chép lại các giá trị ban đầu được chỉ định của đối
tượng đối số được truyền vào hàm. Điều này có thể giúp ngăn chặn các ảnh hưởng
phụ. Chú ý: các đối tượng và mảng được destructure từ đối tượng đối số thì không
được sao chép lại.
3. Linter có thể sẽ cảnh báo bạn về những thuộc tính không sử dụng, điều mà không
thể xảy ra nếu không có destructuring.

**Không tốt:**
```javascript
function createMenu(title, body, buttonText, cancellable) {
  // ...
}
```

**Tốt:**
```javascript
function createMenu({ title, body, buttonText, cancellable }) {
  // ...
}

createMenu({
  title: 'Foo',
  body: 'Bar',
  buttonText: 'Baz',
  cancellable: true
});
```
-----


### Hàm chỉ nên giải quyết một vấn đề
Đây là quy định quan trọng nhất của kỹ thuật phần mềm. Khi một hàm thực hiện
nhiều hơn 1 việc, chúng sẽ trở nên khó khăn hơn để viết code, test, và suy luận.
Khi bạn có thể tách biệt một hàm để chỉ thực hiện một hành động, thì sẽ dễ dàng
hơn để tái cấu trúc và code của bạn sẽ dễ đọc hơn nhiều. Nếu bạn chỉ cần làm theo
hướng dẫn này thôi mà không cần làm gì khác thì bạn cũng đã giỏi hơn nhiều
developer khác rồi.

**Không tốt:**
```javascript
function emailClients(clients) {
  clients.forEach((client) => {
    const clientRecord = database.lookup(client);
    if (clientRecord.isActive()) {
      email(client);
    }
  });
}
```

**Tốt:**
```javascript
function emailClients(clients) {
  clients
    .filter(isClientActive)
    .forEach(email);
}

function isClientActive(client) {
  const clientRecord = database.lookup(client);
  return clientRecord.isActive();
}
```
-----

### Tên hàm phải nói ra được những gì chúng làm

**Không tốt:**
```javascript
function addToDate(date, month) {
  // ...
}

const date = new Date();

// Khó để biết được hàm này thêm gì thông qua tên hàm.
addToDate(date, 1);
```

**Tốt:**
```javascript
function addMonthToDate(month, date) {
  // ...
}

const date = new Date();
addMonthToDate(1, date);
```
-----

### Hàm chỉ nên có một lớp trừu tượng
Khi có nhiều hơn một lớp trừu tượng thì hàm của bạn đang làm quá nhiều. Chia
nhỏ các hàm ra sẽ làm cho việc test và tái sử dụng dễ dàng hơn.

**Không tốt:**
```javascript
function parseBetterJSAlternative(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      // ...
    });
  });

  const ast = [];
  tokens.forEach((token) => {
    // lex...
  });

  ast.forEach((node) => {
    // parse...
  });
}
```

**Tốt:**
```javascript
function tokenize(code) {
  const REGEXES = [
    // ...
  ];

  const statements = code.split(' ');
  const tokens = [];
  REGEXES.forEach((REGEX) => {
    statements.forEach((statement) => {
      tokens.push( /* ... */ );
    });
  });

  return tokens;
}

function lexer(tokens) {
  const ast = [];
  tokens.forEach((token) => {
    ast.push( /* ... */ );
  });

  return ast;
}

function parseBetterJSAlternative(code) {
  const tokens = tokenize(code);
  const ast = lexer(tokens);
  ast.forEach((node) => {
    // parse...
  });
}
```
-----

### Xóa code trùng lặp
Tuyệt đối tránh những dòng code trùng lặp. Code trùng lặp thì không tốt bởi vì
nếu bạn cần thay đổi cùng một logic, bạn phải sửa ở nhiều hơn một nơi.

Hãy tưởng tượng nếu bạn điều hành một nhà hàng và bạn theo dõi hàng tồn kho:
bao gồm cà chua, hành tây, tỏi, gia vị, vv.... Nếu bạn có nhiều danh sách
quản lý, thì tất cả chúng phải được thay đổi khi bạn phục vụ một món ăn có
chứa cà chua. Nếu bạn chỉ có 1 danh sách, thì việc cập nhật ở một nơi thôi.

Thông thường, bạn có những dòng code lặp lại bởi vì bạn có 2 hay nhiều hơn
những thứ chỉ khác nhau chút ít, mà chia sẻ nhiều thứ chung, nhưng sự khác
nhau của chúng buộc bạn phải có 2 hay nhiều hàm riêng biệt để làm nhiều điều
tương tự nhau. Xóa đi những dòng code trùng có nghĩa là tạo ra một abstraction
có thể xử lý tập những điểm khác biệt này chỉ với một hàm/module hay class.

Có được một abstraction đúng thì rất quan trọng, đó là lý do tại sao bạn nên
tuân thủ các nguyên tắc SOLID được đặt ra trong phần *Lớp*. Những abstraction
không tốt có thể còn tệ hơn cả những dòng code bị trùng lặp, vì thế hãy cẩn
thận! Nếu bạn có thể tạo ra một abstraction tốt, hãy làm nó! Đừng lặp lại chính
mình, nếu bạn không muốn đi cập nhật nhiều nơi bất cứ khi nào bạn muốn thay đổi
một thứ gì đó.

**Không tốt:**
```javascript
function showDeveloperList(developers) {
  developers.forEach((developer) => {
    const expectedSalary = developer.calculateExpectedSalary();
    const experience = developer.getExperience();
    const githubLink = developer.getGithubLink();
    const data = {
      expectedSalary,
      experience,
      githubLink
    };

    render(data);
  });
}

function showManagerList(managers) {
  managers.forEach((manager) => {
    const expectedSalary = manager.calculateExpectedSalary();
    const experience = manager.getExperience();
    const portfolio = manager.getMBAProjects();
    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```

**Tốt:**
```javascript
function showEmployeeList(employees) {
  employees.forEach((employee) => {
    const expectedSalary = employee.calculateExpectedSalary();
    const experience = employee.getExperience();

    let portfolio = employee.getGithubLink();

    if (employee.type === 'manager') {
      portfolio = employee.getMBAProjects();
    }

    const data = {
      expectedSalary,
      experience,
      portfolio
    };

    render(data);
  });
}
```
-----

### Thiết lập những đối tượng mặc định với Object.assign

**Không tốt:**
```javascript
const menuConfig = {
  title: null,
  body: 'Bar',
  buttonText: null,
  cancellable: true
};

function createMenu(config) {
  config.title = config.title || 'Foo';
  config.body = config.body || 'Bar';
  config.buttonText = config.buttonText || 'Baz';
  config.cancellable = config.cancellable === undefined ? config.cancellable : true;
}

createMenu(menuConfig);
```

**Tốt:**
```javascript
const menuConfig = {
  title: 'Order',
  // User did not include 'body' key
  buttonText: 'Send',
  cancellable: true
};

function createMenu(config) {
  config = Object.assign({
    title: 'Foo',
    body: 'Bar',
    buttonText: 'Baz',
    cancellable: true
  }, config);

  // config now equals: {title: "Order", body: "Bar", buttonText: "Send", cancellable: true}
  // ...
}

createMenu(menuConfig);
```
-----


### Đừng sử dụng các cờ như đối số của hàm
Các biến cờ cho người dùng của bạn biết rằng hàm thực hiện nhiều hơn một việc. Hàm
chỉ nên làm một nhiệm vụ. Vì vậy hãy tách hàm của bạn nếu chúng đang làm cho code
rẽ nhánh dựa trên một biến boolean.

**Không tốt:**
```javascript
function createFile(name, temp) {
  if (temp) {
    fs.create(`./temp/${name}`);
  } else {
    fs.create(name);
  }
}
```

**Tốt:**
```javascript
function createFile(name) {
  fs.create(name);
}

function createTempFile(name) {
  createFile(`./temp/${name}`);
}
```
-----

### Tránh những ảnh hưởng phụ (phần 1)
Một hàm tạo ra ảnh hưởng phụ nếu nó làm bất kì điều gì khác hơn là nhận một giá
trị đầu vào và trả về một hoặc nhiều giá trị. Ảnh hưởng phụ có thể là ghi một
file, thay đổi vài biến toàn cục, hoặc vô tình đưa tất cả tiền của bạn cho một
người lạ.

Bây giờ, cũng có khi bạn cần ảnh hưởng phụ trong một chương trình. Giống như ví dụ
trước, bạn cần ghi một file. Những gì bạn cần làm là tập trung vào nơi bạn sẽ làm
nó. Đừng viết hàm và lớp riêng biệt để tạo ra một file cụ thể. Hãy có một service
để viết nó. Một và chỉ một.

Điểm chính là để tránh những lỗi chung như chia sẻ trạng thái giữa những đối tượng
mà không có bất kì cấu trúc nào, sử dụng các kiểu dữ liệu có thể thay đổi được mà
có thể được ghi bởi bất cứ thứ gì, và không tập trung nơi có thể xảy ra các ảnh hưởng
phụ. Nếu bạn có thể làm điều đó, bạn sẽ hạnh phúc hơn so với phần lớn các lập trình
viên khác đấy.

**Không tốt:**
```javascript
// Biến toàn cục được tham chiếu bởi hàm dưới đây.
// Nếu chúng ta có một hàm khác sử dụng name, nó sẽ trở thành một array
let name = 'Ryan McDermott';

function splitIntoFirstAndLastName() {
  name = name.split(' ');
}

splitIntoFirstAndLastName();

console.log(name); // ['Ryan', 'McDermott'];
```

**Tốt:**
```javascript
function splitIntoFirstAndLastName(name) {
  return name.split(' ');
}

const name = 'Ryan McDermott';
const newName = splitIntoFirstAndLastName(name);

console.log(name); // 'Ryan McDermott';
console.log(newName); // ['Ryan', 'McDermott'];
```
-----

### Tránh những ảnh hưởng phụ (phần 2)
Trong JavaScript, các kiểu cơ bản được truyền theo giá trị và các đối
tượng/mảng được truyền theo tham chiếu. Trong trường hợp các đối tượng và mảng,
ví dụ nếu hàm của chúng ta tạo ra thay đổi trong một mảng giỏ mua hàng, ví dụ
thêm một sản phẩm để mua, thì bất kì hàm khác mà sử dụng mảng 'giỏ hàng' sẽ bị
ảnh hưởng bởi việc thêm này. Điều này có thể tốt, tuy nhiên nó cũng có thể trở
nên tồi tệ. Hãy tưởng tượng trường hợp xấu sau:

Người sử dụng nhấp chuột "Mua hàng", nút mua hàng sẽ gọi tới hàm `mua`, cái mà
sinh ra một yêu cầu mạng và gửi mảng `giỏ` lên server. Do kết nối chậm, hàm `mua`
có thể giữ việc thử lại yêu cầu. Bây giờ, nếu trong thời gian đó người sử dụng vô
tình nhấn chuột vào nút "Thêm vào giỏ hàng" ở một sản phẩm mà họ không thực sự muốn
trước khi mạng thực hiện yêu cầu? Nếu điều đó xảy ra và mạng bắt đầu gửi yêu cầu
thì hàm mua sẽ vô tình thêm một sản phẩm vì nó có một tham chiếu đế mảng giỏ hàng
mà hàm `thêm sản phẩm vào giỏ hàng` đã thay đổi bằng cách thêm một sản phẩm mà họ
không muốn.

Một giải pháp tốt là hàm `thêm sản phẩm vào giỏ hàng` luôn luôn tạo một bản sao của
`giỏ`, thay đổi nó, và trả về bản sao đó. Điều này đảm bảo rằng không một hàm nào có
nắm giữ tham chiếu của giỏ mua hàng bị ảnh hưởng bởi bất kì thay đổi.

Hai lưu ý cho cách tiếp cận này:
  1. Có thể có những trường hợp mà bạn thực sự muốn thay đổi đối tượng đầu vào, nhưng
  khi bạn áp dụng phương pháp này bạn sẽ thấy những trường hợp này thì hiếm. Hầu hết
  các vấn đề có thể được cấu trúc lại để không còn ảnh hưởng phụ.
  2. Nhân bản các đối tượng lớn có thể ảnh hưởng đến hiệu năng. May mắn thay, đó không
  phải là một vấn đề lớn trong thực tế bởi vì có [immutable-js](https://facebook.github.io/immutable-js/)
  cho phép cách tiếp cận này trở nên nhanh và ít tốn bộ nhớ so với khi bạn tự sao chép
  những đối tượng và mảng.

**Không tốt:**
```javascript
const addItemToCart = (cart, item) => {
  cart.push({ item, date: Date.now() });
};
```

**Tốt:**
```javascript
const addItemToCart = (cart, item) => {
  return [...cart, { item, date : Date.now() }];
};
```

-----

### Đừng ghi lên những hàm toàn cục
Gây ảnh hưởng đến các biến toàn cục là một bad practice trong JavaScript vì bạn
có thể xung đột với các thư viện khác và người dùng API của bạn sẽ không biết
trước được cho đến khi cho một lỗi xảy ra trên sản phẩm. Hãy suy nghĩ ví dụ này:
điều gì xảy ra nếu bạn muốn mở rộng phương thức của Array trong JavaScript native
để có thể có một hàm `diff` chỉ ra sự khác nhau giữa hai mảng? Bạn có thể viết một
hàm mới với `Array.prototype`, nhưng nó có thể xung đột với một thư viện khác mà
đã làm những điều tương tự. Điều gì xảy ra nếu thư viện đó chỉ sử dụng `diff` để
tìm sự khác biệt giữa phần tử đầu tiên và cuối cùng của một mảng? Đó là lý do tại
sao sẽ là tốt hơn nhiều khi chỉ sử dụng các lớp ES2015/ES6 và đơn giản mở rộng
`Array` toàn cục.

**Không tốt:**
```javascript
Array.prototype.diff = function diff(comparisonArray) {
  const hash = new Set(comparisonArray);
  return this.filter(elem => !hash.has(elem));
};
```

**Tốt:**
```javascript
class SuperArray extends Array {
  diff(comparisonArray) {
    const hash = new Set(comparisonArray);
    return this.filter(elem => !hash.has(elem));
  }
}
```
-----

### Ủng hộ lập trình hàm hơn là lập trình mệnh lệnh
JavaScript không phải là ngôn ngữ lập trình hàm giống như là Haskell, nhưng nó có
đặc trưng hàm của nó. Những ngôn ngữ lập trình hàm thì gọn gàng hơn và dễ test hơn.
Hãy dùng cách lập trình này khi bạn có thể.

**Không tốt:**
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

let totalOutput = 0;

for (let i = 0; i < programmerOutput.length; i++) {
  totalOutput += programmerOutput[i].linesOfCode;
}
```

**Tốt:**
```javascript
const programmerOutput = [
  {
    name: 'Uncle Bobby',
    linesOfCode: 500
  }, {
    name: 'Suzie Q',
    linesOfCode: 1500
  }, {
    name: 'Jimmy Gosling',
    linesOfCode: 150
  }, {
    name: 'Gracie Hopper',
    linesOfCode: 1000
  }
];

const INITIAL_VALUE = 0;

const totalOutput = programmerOutput
  .map((programmer) => programmer.linesOfCode)
  .reduce((acc, linesOfCode) => acc + linesOfCode, INITIAL_VALUE);
```
-----

### Đóng gói các điều kiện

**Không tốt:**
```javascript
if (fsm.state === 'fetching' && isEmpty(listNode)) {
  // ...
}
```

**Tốt:**
```javascript
function shouldShowSpinner(fsm, listNode) {
  return fsm.state === 'fetching' && isEmpty(listNode);
}

if (shouldShowSpinner(fsmInstance, listNodeInstance)) {
  // ...
}
```
-----

### Tránh điều kiện tiêu cực

**Không tốt:**
```javascript
function isDOMNodeNotPresent(node) {
  // ...
}

if (!isDOMNodeNotPresent(node)) {
  // ...
}
```

**Tốt:**
```javascript
function isDOMNodePresent(node) {
  // ...
}

if (isDOMNodePresent(node)) {
  // ...
}
```
-----

### Tránh điều kiện
Đây dường như là một việc bất khả thi. Khi nghe điều này đầu tiên, hầu hết mọi
người đều nói, "Làm sao tôi cần phải làm gì mà không có mệnh đề `if`?"
Câu trả lời là bạn có thể sử dụng tính đa hình để đạt được công việc tương tự
trong rất nhiều trường hợp. Câu hỏi thứ hai thường là "Đó là điều tốt nhưng tại
sao tôi lại muốn làm điều đó?" Câu trả lời là khái niệm mà ta đã học ở phần
trước: một hàm chỉ nên thực hiện một việc. Khi bạn có nhiều lớp và hàm mà có
nhiều mệnh đề `if`, bạn đang cho người dùng của bạn biết rằng hàm của bạn đang
làm nhiều hơn một việc. Hãy nhớ, chỉ làm một công việc thôi.

**Không tốt:**
```javascript
class Airplane {
  // ...
  getCruisingAltitude() {
    switch (this.type) {
      case '777':
        return this.getMaxAltitude() - this.getPassengerCount();
      case 'Air Force One':
        return this.getMaxAltitude();
      case 'Cessna':
        return this.getMaxAltitude() - this.getFuelExpenditure();
    }
  }
}
```

**Tốt:**
```javascript
class Airplane {
  // ...
}

class Boeing777 extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getPassengerCount();
  }
}

class AirForceOne extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude();
  }
}

class Cessna extends Airplane {
  // ...
  getCruisingAltitude() {
    return this.getMaxAltitude() - this.getFuelExpenditure();
  }
}
```
-----

### Tránh kiểm tra kiểu (phần 1)
JavaScript không định kiểu, có nghĩa hàm của bạn có thể nhận bất kì đối số
kiểu nào. Đôi khi bạn bị cám dỗ bởi sự tự do này và dễ dẫn đến việc đi kiểm
tra kiểu trong hàm của mình. Có nhiều cách để tránh phải làm điều này. Điều
đầu tiên là xem xét sử dụng các API nhất quán.

**Không tốt:**
```javascript
function travelToTexas(vehicle) {
  if (vehicle instanceof Bicycle) {
    vehicle.peddle(this.currentLocation, new Location('texas'));
  } else if (vehicle instanceof Car) {
    vehicle.drive(this.currentLocation, new Location('texas'));
  }
}
```

**Tốt:**
```javascript
function travelToTexas(vehicle) {
  vehicle.move(this.currentLocation, new Location('texas'));
}
```
-----

### Tránh kiểm tra kiểu (phần 2)
Nếu bạn làm việc với các kiểu cơ bản như chuỗi, số nguyên và mảng, và bạn không
thể  sử dụng đa hình nhưng bạn vẫn cảm thấy cần phải kiểm tra kiểu, bạn nên xem
xét sử dụng TypeScript. Nó là một phương pháp thay thế tuyệt vời cho JavaScript
thường, vì nó cung cấp kiểu tĩnh ngoài cú pháp JavaScript chuẩn. Vấn đề với việc
kiểm tra kiểu thủ công là để làm tốt việc này đòi hỏi nhiều sự dài dòng mà
"kiểu an toàn" giả này không thay thế được cho việc mất đi tính dễ đọc của code.
Hãy giữ code JavaScript của bạn sạch sẽ, viết test tốt và có reviews code tốt.
Nếu không thì thực hiện tất cả những điều đó nhưng với TypeScript (giống như tôi
đã nói, đó là sự thay thế tốt!).

**Không tốt:**
```javascript
function combine(val1, val2) {
  if (typeof val1 === 'number' && typeof val2 === 'number' ||
      typeof val1 === 'string' && typeof val2 === 'string') {
    return val1 + val2;
  }

  throw new Error('Must be of type String or Number');
}
```

**Tốt:**
```javascript
function combine(val1, val2) {
  return val1 + val2;
}
```
-----

### Đừng quá tối ưu
Những trình duyệt hiện đại làm rất nhiều tối ưu hóa bên dưới trong thời gian
chạy. Rất nhiều lần, nếu bạn đang tối ưu thì bạn đang làm tốn thời gian của
chính mình. [Xem ở đây](https://github.com/petkaantonov/bluebird/wiki/Optimization-killers)
để biết khi nào việc tối ưu hóa là thiếu. Hãy thực hiện những tối ưu đó và cho
đến khi chúng được sửa nếu có thể.

**Không tốt:**
```javascript

// Trên các trình duyệt cũ, mỗi lần lặp với 'list.length` chưa được cache sẽ tốn kém
// vì `list.length` sẽ được tính lại. Trong các trình duyệt hiện đại, điều này đã được tối ưu.
for (let i = 0, len = list.length; i < len; i++) {
  // ...
}
```

**Tốt:**
```javascript
for (let i = 0; i < list.length; i++) {
  // ...
}
```
-----

### Xóa code chết (dead code)
Dead code cũng tệ như code trùng lặp. Không có lý do gì để giữ chúng lại trong
codebase của bạn. Nếu nó không được gọi nữa, hãy bỏ nó đi! Nó vẫn sẽ nằm trong
lịch sử phiên bản của bạn nếu bạn vẫn cần nó.

**Không tốt:**
```javascript
function oldRequestModule(url) {
  // ...
}

function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');

```

**Tốt:**
```javascript
function newRequestModule(url) {
  // ...
}

const req = newRequestModule;
inventoryTracker('apples', req, 'www.inventory-awesome.io');
```
-----