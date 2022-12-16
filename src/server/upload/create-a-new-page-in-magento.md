![](https://images.viblo.asia/9565a722-5d94-498e-ae43-d0b0f7c301ee.png)

## 1. Tổng quan
* Mở đầu series chia sẻ về Magento lần này, mình sẽ trình bày cách tạo một page mới trong magnento. Chúng ta sẽ cùng tạo một page mới trả về JSON với một tham số "HELLO WORLD!" nhé. :D
* Để thêm một page mới trong magento2, chúng ta phải tạo một **controller**. 
* Trong Magento2, một controller là một file được đặt ở một nơi được quy định để magento có thể hiểu và response một **route** tương ứng.
* Một route trong Magento2 là một URL tiêu chuẩn bao gồm 3 phần: 
    * **frontName**
    * **controllerName**
    * **actionName**
 

    Chúng ta sẽ đi vào tìm hiểu magento sẽ dựa vào 3 phần này của route như thế nào để tương ứng với một file nhất định.
* Các bước để tạo một new page:
    * Tạo một module mới.
    * Tạo file routes.xml
    * Tạo file controller (action)

    Chúng ta hãy cùng đi vào cụ thể từng bước nhé. :D

## 2. Tạo một module mới
* Để tạo một module, bạn cần làm theo các bước sau:
    * Tạo một folder cho module.
    * Tạo file etc/module.xml
    * Tạo file registration.php
    * Chạy lệnh `bin/magento setup:upgrade`
* Thực hành luôn, chúng ta sẽ tạo một thư mực module tên là Learning_HelloPage
    ```
    $ cd <magento2_root>/app/code
    $ mkdir Learning
    $ mkdir Learning/HelloPage
    ```
* Tạo file registration.php
    ```php
    <?php /**
    * Copyright © 2016 Magento. All rights reserved. * See COPYING.txt for license details.
    */
    \Magento\Framework\Component\ComponentRegistrar::register( \Magento\Framework\Component\ComponentRegistrar::MODULE, 'Learning_HelloPage',
    __DIR__
    );
    ```
* Tạo file module.xml
    ```xml
    <?xml version="1.0"?>
    <!--
    /**
    * Copyright © 2016 Magento. All rights reserved. * See COPYING.txt for license details.
    */
    -->
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:Module/etc/module.xsd">
        <module name="Learning_HelloPage" setup_version="0.0.1">
        </module>
    </config>
    ```
    Như vậy là chúng ta đã tạo xong một module mới. Về Quy tắc đặt tên, cấu trúc thư mục, ý nghĩa của các file registration.php, module.xml mình sẽ trình bày cụ thể trong bài viết tiếp theo.
## 3. Tạo file routes.xml
* Trước khi đi vào tạo file routes.xml, chúng ta hãy cùng tìm hiểu xem một route hoạt động thế nào trong magento2 nhé.
* Magento có các **area**, chẳng hạn như **admin** - liên quan đến việc hiện thị bên trang admin, **frontend** liên quan đến việc hiện thị giao diện phía người dùng.
* Mỗi một area sẽ có một file routes.xml được merge từ các file `etc/area/routes.xml` từ tất cả các module.
* File route.xml sẽ chứa tất cả các thông tin về route đựợc đăng kí và **frontName**. Lưu ý rằng **frontName** sẽ là phần đầu của một route.
* Để dễ hiểu hơn chúng ta hãy đi vào thực hành nhé. Bởi vì chúng ta đang tạo một page return về JSON cho user, tức là đang trong frontend area. Do đó chúng ta sẽ tạo một file `ect/frontend/routes.xml` cho module `Learning_HelloPage`
    ```xml
    <?xml version="1.0"?>
    <!--
    /**
    * Copyright © 2016 Magento. All rights reserved. * See COPYING.txt for license details.
    */
    -->
    <config xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="urn:magento:framework:App/etc/routes.xsd">
        <router id="standard">
            <route id="learning" frontName="test">
                <module name="Learning_HelloPage" />
            </route>
        </router>
    </config>
    ```
* Chúng ta vừa thêm một route tên là `learning`.Lưu ý là tên của route không nhất thiết phải trùng với tên của module.
* frontName mà chúng ta tạo lfa `test`. Thông thường tên route và frontName là giống nhau nhưng cũng không bắt buộc phải vậy.
* Khi magento xử lý một route `test/chunk2/chunk3`, magento sẽ kiểm tra liệu trong thư mục module `Learning_HelloPage` có thư mục `Controller/Chunk2` hay không. Tiếp đến trong thư mục Chunk2 có action file `Chunk3` hay không.
* Ở đây route của chúng ta sẽ là `test/page/view`. Chúng ta hãy cùng tạo file Controller để magento có thể hiểu và lấy làm file xử lý route này nhé.
## 4. Tạo file controller (file action)
* Như đã nó ở bên trên, với route `test/page/view`, Magento sẽ tìm đến thư mục Controller/Page, tiếp đó  tìm đến file View.php
* Chúng ta thêm controller như sau:
    ```
    $ cd <magento2_root>/app/code/Learning/HelloPage
    $ mkdir Controller
    $ mkdir Controller/Page
    ```

    Tạo action file `Controller/Page/View.php`:
    ```php
    <?php /**
     * Copyright © 2016 Magento. All rights reserved.
     * See COPYING.txt for license details.
     */
    namespace Learning\HelloPage\Controller\Page;
    class View extends \Magento\Framework\App\Action\Action
    {
        /**
         * @var \Magento\Framework\Controller\Result\JsonFactory
         */
        protected $resultJsonFactory;
        /**
         * @param \Magento\Framework\App\Action\Context $context
         * @param \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory
         */
        public function __construct(
           \Magento\Framework\App\Action\Context $context,
           \Magento\Framework\Controller\Result\JsonFactory $resultJsonFactory)
    {
           $this->resultJsonFactory = $resultJsonFactory;
           parent::__construct($context);
    }
        /**
         * View  page action
         *
         * @return \Magento\Framework\Controller\ResultInterface
         */
        public function execute()
        {
           $result = $this->resultJsonFactory->create();
           $data = ['message' => 'Hello world!'];

    return $result->setData($data);
    } }
    ```
* Việc còn lại là active module và page của chúng ta bằng cách chạy câu lệnh **Magento setup uprade**
    ```
    $ cd <magento2_root>
    $ php bin/magento setup:upgrade
    ```
* Đến đây chúng ta có thể test page của chúng ta bằng cách gõ đường link `/test/page/view`. Chúng ta sẽ nhìn thấy message hiện lên trên trang 
    ```json
    {"message":"Hello world!"}
    ```
*  Ở bài viết này chủ yếu đi vào cách tạo một page mới nên chúng ta xây dựng một trang trả về một **ResultJson**. Ngoài ra magento2 có rất nhiều kiểu Result Object cho các trừờng hợp khác  như ResultPage, Forward Result...
## Tổng kết.
* Bài viết  là một bài cơ bản, đơn giản về cách tạo một page trong Magento2. Mong bài viết sẽ hữu ích cho các bạn beginner bắt đầu mày mò nghiên cứu về magento. Mình cũng mới dấn thân vào con đường Magento nên mong các bạn góp ý cho bài viết và hãy cùng mình học tập tìm hiểu về magento trong những bài viết tiếp theo nhé. see ya :kissing_heart:
* Link gốc của bài viết https://huongvnq.github.io/2021/07/17/create-a-new-page-in-magento2/
* Bài viết tham khảo https://devdocs.magento.com/videos/fundamentals/create-a-new-page/