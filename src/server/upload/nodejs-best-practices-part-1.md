![](https://images.viblo.asia/a5baad33-0c83-486c-a3ed-e6203afe7104.jpg)
### Lời mở đầu.

 Chào mọi người hôm nay mình giới thiệu cho các bạn các **Best Practices!** về Node js.
 
Mình cũng là người mới học Nodejs khi mình lên google search mọi thứ Node js đều có. Nhưng vấn đề mình gặp phải là mỗi bài viết lại khác nhau và không biết cái nào tốt hơn cái nào.

Sau nhiều hôm mình tìm thì tìm được 1 repository tổng hợp tất cả ý kiến của nhưng người chuyên gia về Node js. Tất cả các **Best Practices** được update thường xuyên phù hợp với thời điểm hiện tại nhất.


Hiện tại thì mình đang thấy có tất cả 8  **Best Practices**

**I. Project Structure Practices**

**II. Error Handling Practices**

**III. Code Style Practices**

**IV. Testing And Overall Quality Practices**

**V. Going To Production Practices**

**VI. Security Practices**

**VII. Performance Practices (2) (Work In Progress️ writing_hand)**

**VIII. Docker Practices**

. Do hơi dài nên nay mình cùng mọi người cùng tìm hiểu trước 2 ý nhé:

1. What’s Node.js Best Practices ?
2. Why do you should use Node.js Best Practices ?
3. How to create good project structure ?
4. How to handle the errors ?

### I. Project Structure
**1 Structure your solution by components**
 + Để xây dựng cấu trúc của một project thì các nhà phát triển phải dựa vào nhiều yếu tố để có thể xây dựng được project tốt nhất.
Hiện tại thì mình thấy mọi người xây dựng cấu trúc theo 2 kiểu là theo chiều ngang và chiều dọc:

**cách 1: Good: Structure your solution by self-contained components**
![](https://images.viblo.asia/7643a0b9-b42e-4dcf-ad63-b1c387b5dccb.png)

**cách 2: Bad: Group your files by technical role**
![](https://images.viblo.asia/758e99c8-d4ce-4207-94bc-dc4649c8f80b.png)

> For medium sized apps and above, monoliths are really bad - having one big software with many dependencies is just hard to reason about and often leads to spaghetti code. Even smart architects — those who are skilled enough to tame the beast and 'modularize' it — spend great mental effort on design, and each change requires carefully evaluating the impact on other dependent objects. The ultimate solution is to develop small software: divide the whole stack into self-contained components that don't share files with others, each constitutes very few files (e.g. API, service, data access, test, etc.) so that it's very easy to reason about it. Some may call this 'microservices' architecture — it's important to understand that microservices are not a spec which you must follow, but rather a set of principles. You may adopt many principles into a full-blown microservices architecture or adopt only a few. Both are good as long as you keep the software complexity low. The very least you should do is create basic borders between components, assign a folder in your project root for each business component and make it self-contained - other components are allowed to consume its functionality only through its public interface or API. This is the foundation for keeping your components simple, avoid dependency hell and pave the way to full-blown microservices in the future once your app grows.

Đây là đoạn trích của một developer gặp vấn đề về cấu trúc của dự án.

Còn theo mình thì mình thấy thì còn phải phụ thuộc vào thời gian phát triển và size của dự án mà chúng ta chọn theo hướng cấu trúc nào. VÌ thực tế thì phát triển theo cách 2 lại phù hợp với dự án nhỏ ít phát triển thêm và thời gian phát triển gấp vậy nên nó vẫn tồn tại đến bây giờ.

Nhưng đấy là bất đắc dĩ còn chúng ta cũng cố gắng phát triển theo hướng chia theo components ít phụ thuộc nhau thì sau này có phát triển thì nó cũng dễ dàng hơn.  
==> Còn các bạn thì nghĩ sao cmt nhé!

**1.2 Layer your components, keep Express within its boundaries**

1 min explainer: The downside of mixing layers
![](https://images.viblo.asia/0d8db068-f343-48b8-9520-15de5a33ce3c.gif)

### II. Error Handling

**2.1 Use Async-Await or promises for async error handling**


```
getData(someParameter, function(err, result) {
    if(err !== null) {
        // do something like calling the given callback function and pass the error
        getMoreData(a, function(err, result) {
            if(err !== null) {
                // do something like calling the given callback function and pass the error
                getMoreData(b, function(c) {
                    getMoreData(d, function(e) {
                        if(err !== null ) {
                            // you get the idea?
                        }
                    })
                });
            }
        });
    }
```
Nếu 1 người code tốt mà đọc code bạn họ sẽ cười và nói thật tệ. Vì đoạn code ở trên sử dụng callback, sử dụng callback như vậy mình sẽ ko control được các lỗi có thể xảy ra và có nhiều vấn đề gặp phải. Vậy nên ta nên dùng Async-Await or promises trong code.

```
Code Example – using promises to catch errors
return functionA()
  .then(functionB)
  .then(functionC)
  .then(functionD)
  .catch((err) => logger.error(err))
  .then(alwaysExecuteThisFunction)
```
```
Code Example - using async/await to catch errors
async function executeAsyncTask () {
  try {
    const valueA = await functionA();
    const valueB = await functionB(valueA);
    const valueC = await functionC(valueB);
    return await functionD(valueC);
  }
  catch (err) {
    logger.error(err);
  } finally {
    await alwaysExecuteThisFunction();
  }
}
```

**2.2 Use only the built-in Error object**

```
Code Example – doing it right
// throwing an Error from typical function, whether sync or async
if(!productToAdd)
    throw new Error('How can I add new product when no value provided?');

// 'throwing' an Error from EventEmitter
const myEmitter = new MyEmitter();
myEmitter.emit('error', new Error('whoops!'));

// 'throwing' an Error from a Promise
const addProduct = async (productToAdd) => {
  try {
    const existingProduct = await DAL.getProduct(productToAdd.id);
    if (existingProduct !== null) {
      throw new Error('Product already exists!');
    }
  } catch (err) {
    // ...
  }
}
```
```

Code example – Anti Pattern
// throwing a string lacks any stack trace information and other important data properties
if(!productToAdd)
    throw ('How can I add new product when no value provided?');
```

mọi người log lỗi như vậy ko sai nhưng sẽ không đầy đủ thông tin nên nhiều lúc chúng ta không kiểm soát được code.
vậy nên ở trên đây mọi người khuyên chúng ta nên log theo dạng lỗi 
ví dụ:
```

// centralized error object that derives from Node’s Error
Code example – doing it even better
export class AppError extends Error {
  public readonly name: string;
  public readonly httpCode: HttpCode;
  public readonly isOperational: boolean;

  constructor(name: string, httpCode: HttpCode, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

// client throwing an exception
if(user == null)
    throw new AppError(commonErrors.resourceNotFound, commonHTTPErrors.notFound, 'further explanation', true)
```

chúng ta làm như này sẽ biết sai ở đâu và vì sao sai.

**2.3 Distinguish operational vs programmer errors**
- ý này mình muốn nói đên là chúng ta nên phân biệt dạng lỗi do hệ thống hay do code của chúng ta:

```
- // some centralized error factory (see other examples at the bullet "Use only the built-in Error object")
export class AppError extends Error {
  public readonly commonType: string;
  public readonly isOperational: boolean;

  constructor(commonType: string, description: string, isOperational: boolean) {
    super(description);

    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain

    this.commonType = commonType;
    this.isOperational = isOperational;

    Error.captureStackTrace(this);
  }
}

// marking an error object as operational (true)
throw new AppError(errorManagement.commonErrors.InvalidInput, 'Describe here what happened', true);
```

**2.4 Handle errors centrally, not within an Express middleware**
- ý muôn nói đến các sử lý error chúng ta nên viết một class để xử lý tập chung các lỗi lại rồi thông báo tránh trường hợp xử lý ở các middleware khác nhau.
- trích lời:

> Without one dedicated object for error handling, greater are the chances of important errors hiding under the radar due to improper handling. The error handler object is responsible for making the error visible, for example by writing to a well-formatted logger, sending events to some monitoring product like Sentry, Rollbar, or Raygun. Most web frameworks, like Express, provide an error handling middleware mechanism. A typical error handling flow might be: Some module throws an error -> API router catches the error -> it propagates the error to the middleware (e.g. Express, KOA) who is responsible for catching errors -> a centralized error handler is called -> the middleware is being told whether this error is an untrusted error (not operational) so it can restart the app gracefully. Note that it’s a common, yet wrong, practice to handle errors within Express middleware – doing so will not cover errors that are thrown in non-web interfaces.

**Code Example – a typical error flow**
```
// DAL layer, we don't handle errors here
DB.addDocument(newCustomer, (error: Error, result: Result) => {
  if (error)
    throw new Error('Great error explanation comes here', other useful parameters)
});

// API route code, we catch both sync and async errors and forward to the middleware
try {
  customerService.addNew(req.body).then((result: Result) => {
    res.status(200).json(result);
  }).catch((error: Error) => {
    next(error)
  });
}
catch (error) {
  next(error);
}

// Error handling middleware, we delegate the handling to the centralized error handler
app.use(async (err: Error, req: Request, res: Response, next: NextFunction) => {
  const isOperationalError = await errorHandler.handleError(err);
  if (!isOperationalError) {
    next(err);
  }
});
```
**Code example – handling errors within a dedicated object**
```
class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await logger.logError(err);
    await sendMailToAdminIfCritical();
    await saveInOpsQueueIfCritical();
    await determineIfOperationalError();
  };
}

export const handler = new ErrorHandler();
```

Chúng ta không nên xử lý như sau:

**Code Example – Anti Pattern: handling errors within the middleware**
```
// middleware handling the error directly, who will handle Cron jobs and testing errors?
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.logError(err);
  if (err.severity == errors.high) {
    mailer.sendMail(configuration.adminMail, 'Critical error occured', err);
  }
  if (!err.isOperational) {
    next(err);
  }
});
```

 **2.5 Document API errors using Swagger or GraphQL**
 https://github.com/goldbergyoni/nodebestpractices/blob/master/sections/errorhandling/documentingusingswagger.md
 
 Nên sử dụng thư viện để log error đúng fomat 

ví dụng dùng: Swagger or GraphQL

**2.6 Exit the process gracefully when a stranger comes to town**

```
// Assuming developers mark known operational errors with error.isOperational=true, read best practice #3
process.on('uncaughtException', (error: Error) => {
  errorManagement.handler.handleError(error);
  if(!errorManagement.handler.isTrustedError(error))
    process.exit(1)
});

// centralized error object that derives from Node’s Error
export class AppError extends Error {
  public readonly isOperational: boolean;

  constructor(description: string, isOperational: boolean) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
    this.isOperational = isOperational;
    Error.captureStackTrace(this);
  }
}

// centralized error handler encapsulates error-handling related logic
class ErrorHandler {
  public async handleError(err: Error): Promise<void> {
    await logger.logError(err);
    await sendMailToAdminIfCritical();
    await saveInOpsQueueIfCritical();
    await determineIfOperationalError();
  };

  public isTrustedError(error: Error) {
    if (error instanceof AppError) {
      return error.isOperational;
    }
    return false;
  }
}

export const handler = new ErrorHandler();
```


### Tổng kết part 1
Do bài viết đến đây cũng hơi dài rồi để mọi người đỡ chán đọc thì mình sẽ viết tiếp vào buổi hôm sau: bạn nào thấy hay thì thì upvote giúp mình nhé.
Mọi người có thể vào đây tham khảo cùng mình nhé. Thấy cái gì hay ho thì cmt vào bài nhá.
https://github.com/goldbergyoni/nodebestpractices

Thanks!