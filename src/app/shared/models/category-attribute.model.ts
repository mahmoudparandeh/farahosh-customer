import { FormControl } from '@angular/forms';

export interface CategoryAttributeModel {
  Id?: number;
  CategoryId?: any;
  currentCategory?: any;
  AttributeGroupId?: number;
  currentAttributeGroup?: string;
  AttributeId?: number;
  currentAttribute?: string;
  IsRequired?: any;

  DefaultValues?: any;
  DefaultValueIds?: any;
  currentDefaultValues?: DefaultValue[];
  GroupName?: any;
  currentGroupName?: any;
  InsertValueManually?: any;
  AttributeName?: any;
  currentAttributeName?: any;
  UnitId?: number;
  UnitName?: any;
  currentUnitName?: any;
  checked?: boolean;

  Type?: any;
  Value?: any;

  DefaultAttributeValueIds?: any;
  SelectedDefaultValues?: any[];
}

export interface DefaultValue {
  parentId?: number;
  name?: string;
  id: number;
  selected?: boolean;
}

export interface CategoryAttribute {
  AttributeGroupId: number;
  AttributeId: number;
  DefaultAttributeValueIds: number[];
  FormControllers: FormControl[];
  ProductGuid: string;
  TypeController: FormControl;
  DefaultValues: any[];
  DefaultValueIds: number[];
  AttributeName: any;
  CategoryId: number;
}
