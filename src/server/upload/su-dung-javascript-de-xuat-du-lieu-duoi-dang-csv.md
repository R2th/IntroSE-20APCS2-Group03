Trong bài viết này mình xin trình bày cách sử dụng JavaScript để xuất dữ liệu dưới dạng CSV.

Tất cả những gì cần thiết là một chút Javascript và HTML.

Giả sữ chúng ta có dữ liệu như sau:

```
const userData = [  
  {
    Name: "Jang Nara",
    Company: "Sun *",
    Age: 20,
  },
  {
    Name: "Jang Nara 2",
    Company: "Framgia",
    Age: 21,
  },
  {
    Name: "Jang Nara 3",
    Company: "BAP",
    Age: 22,
  },
];
```

Bây giờ chúng ta cần một hàm để tạo dữ liệu CSV từ data:

```
convertArrayOfObjectsToCSV = args => {  
  const data = args.data;
  if (!data || !data.length) return;

  const columnDelimiter = args.columnDelimiter || ',';
  const lineDelimiter = args.lineDelimiter || '\n';

  const keys = Object.keys(data[0]);

  let result = '';
  result += keys.join(columnDelimiter);
  result += lineDelimiter;

  data.forEach(item => {
    ctr = 0;
    keys.forEach(key => {
      if (ctr > 0) result += columnDelimiter;
      result += item[key];
      ctr++;
    });
    result += lineDelimiter;
  });

  return result;
}
```

Và đây là kết quả chúng ta nhận được từ hàm trên:

```
"Name,Company,Age
Jang Nara,Sun *,20
Jang Nara 2,Framgia,21
Jang Nara 3,BAP,22
"
```

Bây giờ chúng ta cần một hàm để lấy dữ liệu này và biến nó thành tệp CSV để tải xuống:

```
downloadCSV = args => {
  let csv = convertArrayOfObjectsToCSV({
    data: userData
  });
  if (!csv) return;

  const filename = args.filename || 'export.csv';

  if (!csv.match(/^data:text\/csv/i)) {
    csv = 'data:text/csv;charset=utf-8,' + csv;
  }

  const data = encodeURI(csv);

  const link = document.createElement('a');
  link.setAttribute('href', data);
  link.setAttribute('download', filename);
  link.click();
}
```

Hàm này lấy CSV mà chúng ta đã tạo và thêm một chuỗi đặc biệt cho trình duyệt biết rằng nội dung của chúng ta là CSV và nó cần được tải xuống:

```
data:text/csv;charset=utf-8,
```

Sau đó, trong html của chúng ta cần có một liên kết đơn giản để tiến hành tải file về:

```
<a href='#' onclick='downloadCSV({ filename: "user data.csv" });'>
  Download CSV
</a>
```

Và kết quả cuối cùng:

![](https://images.viblo.asia/df0d3e2b-8476-45f6-a5ba-77f7eff63a7c.png)

Hi vọng bài viết sẽ giúp ích cho các bạn!

-----

Nguồn bài viết: https://halistechnology.com/2015/05/28/use-javascript-to-export-your-data-as-csv/

-----

### Mr.Nara