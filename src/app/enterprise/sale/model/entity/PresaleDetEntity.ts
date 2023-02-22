import { ProductInfoDto } from "src/app/enterprise/product/model/dto/ProductInfoDto";

export class PresaleDetEntity
{
    public PresaleCod : string = "";
    public ProductCod : string = "";
    public Variant : string = "";
    public NumUnit : number = 0;
    public NumUnitPrice : number = 0;
    public NumDiscount : number = 0;
    public NumUnitPriceSale : number = 0;
    public NumTotalPrice : number = 0;

    public constructor()
    {
        
    }

    Build(ProductInfo : ProductInfoDto,Variant : string):void
    {
        this.ProductCod = ProductInfo.Product.ProductCod;
        this.Variant = Variant;
        this.NumUnit = 1;
        this.NumUnitPrice = ProductInfo.Config.NumPrice;
        this.NumDiscount = 0;
        this.NumUnitPriceSale = this.NumUnitPrice - this.NumDiscount;
        this.NumTotalPrice = this.NumUnitPriceSale * this.NumUnit;

    }

    Update(NumUnit : number):void
    {
        this.NumUnit = NumUnit;
        this.NumUnitPriceSale = this.NumUnitPrice - this.NumDiscount;
        this.NumTotalPrice = this.NumUnitPriceSale * this.NumUnit;
    }
}