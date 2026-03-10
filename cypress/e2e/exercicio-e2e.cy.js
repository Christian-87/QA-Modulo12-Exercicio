/// <reference types="cypress" />
import { faker } from '@faker-js/faker'

let dadosLogin


context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
    /*  Como cliente 
        Quero acessar a Loja EBAC 
        Para fazer um pedido de 4 produtos 
        Fazendo a escolha dos produtos
        Adicionando ao carrinho
        Preenchendo todas opções no checkout
        E validando minha compra ao final */

    before(() => {
        cy.fixture('perfil').then(perfil => {
            dadosLogin = perfil
        })
    })

    beforeEach(() => {
        cy.visit('/')
    })

    it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {

        // Dados dinâmicos com Faker
        const nome = faker.person.firstName()
        const sobrenome = faker.person.lastName()
        const endereco = faker.location.streetAddress()
        const cidade = faker.location.city()
        const email = faker.internet.email()

        const cep = `${faker.string.numeric(5)}-${faker.string.numeric(3)}`

        const telefone = '11987654321'



        // Login usando comando customizado
        cy.visit('minha-conta')
        cy.login(dadosLogin.usuario, dadosLogin.senha)

        cy.get('.page-title').should('contain', 'Minha conta')

        // Ir para produtos
        cy.visit('produtos')
        // Adicionar produtos usando comando customizado
        cy.addProduto(0, 'S', 'Blue')
        cy.addProduto(1, 'M', 'Yellow')
        cy.addProduto(2)
        cy.addProduto(3)

        // Ir para o carrinho
        cy.get('.dropdown-toggle > .mini-cart-items').click()
cy.get('#cart').find('.view-cart').click()

        // Checkout
        cy.contains('Concluir compra').click()

        // Preenchimento do checkout com Faker


        cy.get('#billing_first_name').clear({ force: true }).type(nome)

        cy.get('#billing_last_name').clear({ force: true }).type(sobrenome)

        cy.get('#billing_address_1').clear({ force: true }).type(endereco)

        cy.get('#billing_city').clear({ force: true }).type('São Paulo')

        cy.get('#billing_postcode').clear({ force: true }).type('01012-000')

        cy.get('#billing_phone').clear({ force: true }).type('11987654321')

        cy.get('#billing_email').clear({ force: true }).type(email)

        cy.get('#terms').click()

        cy.get('#place_order').should('be.visible').click()

        cy.contains('Obrigado. Seu pedido foi recebido').should('be.visible')



        // Espera a atualização do checkout
        cy.wait(2000)

      
        // Validação final
        cy.contains('Obrigado. Seu pedido foi recebido').should('be.visible')
    });
});