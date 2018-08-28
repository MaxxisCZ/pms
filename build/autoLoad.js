/**
 * Created by 江苏立讯机器人有限公司. [ http://www.luxshare-ict.com ]
 * User: apeol
 * Date: 2018/8/27
 * Time: 09:37
 */

const fs = require('fs');
const path = require('path');
const root = path.resolve('./src/pages');
let routes = [];

function read(src, done){
  let d = path.join(root, src);
  let files = fs.readdirSync(d);
  let i = 0;
  (function next(){
    let file = files[i++];
    if(!file) return done();
    let dir = path.join(d, file);
    fs.stat(dir, (e, stats)=>{
      if(!e && file.substr(0,1) != '.'){
        if(stats.isFile()){
          if(file != 'layout.vue'){
            let ext = path.extname(file);
            if(ext.toLowerCase() == '.vue'){
              routes.push(path.join(src, path.basename(file, ext)));
            }
          }
          next();
        }else{
          read(path.join(src, file), next);
        }
      }
    })
  })();
}

module.exports = new Promise((resolve, reject) => {
  read('', ()=>{
    fs.writeFileSync('./src/router/config.js','module.exports = ["' + routes.join('", "') + '"]');
    resolve();
  });
});
