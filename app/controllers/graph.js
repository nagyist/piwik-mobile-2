/**
 * Piwik - Open source web analytics
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html Gpl v3 or later
 */

var imageGraphUrl;
var imageGraphEvolutionUrl;
var reportName = '';
var reportDate = '';

function width (image) 
{
    if (image.size && image.size.width) {
        return image.size.width;
    } else if (image.width) {
        return image.width;
    } else {
        console.error('TODO NOT ABLE TO GET IMAGE WIDTH');
    }

    return 0;
}

function height (image) 
{
    if (image.size && image.size.height) {
        return image.size.height;
    } else if (image.height) {
        return image.height;
    } else {
        console.error('TODO NOT ABLE TO GET IMAGE WIDTH');
    }

    return 0;
}

function getGraphOptions()
{
    return {imageGraphUrl: imageGraphUrl,
            imageGraphEvolutionUrl: imageGraphEvolutionUrl,
            reportName: reportName, 
            reportDate: reportDate}
}

function showDetail ()
{
    var detailGraph = Alloy.createController('graph_detail', getGraphOptions());
    detailGraph.open();
}

function updateImage(graphUrl)
{
    var graph = require('Piwik/PiwikGraph');
    var imageWithSize = graph.appendSize(graphUrl, width($.image.getView()), height($.image.getView()), OS_IOS);

    console.log(imageWithSize);

    if ($.image.getView()) {
        $.image.getView().image = imageWithSize;
    }
}

function addGraphSwitcher(graphSwitcher)
{
    graphSwitcher.addSwitchGraph(false);

    $.index.add(graphSwitcher.getView());

    graphSwitcher.on('switch', function (event) {
        if (!event || !event.graphUrl) {
            return;
        }
        
        updateImage(event.graphUrl);
        
        graphSwitcher.toggleVisibility();
        $.showDetailIcon.hide();
    });

    $.image.getView().addEventListener('click', function () {
        if (!graphSwitcher) {
            return;
        }
        
        graphSwitcher.toggleVisibility();
    });
    
    if (OS_IOS) {
        $.image.getView().addEventListener('load', function () {
            // we need to wait till view is visible otherwise animation will never be executed.
            if (!graphSwitcher) {
                return;
            }
            
            graphSwitcher.fadeOut();
        });
    } else {
        graphSwitcher.fadeOut();
    }
}

function completeGraphUrl(graphUrl, processedReportCollection, accountModel)
{
    if (!graphUrl) {
        return '';
    }

    var graph = require('Piwik/PiwikGraph');
    graphUrl  = graph.addSortOrder(graphUrl, processedReportCollection.getSortOrder());
    graphUrl  = graph.generateUrl(graphUrl, accountModel);

    return graphUrl;
}

function toggleDetailIcon()
{
    if ($.showDetailIcon && $.showDetailIcon.visible) {
        $.showDetailIcon.hide();
    } else if ($.showDetailIcon && !$.showDetailIcon.visible) {
        $.showDetailIcon.show();
    }
}

function fadeOutDetailIcon()
{
    if (!$.showDetailIcon) {
        return;
    }
    
    $.showDetailIcon.hide();
    $.showDetailIcon.opacity = 1;
}

function animateFadeOutDetailIcon()
{
    if (!$.showDetailIcon) {
        return;
    }
    
    $.showDetailIcon.animate({opacity: 0, delay: 600, duration: 600}, fadeOutDetailIcon);
}

function areGraphsEnabled()
{
    var settings = Alloy.createCollection('AppSettings').settings();

    return settings.areGraphsEnabled();
}

exports.update = function (processedReportCollection, accountModel) 
{
    if (!areGraphsEnabled()) {
        $.index.height = 0;
        $.index.hide();
        $.destroy();
        // TODO remove from parent?
        return;
    }

    imageGraphUrl = processedReportCollection.getImageGraphUrl();
    reportName    = processedReportCollection.getReportName();
    reportDate    = processedReportCollection.getReportDate();
    imageGraphEvolutionUrl = processedReportCollection.getEvolutionImageGraphUrl();

    imageGraphUrl = completeGraphUrl(imageGraphUrl, processedReportCollection, accountModel);
    imageGraphEvolutionUrl = completeGraphUrl(imageGraphEvolutionUrl, processedReportCollection, accountModel);

    var graphSwitcher = Alloy.createController('graph_switcher', getGraphOptions());

    if (!graphSwitcher.currentGraphUrl()) {
        // no image to display

        $.index.hide();
        return;
    }

    $.index.show();

    if (graphSwitcher.canSwitch()) {
        addGraphSwitcher(graphSwitcher);
    }

    updateImage(graphSwitcher.currentGraphUrl());

    if (OS_IOS) {
        // we need to wait till view is visible otherwise animation will never be executed.
        $.image.getView().addEventListener('load', animateFadeOutDetailIcon);
    } else {
        animateFadeOutDetailIcon();
    }
    
    $.image.getView().addEventListener('click', toggleDetailIcon)
}