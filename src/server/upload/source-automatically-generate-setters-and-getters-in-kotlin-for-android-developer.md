# Lời mở đầu
Gần đây, mình có làm quen với việc phát triển ứng dụng trên Android sử dụng ngôn ngữ lập trình Kotlin. Do trước đó mình dùng Java để code là chủ yếu, vì thế nên việc tạo getters và setters với Java được Android Studio hỗ trợ khá hiệu quả.
Với Kotlin, mình cũng làm các việc tương tự như lúc code bằng Java và kết quả là tool hỗ trợ với **Alt + Enter** của Android Studio bắt mình phải nhập thêm phần code để set dữ liệu.
Mình cũng đã thử research trên *Google* rồi, nhưng vẫn chưa tìm ra được cách nào nhanh chóng hỗ trợ cho việc tạo getters, setters trong Kotlin.
Với bài viết này, mình sẽ chia sẻ đến mọi người đoạn code đơn giản mình viết để hỗ trợ tạo getters và setters trong Kotlin. Mình rất mong sẽ nhận được những chia sẻ của các bạn về cách tạo hiệu quả hơn.
Bắt đầu nhé...
# Cài đặt
Mình sẽ tạo 1 hàm ***generateGetterAndSetter*** với tham số truyền vào sẽ là ***1 chuỗi gồm các tên biến của class trong Kotlin theo cấu trúc sau: "variable1,variable2,variable3,variable4"*** . Tham số truyền vào tiếp theo sẽ là ***1 danh sách của kiểu dữ liệu tương ứng với từng biến trong chuỗi đề cập trên***.
***Kết quả** sau khi thực hiện hàm này là 1 chuỗi chứa các đoạn code tạo tên biến, kiểu dữ liệu và getters, setters tương ứng.*
```kotlin
/**
 * Function: generate getter and setter for class in kotlin
 * Input: 
 * - variable_names: a string data having a structure like example "variable1,variable2,variable3"
 * - list_type_data: contains a list type data of MutableList<String>. Example: list_type_data = mutableListOf("String","Int","Float","Int","Int") 
 * Output:
 * - a string of getter and setter
 * */
fun generateGetterAndSetter(variable_names:String, list_type_data:MutableList<String>):String{
    var result:String =""
    var list_variable_name:List<String> = variable_names.split(",") //split a variable_name string to list_variable_name
    var len = list_variable_name.size-1 //size
    for(i in 0..len){
        var att_name = list_variable_name.get(i)
        var att_name_first = att_name.toUpperCase() //the variable name for getter and setter must be upper case
        var type_data = list_type_data.get(i)
        //init variable name with a data type
        when(type_data){
            "Int"-> result+="private var $att_name:$type_data=0\n"
            "String"-> result+="private var $att_name:$type_data=\"\"\n"
            "Float"-> result+="private var $att_name:$type_data=0f\n"
            "Boolean" -> result+="private var $att_name:$type_data=false\n"
        }
        //generate getter and setter
        result += "public var $att_name_first:$type_data\nget(){\n\treturn $att_name\n}\nset(value)\n{\n\t$att_name=value\n}\n"
     	
    }
    return result
    
}
```
# Thử nghiệm
Bạn có thể dùng bất kỳ IDE nào hỗ trợ Kotlin để chạy thử nhé!
Để nhanh chóng thì mình sử dụng trang **[Kotlin Playground](https://play.kotlinlang.org/)**
```kotlin
fun main() {
    var variable_names:String = "id,section_id,level,is_rest_day,day"
    var list_type_data = mutableListOf("Int","String","Int","Boolean","Int")
    //print a string of getters and setters
    print(generateGetterAndSetter(variable_names,list_type_data))
}
```
Và đây là kết quả:
```kotlin
private var id:Int=0
public var ID:Int
get(){
	return id
}
set(value)
{
	id=value
}
private var section_id:String=""
public var SECTION_ID:String
get(){
	return section_id
}
set(value)
{
	section_id=value
}
private var level:Int=0
public var LEVEL:Int
get(){
	return level
}
set(value)
{
	level=value
}
private var is_rest_day:Boolean=false
public var IS_REST_DAY:Boolean
get(){
	return is_rest_day
}
set(value)
{
	is_rest_day=value
}
private var day:Int=0
public var DAY:Int
get(){
	return day
}
set(value)
{
	day=value
}
```
# Lời kết
Như mình đã nói ở phần mở đầu, mình rất mong sẽ nhận được các ý tưởng đóng góp hay từ mọi người.

Và đây cũng là bài viết đầu tiên của mình, vì thế rất mong nhận được sự ủng hộ từ tất cả các bạn.

Xin cảm ơn và chúc một ngày tốt lành!!!