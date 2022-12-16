## Introduce
When our application is running in production, deploying a new version of the application always requires no downtime, there are several ways to do this and one of the ways to help us avoid downtime is Blue/Green Deployment.

![](https://images.viblo.asia/48d4e35b-054a-4c19-bad0-a5d6fbdefd65.png)

In this post we will learn how to do Blue/Green Deployment manually, in the next post I will show you how to do it automatically using Argo Rollouts. This article I refer to from CNCF Presentation Template K8s Deployment.

## Steps to follow
In this article, I use Minikube to run Kubernetes Cluster. We will proceed in the following steps:
1. Call the instance that is running and receiving traffic from our users as version 1
2. We deploy a new version of the application as version 2
3. Wait for version 2 to run
4. Switch traffic from version 1 to version 2
5. Turn off version 1

## In Practice
Let's practice, creating a file named `app-v1.yaml` to deploy our application version 1, configure it as follows:

```app-v1.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-v1
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: v1.0.0
  template:
    metadata:
      labels:
        app: my-app
        version: v1.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9101"
    spec:
      containers:
      - name: my-app
        image: containersol/k8s-deployment-strategies
        ports:
        - name: http
          containerPort: 8080
        - name: probe
          containerPort: 8086
        env:
        - name: VERSION
          value: v1.0.0
        livenessProbe:
          httpGet:
            path: /live
            port: probe
          initialDelaySeconds: 5
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /ready
            port: probe
          periodSeconds: 5
```

In the file above, we declare a Deployment with two labels "app: my-app" and "version: v1.0.0". I will explain why we need 2 labels.

Next, we create a Service for app-v1 with the file name is `service.yaml`.

```service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-app
  labels:
    app: my-app
spec:
  type: NodePort
  ports:
  - name: http
    port: 80
    targetPort: http
  # Note here that we match both the app and the version
  selector:
    app: my-app
    version: v1.0.0
```

The main point here is the selector, as we can see it matches both the app and version labels, and the version label is what we really need to care about. It is the key for us to switch traffic between two versions of the application.

Create Deployment and Service.

```bash
kubectl apply -f app-v1.yaml && kubectl apply -f service.yaml
```

![](https://images.viblo.asia/e916da85-728b-4365-97dd-abce2e4100f8.png)

Check all pods are running, if you use Minikube then run as follows:

```bash
curl $(minikube service my-app --url)
2022-10-03T20:16:04+07:00 - Host: host-1, Version: v1.0.0
```

Otherwise, you can use port-forward.

```bash
kubectl port-forward <name of pod> 8080:8080
```

After checking that our version 1 application is running, please turn off port-forward because we will continue to use it later.

Next, we will deploy the new version of the application (version 2). Create a file named` app-v2.yaml` with config as follows:

```app-v2.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-app-v2
  labels:
    app: my-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-app
      version: v2.0.0
  template:
    metadata:
      labels:
        app: my-app
        version: v2.0.0
      annotations:
        prometheus.io/scrape: "true"
        prometheus.io/port: "9101"
    spec:
      containers:
      - name: my-app
        image: containersol/k8s-deployment-strategies
        ports:
        - name: http
          containerPort: 8080
        - name: probe
          containerPort: 8086
        env:
        - name: VERSION
          value: v2.0.0
        livenessProbe:
          httpGet:
            path: /live
            port: probe
          initialDelaySeconds: 5
          periodSeconds: 5
        readinessProbe:
          httpGet:
            path: /ready
            port: probe
          periodSeconds: 5
```

You notice in the section labels, we will declare the label version as `v2.0.0`. Next, we deploy the application version 2.

```bash
kubectl apply -f app-v2.yaml
```

Wait for all Pods to be running state before we continue.

```bash
kubectl rollout status deploy my-app-v2 -w
```

![](https://images.viblo.asia/4f83d871-131c-49a6-ade8-1257316593a0.png)

Check that the application version 2 was able to receive traffic.

```bash
kubectl port-forward deployment/my-app-v2 8080:8080
```

Open another terminal and access the application version 2 and make sure it can receive traffic from the user.

```bash
curl localhost:8080
```

If the version 2 application has run successfully and is able to receive traffic, then the next most important part is how to switch the traffic from version 1 to version 2. To do that, we simply update the label of the Service above to version 2. We can edit the YAML file or do it quickly with the patch command.

```bash
kubectl patch service my-app -p '{"spec":{"selector":{"version":"v2.0.0"}}}'
```

At this time, the traffic of the application is switched from version 1 to version 2.

![](https://images.viblo.asia/63d2b197-fa2a-4d16-bf8b-3b17516be52c.png)

Let's test.

```bash
curl $(minikube service my-app --url)
2022-10-03T20:30:54+07:00 - Host: host-1, Version: v2.0.0
```

Ok, if you see the result is `Version: v2.0.0`, then we have successfully implemented Blue/Green Deployment. If something happens and you want to go back to version 1, we simply update the label version again.

```bash
kubectl patch service my-app -p '{"spec":{"selector":{"version":"v1.0.0"}}}'
```

Finally, we turn off the application version 1.

```
kubectl delete deploy my-app-v1
```

![](https://images.viblo.asia/65d50fc7-aadb-4015-afcc-20c3a40051e2.png)

Done 😁. Please like the [DevOps VN](https://www.facebook.com/profile.php?id=100085570585155) page to receive notifications of the earliest posts.

## Conclusion
So we have learned how to implement Blue/Green Deployment, as you can see, it's not very complicated. But this is just a way to practice playing to know 😁, so in the next post, we will learn how to implement Blue/Green Deployment for a real project with Argo Rollouts.