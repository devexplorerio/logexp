export type DeliveryResp = {
  id: number;
  documento: string;
  motorista: {
    nome: string;
  },
  cliente_origem: {
    nome: string;
    endereco: string;
    bairro: string;
    cidade: string;
  },
  cliente_destino: {
    nome: string;
    endereco: string;
    bairro: string;
    cidade: string;
  },
  status_entrega: string;
};


export type Delivery = {
  id: number;
  documento: string;
  motorista_nome: string;
  cliente_origem_nome: string;
  cliente_origem_endereco: string;
  cliente_origem_bairro: string;
  cliente_origem_cidade: string;
  cliente_destino_nome: string;
  cliente_destino_endereco: string;
  cliente_destino_bairro: string;
  cliente_destino_cidade: string;
  status_entrega: string;
};
