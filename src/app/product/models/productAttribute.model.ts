export interface ProductAttribute {
  AttributeId: number;
  AttributeName: string;
  AttributeValue: string;
  AttributeValueId: number;
}

export interface ProductInventoryAttribute {
  AttributeId: number;
  AttributeName: string;
  AttributeValues: AttributeValue[];
  Type: number;
}

export interface AttributeValue {
  value: number;
  name: string;
}
