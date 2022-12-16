Chào các bạn, trong loạt bài về **Sử dụng TypeScript để viết API bảo mật với Node.js và Express.**, mình xin bước sang bài thứ 2 về việc tạo Data Models và Services.

### Tổng quan các bài viết
1. [Giới thiệu và cài đặt ban đầu](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-gioi-thieu-va-cai-dat-ban-dau-RQqKL99pZ7z)
2. **Tạo Data Model và Services**
3. [Tạo Endpoints](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-endpoints-va-controllers-maGK7qaDlj2)
4. [Bảo mật API](https://viblo.asia/p/su-dung-typescript-de-tao-api-bao-mat-voi-nodejs-va-express-bao-mat-api-Do754bXQZM6)
5. Quản lý quyền

> :warning: Các bạn chú ý đọc lần lượt từng bài để nắm rõ nội dung loạt bài nhé.

Trước khi tạo controllers và services, chúng ta sẽ định nghĩa cấu trúc data trong ứng dụng này. Một menu item sẽ có thể có nhiều loại thuộc tính. Mình sẽ lấy ví dụ như sau :

* `id`: (number) Unique identifier cho mỗi item
* `name`: (string) tên item
* `price`: (number) giá mỗi item giả sử tính theo USD
* `description`: (string) mô tả item
* `image`: (string) URL trỏ tới image của item

Việc sử dụng TypeScript - một ngôn ngữ hướng đối tượng - để xây dựng API, giúp chúng ta có các tùy chọn khác nhau để định nghĩa và thực thi cấu trúc của các object. Chúng ta có thể sử dụng các class hoặc interface để định nghĩa. Đối với các item của menu, có thể sử dụng interface vì chúng không phải là một phần của gói JavaScript được biên dịch, hơn nữa để đơn giản thì chúng ta không cần đến các thể hiện (instances) của item trong menu.

Chúng ta sẽ tạo ra một subdirectory tên là `items` trong `src` directory để lưu các file liên quan đến menu items:
```php
mkdir src/items
```
# Model API Resources với Interfaces
Để mô hình hóa dữ liệu, chúng ta sẽ định nghĩa 1 `interface Item` như sau :
```php
touch src/items/item.interface.ts
```
Nội dung file:
```php
export interface Item {
  id: number;
  name: string;
  price: number;
  description: string;
  image: string;
}
```
Tiếp theo, định nghĩa một interface `Items` là tập hợp của các `Item`:
```php
touch src/items/items.interface.ts
```
Nội dung file:
```php
import { Item } from "./item.interface";
export interface Items {
  [key: number]: Item;
}
```
# Tạo Data Service để thao tác với API Resource
Service cho phép đóng gói các logic business liên quan (cái mà chúng ta có thể chia sẻ sang nhiều project khác). Như vậy, ứng dụng của chúng ta có thể sử dụng service để truy cập và thao tác các record từ store.

Tạo file định nghĩa module service:
```php
touch src/items/items.service.ts
```
Nội dung file:
```php
/**
 * Data Model Interfaces
 */


/**
 * In-Memory Store
 */

/**
 * Service Methods
 */
```
Ở phần `Data Model Interfaces`, chúng ta sẽ import các interface :
```php
/**
 * Data Model Interfaces
 */

import { Item } from "./item.interface";
import { Items } from "./items.interface";
```
Để đơn giản, mình sẽ không tạo một database chỉ để lưu các record. Thay vào đó, mình sẽ tạo một vài object đại diện và lưu ở RAM:
```php
/**
 * In-Memory Store
 */

const items: Items = {
  1: {
    id: 1,
    name: "Burger",
    price: 5.99,
    description: "Tasty",
    image: "https://cdn.auth0.com/blog/whatabyte/burger-sm.png"
  },
  2: {
    id: 2,
    name: "Pizza",
    price: 2.99,
    description: "Cheesy",
    image: "https://cdn.auth0.com/blog/whatabyte/pizza-sm.png"
  },
  3: {
    id: 3,
    name: "Tea",
    price: 1.99,
    description: "Informative",
    image: "https://cdn.auth0.com/blog/whatabyte/tea-sm.png"
  }
};
```
Cần phải chú ý rằng bất kì khi nào bạn reset server, thì toàn bộ object đại diện bên trên sẽ bị xóa khỏi RAM. Nhưng nhờ việc sử dụng HMR của webpack không cần phải reset nữa, trừ khi có thay đổi trong file service.

Tiếp theo, chúng ta sẽ tạo các phương thức chính CRUD với các item. Đầu tiên sẽ là 2 phương thức tìm kiếm các item:
```php
/**
 * Service Methods
 */

export const findAll = async (): Promise<Items> => {
  return items;
};

export const find = async (id: number): Promise<Item> => {
  const record: Item = items[id];

  if (record) {
    return record;
  }

  throw new Error("No record found");
};
```
Ở đây mình sử dụng `asynchronous` để mô phỏng các thao tác đọc ghi theo đúng thực tế. Nhìn tên function và nội dung của nó các bạn có thể tự đoán được mục đích của mỗi hàm là gì nhỉ.

### CREATE
Tiếp theo, chúng ta sẽ tạo phương thức `CREATE` và thêm vào bên dưới hàm `find` trên nhé :
```php
export const create = async (newItem: Item): Promise<void> => {
  const id = new Date().valueOf();
  items[id] = {
    ...newItem,
    id
  };
};
```
Phương thức `CREATE` đơn giản nhận một tham số là object thuộc kiểu `Item`. Object này sẽ có các thuộc tính như đã định nghĩa, trừ `id` sẽ được tạo trong function. Và để tạo ra `id` là duy nhất, chúng ta sử dụng giá trị của ngày hiện tại - `DATE`.

### UPDATE
Tiếp, chúng ta sẽ thêm phương thức `UPDATE` ngay sau `CREATE`:
```php
export const update = async (updatedItem: Item): Promise<void> => {
  if (items[updatedItem.id]) {
    items[updatedItem.id] = updatedItem;
    return;
  }

  throw new Error("No record found to update");
};
```
Phương thức `UPDATE` nhận tham số là object thuộc kiểu `Item`. Ở đây, Object phải bao gồm cả `id` (hiển nhiên rồi).
### DELETE
Cuối cùng, chúng ta định nghĩa phương thức `REMOVE`:
```php
export const remove = async (id: number): Promise<void> => {
  const record: Item = items[id];

  if (record) {
    delete items[id];
    return;
  }

  throw new Error("No record found to delete");
};
```
Phương thức REMOVE nhận tham số là `id` của item cần xóa.

Vậy là chúng ta vừa hoàn thành xong việc tạo ra một module service. Bất kỳ project nào khác đều có thể sử dụng code của module service này do nó không bị ràng buộc với bất kỳ framework cụ thể nào. Trong bài viết tiếp theo, chúng ta sẽ sử dụng chúng để tạo API Controllers

Điều đáng nói là bạn có thể đã sử dụng một class của TypeScript để định nghĩa và đóng gói các service logic. Tuy nhiên, sử dụng các function giúp cho việc testing module service dễ dàng hơn.

Bài viết có thể khó hiểu hoặc sai sót, mong các bạn góp ý. Cảm ơn các bạn đã đọc bài của mình. Hẹn các bạn ở bài viết tiếp theo về **Tạo Endpoints**