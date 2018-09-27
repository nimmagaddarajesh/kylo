import * as angular from 'angular';

import AccessConstants from "../../constants/AccessConstants";
import lazyLoadUtil from "../../kylo-utils/LazyLoadUtil";
//const lazyLoadUtil = require('../../kylo-utils/LazyLoadUtil');
const moduleName = require('./module-name');
import 'kylo-feedmgr'; //todo ruslan lazy import with chunk name?
import 'kylo-common'; //for dir-pagination?

class ModuleFactory  {

    module: ng.IModule;
    constructor () {
        console.log('feeds/module factory constructor');
        this.module = angular.module(moduleName,[]);
        this.module.config(['$stateProvider','$compileProvider',this.configFn.bind(this)]);
    }

    configFn($stateProvider:any, $compileProvider:any) {
        console.log('feeds/module configFn');

        $compileProvider.preAssignBindingsEnabled(true);
        $stateProvider.state(AccessConstants.UI_STATES.FEEDS.state, {
            url: '/feeds',
            params: {
                tab: null
            },
            views: {
                'content': {
                    templateUrl: 'feeds-table.html',
                    controller:'FeedsTableController',
                    controllerAs:'vm'
                }
            },
            lazyLoad: ($transition$) => {
                const $ocLazyLoad = $transition$.injector().get("$ocLazyLoad");

                return import(/* webpackChunkName: "feed-mgr.feeds.table.module" */ './FeedsTableController')
                    .then(mod => {
                        console.log('Imported ./FeedsTableController', mod);
                        $ocLazyLoad.load(mod.default);
                    })
                    .catch(err => {
                        throw new Error("Failed to load ./FeedsTableController, " + err);
                    });
            },
            data: {
                breadcrumbRoot: true,
                displayName: 'Feeds',
                module:moduleName,
                permissions:AccessConstants.UI_STATES.FEEDS.permissions
            }
        });

    }
}

export default new ModuleFactory();
