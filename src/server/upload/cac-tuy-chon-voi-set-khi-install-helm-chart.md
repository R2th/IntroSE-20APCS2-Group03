Khi sử dụng Helm cài đặt k8s app thông qua helm chart với `helm install` ta có thể ghi đè giá trị được define trong file `values.yaml` của chart thông qua option `--set`.

### Tại sao cần sử dụng set?
Ta hoàn toàn có thể cài đặt k8s app thông qua helm chart với các giá trị được define trong file `values.yaml` tuy nhiên trong một số trường hợp người quản trị muốn các giá trị trong file `values.yaml` là dynamic như: biến môi trường, biến trong bash script, biến trong ansible playbook. Với các trường hợp này việc cài đặt k8s app qua helm chart và sử dụng `--set` sẽ dễ dàng giải quyết được vấn đề.

### Các kiểu hỗ trợ truyền giá trị qua set
File *values.yaml* mẫu
```
kubeStateMetrics:
  enabled: true
  namespaceOverride: ""
  prometheus:
    monitor:
      enabled: true
    hosts: []
      # - thanos-gateway.domain.com
    additionalRuleLabels: {}
```
**Truyền dict**
Với các biến dạng dict trong file `values.yaml` ta có thể ghi đè các giá trị bằng cách chỉ định giá trị của key tương ứng.
```
helm install chart_name path_chart_folder --set kubeStateMetrics.enabled=true --set kubeStateMetrics.prometheus.monitor.enabled=true
```

**Truyền array**
Với các biến kiểu array trong file `values.yaml` ta có thể truyền array theo 2 cách:
- Cách 1: Sử dụng cặp dấu `{}`
```
helm install chart_name path_chart_folder --set kubeStateMetrics.prometheus.hosts={host1, host2}
```
- Cách 2: Chỉ định các phần tử riêng lẻ
```
helm install chart_name path_chart_folder --set kubeStateMetrics.prometheus.hosts[0]=host1 --set kubeStateMetrics.prometheus.hosts[1]=host2
```

**Truyền giá trị có ký tự đặc biệt**
Sử dụng dấu backslash `\` khi giá trị của biến trong file `values.yaml` chứa các ký tự đặc biệt gồm `.[,=`
```
helm install chart_name path_chart_folder --set 'kubeStateMetrics.prometheus.additionalRuleLabels.app\.kubernetes\.io=prometheus'
```

### Tổng kết

Như vậy là mình đã chia sẻ một số cách truyền biến thông qua `--set` khi cài đặt helm chart. Cảm ơn các bạn đã theo dõi.

#### Các nguồn tham khảo
- [advanced-usage-of-set-helm](https://itnext.io/helm-chart-install-advanced-usage-of-the-set-argument-3e214b69c87a)