import http from "k6/http";
import {
    check,
    fail
} from "k6";


//// VARIABLES
const baseURL = "http://host.docker.internal:8080/";
const headers = {
    headers: {
        "Content-Type": "application/json"
    }
}


//// FUNCTIONS
/* Function used to login employee account*/
function loginEmployee() {
    const loginData = {
        "username": "employee",
        "password": "test"
    };
    const login = http.post(baseURL + "/login", loginData);
    check(login, {
        "Login status is 200": (r) => r.status === 200,
        "Login response time is lower than 1500 ms": (r) => r.timings.duration < 1500
    });
}

/* Function used to get ids from first page of ordered items*/
function getItems() {
    const getOrders = http.get(baseURL + "api/orders/?page=0&size=50");
    check(getOrders, {
        "Api order status is 200": (r) => r.status === 200,
        "Get orders response is lower than 1500 ms": (r) => r.timings.duration < 1500
    })
    const responseBody = JSON.parse(getOrders.body);
    const responseBodyArray = responseBody.content;
    return responseBodyArray.map(element => JSON.stringify(element.id));
}

/* Function used to modify data from first page of ordered items*/
function modifyOrder(order_id) {
    const idWithoutQuotes = order_id.slice(1, -1);
    const updateData = {
        "id": idWithoutQuotes,
        "items": [{
            "product": null,
            "quantity": 27,
            "id": 1
        }],
        "client": {
            "id": "5d695a99478e6f0ef81269b9",
            "name": "Client Test 1"
        },
        "orderDate": "2019-08-30 21:31:02",
        "completeDate": null,
        "status": "COMPLETED"
    };
    const acceptOrder = http.put(baseURL + "api/orders/" + idWithoutQuotes, JSON.stringify(updateData), headers);
    check(acceptOrder, {
        "Modify order returns status 200": (r) => r.status === 200,
        "Accept orders response is lower than 1000 ms": (r) => r.timings.duration < 1500
    });
}


////TEST PROCEDURE
export function setup() {
    console.log("Successfully setup");
}

export default function() {
    loginEmployee();
    const ordersArray = getItems();
    ordersArray.map(element => modifyOrder(element));
}

export function teardown() {
    console.log("Successfully finished");
}