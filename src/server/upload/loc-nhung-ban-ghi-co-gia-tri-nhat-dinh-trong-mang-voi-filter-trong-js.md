Có bao giờ bạn phải lọc những bản ghi mà có một field bất kỳ được chỉ định giá trị nào đó.
Ví dụ bạn có mảng object gồm các sinh viên:
```javascript
var data = {
  	"class" : {
        "students" : [
        	{
            "id" : "S01",
            "name" : "Ly Nhan Tong",
            "age" : 20,
            "phone" : 0969692268,
            "gender" : "Male",
            "address" : "Ha Noi"
          },
          {
            "id" : "S02",
            "name" : "Le Anh Phuong",
            "age" : 19,
            "phone" : 0969692268,
            "gender" : "Female",
            "address" : "Ha Nam"
          },
          {
            "id" : "S03",
            "name" : "Le Hoan",
            "age" : 20,
            "phone" : 0969692268,
            "gender" : "Male",
            "address" : "Ha Tay"
       		}
       ]
		}
}
```
Bài toán là cần lấy những bản ghi có “gender” = “Male”. Có thể bạn sẽ nghĩ đến vòng for, duyệt đến bản ghi nào có “gender” = “Male” bạn sẽ thêm vào một mảng mới.
```javascript
var newArray= [];
for(var i = 0; i < data.class.students.length; i++){
    if(data.class.students[i][“gender”] === ‘Male’){
        newArray.push(data.class.students[i]);
    }
}
```
Còn với Filter Cũng xử lý như trên nhưng với Filter mọi thứ đơn giản hơn dễ hiểu hơn rất nhiều
```javascript
var result = data.class.students.filter(function( obj ) {
  return obj.gender == "Male";
});
```
Kết quả:
```javascript
[
    {
        "id": "S01",
        "name": "Ly Nhan Tong",
        "age": 20,
        "phone": 969692268,
        "gender": "Male",
        "address": "Ha Noi"
    },
    {
        "id": "S03",
        "name": "Le Hoan",
        "age": 20,
        "phone": 969692268,
        "gender": "Male",
        "address": "Ha Tay"
    }
]
```

Demo JsFiddle : 
{@jsfiddle: https://jsfiddle.net/tiepnvbn/gta5o8hm/}