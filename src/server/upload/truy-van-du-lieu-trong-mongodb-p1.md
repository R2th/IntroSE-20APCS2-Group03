Như trong bài viết trước mình đã giới thiệu  basic nhất về mongodb với các bạn. Tiếp tục  công cuộc tìm hiểu về Mongo. Chúng ta sẽ cùng nhau tìm hiểu về  các query trong mongoDB (go)

 **1. Find, FindOne**
  
  Thay vì dùng câu  SELECT như  trong SQL , trong MongoDB chúng ta sẽ  sử dụng phương thức find để truy vấn dữ liệu  với các tham số cần truy vấn.
  
  **Cú pháp** : *db.collection_name.find()*
  Khi không truyền vào tham số bên trong hàm find() thì nó sẽ lẩy ra tất cả document có  bên trong của collection đó. 
  Trong bài trước mình đã tạo 1 collection users. bây giờ mình sẽ thức hiện các thao tác truy  vấn trên đó.
  
  ```js
  db.users.find(); 
  ```
  ![](https://images.viblo.asia/ec721490-c35a-45fd-8b2b-c890446bccd8.png)
  kết quả về tương tự như khi chúng ta sử dùng 
   ```sql 
   SELECT * FROM  users.
   ```
   Nếu bạn chỉ muốn lấy ra một bản ghi duy nhất thì chúng ta sử dụng findOne. nó sẽ trả về cho chúng ta document đầu tiên.
    ```js
    db.users.findOne()
    ```
   ![](https://images.viblo.asia/236235db-a012-4a64-95d3-16956879d3bc.png)
    
  Định dạng kêt quả trả về dạng json vs pretty()
  ```js
  db.users.find().pretty()
  ```
  ![](https://images.viblo.asia/75b3b705-eb24-4584-84a7-9659ab9bc440.png)
  
  **2. Truy vấn  dạng có điều kiện** 
  
 **Cú pháp** : *db.collection_name.find(query, projection)*
 
  Trong đó :
  
  *collectionname* : là tên collection của bạn.
  
  *query* :  không bắt buộc.  chỉ định những điều  kiệu chúng ta muốn
  
  *projection* : không bắt  buộc. Chỉ định các trường để trả về trong các tài liệu khớp với query  trên, nếu  projection rỗng thì trả về tất cả các trường.
  
có dạng  { field1: <value>, field2: <value> ... }
    
 value có thể là bất kì sau đây 
*      1 hoặc true để trả về  trường đó
*     0 hoặc false để loại  trường đó
*      toán tử projection khác
  

  Mình muốn lấy ra những user có *name* là thu  
    
    ```js
      db.users.find({name: 'thu'});
    ```
   ![](https://images.viblo.asia/71fe28e3-be25-4d92-a87b-0acd0506c734.png)
    
   Hoặc mình chỉ muốn lấy một số tường  trong collection.
    
    ```js
    ad.users.find({}, {name :1, email:1});
    ```
   kết quả sẽ trả về mảng các document mỗi document là một object có _id, name, email. vì _id sẽ mặc định có trong kết quả trả về, nếu bạn không muốn _id xuất hiện thì chỉ cần thếm vào projection _id : 0. 
    ![](https://images.viblo.asia/df992507-c3e8-4ce3-aef3-759441865f78.png)
    
    **sort()**
    
    method sort  trả về các doccument trong collection được sắp xếp  tăng dần theo 1 trường  của collection . sort() tương ứng  với SQL.ORDER BY
    ```js
    db.users.find().sort({name:1});
    ```
    ![](https://images.viblo.asia/2f81ac65-10f4-4cd6-b358-23ccb9f658fc.png)
    
  **limit()**
    
    method limit() giới hianj số lượng document trong  kết quả trả về.
    ```
    db.users.find().limit( 2 )
    ```
    ![](https://images.viblo.asia/01a3fc9b-ebd0-4648-a927-7d6ab7b0da9a.png)
    
    **skip()**
    
    method skip()  dùng để lấy ra số document trong kết quả từ vị trí thừ bao nhiêu và  bỏ qua các document trước bị trí đó
    ```js
    db.users.find().limit(2).skip(2)
    ```
    ![](https://images.viblo.asia/8464231f-fd12-4a2c-902d-83d15176d22e.png)
    
    Chúng ta thường sử dụng skip kết hợp với limit để phân trang từ sever trả về.
    ví dự như khi mình muốn phân trang lấy  trang lấy ra 10 document trả về 
    ```js
    db.users.find().limit(n).skip(n*page)
    ```
  *n là giới hạn số phần tử trả về
    page là trang hiện tại của bạn

#   3. Một số toán tử   truy vẫn so sánh trong MongoDB                                                                                                                                                                                                                                                                               
**$eq**    trả về các document trong đó giá trị  bằng với một giá trị được chỉ định
    
   *cú pháp* : 
    ```
   { <field>: { $eq: <value> } }
    ```
    
**$gt**  trả về các document trong đó giá trị của trường  một giá trị được chỉ định
    
 *cú pháp* : ``` {field: {$gt: value} }```
    
**$gte**  trả về các document trong đó giá trị của trường lớn hơn hoặc bẳng 1 giá trị được chỉ định
    
*cú pháp* : ```{field: {$gte: value} }```
    
 **$in**   trả về các document trong đó giá trị nằm trong mảng  được chỉ định
    
 *cú pháp* :  ``` { field: { $in: [<value1>, <value2>, ... <valueN> ] } }```
    
 **$lt** so sánh các giá trị nhỏ hơn giá trị được chỉ định
    
  *cú pháp* :  ```{field: {$lt: value} }```
    
  **$lte** so sánh các giá trị nhỏ hơn một giá trị được chỉ định
    
   *cú pháp* :  ```{ field: { $lte: value} }```
    
  **$ne** so sánh các giá trị không bằng giá trị được chỉ định
    
  *cú pháp* :  ```{field: {$ne: value} }```   
    
  **$nin** lấy ra các giá trị không có trong mảng được chỉ định
    *cú pháp* :  ```{ field: { $nin: [ <value1>, <value2> ... <valueN> ]} }```
    
# 4. Truy vấn nhiều điều kiện trong MongoDB
 MongoBD   có hỗ trợ chúng ta truy vẫn nhiều diều kiện  trong 1 lần khai báo  với các toán tử AND, OR như trong SQL.
    
  **$and**
 - thực hiện một logic AND hoạt động  trên một mảng của một hoặc nhiều biểu thức và chọn ra các tài liệu đáp ứng tấy cả các biểu thức trong mảng.
cú pháp : 
    ```js
    { $and: [ { <expression1> }, { <expression2> } , ... , { <expressionN> } ] }
    ```
ex : 
    ![](https://images.viblo.asia/9276c897-8baf-4f6c-91ec-13db34fcda01.png)
    
  Truy vấn này sẽ chọn tất cả document trong collections user thỏa mãn điều kiện: 
    
   *các trường age có giá trị không bằng 20 và các   trường price tồn tại.*
    
  Truy vấn and với nhiều expressions cùng thực hiện
   
   ![](https://images.viblo.asia/a8a25a40-a514-4170-9be2-b23a0858d019.png)
    
  Truy vấn này sẽ chọn ra tất cả document trong đó: 
 *   các trường age có giá trị bằng 20 hoặc 21
    các trường nme có giá trị  băng thuthu hoặc phone_number = 12341234123*
# 5.Kết Luận
 Qua bài viết trên hi vọng rằng các bạn có thể nắm được một số câu lệnh lấy ra dữ liệu trong Collection cơ bản rồi. Trong phần tiếp theo mình sẽ tiếp tục giới thiệu đến các aggregation, Populate ...
    
Nguồn tham khảo  https://docs.mongodb.com/