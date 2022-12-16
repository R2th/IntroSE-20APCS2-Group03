Ở bài viết này ta sẽ tìm hiểu về tagged template trong es6.

### Template string

```
// es5
const book = 'Book 1'
const author = 'Author 1'
const result = book + ' by' + author

// es6
const book = 'Book 1'
const author = 'Author 1'
const result = `${book} by ${author}`
```

Với template string, code trở nên rõ ràng và dễ đọc hơn. Điều này trở nên rõ ràng khi ta cần concanate nhiều string lại với nhau.

### Tagged Template

```
const modify = (strings, values) => {
     return 'random string'
}

const modifyVer2 = (strings, ...values) => {
     let str = '';
      strings.forEach((string, i) => {
         if (i === 1) {
              str += string + 'Author 2';
          } else {   
             str += string + (values[i] || '');
         }
      });
     return str;
}

const book = 'Book 1'
const author = 'Author 1'
const result = modify`${book} by ${author}`
console.log(result) // random string
const result2 = modifyVer2`${book} by ${author}`
console.log(result2) // Book 1 by Author 2
```

Tagged template hoạt động như một bước trung gian.  Giá trị trả về của function sẽ là giá trị của template string.
Tagged template có thể được sử dụng để Escaping HTML tags.