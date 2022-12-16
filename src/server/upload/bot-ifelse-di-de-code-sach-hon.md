Khi chúng ta code JS hay bất kỳ một ngôn ngữ nào khác, có những trường hợp chúng ta gặp phải yêu cầu xử lý logic phức tạp hoặc logic đơn giản nhưng lại có rất nhiều case cần kiểm tra. Ơ như thông thường thì trường hợp thứ nhất sẽ chơi `if/else` còn trường hợp sau thì `switch`. Cũng chả có gì đáng nói nếu nó chỉ dừng ở đó, tuy nhiên thực tế luôn phũ phàng, với sự gia tăng logic cần xử lý thì `if/else` hay `switch` sẽ ngày càng cồng kềnh. Trong bài viết này sẽ sử dụng JS để đưa ra một số vấn đề và phương pháp xử lý (có thể chưa là tối ưu nhất) để giúp cho code của bạn clean hơn và nếu có phình to hơn chúng ta vẫn có thể kiểm soát được. 

### Ví dụ đầu tiên, với sự kiện click button có nhiều status
Ở ví dụ dưới đây sẽ đưa ra một số case khi click vào trang, mỗi case xảy ra sẽ gửi log qua hàm `sendLog()` và chuyển trang bằng hàm `jumpTo()` :
```javascript:onClick.js
/**
 * Sự kiện click button
 * @param {number} status 
 *    Activity status: 1 in progress, 2 in failure, 3 out of stock, 4 in success, 5 system cancelled
 */
const onButtonClick = (status)=>{
  if(status == 1){
    sendLog('processing')
    jumpTo('IndexPage')
  }else if(status == 2){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 3){
    sendLog('fail')
    jumpTo('FailPage')
  }else if(status == 4){
    sendLog('success')
    jumpTo('SuccessPage')
  }else if(status == 5){
    sendLog('cancel')
    jumpTo('CancelPage')
  }else {
    sendLog('other')
    jumpTo('Index')
  }
}
```
Trên đây là cách viết basic nhất mà mình nghĩ ai cũng sẽ nghĩ ra đầu tiên, tuy nhiên nó khá là dài và lặp nhiều code quá. Chúng ta có thể viết lại nó bằng cách sử dụng `switch` để trông code sáng hơn:
```javascript:switch.js
const onButtonClick = (status)=>{
  switch (status){
    case 1:
      sendLog('processing')
      jumpTo('IndexPage')
      break
    case 2:
    case 3:
      sendLog('fail')
      jumpTo('FailPage')
      break  
    case 4:
      sendLog('success')
      jumpTo('SuccessPage')
      break
    case 5:
      sendLog('cancel')
      jumpTo('CancelPage')
      break
    default:
      sendLog('other')
      jumpTo('Index')
      break
  }
}
```
Well, trông đã clear hơn so với dùng `if/else`, nếu đọc kỹ yêu cầu thì các bạn có thể thấy case 2 và 3 giống nhau, nếu dùng `if/else` thì cũng có thể sử dụng toán tử `||`, còn với `switch` thì như trên kia đó. Nhưng mà vẫn dài dòng quá đúng không? Viết lại thành function nhé:

```javascript:action.js

const actions = {
  '1': ['processing','IndexPage'],
  '2': ['fail','FailPage'],
  '3': ['fail','FailPage'],
  '4': ['success','SuccessPage'],
  '5': ['cancel','CancelPage'],
  'default': ['other','Index'],
}

const onButtonClick = (status)=>{
  let action = actions[status] || actions['default'],
      logName = action[0],
      pageName = action[1];

  sendLog(logName);
  jumpTo(pageName);
}
```
Đoạn code trên đã clean hơn rất nhiều, chúng ta sử dụng tên thuộc tính của object actions để làm điều kiện, và value của chúng để lưu các logic xử lý. Nó rất phù hợp với trường hợp điều kiện đơn như trên. Rất ổn rồi nhưng còn cách viết nào khác nữa không? Okay, xem một cách khác nhé:
```python:map.js
const actions = new Map([
  [1, ['processing','IndexPage']],
  [2, ['fail','FailPage']],
  [3, ['fail','FailPage']],
  [4, ['success','SuccessPage']],
  [5, ['cancel','CancelPage']],
  ['default', ['other','Index']]
])

const onButtonClick = (status)=>{
  let action = actions.get(status) || actions.get('default')
  sendLog(action[0])
  jumpTo(action[1])
}
```
Có những điểm lợi mà chúng ta sẽ có được khi sử dụng `Map` thay vì object thông thường:
- Object thông thường chỉ sử dụng được string hay symbol để làm key, nhưng key của Map có thể là bất cứ giá trị nào
- Có thể dễ dàng lấy ra kích thước (số lượng key-value) của Map bằng thuộc tính `size`, còn với object thông thường thì đây `Object.keys(actions).length;` =))

### Nâng cấp độ khó bài toán click button: lấy thêm giá trị định danh người dùng
```complex.js

/**
 * Button click event
 * @param {number} status 
 *    Activity status: 1 in progress, 2 in failure, 3 out of stock, 4 in success, 5 system cancelled
 *
 * @param {string} identity: guest, master
 */
const onButtonClick = (status,identity)=>{
  if(identity == 'guest'){
    if(status == 1){
      //do sth
    }else if(status == 2){
      //do sth
    }else if(status == 3){
      //do sth
    }else if(status == 4){
      //do sth
    }else if(status == 5){
      //do sth
    }else {
      //do sth
    }
  }else if(identity == 'master') {
    if(status == 1){
      //do sth
    }else if(status == 2){
      //do sth
    }else if(status == 3){
      //do sth
    }else if(status == 4){
      //do sth
    }else if(status == 5){
      //do sth
    }else {
      //do sth
    }
  }
}
```
Như trên, tăng gấp đôi logic xử lý thì về cơ bản khi sử dụng `if/else` sẽ tăng gấp đôi code. Vậy làm sao để code ngắn gọn hơn bây giờ? Hãy suy nghĩ giống như việc xử lý bên trên kia, chúng ta sẽ có giải pháp như sau:
```javascript:rawcomplex2.js
const actions = new Map([
  ['guest_1', ()=>{/*do sth*/}],
  ['guest_2', ()=>{/*do sth*/}],
  ['guest_3', ()=>{/*do sth*/}],
  ['guest_4', ()=>{/*do sth*/}],
  ['guest_5', ()=>{/*do sth*/}],
  ['master_1', ()=>{/*do sth*/}],
  ['master_2', ()=>{/*do sth*/}],
  ['master_3', ()=>{/*do sth*/}],
  ['master_4', ()=>{/*do sth*/}],
  ['master_5', ()=>{/*do sth*/}],
  ['default', ()=>{/*do sth*/}],
])

const onButtonClick = (identity,status)=>{
  let action = actions.get(`${identity}_${status}`) || actions.get('default')
  action.call(this)
}
```
Điều cốt lõi để đưa ra việc tối ưu code trên đó là:
- Hai điều kiện đầu vào được ghép chuỗi để làm key của Map
- Giá trị tương ứng với chuỗi đó sẽ được query trực tiếp ra và call

Chúng ta có thể sử dụng object thông thường để gán giá trị cho actions như dưới đây:
```javascript:js
const actions = {
  'guest_1':()=>{/*do sth*/},
  'guest_2':()=>{/*do sth*/},
  //....
}
const onButtonClick = (identity,status)=>{
  let action = actions[`${identity}_${status}`] || actions['default']
  action.call(this)
}
```
Tuy nhiên nếu viết như vậy ngay từ đầu và quên mất sự khác biệt giữa Map và object thông thường thì chúng ta sẽ không thể đưa ra được cách như dưới đây:
```javascript:obj.js
const actions = new Map([
  [{identity:'guest',status:1},()=>{/*do sth*/}],
  [{identity:'guest',status:2},()=>{/*do sth*/}],
  //...
])
const onButtonClick = (identity,status)=>{
  let action = [...actions].filter(([key,value])=>(key.identity == identity && key.status == status))
  action.forEach(([key,value])=>value.call(this))
}
```
Chúng ta sử dụng key của Map không phải là string nữa mà cũng là object với các thuộc tính là các điều kiện của bài toán,
kết hợp với việc clone array bằng *spread syntax* trong ES6 và filter để tìm ra action phù hợp.

Ổn ổn rồi, nhưng mà làm cho nó khó hơn tí nữa đi xem sao =)) khá mệt

### Nếu giá trị của status = 1 -> 4 sẽ cùng xử lý một công việc
Chúng ta gọi công việc phải xử lý chung là functionA, những case còn lại sẽ thực hiện công việc functionB C D ...
Và đây là cách làm không cần suy nghĩ nhất:
```javascript:js
const actions = new Map([
  [{identity:'guest',status:1},()=>{/* functionA */}],
  [{identity:'guest',status:2},()=>{/* functionA */}],
  [{identity:'guest',status:3},()=>{/* functionA */}],
  [{identity:'guest',status:4},()=>{/* functionA */}],
  [{identity:'guest',status:5},()=>{/* functionB */}],
  //...
])
```
Thực sự là tệ mà =)) cách làm trên kia khiến functionA mỗi lần thực hiện sẽ phải chạy lại từ đầu. Nó bé thì chả sao, chứ nó to đùng thì thực sự toang. 
Đây là lúc chúng ta cần đến cache. Nghe thì có vẻ phức tạp nhưng thực chất chúng ta sẽ tách phần functionA ra bên ngoài:
```cache.js
const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  return new Map([
    [{identity:'guest',status:1},functionA],
    [{identity:'guest',status:2},functionA],
    [{identity:'guest',status:3},functionA],
    [{identity:'guest',status:4},functionA],
    [{identity:'guest',status:5},functionB],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.identity == identity && key.status == status))
  action.forEach(([key,value])=>value.call(this))
}
```
Nhưng mà vẫn cứ bực, 4 status cùng xử lý 1 việc giống nhau đã đành, nhỡ có 30 status cùng như vậy thì sao =)) 
### Regex
Nhờ vào Map mà việc sử dụng Regex để làm key trở nên khả thi, và okay giờ trông ngắn chưa =)) 
Và chúng ta có thể giải quyết rất nhiều case khác nếu sử dụng cách này, ví dụ *Tất cả các case guest đều phải gửi lại log*:
```javascript:regexCache.js

const actions = ()=>{
  const functionA = ()=>{/*do sth*/}
  const functionB = ()=>{/*do sth*/}
  const functionC = ()=>{/*send log*/}

  return new Map([
    [/^(?:[1-9]|0[1-9]|1[0-9]|30)$/,functionA], // cảm ơn @bunny.pi.green đã báo lỗi =))
    [/^guest_31$/,functionB],
    [/^guest_.*$/,functionC],
    //...
  ])
}

const onButtonClick = (identity,status)=>{
  let action = [...actions()].filter(([key,value])=>(key.test(`${identity}_${status}`)))
  action.forEach(([key,value])=>value.call(this))
}
```

# Kết 
Qua bài viết này chúng ta có thể note lại những cách để xử lý kiểm tra điều kiện như sau:

1. if/else
2. switch
3. Với loại điều kiện đơn: lưu vào object hoặc Map
4. Với loại đa điều kiện: nối điều kiện lại thành chuỗi và lưu vào trong object hoặc Map
5. Với loại đa điều kiện tối ưu hơn: lưu điều kiện lại thành object dùng làm key trong Map, hoặc lưu thành chuỗi regex để làm key trong Map.

Hãy cố gắng để cuộc sống trở nên đơn giản hơn bằng việc ít sử dụng `if/else` hoặc `switch`.

Nguồn: https://medium.com/javascript-in-plain-english/clean-up-your-code-by-removing-if-else-statements-31102fe3b083

<hr>

***Cuộc sống là một chuỗi những sự lựa chọn, có những lựa chọn là đúng cũng có những lựa chọn là sai. Nhưng đúng hay sai không thành vấn đề, điều quan trọng là bạn phải lựa chọn. Bởi vì nếu bạn không thể lựa chọn thì bạn sẽ mãi không thoát ra khỏi vấn đề đang bao vây bạn. Và vì thế sẽ không thể xuất hiện những lựa chọn tiếp theo.***

***Nếu bạn có sự lựa chọn đúng đắn thì không có gì để nói, nhưng giả sử bạn đã lựa chọn sai. Cuộc sống sẽ cho bạn tiếp hai sự lựa chọn mới: học hỏi để rút kinh nghiệm hoặc tiếp tục phạm sai lầm.***

**Chúc anh em Schooler và SCP luôn vui vẻ, công việc tốt, chúc R&D ngày càng phát triển!**