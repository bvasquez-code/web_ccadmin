import { AuditTableEntity } from "src/app/enterprise/shared/model/entity/AuditTableEntity";

export class PresaleHeadEntity extends AuditTableEntity
{
    public PresaleCod: string = "";
    public StoreCod: string = "";
    public ClientCod?: any;
    public NumPriceSubTotal: number = 0;
    public NumDiscount: number = 0;
    public NumTotalPrice: number = 0;
    public NumTotalPriceNoTax: number = 0;
    public NumTotalTax: number = 0;
    public Commenter: string = "";
    public PeriodId: number = 0;
    public SaleStatus: string = "";
    public CurrencyCod: string = "";
    public CurrencyCodSys: string = "";
    public NumExchangevalue: number = 0;
    public IsPaid: string = "";

    public constructor()
    {
        super();
    }
}