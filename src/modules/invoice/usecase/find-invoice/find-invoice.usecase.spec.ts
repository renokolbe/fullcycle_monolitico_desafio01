import FindInvoiceUseCase from "./find-invoice.usecase";
import Id from "../../../@shared/domain/value-object/id.value-object";

const invoice = {
    id: new Id("1"),
    name: "Customer 1",
    document: "123456789",
    address: {
        street: "Street 1",
        number: "123",
        complement: "Complement 1",
        city: "City 1",
        state: "State 1",
        zipCode: "12345678",
    },
    items: [
        {
            id: new Id("1"),
            name: "Product 1",
            price: 10,
        },
        {
            id: new Id("2"),
            name: "Product 2",
            price: 20,
        },
    ],
    total: 30,
    createdAt: new Date('2021-01-01'),
};

const MockRepository = () => {
    return {
      add: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
    };
  };

describe("Find Invoice Usecase unit test", () => {
    it("should find a invoice", async () => {
        
        //Mapeando o repositório
        const invoiceRepository = MockRepository();
        
        //Criando o usecase
        const usecase = new FindInvoiceUseCase(invoiceRepository);
        
        //Executando o usecase
        const result = await usecase.execute({ id: "1"});

        // Validando o resultado
        expect(invoiceRepository.find).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.address.street).toBe(invoice.address.street);
        expect(result.address.number).toBe(invoice.address.number);
        expect(result.address.complement).toBe(invoice.address.complement);
        expect(result.address.city).toBe(invoice.address.city);
        expect(result.address.state).toBe(invoice.address.state);
        expect(result.address.zipCode).toBe(invoice.address.zipCode);
        expect(result.items).toHaveLength(2);
        expect(result.items[0].id).toBe(invoice.items[0].id.id);
        expect(result.items[0].name).toBe(invoice.items[0].name);
        expect(result.items[0].price).toBe(invoice.items[0].price);
        expect(result.items[1].id).toBe(invoice.items[1].id.id);
        expect(result.items[1].name).toBe(invoice.items[1].name);
        expect(result.items[1].price).toBe(invoice.items[1].price);
        expect(result.total).toBe(30);
        expect(result.createdAt).toBe(invoice.createdAt);
    });

});