Trong bài giới thiệu [TreeSet](https://gpcoder.com/2610-treeset-va-su-dung-comparable-comparator-trong-java) và giới thiệu lớp tiện ích [Collections](https://gpcoder.com/2783-lop-collections-trong-java-collections-utility-class), [Arrays](https://gpcoder.com/2810-lop-arrarys-trong-java-arrays-utility-class/) trong Java, tôi đã giới thiệu với các bạn cách tạo bộ so sánh sử dụng Comparable, Comparator và cách sắp xếp các phần tử trong một Collection, Array. Trong bài này, chúng ta sẽ tổng hợp lại các cách sắp xếp trong Java 7 và một số cách sắp xếp mới trong Java 8.

Link bài viết gốc: https://gpcoder.com/4009-sap-xep-trong-java-8

Nội dung:

* 1 Sắp xếp mảng (Array)
* 2 Sắp xếp danh sách (List)
* 3 Sắp xếp tập hợp (Set) 
* 4 Sắp xếp Map
* 4.1 Sắp xếp Map theo Key
* 4.2 Sắp xếp Map theo Value
* 4.3 Sắp xếp Map với phương thức được hỗ trợ trong Java 8
* 5 Sắp xếp các đối tượng bất kỳ
* 5.1 Implement Comparable và override phương thức compareTo(T obj)
* 5.1.1 Ví dụ sử dụng Collections.sort()
* 5.1.2 Ví dụ sử dụng Arrays.sort()
* 5.2 Implement Comparator và override phương thức compare(T obj1, T obj2)
* 5.2.1 Ví dụ tạo class mới cài đặt interface Comparator
* 5.2.2 Ví dụ sử dụng Comparator với Collections.sort()
* 5.2.3 Ví dụ sử dụng Comparator với Arrays.sort()
* 5.3 So sánh Comparable vs Comparator
* 6 Sắp xếp danh sách đối tượng sử dụng tham chiếu phương thức trong Java 8
* 7 Sắp xếp theo nhiều điều kiện sử dụng Comparator.comparing() và Comparator.thenComparing() trong Java 8
* 8 Sắp xếp đảo ngược (Reverse Order)

## Sắp xếp mảng (Array)

Để sắp xếp các phần tử của mảng, chúng ta sử dụng lớp tiện ích Arrays.sort().

* Arrays.sort(arr) : Sắp xếp tất cả các phần tử của mảng
* Arrays.sort(arr, fromIndex, toIndex) : Sắp xếp một phần của mảng
* Arrays.parallelSort.sort(arr) : Sắp xếp tất cả các phần tử của mảng theo cách xử lý song song. Phương thức này chia nhỏ một mảng thành nhiều mảng con và thực hiện sắp xếp trên các mảng con này một cách song song trên các luồng (Thread) khác nhau, sau đó merge lại để có một mảng được sắp xếp hoàn chình.
* Arrays.parallelSort.sort(arr, fromIndex, toIndex) : Sắp xếp một phần của mảng theo cách xử lý song song.

Ví dụ:

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
 
public class SortedArrayExample {
    public static final int NUMBERS[] = { 5, 1, 2, 4, 3, 6, 7, 9, 8 };
 
    public static void main(String[] args) {
        // Sorting Complete Array
        int arr1[] = Arrays.copyOf(NUMBERS, NUMBERS.length);
        Arrays.sort(arr1);
        System.out.println(Arrays.toString(arr1));
        // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
         
        // Sorting Part of an Array
        int arr2[] = Arrays.copyOf(NUMBERS, NUMBERS.length);
        Arrays.sort(arr2, 2, 5);
        System.out.println(Arrays.toString(arr2));
        // => [5, 1, 2, 3, 4, 6, 7, 9, 8]
         
        // Java 8 parallelSort
        int arr3[] = Arrays.copyOf(NUMBERS, NUMBERS.length);
        Arrays.parallelSort(arr3);
        System.out.println(Arrays.toString(arr3));
        // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
}

```
## Sắp xếp danh sách (List)
Để sắp xếp các phần tử của danh sách, chúng ta sử dụng lớp tiện ích Collections.sort().

```java
package com.gpcoder.sorting;
 
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
 
public class SortedListExample {
    public static final List<Integer> NUMBERS = Arrays.asList( 5, 1, 2, 4, 3, 6, 7, 9, 8 );
 
    public static void main(String[] args) {
        // Sorting a List
        List<Integer> list1 = new ArrayList<>(NUMBERS);
        Collections.sort(list1);
        System.out.println(list1);
        // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
}
```

## Sắp xếp tập hợp (Set)
Chúng ta phải sử dụng LinkedHashSet để có thể giữ được thứ tự các phần tử trong một tập hợp.

Lớp tiện ích Collections chỉ hỗ trợ sắp xếp các phần tử trong một List. Do đó, để có thể sắp xếp được một Set chúng ta cần chuyển một Set qua một List, sau đó thực hiện sắp xếp danh sách này và cuối cùng thực hiện chuyển List về Set.

Ví dụ:

```java
package com.gpcoder.sorting;
 
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
 
public class SortedSetExample {
    public static final List<Integer> NUMBERS = Arrays.asList( 5, 1, 2, 4, 3, 6, 7, 9, 8 );
 
    public static void main(String[] args) {
        // Original data
        Set<Integer> set1 = new LinkedHashSet<>(NUMBERS);
         
        // Convert Set to List
        List<Integer> list1 = new ArrayList<>(set1);
         
        // Sorting a List
        Collections.sort(list1);
         
        // Convert List to Set
        set1 = new LinkedHashSet<>(list1);
        System.out.println(set1);
        // => [1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
}
```

## Sắp xếp Map
Để có thể lưu trữ được thứ tự các phần tử của Map, chúng ta phải sử dụng LinkedHashMap.

Một Map gồm 2 thành phần Key và Value. Do đó, chúng ta có thể sắp xếp theo Key hoặc Value tùy theo nhu cầu sử dụng.

### Sắp xếp Map theo Key
Lớp tiện ích Collections chỉ hỗ trợ sắp xếp các phần tử trong một List. Do đó, để có thể sắp xếp được một Map chúng ta cần chuyển một Map qua một List, sau đó thực hiện sắp xếp danh sách này và cuối cùng thực hiện chuyển List về Map.

```java
package com.gpcoder.sorting;
 
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
 
public class SortedMapExample {
 
    public static void main(String[] args) {
        // Original data
        Map<Integer, String> map = new HashMap<>();
        map.put(44, "Four");
        map.put(22, "Two");
        map.put(33, "Three");
        map.put(55, "Five");
        map.put(11, "One");
 
        // Convert list to map
        List<Map.Entry<Integer, String>> list1 = new ArrayList<>(map.entrySet());
 
        // Create a comparator to sort by key
        Comparator<Entry<Integer, String>> keyComparator = new Comparator<Entry<Integer, String>>() {
            @Override
            public int compare(Entry<Integer, String> o1, Entry<Integer, String> o2) {
                return o1.getKey().compareTo(o2.getKey());
            }
        };
 
        // Sorting a List
        Collections.sort(list1, keyComparator);
 
        // Convert List to Map
        Map<Integer, String> sortedMap = new LinkedHashMap<>();
        for (Map.Entry<Integer, String> entry : list1) {
            sortedMap.put(entry.getKey(), entry.getValue());
        }
        System.out.println("Original map: " + map);
        System.out.println("Sorted map: " + sortedMap);
    }
}
```

Output của chương trình trên:

```java
Original map: {33=Three, 22=Two, 55=Five, 11=One, 44=Four}
Sorted map: {11=One, 22=Two, 33=Three, 44=Four, 55=Five
```

Trong ví dụ trên, tôi đã tạo một bộ so sánh (Comparator) để có thể so sánh các phần tử của Map theo Key. Chi tiết về Comparator sẽ được nói trong phần tiếp theo của bài viết.

### Sắp xếp Map theo Value

Tương tự như sắp xếp theo Key, chúng ta chỉ việc viết lại phương thức Comparator so sánh theo value:

```java
package com.gpcoder.sorting;
 
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
 
public class SortedMapExample2 {
 
    public static void main(String[] args) {
        // Original data
        Map<Integer, String> map = new HashMap<>();
        map.put(44, "Four");
        map.put(22, "Two");
        map.put(33, "Three");
        map.put(55, "Five");
        map.put(11, "One");
 
        // Convert list to map
        List<Map.Entry<Integer, String>> list1 = new ArrayList<>(map.entrySet());
 
        // Create a comparator to sort by value
        Comparator<Entry<Integer, String>> valueComparator = new Comparator<Entry<Integer, String>>() {
            @Override
            public int compare(Entry<Integer, String> o1, Entry<Integer, String> o2) {
                return o1.getValue().compareTo(o2.getValue());
            }
        };
 
        // Sorting a List
        Collections.sort(list1, valueComparator);
 
        // Convert List to Map
        Map<Integer, String> sortedMap = new LinkedHashMap<>();
        for (Map.Entry<Integer, String> entry : list1) {
            sortedMap.put(entry.getKey(), entry.getValue());
        }
        System.out.println("Original map: " + map);
        System.out.println("Sorted map: " + sortedMap);
    }
}
```

Output của chương trình:
```
Original map: {33=Three, 22=Two, 55=Five, 11=One, 44=Four}
Sorted map: {55=Five, 44=Four, 11=One, 33=Three, 22=Two}
```

### Sắp xếp Map với phương thức được hỗ trợ trong Java 8

Với Java 8, Map cung cấp thêm một số phương thức hỗ trợ sắp xếp theo Key, Value:

* comparingByKey()
* comparingByKey(Comparator<? super K> cmp)
* comparingByValue()
* comparingByValue(Comparator<? super V> cmp)

```java
package com.gpcoder.sorting;
 
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;
 
public class SortedMapExample3 {
 
    public static void main(String[] args) {
        // Original data
        Map<Integer, String> map = new HashMap<>();
        map.put(44, "Four");
        map.put(22, "Two");
        map.put(33, "Three");
        map.put(55, "Five");
        map.put(11, "One");
         
        // sort by key
        Map<Integer, String> sortedMapByKey = new LinkedHashMap<>();
        map.entrySet().stream()
                .sorted(Map.Entry.<Integer, String>comparingByKey())
                .forEachOrdered(e -> sortedMapByKey.put(e.getKey(), e.getValue()));
         
        // sort by value
        Map<Integer, String> sortedMapByValue = new LinkedHashMap<>();
        map.entrySet().stream()
                .sorted(Map.Entry.<Integer, String>comparingByValue())
                .forEachOrdered(e -> sortedMapByValue.put(e.getKey(), e.getValue()));
 
        // print map
        System.out.println("Original map: " + map);
        System.out.println("Sorted map by key: " + sortedMapByKey);
        System.out.println("Sorted map by value: " + sortedMapByValue);
    }
}
```

Output của chương trình:

```
Original map: {33=Three, 22=Two, 55=Five, 11=One, 44=Four}
Sorted map by key: {11=One, 22=Two, 33=Three, 44=Four, 55=Five}
Sorted map by value: {55=Five, 44=Four, 11=One, 33=Three, 22=Two}
```

## Sắp xếp các đối tượng bất kỳ
Đôi khi chúng ta cần sắp xếp một danh sách đối tượng bất kỳ chẳng hạn như đối tượng Student, Employee, … Khi đó chúng ta cần định nghĩa một cách thức so sánh giữa các đối tượng để thực hiện sắp xếp.

Trong Java, đối với Arrays.sort() hoặc Collections.sort() chúng ta có 2 cách để cung cấp bộ Comparator:

* Implement Comparable và override phương thức compareTo(T obj).
* Implement Comparator và override phương thức compare(T obj1, T obj2).

Giá trị trả về của 2 phương thức này:

* Nếu < 0 : giá trị ưu tiên của đối tượng thứ nhất lớn hơn đối tượng thứ hai. Khi thực hiện sắp xếp thì đối tượng thứ nhất sẽ đứng trước đối tượng thứ hai.
* Nếu = 0 : cả 2 có độ ưu tiên bằng nhau.
* Nếu > 0 : giá trị ưu tiên của đối tượng thứ nhất nhỏ hơn đối tượng thứ hai.

### Implement Comparable và override phương thức compareTo(T obj)
Đối với cách này, chúng ta cần thay đổi lớp gốc (original class), tức là lớp của đối tượng so sánh phải chỉnh sửa và implement Comparable Interface để cài đặt bộ so sánh.

```java
package com.gpcoder.sorting;
 
public class Student implements Comparable<Student> {
 
    private int id;
    private String name;
    private int age;
 
    public Student(int id, String name, int age) {
        super();
        this.id = id;
        this.name = name;
        this.age = age;
    }
 
    @Override
    public int compareTo(Student s) {
        return this.getName().compareTo(s.getName());
    }
 
    public int getId() {
        return id;
    }
 
    public String getName() {
        return name;
    }
 
    public int getAge() {
        return age;
    }
 
    @Override
    public String toString() {
        return "Student [id=" + id + ", name=" + name + ", age=" + age + "]";
    }
}
```

Trong ví dụ trên, tôi đã implement một interface java.lang.Comparable và override lại phương thức compareTo() để thực hiện so sánh các sinh viên theo tên.

Khi đã cung cấp bộ so sánh, chúng ta có thể sắp xếp một danh sách sinh viên thông qua thương thức Collections.sort(c) hay Arrays.sort(arr).

**Ví dụ sử dụng Collections.sort()**

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
 
public class SortedObjectExample1 {
 
    public static void main(String[] args) {
 
        List<Student> students = Arrays.asList( //
                new Student(1, "One", 22), //
                new Student(2, "Two", 18), //
                new Student(3, "Three", 20), //
                new Student(4, "Four", 19), //
                new Student(5, "Five", 22) //
        );
 
        Collections.sort(students);
        students.forEach(System.out::println);
    }
}
```

Output của chương trình:

```
Student [id=5, name=Five, age=22]
Student [id=4, name=Four, age=19]
Student [id=1, name=One, age=22]
Student [id=3, name=Three, age=20]
Student [id=2, name=Two, age=18]
```

**Ví dụ sử dụng Arrays.sort()**

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
import java.util.stream.Stream;
 
public class SortedObjectExample2 {
 
    public static void main(String[] args) {
 
        Student []students = { //
                new Student(1, "One", 22), //
                new Student(2, "Two", 18), //
                new Student(3, "Three", 20), //
                new Student(4, "Four", 19), //
                new Student(5, "Five", 22) //
        };
 
        Arrays.sort(students);
        Stream.of(students).forEach(System.out::println);
    }
}
```

### Implement Comparator và override phương thức compare(T obj1, T obj2)
Đối với cách này không làm thay đổi lớp gốc (original class). Chúng ta có thể tạo một class mới, sử dụng Anonymous function, inner class hoặc sử dụng lamda, implement Comparator Interface để cài đặt bộ so sánh.

**Ví dụ tạo class mới cài đặt interface Comparator**

```java
package com.gpcoder.sorting;
 
import java.util.Comparator;
 
public class AgeComparator implements Comparator<Student> {
     
    @Override
    public int compare(Student s1, Student s2) {
        return s1.getAge() - s2.getAge();
    }
}
```

**Ví dụ sử dụng Comparator với Collections.sort()**

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
 
public class SortedObjectExample3 {
 
    public static void main(String[] args) {
 
        List<Student> students = Arrays.asList( //
                new Student(1, "One", 22), //
                new Student(2, "Two", 18), //
                new Student(3, "Three", 20), //
                new Student(4, "Four", 19), //
                new Student(5, "Five", 22) //
        );
 
        // Anonymous function
        Comparator<Student> nameComparator1 = new Comparator<Student>() {
            @Override
            public int compare(Student s1, Student s2) {
                return s1.getName().compareTo(s2.getName());
            }
        };
        Collections.sort(students, nameComparator1);
 
        // Lambda
        Comparator<Student> nameComparator2 = (s1, s2) -> s1.getName().compareTo(s2.getName());
        Collections.sort(students, nameComparator2);
 
        students.forEach(System.out::println);
    }
 
    // Inner class
    class NameComparator implements Comparator<Student> {
 
        @Override
        public int compare(Student s1, Student s2) {
            return s1.getName().compareTo(s2.getName());
        }
    }
}
```

**Ví dụ sử dụng Comparator với Arrays.sort()**

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
import java.util.Comparator;
import java.util.stream.Stream;
 
public class SortedObjectExample4 {
 
    public static void main(String[] args) {
 
        Student []students = { //
                new Student(1, "One", 22), //
                new Student(2, "Two", 18), //
                new Student(3, "Three", 20), //
                new Student(4, "Four", 19), //
                new Student(5, "Five", 22) //
        };
 
        Comparator<Student> nameComparator = new Comparator<Student>() {
            @Override
            public int compare(Student s1, Student s2) {
                return s1.getName().compareTo(s2.getName());
            }
        };
 
        Arrays.sort(students, nameComparator);
        Stream.of(students).forEach(System.out::println);
    }
}
```

So sánh Comparable vs Comparator
Tham khảo lại bài viết: [So sánh Comparable vs Comparator](https://gpcoder.com/2610-treeset-va-su-dung-comparable-comparator-trong-java/#So_sanhComparable_vs_Comparator).

## Sắp xếp danh sách đối tượng sử dụng tham chiếu phương thức trong Java 8

Ví dụ chúng ta có lớp Helper, lớp này chứa phương thức compareByAge(). Phương thức này hỗ trợ việc so sánh 2 đối tượng Student như bên dưới:

```java
package com.gpcoder.sorting;
 
public class Helper {
 
    public static int compareByAge(Student s1, Student s2) {
        return s1.getAge() - s2.getAge();
    }
}
```

Với Java 8, chúng ta có thể sử dụng lại phương thức đó cho việc sắp xếp danh sách Student như sau:

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
 
public class SortedObjectExample5 {
 
    public static void main(String[] args) {
 
        List<Student> students = Arrays.asList( //
                new Student(1, "One", 22), //
                new Student(2, "Two", 18), //
                new Student(3, "Three", 20), //
                new Student(4, "Four", 19), //
                new Student(5, "Five", 22) //
        );
 
        Collections.sort(students, Helper::compareByAge);
         
        // Or
        students.sort(Helper::compareByAge);
         
        students.forEach(System.out::println);
    }
}
```

## Sắp xếp theo nhiều điều kiện sử dụng Comparator.comparing() và Comparator.thenComparing() trong Java 8
Java 8 cung cấp hai API mới hữu ích cho việc sắp xếp các phần tử là: comparing() và thenComparing() trong interface Comparator. Hai phương thức này khá thuận tiện cho việc sắp xếp chuỗi nhiều điều kiện của Comparator.

Cú pháp:

```java
public static <T, U> Comparator<T> comparing(
            Function<? super T, ? extends U> keyExtractor) {}
 
public static <T, U> Comparator<T> comparing(
            Function<? super T, ? extends U> keyExtractor,
            Comparator<? super U> keyComparator) {}
 
default <U extends Comparable<? super U>> Comparator<T> thenComparing(
            Function<? super T, ? extends U> keyExtractor) {}
 
default <U> Comparator<T> thenComparing(
            Function<? super T, ? extends U> keyExtractor,
            Comparator<? super U> keyComparator) {}

```

Trong đó:

* keyExtractor : là một Function, có nhiệm vụ cung cấp thông tin khóa cần so sánh.
* keyComparator : là một Comparator, có nhiệm vụ cung cấp kết quả so sánh dựa trên khóa được cung cấp (keyExtractor). Tham số này không bắt buộc.

Ví dụ chúng ta cần sắp xếp danh sách sinh viên theo tuổi, nếu cùng tuổi thì sắp xếp theo tên. Hãy xem đoạn code bên dưới để thấy sự tiện lợi của việc sử dụng phương thức comparing() và thenComparing() so với việc tự tạo Comparator.

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
 
public class SortedObjectExample5 {
 
    public static void main(String[] args) {
 
        List<Student> students = Arrays.asList( //
                new Student(1, "One", 22), //
                new Student(2, "Two", 18), //
                new Student(3, "Three", 20), //
                new Student(4, "Four", 19), //
                new Student(5, "Five", 22) //
        );
 
        preJava8(students);
        java8(students);
    }
 
    private static void preJava8(List<Student> students) {
        Comparator<Student> comparator = new Comparator<Student>() {
            @Override
            public int compare(Student s1, Student s2) {
                if (s1.getAge() == s2.getAge()) {
                    return s1.getName().compareTo(s2.getName());
                }
                return s1.getAge() - s2.getAge();
            }
        };
 
        Collections.sort(students, comparator);
        System.out.println("PreJava8: ");
        students.forEach(System.out::println);
    }
 
    private static void java8(List<Student> students) {
        Comparator<Student> comparator = Comparator.comparing(Student::getAge).thenComparing(Student::getName);
 
        Collections.sort(students, comparator);
        // Or
        students.sort(comparator);
 
        System.out.println("\nJava8: ");
        students.forEach(System.out::println);
    }
}
```

## Sắp xếp đảo ngược (Reverse Order)

Trước Java 8, chúng ta có thể sắp xếp đảo ngược một danh sách bằng cách đảo ngược bộ so sánh thông qua phương thức Collections.reverseOrder(comparator).

Với Java 8 cung cấp một phương thức khác giúp chúng ta có thể sắp xếp đảo ngược danh sách một cách trực tiếp thông qua phương thức comparator.reversed().

Ví dụ:

```java
package com.gpcoder.sorting;
 
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
 
public class SortedObjectExample7 {
 
    public static void main(String[] args) {
 
        List<Student> students = Arrays.asList( //
                new Student(1, "One", 22), //
                new Student(2, "Two", 18), //
                new Student(3, "Three", 20), //
                new Student(4, "Four", 19), //
                new Student(5, "Five", 22) //
        );
 
        // Anonymous function
        Comparator<Student> nameComparator = new Comparator<Student>() {
            @Override
            public int compare(Student s1, Student s2) {
                return s1.getName().compareTo(s2.getName());
            }
        };
 
        Collections.sort(students, Collections.reverseOrder(nameComparator));
 
        // Or
        Collections.sort(students, nameComparator.reversed());
 
        students.forEach(System.out::println);
    }
}
```

Output của chương trình trên:

```
Student [id=2, name=Two, age=18]
Student [id=3, name=Three, age=20]
Student [id=1, name=One, age=22]
Student [id=4, name=Four, age=19]
Student [id=5, name=Five, age=22]
```

Link bài viết gốc: https://gpcoder.com/4009-sap-xep-trong-java-8