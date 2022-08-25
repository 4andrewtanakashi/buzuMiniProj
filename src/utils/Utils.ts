export interface DataItem {
    id: string;
    nome: string;
    preco: number;
}

export function DataItemConst (data : string) {
    return {
        id: data.id,
        nome: data.nome,
        preco: data.preco
    };
}