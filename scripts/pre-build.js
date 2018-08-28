const path = require('path')
const fs = require('fs')
const srcDir = path.join(__dirname, '../src')
const env = process.env.NODE_ENV;
const manifest =process.env.npm_config_manifest;

let files = [
    {
        source_development: '/env/development/manifest.json',
        source_staging: '/env/staging/manifest.json',
        source_production: '/env/production/manifest.json',
        target: '/manifest.json'
    },
    {
        source_development: '/env/development/config.js',
        source_staging: '/env/staging/config.js',
        source_production: '/env/production/config.js',
        target: '/background/config.js'
    },
    {
        source_development: '/env/development/element-variables.scss',
        source_staging: '/env/staging/element-variables.scss',
        source_production: '/env/production/element-variables.scss',
        target: '/common/stylus/element-variables.scss'
    },
    {
        source_development: '/env/development/variable.styl',
        source_staging: '/env/staging/variable.styl',
        source_production: '/env/production/variable.styl',
        target: '/common/stylus/variable.styl'
    }

];
//更改manifest version
const update_manifest = file =>
    new Promise((resolve, reject) => {
        fs.readFile(file, 'utf8', (err, data) => {
            if (err) {
                reject(err)
                return
            };
            let regex=/"version":.*?",/
            // eslint-disable-next-line
            data = data.replace(regex, `"version":"${manifest}",`);
            // eslint-disable-next-line
            fs.writeFile(file, data, err => {
                if (err) {
                    reject(err)
                    return
                }

                resolve()
            })
        })
    });
async function main() {
    if(env==='production'){
        let file=path.join(srcDir, files[0][`source_${env}`]);
        let res=await update_manifest(file);
        console.log(file)
    };
    files.forEach((file)=>{
        let source=path.join(srcDir, file[`source_${env}`]);
        let target=path.join(srcDir, file.target);
        fs.createReadStream(source).pipe(fs.createWriteStream(target));
    })
}

main();