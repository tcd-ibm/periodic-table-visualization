const { compareSync } = require("bcryptjs")

///
describe("The home page", () => {
    it("loads successfully", () => {
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
        // cy.get("@el").click()

    })
})
