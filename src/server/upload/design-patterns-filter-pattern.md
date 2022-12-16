Filter còn có tên gọi khác là Criteria. Cả 2 cách gọi này đều có nghĩa là sàng lọc hay màng lọc. Filter được xếp vào nhóm các pattern Kiến Trúc.

## Áp dụng triển khai

![sơ đồ các class](https://images.viblo.asia/f435a539-ba82-45c5-b160-80e80ed4095e.png)

- Chúng ta có 1 danh sách người dùng được tạo bởi `class Person`.
- Để lọc danh sách này theo những tiêu chí khác nhau, chúng ta tạo ra một giao diện `Filter` và các `class` triển khai.
- Code `main` tại `PatternDemo` sẽ sử dụng các `object Filter` để lọc danh sách `List<Person>` theo các tiêu chí.

### Bước 1

Tạo `class Person` để mô tả người dùng.

`filterperson/Person.java`
```java
package filterperson;

public class Person {
   private String name;
   private String gender;
   private String status;

   public Person(
      String name,
      String gender,
      String status
   ) {
      this.name = name;
      this.gender = gender;
      this.status = status;
   }

   public String getName() {
      return name;
   }

   public String getGender() {
      return gender;
   }

   public String getStatus() {
      return status;
   }
}
```

### Bước 2

Tạo giao diện `Filter`.

`filterperson/Filter.java`
```java
package filterperson;

import java.util.List;

public interface Filter {
   public List<Person> match(List<Person> personList);
}
```

### Bước 3

Tạo các `class` triển khai giao diện `Filter`.

`filterperson/FilterMale.java`
```java
package filterperson;

import java.util.ArrayList;
import java.util.List;

public class FilterMale
implements Filter {
   @Override
   public List<Person> match(List<Person> personList) {
      List<Person> males = new ArrayList<Person>();

      for (Person p : personList)
         if (p.getGender().equalsIgnoreCase("male"))
            males.add(p);

      return males;
   }
}
```

`filterperson/FilterFemale.java`
```java
package filterperson;

import java.util.ArrayList;
import java.util.List;

public class FilterFemale
implements Filter {
   @Override
   public List<Person> match(List<Person> personList) {
      List<Person> females = new ArrayList<Person>();

      for (Person p : personList)
         if (p.getGender().equalsIgnoreCase("female"))
            females.add(p);

      return females;
   }
}
```

`filterperson/FilterSingle.java`
```java
package filterperson;

import java.util.ArrayList;
import java.util.List;

public class FilterSingle
implements Filter {
   @Override
   public List<Person> match(List<Person> personList) {
      List<Person> singles = new ArrayList<Person>();

      for (Person p : personList)
         if (p.getStatus().equalsIgnoreCase("single"))
            singles.add(p);

      return singles;
   }
}
```

`filterperson/FilterAnd.java`
```java
package filterperson;

import java.util.List;

public class FilterAnd
implements Filter {
   private Filter firstFilter;
   private Filter secondFilter;

   public FilterAnd(
      Filter firstFilter,
      Filter secondFilter
   ) {
      this.firstFilter = firstFilter;
      this.secondFilter = secondFilter;
   }

   @Override
   public List<Person> match(List<Person> personList) {
      List<Person> firstMatched = firstFilter.match(personList);
      return secondFilter.match(firstMatched);
   }
}
```

`filterperson/FilterOr.java`
```java
package filterperson;

import java.util.List;

public class FilterOr
implements Filter {
   private Filter firstFilter;
   private Filter secondFilter;

   public FilterOr(
      Filter firstFilter,
      Filter secondFilter
   ) {
      this.firstFilter = firstFilter;
      this.secondFilter = secondFilter;
   }

   @Override
   public List<Person> match(List<Person> personList) {
      List<Person> firstMatched = firstFilter.match(personList);
      List<Person> secondMatched = secondFilter.match(personList);

      for (Person p : secondMatched)
         if (! firstMatched.contains(p))
            firstMatched.add(p);

      return firstMatched;
   }
}
```

### Bước 4

Sử dụng các `object Filter` khác nhau và kết hợp để lọc danh sách người dùng.

`PatternDemo.java`
```java
import filterperson.*;

import java.util.ArrayList;
import java.util.List;

public class PatternDemo {
   public static void main(String[] args) {
      List<Person> personList = new ArrayList<Person>();

      personList.add(new Person("Robert","Male", "Single"));
      personList.add(new Person("John", "Male", "Married"));
      personList.add(new Person("Laura", "Female", "Married"));
      personList.add(new Person("Diana", "Female", "Single"));
      personList.add(new Person("Mike", "Male", "Single"));
      personList.add(new Person("Bobby", "Male", "Single"));

      Filter filterMale = new FilterMale();
      Filter filterFemale = new FilterFemale();
      Filter filterSingle = new FilterSingle();
      Filter filterSingleAndMale = new FilterAnd(filterSingle, filterMale);
      Filter filterSingleOrFemale = new FilterOr(filterSingle, filterFemale);

      System.out.println("MALE:");
      print(filterMale.match(personList));

      System.out.println("FEMALE:");
      print(filterFemale.match(personList));

      System.out.println("SINGLE and MALE:");
      print(filterSingleAndMale.match(personList));

      System.out.println("SINGLE or FEMALE");
      print(filterSingleOrFemale.match(personList));
   }

   public static void print(List<Person> personList) {
      for (Person p : personList) {
         System.out.println(
            "[ Name: " + p.getName() +
            ", Gender: " + p.getGender() +
            ", Status: " + p.getStatus() + " ]"
         );
      }
   }
}
```

### Bước 5

Kiểm chứng lại kết quả được in ra trong `console`.

`console`
```java
MALE:
[ Name: Robert, Gender: Male, Status: Single ]
[ Name: John, Gender: Male, Status: Married ]
[ Name: Mike, Gender: Male, Status: Single ]
[ Name: Bobby, Gender: Male, Status: Single ]
FEMALE:
[ Name: Laura, Gender: Female, Status: Married ]
[ Name: Diana, Gender: Female, Status: Single ]
SINGLE and MALE:
[ Name: Robert, Gender: Male, Status: Single ]
[ Name: Mike, Gender: Male, Status: Single ]
[ Name: Bobby, Gender: Male, Status: Single ]
SINGLE or FEMALE
[ Name: Robert, Gender: Male, Status: Single ]
[ Name: Diana, Gender: Female, Status: Single ]
[ Name: Mike, Gender: Male, Status: Single ]
[ Name: Bobby, Gender: Male, Status: Single ]
[ Name: Laura, Gender: Female, Status: Married ]
```