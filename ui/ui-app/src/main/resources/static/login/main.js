require.config({
    waitSeconds: 0,
    urlArgs: "ver=0.8.1",
    baseUrl: "login",
    paths: {
        "angular":"../node_modules/angular/angular",
        "angular-material-icons":"../node_modules/angular-material-icons/angular-material-icons",
        "angularAnimate":"../node_modules/angular-animate/angular-animate",
        "angularAria":"../node_modules/angular-aria/angular-aria",
        "angularLocalStorage": "../node_modules/angularLocalStorage/dist/angularLocalStorage.min",
        "angularMaterial":"../node_modules/angular-material/angular-material",
        "angularMessages":"../node_modules/angular-messages/angular-messages",
        "angularCookies": "../node_modules/angular-cookies/angular-cookies",
        "login-app":"login-app",
        "jquery":"../node_modules/jquery/dist/jquery",
        "lz-string": "../node_modules/lz-string/libs/lz-string.min",
        "ocLazyLoad":"../node_modules/oclazyload/dist/ocLazyLoad.require",
        "requirejs": "../node_modules/requirejs/require",
        "underscore":"../node_modules/underscore/underscore",
        "urlParams":"jquery.urlParam",
        "pascalprecht.translate":"../node_modules/angular-translate/angular-translate",
        "angular-translate-loader-static-files": "../node_modules/angular-translate-loader-static-files/angular-translate-loader-static-files.min",
        "angular-translate-storage-local": "../node_modules/angular-translate-storage-local/angular-translate-storage-local.min",
        "angular-translate-handler-log": "../node_modules/angular-translate-handler-log/angular-translate-handler-log.min",
        "angular-translate-storage-cookie": "../node_modules/angular-translate-storage-cookie/angular-translate-storage-cookie.min"
},
    shim: {
        "angular": {deps:["jquery"],exports: "angular"},
        'angularAria': ['angular'],
        'angularMessages': ['angular'],
        'angularAnimate': ['angular'],
        'angularMaterial': ['angular','angularAnimate','angularAria','angularMessages'],
        'angular-material-icons':['angular'],
        'ocLazyLoad':['angular'],
        'urlParams':['jquery'],
        'pascalprecht.translate':['angular'],
        'angular-translate-loader-static-files':['pascalprecht.translate'],
        'angular-translate-storage-local': {deps: ['pascalprecht.translate']},
        'angular-translate-handler-log': {deps: ['pascalprecht.translate']},
        'angular-translate-storage-cookie': {deps: ['pascalprecht.translate']},

        'login-app':{deps:['ocLazyLoad','underscore','angularMaterial','jquery'], exports:'login-app'}
    },
    deps: ['login-app']
});

// 'cardLayout' :'js/card-layout/card-layout-directive'
