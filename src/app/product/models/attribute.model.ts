import { FormControl } from '@angular/forms';

export interface AttributeModel {
  ProductGuid: string;
  AttributeGroupId: number;
  AttributeId: number;
  // Type: number;
  DefaultAttributeValueIds: string[];
  FormControllers: FormControl[][];
  TypeController: FormControl[][];
}
