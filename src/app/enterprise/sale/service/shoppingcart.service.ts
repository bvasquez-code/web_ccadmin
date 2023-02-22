import { Injectable } from "@angular/core";
import { AppSetting } from "src/app/config/app.setting";
import { ApiService } from "../../compartido/service/api.service";
import { ResponseWsDto } from "../../shared/model/dto/ResponseWsDto";
import { ProductEntity } from "../../product/model/entity/ProductEntity";
import { ProductInfoDto } from "../../product/model/dto/ProductInfoDto";
import { PresaleRegisterDto } from "../model/dto/PresaleRegisterDto";
import { PresaleDetEntity } from "../model/entity/PresaleDetEntity";
import { ProductVariantEntity } from "../../product/model/entity/ProductVariantEntity";

@Injectable({
    providedIn: 'root'
})

export class ShoppingCartService
{

    ShoppingCart : PresaleRegisterDto = new PresaleRegisterDto();

    constructor()
    {

    }

    public init()
    {
        this.ShoppingCart = new PresaleRegisterDto();
    }


    public addUnit(ProductInfo : ProductInfoDto,ProductVariant : ProductVariantEntity)
    {
        let presaleDetEntity : PresaleDetEntity | undefined = this.GetProductInCart(ProductInfo.Product.ProductCod,ProductVariant.Variant);

        if(presaleDetEntity)
        {
            presaleDetEntity.Update(presaleDetEntity.NumUnit + 1);
        }
        else
        {   presaleDetEntity = new PresaleDetEntity();
            presaleDetEntity.Build(ProductInfo,ProductVariant.Variant);
            this.ShoppingCart.DetailList.push(presaleDetEntity);
        }

        this.ShoppingCart.ReBuild();
    }

    public HandbookUnit(ProductInfo : ProductInfoDto,ProductVariant : ProductVariantEntity, NumUnit : number)
    {
        let presaleDetEntity : PresaleDetEntity | undefined = this.GetProductInCart(ProductInfo.Product.ProductCod,ProductVariant.Variant);

        if(presaleDetEntity)
        {
            presaleDetEntity.Update(NumUnit);
        }
        else
        {   presaleDetEntity = new PresaleDetEntity();
            presaleDetEntity.Build(ProductInfo,ProductVariant.Variant);
            presaleDetEntity.Update(NumUnit);
            this.ShoppingCart.DetailList.push(presaleDetEntity);
        }

        this.ShoppingCart.ReBuild();
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
                presaleDetEntity.Update(presaleDetEntity.NumUnit - 1);
            }
        }

        this.ShoppingCart.ReBuild();
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

    GetTmpProductInCart(ProductCod : string , Variant : string) :PresaleDetEntity
    {
        let PresaleDet : PresaleDetEntity | undefined = this.ShoppingCart.DetailList.find( e => e.ProductCod === ProductCod && e.Variant === Variant );
        if(!PresaleDet) PresaleDet = new PresaleDetEntity();
        return PresaleDet; 
    }


}