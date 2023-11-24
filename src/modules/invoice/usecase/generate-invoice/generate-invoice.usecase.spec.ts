import GenerateInvoiceUseCase from "./generate-invoice.usecase";

const invoice = {
    id: "1",
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
            name: "Product 1",
            price: 10,
        },
        {
            id: "2",
            name: "Product 2",
            price: 20,
        },
    ],
};

const MockRepository = () => {
    return {
      add: jest.fn().mockReturnValue(Promise.resolve(invoice)),
      find: jest.fn(),
    };
  };

describe("Generate Invoice usecase unit test", () => {
    it("should generate an invoice", async () => {
        
        // Mapeando o repositório
        const invoiceRepository = MockRepository();
        
        // Criando o usecase
        const usecase = new GenerateInvoiceUseCase(invoiceRepository);
        
        // Executando o usecase
        const result = await usecase.execute(invoice);

        // Validando o resultado
        expect(invoiceRepository.add).toHaveBeenCalled();
        expect(result.id).toBeDefined;
        expect(result.name).toBe(invoice.name);
        expect(result.document).toBe(invoice.document);
        expect(result.street).toBe(invoice.street);
        expect(result.number).toBe(invoice.number);
        expect(result.complement).toBe(invoice.complement);
        expect(result.city).toBe(invoice.city);
        expect(result.state).toBe(invoice.state);
        expect(result.zipCode).toBe(invoice.zipCode);
        expect(result.items).toHaveLength(2);
        expect(result.items).toStrictEqual(invoice.items);
        expect(result.total).toBe(30);
    });

});