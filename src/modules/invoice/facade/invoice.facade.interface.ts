export interface InvoiceGenerateFacadeInputDto {
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
}

export interface InvoiceGenerateFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
}

export interface FindInvoiceFacadeInputDto {
    id: string;
}

export interface FindInvoiceFacadeOutputDto {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: {
        id: string;
        name: string;
        price: number;
    }[];
    total: number;
    createdAt: Date;
}

export default interface InvoiceFacadeInterface {
    generate(input: InvoiceGenerateFacadeInputDto): Promise<InvoiceGenerateFacadeOutputDto>;
    find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>;
}