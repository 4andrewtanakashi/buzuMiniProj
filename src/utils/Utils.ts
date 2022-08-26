export interface DataItem {
    id: string;
    nome: string;
    preco: number;
}

export function dataItemNew (): DataItem  {
    return {
        id: '',
        nome: '',
        preco: 0
    };
}

export type RootStackParams = {
    Home: any;
    ItemForm: {
        item: DataItem;
    };
  };