Có lẽ mọi người đã quá quen thuộc với Java, cũng như cách sử dụng Map trong Java. 
Nhưng sau đây, tôi xin chia sẻ các cách mà tôi hay sử dụng Map trong Java để giúp tăng tốc độ xử lý process, cũng như source code trành phức tạp, rườm rà.
Sau đây, tôi sẽ chia sẻ với các bạn các phương pháp tôi hay dùng nhất với Map.

Đầu tiên, ta sẽ tập làm quen với Map đã nhé. Đầu tiên, Map sẽ có định nghĩa như sau: Map<K,V> trong đó, K là type của key, V là value. Value là type của gái trị mapping. V cũng có thể là một List các Object.
Các cách để tạp ra một Map. Có 2 cách điển hình để tạo ra 1 map. Đó là:
### Cách 1:
Tự tạo ra một Map và add các phần tử vào cho nó.
```
Map<String, String> myMap = new HashMap<String, String>();
myMap.put("key1", "value1");
myMap.put("key2", "value2");
```
### Cách 2:
Biến đổi một List sang một Map. Ví dụ ta có một list các object của class như sau:
```
class Student {
    Integer id;
    String name;
    Integer age;
    Integer gradeId;
    
    public Integer getGradeId(){
        return classId;
    }
}
```
Khi này ta muốn nhóm các học sinh cùng lớp lại với nhau. Ta sẽ biến List (studentList) này thành Map với key là classId và value là List các object Student.
```
Map<Integer,List<Student>> studentGradeMap = studentList.stream().collect(Collectors.groupingBy(Student::getGradeId));
```
Khi đó, ta sẽ có 1 Map như sau:
```
6=[
			Student{id=1,name='Ngoc Khanh', age=12, gradeId=6}, 
			Student{id=2,name='Khanh Ngoc', age=12, gradeId=6},
		], 
 7=[
			Student{id=3,name='Do Khanh', age=13, gradeId=7},  
			Student{id=4,name='Khanh Do', age=13, gradeId=7}, 
		] 
```

Trên đây, ta đã biết được 2 cách để tạp ra 1 Map trong Java. Sau đây, tôi sẽ chia sẻ với các bạn những trường hợp sử dụng Map rất tiện lợi đối với cá nhân tôi.
## Check dupplicate trong 1 mảng
Cũng sử dụng class Student như trên. Ta muốn check xem, trong trường có sinh viên nào vừa trùng tên vừa trùng tuổi không. Ta sẽ thực hiện như sau:
```
class Student {
    Integer id;
    String name;
    Integer age;
    Integer gradeId;
    
    public Integer getKeyValue(){
        return name + "_" + age;
    }
}
```
Ta sẽ dùng getKeyValue() để tạo ra Key cho Map.
```
Map<String,List<Student>> studentKeyMap = studentList.stream().collect(Collectors.groupingBy(Student::getKeyValue));
```
Khi đó, nếu trong studentMap, Value của 1 Key có từ 2 phần tử trở lên sẽ là trường hợp các học sinh vừa trùng tên vừa trùng tuổi.

## Check dupplicate trong 2 mảng
Ví dụ, ta muốn kiểm tra xem list các student này có thuộc các lớp tron Top lớp thi đua không. Sẽ có rất nhiều cách trong trường hợp này vì đây là một ví dụ đơn giản. Nhưng tôi sẽ chia sẻ với các bạn về cách sử dụng Map trong tường hợp này.
Giả sử, ta có class Grade như sau:
```
Class Grade{
    Integer id;
    String name;
    
    public Integer getId(){
        return id;
    }
}
```
Nếu ta có một List các Top lớp thi đua, tạm thời đưa chúng vào biến topGradeList. Ta sẽ biến đổi chúng thành một Map với Key là id.
```
Map<Integer,List<Grade>> gradeMap = topGradeList.stream().collect(Collectors.groupingBy(Grade::getId));
```
Ta sẽ sử dụng lại studentGradeMap và check điều kiện như sau:
```
List<Integer> gradeIdResult = new ArrayList<>();
for (Integer gradeId : studentGradeMap.keySet()){
    if (gradeMap.containsKey(gradeId)){
        gradeIdResult.add(gradeId);
    }
}
```
Khi đó, gradeResult sẽ chứa ID các lớp thuộc Top các lớp thi đua.
Như vậy, tôi đã chia sẻ các trường hợp tôi hay sử dụng Map trong Java. Trong một vài bài toán phức tạp, chúng rất hữu ích. Hi vọng những chia sẻ này sẽ có thể giúp được mọi người trong lập trình.
Cảm ơn mọi người đã đón đọc!