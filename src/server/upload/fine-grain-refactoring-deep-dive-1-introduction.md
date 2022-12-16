## 1. Thế nào là refactoring?
> "Refactoring is the process of changing a software system in such a way that it does not alter the external behavior of the code yet improves its internal structure." -- MartinFowler
> 
> "Tái cấu trúc là quá trình thay đổi hệ thống phần mềm theo một cách mà không làm thay đổi hành vi bên ngoài của mã nguồn nhưng vẫn cải thiện cấu trúc bên trong của nó". 

Từ "factor" bắt nguồn từ tiếng Latin có nghĩa là "maker", nghĩa là mọi vật đều được tạo từ các thành phần riêng của nó, `do factor/factoring` nghĩa là tìm kiếm xem vật đó được tạo nên từ các thành phần gì  và `refactoring` chính là quá trình sắp xếp lại cách thành phần đó theo một cách khác mà không thay đổi bản chất của vật đó. 

Trong quá trình viết code nói chung, có những nguyên tắc khá phổ biến như là `If It Is Working Dont Change`, `If It Aint Broke Dont Fix It`... nghĩa là nếu code đã chạy rồi mà không có yêu cầu thay đổi logic thì đừng động vào nữa, bạn sẽ mất thời gian kiểm thử cho một giải pháp chưa hẳn đã tốt hơn thay vì thay vì dành effort cho những task khác ở trong một `Agile Sprint`. 
Nếu `Refactoring` là một `AmeliorationPattern`, thì hai nguyên tắc `IIIWDC`, `IIABDFI` nêu trên đều là những `AntiPattern`.

> Amelioration Pattern.... là những design pattern giúp bạn cải thiện mã nguồn trở nên tốt hơn, dễ bảo trì, mở rộng.
> 
> Anti Pattern...  là những design pattern được xem là bad practice, nên tránh khi viết code.

Và để `Refactoring` một cách hiệu quả, chúng ta cần có những cách tiếp cận đúng đắn và việc đầu tiên đó chính là (nên) nắm rõ/tuân thủ những điều sau: 
1. Keep it simple (**KISS principle**).
2. Refactoring từng bước nhỏ (Small Step).
3. Không refactoring cùng lúc với việc thay đổi functionality của code. Điều này giúp hạn chế sai sót trong quá trình phát triển và việc revert code sau này cũng dễ hơn rất nhiều.
4. Tuân thủ nguyên lí đơn nhiệm (**Single responsibility principle**). Khi mỗi class, mỗi method chỉ làm đúng một việc thì kết quả là chúng ta chỉ có một lý do để thay đổi. Sự thay đổi sẽ dễ dàng được kiểm soát.
5. Loại bỏ duplicate code - **Don't repeat yourself**. 
6. Sử dụng self-documenting code - nếu bạn cần comment để giải thích flow của code thì có nghĩa rằng code bạn viết chưa đủ tốt và rõ ràng. **Code Tells You How, Comments Tell You Why**. Xem thêm:
    - [The Real Purpose of Comments in Code](https://www.cognizantsoftvision.com/blog/never-use-comments-in-code-because-it-should-speak-for-itself-right/)
    - [Stackoverflow blog- Best practices for writing code comments](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/)
7. Code phải dễ hiểu, đọc vào là có thể hiểu ngay được. 
8. Sử dụng abstraction. Ngôn ngữ bậc cao thì dễ hiểu hơn ngôn ngữ bậc thấp. 
9. Refactoring là một quá trình cải tiến liên tục chứ không chỉ đơn thuần là việc đọc ở đâu đó một vài refactoring pattern rồi ốp thẳng vào code. Mỗi lần chúng ta gặp lại những đoạn code mà mình từng viết, chúng ta nhận ra một vài nhược điểm mà có thể tái cấu trúc lại tốt hơn. Rồi chúng ta tái cấu trúc nó và cứ tiếp tục như vậy. Đến cuối cùng có thể chúng ta sẽ không có được refactoring pattern tốt nhất, nhưng sau nhiều lần cải tiến với việc nắm rõ được ưu và nhược điểm của nhiều loại refactoring pattern, chúng ta có thể  thay đổi linh hoạt dựa trên yêu cầu được đặt ra.
10. Hãy viết những đoạn code mà ai cũng có thể maintain được.

Tóm tắt những nguyên tắc trên (gọi là nguyên tắc nhưng nguyên tắc nào cũng có những exceptional case) trên bằng một câu nói của **John Byrd**:
> "Good programmers write good code. Great programmers write no code. Zen programmers delete code.”

Đây là một cách in ra **Hello world** với gần [150 dòng code trong `Java`](https://gist.github.com/lolzballs/2152bc0f31ee0286b722?fbclid=IwAR0pYJJhJ974fRCVKuj2bDTNCzCjUeuQfPWGV9BfhusojTZVrqP3vsUKl4Y), tất nhiên là mình chưa thấy ai làm thế bao giờ cả. Thế nhưng trong thực tế thì sẽ có nhiều lúc mà chúng ta đã và đang làm phức tạp hóa, over-engineering nhiều vấn đề đơn giản khác.


![image.png](https://images.viblo.asia/2127ed50-ac34-4a64-8eed-ada86f9596ea.png)

Có thể code sau khi refactor sẽ "tệ hơn" lúc ban đầu, nhưng không sao cả, có lẽ cách nhanh nhất để trở nên thông thạo refactoring đó chính là liên tục mắc sai lầm và học hỏi ngay từ sai lầm trước đó. OK, let's do refactor then push it to master branch. Getting fired or getting better? Go big or go home? 😂😂 (just for fun).

![image.png](https://i.imgur.com/GG3Y0gV.gif)

Refactoring madness.
![image.png](https://images.viblo.asia/51871d6a-9e5a-447f-b023-cdd50e7c9fae.png)

## 2. Khi nào thì refactor code?
Khi bạn tìm ra cách sắp xếp lại code một cách rõ ràng, dễ hiểu hơn và nhiều cái hơn khác mà không làm thay đổi luồng chương trình. Bạn cần đảm bảo rằng những lập trình viên khác cũng cảm thấy như vậy (Pair-refactoring).
## 3. Khi nào thì không refactor code?
1. Khi refactor một mình. Trong ngày không phải lúc nào bạn cũng tỉnh táo. Không phải bao giờ cũng có thể hoàn toàn tin tưởng bản thân.
2. Khi bạn refactor song song cùng việc implement feature, fix bug....

## Tools
- [Sonarlint](https://plugins.jetbrains.com/plugin/7973-sonarlint)
- Đôi khi cách để có `good code` chỉ là làm sao tránh được [`bad code`](https://rules.sonarsource.com/java/RSPEC-5869) nhiều nhất có thể.
### References
- [Khi nao refactor code](https://viblo.asia/p/khi-nao-refactor-khi-nao-code-1VgZv0dO5Aw)
- [Refactoring principle](https://myadventuresincoding.wordpress.com/2010/07/03/refactoring-principles/)
- [The Real Purpose of Comments in Code](https://www.cognizantsoftvision.com/blog/never-use-comments-in-code-because-it-should-speak-for-itself-right/)
- [Best practices for writing code comments](https://stackoverflow.blog/2021/12/23/best-practices-for-writing-code-comments/)
- [Zen programmer](https://www.zenprogrammer.org/en/10-rules-of-a-zen-programmer.html)
- [The Devil’s Dictionary of Software Design](https://medium.com/young-coder/the-devils-dictionary-of-software-design-8f4fab207808)