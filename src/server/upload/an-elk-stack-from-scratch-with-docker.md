### The stack.
--------------------------------
First off, we will use the ELK stack, which has become in a few years a credible alternative to other monitoring solutions (Splunk, SAAS …).

It is based on the following software:

**E** as Elasticsearch, search engine which provide full text search & analytics

**L** as Logstash, an ETL for retrieving data from heterogeneous sources, transforming them and sending them to Elasticsearch

**K** as Kibana, which provide an UI for exploring data, and create interactive dashboards

But also :

**R** as Redis, an upstream broker which will serve as buffer in case of latency of the system, while avoiding excessive congestion in case of a peak,

**C** as Curator, a tool to manage our index

**B** as Beats, client-side agent to send the logs/metrics to our stack

![](https://lh3.googleusercontent.com/e4Jfu51fzL1BUbW4ArmWzNyaoyF2DEFRls1qwxJJIOAZ6ViH0GLeE069BZwlXOZ2yx0MUprPRzhC-x1D2rEbZ4PC_VK9Hrt1dbezhAt8VymtnLdRPuP4GaX-HVoncCFUtunp7y6IpCHjgwhRA1LV8eMbrMn4CENoLPV-WdMHXb-NKNJtGLzFNQr_VQHZhISI-BpgavlmzQgYa8iBOXmiuia9HSOKSjY3WnWIyjwVPEG1EzN45kn5K-a9COFJsWo_OMAX7zGPRdu0yb6xFi-iYj78KT79EqZYQhvgi-jB4dgJTJmBLMOZqC7Q0GyJfJnlBqeEEn8y5M5amQ7TrTS9OXsR0_SE3LEcfbRO97Qx-ag5sHpG0l_lYTsbGcw_kTIRgQWHRgqhI2DoLIogH8IOBAI5Q02-1CdR4SM6x9Hibttt32BxahMvXVoU1OO6kmEbXrLNUp2gnoIQ6UDD7jZY9UA5CmyMer1tBxnpWQTdldDm2Cgf18JkUVL6tp3R0ODCfrpfmGNWFh5pa8iorkBTYkBj3V-GZgAVFfTCi8ZimtsWYJosAoa9AKLpBqr0qCzZtinrtEUEFy3vypxEBpNstBWoYL0AoGe8rdoijM-k3SOm_7nyIfccz7EQc3q9hayjC3mN1SWVB5rrzQz-adddC-gQykOimdh1=w1000-h501-no)


### Deploy.
----------------------------------------
We will use Docker containers for each stack component.

+ [Elasticsearch (5.1.2)](https://hub.docker.com/_/elasticsearch/)
+ [Logstash (5.1.2)](https://hub.docker.com/_/logstash/)
+ [Kibana (5.1.2)](https://hub.docker.com/_/kibana/)
+ [Redis (3.2.6)](https://hub.docker.com/_/redis/)
+ [Curator (4.0.4)](https://hub.docker.com/r/bobrik/curator/)

Services and interactions are described in a docker-compose.yml file:

```
version: "2"

services:
  # brocker
  redis:
    image: redis:3.2.6
    container_name: redis
    ports:
      - 6379:6379
    volumes:
      - redis-data:/data
    networks:
      - logging
  # index, search & agregation
  elasticsearch:
    image: elasticsearch:5.1.2
    container_name: elastic
    environment:
      - ES_JAVA_OPTS=-Xms1g -Xmx1g
    ports:
      - 9200:9200
      - 9300:9300
    volumes:
      - $PWD/elasticsearch/config/elasticsearch.yml:/usr/share/elasticsearch/config/elasticsearch.yml
      - "es-data:/usr/share/elasticsearch/data"
    networks:
      - logging
  # UI
  kibana:
    image: kibana:5.1.2
    container_name: kibana
    ports:
      - 5601:5601
    volumes:
      - $PWD/kibana/config/kibana.yml:/etc/kibana/kibana.yml
    networks:
      - logging
    depends_on:
      - elasticsearch
  # indexer
  logstash:
    image: logstash:5.1.2
    container_name: logstash
    command: logstash -f /config/
    environment:
      - JAVA_OPTS=-Xms1g -Xmx1g
    volumes:
      - $PWD/logstash/config:/config
    networks:
      - logging
    depends_on:
      - elasticsearch
      - redis

volumes:
  es-data:
    driver: local
  redis-data:
    driver: local

networks:
  logging:
    driver: bridge
```

### Hello, world.
-------------------------------------------------------
Based on this repository, we will deploy a functional stack:

```
    # clone repo & build images
    git clone https://gitlab.com/flightstar/docker_elk_stack.git
    cd docker_elk_stack
    docker-compose build
    
    # run (daemon)
    docker-compose up -d
    
    # show logs
    docker-compose logs
```

After startup, you should be able to access Kibana (port 5601).

Then, we will deploy a basic example web app (NGinx serving HTML + Filebeat agent to send log in our stack)

```
# build image
docker build ./webapp -t dockerelkstack_webapp

# run (daemon)
docker run --network dockerelkstack_logging --link redis:redis -p 80:80 -d --name webapp dockerelkstack_webapp

# show logs
docker logs webapp
```

After startup, you should be able to access the web app (port 80).

![](https://lh3.googleusercontent.com/NMgkLRZsO9WquRwmEOXZdo-ytCmNcG__s8Z0utj9KPJbytouwpdmmhieRaTzwE9TTgLJ7MGq1nQUeW05AQEx_bQb7CRiGyAt9lbKsi4tPWV3hDKU5ntyASpsDLZl1DBJ5V1hB302GR9jYiCrnMO4UQB4IiSuiMLMkDZWIgmTgXHPD7tbOGw0qtK5sJQKpw9g3dEqTfs3x0MbhdOLRzSg1RZyp7kyanc4XLSx2e0R6JBtze9TsMD9uARXiiSkrbsitS1vIRY3OcLxLqh8s6R_yqgIzXdoqmQZitzee_ERLPi60hqm8WbdN_jAy3Ga3HLATo6gpoQKief0-Cxmx5CDWZRiLaOLIwxbAevWoKEYJ8ZjGSRisexDd8uLX6nyAFlgVWfdpV3tv2eEMFM8cHfzFMlEeId1EE4S63uzz_lJHsuzAzhh51LmSQsT35JmWC96UgbM5d6QXM2f2IyfxOLLjBMnY5fVLDLj6aEr3OcO475Sk--2XCoRsW25P-uJ9EwU-Zm0lBecQYLjyYnZ8A7wSSHGyH2UlDcyeOS2aD5Gkx2gk16_UNFv7-67fpPjeiqTgPKiHEPbFWlIJJkO7P3kYgg2CrwYLShIgQJG_hQk3brH9uz8H6toBpdhEu7SE2ebEWKFGkMJCpZsMhVFCeNitlApCF8yH-_H=w800-h454-no)

After few minutes browsing, returning to Kibana. An index (logstash-*) is now available.


![](https://lh3.googleusercontent.com/OhLdjesMGmWuLgf2kS9ebzOgccA_eK7z501obYSSemiSBejhyvyShTub7Xg28AdLPcE4L58AQZe8gtZVriEdC1S_OIMIXMUMql-Qw4__4KtciNu8s2ctLKzFIdIA__qeG8yu7mYt_8lwrfpApCeqp-YM8V6gV6Ky21dD5AjEaVRZRbDDMdqhgsi_efqZD-BFIu38tvwYjRAkmbmToTN_mXa6mooJY6ovTBdJcJ5uRoyElHDA44uMeMSXU_Lo8CEDicIMALkMx8WbIz2bASCdgWFS_55gs927iYZYruaJNjeLocMI4OPyR1KQ0Soo18rT-F8d9fHrBwty9oUrCUYAKu7ZVcxVvJ9EtQAiLcSGAu3JnEJKmIuQuTbCAzyf4ZXM1zaeJdOhVLfagD7tKHYRFzYeZIllYldRovOGh03tFJax5gE_flKtjHn7rz_B-yzm_yn1AYl7_pAEJQA8FK3Mh8h-mZaaSboWwMtx16LqDtnqUPtibSw1RQRkUJ0chs7qhGuHx4-MTywEPP9f7kCYDKpUjqU-3GS2RRAtYj3pDYYMuu7rZoUPTcsvJSH2kye0uGa5Jl5Axdy_3YRgjdAbawJBY8rq9IokyY9FgA99cGOZTqHaUQUDv_fq2iI8S3zEeRyaHvFv6KHFcne3c_MQ8jJw65bEwi9A=w800-h452-no)

After creating index, we can now exploring our web app logs (Discover tab), create visualizations (Visualize tab) and dashboards (Dashboard tab).


![](https://lh3.googleusercontent.com/MpLKvWDVG9FcZcoS9gwidLkkFRHDd22DGirn1IkYMsnRSyXzIajCF2pIknM1VWh3ajmIo7LkzZa3XvjR6DNmmd183B-lFxQdkc1zuYLILLfWoGNM8US-xrjZ-usBFoH0F7pnO7Xp8KDNsBKQYJ_ZsbViLyrmva09jxLX547N_9bssFP3pwJPRQfEfyy9rpFc-6Jld-uZkni2_q_AawE0W3TeEsVfGrrLe22hMshcwUdT8o9qNnQVHJpFOhTqpOtmzXMN_6GlGosqfMJeK8-SqzZUkGVZEpWz6-W811HJRdkRcucorGydCC-gxnSFkREJxpt6cd-IebfEmO2TZfL6vyiOt4iP5jrjZl4ZqYNO8-64JE9YxWXkKRML4m1X4YLcrnmlOusGFMQQmN-gd3bx3Udcr3z_RkHnhtwr8v09g6T1J5U7Q0LZR_3laBL-sEeAskhfFaOz-URoiI0Ftb6nF5zOEZN-kaJvSkhdVq7MNQ9tmSR3ptMFAItiCOkbp6ELQ85asavzFvfZ5o7MD6zRzewauElAtdhGxq45eNuseExZkayrj8J4TPEwPqCkdTMg7e1Nx1IzEdjA2sZSbuWe2qgdiUoOS7MufLcz1ed4RyxnM6t_eXu7vDBNQzIrXfaAuNkBjDrwu_vtbOlaWJfwspa1yWmuvwdN=w600-h340-no)

![](https://lh3.googleusercontent.com/ZFUyMNl408z3n4bjw3Fp3-6mlUnn4VxjbyGwCcKtXtqKheFLj6EsE0PbEEHJzyFa8RMwWwnY1x53EXg6mFkfGw3o3gcccevnacg9EwLKltaj0YHBX8xwA9DwhUObsvVczGU9kXHJGD3xCTb-QTQx7qUK0AaTFqbFX8vg3hpIdK3AafvnASu1jVbNnZ_5RmtSkOWy__DG_KOzDBDWxO-uGoRyD6l1WJJpK4GxciAYOnxFNlTtIVmu2HZem_xybolV5Hfgk3_3YC_aNhFkuiBfY1BFQS-b5b40tr46i9IBOizMAVtDvTihEw4o2pvEoDviwveBaEIUNh3Dh3MSiOqJaWSpqylRc2xiF-61Hgyyfx7u21l2a2_FqX89cL1u-EuATM3qTvhxRNofY6q5h-oQAdGmkGOim1S2HLPR8hZqrF5lv_sWV4izdzJp1IYjRIdZbm-StHqu36mRdL-TM0jv2zD-k_vaS0izUv51kLpR1ST3Rdc-5ycooU2RLmF-NPJ3vSCpQvNHySIyzAip_AM1mR-S6csw67xqk6YGQxOeDevpupZCCg4257FlhzB27KPpBZjcsdIpr8Iu8OlbRyG8M529eErmHrvas05fUd_2rOPBAqZuZgTiinqrj5Kucxqznv4n6tz3pGnHNljsq_wyhY6ZUGmVE43g=w600-h340-no)