import { Injectable } from '@angular/core';
import { Config,STYLE, THEME } from 'ngx-easy-table';

@Injectable()
export class ConfigurationService {
  public static config:Config = {
    searchEnabled: true,
    headerEnabled: true,
    orderEnabled: true,
    orderEventOnly: false,
    paginationEnabled: true,
    exportEnabled: false,
    clickEvent: false,
    selectRow: false,
    selectCol: false,
    selectCell: false,
    rows: 30,
    additionalActions: false,
    serverPagination: false,
    isLoading: false,
    detailsTemplate: false,
    groupRows: false,
    paginationRangeEnabled: true,
    collapseAllRows: false,
    checkboxes: false,
    resizeColumn: true,
    fixedColumnWidth: false,
    horizontalScroll: false,
    draggable: true,
    logger: false,
    showDetailsArrow: false,
    showContextMenu: false,
    persistState: false,
    paginationMaxSize: 5,
    threeWaySort: false,
    tableLayout: {
      style: STYLE.TINY, // or STYLE.BIG or STYLE.TINY
      theme: THEME.LIGHT, // or THEME.DARK
      borderless: false,
      hover: true,
      striped: true,
    }
  };
}