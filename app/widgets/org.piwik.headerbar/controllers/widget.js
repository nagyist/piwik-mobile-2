/**
 * Piwik - Open source web analytics
 *
 * @link http://piwik.org
 * @license http://www.gnu.org/licenses/gpl-3.0.html Gpl v3 or later
 */

var widthOfActionBarItem = 0;

function addActionBarItem(actionBarItem, index)
{
    if (!actionBarItem || !actionBarItem.icon) {
        return;
    }

    var item = Ti.UI.createImageView({
        image: actionBarItem.icon, 
        top: 0,
        width: '48dp',
        height: '48dp',
        left: 0,
        right: 0,
        backgroundSelectedColor: '#a9a9a9'
    });

    item.addEventListener('click', function (event) {
        event.cancelBubble = true;
        $.trigger('actionItem' + index);
    });

    $.actionButtons.add(item);
    widthOfActionBarItem += 48;
}

function setTitle(title)
{
    $.headerTitle.text = title || '';
}

function syncWidthOfTitleAndActionBar()
{
    $.headerTitle.right = widthOfActionBarItem + 'dp';
}

function setBackAngleImage(image)
{
    $.backangle.backgroundImage = image;
    $.backButton.backgroundSelectedColor = '#a9a9a9';
}

function enableBackButton() 
{
    setBackAngleImage('/images/back.png');

    $.backButton.addEventListener('click', function (event) {
        event.cancelBubble = true;
        $.trigger('back');
    });
}

function showNavigationDrawer()
{
    setBackAngleImage('/images/navigation_drawer.png');
}

function applyCustomProperties(args)
{
    if (args.actionItem1) {
        addActionBarItem(args.actionItem1, 1);
    }

    if (args.hasNavigation) {
        showNavigationDrawer();
    }

    if (args.canGoBack) {
        enableBackButton();
    }

    syncWidthOfTitleAndActionBar();
    setTitle(args.title);
}

applyCustomProperties(arguments[0] || {});

$.backButton.addEventListener('click',function (event) {
    event.cancelBubble = true;
    $.trigger('homeIconItemSelected');
});

exports.setTitle = setTitle;
exports.enableCanGoBack = enableBackButton;