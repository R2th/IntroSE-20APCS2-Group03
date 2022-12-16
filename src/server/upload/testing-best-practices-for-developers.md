### Mở đầu
Việc kiểm thử trong một dự án thường được thực hiện bởi QA. Tuy nhiên bản thân là developer chúng ta cũng cần có ý thức trong việc đảm bảo chất lượng của dự án thông qua việc nâng cao kỹ năng về kiểm thử. Bài viết này chia sẻ một số kiến thức về kiểm thử dành cho developers chủ yếu nhắm đến một số những điểm cần chú ý khi viết unit test, một công việc mà developer thường xuyên phải làm.

### 1. Ít nhất bạn cần thực hiện kiểm thử cho các API
Hầu hết các dự án đều không có các bài kiểm thử tự động nào do hạn chế về mặt thời gian phát triển hoặc chỉ là các dự án thử nghiệm. Do đó thay vì bắt đầu thực hiện kiểm thử tự động chúng ta nên bắt đầu với việc kiểm thử các API. Kiểm thử API là cách đơn giản nhất để giúp đảm bảo chất lượng của dự án một cách tốt hơn với một phạm vi kiểm thử tương đối lớn, chúng ta thậm chí có thể được thực hiện mà không cần phải viết những đoạn code bằng các công cụ như `Postman`. Sau đó khi có thêm thời gian cũng như nguồn lực chúng ta có thể tiếp tục bổ sung và phát triển thêm những bài kiểm thử khác như kiểm thử đơn vị (unit testing), kiểm thử dữ liệu (DB testing), kiểm thử hiệu suất (performance testing), ...

=> Bạn có thể mất rất nhiều thời gian để dành cho việc viết unit test mặc dù bạn biết rằng nó chỉ có thể cover khoảng 20% hệ thống. Thay vào đó, bạn nên ưu tiên hơn cho việc kiểm thử API, một việc dễ dàng thực hiện hơn cũng như không tốn quá nhiều công sức mà có thể nâng cao chất lượng dự án của bạn. Tất nhiên nếu bạn có đủ thời gian và nguồn lực, việc thực hiện các bài kiểm thử khác vẫn là cần thiết giúp đảm bảo chất lượng dự án của bạn nhưng hãy đảm bảo ít nhất bạn nên áp dụng bài kiểm thử API cho dự án của mình.

### 2. Đặt tên cho một test case
Trong một dự án, các thành viên không chỉ là những lập trình viên mà còn là một sự phối hợp của nhiều bộ phận như QA, PO, ... những người có thể không quen thuộc với việc đọc mã code. Vì vậy việc viết một test case theo một quy chuẩn giúp cho mọi người có thể dễ dàng hiểu được phạm vi cũng như chức năng mà test case đó đảm nhiệm (nó cũng là cần thiết đối với lập trình viên vì đôi lúc đọc code của chính mình bạn còn không hiểu cơ mà :v). Một test case tốt khi nhìn vào chúng ta cần phải có câu trả lời cho 3 câu hỏi:
- Test case đang kiểm thử cho vấn đề gì? VD: Kiểm thử cho method ProductsService.addNewProduct
- Test case được diễn ra trong hoàn cảnh nào, các điều kiện là gì? VD: Không có giá trị về price được truyền vào method.
- Kết quả mong muốn là gì? VD: Sản phẩm không được tạo ra.

#### Test case tốt
```javascript
describe('Products Service', () => {
  describe('Add new product', () => {
    //Kịch bản và kết quả mong muốn được thể hiện rất rõ ràng.
    it('When no price is specified, then the product status is pending approval', () => {
      const newProduct = new ProductService().add(...);
      expect(newProduct.status).to.equal('pendingApproval');
    });
  });
});
```

#### Test case không tốt
```javascript
describe('Products Service', () => {
  describe('Add new product', () => {
    it('Should return the right status', () => {
        //Test case đang kiểm tra cái gì?, kết quả là gì? Hmm, khá là bối rối.
      const newProduct = new ProductService().add(...);
      expect(newProduct.status).to.equal('pendingApproval');
    });
  });
});
```

![Sự tương đồng giữa báo cáo kiểm thử và tài liệu yêu cầu](https://images.viblo.asia/54fdf39e-508e-4980-a6d4-d8cd60e91644.png)

[Hình ảnh được sử dụng từ Medium](https://medium.com/@me_37286/yoni-goldberg-javascript-nodejs-testing-best-practices-2b98924c9347)

Chỉ với một số những chi tiết nhỏ đã giúp cho test case trở nên có ý nghĩa hơn rất nhiều giúp cho việc dễ dàng hiểu được ý nghĩa cũng như tìm kiếm khi thay đổi.
Trước đây dự án của mình cũng có rất nhiều unit test được đặt tên một cách không tốt như trên. Sau đó chúng mình đã phải sửa lại theo luật như sau, các bạn có thể tham khảo:

``` javascript
describe('Vị trí của đoạn code cần test trong dự án', () => {
    describe('Tên hàm/class được test', () => {
        test('return {kết quả} if {điều kiện xảy ra}', () => {
            .....................................................
        });
    });
});
```

### 3.Cấu trúc một test case với AAA parttern

Khi định nghĩa một test case unit test bạn nên cấu trúc theo 3 phần được phân tách rõ ràng: Arrange, Act & Assert (AAA). 
1. `Arrange`:  Tăt cả các thiết lập để mô phỏng kịch bản kiểm thử.
2. `Act`: Thực thi một đơn vị test, thường được viết bởi 1 dòng duy nhất.
3. `Assert`: Kiểm thử đảm bảo giá trị nhận được thoả mãn kỳ vọng, thường cũng chỉ viết trong 1 dòng

#### Test case tốt 
```javascript
describe('Customer classifier', () => {
    test('When customer spent more than 500$, should be classified as premium', () => {
        //Arrange
        const customerToClassify = {spent:505, joined: new Date(), id:1}
        const DBStub = sinon.stub(dataAccess, 'getCustomer')
            .reply({id:1, classification: 'regular'});

        //Act
        const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);

        //Assert
        expect(receivedClassification).toMatch('premium');
    });
});
```

#### Test case không tốt
```javascript
test('Should be classified as premium', () => {
        const customerToClassify = {spent:505, joined: new Date(), id:1}
        const DBStub = sinon.stub(dataAccess, 'getCustomer')
            .reply({id:1, classification: 'regular'});
        const receivedClassification = customerClassifier.classifyCustomer(customerToClassify);
        expect(receivedClassification).toMatch('premium');
    });
```

Ta thấy trong test case trên các thành phần được tách biệt, mạch lạc giúp dễ dàng quan sát hơn so với việc viết một khối như test case dưới .

### Kết luận
Bài viết được tham khảo và tóm tắt từ `mục 4.1` đến `mục 4.3` của [nodebestpractices](https://github.com/goldbergyoni/nodebestpractices#4-testing-and-overall-quality-practices) các bạn có thể tham khảo thêm về việc kiểm thử và các kiến thức khác thông qua các best practices mình thấy rất hay mặc dù cũng chưa hiểu được hết :). Một may mắn của mình là đang được làm trong một dự án áp dụng khá nhiều best practices được đề cập đến trong đây nên cũng có thể nắm được phần nổi của tảng băng chìm. Hy vọng bài viết có ích đối với các bạn.

### Tài liệu tham khảo 
https://github.com/goldbergyoni/nodebestpractices#4-testing-and-overall-quality-practices

https://medium.com/@me_37286/yoni-goldberg-javascript-nodejs-testing-best-practices-2b98924c9347