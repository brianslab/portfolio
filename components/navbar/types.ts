interface page {
  name: string;
  link: string;
}

export interface NavbarProps {
  home?: string;
  pages?: page[];
}
