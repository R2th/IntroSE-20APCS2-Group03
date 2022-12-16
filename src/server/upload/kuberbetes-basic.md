### Getting Start
In the last article we've talked about kubernetes architecture and how they fit and work together. In this article we will work with kubernetes by learning the basic building block and getting our hand dirty.

Our goal in this article is to get a **Hello World** service in Node.js up and running in a kubenertes cluster. We will walkthrough each step and put our knowledge from the previous article into practice.

### Install Kubernetes
Lets start by installing required tool that are needed, **kubectl** and **minikube** a local development kubernetes cluster.

#### Kubectl
```SH
$ curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.15.0/bin/linux/amd64/kubectl
$ chmod +x kubectl
$ sudo mv kubectl /usr/local/bin/kubectl
```
Verify it's working
```SH
$ kubectl version
```

#### Minikube
```SH
$ curl -Lo minikube https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
$ chmod +x minikube
$ sudo install minikube /usr/local/bin
```

And spin it up
```SH
$ minikube start
```
This will start downloading a virtualbox VM into your local machine. You need wait a few minutes depending on your internet connection. After it finish verify by run
```SH
$ minikube ip
```

### Spining up Your First Application

#### Create a Hello World App
First lets quickly set up a working node app
```SH
$ npm install express --save
```
Put int the following code
```Javascript
// app.js
const express = require('express');
const app = express();
const port = process.env.PORT || 3030;

app.get('/hello', function(req, res) {
  res.status(200).json({ text: 'Hello, world!' });
});

app.listen(port, function() {
  console.log(`Listening to http://localhost:${port}`);
});
```
Pack it into docker container
```Dockerfile
FROM node:10.16.3-alpine

WORKDIR /app

COPY package.json .
RUN npm install

COPY . .
CMD ["node", "./app.js"]
```
And build it. Note the first command because we will be using a local image so it's important to switch our docker env to minikube host
```SH
$ eval $(minikube docker-env)
$ docker build -t hello .
```

#### Working with a Pod
There is two ways to create a Pod. You either create it entirely with `kubectl run` or with `YAML` configuration file. The following 

```SH
$ kubectl run hello --generator=run-pod/v1 --image=hello --image-pull-policy=Never --port=3030 --labels=app=hello
```
is equivalent to this one.
```YAML
# hello.pod.yaml
apiVersion: v1
kind: Pod
metadata:
  name: hello
  labels:
    app: hello
spec:
  containers:
  - name: hello
    image: hello
    imagePullPolicy: Never
    ports:
    - containerPort: 3030
```
```SH
$ kubectl create -f hello.pod.yaml
```
to get a list of pods
```SH
$ kubectl get pods
NAME                                READY   STATUS    RESTARTS   AGE
hello                               1/1     Running   0          2m29s
```
you can use `-l` option to filter pods by labels
```SH
$ kubectl get pods -l app=hello
NAME                                READY   STATUS    RESTARTS   AGE
hello                               1/1     Running   0          3m55s
```
get details information with
```SH
$ kubectl describe pod hello
Name:               hello
Namespace:          default
Priority:           0
PriorityClassName:  <none>
Node:               minikube/10.0.2.15
Start Time:         Thu, 22 Aug 2019 15:35:15 +0700
Labels:             app=hello
Annotations:        <none>
Status:             Running
IP:                 172.17.0.12
.......
```
and finally delete a pod with
```SH
$ kubectl delete pod hello # or
$ kubectl delete pod -f hello.pod.yaml
```

### Managing Multiple Pods
With Pod you can run any containerized applications you want, but it lack concept of application health when that container crash it will gone and you have to start it up manually. Doing this in production environment is impractical, but fortunately there is a better way.

Kubernetes has another kind of object to address this issue and that is **Deployment**. To create a deployment we have revised our configuration file to become like this.
```YAML
# hello.deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: hello
spec:
  replicas: 3
  selector:
    matchLabels:
      app: hello
  template:
    metadata:
      name: hello
      labels:
        app: hello
    spec:
      containers:
      - name: hello
        image: hello
        imagePullPolicy: Never
        ports:
        - containerPort: 3030
```
you will notice that `template` is the same as our Pod's spec from before that is because Deployment is basically a manager whose role is to control the liveliness of the pod. If there is a pod crash it will schedule to spin up a new replacement and ensure that there's always a specific number of pods running according to the number `replicas` which in our case is 3.

Now if we try to get list of running pods we will see that there is indeed three pods running.
```SH
$ kubectl get pods -l app=hello
NAME                     READY   STATUS    RESTARTS   AGE
hello-7d549bc5dd-b9mqj   1/1     Running   0          50s
hello-7d549bc5dd-f6tdg   1/1     Running   0          51s
hello-7d549bc5dd-jzcsg   1/1     Running   0          50s
```
Suppose we want to scale out our application to have 5 replica, we can do that with `kubectl scale`
```SH
$ kubectl scale --replicas=5 -f hello.deployment.yaml
$ kubectl get pods -l app=hello
NAME                     READY   STATUS              RESTARTS   AGE
hello-7d549bc5dd-b9mqj   1/1     Running   0          4m50s
hello-7d549bc5dd-csnmt   1/1     Running   0          44s
hello-7d549bc5dd-f6tdg   1/1     Running   0          4m51s
hello-7d549bc5dd-hg7r4   1/1     Running   0          44s
hello-7d549bc5dd-jzcsg   1/1     Running   0          4m50s
```
as you can see we now have 5 pods running with the addition of `hello-7d549bc5dd-csnmt` and `hello-7d549bc5dd-hg7r4`

To show you what happen when there is a pod that crash run
```SH
$ kubectl delete pod hello-7d549bc5dd-b9mqj
```
then try to get pod list again
```SH
$ kubectl get pods -l app=hello
hello-7d549bc5dd-csnmt   1/1     Running             0          5m4s
hello-7d549bc5dd-f6tdg   1/1     Running             0          9m11s
hello-7d549bc5dd-ftggf   0/1     ContainerCreating   0          26s
hello-7d549bc5dd-hg7r4   1/1     Running             0          5m4s
hello-7d549bc5dd-jzcsg   1/1     Running             0          9m10s
```
ad you can see pod `hello-7d549bc5dd-b9mqj` was being replaced by `hello-7d549bc5dd-ftggf`.

### Exposing & Routing Traffic to Service
Up until now we have a working  Hello World service up and running inside a kubernetes cluster, but how do we interact with our service from the our side world or how do service in different pod inside a cluster talk to each other?

The anwser is **Service** object. Service act as a gateway for client to reach pods inside of kubernetes cluster and there are multiple types of services each with different usage and you can checkout the documentation for more details.

1. ClusterIP (default)
2. NodePort
3. LoadBalancer
4. ExternalName

To access our service runing on Pod inside of kubernetes cluster from outside we need to create a **NodePort** service which will expose a specific worker node's port and route a request to specific pod targeted as we defined in the spec. Lets see what it looks like
```YAML
# hello.service.yaml
apiVersion: v1
kind: Service
metadata:
  name: hello-svc
spec:
  selector:
    app: hello
  type: NodePort
  ports:
  - protocol: TCP
    port: 3000
    nodePort: 32252
    targetPort: 3030
```
```SH
$ kubectl create -f hello.service.yaml
```
The important thing to note here is `selector` and `ports` spec. This service target every pod that has label `app=hello` and map traffic from port `4200` to`ports[0].targetPort` when access from within the cluster (request from other pod) or from `30030` to `ports[0].targetPort` if access from outside of cluster.

If you get the list of service you will see
```SH
$ kubectl get services
NAME            TYPE        CLUSTER-IP       EXTERNAL-IP   PORT(S)          AGE
kubernetes      ClusterIP   10.96.0.1        <none>        443/TCP          105d
hello-svc       NodePort    10.99.10.184     <none>        3000:32252/TCP   10m
```

If you run curl `http://localhost:32252/hello` you will not get any response that is because the service is exposed on the worker node and our worker node is ``minikube``. To access it from our host we need to get ip address of `minikube`
```SH
$ minikube ip
192.168.99.100
$ curl http://192.168.99.100:32252/hello
{"text": "Hello, world!"}
```