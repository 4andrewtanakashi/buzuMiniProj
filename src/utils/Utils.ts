export interface DataItem {
    id: string;
    nome: string;
    preco: number;
    categoria: string;
}

export function dataItemNew (): DataItem  {
    return {
        id: '',
        nome: '',
        preco: 0,
        categoria: ''
    };
}

export type RootStackParams = {
    Home: {
        item?: DataItem;
    };
    ItemForm: {
        item?: DataItem;
    };
  };