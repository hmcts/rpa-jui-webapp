'use strict';

var signInPage = require('../../pages/signInPage');
var dashBoardPage = require('../../pages/dashBoardPage');
var caseSummaryPage = require('../../pages/caseSummaryPage');
var {defineSupportCode} = require('cucumber');
const config = require('../../../config/conf.js');

const EC = protractor.ExpectedConditions;

defineSupportCode(function ({Given, When, Then}) {


    Then (/^I am on the questions screen$/, async function () {


    });



    Then (/^I should see a message saying (.*)$/, async function () {


    });


    And (/^I should see 'Add questions' button$/, async function () {


    });


    Then (/^I should see 'Send questions' button$/, async function () {


    });



    Then (/^I click on Add question$/, async function () {

    });


    And (/^I will be redirected to the create questions page$/, async function () {

    });

    Then (/^I should see header as "Create questions"$/, async function () {

    });

    Then (/^I should see 'Save questions' button$/, async function () {

    });

    And (/^I am taken to the 'questions to appellant' screen where 'question added' is displayed$/, async function () {

    });


});
