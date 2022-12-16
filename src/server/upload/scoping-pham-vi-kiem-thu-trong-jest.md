# Scoping - Phạm vi kiểm thử trong jest
Cho đến nay, chúng ta chỉ xem xét các thử nghiệm thực hiện ở cấp độ cao nhất. Tất cả các mẫu kiểm tra về cơ bản trong cùng một phạm vi.
Nhưng Jest cung cấp cho chúng ta tùy chọn để thu hẹp phạm vi. Điều này có thể rất dễ dàng cho việc thiết lập các thử nghiệm định kỳ.
Trước đây, chúng ta đã tìm hiểu về các hành động lặp lại Jest, đây là những ví dụ điển hình về việc sử dụng để xác định phạm vi kiểm thử.

## Làm thế nào định nghĩa scope in Jest

Để định nghĩa 1 scope in Jest, chúng ta có thể sử dụng hàm `describe` để bao bọc tất cả các thử nghiệm của mình.
```javascript:js
describe('Các hành động liên quan tới chức năng người dùng', () => {
  test('Tạo mới người dùng', () => {
    expect(createUser('vodanh22', 'p4sSw0rD')).toBe(true);
  });

  test('Cập nhật tên người dùng', () => {
    expect(updateUser(1, 'Vô Danh')).toBe(true);
  });
});
```

Bây giờ, hai mẫu kiểm tra này sẽ chạy bên trong phạm vi này, và bên cạnh việc tổ chức tốt, chúng tôi nhận được một số lợi ích bổ sung của phạm vi này.
Ví dụ: phạm vi này có thể nhận các hành động lặp lại của riêng nó. Các hành động được xác định này sẽ chỉ kích hoạt cho phạm vi này. Tuy nhiên, các hành động được xác định phạm vi toàn cầu cũng sẽ kích hoạt!
Ví dụ, giả sử chúng ta có một cơ sở dữ liệu công khai, nhưng đối với một phần, chúng ta cũng muốn áp dụng một cơ sở dữ liệu thích.

```javascript:js
beforeAll(() => {
  return createDatabase();
});

beforeEach(() => {
  return populateUsers();
});

afterEach(() => {
  return clearUsers();
});

afterAll(() => {
  return removeDatabase();
});

test('Thêm mới 1 user', () => {
  expect(addUser('vodanh2')).toBe(true);
});

describe('Công việc mong muốn', () => {
  beforeEach(() => {
    return populateHobbies();
  });

  beforeEach(() => {
    return clearHobbies();
  });

  test('Thêm mới 1 công việc mong muốn', () => {
    expect(addHobby(1, 'Photography')).toBe(true);
  });
});
```

Khi chạy đoạn test trên chúng ta sẽ thấy thứ tự như sau:
1. before all
1. before each (global scope)
1. user test
1. after each (global scope)
1. before each (global scope)
1. before each (hobby scope)
1. hobby test
1. after each (hobby scope)
1. after each (global scope)
1. after all
Như bạn có thể thấy, một kịch bản kiểm thử chạy hoàn chỉnh về việc thực thi, nhưng điều cần thiết là phải xem xét trước và sau mỗi lệnh kiểm thử.
Phạm vi cũng có thể được sử dụng để xác định và ghi đè các biến mà bạn có thể sử dụng.

Ví dụ: chúng ta có thể có một người dùng đã đăng nhập khác mà chúng tôi muốn viết các trường hợp thử nghiệm.
```javascript:js
describe('Danh sách công việc của user', () => {
  const loggedUser = 1;
  test('Add a new user', () => {
    console.log(`adding new user: ${loggedUser}`);
  });
});

describe('Danh sách công việc mong muốn', () => {
  const loggedUser = 2;
  test('Add a new hobby', () => {
    console.log(`adding new hobby for: ${loggedUser}`);
  });
});
```
Như bạn có thể thấy, chúng ta xác định logUser hai lần và kết quả của chuỗi này gần như mong đợi:
* đang thêm mới user: 1
* đang thêm mới sở thích cho user: 2

Tôi hy vọng điều này cung cấp cho bạn phần giới thiệu đầu tiên tuyệt vời về việc định nghĩa phạm vi sử dụng trong các kịch bản kiểm thử của bạn.
# Cảm ơn đã đọc và hãy giữ kết nối
Cảm ơn bạn đã dành thời gian đọc bài viết này.