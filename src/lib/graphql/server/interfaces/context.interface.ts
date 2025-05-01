export interface IContextBody {
   provider?: string;
   ip: string;
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
   browserId?: string;
}
