Chào các bạn!
Trong series này, mình sẽ hướng dẫn các bạn giải quyết các câu hỏi phỏng vấn về lập trình trong một số công ty lớn như Facebook, Google, Amazon, Microsoft, ... Nguồn câu hỏi được lấy từ trang web https://www.geeksforgeeks.org. 

Chúng ta cùng đến với những câu hỏi đầu tiên trong series này. Tập câu hỏi lần này được lấy từ https://www.geeksforgeeks.org/facebook-interview-set-1/ gồm hai câu hỏi:
1) Given a string, check if it is a palindrome by ignoring spaces. E.g. race car would be a palindrome.
2) Given two very large strings, consisting of only digits, multiply the two strings and return the result as a string.

Chúng ta cùng giải quyết nào!
# Câu hỏi 1: Kiểm tra xâu palindrome 
Câu hỏi chi tiết như sau: *Với đầu vào là một xâu, hãy xác định xem xâu đó có phải là xâu palindrome (là xâu mà đọc xuôi hay ngược các ký tự đều giống nhau) hay không, với điều kiện là không xét đến khoảng trắng trong xâu đầu vào.*

Ví dụ:  
* abcba : là xâu palindrome
* abcde : không là xâu paline
* race car: thực chất không phải là xâu palindrome, nhưng do đề bài không xét đến khoảng trắng trong dữ liệu đầu vào (racecar), nên xâu này vẫn thoả mãn yêu cầu của đề bài.

**Cách giải quyết bài toán**

Đây là một bài toán khá đơn giản!

*  Với xâu không có khoảng trắng ***str***, ở đây ta xét ký tự đầu tiên ở vị trí số 0 (giống với cách sử dụng của mảng trong C++), nhận thấy để xâu thoả mãn là xâu palindrome, mọi ký tự ở vị trí số ***i*** phải giống với ký tự thứ ***(n -1) - i*** (với n là tổng số ký tự), ví dụ xét xâu "***abcba***" có tổng số ký tự là 5, ta có:

    *  ký tự số ***0*** và ký tự số ***4*** ( = 5 - 1 - 0) đều là ký tự 'a'
    *  ký tự số ***1*** và ký tự số ***3*** ( = 5 - 1 - 1) đều là ký tự 'b'
    *  ký tự số ***2*** và ký tự số ***2*** ( = 5 - 1 - 2) đều là ký tự 'c'

    Nhận thấy khi kiểm tra sự giống nhau này, chúng ta không cần so sánh tiếp ký tự số ***3*** và ký tự số ***1***  bởi vì nó đã trùng với bước thứ hai, do đó chúng ta chỉ cần duyệt đến **n / 2**. Chi tiết như sau:
```
bool isPalindrome(string str) {
    int len = int(str.length());
    for (int i = 0; i < len / 2; i++) {
        if (str[i] != str[len - 1 - i]) {
            return false;
        }
    }
    return true;
}
```


* Với bài toán xâu xét đến cả khoảng trắng, cách đầu tiên mà chúng ta nghĩ đến là xoá hết khoảng trắng trong xâu, sau đó đưa về bài toán ở trên. Rõ ràng, với cách làm này, chúng ta cần phải duyệt tất cả các phần tử của xâu hai lần. Liệu rằng có cách nào để chỉ duyệt toàn bộ xâu một lần hay không? Có chứ!

    Ý tưởng để giải quyết bài toán này như sau: 
  
  * Chúng ta sẽ dùng hai biến làm chỉ số để duyệt từ hai đầu của xâu cho đến khi chúng gặp nhau:
      
      * Bước 1: Nếu gặp ký tự là khoảng trắng, tìm tiếp đến ký tự tiếp theo trong thứ tự duyệt cho đến khi gặp ký tự không phải là khoảng trắng.
      * Bước 2: Lúc này cả hai ký tự đều không phải là khoảng trắng, so sánh chúng:
          
          *  Nếu bằng nhau, trở lại bước 1 tìm và duyệt cặp tiếp theo
          *  Nếu không bằng nhau, trả về **false**
      *  Sau khi duyệt hết (đến khi chỉ số bên trái lớn hơn hoặc bằng chỉ số bên phải), nếu tất cả đều giống nhau, trả về **true**

Chi tiết code trong C++ như sau:

```
bool isPalindrome(string str) {
    int len = int(str.length());
    int left = 0; // duyet tu phan tu dau tien cua mang
    int right = len - 1; // duyet tu phan tu cuoi cung cua mang
    char blank = ' ';
    
    while (left < right) {
        while(str[left] == blank) left ++;
        while(str[right] == blank) right --;

        if (str[left] != str[right]) return false;
        left ++;
        right --;
    }

    return true;
}
```

Vậy là chúng ta hoàn thành câu hỏi số 1. Cùng đến với câu hỏi số 2 nào!

# Câu hỏi 2: Nhân hai số lớn chứa trong xâu
Câu hỏi chi tiết như sau: *Cho 2 xâu lớn chứa các chữ số, nhân hai xâu này và trả về kết quả là một xâu là kết quả của phép nhân đó.* 

Ví dụ:

*  10293783470129390112093801928312310923123123 x 96598787347209481209381829490981237120371 = 994367000429249036223391055519564094324729399668098328207967657208451011970404438633


Ý tưởng để giải quyết bài toán như sau:

Khá đơn giản, dựa theo cách nhân đã được học ở tiểu học như sau: Lấy lần lượt từng phần tử ở số thứ hai nhân với toàn bộ số thứ nhất, các kết quả thu được sẽ được cộng lại với nhau, như hình minh hoạ dưới đây:

![](https://images.viblo.asia/31f7d39f-d499-4cd9-83fa-a541d75caf4c.png)

```
string multiply(string number_1, string number_2)
{
    int size_1 = int(number_1.length());
    int size_2 = int(number_2.length());
    if (size_1 == 0 || size_2 == 0)
        return "0";
    
    int result_size = size_1 + size_2;
    vector<int> result(result_size, 0);

    int i_n1 = 0;
    int i_n2 = 0;
    
    for (int i = size_1 - 1; i >= 0; i--)
    {
        int carry = 0; // số để cộng vào hàng lớn hơn 10 lần hàng hiện tại (số đứng trước)
        int n1 = number_1[i] - '0';
        
        i_n2 = 0;
        
        for (int j = size_2 - 1; j >= 0; j--)
        {
            int n2 = number_2[j] - '0';
            int sum = n1 * n2 + result[i_n1 + i_n2] + carry;
            carry = sum / 10;
            // Store result
            result[i_n1 + i_n2] = sum % 10;
            i_n2++;
        }
        if (carry > 0)
            result[i_n1 + i_n2] += carry;
        
        i_n1++;
    }
    
    // lấy xâu kết quả
    int i = result.size() - 1;
    while (i >= 0 && result[i] == 0) i--;
    if (i == -1) return "0";
    string s = "";
    while (i >= 0) s += to_string(result[i--]);
    
    return s;
}
```

Giải thích một chút về code:

* size_1, size_2: là độ dài của hai xâu đầu vào
* result_size: độ dài tối đa của xâu kết quả, chắc chắn độ dài của xâu kết quả sẽ không lớn hơn độ dài của hai xâu đầu vào cộng lại (có thể dễ dàng nhận thấy và chứng minh được)
* result: vector chứa kết quả của phép nhân, vector này sẽ lưu trữ kết quả của phép nhân theo thứ tự ngược của xâu kết quả. Ví dụ như hàng đơn vị của kết quả sẽ nằm ở vị trí đầu tiên (hay là vị trí số 0: result[0]), hàng chục sẽ nằm ở vị trí thứ hai result[1], ...
* i_n1, i_n2: lưu vị trí từ phải sang của chữ số đang xét trong xâu. Ví dụ: i_n1 = 0 có nghĩa là chúng ta đang xét phần tử bên phải ngoài cùng của xâu thứ nhất, hay là hàng đơn vị của số thứ nhất. Nhờ dùng i_n1 và i_n2, chúng ta sẽ lấy được vị trí của ký tự cần điền vào trong xâu kết quả *result* bằng cách cộng *i_n1 + i_n2* 
* carry: phần dư để cộng vào số đứng trước, do mỗi vị trí chúng ta chỉ lưu được một số

Bài thứ hai ý tưởng tuy đơn giản nhưng code hơi phức tạp. Hi vọng các bạn có thể hiểu được :D.

Cám ơn các bạn đã theo dõi bài viết của mình! Trong quá trình viết bài không tránh khỏi sai sót, hi vọng các bạn có thể góp ý cho mình! Hẹn các bạn vào phần tiếp theo của series. Nhớ upvote ủng hộ mình nhé! Yolo!