import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
}

const MENUITEMS = [
  { state: 'company', type: 'link', name: 'Company List', icon: 'assignment' },
  { state: 'request', type: 'link', name: 'Request List', icon: 'folder' },
  { state: 'service', type: 'link', name: 'Service Pricing', icon: 'monetization_on' },
];

@Injectable()
export class MenuItems {
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
