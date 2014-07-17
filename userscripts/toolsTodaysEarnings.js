// Calculates today's earnings

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.todaysEarnings') > 0) {
        console.log('AMT Tools Today\'s Earnings loaded');

        var todaysDate = getTodaysDate();

        if (!localStorage.getItem('AMTTools.todaysDate')) {
            localStorage.setItem('AMTTools.todaysDate', todaysDate);
        } else if (todaysDate > localStorage.getItem('AMTTools.todaysDate')) {
            localStorage.setItem('AMTTools.todaysDate', todaysDate);
            localStorage.setItem('AMTTools.todaySubmittedValue', '0');
            localStorage.setItem('AMTTools.todaysEarningsValue', '0.0');
        }

        var todaysEarnings = (localStorage.getItem('AMTTools.todaysEarningsValue')) ? parseFloat(localStorage.getItem('AMTTools.todaysEarningsValue')) : 0.0;
        var todaySubmitted = $('a[href="/mturk/statusdetail?encodedDate=' + todaysDate + '"]').parent().next('td:first').text().trim();
        if (parseInt(todaySubmitted) > 0 && parseInt(todaySubmitted) > localStorage.getItem('AMTTools.todaySubmittedValue')) {
            localStorage.setItem('AMTTools.todaySubmittedValue', todaySubmitted);

            todaysEarnings = 0.0;

            var numberOfPages = Math.ceil(todaySubmitted / 25);

            var todaysURL = 'https://www.mturk.com/mturk/statusdetail?encodedDate=' + todaysDate;

            //$('body').append('<input hidden="true" id="amtToolsTodaysEarnings"/>');

            for (var p = 1; p <= numberOfPages; p++) {
                var todaysURLWithPages = todaysURL + '&pageNumber=' + p;

                $.ajax({
                    async: false,
                    type: 'GET',
                    url: todaysURLWithPages,
                    success: function (data) {
                        $('.reward', $(data)).each(function () {
                            todaysEarnings += getFloatFromDollar($(this).text().trim());
                        });
                    }
                });
            }

            localStorage.setItem('AMTTools.todaysEarningsValue', todaysEarnings.toFixed(2));
        }

        $('#total_earnings\\.title_column_header\\.tooltip').parent().parent().append('<tr class="even">' +
            '<td class="metrics-table-first-value">Today\'s Projected Earnings</td>' +
            '<td id="todays_earnings_amount"><span class="reward">$' + parseFloat(todaysEarnings).toFixed(2) + '</span></td>' +
            '</tr>');
    }
});