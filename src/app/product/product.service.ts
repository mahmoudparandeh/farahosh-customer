import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, ReplaySubject, Subject } from 'rxjs';
import { ProductModel } from './models/product.model';
import { SharedService } from '../shared/shared.service';
import moment from 'jalali-moment';
import { Brand } from './models/brand.model';
import { Category } from './models/category.model';
import { environment } from '../../environments/environment';
import { ProductInventory, ProductInventoryDto } from './models/profuctInventory.model';
import { AttributeValue, ProductAttribute, ProductInventoryAttribute } from './models/productAttribute.model';
import Swal from 'sweetalert2';
import { TaxCategoryModel } from '../shared/models/tax-category.model';
import { HsCodeModel } from './models/hs-code.model';
import { Incoterm } from './models/incoterm.model';
import { ProductPrice, ProductPriceDto } from './models/product-price.model';
import { ProductDetail, ProductItemModel } from './models/product-item.model';
import { CategoryAttributeModel } from './models/category-attribute.model';
import { ProductCertificate } from './models/product.certificate.model';
import { CertificateImage } from '../account/iso.model';
import { ProductPackage } from './models/product.package.model';
import { ProductWeight } from './models/product.weight.model';
import { Image, ImageDto } from '../shared/image.model';
import { ProductInventoryPrice } from './models/product.inventory.price.model';
import { WarehouseModel } from '../ware-house/warehouse.model';
import { CategoryFeature } from '../models/categoryFeature.model';
import { Transport } from './models/transport.model';
import {Currency} from "./models/currency.model";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiTitles: any;
  language = 'fa';

  constructor(private httpClient: HttpClient, private sharedService: SharedService) {
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.currentLanguage.subscribe(lang => {
      this.language = lang;
    });
  }

  //#region Api Urls
  baseUrlProduct = '/api/v1/VendorProduct/';
  baseUrlProductUpdate = '/api/v1/VendorProduct/CustomUpdate';
  baseUrlGetProducts = '/api/v1/VendorProduct/GetPageByPage';
  baseUrlSearchProduct = '/api/v1/VendorProduct/SearchProduct';
  baseUrlGetAllProducts = '/api/v1/VendorProduct/GetVendorProductList';
  baseUrlBrands = '/api/v1/brand/GetAllRows';
  baseUrlCategories = '/api/v1/VendorCategory/GetAllRows';
  baseUrlProductsInInventory = '/api/v1/VendorProductInventory/ProductInventoryGetPageByPage';
  baseUrlInventory = '/api/v1/VendorProductTierPrice/AddVendorProductInventoryAndTierPrice';
  baseUrlUpdateInventory = '/api/v1/VendorProductTierPrice/UpdateVendorProductInventoryAndTierPrice';
  baseUrlDeleteInventory = '/api/v1/VendorProductTierPrice/DeleteVendorProductInventoryAndTierPrice';
  baseUrlProductAttribute = '/api/v1/VendorProductAttribute/GetProductAttributes/';
  baseUrlTaxCategories = '/api/v1/TaxCategory/GetAllRows';
  baseUrlProductInventory = '/api/v1/VendorProductInventory/';
  baseUrlProductHsCode = '/api/v1/VendorHSCode/SearchHSCode';
  baseUrlIncoterm = '/api/v1/VendorIncoterm/GetAllRows';
  baseUrlVendorProductTierPrice = '/api/v1/VendorProductTierPrice/';
  baseUrlVendorProductTierPriceList = '/api/v1/VendorProductTierPrice/GetPageByPageProductInventoryTierPrices';
  baseUrlGetCategoryAttributes = '/api/v1/CategoryAttributeMapping/GetAttributes';
  baseUrlFinalSave = '/api/v1/VendorProduct/ProductFinalSave';
  baseUrlGetProductCertificatesImages = '/api/v1/VendorVendor/GetAllProductCertificatePictures';
  baseUrlGetProductCertificates = '/api/v1/VendorCertificate/GetAllProductCertificates';
  baseUrlAddProductCertificates = '/api/v1/VendorVendor/CUDProductCertificatePicture';
  baseUrlHsCodeLevelByLevel = '/api/v1/VendorHSCode/GetHSCodeLevelByLevel';
  baseUrlProductPackageType = '/api/v1/VendorUnit/GetAllProductPackagingUnits';
  baseUrlProductWeightUnit = '/api/v1/VendorUnit/GetAllWeightUnits';
  baseUrlProductPicture = '/api/v1/VendorVendor/CUDProductPictures';
  baseUrlProductVideo = '/api/v1/VendorVendor/CUDProductVideos';
  baseUrlGetProductPicture = '/api/v1/VendorVendor/GetAllProductDefinitionPictures';
  baseUrlGetProductVideo = '/api/v1/VendorVendor/GetAllProductDefinitionVideos';
  baseUrlVirtualWarehouse = '/api/v1/VendorWareHouse/GetVirtualWareHouse';
  baseUrlProductTag = '/api/v1/VendorProductTag/';
  baseUrlHsCode = '/api/v1/VendorHSCode/';
  baseUrlProductCategoryMapping = '/api/v1/VendorProductCategoryMapping/';
  baseUrlVendorProductAttribute = '/api/v1/VendorProductAttribute/';
  baseUrlSearchHtsNumber = '/api/v1/VendorHSCode/SearchHSNumber';
  baseUrlTransport = '/api/v1/VendorUnit/GetAllTransportUnits';
  baseUrlUpsertTransport = '/api/v1/VendorProduct/VendorAddProductTransportation';
  baseUrlCurrencies = '/api/v1/VendorCurrency/GetAllRows';
  //#endregion

  //#region Properties
  brands = new ReplaySubject<Brand[]>(1);
  categories = new ReplaySubject<Category[]>(1);
  searchProductList = new Subject<any[]>();
  productsInventory = new ReplaySubject<ProductInventory[]>(1);
  productInventory = new ReplaySubject<ProductInventoryDto>(1);
  productInventoryTotal = new BehaviorSubject<number>(1);
  productTotal = new BehaviorSubject<number>(1);
  productInventoryAttribute = new ReplaySubject<ProductInventoryAttribute[]>(1);
  taxCategoryList = new ReplaySubject<TaxCategoryModel[]>(1);
  hsCodeList = new ReplaySubject<HsCodeModel[]>(1);
  selectedCategory = new ReplaySubject<Category>(1);
  selectedCategories = new ReplaySubject<Category[]>(1);
  incoterms = new ReplaySubject<Incoterm[]>(1);
  productPrices = new ReplaySubject<ProductPrice[]>(1);
  productPrice = new ReplaySubject<ProductPriceDto>(1);
  isEditInventory = new Subject<any>();
  isEditPrice = new ReplaySubject<boolean>(1);
  productPriceTotal = new ReplaySubject<number>(1);
  product = new ReplaySubject<ProductDetail>(1);
  productTranslation = new Subject<ProductItemModel>();
  categoryAttributes = new ReplaySubject<CategoryAttributeModel[]>();
  productCertificates = new ReplaySubject<ProductCertificate[]>(1);
  productCertificateImages = new ReplaySubject<CertificateImage[]>(1);
  productPackageTypes = new ReplaySubject<ProductPackage[]>(1);
  productWeightUnit = new ReplaySubject<ProductWeight[]>(1);
  productImages = new ReplaySubject<ImageDto[]>(1);
  productPackageImages = new ReplaySubject<ImageDto[]>(1);
  productVideo = new ReplaySubject<ImageDto[]>(1);
  productInventoryPrices = new Subject<ProductInventoryPrice[]>();
  virtualWarehouse = new ReplaySubject<WarehouseModel>(1);
  hsCodeListWithSectionId = new ReplaySubject<any[]>(1);
  hsCodeListWithChapterId = new ReplaySubject<any[]>(1);
  hsCodeListWithHsNumber = new ReplaySubject<any[]>(1);
  hsCodeListWithIndent = new ReplaySubject<any[]>(1);
  hsCodeSectionId = new BehaviorSubject<number>(-2);
  hsCodeChapterId = new BehaviorSubject<number>(-1);
  hsCodeHsNumber = new BehaviorSubject<string>('-1');
  hsCodeIndent = new BehaviorSubject<number>(-1);
  productGuid = new ReplaySubject<string>();
  htsNumberList = new ReplaySubject<any[]>(1);
  transports = new ReplaySubject<Transport[]>(1);
  currencies = new ReplaySubject<Currency[]>();
  // addCategoryFlag = new BehaviorSubject<boolean>(false);
  //#endregion

  //#region Methods
  getSearchProduct(page: number, searchKey?: string, brandId: number = 0, categoryId: number = 0) {
    // const options = JSON.stringify({ PageSize: 12 , PageNumber: page, SearchKey: searchKey, CategoryId: categoryId, BrandId: brandId });
    // options = options + { SearchKey: searchKey };
    const option = {
      PageSize: 12,
      PageNumber: page,
      SearchKey: encodeURIComponent(searchKey),
      CategoryId: categoryId,
      BrandId: brandId,
    };
    if (option.CategoryId === 0) {
      delete option.CategoryId;
    }
    if (option.BrandId === 0) {
      delete option.BrandId;
    }
    const options = JSON.stringify(option);
    this.httpClient
      .get(this.baseUrlSearchProduct, {
        headers: {
          value: options,
        },
      })
      .subscribe((response: any) => {
        const products: ProductModel[] = [];
        this.productTotal.next(response.jsonResult.Data.rowcount);
        for (const item of response.jsonResult.Data.product) {
          let categories = '';
          if (item.category) {
            for (const cat of item.category) {
              categories += (cat.CategoryName[this.sharedService.language] ?? cat.CategoryName.fa) + ', ';
            }
            categories = categories.substring(0, categories.length - 2);
          } else {
            categories = '-';
          }
          const product: ProductModel = {
            BrandId: item.BrandInfo[0].BrandId,
            BrandName: item.BrandInfo[0].BrandName,
            CreatedOnUtc:
              this.sharedService.language === 'fa'
                ? moment(item.CreatedOnUtc).format('jYYYY/jM/jD HH:MM:ss')
                : moment(item.CreatedOnUtc).format('YYYY/M/D HH:MM:ss'),
            HTSDescription: '',
            HTSNumber: 0,
            FAQ: item.FAQ,
            ProductGuid: item.ProductGuid.toLowerCase(),
            ProductName: item.Name,
            // ProductName: item.Name,
            ShortDescription: item.ShortDescription,
            // ShortDescription: item.ShortDescription,
            Status: item.Status,
            StatusId: item.Status,
            StatusComment: item.StatusComment,
            Tag: item.Tag,
            PicPath: item.PicPath
              ? environment.apiUrl + item.PicPath
              : '../../../../assets/images/default-product-image.png',
            category: categories,
          };
          products.push(product);
        }
        this.searchProductList.next(products);
      });
  }

  createProduct(product: any): Observable<any> {
    const data = { product };
    return this.httpClient.post<any>(this.baseUrlProduct, data);
  }
  searchHtsNumber(searchTerm: string) {
    // const options = {
    //   htsNumber: encodeURIComponent(searchTerm)
    // };
    this.httpClient
      .get(this.baseUrlSearchHtsNumber, {
        headers: {
          htsNumber: encodeURIComponent(searchTerm),
        },
      })
      .subscribe(response => {});
  }
  updateProductTags(guid: string, tagList: any): Observable<any> {
    const data = { producttag: { ProductGuid: guid, TagList: tagList } };
    return this.httpClient.post(this.baseUrlProductTag, data);
  }
  addHsCode(hsCode: any): Observable<any> {
    const data = {
      hscode: {
        Id: hsCode.Id,
        HSCodeChapterId: hsCode.HSCodeChapterId,
        HTSNumber: hsCode.HTSNumber,
        FatherHSTNumber: hsCode.FatherHSTNumber,
        Indent: hsCode.Indent,
        Description: hsCode.Description,
        DescriptionLeveral: hsCode.DescriptionLeveral,
        UnitOfQuantity: hsCode.UnitOfQuantity,
        GeneralRateOfDuty: hsCode.GeneralRateOfDuty,
        SpecialRateOfDuty: hsCode.SpecialRateOfDuty,
        Column2RateOfDuty: hsCode.Column2RateOfDuty,
        QuotaQuantity: hsCode.QuotaQuantity,
        AdditionalDuties: hsCode.AdditionalDuties,
      },
    };
    return this.httpClient.post(this.baseUrlHsCode, data);
  }
  addProductCategory(guid: string, categoryList: Category[]): Observable<any> {
    const data = [];
    for (const category of categoryList) {
      const categoryItem = {
        productcategorymapping: {
          ProductGuid: guid,
          CategoryId: category.Id,
        },
      };
      data.push(categoryItem);
    }
    return this.httpClient.post(this.baseUrlProductCategoryMapping, data);
  }
  addOrUpdateProductAttribute(attributes: any, guid: string): Observable<any> {
    const data = [];
    for (const item of attributes) {
      const ids = [];
      for (let i = 0; i < item.FormControllers.length; i++) {
        if (item.FormControllers[i].value) {
          ids.push(item.DefaultValueIds[i]);
        }
      }
      const attribute = {
        productattribute: {
          ProductGuid: item.ProductGuid,
          AttributeGroupId: item.AttributeGroupId,
          AttributeId: item.AttributeId,
          Type: item.TypeController.value,
          DefaultAttributeValueIds: ids.join(','),
        },
      };
      data.push(attribute);
    }
    if (attributes.length === 0) {
      data.push({
        productattribute: {
          ProductGuid: guid,
        },
      });
    }
    return this.httpClient.post(this.baseUrlVendorProductAttribute, data);
  }
  productFinalSave(guid: string): Observable<any> {
    const data = {};
    return this.httpClient.post<any>(this.baseUrlFinalSave + '/' + guid, data);
  }

  deleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.baseUrlProduct + id);
  }

  getBrands(): void {
    this.httpClient.get(this.baseUrlBrands).subscribe((response: any) => {
      const brands = [];
      for (const item of response.jsonResult.Data.brand) {
        const brand: Brand = {
          BrandName: item.BrandName[this.sharedService.language] ?? item.BrandName.fa,
          Description: item.Description,
          Id: item.Id,
        };
        brands.push(brand);
      }
      this.brands.next(brands);
    });
  }

  getHsCodeList(searchTerm?: string, sectionId?: number, chapterId?: number, hsNumber?: string, indent?: number): void {
    const option = {
      SectionId: sectionId,
      ChapterId: chapterId,
      HsNumber: hsNumber,
      Indent: indent,
    };
    const options = JSON.stringify(option);
    this.httpClient
      .get(this.baseUrlHsCodeLevelByLevel, {
        headers: {
          value: options,
        },
      })
      .subscribe((response: any) => {
        const hsCodes = [];
        for (const item of response.jsonResult.Data.hscode) {
          // const hsCode: HsCodeModel = {
          //   SectionId: item.SectionId,
          //   SectionTitle: item.SectionTitle,
          //   SectionNoRoman: item.SectionNoRoman,
          //   ChapterId: item.ChapterId,
          //   ChapterTitle: item.ChapterTitle,
          //   ChapterCode: item.ChapterCode,
          //   Id: item.Id,
          //   HTSNumber: item.HTSNumber,
          //   FatherHSTNumber: item.FatherHSTNumber,
          //   Indent: item.Indent,
          //   Description: item.Description,
          // };
          hsCodes.push(item);
        }
        if (sectionId < 0 && chapterId < 0 && hsNumber === '-1' && indent < 0) {
          this.hsCodeList.next(hsCodes);
        } else if (sectionId >= 0 && chapterId < 0 && hsNumber === '-1' && indent < 0) {
          this.hsCodeListWithSectionId.next(hsCodes);
        } else if (sectionId >= 0 && chapterId >= 0 && hsNumber === '-1' && indent < 0) {
          this.hsCodeListWithChapterId.next(hsCodes);
        } else if (sectionId >= 0 && chapterId >= 0 && hsNumber !== '-1' && indent < 0) {
          this.hsCodeListWithHsNumber.next(hsCodes);
        } else if (sectionId >= 0 && chapterId >= 0 && hsNumber !== '-1' && indent >= 0) {
          this.hsCodeListWithIndent.next(hsCodes);
        }
      });
  }

  getCategories(): void {
    this.httpClient.get(this.baseUrlCategories).subscribe((response: any) => {
      const categories = [];
      for (const item of response.jsonResult.Data.category) {
        const category: Category = item;
        category.Name = category.Name[this.sharedService.language] ?? category.Name['fa'];
        for (const child of category.Childs) {
          child.Name = child.Name[this.sharedService.language] ?? child.Name['fa'];
        }
        categories.push(category);
      }
      this.categories.next(categories);
    });
  }

  getTaxCategories(): void {
    this.httpClient.get(this.baseUrlTaxCategories).subscribe((response: any) => {
      const taxCategories = [];
      for (const item of response.jsonResult.Data.taxcategory) {
        const taxCategory: TaxCategoryModel = item;
        taxCategories.push(taxCategory);
      }
      this.taxCategoryList.next(taxCategories);
    });
  }

  getProductsInInventory(page: number, guid: string): void {
    const options = JSON.stringify({
      PageSize: 10,
      PageNumber: page,
    });
    this.httpClient
      .get(this.baseUrlProductsInInventory, {
        headers: {
          value: options,
          productGuid: guid,
        },
      })
      .subscribe((response: any) => {
        this.productInventoryTotal.next(response.jsonResult.Data.rowcount);
        const products = [];
        for (const item of response.jsonResult.Data.productinventory) {
          const product: ProductInventory = item;
          product.ProductName = product.ProductName[this.sharedService.language] ?? product.ProductName['fa'];
          product.UnitName = product.UnitName[this.sharedService.language] ?? product.UnitName['fa'];
          product.WareHouseName = product.WareHouseName[this.sharedService.language] ?? product.WareHouseName['fa'];
          if (product.SpecialAttributeValue !== '') {
            for (const element of product.SpecialAttributeValue) {
              const attribute: ProductAttribute = element;
              attribute.AttributeName =
                attribute.AttributeName[this.sharedService.language] ?? attribute.AttributeName['fa'];
              attribute.AttributeValue =
                attribute.AttributeValue[this.sharedService.language] ?? attribute.AttributeValue['fa'];
            }
          }
          products.push(product);
        }
        this.productsInventory.next(products);
      });
  }

  getProductAttributes(guid: string): void {
    this.httpClient.get(this.baseUrlProductAttribute + guid).subscribe((response: any) => {
      const productAttributes = [];
      for (const item of response.jsonResult.Data.productattribute) {
        const attribute: ProductInventoryAttribute = {
          AttributeId: item.AttributeId,
          AttributeName: item.AttributeName[this.sharedService.language] ?? item.AttributeName.fa,
          AttributeValues: [],
          Type: item.Type,
        };
        for (const element of item.DefaultAttributeValueIds) {
          const defaultAttribute: AttributeValue = {
            value: element.Id,
            name: element.Name[this.sharedService.language] ?? element.Name.fa,
          };
          attribute.AttributeValues.push(defaultAttribute);
        }
        productAttributes.push(attribute);
      }
      this.productInventoryAttribute.next(productAttributes);
    });
  }

  addProductToInventory(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrlInventory, data);
  }

  updateProductInventory(data: any): Observable<any> {
    return this.httpClient.put(this.baseUrlUpdateInventory, data);
  }

  deleteProductFromInventory(id: number, guid: any, page: number): void {
    this.httpClient.delete(this.baseUrlProductInventory + id).subscribe(response => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.delete,
      });
      this.getProductsInInventory(page, guid);
    });
  }

  getIncoterms(): void {
    this.httpClient.get(this.baseUrlIncoterm).subscribe((response: any) => {
      const incoterms = [];
      for (const item of response.jsonResult.Data.incoterm) {
        const incoterm: Incoterm = item;
        incoterm.Title = incoterm.Title[this.sharedService.language] ?? incoterm.Title.fa;
        incoterm.Description = incoterm.Description[this.sharedService.language] ?? incoterm.Description.fa;
        incoterms.push(incoterm);
      }
      this.incoterms.next(incoterms);
    });
  }

  addProductPrice(data: any, page: number, guid: string): void {
    this.httpClient.post(this.baseUrlVendorProductTierPrice, data).subscribe(response => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.create,
      });
      this.getProductsPrice(page, guid);
    });
  }

  updateProductPrice(data: any, page: number, guid: string): void {
    this.httpClient.put(this.baseUrlVendorProductTierPrice, data).subscribe(response => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.update,
      });
      this.getProductsPrice(page, guid);
    });
  }

  getProductsPrice(page: number, guid: string): void {
    const options = JSON.stringify({
      PageSize: 10,
      PageNumber: page,
    });
    this.httpClient
      .get(this.baseUrlVendorProductTierPriceList, {
        headers: {
          value: options,
          productGuid: guid,
        },
      })
      .subscribe((response: any) => {
        const productPrices = [];
        this.productPriceTotal.next(response.jsonResult.Data.rowcount);
        for (const item of response.jsonResult.Data.producttierprice) {
          const productPrice: ProductInventoryPrice = item;
          productPrice.ProductName =
            productPrice.ProductName[this.sharedService.language] ?? productPrice.ProductName['fa'];
          productPrice.UnitName = productPrice.UnitName[this.sharedService.language] ?? productPrice.UnitName['fa'];
          productPrice.WareHouseName =
            productPrice.WareHouseName[this.sharedService.language] ?? productPrice.WareHouseName['fa'];
          if (productPrice.IncotermName) {
            productPrice.IncotermName =
              productPrice.IncotermName[this.sharedService.language] ?? productPrice.IncotermName['fa'];
          }
          productPrice.GeolocationName = productPrice.GeolocationName
            ? productPrice.GeolocationName
            : productPrice.GeolocationName[this.sharedService.language] ?? productPrice.GeolocationName['fa'];
          if (productPrice.SpecialAttributeValue !== '') {
            for (const element of productPrice.SpecialAttributeValue) {
              const attribute: ProductAttribute = element;
              attribute.AttributeName =
                attribute.AttributeName[this.sharedService.language] ?? attribute.AttributeName['fa'];
              attribute.AttributeValue =
                attribute.AttributeValue[this.sharedService.language] ?? attribute.AttributeValue['fa'];
            }
          }
          productPrices.push(productPrice);
        }
        this.productInventoryPrices.next(productPrices);
      });
  }

  getProductPrice(id: number): void {
    this.httpClient.get(this.baseUrlVendorProductTierPrice + id).subscribe((response: any) => {
      const product: ProductPriceDto = response.jsonResult.Data.producttierprice;
      this.productPrice.next(product);
    });
  }

  deleteProductPrice(id: number, guid: string, page: number): void {
    this.httpClient.delete(this.baseUrlDeleteInventory + '/' + id).subscribe((response: any) => {
      Swal.fire({
        icon: 'success',
        text: this.apiTitles.delete,
      });
      this.getProductsPrice(page, guid);
    });
  }

  getProductByGuid(guid: string): void {
    this.httpClient.get(this.baseUrlProduct + guid).subscribe((response: any) => {
      const product: ProductDetail = response.jsonResult.Data;
      this.product.next(product);
    });
  }

  getProductByGuidTranslator(guid: string): void {
    this.httpClient.get(this.baseUrlProduct + guid).subscribe((response: any) => {
      const product: ProductItemModel = response.jsonResult.Data;
      this.productTranslation.next(product);
    });
  }

  productCustomUpdate(data: any): Observable<any> {
    return this.httpClient.put(this.baseUrlProductUpdate, { product: data });
  }

  getCategoryAttributes(categoryId: number): void {
    this.httpClient.get(this.baseUrlGetCategoryAttributes + `/${categoryId}`).subscribe((response: any) => {
      const categoryAttributes: CategoryAttributeModel[] = [];
      for (const categoryAttributeItem of response.jsonResult.Data.categoryattributemapping) {
        const categoryAttribute: CategoryAttributeModel = categoryAttributeItem;
        categoryAttributes.push(categoryAttribute);
      }
      this.categoryAttributes.next(categoryAttributes);
    });
  }

  getProductCertificates(): void {
    this.httpClient.get(this.baseUrlGetProductCertificates).subscribe((response: any) => {
      const certificates = [];
      for (const certificate of response.jsonResult.Data.certificate) {
        certificates.push(certificate);
      }
      this.productCertificates.next(certificates);
    });
  }

  getProductCertificateImages(guid: string): void {
    this.httpClient
      .get(this.baseUrlGetProductCertificatesImages, {
        headers: {
          ProductGuid: guid,
          Type: '0',
          EntityName: 'ProductCertificate',
        },
      })
      .subscribe((response: any) => {
        const images = [];
        for (const item of response.jsonResult.Data.vendorvendor) {
          const certificate: CertificateImage = item;
          certificate.Path = environment.apiUrl + certificate.Path;
          images.push(certificate);
        }
        this.productCertificateImages.next(images);
      });
  }

  addProductCertificate(data, guid: string): Observable<any> {
    return this.httpClient.post(this.baseUrlAddProductCertificates, data, {
      headers: {
        ProductGuid: guid,
        Type: '0',
        EntityName: 'ProductCertificate',
      },
    });
  }

  getPackageTypes(): void {
    this.httpClient.get(this.baseUrlProductPackageType).subscribe((response: any) => {
      this.productPackageTypes.next(response.jsonResult.Data.unit);
    });
  }

  getWeightUnits(): void {
    this.httpClient.get(this.baseUrlProductWeightUnit).subscribe((response: any) => {
      this.productWeightUnit.next(response.jsonResult.Data.unit);
    });
  }

  addProductPictures(data, guid: string, imageType: string): Observable<any> {
    return this.httpClient.post(this.baseUrlProductPicture, data, {
      headers: {
        ProductGuid: guid,
        Type: '0',
        EntityName: imageType,
      },
    });
  }

  addProductVideo(data, guid: string, videoType: string): Observable<any> {
    console.log('videoType', videoType);
    return this.httpClient.post(this.baseUrlProductVideo, data, {
      headers: {
        ProductGuid: guid,
        Type: videoType,
        EntityName: 'Product',
      },
    });
  }

  getProductPictures(guid: string, imageType: string): void {
    this.httpClient
      .get(this.baseUrlGetProductPicture, {
        headers: {
          ProductGuid: guid,
          Type: '0',
          EntityName: imageType,
        },
      })
      .subscribe((response: any) => {
        const images: ImageDto[] = [];
        for (const item of response.jsonResult.Data.vendorvendor) {
          const certificate: ImageDto = item;
          certificate.Path = environment.apiUrl + certificate.Path;
          images.push(certificate);
        }
        if (imageType === 'Product') {
          this.productImages.next(images);
        } else {
          this.productPackageImages.next(images);
        }
      });
  }
  getProductVideos(guid: string, videoType: string): void {
    this.httpClient
      .get(this.baseUrlGetProductVideo, {
        headers: {
          ProductGuid: guid,
          EntityName: 'Product',
        },
      })
      .subscribe((response: any) => {
        let videos: ImageDto[] = [];
        for (const item of response.jsonResult.Data.vendorvendor) {
          const video: ImageDto = item;
          video.Path = environment.apiUrl + video.Path;
          videos.push(video);
        }
        this.productVideo.next(videos);
      });
  }

  getVirtualWarehouse(): void {
    this.httpClient.get(this.baseUrlVirtualWarehouse).subscribe((response: any) => {
      this.virtualWarehouse.next(response.jsonResult.Data.warehouse);
    });
  }

  getProductTagsByGUID(guid: string): Observable<any> {
    return this.httpClient.get(this.baseUrlProductTag + guid);
  }

  getAllTransports(): void {
    this.httpClient.get(this.baseUrlTransport).subscribe((response: any) => {
      const transports = [];
      for (const item of response.jsonResult.Data.unit) {
        const transport: Transport = item;
        transport.Name = transport.Name[this.sharedService.language] ?? transport.Name['fa'];
        transports.push(transport);
      }
      this.transports.next(transports);
    });
  }

  upsertTransport(data: any): Observable<any> {
    return this.httpClient.post(this.baseUrlUpsertTransport, data);
  }

  getCurrencies(): void {
    this.httpClient.get(this.baseUrlCurrencies).subscribe((response: any) => {
      this.currencies.next(response.jsonResult.Data.currency);
    });
  }
}
