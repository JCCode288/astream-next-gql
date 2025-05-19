export interface IContextBody {
   token?: string;
   provider?: string;
   clientId: string;
}

export interface IVariableID {
   id: string;
}

export interface IVariableQuery {
   page: number;
   query?: string;
}

export interface IVariableUser {
   userId?: string;
   clientId?: string;
}
