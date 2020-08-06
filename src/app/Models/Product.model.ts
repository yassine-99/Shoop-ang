import {Price} from './Price.model';

export interface Product{
  id: number;
  name: string;
  description: string;
  active: boolean;
  photoName: string;
  promotion: boolean;
  available: boolean;
  quantity:number;
  price: Price;

  _links:{
    self:{
      href:string;
    },
    product:{
      href:string;
    },
    category:{
      href:string
    },
    catalog:{
      href:string
    },
    Price:{
      href:string
    }
    stocklavel:{
      href:string
    },
    media:{
      href:string
    }
  }

}
