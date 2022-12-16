# 1. Giới thiệu
Trong phiên bản ES6 2015 đã thêm các template literals (kí tự chuỗi) vào JavaScript.  Template literals là một hình thức tạo chuỗi mới trong JavaScript, bổ sung nhiều tính năng mới mạnh mẽ, chẳng hạn như tạo chuỗi nhiều dòng dễ dàng hơn và sử dụng placeholders để nhúng biểu thức vào trong chuỗi. Ngoài ra, một tính năng nâng cao được gọi là tagged template literals cho phép bạn thực hiện các thao tác trên các biểu thức trong một chuỗi. Tất cả các tính năng này làm tăng thêm các tùy chọn để thao tác chuỗi, cho phép bạn dễ dàng tạo các chuỗi động có thể được sử dụng cho URL hoặc các chức năng tùy chỉnh ở các thành phần HTML.

Trong bài viết này, bạn sẽ tìm hiểu sự khác biệt giữa single/double quote(dấu nháy đơn/kép) và template literals, các cách khác nhau để khai báo các chuỗi có hình dạng khác nhau, bao gồm các chuỗi nhiều dòng và chuỗi động thay đổi tùy thuộc vào giá trị của một biến hoặc biểu thức. Sau đó, bạn sẽ tìm hiểu về các tagged template literals và xem một số ví dụ thực tế về các dự án sử dụng chúng.
# 2. Khởi tạo chuỗi
Phần này sẽ nêu các cách khai báo chuỗi bằng dấu nháy đơn và dấu nháy kép và sau đó sẽ hiển thị cách thực hiện tương tự với template literals.

Trong JavaScript, một chuỗi có thể được viết bằng dấu nháy đơn (' ') hoặc nháy kép (" ") như sau :
```
const single = 'This is singe quote.'
const double = "This is double quote."
```
Không có sự khác biệt lớn về JavaScript giữa các chuỗi sử dụng nháy đơn hoặc kép, không giống như các ngôn ngữ khác có thể cho phép nội suy trong một loại chuỗi nhưng không phải là chuỗi khác. Trong ngữ cảnh này, phép nội suy đề cập đến việc đánh giá một placeholder như là một phần động của chuỗi.

Việc sử dụng các chuỗi single/double quote chủ yếu tùy thuộc vào sở thích và quy ước cá nhân, nhưng chúng có thể được sử dụng kết hợp, mỗi loại chuỗi chỉ cần thoát khỏi loại quote riêng của mình:
```
// Escaping a single quote in a single-quoted string
const single = '"We don\'t make mistakes. We just have happy accidents." - Bob Ross'

// Escaping a double quote in a double-quoted string
const double = "\"We don't make mistakes. We just have happy accidents.\" - Bob Ross"

console.log(single)
console.log(double)

=> Result:
"We don't make mistakes. We just have happy accidents." - Bob Ross
"We don't make mistakes. We just have happy accidents." - Bob Ross
```
Mặt khác, các template literals được viết bằng cách bao quanh chuỗi có dấu trọng âm (`):
```
const template = `Find freedom on this canvas.`

```
Các template literals có thể làm mọi thứ mà các chuỗi thông thường có thể, vì vậy bạn có thể thay thế tất cả các chuỗi trong dự án của bạn bằng chúng và có cùng chức năng. Tuy nhiên, quy ước phổ biến nhất là chỉ sử dụng các template khi sử dụng các khả năng bổ sung của các template đó và nhất quán sử dụng dấu ngoặc đơn hoặc dấu ngoặc kép cho tất cả các chuỗi đơn giản khác. Theo tiêu chuẩn này sẽ giúp code của bạn dễ đọc hơn nếu được kiểm tra bởi các dev khác.

Bây giờ bạn đã thấy cách khai báo chuỗi bằng dấu ngoặc đơn, dấu ngoặc kép và backticks, bạn có thể chuyển sang lợi thế đầu tiên của template literals: viết chuỗi nhiều dòng.
# 3. Multi-line Strings
Trong phần này, trước tiên bạn sẽ chạy qua cách các multi-line string được khai báo trước ES6, sau đó xem cách các template literals làm cho việc này dễ dàng hơn.

Ban đầu, nếu bạn muốn viết một chuỗi multi-line, bạn sẽ sử dụng concatenation operator (toán tử nối). Tuy nhiên, đây không phải lúc nào cũng là một quá trình đơn giản. Ví dụ :
```
const address = 'Homer J. Simpson' + '742 Evergreen Terrace' + 'Springfield'
```
Điều này có thể cho phép bạn chia chuỗi thành các dòng nhỏ hơn và đưa nó qua nhiều dòng trong trình soạn thảo, nhưng nó không có tác dụng đối với đầu ra của chuỗi. Trong trường hợp này, tất cả các chuỗi sẽ nằm trên một dòng và không được phân tách bằng dấu xuống dòng hoặc dấu cách. Nếu bạn đã đăng nhập địa chỉ vào console, bạn sẽ nhận được những điều sau đây:
```
Homer J. Simpson742 Evergreen TerraceSpringfield
```
Ký tự dấu gạch chéo ngược (\) có thể được sử dụng để tiếp tục chuỗi trên nhiều dòng:

```
const address =
  'Homer J. Simpson\
  742 Evergreen Terrace\
  Springfield'
```
Điều này sẽ giữ lại bất kỳ thụt lề nào dưới dạng khoảng trắng, nhưng chuỗi vẫn sẽ nằm trên một dòng trong đầu ra:
```
Homer J. Simpson  742 Evergreen Terrace  Springfield
```
Sử dụng ký tự dòng mới (\ n), bạn có thể tạo một chuỗi multi-line thực sự:
```
const address = 'Homer J. Simpson\n' + '742 Evergreen Terrace\n' + 'Springfield'
```
Mở console lên bạn sẽ thấy :
```
Homer J. Simpson
742 Evergreen Terrace
Springfield
```
Tuy nhiên, sử dụng các ký tự xuống dòng mới để chỉ định các chuỗi multi-line có thể phản tác dụng. Ngược lại, việc tạo một chuỗi multi-line với các template literals có thể đơn giản hơn nhiều. Không cần nối, sử dụng các ký tự dòng mới hoặc sử dụng dấu gạch chéo ngược. Chỉ cần nhấn enter và viết chuỗi trên nhiều dòng hoạt động theo mặc định:
```
const address = `Homer J. Simpson
742 Evergreen Terrace
Springfield`
```
Đầu ra sẽ giống như đầu vào:
```
Homer J. Simpson
742 Evergreen Terrace
Springfield
```
Bất kỳ sự thụt vào nào sẽ được giữ nguyên, vì vậy điều quan trọng là không thụt vào bất kỳ dòng bổ sung nào trong chuỗi nếu điều đó không mong muốn. Ví dụ :
```
const address = `Homer J. Simpson
                 742 Evergreen Terrace
                 Springfield`
```
Mặc dù kiểu viết dòng này có thể làm cho code của bạn dễ đọc hơn, nhưng đầu ra sẽ hơi kì cục:
```
Homer J. Simpson
                 742 Evergreen Terrace
                 Springfield
```
Với các chuỗi multi-line đã được giải quyết, phần tiếp theo sẽ là cách các biểu thức nội suy vào các giá trị của chúng với các khai báo chuỗi khác nhau.
# 4. Biểu thức nội suy
Trước ES6, nối chuỗi được sử dụng để tạo chuỗi động với các biểu thức hoặc biến :
```
const method = 'concatenation'
const dynamicString = 'This string is using ' + method + '.'
```
Chạy trong console :
```
This string is using concatenation.
```
Với template literals, một biểu thức có thể được nhúng trong một placeholder. Một placeholder được biểu thị bằng `$ {}`, với bất kỳ thứ gì trong dấu ngoặc nhọn được coi là JavaScript và mọi thứ nằm ngoài dấu ngoặc được coi là một chuỗi:
```
const method = 'interpolation'
const dynamicString = `This string is using ${method}.`
```
In ra trong console :
```
This string is using interpolation.
```
Một ví dụ phổ biến về việc nhúng các giá trị trong chuỗi có thể là để tạo các URL động. Có vẻ hơi cồng kềnh. Ví dụ: phần sau đây khai báo một hàm để tạo chuỗi truy cập OAuth:
```
function createOAuthString(host, clientId, scope) {
  return host + '/login/oauth/authorize?client_id=' + clientId + '&scope=' + scope
}

createOAuthString('https://github.com', 'abc123', 'repo,user')
```
Chạy thử trong console:
```
https://github.com/login/oauth/authorize?client_id=abc123&scope=repo,user
```
Sử dụng phép nội suy chuỗi, bạn không còn phải theo dõi việc mở và đóng chuỗi và vị trí toán tử nối. Ví dụ :
```
function createOAuthString(host, clientId, scope) {
  return `${host}/login/oauth/authorize?client_id=${clientId}&scope=${scope}`
}

createOAuthString('https://github.com', 'abc123', 'repo,user')
```
Kết quả tương tự với cách nối chuỗi trên :
```
https://github.com/login/oauth/authorize?client_id=abc123&scope=repo,user
```
Phương thức `trim()`  dùng để loại bỏ các khoảng trắng đầu cuối , ví dụ :
```
const menuItem = (url, link) =>
  `
<li>
  <a href="${url}">${link}</a>
</li>
`.trim()

menuItem('https://google.com', 'Google')
```
Kết quả như sau :
```
<li>
  <a href="https://google.com">Google</a>
</li>
```
Toàn bộ biểu thức có thể được nội suy, không chỉ các biến, chẳng hạn như trong ví dụ này về tổng của hai số:
```
const sum = (x, y) => x + y
const x = 5
const y = 100
const string = `The sum of ${x} and ${y} is ${sum(x, y)}.`

console.log(string)

Output :
The sum of 5 and 100 is 105.
```
Điều này có thể đặc biệt hữu ích với các toán tử ternary, cho phép các điều kiện trong một chuỗi:
```
const age = 19
const message = `You can ${age < 21 ? 'not' : ''} view this page`
console.log(message)

Output:
You can not view this page
```
Bây giờ bạn có một ý tưởng về cách các template literals có thể hữu ích khi được sử dụng để nội suy các biểu thức. Phần tiếp theo sẽ tiến thêm một bước này bằng cách kiểm tra các Tagged Template Literals để làm việc với các biểu thức được chuyển vào placeholder.
# 5. Tagged Template Literals
Tính năng nâng cao của Template Literals là sử dụng Tagged Template Literals, đôi khi được gọi là templae tags (thẻ mẫu). Template tags bắt đầu bằng chức năng phân tích cú pháp template, cho phép bạn kiểm soát nhiều hơn đối với thao tác và trả về chuỗi động.

Trong ví dụ này, bạn sẽ tạo một hàm template để sử dụng làm hàm hoạt động trên một mẫu được gắn thẻ. Các chuỗi ký tự là tham số đầu tiên của hàm, các chuỗi được đặt tên ở đây và bất kỳ biểu thức nào được nội suy trong chuỗi được đóng gói vào tham số thứ hai bằng các tham số còn lại. Bạn có thể điều khiển tham số để xem chúng sẽ chứa gì:
```
function tag(strings, ...expressions) {
  console.log(strings)
  console.log(expressions)
}
```
Sử dụng function tag làm tagged template function thẻ và phân tích chuỗi như sau:
```
onst string = tag`This is a string with ${true} and ${false} and ${100} interpolated inside.`
```
Mở console và chạy :
```
(4) ["This is a string with ", " and ", " and ", " interpolated inside."
(3) [true, false, 100]
```
Tham số đầu tiên, `strings`, một array string gồm :
- "This is a string with "
- " and "
- " and "
- " interpolated inside."

Ngoài ra còn có một thuộc tính `raw` có sẵn trên đối số này tại `String.raw`, chứa chuỗi mà không có bất kỳ chuỗi nào đang được xử lý. Ví dụ: / n sẽ chỉ là ký tự / n và không được tính vào dòng mới.

Tham số thứ hai, `...expressions`, là một mảng tham số còn lại bao gồm tất cả các biểu thức:
- true
- false
- 100

Các chuỗi ký tự và biểu thức được truyền dưới dạng tham số cho funciton tag được gắn thẻ. Lưu ý rằng tagged template không cần trả về một chuỗi; nó có thể hoạt động trên các giá trị đó và trả về bất kỳ loại giá trị nào. Ví dụ: chúng ta có thể có hàm bỏ qua mọi thứ và trả về null, như trong hàm returnNull này:
```
function returnsNull(strings, ...expressions) {
  return null
}

const string = returnsNull`Does this work?`
console.log(string)

Output:
null
```
Một ví dụ về một hành động có thể được thực hiện trong các tagged template đang áp dụng một số thay đổi cho cả hai mặt của mỗi biểu thức, chẳng hạn như nếu bạn muốn bọc từng biểu thức trong thẻ HTML. Tạo một hàm bold, thêm <strong> và </ strong> cho mỗi biểu thức:
```
function bold(strings, ...expressions) {
  let finalString = ''

  // Loop through all expressions
  expressions.forEach((value, i) => {
    finalString += `${strings[i]}<strong>${value}</strong>`
  })

  // Add the last string literal
  finalString += strings[strings.length - 1]

  return finalString
}

const string = bold`This is a string with ${true} and ${false} and ${100} interpolated inside.`

console.log(string)

=> Output:
This is a string with <strong>true</strong> and <strong>false</strong> and <strong>100</strong> interpolated inside.
```
Có một vài ví dụ về các  tagged template literals trong các thư viện JavaScript phổ biến. Thư viện thẻ Graphql sử dụng mẫu được gắn thẻ gql để phân tích các chuỗi truy vấn GraphQL vào cú pháp trừu tượng (AST) mà GraphQL hiểu:
```
import gql from 'graphql-tag'

// A query to retrieve the first and last name from user 5
const query = gql`
  {
    user(id: 5) {
      firstName
      lastName
    }
  }
`
```
Một thư viện khác sử dụng các hàm mẫu được gắn thẻ là các thành phần được tạo kiểu, cho phép bạn tạo các thành phần React mới từ các thành phần DOM thông thường và áp dụng các kiểu CSS bổ sung cho chúng:
```
import styled from 'styled-components'

const Button = styled.button`
  color: magenta;
`

// <Button> can now be used as a custom component
```
Phương thức `String.raw` tích hợp cũng có thể được sử dụng trên các mẫu chữ được gắn thẻ để ngăn bất kỳ chuỗi nào được xử lý:
```
const rawString = String.raw`I want to write /n without it being escaped.`
console.log(rawString)

=> Output:
I want to write /n without it being escaped.
```
# 6. Kết luận
Trong bài viết này, bạn đã xem xét các csingle- and double-quoted string literals và bạn đã tìm hiểu về các template literals và tagged template literals. Các Template literals làm cho nhiều tác vụ chuỗi phổ biến trở nên đơn giản hơn bằng cách nội suy các biểu thức trong chuỗi và tạo các chuỗi multi-line mà không có bất kỳ phép nối hoặc thoát nào. Template tags cũng là một tính năng nâng cao hữu ích của các template literals mà nhiều thư viện phổ biến đã sử dụng, chẳng hạn như GraphQL và `styled-components`.

Để tìm hiểu thêm về các chuỗi trong JavaScript, hãy đọc [Cách làm việc với các chuỗi trong JavaScript và Cách lập chỉ mục, phân tách và thao tác các chuỗi trong JavaScript](https://www.digitalocean.com/community/tutorials/how-to-work-with-strings-in-javascript).

Nguồn : https://www.taniarascia.com/understanding-template-literals/