'use strict';
var localStorage = localStorage || {};

var sessionId = {
	set: function (id) {
		localStorage.sessionId = id;
	},

	get: function () {
		return localStorage.sessionId || $.cookie('atmosphere-session-id') || '';
	}
};

function make_path(added) {
	return 'https://atmos.interprism.co.jp/atmos-stg/' + added;
}

var http = {
	request: function (apiPath, method, data) {
		return $.ajax({
			url: make_path(apiPath),
			type: method,
			dataType: 'text',
			data: data,
			headers: {
				'atmosphere-session-id': sessionId.get()
			},
			cache: false
		})
			.done(function (res, _, xhr) {
				sessionId.set(xhr.getResponseHeader('atmosphere-session-id'));
			})
			.fail(function (_, __, error) {
				console.log(error);
			});
	},

	get: function (apiPath, data) {
		return this.request(apiPath, 'GET', data);
	},

	post: function (apiPath, data) {
		return this.request(apiPath, 'POST', data);
	}
};


var sluggard = angular.module('sluggard', []);

sluggard.controller('remoteServerListController', ['$scope', function ($scope) {


	$scope.tempData = 10086;
	$scope.serverOperator = function () {
		alert('ok');
	}

}]);


sluggard.controller('versionController', ['$scope', function ($scope) {
	$scope.localIps = [
		{ip: "192.1.1.1"},
		{ip: "192.1.1.2"}
	]
}])
;


//function applyTimeline($promise) {
//    $promise
//        .done(function (res) {
//            var $scope = angular.element(('#timeline-container')).scope();
//            $scope.$apply(function () {
//                $scope.messages = JSON.parse(res).results;
//            });
//        });
//}

//function LoginController($scope) {
//    $scope.login = function () {
//       http.post('auth/login', util.format('{"user_id": "%s", "password": "%s"}', $scope.id, $scope.password))
//           .done(function (res) {
//             if (JSON.parse(res).session_id) {
//               $('#entrance').css('display', 'none');
//               $('#content').show();
//               applyTimeline(http.get('messages/search', util.format('count=%d', 50)));
//             }
//           });
//    }
//
//		$('#entrance').css('display', 'none');
//		$('#content').show();
//		applyTimeline(http.get('messages/search', util.format('count=%d', 50)));
//}

//function remoteServerListController($scope) {
////    $scope.send = function () {
////        http.post('messages/send', util.format('{"message": "%s", "reply_to": ""}', $scope.message))
////            .done(function () {
////                applyTimeline(http.get('messages/search', util.format('count=%d', 50)));
////            });
////    };
//
//
//}
//function TimelineController($scope) {
//    $scope.avatarUrl = function (message) {
//        return make_path('user/avator') + util.format('?user_id=%s', message.created_by);
//    };
//}

//function SearchController($scope) {
//    $scope.search = function () {
//        applyTimeline(http.get('messages/search', util.format('keywords=%s', $scope.keyword)));
//    }
//}

//(function streaming() {
//    var sock = new SockJS('https://atmos.interprism.co.jp/atmos-stg-ws/notify');
//    sock.onopen = function() {
//        this.send(util.format('{"action":"start","atmosphere-session-id":"%s"}', sessionId.get()));
//    };
//
//    sock.onmessage = function(e) {
//        var data = JSON.parse(e.data);
//        if (typeof data.info !== "undefined") {
//            // TODO messgaes.pushだけで反映されて欲しいんだが
//            //      やり方が分からないのでとりあえず再取得
//            http.get('messages/search', util.format('count=%d', 50))
//                .done(function (res) {
//                    var $scope = angular.element(('#timeline-controller')).scope();
//                    $scope.$apply(function () {
//                        $scope.messages = JSON.parse(res).results;
//                    });
//                });
//        }
//    };
//
//    sock.onclose = function() {
//    };
//})();

//(function bind_tabpane() {
//    $('.nav-tabs a').on('click', function() {
//        console.log('cc');
//    });
//})();
