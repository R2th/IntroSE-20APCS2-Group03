Trong bài này, chúng ta cùng tìm hiểu về interface & function trong Typescript.

###  1. Cài đặt ban đầu:
 - NodeJS: https://nodejs.org/en/
 - ts-node package
```javascript
$npm i ts-node
$touch interface.ts
```

###  2. Thực hành
Đầu tiên chúng ta tạo file mới & định nghĩa một interface như sau:

index.ts
```css:typescript:
interface Weather {
  date: Date;
  msg: string;
}
```
* Diễn giải:
    - Interface thời tiết này có 2 props là date & message thông báo.
    - date có annotation là Date
    - msg có annotation là string

Tiếp theo, chúng ta cần tạo một object thỏa mãn cái interface nêu trên:
```javascript:typescript
const todaysWeather: Weather = {
  date: 'today',
  msg: 'sunny',
};
```
Lúc này typescript lại thông báo lỗi
```python
The expected type comes from property 'date' which is declared here on type 'Weather'
```

Bây giờ chúng ta sửa lại cái prop date trong interface weather:
```javascript:js
const todaysWeather: Weather = {
  date: new Date(),
  msg: 'sunny',
};

console.log(todaysWeather);
```

Tiến hành chạy combine run time:
`$ts-node functions.ts`, kết quả trả về như sau:
```json
{ date: 2022-06-29T06:25:51.534Z, msg: 'sunny' }
```

Bây giờ chúng ta tạo một arrow function như sau:
```javascript:typescript
const logWeather = (args: Weather) => {
  console.log(args.date);
  console.log(args.msg);
};

logWeather(todaysWeather);
```

Kết quả:
```sql
2022-06-29T06:38:19.434Z
sunny
```

### Toàn bộ code 
```javascript
interface Weather {
  date: Date;
  msg: string;
}

const todaysWeather: Weather = {
  date: new Date(),
  msg: 'sunny',
};

console.log(todaysWeather);

const logWeather = (args: Weather) => {
  console.log(args.date);
  console.log(args.msg);
};

logWeather(todaysWeather);

```

Chúng các bạn thành công nhé 😀