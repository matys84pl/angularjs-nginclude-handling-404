/**
 * Created with IntelliJ IDEA.
 * User: Mateusz
 * Date: 28.11.12
 * Time: 20:03
 */

angular.module('app', [])
    .config(['$httpProvider', function ($httpProvider) {

    var page404 = "<h2>404 - not found</h2>";

    var interceptor = ['$q', function($q) {

        function success(response) {
            return response;
        }

        function error(response) {
            if (response.status === 404 && response.config.url.indexOf(".html")) {

                response.data = page404;
                response.status = 200;

                return response;
            }
            return $q.reject(response);
        }

        return function(promise) {
            return promise.then(success, error);
        }
    }];

    $httpProvider.responseInterceptors.push(interceptor);
}]);