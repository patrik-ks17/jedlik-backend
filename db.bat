@echo off
chcp 65001
"c:\Program Files\MongoDB\Tools\100\bin\mongoimport.exe" --uri="mongodb://localhost:27017/ingatlan" --collection=kategoriak --drop --file=db_1.json --jsonArray
"c:\Program Files\MongoDB\Tools\100\bin\mongoimport.exe" --uri="mongodb://localhost:27017/ingatlan" --collection=ingatlanok --drop --file=db_n.json --jsonArray
echo PLEASE KILL AND RESTART YOUR BACKEND SERVER DEV TASK IF RUNNING!