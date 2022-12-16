Bài viết tiếng Việt - [Bài 1 - Cài đặt Istio vào Kubernetes](https://devopsvn.tech/service-mesh-on-kubernetes/bai-1-cai-dat-istio-vao-kubernetes)

In the previous article, we learned about the concept of Service Mesh and What is Isito. From this article we will go into practice, in the first lesson we will learn how to install Istio into Kubernetes.

![](https://images.viblo.asia/f68cabf1-0626-455e-91ab-b0ed179d02b8.png)

I refer to this series from the book *Istio In Action*, you can read it first without having to wait for my series.

## How to install Istio?
To install Istio into Kubernetes we can use one of three ways:
+ Using the `istioctl` 
+ Using `istio-operator`
+ Use Helm to install Istio Helm Chart

In this article we will use `istioctl`.

## Install istioctl
Visit release page `https://github.com/istio/istio/releases` and check latest version.

Run this handy script to download:

```bash
curl -L https://istio.io/downloadIstio | ISTIO_VERSION=1.15.1 sh -
```

```bash
mv istio-1.15.1/bin/istioctl /user/local/bin
```

Run the istioctl to verify that everything works:

```bash
istioctl version
```

let’s verify that any prerequisites have been met in our Kubernetes cluster before we begin installation.

```bash
istioctl x precheck
```

```bash
✔ No issues found when checking the cluster. Istio is safe to install or upgrade!
  To get started, check out https://istio.io/latest/docs/setup/getting-started/
```

## Installing the Istio components into Kubernetes
We can use istioctl, istio-operator, or Helm to install Istio. In this tutorial, we use istioctl.

To perform the demo install, use the istioctl CLI tool as shown next:

```bash
istioctl install --set profile=demo -y
```

```
✔ Istio core installed
✔ Istiod installed
✔ Egress gateways installed
✔ Ingress gateways installed
✔ Installation complete
```

After done, we can run the kubectl to list all of the Pods in the istio-system namespace.

```bash
kubectl get pod -n istio-system
```

```bash
NAME                                    READY   STATUS    RESTARTS   AGE
istio-egressgateway-65b6c9d675-4gf7d    1/1     Running   0          2m45s
istio-ingressgateway-6984cfd6ff-b7tql   1/1     Running   0          2m45s
istiod-74bd9b9864-t7sn9                 1/1     Running   0          3m11s
```

You notice the Istio control plane there is only a single replica or instance. “This appears to be a single point of failure. What happens if these components fail or go down?” 

**The Istio control plane is intended to be deployed in a highly available architecture.**

We can run the verify-install command post install to verify that it has completed successfully:

```
istioctl verify-install
```

Istio control-plane has some addons, for example, Grafana and Jaeger. For demo purposes only.

Install Prometheus

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.15/samples/addons/prometheus.yaml
```

Install Grafana

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.15/samples/addons/grafana.yaml
```

Install Jaeger

```bash
kubectl apply -f https://raw.githubusercontent.com/istio/istio/release-1.15/samples/addons/jaeger.yaml
```

After the installation is complete, the architecture of Istio will be as shown below.

![](https://images.viblo.asia/f68cabf1-0626-455e-91ab-b0ed179d02b8.png)

Now we can write a configuration file to create Istio resources, for example `VirtualService` in Istio:

```yaml
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews-route
spec:
  hosts:
  - reviews.prod.svc.cluster.local
  http:
  - headers:
      request:
        set:
          test: "true"
    route:
    - destination:
        host: reviews.prod.svc.cluster.local
        subset: v2
      weight: 25
    - destination:
        host: reviews.prod.svc.cluster.local
        subset: v1
      headers:
        response:
          remove:
          - foo
      weight: 75
```

## Conclusion
So we have installed Istio into Kuberntes and its components successfully, in the next lesson we will start to learn and make the first example of how to use Istio.

Các công việc DevOps hấp dẫn đang chờ bạn tại [DevOps VN](https://devopsvn.tech/tuyen-dung-devops).

Học DevOps tại [các trung tâm uy tính](https://devopsvn.tech/khoa-hoc-devops).

Tham gia kênh [Slack](https://join.slack.com/t/devopsvngroup/shared_invite/zt-1lafjife8-0g7mRf1mZ8AdwzFo_~5g9w) của DevOps VN.