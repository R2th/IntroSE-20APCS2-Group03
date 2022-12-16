![](https://images.viblo.asia/18f334d6-93d2-45c9-a610-963fcf7728c3.jpg)
## 1.Lời mở đầu
* Routing là một trong những phần rất quan trọng trong luồng hoạt động của Magento2.
* Routing sẽ chịu trách nhiệm xử lý URL request, từ URL sẽ chỉ ra module nào chịu trách nhiệm xử lý request và thực thi controller action.
* Trong bài viết này, chúng ta sẽ cùng đi tìm hiểu cách mà router sẽ "match" với controller action như thế nào. Sau đó sẽ tìm hiểu cách tạo một custom router. Hãy cùng đi vào nội dung của bài viết thôi nào :smile: 
## 2.Magento2 Request Flow
* Trong Magento2, một request URL sẽ như thế này 
    ```
    http://example.com/index.php/front_name/controller/action
    ```
* Trong url trên, **front_name** sẽ được dùng để chỉ định module. **Router** sẽ định nghĩa cái tên này cho mỗi module trong file **routes.xml**
* Khi bạn tạo một request trong Magento2, Magento2 sẽ xử lý theo luồng như sau 


    ![](https://images.viblo.asia/9c8e501b-327b-4a77-b0b3-599a1f766644.png)

* **FrontController** sẽ được gọi đến trong class Http để điều hướng request.
    Chúng ta hãy cùng xem File `vendor/magento/framework/App/FrontController.php`
    ```php
    public function dispatch(RequestInterface $request)
    {
       \Magento\Framework\Profiler::start('routers_match');
       $routingCycleCounter = 0;
       $result = null;
       while (!$request->isDispatched() && $routingCycleCounter++ < 100) {
           /** @var \Magento\Framework\App\RouterInterface $router */
           foreach ($this->_routerList as $router) {
               try {
                   $actionInstance = $router->match($request);
                   if ($actionInstance) {
                       $request->setDispatched(true);
                       $this->response->setNoCacheHeaders();
                       if ($actionInstance instanceof \Magento\Framework\App\Action\AbstractAction) {
                           $result = $actionInstance->dispatch($request);
                       } else {
                           $result = $actionInstance->execute();
                       }
                       break;
                   }
               } catch (\Magento\Framework\Exception\NotFoundException $e) {
                   $request->initForward();
                   $request->setActionName('noroute');
                   $request->setDispatched(false);
                   break;
               }
           }
       }
       \Magento\Framework\Profiler::stop('routers_match');
       if ($routingCycleCounter > 100) {
           throw new \LogicException('Front controller reached 100 router match iterations');
       }
       return $result;
    }
    ```
    Chúng ta có thể thấy ở hàm `dispatch`, router list sẽ được cho vào vòng lặp để tìm kiếm router nào sẽ match với request. Khi tìm ra controller action nào "match" với request, action đó sẽ được gọi và thực thi.
## 3.Tạo một custom route trong area Frontend
* Trước khi đi vào tạo một route, chúng ta hãy tạo một module, tham khảo bài viết [Create a Module in Magento2](https://viblo.asia/p/create-a-module-in-magento2-yMnKM87N57P)
* Ở đây mình tạo Module là Learning_Routing
* Để đăng kí một frontend route, chúng ta phải tạo file routes.xml
   File `app/code/Learning/Routing/etc/frontend/routes.xml`
    ```xml
    <?xml version="1.0" ?>
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/etc/routes.xsd">
        <!--Use router 'standard' for frontend route-->
        <router id="standard">
            <!--Define a custom route with id and frontName-->
            <route frontName="helloworld" id="helloworld">
                <!--The module which this route match to-->
                <module name="Learning_Routing"/>
            </route>
        </router>
    </config>
    ```
* Thật đơn giản để đăng kí một route. Ở đây ta phải sử dụng **standard router** cho area Frontend. Route này sẽ có một route con định nghĩa module cho nó và 2 attribute:
    * Attribute **id** là một chuỗi unique định danh một route. Chúng ta cũng sẽ sử dụng chuỗi này để khai báo layout cho action của module.
    * Attribute **frontName** cũng là một chuỗi unique, chuỗi này được chỉ định trong url.
    
    Ví dụ nếu bạn khai báo một route như sau 
    ```
    <route frontName="helloworld" id="helloworld">
    ```

   Thì Url sẽ là
    ```
    http://example.com/index.php/helloworld/controller/action
    ```
    
    Layout cho action này sẽ là
    ```
    helloworld_controller_action.xml 
    ```

    Và chúng ta phải tạo controller action ở trong thư mục 
    ```
    {namespace}/{module}/Controller/{Controller}/{Action}.php
    ```
## 4. Tạo một custom route trong area Admin (Admin Route)
* Route này tương tự như route cho Frontend chỉ khác là chúng ta sẽ khai báo nó trong thư mục adminhtml và với router id là **admin**

   File `app/code/Learning/Routing/etc/adminhtml/routes.xml`
    ```xml
    <?xml version="1.0"?>
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/etc/routes.xsd">
        <!--Use router 'admin' for admin route -->
        <router id="admin">
            <!--Define a custom route with id and frontName -->
            <route id="learning_routing" frontName="learning_routing">
                <!--The module which this route match to-->
                <module name="Learning_Routing"/>
            </route>
        </router>
    </config>
    ```

* Một URL của một admin page sẽ có cấu trúc tương tự như đối với frontend page, tuy nhiên **admin_area** sẽ được thêm vào ở đằng trước **frontName** để chỉ định đây là một route của area Admin.
    Ví dụ url của một admin csm page
    ```
    http://example.com/index.php/admin/learning_routing/controller/action
    ```
* Controller Action cho admin page cũng sẽ được thêm vào bên trong thư mục Controller/Adminhtml
    ```
    {namespace}/{module}/Controller/Adminhtml/{Controller}/{Action}.php
    ```
    
##  5. Cách sử dụng route để ghì đè controller của core
* Như chúng ta đã thấy ở những phần bên trên, mỗi route sẽ có một **id** để định danh. Vậy điều gì sẽ xảy ra nếu chúng ta định nghĩa 2 route với cùng một id?
* Câu trả lời là action controller sẽ tìm thấy ở cả 2 modules. Và chúng ta phải sử dụng attribute **before/after** để config thứ tự module, chỉ định module nào sẽ được tìm thấy trước.
* Ví dụ, nếu mà chúng ta muốn ghi đè controller `customer/account/login` chúng ta sẽ định route trong **route.xml** như thế này: 
    ```xml
    <?xml version="1.0"?>
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/etc/routes.xsd">
       <!--Use router 'standard' for frontend route-->
       <router id="standard">
            <!--Define a custom route with id and frontName-->
            <route frontName="helloworld" id="helloworld">
                <!--The module which this route match to-->
                <module name="Learning_Routing"/>
            </route>
           <route id="customer">
               <module name="Learning_Routing" before="Magento_Customer" />
           </route>
       </router>
    </config>
    ```
    Sau đó định nghĩa một file controller : 
    `app/code/Learning/Routing/Controller/Account/Login.php`
* Khi đó, **FrontController** sẽ tìm thấy action Login ở trong Module Learning_Routing trước, action này sẽ được chạy và action Login của Magento_Customer sẽ không được chạy nữa. Như vậy là chúng ta đã thực hiện ghi đè Controller thành công. 
## 6. Tổng kết
* Route là một phần cơ bản mà chúng ta phải biết khi tìm hiểu về luồng hoạt động của Magento. Qua bài viết này mong các bạn sẽ nắm được cách hoạt động của một route và đặc biệt là các quy tắc đặt tên để Magento có thể nhận biết và xử lý. Cảm ơn các bạn đã đọc đến cuối bài viết và hẹn gặp lại các bạn trong các bài viết tiếp theo của serries Tìm hiểu về Magento. :kissing_heart:
* Bản gốc của bài viết : https://huongvnq.github.io/2021/07/20/routing-in-magento2/
* Nguồn tham khảo: https://www.mageplaza.com/magento-2-module-development/magento-2-routing.html