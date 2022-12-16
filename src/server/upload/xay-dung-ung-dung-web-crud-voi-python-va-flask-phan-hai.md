Chào mọi người.
Tiếp theo phần một: [xây dựng ứng dụng web CRUD với Python và Flask](https://viblo.asia/p/xay-dung-ung-dung-web-crud-voi-python-va-flask-phan-mot-naQZRyydKvx). Đây là phần hai của hướng dẫn để xây dựng một ứng dụng web quản lý nhân viên. Trong phần một trước, mình đã thiết lập cơ sở dữ liệu `MySQL` bằng `MySQL-Python` và `Flask-SQLAlchemy`. Mình tạo ra `models`, `migrated database`, và làm việc trên folder `home` và `auth` của blueprints và các templates. Đến cuối phần một, mình đã có một ứng dụng  có trang chủ, đăng ký, đăng nhập và dashboard. Mình đã có thể đăng ký một người dùng mới, đăng nhập và đăng xuất.

Trong phần hai này, mình sẽ làm việc về:

* Create user admin và trang dashboard của admin
* Create, list, edit và delete các phòng ban
* Create, list, edit và delete các vai trò
* Phân công các phòng ban và vai trò cho nhân viên

## 1. Create Admin User
Mình sẽ bắt đầu bằng cách tạo người dùng quản trị thông qua dòng lệnh. `Flask` có cung cấp một lệnh rất tiện dụng, `flask shell` cho phép chúng ta sử dụng một `interactive` Python shell để sử dụng với các ứng dụng Flask.
```
$ flask shell
>>> from app.models import Employee
>>> from app import db
>>> admin = Employee(email="admin@admin.com",username="admin",password="admin2021",is_admin=True)
>>> db.session.add(admin)
>>> db.session.commit()
```

Mình vừa tạo một user admin và mật khẩu admin2021 và trường is_admin = true vì hiện tại database đang để mặc định trường này là false.

## 2. Dashboard dành cho admin
Bây giờ mình đã có user admin, mình cần thêm chế độ xem cho trang tổng quan quản trị. Mình cần đảm bảo rằng sau khi user admin login, họ sẽ được chuyển hướng đến dashboard dành cho admin chứ không phải trang dashboard dành cho user thường. Mình sẽ làm trong folder `home`.

* File app/home/views.py
```
# update imports
from flask import abort, render_template
from flask_login import current_user, login_required

# add admin dashboard view

@home.route('/admin/dashboard')
@login_required
def admin_dashboard():
    # prevent non-admins from accessing the page
    if not current_user.is_admin:
        abort(403)

    return render_template('home/admin_dashboard.html', title="Dashboard")
```

* File app/auth/views.py
```
# Edit the login view to redirect to the admin dashboard if employee is an admin

@auth.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():

        # check whether employee exists in the database and whether
        # the password entered matches the password in the database
        employee = Employee.query.filter_by(email=form.email.data).first()
        if employee is not None and employee.verify_password(
                form.password.data):
            # log employee in
            login_user(employee)

            # redirect to the appropriate dashboard page
            if employee.is_admin:
                return redirect(url_for('home.admin_dashboard'))
            else:
                return redirect(url_for('home.dashboard'))

        # when login details are incorrect
        else:
            flash('Invalid email or password.')

    # load login template
    return render_template('auth/login.html', form=form, title='Login')
```

Tiếp theo, mình sẽ tạo template dashboard dành cho admin. Tạo một file `admin_dashboard.html` trong thư mục `templates/home`, sau đó thêm code sau:
```

<!-- app/templates/home/admin_dashboard.html -->

{% extends "base.html" %}
{% block title %}Admin Dashboard{% endblock %}
{% block body %}
<div class="intro-header">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <div class="intro-message">
                    <h1>Admin Dashboard</h1>
                    <h3>For administrators only!</h3>
                    <hr class="intro-divider">
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
{% endblock %}
```
Bây giờ mình cần chỉnh sửa template base để hiển thị một menu khác cho user admin.
```

<!-- app/templates/base.html -->

<!-- Modify nav bar menu -->
<ul class="nav navbar-nav navbar-right">
    {% if current_user.is_authenticated %}
      {% if current_user.is_admin %}
        <li><a href="{{ url_for('home.admin_dashboard') }}">Dashboard</a></li>
        <li><a href="#">Departments</a></li>
        <li><a href="#">Roles</a></li>
        <li><a href="#">Employees</a></li>
      {% else %}
        <li><a href="{{ url_for('home.dashboard') }}">Dashboard</a></li>
      {% endif %}
      <li><a href="{{ url_for('auth.logout') }}">Logout</a></li>
      <li><a><i class="fa fa-user"></i>  Hi, {{ current_user.username }}!</a></li>
    {% else %}
      <li><a href="{{ url_for('home.homepage') }}">Home</a></li>
      <li><a href="{{ url_for('auth.register') }}">Register</a></li>
      <li><a href="{{ url_for('auth.login') }}">Login</a></li>
    {% endif %}
</ul>
```
Trong menu ở trên, mình sử dụng `current_userproxy` từ `Flask-Login` để kiểm tra xem user hiện tại có phải là admin hay không. Nếu đúng, mình hiển thị menu admin cho phép user redirect đến các trang Phòng ban, Vai trò và Nhân viên. Lưu ý rằng mình sử dụng # cho các link trong menu admin. Mình sẽ cập nhật điều này sau khi tạo các views tương ứng.

Bây giờ mình sẽ chạy ứng dụng và đăng nhập với tư cách là user admin mà mình vừa tạo. Bạn sẽ thấy dashboard của admin:
![Admin dashboard](https://images.viblo.asia/c768143e-9e30-4ef4-8152-99777023aeab.jpeg)


Hãy kiểm tra lỗi mà mình đã đặt trong file `home/views.py` để ngăn người dùng không phải admin truy cập vào dashboard admin. Đăng xuất và sau đó đăng nhập với một user thường. Nhập địa chỉ sau trên URL: http://127.0.0.1:5000/admin/dashboard. Bạn sẽ thấy xuất hiện lỗi `403 Forbidden`.

![403 Forbidden](https://images.viblo.asia/a49de576-08f7-428b-901c-4ac9e2009320.png)


## 3. Phòng ban
Bây giờ mình sẽ bắt đầu làm việc trên admin `blueprint`, có phần lớn chức năng trong ứng dụng. Mình sẽ bắt đầu bằng cách xây dựng chức năng CRUD cho các phòng ban.

### 3.1 Form
Mình sẽ bắt đầu với file `admin/forms.py`, ở đây mình sẽ tạo 1 form để thêm và chỉnh sửa các phòng ban.

* File app/admin/forms.py
```
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class DepartmentForm(FlaskForm):
    """
    Form for admin to add or edit a department
    """
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    submit = SubmitField('Submit')
```
Form này khá đơn giản và chỉ có hai trường `name` và `department` cả hai trường đều là bắt buộc. Mình thực thi điều này bằng cách sử dụng `DataRequired()` validator từ `WTForms`. Lưu ý là mình sẽ sử dụng cùng một biểu mẫu để thêm và chỉnh sửa các phòng ban.

### 3.2 Views
Bây giờ, chúng ta hãy làm việc trên các file views:

* File app/admin/views.py
```
from flask import abort, flash, redirect, render_template, url_for
from flask_login import current_user, login_required

from . import admin
from forms import DepartmentForm
from .. import db
from ..models import Department


def check_admin():
    """
    Prevent non-admins from accessing the page
    """
    if not current_user.is_admin:
        abort(403)

# Department Views
@admin.route('/departments', methods=['GET', 'POST'])
@login_required
def list_departments():
    """
    List all departments
    """
    check_admin()

    departments = Department.query.all()

    return render_template('admin/departments/departments.html',
                           departments=departments, title="Departments")


@admin.route('/departments/add', methods=['GET', 'POST'])
@login_required
def add_department():
    """
    Add a department to the database
    """
    check_admin()

    add_department = True

    form = DepartmentForm()
    if form.validate_on_submit():
        department = Department(name=form.name.data,
                                description=form.description.data)
        try:
            # add department to the database
            db.session.add(department)
            db.session.commit()
            flash('You have successfully added a new department.')
        except:
            # in case department name already exists
            flash('Error: department name already exists.')

        # redirect to departments page
        return redirect(url_for('admin.list_departments'))

    # load department template
    return render_template('admin/departments/department.html', action="Add",
                           add_department=add_department, form=form,
                           title="Add Department")


@admin.route('/departments/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_department(id):
    """
    Edit a department
    """
    check_admin()

    add_department = False

    department = Department.query.get_or_404(id)
    form = DepartmentForm(obj=department)
    if form.validate_on_submit():
        department.name = form.name.data
        department.description = form.description.data
        db.session.commit()
        flash('You have successfully edited the department.')

        # redirect to the departments page
        return redirect(url_for('admin.list_departments'))

    form.description.data = department.description
    form.name.data = department.name
    return render_template('admin/departments/department.html', action="Edit",
                           add_department=add_department, form=form,
                           department=department, title="Edit Department")


@admin.route('/departments/delete/<int:id>', methods=['GET', 'POST'])
@login_required
def delete_department(id):
    """
    Delete a department from the database
    """
    check_admin()

    department = Department.query.get_or_404(id)
    db.session.delete(department)
    db.session.commit()
    flash('You have successfully deleted the department.')

    # redirect to the departments page
    return redirect(url_for('admin.list_departments'))

    return render_template(title="Delete Department")
```
Mình bắt đầu bằng cách tạo một function, function `check_admin` này sẽ redirect đến page `403 Forbidden` nếu user không phải admin cố gắng truy cập các chế độ xem này. Mình sẽ gọi chức năng này trong mọi chế độ xem quản trị.

Trên đây có các function `list_departments` để get all phòng ban, `add_department` thêm phòng ban, `edit_department` sửa phòng ban, `delete_department` xoá phòng ban.

Lưu ý: Mình làm cùng một template để create và edit ở file `department.html`. Đây là lý do tại sao mình có biến `add_department` = true trong view `add_department`, cũng như `add_department` = false trong view `edit_department`. 

### 3.3 Templates
Tạo một thư mục `templates/admin` và trong đó, thêm một thư mục `departments`. Bên trong nó, thêm 2 file `departments.html` và `department.html`:

```
<!-- app/templates/admin/departments/departments.html -->

{% import "bootstrap/utils.html" as utils %}
{% extends "base.html" %}
{% block title %}Departments{% endblock %}
{% block body %}
<div class="content-section">
  <div class="outer">
    <div class="middle">
      <div class="inner">
        <br/>
        {{ utils.flashed_messages() }}
        <br/>
        <h1 style="text-align:center;">Departments</h1>
        {% if departments %}
          <hr class="intro-divider">
          <div class="center">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="15%"> Name </th>
                  <th width="40%"> Description </th>
                  <th width="15%"> Employee Count </th>
                  <th width="15%"> Edit </th>
                  <th width="15%"> Delete </th>
                </tr>
              </thead>
              <tbody>
              {% for department in departments %}
                <tr>
                  <td> {{ department.name }} </td>
                  <td> {{ department.description }} </td>
                  <td>
                    {% if department.employees %}
                      {{ department.employees.count() }}
                    {% else %}
                      0
                    {% endif %}
                  </td>
                  <td>
                    <a href="{{ url_for('admin.edit_department', id=department.id) }}">
                      <i class="fa fa-pencil"></i> Edit 
                    </a>
                  </td>
                  <td>
                    <a href="{{ url_for('admin.delete_department', id=department.id) }}">
                      <i class="fa fa-trash"></i> Delete 
                    </a>
                  </td>
                </tr>
              {% endfor %}
              </tbody>
            </table>
          </div>
          <div style="text-align: center">
        {% else %}
          <div style="text-align: center">
            <h3> No departments have been added. </h3>
            <hr class="intro-divider">
        {% endif %}
          <a href="{{ url_for('admin.add_department') }}" class="btn btn-default btn-lg">
            <i class="fa fa-plus"></i>
            Add Department
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
{% endblock %}
```

Mình đã tạo một bảng trong template ở trên. Hãy lưu ý đến hàm `count()` mà mình sử dụng trong trường hợp này để lấy số lượng nhân viên. Mỗi bộ phận được liệt kê sẽ có một link để sửa và xóa.

Nếu không có phòng ban, trang sẽ hiển thị "Chưa có phòng ban nào được thêm vào". Ngoài ra còn có một nút có thể được nhấp để thêm một bộ phận mới.

Bây giờ mình sẽ làm việc trên template để add và edit các phòng ban:
```

<!-- app/templates/admin/departments/department.html -->

{% import "bootstrap/wtf.html" as wtf %}
{% extends "base.html" %}
{% block title %}
    {% if add_department %}
        Add Department
    {% else %}
        Edit Department
    {% endif %}
{% endblock %}
{% block body %}
<div class="content-section">
 <div class="outer">
    <div class="middle">
      <div class="inner">
        <div class="center">
            {% if add_department %}
                <h1>Add Department</h1>
            {% else %}
                <h1>Edit Department</h1>
            {% endif %}
            <br/>
            {{ wtf.quick_form(form) }}
        </div>
      </div>
    </div>
  </div>
</div>
{% endblock %}
```
Mình sử dụng biên `add_department`để xác định xem title sẽ là "Thêm Bộ phận" hay "Chỉnh sửa Bộ phận".

Dưới đây là 1 chút css ở file `app/static/css/style.css`:
```
.outer {
    display: table;
    position: absolute;
    height: 70%;
    width: 100%;
}

.middle {
    display: table-cell;
    vertical-align: middle;
}

.inner {
    margin-left: auto;
    margin-right: auto;
}
```

Cuối cùng, mình sẽ thêm link ở menu admin:
```

<!-- app/templates/base.html -->

<!-- Modify nav bar menu -->
<li><a href="{{ url_for('admin.list_departments') }}">Departments</a></li>
```
Khởi động lại server, sau đó đăng nhập lại với user admin và nhấp vào link Phòng ban, đây là màn hình khi chưa có bộ phận nào:

![List departments](https://images.viblo.asia/99b1464e-f056-449b-b088-e30831c07e12.png)


Thêm một bộ phận:

![Add department](https://images.viblo.asia/1d72e896-bb39-460b-b7f4-5b920e83d09c.png)
![List departments](https://images.viblo.asia/74abe07c-6cf3-4ce9-b7ed-e7485070ffe5.png)

Okey, It worked!

Bây giờ mình sẽ sửa nó:
![Edit department](https://images.viblo.asia/61d7fe0b-e617-4bcc-98ff-6f587523a4d4.png)

Chỉnh sửa bộ phận thành công. Tiếp theo test thử chức năng delete:

![Delete success](https://images.viblo.asia/dcf350c9-e2ab-4d57-a1a7-61cfa39ca93c.png)

## 4. Role
Bây giờ để làm việc đến role. Cái này sẽ rất giống với mã phòng ban vì các chức năng của role và phòng ban hoàn toàn giống nhau.

### 4.1 Form
Mình sẽ bắt đầu bằng cách tạo form để add và edit role. Thêm code sau vào file `admin/forms.py`:

* File app/admin/forms.py
```
# existing code remains

class RoleForm(FlaskForm):
    """
    Form for admin to add or edit a role
    """
    name = StringField('Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    submit = SubmitField('Submit')
```

### 4.2 Views
Tiếp theo, mình sẽ thêm các function add, list, edit và delete role. Thêm code sau vào file `admin/views.py`:
```
# app/admin/views.py

# update imports

from forms import DepartmentForm, RoleForm
from ..models import Department, Role

# existing code remains

# Role Views


@admin.route('/roles')
@login_required
def list_roles():
    check_admin()
    """
    List all roles
    """
    roles = Role.query.all()
    return render_template('admin/roles/roles.html',
                           roles=roles, title='Roles')


@admin.route('/roles/add', methods=['GET', 'POST'])
@login_required
def add_role():
    """
    Add a role to the database
    """
    check_admin()

    add_role = True

    form = RoleForm()
    if form.validate_on_submit():
        role = Role(name=form.name.data,
                    description=form.description.data)

        try:
            # add role to the database
            db.session.add(role)
            db.session.commit()
            flash('You have successfully added a new role.')
        except:
            # in case role name already exists
            flash('Error: role name already exists.')

        # redirect to the roles page
        return redirect(url_for('admin.list_roles'))

    # load role template
    return render_template('admin/roles/role.html', add_role=add_role,
                           form=form, title='Add Role')


@admin.route('/roles/edit/<int:id>', methods=['GET', 'POST'])
@login_required
def edit_role(id):
    """
    Edit a role
    """
    check_admin()

    add_role = False

    role = Role.query.get_or_404(id)
    form = RoleForm(obj=role)
    if form.validate_on_submit():
        role.name = form.name.data
        role.description = form.description.data
        db.session.add(role)
        db.session.commit()
        flash('You have successfully edited the role.')

        # redirect to the roles page
        return redirect(url_for('admin.list_roles'))

    form.description.data = role.description
    form.name.data = role.name
    return render_template('admin/roles/role.html', add_role=add_role,
                           form=form, title="Edit Role")


@admin.route('/roles/delete/<int:id>', methods=['GET', 'POST'])
@login_required
def delete_role(id):
    """
    Delete a role from the database
    """
    check_admin()

    role = Role.query.get_or_404(id)
    db.session.delete(role)
    db.session.commit()
    flash('You have successfully deleted the role.')

    # redirect to the roles page
    return redirect(url_for('admin.list_roles'))

    return render_template(title="Delete Role")
```

### 4.3 Templates
Tạo một folder `roles` trong folder `templates/admin`. Trong đó, tạo các file `roles.html` và `role.html`:
```

<!-- app/templates/admin/roles/roles.html -->

{% import "bootstrap/utils.html" as utils %}
{% extends "base.html" %}
{% block title %}Roles{% endblock %}
{% block body %}
<div class="content-section">
  <div class="outer">
    <div class="middle">
      <div class="inner">
        <br/>
        {{ utils.flashed_messages() }}
        <br/>
        <h1 style="text-align:center;">Roles</h1>
        {% if roles %}
          <hr class="intro-divider">
          <div class="center">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="15%"> Name </th>
                  <th width="40%"> Description </th>
                  <th width="15%"> Employee Count </th>
                  <th width="15%"> Edit </th>
                  <th width="15%"> Delete </th>
                </tr>
              </thead>
              <tbody>
              {% for role in roles %}
                <tr>
                  <td> {{ role.name }} </td>
                  <td> {{ role.description }} </td>
                  <td>
                    {% if role.employees %}
                      {{ role.employees.count() }}
                    {% else %}
                      0
                    {% endif %}
                  </td>
                  <td>
                    <a href="{{ url_for('admin.edit_role', id=role.id) }}">
                      <i class="fa fa-pencil"></i> Edit 
                    </a>
                  </td>
                  <td>
                    <a href="{{ url_for('admin.delete_role', id=role.id) }}">
                      <i class="fa fa-trash"></i> Delete 
                    </a>
                  </td>
                </tr>
              {% endfor %}
              </tbody>
            </table>
          </div>
          <div style="text-align: center">
        {% else %}
          <div style="text-align: center">
            <h3> No roles have been added. </h3>
            <hr class="intro-divider">
        {% endif %}
          <a href="{{ url_for('admin.add_role') }}" class="btn btn-default btn-lg">
            <i class="fa fa-plus"></i>
            Add Role
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
{% endblock %}
```

Giống như các phòng ban, Mình đã tạo một bảng để hiển thị tất cả các role với tên, description và số lượng nhân viên. Mỗi role được liệt kê cũng sẽ có một link để edit và delete. Nếu không có role nào, sẽ hiển thị một thông báo. Và thêm 1 mút để thêm role mowis.
```

<!-- app/templates/admin/roles/role.html -->

{% import "bootstrap/wtf.html" as wtf %}
{% extends "base.html" %}
{% block title %}
    {% if add_department %}
        Add Role
    {% else %}
        Edit Role
    {% endif %}
{% endblock %}
{% block body %}
<div class="content-section">
 <div class="outer">
    <div class="middle">
      <div class="inner">
        <div class="center">
            {% if add_role %}
                <h1>Add Role</h1>
            {% else %}
                <h1>Edit Role</h1>
            {% endif %}
            <br/>
            {{ wtf.quick_form(form) }}
        </div>
      </div>
    </div>
  </div>
</div>
{% endblock %}
```
Mình cũng sử dụng biên `add_role` ở trên giống như biến `add_department` cho template `department.html`.

Okey, giờ mình sẽ update lại menu admin:
```

<!-- app/templates/base.html -->

<!-- Modify nav bar menu -->
<li><a href="{{ url_for('admin.list_roles') }}">Roles</a></li>
```
Restart lại server, bây giờ bạn có thể truy cập trang `roles` và thêm, edit, delete role.

![List Roles](https://images.viblo.asia/32485e0b-7a36-4f7d-9846-4043fe6baac5.png)

![Add role](https://images.viblo.asia/3c2b0aed-d6e3-4399-9f84-db2b9ee3ca30.png)

![Add success](https://images.viblo.asia/9ab837fb-7e14-48df-8785-9322306aa7a2.png)

![Edit role](https://images.viblo.asia/dfa20325-c5bc-41af-bb96-cf0a16351f64.png)

![Delete role](https://images.viblo.asia/c799fc1e-c388-448f-9984-699ae552ed16.png)

## 5. Nhân viên
Tiếp theo mình sẽ làm việc với danh sách nhân viên, cũng như phân công các phòng ban và role.

### 5.1 Form
Mình sẽ cần một biểu mẫu để chỉ định mỗi nhân viên một bộ phận và vai trò. Thêm code sau vào file `admin/forms.py`:
```
# app/admin/forms.py

# update imports
from wtforms.ext.sqlalchemy.fields import QuerySelectField

from ..models import Department, Role

# existing code remains

class EmployeeAssignForm(FlaskForm):
    """
    Form for admin to assign departments and roles to employees
    """
    department = QuerySelectField(query_factory=lambda: Department.query.all(),
                                  get_label="name")
    role = QuerySelectField(query_factory=lambda: Role.query.all(),
                            get_label="name")
    submit = SubmitField('Submit')
```
Mình đã thêm một loại trường mới, trường `QuerySelectField` này mình sử dụng cho cả trường phòng ban và trường role. Admin sẽ chọn một bộ phận và một role bằng cách sử dụng template trên giao diện người dùng.

### 5.2 Views 
Thêm code sau vào file `admin/views.py`:

* File app/admin/views.py
```
# update imports

from forms import DepartmentForm, EmployeeAssignForm, RoleForm
from ..models import Department, Employee, Role

# existing code remains
# Employee Views

@admin.route('/employees')
@login_required
def list_employees():
    """
    List all employees
    """
    check_admin()

    employees = Employee.query.all()
    return render_template('admin/employees/employees.html',
                           employees=employees, title='Employees')


@admin.route('/employees/assign/<int:id>', methods=['GET', 'POST'])
@login_required
def assign_employee(id):
    """
    Assign a department and a role to an employee
    """
    check_admin()

    employee = Employee.query.get_or_404(id)

    # prevent admin from being assigned a department or role
    if employee.is_admin:
        abort(403)

    form = EmployeeAssignForm(obj=employee)
    if form.validate_on_submit():
        employee.department = form.department.data
        employee.role = form.role.data
        db.session.add(employee)
        db.session.commit()
        flash('You have successfully assigned a department and role.')

        # redirect to the roles page
        return redirect(url_for('admin.list_employees'))

    return render_template('admin/employees/employee.html',
                           employee=employee, form=form,
                           title='Assign Employee')
```
Chức năng `list_employees` sẽ query dữ liệu trong database và được gán vào biến employees, sau đó dữ liệu sẽ được đổ ra view.

Đầu tiên, kiểm tra xem nhân viên có phải là user admin hay không; nếu không sẽ redirect đến trang `403 Forbidden`. Nếu đúng, sẽ cập nhật employee.department và employee.role với dữ liệu đã chọn từ form, về cơ bản sẽ gán cho nhân viên một bộ phận và vai trò mới.

### 5.3 Templates
Tạo một thư mục employees trong thư mục `templates/admin`. Trong đó, tạo tiếp file `employees.html` và `employee.html`:

* File app/templates/admin/employees/employees.html
```
{% import "bootstrap/utils.html" as utils %}
{% extends "base.html" %}
{% block title %}Employees{% endblock %}
{% block body %}
<div class="content-section">
  <div class="outer">
    <div class="middle">
      <div class="inner">
        <br/>
        {{ utils.flashed_messages() }}
        <br/>
        <h1 style="text-align:center;">Employees</h1>
        {% if employees %}
          <hr class="intro-divider">
          <div class="center">
            <table class="table table-striped table-bordered">
              <thead>
                <tr>
                  <th width="15%"> Name </th>
                  <th width="30%"> Department </th>
                  <th width="30%"> Role </th>
                  <th width="15%"> Assign </th>
                </tr>
              </thead>
              <tbody>
              {% for employee in employees %}
                {% if employee.is_admin %}
                    <tr style="background-color: #aec251; color: white;">
                        <td> <i class="fa fa-key"></i> Admin </td>
                        <td> N/A </td>
                        <td> N/A </td>
                        <td> N/A </td>
                    </tr>
                {% else %}
                    <tr>
                      <td> {{ employee.first_name }} {{ employee.last_name }} </td>
                      <td>
                        {% if employee.department %}
                          {{ employee.department.name }}
                        {% else %}
                          -
                        {% endif %}
                      </td>
                      <td>
                        {% if employee.role %}
                          {{ employee.role.name }}
                        {% else %}
                          -
                        {% endif %}
                      </td>
                      <td>
                        <a href="{{ url_for('admin.assign_employee', id=employee.id) }}">
                          <i class="fa fa-user-plus"></i> Assign
                        </a>
                      </td>
                    </tr>
                {% endif %}
              {% endfor %}
              </tbody>
            </table>
          </div>
        {% endif %}
        </div>
      </div>
    </div>
  </div>
</div>
{% endblock %}
```
Template `employees.html` sẽ list ra bảng tất cả nhân viên. Bảng hiển thị tên đầy đủ, bộ phận và vai trò hoặc hiển thị - nếu không có bộ phận và vai trò nào. 

Vì user admin cũng là nhân viên, nên user admin sẽ được hiển thị trong bảng. Nhưng, user admin sẽ được nổi bật lên với nền màu xanh lá cây và text màu trắng.

* File app/templates/admin/employees/employee.html
```
{% import "bootstrap/wtf.html" as wtf %}
{% extends "base.html" %}
{% block title %}Assign Employee{% endblock %}
{% block body %}
<div class="content-section">
 <div class="outer">
    <div class="middle">
      <div class="inner">
        <div class="center">
            <h1> Assign Departments and Roles </h1>
            <br/>
            <p>
                Select a department and role to assign to
                <span style="color: #aec251;">
                    {{ employee.first_name }} {{ employee.last_name }}
                </span>
            </p>
            <br/>
            {{ wtf.quick_form(form) }}
        </div>
      </div>
    </div>
  </div>
</div>
{% endblock %}
```
Okey, mình sé update lại menu admin:
```

<!-- app/templates/base.html -->

<!-- Modify nav bar menu -->
<li><a href="{{ url_for('admin.list_employees') }}">Employees</a></li>
```
Redirect đến trang Nhân viên. Nếu không có người dùng nào khác ngoài quản trị viên, sẽ hiển thị thế này:

![List employees](https://images.viblo.asia/bd98b066-4301-43cf-978b-8010dd4d1598.png)


Khi có một nhân viên đăng ký, sẽ được hiển thị:

![List all employees](https://images.viblo.asia/be1e53d5-219d-4463-a90a-067095cd1ab0.png)


Thêm phòng ban và role để gán cho nhân viên.
![Add department and role](https://images.viblo.asia/ab6c7a7d-85e7-4610-9389-8cc8f3dbdb1e.png)

![Assign employee](https://images.viblo.asia/f53d3065-d9fd-4bee-8547-59c11d9dff91.png)

## 6. Kết luận
Okey, như vậy mình đã có một ứng dụng web CRUD full chức năng! Trong Phần hai này, mình đã có thể tạo user admin và trang dashboard admin, cũng như tùy chỉnh menu cho các loại user khác nhau. Mình đã xây dựng chức năng cốt lõi của ứng dụng và hiện có thể add, list, edit, delete các phòng ban và role cũng như gán vào với nhân viên. Mình cũng đã thêm page 403 Forbidden để giới hạn quyền cho user admin mới được xem.

### Tài liệu tham khảo
[Build a CRUD Web App With Python and Flask - Part Two](https://scotch.io/tutorials/build-a-crud-web-app-with-python-and-flask-part-two)