# Cinema Tickets Javascript technical test

This is the readme for the cinema tickets javascript technical test for;

Campaign number : 406891

Candidate number : 14546039

# Test Rules
- There are 3 types of tickets i.e. Infant, Child, and Adult.
- The ticket prices are based on the type of ticket (see table below).
- The ticket purchaser declares how many and what type of tickets they want to buy.
- Multiple tickets can be purchased at any given time.
- Only a maximum of 25 tickets that can be purchased at a time.
- Infants do not pay for a ticket and are not allocated a seat. They will be sitting on an Adult's lap.
- Child and Infant tickets cannot be purchased without purchasing an Adult ticket.

|   Ticket Type    |     Price   |
| ---------------- | ----------- |
|    INFANT        |    £0       |
|    CHILD         |    £15     |
|    ADULT         |    £25      |

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Run Cinema Tickets Javascript](#run-cinema-tickets-javascript)
- [Test Suite](#test-suite)
- [Linting](#linting)
- [Notes](#notes)

## Pre-requisites

```shell
cd /cinema-tickets-javascript

npm install
```

## Run Cinema Tickets Javascript

```shell
npm start
```
To run this technical test with custom inputs, navigate to the run.js file.

- To add a custom account ID change the value on line 14
- To add custom ticket requests change lines 15 to 17


## Test Suite

This technical test was completed using TDD. The testing framework Jest was used to write all of the tests and 100% of the code has test coverage. 

```shell
npm test
```

## Linting

Linting can be done with eslint. I have dome this to improve code quality and enforce consistent coding styles.

```shell
npm run lint
```

## Notes

- The ticket prices and max number of seats are declared as a constant but in a production environment they would likely be read from a configuration file or database.

- The ticket validation service has been built with reusability in mind, so can accept any maximum number of seats value as an input.

- The price calculator has been built with reusability in mind, so can accept any ticket prices as an input. Even though it is specified that the infants ticket is zero pounds.

- In production, every logged entry would contain a hashed version of the account ID in order to make it easier to search for the log entries for a specific user journey.

