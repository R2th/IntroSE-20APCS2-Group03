# 1. Giới thiệu
Việc code sao cho rõ nghĩa, sạch sẽ, đúng logic (clean code) là việc đầu tiên mà những developers phải lắm rõ trong 1 dự án. Bởi vì bạn không chỉ viết code cho bản thân mà còn cho những developers khác nữa, cho những ứng dụng tiếp theo trong tương lai.

Bản thân mình khi mới bắt đầu đi làm thì dự án đầu tiên mình vào lại là maintain :)) , thành thử ra việc đọc hiểu code của người khác cứ như cơm bữa vậy =)). Có lúc đọc mãi chả hiểu mô tê gì sất :((, cũng có lúc code cũ lỗi convention tùm lùm (lâu rồi nên cũng k thể tránh được), ... Mà có thể hiểu được logic nhưng lúc triển khai mình lại khác chậm @@, có lẽ vì bản thân code vẫn còn rất lởm.

Cho nên bài viết này chúng ta sẽ cùng tìm hiểu 1 vài **lỗi check Conditionals trong JavaScript mà các lập trình viên mới ra trường hay gặp**. Dưới đây là các tips về cấu trúc câu lệnh khi có sử dụng if…else. Có thể giúp các bạn viết ít code hơn nhưng có thể hiệu quả hơn với cách cũ.

# 2. Các lỗi check Conditionals trong JavaScript mà new Dev thường mắc

## Không sử dụng các điều kiện phủ định.

Không sử dụng các điều kiện phủ định nó sẽ gây nhầm lẫn rất nhiều trong khi triển khai code.

Ví dụ:

```
const isEmailNotVerified = (email) => {
  // implementation
}
 
if (!isEmailNotVerified(email)) {
  // do something...
}
 
if (isVerified === true) {
  // do something...
}
```

Ta có thể viết:

```
const isEmailVerified = (email) => {
  // implementation
}
 
if (isEmailVerified(email)) {
  // do something...
}
 
if (isVerified) {
  // do something...
}
```

Việc viết phụ định như vậy là không sai nhưng nó sẽ gây nhầm lẫn cho những đồng nghiệp khác.

## For Multiple Conditions, use Array.includes
Ví dụ nếu bạn muốn check hệ thống của bạn có những model như là ‘vinfast fadil’ hay ‘Hyundai Accent’ thì các devjs mới thường sẽ làm như thế này.
```
const checkCarModel = (model) => {
  if(model === 'vinfast fadil' || model === 'Hyundai Accent') { 
    console.log('model valid');
  }
}

checkCarModel('vinfast fadil'); // outputs 'model valid'
 
```

Thật sự không sai ở đây, và như thế này các bạn cũng đã làm rất tốt rồi, nhưng ở đây có một cách hay hơn nữa nếu như có thêm điều kiện check nữa thì sao? Cách tốt hơn là sử dụng Array.includes:


```
const checkCarModel = (model) => {
  const models = ['vinfast fadil', 'Hyundai Accent'];
 
  if(models.includes(model)) { 
    console.log('model valid');
  }
}
 
checkCarModel('vinfast fadil'); // outputs 'model valid'
```

Giả sử sau này có thêm điều kiện ‘Toyota vios’ thì chúng ta cần thêm điều kiện đó vào:

```
const models = ['vinfast fadil', 'Hyundai Accent', 'Toyota vios'];
```

Oki

## Không cần check dài dòng khi sử dụng if…else
Có một ví dụ tiếp theo là check các properties trong một object thì có những dòng code như thế này. Các bạn xem qua và có thể tự mỉm cười vì mình có thể ỏ trong đó lúc còn đang là sinh viên.

ví dụ:

```
const checkModel = (car) => {
  let result; // Đầu tiên định nghĩa một kết quả trả về.
  
  // check if car exists
  if(car) {
 
    // check if car model exists
    if (car.model) {
 
      // check if car year exists
      if(car.year) {
        result = `Car model: ${car.model}; Manufacturing year: ${car.year};`;
      } else {
        result = 'No car year';
      }
  
    } else {
      result = 'No car model'
    }   
 
  } else {
    result = 'No car';
  }
 
  return result; // our single return statement
}
 
console.log(checkModel()); // outputs 'No car'
console.log(checkModel({ year: 1988 })); // outputs 'No car model'
console.log(checkModel({ model: 'ford' })); // outputs 'No car year'
console.log(checkModel({ model: 'ford', year: 1988 })); // outputs 'Car model: ford; Manufacturing year: 1988;'
```

Giờ đây các bạn có thể làm tốt hơn với việc sử dụng như thế này:

```
const checkModel = ({model, year} = {}) => {
  if(!model && !year) return 'No car';
  if(!model) return 'No car model';
  if(!year) return 'No car year';
 
  // here we are free to do whatever we want with the model or year
  // we made sure that they exist
  // no more checks required
 
  // doSomething(model);
  // doSomethingElse(year);
  
  return `Car model: ${model}; Manufacturing year: ${year};`;
}
 
console.log(checkModel()); // outputs 'No car'
console.log(checkModel({ year: 1988 })); // outputs 'No car model'
console.log(checkModel({ model: 'ford' })); // outputs 'No car year'
console.log(checkModel({ model: 'ford', year: 1988 })); // outputs 'Car model: ford; Manufacturing year: 1988;'
```

Các bạn có gắng giảm thật nhiều các điều kiện check không cần thiết. Code sẽ sạch hơn và việc fix bug cũng tốt hơn nữa.

## Use Indexing or Maps Instead of switch Statement

Đây là một ví dụ nữa và cũng là ví dụ cuối cùng của bài viết hôm nay. Đó là có nhiều trường hợp các bạn có thể làm tốt hơn khi không sử dụng switch.

Xem ví dụ sau:
```
const getCarsByState = (state) => {
  switch (state) {
    case 'usa':
      return ['Ford', 'Dodge'];
    case 'france':
      return ['Renault', 'Peugeot'];
    case 'italy':
      return ['Fiat'];
    default:
      return [];
  }
}
 
console.log(getCarsByState()); // outputs []
console.log(getCarsByState('usa')); // outputs ['Ford', 'Dodge']
console.log(getCarsByState('italy')); // outputs ['Fiat']
```

Giờ chúng ta sẽ viết lại một cách đơn giản hơn và cũng được nhiều người ủng hộ hơn:

```
const carState = {
  usa: ['Ford', 'Dodge'],
  france: ['Renault', 'Peugeot'],
  italy: ['Fiat']
};
 
const getCarsByState = (state) => {
  return carState[state] || [];
}
 
console.log(getCarsByState()); // outputs []
console.log(getCarsByState('usa')); // outputs ['Ford', 'Dodge']
console.log(getCarsByState('france')); // outputs ['Renault', 'Peugeot']
```


## Không nhất thiết lúc nào cũng phải if rồi đến do something :))

Đôi khi code bạn muốn kiểm tra xem nếu user tồn tại thì mới thực hiện, nhưng biểu thức thực hiện cũng có thể có điều kiện tương tự

Như ví dụ:

```
# const loggedIn? => return true if loggin

onDragEnter(e) {
    e.preventDefault();
    this.setState({ dragging: true })
  }
```

ta muốn check user đã đăng nhập thì mới setState (cho nó quyền dragdrop). Bình thưởng bạn sẽ code ntn?

```
onDragEnter(e) {
    e.preventDefault();
    if (loggedIn?) {
        this.setState({ dragging: true })
    }
  }
```

yep! không sai, nhưng cứ thấy thừa thừa =))
sao ta không viết lại thế này:

```
onDragEnter(e) {
    e.preventDefault();
    this.setState({ dragging: loggedIn? })
  }
```

khá đơn giản nhỉ :v
# 3. Kết luận


Để có thể code tốt hơn thì học hỏi từ những sai lầm là điều cần thiết,  thậm trí là học từ những sai lầm của người khác nữa :)). Tích lũy kinh nghiệm dần dần, rồi các bạn sẽ thấy những lỗi này không còn tồn tại trong code của mình nữa, vì nó đã thành bản năng rồi.

Chúc các bạn một ngày tốt lành :)

-st-