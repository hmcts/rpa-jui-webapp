Feature: View Case Summary Page

    Background:
        Given I navigate to JUI
        And I login


    Scenario: I can see the summary page
        And I click "first-case|case-reference-link"
        And I wait 1 second
        Then I should expect the url to "match" "(.+)/viewcase/(.+)/summary"


        Scenario: I can see case number details




            Scenario: I can see case panel member details



