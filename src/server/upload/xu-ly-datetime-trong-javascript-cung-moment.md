![](https://images.viblo.asia/f7bd7576-7e58-4309-b578-d5bc92007322.png)


Moment là 1 thư viện xử lý datetime cực kỳ mạnh mẽ do cộng đồng viết ra. Hầu hết các xử lý datetime giờ đây sẽ trở lên dễ dàng hơn bao giờ hết với supper library này. Trong phạm vi bài viết này mình sẽ chỉ lược liệt kê một số hàm thông dụng thông qua danh mục dưới đây.




### 1: Parse: Các cú pháp phân tích của momment

  moment(): lấy ra tiêu chuẩn, ngày, giờ, năm, tháng hiện tại
    Các value bên trong của moment(): (Giả sử lúc này mình đang test là 2018-12-24 , lúc 14:33 hoặc 34 gì đó)
    
   **a. String và String + Format và String + Formats, Special + Formats**
   
*  String: var day = moment("1995-12-25"); => tạo ra 1 moment với định dạng chuẩn YYYY-MM-DD    
*  String + Format: Định dạng theo chuẩn quy định

   ví dụ: moment("12-25-1995", "MM-DD-YYYY");
*  String + Formats: Định dạng theo nhiều chuẩn, sử dụng khi bạn chưa biết nó là định dạng gì, đây gọi là kiểm tra nhiều định dạng phù hợp: 
  
     ví dụ: moment("12-25-1995", ["MM-DD-YYYY", "YYYY-MM-DD"]);
* Special + Formats: Định dạng chuẩn thời gian
            
    ví dụ: moment("2010-01-01T05:06:07", moment.ISO_8601);
    
 **b. Array**
 
*  Tạo 1 momment với các tham số truyền vào: ví dụ: moment([2010, 1, 14, 15, 25, 50, 125]);
* Nếu chỉ có tùy chọn năm được lựa chọn thì => các tùy chọn còn lại sẽ lấy giá trị nhỏ nhất
* Ví dụ:
  
  moment([2010]);        // January 1st  => ngày 1 tháng 1 (do ko có ngày và tháng truyền vào => lấy ngày tháng nhỏ nhất trong năm)
                  
  moment([2010, 6]);     // July 1st => ngày mùng 1 (lấy ngày nhỏ nhất trong tháng)
                 
  moment([2010, 6, 10]); // July 10th
  
 **c: Momment validation  (isValid)**
 
   Validation: kiểm tra tính hợp lệ của chuỗi ngày tháng truyền vào,  sử dụng để xác định kiểu hợp lệ của chuỗi datetime, có rất nhiều kiểu xác định, dưới đây là chi tiết và demo tương ứng
*    moment("2010 13",     "YYYY MM").isValid();     // false (do tháng ko thể là 13)
* moment("2010 11 31",  "YYYY MM DD").isValid();  // false (do tháng 11 không có ngày 31)
* moment("2010 2 29",   "YYYY MM DD").isValid();  // false (do tháng 2 năm 2010 không có ngày 29)
* moment("2012 2 29",   "YYYY MM DD").isValid();  // true (do tháng 2 năm 2012 là năm nhuận => có ngày 29)
* moment("2010 12",     "YYYY MM").isValid();     // true (dữ liệu tháng 12 là hợp lệ)
* moment("2010 12",     "YYYY MM DD").isValid();  // true (vẫn là true vì năm và tháng hợp lệ, khuyết DD cũng không sao)
* moment("2010 12",     "YYYY MM DD", true).isValid();  //false (khi để true này thì bắt buộc chuỗi phải hợp lệ hết ms được)
* moment('It is 2012-05-25', 'YYYY-MM-DD').isValid(); //true (Do tồn tại chuỗi hợp lệ)
* moment('It is 2012-05-25', 'YYYY-MM-DD', true).isValid(); //false (chuỗi có chứa thông tin ko hợp lệ)
* Khi bạn không biết datetime từ client truyền lên là định dạng gì: YYYYMM-DD hay YYYY/MM/DD hay YYYY-DD-MM, vậy thì với moment bạn chỉ cần lam việc vơi nó hết sức đơn giản bằng 1 mảng định dạng
                  Moment("2010 12",[“YYYY MM DD”, “YYYY-MM-DD”, “YYYY/MM/DD hh”]).


### 2: Get-Set: Lấy ra các giá trị và set vào các giá trị cho moment


* Moment().<type_time>():  Lấy ra thời gian hiện tại tương ứng với từng kiểu đề xuất <type_time> <=>  mili giây, giây, phút và giờ 
* Moment().<type_time>(Number) : set giá trị thời gian cho đối tượng moment


### 3: Manipulate : Vận dụng


*Demo: moment().add(7, 'days').subtract(1, 'months').year(2009).hours(0).minutes(0).seconds(0);*



* **Add**: là lệnh để cộng thêm 1 thời gian cụ thể vào moment. Cú pháp moment().add(Number, Option <String>)
 
 
  Ví dụ: moment().add(7, ‘days’)  à cộng thêm vào ngày hiện tại 7 ngày nữa ngoài ra còn có thêm các tùy chọn thay cho ‘days’ như (years  -    y,
quarters   -   Q,
months     -  M,
weeks       -   w,
days       -     d,
hours      -    h,
minutes   -    m,
seconds    -   s,
milliseconds      -      ms)


* **Subtract**: là lệnh cộng thêm 1 khoảng thời gian chỉ định cho moment. Cú pháp moment().subtract(Number, Option <String>), option và cách hoạt động tương tự như của add

* **endOf**: lấy thời gian cuối cùng theo day, week, month, year
* **startOf**: tương tự như endOf nhưng là thời gian bắt đầu

### 4: Tổng hợp một số hàm tiện ích qua ví dụ


 Dưới đây mình có tổng hợp 1 số hàm ví dụ để các bạn có một số cái nhìn trực quan khi làm việc với moment
 
*  Moment().toString(): return => "Sat Dec 24 2016 14:33:43 GMT+0700"
* Moment().toISOString(): return => "2016-12-24T07:34:06.388Z"
* Moment()._d: return => Sat Dec 24 2016 14:33:43 GMT+0700 (SE Asia Standard Time)  (ó new Date())
* Moment().unix(Date.now() || Number): Sinh ra chuỗi timestamp hiện tại hoặc
* Moment().month()
* moment() : trả ra đối tượng thời gian
* moment().toDate(): trả ra chuỗi thời gian format theo GMT
* moment().toDate().valueOf(): gửi về chuỗi timestamp (đại lại là chuỗi số 13 ký tự,)
* moment().month(): lấy ra tháng hiện tại
* moment().year(): lấy ra năm hiện tại
* moment().year(Number): set năm cho
 
###    5. Plugin


  Các plugin phổ biến bạn vui lòng xem thêm tại: http://momentjs.com/docs/#/plugins/ để làm việc với các plugin này
  
  
  

-----


  
  *Trên đây là một số cách làm việc cơ bản với moment. Bạn có thể xem thêm rất nhiều tiện ích khác từ thư viện này tại trang chủ của họ. Mình hi vọng bạn sẽ thích khi làm việc với thư viện tiện ích này. Comment bên dưới những điều bạn chưa hiểu và cho mình biết thêm những ý kiến đóng góp từ các bạn nhé!*