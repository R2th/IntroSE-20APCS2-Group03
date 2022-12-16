## Đặt vấn đề
Yêu cầu đặt ra là bạn có 2 model là `Repo` và `Build`, quan hệ giữa `Repo` và `Build` là quan hệ 1-n, giờ bạn muốn lấy ra tương ứng với mỗi bản ghi `Repo` n `Build` gần nhất một cách hiệu quả.

Quan hệ `Repo` với `Build` được khai báo:
``` PHP 
public function builds()
{
    return $this->hasMany(Build::class, 'repo_id', 'id');
}
```

Sau khi lướt qua documentation của Laravel, bạn sẽ thấy ngay func `take()` có thể là giải pháp cho vấn đề này,
>To limit the number of results returned from the query, or to skip a given number of results in the query, you may use the `skip` and `take` methods.
>

Vậy thì bắt tay vào làm thôi:

``` PHP
Repo::with([
    'builds' => function ($q) {
          $q->orderByDesc('created_at')->take(3);
    },
])
->get();
```

Nhưng thật bất ngờ khi thử trong `Tinker` kết quả trả về như sau:
``` bash

>>> App\Models\Repo::with([
    'builds' => function ($q) {
          $q->orderByDesc('created_at')->take(3);
    },
])
->get();

=> Illuminate\Database\Eloquent\Collection {#963
     all: [
       App\Models\Repo {#1552
         id: 119,
         builds: Illuminate\Database\Eloquent\Collection {#1228
           all: [],
         },
       },
       App\Models\Repo {#1144
         id: 144,
         builds: Illuminate\Database\Eloquent\Collection {#1155
           all: [
             App\Models\Build {#954
               id: 4,
               repo_id: 144,
               number: 4
             },
             App\Models\Build {#1156
               id: 3,
               repo_id: 144,
               number: 3
             },
             App\Models\Build {#1306
               id: 2,
               repo_id: 144,
               number: 2
             },
           ],
         },
       },
       App\Models\Repo {#1154
         id: 145,
         builds: Illuminate\Database\Eloquent\Collection {#1147
           all: [],
         },
       },
       App\Models\Repo {#1049
         id: 146,
         builds: Illuminate\Database\Eloquent\Collection {#1142
           all: [],
         },
       },
     ],
   }

```
dù tất cả các `Repo` đều có nhiều hơn 3 `Build`, tuy nhiên kết quả trả về chỉ có 3 `Build` của 1 record duy nhất. Vọc vạch trên internet thì thấy cũng kha khá bạn vướng phải [issue](https://github.com/laravel/framework/issues/18014) này, vậy solution cho nó là gì?

## Giải pháp
Đầu tiên bạn tạo 1 class `BaseModel` chứa [scope](https://laravel.com/docs/5.5/eloquent#query-scopes) `scopeNPerGroup`

``` PHP
<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Model;

class BaseModel extends Model
{

    /**
     * query scope nPerGroup
     *
     * @return void
     */
    public function scopeNPerGroup($query, $group, $n = 10)
    {
        // queried table
        $table = ($this->getTable());

        // initialize MySQL variables inline
        $query->from(DB::raw("(SELECT @rank:=0, @group:=0) as vars, {$table}"));

        // if no columns already selected, let's select *
        if (!$query->getQuery()->columns) {
            $query->select("{$table}.*");
        }

        // make sure column aliases are unique
        $groupAlias = 'group_' . md5(time());
        $rankAlias  = 'rank_' . md5(time());

        // apply mysql variables
        $query->addSelect(DB::raw(
            "@rank := IF(@group = {$group}, @rank+1, 1) as {$rankAlias}, @group := {$group} as {$groupAlias}"
        ));

        // make sure first order clause is the group order
        $query->getQuery()->orders = (array) $query->getQuery()->orders;
        array_unshift($query->getQuery()->orders, ['column' => $group, 'direction' => 'asc']);

        // prepare subquery
        $subQuery = $query->toSql();

        // prepare new main base Query\Builder
        $newBase = $this->newQuery()
            ->from(DB::raw("({$subQuery}) as {$table}"))
            ->mergeBindings($query->getQuery())
            ->where($rankAlias, '<=', $n)
            ->getQuery();

        // replace underlying builder to get rid of previous clauses
        $query->setQuery($newBase);
    }
}
```

Sau đó, bạn extends `BaseModel` ở cả 2 model `Repo` và `Build`.

Trong model `Build` bạn thêm quan hệ với `Repo`
``` PHP
public function repo()
{
    return $this->belongsTo(Repo::class, 'repo_id', 'id');
}
```

Trong model `Repo` bạn thêm function như sau:
```
public function recentBuilds(int $limit = 3)
{
    return $this->builds()->latest()->nPerGroup('repo_id', $limit);
}
```
function trên sẽ lấy ra các  `Build` gần gây nhất với số lượng `$limit` tùy chọn.

Vậy là xong, bạn chỉ cần gọi 
``` PHP
Repo::with('recentBuilds')->get();
```
Kết quả nhận được sẽ bao gồm 3 `Build` tương ứng với mỗi `Repo`:
``` bash
=> Illuminate\Database\Eloquent\Collection {#1171
     all: [
       App\Models\Repo {#1066
         id: 232,
         recentBuilds: Illuminate\Database\Eloquent\Collection {#1053
           all: [
             App\Models\Build {#1043
               id: 263,
               repo_id: 232,
               number: 3
             },
             App\Models\Build {#1074
               id: 262,
               repo_id: 232,
               number: 2
             },
             App\Models\Build {#1042
               id: 261,
               repo_id: 232,
               number: 1
             },
           ],
         },
       },
       App\Models\Repo {#1049
         id: 225,
         recentBuilds: Illuminate\Database\Eloquent\Collection {#1070
           all: [
             App\Models\Build {#1043
               id: 246,
               repo_id: 225,
               number: 4
             },
             App\Models\Build {#1074
               id: 205,
               repo_id: 225,
               number: 3
             },
             App\Models\Build {#1042
               id: 204,
               repo_id: 225,
               number: 2
             },
           ],
         },
       },
       App\Models\Repo {#1067
         id: 229,
         recentBuilds: Illuminate\Database\Eloquent\Collection {#1058
           all: [
             App\Models\Build {#1075
               id: 245,
               repo_id: 229,
               number: 40
             },
             App\Models\Build {#1041
               id: 244,
               repo_id: 229,
               number: 39
             },
             App\Models\Build {#1076
               id: 243,
               repo_id: 229,
               number: 38
             },
           ],
         },
       },
       App\Models\Repo {#1050
         id: 231,
         recentBuilds: Illuminate\Database\Eloquent\Collection {#1178
           all: [
               App\Models\Build {#1075
               id: 201,
               repo_id: 231,
               number: 4
             },
             App\Models\Build {#1041
               id: 200,
               repo_id: 231,
               number: 3
             },
             App\Models\Build {#1076
               id: 199,
               repo_id: 231,
               number: 2
             },
           ],
         },
       },
     ],
   }
```

## Kết luận
Bằng cách gọi tới scope NPerGroup, chúng ta đã khắc phục được nhược điểm của Laravel khi sử dụng Eager loading để lấy là n item quan hệ tương ứng với mỗi record. 

Cảm ơn các bạn đã quan tâm, nếu có thắc mắc gì về cách cài đặt cứ comment nhé.