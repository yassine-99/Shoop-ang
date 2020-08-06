

export interface StockLevel{
  id: number;
  quantite: number;

  _links: {
    self: {
      href: string;
    },
    stockLevel: {
      href: string;
    },
    product: {
      href: string;
    },
    warehouse: {
      href: string;
    }
  }
}
