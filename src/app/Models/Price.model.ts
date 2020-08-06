
export interface Price{
  id: string;
  value: number;

  _links: {
    self: {
      href: string;
    },
    price: {
      href: string;
    },
    catalog: {
      href: string;
    },
    currency: {
      href: string;
    },
    product: {
      href: string;
    }
  }
}
