#!/usr/bin/env node
 //第一行标识用node来执行这个文件

console.log("welcome");
console.log(process.argv);
var fs = require('fs');
var path = require('path');
console.log("path:" + path);

function copyTemplate(from, to) {
    console.log("__dirname:" + __dirname); // ..../qiu-cli
    from = path.join(__dirname, 'templates', from);
    write(to, fs.readFileSync(from, 'utf-8'));
}

function write(path, str, mode) {
    fs.writeFileSync(path, str)
}

function mkdir(path, fn) {
    fs.mkdir(path, function(err) {
        fn && fn()
    })
}
var PATH = ".";
copyTemplate("index.html", PATH + "/index.html");
mkdir(PATH + "/src", function() {
    mkdir(PATH + "/src/scss", function() {
        copyTemplate("scss/main.scss", PATH + "/src/scss/main.scss");
        mkdir(PATH + "/src/scss/base", function() {
            copyTemplate("scss/base/_common.scss", PATH + "/src/scss/base/_common.scss");
            copyTemplate("scss/base/_reset.scss", PATH + "/src/scss/base/_reset.scss");
            copyTemplate("scss/base/_variables.scss", PATH + "/src/scss/base/_variables.scss");
        });
        mkdir(PATH + "/src/component");
        mkdir(PATH + "/src/static");
        mkdir(PATH + "/src/build");
        mkdir(PATH + "/src/config");
    })
})
var config = {};
process.argv.slice(2).forEach(function(item) {
    switch (item) {
        case "-v":
            config.vue = true;
            break;
        case "-j":
            config.jquery = true;
            break;
        case "-s":
            config.swiper = true;
            break;
        case "-b":
            config.bootstrap = true;
            break;
    }
})
mkdir(PATH + "/public", function() {
    mkdir(PATH + "/public/js", function() {
        copyTemplate("js/main.js", PATH + "/public/js/main.js");
        config.bootstrap && copyTemplate("js/bootstrap.min.js", PATH + "/public/js/bootstrap.min.js");
        config.vue && copyTemplate("js/vue.min.js", PATH + "/public/js/vue.min.js");
        if (config.jquery) {
            copyTemplate("js/jquery-1.8.3.min.js", PATH + "/public/js/jquery-1.8.3.min.js");
            copyTemplate("js/jquery-3.1.1.min.js", PATH + "/public/js/jquery-3.1.1.min.js");
        }
    })
})