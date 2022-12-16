# I. Style
## 1. Naming
- Các tên biến, hàm, phương thức, packages, modules được đặt tên là chữ thường với dấu gạch dưới (lower_case):
    - `lower_case_with_underscores`
- Classes and Exceptions được đặt tên theo kiểu viết hoa chữ cái đầu tiên của từ (UpperCase):
    - `Marvel`, `ExampleController`
- Protected methods và internal functions bắt đầu với một dấu gạch dưới, chữ thường:
    - `_example_function(variable, ...)`
- Private methods bắt đầu với hai dấu gạch dưới, chữ thường:
    - `__example_function(variable, ...)`
- Constant:
    - `ALL_CAPS_WITH_UNDERSCORES`
- Tránh các tên biến 1 chữ (đặc biệt là `l`, `O`, `I`). Ngoại lệ: Trong các đoạn ngắn, khi ý nghĩa của biến được hiển thị rõ ràng từ tình huống. 
    ```python
    for e in elements:
    e.mutate()
    ```
- Tránh ghi nhãn thừa:
    
    **Đúng:**
    ```python
    import audio
    core = audio.Core()
    controller = audio.Controller()
    ```
    
    **Sai:**
    ```python
    import audio
    core = audio.AudioCore()
    controller = audio.AudioController()
    ```
- Thích ký hiệu ngược:

    **Đúng:**
    ```python
    elements = ...
    elements_active = ...
    elements_defunct = ...
    ```
    
    **Sai:**
    ```python
    elements = ...
    active_elements = ...
    defunct_elements ...
- Tránh các phương thức getter và setter:

    **Đúng:**
    ```python
    person.age = 42
    ```
    
    **Sai:**
    ```python
    person.set_age(42)
- Indentation: Khoảng cách thụt lề luôn là 4 khoảng trắng không sử dụng tabs.
## 2. Imports: 
- Import toàn bộ modules thay vì các ký hiệu riêng lẻ trong 1 module

    **Đúng:**
    ```python
    import canteen
    import canteen.sessions
    from canteen import sessions
    ```
    
    **Sai:**
    ```python
    from canteen import get_user  # Symbol from canteen/__init__.py
    from canteen.sessions import get_session  # Symbol from canteen/sessions.py
    ```
    Ngoại lệ: Đối với mã của bên thứ ba nơi tài liệu nói rõ ràng để nhập các ký hiệu riêng lẻ.
- Đặt tất cả các import ở đầu trang với ba phần, mỗi phần được phân tách bằng một dòng trống, theo thứ tự:
    ```
    1. System import
    2. Third-party imports
    3. Local source tree imports
    ```
    Điều này để làm rõ với mỗi module đến từ đâu
## 3. Documentation
- Sử dụng tài liệu một dòng cho các chức năng rõ ràng:
    ```
    """Return the pathname of ``foo``."""
    ```
- Tài liệu nhiều dòng nên bao gồm: 
    - Tóm tắt
    - Các trường hợp sử dụng, nếu thích hợp
    - Luận điểm
    - Kiểu trả về và ý nghĩa, trừ trường hợp không trả về
    ```python
    """Train a model to classify Foos and Bars.

    Usage::

        >>> import klassify
        >>> data = [("green", "foo"), ("orange", "bar")]
        >>> classifier = klassify.train(data)

    :param train_data: A list of tuples of the form ``(color, label)``.
    :rtype: A :class:`Classifier <Classifier>`
    """
    ```
- Chú ý:
    - Sử dụng các từ hành động ("Return") thay vì mô tả ("Returns").
    - Sử dụng phương thức `__init__ ` trong chuỗi tài liệu cho lớp.
    ```python
    class Person(object):
    """A simple representation of a human being.

    :param name: A string, the person's name.
    :param age: An int, the person's age.
    """
    def __init__(self, name, age):
        self.name = name
        self.age = age
    ```
## 4. Comments
- Sử dụng một cách tiết kiệm. Code dễ đọc tốt hơn là có nhiều comment. Thông thường, các phương thức gọn gàng, ngắn gọn có hiệu quả hơn comment.
    
    **Sai:**
    ```python
    # If the sign is a stop sign
    if sign.color == 'red' and sign.sides == 8:
        stop()
    ```
    **Đúng:**
    ```python
    def is_stop_sign(sign):
        return sign.color == 'red' and sign.sides == 8
    
    if is_stop_sign(sign):
        stop()
    ```
- Khi bạn viết comment hãy nhớ áp dụng Strunk và White - [PEP 8](https://www.python.org/dev/peps/pep-0008/)
## 5. Line Lengths
- Don't stress over it. 80-100 characters is fine.
- Sử dụng dấu ngoặc đơn cho dòng kế tiếp:
    ```python
    wiki = (
        "The Colt Python is a .357 Magnum caliber revolver formerly manufactured "
        "by Colt's Manufacturing Company of Hartford, Connecticut. It is sometimes "
        'referred to as a "Combat Magnum". It was first introduced in 1955, the '
        "same year as Smith & Wesson's M29 .44 Magnum."
    )
    ```
# II. Testing
- Cố gắng cho phạm vi 100% code coverage, nhưng không bị ám ảnh về số % đó.
## 1. General testing guidelines
- Sử dụng tên dài, mô tả. Điều này thường làm giảm sự cần thiết về doctrings trong các phương thức test.
- Test nên được cô lập. Không tương tác với cơ sở dữ liệu hoặc network thật. Sử dụng một cơ sở dữ liệu thử nghiệm riêng biệt, hoặc sử dụng các mock objects.
- Prefer [factories](https://github.com/FactoryBoy/factory_boy) to fixtures.
- Không bao giờ để các test chưa hoàn thành pass, nếu không bạn sẽ có nguy cơ quên nó. Thay vào đó, thêm 1 placeholder giống như: `assert False, "TODO: finish me"`.
## 2. Unit Tests
- Tập trung vào từng phần nhỏ của một chức năng.
- Nên chạy nhanh, nhưng kiểm tra chậm thì tốt hơn là không kiểm tra.
- Nó thường có ý nghĩa để có một Class testcase cho một Class hoặc Model.
    ```python
    import unittest
    import factories

    class PersonTest(unittest.TestCase):
        def setUp(self):
            self.person = factories.PersonFactory()

        def test_has_age_in_dog_years(self):
            self.assertEqual(self.person.dog_years, self.person.age / 7)
    ```
## 3. Functional Tests
Các functional tests là các test cấp cao hơn gần với cách người dùng cuối tương tác với ứng dụng. Chúng thường được sử dụng cho các ứng dụng web và GUI:
- Viết các tests như kịch bản. Tên testcase và method test nên đọc giống như mô tả của kịch bản đó.
- Sử dụng các bình luận viết ra các kịch bản, trước khi viết mã kiểm tra.
    ```python
    import unittest

    class TestAUser(unittest.TestCase):

    def test_can_write_a_blog_post(self):
        # Goes to the her dashboard
        ...
        # Clicks "New Post"
        ...
        # Fills out the post form
        ...
        # Clicks "Submit"
        ...
        # Can see the new post
        ...
    ```
Lưu ý các testcase và method tests đọc cùng nhau như "Test A User can write a blog post".

# Nguồn

- [A "Best of the Best Practices" (BOBP) guide to developing in Python](https://gist.github.com/sloria/7001839#general-development-guidelines)
- [PEP 20 (The Zen of Python)][PEP 20]
- [PEP 8 (Style Guide for Python)][PEP 8]
- [The Hitchiker's Guide to Python][python-guide]
- [Khan Academy Development Docs][]
- [Python Best Practice Patterns][]
- [Pythonic Sensibilities][]
- [The Pragmatic Programmer][]
- and many other bits and bytes

[Pythonic Sensibilities]: http://www.nilunder.com/blog/2013/08/03/pythonic-sensibilities/
[Python Best Practice Patterns]: http://youtu.be/GZNUfkVIHAY
[python-guide]: http://docs.python-guide.org/en/latest/
[PEP 20]: http://www.python.org/dev/peps/pep-0020/
[PEP 257]: http://www.python.org/dev/peps/pep-0257/
[PEP 8]: http://www.python.org/dev/peps/pep-0008/
[Khan Academy Development Docs]: https://sites.google.com/a/khanacademy.org/forge/for-developers
[The Pragmatic Programmer]: http://www.amazon.com/The-Pragmatic-Programmer-Journeyman-Master/dp/020161622X/ref=sr_1_1?ie=UTF8&qid=1381886835&sr=8-1&keywords=pragmatic+programmer