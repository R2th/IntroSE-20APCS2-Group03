# 1. Giới thiệu vấn đề
Transaction đã được hỗ trợ trong Spring Boot Framework. 
Chỉ cần khai báo @Transactional trước method là xong như thế này. 
Theo như logic, khi có Exception xảy ra thì Transaction sẽ rollback lại các thao tác trước đó.
```
    @GetMapping("/get")
    @Transactional
    public void get() throws Exception {
        TestEntity testEntity = new TestEntity();
        testRepository.save(testEntity);
        throw new Exception("test");
    }
````

Như trong ví dụ trên, sẽ không lưu 1 bản ghi nào vào databases, nhưng thực tế data vẫn được lưu -> **Vấn đề ở chỗ nào? Framework hoạt động sai?**
# 2. Cách giải quyết vấn đề
Để giải quyết vấn đề này, ta đi đọc lại định nghĩa của [@Transactional](https://docs.spring.io/spring-framework/docs/current/javadoc-api/org/springframework/transaction/annotation/Transactional.html)
Trong khái niêm có đoạn 
```
If no custom rollback rules apply, the transaction will roll back on RuntimeException and Error but not on checked exceptions
```

Nếu chúng ta không khai báo **rollback rules** thì transaction sẽ chỉ rool back khi có exception của **RuntimeException** và **Error**. 
Còn các loại **Checked Exceptions** sẽ không được rollback 

Có nhiều bạn không rõ về **Checked** vs **Unchecked** Exception xem ở [đây](https://www.geeksforgeeks.org/checked-vs-unchecked-exceptions-in-java/)

Có 2 cách cách giải quyết như sau:
## 2.1. Khai báo rollback rules
Có thể chọn 1 hay nhiều rules. Có thể dùng 
```
    @GetMapping("/get2")
    @Transactional(rollbackFor = {Exception.class, Throwable.class})
    public void get2() throws Exception {
        TestEntity testEntity = new TestEntity();
        testRepository.save(testEntity);
        throw new Exception("test");
    }
    
  ```

## 2.2. Khi tạo lỗi, throw RunTimeExceptions hoặc Error 

```
    @GetMapping("/get3")
    @Transactional
    public void get3() throws Exception {
        TestEntity testEntity = new TestEntity();
        testRepository.save(testEntity);
        throw new Error("test");
//        throw new RuntimeException("test");
    }
```

MÌnh thì thích làm theo cách 1. Khai báo tường minh **rollBackFor**, giúp kiếm soát dễ hơn. 
# 3. Kết Luận
Đây là 1 lỗi rất cơ bản, nhiều lúc các testcases không cover được đẫn đến bỏ sót lỗi. 
Kể cả các bạn lập trình viên vài năm kinh nghiệm mà vẫn gặp phải.  Nếu cần trao đổi hãy comment ở bên dưới.

Link [Sourcecode](https://github.com/ledangtuanbk/test-transaction)