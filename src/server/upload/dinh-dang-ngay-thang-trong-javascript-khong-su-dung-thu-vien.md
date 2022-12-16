Trong các ứng dụng/trang web, chúng ta thường muốn hiển thị định dạng ngày tháng kiểu 18/06/2021 hay 2021/06/18 ... cùng với thời gian (giờ, phút, giây...)

Thông thường chúng ta sẽ sử dụng luôn các thư viện như day.js, moment.js ... để xử lý cho nó vuông.

Nhưng việc cài thêm thư viện để sử dụng mà không sử dụng hết tính năng của nó thì khá là phí, mà còn làm cho ứng dụng của chúng ta nặng hơn.

Vì vậy, khi chúng ta sử dụng với tần suất thấp thì không cần phải cài thêm thư viện, vì nó sẽ ảnh hưởng tới thời gian tải ứng dụng, không nhiều thì ít :v

**Trong bài viết này, chúng ta sẽ cùng học cách sử dụng ``Date`` object để định dạng ngày theo mà không sử dụng bất kỳ thư viện bên ngoài nào.**


### Sử dụng Date.prototype.toLocaleDateString
**Syntax:**
```javascript
toLocaleDateString(locales, options)
```

Phương thức ``toLocaleDateString`` nhận một bộ các tùy chọn tùy chỉnh và trả về phần ngày dưới dạng Date instance theo quy ước ngôn ngữ được xác định. Ngôn ngữ xác định thông qua [IETF language tag](https://en.wikipedia.org/wiki/IETF_language_tag) , ví dụ en-US ...

options là một đối tượng mà chúng ta chỉ định phần nào của ngày mà chúng ta muốn như ngày, năm, tháng, v.v.

***Tham khảo:*** https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toLocaleDateString

### Chỉ lấy ngày
```javascript
const date = new Date().toLocaleDateString('en-US');
console.log(date); // 6/18/2021
```

### Định dạng ngày
```javascript
const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
});
console.log(date); // June 18, 2021
```

### Lấy ngày và giờ
```javascript
const date = new Date().toLocaleDateString('en-US', {
    hour: 'numeric',
    minute: 'numeric'
});
console.log(date); // 6/18/2021, 10:30 AM
```

### Định dạng ngày và giờ
```javascript
const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
});
console.log(date); // June 18, 2021, 10:30 AM
```

### Định dạng ngày, giờ và giây
```javascript
const date = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});
console.log(date); // June 18, 2021, 10:30:54 AM
```

### Định dạng ngày, giờ và tuần
```javascript
const date = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
});
console.log(date); // Friday, June 18, 2021, 10:30:52 AM
```


**Các tham số tùy chọn có thể sử dụng:**

```
weekday: long, short, narrow
era: long, short, narrow
year: numeric, 2-digit
month: numeric, 2-digit, long, short, narrow
day: numeric, 2-digit
hour: numeric, 2-digit
minute: numeric, 2-digit
second: numeric, 2-digit
timeZoneName: long, short
```

Cảm ơn mọi người đã dành thời gian học cùng mình :kissing_heart:

**Nguồn nè:** https://dev.to/myogeshchavan97/how-to-display-formatted-date-in-javascript-without-using-any-external-library-1n2m