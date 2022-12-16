Trong các framework java bạn hay thấy sử dụng anotation **@UnitOfWork** để sử dụng 1 transaction cho 1 action trong Controller, trong bài viết này mình giới thiệu về partten unitofwork
bạn có thể search anotation trên ở google bạn sẽ thấy có nhiều framework sử dụng nó để đánh dấu phương thức đó là sẽ sử dụng transaction


Vậy unitofwork là gì?  nôm na ví dụ như bạn sử dụng restfull api trong java, trước khi chuẩn bị gửi dữ liệu về cho client thì sẽ tiến hành commit dữ liệu vào database.

Sau đây mình xin giới thiệu mô hình và code mẫu về unitofwork


![](https://images.viblo.asia/70f4c2ba-daeb-4909-b06c-62aa4e4bcd84.png)

# 1. Tạo 1 interface: IUnitOfWork
Interface chứa các action sẽ thực hiện khi kết thúc 1 unitofwork

```
package unitofwork;

/**
 * @param <T> Any generic entity
 */
public interface IUnitOfWork<T> {
  String INSERT = "INSERT";
  String DELETE = "DELETE";
  String MODIFY = "MODIFY";

  /**
   * Any register new operation occurring on UnitOfWork is only going to be performed on commit.
   */
  void registerNew(T entity);

  /**
   * Any register modify operation occurring on UnitOfWork is only going to be performed on commit.
   */
  void registerModified(T entity);

  /**
   * Any register delete operation occurring on UnitOfWork is only going to be performed on commit.
   */
  void registerDeleted(T entity);

  /***
   * All UnitOfWork operations batched together executed in commit only.
   */
  void commit();

}
```


# 2. Tạo java bean: Student 

```
package unitofwork;

/**
 * {@link Student} is an entity.
 */
public class Student {
  private final Integer id;
  private final String name;
  private final String address;

  /**
   * @param id      student unique id
   * @param name    name of student
   * @param address address of student
   */
  public Student(Integer id, String name, String address) {
    this.id = id;
    this.name = name;
    this.address = address;
  }

  public String getName() {
    return name;
  }

  public Integer getId() {
    return id;
  }

  public String getAddress() {
    return address;
  }
}
```

# 3. Tạo class thao tác với database tương ứng với các action ở IUnitOfWork

```
package unitofwork;

/**
 * Act as Database for student records.
 */
public class StudentDatabase {

  public void insert(Student student) {
    //Some insert logic to DB
  }

  public void modify(Student student) {
    //Some modify logic to DB
  }

  public void delete(Student student) {
    //Some delete logic to DB
  }
}
```

# 4. Tạo 1 Repository để hander các action của IUnitOfWork
```
package unitofwork;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * {@link StudentRepository} Student database repository.
 * supports unit of work for student data.
 */
public class StudentRepository implements IUnitOfWork<Student> {
  private static final Logger LOGGER = LoggerFactory.getLogger(StudentRepository.class);

  private Map<String, List<Student>> context;
  private StudentDatabase studentDatabase;

  /**
   * @param context         set of operations to be perform during commit.
   * @param studentDatabase Database for student records.
   */
  public StudentRepository(Map<String, List<Student>> context, StudentDatabase studentDatabase) {
    this.context = context;
    this.studentDatabase = studentDatabase;
  }

  @Override
  public void registerNew(Student student) {
    LOGGER.info("Registering {} for insert in context.", student.getName());
    register(student, IUnitOfWork.INSERT);
  }

  @Override
  public void registerModified(Student student) {
    LOGGER.info("Registering {} for modify in context.", student.getName());
    register(student, IUnitOfWork.MODIFY);

  }

  @Override
  public void registerDeleted(Student student) {
    LOGGER.info("Registering {} for delete in context.", student.getName());
    register(student, IUnitOfWork.DELETE);
  }

  private void register(Student student, String operation) {
    List<Student> studentsToOperate = context.get(operation);
    if (studentsToOperate == null) {
      studentsToOperate = new ArrayList<>();
    }
    studentsToOperate.add(student);
    context.put(operation, studentsToOperate);
  }

  /**
   * All UnitOfWork operations are batched and executed together on commit only.
   */
  @Override
  public void commit() {
    if (context == null || context.size() == 0) {
      return;
    }
    LOGGER.info("Commit started");
    if (context.containsKey(IUnitOfWork.INSERT)) {
      commitInsert();
    }

    if (context.containsKey(IUnitOfWork.MODIFY)) {
      commitModify();
    }
    if (context.containsKey(IUnitOfWork.DELETE)) {
      commitDelete();
    }
    LOGGER.info("Commit finished.");
  }

  private void commitInsert() {
    List<Student> studentsToBeInserted = context.get(IUnitOfWork.INSERT);
    for (Student student : studentsToBeInserted) {
      LOGGER.info("Saving {} to database.", student.getName());
      studentDatabase.insert(student);
    }
  }

  private void commitModify() {
    List<Student> modifiedStudents = context.get(IUnitOfWork.MODIFY);
    for (Student student : modifiedStudents) {
      LOGGER.info("Modifying {} to database.", student.getName());
      studentDatabase.modify(student);
    }
  }

  private void commitDelete() {
    List<Student> deletedStudents = context.get(IUnitOfWork.DELETE);
    for (Student student : deletedStudents) {
      LOGGER.info("Deleting {} to database.", student.getName());
      studentDatabase.delete(student);
    }
  }
}
```

Trên bạn thấy method commit, nó sẽ thực hiện tất cả các action trong UnitOfWork

# 5. Tiến hành chạy thử và xác nhận
```
package unitofwork;

import java.util.HashMap;
import java.util.List;

/**
 * {@link App} Application for managing student data.
 */
public class App {
  /**
   *
   * @param args no argument sent
   */
  public static void main(String[] args) {
    Student ram = new Student(1, "Ram", "Street 9, Cupertino");
    Student shyam = new Student(2, "Shyam", "Z bridge, Pune");
    Student gopi = new Student(3, "Gopi", "Street 10, Mumbai");

    HashMap<String, List<Student>> context = new HashMap<>();
    StudentDatabase studentDatabase = new StudentDatabase();
    StudentRepository studentRepository = new StudentRepository(context, studentDatabase);

    studentRepository.registerNew(ram);
    studentRepository.registerModified(shyam);
    studentRepository.registerDeleted(gopi);
    studentRepository.commit();
  }
}
```

Trên là 1 unitofwork: sẽ tóm tất cả các xử lý vào 1 rồi tiến hành commit, nếu có vấn đề thì rollback lại cả unitofwork
Sau này tự viết hay sử dụng framework bạn có thể dễ dàng hiểu được nguyên lý làm việc của 1 unitofwork

Source code tham khảo: https://github.com/ngodinhngoc/unitofwork

# 6. Tài liệu tham khảo:
https://github.com/iluwatar/java-design-patterns

https://medium.com/@utterbbq/c-unitofwork-and-repository-pattern-305cd8ecfa7a

https://dropwizard.readthedocs.io/en/stable/manual/hibernate.html

http://www.ninjaframework.org/apidocs/ninja/jpa/UnitOfWork.html