Lớp Java HashMap  thực thi Map interface bằng cách sử dụng hastable(hàm băm), nó kế thừa từ lớp AbstractMap và thực thi Map interface

* Key-Pair : một HashMap chứa các giá trị dựa trên key(khóa)
* unique(duy nhất): Chỉ chứa các khóa là duy nhất, và có thể có các giá trị trùng lặp
* Null value(giá trị null) : có thể có 1 khóa null và nhiều giá trị null
* Random order :   duy trì không có thứ tự, vì vậy bạn không nên truy cập bằng chỉ mục. Và thứ tự có thể thay đổi theo thời gian.
* Not Thread Safe(không phải luồng an toàn) : Java HashMap không phải luồng an toàn, cho môi trường đa luồng thì bạn nên sử dụng lớp ConcurrentHashMap để thay thế HashMap
* Constant Time : HashMap cung cấp constant time cho các hoạt động như phương thức get() và put ()
* Capacity (dung lượng) :  dung lượng ban đầu mặc định của HashMap là 16 

# Tạo một HashMap
Bên dưới là constructor của HashMap
```
public class HashMap<K,V> extends AbstractMap<K,V>
        implements Map<K,V>, Cloneable, Serializable {
	/**
	* The default initial capacity - MUST be a power of two.
	*/
	static final int DEFAULT_INITIAL_CAPACITY = 16;
	/**
	* The load factor used when none specified in constructor.
	*/
	static final float DEFAULT_LOAD_FACTOR = 0.75f;
    public HashMap() {
			this(DEFAULT_INITIAL_CAPACITY, DEFAULT_LOAD_FACTOR);
	}
}
```

## Constructors của HashMap
HashMap có 4 loại constructor, những constuctors được thiết kế để cung cấp các lựa chọn cho lập trình viên

1. HashMap không có tham số : nó là constructor mặc định được tạo như một instance của HashMap với dung lượng ban đầu là 16 và hệ số tải là 0.75
```
Map<K, V> basicHashMap = new HashMap();
```
2. HashMap với tham số là  dung lượng : constructor HashMap này tạo ra một thể hiện HashMap với một dung lượng ban đầu đã được xác định và với hệ số tải mặc định là 0.75
```
Map<K, V> basicHashMap = new HashMap(int initial capacity);
```
3. HashMap với tham số là  dung lượng và hệ số tải : constructor này tạo ra một HashMap instance với dung lượng và hệ số tải đã được xác định từ ban đầu 
```
Map<K, V> basicHashMap = new HashMap(int initial capacity, float loadFactor);
```
4. HashMap với tham số là interface Map : 
```
Map<K, V> basicHashMap = new HashMap(Map map)
```
## Các phương thức của HashMap trong java
* boolean isEmpty()
* Object put(Object key, Object value)
* int size()
* get(Object key)
* void clear()
* boolean containsKey(Object key)
* boolean containsValue(Object value)
* Object clone()
* Set entrySet()
* Set keySet()
* Collection values()
## Các phương thức được giới thiệu của HashMap trong Java 8
* computeIfAbsent()
* computeIfPresent
* compute
* forEach
* getOrDefault
* merge
* putIfAbsent
* remove
* replace
* boolean replace(K key, V oldValue, V newValue)
* replaceAll

Ví dụ chương trình sử dụng HashMap 
```
public class CreateHashMapSample{
    public static void main(String[] args) {
        // Create HashMap
        Map<String, String> hMap = new HashMap();
    }
}
```
### **boolean isEmpty()**

Kiểm tra xem map có empty hay không? Ở đây không có cặp key và value nào , sau khi chạy trong hàm này sẽ trả về true hay false ?

```
// Create HashMap
Map<String, String> hMap = new HashMap();
System.out.println("Member of the Map : "+hMap);
System.out.println("Is Map empty : " + hMap.isEmpty());
```
Output of isEmpty()
```
Member of the Map : {}
Is Map empty : true
```

### **Object put(Object key, Object value)**

Tạo một key với giá trị tương ứng trong HashMap, nếu map chứa key giống nhau với giá trị khác nhau thì giá trị cũ sẽ thay thế bằng giá trị mới

```
Map<String, String> hMap = new HashMap();
System.out.println("Map before addition : "+hMap);
// add new value
hMap.put("microsoft", "Bing");
System.out.println("Map after addition of key-value: "+hMap);
// update the value with sam key
hMap.put("microsoft", "Operating System");
System.out.println("Map after replacement of key-value: "+hMap);
```

The output of put()
```
Map before addition : {}
Map after addition of key-value: {microsoft=Bing}
Map after replacement of key-value: {microsoft=Operating System}
```

### **get(Object key)**

Trả về giá trị được map với key đã chỉ định và trả về null nếu không map với key nào
```
Map<String, String> hMap = new HashMap();

// add new values
hMap.put("microsoft", "Bing");
hMap.put("win10", "Operating System");
System.out.println("Get value of 'win10' from Map : " +hMap.get("win10"));
```

Output of get() method
```
Get value of 'win10' from Map : Operating System
```

### **int size()**

Trả về số lượng các cặp key-value trong HashMap

```
Map<String, String> hMap = new HashMap();
// add new values
hMap.put("microsoft", "Bing");
System.out.println("Map members : "+hMap);
System.out.println("Map size : "+hMap.size());
System.out.println("
*******Adding win10 (second entry)*******");
hMap.put("win10", "Operating System");
System.out.println("Map members : "+hMap);
System.out.println("Map size : "+hMap.size());
```

Output of size()

```
Map members : {microsoft=Bing}
Map size : 1
*******Adding win10 (second entry)*******
Map members : {win10=Operating System, microsoft=Bing}
Map size : 2
```

### **remove(Object key)**

Xóa khóa cùng với giá trị của nó

```
Map<String, String> hMap = new HashMap();

// add new values
hMap.put("microsoft", "Bing");
hMap.put("win10", "Operating System");
System.out.println("Map members : " +hMap);
hMap.remove("win10");
System.out.println("Map members after removal of 'win10' : " +hMap);
```

output sau khi xóa element

```
Map members : {win10=Operating System, microsoft=Bing}
Map members after removal of 'win10' : {microsoft=Bing}
```

**values()**

values() phương thức trả về tất cả các giá trị có trong Map

```
Map<String, String> hMap = new HashMap();
hMap.put("aa", "bbbb");
hMap.put("larry", "Youtube");
System.out.println("Keys Presesnt in Map : " +hMap.keySet());
System.out.println("Values present in Map : " +hMap.values());
```

Output of keySet() and values()

```
Keys Presesnt in Map : [aa, larry]
Values present in Map : [bbbb, Youtube]
```

**Hiển thị các phần tử có trong HashMap.**

Để hiển thị các phần tử có trong HashMap, chúng ta có các cách như sau:

Sử dụng vòng lặp for cải tiến.
```
public static void main(String[] args) {
	Map<String, String> map = new HashMap<String, String>();
	map.put("firstKey", "firstValue");
	map.put("secondKey", "secondValue");
	//enhanced for loop
	for (Map.Entry<String, String> entry : map.entrySet()) {
		System.out.println(entry.getKey() + " = " + entry.getValue());
	}
}
```
output 
```
firstKey = firstValue
secondKey = secondValue
```
Ngoài ra, kể từ Java 8 trở đi chúng ta có thể lấy toàn bộ các entry trong HashMap bằng cách sử dụng forEach() như sau:
```
public static void main(String[] args) {
	Map<String, String> map = new HashMap<String, String>();
	map.put("firstKey", "firstValue");
	map.put("secondKey", "SecondValue");

	// for each with lambda
	map.forEach((key,value) -> System.out.println(key + " = " + value));
}
```
*Lấy toàn bộ key của HashMap.*

Để lấy toàn bộ key của HashMap, Java cung cấp cho chúng ta phương thức keySet(). Phương thức này sẽ trả về 1 Set bao gồm các key có trong HashMap:


```
public static void main(String[] args) {
    HashMap<Integer, String> hashMap = new HashMap<>();
    hashMap.put(2, "Thứ hai");
    hashMap.put(3, "Thứ ba");
    hashMap.put(4, "Thứ tư");
             
    // phương thức keySet()
    // sẽ trả về 1 Set chứa key có trong hashMap
    System.out.println("Key của các entry trong hashMap: ");
    for (int key : hashMap.keySet()) {
        System.out.println("Key = " + key);
    }
}
```
output : 
```
key = 2
key = 3
key = 4

```
*Lấy toàn bộ value của HashMap.*

Để lấy toàn bộ value của HashMap, Java cung cấp cho chúng ta phương thức values(). Phương thức này sẽ trả về 1 tập hợp bao gồm các value có trong HashMap: 

```
public static void main(String[] args) {
    HashMap<String, String> hashMap = new HashMap<>();
    hashMap.put("January", "Tháng 1");
    hashMap.put("February", "Tháng 2");
    hashMap.put("March", "Tháng 3");    
             
    // phương thức values() sẽ trả về 
    // một tập hợp gồm các value có trong hashMap
    System.out.println("Các value có trong hashMap là: ");
    for (String value : hashMap.values()) {
        System.out.println("Value = " + value);
    }
}
```

output :
```
value = Tháng 1
value = Tháng 2
value = Tháng 3
```


Tham khảo bài viết : https://chercher.tech/java/hashmap