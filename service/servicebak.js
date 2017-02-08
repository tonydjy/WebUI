'use strict';

 

angular.module('zinc.service', ['zinc.provider']).factory('ApiClient',['RemoteUrl','$http', '$q', 'Cache','$rootScope', 'AUTH_EVENTS', function(remoteUrlProvider, $http, $q, cache, $rootScope, AUTH_EVENTS){

                var remote = {

                                get: function(url){

                                                var responsePromise = $http({

                                                                url: url,

                                                                method: 'GET',

                                                                headers: {

                                                                                'x-auth-token': cache.getToken()

                                                                }

                                                });

                                                return responsePromise;

                                },

                                post: function(url, body) {

                                                var responsePromise = $http({

                                                                url: url,

                                                                method: 'POST',

                                                                headers: {

                                                                                'x-auth-token': cache.getToken()

                                                                },

                                                                data: body

                                                });

                                                return responsePromise;

                                },

                                put: function(url, body){

                                                var responsePromise = $http({

                                                    url:url,

                                                    method: 'PUT',

                                                    headers: {

                                                                                'x-auth-token': cache.getToken()

                                                    },

                                                    data: body

                                                  });

                                                return responsePromise;

                                },

                                delete: function(url){

                                                var responsePromise = $http({

                                                    url:url,

                                                    method: 'DELETE',

                                                    headers: {

                                                                                'x-auth-token': cache.getToken()

                                                    }

                                                  });

                                                return responsePromise;

                                }

                };

 

                var concatParameter = function(url, key, value){

                                var concatedUrl = url;

                                if(_.isEmpty(url.match(/\?/))){

                                                concatedUrl = url + "?";

                                }else{

                                                concatedUrl = url + "&";

                                }

                                concatedUrl = concatedUrl + key + "=" + value;

                                return concatedUrl;

                };

 

                return {

                                concatUrlParameters: function(url, objet, raw){

                                                var retUrl = "";

                                                if(raw){

                                                                retUrl = url;

                                                }else{

                                                                retUrl = remoteUrlProvider.getUrl(url, false).url;

                                                }

                                                if(!_.isEmpty(objet)){

                                                                Object.keys(objet).forEach(function(key){

                                                                                retUrl = concatParameter(retUrl, key, objet[key]);

                                                                });

                                                }

                                                return retUrl;

                                },

                                authenticate: function(userName, password) {

                                                var urlObj = remoteUrlProvider.getUrl("user.authenticate", false);

                                                var body = {

                                                                username: userName,

                                                                password: password

                                                };

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                ping: function() {

                                                var urlObj = remoteUrlProvider.getUrl('user.ping', false);

                                                return remote[urlObj.action](urlObj.url);

                                },

                                getApplications: function(){

                                                var urlObj = remoteUrlProvider.getUrl('user.getApplications', false);

                                                return remote[urlObj.action](urlObj.url);

                                },

                                logout: function() {

                                                var urlObj = remoteUrlProvider.getUrl('user.logout', false);

                                                return remote[urlObj.action](urlObj.url);

                                },

                                getLdapInfo: function() {

                                                var urlObj = remoteUrlProvider.getUrl('option.getLdapInfo', false);

                                                return remote[urlObj.action](urlObj.url);

                                },

                                updateLdapInfo: function(ldapInfo) {

                                                var urlObj = remoteUrlProvider.getUrl('option.updateLdapInfo', false);

                                                var body = ldapInfo;

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                createLdapConfig: function(ldap) {

                                                var urlObj = remoteUrlProvider.getUrl('option.createLdapConfig', false);                                            

                                                var body = ldap;

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                updateLdapConfig: function(name, ldap) {

                                                var urlObj = remoteUrlProvider.getUrl('option.updateLdapConfig', false);

                                                var url = urlObj.url.replace("{name}", encodeURIComponent(name));

                                                var body = ldap;

                                                return remote[urlObj.action](url, body);

                                },

                                deleteLdapConfig: function(name) {

                                                var names = typeof(name) === 'string' ? [name] : name;

                                                names = _.map(names, function(n) {

                                                                return encodeURIComponent(n);

                                                });

                                                var toDelete = names.join(',');

                                                var urlObj = remoteUrlProvider.getUrl('option.deleteLdapConfig', false);

                                                var url = urlObj.url.replace("{name}", toDelete);

                                                return remote[urlObj.action](url);                                         

                                },

                                testLdapConnection: function(ldap) {

                                                var urlObj = remoteUrlProvider.getUrl('option.testLdapConnection', false);

                                                var body = ldap;

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                setLdapBindings: function(appName, bindings) {

                                                var urlObj = remoteUrlProvider.getUrl('option.setLdapBindings', false);

                                                var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

                                                var body = bindings;

                                                return remote[urlObj.action](url, body);

                                },                                                           

                                getApplicationRoles: function(application, userName, directory){

                                                var urlObj = remoteUrlProvider.getUrl('roles.getAppRoles', false);

                                                var url = urlObj.url.replace("{appName}", application);

                                                url = url.replace("{userName}", encodeURIComponent(userName));

                                                if(!_.isEmpty(directory)){

                                                                url += "?directory=" + encodeURIComponent(directory);

                                                }

                                                return remote[urlObj.action](url);

                                },

                                setApplicationRoles: function(application, userName, roles, operation, directory) {

                                                var urlObj = remoteUrlProvider.getUrl('roles.setAppRoles', false);

                                                var url = urlObj.url.replace("{appName}", application);

                                                url = url.replace("{userName}", encodeURIComponent(userName));

                                                if(!_.isEmpty(directory)){

                                                                url += "?directory=" + encodeURIComponent(directory);

                                                }

                                                var body = {

                                                                roles: roles,

                                                                operation: operation

                                                }

                                                return remote[urlObj.action](url, body);

                                },

                                getApplicationReplicaInfo: function(application) {

                                                var urlObj = remoteUrlProvider.getUrl('app.getReplicaInfo', false);

                                                var url = urlObj.url.replace("{appName}", encodeURIComponent(application));

                                                return remote[urlObj.action](url);

                                },

                                setApplicationReplicaInfo: function(application, content) {

                                                var urlObj = remoteUrlProvider.getUrl('app.setReplicaInfo', false);

                                                var url = urlObj.url.replace("{appName}", encodeURIComponent(application));

                                                return remote[urlObj.action](url, content);

                                },                           

                                getApplicationDirectories: function(application) {

                                                var urlObj = remoteUrlProvider.getUrl('app.getDirectories', false);

                                                var url = urlObj.url.replace("{appName}", encodeURIComponent(application));

                                                return remote[urlObj.action](url);

                                },

                                setApplicationDirectories: function(application, directories) {

                                                var urlObj = remoteUrlProvider.getUrl('app.getAppInfo', false);

                                                var url = urlObj.url.replace("{appName}", encodeURIComponent(application));

                                                var body = directories;

                                                return remote[urlObj.action](url, body);

                                },                           

                                queryLdapUsers: function(application, prefix, type, directory){

                                                var urlObj = remoteUrlProvider.getUrl('roles.queryLdapUsers', false);

                                                var url = urlObj.url.replace("{appName}", application);

                                                url = url.replace("{prefix}", encodeURIComponent(prefix));

                                                if(!_.isEmpty(directory)){

                                                                url += "&directory=" + encodeURIComponent(directory);

                                                }

                                                if(!_.isEmpty(type)){

                                                                url += "&type=" + type;

                                                }

                                                return remote[urlObj.action](url);

                                },

                                getAllSources: function(customUrl){

                                                var urlObj = remoteUrlProvider.getUrl('source.getAllSources', false);

                                                var url = customUrl || urlObj.url;

                                                return remote[urlObj.action](url);

                                },

                                precheckSource: function(body){

                                                var urlObj = remoteUrlProvider.getUrl('source.precheckSource', false);

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                addSource: function(body){

                                                var urlObj = remoteUrlProvider.getUrl('source.addSource', false);

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                updateSource: function(body, id){

                                                var urlObj = remoteUrlProvider.getUrl('source.updateSource', false);

                                                var url = urlObj.url.replace("{id}", id);

                                                return remote[urlObj.action](url, body);

                                },

                                deleteSource: function(id){

                                                var urlObj = remoteUrlProvider.getUrl('source.deleteSource', false);

                                                return remote[urlObj.action](urlObj.url.replace('{id}', id));

                                },

                                getSource: function(id){

                                                var urlObj = remoteUrlProvider.getUrl('source.getSource', false);

                                                var url = urlObj.url.replace("{id}", id);

                                                return remote[urlObj.action](url);

                                },

                                getDefaultTimezone: function(){

                                                var urlObj = remoteUrlProvider.getUrl('source.getDefaultTimezone', false);

                                                return remote[urlObj.action](urlObj.url);

                                },

                                getAccessZonesBySourceId: function(id){

                                                var urlObj = remoteUrlProvider.getUrl('source.getZones', false);

                                                var url = urlObj.url.replace("{id}", id);

                                                return remote[urlObj.action](url);

                                },

                                getAccessZonesFromServer: function(server, port, username, password){

                                                var urlObj = remoteUrlProvider.getUrl("source.getAccessZonesFromServer", false);

                                                var body = {

                                                                server: server,

                                                                port: port,

                                                                username: username,

                                                                password: password

                                                };

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                getSizeBySourceId: function(id){

                                                var urlObj = remoteUrlProvider.getUrl("source.getSizeBySource", false);

                                                var url = urlObj.url.replace("{id}", id);

                                                return remote[urlObj.action](url);

                                },

                                getSize: function(server, port, username, password){

                                                var urlObj = remoteUrlProvider.getUrl("source.getSize", false);

                                                var body = {

                                                                server: server,

                                                                port: port,

                                                                username: username,

                                                                password: password

                                                };

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                getAccessZonesFromLocal: function(source_id){

                                                var urlObj = remoteUrlProvider.getUrl("source.getAccessZonesFromLocal", false);

                                                var body = {

                                                                source_id: source_id

                                                };

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                createIndex: function(application, sourceName, indexDesc, indexAnalyzer, config){

                                                var urlObj = remoteUrlProvider.getUrl("index.createIndex", false);

                                                var url = urlObj.url.replace("{app}", application);

                                                var body = {

                                                                index_name: sourceName,

                                                                index_description: indexDesc,

                                                                index_analyzer: indexAnalyzer,

                                                                config: config

                                                };

                                                return remote[urlObj.action](url, body);

                                },

                                getIndexes: function(queryUrl){

                                                var urlObj = remoteUrlProvider.getUrl('index.getIndexes', false);

                                                var url = queryUrl || urlObj.url;

                                                return remote[urlObj.action](url);

                                },

                                getIndex: function(app, indexId){

                                                var urlObj = remoteUrlProvider.getUrl('index.getIndex', false);

                                                var url = urlObj.url.replace("{id}", indexId);

                                                return remote[urlObj.action](url);

                                },

                                getIndexRoles: function(app, indexId){

                                                var urlObj = remoteUrlProvider.getUrl('index.getIndexRoles', false);

                                                var url = urlObj.url.replace("{id}", indexId);

                                                return remote[urlObj.action](url);

                                },

                                setIndexRoles: function(app, indexId, user_roles_to_add, user_roles_to_remove){

                                                var urlObj = remoteUrlProvider.getUrl('index.setIndexRoles', false);

                                                var url = urlObj.url.replace("{id}", indexId);

                                                var body = {

                                                                user_roles_to_add: user_roles_to_add,

                                                                user_roles_to_remove: user_roles_to_remove

                                                }

                                                return remote[urlObj.action](url, body);

                                },

                                createAddSrcJob: function(app, indexId, sourceId, sourceName, description, createdBy){

                                                var urlObj = remoteUrlProvider.getUrl("workitem.create", false, {'{app}': app});

                                                var body = {

                                                                category: 'job',

                                                                type: 'add_src',

                                                                name: sourceName,

                                                                description: description,

                                                                source: [sourceId],

                                                                index: [indexId],

                                                                priority: 8,

                                                                target: '_all'

                                                };

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                createRescanJob: function(app, indexId, sourceId, sourceName, startTime, endTime){

                                                var urlObj = remoteUrlProvider.getUrl("workitem.create", false, {'{app}': app});

                                                var body = {

                                                                category: 'job',

                                                                type: 'rescan',

                                                                name: sourceName,

                                                                source: [sourceId],

                                                                index: [indexId],

                                                                config: {startTime: startTime, endTime: endTime}

                                                };

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                queryJob: function(body){

                                                var urlObj = remoteUrlProvider.getUrl('job.query', false);

                                                return remote[urlObj.action](urlObj.url, body);

                                },

    rerunFailedTasks: function(app, jobId) {

      var body = '';

                                                var urlObj = remoteUrlProvider.getUrl('workitem.rerunFailedTasks', false, {'{app}': app, '{id}': jobId});

      return remote[urlObj.action](urlObj.url, body);

    },

                                getAbout: function(body){

                                                var urlObj = remoteUrlProvider.getUrl('system.about', false);

                                                return remote[urlObj.action](urlObj.url, body);

                                },

                                getPreferences: function(){

                                                var urlObj = remoteUrlProvider.getUrl('user.getPreferences', false);

                                                return remote[urlObj.action](urlObj.url);

                                },

                                setPreferences: function(locale){

                                                var urlObj = remoteUrlProvider.getUrl('user.setPreferences', false);

                                                var body = {

                                                                preferences: {locale: locale},

                                                };

                                                return remote[urlObj.action](urlObj.url, body);

                                },

 

                                //

                                // Workitem operations, using:

                                // apiClient.execute('workitem.get', {'{app}': $rootScope.currentApp.id}, '').then(...);

                                //

 

                                getSystemApplications: function() {

                                                var urlObj = remoteUrlProvider.getUrl("system.getApplications", false);

                                                return remote[urlObj.action](urlObj.url);

                                },

 

                                getSystemServices: function(options) {

      var urlObj = remoteUrlProvider.getUrl("system.getServices", false);

      if (options && options.extendSession == false) {

        return remote[urlObj.action](urlObj.url + "?extendsession=false");

      } else {

        return remote[urlObj.action](urlObj.url);

      }

                                },

 

                                getSystemMetrics: function(options) {

      var urlObj = remoteUrlProvider.getUrl("system.getMetrics", false);

      if (options && options.extendSession == false) {

        return remote[urlObj.action](urlObj.url + "?extendsession=false");

      } else {

        return remote[urlObj.action](urlObj.url);

      }

    },

 

                                getNotificationConfig: function(appName) {

                                                var urlObj = remoteUrlProvider.getUrl('option.getNotificationConfig', false);

                                                var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

                                                return remote[urlObj.action](url);

                                },                                                           

 

                                setNotificationConfig: function(appName, body) {

                                                var urlObj = remoteUrlProvider.getUrl('option.setNotificationConfig', false);

                                                var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

                                                return remote[urlObj.action](url, body);

                                },                                                           

 

    getSearchConfig: function(appName) {

      var urlObj = remoteUrlProvider.getUrl('option.getSearchConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url);

    },

 

    setSearchConfig: function(appName, body) {

      var urlObj = remoteUrlProvider.getUrl('option.setSearchConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url, body);

    },

 

    getContainerConfig: function(appName) {

      var urlObj = remoteUrlProvider.getUrl('option.getContainerConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url);

    },

 

    setContainerConfig: function(appName, body) {

      var urlObj = remoteUrlProvider.getUrl('option.setContainerConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url, body);

    },

 

    getFCIConfig: function(appName) {

      var urlObj = remoteUrlProvider.getUrl('option.getFCIConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url);

    },

 

    setFCIConfig: function(appName, body) {

      var urlObj = remoteUrlProvider.getUrl('option.setFCIConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url, body);

    },

 

    getActionConfig: function(appName) {

      var urlObj = remoteUrlProvider.getUrl('option.getActionConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url);

    },

 

    setActionConfig: function(appName, body) {

      var urlObj = remoteUrlProvider.getUrl('option.setActionConfig', false);

      var url = urlObj.url.replace("{appName}", encodeURIComponent(appName));

      return remote[urlObj.action](url, body);

    },

 

                                getCollectorNodeAndClusterHealth: function( options) {

                                var urlObj = remoteUrlProvider.getUrl("dashboard.getCollectorNodeAndClusterHealth", false);

                                if (options && options.extendSession == false) {

                        return remote[urlObj.action](urlObj.url + "?extendsession=false");

                      } else {

                        return remote[urlObj.action](urlObj.url);

                  }                           

                                },

                                getAllAppIndex: function(application, options) {

                                                var urlObj = remoteUrlProvider.getUrl("dashboard.getAllIndex", false, {'{appName}':application});

                                                if (options && options.extendSession == false) {

                                                 return remote[urlObj.action](urlObj.url + "?extendsession=false");

                                } else {

                                return remote[urlObj.action](urlObj.url);

                                }

                                },

 

                                getNotifications: function(customUrl){

                                                var urlObj = remoteUrlProvider.getUrl("dashboard.getNotifications");

                                                var url = customUrl || urlObj.url;

                                                return remote[urlObj.action](url);

                                },

                                getNotificationDetail: function(application, id){

                                                var urlObj = remoteUrlProvider.getUrl("dashboard.getNotificationDetail", false,{'{appName}':application, '{id}':id });

                                                return remote[urlObj.action](urlObj.url);

                                },

                                updateNotificationAction: function(application, notifications, action){

                                                var urlObj = remoteUrlProvider.getUrl("dashboard.updateNotificationAction", false,{'{appName}':application});

                                                var body = {

                                                                "notifications":notifications,

                                                                "action":action

                                                }

                                                return remote[urlObj.action](urlObj.url, body);

                                },

 

                                /**************************************

                                parameters :

                                                urlKey    : the key defined in url.js e.g. workitem.query

                                                urlParams : the url replacement in url.js e.g. {"{app}": "isilon", "{id}": "id1"}

                                                body        : the body to be passed into the API request

                                sample :

                                                apiClient.execute('workitem.get', {'{app}': $rootScope.currentApp.id}, '').then(...);

                                ***************************************/

                                execute: function(urlKey, urlParams, body) {

                                                var urlObj = remoteUrlProvider.getUrl(urlKey, false, urlParams);

                                                return remote[urlObj.action](urlObj.url, body);

                                },

 

                                /**************************************

                                parameters :

                                                response : return from remote call

                                                func     : callback function

                                                args        : other args for callback function

                                ***************************************/

                                success: function(response, func, args){

                                                var result = {

                                                                success: true,

                                                                data: null

                                                };

                                                try

                                                {

                                                                if(response.status == ErrorCode.STATUS_OK) {

                                                                                if(response.data.token != null){

                                                                                                //cache.setToken(response.data.token);

                                                                                }

                                                                                if(_.isFunction(func)){

                                                                                                result.data = func(response, args);

                                                                                }

                                                                }

                                                                else if(response.status == ErrorCode.STATUS_UNAUTHORIZED || response.status == ErrorCode.STATUS_CIS_PERMISSION_DENY){

                                                                                console.log("authenticate failed");

                                                                                $rootScope.$broadcast(AUTH_EVENTS.SESSION_EXPIRED,null);

                                                                                $rootScope.$emit(AUTH_EVENTS.ACCESS_DENY);

                                                                                $q.reject();

                                                                                result.success = false;

                                                                                result.data = angular.fromJson(response.data);

                                                                }

                                                                else{

                                                                                console.log(response.data);

                                                                                result.success = false;

                                                                                result.data = angular.fromJson(response.data);

                                                                }

                                                }

                                                catch(ex)

                                                {

                                                                console.log(ex);

                                                                result.success = false;

                                                                result.data = ex;

                                                }

                                                return result;

                                }

                };

}]);