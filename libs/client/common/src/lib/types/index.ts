export interface DataSourceItem {
  label: string;
  value: string | number;
}
export interface TreeDataSourceItem {
  name: string;
  id: number;
  children: TreeDataSourceItem[];
}
