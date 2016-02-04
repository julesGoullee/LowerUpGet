lower Up Get
==========
load page and render server side with NodeJs. You get page rendered via one simple request for simple response: only text. 

[![Build Status](https://travis-ci.org/julesGoullee/LowerUpGet.png)](https://travis-ci.org/julesGoullee/LowerUpGet)
[![dependencies Status](https://david-dm.org/julesGoullee/LowerUpGet.svg)](https://david-dm.org/julesGoullee/LowerUpGet#info=dependencies&view=table)
[![dev dependencies Status](https://david-dm.org/julesGoullee/LowerUpGet/dev-status.svg)](https://david-dm.org/julesGoullee/LowerUpGet#info=devDependencies&view=table)

Launch app on your phone:
![Schema](https://raw.githubusercontent.com/julesGoullee/LowerUpGet/master/schema.png)

##Pré requis:
- node@5 (use nvm [https://github.com/creationix/nvm](https://github.com/creationix/nvm))

##API Documentation:
- Get page via url:
    
    https://lower-up-get.herokuapp.com/get?address=https://google.fr

##Developpement
- Npm Dependencies:
```bash
npm install
```
- Run:
```bash 
npm start
```

##Deploiement with pm2

Create pm2 app and start:

```bash
npm run pm2:start
```


##Demo:
[https://lower-up-get.herokuapp.com](https://lower-up-get.herokuapp.com)


##Mobile app source and android preview:
Source is [https://github.com/julesGoullee/MobileLowerUpGet](https://github.com/julesGoullee/MobileLowerUpGet)
