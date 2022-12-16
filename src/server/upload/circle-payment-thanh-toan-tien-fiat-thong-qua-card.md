Hello các bạn, trong phần trước [Circle Payment - Tổng quan về Circle Payment](https://viblo.asia/p/circle-payment-tong-quan-ve-circle-payment-qPoL75714vk) của series mình đã giới thiệu tổng quan với các bạn về Circle Payment, đăng ký tài khoản sandbox và tạo api key. Như đã hứa, bài viết này mình sẽ hướng dẫn các bạn tích hợp Circle Payment thanh toán FIAT (tiền pháp định : USD, VND, EUR, ...) thông qua ví dụ được viết bằng Nodejs.

<div align="center">Flow chính được mô tả như ở hình dưới đây</div>

![image.png](https://images.viblo.asia/8af7ba9c-08f8-4e91-a984-8d7b584d053f.png)

**Theo đó quá trình này sẽ gồm 2 giai đoạn**
*  Khởi tạo dữ liệu thẻ của user trên hệ thống Circle
    * Front End mã hóa thông tin thẻ của user bằng Circle public key được cung cấp từ BE
    * Front End gửi request save card details yêu cầu cầu BE gửi lên Circle
* Thực hiện thanh toán tiền FIAT
    * Front End gửi request create payment với thông tin thẻ vừa tạo từ giai đoạn 1
    * Front End pull thông tin payment vừa tạo (thông qua ID payment được trả về từ step trước) để check trạng thái của payment.
    * Back End subcribe Circle Notification để lắng nghe các event để xử lý và lưu trữ

```
Note : Về mặt lý thuyết, FE hoàn toàn có thể tự call lên API Circle với api tạo được từ phần trước.
Tuy nhiên việc lưu trữ private key ở FE là không tốt, đó là lý do BE sẽ cung cấp các api đóng vai trò trung gian cho việc tương tác này**
```

## 1. Khởi tạo dữ liệu thẻ trên hệ thống Circle
Như các bạn đã biết, các thông tin thanh toán trên các loại thẻ Debit, Credit bao gồm : Card number, CVV và Expiration date. 
Việc lộ thông tin thẻ đồng nghĩa với việc bạn đã "dâng" ví tiền của mình cho kẻ khác.
Tuy nhiên để có thể thanh toán cho bên thứ 3 qua thẻ bạn buộc phải cung cấp các thông tin này, nếu các thông tin này được gửi đi không mã hóa attacker có thể lợi dụng môi trường mạng để chiếm đoạt. 

Circle đã giải quyết bài toán này bằng cách mã hóa thông tin thẻ cùng publicKey và trả về ID thẻ. Từ đó người dùng không cần nhập lại thông tin thẻ mà có thể thanh toán thông qua ID thẻ (dĩ nhiên chỉ có thể sử dụng với api key tương ứng với tài khoản tạo publickey)

###  1.1. Tạo public key cho quá trình encrypt thông tin thẻ
Việc tạo public key đơn giản chỉ là call api [/v1/encryption/public](https://developers.circle.com/reference/getpublickey) với api key được tạo từ bài viết trước. Func này được mình viết ở phía backend, ở đây mình sẽ chỉ nói về cách tạo ra public key

```
const axiosInstance = axios.create({
  baseURL: config.circle.apiUrl,
  headers: {
    Authorization: `Bearer ${config.circle.apiKey}`,
  },
});

export const generatePublicKey = async (): Promise<any> => {
  try {
    const response = await axiosInstance.get(config.circle.api.getPublicKey);
    return response?.data?.data;
  } catch (error) {
    logger.error(`Genenate public key Circle payment fails : ${error}`);
    throw new Error(
      500,
      'Internal_Server_Error',
      'Failed to genenate public key Circle payment',
    );
  }
};
```

###  1.2. Encrypt thông tin thẻ
Sau khi có thông tin public key phía trên chúng ta sẽ bắt đầu mã hóa thông tin thẻ (việc này sẽ được xử lý ở phía FE)

* Input : 
    * Thông tin thẻ (Card number, CVV)
    * Public key
    * Thư viện : openpgp
    
* Output : Thông tin thẻ đã được mã hóa (string | example : "LS0tLS1CRUdJT.........tLS0tCg==" )

* Cách thực hiện :
```
const openpgp = require("openpgp");

async function encrypCard(cardDetailData) {
  const publicKey = await generatePublicKey();
  const decodedPublicKey = await openpgp.readKey({
    armoredKey: atob(publicKey),
  });
  const message = await openpgp.createMessage({
    text: JSON.stringify(cardDetail),
  });
  return openpgp
    .encrypt({
      message,
      encryptionKeys: decodedPublicKey,
    })
    .then((ciphertext) => {
      return {
        encryptedMessage: btoa(ciphertext),
      };
    });
}
```


###  1.3. Lưu trữ thông tin thẻ 
Đến đây chúng ta đã có thông tin mã hóa thẻ, việc còn lại của giai đoạn này là đăng ký nó với Circle thông qua api [/v1/cards](https://developers.circle.com/reference/payments-cards-create) các bạn có thể tham khảo func dưới đây.

**Create card func example**
```
export const createCard = async (createCardDetail: CreateCardType): Promise<any> => {
  try {
    const response = await axiosInstance.post(config.circle.api.createCard, createCardDetail, {
      headers: { content_type: 'application/json' },
    });
    return response.data;
  } catch (error) {
    logger.error(`Create Circle card fails : ${error}`);
    throw new CustomError(
      500,
      'Internal_Server_Error',
      'Failed to save card detail Circle payment',
    );
  }
};
```

**Create card param API example**
```
{
     "idempotencyKey": "ba943ff1-ca16-49b2-ba55-1057e70ca5c7",
     "keyId": "key1",
     "encryptedData": "LS0tLS1CRUdJTiBQR1AgTUVTU0FHRS0tLS0tCgp3Y0JNQTBYV1NGbEZScFZoQVFmL2J2bVVkNG5LZ3dkbExKVTlEdEFEK0p5c0VOTUxuOUlRUWVGWnZJUWEKMGgzQklpRFNRU0RMZmI0NEs2SXZMeTZRbm54bmFLcWx0MjNUSmtPd2hGWFIrdnNSMU5IbnVHN0lUNWJECmZzeVdleXlNK1JLNUVHV0thZ3NmQ2tWamh2NGloY29xUnlTTGtJbWVmRzVaR0tMRkJTTTBsTFNPWFRURQpiMy91eU1zMVJNb3ZiclNvbXkxa3BybzUveWxabWVtV2ZsU1pWQlhNcTc1dGc1YjVSRVIraXM5ckc0cS8KMXl0M0FOYXA3UDhKekFhZVlyTnVNZGhGZFhvK0NFMC9CQnN3L0NIZXdhTDk4SmRVUEV0NjA5WFRHTG9kCjZtamY0YUtMQ01xd0RFMkNVb3dPdE8vMzVIMitnVDZKS3FoMmtjQUQyaXFlb3luNWcralRHaFNyd3NKWgpIdEphQWVZZXpGQUVOaFo3Q01IOGNsdnhZVWNORnJuNXlMRXVGTkwwZkczZy95S3loclhxQ0o3UFo5b3UKMFVxQjkzQURKWDlJZjRBeVQ2bU9MZm9wUytpT2lLall4bG1NLzhlVWc3OGp1OVJ5T1BXelhyTzdLWTNHClFSWm8KPXc1dEYKLS0tLS1FTkQgUEdQIE1FU1NBR0UtLS0tLQo",
     "billingDetails": {
          "name": "Satoshi Nakamoto",
          "city": "Boston",
          "country": "US",
          "line1": "100 Money Street",
          "line2": "Suite 1",
          "district": "MA",
          "postalCode": "01234"
     },
     "expMonth": 1,
     "expYear": 2020,
     "metadata": {
          "email": "satoshi@circle.com",
          "phoneNumber": "+14155555555",
          "sessionId": "DE6FA86F60BB47B379307F851E238617",
          "ipAddress": "244.28.239.130"
     }
}
```

Trên đây là một example param cho api này, mình sẽ chỉ giải thích các param dễ gây confuse cho các bạn về ý nghĩa và cách khởi tạo chúng nó.

* idempotencyKey : Key này được Circle cho phép người dùng thêm vào để bạn có thể re-call api 1 cách an toàn thi có sự cố trước khi nhận được phản hồi. 

    *  Ví dụ : khi bạn đang tạo 1 payment nhưng trước khi nhận được phản hồi từ hệ thống thì bạn gặp sự cố mạng, khi đó bạn không biết payment đã được tạo chưa (tiền của bạn đã mất chưa), thử payment lại thì liệu có bị mất 2 lần tiền không ?  re-call với cùng idempotencyKey sẽ nhận về cùng 1 kết quả mà không tạo 1 request mới. 

    *  Cách tạo : Sử dụng thư viện uuid
    ```
    const { v4: uuidv4 } = require("uuid");
    const idempotencyKey = uuidv4();
    ```

* keyId : Theo docs viết là định danh duy nhất (UUID v4) các bạn có thể tạo tương tự cách tạo idempotencyKey, tuy nhiên có thể để mặc định "key1"
* encryptedData : Thông tin encrypt thẻ đã tạo được từ step trước
* metadata.sessionId : Session của giao dịch, required nhưng mình cũng không dùng đến, các bạn có thể truyền vào text bất kỳ cũng được (bạn nào hiểu rõ ý nghĩa của nó thì comment phía dưới cho mn cùng nắm được nha)

**Create card result API example**

```
{
  "data": {
    "id": "b8627ae8-732b-4d25-b947-1df8f4007a29",
    "status": "pending",
    "billingDetails": {
      "name": "Satoshi Nakamoto",
      "city": "Boston",
      "country": "US",
      "line1": "100 Money Street",
      "line2": "Suite 1",
      "district": "MA",
      "postalCode": "01234"
    },
    "expMonth": 1,
    "expYear": 2020,
    "network": "VISA",
    "last4": "0123",
    "bin": "401230",
    "issuerCountry": "US",
    "fundingType": "credit",
    "fingerprint": "eb170539-9e1c-4e92-bf4f-1d09534fdca2",
    "errorCode": "verification_failed",
    "verification": {
      "avs": "D",
      "cvv": "not_requested"
    },
    "riskEvaluation": {
      "decision": "approved",
      "reason": "3000"
    },
    "metadata": {
      "email": "satoshi@circle.com",
      "phoneNumber": "+14155555555"
    },
    "createDate": "2020-04-10T02:13:30.000Z",
    "updateDate": "2020-04-10T02:13:30.000Z"
  }
}
```
Sau khi call api create card API trả về sẽ bao gồm thông tin và trạng thái thẻ, thông thường thì ngay lúc đó status thẻ sẽ là pending do chờ xác thực. Các bạn có thể call api [/v1/cards/{id}](https://developers.circle.com/reference/payments-cards-get-id) với card id vừa nhận được để check trạng thái, nếu xác thực thành công status sẽ được chuyển thành **complete**.

## 2. Thực hiện thanh toán FIAT

Việc create card Circle hoàn tất, các bạn sẽ nhận được ID card dùng cho các payment sau này. Ngay khi trạng thái card chuyển sang **complete** chúng ta có thể bắt đầu thực hiện payment với ID thẻ vừa tạo

### 2.1 Khởi tạo 1 payment request

Khởi tạo 1 payment request với api  [/v1/payments](https://developers.circle.com/reference/payments-payments-create) và rung đùi ngồi đợi kết quả


**Example func create payment**
```
export const createPayment = async (createPaymentDetail: CreatePaymentType): Promise<any> => {
  try {
    const response = await axiosInstance.post(config.circle.api.payments, createPaymentDetail, {
      headers: { content_type: 'application/json' },
    });
    return response.data;
  } catch (error) {
    logger.error(`Create Circle payment fails : ${error}`);
    throw new CustomError(
      500,
      'Internal_Server_Error',
      'Failed to create Circle payment',
    );
  }
};
```

**Create payment param API example**

```
{
     "idempotencyKey": "ba943ff1-ca16-49b2-ba55-1057e70ca5c7",
     "keyId": "key1",
     "metadata": {
          "email": "satoshi@circle.com",
          "phoneNumber": "+14155555555",
          "sessionId": "DE6FA86F60BB47B379307F851E238617",
          "ipAddress": "244.28.239.130"
     },
     "amount": {
          "amount": "3.14",
          "currency": "USD"
     },
     "verification": "cvv",
     "source": {
          "id": "b8627ae8-732b-4d25-b947-1df8f4007a29", // card ID
          "type": "card"
     },
     "description": "Payment",
     "encryptedData": "UHVibGljS2V5QmFzZTY0RW5jb2RlZA==",
}
```

Vẫn là các field quen thuộc đã được trình bày từ các step trước. Tuy nhiên ở đây các bạn cần lưu ý, nếu đặt "verification": "cvv" bạn buộc phải encrypt thông tin cvv tương tự cách encrypt thông tin thẻ trước đây để xác thực. Mặc định "verification": "none" thì không cần encrypt thông tin cvv gửi kèm nữa. 

### 2.2 Tracking payment request

Circle mất khá nhiều thời gian để verify và tranfer tiền về account. Để xác định payment thành công hay chưa các bạn có 2 cách để thực hiện

#### 2.2.1 Tracking payment request by api

Phía FE có thể lấy thông tin payment vừa tạo qua api [/v1/payments/{id}](https://developers.circle.com/reference/payments-payments-get-id). Khả năng là setInteval để call thôi

Nếu payment thành công, bạn sẽ nhận được thông tin payment với **status = paid** . Lúc này các bạn có thể tìm thấy lịch sử dao dịch của mình [ở đây](https://my-sandbox.circle.com/payments)

![image.png](https://images.viblo.asia/04589dfa-faeb-47be-87af-75155f509e8e.png)


#### 2.2.2 Tracking payment request by Circle notification 

Subcribe Circle Notification : có thể hiểu là 1 dạng lắng nghe webhook để nhận các event (option này sẽ chỉ thực hiện được ở phía BE).

Các bạn có thể thêm, xóa, xem list các endpoint webhook đã đăng ký với Circle thông qua các api [ở đây](https://developers.circle.com/reference/listsubscriptions). 

Circle khá chặt chẽ trong việc subcribe webhook này bằng cách sau khi call api đăng ký endpoin webhook tới Circle, Circle sẽ gửi 1 event message comfirm tới endpoin được đăng ký để xác thực, tại endpoin đó, các bạn cần phải xử lý để comfirm. Nếu không endpoin đó sẽ không bao giờ được gửi event lần thứ 2, điều đó đồng nghĩa với endpoin đó sẽ trở thành rác và không thể xóa đi được. Vấn đề nằm ở chỗ Circle sẽ chỉ cho phép 1 account có 3 slot subcribe, vì vậy nếu dính 3 cái endpoin rác thì bạn có thể bỏ account được rồi đấy.

**Func subcribe tham khảo**

> Lưu ý : Func subscribeCircleWebhook nên được chạy ngay khi ứng dụng onReady
```
export const subscribeCircleWebhook = async () => {
  try {
    let isSubcriptionExist = false;
    const { data } = await axiosInstance.get(config.circle.api.notification);
    await data.data.map(async (subscriptions) => {
      if (subscriptions.endpoint === config.circle.webhookUrl) {
        isSubcriptionExist = true;
      }
    });
    if (!isSubcriptionExist) {
      const response = await axiosInstance.post(
        config.circle.api.notification,
        {
          endpoint: config.circle.webhookUrl,
        },
        {
          headers: {
            content_type: 'application/json',
          },
        },
      );
      logger.info(`Circle subscribe Webhook success ${JSON.stringify(response.data)}`);
      return;
    }
    logger.info('Circle subcription existed');
  } catch (error) {
    logger.error(`Subcribe Circle webhook fails : ${error}`);
    throw new CustomError(
      500,
      'Internal_Server_Error',
      'Failed to subcribe Circle webhook',
    );
  }
};
```

Bởi vì chỉ có 3 slot nên mình có check thêm nếu mà endpoin đã được đăng ký rồi thì mình sẽ không xử lý gì thêm nữa.

**Func handle event tham khảo**

```
import MessageValidator from 'sns-validator';
import https from 'https';

export const handleEvent = async (eventData: any) => {
  const validator = new MessageValidator();
  logger.info(`Incomming Circle event ${eventData}`);
  validator.validate(eventData, (err, message) => {
    if (err) {
      logger.error(`Validate Circle event fails : ${err}`);
      return;
    }
    if (message.Type === 'SubscriptionConfirmation') {
      https.get(message.SubscribeURL, (res: any) => {
        logger.info(`Comfirm subscribe URL success ${res}`);
      });
    }
    if (message.Type === 'Notification') {
      logger.info(`Circle event valid ${message.MessageId}: ${message.Message}`);
      // Đây chính là nơi nhận các notification của Circle
    }
  });
};
```

Như đã nói ở phần trên, ngay sau khi subcribe, Circle sẽ bắn 1 event với type "SubscriptionConfirmation" về endpoin được đăng ký kèm theo SubscribeURL, công việc của chúng ta ở đây là accesst vào url đó để verify endpoin.

All done, đến đây thì đúng là ngồi rung đùi chờ tiền về thôi !

**Ở bài viết sau mình sẽ tiếp tục hướng dẫn các bạn tích hợp CIrcle Payment với Crypto mà cụ thể là USDC trên mạng ETH.  See you soon !**