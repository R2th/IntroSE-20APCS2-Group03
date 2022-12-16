Class [TreeSet](https://docs.oracle.com/javase/8/docs/api/java/util/TreeSet.html#TreeSet--) là một phần của java collection framework. 
Nó implement từ interface NavigableSet, lớp này được kế thừa từ SortedSet.

Lớp TreeSet trong nội bộ sử dụng TreeMap để lưu trữ các phần tử. 
Các phần tử trong một TreeSet được sắp xếp theo thứ tự tự nhiên của chúng.

Bạn cũng có thể cung cấp một phương thức so sánh tùy chỉnh Comparator cho TreeSet tại thời điểm khởi tạo để cho phép nó sắp xếp các phần tử dựa trên bộ so sánh được cung cấp.

![](https://images.viblo.asia/990c6540-b8a5-4875-bd0d-d075d448aea6.jpg)

SortedSet interface cung cấp các hàm để giữ cho các phần tử được sắp xếp. Và NavigableSet interface cung cấp các hàm để điều hướng thông qua SortedSet.

Ví dụ, tìm phần tử lớn hơn hoặc nhỏ hơn phần tử đã cho, tìm phần tử đầu tiên và phần tử cuối cùng trong SortedSet.

Vì lớp TreeSet kế thừa từ NavigableSet interface, nên nó có những phương thức của cả NavigableSet cũng như SortedSet.

Một số đặc điểm quan trọng của TreeSet trong Java :

- TreeSet không chứa các phần tử trùng lặp.
- Các phần tử trong một TreeSet được sắp xếp theo thứ tự tự nhiên của chúng, hoặc dựa trên một bộ so sánh Comparator tùy chỉnh được cung cấp tại thời điểm khởi tạo TreeSet.
- TreeSet không thể chứa các giá trị null.
- TreeSet sử dụng TreeMap để lưu trữ các phần tử.
- TreeSet class không phải là một thread-safe. Bạn phải đồng bộ hóa rõ ràng quyền truy cập đồng thời vào TreeSet trong môi trường đa luồng.

**Tạo một TreeSet**

## 1. Simple TreeSet

Ví dụ sau đây cho thấy cách tạo một TreeSet và thêm các phần tử mới vào nó.
TreeSet sẽ được sắp xếp dựa trên thứ tự tự nhiên của các phần tử.

```
import java.util.SortedSet;
import java.util.TreeSet;

public class CreateTreeSetExample {
    public static void main(String[] args) {
        // Creating a TreeSet
        SortedSet<String> fruits = new TreeSet<>();

        // Adding new elements to a TreeSet
        fruits.add("Banana");
        fruits.add("Apple");
        fruits.add("Pineapple");
        fruits.add("Orange");

        System.out.println("Fruits Set : " + fruits);

        // Duplicate elements are ignored
        fruits.add("Apple");
        System.out.println("After adding duplicate element \"Apple\" : " + fruits);

        // This will be allowed because it's in lowercase.
        fruits.add("banana");
        System.out.println("After adding \"banana\" : " + fruits);
    }
}
```

```
# Output
Fruits Set : [Apple, Banana, Orange, Pineapple]
After adding duplicate element "Apple" : [Apple, Banana, Orange, Pineapple]
After adding "banana" : [Apple, Banana, Orange, Pineapple, banana]
```

## 2. TreeSet với thiết lập so sánh tùy chỉnh

Ví dụ sau cho thấy cách tạo ra một TreeSet bằng thiết lập so sánh tùy chỉnh.
Đó là sắp xếp tên theo thứ tự A-B.

```
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

public class TreeSetCaseInsensitiveExample {
    public static void main(String[] args) {
        // Creating a TreeSet with a custom Comparator (Case Insensitive Order)
        SortedSet<String> fruits = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);

        /*
            The above TreeSet with the custom Comparator is the concise form of the following:
            SortedSet<String> fruits = new TreeSet<>(new Comparator<String>() {
                @Override
                public int compare(String s1, String s2) {
                    return s1.compareToIgnoreCase(s2);
                }
            });
        */

        // Adding new elements to a TreeSet
        fruits.add("Banana");
        fruits.add("Apple");
        fruits.add("Pineapple");
        fruits.add("Orange");

        System.out.println("Fruits Set : " + fruits);

        // Now, lowercase elements will also be considered as duplicates
        fruits.add("banana");
        System.out.println("After adding \"banana\" : " + fruits);
    }
}
```

```
# Output
Fruits Set : [Apple, Banana, Orange, Pineapple]
After adding "banana" : [Apple, Banana, Orange, Pineapple]
```

## 3. TreeSet với tùy chỉnh Comparator (Thứ tự giảm dần)

Ví dụ dưới đây minh họa cách tạo một TreeSet bằng một bộ so sánh tùy chỉnh, sắp xếp các phần tử theo thứ tự giảm dần.

```
import java.util.Comparator;
import java.util.SortedSet;
import java.util.TreeSet;

public class TreeSetDescendingOrderExample {
    public static void main(String[] args) {
        // Creating a TreeSet with a custom Comparator (Descending  Order)
        SortedSet<String> fruits = new TreeSet<>(Comparator.reverseOrder());

        /*
            The above TreeSet with the custom Comparator is the concise form of the following:
            SortedSet<String> fruits = new TreeSet<>(new Comparator<String>() {
                @Override
                public int compare(String s1, String s2) {
                    return s2.compareTo(s1);
                }
            });
        */

        // Adding new elements to a TreeSet
        fruits.add("Banana");
        fruits.add("Apple");
        fruits.add("Pineapple");
        fruits.add("Orange");

        System.out.println("Fruits Set : " + fruits);
    }
}
```

```
# Output
Fruits Set : [Pineapple, Orange, Banana, Apple]
```

## 4. Truy cập các phần tử của một TreeSet

Ví dụ sau đây thực hiện các việc sau :

- Xác định size của một TreeSet.
- Kiểm tra xem một phần tử có tồn tại trong TreeSet hay không.
- Tìm phần tử đầu tiên của một TreeSet.
- Tìm phần tử cuối cùng của một TreeSet.
- Tìm phần tử lớn hơn phần tử đã cho trong TreeSet.
- Tìm phần tử nhỏ hơn phần tử đã cho trong TreeSet.

```
import java.util.TreeSet;

public class AccessTreeSetElementsExample {
    public static void main(String[] args) {
        TreeSet<String> students = new TreeSet<>(String.CASE_INSENSITIVE_ORDER);

        students.add("Julia");
        students.add("Robert");
        students.add("Mark");
        students.add("Steven");

        System.out.println("Students TreeSet : " + students);

        // Finding the size of a TreeSet
        System.out.println("Number of elements in the TreeSet : " + students.size());

        // Check if an element exists in the TreeSet
        String name = "Julia";
        if(students.contains(name)) {
            System.out.println("TreeSet contains the element : " + name);
        } else {
            System.out.println("TreeSet does not contain the element : " + name);
        }

        // Navigating through the TreeSet
        System.out.println("First element : " + students.first());
        System.out.println("Last element : " + students.last());

        name = "Robert";
        System.out.println("Element just greater than "  + name + " : " + students.higher(name));
        System.out.println("Element just lower than "  + name + " : " + students.lower(name));

    }
}
```

```
# Output
Students TreeSet : [Julia, Mark, Robert, Steven]
Number of elements in the TreeSet : 4
TreeSet contains the element : Julia
First element : Julia
Last element : Steven
Element just greater than Robert : Steven
Element just lower than Robert : Mark
```

## 5. TreeSet với các đối tượng do người dùng xác định

Ví dụ trong phần này cho thấy cách tạo một TreeSet của các đối tượng do người dùng xác định.

Vì TreeSet cần giữ các đối tượng được sắp xếp, bạn phải triển khai Comparable interface trong lớp do người dùng xác định và cung cấp việc triển khai cho hàm compareTo() hoặc cung cấp Comparator tùy chỉnh tại thời điểm tạo ra TreeSet.

```
import java.util.Comparator;
import java.util.Objects;
import java.util.SortedSet;
import java.util.TreeSet;

class Employee implements Comparable<Employee> {
    private int id;
    private String name;

    public Employee(int id, String name) {
        this.id = id;
        this.name = name;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // Two Employees are equal if their IDs are equal
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return id == employee.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    // Compare employees based on their IDs
    @Override
    public int compareTo(Employee employee) {
        return this.getId() - employee.getId();
    }

    @Override
    public String toString() {
        return "Employee{" +
                "id=" + id +
                ", name='" + name + '\'' +
                '}';
    }
}

```

```
public class TreeSetUserDefinedObjectExample {
    public static void main(String[] args) {
        // Creating a TreeSet of User Defined Objects.

        /*
           The requirement for a TreeSet of user defined objects is that

           1. Either the class should implement the Comparable interface and provide
              the implementation for the compareTo() function.
           2. Or you should provide a custom Comparator while creating the TreeSet.
        */

        SortedSet<Employee> employees = new TreeSet<>();

        // TreeSet uses the compareTo() method of the Employee class to compare two employees and sort them
        employees.add(new Employee(1010, "Rajeev"));
        employees.add(new Employee(1005, "Sachin"));
        employees.add(new Employee(1008, "Chris"));

        System.out.println("Employees (sorted based on Employee class's compareTo() function)");
        System.out.println(employees);

        // Providing a Custom Comparator (This comparator compares the employees based on their Name)
        employees = new TreeSet<>(Comparator.comparing(Employee::getName));

        employees.add(new Employee(1010, "Rajeev"));
        employees.add(new Employee(1005, "Sachin"));
        employees.add(new Employee(1008, "Chris"));

        System.out.println("\nEmployees (sorted based on the supplied Comparator)");
        System.out.println(employees);

    }
}
```

```
# Output
Employees (sorted based on Employee class's compareTo() function)
[Employee{id=1005, name='Sachin'}, Employee{id=1008, name='Chris'}, Employee{id=1010, name='Rajeev'}]

Employees (sorted based on the supplied Comparator)
[Employee{id=1008, name='Chris'}, Employee{id=1010, name='Rajeev'}, Employee{id=1005, name='Sachin'}]
```

## 6. Kết luận

Trong bài viết này, bạn đã tìm hiểu một TreeSet trong Java là gì, cách tạo một TreeSet, cách chuyển một bộ so sánh tùy chỉnh cho Treeset để thay đổi thứ tự sắp xếp của các phần tử, cách truy cập các phần tử của Treeset, cách loại bỏ các phần tử từ một TreeSet và cách tạo một TreeSet của các đối tượng do người dùng xác định.