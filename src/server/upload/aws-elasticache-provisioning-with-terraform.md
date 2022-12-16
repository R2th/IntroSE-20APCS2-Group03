## Giới thiệu
Chào các bạn, ở bài trước chúng ta đã tìm hiểu về những mô hình triển khai của Elasticache trên AWS. Ở bài này chúng ta sẽ tìm hiểu cách dùng Terraform để triển khai các mô hình của Elasticache, bao gồm:

1. [Memcached: cluster](https://viblo.asia/p/aws-elasticache-cache-deployment-options-LzD5dR2OZjY#_memcached-cluster-1).
2. [Redis: single node](https://viblo.asia/p/aws-elasticache-cache-deployment-options-LzD5dR2OZjY#_redis-single-node-cluster-2).
3. [Redis: cluster mode disabled](https://viblo.asia/p/aws-elasticache-cache-deployment-options-LzD5dR2OZjY#_redis-cluster-mode-disabled-4).
4. [Redis: cluster mode enabled](https://viblo.asia/p/aws-elasticache-cache-deployment-options-LzD5dR2OZjY#_redis-cluster-mode-enabled-5).

Các bạn nên đọc bài trước để hiểu rõ lý thuyết của từng dạng.

![](https://images.viblo.asia/aaa3aabe-a27e-42b7-934b-da35b14fb1b1.png)

## Prepare
Đối với Elasticache thì đầu tiên ta phải tạo cho nó một *subnet group* trước.

![](https://images.viblo.asia/8b6596e9-459b-4ed5-8853-3fc1da0e2d08.png)

Subnet group sẽ bao gồm các subnet mà ta muốn Elasticache được triển khai trên đó. Tạo một file tên là `main.tf` với đoạn code sau.

```main.tf
provider "aws" {
  region  = "us-west-2"
}

data "aws_subnets" "all" {}

resource "aws_elasticache_subnet_group" "group_name" {
  name       = "elasticache"
  subnet_ids = data.aws_subnets.all.ids
}
```

Ta dùng resource `aws_elasticache_subnet_group` để tạo *subnet group* bằng Terraform. Chạy câu lệnh sau để Terraform tạo subnet group.

```
terraform init && terraform apply -auto-approve
```

Tiếp theo ta sẽ bắt đầu với dạng triển khai đầu tiên của Elasticache là Memcached Cluster.

## Memcached Cluster
Ở dạng deploy này, ta sẽ có một Memcached Cluster bao gồm 1-20 node.

![image.png](https://images.viblo.asia/119facb6-33c9-43df-b14f-0bed24c17b08.png)

Tạo một file tên là `memcached.tf`.

```memcached.tf
resource "aws_elasticache_cluster" "memcached" {
  cluster_id           = "memcached-single-node"
  engine               = "memcached"
  node_type            = "cache.m4.large"
  num_cache_nodes      = 1
  parameter_group_name = "default.memcached1.6"

  subnet_group_name  = aws_elasticache_subnet_group.group_name.name
  security_group_ids = [aws_security_group.allow_memcached.id]
}

resource "aws_security_group" "allow_memcached" {
  name = "allow-memcached"

  ingress {
    from_port   = 11211
    to_port     = 11211
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "memcached" {
  value = aws_elasticache_cluster.memcached.cache_nodes
}
```

Ta sẽ dùng resource `aws_elasticache_cluster` để tạo một Elasticache Cluster, và để chọn loại Elasticache mà ta sẽ tạo là *memcached* thì ở thuộc tính `engine` ta để là `memcached`.

Thuộc tính *nodetype* ta dùng để chọn số lượng CPU và Memory ta muốn cấp cho con memcached này, ví dụ `cache.m4.large` là 2 vCPU và 6.42 GiB Memory.

Thuộc tính `num_cache_nodes` ta dùng để chỉ định có bao nhiêu *node* sẽ được tạo, ở đây ta chỉ định là 1.

Ở thuộc tính `subnet_group_name` ta truyền vào tên subnet group ta vừa tạo khi nãy, cuối cùng để có thể truy cập được con memcached này ở trong VPC thì ta phải mở port 11211 bằng Security Group cho nó, nên ở dưới ta có thêm một resource là `aws_security_group`.

Chỉ với vài dòng code đơn giản vậy thôi, tiếp theo ta chạy câu lệnh Terraform để tạo Elasticache loại Memcached.

```
terraform apply -auto-approve
```

Con này tạo khá tốn thời gian nên các bạn đợi nó tạo xong nhé 😁.

```
...
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:

memcached = tolist([
  {
    "address" = "memcached-single-node.gupsag.0001.usw2.cache.amazonaws.com"
    "availability_zone" = "us-west-2b"
    "id" = "0001"
    "port" = 11211
  },
])
```

Tiếp theo ta sẽ tạo Elasticache dạng Redis Single Node.

## Redis Single Node
Ở dạng deploy này ta sẽ chỉ có 1 node là redis, sharding và high availability sẽ không có trong mode redis single node.

![image.png](https://images.viblo.asia/b0524533-014f-4811-85c8-b50cafab2076.png)

Tạo một file tên là `redis-sn.tf`.

```redis-sn.tf
resource "aws_elasticache_cluster" "redis" {
  cluster_id           = "redis-single-node"
  engine               = "redis"
  node_type            = "cache.m4.large"
  num_cache_nodes      = 1
  parameter_group_name = "default.redis6.x"
  engine_version       = "6.x"

  subnet_group_name  = aws_elasticache_subnet_group.group_name.name
  security_group_ids = [aws_security_group.allow_redis.id]
}

resource "aws_security_group" "allow_redis" {
  name = "allow-redis"

  ingress {
    from_port   = 6379
    to_port     = 6379
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }
}

output "redis" {
  value = aws_elasticache_cluster.redis.cache_nodes
}
```

Để tạo Elasticache dạng redis thì ta vẫn dùng resource `aws_elasticache_cluster`, ta chỉ cần thay đổi thuộc tính `engine` thành `redis` là được, và ở thuộc tính `parameter_group_name` ta thay đổi thành `default.redis6.x`.

Các bạn chạy câu lệnh Terraform để tạo Elasticache dạng redis single node.

```
terraform apply -auto-approve
```

Kết quả.

```
...
Apply complete! Resources: 2 added, 0 changed, 0 destroyed.

Outputs:

memcached = tolist([
  {
    "address" = "memcached-single-node.gupsag.0001.usw2.cache.amazonaws.com"
    "availability_zone" = "us-west-2b"
    "id" = "0001"
    "port" = 11211
  },
])
redis = tolist([
  {
    "address" = "redis-single-node.gupsag.0001.usw2.cache.amazonaws.com"
    "availability_zone" = "us-west-2b"
    "id" = "0001"
    "port" = 6379
  },
])
```

## Redis Cluster Mode Disabled
Ở dạng deploy này, ta sẽ có một Redis Cluster chỉ có 1 Shard với số lượng node của Shard là 1 tới 6 node.

![image.png](https://images.viblo.asia/76eed7e0-fbf4-4eb8-a518-750cb9375535.png)

Tạo một file tên là `redis-cluster-disable.tf`.

```redis-cluster-disable.tf
resource "aws_elasticache_replication_group" "redis_cluster_disable" {
  replication_group_id = "redis-cluster-mode-disable"
  engine               = "redis"
  num_cache_clusters   = 2
  parameter_group_name = "default.redis6.x"
  engine_version       = "6.x"
  node_type            = "cache.t2.micro"
  description          = "Redis cluster mode disable"

  subnet_group_name  = aws_elasticache_subnet_group.group_name.name
  security_group_ids = [aws_security_group.allow_redis.id]
}

output "redis-cluster-mode-disable" {
  value = aws_elasticache_replication_group.redis_cluster_disable.primary_endpoint_address
}
```

Để tạo Elasticache dạng Redis Cluster Mode thì ta sẽ dùng resource `aws_elasticache_replication_group`. Và để xác định có bật chế độ Cluster hay không, ta sẽ dùng 3 thuộc tính sau:

+ num_cache_clusters
+ num_node_groups
+ replicas_per_node_group

Với dạng Cluster Mode Disbale thì ta sẽ sử dụng thuộc tính `num_cache_clusters`. Các bạn chạy câu lệnh Terraform để tạo Elasticache dạng redis cluster mode disbale.

```
terraform apply -auto-approve
```

Kết quả.

```
...
Apply complete! Resources: 1 added, 0 changed, 0 destroyed.

Outputs:
...
redis-cluster-mode-disable = "redis-cluster-mode-disable.gupsag.ng.0001.usw2.cache.amazonaws.com"
```

## Redis Cluster Mode Enabled
Đây là dạng triển khai cuối cùng của Elasticache, ở dạng deploy này Redis Cluster của ta sẽ có nhiều shards và mỗi shard cũng sẽ có 1 tới 6 node. Và số lượng Shard ta có thể deploy là 500 => Maximun node của dạng Redis cluster mode enabled là 3000 node.

![image.png](https://images.viblo.asia/b40bfbf5-e067-47ad-af2c-1ffd628574ec.png)

Tạo một file tên là `redis-cluster-enable.tf`.

```redis-cluster-enable.tf
resource "aws_elasticache_replication_group" "redis_cluster_enable" {
  replication_group_id       = "redis-cluster-mode-enable"
  engine                     = "redis"
  num_node_groups            = 2
  replicas_per_node_group    = 1
  parameter_group_name       = "default.redis6.x.cluster.on"
  automatic_failover_enabled = true
  engine_version             = "6.x"
  node_type                  = "cache.t2.micro"
  description                = "Redis cluster mode enable"

  subnet_group_name  = aws_elasticache_subnet_group.group_name.name
  security_group_ids = [aws_security_group.allow_redis.id]
}

output "redis-cluster-mode-disable" {
  value = aws_elasticache_replication_group.redis_cluster_enable.primary_endpoint_address
}
```

Để chỉ định dạng Cluster Mode Enbale thì ta chỉ cần bỏ thuộc tính `num_cache_clusters` và thay bằng thuộc tính `num_node_groups` với `replicas_per_node_group`. Với `num_node_groups` sẽ chỉ định số lượng shard và `replicas_per_node_group` sẽ chỉnh định số lượng node trong mỗi share.

Thuộc tính `parameter_group_name` ta cũng cần thay đổi thành giá trị `default.redis6.x.cluster.on`.

Các bạn chạy câu lệnh Terraform để tạo Elasticache dạng redis cluster mode enbale.

```
terraform apply -auto-approve
```

Done, các bạn nhớ xóa resource nha =)).

```
terraform destroy -auto-approve
```

Các bạn like page [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) để nhận thông báo về bài viết sớm nhất nhé 😁.

## Kết luận
Vậy là ta đã tìm hiểu xong cách sử dụng Terraform để tạo Elasticache với các dạng triển khai khác nhau. Nếu có thắc mắc hoặc cần giải thích rõ thêm chỗ nào thì các bạn có thể hỏi dưới phần comment.

## Mục tìm kiếm đồng đội

![](https://images.viblo.asia/9fbde6d9-5e57-4429-a903-10a961e1c96c.png)

Team công nghệ Hoàng Phúc của bọn mình được thành lập với nhiệm vụ là xây dựng một hệ thống công nghệ nội bộ cho công ty, Hoàng Phúc là một công ty bán lẻ trong lĩnh vực thời trang và có hơn 30 năm tuổi đời, với chuỗi cửa hàng rất nhiều trên toàn quốc, nên việc vận hành của Hoàng Phúc là rất lớn và việc xây dựng được một hệ thống công nghệ để đáp ứng việc vận hành nội bộ cho công ty là một công việc rất thử thách, đây là một quá trình chuyển đổi số và team bọn mình đã làm được những bước ban đầu.

Thứ mà team mình thấy cấn duy nhất là cái website, đây là trang web mà trước khi team mình được thành lập đã có một đội outsource khác làm, và những gì họ để lại cho bọn mình là một trang web với đống bùi nhùi, với số điểm từ google là 1 trên 100. Vậy bọn mình sẽ làm gì với trang web này đây, nản chí sao? Điều đó không có trong từ điển của hai sếp mình, và với sự dẫn dắt của hai sếp team mình sẽ biến đống website bùi nhùi đó thành kim cương, như cách bọn mình đã cải thiện hệ thống nội bộ. Bọn mình đang cải thiện trang web hằng ngày và hằng ngày, từ 1 điểm bọn mình đã cải thiện nó lên 70 điểm, và mục tiêu là trên 90 điểm.

Hiện tại team bọn mình đang cần các đồng đội tham gia để cải thiện lại trang web với số lượng người dùng truy cập khá lớn, đây là một thử thách rất thú vị, có bao giờ các bạn được tham gia thiết kế một hệ thống lớn từ đầu chưa, mình khá chắc là số lượng đó rất ít. Bọn mình đã có khách hàng, những gì còn lại là cần những đồng đội để cùng nhau phát triển một hệ thống để phục vụ rất nhiều người dùng. Mục tiêu của công ty Hoàng Phúc là trở thành nhà bán lẻ về thời trang lớn nhất Việt Nam, hãy tham gia với bọn mình nhé. Một thành viên trong team mình không yêu cần phải giỏi, chỉ cần hòa đồng, hợp tác và sẵn sàng hợp tác với nhau. Có thể bạn không là giỏi nhất nhưng nếu gia nhập với bọn mình thì bạn sẽ tạo ra được những thứ giá trị nhất.

Đồng đội [Senior Backend Engineer](https://tuyendung.hoang-phuc.com/job/senior-backend-engineer-1022).

Đồng đội [Senior Frontend Engineer](https://tuyendung.hoang-phuc.com/job/senior-frontend-engineer-1021).