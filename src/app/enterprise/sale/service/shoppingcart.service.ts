import { Injectable } from "@angular/core";
import { AppSetting } from "src/app/config/app.setting";
import { ApiService } from "../../compartido/service/api.service";
import { ResponseWsDto } from "../../shared/model/dto/ResponseWsDto";
import { ProductEntity } from "../../product/model/entity/ProductEntity";
import { ProductInfoDto } from "../../product/model/dto/ProductInfoDto";
import { PresaleRegisterDto } from "../model/dto/PresaleRegisterDto";
import { PresaleDetEntity } from "../model/entity/PresaleDetEntity";
import { ProductVariantEntity } from "../../product/model/entity/ProductVariantEntity";
import { ProductInfoEntity } from "../../product/model/entity/ProductInfoEntity";

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService
{

    ShoppingCart : PresaleRegisterDto = new PresaleRegisterDto();

    constructor()
    {

    }

    public Init()
    {
        this.ShoppingCart = new PresaleRegisterDto();
        let ShoppingCartStr :string | null = sessionStorage.getItem('ShoppingCart');

        // if(  ShoppingCartStr )
        // {
        //     const ShoppingCartObj = JSON.parse(ShoppingCartStr);
        //     // this.ShoppingCart.Headboard = ShoppingCartObj.Headboard;
        //     // this.ShoppingCart.DetailList = ShoppingCartObj.DetailList;

        //     this.ShoppingCart = Object.assign(new PresaleRegisterDto(), ShoppingCartObj);
        // }
   
    }

    public getCart():PresaleRegisterDto
    {
        return this.ShoppingCart;
    }

    public GetExistsStock(NumUnit : number,ProductInfo : ProductInfoDto,ProductVariant : ProductVariantEntity)
    {
        let NumDigitalStock : number = ProductInfo.InfoList.find( e => e.Variant === ProductVariant.Variant )?.NumDigitalStock  || 0;

        if( NumUnit >  NumDigitalStock)
        {
            throw new Error('Imposible stock');
        }
        if( NumUnit <  0)
        {
            throw new Error('Imposible stock');
        }
        return NumUnit;
    }


    public addUnit(ProductInfo : ProductInfoDto,ProductVariant : ProductVariantEntity)
    {
        let presaleDetEntity : PresaleDetEntity | undefined = this.GetProductInCart(ProductInfo.Product.ProductCod,ProductVariant.Variant);

        if(presaleDetEntity)
        {
            presaleDetEntity.Update(
                this.GetExistsStock(presaleDetEntity.NumUnit + 1,ProductInfo,ProductVariant)
            );
        }
        else
        {   presaleDetEntity = new PresaleDetEntity();
            presaleDetEntity.Build(ProductInfo,ProductVariant.Variant);
            presaleDetEntity.Update(
                this.GetExistsStock(1,ProductInfo,ProductVariant)
            );
            this.ShoppingCart.DetailList.push(presaleDetEntity);
        }

        this.ReBuild();
    }

    public HandbookUnit(ProductInfo : ProductInfoDto,ProductVariant : ProductVariantEntity, NumUnit : number)
    {
        let presaleDetEntity : PresaleDetEntity | undefined = this.GetProductInCart(ProductInfo.Product.ProductCod,ProductVariant.Variant);

        if(presaleDetEntity)
        {
            presaleDetEntity.Update(
                this.GetExistsStock(NumUnit,ProductInfo,ProductVariant)
            );
        }
        else
        {   presaleDetEntity = new PresaleDetEntity();
            presaleDetEntity.Build(ProductInfo,ProductVariant.Variant);
            presaleDetEntity.Update(
                this.GetExistsStock(NumUnit,ProductInfo,ProductVariant)
            );
            this.ShoppingCart.DetailList.push(presaleDetEntity);
        }

        this.ReBuild();
    }

    public subtractUnit(ProductInfo : ProductInfoDto,ProductVariant : ProductVariantEntity)
    {
        let presaleDetEntity : PresaleDetEntity | undefined = this.GetProductInCart(ProductInfo.Product.ProductCod,ProductVariant.Variant);

        if(presaleDetEntity)
        {
            if( presaleDetEntity.NumUnit - 1  === 0)
            {
                this.ShoppingCart.DetailList = this.ShoppingCart.DetailList.filter( e => e.ProductCod !== ProductInfo.Product.ProductCod && e.Variant !== ProductVariant.Variant );
            }
            else
            {
                presaleDetEntity.Update(
                    this.GetExistsStock(presaleDetEntity.NumUnit - 1,ProductInfo,ProductVariant)                
                );
            }
        }

        this.ReBuild();
    }

    public DeleteProduct(ProductCod : string)
    {
        this.ShoppingCart.DetailList = this.ShoppingCart.DetailList.filter( e => e.ProductCod !== ProductCod );
        this.ReBuild();
    }


    existproductInCart(ProductCod : string , Variant : string) :boolean
    {
        return (this.ShoppingCart.DetailList.filter( e => e.ProductCod === ProductCod && e.Variant === Variant ).length > 0)
    }

    GetProductInCart(ProductCod : string , Variant : string) :PresaleDetEntity | undefined
    {
        return this.ShoppingCart.DetailList.find( e => e.ProductCod === ProductCod && e.Variant === Variant );
    }


    GetNumUnitProd(ProductCod : string):number
    {
        let NumItem = 0;
        const listProductVariant = this.ShoppingCart.DetailList.filter( e => e.ProductCod === ProductCod );
        for(let Product of listProductVariant)
        {
            NumItem = NumItem + Product.NumUnit;
        }
        return NumItem;
    }

    GetTmpProductInCart(ProductCod : string) :PresaleDetEntity[]
    {
        let PresaleDet : PresaleDetEntity[] = this.ShoppingCart.DetailList.filter( e => e.ProductCod === ProductCod );
        return PresaleDet; 
    }

    getTotalProduct(ProductCod : string):number
    {
      let NumUnit : number = 0;
      let result = this.ShoppingCart.DetailList.filter( e => e.ProductCod === ProductCod);
      NumUnit = result.map( item => item.NumUnit).reduce((a, b) => a + b, 0);
      return NumUnit;
    }
  
    getTotalProductVariant(ProductCod : string,Variant : string):number
    {
      let NumUnit : number = 0;
      let result = this.ShoppingCart.DetailList.filter( e => e.ProductCod === ProductCod && e.Variant === Variant);
      NumUnit = result.map( item => item.NumUnit).reduce((a, b) => a + b, 0);
      return NumUnit;
    }

    ReBuild()
    {
        this.ShoppingCart.ReBuild();
        this.saveCartSession();
    }

    saveCartSession()
    {
        sessionStorage.setItem("ShoppingCart",JSON.stringify(this.ShoppingCart));
        console.log(sessionStorage.getItem("ShoppingCart"));
    }
}