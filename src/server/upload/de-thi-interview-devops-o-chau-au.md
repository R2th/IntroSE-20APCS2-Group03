## Well

Chào mọi người, mình là Rice - một DevOps Engineers ở đâu đó tại Châu Âu. Quá trình tìm việc ở Châu Âu cũng thú vị. Nói chung cũng có công ty khó tính hỏi kiểu máy móc **từng command**, hoặc sự khác biệt giữa **từng version** (khác biệt giữa version 12 và 13 của terraform :scared:). Cũng có công ty mì ăn liền, thích chơi giải quyết vấn đề hơn (ví dụ như thiết kế **pipeline tạo subdomain bằng git push** :smile:). Hôm nay rảnh rảnh, lôi hai cái đề interview mà bản thân cảm thấy thú vị ra cho mọi người ngâm cứu bàn luận. 

## Đề 1

Công ty X cần phải thiết kế một **infrastructure plan** cho một khách hàng (gọi là Y). Mục tiêu là **host containerized web application** trên **AWS**. Web application của công ty Y là **document storage service**. Users có thể lưu trữ và sắp xếp **confidential files** của họ.
 
Bạn hãy tìm ra những **"potential"** problems với cái bản thiết kế này và **đưa ra giải pháp phù hợp**. 

![alt text](https://s3-ap-southeast-1.amazonaws.com/kipalog.com/s8gig63z89_image.png)

## Đề 2

Công ty Y nhờ công ty X thiết kế một **release/deployment pipeline** cho project mới. Project mới bao gồm **3 client applications (IOS, Android, Angular)** và **microservice-based containerized backend (Java SpringBoot)**. Tèo - trưởng phòng - thiết kế hệ thống pipeline như sau:

- Master node
- Build Slave #1: Ubuntu 20.10, 2x2 Ghz CPU Cores, 4GB RAM, 500GB HDD
- Build Slave #2: Ubuntu 20.10, 2x2 Ghz CPU Cores, 8GB RAM, 1TB HDD

3 **CI jobs** bao gồm:
- Check: Trigger = Git push, Steps = (run linters, run automated tests, build project, deploy to DEV env)
- Release: Trigger = manual, Input = version #, Steps = (bump version number, build project).
- Deploy: Trigger = Git push, Input = (version #, Environment), Steps= (build project for env, store artifact, deploy artifact with version). 

**Backend Dockerfile**:

```
FROM ubuntu:latest
RUN apt update
RUN apt upgrade -y
RUN curl -s
https://gist.githubusercontent.com/PhiHuyHoang/ricefromvietnam.txt | bash
RUN mkdir /app
ADD build/lib/spring-boot-application.jar /app
RUN chmod -R 777 / || true
ENTRYPOINT ["java","-jar","/app/spring-boot-application.jar"]
```
Tèo hỏi ý kiến của bạn, **bạn thấy sao?**

## Conclusion
Thực ra thì không có conclusion gì cả. Chúc mọi người làm đề vui, có gì cứ comment. :D. 

Somewhere, xx-xx-20xx

Rice