Feature: Questions

    Background:
        Given I navigate to JUI
        Then I am logged in as a Judge
        When I select a case reference
        Then I will be redirected to the Case Summary page for that case
        Then I navigate to "Questions"
        Then I am on the questions screen


    Scenario: Verify when 'No cases are asked'
        Then I should see a message saying "You haven’t asked any questions."
        And I should see 'Add questions' button


    Scenario: Verify When "questions already asked"
        Then I should see 'Send questions' button
        And I should see a message saying " "


    @RIUI_712
    Scenario: Add a question
        Then I click on Add question
        And I will be redirected to the create questions page
        Then I should see header as "Create questions"
        Then I should see 'Save questions' button
        And I am taken to the 'questions to appellant' screen where 'question added' is displayed









        #Given I am on the create question screen (screenshot 1)











