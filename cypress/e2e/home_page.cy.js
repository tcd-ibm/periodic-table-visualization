///

function login(){
    let email = Cypress.env("email")
    let password = Cypress.env("password")
    cy.visit("")
    cy.get(".nav-item").eq(4).click()
    cy.get("input").should("be.visible")
    cy.get("input").eq(0).type(email)
    cy.get("input").eq(1).type(password)
    cy.get("button").contains("Login").click()
    cy.contains(/\w+\'s\sprofile/)
}

function createElement(name, symbol, atomicNumber, atomicMass){
    cy.get(".element").eq(0).should("exist")
    cy.get(".element").eq(0).click()

    cy.get("input").eq(0).type(name)
    cy.get("input").eq(1).type(symbol)
    cy.get("input").eq(2).type(atomicNumber)
    cy.get("input").eq(3).type(atomicMass)
    cy.get("textarea").type("This a description")
    cy.get("#group4").click()
    cy.get("button").contains("Create element").click()

}

describe("The home page", () => {
    it("loads successfully", () => {
        cy.visit("")
    })

    it("can successfully select the first 5 elements on homepage", () => {
        cy.visit("")
        cy.get(".element").each(($el, index) =>{
            // clicks each of the first 5 elements one by one and tries to return to home after clicking each one....
            if(index == 5){
                return false;
            } else{
                cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(index).should("exist")
                cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(index).click()
                cy.get(".nav-item").should("be.visible")
                cy.contains("home").click()
            }

        })
    })
    it("logins in successfully", () => {
        login()
    })
    it("logs out successfully", () => {
        login()
        cy.get(".nav-item").eq(5).should("exist")
        cy.get(".nav-item").eq(5).click()
        cy.get("button").contains("Log out").click()
    })
    it("can create elements", () => {
        login()
        createElement("name 1", "S1", 1, 10)
    })

    it("can delete elements", () => {
        login()
        // createElement("name 1", "S1", 1, 10)
        cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(0).should("exist")
        cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(0).click()
        cy.get(".btn.btn-danger.btn-block").eq(0).click()
    })

    it("can update elements", () => {
        login()
        createElement("name 1", "Sm", 1, 10)
        cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(0).should("exist")
        cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(0).click()
        cy.get(".btn.btn-primary.btn-block").eq(0).click()

    // objectID, Name, Symbol, Atomic Number, Atomic Mass, Description
        cy.get("input").eq(0).type("new id")
        cy.get("input").eq(1).type("new name")
        cy.get("input").eq(2).type("s2")
        cy.get("input").eq(3).type("12")
        cy.get("input").eq(4).type("120")
        cy.get("input").eq(5).type("new description")
        cy.get(".btn.btn-primary").click()
        cy.get(".nav-item").eq(4).click()

        // delete element so that there's always an empty table at the start of every set of tests...
        cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(0).should("exist")
        cy.get(".c-element-definition.d-flex.flex-column.justify-content-between.u-aspect-ratio").eq(0).click()
        cy.get(".btn.btn-danger.btn-block").eq(0).click()
    })

})
