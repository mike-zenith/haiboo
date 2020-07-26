HaiBoO - POC
===

This repository started as a proof of concept that you can develop
a working frontend and backend from an api blueprint/contract in about 8hrs.

The main _(modified)_ requirements:
- pre-defined sample api response received previously
- REST
- client and server separated
- do not generate "crud" logic
- database manager is not needed (at first phase at least)
- has to support all operations on UI
- react frontend
- node.js backend
- driven by tests (any test first approach)

## Known issues, limitations

**The project is not finished. Read more about it in [Story](#story)**

**It is only tested in development mode, go to [Setup](#setup) for more details**  

You can check the progress and working functions in tests.
Missing functionalities are commented in the code, among with a 
few pitfalls.

## Setup

It only works locally, there were no attempts to test it in the browser 
or anywhere else outside of running tests.

Docker is only used in development, there are no pre-built containers. 

```
# pull up containers
$ docker-compose up -d
Starting haiboo_backend_1  ... done
Starting haiboo_frontend_1 ... done

$ docker-compose exec backend sh
/app/backend $ npm install
..
/app/backend $ npm run test
..
/app/backend $ exit

$ docker-compose exec frontend sh
/app/frontend $ yarn install
..
/app/frontend $ npm run test
..
/app/frontend $ exit
```

## Story

When I received a task to build a working backend and frontend around 
a sample json response in about 8hrs,
I thought its gonna be an easy ride as I could start off with an `API blueprint first`
approach and basically generate code and API schema test based on an OAPI 3 document.

I have done this a lot but the deadline was closer than usual, I have decided to time-box everything
and split into phases. 

### The *first box* is the planning, roughly 1hr spent
- Check what OAPI tools are available
    - Backend request validator (`openapi-validator-middleware`)
    - Backend api tester (`dredd` for schema, `cucumber` for domain)
    - There are backend factories and crud factories based on
    templates but I have decided not to use them. CRUD operations form a thin client,
    no need to generate anything as it might add unnecessary complexity or would completely negate the
    backend part of the challenge.
    - Frontend api client generator (`react-openapi-client` and tools around it). 
    These were not used, as the client is simple but its great to have existing fallback tools.
    - I could generate fake responses using `prism` and `x-fake` extension, integration and system tests couldve been fine
- Check what generators, scaffolding tools are available    
    - React scaffolding (`create-react-app`)
- Should I use typescript and linters
    - Due to the strictness of an OAPI doc and the thin backend layer, I have decided to skip using both.
    These tools can be pulled in whenever needed.
    - `Cucumber.js`' world (state) handling is ugly and it doesnt like typescript. Did not want to have false-security of
    type safety with user-generated, casted objects.
- Which test first approach would make sense? Having contract and blueprint first enabled easy access from infra layer.
    - Backend: sticking to `Cucumber.js` and `story bdd` seemed like a good idea as I already had _"industry-proven"_,
    opinionated toolchain to make sure my code fulfils the contract. 
    Model layer seemed thin as database was not needed and the requirements only contained simple CRUD 
    operations with validation, having unit-tests as first class citizens did not make sense. 
    _Pre-validated (oapi middleware) simple POJO models passed from thin actions to a repository. Basically everything
    is going through 3rd party, tested libraries while the domain only contains validation._        
    - Frontend: I wanted to leave styling to the end and focus on interaction and expected outcome. I wanted to
    make something fast and refactor later. I was thinking about doing bottom-top / inside-out tdd in React+jest and
    just fake everything til I make it but then I would have lost time by having non-visible features.
    The urge to have working features made me choose outside-in tdd.
- Find gotchas, known issues in the toolchain
    - `dredd.js`: oapi 3 is only experimental
    - `Cucumber.js`: state handling in scenarios with flexible steps did not sound easy, I had to implement my own
    solution (`memorize` and transform, `retrieve`). Took less time than figuring out other tools.
- Pull up simple `docker-compose` to start dev process separately from other projects
- Figure out how to make sure I dont skip an important feature (`@todo`) 

### The *2nd box* was about backend dev, about 3hrs spent
I was focusing on happy path first. I finished the main features with story bdd.
As every `production` in the sample json had `uuidv4` id that could be generated on client side, 
I have decided to skip the simple `POST` call that is generally  
used to create a new entity. Having exposed endpoint that checks the existence of an entity with id, the functionality
of a `POST` request did not seem important. 
Clients could call `PUT /{collection}/{id}` to create a new resource and the same endpoint could be used to
update one, just had to make sure I am using proper status codes to indicate the state of the operation. 

### The *3rd box* should have been longer, 4hrs spent on frontend
I thought it is going to be straightforward but I had lot of issues with npm and yarn due to locking mechanism and
symlinks. Sadly I had to reinstall every dependency more than 5 times using different flags, directories and find other 
libraries because the install process was halted. I lost about an hour on installing
necessary dependencies and was forced to skip react openapi client that could have made everything a lot easier.

I knew I won't be able to finish so I said goodbye to Redux. It is unnecessary for this project but would have been
easier to handle errors and api calls on that layer. I made an application local state and passed around handlers
and finished the basic calls.

I have spent about half an hour on an issue with React testing library (see comment in the code). Scaffolding tool installed it
automatically and I made a stupid decision to stick with it instead of using manually installed, separated, known version of
jest's react and dom specific tools.

When the time was up, I dropped my pen and started writing this documentation.

#### Outcome

Non-functioning POC / challange that lacks basic features and is not working in the browser. At least I had fun, right?

 

  

    
     
     



