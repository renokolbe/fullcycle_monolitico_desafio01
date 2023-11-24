import { Sequelize } from "sequelize-typescript";
import InvoiceFacadeFactory from "../factory/invoice.facade.factory";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import { InvoiceModel } from "../repository/invoice.model";
import e from "express";

describe("Invoice Facade unit test", () => {

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
        const facade = InvoiceFacadeFactory.create();
        const input = {
            name: "Customer 1",
            document: "123456789",
            street: "Street 1",
            number: "123",
            complement: "Complement 1",
            city: "City 1",
            state: "State 1",
            zipCode: "12345678",
            items: [
                {
                    id: "1",
                    name: "Item 1",
                    price: 10,
                },
                {
                    id: "2",
                    name: "Item 2",
                    price: 20,
                }
            ]
        };

        //Executando a Facade
        const result = await facade.generate(input);

        //Conferindo o resultado
        expect(result.id).toBeDefined;
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipCode).toBe(input.zipCode);
        expect(result.items).toHaveLength(2);
        expect(result.items).toStrictEqual(input.items);

    });

    it("should get a invoice", async () => {
        const facade = InvoiceFacadeFactory.create();

        //Gerando uma invoice
        const input = {
          name: "Customer 1",
          document: "123456789",
          street: "Street 1",
          number: "123",
          complement: "Complement 1",
          city: "City 1",
          state: "State 1",
          zipCode: "12345678",
          items: [
              {
                  id: "1",
                  name: "Item 1",
                  price: 10,
              },
              {
                  id: "2",
                  name: "Item 2",
                  price: 20,
              }
          ]
      };

      //Executando a Facade de geração de invoice
      const output = await facade.generate(input);

      //Executando a Facade de busca de invoice
      const result = await facade.find({ id: output.id });

      //Conferindo o resultado
      expect(result.id).toBeDefined;
      expect(result.name).toBe(input.name);
      expect(result.document).toBe(input.document);
      expect(result.address.street).toBe(input.street);
      expect(result.address.number).toBe(input.number);
      expect(result.address.complement).toBe(input.complement);
      expect(result.address.city).toBe(input.city);
      expect(result.address.state).toBe(input.state);
      expect(result.address.zipCode).toBe(input.zipCode);
      expect(result.items).toHaveLength(2);
      expect(result.items).toStrictEqual(input.items);
      expect(result.total).toBe(30);

  });

});