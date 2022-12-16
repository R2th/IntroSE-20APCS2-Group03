Còn nửa tháng nữa tính từ lúc mình viết bài này (17/2/2018), phiên bản dự kiến JDK 12 sẽ được tung ra, tuy nhiên 1 số đề xuất nâng cấp cho phiên bản này đã đc đưa ra.
Hôm nay mình xin cầm đèn chạy trước ô tô đôi chút.
Nhà phát hành đã cho phép chúng ta trải nghiệm phiên bản mang tên JDK 12 Early Access Build (EAB). Tuy nhiên để sử dụng bản chưa chính thức này gặp khó khăn khi các IDE chưa tích hợp, cho nên chúng ta dùng command-line đã nhé.
![](https://images.viblo.asia/b111fa6c-668f-45a7-b29e-376fd22423b0.png)

Sau khi download JDK 12 từ https://jdk.java.net/12/ về và giải nén, chúng ta biên dịch mã nguồn java 

```
jdk-12\bin\javac --enable-preview -source 12 test.java
```

Sau đó chạy class biên dịch bằng lệnh:
	
```
jdk-12\bin\java --enable-preview test
```

Xong, tìm hiểu nào!

Nổi bật của JDK 12 có lẽ là Switch Expressions và Raw String Literals

1. Switch Expressions:
```
switch (day) {
    case MONDAY:
    case TUESDAY:
     case WEDNESDAY:
     case THURSDAY:
    case FRIDAY:
        System.out.println("Bạn phải đi làm");
        break;
    case SATURDAY:
    case SUNDAY:
        System.out.println("Bạn phải ở nhà, nghỉ");
        break;
```
```
switch (day) {
    case MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY -> System.out.println("Bạn phải đi làm");
    case SATURDAY, SUNDAY      -> System.out.println("Bạn phải ở nhà nghỉ (yaoming)");
}
```
Chúng ta ko thấy break cho mỗi case ở cách 2, đồng thời code của chúng ta ngắn gọn, dễ hiểu hơn nhiều.
Và rồi sau này chúng ta sẽ bắt gặp những dòng lệnh tương tự:
```
string level = switch (mark) {
    case 1,2,3,4 -> "bad";
    case 5,6,7 -> "normal";
    case 8,9,10 -> "good";
};
```

2. Raw String Literals

Chắc hẳn các bạn cũng đã từng thấy những dòng code với SQL dài ngoằng rối mắt
```
String sql = "" +
    " select sv.Masv, Tensv\n" +
    " from Sinhvien sv, Ketqua kq\n" +
    " where sv.Masv = kq.Masv and Diem < 5 and Lop = 'L04'\n" + 
    " group by sv.Masv, Tensv\n" + 
    " having COUNT(Diem) > 2";
```

Nhưng với JDK 12 thì việc này đã được giải quyết khá tốt bằng cách sử dụng Raw String Literals.
Thay vì dùng dấu nháy kép, ta chuyển sang dung dấu (`) để bao 1 đoạn nhiều dòng

```
String sql = `
            select sv.Masv, Tensv
            from Sinhvien sv, Ketqua kq
            where 
                sv.Masv = kq.Masv and Diem < 5 and Lop = 'L04' 
            group by sv.Masv, Tensv 
            having COUNT(Diem) > 2`;
        System.out.println(sql);
```
Có cơ hội thì các bạn tự chạy bằng 2 cách trên xem kết quả ntn nhé 

Trên đây là 2 sự bổ sung nho nhỏ nhưng vô cùng bổ ích và thuận tiện nhé các bạn.
Còn một số điểm mới nữa sẽ cùng tìm hiểu sau khi phiên bản JDK 12 chính thức ra mắt nhé các bạn.
Một số từ khóa tìm hiểu những cái mới của JDK 12 cho các bạn tự tìm hiểu nhé:

1. JVM Constants API
2. One AArch64 Port, Not Two
3. Default CDS Archives
4. Abortable Mixed Collections for G1
5. Promptly Return Unused Committed Memory from G1

Have fun coding with Java !