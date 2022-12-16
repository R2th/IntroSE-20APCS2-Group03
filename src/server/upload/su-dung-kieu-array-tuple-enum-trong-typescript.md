### TypeScript Array
Một mảng trong TypeScript là một danh sách dữ liệu có thứ tự. Để khai báo một mảng bạn sử dụng cú pháp sau:<br>
```TypeScript 
let arrayName: type[];
```
Ví dụ, khai báo một mảng có kiểu string:<br>
```TypeScript
let skills: string[];
```
Bạn có thể thêm một hoặc nhiều strings vào trong mảng:<br>
```TypeScript
skills = [];
skills[0] = "Problem Solving";
skills[1] = "Programming";
```
Hoặc sử dụng phương thức push():<br>
```TypeScript
skills.push('Software Design');
console.log(skills);
```
Output:<br>
```TypeScript
(3) ['Problem Solving', 'Programming', 'Software Design']
```
Ví dụ khai báo một biến và gán một mảng chuỗi cho nó:<br>
```TypeScript
let skills = ['Problem Sovling','Software Design','Programming'];
```
Ở ví dụ trên, TypeScript sẽ hiểu mảng **skills** là một mảng chứa các giá trị strings. Nó giống như:<br>
```
let skills: string[];
skills = ['Problem Sovling','Software Design','Programming'];
```
Khi bạn định nghĩa một mảng có một kiểu cụ thể, TypeScript sẽ ngăn chặn bạn thêm các giá trị không hợp lệ đến mảng, ví dụ:<br>
```TypeScript
skills.push(100);
```
Đoạn code trên sẽ hiển thị thông báo lỗi trong biên dịch vì chúng ta đang thêm một số đến mảng các giá trị strings.<br>
Error:<br>
```TypeScript
Argument of type 'number' is not assignable to parameter of type 'string'.
```
Khi bạn trích xuất một phần tử từ mảng, TypeScript có thể thực hiện suy luận kiểu. Ví dụ:<br>
```TypeScript
let skill = skills[0];
console.log(typeof(skill));
```
Output:<br>
```
string 
```

**TypeScript array properties và methods**<br>
Mảng trong TypeScript  có thể truy cập các thuộc tính và phương thức của JavaScript. Ví dụ,sử dụng thuộc tính length để đếm số phần tử trong một mảng:<br>
```TypeScript
let series = [1, 2, 3];
console.log(series.length); // 3
```
Bạn có thể sử dụng tất cả các phương thức mảng hữu ích như forEach(), map(), reduce(), và filter(). Ví dụ:
```TypeScript
let series = [1, 2, 3];
let doubleIt = series.map(e => e* 2);
console.log(doubleIt);
```
Output:<br>
```TypeScript
[ 2, 4, 6 ] 
```

**Storing values of mixed types**<br>
Ví dụ khai báo một mảng chứa cả chuỗi và số:<br>
```TypeScript
let scores = ['Programming', 5, 'Software Design', 4]; 
```
Trong trường hợp này, TypeScript hiểu là mảng **scores**  như một mảng của chuỗi | số.<br>
Nó tương đương với đoạn code sau:<br>
```TypeScript
let scores : (string | number)[];
scores = ['Programming', 5, 'Software Design', 4]; 
console.log(scores);
```
Output:<br>
```TypeScript
(4) ['Programming', 5, 'Software Design', 4]
```
Tóm tắt lại:<br>
- Trong TypeScript, một mảng là một danh sách các giá trị có thứ tự. Một mảng có thể lưu nhiều giá trị hỗn hợp.
- Để khai báo một mảng của một loại cụ thể, bạn sử dụng cú pháp: **let arr: type[]**

### TypeScript Enum
Enum là một nhóm tên các giá trị constant. Enum là viết tắt của kiểu liệt kê.<br>
Để định nghĩa một enum, bạn hãy làm theo những bước sau:<br>
- Đầu tiên, sử dụng từ khóa enum theo sau là tên của enum đó.
- Sau đó, định nghĩa các giá trị constant cho enum đó

Cú pháp:<br>
```TypeScript 
enum name {constant1, constant2, ...};
```
Ở cú pháp trên, constant1, constant2 được gọi là các thành phần của enum.<br>
Ví dụ:<br>
```TypeScript 
enum Month {
    Jan,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec
};
```
Trong ví dụ trên, tên enum là **Month** và các giá trị constant là Jan, Feb, Mar, ...<br>
Tiếp theo,khai báo một hàm sử dụng kiểu enum là **Month** như là loại tham số của **month**<br>
```TypeScript
function isItSummer(month: Month) {
    let isSummer: boolean;
    switch (month) {
        case Month.Jun:
        case Month.Jul:
        case Month.Aug:
            isSummer = true;
            break;
        default:
            isSummer = false;
            break;
    }
    return isSummer;
}
```
Output:<br>
```
console.log(isItSummer(Month.Jun)); // true
```
Trong ví dụ này sử dụng giá trị constant bao gồm Jan, Feb, Mar, ...trong enum thay vì các giá trị 1, 2, 3...Điều này làm cho code rõ ràng hơn.<br>

**How TypeScript enum works**<br>
Bây giờ sẽ truyền vào một số thay vì một enum đến hàm **isItSummer()** và nó vẫn hoạt động bình thường<br>
Output:<br>
```
console.log(isItSummer(6)); // true
```
Hãy kiểm tra mã Javascript được tạo của enum Month :<br>
```TypeScript
var Month;
(function (Month) {
    Month[Month["Jan"] = 0] = "Jan";
    Month[Month["Feb"] = 1] = "Feb";
    Month[Month["Mar"] = 2] = "Mar";
    Month[Month["Apr"] = 3] = "Apr";
    Month[Month["May"] = 4] = "May";
    Month[Month["Jun"] = 5] = "Jun";
    Month[Month["Jul"] = 6] = "Jul";
    Month[Month["Aug"] = 7] = "Aug";
    Month[Month["Sep"] = 8] = "Sep";
    Month[Month["Oct"] = 9] = "Oct";
    Month[Month["Nov"] = 10] = "Nov";
    Month[Month["Dec"] = 11] = "Dec";
})(Month || (Month = {}));
```
Output của biến **Month** trong console:<br>
```TypeScript
{
  '0': 'Jan', 
  '1': 'Feb', 
  '2': 'Mar', 
  '3': 'Apr', 
  '4': 'May', 
  '5': 'Jun', 
  '6': 'Jul', 
  '7': 'Aug', 
  '8': 'Sep', 
  '9': 'Oct', 
  '10': 'Nov',
  '11': 'Dec',
  Jan: 0,     
  Feb: 1,     
  Mar: 2,     
  Apr: 3,     
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11
}
```
Như bạn thấy, đầu ra của một TypeScript enum là một object trong JavaScript. Đối tượng này có tên các thuộc tính được khai báo trong enum. Ví dụ: **Jan** là 0 và **Feb** là 1.<br>
Đối tượng được tạo cũng có các keys với các giá trị string đại diện cho các tên constants.<br>
Đó là lý do tại sao bạn có thể truyền một số vào hàm chấp nhận một enum. Nói cách khác, một thành phần enum vừa là một number vừa là một định nghĩa constant.<br>

**Specifying enum members’ numbers**
TypeScript xác định giá trị số của thành phần enum dựa trên thứ tự của thành phần đó xuất hiện trong định nghĩa enum. Ví dụ: tháng **Jan**  nhân giá trị 0, tháng **Feb**  nhận 1, v.v.<br>
Có thể chỉ định rõ ràng các số đặc biệt cho các thành phần của một enum như sau:<br>
```TypeScript
enum Month {
    Jan = 1,
    Feb,
    Mar,
    Apr,
    May,
    Jun,
    Jul,
    Aug,
    Sep,
    Oct,
    Nov,
    Dec
};
```
Trong ví dụ này, giá trị constant của thành phần **Jan** nhận giá trị 1 thay thế cho 0. **Feb** nhận giá trị 2, **Mar** nhận giá trị 3, ...<br>

**When to use an enum**
- Có một tập hợp nhỏ các giá trị cố định có liên quan chặt chẽ với nhau
- Và những giá trị này đã được biết tại thời điểm biên dịch.

Ví dụ: bạn có thể sử dụng một enum cho trạng thái phê duyệt:<br>
```TypeScript
enum ApprovalStatus {
    draft,
    submitted,
    approved,
    rejected
};
```
Sau đó, bạn có thể sử dụng enum ApprovalStatus như sau:<br>
```TypeScript
const request =  {
    id: 1,
    status: ApprovalStatus.approved,
    description: 'Please approve this request'
};

if(request.status === ApprovalStatus.approved) {
    // send an email
    console.log('Send email to the Applicant...');
}
```
Tóm tắt:<br>
- Enum TypeScript là một nhóm các giá trị constant.
- Một enum là một đối tượng JavaScript với các thuộc tính được đặt tên được khai báo trong định nghĩa enum.
- Sử dụng enum khi bạn có một tập hợp nhỏ các giá trị cố định có liên quan chặt chẽ và được biết đến tại thời điểm biên dịch.

### TypeScript Tuple
Tuple hoạt động giống như một mảng với một số cân nhắc bổ sung:
- Số lượng phần tử trong tuple được cố định.
- Types của các thành phần trong mảng thì được chỉ định trước và không cần giống nhau

Ví dụ bạn có thể sử dụng tuple để biểu diễn một giá trị như một cặp của một **string** và  **number**: <br>
```TypeScript
let skill: [string, number];
skill = ['Programming', 5];
```
Thứ tự của các giá trị trong tuple rất quan trọng. Nếu bạn thay đổi thứ tự các giá trị của tuple **skill** thành **[5, "Programming"]**, bạn sẽ gặp lỗi:<br>
```
let skill: [string, number];
skill = [5, 'Programming'];
```
Error:<br>
```
error TS2322: Type 'string' is not assignable to type 'number'.
```
Vì lý do này, bạn nên sử dụng tuples với dữ liệu có liên quan đến nhau theo một thứ tự cụ thể.<br>

**Optional Tuple Elements**<br>
Kể từ TypeScript 3.0, một tuple có thể có các phần tử tùy chọn được chỉ định bằng cách sử dụng hậu tố dấu hỏi (?).<br>
Ví dụ:<br>
```TypeScript
let bgColor, headerColor: [number, number, number, number?];
bgColor = [0, 255, 255, 0.5];
headerColor = [0, 255, 255];
```
Tóm tăt:<br>
Tuples là một mảng có một số phần tử cố định có kiểu đã biết.