import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDto, FindInvoiceFacadeOutputDto, InvoiceGenerateFacadeInputDto, InvoiceGenerateFacadeOutputDto } from "./invoice.facade.interface";

export interface UseCaseProps {
    generateUsecase: UseCaseInterface;
    findUsecase: UseCaseInterface;
}

export default class InvoiceFacade implements InvoiceFacadeInterface{
    private _generateUsecase: UseCaseInterface;
    private _findUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._generateUsecase = usecaseProps.generateUsecase;
        this._findUsecase = usecaseProps.findUsecase;
    }

    async generate(input: InvoiceGenerateFacadeInputDto): Promise<InvoiceGenerateFacadeOutputDto> {
        return await this._generateUsecase.execute(input);
    }

    async find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto> {
        return await this._findUsecase.execute(input);
    }

}
