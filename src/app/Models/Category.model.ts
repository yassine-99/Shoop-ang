
export interface Category {
  id: string;
  name: string;
  description: string;

  _links: {
    self: {
      href: string;
    },
    category: {
      href: string;
    },
    catalog: {
      href: string;
    }
  }
}
