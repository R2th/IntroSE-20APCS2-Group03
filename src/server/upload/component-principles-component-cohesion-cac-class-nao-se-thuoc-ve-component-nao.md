Các class nào sẽ thuộc về component nào?

Đây là một quyết định quan trọng và cần có sự cân đối từ các nguyên tắc về kỹ thuật phần mềm thật tốt. Không may, trong rất nhiều trường hợp, quyết định này đã được đưa ra theo cách bộc phát gần như hoàn toàn dựa trên bối cảnh.

Trong bài viết này chúng ta sẽ nói về ba nguyên tắc chính của component cohesion (sự gắn kết component):
- **REP**: Reuse/Release Equivalence Principle. 
- **CCP**: Common Closure Principle.
- **CRP**: Common Reuse Principle.

# Reuse/Release Equivalence Principle

Trong những thập kỷ qua, chúng ta đã chứng kiến sự gia tăng của một loạt các công cụ quản lý mô-đun, chẳng hạn như Maven, Leiningen và RVM. Những công cụ này ngày càng trở nên quan trọng bởi vì, trong thời gian đó, một số lượng lớn các reusable component và các component library đã được tạo ra. Chúng ta giờ đây đang sống trong thời đại về tái sử dụng phần mềm. Điều này được coi sự hoàn thành của một trong những lời hứa lâu đời nhất của mô hình hướng đối tượng.

Để có thể tái sử dụng các software component, các component đó cần được track thông qua một release process và được cung cấp số phiên bản release. Nếu không có số phiên bản release, chúng ta sẽ không có cách nào để đảm bảo rằng tất cả các component được tái sử dụng có thể tương thích với nhau hay không. Thay vào đó, nó phản ánh một thực tế rằng một software developer cần phải biết khi nào một bản release sắp ra mắt, và trên bản release đó có những thay đổi gì.

Hiện nay, không có gì lạ khi các developer được cảnh báo về một phiên bản release mới, và quyết định (dựa trên những thay đổi có trên bản release) về việc có tiếp tục sử dụng phiên bản cũ hay không. Do đó quá trình release thường phải kèm theo các thông báo thích hợp và một số tài liệu để từ đó người dùng có thể đưa ra quyết định sáng suốt về thời điểm tích hợp và liệu có nên tích hợp phiên bản mới hay không.

Từ góc nhìn của thiết kế và kiến trúc phần mềm, nguyên tắc này có nghĩa là các class vào module được hình thành trong một component phải thuộc về một cohesive group (nhóm gắn kết). Component không thể nào đơn giản chỉ là một tổ hợp ngẫu nhiên của các class và module. Thay vào đó, phải có một chủ đề hoặc một mục đích bao quát nào đó mà tất cả module đều hướng tới.

Tất nhiên là điều này nên rõ ràng. Tuy nhiên thì hiện tại đang có một cách nhìn khác về vấn đề này không được rõ ràng cho lắm. Người ta cho rằng các class và module mà được nhóm lại với nhau trong một component nên xử lý làm sao cho có thể release cùng nhau, vậy thì thực tế là chúng có cùng số phiên bản và release tracking number, và được bao hàm trong cùng một tài liệu phát hành, nên như thế cũng là gắn kết rồi còn gì!?

Đây là một cách làm không tốt. Việc cố gắng để tạo ra một sự gắn kết không thực sự đúng đắn thực ra chỉ là một cách đối phó với các nguyên tắc. Cách tiếp cận trên gây ra sự mơ hồ vì chúng ta rất khó để có thể giải thích chính xác lý do mà các class và module đó lại cùng nằm trong một component. Nếu chúng ta tuân thủ nguyên tắc, vì việc vi phạm rất dễ phát hiện, và những người sử dụng software component sẽ không có ấn tượng tốt về kỹ năng kiến trúc của bạn.

Điểm yếu của nguyên tắc này sẽ được bù đắp bằng điểm mạnh của hai nguyên tắc tiếp theo. CCP và CRP sẽ định nghĩa rõ nguyên tắc này, nhưng theo một nghĩa hơi tiêu cực tí.

# Common Closure Principle
> Gộp vào component các class mà có sự thay đổi với cùng một lý do và thời điểm. Tách ra các component khác các class mà có sự thay đổi với những lý do khác và khác thời điểm.

Đây cũng có thể hiểu là nguyên tắc Single Responsibility (SRP, nguyên tắc đầu tiên trong SOLID) nhưng được phát biểu lại cho *component*. Nếu như SRP nói rằng một *class* không nên bao hàm nhiều lý do để bị thay đổi, thì CCP nói rằng một component không nên có nhiều lý do để bị thay đổi.

Với phần lớn các ứng dụng, khả năng bảo trì là quan trọng hơn khả năng tái sử dụng. Nếu code trong ứng dụng cần phải thay đổi, thì ta cố gắng làm sao để tất cả các thay đổi nằm trong 1 component sẽ tốt hơn là phải sửa ở rất nhiều component khác nhau. Từ đó, chúng ta chỉ cần redeploy một component duy nhất. Các component khác mà không có depend đến cái component bị thay đổi cũng không cần phải revalidate và redeploy.

CCP nhắc nhở chúng ta tập hợp tất cả các lớp có khả năng thay đổi vì những lý do giống nhau lại ở một nơi. Nếu hai lớp liên kết chặt chẽ, về mặt vật lý hoặc khái niệm, đến mức chúng luôn thay đổi cùng nhau, thì chúng nên thuộc cùng một thành phần. Điều này sẽ giảm thiểu khối lượng công việc liên quan đến việc phát hành, xác thực lại và triển khai lại phần mềm.

Nguyên tắc này được kết hợp chặt chẽ với nguyên tắc Open Closed (OCP, nguyên tắc thứ 2 trong SOLID). Thật vậy, từ "closure" trong CCP chính là đề cập đến OCP. OCP quy định rằng các class nên có tính đóng khi sửa đổi nhưng cần có tính mở khi mở rộng. Bởi vì việc đóng 100% là không thể đạt được, nên việc đóng phải có chiến lược. Chúng ta nên thiết kế các lớp của mình sao cho chúng tuân theo các loại thay đổi phổ biến nhất mà chúng ta mong đợi hoặc đã từng trải qua.

CCP khuếch đại bài học này bằng cách yêu cầu chúng ta tập hợp các class mà được thiết kế đóng vì những sự thay đổi giống nhau vào cùng một component. Do đó, khi có thay đổi về requirements, chúng ta có thể sẽ chỉ cần phải sửa gói gọn trong một component mà thôi.

### Sự tương tự với SRP

Như đã nói trước đó, CCP là dạng *component* của SRP. SRP yêu cầu chúng ta tách các method vào các class khác nhau, nếu chúng thay đổi vì những lý do khác nhau. CCP yêu cầu chúng ta tách các class thành các component khác nhau, nếu chúng thay đổi vì những lý do khác nhau. Cả hai nguyên tắc có thể được tóm tắt bằng một câu chung chung sau:
> Gộp những thứ thay đổi vì cùng một lý do và thời điểm lại với nhau.
> Tách những thứ thay đổi vì các lý do khác và thời điểm khác ra chỗ khác.

# Common Reuse Principle
> Đừng bắt buộc những người dùng của một component phải depend vào những thứ họ không cần.

Nguyên tắc Common Reuse (CRP) là một nguyên tắc khác nữa giúp chúng ta quyết định xem class và module nào nên được đặt trong một component. Nó phát biểu rằng các class và module có xu hướng tái sử dụng cùng nhau thì nên thuộc về cùng một component.

Các class hiếm khi được tái sử dụng một cách độc lập. Điển hình mà nói, các class có thể tái sử dụng thường đi kèm với các class khác là một phần của reusable abstraction. CRP nói rằng các class nên này thuộc về cùng một component. Trong một component như vậy, chúng ta sẽ thấy các class có rất nhiều phụ thuộc vào nhau.

Một ví dụ đơn giản có thể là một container class và các associated iterator của nó. Các class này được tái sử dụng cùng nhau vì chúng được liên kết chặt chẽ với nhau. Vì vậy, chúng phải ở trong cùng một component.

Nhưng CRP không chỉ cho chúng ta biết những class nào nên ghép lại với nhau thành một component, nó còn cho chúng ta biết những class nào không nên kết hợp với nhau vào một component. Khi một component sử dụng một component khác, một sự phụ thuộc được tạo ra giữa các component. Có thể component chỉ sử dụng một lớp trong component được sử dụng — nhưng sự phụ thuộc vần là sự phụ thuộc. Thành phần sử dụng vẫn phụ thuộc vào thành phần được sử dụng.

Do sự phụ thuộc đó, mỗi khi thay đổi *component được sử dụng*, thì *component đang sử dụng* sẽ có nhu cầu thay đổi tương ứng. Ngay cả khi không có thay đổi nào là cần thiết đối với *component đang sử dụng*, nó có thể vẫn cần được biên dịch lại, xác thực lại và triển khai lại. Điều này đúng ngay cả khi *component đang sử dụng* không quan tâm đến thay đổi được thực hiện trong *component được sử dụng*.

Vì vậy, khi phụ thuộc vào một component, cần đảm bảo rằng chúng ta phụ thuộc vào mọi class trong component đó. Nói một cách khác, chúng ta cần đảm bảo rằng các class mà chúng ta đưa vào một component là không thể tách rời — rằng không thể phụ thuộc vào một số nhất định và không phụ thuộc vào các class khác. Nếu không, chúng ta sẽ cần deploy lại nhiều component hơn mức cần thiết và lãng phí đáng kể effort.

Kể ra mà nói thì, CRP cho chúng ta biết nhiều hơn về những class nào không nên ở cùng nhau hơn là về những class nào nên ở cùng nhau. CRP nói rằng các class không liên kết chặt chẽ với nhau sẽ không nằm trong cùng một component.

### Mối liên hệ tới ISP

CRP là phiên bản generic của ISP (nguyên tắc thứ 4 trong SOLID). ISP khuyên chúng ta không nên phụ thuộc vào các class có các method mà chúng ta không sử dụng. CRP khuyên chúng ta không nên phụ thuộc vào các thành phần có các lớp mà chúng ta không sử dụng.

Chúng ta có thể phát biểu chung như sau:
> Đừng phụ thuộc vào những thứ bạn không cần.

# Tesion Diagram của Component Cohesion

Bạn có thể đã nhận ra rằng ba nguyên tắc cohesion có xu hướng chống lại nhau. REP và CCP là các nguyên tắc *inclusive*: Cả hai đều có xu hướng làm cho các component lớn hơn. CRP là một nguyên tắc *exclusive*, thúc đẩy các component trở nên nhỏ hơn. Đó là sự co kéo giữa các nguyên tắc này mà các kiến trúc sư giỏi cần tìm cách giải quyết. 

Hình dưới đây là biểu đồ tension cho thấy cách thức ba nguyên tắc cohesion này tương tác với nhau. Các cạnh của biểu đồ mô tả chi phí của việc từ bỏ nguyên tắc trên đỉnh đối diện.

![](https://images.viblo.asia/8f20981d-a27f-46cd-80eb-1ea7c2d4182f.png)

Một kiến trúc sư chỉ tập trung vào REP và CRP sẽ thấy rằng có quá nhiều thành phần bị ảnh hưởng khi thực hiện các thay đổi đơn giản. Ngược lại, một kiến trúc sư tập trung quá mạnh vào CCP và REP sẽ tạo ra quá nhiều bản phát hành không cần thiết. 

Một kiến trúc sư giỏi sẽ tìm thấy một vị trí trong tam giác tension đó một vị trí đáp ứng những mối quan tâm hiện tại của nhóm phát triển, nhưng cũng nhận thức được rằng những mối quan tâm đó sẽ thay đổi theo thời gian. Ví dụ, trong giai đoạn đầu phát triển một dự án, CCP quan trọng hơn nhiều so với REP, bởi vì khả năng phát triển quan trọng hơn khả năng tái sử dụng.

Nói chung, các dự án có xu hướng bắt đầu ở phía bên phải của tam giác, nơi hy sinh duy nhất là tái sử dụng. Khi dự án trưởng thành và các dự án khác bắt đầu thu hút từ nó, dự án sẽ trượt sang trái. Điều này có nghĩa là component structure của một dự án có thể thay đổi theo thời gian và thời gian trưởng thành. Về sau, chúng ta có nhiều vấn đề hơn liên quan đến cách dự án đó được phát triển và sử dụng, hơn là những gì dự án thực sự làm.

# Kết
Trước đây, quan điểm của chúng ta về sự gắn kết đơn giản hơn nhiều so với ngụ ý của REP, CCP và CRP. Chúng ta đã từng nghĩ rằng sự gắn kết chỉ đơn giản là thuộc tính mà ở đó, một mô-đun thực hiện một và chỉ một chức năng.

Tuy nhiên, ba nguyên tắc của component cohestion mô tả sự liên kết phức tạp hơn nhiều. Khi chọn các class để nhóm lại với nhau thành các component, chúng ta phải xem xét các lực lượng đối lập liên quan đến khả năng tái sử dụng và khả năng phát triển. 

Việc cân bằng những lực lượng này với nhu cầu của ứng dụng là không hề nhỏ. Hơn nữa, sự cân bằng hầu như luôn luôn biến động. Có nghĩa là, vị trí hợp ngày hôm nay có thể không phù hợp vào năm sau. Kết quả là, sự kết hợp của các component có thể sẽ bị xáo trộn và phát triển theo thời gian khi trọng tâm của dự án thay đổi từ khả năng phát triển sang khả năng tái sử dụng.

---

*Dịch và tham khảo từ [Clean Architecture: A Craftsman's Guide to Software Structure and Design (Robert C. Martin Series)](https://www.amazon.com/Clean-Architecture-Craftsmans-Software-Structure/dp/0134494164)*