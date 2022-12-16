### 1. Setup môi trường project
Đầu tiên, chúng ta cần cài thêm 1 số package zend sau
```composer.json
"require": {
    //
    "zendframework/zend-db": "^2.8.1",
    "zendframework/zend-mvc-form": "^1.0",
    "zendframework/zend-navigation": "^2.8",
    "zendframework/zend-paginator": "^2.7",
    "zendframework/zend-inputfilter": "^2.7",
},
```
Sau khi cài đặt, hãy import chúng vào project bằng cách khai báo chúng trong modules.config
```config\modules.config.php
return [
    'Zend\InputFilter',
    'Zend\Filter',
    'Zend\Paginator',
    'Zend\Navigation',
    'Zend\Form',
    'Zend\Db',
    'Zend\Validator',
];
```
Đây là những module cần thiết trong quá trình làm task, nhìn tên là bạn cũng đã đoán ra chúng dùng để làm gì rồi đúng không :)

Tiếp theo chúng ta cần kết nối database

Trước hết, bạn cần tạo 1 database cho project này, và mình đã tạo 1 cái tên là `my_db`. Sau đó, chúng ta sẽ khai báo database này trong file global của thư mục config:
```config\autoload\global.php
return [
    'db' => [
        'driver' => 'Pdo',
        'dsn'    => 'mysql:dbname=my_db;host=127.0.0.1;charset=utf8',
        'username'       => 'root',
    ],
];
```

Vậy là xong rồi đó :)
### 2. Tạo và khai báo Module mới

Tương tự như module Application có sẵn, mình sẽ tạo 1 module là Album như vậy

```
MyProject/
    /module
        /Album
            /config
            /src
                /Controller
                /Form
                /Model
            /view
                /album
                    /album
```

Sau đó, bạn thêm vào đây 1 file Module.php vào thư mục `Album` này, để định nghĩa Module
```module\Album\Module.php
namespace Album;

use Zend\ModuleManager\Feature\ConfigProviderInterface;

class Module implements ConfigProviderInterface
{
    public function getConfig()
    {
        return include __DIR__ . '/../config/module.config.php';
    }
}
```

Giờ chúng ta đã có được module `Album`, và tiếp theo chúng ta cần phải khai báo nó.

Đầu tiên là để autoload. 

Mặc dù Zend Framework cung cấp khả năng tự động tải thông qua zend-loader của nó, tuy nhiên chsung ta nên sử dụng tính năng autoloading của composer. Do đó, chúng tôi cần khai báo cho Composer về module mới được định nghĩa của chúng ta.
```compose.json
"autoload": {
    "psr-4": {
        "Application\\": "module/Application/src/",
        "Album\\": "module/Album/src/"
    }
},
```
Tiếp theo, chúng ta cần import nó trong file config
```config\modules.config.php
return [
    // other modules...
    'Application',
    'Album',
];
```

Việc config cho module như vậy là oke rồi. Sau đây sẽ là phần code và config bên trong module này, để khai báo và định nghĩa cho các thành phần table, view, controller,...

### 3. Xây dựng module Album

1. **Tạo Model**

    ```module\Album\src\Model\Album.php
    <?php

    namespace Album\Model;

    use DomainException;
    use Zend\InputFilter\InputFilter;
    use Zend\InputFilter\InputFilterAwareInterface;
    use Zend\InputFilter\InputFilterInterface;

    //model
    class Album
    {
        public  $id;

        public  $artist;

        public  $title;

        private $inputFilter;

        public function exchangeArray(array $data)
        {
            $this->id     = (!empty($data['id'])) ? $data['id'] : null;
            $this->artist = (!empty($data['artist'])) ? $data['artist'] : null;
            $this->title  = (!empty($data['title'])) ? $data['title'] : null;
        }

        public function getArrayCopy()
        {
            return [
                'id'     => $this->id,
                'artist' => $this->artist,
                'title'  => $this->title,
            ];
        }
    }
    ```

2. **Tạo Repository**

    ```module\Album\src\Repositories\AlbumRepository.php
    <?php

    namespace Album\Repositories;

    use RuntimeException;
    use Zend\Db\TableGateway\TableGatewayInterface;
    use Zend\Db\ResultSet\ResultSet;
    use Zend\Db\Sql\Select;
    use Zend\Db\TableGateway\TableGateway;
    use Zend\Paginator\Adapter\DbSelect;
    use Zend\Paginator\Paginator;

    //repository
    class AlbumRepository
    {
        private $tableGateway;

        public function __construct(TableGatewayInterface $tableGateway)
        {
            $this->tableGateway = $tableGateway;
        }

        public function fetchAll($paginated = false)
        {
            if ($paginated) {
                return $this->fetchPaginatedResults();
            }

            return $this->tableGateway->select();
        }

        private function fetchPaginatedResults()
        {
            // Create a new Select object for the table:
            $select = new Select($this->tableGateway->getTable());

            // Create a new result set based on the Album entity:
            $resultSetPrototype = new ResultSet();
            $resultSetPrototype->setArrayObjectPrototype(new Album());

            // Create a new pagination adapter object:
            $paginatorAdapter = new DbSelect(
            // our configured select object:
                $select,
                // the adapter to run it against:
                $this->tableGateway->getAdapter(),
                // the result set to hydrate:
                $resultSetPrototype
            );

            $paginator = new Paginator($paginatorAdapter);

            return $paginator;
        }

        public function getAlbum($id)
        {
            $id     = (int) $id;
            $rowset = $this->tableGateway->select(['id' => $id]);
            $row    = $rowset->current();
            if (!$row) {
                throw new RuntimeException(sprintf(
                    'Could not find row with identifier %d',
                    $id
                ));
            }

            return $row;
        }

        public function saveAlbum(Album $album)
        {
            $data = [
                'artist' => $album->artist,
                'title'  => $album->title,
            ];

            $id = (int) $album->id;

            if ($id === 0) {
                $this->tableGateway->insert($data);

                return;
            }

            if (!$this->getAlbum($id)) {
                throw new RuntimeException(sprintf(
                    'Cannot update album with identifier %d; does not exist',
                    $id
                ));
            }

            $this->tableGateway->update($data, ['id' => $id]);
        }

        public function deleteAlbum($id)
        {
            $this->tableGateway->delete(['id' => (int) $id]);
        }
    }
    ```
3. **Tạo Controller**
    ```module\Album\src\Controller\AlbumController.php
    <?php

    namespace Album\Controller;

    use Album\Form\AlbumForm;
    use Album\Model\Album;
    use Album\Repositories\AlbumRepository;
    use Zend\Mvc\Controller\AbstractActionController;
    use Zend\View\Model\ViewModel;

    class AlbumController extends AbstractActionController
    {
        private $repository;

        public function __construct(AlbumRepository $repository)
        {
            $this->repository = $repository;
        }

        public function indexAction()
        {
            // Grab the paginator from the AlbumTable:
            $paginator = $this->repository->fetchAll(true);

            // Set the current page to what has been passed in query string,
            // or to 1 if none is set, or the page is invalid:
            $page = (int) $this->params()->fromQuery('page', 1);
            $page = ($page < 1) ? 1 : $page;
            $paginator->setCurrentPageNumber($page);

            // Set the number of items per page to 10:
            $paginator->setItemCountPerPage(10);

            return new ViewModel(['paginator' => $paginator]);
        }

        public function addAction()
        {
            $form = new AlbumForm();
            $form->get('submit')->setValue('Add');

            $request = $this->getRequest();

            if (!$request->isPost()) {
                return ['form' => $form];
            }

            $album = new Album();
            $form->setInputFilter($album->getInputFilter());
            $form->setData($request->getPost());

            if (!$form->isValid()) {
                return ['form' => $form];
            }

            $album->exchangeArray($form->getData());
            $this->repository->saveAlbum($album);

            return $this->redirect()->toRoute('album');
        }

        public function editAction()
        {
            $id = (int) $this->params()->fromRoute('id', 0);

            if (0 === $id) {
                return $this->redirect()->toRoute('album', ['action' => 'add']);
            }

            // Retrieve the album with the specified id. Doing so raises
            // an exception if the album is not found, which should result
            // in redirecting to the landing page.
            try {
                $album = $this->repository->getAlbum($id);
            } catch (\Exception $e) {
                return $this->redirect()->toRoute('album', ['action' => 'index']);
            }

            $form = new AlbumForm();
            $form->bind($album);
            $form->get('submit')->setAttribute('value', 'Edit');

            $request  = $this->getRequest();
            $viewData = ['id' => $id, 'form' => $form];

            if (!$request->isPost()) {
                return $viewData;
            }

            $form->setInputFilter($album->getInputFilter());
            $form->setData($request->getPost());

            if (!$form->isValid()) {
                return $viewData;
            }

            $this->repository->saveAlbum($album);

            // Redirect to album list
            return $this->redirect()->toRoute('album', ['action' => 'index']);
        }

        public function deleteAction()
        {
            $id = (int) $this->params()->fromRoute('id', 0);
            if (!$id) {
                return $this->redirect()->toRoute('album');
            }

            $request = $this->getRequest();
            if ($request->isPost()) {
                $del = $request->getPost('del', 'No');

                if ($del == 'Yes') {
                    $id = (int) $request->getPost('id');
                    $this->repository->deleteAlbum($id);
                }

                // Redirect to list of albums
                return $this->redirect()->toRoute('album');
            }

            return [
                'id'    => $id,
                'album' => $this->repository->getAlbum($id),
            ];
        }
    }
    ```
4. **Tạo view**
    Chúng ta sẽ cần 4 trang cho CRUD như vậy
    ```
    module/Album/view/album/album/index.phtml
    module/Album/view/album/album/add.phtml
    module/Album/view/album/album/edit.phtml
    module/Album/view/album/album/delete.phtml
    ```
    
    Mình sẽ ví dụ một file index, các file khác bạn có thể xem chi tiết trong source code
    
    ```php:module\Album\view\album\album\index.phtml
    <?php
    $title = 'My albums';
    $this->headTitle($title);
    ?>
    <h1><?= $this->escapeHtml($title); ?></h1>
    <p>
        <a href="<?= $this->url('album', ['action' => 'add']) ?>">Add new album</a>
    </p>

    <table class="table">
        <tr>
            <th>Title</th>
            <th>Artist</th>
            <th>&nbsp;</th>
        </tr>
        <?php foreach ($this->paginator as $album) : // <-- change here! ?>
            <tr>
                <td><?= $this->escapeHtml($album->title) ?></td>
                <td><?= $this->escapeHtml($album->artist) ?></td>
                <td>
                    <a href="<?= $this->url('album', ['action' => 'edit', 'id' => $album->id]) ?>">Edit</a>
                    <a href="<?= $this->url('album', ['action' => 'delete', 'id' => $album->id]) ?>">Delete</a>
                </td>
            </tr>
        <?php endforeach; ?>
    </table>

    <?= $this->paginationControl(
    // The paginator object:
        $this->paginator,
        // The scrolling style:
        'sliding',
        // The partial to use to render the control:
        'partial/paginator',
        // The route to link to when a user clicks a control link:
        ['route' => 'album']
    ); ?>
    ```

5. **Config module**

    Cuối cùng, chúng ta cần config để khai báo những gì chúng ta vừa code
    
    Đầu tiên là trong file định nghĩa Module
    ```module\Album\Module.php
    <?php

    namespace Album;

    use Zend\Db\Adapter\Adapter;
    use Zend\Db\Adapter\AdapterInterface;
    use Zend\Db\ResultSet\ResultSet;
    use Zend\Db\TableGateway\TableGateway;
    use Zend\ModuleManager\Feature\ConfigProviderInterface;

    class Module implements ConfigProviderInterface
    {
        public function getConfig()
        {
            return include __DIR__ . '/config/module.config.php';
        }

        public function getServiceConfig()
        {
            return [
                'factories' => [
                    Model\AlbumTable::class        => function ($container) {
                        $tableGateway = $container->get('Model\AlbumTableGateway');

                        return new Model\AlbumTable($tableGateway);
                    },
                    'Model\AlbumTableGateway' => function ($container) {
                        $dbAdapter          = $container->get(AdapterInterface::class);
                        $resultSetPrototype = new ResultSet();
                        $resultSetPrototype->setArrayObjectPrototype(new Model\Album());

                        return new TableGateway('album', $dbAdapter, null, $resultSetPrototype);
                    },
                ],
            ];
        }

        public function getControllerConfig()
        {
            return [
                'factories' => [
                    Controller\AlbumController::class => function ($container) {
                        return new Controller\AlbumController(
                            $container->get(Model\AlbumTable::class)
                        );
                    },
                ],
            ];
        }
    }
    ```
    
    Tiếp theo là trong file config của module
    ```module\Album\config\module.config.php
    <?php

    namespace Album;

    use Zend\Router\Http\Segment;

    return [
        'router' => [
            'routes' => [
                'album' => [
                    'type'    => Segment::class,
                    'options' => [
                        'route'       => '/album[/:action[/:id]]',
                        'constraints' => [
                            'action' => '[a-zA-Z][a-zA-Z0-9_-]*',
                            'id'     => '[0-9]+',
                        ],
                        'defaults'    => [
                            'controller' => Controller\AlbumController::class,
                            'action'     => 'index',
                        ],
                    ],
                ],
            ],
        ],

        'view_manager' => [
            'template_path_stack' => [
                'album' => __DIR__ . '/../view',
            ],
        ],
    ];
    ```

Vậy là xong, chạy thử thôi nào ;)