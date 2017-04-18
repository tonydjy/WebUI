'use strict';

angular.module('tvapp.service').factory('Cache', function(){
	var set = function(key, str){
		localStorage.setItem(key, str);
	};
	var clear = function(key){
		localStorage.removeItem(key);
	};
	var get = function(key){
		return localStorage.getItem(key);
	}
	
	return {
		setToken: function(str){
			set("tvapp.token",str);
		},
		getToken: function(){
			return get("tvapp.token");
		},
		clearToken: function(){
			clear("tvapp.token");
		}
	}
});