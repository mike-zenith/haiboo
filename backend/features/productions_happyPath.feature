Feature: Production features, happy path

  Scenario: Adding a production makes it listable
    Given I want to memorize a production "valid"
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
    And I create a production from memorized "valid"
    When I list productions
    Then I should see "valid" in the response

  Scenario: Lists multiple productions
    Given I want to memorize a production "p1"
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
    And I want to memorize a production "p2"
      |Abstract|A1|
      |AgeRating|18|
      |AvailabilityFromUtcIso|2018-10-26T07:00:00Z|
      |BackgroundUrl|https://placekitten.com/200/300|
      |Cast|De|
      |Category|S|
      |Director|C|
      |EditedAbstract|A.|
      |Genre|dráma|
      |Id|0222d030-f16f-424b-afae-888a6172b69f|
      |Name|LeTest|
      |ProductionYear|2020|
      |:transform|AgeRating:Number;ProductionYear:Number|
    And I create a production from memorized "p1"
    And I create a production from memorized "p2"
    When I list productions
    Then I should see "p1" in the response
    Then I should see "p2" in the response

  Scenario: Retrieves the information of one production by id
    Given I want to memorize a production "p1"
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
    And I want to memorize a production "p2"
      |Abstract|A1|
      |AgeRating|18|
      |AvailabilityFromUtcIso|2018-10-26T07:00:00Z|
      |BackgroundUrl|https://placekitten.com/200/300|
      |Cast|De|
      |Category|S|
      |Director|C|
      |EditedAbstract|A.|
      |Genre|dráma|
      |Id|0222d030-f16f-424b-afae-888a6172b69f|
      |Name|LeTest|
      |ProductionYear|2020|
      |:transform|AgeRating:Number;ProductionYear:Number|
    And I create a production from memorized "p1"
    And I create a production from memorized "p2"
    When I get production by id of "0222d030-f16f-424b-afae-888a6172b69f"
    Then I should see "p2" as the only item in the response

  Scenario: Deletes a production by id
    Given I want to memorize a production "p1"
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
    And I want to memorize a production "p2"
      |Abstract|A1|
      |AgeRating|18|
      |AvailabilityFromUtcIso|2018-10-26T07:00:00Z|
      |BackgroundUrl|https://placekitten.com/200/300|
      |Cast|De|
      |Category|S|
      |Director|C|
      |EditedAbstract|A.|
      |Genre|dráma|
      |Id|0222d030-f16f-424b-afae-888a6172b69f|
      |Name|LeTest|
      |ProductionYear|2020|
      |:transform|AgeRating:Number;ProductionYear:Number|
    And I create a production from memorized "p1"
    And I create a production from memorized "p2"
    And I delete production "d8fad5bd-716d-9f55-0f0d-cd6f71864c5b"
    When I list productions
    Then There should be only one production in the list, "p2"

  Scenario: Partial update a production
    Given I want to memorize a production "p1"
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
    And I create a production from memorized "p1"
    And I partially update "d8fad5bd-716d-9f55-0f0d-cd6f71864c5b"
      |BackgroundUrl|https://placekitten.com/200/300|
      |Genre|romantikus|
      |ProductionYear|2019|
      |:transform|ProductionYear:Number|
    When I get production by id of "d8fad5bd-716d-9f55-0f0d-cd6f71864c5b"
    Then I should see the following as the only item in the response
      |Abstract|A széria a világsikert arató Vámpírnaplók és A sötétség kora című vámpíros sorozatok folytatását meséli el, egy új természetfölötti képességekkel rendelkező generáció történetét, a középpontban Klaus Mikkelson 17 éves lányával, Hope-pal.|
      |AgeRating|15|
      |AvailabilityFromUtcIso|2018-10-26T07:00:00Z|
      |BackgroundUrl|https://placekitten.com/200/300|
      |Cast|Danielle Rose Russell, Matthew Davis, Jenny Boyd, Kaylee Bryant, Quincy Fouse|
      |Category|SERIES|
      |Director|Chris Grismer|
      |EditedAbstract|A széria a világsikert arató Vámpírnaplók és A sötétség kora című vámpíros sorozatok folytatását meséli el, egy új természetfölötti képességekkel rendelkező generáció történetét, a középpontban Klaus Mikkelson 17 éves lányával, Hope-pal.|
      |Genre|romantikus|
      |Id|d8fad5bd-716d-9f55-0f0d-cd6f71864c5b|
      |Name|Legacies - A sötétség öröksége|
      |ProductionYear|2019|
      |:transform|AgeRating:Number;ProductionYear:Number|
