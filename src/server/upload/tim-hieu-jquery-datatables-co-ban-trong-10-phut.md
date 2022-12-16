## Tổng quan
DataTables là một plugin jQuery mạnh mẽ để hiển thị thông tin trong các bảng và thêm các tương tác vào chúng. Nó cung cấp tìm kiếm, sắp xếp và phân trang mà không cần bất kỳ cấu hình nào. Trong bài viết này, chúng ta sẽ tìm hiểu những điều cơ bản về DataTables và sử dụng nó trong trang web của bạn.

![](https://images.viblo.asia/9a08ff51-dca7-4b5e-b2fb-d32406c0168f.png)

## Cách sử dụng jQuery DataTables
1. Trước tiên, hãy tạo Bảng HTML sao cho teeb các cột nằm dưới `thead`  và dữ liệu của cột dưới `tbody`.

```
<table id="table_id">
    <thead>
        <tr>
            <th>Col1</th>
            <th>Col2</th>
            <th>Col3</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>data-1a</td>
            <td>data-1b</td>
            <td>data-1c</td>
        </tr>
        <tr>
            <td>data-2a</td>
            <td>data-2b</td>
            <td>data-2c</td>
        </tr>
        <tr>
            <td>data-3a</td>
            <td>data-3b</td>
            <td>data-3c</td>
        </tr>
        <tr>
            <td>data-4a</td>
            <td>data-4b</td>
            <td>data-4c</td>
        </tr>
        .....   
        </tbody>
</table>
```

2. Sau đó nhúng thư viện jQuery and DataTables scripts.

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
```

3. Cuối cùng, bên trong function jQuery `ready()` gọi function `.DataTable()` để khởi tạo DataTable.
```
<script>
    $(document).ready(function () {
        $('#table_id').DataTable();
    });
</script>
```

## Ví dụ cơ bản jQuery DataTables
- HTML Table CODE
```
<table id="table1">
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Occupation</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>Ram</td>
            <td>21</td>
            <td>Male</td>
            <td>Doctor</td>
        </tr>
        <tr>
            <td>Mohan</td>
            <td>32</td>
            <td>Male</td>
            <td>Teacher</td>
        </tr>
        <tr>
            <td>Rani</td>
            <td>42</td>
            <td>Female</td>
            <td>Nurse</td>
        </tr>
        <tr>
            <td>Johan</td>
            <td>23</td>
            <td>Female</td>
            <td>Software Engineer</td>
        </tr>
        <tr>
            <td>Shajia</td>
            <td>39</td>
            <td>Female</td>
            <td>Farmer</td>
        </tr>
        <tr>
            <td>Jack</td>
            <td>19</td>
            <td>Male</td>
            <td>Student</td>
        </tr>
        <tr>
            <td>Hina</td>
            <td>30</td>
            <td>Female</td>
            <td>Artist</td>
        </tr>
        <tr>
            <td>Gauhar</td>
            <td>36</td>
            <td>Female</td>
            <td>Artist</td>
        </tr>
        <tr>
            <td>Jacky</td>
            <td>55</td>
            <td>Female</td>
            <td>Bank Manager</td>
        </tr>
        <tr>
            <td>Pintu</td>
            <td>36</td>
            <td>Male</td>
            <td>Clerk</td>
        </tr>
        <tr>
            <td>Sumit</td>
            <td>33</td>
            <td>Male</td>
            <td>Footballer</td>
        </tr>
        <tr>
            <td>Radhu</td>
            <td>40</td>
            <td>Female</td>
            <td>Coder</td>
        </tr>
        <tr>
            <td>Mamta</td>
            <td>49</td>
            <td>Female</td>
            <td>Student</td>
        </tr>
        <tr>
            <td>Priya</td>
            <td>36</td>
            <td>Female</td>
            <td>Worker</td>
        </tr>
        <tr>
            <td>Johnny</td>
            <td>41</td>
            <td>Male</td>
            <td>Forest Officer</td>
        </tr>
    </tbody>
</table>
```

- JQuery CODE

```
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
<script type="text/javascript" src="https://cdn.datatables.net/1.10.16/js/jquery.dataTables.min.js"></script>
 
<script>
    $(document).ready(function () {
        $('#table1').DataTable();
    });
</script>
```

- Kết quả:

![](https://images.viblo.asia/c78cc53c-1c99-4d5c-84ab-8b63188e5981.gif)

## jQuery DataTables – Binding with an Array
- Chúng ta có thể khởi tạo dữ liệu cho table sử dụng mảng

```
<table id="table2">
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Occupation</th>
        </tr>
    </thead>
</table>
```

- Để liên kết với một mảng, đặt thuộc tính `data property` thành tên mảng. 
```
var array = [
            [
                "Ram",
                "21",
                "Male",
                "Doctor"
            ],
            [
                "Mohan",
                "32",
                "Male",
                "Teacher"
            ],
            [
                "Rani",
                "42",
                "Female",
                "Nurse"
            ],
            [
                "Johan",
                "23",
                "Female",
                "Software Engineer"
            ],
            [
                "Shajia",
                "39",
                "Female",
                "Farmer"
            ]
];
 
$('#table2').DataTable({
    data: array,
    "pageLength": 3
});
```

## jQuery DataTables – Binding with JSON
- Chúng ta cũng có thể liên kết DataTables với JSON. Ở đây bạn phải đặt các trường của JSON thành thuộc tính cột của DataTables.
```
<table id="table3">
    <thead>
        <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Occupation</th>
        </tr>
    </thead>
</table>
 
var json = [
            {
                "name": "Ram",
                "age": "21",
                "sex": "Male",
                "occupation": "Doctor"
            },
            {
                "name": "Mohan",
                "age": "32",
                "sex": "Male",
                "occupation": "Teacher"
            },
            {
                "name": "Rani",
                "age": "42",
                "sex": "Female",
                "occupation": "Nurse"
            },
            {
                "name": "Johan",
                "age": "23",
                "sex": "Female",
                "occupation": "Software Engineer"
            },
            {
                "name": "Shajia",
                "age": "39",
                "sex": "Female",
                "occupation": "Farmer"
            }
];
 
$('#table3').DataTable({
    data: json,
    columns: [
        { data: 'name' },
        { data: 'age' },
        { data: 'sex' },
        { data: 'occupation' }
    ],
    "pageLength": 3
});
```

## Kết luận
Trong bài viết này mình đã hướng dẫn các bạn cách sử dụng DataTable cơ bản. Bạn có thể tìm hiểu thêm tại [Document](https://datatables.net/manual/installation) của DataTable.

**Tài liệu tham khảo:** 

- https://www.yogihosting.com/jquery-datatables/
- https://datatables.net/manual/installation