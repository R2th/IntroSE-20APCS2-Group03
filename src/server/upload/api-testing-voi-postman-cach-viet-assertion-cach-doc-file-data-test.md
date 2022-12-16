### Cách viết Assertion
***I. Test trong postman***

* Nếu bạn muốn lấy thông tin chung của response, bạn lấy từ object `pm.response`. 

Ví dụ:
```
> pm.test("response is ok", () => {
>     // Check status code
>     pm.response.to.have.status(200);
>  
>     // Lấy thông tin headers
>     pm.expect(pm.response.headers.get("Date")).to.eql("Fri, 26 Mar 2021 13:57:56 GMT");
>  
>     // Xem thông tin object pm.response
>     console.log(pm.response);
> });
```
![](https://images.viblo.asia/fcb157c9-b7ca-4fe1-85ae-e8d25250edb7.png)
* Nếu bạn muốn lấy thông tin của body trong `pm.response`, bạn cần phải biến body thành json object, thông qua function `json()`

Ví dụ: 
```
> pm.test("test body", () => {
>      
>     // Biến body của response thành json object
>     const resData = pm.response.json();
>  
>     // Check value của key "dataTest"
>     pm.expect(resData.data.dataTest).to.eql("This is expected to be sent back as part of response body.");
>      
>     // Check type của value
>     pm.expect(resData.data.dataTest).to.be.a("string");
>  
> });
```
* Nếu muốn test các object của array, bạn cần 1 vòng `for` để có thể duyệt qua từng item của array. Bạn có thể dùng function của lodash `_.each(array_name, function)` để thực hiện việc for-each, thay vì viết vòng `for` truyền thống.
```
> pm.test("test array", () => {
>  
>     const resData = pm.response.json();
>     const arrayData = resData.data;
>      
>     _.each(arrayData, (item) => {
>         pm.expect(item.gender).to.be.oneOf(['male', 'female']);
>     })
>  
> });
```
![](https://images.viblo.asia/e33497d7-8504-45f8-b7b2-2a19dd049570.png)
***II. Phần mở rộng***
* Nếu bạn muốn skip test, bạn có thể dùng

```
> pm.test.skip("skip test", () => {
>      
> })
```
* Nếu bạn muốn skip test theo điều kiện, ví dụ: json không có field testData

```
> // Khi lấy thông tin của 1 field không tồn tại, sẽ nhận được underfined
> (pm.response.json().testData === undefined ? pm.test.skip : pm.test)("test skip if testData is undefined", () => {
>          
> });
```
* Hoặc dùng if-else thông thường

```
> if (pm.response.json().testData === undefined){
>     pm.test.skip("test skip if testData is undefined", () => {
>         return
>     })
> } else {
>     pm.test("test testData", () => {
>         
>     })
> }
 ```
*  Bạn có thể viết test vào phần Pre-request mà vẫn hoạt động như bình thường
![](https://images.viblo.asia/2c291513-cc18-4d91-9748-4dd580cc13bc.png)
* Khi debug bạn có thể dùng String interpolation thay vì dùng String + String

```
> pm.test("check String interpolation", () => {
>     let var1 = 30;
>     let var2 = "Giang Nguyen";
>  
>     console.log(`My name is ${var2} and age is ${var1}`);
> })
 ```
 ![](https://images.viblo.asia/a432d037-724d-47e9-9626-15eb8086bc54.png)
### Cách đọc file data test
***I. Chuẩn bị data files***

Bạn có thể chọn 1 trong 2 format csv hoặc json:

* FILE CSV

Bạn cần có file csv trước khi bắt đầu, trong file csv thì phải có dòng 1 là heading, postman sẽ lấy tiêu đề của mỗi cột làm tên biến.
![](https://images.viblo.asia/3af89857-871d-4d7f-b2f0-99eb36cdd6a7.PNG)

* FILE JSON

![](https://images.viblo.asia/bc8133ef-54cf-4255-8460-e06608ad53f1.PNG)

***II. Chèn biến vào trong postman request***

Ví dụ: mình có 1 request như sau
![](https://images.viblo.asia/d09f4d00-e81e-4312-afb2-0b0b7a78ab93.png)
Sau đó bạn có thể viết test luôn
![](https://images.viblo.asia/2332cfac-a224-41a1-a889-07197974ec69.png)
```
> pm.test("data-driven test", () => {
>     let res = pm.response.json();
>     pm.expect(res.json.name_key).eql(pm.iterationData.get("name"));
>     pm.expect(res.json.age_key).eql(pm.iterationData.get("age"));
> });
```
* pm.iterationData.get là cách lấy biến từ data-file, mình đã nhắc ở [đây](https://viblo.asia/p/api-testing-validate-json-schema-phan-biet-va-su-dung-cac-loai-variables-Az45bLyqZxY)
* Cách viết test, mình có viết ở trên

***III. Cách sử dụng***

Chức năng này chỉ “chạy được” khi sử dụng Postman Runner hoặc dùng Newman nên khá tù.

* Bước 1: Mở runner

![](https://images.viblo.asia/f42ce4a3-6f0b-4dd7-b0db-491f25920e5c.png)
* Bước 2: chọn request mà sử dụng data
![](https://images.viblo.asia/d7b198e1-43d6-47e0-8c60-2efe7ec88d77.png)
* Bước 3: Setting
![](https://images.viblo.asia/754ff538-d03e-4ac9-8451-a6b3b4d664a6.png)
![](https://images.viblo.asia/93f56516-becc-4488-9f85-4c6240c124df.png)
![](https://images.viblo.asia/ed56af7b-4f1a-4a95-ac84-8c474179aab5.png)
* Bước 4: Run Collection
![](https://images.viblo.asia/4e9d95f7-65f5-419c-a7f8-d3481fd1ba6f.png)
* Bước 5: Xem report

![](https://images.viblo.asia/3f65c763-2ce6-4caf-9944-60a409ec352d.png)
***IV. Nhắc nhở trước khi kết bài***

Chức năng này của postman là 1 chức năng chạy được, nhưng nó có “tác dụng phụ” khi bạn run cả collections (chứa nhiều testcase khác) nên bạn hãy cân nhắc khi sử dụng.

Ví dụ: mình có 2 requests: (A) 1 data-driven, (B) 1 request bình thường. Mình mong muốn request A lặp lại theo số lần = số dòng file csv, và request B chỉ chạy 1 lần thôi. Tuy nhiên, postman sẽ làm cho cả 2 requests lặp số lần giống nhau.
![](https://images.viblo.asia/ec92f0f2-2ec4-4e22-bc4a-d36745a844a3.png)
![](https://images.viblo.asia/87ecef91-552e-42f7-abdf-045a372b087d.png)