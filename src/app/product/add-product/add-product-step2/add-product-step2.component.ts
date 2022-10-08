import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SharedService } from '../../../shared/shared.service';
import { ProductService } from '../../product.service';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Category } from '../../models/category.model';
import { TaxCategoryModel } from '../../../shared/models/tax-category.model';
import { Value } from '../../../models/value.model';
import { FileManagerService } from '../../../file-manager/file-manager.service';
import { CategoryAttribute, CategoryAttributeModel } from '../../../shared/models/category-attribute.model';
import { Image, ImageDto } from '../../../shared/image.model';
import { HsCodeModel } from '../../models/hs-code.model';
import Swal from 'sweetalert2';
import { BehaviorSubject } from 'rxjs';
import { AttributeModel } from '../../models/attribute.model';
import { ProductDetail } from '../../models/product-item.model';

@Component({
  selector: 'app-add-product-step2',
  templateUrl: './add-product-step2.component.html',
  styleUrls: ['./add-product-step2.component.sass'],
})
export class AddProductStep2Component implements OnInit {
  @Output() activatedTab = new EventEmitter<number>();
  @Input() guid;
  fileManagerType = 'Image';
  galleryType = 'Image';
  productImages: Image[] = [];
  deletedProductImage: Image[] = [];
  apiCalled = new BehaviorSubject<number>(3);
  apiCalls = 8;
  video: Image = {
    alt: new FormControl(''),
    description: new FormControl(''),
    path: '',
    tags: new FormControl(''),
    id: -1,
    tableId: '',
    action: 1,
  };
  deletedVideo: Image = {
    alt: new FormControl(''),
    description: new FormControl(''),
    path: '',
    tags: new FormControl(''),
    id: -1,
    tableId: '',
    action: 1,
  };
  introductionVideo: Image = {
    alt: new FormControl(''),
    description: new FormControl(''),
    path: '',
    tags: new FormControl(''),
    id: -1,
    tableId: '',
    action: 1,
  };
  deletedIntroductionVideo: Image = {
    alt: new FormControl(''),
    description: new FormControl(''),
    path: '',
    tags: new FormControl(''),
    id: -1,
    tableId: '',
    action: 1,
  };
  imageGalleryIndex = 1;
  imageVideoIndex = 1;
  activeTab = 2;
  language = 'fa';
  attributeTitles: any;
  productDetailsTitles: any;
  fileManagerTitles: any;
  apiTitles: any;
  fileTitles: any;
  filters;
  progress = 0;
  currentPage = 1;
  tags: any;
  isSelectCategory = false;
  isOpenHsContent = false;
  hsCodeSectionId = -2;
  hsCodeChapterId = -1;
  hsCodeHsNumber = '-1';
  hsCodeIndent = -1;
  selectedHtsNumber = '';
  selectedHtsNumberDescription = '';
  selectedHsCode: any;
  htsNumberList: any[] = [];

  productCategoryList: Category[] = [];
  taxCategoriesList: TaxCategoryModel[] = [];
  hsCodeList: HsCodeModel[] = [];
  hsCodeListWithSectionId: any[] = [];
  hsCodeListWithChapterId: any[] = [];
  hsCodeListWithHsNumber: any[] = [];
  hsCodeListWithIndent: any[] = [];
  taxes: Value[] = [];
  selectedCategories: Category[] = [];
  selectedCategoriesCached: Category[] = [];
  categoryAttributes: CategoryAttribute[] = [];
  attributeTypeValues = [];
  hsCodeController = new FormControl('');
  htsNumberSearchController = new FormControl('');
  taxController = new FormControl('', Validators.required);
  tagController = new FormControl('');
  searchTerm = new FormControl('');
  productForm = this.formBuilder.group({
    hsCode: this.hsCodeController,
    tax: this.taxController,
  });
  attributes: AttributeModel[] = [];
  product: ProductDetail;
  constructor(
    private sharedService: SharedService,
    private router: Router,
    private productService: ProductService,
    private formBuilder: FormBuilder,
    private renderer: Renderer2,
    private fileManagerService: FileManagerService,
    private activatedRoute: ActivatedRoute
  ) {
    this.sharedService.fileManagerTitles.subscribe(titles => {
      this.fileManagerTitles = titles;
      this.filters = [
        {
          value: '',
          name: this.fileManagerTitles.all,
        },
        {
          value: 'Video',
          name: this.fileManagerTitles.video,
        },
        {
          value: 'Image',
          name: this.fileManagerTitles.image,
        },
      ];
    });
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'productDetailsTitle');
      this.sharedService.onLanguageChanges(language, 'attributeTitle');
      this.sharedService.onLanguageChanges(language, 'fileManagerTitle');
      this.productService.getBrands();
      this.getCategories();
      this.getTaxCategories();
      this.getHsCodeList();
    });
    this.apiCalled.subscribe(apiCalls => {
      if (apiCalls === 0) {
        window.scrollTo(0, 0);
        this.activatedTab.emit(3);
        this.productService.getProductByGuid(this.guid);
      }
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.sharedService.fileSelectorTitles.subscribe(titles => {
      this.fileTitles = titles;
    });
    this.sharedService.attributeTitles.subscribe(titles => {
      this.attributeTitles = titles;
      this.attributeTypeValues = [
        {
          value: 0,
          name: this.attributeTitles.usual,
        },
        {
          value: 1,
          name: this.attributeTitles.priceAffect,
        },
        // {
        //   value: 2,
        //   name: this.attributeTitles.other,
        // },
      ];
    });
    this.sharedService.productDetailsTitles.subscribe(titles => {
      this.productDetailsTitles = titles;
    });
    this.productService.productImages.subscribe(images => {
      this.productImages = [];
      for (const image of images) {
        if (image.IsThumbnail === false) {
          this.productImages.push({
            id: image.Id,
            alt: new FormControl<any>(image.Alt),
            description: new FormControl<any>(image.Description),
            path: image.Path,
            tags: new FormControl<any>(image.Seo),
            action: 2,
            tableId: image.FileTableId,
          });
        }
      }
    });
    this.productService.categoryAttributes.subscribe(attributes => {
      if (this.selectedCategories.length > 0) {
        for (const attribute of attributes) {
          let type = new FormControl(0);
          const controllers = [];
          for (const item of attribute.DefaultValueIds) {
            controllers.push(new FormControl<boolean>(false));
          }
          const interval = setInterval(() => {
            if (this.product && this.product.Attribut) {
              for (const attr of this.product.Attribut) {
                if (attr.AttributeId === attribute.AttributeId) {
                  type.setValue(attr.Type);
                  if (attr.DefaultAttributeValueIds !== '') {
                    let index = 0;
                    for (const val of attr.DefaultAttributeValueIds) {
                      const index = attribute.DefaultValueIds.findIndex(i => i === val.Id);
                      if (index !== -1) {
                        controllers[index].setValue(true);
                      }
                    }
                    index++;
                  } else {
                    for (const attr of attribute.DefaultValueIds) {
                      controllers.push(new FormControl<boolean>(false));
                    }
                  }
                }
              }
              const attributeItem: CategoryAttribute = {
                DefaultAttributeValueIds: attribute.DefaultValueIds,
                DefaultValues: attribute.DefaultValues,
                DefaultValueIds: attribute.DefaultValueIds,
                AttributeName: attribute.AttributeName,
                CategoryId: attribute.CategoryId,
                ProductGuid: this.guid,
                AttributeGroupId: attribute.AttributeGroupId,
                AttributeId: attribute.AttributeId,
                FormControllers: controllers,
                TypeController: type,
              };
              if (!this.categoryAttributes.find(item => item.AttributeId === attributeItem.AttributeId)) {
                this.categoryAttributes.push(attributeItem);
              }
              clearInterval(interval);
            }
          }, 100);
        }
      }
    });
    // this.productService.selectedCategories.subscribe(categories => {
    //   this.selectedCategories = categories;
    //   console.log(this.selectedCategories);
    // });
    this.productService.hsCodeList.subscribe(hsCodes => {
      this.hsCodeList = hsCodes;
    });
    this.productService.hsCodeListWithSectionId.subscribe(hsCodes => {
      this.hsCodeListWithSectionId = hsCodes;
    });
    this.productService.hsCodeListWithChapterId.subscribe(hsCodes => {
      this.hsCodeListWithChapterId = hsCodes;
    });
    this.productService.hsCodeListWithHsNumber.subscribe(hsCodes => {
      this.hsCodeListWithHsNumber = hsCodes;
    });
    this.productService.hsCodeListWithIndent.subscribe(hsCodes => {
      this.hsCodeListWithIndent = hsCodes;
    });
    this.productService.hsCodeSectionId.subscribe(id => {
      this.hsCodeSectionId = id;
    });
    this.productService.hsCodeChapterId.subscribe(id => {
      this.hsCodeChapterId = id;
    });
    this.productService.hsCodeHsNumber.subscribe(id => {
      this.hsCodeHsNumber = id;
    });
    this.productService.hsCodeIndent.subscribe(id => {
      this.hsCodeIndent = id;
    });
    this.productService.productVideo.subscribe(videos => {
      this.video = {
        alt: new FormControl(''),
        description: new FormControl(''),
        path: '',
        tags: new FormControl(''),
        id: -1,
        tableId: '',
        action: 1,
      };
      this.introductionVideo = {
        alt: new FormControl(''),
        description: new FormControl(''),
        path: '',
        tags: new FormControl(''),
        id: -1,
        tableId: '',
        action: 1,
      };
      for (const video of videos) {
        if (+video.Type === 0) {
          this.video = {
            id: video.Id,
            description: new FormControl<any>(video.Description),
            path: video.Path,
            tags: new FormControl<any>(video.Seo),
            action: 2,
            tableId: video.FileTableId,
          };
        }
        if (+video.Type === 1) {
          this.introductionVideo = {
            id: video.Id,
            description: new FormControl<any>(video.Description),
            path: video.Path,
            tags: new FormControl<any>(video.Seo),
            action: 2,
            tableId: video.FileTableId,
          };
        }
      }
    });
    this.productService.product.subscribe(product => {
      this.selectedCategories = [];
      this.categoryAttributes = [];
      this.product = product;
      if (this.product) {
        if (product.Detail.TaxCategoryId) {
          this.taxController.setValue(product.Detail.TaxCategoryId.toString());
        }
        this.tags = product.Tag;
        if (!this.tags.hasOwnProperty('fa')) {
          this.tags = {
            fa: [],
          };
        }
        if (this.product.Detail.HSCodeId) {
          this.selectedHsCode = {
            Id: product.Detail.HSCodeId,
          };
        }
        if (this.product.Detail.HTSNumber) {
          this.selectedHtsNumber = product.Detail.HTSNumber;
        }
        for (const category of product.Category) {
          this.selectedCategories.push({
            Childs: [],
            CssClass: '',
            Id: category.CatId,
            Name: category.CatName,
            PicsPath: [],
          });
          this.productService.selectedCategories.next(this.selectedCategories);
          if (!this.selectedCategoriesCached.find(c => c.Id === category.CatId)) {
            this.productService.getCategoryAttributes(category.CatId);
          }
        }
        this.selectedCategoriesCached = this.selectedCategories;
      }
    });
  }

  ngOnInit(): void {
    this.productService.getProductPictures(this.guid, 'Product');
    this.productService.getProductVideos(this.guid, '0');
    this.productService.selectedCategories.subscribe(categories => {
      this.selectedCategories = categories;
    });
  }

  deleteVideo(): void {
    this.deletedVideo = {
      description: this.video.description.value,
      path: this.video.path,
      tags: this.video.tags.value,
      id: this.video.id,
      tableId: this.video.tableId,
      action: 3,
    };
    this.video = {
      alt: new FormControl(''),
      description: new FormControl(''),
      path: '',
      tags: new FormControl(''),
      id: -1,
      tableId: '',
      action: 1,
    };
  }

  deleteIntroductionVideo(): void {
    this.deletedIntroductionVideo = {
      description: this.introductionVideo.description.value,
      path: this.introductionVideo.path,
      tags: this.introductionVideo.tags.value,
      id: this.introductionVideo.id,
      tableId: this.introductionVideo.tableId,
      action: 3,
    };
    this.introductionVideo = {
      description: new FormControl(''),
      path: '',
      tags: new FormControl(''),
      id: -1,
      tableId: '',
      action: 1,
    };
  }

  onSubmit() {
    this.productForm.markAllAsTouched();
    this.taxController.markAllAsTouched();
    this.tagController.markAllAsTouched();
    this.hsCodeController.markAllAsTouched();
    if (this.taxController.errors || this.selectedCategories.length === 0 || this.productImages.length === 0) {
      Swal.fire({
        icon: 'warning',
        text: this.productDetailsTitles.all_inputs_required,
      });
    }
    if (
      !this.taxController.errors &&
      !this.tagController.errors &&
      !this.hsCodeController.errors &&
      this.productImages.length !== 0
    ) {
      const data = {
        ProductGuid: this.guid,
        TaxCategoryId: this.taxController.value,
      };
      this.productService.productCustomUpdate(data).subscribe(_ => {
        this.apiCalls--;
        this.apiCalled.next(this.apiCalls);
      });
      if (this.tags.fa.length > 0) {
        this.productService.updateProductTags(this.guid, this.tags).subscribe(_ => {
          this.apiCalls--;
          this.apiCalled.next(this.apiCalls);
        });
      } else {
        this.apiCalls--;
        this.apiCalled.next(this.apiCalls);
      }
      if (this.selectedHsCode) {
        const hsCode = {
          ProductGuid: this.guid,
          HSCodeId: this.selectedHsCode.Id,
        };
        this.productService.productCustomUpdate(hsCode).subscribe(_ => {
          this.apiCalls--;
          this.apiCalled.next(this.apiCalls);
        });
      } else {
        this.apiCalls--;
        this.apiCalled.next(this.apiCalls);
      }
      if (this.selectedCategories.length > 0) {
        this.productService.addProductCategory(this.guid, this.selectedCategories).subscribe(_ => {
          this.apiCalls--;
          this.apiCalled.next(this.apiCalls);
        });
      }
      const attributesValidation = [];
      for (const item of this.categoryAttributes) {
        if (+item.TypeController.value === 1) {
          const validations = [];
          for (const element of item.FormControllers) {
            validations.push(element.value);
          }
          attributesValidation.push(validations);
        }
      }
      let attributeValidation = true;
      for (const validation of attributesValidation) {
        attributeValidation = validation.find(v => v === true) ?? false;
      }
      if (attributeValidation) {
        this.productService.addOrUpdateProductAttribute(this.categoryAttributes, this.guid).subscribe(_ => {
          this.apiCalls--;
          this.apiCalled.next(this.apiCalls);
        });
      } else {
        Swal.fire({
          icon: 'error',
          text: this.productDetailsTitles.select_attribute,
        });
      }
    }
    const productImages: ImageDto[] = [];
    for (let i = 0; i < this.productImages.length; i++) {
      if (this.productImages[i].path !== '') {
        productImages.push({
          Action: this.productImages[i].action,
          Alt: this.productImages[i].alt.value,
          Description: this.productImages[i].description.value,
          FileTableId: this.productImages[i].tableId,
          Id: this.productImages[i].id,
          Seo: this.productImages[i].tags.value,
        });
      }
    }
    for (const productImage of this.deletedProductImage) {
      productImages.push({
        Action: productImage.action,
        Alt: productImage.alt.value,
        Description: productImage.description.value,
        FileTableId: productImage.tableId,
        Id: productImage.id,
        Seo: productImage.tags.value,
      });
    }
    if (productImages.length > 0) {
      this.productService.addProductPictures(productImages, this.guid, 'Product').subscribe(_ => {
        this.apiCalls--;
        this.apiCalled.next(this.apiCalls);
      });
    }
    if (this.video.path !== '' || this.deletedVideo.path !== '') {
      const videos = [];
      if (this.video.path !== '') {
        const videoProduct: ImageDto = {
          Action: this.video.action,
          Description: this.video.description.value,
          FileTableId: this.video.tableId,
          Id: this.video.id,
          Seo: this.video.tags.value,
        };
        videos.push(videoProduct);
      }
      if (this.deletedVideo.path !== '') {
        const videoProduct: ImageDto = {
          Action: this.deletedVideo.action,
          Description: this.deletedVideo.description.value,
          FileTableId: this.deletedVideo.tableId,
          Id: this.deletedVideo.id,
          Seo: this.deletedVideo.tags.value,
        };
        videos.push(videoProduct);
      }
      this.productService.addProductVideo(videos, this.guid, '0').subscribe(_ => {
        this.apiCalls--;
        this.apiCalled.next(this.apiCalls);
      });
    } else {
      this.apiCalls--;
      this.apiCalled.next(this.apiCalls);
    }
    if (this.introductionVideo.path !== '' || this.deletedIntroductionVideo.path !== '') {
      const videos = [];
      if (this.introductionVideo.path !== '') {
        const introductionVideoProduct: ImageDto = {
          Action: this.introductionVideo.action,
          Description: this.introductionVideo.description.value,
          FileTableId: this.introductionVideo.tableId,
          Id: this.introductionVideo.id,
          Seo: this.introductionVideo.tags.value,
        };
        videos.push(introductionVideoProduct);
      }
      if (this.deletedIntroductionVideo.path !== '') {
        const introductionVideoProduct: ImageDto = {
          Action: this.deletedIntroductionVideo.action,
          Description: this.deletedIntroductionVideo.description.value,
          FileTableId: this.deletedIntroductionVideo.tableId,
          Id: this.deletedIntroductionVideo.id,
          Seo: this.deletedIntroductionVideo.tags.value,
        };
        videos.push(introductionVideoProduct);
      }
      this.productService.addProductVideo(videos, this.guid, '1').subscribe(_ => {
        this.apiCalls--;
        this.apiCalled.next(this.apiCalls);
      });
    } else {
      this.apiCalls--;
      this.apiCalled.next(this.apiCalls);
    }
  }
  changeHsId() {
    // this.productService.hsCodeSectionId.subscribe(id => {
    //   this.hsCodeSectionId = id;
    // });
    // this.productService.hsCodeChapterId.subscribe(id => {
    //   this.hsCodeChapterId = id;
    // });
    // this.productService.hsCodeHsNumber.subscribe(id => {
    //   this.hsCodeHsNumber = id;
    // });
    // this.productService.hsCodeIndent.subscribe(id => {
    //   this.hsCodeIndent = id;
    // });
    this.getHsCodeList();
  }
  getHsCodeList() {
    this.productService.getHsCodeList(
      this.searchTerm.value,
      this.hsCodeSectionId,
      this.hsCodeChapterId,
      this.hsCodeHsNumber,
      this.hsCodeIndent
    );
  }
  setHtsNumber(htsNumber: string) {
    this.hsCodeController.setValue(htsNumber);
    this.selectedHtsNumber = htsNumber;
    this.isOpenHsContent = false;
  }
  setHsCode(hsCode: any) {
    this.selectedHsCode = hsCode;
    this.selectedHtsNumberDescription = hsCode.Description;
  }
  getCategories() {
    this.productService.categories.subscribe(categories => {
      this.productCategoryList = categories;
    });
  }
  getTaxCategories() {
    this.productService.taxCategoryList.subscribe(taxCategories => {
      this.taxCategoriesList = taxCategories;
      this.taxes = [];
      for (const item of this.taxCategoriesList) {
        this.taxes.push({
          value: item.Id,
          name: item.Name[this.language],
        });
      }
      if (!this.activatedRoute.snapshot.params.id) {
        this.taxController.setValue(this.taxes[0].value);
      }
    });
  }

  addTag() {
    if (this.tagController.value !== '') {
      this.tags.fa.push(this.tagController.value);
      this.tagController.setValue('');
    }
  }

  removeTag(index: number) {
    this.tags.fa.splice(index, 1);
  }

  removeCategory(index: number, categoryId: number) {
    this.selectedCategories.splice(index, 1);
    this.productService.selectedCategories.next(this.selectedCategories);
    this.removeCategoryAttributes(categoryId);
  }

  removeCategoryAttributes(categoryId: number) {
    const indexes = [];
    for (const attribute of this.categoryAttributes) {
      if (attribute.CategoryId === categoryId) {
        const index = this.categoryAttributes.indexOf(attribute);
        indexes.push(index);
      }
    }
    const attributes = this.categoryAttributes;
    for (const index of indexes.reverse()) {
      attributes.splice(index, 1);
    }
    this.categoryAttributes = attributes;
  }

  onOpenCategoryContent(event: any) {
    event.stopPropagation();
    this.isSelectCategory = !this.isSelectCategory;
    this.isOpenHsContent = false;
  }
  onOpenHsCodeContent(event: any) {
    event.stopPropagation();
    this.isOpenHsContent = !this.isOpenHsContent;
    this.isSelectCategory = false;
  }

  searchHtsNumber() {
    this.productService.searchHtsNumber(this.htsNumberSearchController.value);
  }

  getCategoryAttributes(categoryId: number) {
    this.isSelectCategory = false;
    let flag = false;
    let selectedCategories = [];
    this.productService.selectedCategories.subscribe(categories => {
      selectedCategories = categories;
    });
    if (selectedCategories.length > 0) {
      for (const item of selectedCategories) {
        if (item.Id === categoryId) {
          flag = true;
        }
      }
      if (!flag) {
        this.productService.getCategoryAttributes(categoryId);
      }
    } else {
      this.productService.getCategoryAttributes(categoryId);
    }
  }

  goBack() {
    if (this.activeTab > 1) {
      this.activeTab -= 1;
      this.activatedTab.emit(this.activeTab);
    } else {
      this.router.navigate(['/', this.language, 'product', 'list']);
    }
  }

  onGallerySelected(thisObj, file, id) {
    switch (id) {
      case 'Image': {
        thisObj.onImageGallerySelected(thisObj, file);
        break;
      }
      case 'Video': {
        thisObj.onVideoSelected(thisObj, file);
        break;
      }
      case 'Introduction': {
        thisObj.onIntroductionVideoSelected(thisObj, file);
        break;
      }
    }
  }

  onVideoSelected(thisObj, file) {
    const paths = file.Path.split('/');
    thisObj.video.path = file.Path;
    thisObj.video.tableId = paths[paths.length - 1];
  }

  onIntroductionVideoSelected(thisObj, file) {
    const paths = file.Path.split('/');
    thisObj.introductionVideo.path = file.Path;
    thisObj.introductionVideo.tableId = paths[paths.length - 1];
  }

  onImageGallerySelected(thisObj, file) {
    const paths = file.Path.split('/');
    const image: Image = {
      alt: new FormControl(''),
      description: new FormControl(''),
      path: file.Path,
      tags: new FormControl(''),
      tableId: paths[paths.length - 1],
      id: -1,
      action: 1,
    };
    thisObj.productImages.push(image);
  }

  deleteProductImage(index: number) {
    if (this.productImages[index].id !== -1) {
      this.productImages[index].action = 3;
      this.deletedProductImage.push(this.productImages[index]);
    }
    this.productImages.splice(index, 1);
  }

  getImages(): void {
    this.fileManagerService.getFiles('Image', this.imageGalleryIndex);
  }
  getVideos(): void {
    this.fileManagerService.getFiles('Video', this.imageVideoIndex);
  }

  setFileManagerType(type: string, id: string): void {
    this.fileManagerType = type;
    this.galleryType = id;
    this.fileManagerService.type.next(type);
    const element = document.getElementById('modal');
    this.renderer.addClass(element, 'show');
  }
}
