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

## Pre-requisites

```shell
cd /cinema-tickets-javascript

npm install
```

## Run Cinema Tickets Javascript

```shell
npm start
```

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