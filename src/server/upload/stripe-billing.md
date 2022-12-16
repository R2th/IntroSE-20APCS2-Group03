Để giải quyết vấn đề mô hình business yêu cầu thanh toán định kỳ theo các hình thức trả trước, trả sau, tự động yêu cầu thanh toán theo định mức hay luỹ kế. Sự xuất hiện của Tiered Pricing để tạo nên phươg thức đưa ra số tiền được tính theo các bậc, metered Billing có thể đưa ra yêu cầu thanh toán ứng với lượng sử dụng tương ứng với từng kỳ. 

Bài viết này sẽ tập trung đi vào giải thích về subscription (thanh toán định kỳ). 

# Tạo model yêu cầu thanh toán định kỳ

Trước khi bắt đầu tiến hành việc thanh toán định kỳ chúng ta cần phải thiết kế model tương ứng phù hợp cho service.


・Thời điểm yêu cầu thanh toán:  Khi bắt đầu service or thanh toán sau khi biết được lượng sử dụng service  (phần chi phí sử dụng của tháng này sẽ được yêu cầu thanh toán ở đầu tháng tiếp theo).

・Có sử dụng chế độ thanh toán tương ứng các mức （tiered pricing） :  Đơn giá sẽ thay đổi tương ưng với số lượng user, lượng sử dụng dịch vụ hoặc số license. 

・ Chu kỳ thanh toán : Hàng tuần, hàng tháng, hàng năm,hàng quý / lần. 

・ Điều chỉnh plan : Trường hợp yêu cầu thanh toán ở thời điểm bắt đầu service thì đây được coi là hình thức thanh toán trước.Vì vậy khi thay đổi plan sẽ phát sinh ra sự trênh lệch về số tiền. Khi có nên như thế nào...

# 3 Step cần thiết trước khi bắt đầu Subscription

Sau khi thiết kế xong model yêu cầu thanh toán ở trên chúng ta đi vào tạo subscription với các step sau : 
1. Tạo Product・Plan
2. Tạo Customer 
3. Tạo Subscription

*Plan + Customer = Subscription*

Tiếp theo chúng ta sẽ tạo subscription cho một service yều thanh toán 980 yên hàng tháng.

# Step 1: Tạo Product・Plan
Product : Bằng việc gán với một plan or trong nhiều plan có thể support nhiều mô hình business Subscription. 
```
product = stripe.Product.create(
  name='YT ウェブサービス',
  type='service',
  statement_descriptor='YT Web Service',
)
```
Plan : Quyết định số tiền định kỳ hàng tháng, hàng nằm . 

```
plan = stripe.Plan.create(
  currency='jpy',
  interval='month',
  product='{PRODUCT_ID}', #Product ID
  nickname='Plan basic hàng tháng',
  amount=980,
  usage_type='licensed', # Start yêu cầu tanh toán khi bắt đầu Subscription
)
```

Đến đây chúng ta đã tạo được plan để yêu cầu thanh toán hàng tháng với số tiền 980 yên .

#  Step 2. Tạo Customer
Để yêu cầu thanh toán hàng tháng cần phải có thông tin payment của khách hàng.  Stripe sẽ lưu thông tin thanh toán của khác hàng như là customer.

Thông qua Checkout và Elements Stripe cung cấp cho chúng ta token, việc này khiến chúng ta hoàn toàn về mặt bảo mật. 

Tham khảo link để biết thêm chi tiết. 

https://stripe.dev/elements-examples/ja/

Sau khi có được token tiến hành tạo customer. 

```
customer = stripe.Customer.create(
  email='xxxx@sample.com',
  source='tok_xxxx', #トークン
)
```

Đến đây thông tin thanh toán của khách hàng được lưu  như là  "customer" , sẽ không cần phải yêu cầu thông tin credit card nhiều lần mà vẫn có thể thanh toán được. Khi implement chỉ cần có "customer" là đủ.

# Step 3. Tạo Subscription

Tiến hành gán Plan và Customer và bắt đầu Subscription. 

```
subscription = stripe.Subscription.create(
  customer='{{CUSTOMER_ID}}',
  items=[{'plan': '{{PLAN_ID}]'}],
)
```

Đến đây hàng tháng (tại thời điểm được tạo) thì yêu cầu thanh toán tự động  được gửi đến "customer". 
Tiếp theo ứng với từng model thanh toán, chúng ta sẽ tập trung đi vào tạo những Plan tương ứng để hiểu và nắm rõ sâu hơn sẽ có lợi cho các bài toán business ở mai này. 

# Model yêu cầu thanh toán 

**Licensed hay Metered**

Trong quá trình thiêt kế Plan thì việc quan trọng đầu tiên đó là "yêu cầu thanh toán ở thời điểm nào"
Khi tạo Plan chúng ta có thể chỉ định thông qua "usage_type". 

・licensed : Khi bắt đầu subscription thì yêu cầu thanh toán cũng được tiến hành. Bắt đầu ở mỗi kỳ thì sẽ yêu cầu thanh toán định kỳ với đơn giá (amount) và số lượng (quantity) được chỉ định. 

"quantity" được set một lần thì giá trị đó sẽ tiếp tục được sử dụng về sau. Model hàng tháng yêu cầu thanh toán 980 yên ở trên được gọi là model trả trước. 

・metered : Hình thức này sẽ yêu cầu thanh toán tương ứng với lượng sử dụng ứng với từng kỳ sử dụng.  Lượng sử dụng tương ứng trong kỳ sử dụng sẽ được update thông qua API. Sẽ tiế hành yêu cầu thanh toán của kỳ đó ở giai đoạn cuối kỳ. 
Ví dụ tiền điện nước gas ứng với lượng mà chúng ta sử dụng thì ở cuối kỳ sử dụng sẽ được yêu cầu thành toán ở cuối mỗi kỳ sử dụng với số tiền đắt hơn hay rẻ hơn so với việc sử dụng ở định mức thấp.

**Sử dụng Tiered Pricing (Model yêu cầu thanh toán gới hạn theo mức)**

Với việc chỉ định "billing_scheme" là "tiered" or "per_unit" chúng ta có thể tạo ra plan yêu cầu thanh toán theo các mức với cả "Licensed" và "metered". Phạm vi các mức sẽ ứng với lượng sử dụng (có thể gọi là  table or tier)
Vì vậy tuỳ theo từng business mà chúng ta có thể chỉ định thời điểm thanh toán là trước hay sau theo các đinh mức đặt trước hay không.   
Trong thực tế chúng ta thường bắt gặp những trường hợp như gói cước data của mobile thì model ở đây có chứa các bảng giả về mức phí tương ứng với các lượng sử dụng data nhất định. 

 **Model thanh toán định kỳ đơn giản**

 Đây là plan đã được đề cập ở trên, chỉ đơn giản là yêu cầu thanh toán hàng tháng với số lượng tiền cố định. Các tạo plan như sau : 

```
  plan = stripe.Plan.create(
  currency='jpy',
  interval='month', #year, month, week, day
  product='{{PRODUCT_ID}}', #Chỉ định Product ID
  nickname='basic plan hàng thàng ',
  amount=980,
  usage_type='licensed', 
)
```

Khi cần thiết có thể chỉ định số lượng bởi "quantity" lúc này số tiền yêu cầu thanh toán sẽ là amount × quantity. 

**Model thanh toán nhiều plan với chỉ một subscription**

Giống như model plan của phí điện thoại sẽ bao gồm basic plan là các chi phí cơ bản và option là các plan khác thêm vào tuỳ theo mong muốn của người dùng.
Tạo basic plan yêu cầu thanh toán hàng tháng 980 yên. 
```
plan = stripe.Plan.create(
  currency='jpy',
  interval='month',
  product='{{PRODUCT_ID}}', #Chỉ định Product ID
  nickname='毎月基本プラン',
  amount=980,
  usage_type='licensed', # Bắt đầu yêu cầu thanh toán khi bắt đầu start Subscription
)
```

```
plan = stripe.Plan.create(
  currency='jpy',
  interval='month',
  product='{{PRODUCT_ID}}', 
  nickname='Option số tiền thêm vào hàng tháng',
  amount=300,
  usage_type='licensed', 
)
```

Tiếp theo là gán plan cho Customer. 

```
subs = stripe.Subscription.create(
  customer="{{CUSTOMER_ID}}",
  items=[
    {
      "plan": "{{basic plan yêu cầu thanh toán hàng tháng _PLAN_ID}}",
      "quantity": 1,
    },    {
      "plan": "{{Option số tiền thêm vào hàng thán_PLAN_ID}}",
      "quantity": 2, # Số lượng
    },
  ]
)
```
Vậy chúng ta có thể tạo ra yêu cầu thanh toán với một subscription với nhiều plan khác nhau.Chúng ta có thể confirm được invoice trên Dashboard như sau (Ở đây không chỉ định về mức thuế nhưng có thể chỉ định bằng thuộc tính "tax_percent" ở giai đoạn tạo subscription): 

![](https://images.viblo.asia/c535cfcf-ea23-46a3-8620-04b345745dba.png)

# Tiered Pricing - Model yêu cầu thanh toán theo mức. 
Là model có đơn giá thay đổi tương ứng với lượng sử dụng. Trước tiên cần chỉ định giá trị của "billing_scheme" là "tiered". Với chỉ định này chúng ta sẽ sử dụng param có tên là "tiers_mode" với 2 giá trị "graduated", "volume". 


・Model phân tầng có đơn giá thay đổi theo lượng sử dụng (đơn giá được sử dụng cuối cùng sẽ là một mức giá):
tiers_mode=volume.

・Model phân tầng có đơn giá luỹ kế theo lượng sử dụng (đơn giá được sử dụng cuối cùng sẽ được cấu thành từ nhiều mức giá) : tiers_mode=graduated.

![](https://images.viblo.asia/a3737a9c-507f-44ad-8f3d-fca7658ff1da.png)

**Source dưới đây thể hiện việc tạo tiers_mode với volume. **

```
plan = stripe.Plan.create(
  nickname="Model Volume phân tầng hàng tháng", 
  product="{{PRODUCT_ID}}",
  currency="jpy",
  interval="month",
  usage_type="licensed", # được bắt đầu ở ngày khi sub start, có thể chỉ định 'metered'
  billing_scheme="tiered",
  tiers_mode="volume",
  tiers=[
    {
      "amount": 500,
      "up_to": "5",
    },{
      "amount": 400,
      "up_to": "10",
    },{
      "amount": 300,
      "up_to": "15",
    },{
      "amount": 200,
      "up_to": "20",
    },{
      "amount": 100,
      "up_to": "inf", # Từ 21 trở lên 
    },
  ]
)
```

Plan được tạo và trên  Dashboard sẽ như sau :
![](https://images.viblo.asia/9a10c9d2-bce1-43ec-81f0-424c27c759c8.png)
Tiếp theo start subscription với số lượng licience như là 11 thì sẽ như sau : 
```
subscription = stripe.Subscription.create(
  customer="{{CUSTOMER_ID}}", # Chỉ định customer id 
  items=[
    {
      "plan": "{{VOLUME_PLAN_ID}}", # plan_id
      "quantity": "11",
    },
  ]
)
```
Vậy tổng số lượng là 11 nên lúc này sẽ áp dụng với đơn giá sẽ là 300 yên và số tiền tương ứng được yêu cầu thanh toán sẽ là 11 × ¥300 = ¥3,300 . 
Trường hợp tạo plan trên Dashboard thì sẽ preview được ứng với sự thay đổi của số lượng thì số tiền là bao nhiêu  :
![](https://images.viblo.asia/3f3220fb-a143-481f-a231-0b888f6bde33.png)

# Model với  "tiers_mode" là "graduated". 
```
plan = stripe.Plan.create(
  nickname="月額段階制 累進(graduated) モデル",
  product="{{PRODUCT_ID}}", #product id を指定
  currency="jpy",
  interval="month",
  usage_type="licensed", 
  billing_scheme="tiered", 
  tiers_mode="graduated", #this point
  tiers=[
    {
      "amount": 500,
      "up_to": "5",
    },{
      "amount": 400,
      "up_to": "10",
    },{
      "amount": 300,
      "up_to": "15",
    },{
      "amount": 200,
      "up_to": "20",
    },{
      "amount": 100,
      "up_to": "inf",
    },
  ]
)
```
Dashboard lúc này sẽ như sau : 
![](https://images.viblo.asia/60fd3688-876a-4f0d-8d47-14a91256618f.png)
Chúng ta có thể nhận biết được với các từ khoá như start_最初 và next_次.Như vậy sẽ sử dụng đơn giá của từng tire để tính toán . 
Khi start subscription thì giả sử với licience là 11 thì sẽ như sau . 
```
subscription = stripe.Subscription.create(
  customer="{{CUSTOMER_ID}}",
  items=[
    {
      "plan": "{{GRADUATED_PLAN_ID}}",
      "quantity": "11",
    },
  ]
)
```

Vậy với kiểu  "graduated" thì số tiền sẽ như sau : (5 × ¥500) + (5 × ¥400) + (1 × ¥300) = ¥4800. 
Dashboard sẽ như sau :
![](https://images.viblo.asia/10c0d5c8-a88b-4382-bf75-4da7fe462c48.png)
Hơn nữa nếu tạo plan từ Dashboard thì khi preview sẽ như sau : 
![](https://images.viblo.asia/b129f8e9-3c93-4954-aa86-b0686d02e49d.png)

Bạn có thể tham khảo thêm chi tiết hơn ở link sau : 
https://stripe.com/docs/billing/subscriptions/tiers


# Q&A thường gặp liên quan đến thanh toán định kỳ. 

Q. Tôi muốn thiết lập ngày yêu cầu thanh toán vào đầu tháng chẳng hạn thì phải làm như thế nào ?

Với việc sử dụng "billing_cycle_anchor" có tể điều chỉnh(anchor) thời điểm bắt đầu yêu cầu thanh toán lần đầu.
Ví dụ như với service yêu cầu thanh toán số tiền định kỳ hàng tháng vào ngày mùng 1 thì ở thời điểm khoảng giữa tháng thì số tiền yêu cầu ở lần đầu tiên sẽ trừ đi những ngày từ thời điểm trước đó. 

```
subscription = stripe.Subscription.create(
  customer='{{CUSTOMER_ID}}',
  items=[{{'plan': 'PLANID'}}],
  billing_cycle_anchor=1535760000, # start lần đầu tiên vào 2018/09/01
)
```

Ví dụ như đăng ký 1 plan thanh toán 980 hàng tháng vào ngày  2018/09/01 và giá trị billing_cycle_anchor là ngày 2018/09/01 thì sẽ được xử lý như sau: 
![](https://images.viblo.asia/132f7c46-377b-4a6d-b967-f0db3c5a78f5.png)

Việc thanh toán được tiến hành ngay sau khi loại bỏ những ngày không sử dụng của tháng đầu. Và ở mùng 1 của những tháng tiếp theo việc yêu cầu thanh toán vẫn được tiến hành. 

Link gốc bài viết: 

https://qiita.com/y_toku/items/235b5e7ee00792edcbbf