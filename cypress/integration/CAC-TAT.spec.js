/// <reference types="Cypress" />

describe("Central de Atendimento ao Cliente TAT", function () {
  const THREE_SECONDS_IN_MS = 3000;
  beforeEach(() => {
    cy.visit("../../src/index.html");
  });

  it("verifica o título da aplicação", function () {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });

  it("preenche os campos obrigatórios e envia o formulário", () => {
    const firstName = "Denis";
    const lastName = "Sales";
    const email = "denisales@hotmail.com";
    const phone = "11999999999";
    const text = "Esse pariatur incididunt non ullamco.";

    cy.clock();

    cy.get("#firstName").type(firstName).should("have.value", firstName);
    cy.get("#lastName").type(lastName).should("have.value", lastName);
    cy.get("#email").type(email).should("have.value", email);
    cy.get("#phone").type(phone).should("have.value", phone);
    cy.get("#open-text-area")
      .type(text, {
        delay: 0,
      })
      .should("have.value", text);
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get(".success ").should("be.not.visible");
    //   .should("contain.text", "Mensagem enviada com sucesso");
  });

  it("exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.clock();

    const firstName = "Denis";
    const lastName = "Sales";
    const email = "denisalesotmail.com";
    const phone = "11999999999";
    const text = "Esse pariatur incididunt non ullamco.";
    cy.get("#firstName").type(firstName).should("have.value", firstName);

    cy.get("#lastName").type(lastName).should("have.value", lastName);

    cy.get("#email").type(email).should("have.value", email);

    cy.get("#phone").type(phone).should("have.value", phone);

    cy.get("#open-text-area")

      .type(text, {
        delay: 0,
      })
      .should("have.value", text);

    cy.contains("button", "Enviar").click();

    cy.get(".error ").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get(".error ").should("be.not.visible");
    //   .should("contain.text", "Mensagem enviada com sucesso");
  });

  Cypress._.times(3, () => {
    it("campo telefone continua vazio quando preenchido com valor não númerico", () => {
      const phone = "Occaecat";

      cy.get("#phone")

        .type(phone)
        .should("have.value", "");
    });
  });

  it("exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    const firstName = "Denis";
    const lastName = "Sales";
    const email = "denisalesotmail.com";
    const text = "Esse pariatur incididunt non ullamco.";

    cy.clock();

    cy.get("#firstName").type(firstName).should("have.value", firstName);
    cy.get("#lastName").type(lastName).should("have.value", lastName);
    cy.get("#email").type(email).should("have.value", email);
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area")
      .type(text, {
        delay: 0,
      })
      .should("have.value", text);
    cy.contains("button", "Enviar").click();
    cy.get(".error ").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get(".error ").should("be.not.visible");
  });

  it("preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    const firstName = "Denis";
    const lastName = "Sales";
    const email = "denisalesotmail.com";
    const phone = "11999999999";
    const text = "Esse pariatur incididunt non ullamco.";

    cy.get("#firstName")
      .type(firstName)
      .should("have.value", firstName)
      .clear()
      .should("have.value", "");

    cy.get("#lastName")
      .type(lastName)
      .should("have.value", lastName)
      .clear()
      .should("have.value", "");

    cy.get("#email")
      .type(email)
      .should("have.value", email)
      .clear()
      .should("have.value", "");

    cy.get("#phone")
      .type(phone)
      .should("have.value", phone)
      .clear()
      .should("have.value", "");

    cy.get("#open-text-area")
      .type(text, { delay: 0 })
      .should("have.value", text)
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.clock();
    cy.contains("button", "Enviar").click();

    cy.get(".error ").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get(".error ").should("be.not.visible");
  });

  it("envia o formuário com sucesso usando um comando customizado", () => {
    cy.clock();
    cy.fillMandatoryFieldsAndSubmit();

    cy.get(".success").should("be.visible");
    cy.tick(THREE_SECONDS_IN_MS);
    cy.get(".success ").should("be.not.visible");
  });

  it("seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#product").select("YouTube").should("have.value", "youtube");
  });

  it("seleciona um produto (Mentoria) por seu texto", () => {
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
  });

  it("seleciona um produto (blog) por seu texto", () => {
    cy.get("#product").select(1).should("have.value", "blog");
  });

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should("have.value", "feedback");
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
      .should("have.length", 3)
      .each((radio) => {
        cy.wrap(radio).check().should("be.checked");
      });
  });

  it("marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should("be.checked")
      .last()
      .uncheck()
      .should("not.be.checked");
  });

  it("seleciona um arquivo da pasta fixtures", () => {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json")
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("cypress/fixtures/example.json", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture("example.json").as("sampleFile");

    cy.get("input[type='file']")
      .should("not.have.value")
      .selectFile("@sampleFile", { action: "drag-drop" })
      .should((input) => {
        expect(input[0].files[0].name).to.equal("example.json");
      });
  });

  it("verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get("#privacy a").should("have.attr", "target", "_blank");
  });

  it("acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get("#privacy a").invoke("removeAttr", "target").click();
    cy.contains("CAC TAT - Política de privacidade").should("be.visible");
  });

  it("exibe e esconde as mensagens de sucesso e erro usando o .invoke", () => {
    cy.get(".success")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Mensagem enviada com sucesso.")
      .invoke("hide")
      .should("not.be.visible");
    cy.get(".error")
      .should("not.be.visible")
      .invoke("show")
      .should("be.visible")
      .and("contain", "Valide os campos obrigatórios!")
      .invoke("hide")
      .should("not.be.visible");
  });

  it("preenche a area de texto usando o comando invoke", () => {
    const longText = Cypress._.repeat("12121212", 20);

    cy.get("#open-text-area")
      .invoke("val", longText)
      .should("have.value", longText);
  });

  it("faz uma requisição HTTP", () => {
    cy.request({
      method: "GET",
      url: "https://cac-tat.s3.eu-central-1.amazonaws.com/index.html",
    }).should((response) => {
      const { status, statusText, body } = response;
      expect(status).to.equal(200);
      expect(statusText).to.equal("OK");
      expect(body).to.include("CAC TAT");
    });
  });

  it.only("encontre o gato escondido", () => {
    cy.get("#cat").should("be.not.visible").invoke("show").should("be.visible");
  });
});
