//*****************************************************************************************************/
// Name: File List 1.0
// Author: Wally
// Date: 2017-03-02
// Desc: 把此文件放在本地电脑项目文件目录内，通过在命令行运行node filelist-node.js, 默认把当前目录下（包括子目录）
//       所有相关文件输出在cdn-filelist.txt文件里。通过传递参数可按文件修改日期过滤输出文件。
//       注意：此js文件需要Nodejs来运行，如果没有安装nodejs，请在这里下载安装 https://nodejs.org/ 最新版本
//       登录https://portal.chinacache.com/config/refresh/index.do 后进行文件CDN刷新。
//
// Params:
// -h      显示帮助信息。 node filelist-node.js -h //显示当前帮助信息
// -v      显示版本信息。 node filelist-node.js -v //显示 1.0
// -d      罗列出指定的日期后的文件，默认罗列出所有文件。有四种形式：
//           如:1）node filelist-node.js -d 2017-2-5 //输出2017年2月5日后的修改的文件，包括2月5日
//              2) node filelist-node.js -d 2-5 //输出当前年份下的2月5号的修改的文件，包括2月5日
//              3) node filelist-node.js -d 5 //输出当前年份-当前月份下的5号的修改的文件，包括5号
//              4）node filelist-node.js -d -2 //输出当前时间往前倒推2天
// -u      在站点文件前添加URL路径，默认前缀为：https://[当前项目目录名]。如：-u https://m.buick.com.cn/act/
// -o      输出的文件排序，默认是根据time来排序，可以指定为file，按文件名来排序。如：-u file
// Examples: node filelist-node.js, node filelist-node.js -d -2 -u https://m.buick.com.cn/act
//*****************************************************************************************************/
var fs = require("fs");

//path模块，可以生产相对和绝对路径
var path = require("path");
var currFilePath = path.resolve();//获取当前目录绝对路径，这里resolve()不传入参数
var projectName = "YOUR_PROJECT";

//配置远程路径
var websitePath = "https://"+projectName;

var fromDate = new Date(1970, 0, 1);

var version = "1.0";
//读取文件存储数组
var fileArr = [];
var WEB_FILE_TYPE = ["bmp","gif","png","jpeg","jpg","tif","tiff","svg","swf","flv","f4v","txt","js","css","xml","html","xhtml","json","eot","woff","woff2","ttf","zip","rar","apk","pdf","doc","csv","mid","midi","wav","mp3","mp4","mov","ogg","webm","qt","ram","yam","map"];


main();

function main(){
    if(currFilePath.lastIndexOf("/")!=-1){
        projectName = currFilePath.split("/").pop();
    }else{
        projectName = currFilePath.split("\\").pop();
    }
    websitePath = "https://"+projectName;
    var isShowHelp = false;
    var isShowVer = false;
    var order = "time";
    process.argv.forEach(function (val, index, array) {
        switch(val){
            case "-d":
                fromDate = parseDate(array[index+1]);
            break;
            case "-u":
                websitePath = array[index+1];
            break;
            case "-o":
                order = array[index+1];
                order = order=="file"?"file":"time";
            break;
            case "-v":
                isShowVer = true;
            break;
            case "-h":
                isShowHelp = true;
            break;
        }
    });

    if(isShowHelp){
        showHelp();
    }else if(isShowVer){
        console.log("File List "+version);
    }else{
        console.log("*** 更多参数说明请参考 node file-list-node.js -h");
        listFiles(currFilePath, "");
        writeFile(orderFiles(fileArr, order));
    }
}

function parseDate(value){
    var date = fromDate;
    var arr = value.split("-");
    if(!isNaN(value)){
        date = new Date();
        date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0);
        var day = parseInt(value);
        if(day>0){
            date.setDate(day);
        }else{
            date.setTime(date.getTime()+(day+1)*24*60*60*1000);
        }
        console.log(date);
    }else if(arr.length==3){
        date = new Date(arr[0],parseInt(arr[1])-1,parseInt(arr[2]));
    }else if(arr.length==2){
        date = new Date(new Date().getFullYear(), parseInt(arr[0])-1, parseInt(arr[1]));
    }
    return date;
}

function listFiles(filePath, pathName){
    //读取文件目录
    var files = fs.readdirSync(filePath);
    files.forEach(function(filename){
        //filePath+"/"+filename不能用/直接连接，Unix系统是”/“，Windows系统是”\“
        var stats = fs.statSync(path.join(filePath,filename));
        
        if(stats.isFile()){//文件
            //var stat = fs.statSync(path.join(filePath,filename));
            if(checkFile(filename, stats.mtime)){
                fileArr.push({path:websitePath + pathName+"/"+ filename,mtime:stats.mtime});
            }
        }else if(stats.isDirectory()){
            if(checkDirectory(filename)){
                listFiles(path.join(filePath,filename),pathName+"/"+filename);
            }
        }
    });
}

function orderFiles(arr, order){
    if(order=="time"){
        return arr.sort(function(a,b){
            return (a.mtime>b.mtime)? -1 : 1;
        });
    }else if(order=="file"){
        return arr.sort(function(a,b){
            return (a.path>b.path)? -1 : 1;
        });
    }else{
        return arr;
    }
}

//获取后缀名
function getFileType(url){
    var arr = url.split('.');
    var len = arr.length;
    return arr[len-1];
}

function checkFile(filename, mtime){
    var ret = true;
    switch(filename){
        case "filelist-node.js":ret  = false;break;
        case "cdn_filelist.txt":ret  = false;break;
    }
    if(filename=="testdrive.html" || filename=="readme.txt")console.log(filename,mtime,fromDate);
    return ret && filename.indexOf(".")!=0 && mtime.getTime()>fromDate.getTime() && WEB_FILE_TYPE.indexOf(getFileType(filename).toLowerCase())!=-1;
    
}

function checkDirectory(dir){
    if(dir.indexOf(".")==0){
        return false;
    }
    return true;
}

// 写入到filelisttxt文件
function writeFile(data){
    var isEmpty = false;
    if(data.length==0){
        data = [{path:"无符合的文件。"}];
        isEmpty = true;
    }
    var arr = [];
    var ipp = 200;//每次只能提交200条URL，
    var len=data.length;
    if(len>ipp) arr.push('******** 因为网页刷新一次最多只能提交'+ipp+'条URL, 所以请分'+(Math.floor(len/ipp)+1)+'次完成刷新。*********');
    for(var i=0 ;i<len;i++){
        if(len>ipp&&i%ipp==0) arr.push("****************************** PART "+(Math.floor(i/ipp)+1)+" ******************************");
        arr.push(data[i].path);
    }
    fs.writeFile(currFilePath+"/"+"cdn_filelist.txt",arr.join("\r\n"),function(err){
        if(err){
            throw err;
            console.error("写入出错："+err);
        }else if(isEmpty){
            console.log("无符合的文件。");
        }else{
            console.log('SUCCESS! 共输出'+len+'个URL，列表文件输出在当前目录下的 "cdn_filelist.txt"。');
            if(len>ipp)console.log('* 因为网页刷新一次最多只能提交'+ipp+'条URL, 所以要分'+(Math.floor(len/ipp)+1)+'次完成刷新。');
        }
    });
}

function showHelp(){
    console.log("-h\t显示帮助信息。");
    console.log("-v\t显示版本信息。");
    console.log("-d\t罗列出指定的日期后的文件，默认罗列出所有文件。有四种形式：\n\t  如:1）-d 2017-2-5\n\t     2) -d 2-5 当前年份下的2月5号\n  \t     3) -d 5 当前年份-当前月份下的5号\n\t     4）-d -2 当前时间往前推2天");
    console.log("-u\t在站点文件前添加URL路径，默认前缀为："+websitePath+"。 \n\t  如:-u https://m.buick.com.cn/act/encore");
    console.log("-o\t输出的文件排序，默认是根据time来排序，可以指定为file，按文件名来排序。\n\t  如：-u file");
}