'use strict';

var signInPage = require('../../pages/signInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
var {defineSupportCode} = require('cucumber');
const config = require('../../../config/conf.js');

const EC = protractor.ExpectedConditions;

defineSupportCode(function ({Given, When, Then}) {


    Given(/^I navigate to JUI$/, async function () {
        // await browser.get(this.config.serverUrls[this.config.targetEnv]);
        await browser.get(config.config.baseUrl);
        await browser.driver.manage().deleteAllCookies();
        await browser.refresh();
    });

    Then(/^I am logged in as a Judge$/, async function () {
        await  signInPage.emailAddress.sendKeys(this.config.username); //replace username and password
        await signInPage.password.sendKeys(this.config.password);
        browser.sleep(10000);
        await signInPage.signinBtn.click();
    });

    When(/^I am on the dashboard page$/, async function () {
        await expect(dashBoardPage.dashboard_header.isDisplayed()).to.eventually.be.true;
    });


    When(/^one or more cases are displayed$/, async function () {
        await dashBoardPage.number_of_rows.count().then(function (count) {
            if (count > 0)
                dashBoardPage.case_number_links.isDisplayed();
            else
                console.log('no case reference links present', +count);
        });

    });


    When(/^all case numbers are hyperlinked$/, async function () {
        var text = dashBoardPage.case_number_links.first().getText().then(async function (text) {
            console.log(text);
        });

        var referenceNum = config.config.baseUrl + '/viewcase/' + text + '/summary';
        await expect(dashBoardPage.case_number_links.first().getAttribute('href')).equal(referenceNum);

    });


    When(/^I select a case reference$/, async function () {
        await dashBoardPage.case_number_links.last().click();
    });


    Then(/^I will be redirected to the Case Summary page for that case$/, async function () {
        await expect(caseSummaryPage.caseDetails_header_text.isDisplayed()).to.eventually.be.true;
    });
    


    Then(/^I will see date details for the list of cases displayed$/, async function () {
        // await expect(dashBoardPage.case_reference_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.parties_header.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.type_header.isDisplayed()).to.eventually.be.true.and;
        await expect(dashBoardPage.case_start_date.isDisplayed()).to.eventually.be.true;
        await expect(dashBoardPage.date_of_last_action.isDisplayed()).to.eventually.be.true;
    });

    When(/^I see Date of latest action by date ascending order$/, async function () {
        await dashBoardPage.last_action_dates.count().then(function (text) {
            console.log('Number of Cases: ' + text);
            if (text > 1) {
                dashBoardPage.last_action_dates.map(function (elm) {
                    return elm.getText().then(function (text) {
                        return (text);
                    });
                }).then(function (lastActionDates) {
                    var sortedLastActionDates = lastActionDates.sort(function (date1, date2) {
                        return date1 - date2;
                    });
                    expect(lastActionDates).equals(sortedLastActionDates);
                });
            }
        });
    });

});
