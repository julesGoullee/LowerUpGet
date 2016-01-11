#!/usr/bin/env bash

now=$(date +%Y'-'%m'-'%d'-'%H':'%M':'%S)

forever stopall &&
mkdir -p log/${now} && 
NODE_ENV=production forever -o log/${now}/api_out.log -e log/${now}/api_err.log  --minUptime 500 --spinSleepTime 500 start services/api/api.js &&
NODE_ENV=production forever -o log/${now}/pageEx_out.log -e log/${now}/pageEx_err.log  --minUptime 500 --spinSleepTime 500 start services/pageExecutor/workers.js &&
sleep infinity
