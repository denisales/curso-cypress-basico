// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("fillMandatoryFieldsAndSubmit", (subject, options) => {
  const firstName = "Denis";
  const lastName = "Sales";
  const email = "denisales@hotmail.com";
  const phone = "11999999999";
  const text = "Esse pariatur incididunt non ullamco.";

  cy.get("#firstName").type(firstName);
  cy.get("#lastName").type(lastName);
  cy.get("#email").type(email);
  cy.get("#phone").type(phone);
  cy.get("#open-text-area").type(text, { delay: 0 });
  cy.get("button[type='submit']").click();
});
