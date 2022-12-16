Tuần vừa qua mình mới join vào dự án ec-cube là một cms xây dựng dựa trên symfony framework, trong bài viết này mình sẽ hướng dẫn các bạn xây dựng ứng dụng CRUD cơ bản.
# Giới thiệu
> Symfony is a set of PHP Components, a Web Application framework, a Philosophy, and a Community — all working together in harmony.
- Symfony framework:  Một PHP framework hàng đầu để tạo các trang web và ứng dựng web. Được xây dựng dựng dựa trên các Symfony Component.
- Symfony component: Tập các thành phần tách rời và có thể tái sử dụng, một số ứng dụng PHP được xây dựng như Drupal, phpBB, eZ Publish...
- Community: Cộng đồng khoảng hơn 600.000 developers đến từ hơn 120 quốc gia.
- Philosophy: Thúc đẩy tính chuyên nghiệp, thực tiễn tốt nhất, tiêu chuẩn hóa và khả năng tương tác của các ứng dụng.
# Cài đặt
-  Chạy lên command line ` wget https://get.symfony.com/cli/installer -O - | bash`
-  Cài đặt nó trên global: `mv /home/linhdn1198/.symfony/bin/symfony /usr/local/bin/symfony`
-  Kiểm tra version
![](https://images.viblo.asia/edb101ce-38d7-4917-88cb-b08f62b2d822.png)

-  Tạo project mới  `symfony new my_project_name` hoặc  `composer create-project symfony/website-skeleton my_project_name`
# Bắt đầu 
## Cài đặt một số component
- `composer require annotations`: Cho phép bạn sử dụng chú thích để định nghĩa 1 route VD: 
- `composer require twig`: Template cho phép bạn sử dụng một số cú pháp đặc thù ngoài view. 
- `composer require symfony/maker-bundle --dev`:  Cho phép bạn thực hiện lệnh command make để tạo entity, controller, form ...
- `composer require symfony/orm-pack`: Hỗ trợ thao tác với database.
- `composer require form validator security-csrf`: Hỗ trợ tạo form, validate dữ liệu và bảo mật csrf cho form.
## Các thành phần trong symfony
- Entity: Lớp này sử dụng Doctrine để tạo các thực thể và giao tiếp với CSDL.
    -  `@ORM\Entity(repositoryClass="App\Repository\SimNumberRepository")`: Định nghĩa lớp Repository cho Entity.
    -  `@ORM\Id()` Set $id là khóa chính.
    -  `@ORM\GeneratedValue()` Set giá trị tự sinh.
    -  `@ORM\Column(type="integer")` Set kiểu dữ liệu.
    -  Ngoài ra còn có quan hệ: `@OneToMany`, `@ManyToOne`, `@ManyToMany`...
```php:src/Entity/SimNumber.php
<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="App\Repository\SimNumberRepository")
 */
class SimNumber
{
    /**
     * @ORM\Id()
     * @ORM\GeneratedValue()
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="string", length=14)
     */
    private $number;

    /**
     * @ORM\Column(type="decimal", precision=10, scale=0)
     */
    private $price;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getNumber(): ?string
    {
        return $this->number;
    }

    public function setNumber(string $number): self
    {
        $this->number = $number;

        return $this;
    }

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): self
    {
        $this->price = $price;

        return $this;
    }
}
```
- Repository: Lớp kế thừa  `ServiceEntityRepository.php` trong lớp này lại kế thừa `EntityRepository.php` có định nghĩa các hàm cơ bản find(), findOneBy(), findAll(), findBy(). 
```php:scr/Repository/SimNumberRepository.php
<?php

namespace App\Repository;

use App\Entity\SimNumber;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @method SimNumber|null find($id, $lockMode = null, $lockVersion = null)
 * @method SimNumber|null findOneBy(array $criteria, array $orderBy = null)
 * @method SimNumber[]    findAll()
 * @method SimNumber[]    findBy(array $criteria, array $orderBy = null, $limit = null, $offset = null)
 */
class SimNumberRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, SimNumber::class);
    }
}
```
- Controller: Trong controller có thể định tuyến các route `@Route("<url>", name="<name_route>", methods={"<GET, POST...>"})`.
```src/Controller/SimNumberController.php
<?php

namespace App\Controller;

use App\Entity\SimNumber;
use App\Form\SimNumberType;
use App\Repository\SimNumberRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route("/sim-number")
 */
class SimNumberController extends AbstractController
{
    /**
     * @Route("/", name="sim_number_index", methods={"GET"})
     */
    public function index(SimNumberRepository $simNumberRepository): Response
    {
        return $this->render('sim_number/index.html.twig', [
            'sim_numbers' => $simNumberRepository->findAll(),
        ]);
    }
}
```
- Form: Lớp này để tạo ra form với method add('<name_input>', '<type_input>', [<opstions>])
```php:src/Form/SimNumberType.php
<?php

namespace App\Form;

use App\Entity\SimNumber;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type\TextType;
use Symfony\Component\Form\Extension\Core\Type\NumberType;
use Symfony\Component\Form\Extension\Core\Type\SubmitType;

class SimNumberType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('number', TextType::class, [
                'attr' => [
                    'class' => 'form-control',
                ]
            ])
            ->add('price', NumberType::class, [
                'attr' => [
                    'class' => 'form-control',
                ]
            ])
        ;
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'data_class' => SimNumber::class,
        ]);
    }
}
```
- Twig: Là một template cho phép viết các cú pháp ngắn gọi, dễ đọc, thân thiện. Một số cú pháp cơ bản.
    - `{{ ... }}`: Dùng để hiển thị nội dung của biến hoặc kết quả của biểu thức điều kiện.
    - `{% ... %}`: Dùng để xử lý mội vài logic điều kiện, vòng lặp.
    - `{# ... #}`: Được dùng để comment.
```html:template/base.html.twig
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}Welcome!{% endblock %}</title>
        {% block stylesheets %}{% endblock %}
    </head>
    <body>
        <div class="container">
            {% block body %}{% endblock %}
        </div>
        {% block javascripts %}{% endblock %}
    </body>
</html>
```
```html:template/sim_number/index.html.twig
{% extends 'base.html.twig' %}

{% block title %}SimNumber index{% endblock %}

{% block body %}
    <h1>SimNumber index</h1>

    <table class="table table-border table-hover">
        <thead>
            <tr>
                <th>Id</th>
                <th>Number</th>
                <th>Price</th>
                <th>actions</th>
            </tr>
        </thead>
        <tbody>
        {% for sim_number in sim_numbers %}
            <tr>
                <td>{{ sim_number.id }}</td>
                <td>{{ sim_number.number }}</td>
                <td>{{ sim_number.price }}</td>
                <td>
                    <a href="{{ path('sim_number_show', {'id': sim_number.id}) }}" class="btn btn-outline-info">show</a>
                    <a href="{{ path('sim_number_edit', {'id': sim_number.id}) }}" class="btn btn-outline-warning">edit</a>
                </td>
            </tr>
        {% else %}
            <tr>
                <td colspan="4">no records found</td>
            </tr>
        {% endfor %}
        </tbody>
    </table>

    <a href="{{ path('sim_number_new') }}" class="btn btn-primary">Create new</a>
{% endblock %}
```
## Bắt đầu xây dựng
 - Khởi động server symfony dưới local `symfony server:start`
 - Chỉnh sửa file .env `DATABASE_URL=mysql://db_user:db_password@127.0.0.1:3306/db_name?serverVersion=5.7`
 -  Cấu hình của tôi là `DATABASE_URL=mysql://root:password@127.0.0.1:3306/symfony?serverVersion=5.7`
 - Tạo entity bằng lệnh sau `php bin/console make:entity SimNumber`

![](https://images.viblo.asia/c6a8e245-c974-4eea-b743-4c18a1c842b5.png)

 - Sau khi tạo xong entity ta vào phpmyadmin tạo databse với tên đã config trong file .env và bắt đầu gen database.
     - `php bin/console doctrine:schema:update --dump-sql` Debug xem câu lệnh tạo database
     - `php bin/console doctrine:schema:update --force` Tiên hành update database
- Bây giờ có database rồi, ta dùng cmd make crud, nó sẽ gen cho chúng ta đầy đủ các file và mã nguồn cho chức năng crud

![](https://images.viblo.asia/fd4cdf53-de52-427d-8dc7-2a64304d71e2.png)

- Ở đây tôi custom lại url /sim/number -> /sim-number trong file src/Controller/SimNumberController.php line 13->15
```php
/**
 * @Route("/sim-number")
 */
```
- Để cho giao diện dễ nhìn hơn tôi có thêm bootstrap vào file templates/base.html.twig và chỉnh sửa một chút giao diện.
```html
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <title>{% block title %}Welcome!{% endblock %}</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
        {% block stylesheets %}{% endblock %}
    </head>
    <body>
        <div class="container">
            {% block body %}{% endblock %}
        </div>
        <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
        {% block javascripts %}{% endblock %}
    </body>
</html>

```
- Bây giờ vào đường dẫn http://127.0.0.1:8000/sim-number/ để xem kết quả nào ~

![](https://images.viblo.asia/0a53d762-7f4a-4791-9f7e-9287dca71795.gif)
- [Pull setup](https://github.com/linhdn-0941/symfony/pull/1)
- [Pull CRUD SimNumber](https://github.com/linhdn-0941/symfony/pull/2)
- [Link repo](https://github.com/linhdn-0941/symfony)
# Tài liệu tham khảo
-  [Routing](https://symfony.com/doc/current/routing.html)
-  [Controller](https://symfony.com/doc/current/controller.html)
-  [Templates](https://symfony.com/doc/current/templates.html)
-  [The Symfony MakerBundle](https://symfony.com/doc/current/bundles/SymfonyMakerBundle/index.html)
-  [Form](https://symfony.com/doc/current/forms.html)
-  [Databases and the Doctrine ORM](https://symfony.com/doc/current/doctrine.html)