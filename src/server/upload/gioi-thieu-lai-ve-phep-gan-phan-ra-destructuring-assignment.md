Một trong những tính năng hữu ích trong chuẩn ES2015 là destructuring assignment. Đây là tính năng cho phép truy cập vào một mảng hoặc một đối tượng và tham chiếu các thành phần bên trong một cách trực tiếp hơn. Các ví dụ thường thấy như sau:
```js
const response = {
   status: 200,
   data: {}
}

// instead of response.data we get...
const {data} = response //now data references the data object directly


const objectList = [ { key: 'value' }, { key: 'value' }, { key: 'value' } ]

// instead of objectList[0], objectList[1], etc we get...
const [obj, obj1, obj2] = objectList // now each object can be referenced directly
```

Tuy là một cú pháp hữu ích, nhưng nhiều người quên mất những khả năng mà destructuring assignment có thể thực hiện. Bài viết này sẽ điểm qua năm ví dụ thực tế khi phân rã mảng và đối tượng. Đôi khi là cả hai.

### 1. Phân rã lồng nhau

Khả năng truy cập vào khóa trên cùng của một đối tượng hoặc phần tử đầu tiên của mảng là khá hữu ích, nhưng vẫn có giới hạn nhất định. Nó chỉ giảm sự phức tạp ở mức độ đầu tiên và để lại một chuỗi những tham chiếu cần truy cập thông qua cú pháp chấm `.` hoặc `[0]`.

Nhưng thực ra, cú pháp phân rã có thể thực hiện ở các mức thấp hơn trong một đối tượng. Lấy ví dụ về response của một HTTP request. Chúng ta cần lấy dữ liệu user trong đối tượng data. Nhờ vào cú pháp phân rã, chúng ta có thể thực hiện điều này dễ dàng thông qua khóa của đối tượng.

```js
const response = {
  status: 200,
  data: { 
    user: {
       name: 'Rachel', 
      title: 'Editor in Chief' 
    }, 
    account: {},
    company: 'Smashing Magazine' 
  }
}

const {data: {user}} = response // user is { name: 'Rachel', title: 'Editor in Chief'}
```

Tương tự với mảng lồng nhau. Trong trường hợp này, khóa sẽ tương ứng với vị trí của phần tử trong mảng. Phép phân rã được thực hiện bằng cách sử dụng biến tham chiếu (hoặc placeholder sử dụng dấu phẩy `,`) cho mỗi phần tử của mảng. Tên biến có thể được đặt tên bất kỳ.
```js
const response = {
  status: 200,
  data: { 
    user: {
       name: 'Rachel', 
      title: 'Editor in Chief' 
    }, 
    account: {},
    company: 'Smashing Magazine' 
  }
}

const {data: {user}} = response // user is { name: 'Rachel', title: 'Editor in Chief'}
```
Chú ý sử dụng tính năng này một cách khôn ngoan. Nhận biến được tình huống sử dụng và người sẽ đọc code này là ai. Cân nhắc tính dễ đọc và giảm sự thay đổi liên tục. Ví dụ, nếu chỉ cần truy cập một mảng con trong một mảng bất kỳ, cú pháp map có thể sẽ phù hợp hơn.

### 2. Phân rã đối tượng và mảng

Đối tượng và mảng là những cấu trúc dữ liệu phổ biến. Trên thực thế, kiểu dữ liệu này sẽ xuất hiện bên trong kiểu dữ liệu kia. Với phân rã lồng nhau. chúng ta có thể truy cập những thuộc tính lồng nhau ngay cả khi chúng khác nhau về cấu kiểu cấu trúc dữ liệu.

Lấy ví dụ một mảng trong một object.
```js
const organization = { 
    users: ['rachel', 'laurie', 'eric', 'suzanne'],
    name: 'Smashing Magazine',
    site: 'https://www.smashingmagazine.com/' 
}

const {users:[rachel]} = organization // rachel is 'rachel'
```
Trường hợp ngược lại, một mảng những đối tượng:
```js
const users = [{name: 'rachel', title: 'editor'}, {name: 'laurie', title: 'contributor'}]

const [{name}] = users // name is 'rachel'
```

Thực ra, có một vấn đề ở ví dụ trên. Chúng ta chỉ có thể truy cập được name của user đầu tiên; nếu không, sẽ phải sử dụng tên biến khác `name`, dẫn đến việc phân rã trở nên không còn hợp lệ. Trong ngữ cảnh phân rã tiếp theo, vấn đề này sẽ được giải quyết.

### 3. Định danh

Như ở ví dụ trước (các đối tượng trong một mảng có cùng tên khóa), chúng ta không để sử dụng cú pháp phân rã theo cách thông thường được. Tên biến không thể bị lặp lại trong cùng một scope (đây là cách giải thích đơn giản nhất, nhưng rõ ràng nó phức tạp hơn thế).
```js
const users = [{name: 'rachel', title: 'editor'}, {name: 'laurie', title: 'contributor'}]

const [{name: rachel}, {name: laurie}] = users // rachel is 'rachel' and laurie is 'laurie'
```

Định danh chỉ áp dụng cho đối tượng. Đơn giản, vì đối với một mảng, tên biến có thể đặt tùy ý, thay vì phải khớp với khóa của một đối tượng có sẵn.

### 4. Giá trị mặc định

Cú pháp phân rã thường coi giá trị đang tham chiếu là có tồn tại, nhưng nếu không có thì sao? Sẽ khá bất tiện khi xử lý những đoạn code có những giá trị undefined.  Đó là lúc mà cần tới các giá trị mặc định.

Xem xét ví dụ với đối tượng:
```js
const user = {name: 'Luke', organization: 'Acme Publishing'}
const {name='Brian', role='publisher'} = user
// name is Luke
// role is publisher
```
Nếu khóa được tham chiếu có giá trị, giá trị mặc định sẽ bị bỏ qua. Nếu khóa không tồn tại trong đối tượng, giá trị mặc định được sử dụng.

Tương tự với mảng:
```js
const roleCounts = [2]
const [editors = 1, contributors = 100] = roleCounts
// editors is 2
// contributors is 100
```

Đối với ví dụ của mảng, giá trị mặc định cũng bị bỏ qua nếu có phần tử trong mảng tương ứng.
Trong ví dụ này chúng ta phân rã nhiều phần tử hơn so với số lượng phần tử thực tế của mảng. Vậy trường hợp phân rã ít phần tử hơn thì sao?

### 5. Giá trị bỏ qua

Một trong những điểm hữu ích của cú pháp phân rã là cho phép truy cập một phần của cấu trúc dữ liệu. Điều này bao gồm việc cô lập những giá trị cần thiết và bỏ qua những phần còn lại của dữ liệu.

Xem xét ví dụ sau:
```js
const user = {name: 'Luke', organization: 'Acme Publishing'}
const {name} = user
// name is Luke
```

Ở ví dụ trên, khóa `organization` không bị phân rã và hoàn toàn không sao cả. Nó vẫn có thể được tham nhiều trong đối tượng `user` như cách thông thường:
```js
user.organization
```

Đối với mảng, có hai cách để bỏ qua các phần tử của mảng. Trong ví dụ của đối tượng, chúng ta tham chiếu những giá trị bên trong sử dụng tên của khóa kết hợp. Khi phân rã mảng, tên biến sẽ tương ứng theo vị trí xuất hiện. Ví dụ sau sẽ bỏ qua phần tử cuối cùng của mảng:
```js
const roleCounts = [2, 100, 100000]
const [editors, contributors] = roleCounts
// editors is 2
// contributors is 100
```
Chúng ta đã phân rã phần tử đầu tiên và phần tử thứ hai của mảng. Phần còn lại bị bỏ qua. Nhưng trong trường hợp muốn phân rã các phần tử đứng sau này thì sao? Nếu dựa vào vị trí phần tử trong mảng, có phải chúng ta phải phân rã tất cả các phần tử cho đến khi tìm được phần tử mong muốn?

Câu trả lời là không nhất thiết. Thay vào đó, chúng ta có thể sử dụng dấu phẩy để ám chỉ sự tồn tại của phần tử trong mảng, nhưng không tham chiếu tới các phần tử đang được bỏ qua này.

```js
const roleCounts = [2, 100, 100000]
const [, contributors, readers] = roleCounts
// contributors is 100
// readers is 100000
```

Chúng ta có thể kết hợp cả hai cách trên. Bỏ qua phần tử bất kỳ bằng việc chỉ sử dụng dấu phẩy. Một lần nữa, tương tự với ví dụ về đối tượng, những phần tử bị bỏ qua vẫn có thể được tham chiếu theo cách thông thường với mảng `roleCounts`.

### Những ví dụ liên quan

Tính linh hoạt và mạnh mẽ của cú pháp phân rã dẫn đến một số hiện tượng khá khác lạ. Bất kề có hữu ích hay không thì đó vẫn là một lựa chọn đáng quan tâm.

Một ví dụ như vậy là việc phân rã có thể được sử dụng để tạo những bản shallow copy:
```js
const roleCounts = [2, 100, 100000]
const [, contributors, readers] = roleCounts
// contributors is 100
// readers is 100000
```

Một ví dụ khác khi cú pháp phân rã được sử dụng cho việc khử tham chiếu.
```js
const obj = {node: {example: 'thing'}}
const {node, node: {example}} = obj
// node is { example: 'thing' }
// example is 'thing'
```

Như mọi khi, tính dễ đọc là vô cùng quan trọng và tất cả các ví dụ này nên được sử dụng một cách khôn ngoan. Tuy nhiên, việc biết có sự lựa chọn sẽ giúp chúng ta tìm được giải pháp tốt nhất.

### Kết luận
JavaScript có đầy đủ các đối tượng và mảng phức tạp. Cho dù nó là response từ HTTP request hoặc bộ dữ liệu tĩnh, việc có thể truy cập nội dung được nhúng một cách hiệu quả là rất quan trọng. Sử dụng destructuring assignment là một cách tối ưu để làm điều đó. Nó không chỉ xử lý nhiều cấp độ lồng nhau, mà còn cho phép truy cập tập trung và gán giá trị mặc định trong trường hợp tham chiếu không xác định.

## ** *Lược dịch* **
**Laurie**, [*A Re-Introduction To Destructuring Assignment*](https://www.smashingmagazine.com/2019/09/reintroduction-destructuring-assignment/)