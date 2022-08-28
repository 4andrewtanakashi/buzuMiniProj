export interface DataItem {
    id: string;
    nome: string;
    preco: string;
    categoria: string;
    tags: string[];
}

export function dataItemNew (): DataItem  {
    return {
        id: '',
        nome: '',
        preco: '',
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