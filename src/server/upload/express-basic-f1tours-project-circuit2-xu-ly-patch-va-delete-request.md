Chào các bạn!
Nối tiếp [Circuit1](https://viblo.asia/p/express-basic-f1tours-project-circuit1-tong-quan-f1tours-xu-ly-get-va-post-request-yMnKMbPQZ7P).
Hôm nay, chúng ta tiếp tục đến với chặng 2 của "F1 Tours" nhé!
<br>

# 1. Xử lý PATCH và DELETE request trong Express:
## Xử lý Patch:
Tiếp theo, ở phía dưới route xử POST request, mình tạo route xử lý PATCH request dùng để update thông tin chặng đua. Các bạn cũng có thể sử dụng PUT request thay cho PATCH request trong trường hợp này.<br>
Thông tin được update sẽ không được validation trước khi update nên xem như thông tin cần update truyền lên trong body params là chính xác nhé. <br>
Chỉnh sửa *app.js* như sau:
```
...
app.patch('/api/f1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const updatingTour = tours.find(el => el.id === id);
  if (!updatingTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  Object.assign(updatingTour, req.body);

  tours.map(r => (updatingTour.id == r.id) || r);

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(tours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: updatingTour
      }
    })
  });
});
...
```
Trong phần update, mình cũng sẽ kiểm tra xem *id* của tour cần được update có hợp lệ hay không? Tiếp đó, mình xử lý cập nhật thông tin mới cho tour update và ghi lại vào file data json. <br>
Bật terminal lên cùng dùng *curl* để GET thông tin 1 chặng đua, sau đó thực hiện update thông tin cho chặng đua nhé:
```
>>>>> get dữ liệu 1 chặng đua cụ thể
curl -X GET -H "Content-Type: application/json" localhost:3000/api/f1/tours/3 |json_pp

======== result =====
{
   "data" : {
      "tour" : {
         "unit" : "km",
         "race_distance" : "308.715",
         "name" : "VIETNAM - Hanoi Circuit",
         "first_grand_prix" : "2020",
         "lap_record_by" : "",
         "lap_record" : "",
         "lap_record_year" : "",
         "id" : 3,
         "circuit_length" : "5.613",
         "number_of_laps" : 55
      }
   },
   "status" : "success"
}

>>>>> update thông tin chặng đua này "first_grand_prix" : "2020" >> "2021"

curl -X PATCH -H "Content-Type: application/json" -d '{"first_grand_prix": "2021"}' localhost:3000/api/f1/tours/3 |json_pp

====== result =======
{
   "status" : "success",
   "data" : {
      "tour" : {
         "id" : 3,
         "first_grand_prix" : "2021",
         "number_of_laps" : 55,
         "lap_record_year" : "",
         "name" : "VIETNAM - Hanoi Circuit",
         "unit" : "km",
         "lap_record" : "",
         "lap_record_by" : "",
         "circuit_length" : "5.613",
         "race_distance" : "308.715"
      }
   }
}

```

## Xử lý Delete:
Mình sẽ xử lý DELETE request. Cùng tạo route xử lý xóa thông tin chặng đua tiếp theo sau route xử lý update chặng đua. <br>
Chỉnh sửa *app.js* như sau:
```
app.delete('/api/f1/tours/:id', (req, res) => {
  const id = parseInt(req.params.id);

  const deleteTour = tours.find(el => el.id === id);
  if (!deleteTour) {
    return res.status(404).json({
      status: 'failed',
      message: 'Invalid ID'
    })
  }
  remainTours = tours.filter(function(obj, index, arr){ return obj.id !== id;})

  fs.writeFile(`${__dirname}/data/f1tours.json`, JSON.stringify(remainTours), err => {
    res.status(201).json({
      status: 'success',
      data: {
        tour: null
      }
    })
  });
});
```
Cùng bật terminal lên và thử xóa một chặng đua nào : 
```
>>>>>>> xóa chặng đua
curl -X DELETE -H "Content-Type: application/json" localhost:3000/api/f1/tours/3 |json_pp

======= result ========
{
   "data" : {
      "tour" : null
   },
   "status" : "success"
}

>>>>> Get lại toàn bộ thông tin các chặng đua
curl -X GET -H "Content-Type: application/json" localhost:3000/api/f1/tours |json_pp

======= result ========

{
   "status" : "success",
   "data" : {
      "tours" : [
         {
            "id" : 1,
            "lap_record_year" : "2004",
            "circuit_length" : "5.303",
            "lap_record" : "1:24.125",
            "first_grand_prix" : "1996",
            "race_distance" : "307.574",
            "unit" : "km",
            "name" : "AUSTRALIA - Melbourne Grand Prix Circuit",
            "lap_record_by" : "M Schumacher",
            "number_of_laps" : 58
         },
         {
            "lap_record_by" : "De la Rosa",
            "name" : "BAHRAIN - Bahrain International Circuit",
            "number_of_laps" : 57,
            "lap_record" : "1:31.447",
            "first_grand_prix" : "2004",
            "race_distance" : "308.238",
            "unit" : "km",
            "circuit_length" : "5.412",
            "id" : 2,
            "lap_record_year" : "2005"
         },
         {
            "circuit_length" : "5.451",
            "id" : 4,
            "lap_record_year" : "2004",
            "number_of_laps" : 56,
            "lap_record_by" : "M Schumacher",
            "name" : "CHINA - Shanghai International Circuit",
            "lap_record" : "1:32.238",
            "first_grand_prix" : "2004",
            "unit" : "km",
            "race_distance" : "305.066"
         },
         {
            "lap_record_by" : "",
            "number_of_laps" : 72,
            "name" : "NETHERLANDS - Zandvoort Circuit",
            "first_grand_prix" : "1952",
            "lap_record" : "",
            "race_distance" : "306.648",
            "unit" : "km",
            "circuit_length" : "4.259",
            "id" : 5,
            "lap_record_year" : ""
         }
      ]
   },
   "results" : 4
}
```
Như vậy, mình đã xóa thành công chặng đua có *id = 3* rồi.
# 2. Phần kế tiếp:
Circuit2 đến đây xin kết thúc. Phần kế tiếp mình sẽ thực hiện refactor lại toàn bộ routes. Các bạn cùng đón đọc nhé.
<br>
*Cảm ơn các bạn đã đọc bài viết của mình.*<br>
*Bài viết không thể tránh khỏi những thiếu xót, mong nhận được sự góp ý của các bạn để bài viết được hoàn thiện hơn.*<br>
***Nguồn tham khảo:*** <br>
*- Expressjs.com*<br>
*- Udemy.com*<br>
*- Và một số nguồn khác* <br>