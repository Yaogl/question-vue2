echo "依赖包下载"
# npm install

###
echo "编译中..."
npm run build
echo $? #捕获上一条命令的输出 (if 0 正常 else 错误)
