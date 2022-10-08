import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { FormControl, Validators } from '@angular/forms';
import { Image } from '../../shared/image.model';
import { AccountService } from '../account.service';
import { Faq } from '../../models/faq.model';
import { Profile } from './profile.model';
import { CertificateImage, Iso } from '../iso.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent {
  language = 'fa';
  profileTitles: any;
  apiTitles: any;
  currentTab = 'companyOverview';
  profileController = {
    fa: '',
  };
  profile: Profile;
  logo: Image = {
    alt: new FormControl(''),
    description: new FormControl(''),
    path: '',
    tags: new FormControl(''),
    id: -1,
    tableId: '',
    action: 1,
  };
  gallery: Image[] = [];
  deletedGallery: Image[] = [];
  isos: Iso[] = [];
  isosImages: CertificateImage[] = [];
  isosCertificates: CertificateImage[] = [];
  isosCheckboxes = [];
  capacityControllers = [
    {
      from: new FormControl('', Validators.required),
      to: new FormControl('', Validators.required),
      unit: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
    },
  ];
  faqControllers = [
    {
      question: new FormControl('', Validators.required),
      answer: new FormControl('', Validators.required),
    },
  ];
  companyOverviewControllers = {
    nameController: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    subjectController: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    shortDescriptionController: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    fullDescriptionController: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    registerCodeController: new FormControl('', {
      nonNullable: true,
      validators: Validators.required,
    }),
    postalCodeController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.pattern('\\b(?!(\\d)\\1{3})[13-9]{4}[1346-9][013-9]{5}\\b')],
    }),
    metaDescriptionController: new FormControl('', {
      nonNullable: true,
    }),
    metaKeywordsController: new FormControl('', {
      nonNullable: true,
    }),
    metaTitleController: new FormControl('', {
      nonNullable: true,
    }),
  };
  companyHistoryControllers = {
    emailController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.email],
    }),
    mobileCountry: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    faxController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    contactPersonController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    legalStatusController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    yearEstablishedController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    numberOfEmployeeController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    annualExportTurnoverController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    grossAnnualTurnoverController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    typeOfBusinessProductsController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    referencesController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    responseRFQTimeController: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  };

  constructor(private sharedService: SharedService, private accountService: AccountService) {
    this.sharedService.currentLanguage.subscribe(language => {
      this.language = language;
      this.sharedService.onLanguageChanges(language, 'profileTranslatorTitle');
      this.sharedService.onLanguageChanges(language, 'faqTitle');
      this.sharedService.onLanguageChanges(language, 'productionCapacityTitle');
      this.accountService.getISOs();
    });
    this.accountService.getProfile();
    this.accountService.getVendorProfileImages();
    this.accountService.getVendorCertificateImages();
    this.sharedService.profileTranslatorTitles.subscribe(titles => {
      this.profileTitles = titles;
    });
    this.sharedService.apiTitles.subscribe(titles => {
      this.apiTitles = titles;
    });
    this.accountService.profile.subscribe(profile => {
      this.profile = profile;
      this.companyOverviewControllers.nameController.setValue(
        profile.FullName && profile.FullName.fa ? profile.FullName.fa : ''
      );
      this.companyOverviewControllers.subjectController.setValue(
        profile.Subject && profile.Subject.fa ? profile.Subject.fa : ''
      );
      this.companyOverviewControllers.metaTitleController.setValue(
        profile.MetaTitle && profile.MetaTitle.fa ? profile.MetaTitle.fa : ''
      );
      this.companyOverviewControllers.postalCodeController.setValue(profile.PostalCode);
      this.companyOverviewControllers.shortDescriptionController.setValue(
        profile.ShortDescription && profile.ShortDescription.fa ? profile.ShortDescription.fa : ''
      );
      this.companyOverviewControllers.metaDescriptionController.setValue(
        profile.MetaDescription && profile.MetaDescription.fa ? profile.MetaDescription.fa : ''
      );
      this.companyOverviewControllers.fullDescriptionController.setValue(
        profile.FullDescription && profile.FullDescription.fa ? profile.FullDescription.fa : ''
      );
      this.companyOverviewControllers.registerCodeController.setValue(profile.RegisterCode);
      this.companyOverviewControllers.metaKeywordsController.setValue(
        profile.MetaKeywords && profile.MetaKeywords.fa ? profile.MetaKeywords.fa : ''
      );
      this.profileController.fa = profile.FullProfile;
      this.companyHistoryControllers.annualExportTurnoverController.setValue(profile.AnnualExportTurnover);
      this.companyHistoryControllers.contactPersonController.setValue(
        profile.ContactPerson && profile.ContactPerson.fa ? profile.ContactPerson.fa : ''
      );
      this.companyHistoryControllers.emailController.setValue(profile.Email);
      if (profile.Fax) {
        this.companyHistoryControllers.mobileCountry.setValue(profile.Fax.split('-')[0]);
        this.companyHistoryControllers.faxController.setValue(profile.Fax.split('-')[1]);
      }
      this.companyHistoryControllers.legalStatusController.setValue(
        profile.LegalStatus && profile.LegalStatus.fa ? profile.LegalStatus.fa : ''
      );
      this.companyHistoryControllers.grossAnnualTurnoverController.setValue(profile.GrossAnnualTurnover);
      this.companyHistoryControllers.numberOfEmployeeController.setValue(profile.NumberOfEmployees);
      this.companyHistoryControllers.referencesController.setValue(
        profile.Refrences && profile.Refrences.fa ? profile.Refrences.fa : ''
      );
      this.companyHistoryControllers.typeOfBusinessProductsController.setValue(
        profile.BusinessType && profile.BusinessType.fa ? profile.BusinessType.fa : ''
      );
      this.companyHistoryControllers.yearEstablishedController.setValue(profile.YearEstablished);
      this.companyHistoryControllers.responseRFQTimeController.setValue(profile.ResponseRFQTime);

      if (profile.FAQ) {
        if (profile.FAQ.length > 0) {
          this.faqControllers = [];
        }

        for (const item of profile.FAQ) {
          const faq: Faq = item;
          this.faqControllers.push({
            answer: new FormControl<string | null>(faq.answer.fa),
            question: new FormControl<string | null>(faq.question.fa),
          });
        }
      }

      if (profile.ProductionCapacity) {
        if (profile.ProductionCapacity.length > 0) {
          this.capacityControllers = [];
        }

        for (const item of profile.ProductionCapacity) {
          const capacity = {
            from: new FormControl(item.from),
            to: new FormControl(item.to),
            unit: new FormControl(item.unit),
            time: new FormControl(item.time),
          };
          this.capacityControllers.push(capacity);
        }
      }
    });

    this.accountService.vendorImages.subscribe(images => {
      this.gallery = [];
      for (const image of images) {
        if (+image.type === 1 && !image.isThumbnail) {
          this.logo = {
            alt: new FormControl<any>(image.alt),
            description: new FormControl<any>(image.description),
            path: image.path,
            tags: new FormControl<any>(image.seo),
            id: +image.id,
            tableId: image.tableId,
            action: 2,
          };
        } else if (+image.type === 2 && !image.isThumbnail) {
          this.gallery.push({
            alt: new FormControl<any>(image.alt),
            description: new FormControl<any>(image.description),
            path: image.path,
            tags: new FormControl<any>(image.seo),
            id: +image.id,
            tableId: image.tableId,
            action: 2,
          });
        }
      }
    });

    this.accountService.vendorICertificates.subscribe(certificate => {
      this.isosCertificates = [];
      for (const item of certificate) {
        this.isosCertificates.push({
          Action: 2,
          Alt: new FormControl(item.Alt),
          CertificateId: item.CertificateId,
          Description: new FormControl(item.Description),
          FileTableId: item.FileTableId,
          Id: item.Id,
          Seo: new FormControl(item.Seo),
          Path: item.Path,
        });
      }
      const interval = setInterval(() => {
        if (this.isos.length > 0) {
          for (const certificate of this.isosCertificates) {
            const index = this.isos.findIndex(iso => iso.Id === certificate.CertificateId);
            if (index !== -1) {
              this.isosImages[index] = certificate;
              this.isosCheckboxes[index].setValue(true);
            }
          }
          clearInterval(interval);
        }
      }, 1000);
    });

    this.accountService.isos.subscribe(isos => {
      this.isos = isos;
      for (const iso of this.isos) {
        this.isosCheckboxes.push(new FormControl<boolean>(false));
        this.isosImages.push({
          CertificateId: 0,
          Action: 0,
          Id: -1,
          FileTableId: '',
          Alt: new FormControl(''),
          Description: new FormControl(''),
          Path: '',
          Seo: new FormControl(''),
        });
      }
    });
  }

  setCurrentTab(tab: string) {
    this.currentTab = tab;
  }
}
