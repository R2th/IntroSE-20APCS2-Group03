Bài viết tiếng Việt - [Tự động đồng bộ Kubernetes ConfigMaps và Secrets qua các Namespaces khác với Reflector](https://devopsvn.tech/devops/tu-dong-dong-bo-kubernetes-configmaps-va-secrets-qua-cac-namespaces-khac-voi-reflector)

In this article, we will learn how to reflect changes to ConfigMaps and Secrets to other Namespaces. This is a useful tip when we have one ConfigMaps that need to be used in other Namespaces.

![](https://i.imgur.com/BirMzYy.png)

To simplify this work, we use Kubernetes Reflector.

## What is Reflector?
Reflector is a Kubernetes addon designed to help us automatically reflect ConfigMaps and Secrets from one namespace to another.

The first pros of Reflector is that it monitors the resources (configmaps and secrets) that we specify, and if in other namespaces there are no such resources, Reflector creates a new one, and if there are, then it does nothing.

The second pros of Reflector is that monitor changes to resources (secrets and configmaps) and reflects changes to other namespaces.

## Installation
Reflector can be installed either manually or using Helm (recommended).

Using Helm:

```bash
helm repo add emberstack https://emberstack.github.io/helm-charts
helm repo update
helm upgrade --install reflector emberstack/reflector
```

Manual install:

```
kubectl -n kube-system apply -f https://github.com/emberstack/kubernetes-reflector/releases/latest/download/reflector.yaml
```

Let's check:

```
kubectl get pod
```

```bash
NAME                         READY   STATUS    RESTARTS   AGE
reflector-68bdfcbf78-kh4zr   1/1     Running   0          10s
```

Make sure the Pod is in a `Running` state.

## Usage
For example, we have a configmap.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: source-config-map
data:
  DB_URL: postgres
  DB_PORT: 5432
```

To be able to reflect this configmap to all other namespaces, add `reflector.v1.k8s.emberstack.com/reflection-allowed: "true"` to the resource annotations.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: source-config-map
  annotations:
    reflector.v1.k8s.emberstack.com/reflection-allowed: "true"
data:
  DB_URL: postgres
  DB_PORT: 5432
```

If you only need to reflect some certain namespaces, add `reflector.v1.k8s.emberstack.com/reflection-allowed-namespaces: "<list>"` to the resource annotations.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: source-config-map
  annotations:
    reflector.v1.k8s.emberstack.com/reflection-allowed: "true"
    reflector.v1.k8s.emberstack.com/reflection-allowed-namespaces: "dev,staging,review"
data:
  DB_URL: postgres
  DB_PORT: 5432
```

In the configuration above, Reflector only reflects changes to dev, staging, and review namespaces.

## Usage with Cert Manager
The common use case of Reflector is that we use it with Cert Manager to create SSL for different namespaces.

For example, we need to configure SSL for subdomains `dev.devopsvn.tech` and `staging.devopsvn.tech`. We configure Cert Manager as follows:

```yaml
apiVersion: cert-manager.io/v1
kind: Certificate
...
spec:
  secretName: wildcard-devopsvn-tls
  secretTemplate:
    annotations:
      reflector.v1.k8s.emberstack.com/reflection-allowed: "true"
      reflector.v1.k8s.emberstack.com/reflection-allowed-namespaces: "dev,staging"
  ...
```

And then we configure Ingress as below for the dev namespace:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: devopsvn
  namespace: dev
spec:
  tls:
  - hosts:
      - dev.devopsvn.tech
    secretName: wildcard-devopsvn-tls
  rules:
  - host: dev.devopsvn.tech
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: service1
            port:
              number: 80
```

For the staging namespace:

```yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: devopsvn
  namespace: staging
spec:
  tls:
  - hosts:
      - staging.devopsvn.tech
    secretName: wildcard-devopsvn-tls
  rules:
  - host: staging.devopsvn.tech
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: service1
            port:
              number: 80
```

The configuration is quite simple.

## Conclusion
As you can see, Reflector helps us to simplify our work 😁.