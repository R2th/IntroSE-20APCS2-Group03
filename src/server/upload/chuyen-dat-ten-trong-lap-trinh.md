## Mở đầu

Đặt tên biến, việc tưởng chừng đơn giản và vô nghĩa, nhưng đôi khi lại vô cùng quan trọng khi debug và giúp bạn tiết kiệm được cả đống thời gian viết comment. Hãy cũng tôi tìm hiểu cách đặt tên sao cho hợp lý và "sạch"

## Các chuẩn đặt tên
Có 3 chuẩn chính thường dùng khi code:

* underscore: sử dụng dấu gạch chân giữa các từ, tất cả các từ đều viết thường, ví dụ: $this_is_my_variable.
* camelCase: giống như cách viết của nó, từ đầu tiên viết thường, các từ tiếp theo viết hoa chữ cái đầu, ví dụ $thisIsMyVariable.
* PascalCase: viết hoa tất cả các chữ cái đầu, ví dụ $ThisIsMyVariable.

Ngoài ra thì có một số khác nữa:

* KebabCase: các từ viết thường, cách nhau bởi gạch giữa, ví dụ: <this-is-my-variable/>
* hoặc kiểu viết hoa hết và cách nhau bởi dấu gạch dưới, vi dụ: THIS_IS_VARIABLE.

## Hướng dẫn sử dụng

Tùy theo framework, CMS bạn sử dụng mà cách đặt tên có chút khác biết nhưng về cơ bản thì nó sẽ theo chuẩn như này

* Class thì dùng kiểu PascalCase.
* Function, method, variable dùng camelCase.
* Constant thì viết hoa toàn bộ, các từ cách nhau bằng gạch dưới.
* Tên table, column trong Database thì thường dùng kiểu underscore.
* Các phần tử html như khi dùng Vuejs hay React,... thì thường dùng kiểu KebabCase

## Quy tắc đặt tên

### 1.Tên mang mục đích

Dùng function, dùng biến để làm gì thì đặt tên nó theo đó, Class, Object của cái gì thì hãy đặt tên liên quan. Đừng cố thể hiện sự hài hước ở đây (dùng trong comment thì được).
Kể cả biến tạm, bạn cũng nên đặt một cái tên rõ ràng để có thể hiểu mình đang làm gì.

Đừng ngại biến dài, IDE giờ hỗ trợ gợi ý hết rồi, gõ một lần là nó gợi ý lại được luôn mà.

Với một cái tên rõ ràng như `getAllStudents`, `getStudentByName`, hay biến như `students`, `studentMale`, `numberStudentGoToSchoolByCar`,... bạn vừa đỡ phải viết thêm vài dòng comment để giải thích việc đang làm, thêm nữa, sau vài tháng không động lại, bạn vẫn có thể nắm được đoạn code mình viết để làm gì (hoặc ít nhất vẫn hiểu đại khái :joy:)

### 2. Tránh sai lệch thông tin

Một chút tác dụng phụ của việc đặt tên dài là đôi khi nó tạo ra những biến rất giống nhau, VD: `numberMaleStudentClass9B` vs `numberMaleStudentClass9D`

Thôi thì cố gắng chống chọi chút, cố gắng cẩn thận khi sử dụng hoặc là nghĩ cái tên khác vậy

### 3. Nhất quán trong sửa dụng

Đặt tên các biến cần thống nhất, nó cũng giúp cho bạn truy vết khi bị lỗi một cách nhanh chóng và không bị loạn khi lượng file liên quan tăng lên

### 4. Sử dụng tên có thể tìm và phát âm được

Tên phát âm được là để bạn dễ đi hỏi, hoặc giải thích khi có người khác hỏi tác dụng của nó, sếp hoặc khác hàng chẳng hạn =))

Còn tên có thể tìm được thì có thể tìm xem VD dưới đây

```
final int MAX_MONTH_IN_YEAR = 12;
int salary = 0;
for(int i=1 ; i &lt; MAX_MONTH_IN_YEAR ; i++){ 
    if( Jame.getWorkDays(i) > 25) {
        salary += 5000000;
    }
    salary+= 15000000;
}
```
Hãy tưởng tượng, đột nhiên lịch thay đổi, và rồi 1 năm có đến 13 tháng, và rồi bạn không có biến `MAX_MONTH_IN_YEAR` kia, bạn sẽ phải ngồi lò dò từng số 12 trong code để đổi lại, mới nói thôi đã thấy ngáo người rồi. Vậy là thế nhé!

## Kết

Việc đặt tên đôi khi cũng tốn thời gian khá nhiều khi code, điều đó cũng thể hiện rằng nó là việc không dễ, hãy cẩn thận, tự tin và cẩn thận khi đặt tên biến, nó có thể là bạn, nhưng một khi đặt loạn thì nó lại là thù.

Chúc bạn thành công!

*p/s: đừng dùng anal khi đặt tên biến nhé, đến lúc anal.push() thì khá thốn đấy* :sweat_smile: