export interface DataItem {
    id: string;
    nome: string;
    preco: number;
    categoria: string;
    tags: string[];
}

export function dataItemNew (): DataItem  {
    return {
        id: '',
        nome: '',
        preco: 0,
        categoria: '',
        tags: []
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