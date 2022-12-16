### **1/ Mục đích ứng dụng của việc thiết lập Priority cho Test case:**

Trong thực tế  khi thực hiện chạy test case, sẽ có những test case cần phải được thực hiện trước các test case khác, bởi nó là output cho các test case sau. Nếu không thực hiện theo trình tự thì các test case sau sẽ bị Failed.
Mình sẽ đưa ra một ví dụ cho các bạn dễ hiểu:

- Bạn cần phải thực hiện Login trước khi thực hiện mua hàng trên Stores. Vì vậy bạn phải thực hiện chạy test case đăng nhập trước khi thực hiện các test case mua hàng trên stores. Nếu không thực hiện Login trước thì chắc chắn bạn sẽ không thực hiện mua hàng được.

Để có thể giải quyết vấn đề này thì mình sẽ giới thiệu với các bạn một ứng dụng mới của TestNG framework này đó là hỗ trợ chúng ta việc thiết lập về Priority cho test case, giúp ta thiết lập thứ tự thực thi test case.

### **2/ Set Priority cho Test case:**

Đầu tiên chúng ta hãy xem nếu không set priority cho test case, thì các test case sẽ thực thi theo thứ tự như thế nào?

Ở đây mình có 4 test case:

![](https://images.viblo.asia/89ba5bf7-e2ef-48d9-9ec9-67e27cd44801.png)

Chúng ta có 4 test case  với 4 method theo thứ tự ban đầu như sau:

- `c_loginWithUsernameBlank();`
- `a_loginWithInvalidAcount();`
- `b_loginWithValidAcount();`
- `d_loginWithPasswordBlank();`

Nếu không set priority cho các test case này, thì khi thực thi chúng ta sẽ được kết quả như sau:

![](https://images.viblo.asia/0b6f50b3-fab3-4f97-9509-c7c3854e0bab.png)

Từ kết quả trên, chúng ta có thể thấy được, nếu không set priority cho test case thì các test case sẽ được thực thi theo thứ tự alphabel của tên method, kết quả nhận được là:
- `a_loginWithInvalidAcount();`
- `b_loginWithValidAcount();`
- `c_loginWithUsernameBlank();`
- `d_loginWithPasswordBlank();`

Tiếp theo mình sẽ chỉ cho các bạn 2 cách để có thể set priority, thiết lập thứ tự thực hiện test case mà TestNG framework hỗ trợ:

***2.1/ Sắp xếp thứ tự thực thi test case trong file testng.xml:***

Trong phần config `testng.xml` file, mình sẽ sắp xếp thứ tự thực thi các test case như trong hình dưới:

Sử dụng cặp tag `<method>` và `<include>`

![](https://images.viblo.asia/2f818e82-26dd-43c4-a972-7a9790f4e233.png)

Kết quả sau khi thực thi sẽ như sau:

![](https://images.viblo.asia/a06c1676-fb08-4f98-9717-2ba11e407734.png)

Ở kết quả trên chúng ta thấy được là, test case sẽ thực thi theo thứ tự chúng ta đã set ở trên. Method `d_loginWithPasswordBlank();` sẽ có priority cao nhất và method `c_loginWithUsernameBlank();` sẽ có priority thấp nhất nên sẽ thực hiện sau cùng.

***2.2/ Sử dụng thuộc tính "priority":***

TestNG framework hỗ trợ cho chúng ta một thuộc tính là "priority" để hỗ trợ chúng ta trong việc set priority cho test case:

Chúng ta sẽ set priority cho test case như trong hình:

![](https://images.viblo.asia/61fc040b-3fe0-44e7-bd69-70faeab6c777.png)

Chúng ta sẽ set priority theo thứ tự sau:

```
// Testcase01
@Test(priority = 2)
public void c_loginWithUsernameBlank() throws InterruptedException { }
```

```
// Testcase02
@Test(priority = 4)
public void a_loginWithInvalidAcount() throws InterruptedException { }
```

```
// Testcase03
@Test(priority = 1)
public void b_loginWithValidAcount() throws InterruptedException { }
```

```
// Testcase04
@Test(priority = 3)
public void d_loginWithPasswordBlank() throws InterruptedException { }
```

Kết quả thực hiện sẽ như bên dưới:

![](https://images.viblo.asia/0a192a7d-bcf4-40a2-8589-66df13e791da.png)

Với kết quả trên, chúng ta có thể thấy được là với Testcase03 method `b_loginWithValidAcount();` được set thuộc tính `priority = 1` nên sẽ được ưu tiên thực thi trước. Tiếp theo sẽ lần lược là Testcase 01 method  `c_loginWithUsernameBlank();` và Testcase04 method `d_loginWithPasswordBlank();` được thực hiện. Cuối cùng Testcase02 method `a_loginWithInvalidAcount();` sẽ được thực thi cuối cùng do có giá trị `priority = 4`

Ở đây mình có một lưu ý với các bạn như sau:

- Nếu như các bạn set priority cho 2 method có giá trị như nhau thì sẽ như thế nào?

![](https://images.viblo.asia/b5559483-b9b8-4f8e-8113-1db7306a3f0e.png)

Ở đây mình sẽ set priority cho cả 2 method là `c_loginWithUsernameBlank();` và  `a_loginWithInvalidAcount();` đều có giá trị là 2

Vậy khi thực thi, thì sẽ ưu tiên thực thi theo giá trị priority được set trước, nếu 2 method có cùng giá trị priority thì sẽ thực thi theo thứ tự alphabel. Vì vậy khi thực thi thì chúng ta được kết quả như sau:

![](https://images.viblo.asia/2cc83c6e-0dfa-40af-b3e1-7ab889adf200.png)

Chúng ta có thể thấy được tuy 2 method  `a_loginWithInvalidAcount();` và `c_loginWithUsernameBlank();` chung priority là 2 nhưng method `a_loginWithInvalidAcount();` sẽ được thực thi trước.

**3/ Kết luận:**

Việc thiết lập thứ tự thực thi test case sẽ rất phố biển trong các dự án automation. Trên đây mình đã chỉ cho các bạn các cách để có thể thiết lập lập thứ tự thực thi test case.
Ngoài ra TestNG còn hỗ trợ  thuộc tính `dependsOnMethods` cũng cho phép chúng ta thực hiện việc thiết lập thứ tự thực thi test case. Các bạn có thể tự tìm hiểu thêm ở các bài viết tương tự trên mạng.

Cảm ơn các bạn đã theo dõi bài viết của mình.

*Tham khảo:* 

https://www.ontestautomation.com/running-your-tests-in-a-specific-order/

https://www.guru99.com/test-case-priority-testng.html