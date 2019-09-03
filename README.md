1. Software requirements
    - docker, 
    - java (at least v1.8).

2. Prerequisities:
    - run ladybug-0.0.1-SNAPSHOT.jar

3. Run test in docker container:
    - open terminal,
    - update docker if new version available
    (docker-machine upgrade),
    - go to the localisation where Dockerfile is stored,
    - execute "docker-compose up" to build 
    containers end run tests,
    - remove all containers after execution
    (docker system prune).

4. Test scenarios:
    - login as client and order new item (create_orders.js),
    - login as employee and accept order (accept_orders.js).

5. Performance expectations base:
    5.1 Pages response times:
        - responses under 1 seconds are treated as good(*1),
        - if response time above 1,5 seconds the webiste is less ranked by Google.

    5.2 Virtual users:
        - Amazon noticed around 400 sales per second in 2015 (*2),
        - Amazon noticed around 600 sales in 2016,
        - 1000 sales are assumed for peak scenario (1 iteration).

    5.3 Duration time:
        - 1 iteration as peak load 
        - 10 seconds as simulation of load hours,
        - 5 minutes (as 24 hours substitution) 

6. Base test scenarios:
    6.1 400 virtual users 10 seconds
    6.2 1000 virtual users for one iteration

Depending on results next tests scenario will be performed to find borders for stability and reliability of service.

7. Create orders test scenario results:
    7.1 1000 vus, 1 iteration -> 100% valid response time.
        10000 vus, 1 iteration -> cannot perform test properly (hardware limitations).

    7.2 400 vus, 10 seconds -> valid response time for less than 5% requests.

    7.3 50 vus, 5 minutes -> 99% valid response time
        200 vus, 5 minutes -> valid post requests response time, get requests response time above expectations,
        300 vus, 5 mintues -> less than 5% valid response time

8. Accept orders test scenario results:
    8.1 1000 vus, 1 iteration -> 100% valid response time.
        10000 vus, 1 iteration -> cannot perform test properly (hardware limitations).

    8.2 400 vus, 10 seconds -> valid post requests response time, get requests response time above expectations,
    8.3 50 vus, 5 minutes -> 99% valid response time

9. Observations: 
    - maximum load depends on hardware limitations for testing environment. 
    - SUT shouldn't share the same resources with device performing test data (generating traffic, etc.)
    - each iteration worse results (hardware requires cooling down)

10. Sources:
1) https://octoperf.com/blog/2015/06/17/response-time-e-commerce/
2) https://www.inc.com/tom-popomaronis/amazon-just-eclipsed-records-selling-over-600-items-per-second.html