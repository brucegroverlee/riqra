# Backend Developer

The assignment is designed to check your coding and problem-solving skills. We suggest you spend a maximum of 4-5 hours on it.

Things we require your code to have:

[x] Domain model design (usage of DDD concepts: aggregates, value objects, domain services, etc)
[x] Messaging (Commands and Events)
[x] Code organization (modularity, dependencies between modules, etc)
[x] Exception handling and logging
[x] Writing and organizing tests
[x] Task-based asynchronous programming

No UI needed.

## Requirements

User catalog personalization.

#### Auth Module

[x] When the email exists and the password is incorrect the API must respond "Oops! wrong password".
[x] When the email exists and password is correct a new token is generated for further requests.
[x] When the email does not exist a new user is automatically created (auto signup) and a new token is generated for further requests.
[x] When a new user is created a welcome email is sent to its inbox.
[x] When a new user is registered a supplier is randomly assigned to its account.

#### Catalog Module

[] The user can search for a product using a term
[] The user can list all available products depending on its supplier.

catalog shape example:
```json
[
  {
    "name": "Iphone 11",
    "supplier": "Apple",
    "price": 10
  },
  {
    "name": "Iphone XS",
    "supplier": "Apple",
    "price": 9.5
  },
  {
    "name": "Iphone 11",
    "supplier": "Sprint",
    "price": 11
  },
  {
    "name": "Iphone 11",
    "supplier": "T-mobile",
    "price": 12
  },
  {
    "name": "Iphone 8",
    "supplier": "Apple",
    "price": 8
  },
  {
    "name": "Iphone 7",
    "supplier": "Apple",
    "price": 7
  }
]

```


## Deliverables

1. Use Rest to build the API.
1. Use the language you want.
1. Use any database as data store.
1. Use any cloud provider to deploy, make sure we can play with the API.
1. Setup a CI server to run your tests, we must be able to check all tests passing.