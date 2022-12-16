Bài này chúng ta sẽ định nghĩa cho từng chức năng của Controller và test thử chức năng tạo thông tin student với postman nhé.

###  Tạo thông tin học sinh

Chúng ta sẽ nhờ Laravel yêu cầu class này để lấy dữ liệu data đến endpoint. Endpoint ở đây phải đúng kiểu dữ liệu string cho trường name và course. Sau thi hoàn thành thì Laravel chuyển data đó và lưu vào database.

Update function createStudent trong  Controller như sau:

App/Http/Controllers/ApiController.php

```
public function createStudent(Request $request)
    {
        // Tạo thông tin học sinh tại đây
        $student = new Student;
        $student->name = $request->name;
        $student->course = $request->course;
        $student->save();

        return response()->json([
            "message" => "student record created"
        ], 201);
    }
```

Đoạn code trên thì chúng ta sẽ import một kiểu Student để nó có thể tương tác với table students trong database. Trong hàm này, chúng ta sẽ khởi tạo một đối tượng Request mới và gán đổi tượng request này vào đối tượng Student rồi cập nhập mỗi trường của nó vào cột tương ứng của database.

Khi thành công, một đối tượng JSON sẽ trả về với message "student record created" với mã code 201.

Method này tương ứng vào phần `Route::post('students, 'ApiController@createStudent'); `mà chúng ta đã định nghĩa ở phần Route.

Kiểm tra bằng Postman, nhập đường dẫn localhost/api/students với POST method.

Gán thông tin name và course và nhấn nút Send ( khi đó đối tượng Request được tạo ra rồi gán vào đối tượng Student, đối tượng Student này sau đó được lưu vào database)



![](https://images.viblo.asia/4001f13c-4009-4ec2-ace3-806487938f8b.png)

Nếu gửi thành công message gửi về là "message": "student record created".