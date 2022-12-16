Ở bài trước, mình đã [giới thiệu Quarkus](https://viblo.asia/p/tim-hieu-ve-quarkus-supersonic-subatomic-java-jvEla14zlkw) - Một framework được mô tả là Supersonic Subatomic giúp chạy tương thích trong các container trên môi trường cloud. Quarkus có thể nói là một giải pháp thay thế giúp đưa Java gần hơn với các môi trường đám mây.

![](https://images.viblo.asia/cfc4cfed-a07d-4c48-a26a-b5856243a569.jpg)


Trong bài này chúng ta sẽ cùng tìm hiểu sâu hơn về Quarkus, cụ thể là **cách config logging đơn giản trong quarkus** tương tự như việc config trong Spring - Framework nổi tiếng bao đời có lẽ đã quá quen thuộc với bạn.

# 1. Sơ lượt
Để config logging trong Quarkus, bạn sẽ sử dụng file **application.properties** tương tự như Spring

File này mặc định được đặt tại `src/main/resources/application.properties`

# 2. Những logging API được Quarkus hỗ trợ
Bạn có thể sử dụng bất kỳ logging API nào trong số những API dưới đây, đều được Quarkus hỗ trợ cả :v

* JDK java.util.logging

* [JBoss Logging](https://github.com/jboss-logging/jboss-logging)

* [SLF4J](https://www.slf4j.org/)

* [Apache Commons Logging](https://commons.apache.org/proper/commons-logging/)

# 3. Tìm hiểu một số config qua ví dụ
Console DEBUG Logging, không config màu cho log, Shortened Time, Shortened Category Prefixes
```
quarkus.log.console.enable=true
quarkus.log.console.format=%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n
quarkus.log.console.level=DEBUG
quarkus.log.console.color=false

quarkus.log.category."io.quarkus".level=DEBUG
```

Nếu project yêu cầu cần ghi log vào file, bạn có thể config như này:
```
quarkus.log.file.enable=true
# Bắn log vào file trace.log đặt tại thư mục /ghi-log
quarkus.log.file.path=/ghi-log/trace.log
quarkus.log.file.level=TRACE
quarkus.log.file.format=%d{HH:mm:ss} %-5p [%c{2.}] (%t) %s%e%n
# Đặt log level cho các package (io.quarkus.smallrye.jwt, io.undertow.request.security) là TRACE
quarkus.log.category."io.quarkus.smallrye.jwt".level=TRACE
quarkus.log.category."io.undertow.request.security".level=TRACE
```

# 4. Kết luận
Ở trên là một số thông tin mình tóm lược từ docs https://quarkus.io/guides/logging chính chủ của quarkus. Docs thì lúc nào cũng nhiều thứ, chi tiết các kiểu con đà điểu, nhưng sử dụng thì có bao nhiêu :D 

Những config ở phần ví dụ mục 3 là những config mình hay dùng và đã dùng trong các project, bạn đã dùng những thứ nào rồi? Trọn gói chưa? Hãy cùng tìm hiểu và chia sẻ nhé ;)