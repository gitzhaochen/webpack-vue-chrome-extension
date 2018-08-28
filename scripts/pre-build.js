const path = require('path')
const fs = require('fs')
const srcDir = path.join(__dirname, '../src')
const env = process.env.NODE_ENV;
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

function main() {
    files.forEach((file)=>{
        let source=path.join(srcDir, file[`source_${env}`]);
        let target=path.join(srcDir, file.target);
        fs.createReadStream(source).pipe(fs.createWriteStream(target));
    })
}

main();