// Alerts when a captcha is encountered by playing a sound and changing the browser tab title into a marquee

$(document).ready(function () {
    if (localStorage && localStorage.getItem('AMTTools.captchaAlert') > 0) {
        console.log('AMT Tools Captcha Alert loaded');

        var alertInterval = parseInt(localStorage.getItem('AMTTools.captchaAlertValue'));

        if (alertInterval < 1) {
            alertInterval = 5;
            localStorage.setItem('AMTTools.captchaAlertValue', alertInterval.toString());
        }

        if ($('input[name="userCaptchaResponse"]').length > 0) {
            var alertText = " - CAPTCHA ALERT!";

            function titleMarquee() {
                alertText = alertText.substring(1, alertText.length) + alertText.substring(0, 1);
                document.title = alertText;
                setTimeout(titleMarquee, 100);
            }
            titleMarquee();

            var audio = document.createElement('audio');
            document.body.appendChild(audio);
            audio.src = 'data:audio/ogg;base64,T2dnUwACAAAAAAAAAAB8mpoRAAAAAFLKt9gBHgF2b3JiaXMAAAAAARErAAAAAAAAkGUAAAAAAACZAU9nZ1MAAAAAAAAAAAAAfJqaEQEAAACHYsq6Cy3///////////+1A3ZvcmJpcx0AAABYaXBoLk9yZyBsaWJWb3JiaXMgSSAyMDA1MDMwNAAAAAABBXZvcmJpcxJCQ1YBAAABAAxSFCElGVNKYwiVUlIpBR1jUFtHHWPUOUYhZBBTiEkZpXtPKpVYSsgRUlgpRR1TTFNJlVKWKUUdYxRTSCFT1jFloXMUS4ZJCSVsTa50FkvomWOWMUYdY85aSp1j1jFFHWNSUkmhcxg6ZiVkFDpGxehifDA6laJCKL7H3lLpLYWKW4q91xpT6y2EGEtpwQhhc+211dxKasUYY4wxxsXiUyiC0JBVAAABAABABAFCQ1YBAAoAAMJQDEVRgNCQVQBABgCAABRFcRTHcRxHkiTLAkJDVgEAQAAAAgAAKI7hKJIjSZJkWZZlWZameZaouaov+64u667t6roOhIasBADIAAAYhiGH3knMkFOQSSYpVcw5CKH1DjnlFGTSUsaYYoxRzpBTDDEFMYbQKYUQ1E45pQwiCENInWTOIEs96OBi5zgQGrIiAIgCAACMQYwhxpBzDEoGIXKOScggRM45KZ2UTEoorbSWSQktldYi55yUTkompbQWUsuklNZCKwUAAAQ4AAAEWAiFhqwIAKIAABCDkFJIKcSUYk4xh5RSjinHkFLMOcWYcowx6CBUzDHIHIRIKcUYc0455iBkDCrmHIQMMgEAAAEOAAABFkKhISsCgDgBAIMkaZqlaaJoaZooeqaoqqIoqqrleabpmaaqeqKpqqaquq6pqq5seZ5peqaoqp4pqqqpqq5rqqrriqpqy6ar2rbpqrbsyrJuu7Ks256qyrapurJuqq5tu7Js664s27rkearqmabreqbpuqrr2rLqurLtmabriqor26bryrLryratyrKua6bpuqKr2q6purLtyq5tu7Ks+6br6rbqyrquyrLu27au+7KtC7vourauyq6uq7Ks67It67Zs20LJ81TVM03X9UzTdVXXtW3VdW1bM03XNV1XlkXVdWXVlXVddWVb90zTdU1XlWXTVWVZlWXddmVXl0XXtW1Vln1ddWVfl23d92VZ133TdXVblWXbV2VZ92Vd94VZt33dU1VbN11X103X1X1b131htm3fF11X11XZ1oVVlnXf1n1lmHWdMLqurqu27OuqLOu+ruvGMOu6MKy6bfyurQvDq+vGseu+rty+j2rbvvDqtjG8um4cu7Abv+37xrGpqm2brqvrpivrumzrvm/runGMrqvrqiz7uurKvm/ruvDrvi8Mo+vquirLurDasq/Lui4Mu64bw2rbwu7aunDMsi4Mt+8rx68LQ9W2heHVdaOr28ZvC8PSN3a+AACAAQcAgAATykChISsCgDgBAAYhCBVjECrGIIQQUgohpFQxBiFjDkrGHJQQSkkhlNIqxiBkjknIHJMQSmiplNBKKKWlUEpLoZTWUmotptRaDKG0FEpprZTSWmopttRSbBVjEDLnpGSOSSiltFZKaSlzTErGoKQOQiqlpNJKSa1lzknJoKPSOUippNJSSam1UEproZTWSkqxpdJKba3FGkppLaTSWkmptdRSba21WiPGIGSMQcmck1JKSamU0lrmnJQOOiqZg5JKKamVklKsmJPSQSglg4xKSaW1kkoroZTWSkqxhVJaa63VmFJLNZSSWkmpxVBKa621GlMrNYVQUgultBZKaa21VmtqLbZQQmuhpBZLKjG1FmNtrcUYSmmtpBJbKanFFluNrbVYU0s1lpJibK3V2EotOdZaa0ot1tJSjK21mFtMucVYaw0ltBZKaa2U0lpKrcXWWq2hlNZKKrGVklpsrdXYWow1lNJiKSm1kEpsrbVYW2w1ppZibLHVWFKLMcZYc0u11ZRai621WEsrNcYYa2415VIAAMCAAwBAgAlloNCQlQBAFAAAYAxjjEFoFHLMOSmNUs45JyVzDkIIKWXOQQghpc45CKW01DkHoZSUQikppRRbKCWl1losAACgwAEAIMAGTYnFAQoNWQkARAEAIMYoxRiExiClGIPQGKMUYxAqpRhzDkKlFGPOQcgYc85BKRljzkEnJYQQQimlhBBCKKWUAgAAChwAAAJs0JRYHKDQkBUBQBQAAGAMYgwxhiB0UjopEYRMSielkRJaCylllkqKJcbMWomtxNhICa2F1jJrJcbSYkatxFhiKgAA7MABAOzAQig0ZCUAkAcAQBijFGPOOWcQYsw5CCE0CDHmHIQQKsaccw5CCBVjzjkHIYTOOecghBBC55xzEEIIoYMQQgillNJBCCGEUkrpIIQQQimldBBCCKGUUgoAACpwAAAIsFFkc4KRoEJDVgIAeQAAgDFKOSclpUYpxiCkFFujFGMQUmqtYgxCSq3FWDEGIaXWYuwgpNRajLV2EFJqLcZaQ0qtxVhrziGl1mKsNdfUWoy15tx7ai3GWnPOuQAA3AUHALADG0U2JxgJKjRkJQCQBwBAIKQUY4w5h5RijDHnnENKMcaYc84pxhhzzjnnFGOMOeecc4wx55xzzjnGmHPOOeecc84556CDkDnnnHPQQeicc845CCF0zjnnHIQQCgAAKnAAAAiwUWRzgpGgQkNWAgDhAACAMZRSSimllFJKqKOUUkoppZRSAiGllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimllFJKKaWUUkoppZRSSimVUkoppZRSSimllFJKKaUAIN8KBwD/BxtnWEk6KxwNLjRkJQAQDgAAGMMYhIw5JyWlhjEIpXROSkklNYxBKKVzElJKKYPQWmqlpNJSShmElGILIZWUWgqltFZrKam1lFIoKcUaS0qppdYy5ySkklpLrbaYOQelpNZaaq3FEEJKsbXWUmuxdVJSSa211lptLaSUWmstxtZibCWlllprqcXWWkyptRZbSy3G1mJLrcXYYosxxhoLAOBucACASLBxhpWks8LR4EJDVgIAIQEABDJKOeecgxBCCCFSijHnoIMQQgghREox5pyDEEIIIYSMMecghBBCCKGUkDHmHIQQQgghhFI65yCEUEoJpZRSSucchBBCCKWUUkoJIYQQQiillFJKKSGEEEoppZRSSiklhBBCKKWUUkoppYQQQiillFJKKaWUEEIopZRSSimllBJCCKGUUkoppZRSQgillFJKKaWUUkooIYRSSimllFJKCSWUUkoppZRSSikhlFJKKaWUUkoppQAAgAMHAIAAI+gko8oibDThwgMQAAAAAgACTACBAYKCUQgChBEIAAAAAAAIAPgAAEgKgIiIaOYMDhASFBYYGhweICIkAAAAAAAAAAAAAAAABE9nZ1MABAgkAAAAAAAAfJqaEQIAAAB89IOyJjhEQUNNRE5TRENHS0xTRllHSEpISUdORk1GSEdISUNHP0ZHS1IhquPYHv5OAgC/7wFATp2pUBdX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';
            audio.volume = 1;

            function playCaptchaAlert() {
                audio.play();
                setTimeout(playCaptchaAlert, alertInterval * 1000);
            }
            playCaptchaAlert();
        }
    }
});