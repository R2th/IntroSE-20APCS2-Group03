<h2>Group by trong Django</h2>
Mình sẽ sử dụng User model đã hỗ trợ sẵn của Django nằm trong <b>django.contrib.auth</b> app.
<br>
<br>
<h3>Count</h3>

**SQL:**

```sql
SELECT COUNT(*) FROM auth_user
```

**Django ORM:**

```django
User.objects.count()
```
<br>
<h3>Aggregate Function</h3>
Để sử dụng được các aggregate functions, chúng ta cần import các function đó nằm trong mục <b>from django.db.models import Count</b>.
<br>
Trong ví dụ này mình sẽ sử dụng <b>Count</b> function, ngoài ra còn cách aggregate function khác như: <b>Max, Min, Sum, Avg</b>.
<br>
<br>

**SQL:**

```sql
SELECT COUNT(id) AS id__count FROM auth_user
```

**Django ORM:**

```django
from django.db.models import Count

User.objects.aggregate(Count('id'))

=> {"id__count": 318}
```

Bạn cũng có thể thay đổi tên của giá trị trả về. Ví dụ mình sẽ đổi từ <b>id__count</b> sang <b>total</b>.
**SQL:**

```sql
SELECT COUNT(id) AS total FROM auth_user
```

**Django ORM:**

```django
from django.db.models import Count

User.objects.aggregate(total=Count('id'))

=> {"total": 318}
```
<br>
<h3>Group by với aggregate function</h3>

**SQL:**

```sql
SELECT
    is_active,
    COUNT(id) AS total
FROM
    auth_user
GROUP BY
    is_active
```

**Django ORM:**

```django
User.objects
.values('is_active')
.annotate(total=Count('id'))
```

* values('is_active'): trường muốn group by.
* annotate(total=Count('id')): group by theo aggregate function nào.

=> Thứ tự gọi là <b>values</b> trước <b>annotate</b>.
<br>
<h3>Filter a QuerySet với Group by</h3>
Ví dụ này sẽ đếm số lượng những user active hoặc inactive có role là staff.

**SQL:**

```sql
SELECT
    is_active,
    COUNT(id) AS total
FROM
    auth_user
WHERE
    is_staff = True
GROUP BY
    is_active
```

**Django ORM:**

```django
User.objects
.values('is_active')
.filter(is_staff=True)
.annotate(total=Count('id'))
```
<br>
<h3>Sort a QuerySet với Group by</h3>

**SQL:**

```sql
SELECT
    is_active,
    COUNT(id) AS total
FROM
    auth_user
GROUP BY
    is_active
ORDER BY
    is_active,
    total
```

**Django ORM:**

```django
User.objects
.values('is_active')
.annotate(total=Count('id'))
.order_by('is_active', 'total')
```
<br>
<h3>Kết hợp nhiều Aggregate Function với Group By</h3>
Ví dụ này sẽ đếm số lượng những user active hoặc inactive và với từng loại active hoặc inactive sẽ lấy ra last_joined.

**SQL:**

```sql
SELECT
    is_active,
    COUNT(id) AS total,
    MAX(date_joined) AS last_joined
FROM
    auth_user
GROUP BY
    is_active
```

**Django ORM:**

```django
from django.db.models import Max

User.objects
.values('is_active')
.annotate(
    total=Count('id'),
    last_joined=Max('date_joined'),
)
```
<br>
<h3>Group By nhiều trường</h3>
Kết quả của ví dụ này sẽ bao gồm is_active, is_staff và số lượng users với mỗi group.

**SQL:**

```sql
SELECT
    is_active,
    is_staff,
    COUNT(id) AS total
FROM
    auth_user
GROUP BY
    is_active,
    is_staff
```

**Django ORM:**

```django
User.objects
.values('is_active', 'is_staff')
.annotate(total=Count('id'))
```
<br>
<h3>Group By với Expression</h3>

**SQL:**

```sql
SELECT
    EXTRACT('year' FROM date_joined),
    COUNT(id) AS total
FROM
    auth_user
GROUP BY
    EXTRACT('year' FROM date_joined)
```

**Django ORM:**

```django
User.objects
.values('date_joined__year')
.annotate(total=Count('id'))
```
<br>
<h3>Sử dụng với Conditional Aggregation</h3>

**SQL:**

```sql
SELECT
    EXTRACT('year' FROM date_joined),

    COUNT(id) FILTER (
        WHERE is_staff = True
    ) AS staff_users,

    COUNT(id) FILTER (
        WHERE is_staff = False
    ) AS non_staff_users

FROM
    auth_user
GROUP BY
    EXTRACT('year' FROM date_joined)
```

**Django ORM:**

```django
from django.db.models import F, Q

User.objects
.values('date_joined__year')
.annotate(
    staff_users=(
        Count('id', filter=Q(is_staff=True))
    ),
    non_staff_users=(
        Count('id', filter=Q(is_staff=False))
    ),
)
```
<br>
<h3>Sử dụng với Having</h3>

**SQL:**

```sql
SELECT
    is_active,
    COUNT(id) AS total
FROM
    auth_user
GROUP BY
    is_active
HAVING
    COUNT(id) > 100
```

**Django ORM:**

```django
User.objects
.annotate(year_joined=F('date_joined__year'))
.values('is_active')
.annotate(total=Count('id'))
.filter(total__gt=100)
```
<br>
<h3>Distinct với Group By</h3>

**SQL:**

```sql
SELECT
    is_active,
    COUNT(id) AS total,
    COUNT(DISTINCT last_name) AS unique_names
FROM
    auth_user
GROUP BY
    is_active
```

**Django ORM:**

```django
User.objects
.values('is_active')
.annotate(
    total=Count('id'),
    unique_names=Count('last_name', distinct=True),
)
```
<br>
<h3>Join với Group By</h3>

**SQL:**

```sql
SELECT
    p.type,
    COUNT(u.id) AS total
FROM
    auth_user u
    JOIN user_profile p ON u.id = p.user_id
GROUP BY
    p.type
```

**Django ORM:**

```django
User.objects
.values('user_profile__type')
.annotate(total=Count('id'))
```
<br>
<h3>Group By với Many to Many Relationship</h3>

**SQL:**

```sql
SELECT
    u.id,
    COUNT(ug.group_id) AS memberships
FROM
    auth_user
    LEFT OUTER JOIN auth_user_groups ug ON (
        u.id = ug.user_id
    )
GROUP BY
    u.id
```

**Django ORM:**

```django
User.objects
.annotate(memberships=Count('groups'))
.values('id', 'memberships')
```

<br>
Hi vọng bài viết giúp ích được các bạn trong việc làm quen với <b>Django ORM</b>.
<br>
<br>
Mình có tham khảo và dịch lại bài viết tại blog:
<br>
<a href="https://hakibenita.com/django-group-by-sql">https://hakibenita.com/django-group-by-sql</a>