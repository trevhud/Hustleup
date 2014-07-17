// Linkifies submitted, approved, rejected and pending HITs.

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.HITStatusLinks') > 0) {
        console.log('AMT Tools HIT Status Links loaded');

        $('#user_activities\\.date_column_header\\.tooltip, .statusDateColumnHeader').parent().parent().children('tr.even, tr.odd').each(function () {
            var td = 1;
            var dateLink = '';
            var submittedCount = 0;
            var approvedCount = 0;
            $(this).children('td').each(function () {
                if ($(this).children('a').attr('href')) {
                    dateLink = ($(this).children('a').attr('href'));
                }
                if (td != 1 && td != 6) {
                    var tdText = $(this).text().trim();
                    var sortLink = '';

                    switch (td) {
                        case 2:
                            submittedCount = parseInt(tdText);
                            break;
                        case 3:
                            approvedCount = parseInt(tdText);
                            sortLink = '&sortType=Approved';
                            if (submittedCount == approvedCount) {
                                sortLink = '&sortType=Paid';
                            }
                            break;
                        case 4:
                            sortLink = '&sortType=Rejected';
                            break;
                        case 5:
                            sortLink = '&sortType=Pending';
                            break;
                    }

                    if (parseInt(tdText) > 0) {
                        $(this).text('').append('<a href="' + dateLink + sortLink + '" target="_blank">' + tdText + '</a>');
                    }
                }
                td++;
            });
        });
    }
});