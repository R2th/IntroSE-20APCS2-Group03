![](https://images.viblo.asia/022a53e6-bb37-43fc-b627-e4fa653219f1.jpg)

Regex là một công cụ mạnh mẽ được sử dụng nhiều trong lập trình. Những lợi ích của regex mang lại là điều không cần bàn cãi. Nhưng bên cạnh lợi ích mà regex mang lại thì nó cũng tồn lại một lỗ hổng cho phép tấn công lại server của ta.

Trong bài [Tấn công DoS](https://viblo.asia/p/tan-cong-dos-RnB5p31wlPG) đã nêu ra một vài phương thức tấn công DoS lên server. Và trong bài này sẽ nói thêm về cách tấn công DoS lên server nhưng theo kỹ thuật khác với các kỹ thuật đã nêu ra ở bài trên.

# Từ chối dịch vụ dựa vào regular expression

Thuật toán Regular Expression naïve dựa trên [Automat hữu hạn không đơn định (Nondeterministic finite automaton - NFA)](https://en.wikipedia.org/wiki/Nondeterministic_finite_automaton). Automat hữu hạn không đơn định hoạt động bằng cách ứng với một cặp trạng thái hiện tại và ký tự đang nhìn bào tưng ứng ($q_{0}, a_{1}$) thì nó có thể chuyển sang trạng mới. Automat sẽ lặp và dừng lại cho đến khi kết thúc chuỗi đầu vào.

> Tìm hiểu thêm tại: [Giáo trình OTOMAT](https://fita.vnua.edu.vn/wp-content/uploads/2013/06/Giaotrinh_OTOMAT_Ch3.pdf)
> 

**R**egular **e**xpression **D**enial of **S**ervice, hay ReDoS, là một kỹ thuật tấn công từ chối dịch vụ dựa vào lỗ hổng của regex. Kẻ tấn công khi xác định được một regex chứa lỗ hổng hắn sẽ gửi một chuỗi đặc biệt để khiến server mất nhiều thời gian xử lý regex.

## Regex chứa lỗ hổng
Regex ứng dụng NFA để tìm chuỗi thỏa mãn với patern đã cho trước. Regex sẽ lặp lần lượt đến khi tìm được kết quả trùng khớp với patern. Một regex chứa lỗ hổng nếu nó mất nhiều thời gian để xử lý chuỗi đầu vào độc hại.

Biểu thức regex tồi (evil regex):
* Chứa một nhóm lặp
* Lặp lồng nhau

Ví dụ:
* (a+)+
* ([a-zA-Z]+)*
* (a|aa)+
* (a|a?)+
* (.*a){x} for x \> 10

## Khai thác ReDoS

Để hiểu rõ hơn về kỹ thuật tấn công này, ta cùng phân tích ví dụ để hiểu được cách hoạt động của regex cũng như cách thức thác lỗ hổng.

```
^(a+)+$
```

Với regex có chứa lỗ hổng trên, kẻ tấn công sẽ gửi một chuỗi đặc biệt để tấn công DoS server.

> aaaaaaaaaaaaaaaa **!**
> 

Đầu tiên, regex khớp chuỗi với biểu thức con **(a+)**. Biểu thức sẽ khớp tất cả các chuỗi lặp lại ít nhất một lần chứa ký tự "a".

```text
(aaaaaaaaaaaaaaaa)!
```

Tiêp theo, regex sẽ khớp ký tự kết thúc chuỗi **$**. Nhưng không có chuỗi nào khớp do kết thúc chuỗi của ta là ký tự **"!"**. Do không có cái nào khớp,  toán tử **+** sẽ giảm dần số lần lặp và quay lui chuỗi.

```text
(aaaaaaaaaaaaaaa)(a)!
```

Bây giờ biểu thức **(a+)** có 2 nhóm trùng khớp, và regex lại tiếp tục khớp với ký tự kết thúc chuỗi nhưng không có kết quả nào trùng khớp cho ký tự **"!"**. Việc tính toán lại tiếp tục quay lui. Tại đây, chuỗi có thể được khớp theo 2 cách: **(aa)** hoặc **(a)**. Regex sẽ thử trường hợp (aa) trước, nó sẽ thất bại do không khớp ký tự kết thúc chuỗi. Sau đó nó sẽ thử với nhóm (a)(a)

```text
(aaaaaaaaaaaaaa)(aa)!
(aaaaaaaaaaaaaa)(a)(a)!
```

Quá trình này sẽ lặp lại cho đến khi nhóm hết các chuỗi.

```text
(aaaaaaaaaaaaaaaa)
(aaaaaaaaaaaaaaa)(a)
(aaaaaaaaaaaaaa)(aa)
(aaaaaaaaaaaaaa)(a)(a)
(aaaaaaaaaaaaa)(aaa)
(aaaaaaaaaaaaa)(aa)(a)
(aaaaaaaaaaaaa)(a)(a)(a)
...
(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(aaa)
(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(aa)(a)
(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)(a)
```

Thời gian tính toán của regex phụ thuộc vào số lượng ký tự đầu vào.

Vậy là đã kết thúc rồi! 

> Bài chỉ được sử dụng cho việc nghiên cứu và học hỏi. Không mang đi gây hại!
> 

# Nguồn tham khảo
* [https://en.wikipedia.org/wiki/ReDoS](https://en.wikipedia.org/wiki/ReDoS)
* [https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS](https://owasp.org/www-community/attacks/Regular_expression_Denial_of_Service_-_ReDoS)
* [https://stackoverflow.com/questions/12841970/how-can-i-recognize-an-evil-regex](https://stackoverflow.com/questions/12841970/how-can-i-recognize-an-evil-regex)
* [https://medium.com/swlh/exploiting-redos-d610e8ba531](https://medium.com/swlh/exploiting-redos-d610e8ba531)