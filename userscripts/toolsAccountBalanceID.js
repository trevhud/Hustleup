// Places the MTurk ID in the top right corner of common survey websites and account balance on MTurk

$(document).ready(function () {
    if (!(/https?:\/\/www.mturk.com\/mturk\/*/.test(window.location.href))) {
        var workerID = getWorkerID();

        if (workerID) {
            var headerDivStylePos = 'position: fixed; ';
            var workerIDStyle = 'style="padding: 0; width: 120px; background: none; border: none; outline: 0; text-align: right; color: #cc6600; font-family: verdana, arial, sans-serif; font-size: 11px; font-weight: bold; cursor: default;"';
            var workerIDMouseEvents = 'onmouseover="javascript: this.focus(); this.select() ;" onmouseout="javascript: this.blur();"';
            var headerDivStyle = 'style="' + headerDivStylePos + 'z-index: 10000; top: 25px; right: 0; margin: 0 2px; padding: 1px 3px; border: none; border-radius: 1px; background: #fff; width: auto; font-family: verdana, arial, sans-serif; font-size: 11px; text-align: right;"';
            var headerDiv = '<div ' + headerDivStyle + '>MTurk ID: <input type="text" ' + workerIDStyle + ' ' + workerIDMouseEvents + ' value="' + workerID + '"></div>';

            $(document).children().first().append(headerDiv);
        }
    } else if (localStorage && localStorage.getItem('AMTTools.accountBalanceID') > 0) {
        console.log('AMT Tools Account Balance and ID loaded');

        var accountSettingsURL = 'https://www.mturk.com/mturk/youraccount';
        var workerID = getWorkerID();
        var accountBalance;

        if (/https?:\/\/www.mturk.com\/mturk\/*/.test(window.location.href)) {
            $.ajax({
                async: false,
                type: 'GET',
                url: accountSettingsURL,
                success: function (data) {
                    accountBalance = $('#account_balance', $(data)).text().trim();
                }
            });
        }

        if (workerID) {
            var headerDivStylePos = 'position: fixed; ';
            var workerIDStyle = 'style="padding: 0; width: 120px; background: none; border: none; outline: 0; text-align: right; color: #cc6600; font-family: verdana, arial, sans-serif; font-size: 11px; font-weight: bold; cursor: default;"';
            var workerIDMouseEvents = 'onmouseover="javascript: this.focus(); this.select() ;" onmouseout="javascript: this.blur();"';
            var accountBalanceSpan = '';

            if (/https?:\/\/www.mturk.com\/mturk\/*/.test(window.location.href) && accountBalance) {
                var accountBalanceStyle = 'style="margin-right: 10px; font-weight: bold;"';
                headerDivStylePos = 'position: absolute; ';
                accountBalanceSpan = '<span>Account balance: <span ' + accountBalanceStyle + '>' + accountBalance + '</span></span> ';
            }

            var headerDivStyle = 'style="' + headerDivStylePos + 'z-index: 10000; top: 25px; right: 0; margin: 0 2px; padding: 1px 3px; border: none; border-radius: 1px; background: #fff; width: auto; font-family: verdana, arial, sans-serif; font-size: 11px; text-align: right;"';
            var headerDiv = '<div ' + headerDivStyle + '>' + accountBalanceSpan + 'MTurk ID: <input type="text" ' + workerIDStyle + ' ' + workerIDMouseEvents + ' value="' + workerID + '"></div>';

            $(document).children().first().append(headerDiv);
        }
    }
});