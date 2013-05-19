/**
 * Piwik - Open source web analytics
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html Gpl v3 or later
 */

function L(key)
{
    return require('L')(key);
}

var args = arguments[0] || {};
var accounts = args.accounts;

var loginform = Alloy.createController('login_form', {
    accounts: accounts
});

$.loginform.add(loginform.getView());

function onUrlReturn () {
    if ($.url.value && -1 === $.url.value.indexOf('http')) {
        // user has not specified any http protocol. automatically prepend 'http'.
        $.url.value = 'http://' + $.url.value;
    }
    
    $.username.focus();
}

function onOpen()
{
    require('Piwik/Tracker').trackWindow('Create Account', 'account-create');
}

function onUsernameReturn () {
    $.password.focus();
}

exports.open = function () 
{
    require('layout').open($.index);
}

exports.close = function () 
{
    require('layout').close($.index);
    $.destroy();
}