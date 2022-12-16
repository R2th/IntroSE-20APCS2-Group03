HTTP Request ```task``` parameter 
Joomla sử dụng HTTP Request sử dụng tham số  ```task```  để xác định xem controller nào sẽ được sử dụng. Tham số ```Task``` có thể gửi đi bên trong HTTP GET hoặc POST, trong thực tế Joomla không thực sự phân biết giữa các tham số GET và POST. Nhưng ```task``` chỉ là một tham số HTTP thông thường, không có gì đặc biết.

Trong source code của joomla các bạn sẽ thấy 

```
$controller = JControllerLegacy::getInstance('example');
$controller->execute(JFactory::getApplication()->input->get('task'));
```
example có thể thay bằng 'Contact', 'Content', 'Modules' v.v...

Phương thức getInstance() của lớp ```JcontrollerLegacy``` (hoặc ```BaseController``` trong joomla 3.8).

* Kiểm tra tham số ```task```
* Dựa trên đối số này mà nó có thể quyết định xem lớp controller sẽ được thực hiện, và tìm xem file nào sẽ chứa lớp đó 
* Tạo ra một instance của lớp controller( Cái mà được trả về từ phương thức này)
* Đặt lại tham số ```task``` 

Dòng tiếp theo (```$controller->execute(JFactory::getApplication()->input->get('task'));```) sau đó gọi phương thức execute() của controller instance với tham số bây giờ là phương thức để chạy, và phương thức execute() chỉ đơn thuần chạy phương thức được truyền vào.

Tham số ```Task``` có dạng x.y, trong đó x đại diện cho kiểu controller và y là phương thức để gọi. Kiểu controller có thể vắng mặt trong trường hợp phương thức controller.php có thể chạy được. Nếu kiểu controller có mặt thì một trong số các Controller trong folder controllers được sử dụng. Nếu tham số ```task``` không có thì phương thức display() trong controller.php sẽ chạy. bảng phía dưới sẽ cho chúng thấy các trường hợp có thể diễn ra khi component com_example được gọi.

| Form of task| Controller file | Controller class |Controller method|
| -------- | -------- | -------- |-------- |
| ```controllerType```.```method```     | controllers/```controllerType```.php     | ExampleController``` ControllerType```   | ```method```|
|eg items.process|controllers/items.php|ExampleControllerItems|process|
|```method```(no controllerType set)|controller.php|ExampleController|method|
|(task not set)|controller.php|ExampleController|display|

Các trường hợp trên sẽ đều sảy ra ở front-end và back-end, ngoại trừ với administrator nó diễn ra trong folder ```administrator```