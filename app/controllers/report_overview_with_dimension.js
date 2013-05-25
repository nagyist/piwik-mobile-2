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

var args         = arguments[0] || {};
var flatten      = args.flatten || 0;
var reportDate   = require('session').getReportDate();
var $model       = args ? args["$model"] : null;
$.metric.text    = $model.getMetricName();

$.piwikProcessedReport.on('reset', showReportContent);

function openReport()
{
    if (!hasReportRowsToDisplay()) {
        return;
    }
    
    var report = Alloy.createController('report_with_dimension', {report: $model});
    report.open();
}

function hideReportHasNoData()
{
    $.noData.hide();
    $.noData.height = 0;
}

function showReportHasNoData()
{
    $.noData.height = Ti.UI.SIZE;
    $.noData.show();
}

function hideMoreLink()
{
    $.footer.hide();
    $.footer.height = 0;
}

function hasReportRowsToDisplay()
{
    return ($.piwikProcessedReport && $.piwikProcessedReport.length);
}

function showReportContent()
{
    if (!hasReportRowsToDisplay()) {
        showReportHasNoData();
        hideMoreLink();
    }

    $.loadingIndicator.height = 0;
    $.loadingIndicator.hide();
    $.content.height = Ti.UI.SIZE;
    $.content.show();
}

function showLoadingMessage()
{
    hideReportHasNoData();
    $.loadingIndicator.show();
}

function fetchProcessedReport()
{
    var accountModel = require('session').getAccount();
    var siteModel    = require('session').getWebsite();

    if (!accountModel || !siteModel) {
        console.log('account or site not found, cannot refresh report overview with dimension');
        return;
    }

    var module = $model.get('module');
    var action = $model.get('action');
    var metric = $model.getSortOrder();

    showLoadingMessage();

    $.piwikProcessedReport.fetchProcessedReports(metric, {
        account: accountModel,
        params: {
            period: reportDate.getPeriodQueryString(), 
            date: reportDate.getDateQueryString(), 
            idSite: siteModel.id, 
            flat: flatten,
            filter_truncate: 3,
            apiModule: module, 
            apiAction: action,
            showColumns: metric,
            hideMetricsDoc: 1
        }
    });
}

fetchProcessedReport();