# Xgag

A starter project using Express and a collection of most-used libraries.

## Requirement

 * [node.js@0.10.22](http://nodejs.org)
 * npm (Usually bundled with node.js)
 * [mongojs](https://github.com/mafintosh/mongojs)
 * [express@4.11.1rc](http://expressjs.com)

## Set up local environment

`sudo vim /etc/hosts`

```
127.0.0.1    dev.xgag.com
```

`sudo vim /usr/local/etc/nginx/nginx.conf`

```
server {
    listen 80;
    server_name dev.xgag.com;
    location / {
      proxy_set_header Host      $host;
      proxy_set_header X-Real-IP $remote_addr;
      proxy_pass http://127.0.0.1:7000;
    }
}
```


## How to start

```
npm start
open http://localhost:7000
```

## Misc

### Includes

 * jade
 * bootstrap

### Todo  

 * bootstrap build in
 * collect sample page for jade

### Schema

```
user:{
  name:
  password:
  email:
}
post:{
  voteId:
  userId:
  commentId:
  title:
  url:
  description:
  img:
  site_name:
}
vote:{
  userId:
  postId:
  good:
  bad:
}
comment:{
  userId:
  message:
}
```
