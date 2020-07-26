Feature: Production errors, negative responses

  Scenario Outline: Creating production with missing required field <field>
    Given I want to memorize a production "invalid"
      |Abstract|A széria a világsikert arató Vámpírnaplók és A sötétség kora című vámpíros sorozatok folytatását meséli el, egy új természetfölötti képességekkel rendelkező generáció történetét, a középpontban Klaus Mikkelson 17 éves lányával, Hope-pal.|
      |AgeRating|15|
      |AvailabilityFromUtcIso|2018-10-26T07:00:00Z|
      |BackgroundUrl|https://cdn.hbogo.eu/images/4701180F-B3F5-477C-9C78-97D9830A10FD/1080_608.jpg|
      |Cast|Danielle Rose Russell, Matthew Davis, Jenny Boyd, Kaylee Bryant, Quincy Fouse|
      |Category|SERIES|
      |Director|Chris Grismer|
      |EditedAbstract|A széria a világsikert arató Vámpírnaplók és A sötétség kora című vámpíros sorozatok folytatását meséli el, egy új természetfölötti képességekkel rendelkező generáció történetét, a középpontban Klaus Mikkelson 17 éves lányával, Hope-pal.|
      |Genre|dráma|
      |Id|d8fad5bd-716d-9f55-0f0d-cd6f71864c5b|
      |Name|Legacies - A sötétség öröksége|
      |ProductionYear|2018|
      |:transform|AgeRating:Number;ProductionYear:Number|
    And I remove field "<field>" from "invalid"
    When I create a production from memorized "invalid"
    Then I should see a bad request error with message "should have required property '<field>'"

  Examples:
    | field                   |
    | Abstract                |
    | Genre                   |
    | AgeRating               |
    | AvailabilityFromUtcIso  |
    | BackgroundUrl           |
    | Cast                    |
    | Category                |
    | Director                |
    | EditedAbstract          |
    | Genre                   |
    | Name                    |
    | ProductionYear          |

  Scenario Outline: Creating production with invalid field <field>
    Given I want to memorize a production "invalid"
      |Abstract|A széria a világsikert arató Vámpírnaplók és A sötétség kora című vámpíros sorozatok folytatását meséli el, egy új természetfölötti képességekkel rendelkező generáció történetét, a középpontban Klaus Mikkelson 17 éves lányával, Hope-pal.|
      |AgeRating|15|
      |AvailabilityFromUtcIso|2018-10-26T07:00:00Z|
      |BackgroundUrl|https://cdn.hbogo.eu/images/4701180F-B3F5-477C-9C78-97D9830A10FD/1080_608.jpg|
      |Cast|Danielle Rose Russell, Matthew Davis, Jenny Boyd, Kaylee Bryant, Quincy Fouse|
      |Category|SERIES|
      |Director|Chris Grismer|
      |EditedAbstract|A széria a világsikert arató Vámpírnaplók és A sötétség kora című vámpíros sorozatok folytatását meséli el, egy új természetfölötti képességekkel rendelkező generáció történetét, a középpontban Klaus Mikkelson 17 éves lányával, Hope-pal.|
      |Genre|dráma|
      |Id|d8fad5bd-716d-9f55-0f0d-cd6f71864c5b|
      |Name|Legacies - A sötétség öröksége|
      |ProductionYear|2018|
      |:transform|AgeRating:Number;ProductionYear:Number|
    And I update field "<field>" to "<value>" in "invalid"
    When I create a production from memorized "invalid"
    Then I should see a bad request error with message "<message>"

    Examples:
      | field         | value | message                                      |
      | Id            | 123   | should match format \"uuid\"                 |
      | Category      | TV    | should be equal to one of the allowed values |
      | BackgroundUrl | about | should match format \"uri\"                  |

    Scenario Outline: Referring to a non-existent production should return 404
      When <retrieve>
      Then The response status should be 404

    Examples:
      | retrieve                                                         |
      | I get production by id of "d8fad5bd-716d-9f55-0f0d-cd6f71864c5b" |
      | I delete production "d8fad5bd-716d-9f55-0f0d-cd6f71864c5b"       |

    Scenario: Updating non-existent production
      When I partially update "d8fad5bd-716d-9f55-0f0d-cd6f71864c5b"
       | NotImportant | values |
      Then The response status should be 404

    # @todo update with invalid values
    # @todo check status codes
    # @todo use dredd
