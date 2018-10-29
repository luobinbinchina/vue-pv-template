#!/bin/bash
#如需更高版本的node，请联系scmpf人工客服
source ~/.nvm/nvm.sh
nvm use v8.9.1
#可选版本如下：
#      v4.4.7
#      v5.12.0
#      v6.10.0
#      v7.8.0
#      v8.9.1
#      v9.11.2
#      v10.10.0
########################
# npm install and build
########################
#根据具体需求修改下面代码
git checkout master && git pull
npm config set registry http://registry.npm.kuaidadi.com
npm install
ret=$?
if [ $ret -ne 0 ];then
    echo "===== npm install failure ====="
    exit $ret
else
    echo -n "===== npm install successfully! ====="
fi
#根据具体需求修改下面代码
if [ -d output ];then
  rm -rf output
fi

npm run build
ret=$?
if [ $ret -ne 0 ]; then
    echo "===== npm run failure ====="
    exit $ret
else
    echo -n "===== npm run successfully! ====="
fi

mv dist output
ret=$?
exit $ret