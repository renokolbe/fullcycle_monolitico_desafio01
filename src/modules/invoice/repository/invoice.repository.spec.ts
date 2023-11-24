import { Sequelize } from "sequelize-typescript";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";
import InvoiceRepository from "./invoice.repository";
import Invoice from "../domain/invoice.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../../@shared/domain/value-object/address";
import InvoiceItems from "../domain/invoice-item.entity";

describe("Invoice Repository unit test", () => {

    let sequelize: Sequelize

    beforeEach(async () => {
      sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
        sync: { force: true }
      })
  
      await sequelize.addModels([InvoiceItemModel, InvoiceModel ]);
      await sequelize.sync();
    })
  
    afterEach(async () => {
      await sequelize.close()
    })

    it("should create a invoice", async () => {

        // Item 1 da Invoice
        const item1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 10,
        });

        // Item 2 da Invoice
        const item2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 20,
        });

        // Endereço da Invoice
        const address = new Address("Street 1", "123", "Complement 1", "City 1", "State 1", "12345678");

        // Props da Invoice
        const invoiceProps = {
            id: new Id("1"),
            name: "Customer 1",
            document: "123456789",
            address: address,
            items: [item1, item2],
        }

        // Criando a Invoice
        const invoice = new Invoice(invoiceProps);

        // Criando o repositório
        const repository = new InvoiceRepository()

        // Adicionando a Invoice ao repositório
        await repository.add(invoice)

        // Buscando a Invoice no banco
        const invoiceDb = await InvoiceModel.findOne(
            { where: { id: "1" },
              include: ["items"], 
            }
        )
        
        // Verificando se a Invoice foi encontrada
        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual(invoice.id.id)
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.street).toEqual(invoice.address.street)
        expect(invoiceDb.number).toEqual(invoice.address.number)
        expect(invoiceDb.complement).toEqual(invoice.address.complement)
        expect(invoiceDb.city).toEqual(invoice.address.city)
        expect(invoiceDb.state).toEqual(invoice.address.state)
        expect(invoiceDb.zipcode).toEqual(invoice.address.zipCode)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
        expect(invoiceDb.items.length).toEqual(2);
        expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id.id)
        expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name)
        expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price)
        expect(invoiceDb.items[1].id).toEqual(invoice.items[1].id.id)
        expect(invoiceDb.items[1].name).toEqual(invoice.items[1].name)
        expect(invoiceDb.items[1].price).toEqual(invoice.items[1].price)
        
    });
  
    it("should find a invoice", async () => {

        // Item 1 da Invoice
        const item1 = new InvoiceItems({
            id: new Id("1"),
            name: "Item 1",
            price: 10,
        });

        // Item 2 da Invoice
        const item2 = new InvoiceItems({
            id: new Id("2"),
            name: "Item 2",
            price: 20,
        });

        // Endereço da Invoice
        const address = new Address("Street 1", "123", "Complement 1", "City 1", "State 1", "12345678");

        // Props da Invoice
        const invoiceProps = {
            id: new Id("1"),
            name: "Customer 1",
            document: "123456789",
            address: address,
            items: [item1, item2],
        }

        // Criando a Invoice
        const invoice = new Invoice(invoiceProps);

        // Criando o repositório
        const repository = new InvoiceRepository()

        // Adicionando a Invoice ao repositório
        await repository.add(invoice)

        // Buscando a Invoice no banco
        const invoiceDb = await repository.find("1")

        // Verificando se a Invoice foi encontrada
        expect(invoiceDb).toBeDefined()
        expect(invoiceDb.id).toEqual(invoice.id)
        expect(invoiceDb.name).toEqual(invoice.name)
        expect(invoiceDb.document).toEqual(invoice.document)
        expect(invoiceDb.address.street).toEqual(invoice.address.street)
        expect(invoiceDb.address.number).toEqual(invoice.address.number)
        expect(invoiceDb.address.complement).toEqual(invoice.address.complement)
        expect(invoiceDb.address.city).toEqual(invoice.address.city)
        expect(invoiceDb.address.state).toEqual(invoice.address.state)
        expect(invoiceDb.address.zipCode).toEqual(invoice.address.zipCode)
        expect(invoiceDb.createdAt).toStrictEqual(invoice.createdAt)
        expect(invoiceDb.updatedAt).toStrictEqual(invoice.updatedAt)
        expect(invoiceDb.items.length).toEqual(2);
        expect(invoiceDb.items[0].id).toEqual(invoice.items[0].id)
        expect(invoiceDb.items[0].name).toEqual(invoice.items[0].name)
        expect(invoiceDb.items[0].price).toEqual(invoice.items[0].price)
        expect(invoiceDb.items[1].id).toEqual(invoice.items[1].id)
        expect(invoiceDb.items[1].name).toEqual(invoice.items[1].name)
        expect(invoiceDb.items[1].price).toEqual(invoice.items[1].price)

    });

    it("should not find a invoice", async () => {
            
            // Criando o repositório
            const repository = new InvoiceRepository()
    
            // Buscando a Invoice no banco
            expect(async () => {
                await repository.find("12")
                }
            ).rejects.toThrow("Invoice not found");
    });
});