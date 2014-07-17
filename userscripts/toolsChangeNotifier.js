// Notifies changes in approved HITs, bonuses, and total earnings.

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.changeNotifier') > 0) {
        console.log('AMT Tools Change Notifier loaded');

        var diffColor = '#999999';

        if (localStorage.getItem('AMTTools.previousApproved') && localStorage.getItem('AMTTools.previousBonuses') && localStorage.getItem('AMTTools.previousTotal')) {
            var diffApproved = getFloatFromSelector('#approved_hits_earnings_amount span.reward') - localStorage.getItem('AMTTools.previousApproved');
            var diffBonuses = getFloatFromSelector('#bonus_earnings_amount span.reward') - localStorage.getItem('AMTTools.previousBonuses');
            var diffTotal = getFloatFromSelector('#total_earnings_amount span.reward') - localStorage.getItem('AMTTools.previousTotal');

            if (diffApproved) {
                $('#approved_hits_earnings_amount').siblings().append('<span style="float: right; color: ' + diffColor + ';">+ $' + diffApproved.toFixed(2) + '</span>');
                localStorage.setItem('AMTTools.previousApproved', getFloatFromSelector('#approved_hits_earnings_amount span.reward'));
            }
            if (diffBonuses) {
                $('#bonus_earnings_amount').siblings().append('<span style="float: right; color: ' + diffColor + ';">+ $' + diffBonuses.toFixed(2) + '</span>');
                localStorage.setItem('AMTTools.previousBonuses', getFloatFromSelector('#bonus_earnings_amount span.reward'));
            }
            if (diffTotal) {
                $('#total_earnings_amount').siblings().append('<span style="float: right; color: ' + diffColor + ';">+ $' + diffTotal.toFixed(2) + '</span>');
                localStorage.setItem('AMTTools.previousTotal', getFloatFromSelector('#total_earnings_amount span.reward'));
            }
        }
        else if (!(localStorage.getItem('AMTTools.previousApproved') && localStorage.getItem('AMTTools.previousBonuses') && localStorage.getItem('AMTTools.previousTotal'))) {
            localStorage.setItem('AMTTools.previousApproved', getFloatFromSelector('#approved_hits_earnings_amount span.reward'));
            localStorage.setItem('AMTTools.previousBonuses', getFloatFromSelector('#bonus_earnings_amount span.reward'));
            localStorage.setItem('AMTTools.previousTotal', getFloatFromSelector('#total_earnings_amount span.reward'));
        }
    }
});