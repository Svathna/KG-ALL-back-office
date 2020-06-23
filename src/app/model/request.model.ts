import { CompanyDetail } from './company.model';

export interface Request {
    _id: string
    description: string;
    status: RequestStatus;
    type: RequestType;
    company: CompanyDetail;
}

export interface RequestsResponse {
    requests: Request[];
    success: boolean;
    message: string;
}

export enum RequestStatus {
    PENDING = 'pending',
    COMPLETED = 'completed',
    REJECTED = 'rejected',
}
  
export enum RequestType {
    REQUEST_DOCUMENT = 1,
    OTHERS = 2,
}
  