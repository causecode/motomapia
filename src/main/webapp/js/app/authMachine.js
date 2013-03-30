// Generated by CoffeeScript 1.3.3
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  define(function(require) {
    var AuthMachine, cookies;
    cookies = require('cookies');
    require('persona');
    AuthMachine = (function() {

      AuthMachine.prototype.identity = null;

      function AuthMachine() {
        this.onLogoutSuccess = __bind(this.onLogoutSuccess, this);

        this.onLoginSuccess = __bind(this.onLoginSuccess, this);

        this.logout = __bind(this.logout, this);

        this.login = __bind(this.login, this);

        this._onLogout = __bind(this._onLogout, this);

        this._onLogin = __bind(this._onLogin, this);

        var cookieParts, loginCookie;
        loginCookie = cookies.get('login');
        if (loginCookie != null) {
          cookieParts = loginCookie.split(":");
          this.identity = decodeURIComponent(cookieParts[1]);
        }
        navigator.id.watch({
          loggedInEmail: this.identity,
          onlogin: this._onLogin,
          onlogout: this._onLogout
        });
      }

      AuthMachine.prototype._onLogin = function(assertion) {
        var _this = this;
        return $.post('/login/persona', {
          assertion: assertion
        }, function(person) {
          _this.identity = person.email;
          return _this.onLoginSuccess(person);
        });
      };

      AuthMachine.prototype._onLogout = function() {
        cookies["delete"]('login');
        this.identity = null;
        return this.onLogoutSuccess();
      };

      AuthMachine.prototype.login = function() {
        var params;
        params = {
          siteName: 'Motomapia'
        };
        return navigator.id.request(params);
      };

      AuthMachine.prototype.logout = function() {
        return navigator.id.logout();
      };

      AuthMachine.prototype.onLoginSuccess = function(person) {};

      AuthMachine.prototype.onLogoutSuccess = function() {};

      return AuthMachine;

    })();
    return new AuthMachine();
  });

}).call(this);
