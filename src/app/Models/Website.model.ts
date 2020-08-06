

export interface Website{
  id: number;
  name: string;

  _links: {
    self: {
      href: string;
    },
    website: {
      href: string;
    },
    store: {
      href: string;
    },
    catalog: {
      href: string;
    }
  }
}
