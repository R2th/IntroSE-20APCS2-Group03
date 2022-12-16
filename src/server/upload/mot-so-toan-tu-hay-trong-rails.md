## 1. Toán tử && và cách sử dụng trong ruby

*  Đầu tiên, có lẽ đây là toán tử mà hầu như tất cả các lập trình viên đều đã từng sử dụng kết hợp với các câu lệnh điều kiện để trả ra kết quả mong muốn.


    ```
        class AccountActivationsController < ApplicationController
      def edit
        user = User.find_by email: params[:email]

        if user && !user.activated? && user.authenticated?(:activation, params[:id])
          user.activate
          log_in user
          flash[:success] = t ".account_activated"
          redirect_to user
        end
      end
    end
    ```

* Trong hàm edit ở trên chúng ta kiểm tra nếu kết quả 3 điều kiện trên đều trả về true thì sẽ thực hiện các câu lệnh tiếp theo. Với cách này thì chúng ta ai cũng đã sử dụng nhưng ở đây, mình muốn nói đến 1 cách sử dụng khác của nó.

* Như chúng ta biết trong ruby luôn trả về giá trị cuối cùng trong 1 hàm và với cách hoạt động của toán tử && có thể sử dụng nó để trả về giá trị mong muốn. Mình sẽ lấy luôn ví dụ đơn giản ở bên dưới nhé.

    ```
        class Test 
          def Test.test a, b
            a && b
          end
        end

          a = 3
          b = 2

      print Test.test a, b        #: 2

        a = nil

      print Test.test a, b        #: nil
    ```
    
*  Trong ví dụ trên, trường hợp đầu tiên a = 1,  b = 2 với mặc định 1 object không phải nil thì sẽ trả về true <=> true && true. Toán tử && sẽ duyệt qua tất cả các  điều kiện tiếp theo nếu điều kiện trước là true và sẽ dừng việc duyệt khi gặp 1 điều kiện trả về false. đồng thời trả về giá trị của đối tượng đó. vì vậy nếu tất cả đều là true thì nó sẽ trả về giá trị của đối tượng cuối cùng hoặc nếu bạn muốn lấy ra giá trị của 1 đối tượng trả về false thì cũng có thể sử dụng nó. Cách sử dụng trên có thể giúp giảm thiểu số lượng code và hiệu năng nếu chúng ta biết áp dụng đúng cách.

## 2. Toán tử || và cách sử dụng
##   
* Giống với toán tử && ở trên, nếu sử dụng như cách bình tường thì trong chúng ta ai cũng đã dùng nhưng để sử dụng nó như toán tử && ở trên thì chúng ta phải hiểu được cách nó hoạt động để có thể lấy ra giá trị chúng ta mong muốn và giúp code ngắn gọn hơn. Sau đây mình sẽ đi thẳng vào ví dụ đơn giản để chúng ta xem được cách hoạt động của nó.

    ```
         class Test 
          def test a, b, c
            a || b || c
          end
        end

        t = Test.new
          a = nil
          b = nil
          c = 3
      print t.test a, b, c      # 3
          a = nil
          b = 2
          c = 3
      print t.test a, b, c      # 2
    ```

*    Ở trên chúng ta thấy lúc đầu kết quả trả ra là 3 và lúc sau là 2, giống như cách mà toán tử && vẫn sử dụng cách mà duyệt qua true và false nhưng toán tử || sẽ lập tức trả về giá trị của đối tượng nếu đối tượng đó tồn tại hay nói cách khác là trả về true. Nếu gặp đối tượng trả về false thì nó sẽ vẫn tiếp tục duyệt tiếp đến khi gặp được đối tượng trả về true và return ra đối rượng đó. 

## 3. Toán tử === (Case equality)

*  như tên gọi của nó, === là so sánh dạng case. Các điều kiện của case sẽ đc implement với mỗi class tương ứng, nó thường được sử dụng để so sánh các chuỗi. Dưới đây mình sẽ lấy 1 vài ví dụ.

    ```
        (1..5) === 3           # => true
        (1..5) === 6           # => false
        Integer === 42          # => true
        Integer === 'fourtytwo' # => false
        /ell/ === 'Hello'     # => true
        /ell/ === 'Foobar'    # => false
        "a" === "b" # false # different values, different objects
        "a" === "a" # true # same values
    ```
    
      
     Cũng giống với phép ==, === cũng sử dụng để so sánh giá trị chứ không phải là so sánh object có điều nó dùng case để so sánh. Mỗi đối tượng hợp lệ với case sẽ đều trả về true
 
##  4. Toán tử |= 

* Trong phép toán a |= b có 1 sự hiểu nhầm không hề nhẹ với các bạn mới học ruby đó là phép toán` a |= b` <=> `a = a||b`, nhưng thực sự thì ` a |= b`nó tương đương với  `a || a = b` .
 Mình sẽ lấy 1 ví dụ đơn giản như sau.

     ```
    a = nil
    b = 20
    a ||= b
    a        # => 20
    ```

     ```
    a = 1
    b = 20
    a ||= b
    a        # => 1
    ```
    nghĩa là nó sẽ sử dụng cách hoạt động của phép || để gán giá trị cho biến a nếu a nil thì sẽ gán a = b và return còn a.nil? = false thì sẽ trả về luôn giá trị của a. 


    Trên đây là 1 chút chia sẻ của mình để có thể giúp đỡ các bạn mới khi học về ngôn ngữ ruby. Mong rằng nó có thể giúp ích cho các bạn!