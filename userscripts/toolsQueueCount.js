// Displays the current queue count above the HIT area.

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.queueCount') > 0) {
        console.log('AMT Tools Queue Count loaded');

        var myHITsURL = 'https://www.mturk.com/mturk/myhits';
        var queueCount = '';
        var HITsRemainingStr = ' HITs remaining';

        $.ajax({
            async: false,
            type: 'GET',
            url: myHITsURL,
            success: function (data) {
                queueCount = $('.title_orange_text', $(data)).text().trim();
            }
        });

        if (queueCount.length) {
            queueCount = queueCount.split(' of ')[1];
            queueCount = queueCount.split(' ')[0];

            if (parseInt(queueCount) == 1) {
                HITsRemainingStr = ' HIT remaining';
            }
        } else {
            HITsRemainingStr = 'Your queue is empty';
        }

        var queueCountStr = queueCount + HITsRemainingStr;

        $('#theTime').parent().parent().parent().append('<tr><td align="left" valign="top" class="title_orange_text" nowrap="" style="padding-top: 3px; padding-left: 5px;"><b>Queue:</b> <span>' + queueCountStr + '</span></td></tr>');
    }
});
